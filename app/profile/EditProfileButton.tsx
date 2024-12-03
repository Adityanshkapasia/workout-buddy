"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProfileButton() {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/user/update-bio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bio }),
    });

    if (response.ok) {
      setIsEditing(false);
      router.refresh();
    }
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-2 border rounded"
          rows={4}
        />
        <div className="mt-2">
          <button
            type="submit"
            className="bg-primary-light dark:bg-primary-dark text-white px-4 py-2 rounded mr-2"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="bg-gray-300 dark:bg-gray-600 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <button
      onClick={() => setIsEditing(true)}
      className="mt-4 bg-secondary-light dark:bg-secondary-dark text-white px-4 py-2 rounded"
    >
      Edit Bio
    </button>
  );
}
