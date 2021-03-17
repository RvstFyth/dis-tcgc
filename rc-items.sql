-- MariaDB dump 10.18  Distrib 10.5.8-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: runecord
-- ------------------------------------------------------
-- Server version	10.5.8-MariaDB

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
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `level` int(11) DEFAULT 1,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stacks` tinyint(4) DEFAULT 0,
  `slot` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `meta` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,'logs',1,'....',NULL,0,'',NULL,0),(2,'feather',1,'.....',NULL,1,'',NULL,2),(3,'copper ore',1,NULL,NULL,0,'',NULL,3),(4,'tin ore',1,NULL,NULL,0,'',NULL,3),(5,'clay',1,NULL,NULL,0,'',NULL,1),(6,'rune essence',1,NULL,NULL,0,'',NULL,6),(7,'rock',1,NULL,NULL,0,'',NULL,1),(8,'limestone',1,NULL,NULL,0,'',NULL,10),(9,'blurite ore',1,NULL,NULL,0,'',NULL,3),(10,'iron ore',1,NULL,NULL,0,'',NULL,17),(11,'elemental ore',1,NULL,NULL,0,'',NULL,5),(12,'daeyalt ore',1,NULL,NULL,0,'',NULL,100),(13,'silver ore',1,NULL,NULL,0,'',NULL,75),(14,'volcanic ash',1,NULL,NULL,0,'',NULL,200),(15,'pure essence',1,NULL,NULL,0,'',NULL,4),(16,'coal',1,NULL,NULL,0,'',NULL,45),(17,'pay-dirt',1,NULL,NULL,0,'',NULL,20),(18,'sandstone',1,NULL,NULL,0,'',NULL,1),(19,'dense essence block',1,NULL,NULL,0,'',NULL,30),(20,'gem rock',1,NULL,NULL,0,'',NULL,0),(21,'gold ore',1,NULL,NULL,0,'',NULL,150),(22,'volcanic sulphur',1,NULL,NULL,0,'',NULL,10),(23,'granite',1,NULL,NULL,0,'',NULL,1),(24,'mithril ore',1,NULL,NULL,0,'',NULL,162),(25,'lunar ore',1,NULL,NULL,0,'',NULL,3),(26,'daeyalt shard',1,NULL,NULL,0,'',NULL,20),(27,'lovakite ore',1,NULL,NULL,0,'',NULL,80),(28,'adamantite ore',1,NULL,NULL,0,'',NULL,400),(29,'soft clay',1,NULL,NULL,0,'',NULL,2),(30,'salt',1,NULL,NULL,0,'',NULL,0),(31,'runite ore',1,NULL,NULL,0,'',NULL,3200),(32,'amethyst',1,NULL,NULL,0,'',NULL,3900),(33,'raw shrimps',1,NULL,NULL,0,'',NULL,5),(34,'cooked shrimps',1,NULL,'consumable',0,'','{\"hitpoints\":3}',5),(35,'burnt shrimps',1,NULL,NULL,0,'',NULL,0),(36,'bronze bar',1,NULL,NULL,0,'','',8),(37,'bronze dagger',1,NULL,NULL,0,'weapon','{\"type\":\"melee\",\"stats\":{\"attack\":{\"stab\":4,\"slash\":2,\"crush\":-4,\"magic\":1,\"ranged\":0},\"defence\":{\"stab\":0,\"slash\":0,\"crush\":0,\"magic\":1,\"ranged\":0},\"other\":{\"melee\":3,\"ranged\":0,\"magic\":0,\"prayer\":0}},\"styles\":{\"stab\":{\"type\":\"stab\",\"style\":\"accurate\"},\"lunge\":{\"type\":\"stab\",\"style\":\"aggressive\"},\"slash\":{\"type\":\"slash\",\"style\":\"aggressive\"},\"block\":{\"type\":\"stab\",\"style\":\"defensive\"}}}',10),(38,'tinderbox',1,NULL,NULL,0,'',NULL,0),(39,'bronze axe',1,NULL,'axe',0,'weapon','{\"type\":\"melee\",\"stats\":{\"attack\":{\"stab\":-2,\"slash\":4,\"crush\":2,\"magic\":0,\"ranged\":0},\"defence\":{\"stab\":0,\"slash\":1,\"crush\":0,\"magic\":0,\"ranged\":0},\"other\":{\"melee\":5,\"ranged\":0,\"magic\":0,\"prayer\":0}},\"styles\":{\"chop\":{\"type\":\"slash\",\"style\":\"accurate\"},\"hack\":{\"type\":\"slash\",\"style\":\"aggressive\"},\"smash\":{\"type\":\"crush\",\"style\":\"aggressive\"},\"block\":{\"type\":\"slash\",\"style\":\"defensive\"}}}',16),(40,'small fishing net',1,NULL,NULL,0,'',NULL,5),(41,'bronze pickaxe',1,NULL,'pickaxe',0,'weapon','{\"type\":\"melee\",\"stats\":{\"attack\":{\"stab\":4,\"slash\":-2,\"crush\":2,\"magic\":0,\"ranged\":0},\"defence\":{\"stab\":0,\"slash\":1,\"crush\":0,\"magic\":0,\"ranged\":0},\"other\":{\"melee\":5,\"ranged\":0,\"magic\":0,\"prayer\":0}},\"styles\":{\"spike\":{\"type\":\"stab\",\"style\":\"accurate\"},\"impale\":{\"type\":\"stab\",\"style\":\"aggressive\"},\"smash\":{\"type\":\"crush\",\"style\":\"aggressive\"},\"block\":{\"type\":\"stab\",\"style\":\"defensive\"}}}',1),(42,'bronze med helm',1,'....',NULL,0,'head','{\"stats\":{\"attack\":{\"stab\":0,\"slash\":0,\"crush\":0,\"magic\":-3,\"ranged\":-1},\"defence\":{\"stab\":3,\"slash\":4,\"crush\":2,\"magic\":-1,\"ranged\":4},\"other\":{\"melee\":0,\"ranged\":0,\"magic\":0,\"prayer\":0}}}',24),(43,'bronze full helm',1,NULL,NULL,0,'head','{\"stats\":{\"attack\":{\"stab\":0,\"slash\":0,\"crush\":0,\"magic\":-6,\"ranged\":-2},\"defence\":{\"stab\":4,\"slash\":5,\"crush\":3,\"magic\":-1,\"ranged\":4},\"other\":{\"melee\":0,\"ranged\":0,\"magic\":0,\"prayer\":0}}}',44),(44,'bronze chainbody',1,NULL,NULL,0,'body','{\"stats\":{\"attack\":{\"stab\":0,\"slash\":0,\"crush\":0,\"magic\":-15,\"ranged\":0},\"defence\":{\"stab\":7,\"slash\":11,\"crush\":13,\"magic\":-3,\"ranged\":9},\"other\":{\"melee\":0,\"ranged\":0,\"magic\":0,\"prayer\":0}}}',60),(45,'bronze platebody',1,NULL,NULL,0,'body','{\"stats\":{\"attack\":{\"stab\":0,\"slash\":0,\"crush\":0,\"magic\":-30,\"ranged\":-10},\"defence\":{\"stab\":15,\"slash\":14,\"crush\":9,\"magic\":-6,\"ranged\":14},\"other\":{\"melee\":0,\"ranged\":0,\"magic\":0,\"prayer\":0}}}',160),(46,'bronze platelegs',1,NULL,NULL,0,'legs','{\"stats\":{\"attack\":{\"stab\":0,\"slash\":0,\"crush\":0,\"magic\":-21,\"ranged\":-7},\"defence\":{\"stab\":8,\"slash\":7,\"crush\":6,\"magic\":-4,\"ranged\":7},\"other\":{\"melee\":0,\"ranged\":0,\"magic\":0,\"prayer\":0}}}',80),(47,'bronze plateskirt',1,NULL,NULL,0,'legs','{\"stats\":{\"attack\":{\"stab\":0,\"slash\":0,\"crush\":0,\"magic\":-21,\"ranged\":-7},\"defence\":{\"stab\":8,\"slash\":7,\"crush\":6,\"magic\":-4,\"ranged\":7},\"other\":{\"melee\":0,\"ranged\":0,\"magic\":0,\"prayer\":0}}}',80),(48,'bronze square shield',1,NULL,NULL,0,'shield','{\"stats\":{\"attack\":{\"stab\":0,\"slash\":0,\"crush\":0,\"magic\":-6,\"ranged\":-2},\"defence\":{\"stab\":5,\"slash\":6,\"crush\":4,\"magic\":0,\"ranged\":5},\"other\":{\"melee\":0,\"ranged\":0,\"magic\":0,\"prayer\":0}}}',48),(49,'bronze kiteshield',1,NULL,NULL,0,'shield','{\"stats\":{\"attack\":{\"stab\":0,\"slash\":0,\"crush\":0,\"magic\":-8,\"ranged\":-2},\"defence\":{\"stab\":5,\"slash\":7,\"crush\":6,\"magic\":-1,\"ranged\":6},\"other\":{\"melee\":0,\"ranged\":0,\"magic\":0,\"prayer\":0}}}',68),(50,'bronze boots',1,NULL,NULL,0,'feet','{\"stats\":{\"attack\":{\"stab\":0,\"slash\":0,\"crush\":0,\"magic\":-3,\"ranged\":-1},\"defence\":{\"stab\":1,\"slash\":2,\"crush\":3,\"magic\":0,\"ranged\":0},\"other\":{\"melee\":0,\"ranged\":0,\"magic\":0,\"prayer\":0}}}',24),(51,'bronze gloves',1,NULL,NULL,0,'hands','{\"stats\":{\"attack\":{\"stab\":2,\"slash\":2,\"crush\":2,\"magic\":1,\"ranged\":2},\"defence\":{\"stab\":2,\"slash\":2,\"crush\":2,\"magic\":1,\"ranged\":2},\"other\":{\"melee\":0,\"ranged\":0,\"magic\":0,\"prayer\":0}}}',100),(52,'bronze mace',1,NULL,NULL,0,'weapon','{\"type\":\"melee\",\"stats\":{\"attack\":{\"stab\":1,\"slash\":-2,\"crush\":6,\"magic\":0,\"ranged\":0},\"defence\":{\"stab\":0,\"slash\":0,\"crush\":0,\"magic\":0,\"ranged\":0},\"other\":{\"melee\":5,\"ranged\":0,\"magic\":0,\"prayer\":1}},\"styles\":{\"pound\":{\"type\":\"crush\",\"style\":\"accurate\"},\"pummel\":{\"type\":\"crush\",\"style\":\"aggressive\"},\"spike\":{\"type\":\"stab\",\"style\":\"controlled\"},\"block\":{\"type\":\"crush\",\"style\":\"defensive\"}}}',18),(53,'bones',1,NULL,NULL,0,'',NULL,1),(54,'wool',1,NULL,NULL,0,'',NULL,1),(55,'ball of wool',1,NULL,NULL,0,'',NULL,2),(56,'raw beef',1,NULL,NULL,0,'',NULL,1),(57,'cowhide',1,NULL,NULL,0,'',NULL,2),(58,'cooked meat',1,NULL,'consumable',0,'','{\"hitpoints\":3}',4),(59,'burnt meat',1,NULL,NULL,0,'',NULL,1),(60,'raw chicken',1,NULL,NULL,0,'',NULL,1),(61,'cooked chicken',1,NULL,'consumable',0,'','{\"hitpoints\":3}',4),(62,'knife',1,NULL,NULL,0,'',NULL,6),(63,'arrow shaft',1,NULL,NULL,1,'',NULL,1),(64,'oak logs',15,NULL,NULL,0,'',NULL,20),(65,'pot',1,NULL,NULL,0,'',NULL,1),(66,'jug',1,NULL,NULL,0,'',NULL,1),(67,'jug of water',1,NULL,NULL,0,'',NULL,1),(68,'shears',1,NULL,NULL,0,'',NULL,1),(69,'iron dagger',1,NULL,NULL,0,'weapon','{\"type\":\"melee\",\"stats\":{\"attack\":{\"stab\":5,\"slash\":3,\"crush\":-4,\"magic\":1,\"ranged\":0},\"defence\":{\"stab\":0,\"slash\":0,\"crush\":0,\"magic\":1,\"ranged\":0},\"other\":{\"melee\":4,\"ranged\":0,\"magic\":0,\"prayer\":1}},\"styles\":{\"stab\":{\"type\":\"stab\",\"style\":\"accurate\"},\"lunge\":{\"type\":\"stab\",\"style\":\"aggressive\"},\"slash\":{\"type\":\"slash\",\"style\":\"aggressive\"},\"block\":{\"type\":\"stab\",\"style\":\"defensive\"}}}',35),(70,'bucket',1,NULL,NULL,0,'',NULL,2),(71,'bowl',1,NULL,NULL,0,'',NULL,4),(72,'cake tin',1,NULL,NULL,0,'',NULL,10),(73,'chisel',1,NULL,NULL,0,'',NULL,1),(74,'spade',1,NULL,NULL,0,'',NULL,3),(75,'hammer',1,NULL,NULL,0,'',NULL,1);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-17 18:36:07
