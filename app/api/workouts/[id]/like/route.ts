import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import prisma from "@/lib/prisma";

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

    if (existingLike) {
      await prisma.like.delete({
        where: { id: existingLike.id },
      });
      return NextResponse.json({ message: "Like removed" });
    } else {
      await prisma.like.create({
        data: {
          workoutId: workoutId,
          userId: session.user.id,
        },
      });
      return NextResponse.json({ message: "Like added" });
    }
  } catch (error) {
    console.error("Error handling like:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error handling like" },
      { status: 500 }
    );
  }
}
