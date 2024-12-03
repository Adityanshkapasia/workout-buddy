"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-neumorphic-light dark:shadow-neumorphic-dark">
      <h2 className="text-3xl font-bold text-center mb-6 text-primary-light dark:text-primary-dark">
        Sign In
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-primary-light dark:focus:border-primary-dark focus:outline-none transition-colors"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-primary-light dark:focus:border-primary-dark focus:outline-none transition-colors"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:bg-opacity-90 transition-colors duration-200 shadow-neumorphic-light dark:shadow-neumorphic-dark"
        >
          Sign In
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        Dont have an account?{" "}
        <Link
          href="/auth/signup"
          className="text-primary-light dark:text-primary-dark hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
