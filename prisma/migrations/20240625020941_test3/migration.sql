/*
  Warnings:

  - The primary key for the `Pinjam_Ruang` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `room_name` on the `Pinjam_Ruang` table. All the data in the column will be lost.
  - You are about to drop the column `session` on the `Pinjam_Ruang` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Pinjam_Ruang` table. All the data in the column will be lost.
  - The `id` column on the `Pinjam_Ruang` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `createdAt` on the `Ruangan` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Ruangan` table. All the data in the column will be lost.
  - You are about to drop the `History` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[room_id,session_id,date]` on the table `Pinjam_Ruang` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `session_id` to the `Pinjam_Ruang` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pinjam_Ruang" DROP CONSTRAINT "Pinjam_Ruang_pkey",
DROP COLUMN "room_name",
DROP COLUMN "session",
DROP COLUMN "startDate",
ADD COLUMN     "session_id" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Pinjam_Ruang_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Ruangan" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- DropTable
DROP TABLE "History";

-- CreateTable
CREATE TABLE "Sesi" (
    "session_id" TEXT NOT NULL,
    "session" INTEGER NOT NULL,
    "room_id" TEXT NOT NULL,

    CONSTRAINT "Sesi_pkey" PRIMARY KEY ("session_id")
);

-- CreateTable
CREATE TABLE "Riwayat" (
    "id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_nim" VARCHAR(255) NOT NULL,
    "user_mail" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,
    "room_name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "session" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Riwayat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sesi_room_id_session_key" ON "Sesi"("room_id", "session");

-- CreateIndex
CREATE UNIQUE INDEX "Riwayat_user_nim_key" ON "Riwayat"("user_nim");

-- CreateIndex
CREATE UNIQUE INDEX "Pinjam_Ruang_room_id_session_id_date_key" ON "Pinjam_Ruang"("room_id", "session_id", "date");

-- AddForeignKey
ALTER TABLE "Sesi" ADD CONSTRAINT "Sesi_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Ruangan"("room_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pinjam_Ruang" ADD CONSTRAINT "Pinjam_Ruang_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "Sesi"("session_id") ON DELETE RESTRICT ON UPDATE CASCADE;
