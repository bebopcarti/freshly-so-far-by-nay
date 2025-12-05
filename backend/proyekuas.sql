-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 29, 2025 at 04:24 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `proyekuas`
--

-- --------------------------------------------------------

--
-- Table structure for table `keranjang`
--

CREATE TABLE `keranjang` (
  `cartId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `keranjang`
--

INSERT INTO `keranjang` (`cartId`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, 1, '2025-11-27', '2025-11-27'),
(2, 1, '2025-11-27', '2025-11-27');

-- --------------------------------------------------------

--
-- Table structure for table `keranjang_item`
--

CREATE TABLE `keranjang_item` (
  `cartItemId` int(11) NOT NULL,
  `cartId` int(11) NOT NULL,
  `produkId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `subtotal` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `orderId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `totalAmount` float NOT NULL,
  `phone` varchar(50) NOT NULL,
  `address` text NOT NULL,
  `orderStatus` varchar(50) NOT NULL,
  `createdAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_item`
--

CREATE TABLE `order_item` (
  `orderItemId` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `produkId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `harga` float NOT NULL,
  `subtotal` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pembayaran`
--

CREATE TABLE `pembayaran` (
  `paymentId` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `method` varchar(50) NOT NULL,
  `paymentStatus` varchar(50) NOT NULL,
  `paymentDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pembayaran`
--

INSERT INTO `pembayaran` (`paymentId`, `orderId`, `method`, `paymentStatus`, 'paymentDate') VALUES
(701, 5001, 'Card', 'COMPLETED', '2025-11-20 10:45:00'),
(702, 5002, 'QRIS', 'PENDING', '2025-11-21 11:30:00'),
(703, 5003, 'QRIS', 'COMPLETED', '2025-12-05 07:15:00'),
(704, 5004, 'COD', 'FAILED', '2025-12-05 09:30:00');


-- --------------------------------------------------------

--
-- Table structure for table `pengantaran`
--

CREATE TABLE `pengantaran` (
  `deliveryId` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `deliveryStatus` tinyint(1) NOT NULL,
  `deliveryDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pengantaran`
--

INSERT INTO `pengantaran` (`deliveryId`, `orderId`, `deliveryStatus`, `deliveryDate`) VALUES
(101, 5001, '0', '2025-11-20 14:30:00'),
(102, 5002, '1', '2025-12-04 10:15:00'),
(103, 5003, '2', '2025-12-05 08:00:00');
(104, 5004, '3', '2025-12-06 09:00:00');


-- --------------------------------------------------------

--
-- Table structure for table `produk`
--

CREATE TABLE `produk` (
  `produkId` int(11) NOT NULL,
  `kategori` varchar(50) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `harga` varchar(50) NOT NULL,
  `stock` int(11) NOT NULL,
  `gambar` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `produk`
--

INSERT INTO `produk` (`produkId`, `kategori`, `nama`, `harga`, `stock`, `gambar`, `createdAt`) VALUES
(2, 'Fruits', 'Fresh Apples (1kg)', '25000', 15, '1763538287363.jpg', '2025-11-19 14:44:47'),
(3, 'Fruits', 'Bananas (1kg)', '18000', 15, '1764040264949.jpg', '2025-11-25 10:11:04'),
(5, 'Bakery', 'Whole Wheat Bread', '28000', 15, '1764040600886.jpg', '2025-11-25 10:16:40'),
(6, 'Meat', 'Chicken Breast (500g)', '38000', 15, '1764040663439.jpg', '2025-11-25 10:17:43'),
(7, 'Vegetables', 'Fresh Broccoli (1pc)', '12000', 15, '1764040720065.jpg', '2025-11-25 10:18:40'),
(8, 'Dairy', 'Fresh milk (1L)', '19000', 15, '1764040809891.jpg', '2025-11-25 10:20:09'),
(9, 'Meat', 'Eggs (12pcs)', '22000', 10, '1764040898287.png', '2025-11-25 10:21:38'),
(10, 'seafood', 'Fresh Salmon (300g)', '85000', 10, '1764040949926.jpg', '2025-11-25 10:22:29');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userId` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `role` varchar(10) NOT NULL DEFAULT 'buyer',
  `createdAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userId`, `username`, `email`, `password`, `role`, `createdAt`) VALUES
(0, 'Admin6', 'admin6@gmail.com', 'admin6', 'admin', '2025-11-19'),
(1, 'usertest', 'test@gmail.com', 'test123', 'buyer', '2025-11-18'),
(2, 'ppw6', 'ppw@gmail.com', 'ppw654', 'buyer', '2025-11-18'),
(3, 'cobacoba', 'coba12@gmail.com', 'coba234', 'buyer', '2025-11-27');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `keranjang`
--
ALTER TABLE `keranjang`
  ADD PRIMARY KEY (`cartId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `keranjang_item`
--
ALTER TABLE `keranjang_item`
  ADD PRIMARY KEY (`cartItemId`),
  ADD KEY `cartId` (`cartId`),
  ADD KEY `produkId` (`produkId`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`orderItemId`),
  ADD KEY `orderId` (`orderId`),
  ADD KEY `produkId` (`produkId`);

--
-- Indexes for table `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD PRIMARY KEY (`paymentId`),
  ADD KEY `orderId` (`orderId`);

--
-- Indexes for table `pengantaran`
--
ALTER TABLE `pengantaran`
  ADD PRIMARY KEY (`deliveryId`),
  ADD KEY `orderId` (`orderId`);

--
-- Indexes for table `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`produkId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `keranjang`
--
ALTER TABLE `keranjang`
  MODIFY `cartId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `keranjang_item`
--
ALTER TABLE `keranjang_item`
  MODIFY `cartItemId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_item`
--
ALTER TABLE `order_item`
  MODIFY `orderItemId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pembayaran`
--
ALTER TABLE `pembayaran`
  MODIFY `paymentId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pengantaran`
--
ALTER TABLE `pengantaran`
  MODIFY `deliveryId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `produk`
--
ALTER TABLE `produk`
  MODIFY `produkId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `keranjang`
--
ALTER TABLE `keranjang`
  ADD CONSTRAINT `keranjang_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`);

--
-- Constraints for table `keranjang_item`
--
ALTER TABLE `keranjang_item`
  ADD CONSTRAINT `keranjang_item_ibfk_1` FOREIGN KEY (`cartId`) REFERENCES `keranjang` (`cartId`),
  ADD CONSTRAINT `keranjang_item_ibfk_2` FOREIGN KEY (`produkId`) REFERENCES `produk` (`produkId`);

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`);

--
-- Constraints for table `order_item`
--
ALTER TABLE `order_item`
  ADD CONSTRAINT `order_item_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `order` (`orderId`),
  ADD CONSTRAINT `order_item_ibfk_2` FOREIGN KEY (`produkId`) REFERENCES `produk` (`produkId`);

--
-- Constraints for table `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD CONSTRAINT `pembayaran_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `order` (`orderId`);

--
-- Constraints for table `pengantaran`
--
ALTER TABLE `pengantaran`
  ADD CONSTRAINT `pengantaran_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `order` (`orderId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
