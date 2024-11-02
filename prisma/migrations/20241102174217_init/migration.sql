/*
  Warnings:

  - You are about to drop the column `link` on the `LayoutItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LayoutItem" DROP COLUMN "link",
ADD COLUMN     "btnText" TEXT,
ADD COLUMN     "desc" TEXT,
ADD COLUMN     "url" TEXT;
