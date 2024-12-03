import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import ProfileBanner from "./ProfileBanner";
import UserPosts from "./UserPosts";
import EditProfileButton from "./EditProfileButton";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      workoutPosts: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
      blogPosts: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <ProfileBanner user={user} />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Bio</h2>
          <p>{user.bio || "No bio yet."}</p>
          <EditProfileButton />
        </div>
        <UserPosts
          workoutPosts={user.workoutPosts}
          blogPosts={user.blogPosts}
        />
      </div>
    </div>
  );
}
