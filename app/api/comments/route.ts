import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { content, workoutId } = await request.json();

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        workoutId,
        authorId: session.user.id,
      },
      include: {
        author: {
          select: { name: true },
        },
      },
    });
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
