import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Task Categories
  const taskCategories = await prisma.taskCategory.createMany({
    data: [
      { name: 'Category 1', minuteWait: 10, social: 'Facebook' },
      { name: 'Category 2', minuteWait: 20, social: 'Twitter' },
      { name: 'Category 3', minuteWait: 30, social: 'Instagram' },
      { name: 'Category 4', minuteWait: 40, social: 'LinkedIn' },
      { name: 'Category 5', minuteWait: 50, social: 'Snapchat' },
    ],
  });

  // Fetch created task categories
  const category1 = await prisma.taskCategory.findFirst({
    where: { name: 'Category 1' },
  });
  const category2 = await prisma.taskCategory.findFirst({
    where: { name: 'Category 2' },
  });
  const category3 = await prisma.taskCategory.findFirst({
    where: { name: 'Category 3' },
  });

  // Seed Tasks
  const tasks = await prisma.task.createMany({
    data: [
      {
        name: 'Task 1',
        rewardPoint: 100,
        status: 'active',
        idTaskCategory: category1?.id ?? '',
      },
      {
        name: 'Task 2',
        rewardPoint: 150,
        status: 'inactive',
        idTaskCategory: category2?.id ?? '',
      },
      {
        name: 'Task 3',
        rewardPoint: 200,
        status: 'active',
        idTaskCategory: category3?.id ?? '',
      },
      {
        name: 'Task 4',
        rewardPoint: 250,
        status: 'inactive',
        idTaskCategory: category1?.id ?? '',
      },
      {
        name: 'Task 5',
        rewardPoint: 300,
        status: 'active',
        idTaskCategory: category2?.id ?? '',
      },
    ],
  });

  // Seed Users
  const users = await prisma.user.createMany({
    data: [
      {
        telegramId: '12345',
        firstname: 'John',
        lastname: 'Doe',
        inviteCode: 'ABCD123',
        rewardPoint: 200,
      },
      {
        telegramId: '67890',
        firstname: 'Jane',
        lastname: 'Smith',
        inviteCode: 'XYZ987',
        rewardPoint: 300,
      },
      {
        telegramId: '54321',
        firstname: 'Tom',
        lastname: 'Brown',
        inviteCode: 'LMNOP123',
        rewardPoint: 150,
      },
      {
        telegramId: '98765',
        firstname: 'Alice',
        lastname: 'Johnson',
        inviteCode: 'QWERTY',
        rewardPoint: 250,
      },
      {
        telegramId: '24680',
        firstname: 'Bob',
        lastname: 'Miller',
        inviteCode: 'ASDFG',
        rewardPoint: 180,
      },
    ],
  });

  // Fetch created tasks and users
  const task1 = await prisma.task.findFirst({ where: { name: 'Task 1' } });
  const task2 = await prisma.task.findFirst({ where: { name: 'Task 2' } });
  const task3 = await prisma.task.findFirst({ where: { name: 'Task 3' } });
  const user1 = await prisma.user.findFirst({ where: { telegramId: '12345' } });
  const user2 = await prisma.user.findFirst({ where: { telegramId: '67890' } });
  const user3 = await prisma.user.findFirst({ where: { telegramId: '54321' } });

  // Seed User Tasks
  const userTasks = await prisma.userTask.createMany({
    data: [
      {
        taskId: task1?.id ?? '',
        userTelegramId: user1?.telegramId ?? '',
        userInviteCode: user1?.inviteCode ?? '',
        rewardPoint: 50,
        status: 'ready',
      },
      {
        taskId: task2?.id ?? '',
        userTelegramId: user2?.telegramId ?? '',
        userInviteCode: user2?.inviteCode ?? '',
        rewardPoint: 75,
        status: 'claimed',
      },
      {
        taskId: task3?.id ?? '',
        userTelegramId: user3?.telegramId ?? '',
        userInviteCode: user3?.inviteCode ?? '',
        rewardPoint: 100,
        status: 'ready',
      },
      {
        taskId: task1?.id ?? '',
        userTelegramId: user2?.telegramId ?? '',
        userInviteCode: user2?.inviteCode ?? '',
        rewardPoint: 120,
        status: 'claimed',
      },
      {
        taskId: task2?.id ?? '',
        userTelegramId: user1?.telegramId ?? '',
        userInviteCode: user1?.inviteCode ?? '',
        rewardPoint: 200,
        status: 'ready',
      },
    ],
  });

  console.log('Data seeded successfully.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
