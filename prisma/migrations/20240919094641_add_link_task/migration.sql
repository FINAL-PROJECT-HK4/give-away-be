/*
  Warnings:

  - A unique constraint covering the columns `[user_telegram_id,task_id]` on the table `UserTask` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "link" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "UserTask_user_telegram_id_task_id_key" ON "UserTask"("user_telegram_id", "task_id");
