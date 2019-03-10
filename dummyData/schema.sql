DROP TABLE IF EXISTS `cases`;
DROP TABLE IF EXISTS `images`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `animals`;

-- --------------------------------------------------------

--
-- Table structure for table `animals`
--

CREATE TABLE `animals` (
  `id` bigint(20) NOT NULL,
  `breed` varchar(25) DEFAULT NULL,
  `color` varchar(15) DEFAULT NULL,
  `name` varchar(15) DEFAULT NULL,
  `size` varchar(15) NOT NULL,
  `animalType` varchar(15) NOT NULL,
  `gender` varchar(8) DEFAULT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `animals`
--

INSERT INTO `animals` (`id`, `breed`, `color`, `name`, `size`, `animalType`, `gender`, `description`) VALUES
(37, 'golden retreiver', 'golden', NULL, 'large', 'dog', 'female', 'smart and cute'),
(38, 'golden retreiver', 'golden', NULL, 'small', 'dog', 'male', 'smart and cute');

-- --------------------------------------------------------

--
-- Table structure for table `cases`
--

CREATE TABLE `cases` (
  `id` bigint(20) NOT NULL,
  `caseType` varchar(5) NOT NULL,
  `city` varchar(40) NOT NULL,
  `location` varchar(100) NOT NULL,
  `state` varchar(2) NOT NULL,
  `zipcode` mediumint(9) NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `coverImg` varchar(100) NOT NULL,
  `animalID` bigint(20) NOT NULL,
  `userID` bigint(20) NOT NULL,
  `date` date NOT NULL,
  `caseKey` varchar(6) NOT NULL,
  `status` enum('active','inactive','close','') NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cases`
--

INSERT INTO `cases` (`id`, `caseType`, `city`, `location`, `state`, `zipcode`, `latitude`, `longitude`, `coverImg`, `animalID`, `userID`, `date`, `caseKey`, `status`) VALUES
(27, 'lost', 'Irvine', 'UC IRVINE', 'CA', 92617, 33.6405, -117.844, '/images/c72eac9a404789e6ad875fdba04f073a', 37, 37, '2019-03-04', '123a', 'active'),
(28, 'found', 'Irvine', '10 McLaren', 'CA', 92618, 33.6342, -117.718, '/images/ee24f98a4d6ce76d8e5d71f40e3b13b3', 38, 38, '2019-03-08', '234v', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` bigint(20) NOT NULL,
  `imgURL` varchar(40) NOT NULL,
  `animalID` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `name` varchar(60) NOT NULL,
  `email` varchar(30) NOT NULL,
  `phone` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`) VALUES
(37, 'Max', 'hohum@gmail.com', '1-888-555-1212'),
(38, 'Max', '123@123.com', '1-888-555-1212');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `animals`
--
ALTER TABLE `animals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cases`
--
ALTER TABLE `cases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cases_fk1` (`animalID`),
  ADD KEY `cases_fk2` (`userID`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `images_fk0` (`animalID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `animals`
--
ALTER TABLE `animals`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `cases`
--
ALTER TABLE `cases`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cases`
--
ALTER TABLE `cases`
  ADD CONSTRAINT `cases_fk1` FOREIGN KEY (`animalID`) REFERENCES `animals` (`id`),
  ADD CONSTRAINT `cases_fk2` FOREIGN KEY (`userID`) REFERENCES `users` (`id`);

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_fk0` FOREIGN KEY (`animalID`) REFERENCES `animals` (`id`);
COMMIT;


