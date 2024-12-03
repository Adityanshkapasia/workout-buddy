import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  themePreference: string;
}

export async function createUser(
  name: string,
  email: string,
  password: string
): Promise<User> {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      themePreference: "light", // Default theme preference
    },
  });

  return user;
}

export async function validateUser(
  email: string,
  password: string
): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return null;
  }

  return user;
}

export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}

export async function updateUserTheme(
  id: string,
  theme: string
): Promise<User | null> {
  return prisma.user.update({
    where: { id },
    data: { themePreference: theme },
  });
}
