"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Layout from "../components/Layout";
import HomeContent from "./HomeContent";

export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout>
      <HomeContent />
      {session ? (
        <p>Welcome, {session.user.name}!</p>
      ) : (
        <p>Please sign in to access all features.</p>
      )}
    </Layout>
  );
}
