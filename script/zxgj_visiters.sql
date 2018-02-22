/*
Navicat MySQL Data Transfer

Source Server         : zxgj
Source Server Version : 50626
Source Host           : localhost:3306
Source Database       : zxgj

Target Server Type    : MYSQL
Target Server Version : 50626
File Encoding         : 65001

Date: 2017-05-31 13:52:27
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for zxgj_visiters
-- ----------------------------
DROP TABLE IF EXISTS `zxgj_visiters`;
CREATE TABLE `zxgj_visiters` (
  `v_id` int(255) NOT NULL AUTO_INCREMENT COMMENT '访问的某个时间的ID',
  `v_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'timestamp',
  `v_path` varchar(255) DEFAULT '' COMMENT 'visiting path',
  `v_ip` varchar(255) DEFAULT '' COMMENT 'visiter''s ip',
  `v_ua` varchar(255) DEFAULT '' COMMENT 'user agent',
  `v_ing` char(2) NOT NULL DEFAULT '1' COMMENT '''0'' is not visiting,''1'' is visiting',
  `v_in1g` char(2) NOT NULL DEFAULT '1' COMMENT '''0'' is not visiting,''1'' is visiting',
  PRIMARY KEY (`v_id`),
  KEY `ts_index` (`v_ip`,`v_path`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2731 DEFAULT CHARSET=utf8;
