import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const id = (await params).id;

  const post = await prisma.blogPost.findUnique({
    where: { id },
    include: { author: { select: { name: true } } },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-primary-light to-secondary-light text-transparent bg-clip-text">
          {post.title}
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          By {post.author.name} on{" "}
          {new Date(post.publicationDate).toLocaleDateString()}
        </p>
        <div className="prose dark:prose-invert max-w-none">
          {post.content.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
