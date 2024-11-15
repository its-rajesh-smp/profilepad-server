/*
  Warnings:

  - The values [icon] on the enum `LayoutItemType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LayoutItemType_new" AS ENUM ('text', 'image', 'link', 'section', 'empty', 'html');
ALTER TABLE "LayoutItem" ALTER COLUMN "type" TYPE "LayoutItemType_new" USING ("type"::text::"LayoutItemType_new");
ALTER TYPE "LayoutItemType" RENAME TO "LayoutItemType_old";
ALTER TYPE "LayoutItemType_new" RENAME TO "LayoutItemType";
DROP TYPE "LayoutItemType_old";
COMMIT;
