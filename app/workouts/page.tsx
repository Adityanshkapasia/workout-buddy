import prisma from "@/lib/prisma";
import Link from "next/link";
import { Dumbbell } from "lucide-react";

const ITEMS_PER_PAGE = 10;

interface WorkoutsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function WorkoutsPage({
  searchParams,
}: WorkoutsPageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const [workouts, totalWorkouts] = await Promise.all([
    prisma.workoutPost.findMany({
      skip,
      take: ITEMS_PER_PAGE,
      orderBy: { date: "desc" },
      include: { author: { select: { name: true } } },
    }),
    prisma.workoutPost.count(),
  ]);

  const totalPages = Math.ceil(totalWorkouts / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary-light to-secondary-light text-transparent bg-clip-text">
          Workouts
        </h1>
        <div className="grid gap-8">
          {workouts.map((workout) => (
            <article
              key={workout.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <Link href={`/workouts/${workout.id}`}>
                <h2 className="text-2xl font-bold mb-2 hover:text-primary-light dark:hover:text-primary-dark flex items-center">
                  <Dumbbell className="mr-2" />
                  {workout.title}
                </h2>
              </Link>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                By {workout.author.name} on{" "}
                {new Date(workout.date).toLocaleDateString()}
              </p>
              <p className="mb-4">{workout.description.substring(0, 150)}...</p>
              <div className="flex justify-between items-center">
                <Link
                  href={`/workouts/${workout.id}`}
                  className="text-primary-light dark:text-primary-dark hover:underline"
                >
                  View Workout
                </Link>
                <span className="text-gray-600 dark:text-gray-400">
                  Duration: {workout.duration} minutes
                </span>
              </div>
            </article>
          ))}
        </div>
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center space-x-4">
            {currentPage > 1 && (
              <Link
                href={`/workouts?page=${currentPage - 1}`}
                className="px-4 py-2 bg-primary-light dark:bg-primary-dark text-white rounded-lg"
              >
                Previous
              </Link>
            )}
            {currentPage < totalPages && (
              <Link
                href={`/workouts?page=${currentPage + 1}`}
                className="px-4 py-2 bg-primary-light dark:bg-primary-dark text-white rounded-lg"
              >
                Next
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
