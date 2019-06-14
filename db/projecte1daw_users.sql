-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: localhost    Database: projecte1daw
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.38-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `type` varchar(50) NOT NULL DEFAULT 'Client',
  `img` varchar(1000) DEFAULT 'default-avatar.png',
  `telephone` varchar(45) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `token` varchar(200) DEFAULT NULL,
  `enabledAccount` tinyint(4) DEFAULT '0',
  `sociallogin` varchar(45) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (-1,NULL,'','','$2y$10$g3rTcoewsySmvJedDTvqi.8WzRAU4k.xie2.uBN773RMxU7ZBS9LK','Unlogged','default-avatar.png',NULL,NULL,'wqer',0,'0'),(13,NULL,'test@test.es','test','$2y$10$g3rTcoewsySmvJedDTvqi.8WzRAU4k.xie2.uBN773RMxU7ZBS9LK','Client','default-avatar.png',NULL,NULL,'wqefccads',0,'0'),(14,NULL,'eail@email.com','username','$2y$10$g3rTcoewsySmvJedDTvqi.8WzRAU4k.xie2.uBN773RMxU7ZBS9LK','Client','default-avatar.png',NULL,NULL,'wqerfdqscxeqwfd',0,'0'),(17,NULL,'admin@admin.es','admin','$2y$10$U70H0ji.kbpx0yR4ftEKqOKIpUD7oGblz548Nht0aUZNp3b6xV036','Client','default-avatar.png',NULL,NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZXNzYWdlIjoiYWJjIiwiZXhwIjoxNTU3OTM1MjYyfQ.KndhTgjIGqg1H72emsZG4nSQJUHBp0WXRN-LM-zHyZo',1,'0'),(33,'','jordillopis00@gmail.com','asdf','$2y$10$pBK2Obhl2IvcrN/oU5ym7uISVp6gJ3sdHONggFws9HTVvRrIl9KY6','Client','frontend/assets/media/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZXNzYWdlIjoiYXNkZiIsImV4cCI6MTU1OTY2OTk4MH0.qFrcMRoe4hZPIm_sQrPWBqauezswh4Oi0G0LQC381fg_12_flowers.png','','ES-CU','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZXNzYWdlIjoiYWJjIiwiZXhwIjoxNTU4MzQ1MzE1fQ.LsU7ynTBI9kDtxsjHacZT-fI1NuuR-FWUisa4qFb7zE',1,'0'),(36,NULL,'aaaa@aaaa.aa','aaaa','$2y$10$n.DNDeZylRQjC09eKMMOaOrNqDD6TtSg3Rru2qb2TBkVU8FAbhcfi','Client','default-avatar.png',NULL,NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZXNzYWdlIjoiYWJjIiwiZXhwIjoxNTU4NjIzNjA2fQ.lRAm1mwMY9iSU8wOlSIuZ8jDis0UG-FRa9faGRhBLRQ',0,'0'),(37,NULL,'jordillopis00@gmail.com','qwerty','$2y$10$BZgRiWndXt6zSa.ySONA..uytlwIjz5KOwD8C9HPT280tM.8Ny2qS','Client','default-avatar.png',NULL,NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZXNzYWdlIjoicXdlcnR5IiwiZXhwIjoxNTU4NjI2NjQxfQ.XCFuBIMfaoJ2f1ndPAtEZN3r22Q_fsSOyWkVRjb43Rk',1,'0'),(38,NULL,'jordillopis01@gmail.com','admin2','$2y$10$yLUPamkR4MQN/gCa5RxRJeX9znDoGhqb/oKx9byb0Fdzl0xY8Or..','Client','default-avatar.png',NULL,NULL,NULL,0,'0'),(40,'','','jordillopisiestacio','','Client','https://lh6.googleusercontent.com/-fSo70OnK01o/AAAAAAAAAAI/AAAAAAAAACU/wzeme3qrLXI/photo.jpg','','AZ-NX','',1,'1'),(41,NULL,NULL,'Jordilg13',NULL,'Client','https://avatars0.githubusercontent.com/u/34525210?v=4',NULL,NULL,NULL,1,'1'),(51,NULL,'ethan@gmail.com','ethan','$2y$10$Epwob8oVPGc5ZleeKjgZ7e/Q2tKa2p9feai3JqmaDNMdGlQzGGidu','Client','default-avatar.png',NULL,NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZXNzYWdlIjoiZXRoYW4iLCJleHAiOjE1NjAzNTY0OTJ9.fraExsNZE5c-qj1xmMzH6xntAVSW6mF-CVXCTpZc5x8',1,'0'),(52,NULL,'jordillopis00@gmail.com','ethan3','$2y$10$3mJZOcXhQ/AbdqwVpkQvFuTLg3L693Zrmy2.3TlkF/3NXAStAdaWG','Client','default-avatar.png',NULL,NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZXNzYWdlIjoiZXRoYW4zIiwiZXhwIjoxNTYwNDI0MTkxfQ.37a8yCPfEoaVM-pj8o7A0VhOIr2jVZVQV0udn33WqNM',1,'0');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-14 18:02:30
