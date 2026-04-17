/*
  Warnings:

  - Made the column `excerpt` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `coverImage` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `metaTitle` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `metaDescription` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "excerpt" SET NOT NULL,
ALTER COLUMN "coverImage" SET NOT NULL,
ALTER COLUMN "metaTitle" SET NOT NULL,
ALTER COLUMN "metaDescription" SET NOT NULL;
