-- CreateEnum
CREATE TYPE "PlaceType" AS ENUM ('Stadium', 'Teather', 'Other');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('Soccer', 'Show', 'Presentation', 'Other');

-- CreateTable
CREATE TABLE "places" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nickname" TEXT,
    "type" "PlaceType" NOT NULL,
    "cpnj" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "contact_phone" TEXT NOT NULL,
    "contact_email" TEXT NOT NULL,

    CONSTRAINT "places_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "places_addresses" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "complement" TEXT,
    "place_id" TEXT NOT NULL,

    CONSTRAINT "places_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "placeId" TEXT,

    CONSTRAINT "entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_gates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "placeId" TEXT,

    CONSTRAINT "ticket_gates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" "EventType" NOT NULL,
    "contact_phone" TEXT,
    "contact_email" TEXT NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "places_name_key" ON "places"("name");

-- CreateIndex
CREATE INDEX "places_name_idx" ON "places"("name");

-- CreateIndex
CREATE UNIQUE INDEX "places_addresses_place_id_key" ON "places_addresses"("place_id");

-- AddForeignKey
ALTER TABLE "places_addresses" ADD CONSTRAINT "places_addresses_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entries" ADD CONSTRAINT "entries_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_gates" ADD CONSTRAINT "ticket_gates_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
