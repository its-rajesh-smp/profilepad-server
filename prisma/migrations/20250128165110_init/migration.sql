/*
  Warnings:

  - You are about to drop the column `gridLayouts` on the `Dashboard` table. All the data in the column will be lost.
  - Added the required column `layouts` to the `Dashboard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dashboard" DROP COLUMN "gridLayouts",
ADD COLUMN     "layouts" JSONB NOT NULL;
