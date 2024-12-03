import fs from "fs/promises";
import path from "path";
import bcrypt from "bcrypt";
import { UserModel, SafeUser } from "./auth.types";

const USERS_FILE = path.join(process.cwd(), "data", "users.json");

export async function createUser(
  name: string,
  email: string,
  password: string
): Promise<SafeUser> {
  const users = await getUsers();
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: UserModel = {
    id: Date.now().toString(),
    name,
    email,
    password: hashedPassword,
  };

  users.push(newUser);
  await saveUsers(users);

  // Return safe user object without password
  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
  };
}

export async function validateUser(
  email: string,
  password: string
): Promise<SafeUser | null> {
  const users = await getUsers();
  const user = users.find((user) => user.email === email);
  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return null;
  }

  // Return safe user object without password
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

async function getUsers(): Promise<UserModel[]> {
  try {
    const data = await fs.readFile(USERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading users file:", error);
    return [];
  }
}

async function saveUsers(users: UserModel[]): Promise<void> {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}
