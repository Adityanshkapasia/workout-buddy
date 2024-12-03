import { NextResponse } from "next/server";
import { createUser } from "@/utils/user";

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  try {
    const user = await createUser(name, email, password);
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
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
