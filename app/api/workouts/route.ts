import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/auth";
import prisma from "@/lib/prisma";

// GET all workouts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "5");
  const skip = (page - 1) * limit;

  try {
    const [workouts, totalCount] = await Promise.all([
      prisma.workoutPost.findMany({
        skip,
        take: limit,
        orderBy: { date: "desc" },
        include: { author: { select: { name: true } } },
      }),
      prisma.workoutPost.count(),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({ workouts, totalPages, currentPage: page });
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return NextResponse.json(
      { error: "Error fetching workouts" },
      { status: 500 }
    );
  }
}

// POST a new workout
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
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
