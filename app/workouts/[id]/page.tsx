import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Layout from "@/components/Layout";
import WorkoutPost from "@/components/WorkoutPost";
import Comments from "@/components/Comments";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

export default async function WorkoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const session = await getServerSession(authOptions);

  const workout = await prisma.workoutPost.findUnique({
    where: { id },
    include: {
      author: { select: { name: true } },
      likes: true,
      comments: {
        include: { author: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!workout) {
    notFound();
  }

  const isLiked = session
    ? workout.likes.some((like) => like.userId === session.user.id)
    : false;

  const formattedComments = workout.comments.map((comment) => ({
    ...comment,
    createdAt: comment.createdAt.toISOString(),
    updatedAt: comment.updatedAt.toISOString(),
  }));

  return (
    <Layout>
      <div className="min-h-screen bg-background-light dark:bg-background-dark">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <WorkoutPost
            id={workout.id}
            title={workout.title}
            description={workout.description}
            date={workout.date.toISOString()}
            duration={workout.duration}
            tags={workout.tags}
            likes={workout.likes.length}
            isLiked={isLiked}
          />
          <Comments postId={workout.id} initialComments={formattedComments} />
        </div>
      </div>
    </Layout>
  );
}
