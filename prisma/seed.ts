import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // First, let's create a user to associate with the workouts
  const user = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    },
  });

  // Now, let's create 10 random workout posts
  for (let i = 0; i < 50; i++) {
    await prisma.workoutPost.create({
      data: {
        title: faker.lorem.words(3),
        description: faker.lorem.paragraph(),
        date: faker.date.past(),
        duration: faker.number.int({ min: 15, max: 120 }),
        tags: faker.helpers.arrayElements(
          ["cardio", "strength", "flexibility", "endurance", "hiit"],
          faker.number.int({ min: 1, max: 3 })
        ),
        authorId: user.id,
      },
    });
  }

  console.log("Seed data created successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
