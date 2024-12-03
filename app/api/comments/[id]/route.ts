import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/auth";
import prisma from "@/lib/prisma";

// GET a specific comment
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const comment = await prisma.comment.findUnique({
    where: { id },
    include: { author: { select: { name: true } } },
  });
  if (!comment) {
    return NextResponse.json({ error: "Comment not found" }, { status: 404 });
  }
  return NextResponse.json(comment);
}

// PUT (update) a specific comment
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const data = await request.json();
  const { content } = data;

  try {
    const comment = await prisma.comment.update({
      where: { id },
      data: { content },
      include: { author: { select: { name: true } } },
    });
    return NextResponse.json(comment);
  } catch (error) {
    console.error("Error updating comment:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Error updating comment",
      },
      { status: 500 }
    );
  }
}

// DELETE a specific comment
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    await prisma.comment.delete({ where: { id } });
    return NextResponse.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Error deleting comment",
      },
      { status: 500 }
    );
  }
}
