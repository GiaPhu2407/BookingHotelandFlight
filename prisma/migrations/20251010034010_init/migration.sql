-- AlterTable
ALTER TABLE `customers` ADD COLUMN `resetCode` VARCHAR(191) NULL,
    ADD COLUMN `resetToken` VARCHAR(191) NULL,
    ADD COLUMN `resetTokenExpiry` DATETIME(3) NULL;
