/*
  Warnings:

  - You are about to drop the column `layoutId` on the `LayoutItem` table. All the data in the column will be lost.
  - You are about to drop the `Layout` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `layoutGroupId` to the `LayoutItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LayoutItem" DROP CONSTRAINT "LayoutItem_layoutId_fkey";

-- AlterTable
ALTER TABLE "LayoutItem" DROP COLUMN "layoutId",
ADD COLUMN     "layoutGroupId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Layout";

-- CreateTable
CREATE TABLE "LayoutGroup" (
    "id" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "LayoutGroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LayoutItem" ADD CONSTRAINT "LayoutItem_layoutGroupId_fkey" FOREIGN KEY ("layoutGroupId") REFERENCES "LayoutGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
