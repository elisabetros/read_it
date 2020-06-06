-- MariaDB dump 10.17  Distrib 10.4.11-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: read_it
-- ------------------------------------------------------
-- Server version	10.4.11-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookreview`
--

DROP TABLE IF EXISTS `bookreview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bookreview` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `book_id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `book_title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  `review` text NOT NULL,
  `rating` int(11) NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `bookreview_user_id_foreign` (`user_id`),
  CONSTRAINT `bookreview_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookreview`
--

LOCK TABLES `bookreview` WRITE;
/*!40000 ALTER TABLE `bookreview` DISABLE KEYS */;
INSERT INTO `bookreview` VALUES (2,'MH48bnzN0LUC','Could be better','The Kite Runner','','http://books.google.com/books/content?id=MH48bnzN0LUC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE71-DHrrEiaLcmcvLIaD7wBAt2On7ChCpFmrNRDcWYP_T93pS3jPe6a16UG-R-5mVI78-wmFZ4qG0e0qp3dGoknqA7K3Ucrn9Kt8BOUM37JJw0Eif4ZnpIuWfYazMWZkxji7hUsS&source=gbs_','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce gravida imperdiet libero, et laoreet risus pellentesque vitae. Pellentesque porttitor orci at vulputate dictum. Cras eget erat mi. Donec mattis risus odio, ac pulvinar neque tristique vel. Sed eu diam vel massa interdum bibendum id eget augue. Etiam quis tellus ante. Etiam sed risus at elit tempor facilisis et vel risus. Curabitur dictum, velit eget lacinia egestas, massa urna ultrices nunc, sit amet pellentesque est lacus eget quam. Nunc congue ultricies dui, et volutpat arcu aliquam at. Aliquam id tortor eros.\n\nFusce ut lacus ac nibh scelerisque sollicitudin eget tincidunt metus. Donec vehicula ac enim quis efficitur. Vivamus nec nulla sem. Nam eros est, lacinia eu dictum et, fermentum in lacus. Pellentesque efficitur neque diam, ac efficitur massa gravida eget. Proin vestibulum diam a est eleifend viverra. Pellentesque malesuada orci id finibus convallis. Etiam in porta sapien. Phasellus eu purus ligula.',3,1),(3,'YiriAwAAQBAJ','My favorite Paul Auster book','Genfærd','','http://books.google.com/books/content?id=YiriAwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE723Sk9MYaV3KLFIPS7RllMw2vwOqT4-mdQ87J6FQ9kFy5Drk-Jynphzn7R9Sex0DtlJY-RD1Pe7UXOslJEqvA0Cc5GQyOKrj8iwjbrTazJyQBzQdT996lpNpcGOZPUnWppclYan&source=gbs_','Brilliant book\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce gravida imperdiet libero, et laoreet risus pellentesque vitae. Pellentesque porttitor orci at vulputate dictum. Cras eget erat mi. Donec mattis risus odio, ac pulvinar neque tristique vel. Sed eu diam vel massa interdum bibendum id eget augue. Etiam quis tellus ante. Etiam sed risus at elit tempor facilisis et vel risus. Curabitur dictum, velit eget lacinia egestas, massa urna ultrices nunc, sit amet pellentesque est lacus eget quam. Nunc congue ultricies dui, et volutpat arcu aliquam at. Aliquam id tortor eros.',3,4),(4,'FZOdS_02yacC','Lorem ipsum','Dune: The Gateway Collection','','http://books.google.com/books/content?id=FZOdS_02yacC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE70du56aYSqjYdSQ3_XbGn8vEOFMeaRvxdHBC3gWT8AYc4SrpMxHQtf_D_1ztRvsx1quzJ28VPHavWkOp7yiJq6cUVOMQcZSz4NbnQJ_cZhqRXE75Khciy85969fgJUTouinWidl&source=gbs_','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce gravida imperdiet libero, et laoreet risus pellentesque vitae. Pellentesque porttitor orci at vulputate dictum. Cras eget erat mi. Donec mattis risus odio, ac pulvinar neque tristique vel. Sed eu diam vel massa interdum bibendum id eget augue. Etiam quis tellus ante. Etiam sed risus at elit tempor facilisis et vel risus. Curabitur dictum, velit eget lacinia egestas, massa urna ultrices nunc, sit amet pellentesque est lacus eget quam. Nunc congue ultricies dui, et volutpat arcu aliquam at. Aliquam id tortor eros.',3,3);
/*!40000 ALTER TABLE `bookreview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knex_migrations`
--

DROP TABLE IF EXISTS `knex_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `knex_migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations`
--

LOCK TABLES `knex_migrations` WRITE;
/*!40000 ALTER TABLE `knex_migrations` DISABLE KEYS */;
INSERT INTO `knex_migrations` VALUES (11,'20200519140051_initial_migration.js',1,'2020-06-03 19:46:30');
/*!40000 ALTER TABLE `knex_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knex_migrations_lock`
--

DROP TABLE IF EXISTS `knex_migrations_lock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `knex_migrations_lock` (
  `index` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `is_locked` int(11) DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations_lock`
--

LOCK TABLES `knex_migrations_lock` WRITE;
/*!40000 ALTER TABLE `knex_migrations_lock` DISABLE KEYS */;
INSERT INTO `knex_migrations_lock` VALUES (1,0);
/*!40000 ALTER TABLE `knex_migrations_lock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likedbook`
--

DROP TABLE IF EXISTS `likedbook`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `likedbook` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `book_id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) DEFAULT NULL,
  `img` varchar(255) NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `likedbook_user_id_foreign` (`user_id`),
  CONSTRAINT `likedbook_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likedbook`
--

LOCK TABLES `likedbook` WRITE;
/*!40000 ALTER TABLE `likedbook` DISABLE KEYS */;
INSERT INTO `likedbook` VALUES (1,'Ojqi8KbWuLwC','Ender\'s Game','Orson Scott Card','http://books.google.com/books/content?id=Ojqi8KbWuLwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',1),(2,'MH48bnzN0LUC','The Kite Runner','Khaled Hosseini','http://books.google.com/books/content?id=MH48bnzN0LUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',1),(3,'BzM0DwAAQBAJ','The Book of Why','Judea Pearl,Dana Mackenzie','http://books.google.com/books/content?id=BzM0DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',1),(6,'xHZl0yC8B90C','As You Like It','William Shakespeare','http://books.google.com/books/content?id=xHZl0yC8B90C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',4),(7,'9K7yUWtcb2EC','Undefined','Kristina Dizard','http://books.google.com/books/content?id=9K7yUWtcb2EC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',4),(8,'BzM0DwAAQBAJ','The Book of Why','Judea Pearl,Dana Mackenzie','http://books.google.com/books/content?id=BzM0DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',4),(9,'c--RDwAAQBAJ','D-dag','Jakob Sørensen','http://books.google.com/books/content?id=c--RDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',4),(10,'MNZcCgAAQBAJ','Jeg er B-menneske','Camilla Kring','http://books.google.com/books/content?id=MNZcCgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',4),(11,'E0xbAgAAQBAJ','D-dag','Antony Beevor','http://books.google.com/books/content?id=E0xbAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',4),(12,'UDuywD-EzU0C','The Canterbury Tales','Geoffrey Chaucer','http://books.google.com/books/content?id=UDuywD-EzU0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',4),(13,'qe-7mCuNXIMC','The Jack Tales','Richard Chase','http://books.google.com/books/content?id=qe-7mCuNXIMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',4),(14,'YiriAwAAQBAJ','Genfærd','Paul Auster','http://books.google.com/books/content?id=YiriAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',4),(15,'k-waBwAAQBAJ','Conversations with Paul Auster','James M. Hutchisson','http://books.google.com/books/content?id=k-waBwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',4),(20,'FZOdS_02yacC','Dune: The Gateway Collection','Frank Herbert','http://books.google.com/books/content?id=FZOdS_02yacC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',3),(22,'o7tmCwAAQBAJ','Human Is','Philip K. Dick','http://books.google.com/books/content?id=o7tmCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',3);
/*!40000 ALTER TABLE `likedbook` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `token_exp_date` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'keakeakea45@gmail.com','Maria','Bono','$2b$10$nC23ppG9UP851to3DXjlFed0FMRnVe0VEcvpw929OABxDIScHHoFG',NULL,NULL,'2020-06-03 19:46:48'),(2,'lisa@gmail.com','Lisa','Benson','$2b$10$HcNLFGKkjpF2uOOTPCEEeuVNqallmZcAmKZr8bxUcx1LfAPUIUpqC',NULL,NULL,'2020-06-05 17:28:00'),(3,'trevor@user.com','Trevor','Trev','$2b$10$N68zRuaFWA5Sy2Idh.jcJeLNrUd62wTlZ9USEAtxXr9DZxPzBesGm',NULL,NULL,'2020-06-05 18:27:58'),(4,'yolanda@ugms.com','Yolanda','Dynamite','$2b$10$4RQKsBSLXi5JxJqGbXyaJ.HIUHrsgsgav66eaAVetZf9MxT8cliGO',NULL,NULL,'2020-06-05 18:28:36');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-06 12:12:58
