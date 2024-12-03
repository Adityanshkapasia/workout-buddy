import { Dumbbell, TrendingUp, Calendar } from "lucide-react";

export default function HomeContent() {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-display font-bold mb-6 text-primary-light dark:text-primary-dark bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark">
        Welcome to Workout Buddy
      </h1>
      <p className="text-2xl mb-12 text-text-light dark:text-text-dark">
        Your personal fitness companion
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-neumorphic-light dark:shadow-neumorphic-dark transform hover:scale-105 transition-all duration-300">
          <Dumbbell className="w-16 h-16 mx-auto mb-4 text-primary-light dark:text-primary-dark" />
          <h2 className="text-2xl font-display font-semibold mb-4 text-secondary-light dark:text-secondary-dark">
            Quick Start
          </h2>
          <p className="text-text-light dark:text-text-dark">
            Get started with your fitness journey today!
          </p>
        </div>
        <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-neumorphic-light dark:shadow-neumorphic-dark transform hover:scale-105 transition-all duration-300">
          <TrendingUp className="w-16 h-16 mx-auto mb-4 text-primary-light dark:text-primary-dark" />
          <h2 className="text-2xl font-display font-semibold mb-4 text-secondary-light dark:text-secondary-dark">
            Featured Workouts
          </h2>
          <p className="text-text-light dark:text-text-dark">
            Explore our curated list of effective workouts.
          </p>
        </div>
        <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-neumorphic-light dark:shadow-neumorphic-dark transform hover:scale-105 transition-all duration-300">
          <Calendar className="w-16 h-16 mx-auto mb-4 text-primary-light dark:text-primary-dark" />
          <h2 className="text-2xl font-display font-semibold mb-4 text-secondary-light dark:text-secondary-dark">
            Track Your Progress
          </h2>
          <p className="text-text-light dark:text-text-dark">
            Log your workouts and see your improvements over time.
          </p>
        </div>
      </div>
    </div>
  );
}
