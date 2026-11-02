-- SB Solar Energy MySQL Database Schema
-- Character Set: utf8mb4

CREATE DATABASE IF NOT EXISTS `sb_solar_energy` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `sb_solar_energy`;

-- 1. LEADS TABLE
CREATE TABLE IF NOT EXISTS `leads` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `initials` VARCHAR(10) DEFAULT '',
  `source` VARCHAR(100) DEFAULT 'Website form',
  `city` VARCHAR(100) DEFAULT '',
  `interest` VARCHAR(150) DEFAULT '',
  `status` ENUM('New', 'Contacted', 'Quoted', 'Lost') DEFAULT 'New',
  `assigned` VARCHAR(100) DEFAULT 'Unassigned',
  `phone` VARCHAR(25) DEFAULT '',
  `email` VARCHAR(150) DEFAULT '',
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. DEALS TABLE
CREATE TABLE IF NOT EXISTS `deals` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `deal_code` VARCHAR(50) DEFAULT NULL,
  `name` VARCHAR(150) DEFAULT '',
  `customer` VARCHAR(150) NOT NULL,
  `project_type` VARCHAR(150) NOT NULL,
  `value` INT NOT NULL DEFAULT 0,
  `stage` ENUM('qualified', 'proposal_sent', 'negotiation', 'closing') DEFAULT 'qualified',
  `tag` VARCHAR(100) DEFAULT '',
  `tag_color` VARCHAR(50) DEFAULT 'blue',
  `owner` VARCHAR(100) DEFAULT 'Rahul',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. CONTACTS TABLE
CREATE TABLE IF NOT EXISTS `contacts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `initials` VARCHAR(10) DEFAULT '',
  `city` VARCHAR(100) DEFAULT '',
  `phone` VARCHAR(25) DEFAULT '',
  `email` VARCHAR(150) DEFAULT '',
  `tag` ENUM('Customer', 'Lead', 'Vendor') DEFAULT 'Lead',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. TASKS TABLE
CREATE TABLE IF NOT EXISTS `tasks` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `subtitle` VARCHAR(150) DEFAULT '',
  `time` VARCHAR(50) DEFAULT '',
  `type` VARCHAR(50) DEFAULT 'Task',
  `section` ENUM('today', 'overdue') DEFAULT 'today',
  `completed` TINYINT(1) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. VENDORS TABLE
CREATE TABLE IF NOT EXISTS `vendors` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `vendor_code` VARCHAR(50) DEFAULT NULL,
  `name` VARCHAR(150) NOT NULL,
  `contact_person` VARCHAR(150) DEFAULT '',
  `email` VARCHAR(150) DEFAULT '',
  `contact` VARCHAR(25) DEFAULT '',
  `address` TEXT DEFAULT NULL,
  `state` VARCHAR(100) DEFAULT 'Rajasthan',
  `district` VARCHAR(100) DEFAULT '',
  `business_type` ENUM('dealer', 'distributor', 'installer', 'other') DEFAULT 'dealer',
  `rating` DECIMAL(2,1) DEFAULT 4.8,
  `review_count` INT DEFAULT 0,
  `status` ENUM('Approved', 'Pending', 'Rejected') DEFAULT 'Pending',
  `tags` TEXT DEFAULT NULL,
  `is_official_hub` TINYINT(1) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. QUOTES & INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS `quotes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(25) NOT NULL,
  `city` VARCHAR(100) DEFAULT '',
  `monthly_bill` INT DEFAULT 0,
  `category` VARCHAR(50) DEFAULT 'Residential',
  `roof_type` VARCHAR(100) DEFAULT 'Concrete / RCC Flat',
  `capacity_kw` DECIMAL(4,1) DEFAULT 1.0,
  `subsidy_amount` INT DEFAULT 0,
  `status` ENUM('New', 'Contacted', 'Closed') DEFAULT 'New',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- SEED DATA FOR LEADS
INSERT INTO `leads` (`id`, `name`, `initials`, `source`, `city`, `interest`, `status`, `assigned`, `phone`) VALUES
(1, 'Anil Purohit', 'AP', 'Website form', 'Udaipur', 'Hotel solar 50 kW', 'New', 'Neha', '+91 98290 11223'),
(2, 'Suresh Dhayal', 'SD', 'WhatsApp', 'Sikar', 'Solar pump', 'Contacted', 'Rahul', '+91 94140 22334'),
(3, 'Kavita Joshi', 'KJ', 'Vendor referral', 'Jaipur', 'Rooftop 5 kW', 'Quoted', 'Aman', '+91 98281 33445'),
(4, 'Rohit Meena', 'RM', 'Website form', 'Kota', 'Rooftop 3 kW', 'New', 'Unassigned', '+91 94133 44556'),
(5, 'Imran Khan', 'IK', 'Other', 'Bikaner', 'Farm tubewell', 'Contacted', 'Neha', '+91 98295 55667')
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

-- SEED DATA FOR DEALS
INSERT INTO `deals` (`id`, `deal_code`, `name`, `customer`, `project_type`, `value`, `stage`, `tag`, `tag_color`, `owner`) VALUES
(1, 'deal-1', 'Sneha Rao', 'Sneha Rao', 'Rooftop 5 kW', 190000, 'qualified', 'Call Thu', 'indigo', 'Aman'),
(2, 'deal-2', 'Karan Joshi', 'Karan Joshi', 'Commercial 20 kW', 640000, 'qualified', 'New', 'purple', 'Rahul'),
(3, 'deal-3', 'Vikram Khanna', 'Vikram Khanna', 'Solar pump', 275000, 'proposal_sent', 'Follow up', 'amber', 'Rahul'),
(4, 'deal-4', 'Meera Iyer', 'Meera Iyer', 'Rooftop 3 kW', 125000, 'proposal_sent', 'Viewed', 'blue', 'Neha'),
(5, 'deal-5', 'Priya Mehta', 'Priya Mehta', 'Hotel 50 kW', 310000, 'negotiation', 'Discount ask', 'orange', 'Neha'),
(6, 'deal-6', 'Aarav Sharma', 'Aarav Sharma', 'Factory 100 kW', 420000, 'closing', 'Contract out', 'emerald', 'Rahul'),
(7, 'deal-7', 'Nisha Verma', 'Nisha Verma', 'Residential 4 kW', 160000, 'closing', 'Verbal yes', 'emerald', 'Rahul')
ON DUPLICATE KEY UPDATE `customer`=VALUES(`customer`);

-- SEED DATA FOR CONTACTS
INSERT INTO `contacts` (`id`, `name`, `initials`, `city`, `phone`, `tag`) VALUES
(1, 'Aarav Sharma', 'AS', 'Jaipur', '+91 98765 43210', 'Customer'),
(2, 'Priya Mehta', 'PM', 'Udaipur', '+91 98291 54321', 'Customer'),
(3, 'Vikram Khanna', 'VK', 'Sikar', '+91 94145 66778', 'Lead'),
(4, 'Sneha Rao', 'SR', 'Ajmer', '+91 98280 44556', 'Lead'),
(5, 'Govind Singh', 'GS', 'Banswara', '+91 94133 21987', 'Vendor'),
(6, 'Meera Iyer', 'MI', 'Kota', '+91 98290 12345', 'Lead')
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

-- SEED DATA FOR TASKS
INSERT INTO `tasks` (`id`, `title`, `subtitle`, `time`, `type`, `section`, `completed`) VALUES
(1, 'Call Aarav about contract', '10:30 AM · Deal', '10:30 AM', 'Deal', 'today', 0),
(2, 'Send proposal to Vikram', '1:00 PM · Email', '1:00 PM', 'Email', 'today', 0),
(3, 'Follow up with Sneha', '4:30 PM · Call', '4:30 PM', 'Call', 'today', 0),
(4, 'Verify Aravalli Solar documents', 'Yesterday', 'Yesterday', 'Vendor', 'overdue', 0),
(5, 'Update Mahi Solar pricing', '2 days ago', '2 days ago', 'Pricing', 'overdue', 0)
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`);

-- SEED DATA FOR VENDORS
INSERT INTO `vendors` (`id`, `vendor_code`, `name`, `contact_person`, `email`, `contact`, `address`, `state`, `district`, `business_type`, `rating`, `review_count`, `status`, `tags`, `is_official_hub`) VALUES
(1, 'v-jaipur-1', 'SB Solar Energy Corporate Experience Center', 'Rahul Devanda', 'info@sbsolar.co.in', '+91 7023204664', 'E-42, RIICO Industrial Area, Sitapura, Tonk Road, Jaipur', 'Rajasthan', 'Jaipur', 'distributor', 5.0, 184, 'Approved', '["Headquarters & Regional Hub", "Govt Subsidy Desk", "Commercial & Industrial", "Express Delivery"]', 1),
(2, 'v-jaipur-2', 'SunPower Solutions Jaipur', 'Sunil Verma', 'sunil@sunpowersolutions.in', '+91 9876543210', '123 Solar Park, Sitapura Industrial Area, Jaipur', 'Rajasthan', 'Jaipur', 'dealer', 4.8, 42, 'Approved', '["Residential Rooftop", "PM Surya Ghar Approved"]', 0),
(3, 'v-udaipur-1', 'Lakecity Green Energy', 'Manoj Agarwal', 'manoj@lakecitygreen.in', '+91 9829088776', '45 Chetak Circle, Udaipur', 'Rajasthan', 'Udaipur', 'installer', 4.9, 67, 'Approved', '["EPC Contractor", "Agriculture Solar Pump", "Commercial Rooftop"]', 0)
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);
