/*
  Warnings:

  - Added the required column `groupParent` to the `Folder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Folder` ADD COLUMN `groupParent` VARCHAR(191) NOT NULL;
