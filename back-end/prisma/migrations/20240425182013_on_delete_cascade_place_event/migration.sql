-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_place_id_fkey";

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE;
