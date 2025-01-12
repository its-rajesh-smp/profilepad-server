/*
  Warnings:

  - Added the required column `dashboardSetting` to the `Dashboard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dashboard" ADD COLUMN     "dashboardSetting" JSONB NOT NULL;
