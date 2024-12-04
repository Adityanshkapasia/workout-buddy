import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import prisma from "@/lib/prisma";
import type { NextApiResponseServerIO } from "@/types/next";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const workoutId = (await params).id;

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        workoutId: workoutId,
        userId: session.user.id,
      },
    });

    let action: "added" | "removed";
    if (existingLike) {
      await prisma.like.delete({
        where: { id: existingLike.id },
      });
      action = "removed";
    } else {
      await prisma.like.create({
        data: {
          workoutId: workoutId,
          userId: session.user.id,
        },
      });
      action = "added";
    }

    const updatedWorkout = await prisma.workoutPost.findUnique({
      where: { id: workoutId },
      include: { likes: true },
    });

    // Emit Socket.IO event
    const res = request as unknown as NextApiResponseServerIO;
    if (res.socket.server.io) {
      res.socket.server.io.emit("workoutLikeUpdate", {
        workoutId,
        likesCount: updatedWorkout?.likes.length || 0,
        action,
      });

      // Emit notification
      res.socket.server.io.emit("newNotification", {
        id: Date.now().toString(),
        message: `Someone ${action} a like on a workout`,
        createdAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      message: `Like ${action}`,
      likesCount: updatedWorkout?.likes.length || 0,
    });
  } catch (error) {
    console.error("Error handling like:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error handling like" },
      { status: 500 }
    );
  }
}
