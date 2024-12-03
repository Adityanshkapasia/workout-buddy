import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/auth";
import prisma from "@/lib/prisma";

// GET all blog posts
export async function GET() {
  const blogs = await prisma.blogPost.findMany({
    include: { author: { select: { name: true } } },
  });
  return NextResponse.json(blogs);
}

// POST a new blog post
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const data = await request.json();
  const { title, content, tags, publicationDate } = data;

  try {
    const blog = await prisma.blogPost.create({
      data: {
        title,
        content,
        tags,
        publicationDate: new Date(publicationDate),
        authorId: session.user.id,
      },
    });
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Error creating blog post",
      },
      { status: 500 }
    );
  }
}
