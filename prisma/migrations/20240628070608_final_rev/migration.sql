/*
  Warnings:

  - Changed the type of `session` on the `Riwayat` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Riwayat" DROP COLUMN "session",
ADD COLUMN     "session" INTEGER NOT NULL;
