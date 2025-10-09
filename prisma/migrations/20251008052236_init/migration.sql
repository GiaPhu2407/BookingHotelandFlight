-- CreateTable
CREATE TABLE `customers` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `dateOfBirth` DATETIME(3) NULL,
    `nationality` VARCHAR(191) NULL,
    `passportNumber` VARCHAR(191) NULL,
    `address` TEXT NULL,
    `city` VARCHAR(191) NULL,
    `country` VARCHAR(191) NULL,
    `loyaltyPoints` INTEGER NOT NULL DEFAULT 0,
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `customers_email_key`(`email`),
    INDEX `customers_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employees` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `role` ENUM('ADMIN', 'MANAGER', 'RECEPTIONIST', 'HOUSEKEEPING', 'MAINTENANCE', 'CUSTOMER_SERVICE', 'FLIGHT_COORDINATOR') NOT NULL,
    `department` VARCHAR(191) NULL,
    `hireDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `salary` DECIMAL(10, 2) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `employees_email_key`(`email`),
    INDEX `employees_email_role_idx`(`email`, `role`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissions` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `employeeId` VARCHAR(191) NOT NULL,

    INDEX `permissions_employeeId_idx`(`employeeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room_types` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `basePrice` DECIMAL(10, 2) NOT NULL,
    `maxOccupancy` INTEGER NOT NULL,
    `bedType` VARCHAR(191) NOT NULL,
    `size` DECIMAL(5, 2) NULL,
    `viewType` VARCHAR(191) NULL,
    `imageUrls` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rooms` (
    `id` VARCHAR(191) NOT NULL,
    `roomNumber` VARCHAR(191) NOT NULL,
    `floor` INTEGER NOT NULL,
    `status` ENUM('AVAILABLE', 'OCCUPIED', 'MAINTENANCE', 'CLEANING', 'RESERVED') NOT NULL DEFAULT 'AVAILABLE',
    `lastCleaned` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `roomTypeId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `rooms_roomNumber_key`(`roomNumber`),
    INDEX `rooms_status_roomTypeId_idx`(`status`, `roomTypeId`),
    INDEX `rooms_roomTypeId_idx`(`roomTypeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room_amenities` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `iconUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `roomTypeId` VARCHAR(191) NOT NULL,

    INDEX `room_amenities_roomTypeId_idx`(`roomTypeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `seasonal_rates` (
    `id` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `priceMultiplier` DECIMAL(5, 2) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `roomTypeId` VARCHAR(191) NOT NULL,

    INDEX `seasonal_rates_roomTypeId_idx`(`roomTypeId`),
    INDEX `seasonal_rates_startDate_endDate_idx`(`startDate`, `endDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `maintenance_records` (
    `id` VARCHAR(191) NOT NULL,
    `issueDescription` TEXT NOT NULL,
    `status` ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `priority` VARCHAR(191) NULL,
    `scheduledDate` DATETIME(3) NULL,
    `completedDate` DATETIME(3) NULL,
    `cost` DECIMAL(10, 2) NULL,
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,
    `assignedToId` VARCHAR(191) NULL,

    INDEX `maintenance_records_status_scheduledDate_idx`(`status`, `scheduledDate`),
    INDEX `maintenance_records_roomId_idx`(`roomId`),
    INDEX `maintenance_records_assignedToId_idx`(`assignedToId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hotel_bookings` (
    `id` VARCHAR(191) NOT NULL,
    `bookingReference` VARCHAR(191) NOT NULL,
    `checkInDate` DATETIME(3) NOT NULL,
    `checkOutDate` DATETIME(3) NOT NULL,
    `numberOfGuests` INTEGER NOT NULL,
    `specialRequests` TEXT NULL,
    `totalAmount` DECIMAL(10, 2) NOT NULL,
    `status` ENUM('PENDING', 'CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT', 'CANCELLED', 'NO_SHOW') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `customerId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `hotel_bookings_bookingReference_key`(`bookingReference`),
    INDEX `hotel_bookings_customerId_checkInDate_idx`(`customerId`, `checkInDate`),
    INDEX `hotel_bookings_status_checkInDate_idx`(`status`, `checkInDate`),
    INDEX `hotel_bookings_customerId_idx`(`customerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hotel_booking_items` (
    `id` VARCHAR(191) NOT NULL,
    `pricePerNight` DECIMAL(10, 2) NOT NULL,
    `numberOfNights` INTEGER NOT NULL,
    `subtotal` DECIMAL(10, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `hotelBookingId` VARCHAR(191) NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,

    INDEX `hotel_booking_items_hotelBookingId_idx`(`hotelBookingId`),
    INDEX `hotel_booking_items_roomId_idx`(`roomId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `airports` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `timezone` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `airports_code_key`(`code`),
    INDEX `airports_city_country_idx`(`city`, `country`),
    INDEX `airports_code_idx`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `airlines` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `logoUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `airlines_code_key`(`code`),
    INDEX `airlines_code_idx`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `flights` (
    `id` VARCHAR(191) NOT NULL,
    `flightNumber` VARCHAR(191) NOT NULL,
    `departureTime` DATETIME(3) NOT NULL,
    `arrivalTime` DATETIME(3) NOT NULL,
    `duration` INTEGER NOT NULL,
    `status` ENUM('SCHEDULED', 'DELAYED', 'BOARDING', 'DEPARTED', 'ARRIVED', 'CANCELLED') NOT NULL DEFAULT 'SCHEDULED',
    `aircraftType` VARCHAR(191) NULL,
    `availableSeats` INTEGER NOT NULL,
    `basePrice` DECIMAL(10, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `airlineId` VARCHAR(191) NOT NULL,
    `departureAirportId` VARCHAR(191) NOT NULL,
    `arrivalAirportId` VARCHAR(191) NOT NULL,

    INDEX `flights_flightNumber_departureTime_idx`(`flightNumber`, `departureTime`),
    INDEX `flights_departureAirportId_arrivalAirportId_departureTime_idx`(`departureAirportId`, `arrivalAirportId`, `departureTime`),
    INDEX `flights_status_departureTime_idx`(`status`, `departureTime`),
    INDEX `flights_airlineId_idx`(`airlineId`),
    INDEX `flights_departureAirportId_idx`(`departureAirportId`),
    INDEX `flights_arrivalAirportId_idx`(`arrivalAirportId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `seat_classes` (
    `id` VARCHAR(191) NOT NULL,
    `className` ENUM('ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST_CLASS') NOT NULL,
    `availableSeats` INTEGER NOT NULL,
    `priceMultiplier` DECIMAL(5, 2) NOT NULL,
    `baggage` VARCHAR(191) NULL,
    `benefits` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `flightId` VARCHAR(191) NOT NULL,

    INDEX `seat_classes_flightId_idx`(`flightId`),
    INDEX `seat_classes_flightId_className_idx`(`flightId`, `className`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `flight_bookings` (
    `id` VARCHAR(191) NOT NULL,
    `bookingReference` VARCHAR(191) NOT NULL,
    `bookingDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `totalAmount` DECIMAL(10, 2) NOT NULL,
    `status` ENUM('PENDING', 'CONFIRMED', 'CHECKED_IN', 'COMPLETED', 'CANCELLED', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `customerId` VARCHAR(191) NOT NULL,
    `flightId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `flight_bookings_bookingReference_key`(`bookingReference`),
    INDEX `flight_bookings_customerId_bookingDate_idx`(`customerId`, `bookingDate`),
    INDEX `flight_bookings_status_bookingDate_idx`(`status`, `bookingDate`),
    INDEX `flight_bookings_customerId_idx`(`customerId`),
    INDEX `flight_bookings_flightId_idx`(`flightId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `passengers` (
    `id` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `dateOfBirth` DATETIME(3) NOT NULL,
    `passportNumber` VARCHAR(191) NULL,
    `nationality` VARCHAR(191) NOT NULL,
    `seatNumber` VARCHAR(191) NULL,
    `specialRequests` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `flightBookingId` VARCHAR(191) NOT NULL,
    `seatClassId` VARCHAR(191) NOT NULL,

    INDEX `passengers_flightBookingId_idx`(`flightBookingId`),
    INDEX `passengers_seatClassId_idx`(`seatClassId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `combo_bookings` (
    `id` VARCHAR(191) NOT NULL,
    `bookingReference` VARCHAR(191) NOT NULL,
    `totalAmount` DECIMAL(10, 2) NOT NULL,
    `discountAmount` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `finalAmount` DECIMAL(10, 2) NOT NULL,
    `status` ENUM('PENDING', 'CONFIRMED', 'PARTIALLY_COMPLETED', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `customerId` VARCHAR(191) NOT NULL,
    `flightBookingId` VARCHAR(191) NULL,
    `hotelBookingId` VARCHAR(191) NULL,

    UNIQUE INDEX `combo_bookings_bookingReference_key`(`bookingReference`),
    UNIQUE INDEX `combo_bookings_flightBookingId_key`(`flightBookingId`),
    UNIQUE INDEX `combo_bookings_hotelBookingId_key`(`hotelBookingId`),
    INDEX `combo_bookings_customerId_createdAt_idx`(`customerId`, `createdAt`),
    INDEX `combo_bookings_customerId_idx`(`customerId`),
    INDEX `combo_bookings_flightBookingId_idx`(`flightBookingId`),
    INDEX `combo_bookings_hotelBookingId_idx`(`hotelBookingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments` (
    `id` VARCHAR(191) NOT NULL,
    `paymentDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `paymentMethod` ENUM('CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'E_WALLET', 'CASH', 'PAYPAL', 'MOMO', 'ZALOPAY', 'VNPAY') NOT NULL,
    `transactionId` VARCHAR(191) NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `currency` VARCHAR(191) NOT NULL DEFAULT 'VND',
    `status` ENUM('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `customerId` VARCHAR(191) NOT NULL,
    `comboBookingId` VARCHAR(191) NULL,

    UNIQUE INDEX `payments_transactionId_key`(`transactionId`),
    INDEX `payments_customerId_paymentDate_idx`(`customerId`, `paymentDate`),
    INDEX `payments_status_paymentDate_idx`(`status`, `paymentDate`),
    INDEX `payments_customerId_idx`(`customerId`),
    INDEX `payments_comboBookingId_idx`(`comboBookingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviews` (
    `id` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL,
    `comment` TEXT NULL,
    `reviewType` ENUM('HOTEL', 'FLIGHT', 'COMBO') NOT NULL,
    `entityId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `customerId` VARCHAR(191) NOT NULL,

    INDEX `reviews_entityId_reviewType_idx`(`entityId`, `reviewType`),
    INDEX `reviews_customerId_idx`(`customerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `discounts` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `discountType` ENUM('PERCENTAGE', 'FIXED_AMOUNT', 'BUY_ONE_GET_ONE') NOT NULL,
    `discountValue` DECIMAL(10, 2) NOT NULL,
    `minPurchase` DECIMAL(10, 2) NULL,
    `maxDiscount` DECIMAL(10, 2) NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `usageLimit` INTEGER NULL,
    `usageCount` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `applicableTo` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `discounts_code_key`(`code`),
    INDEX `discounts_code_isActive_idx`(`code`, `isActive`),
    INDEX `discounts_code_idx`(`code`),
    INDEX `discounts_startDate_endDate_idx`(`startDate`, `endDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blog_posts` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `excerpt` TEXT NULL,
    `coverImage` VARCHAR(191) NULL,
    `category` VARCHAR(191) NULL,
    `tags` TEXT NULL,
    `isPublished` BOOLEAN NOT NULL DEFAULT false,
    `publishedAt` DATETIME(3) NULL,
    `viewCount` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `blog_posts_slug_key`(`slug`),
    INDEX `blog_posts_slug_idx`(`slug`),
    INDEX `blog_posts_isPublished_publishedAt_idx`(`isPublished`, `publishedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `audit_logs` (
    `id` VARCHAR(191) NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `entityType` VARCHAR(191) NOT NULL,
    `entityId` VARCHAR(191) NOT NULL,
    `oldValue` TEXT NULL,
    `newValue` TEXT NULL,
    `ipAddress` VARCHAR(191) NULL,
    `userAgent` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `employeeId` VARCHAR(191) NULL,

    INDEX `audit_logs_entityType_entityId_idx`(`entityType`, `entityId`),
    INDEX `audit_logs_createdAt_idx`(`createdAt`),
    INDEX `audit_logs_employeeId_idx`(`employeeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `flight_daily_prices` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATE NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `availableSeats` INTEGER NOT NULL,
    `priceCategory` ENUM('LOWEST', 'LOW', 'STANDARD', 'HIGH', 'PEAK') NOT NULL DEFAULT 'STANDARD',
    `demandLevel` ENUM('LOW', 'NORMAL', 'HIGH', 'VERY_HIGH') NOT NULL DEFAULT 'NORMAL',
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `flightId` VARCHAR(191) NOT NULL,

    INDEX `flight_daily_prices_date_priceCategory_idx`(`date`, `priceCategory`),
    INDEX `flight_daily_prices_flightId_date_idx`(`flightId`, `date`),
    INDEX `flight_daily_prices_flightId_idx`(`flightId`),
    UNIQUE INDEX `flight_daily_prices_flightId_date_key`(`flightId`, `date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `flight_routes` (
    `id` VARCHAR(191) NOT NULL,
    `departureAirportCode` VARCHAR(191) NOT NULL,
    `arrivalAirportCode` VARCHAR(191) NOT NULL,
    `averagePrice` DECIMAL(10, 2) NOT NULL,
    `lowestPrice` DECIMAL(10, 2) NOT NULL,
    `highestPrice` DECIMAL(10, 2) NOT NULL,
    `popularDays` TEXT NULL,
    `averageDuration` INTEGER NOT NULL,
    `isPopular` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `flight_routes_isPopular_idx`(`isPopular`),
    INDEX `flight_routes_departureAirportCode_arrivalAirportCode_idx`(`departureAirportCode`, `arrivalAirportCode`),
    UNIQUE INDEX `flight_routes_departureAirportCode_arrivalAirportCode_key`(`departureAirportCode`, `arrivalAirportCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `flight_seasonal_rates` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `startDate` DATE NOT NULL,
    `endDate` DATE NOT NULL,
    `priceMultiplier` DECIMAL(5, 2) NOT NULL,
    `description` TEXT NULL,
    `routePattern` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `flight_seasonal_rates_startDate_endDate_isActive_idx`(`startDate`, `endDate`, `isActive`),
    INDEX `flight_seasonal_rates_startDate_endDate_idx`(`startDate`, `endDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `permissions` ADD CONSTRAINT `permissions_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `employees`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rooms` ADD CONSTRAINT `rooms_roomTypeId_fkey` FOREIGN KEY (`roomTypeId`) REFERENCES `room_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_amenities` ADD CONSTRAINT `room_amenities_roomTypeId_fkey` FOREIGN KEY (`roomTypeId`) REFERENCES `room_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `seasonal_rates` ADD CONSTRAINT `seasonal_rates_roomTypeId_fkey` FOREIGN KEY (`roomTypeId`) REFERENCES `room_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `maintenance_records` ADD CONSTRAINT `maintenance_records_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `rooms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `maintenance_records` ADD CONSTRAINT `maintenance_records_assignedToId_fkey` FOREIGN KEY (`assignedToId`) REFERENCES `employees`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hotel_bookings` ADD CONSTRAINT `hotel_bookings_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hotel_booking_items` ADD CONSTRAINT `hotel_booking_items_hotelBookingId_fkey` FOREIGN KEY (`hotelBookingId`) REFERENCES `hotel_bookings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hotel_booking_items` ADD CONSTRAINT `hotel_booking_items_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `rooms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `flights` ADD CONSTRAINT `flights_airlineId_fkey` FOREIGN KEY (`airlineId`) REFERENCES `airlines`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `flights` ADD CONSTRAINT `flights_departureAirportId_fkey` FOREIGN KEY (`departureAirportId`) REFERENCES `airports`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `flights` ADD CONSTRAINT `flights_arrivalAirportId_fkey` FOREIGN KEY (`arrivalAirportId`) REFERENCES `airports`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `seat_classes` ADD CONSTRAINT `seat_classes_flightId_fkey` FOREIGN KEY (`flightId`) REFERENCES `flights`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `flight_bookings` ADD CONSTRAINT `flight_bookings_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `flight_bookings` ADD CONSTRAINT `flight_bookings_flightId_fkey` FOREIGN KEY (`flightId`) REFERENCES `flights`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `passengers` ADD CONSTRAINT `passengers_flightBookingId_fkey` FOREIGN KEY (`flightBookingId`) REFERENCES `flight_bookings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `passengers` ADD CONSTRAINT `passengers_seatClassId_fkey` FOREIGN KEY (`seatClassId`) REFERENCES `seat_classes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `combo_bookings` ADD CONSTRAINT `combo_bookings_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `combo_bookings` ADD CONSTRAINT `combo_bookings_flightBookingId_fkey` FOREIGN KEY (`flightBookingId`) REFERENCES `flight_bookings`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `combo_bookings` ADD CONSTRAINT `combo_bookings_hotelBookingId_fkey` FOREIGN KEY (`hotelBookingId`) REFERENCES `hotel_bookings`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_comboBookingId_fkey` FOREIGN KEY (`comboBookingId`) REFERENCES `combo_bookings`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `audit_logs` ADD CONSTRAINT `audit_logs_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `employees`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `flight_daily_prices` ADD CONSTRAINT `flight_daily_prices_flightId_fkey` FOREIGN KEY (`flightId`) REFERENCES `flights`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
