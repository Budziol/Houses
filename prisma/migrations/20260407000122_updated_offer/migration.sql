/*
  Warnings:

  - Added the required column `badge` to the `Offer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "badge" TEXT NOT NULL;
