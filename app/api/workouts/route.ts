import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/auth";
import prisma from "@/lib/prisma";

// GET all workouts
export async function GET() {
  const workouts = await prisma.workoutPost.findMany({
    include: { author: { select: { name: true } } },
  });
  return NextResponse.json(workouts);
}

// POST a new workout
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const data = await request.json();
  const { title, description, date, tags, duration } = data;

  try {
    const workout = await prisma.workoutPost.create({
      data: {
        title,
        description,
        date: new Date(date),
        tags,
        duration,
        authorId: session.user.id,
      },
    });
    return NextResponse.json(workout, { status: 201 });
  } catch (error) {
    console.error("Error creating workout:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Error creating workout",
      },
      { status: 500 }
    );
  }
}
