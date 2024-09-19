import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Seed User table
  await prisma.user.createMany({
    data: [
      {
        telegram_id: '1001',
        user_name: 'John Doe',
        invite_code: 'INV123',
        reward_point: 500,
      },
      {
        telegram_id: '1002',
        user_name: 'Jane Smith',
        invite_code: 'INV456',
        reward_point: 300,
      },
      {
        telegram_id: '1003',
        user_name: 'Emily Johnson',
        invite_code: 'INV789',
        reward_point: 700,
      },
      {
        telegram_id: '1004',
        user_name: 'Michael Brown',
        invite_code: 'INV101',
        reward_point: 200,
      },
      {
        telegram_id: '1005',
        user_name: 'Sarah Davis',
        invite_code: 'INV202',
        reward_point: 150,
      },
      {
        telegram_id: '1006',
        user_name: 'Chris Wilson',
        invite_code: 'INV303',
        reward_point: 350,
      },
      {
        telegram_id: '1007',
        user_name: 'Patricia Lee',
        invite_code: 'INV404',
        reward_point: 450,
      },
      {
        telegram_id: '1008',
        user_name: 'Linda Taylor',
        invite_code: 'INV505',
        reward_point: 250,
      },
      {
        telegram_id: '1009',
        user_name: 'Barbara Anderson',
        invite_code: 'INV606',
        reward_point: 100,
      },
      {
        telegram_id: '1010',
        user_name: 'James Moore',
        invite_code: 'INV707',
        reward_point: 600,
      },
    ],
  });

  // Seed TaskCategory table
  await prisma.taskCategory.createMany({
    data: [
      { id: 'cat1', name: 'Social Media', seconds_wait: 15, social: 'Facebook' },
      {
        id: 'cat2',
        name: 'Coding Challenges',
        seconds_wait: 30,
        social: 'GitHub',
      },
      { id: 'cat3', name: 'Learning Modules', seconds_wait: 60 },
      { id: 'cat4', name: 'Marketing', seconds_wait: 20, social: 'Instagram' },
      { id: 'cat5', name: 'Support Tasks', seconds_wait: 40 },
    ],
  });

  // Seed Task table
  await prisma.task.createMany({
    data: [
      {
        id: 'task1',
        name: 'Share Post on Facebook',
        reward_point: 50,
        status: 'active',
        id_task_category: 'cat1',
        link: "https://web.telegram.org/a/#7279624956",
        icon: 'https://res.cloudinary.com/doguzyfn7/image/upload/v1726214777/icons8-telegram-50_zpupai.png',
      },
      {
        id: 'task2',
        name: 'Complete GitHub Issue',
        reward_point: 100,
        status: 'active',
        id_task_category: 'cat2',
         link: "https://web.telegram.org/a/#7279624956",
        icon: 'https://res.cloudinary.com/doguzyfn7/image/upload/v1726214777/icons8-telegram-50_zpupai.png',
      },
      {
        id: 'task3',
        name: 'Finish JavaScript Module',
        reward_point: 150,
        status: 'inactive',
        id_task_category: 'cat3',
         link: "https://web.telegram.org/a/#7279624956",
        icon: 'https://res.cloudinary.com/doguzyfn7/image/upload/v1726214777/icons8-telegram-50_zpupai.png',
      },
      {
        id: 'task4',
        name: 'Retweet on Twitter',
        reward_point: 50,
        status: 'active',
        id_task_category: 'cat1',
         link: "https://web.telegram.org/a/#7279624956",
        icon: 'https://res.cloudinary.com/doguzyfn7/image/upload/v1726214777/icons8-telegram-50_zpupai.png',
      },
      {
        id: 'task5',
        name: 'Instagram Story',
        reward_point: 30,
        status: 'active',
        id_task_category: 'cat4',
         link: "https://web.telegram.org/a/#7279624956",
        icon: 'https://res.cloudinary.com/doguzyfn7/image/upload/v1726214777/icons8-telegram-50_zpupai.png',
      },
      {
        id: 'task6',
        name: 'Resolve Support Ticket',
        reward_point: 120,
        status: 'active',
        id_task_category: 'cat5',
         link: "https://web.telegram.org/a/#7279624956",
        icon: 'https://res.cloudinary.com/doguzyfn7/image/upload/v1726214777/icons8-telegram-50_zpupai.png',
      },
      {
        id: 'task7',
        name: 'LinkedIn Post',
        reward_point: 40,
        status: 'inactive',
        id_task_category: 'cat1',
         link: "https://web.telegram.org/a/#7279624956",
        icon: 'https://res.cloudinary.com/doguzyfn7/image/upload/v1726214777/icons8-telegram-50_zpupai.png',
      },
      {
        id: 'task8',
        name: 'GitHub PR Review',
        reward_point: 90,
        status: 'active',
        id_task_category: 'cat2',
         link: "https://web.telegram.org/a/#7279624956",
        icon: 'https://res.cloudinary.com/doguzyfn7/image/upload/v1726214777/icons8-telegram-50_zpupai.png',
      },
      {
        id: 'task9',
        name: 'Complete CSS Module',
        reward_point: 80,
        status: 'active',
        id_task_category: 'cat3',
         link: "https://web.telegram.org/a/#7279624956",
        icon: 'https://res.cloudinary.com/doguzyfn7/image/upload/v1726214777/icons8-telegram-50_zpupai.png',
      },
      {
        id: 'task10',
        name: 'Answer Support Query',
        reward_point: 110,
        status: 'inactive',
        id_task_category: 'cat5',
         link: "https://web.telegram.org/a/#7279624956",
        icon: 'https://res.cloudinary.com/doguzyfn7/image/upload/v1726214777/icons8-telegram-50_zpupai.png',
      },
    ],
  });

  // Seed UserTask table
  await prisma.userTask.createMany({
    data: [
      {
        task_id: 'task1',
        user_telegram_id: '1001',
        reward_point: 50,
        status: 'claimed',
      },
      {
        task_id: 'task2',
        user_telegram_id: '1002',
        reward_point: 100,
        status: 'ready',
      },
      {
        task_id: 'task3',
        user_telegram_id: '1003',
        reward_point: 150,
        status: 'init',
      },
      {
        task_id: 'task4',
        user_telegram_id: '1004',
        reward_point: 50,
        status: 'claimed',
      },
      {
        task_id: 'task5',
        user_telegram_id: '1005',
        reward_point: 30,
        status: 'ready',
      },
      {
        task_id: 'task6',
        user_telegram_id: '1006',
        reward_point: 120,
        status: 'claimed',
      },
      {
        task_id: 'task7',
        user_telegram_id: '1007',
        reward_point: 40,
        status: 'init',
      },
      {
        task_id: 'task8',
        user_telegram_id: '1008',
        reward_point: 90,
        status: 'ready',
      },
      {
        task_id: 'task9',
        user_telegram_id: '1009',
        reward_point: 80,
        status: 'claimed',
      },
      {
        task_id: 'task10',
        user_telegram_id: '1010',
        reward_point: 110,
        status: 'ready',
      },
    ],
  });

  // Seed ReferralInvitations table
  await prisma.referralInvitations.createMany({
    data: [
      { user_id: '1001', invited_user: 'friend1', invite_code: 'INV123' },
      { user_id: '1002', invited_user: 'friend2', invite_code: 'INV456' },
      { user_id: '1003', invited_user: 'friend3', invite_code: 'INV789' },
      { user_id: '1004', invited_user: 'friend4', invite_code: 'INV101' },
      { user_id: '1005', invited_user: 'friend5', invite_code: 'INV202' },
      { user_id: '1006', invited_user: 'friend6', invite_code: 'INV303' },
      { user_id: '1007', invited_user: 'friend7', invite_code: 'INV404' },
      { user_id: '1008', invited_user: 'friend8', invite_code: 'INV505' },
      { user_id: '1009', invited_user: 'friend9', invite_code: 'INV606' },
      { user_id: '1010', invited_user: 'friend10', invite_code: 'INV707' },
    ],
  });

  // Seed DailyCheckin table
  await prisma.dailyCheckin.createMany({
    data: [
      {
        user_id: '1001',
        checkin_date: new Date(),
        consecutive_days: 3,
        reward_points: 150,
      },
      {
        user_id: '1002',
        checkin_date: new Date(),
        consecutive_days: 5,
        reward_points: 250,
      },
      {
        user_id: '1003',
        checkin_date: new Date(),
        consecutive_days: 1,
        reward_points: 50,
      },
      {
        user_id: '1004',
        checkin_date: new Date(),
        consecutive_days: 2,
        reward_points: 100,
      },
      {
        user_id: '1005',
        checkin_date: new Date(),
        consecutive_days: 4,
        reward_points: 200,
      },
      {
        user_id: '1006',
        checkin_date: new Date(),
        consecutive_days: 6,
        reward_points: 300,
      },
      {
        user_id: '1007',
        checkin_date: new Date(),
        consecutive_days: 1,
        reward_points: 50,
      },
      {
        user_id: '1008',
        checkin_date: new Date(),
        consecutive_days: 7,
        reward_points: 350,
      },
      {
        user_id: '1009',
        checkin_date: new Date(),
        consecutive_days: 3,
        reward_points: 150,
      },
      {
        user_id: '1010',
        checkin_date: new Date(),
        consecutive_days: 5,
        reward_points: 250,
      },
    ],
  });
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
