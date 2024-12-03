import { NextResponse } from "next/server";
import { createUser } from "@/utils/user";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    const user = await createUser(name, email, password);
    return NextResponse.json(
      { user: { id: user.id, name: user.name, email: user.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "User creation failed" },
      { status: 500 }
    );
  }
}
