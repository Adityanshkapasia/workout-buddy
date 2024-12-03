import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/auth";
import prisma from "@/lib/prisma";
import { Server as NetServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import type { Socket } from "net";

interface CustomSocket extends Socket {
  server: NetServer & {
    io: SocketIOServer;
  };
}

interface ResponseWithSocket extends Response {
  socket: CustomSocket;
}

// GET all comments
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const workoutId = searchParams.get("workoutId");
  const blogId = searchParams.get("blogId");

  if (!workoutId && !blogId) {
    return NextResponse.json(
      { error: "Must provide either workoutId or blogId" },
      { status: 400 }
    );
  }

  const comments = await prisma.comment.findMany({
    where: {
      ...(workoutId && { workoutId }),
      ...(blogId && { blogId }),
    },
    include: { author: { select: { name: true } } },
  });

  return NextResponse.json(comments);
}

// POST a new comment
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const data = await request.json();
  const { content, workoutId, blogId } = data;

  if (!workoutId && !blogId) {
    return NextResponse.json(
      { error: "Must provide either workoutId or blogId" },
      { status: 400 }
    );
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        author: { connect: { id: session.user.id } },
        ...(workoutId && { workout: { connect: { id: workoutId } } }),
        ...(blogId && { blog: { connect: { id: blogId } } }),
      },
      include: { author: { select: { name: true } } },
    });

    // Emit real-time notification
    const res = request as unknown as ResponseWithSocket;
    if (res.socket?.server?.io) {
      const io = res.socket.server.io;
      const room = workoutId ? `workout:${workoutId}` : `blog:${blogId}`;
      io.to(room).emit("newComment", comment);
    }

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Error creating comment",
      },
      { status: 500 }
    );
  }
}
