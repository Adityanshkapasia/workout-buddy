import prisma from "@/lib/prisma";
import Link from "next/link";
import Layout from "@/components/Layout";

export default async function BlogPage() {
  const blogPosts = await prisma.blogPost.findMany({
    orderBy: { publicationDate: "desc" },
    include: { author: { select: { name: true } } },
  });

  return (
    <Layout>
      <div className="min-h-screen bg-background-light dark:bg-background-dark">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary-light to-secondary-light text-transparent bg-clip-text">
            Fitness Blog
          </h1>
          <Link
            href="/blog/create"
            className="block w-full max-w-md mx-auto mb-8 py-3 px-6 text-center text-white font-bold rounded-lg bg-gradient-to-r from-primary-light to-secondary-light hover:from-primary-dark hover:to-secondary-dark transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Create New Blog Post
          </Link>
          <div className="grid gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                <Link href={`/blog/${post.id}`}>
                  <h2 className="text-2xl font-bold mb-2 hover:text-primary-light dark:hover:text-primary-dark">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  By {post.author.name} on{" "}
                  {new Date(post.publicationDate).toLocaleDateString()}
                </p>
                <div
                  className="mb-4 prose dark:prose-invert max-w-none line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                <Link
                  href={`/blog/${post.id}`}
                  className="text-primary-light dark:text-primary-dark hover:underline"
                >
                  Read more
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
