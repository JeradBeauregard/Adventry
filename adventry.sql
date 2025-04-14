-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 14, 2025 at 06:55 PM
-- Server version: 5.7.24
-- PHP Version: 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `adventry`
--

-- --------------------------------------------------------

--
-- Table structure for table `achievements`
--

CREATE TABLE `achievements` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `isCompleted` tinyint(1) DEFAULT '0',
  `earnedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `achievements`
--

INSERT INTO `achievements` (`id`, `userId`, `name`, `description`, `isCompleted`, `earnedAt`) VALUES
(1, 1, 'First Journal Entry', 'Write your first journal entry.', 1, '2025-03-10 17:04:15'),
(2, 2, 'Pet Lover', 'Adopt your first pet.', 1, '2025-03-10 17:04:15'),
(3, 3, 'Streak Starter', 'Log in for 3 days in a row.', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `itemId` int(11) NOT NULL,
  `quantity` int(11) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`id`, `userId`, `itemId`, `quantity`) VALUES
(1, 1, 1, 2),
(2, 2, 2, 1),
(3, 3, 3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `journals`
--

CREATE TABLE `journals` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `content` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `journals`
--

INSERT INTO `journals` (`id`, `userId`, `content`, `createdAt`) VALUES
(1, 1, 'Had a great day learning about MySQL!', '2025-03-10 17:04:15'),
(2, 2, 'Started working on Adventry. Feeling excited!', '2025-03-10 17:04:15'),
(3, 3, 'Looking forward to seeing my pet grow.', '2025-03-10 17:04:15');

-- --------------------------------------------------------

--
-- Table structure for table `journal_conversations`
--

CREATE TABLE `journal_conversations` (
  `id` int(11) NOT NULL,
  `journal_id` int(11) NOT NULL,
  `sender` enum('user','system') NOT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `journal_conversations`
--

INSERT INTO `journal_conversations` (`id`, `journal_id`, `sender`, `message`, `created_at`) VALUES
(1, 1, 'user', 'Hello this is my first journal', '2025-03-17 18:10:20'),
(2, 1, 'system', 'Let\'s break it down. What feels most urgent?', '2025-03-17 18:10:20'),
(3, 1, 'user', 'this is my second mesage', '2025-03-17 18:14:06'),
(4, 1, 'system', 'Take a deep breath. What\'s on your mind?', '2025-03-17 18:14:06'),
(5, 1, 'user', 'this is my third mesage', '2025-03-17 18:14:52'),
(6, 1, 'system', 'That makes sense. What\'s one small step you can take today?', '2025-03-17 18:14:52'),
(7, 3, 'user', 'The first message of my second journal', '2025-03-17 18:28:27'),
(8, 4, 'user', 'The first message of my second journal', '2025-03-17 18:29:37'),
(9, 5, 'user', 'The first message of my second journal', '2025-03-17 18:31:44'),
(10, 5, 'system', 'I\'m having trouble thinking right now. Try again later.', '2025-03-17 18:31:50'),
(11, 6, 'user', 'The first message of my second journal', '2025-03-17 18:40:04'),
(12, 6, 'system', 'I\'m having trouble thinking right now. Try again later.', '2025-03-17 18:40:06'),
(13, 7, 'user', 'The first message of my second journal', '2025-03-17 18:41:30'),
(14, 7, 'system', 'Error: 429 You exceeded your current quota, please check your plan and billing details. For more information on this error, read the docs: https://platform.openai.com/docs/guides/error-codes/api-errors.', '2025-03-17 18:41:32'),
(15, 8, 'user', 'I am feeling rreally good today. I HAVE A LOT TO DO THOUGH', '2025-03-24 16:16:04'),
(16, 8, 'system', 'It\'s wonderful to hear that you\'re feeling good today! Your positive mood can be a great source of motivation and energy to tackle all the tasks you have in front of you. Embrace this positivity and use it to focus and prioritize what needs to be done. It might help to make a to-do list or a schedule to keep track of your tasks and avoid feeling overwhelmed. Remember to take breaks and reward yourself for small achievements throughout the day as well. Keep harnessing that good feeling, and you\'ll be able to move through your day with more ease and satisfaction. If you ever find things are becoming too much, don\'t hesitate to pause and breathe—your well-being is always a priority.', '2025-03-24 16:16:07'),
(17, 8, 'user', 'so kind of you to say i just hope that i will do well', '2025-03-24 16:23:16'),
(18, 8, 'system', 'It sounds like you\'re hopeful about the future. What are your goals this time?', '2025-03-24 16:23:17'),
(19, 9, 'user', 'ell', '2025-04-14 17:58:31'),
(20, 9, 'system', 'It looks like your entry might have been cut off. If you’re writing about something challenging, I\'m here to reflect and provide support. Can you share more about what \"ell\" refers to?', '2025-04-14 17:58:33'),
(21, 10, 'user', 'ell', '2025-04-14 17:58:59'),
(22, 10, 'system', 'It seems like something may be on your mind. Would you like to elaborate on what\'s happening or how you\'re feeling?', '2025-04-14 17:59:00'),
(23, 11, 'user', 'abc', '2025-04-14 18:04:07'),
(24, 11, 'system', 'It seems like you\'ve entered \"abc,\" which might be a placeholder or a simple start. Is there something specific you’d like to explore in your journaling today? Reflecting on your thoughts or daily experiences can be a good way to start. What’s been on your mind lately?', '2025-04-14 18:04:08'),
(25, 11, 'user', 'hi', '2025-04-14 18:13:19'),
(26, 11, 'system', 'Hello! How are you feeling today? What would you like to reflect on in your journal entry?', '2025-04-14 18:13:20'),
(27, 11, 'user', 'im doing great because my journal app is working\r\n', '2025-04-14 18:13:43'),
(28, 11, 'system', 'That\'s fantastic! Having a reliable tool for reflection can significantly enhance your journaling experience. How has using the app improved your journaling process and personal growth?', '2025-04-14 18:13:44'),
(29, 12, 'user', 'hiii how are you ', '2025-04-14 18:23:01'),
(30, 12, 'system', 'Hello! I\'m here and ready to help. How are you feeling today?', '2025-04-14 18:23:01'),
(31, 12, 'user', 'great ', '2025-04-14 18:23:16'),
(32, 12, 'system', 'It\'s wonderful to see positivity in your reflection! What specific events or feelings made today stand out to you as \"great\"?', '2025-04-14 18:23:17'),
(33, 12, 'user', 'oh jerad finished the journall logic and im so happy because he is the best and digna is cool too\r\n', '2025-04-14 18:23:51'),
(34, 12, 'system', 'It\'s wonderful to see your appreciation for Jerad\'s hard work! Celebrating achievements builds a positive environment. How does Digna contribute to your team\'s dynamic and success?', '2025-04-14 18:23:52'),
(35, 13, 'user', 'hi do you know about me from the context i gave you?', '2025-04-14 18:48:38'),
(36, 13, 'system', 'Each journal entry helps me understand you better, offering insights into your thoughts and feelings. Reflecting on them enriches the journaling experience. What\'s been on your mind lately that you\'d like to explore further?', '2025-04-14 18:48:42'),
(37, 13, 'user', 'what do you know about me?', '2025-04-14 18:48:56'),
(38, 13, 'system', 'I don’t have any previous information about you. My insights and reflections are solely based on the content you choose to share in your journal entries. What\'s important to you today?', '2025-04-14 18:48:56'),
(39, 13, 'user', 'how about now', '2025-04-14 18:51:56'),
(40, 14, 'user', 'hi do you know about me from the context i gave you?', '2025-04-14 18:52:12'),
(41, 13, 'user', 'how about now\r\n', '2025-04-14 18:52:34'),
(42, 15, 'user', 'what do you know about me?', '2025-04-14 18:54:17'),
(43, 15, 'system', 'Hey there! I know you\'re striving to become a fantastic developer of educational and fun apps. You move at your own pace and find grounding in taking life easy. You\'re proud of your chill vibe. How does your relaxed nature help or hinder your goals?', '2025-04-14 18:54:19');

-- --------------------------------------------------------

--
-- Table structure for table `journal_entries`
--

CREATE TABLE `journal_entries` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `journal_entries`
--

INSERT INTO `journal_entries` (`id`, `user_id`, `title`, `created_at`) VALUES
(1, 1, 'my first journal', '2025-03-17 18:10:20'),
(2, 1, 'This is my Second Journal', '2025-03-17 18:27:15'),
(3, 1, 'This is my Second Journal', '2025-03-17 18:28:27'),
(4, 1, 'This is my Second Journal', '2025-03-17 18:29:37'),
(5, 1, 'This is my Second Journal', '2025-03-17 18:31:44'),
(6, 1, 'This is my Second Journal', '2025-03-17 18:40:04'),
(7, 1, 'This is my Second Journal', '2025-03-17 18:41:30'),
(8, 1, 'THIS IS MY FIRST JOURNAL with ai', '2025-03-24 16:16:04'),
(9, 10, 'hello 1', '2025-04-14 17:58:31'),
(10, 10, 'hello 2', '2025-04-14 17:58:59'),
(11, 11, 'abc', '2025-04-14 18:04:07'),
(12, 12, 'first journal', '2025-04-14 18:23:01'),
(13, 13, 'jerad', '2025-04-14 18:48:38'),
(14, 13, 'jerad2', '2025-04-14 18:52:12'),
(15, 13, 'onboard', '2025-04-14 18:54:17');

-- --------------------------------------------------------

--
-- Table structure for table `moods`
--

CREATE TABLE `moods` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `mood` varchar(50) NOT NULL,
  `notes` text,
  `recordedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `moods`
--

INSERT INTO `moods` (`id`, `userId`, `mood`, `notes`, `recordedAt`) VALUES
(1, 1, 'Happy', 'Feeling productive today!', '2025-03-10 17:04:15'),
(2, 2, 'Motivated', 'Excited to build something new.', '2025-03-10 17:04:15'),
(3, 3, 'Relaxed', 'Had a calm and peaceful day.', '2025-03-10 17:04:15');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `message` text NOT NULL,
  `isRead` tinyint(1) DEFAULT '0',
  `sentAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `userId`, `message`, `isRead`, `sentAt`) VALUES
(1, 1, 'Don’t forget to check in today!', 0, '2025-03-10 17:04:15'),
(2, 2, 'Your pet Luna wants to play!', 0, '2025-03-10 17:04:15'),
(3, 3, 'You have unlocked a new achievement!', 1, '2025-03-10 17:04:15');

-- --------------------------------------------------------

--
-- Table structure for table `pets`
--

CREATE TABLE `pets` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `happiness` int(11) DEFAULT '50',
  `level` int(11) DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pets`
--

INSERT INTO `pets` (`id`, `userId`, `name`, `type`, `happiness`, `level`, `createdAt`) VALUES
(1, 1, 'Sparky', 'Fox', 80, 2, '2025-03-10 17:04:15'),
(2, 2, 'Luna', 'Cat', 70, 1, '2025-03-10 17:04:15'),
(3, 3, 'Nova', 'Dragon', 90, 3, '2025-03-10 17:04:15');

-- --------------------------------------------------------

--
-- Table structure for table `pet_actions`
--

CREATE TABLE `pet_actions` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `petId` int(11) NOT NULL,
  `action` varchar(50) NOT NULL,
  `happinessChange` int(11) DEFAULT '0',
  `actionTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pet_actions`
--

INSERT INTO `pet_actions` (`id`, `userId`, `petId`, `action`, `happinessChange`, `actionTime`) VALUES
(1, 1, 1, 'Fed', 5, '2025-03-10 17:04:15'),
(2, 2, 2, 'Played', 10, '2025-03-10 17:04:15'),
(3, 3, 3, 'Trained', 7, '2025-03-10 17:04:15');

-- --------------------------------------------------------

--
-- Table structure for table `store_items`
--

CREATE TABLE `store_items` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `store_items`
--

INSERT INTO `store_items` (`id`, `name`, `description`, `price`) VALUES
(1, 'Pet Food', 'A tasty treat for your pet.', 50),
(2, 'Toy Ball', 'A fun ball for your pet to play with.', 100),
(3, 'Magic Potion', 'Boosts pet happiness instantly.', 200);

-- --------------------------------------------------------

--
-- Table structure for table `streaks`
--

CREATE TABLE `streaks` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `currentStreak` int(11) DEFAULT '0',
  `longestStreak` int(11) DEFAULT '0',
  `lastEntryDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `streaks`
--

INSERT INTO `streaks` (`id`, `userId`, `currentStreak`, `longestStreak`, `lastEntryDate`) VALUES
(1, 1, 3, 7, '2025-03-09'),
(2, 2, 5, 10, '2025-03-10'),
(3, 3, 1, 3, '2025-03-08');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `passwordHash` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `shards` int(11) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `has_completed_onboarding` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `passwordHash`, `createdAt`, `shards`, `created_at`, `has_completed_onboarding`) VALUES
(1, 'Jared', 'jared@example.com', 'hashedpassword1', '2025-03-10 17:04:15', 0, '2025-03-24 17:35:31', 0),
(2, 'Alex', 'alex@example.com', 'hashedpassword2', '2025-03-10 17:04:15', 0, '2025-03-24 17:35:31', 0),
(3, 'Taylor', 'taylor@example.com', 'hashedpassword3', '2025-03-10 17:04:15', 0, '2025-03-24 17:35:31', 0),
(6, 'JurdBurd', 'jeradbeauregard@gmail.com', 'hashedpassword', '2025-03-17 18:07:51', 0, '2025-03-24 17:35:31', 0),
(7, 'JurdBurdgurd', 'jeradb@gmail.com', '$2b$10$5oziBaTrMLs3Decdu8x3wOsRASdcJ1N04Wv5/3.YxvIcJoLWypUPi', '2025-03-24 17:24:50', 0, '2025-03-24 17:35:31', 0),
(8, 'jurd64', 'jerad@gmail.com', '$2b$10$dh3Z7wVhxmwiYn67r7eQkexLvj5/p1bx5XDLnv8KvnpgUM9Kl0Mo6', '2025-03-24 17:25:06', 0, '2025-03-24 17:35:31', 0),
(9, 'Jared123', '1@gmail.com', '$2b$10$g7xcgsAdUpReRslpSfJ/j.KAUvtil.i0JTb58wuLviKO6W3nWT.z.', '2025-03-24 17:26:08', 0, '2025-03-24 17:35:31', 0),
(10, 'jurd1', 'jerad1@gmail.com', '$2b$10$6ZODE6LMY288VAph2L4tK.YbWd32le4fToQigLYas2UqbBz/ocS76', '2025-04-14 16:59:09', 0, '2025-04-14 16:59:09', 0),
(11, 'dignapatel0', 'digna@gmail.com', '$2b$10$D5reCYXWJ1FIVpfbO/cS7eWA3sSuNKjF3wwfG0Q9pkfCd1vwqcrDC', '2025-04-14 18:03:33', 0, '2025-04-14 18:03:33', 0),
(12, 'rockiesingh', 'rockiesingh007@gmail.com', '$2b$10$h19xUyGehe4YTvoTc3unPOPW607Rc5OXj4bzisyL3G5/bgCQbAlC6', '2025-04-14 18:22:11', 0, '2025-04-14 18:22:11', 0),
(13, 'onboard', 'onboard@gmail.com', '$2b$10$cLJC/R99adidWba6sZmEvuzv15/MEBJkBKI7/fryoCuvCkwMBkM8i', '2025-04-14 18:42:17', 0, '2025-04-14 18:42:17', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_onboarding`
--

CREATE TABLE `user_onboarding` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  `answer` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_onboarding`
--

INSERT INTO `user_onboarding` (`id`, `user_id`, `question`, `answer`, `created_at`) VALUES
(1, 13, 'What are your current goals?', 'I want to become a great developer of education and fun applications', '2025-04-14 18:48:13'),
(2, 13, 'What do you struggle with most?', 'I am a lazy person and I like to take my time with life', '2025-04-14 18:48:13'),
(3, 13, 'What helps you feel grounded?', 'taking my time with life', '2025-04-14 18:48:13'),
(4, 13, 'How do you want to feel more often?', 'grounded centered', '2025-04-14 18:48:13'),
(5, 13, 'What\'s something you\'re proud of?', 'I am proud of my chillness', '2025-04-14 18:48:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `achievements`
--
ALTER TABLE `achievements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `itemId` (`itemId`);

--
-- Indexes for table `journals`
--
ALTER TABLE `journals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `journal_conversations`
--
ALTER TABLE `journal_conversations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `journal_id` (`journal_id`);

--
-- Indexes for table `journal_entries`
--
ALTER TABLE `journal_entries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `moods`
--
ALTER TABLE `moods`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `pets`
--
ALTER TABLE `pets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `pet_actions`
--
ALTER TABLE `pet_actions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `petId` (`petId`);

--
-- Indexes for table `store_items`
--
ALTER TABLE `store_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `streaks`
--
ALTER TABLE `streaks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_onboarding`
--
ALTER TABLE `user_onboarding`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `achievements`
--
ALTER TABLE `achievements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `journals`
--
ALTER TABLE `journals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `journal_conversations`
--
ALTER TABLE `journal_conversations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `journal_entries`
--
ALTER TABLE `journal_entries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `moods`
--
ALTER TABLE `moods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pets`
--
ALTER TABLE `pets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pet_actions`
--
ALTER TABLE `pet_actions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `store_items`
--
ALTER TABLE `store_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `streaks`
--
ALTER TABLE `streaks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `user_onboarding`
--
ALTER TABLE `user_onboarding`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `achievements`
--
ALTER TABLE `achievements`
  ADD CONSTRAINT `achievements_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `inventory`
--
ALTER TABLE `inventory`
  ADD CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `inventory_ibfk_2` FOREIGN KEY (`itemId`) REFERENCES `store_items` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `journals`
--
ALTER TABLE `journals`
  ADD CONSTRAINT `journals_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `journal_conversations`
--
ALTER TABLE `journal_conversations`
  ADD CONSTRAINT `journal_conversations_ibfk_1` FOREIGN KEY (`journal_id`) REFERENCES `journal_entries` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `journal_entries`
--
ALTER TABLE `journal_entries`
  ADD CONSTRAINT `journal_entries_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `moods`
--
ALTER TABLE `moods`
  ADD CONSTRAINT `moods_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pets`
--
ALTER TABLE `pets`
  ADD CONSTRAINT `pets_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pet_actions`
--
ALTER TABLE `pet_actions`
  ADD CONSTRAINT `pet_actions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `pet_actions_ibfk_2` FOREIGN KEY (`petId`) REFERENCES `pets` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `streaks`
--
ALTER TABLE `streaks`
  ADD CONSTRAINT `streaks_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
