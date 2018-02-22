/*
Navicat MySQL Data Transfer

Source Server         : zxgj
Source Server Version : 50626
Source Host           : localhost:3306
Source Database       : zxgj

Target Server Type    : MYSQL
Target Server Version : 50626
File Encoding         : 65001

Date: 2017-06-20 16:19:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for zxgj_admin_users
-- ----------------------------
DROP TABLE IF EXISTS `zxgj_admin_users`;
CREATE TABLE `zxgj_admin_users` (
  `a_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `a_name` varchar(64) NOT NULL COMMENT '管理员名称',
  `a_realname` varchar(255) DEFAULT '',
  `a_pwd` varchar(255) NOT NULL COMMENT '管理员登陆密码',
  `a_unit` varchar(5) NOT NULL DEFAULT '',
  `a_mobile` varchar(11) NOT NULL COMMENT '管理员手机号码',
  `a_ifreview` int(2) NOT NULL DEFAULT '0' COMMENT '0 means not reviewed,1 is reviewed.',
  `a_regtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '注册时间',
  `a_memo` varchar(512) DEFAULT NULL COMMENT '管理员备注信息',
  PRIMARY KEY (`a_id`),
  UNIQUE KEY `admin_uid` (`a_id`,`a_name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='管理员表';

-- ----------------------------
-- Records of zxgj_admin_users
-- ----------------------------
INSERT INTO `zxgj_admin_users` VALUES ('1', 'admin', '', 'f453cfe652d76e0307cd3be54281a03d', '118', '13423426724', '1', '2017-06-20 16:17:02', null);
