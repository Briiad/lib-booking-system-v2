/*
  Warnings:

  - Added the required column `session_id` to the `Riwayat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Riwayat" ADD COLUMN     "session_id" TEXT NOT NULL;
