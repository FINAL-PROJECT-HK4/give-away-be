/*
  Warnings:

  - A unique constraint covering the columns `[user_telegram_id,task_id]` on the table `UserTask` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `link` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "link" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserTask_user_telegram_id_task_id_key" ON "UserTask"("user_telegram_id", "task_id");
