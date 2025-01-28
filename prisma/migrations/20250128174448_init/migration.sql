/*
  Warnings:

  - You are about to drop the column `type` on the `LayoutItem` table. All the data in the column will be lost.
  - Added the required column `variant` to the `LayoutItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LayoutItem" DROP COLUMN "type",
ADD COLUMN     "variant" "LayoutItemType" NOT NULL;
