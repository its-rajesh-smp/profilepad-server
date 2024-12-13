-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('default', 'google');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "authProvider" "AuthProvider" NOT NULL DEFAULT 'default',
ALTER COLUMN "password" DROP NOT NULL;
