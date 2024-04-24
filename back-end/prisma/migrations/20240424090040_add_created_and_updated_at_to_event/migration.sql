/*
  Warnings:

  - You are about to drop the column `createdAt` on the `places` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `places` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `places` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "places" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
