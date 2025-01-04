/*
  Warnings:

  - You are about to drop the `Blog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BlogLayoutLink` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_userId_fkey";

-- DropForeignKey
ALTER TABLE "BlogLayoutLink" DROP CONSTRAINT "BlogLayoutLink_blogId_fkey";

-- DropForeignKey
ALTER TABLE "BlogLayoutLink" DROP CONSTRAINT "BlogLayoutLink_layoutItemId_fkey";

-- DropForeignKey
ALTER TABLE "BlogLayoutLink" DROP CONSTRAINT "BlogLayoutLink_userId_fkey";

-- DropTable
DROP TABLE "Blog";

-- DropTable
DROP TABLE "BlogLayoutLink";
