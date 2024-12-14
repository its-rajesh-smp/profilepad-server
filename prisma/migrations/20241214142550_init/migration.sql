-- CreateTable
CREATE TABLE "BlogLayoutLink" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "layoutItemId" TEXT NOT NULL,

    CONSTRAINT "BlogLayoutLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" JSONB,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BlogLayoutLink_layoutItemId_key" ON "BlogLayoutLink"("layoutItemId");

-- AddForeignKey
ALTER TABLE "BlogLayoutLink" ADD CONSTRAINT "BlogLayoutLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogLayoutLink" ADD CONSTRAINT "BlogLayoutLink_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogLayoutLink" ADD CONSTRAINT "BlogLayoutLink_layoutItemId_fkey" FOREIGN KEY ("layoutItemId") REFERENCES "LayoutItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
