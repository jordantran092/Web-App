/*
  Warnings:

  - Made the column `searchVector` on table `Page` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Page_searchVector_idx";

-- AlterTable
ALTER TABLE "Page" ALTER COLUMN "parentId" DROP NOT NULL,
ALTER COLUMN "parentId" DROP DEFAULT,
ALTER COLUMN "searchVector" SET NOT NULL;
