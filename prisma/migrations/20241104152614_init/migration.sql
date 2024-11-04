/*
  Warnings:

  - You are about to drop the column `layoutGroupId` on the `LayoutItem` table. All the data in the column will be lost.
  - You are about to drop the `LayoutGroup` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dashboardId` to the `LayoutItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LayoutGroup" DROP CONSTRAINT "LayoutGroup_userId_fkey";

-- DropForeignKey
ALTER TABLE "LayoutItem" DROP CONSTRAINT "LayoutItem_layoutGroupId_fkey";

-- AlterTable
ALTER TABLE "LayoutItem" DROP COLUMN "layoutGroupId",
ADD COLUMN     "dashboardId" TEXT NOT NULL;

-- DropTable
DROP TABLE "LayoutGroup";

-- CreateTable
CREATE TABLE "Dashboard" (
    "id" TEXT NOT NULL,
    "gridLayoutConfig" JSONB NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Dashboard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dashboard_userId_key" ON "Dashboard"("userId");

-- AddForeignKey
ALTER TABLE "Dashboard" ADD CONSTRAINT "Dashboard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LayoutItem" ADD CONSTRAINT "LayoutItem_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "Dashboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;
