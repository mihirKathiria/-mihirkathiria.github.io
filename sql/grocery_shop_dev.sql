-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 21, 2022 at 09:49 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10
SET
  SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET
  time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;

/*!40101 SET NAMES utf8mb4 */
;

--
-- Database: `grocery_shop_dev`
--
-- --------------------------------------------------------
--
-- Table structure for table `customer_details`
--
CREATE TABLE `customer_details` (
  `id` int(11) NOT NULL,
  `addr_1` varchar(50) DEFAULT NULL,
  `addr_2` varchar(50) DEFAULT NULL,
  `addr_3` varchar(50) DEFAULT NULL,
  `pincode` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `town` varchar(50) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- --------------------------------------------------------
--
-- Table structure for table `users`
--
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `is_customer` tinyint(4) NOT NULL DEFAULT 1,
  `is_seller` tinyint(4) NOT NULL DEFAULT 0,
  `customer_detail_id` int(50) DEFAULT NULL,
  `seller_details_id` int(50) DEFAULT NULL,
  `full_name` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `mo_number` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- --------------------------------------------------------
--
-- Table structure for table `user_customer_details`
--
CREATE TABLE `user_customer_details` (
  `id` int(11) NOT NULL,
  `user_id` int(50) DEFAULT NULL,
  `customer_detail_id` int(50) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

--
-- Indexes for dumped tables
--
--
-- Indexes for table `customer_details`
--
ALTER TABLE
  `customer_details`
ADD
  PRIMARY KEY (`id`),
ADD
  KEY `id` (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE
  `users`
ADD
  PRIMARY KEY (`id`),
ADD
  KEY `id` (`id`);

--
-- Indexes for table `user_customer_details`
--
ALTER TABLE
  `user_customer_details`
ADD
  PRIMARY KEY (`id`),
ADD
  KEY `id` (`id`),
ADD
  KEY `user_customer` (`user_id`),
ADD
  KEY `customer_user` (`customer_detail_id`);

--
-- AUTO_INCREMENT for dumped tables
--
--
-- AUTO_INCREMENT for table `customer_details`
--
ALTER TABLE
  `customer_details`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 36;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE
  `users`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 2;

--
-- AUTO_INCREMENT for table `user_customer_details`
--
ALTER TABLE
  `user_customer_details`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 30;

--
-- Constraints for dumped tables
--
--
-- Constraints for table `user_customer_details`
--
ALTER TABLE
  `user_customer_details`
ADD
  CONSTRAINT `customer_user` FOREIGN KEY (`customer_detail_id`) REFERENCES `customer_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD
  CONSTRAINT `user_customer` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;