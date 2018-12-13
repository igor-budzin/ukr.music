-- Adminer 4.2.5 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

CREATE DATABASE `ukr-music` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `ukr-music`;

DROP TABLE IF EXISTS `audio`;
CREATE TABLE `audio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `link` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `artists` varchar(255) NOT NULL,
  `album` varchar(255) NOT NULL,
  `year` varchar(255) NOT NULL,
  `genre` varchar(255) NOT NULL,
  `duration` int(11) NOT NULL,
  `picture` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- 2018-12-13 15:19:07
