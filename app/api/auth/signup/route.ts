import { NextResponse } from "next/server";
import { createUser } from "@/utils/user";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = await createUser(name, email, password);
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An error occurred during sign up",
      },
      { status: 400 }
    );
  }
}
