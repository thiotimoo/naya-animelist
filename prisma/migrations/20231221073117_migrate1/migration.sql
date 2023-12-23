/*
  Warnings:

  - Added the required column `anime_image` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anime_title` to the `Collection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `collection` ADD COLUMN `anime_image` VARCHAR(191) NOT NULL,
    ADD COLUMN `anime_title` VARCHAR(191) NOT NULL;
