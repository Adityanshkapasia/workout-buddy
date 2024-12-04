import React, { useState, useEffect } from "react";
import Link from "next/link";
import SearchAndFilter from "./SearchAndFilter";

interface Workout {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: number;
  tags: string[];
  likes: number;
}

interface WorkoutFeedProps {
  initialWorkouts: Workout[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const WorkoutFeed: React.FC<WorkoutFeedProps> = ({
  initialWorkouts,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [workouts, setWorkouts] = useState(initialWorkouts);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(
        `/api/workouts?page=${currentPage}&search=${searchQuery}&sort=${sortBy}`
      );
      const data = await response.json();
      setWorkouts(data.workouts);
    };
    fetchWorkouts();
  }, [currentPage, searchQuery, sortBy]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onPageChange(1); // Reset to first page when searching
  };

  const handleSort = (sort: string) => {
    setSortBy(sort);
    onPageChange(1); // Reset to first page when sorting
  };

  return (
    <div className="space-y-8">
      <SearchAndFilter onSearch={handleSearch} onSort={handleSort} />
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
          <div className="mt-4 flex justify-between items-center">
            <Link
              href={`/workouts/${workout.id}`}
              className="inline-block px-4 py-2 bg-primary-light text-white rounded-lg hover:bg-primary-dark transition-colors duration-200"
            >
              View Details
            </Link>
            <span className="text-gray-600 dark:text-gray-400">
              Likes: {workout.likes}
            </span>
          </div>
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
