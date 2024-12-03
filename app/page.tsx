"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Layout from "../components/Layout";
import WorkoutFeed from "../components/WorkoutFeed";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();
  const [workouts, setWorkouts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchWorkouts(currentPage);
  }, [currentPage]);

  const fetchWorkouts = async (page: number) => {
    try {
      const response = await fetch(`/api/workouts?page=${page}&limit=5`);
      const data = await response.json();
      setWorkouts(data.workouts);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary-light to-secondary-light text-transparent bg-clip-text">
          Welcome to Workout Buddy
        </h1>
        {session ? (
          <>
            <p className="text-xl mb-8 text-center">
              Welcome back, {session.user.name}!
            </p>
            <Link
              href="/create-workout"
              className="block w-full max-w-md mx-auto mb-8 py-3 px-6 text-center text-white font-bold rounded-lg bg-gradient-to-r from-primary-light to-secondary-light hover:from-primary-dark hover:to-secondary-dark transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Create New Workout
            </Link>
          </>
        ) : (
          <p className="text-xl mb-8 text-center">
            Please sign in to access all features.
          </p>
        )}
        <WorkoutFeed
          workouts={workouts}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </Layout>
  );
}
