import React from "react";
import Link from "next/link";

interface Workout {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: number;
  tags: string[];
}

interface WorkoutFeedProps {
  workouts: Workout[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const WorkoutFeed: React.FC<WorkoutFeedProps> = ({
  workouts,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="space-y-8">
      {workouts.map((workout) => (
        <div
          key={workout.id}
          className="p-6 rounded-xl bg-gradient-to-br from-primary-light/10 to-secondary-light/10 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          <h2 className="text-2xl font-bold mb-2 text-primary-light">
            {workout.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {workout.description}
          </p>
          <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
            <span>Date: {new Date(workout.date).toLocaleDateString()}</span>
            <span>Duration: {workout.duration} minutes</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {workout.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-accent-light/20 text-accent-dark rounded-full text-xs font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
          <Link
            href={`/workouts/${workout.id}`}
            className="mt-4 inline-block px-4 py-2 bg-primary-light text-white rounded-lg hover:bg-primary-dark transition-colors duration-200"
          >
            View Details
          </Link>
        </div>
      ))}
      <div className="flex justify-center space-x-4 mt-8">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-primary-light text-white rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-primary-light text-white rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WorkoutFeed;
