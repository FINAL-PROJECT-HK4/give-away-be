-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "UserTaskStatus" AS ENUM ('init', 'ready', 'claimed');

-- CreateTable
CREATE TABLE "TaskCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "minuteWait" INTEGER NOT NULL,
    "social" TEXT,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "create_update" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rewardPoint" INTEGER NOT NULL DEFAULT 0,
    "status" "TaskStatus" NOT NULL DEFAULT 'active',
    "idTaskCategory" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTask" (
    "taskId" TEXT NOT NULL,
    "userTelegramId" TEXT NOT NULL,
    "userInviteCode" TEXT NOT NULL,
    "rewardPoint" INTEGER NOT NULL DEFAULT 0,
    "status" "UserTaskStatus" NOT NULL DEFAULT 'init',

    CONSTRAINT "UserTask_pkey" PRIMARY KEY ("taskId","userTelegramId","userInviteCode")
);

-- CreateTable
CREATE TABLE "User" (
    "telegramId" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "inviteCode" TEXT NOT NULL,
    "rewardPoint" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("telegramId","inviteCode")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_idTaskCategory_fkey" FOREIGN KEY ("idTaskCategory") REFERENCES "TaskCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTask" ADD CONSTRAINT "UserTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTask" ADD CONSTRAINT "UserTask_userTelegramId_userInviteCode_fkey" FOREIGN KEY ("userTelegramId", "userInviteCode") REFERENCES "User"("telegramId", "inviteCode") ON DELETE RESTRICT ON UPDATE CASCADE;
