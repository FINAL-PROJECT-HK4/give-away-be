import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Seed User table
  await prisma.user.createMany({
    data: [],
  });

  await prisma.taskCategory.createMany({
    data: [
      {
        id: 'ckx9w8v0i000001l14rqvz8dr',
        name: 'Social',
        seconds_wait: 5,
        social: 'social',
      },
      {
        id: 'ckx9w8v1i000101l14rqvz8ds',
        name: 'MMO Products',
        seconds_wait: 5,
        social: 'products',
      },
    ],
  });

  await prisma.task.createMany({
    data: [
      {
        name: 'Join the Taphoammo Telegram Group/Channel',
        reward_point: 1,
        status: 'active',
        id_task_category: 'ckx9w8v0i000001l14rqvz8dr',
        icon: 'https://res.cloudinary.com/doguzyfn7/image/upload/v1726214777/icons8-telegram-50_zpupai.png',
        link: 'https://t.me/TaphoammoTelegramGroup',
      },
      {
        name: 'Like post WWProxy',
        reward_point: 1,
        status: 'active',
        id_task_category: 'ckx9w8v0i000001l14rqvz8dr',
        icon: 'https://res.cloudinary.com/doguzyfn7/image/upload/v1726214777/icons8-telegram-50_zpupai.png',
        link: 'https://facebook.com/WWProxyPost',
      },
      {
        name: 'Join the Group Facebook',
        reward_point: 1,
        status: 'active',
        id_task_category: 'ckx9w8v0i000001l14rqvz8dr',
        icon: 'https://res.cloudinary.com/doguzyfn7/image/upload/v1726214777/icons8-telegram-50_zpupai.png',
        link: 'https://facebook.com/groups/Taphoammo',
      },
      {
        name: 'Follow Taphoammo on Facebook',
        reward_point: 1,
        status: 'active',
        id_task_category: 'ckx9w8v0i000001l14rqvz8dr',
        icon: 'https://res.cloudinary.com/doguzyfn7/image/upload/v1726214777/icons8-telegram-50_zpupai.png',
        link: 'https://facebook.com/TaphoammoPage',
      },
      {
        name: 'Like and Share a Facebook Post',
        reward_point: 1,
        status: 'active',
        id_task_category: 'ckx9w8v0i000001l14rqvz8dr',
        icon: 'https://res.cloudinary.com/doguzyfn7/image/upload/v1726214777/icons8-telegram-50_zpupai.png',
        link: 'https://facebook.com/TaphoammoPost',
      },
      {
        name: 'Like and Share a X post',
        reward_point: 1,
        status: 'active',
        id_task_category: 'ckx9w8v0i000001l14rqvz8dr',
        icon: 'https://res.cloudinary.com/doguzyfn7/image/upload/v1726214777/icons8-telegram-50_zpupai.png',
        link: 'https://x.com/TaphoammoPost',
      },
      {
        name: 'Mua bán các sản phẩm email',
        reward_point: 1,
        status: 'active',
        id_task_category: 'ckx9w8v1i000101l14rqvz8ds',
        icon: 'https://res.cloudinary.com/doguzyfn7/image/upload/v1726214777/icons8-telegram-50_zpupai.png',
        link: 'https://mmo-products.com/email-products',
      },
      {
        name: 'Mua bán các sản phẩm window key',
        reward_point: 1,
        status: 'active',
        id_task_category: 'ckx9w8v1i000101l14rqvz8ds',
        icon: 'https://res.cloudinary.com/doguzyfn7/image/upload/v1726214777/icons8-telegram-50_zpupai.png',
        link: 'https://mmo-products.com/window-keys',
      },
    ],
  });

  // Seed UserTask table
  await prisma.userTask.createMany({
    data: [],
  });

  // Seed ReferralInvitations table
  await prisma.referralInvitations.createMany({
    data: [],
  });

  // Seed DailyCheckin table
  await prisma.dailyCheckin.createMany({
    data: [],
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
