import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/auth";
import prisma from "@/lib/prisma";

// GET a specific workout
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const workout = await prisma.workoutPost.findUnique({
    where: { id: id },
    include: { author: { select: { name: true } } },
  });
  if (!workout) {
    return NextResponse.json({ error: "Workout not found" }, { status: 404 });
  }
  return NextResponse.json(workout);
}

// PUT (update) a specific workout
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
  const { title, description, date, tags, duration } = data;

  try {
    const workout = await prisma.workoutPost.update({
      where: { id: id },
      data: {
        title,
        description,
        date: new Date(date),
        tags,
        duration,
      },
    });
    return NextResponse.json(workout);
  } catch (error) {
    console.error("Error updating workout:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Error updating workout",
      },
      { status: 500 }
    );
  }
}

// DELETE a specific workout
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
    await prisma.workoutPost.delete({
      where: { id: id },
    });
    return NextResponse.json({ message: "Workout deleted successfully" });
  } catch (error) {
    console.error("Error deleting workout:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Error deleting workout",
      },
      { status: 500 }
    );
  }
}
