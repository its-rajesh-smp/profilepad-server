/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `LayoutGroup` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `LayoutItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `LayoutGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `LayoutItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LayoutGroup" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "LayoutItem" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "LayoutGroup_userId_key" ON "LayoutGroup"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "LayoutItem_userId_key" ON "LayoutItem"("userId");

-- AddForeignKey
ALTER TABLE "LayoutGroup" ADD CONSTRAINT "LayoutGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LayoutItem" ADD CONSTRAINT "LayoutItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
