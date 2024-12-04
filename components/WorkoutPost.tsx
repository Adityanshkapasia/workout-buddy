"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useSocket } from "@/hooks/useSocket";

interface WorkoutPostProps {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: number;
  tags: string[];
  likes: number;
  isLiked: boolean;
}

const WorkoutPost: React.FC<WorkoutPostProps> = ({
  id,
  title,
  description,
  date,
  duration,
  tags,
  likes: initialLikes,
  isLiked: initialIsLiked,
}) => {
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [liked, setLiked] = useState(initialIsLiked);
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("workoutLikeUpdate", (data) => {
        if (data.workoutId === id) {
          setLikeCount(data.likesCount);
          setLiked(data.action === "added");
        }
      });
    }
    return () => {
      if (socket) {
        socket.off("workoutLikeUpdate");
      }
    };
  }, [socket, id]);

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/workouts/${id}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        setLikeCount(data.likesCount);
        setLiked(!liked);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div className="p-6 rounded-xl bg-gradient-to-br from-primary-light/10 to-secondary-light/10 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
      <h2 className="text-2xl font-bold mb-2 text-primary-light">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <span>Date: {new Date(date).toLocaleDateString()}</span>
        <span>Duration: {duration} minutes</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
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
          href={`/workouts/${id}`}
          className="inline-block px-4 py-2 bg-primary-light text-white rounded-lg hover:bg-primary-dark transition-colors duration-200"
        >
          View Details
        </Link>
        <button
          onClick={handleLike}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_10px_rgba(255,255,255,0.1)] hover:shadow-[inset_0_-2px_4px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(255,255,255,0.2)] dark:hover:shadow-[inset_0_-2px_4px_rgba(255,255,255,0.1),inset_0_2px_4px_rgba(0,0,0,0.1)] transition-all duration-200"
        >
          <Heart
            className={`w-5 h-5 ${
              liked ? "fill-red-500 text-red-500" : "text-gray-500"
            }`}
          />
          <span>{likeCount}</span>
        </button>
      </div>
    </div>
  );
};

export default WorkoutPost;
