import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const { content, workoutId } = await request.json();

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

    // Convert dates to ISO strings to avoid serialization issues
    const serializedComment = {
      ...comment,
      createdAt: comment.createdAt.toISOString(),
      updatedAt: comment.updatedAt.toISOString(),
    };

    return NextResponse.json(serializedComment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Error creating comment" },
      { status: 500 }
    );
  }
}
