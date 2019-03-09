DROP TABLE IF EXISTS `cases`;
DROP TABLE IF EXISTS `images`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `animals`;

-- --------------------------------------------------------
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
(17, 'golden retriever', 'yellow', 'Rocky', 'large', 'dog', 'female', 'A description'),
(18, 'golden retriever', 'yellow', 'Rocky', 'medium', 'dog', 'male', 'A description'),
(19, 'pug', 'black', 'Rocky', 'small', 'dog', 'male', 'A description'),
(20, 'unknown', 'white', 'Cutie', 'small', 'cat', 'male', 'A description'),
(21, 'unknown', 'white', 'Miya', 'medium', 'cat', 'female', 'A description'),
(22, 'golden retreiver', 'white', 'Miya', 'medium', 'dog', 'female', 'A description'),
(23, 'golden retreiver', 'golden', 'Max', 'large', 'dog', 'female', 'A description'),
(24, 'golden retreiver', 'golden', 'Max', 'large', 'dog', 'female', 'A description'),
(25, 'golden retreiver', 'golden', 'Max', 'large', 'dog', 'female', 'A description'),
(26, 'golden retreiver', 'golden', 'Max', 'large', 'dog', 'female', 'A description'),
(27, 'golden retreiver', 'golden', 'Max', 'large', 'dog', 'female', 'A description'),
(28, 'golden retreiver', 'golden', 'Max', 'large', 'dog', 'female', 'A description'),
(29, 'golden retreiver', 'golden', 'Max', 'large', 'dog', 'female', 'A description'),
(30, NULL, NULL, NULL, 'medium', 'cat', NULL, 'white');

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
  `caseKey` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cases`
--

INSERT INTO `cases` (`id`, `caseType`, `city`, `location`, `state`, `zipcode`, `latitude`, `longitude`, `coverImg`, `animalID`, `userID`, `date`, `caseKey`) VALUES
(11, 'lost', 'Irvine', 'Spectrum Center Drive', 'CA', 92648, 44.0541, -123.074, '/images/87e77324afdbc07f20c0b1dbf5c99ff2', 17, 17, '2019-03-04', '123'),
(12, 'found', 'Irvine', 'jefferey rd', 'CA', 92648, 33.8135, -117.924, '/images/fa58a1bf6cd1e24809017e6b8ef71034', 18, 18, '2019-03-04', '234'),
(13, 'found', 'Irvine', '9200 Irvine center drive', 'CA', 92648, 33.6685, -117.763, '/images/d76fbd9e8a8c6f2c8595a7500633af4f', 19, 19, '2019-03-04', '345'),
(14, 'found', 'Anaheim', 'orangewood drive', 'CA', 92648, 32.9827, -117.251, '/images/c4676833fa0662102730a86ae8792045', 20, 20, '2019-03-04', '456'),
(15, 'found', 'Anaheim', 'Disneyland Drive', 'CA', 92648, 33.6405, -117.844, '/images/919ed208370fea381dfc53f0a1c87ba9', 21, 21, '2019-03-04', '567'),
(16, 'lost', 'Garden Grove', 'garden grove boulevard', 'CA', 92648, 33.7198, -117.885, '/images/0de5f9358e3c5aa946affd8a1951658d', 22, 22, '2019-03-04', '678'),
(17, 'lost', 'Costa Mesa', 'West 19th Street', 'CA', 92648, 33.66, -117.86, '/images/3fb6b5a15f9bd218d84d13279080e7ca', 23, 23, '2019-03-04', '789'),
(18, 'lost', 'Costa Mesa', 'Bristol St', 'CA', 92648, 33.7198, -117.885, '/images/3e135e83d7c41973a215cb2aa70098f1', 27, 27, '2019-03-04', ''),
(19, 'lost', 'Irvine', 'Costa Mesa', 'CA', 92648, 33.7198, -117.885, '/images/5ec18168831469bf74e2da0f7d4b60f9', 28, 28, '2019-03-04', ''),
(20, 'lost', 'Irvine', 'UC IRVINE', 'CA', 92648, 33.6405, -117.844, '/images/b71b80bb672e8ecbff0649cde0e7bb9a', 29, 29, '2019-03-04', ''),
(21, 'lost', 'Irvine', '8691 Irvine Center Dr', 'CA', 92618, 33.6986, -117.76, '/images/94d2f0204ebf41cd10842261aeb5855e', 30, 30, '2019-03-07', 'UN1UT3');

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
(17, 'John Doe', 'hohum@gmail.com', '1-888-555-1212'),
(18, 'Ann ', 'hohum@gmail.com', '1-888-555-1212'),
(19, 'Ann ', 'hohum@gmail.com', '1-888-555-1212'),
(20, 'Ann ', 'hohum@gmail.com', '1-888-555-1212'),
(21, 'Ann ', 'hohum@gmail.com', '1-888-555-1212'),
(22, 'Ann ', 'hohum@gmail.com', '1-888-555-1212'),
(23, 'Ann ', 'hohum@gmail.com', '1-888-555-1212'),
(24, 'Ann ', 'hohum@gmail.com', '1-888-555-1212'),
(25, 'Ann ', 'hohum@gmail.com', '1-888-555-1212'),
(26, 'Ann ', 'hohum@gmail.com', '1-888-555-1212'),
(27, 'Ann ', 'hohum@gmail.com', '1-888-555-1212'),
(28, 'Ann ', 'hohum@gmail.com', '1-888-555-1212'),
(29, 'Ann ', 'hohum@gmail.com', '1-888-555-1212'),
(30, 'human', '123@123.com', '232949343');

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `cases`
--
ALTER TABLE `cases`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

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


