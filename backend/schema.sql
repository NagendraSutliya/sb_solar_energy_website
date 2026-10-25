-- SB Solar Energy MySQL Database Schema
-- Character Set: utf8mb4

CREATE TABLE IF NOT EXISTS `leads` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `initials` VARCHAR(10) DEFAULT '',
  `source` VARCHAR(100) DEFAULT 'Website form',
  `city` VARCHAR(100) DEFAULT '',
  `interest` VARCHAR(150) DEFAULT '',
  `status` ENUM('New', 'Contacted', 'Quoted', 'Lost') DEFAULT 'New',
  `assigned` VARCHAR(100) DEFAULT 'Unassigned',
  `phone` VARCHAR(20) DEFAULT '',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `deals` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `customer` VARCHAR(150) NOT NULL,
  `project_type` VARCHAR(150) NOT NULL,
  `value` INT NOT NULL DEFAULT 0,
  `stage` ENUM('qualified', 'proposal_sent', 'negotiation', 'closing') DEFAULT 'qualified',
  `owner` VARCHAR(100) DEFAULT 'Rahul',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `contacts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `initials` VARCHAR(10) DEFAULT '',
  `city` VARCHAR(100) DEFAULT '',
  `phone` VARCHAR(25) DEFAULT '',
  `tag` ENUM('Customer', 'Lead', 'Vendor') DEFAULT 'Lead',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `tasks` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `subtitle` VARCHAR(150) DEFAULT '',
  `section` ENUM('today', 'overdue') DEFAULT 'today',
  `completed` TINYINT(1) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `vendors` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `initials` VARCHAR(10) DEFAULT '',
  `district` VARCHAR(100) DEFAULT '',
  `rating` DECIMAL(2,1) DEFAULT 4.8,
  `status` ENUM('Verified', 'Pending') DEFAULT 'Pending',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Data matching Dashboard/CRM mockups
INSERT INTO `leads` (`name`, `initials`, `source`, `city`, `interest`, `status`, `assigned`) VALUES
('Anil Purohit', 'AP', 'Website form', 'Udaipur', 'Hotel solar 50 kW', 'New', 'Neha'),
('Suresh Dhayal', 'SD', 'WhatsApp', 'Sikar', 'Solar pump', 'Contacted', 'Rahul'),
('Kavita Joshi', 'KJ', 'Vendor referral', 'Jaipur', 'Rooftop 5 kW', 'Quoted', 'Aman'),
('Rohit Meena', 'RM', 'Website form', 'Kota', 'Rooftop 3 kW', 'New', 'Unassigned'),
('Imran Khan', 'IK', 'Other', 'Bikaner', 'Farm tubewell', 'Contacted', 'Neha')
ON DUPLICATE KEY UPDATE `id`=`id`;

INSERT INTO `deals` (`customer`, `project_type`, `value`, `stage`, `owner`) VALUES
('Sneha Rao', 'Rooftop 5 kW', 190000, 'qualified', 'Aman'),
('Karan Joshi', 'Commercial 20 kW', 640000, 'qualified', 'Rahul'),
('Vikram Khanna', 'Solar pump', 275000, 'proposal_sent', 'Rahul'),
('Meera Iyer', 'Rooftop 3 kW', 125000, 'proposal_sent', 'Neha'),
('Priya Mehta', 'Hotel 50 kW', 310000, 'negotiation', 'Neha'),
('Aarav Sharma', 'Factory 100 kW', 420000, 'closing', 'Rahul'),
('Nisha Verma', 'Residential 4 kW', 160000, 'closing', 'Rahul')
ON DUPLICATE KEY UPDATE `id`=`id`;

INSERT INTO `contacts` (`name`, `initials`, `city`, `phone`, `tag`) VALUES
('Aarav Sharma', 'AS', 'Jaipur', '+91 98765 43210', 'Customer'),
('Priya Mehta', 'PM', 'Udaipur', '+91 98291 54321', 'Customer'),
('Vikram Khanna', 'VK', 'Sikar', '+91 94145 66778', 'Lead'),
('Sneha Rao', 'SR', 'Ajmer', '+91 98280 44556', 'Lead'),
('Govind Singh', 'GS', 'Banswara', '+91 94133 21987', 'Vendor'),
('Meera Iyer', 'MI', 'Kota', '+91 98290 12345', 'Lead')
ON DUPLICATE KEY UPDATE `id`=`id`;

INSERT INTO `tasks` (`title`, `subtitle`, `section`, `completed`) VALUES
('Call Aarav about contract', '10:30 AM · Deal', 'today', 0),
('Send proposal to Vikram', '1:00 PM · Email', 'today', 0),
('Follow up with Sneha', '4:30 PM · Call', 'today', 0),
('Verify Aravalli Solar documents', 'Yesterday', 'overdue', 0),
('Update Mahi Solar pricing', '2 days ago', 'overdue', 0)
ON DUPLICATE KEY UPDATE `id`=`id`;

INSERT INTO `vendors` (`name`, `initials`, `district`, `rating`, `status`) VALUES
('SunPower Jaipur', 'SJ', 'Jaipur', 4.8, 'Verified'),
('Lakecity Solar', 'LS', 'Udaipur', 4.9, 'Verified'),
('Apex Green Tech', 'AG', 'Bikaner', 4.7, 'Pending'),
('Mahi Solar Power', 'MS', 'Banswara', 4.8, 'Pending')
ON DUPLICATE KEY UPDATE `id`=`id`;
