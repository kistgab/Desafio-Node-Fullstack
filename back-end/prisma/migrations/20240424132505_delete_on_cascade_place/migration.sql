-- DropForeignKey
ALTER TABLE "entries" DROP CONSTRAINT "entries_place_id_fkey";

-- DropForeignKey
ALTER TABLE "places_addresses" DROP CONSTRAINT "places_addresses_place_id_fkey";

-- DropForeignKey
ALTER TABLE "ticket_gates" DROP CONSTRAINT "ticket_gates_place_id_fkey";

-- AddForeignKey
ALTER TABLE "places_addresses" ADD CONSTRAINT "places_addresses_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entries" ADD CONSTRAINT "entries_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_gates" ADD CONSTRAINT "ticket_gates_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE;
