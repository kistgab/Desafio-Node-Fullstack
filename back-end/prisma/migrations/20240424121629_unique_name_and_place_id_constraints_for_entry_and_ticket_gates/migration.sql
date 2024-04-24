/*
  Warnings:

  - A unique constraint covering the columns `[name,place_id]` on the table `entries` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,place_id]` on the table `ticket_gates` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "entries_name_place_id_key" ON "entries"("name", "place_id");

-- CreateIndex
CREATE UNIQUE INDEX "ticket_gates_name_place_id_key" ON "ticket_gates"("name", "place_id");
