/*
  Warnings:

  - A unique constraint covering the columns `[invited_user]` on the table `ReferralInvitations` will be added. If there are existing duplicate values, this will fail.
  - Made the column `invited_user` on table `ReferralInvitations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ReferralInvitations" ALTER COLUMN "invited_user" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ReferralInvitations_invited_user_key" ON "ReferralInvitations"("invited_user");
