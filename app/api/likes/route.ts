import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/auth";
import prisma from "@/lib/prisma";

// POST a new like
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const data = await request.json();
  const { workoutId, blogId } = data;

  if (!workoutId && !blogId) {
    return NextResponse.json(
      { error: "Must provide either workoutId or blogId" },
      { status: 400 }
    );
  }

  try {
    const like = await prisma.like.create({
      data: {
        user: { connect: { id: session.user.id } },
        ...(workoutId && { workout: { connect: { id: workoutId } } }),
        ...(blogId && { blog: { connect: { id: blogId } } }),
      },
    });
    return NextResponse.json(like, { status: 201 });
  } catch (error) {
    console.error("Error creating like:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error creating like" },
      { status: 500 }
    );
  }
}

// DELETE a like
export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const data = await request.json();
  const { workoutId, blogId } = data;

  if (!workoutId && !blogId) {
    return NextResponse.json(
      { error: "Must provide either workoutId or blogId" },
      { status: 400 }
    );
  }

  try {
    await prisma.like.deleteMany({
      where: {
        userId: session.user.id,
        ...(workoutId && { workoutId }),
        ...(blogId && { blogId }),
      },
    });
    return NextResponse.json({ message: "Like removed successfully" });
  } catch (error) {
    console.error("Error removing like:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error removing like" },
      { status: 500 }
    );
  }
}
