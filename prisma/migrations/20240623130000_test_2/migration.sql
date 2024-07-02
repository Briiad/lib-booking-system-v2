/*
  Warnings:

  - You are about to drop the `Ruangan_Pinjam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Ruangan_Pinjam";

-- CreateTable
CREATE TABLE "Pinjam_Ruang" (
    "id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_nim" TEXT NOT NULL,
    "user_mail" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,
    "room_name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "session" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pinjam_Ruang_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pinjam_Ruang" ADD CONSTRAINT "Pinjam_Ruang_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Ruangan"("room_id") ON DELETE RESTRICT ON UPDATE CASCADE;
