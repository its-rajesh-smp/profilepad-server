-- CreateEnum
CREATE TYPE "LayoutItemType" AS ENUM ('text', 'image', 'link');

-- CreateTable
CREATE TABLE "Layout" (
    "id" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "Layout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LayoutItem" (
    "id" TEXT NOT NULL,
    "type" "LayoutItemType" NOT NULL,
    "link" TEXT,
    "text" TEXT,
    "src" TEXT,
    "metadata" JSONB,
    "layoutId" TEXT NOT NULL,

    CONSTRAINT "LayoutItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LayoutItem" ADD CONSTRAINT "LayoutItem_layoutId_fkey" FOREIGN KEY ("layoutId") REFERENCES "Layout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
