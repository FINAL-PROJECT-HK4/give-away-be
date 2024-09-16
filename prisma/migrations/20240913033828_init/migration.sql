-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "UserTaskStatus" AS ENUM ('init', 'ready', 'claimed');

-- CreateTable
CREATE TABLE "TaskCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "seconds_wait" INTEGER NOT NULL,
    "social" TEXT,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "create_update" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "reward_point" INTEGER NOT NULL DEFAULT 0,
    "status" "TaskStatus" NOT NULL DEFAULT 'active',
    "icon" TEXT NOT NULL,
    "id_task_category" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTask" (
    "id" TEXT NOT NULL,
    "task_id" TEXT NOT NULL,
    "user_telegram_id" TEXT NOT NULL,
    "reward_point" INTEGER NOT NULL DEFAULT 0,
    "status" "UserTaskStatus" NOT NULL DEFAULT 'init',

    CONSTRAINT "UserTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "telegram_id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "invite_code" TEXT NOT NULL,
    "reward_point" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("telegram_id")
);

-- CreateTable
CREATE TABLE "ReferralInvitations" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "invited_user" TEXT,
    "invite_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReferralInvitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyCheckin" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "checkin_date" TIMESTAMP(3) NOT NULL,
    "consecutive_days" INTEGER NOT NULL DEFAULT 1,
    "reward_points" INTEGER NOT NULL DEFAULT 0,
    "last_checkin_date" TIMESTAMP(3),

    CONSTRAINT "DailyCheckin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_invite_code_key" ON "User"("invite_code");

-- CreateIndex
CREATE UNIQUE INDEX "DailyCheckin_user_id_key" ON "DailyCheckin"("user_id");

-- CreateIndex
CREATE INDEX "checkin_index" ON "DailyCheckin"("user_id", "checkin_date");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_id_task_category_fkey" FOREIGN KEY ("id_task_category") REFERENCES "TaskCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTask" ADD CONSTRAINT "UserTask_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTask" ADD CONSTRAINT "UserTask_user_telegram_id_fkey" FOREIGN KEY ("user_telegram_id") REFERENCES "User"("telegram_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralInvitations" ADD CONSTRAINT "ReferralInvitations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("telegram_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyCheckin" ADD CONSTRAINT "DailyCheckin_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("telegram_id") ON DELETE RESTRICT ON UPDATE CASCADE;
