import Link from "next/link";
import { WorkoutPost, BlogPost } from "@prisma/client";

interface UserPostsProps {
  workoutPosts: WorkoutPost[];
  blogPosts: BlogPost[];
}

export default function UserPosts({ workoutPosts, blogPosts }: UserPostsProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Workouts</h2>
        {workoutPosts.length > 0 ? (
          <ul className="space-y-4">
            {workoutPosts.map((post) => (
              <li
                key={post.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
              >
                <Link
                  href={`/workouts/${post.id}`}
                  className="text-lg font-semibold hover:text-primary-light dark:hover:text-primary-dark"
                >
                  {post.title}
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(post.date).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No workouts posted yet.</p>
        )}
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Blog Posts</h2>
        {blogPosts.length > 0 ? (
          <ul className="space-y-4">
            {blogPosts.map((post) => (
              <li
                key={post.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
              >
                <Link
                  href={`/blog/${post.id}`}
                  className="text-lg font-semibold hover:text-primary-light dark:hover:text-primary-dark"
                >
                  {post.title}
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(post.publicationDate).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No blog posts yet.</p>
        )}
      </div>
    </div>
  );
}
