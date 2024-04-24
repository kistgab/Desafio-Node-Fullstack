/*
  Warnings:

  - You are about to drop the column `placeId` on the `entries` table. All the data in the column will be lost.
  - You are about to drop the column `placeId` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `placeId` on the `ticket_gates` table. All the data in the column will be lost.
  - Added the required column `place_id` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "entries" DROP CONSTRAINT "entries_placeId_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_placeId_fkey";

-- DropForeignKey
ALTER TABLE "ticket_gates" DROP CONSTRAINT "ticket_gates_placeId_fkey";

-- AlterTable
ALTER TABLE "entries" DROP COLUMN "placeId",
ADD COLUMN     "place_id" TEXT;

-- AlterTable
ALTER TABLE "events" DROP COLUMN "placeId",
ADD COLUMN     "place_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ticket_gates" DROP COLUMN "placeId",
ADD COLUMN     "place_id" TEXT;

-- AddForeignKey
ALTER TABLE "entries" ADD CONSTRAINT "entries_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_gates" ADD CONSTRAINT "ticket_gates_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
