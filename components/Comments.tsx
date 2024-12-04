"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  workoutId: string | null;
  blogId: string | null;
  authorId: string;
}

interface CommentsProps {
  postId: string;
  initialComments: Comment[];
}

const Comments: React.FC<CommentsProps> = ({ postId, initialComments }) => {
  const { data: session } = useSession();
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment, workoutId: postId }),
      });
      if (response.ok) {
        const createdComment: Comment = await response.json();
        setComments((prevComments) => [...prevComments, createdComment]);
        setNewComment("");
      } else {
        console.error("Failed to post comment");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-secondary-light/20 to-primary-light/20 dark:from-secondary-dark/20 dark:to-primary-dark/20">
      <h3 className="text-2xl font-bold mb-4">Comments</h3>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
        >
          <p className="text-gray-600 dark:text-gray-400">{comment.content}</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            By {comment.author.name} on{" "}
            {new Date(comment.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
      {session && (
        <form onSubmit={handleSubmit} className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 rounded-lg bg-white dark:bg-gray-800 border-2 border-transparent focus:border-primary-light dark:focus:border-primary-dark focus:outline-none transition-colors"
            rows={3}
            placeholder="Write a comment..."
            required
            disabled={isSubmitting}
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-primary-light text-white rounded-lg hover:bg-primary-dark transition-colors duration-200 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Comments;
