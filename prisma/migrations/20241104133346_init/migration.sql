/*
  Warnings:

  - You are about to drop the column `authId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Auth` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_authId_fkey";

-- DropIndex
DROP INDEX "User_authId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "authId";

-- DropTable
DROP TABLE "Auth";
