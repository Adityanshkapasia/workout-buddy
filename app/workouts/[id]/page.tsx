import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface WorkoutPageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkoutPage({ params }: WorkoutPageProps) {
  const id = (await params).id;

  const workout = await prisma.workoutPost.findUnique({
    where: { id },
    include: { author: { select: { name: true } } },
  });

  if (!workout) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-primary-light to-secondary-light text-transparent bg-clip-text">
          {workout.title}
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          By {workout.author.name} on{" "}
          {new Date(workout.date).toLocaleDateString()}
        </p>
        <div className="prose dark:prose-invert max-w-none">
          <p className="mb-4">{workout.description}</p>
          <p className="mb-4">Duration: {workout.duration} minutes</p>
          <div className="mb-4">Tags: {workout.tags.join(", ")}</div>
        </div>
      </div>
    </div>
  );
}
