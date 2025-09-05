/*
  Warnings:

  - Added the required column `dept` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customer` ADD COLUMN `dept` VARCHAR(191) NOT NULL;
