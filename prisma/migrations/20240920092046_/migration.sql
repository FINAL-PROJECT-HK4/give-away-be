/*
  Warnings:

  - A unique constraint covering the columns `[invited_user]` on the table `ReferralInvitations` will be added. If there are existing duplicate values, this will fail.
  - Made the column `invited_user` on table `ReferralInvitations` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ReferralInvitations" DROP CONSTRAINT "ReferralInvitations_user_id_fkey";

-- AlterTable
ALTER TABLE "ReferralInvitations" ALTER COLUMN "invited_user" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ReferralInvitations_invited_user_key" ON "ReferralInvitations"("invited_user");

-- AddForeignKey
ALTER TABLE "ReferralInvitations" ADD CONSTRAINT "ReferralInvitations_invited_user_fkey" FOREIGN KEY ("invited_user") REFERENCES "User"("telegram_id") ON DELETE RESTRICT ON UPDATE CASCADE;
