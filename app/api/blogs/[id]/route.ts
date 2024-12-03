import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/auth";
import prisma from "@/lib/prisma";

// GET a specific blog post
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const blog = await prisma.blogPost.findUnique({
    where: { id: id },
    include: { author: { select: { name: true } } },
  });
  if (!blog) {
    return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
  }
  return NextResponse.json(blog);
}

// PUT (update) a specific blog post
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
  const { title, content, tags, publicationDate } = data;

  try {
    const blog = await prisma.blogPost.update({
      where: { id: id },
      data: {
        title,
        content,
        tags,
        publicationDate: new Date(publicationDate),
      },
    });
    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Error updating blog post",
      },
      { status: 500 }
    );
  }
}

// DELETE a specific blog post
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    await prisma.blogPost.delete({
      where: { id: id },
    });
    return NextResponse.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Error deleting blog post",
      },
      { status: 500 }
    );
  }
}
