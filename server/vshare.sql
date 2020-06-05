/*
 Navicat Premium Data Transfer

 Source Server         : v-share
 Source Server Type    : MySQL
 Source Server Version : 50623
 Source Host           : localhost:3306
 Source Schema         : vshare

 Target Server Type    : MySQL
 Target Server Version : 50623
 File Encoding         : 65001

 Date: 05/06/2020 11:46:47
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for agroup
-- ----------------------------
DROP TABLE IF EXISTS `agroup`;
CREATE TABLE `agroup`  (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `groupName` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Compact;

-- ----------------------------
-- Records of agroup
-- ----------------------------
INSERT INTO `agroup` VALUES (6, '欢乐IT', '相亲相爱一家人，我们一起创造奇迹！Believe we can!');
INSERT INTO `agroup` VALUES (7, '123', '123');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dosc_id` int(11) NOT NULL,
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `add_time` datetime(0) NOT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `comment_fk`(`dosc_id`) USING BTREE,
  CONSTRAINT `comment_fk` FOREIGN KEY (`dosc_id`) REFERENCES `dosc` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Compact;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (2, 34, 'admin', '2020-05-10 12:35:21', '写的好');
INSERT INTO `comment` VALUES (3, 34, '花花', '2020-05-10 12:36:25', '值得学习，good！');
INSERT INTO `comment` VALUES (5, 33, 'admin', '2020-05-29 02:44:47', '不错！');
INSERT INTO `comment` VALUES (6, 33, '江小虫儿', '2020-05-29 02:46:06', '这篇文章刚好我能用上。');

-- ----------------------------
-- Table structure for dosc
-- ----------------------------
DROP TABLE IF EXISTS `dosc`;
CREATE TABLE `dosc`  (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `store_id` int(255) NOT NULL,
  `doscName` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `author` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `content` varchar(10000) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `html` varchar(10000) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `updateTime` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `dosc_fk`(`store_id`) USING BTREE,
  CONSTRAINT `dosc_fk` FOREIGN KEY (`store_id`) REFERENCES `storehouse` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 37 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Compact;

-- ----------------------------
-- Records of dosc
-- ----------------------------
INSERT INTO `dosc` VALUES (32, 29, '五一学习后端', 'admin', '未发布', '\n>党领导康德拉可能够啦看电脑该地块拿过来的\n# 五一快乐\n### 1. 学习\n* Nodejs\n* Phyon\n* 哈哈哈哈\n* 学习+娱乐', '<blockquote>\n<p>党领导康德拉可能够啦看电脑该地块拿过来的</p>\n</blockquote>\n<h1><a id=\"_2\"></a>五一快乐</h1>\n<h3><a id=\"1__3\"></a>1. 学习</h3>\n<ul>\n<li>Nodejs</li>\n<li>Phyon</li>\n<li>哈哈哈哈</li>\n<li>学习+娱乐</li>\n</ul>\n', '2020-05-10 12:18:33');
INSERT INTO `dosc` VALUES (33, 28, 'Vue初识', 'admin', '未发布', '\n\n### 1. 什么是Vue.js\n+ Vue.js 是目前最火的一个前端框架，React是最流行的一个前端框架（React除了开发网站，还可以开发手机App， Vue语法也是可以用于进行手机App开发的，需要借助于Weex）\n+ Vue.js 是前端的**主流框架之一**，和Angular.js、React.js 一起，并成为前端三大主流框架！\n+ Vue.js 是一套构建用户界面的框架，**只关注视图层**，它不仅易于上手，还便于与第三方库或既有项目整合。（Vue有配套的第三方类库，可以整合起来做大型项目的开发）\n+ 前端的主要工作？主要负责MVC中的V这一层；主要工作就是和界面打交道，来制作前端页面效果；\n\n', '<h3><a id=\"1_Vuejs_2\"></a>1. 什么是Vue.js</h3>\n<ul>\n<li>Vue.js 是目前最火的一个前端框架，React是最流行的一个前端框架（React除了开发网站，还可以开发手机App， Vue语法也是可以用于进行手机App开发的，需要借助于Weex）</li>\n<li>Vue.js 是前端的<strong>主流框架之一</strong>，和Angular.js、React.js 一起，并成为前端三大主流框架！</li>\n<li>Vue.js 是一套构建用户界面的框架，<strong>只关注视图层</strong>，它不仅易于上手，还便于与第三方库或既有项目整合。（Vue有配套的第三方类库，可以整合起来做大型项目的开发）</li>\n<li>前端的主要工作？主要负责MVC中的V这一层；主要工作就是和界面打交道，来制作前端页面效果；</li>\n</ul>\n', '2020-05-10 12:29:26');
INSERT INTO `dosc` VALUES (34, 28, 'ES6语法', 'admin', '已发布', '# ES6\n### 1. 变量 （let、const)\n* let声明的变量不存在预解析。\n* 在同一个作用域，let声明的变量不允许重复，即不可以多次声明同名变量。\n* ES6存在块级作用域，在块内声明的变量，在块外访问不到。\n* 以上let的规则对const同样适用。const另外还有两个规则。\n\n\n>模块化是Nodejs的根本思想。系统核心模块的官方的示例代码中提供的是ES6的语法。先来学一下ES6。\n\n', '<h1><a id=\"ES6_0\"></a>ES6</h1>\n<h3><a id=\"1__letconst_1\"></a>1. 变量 （let、const)</h3>\n<ul>\n<li>let声明的变量不存在预解析。</li>\n<li>在同一个作用域，let声明的变量不允许重复，即不可以多次声明同名变量。</li>\n<li>ES6存在块级作用域，在块内声明的变量，在块外访问不到。</li>\n<li>以上let的规则对const同样适用。const另外还有两个规则。</li>\n</ul>\n<blockquote>\n<p>模块化是Nodejs的根本思想。系统核心模块的官方的示例代码中提供的是ES6的语法。先来学一下ES6。</p>\n</blockquote>\n', '2020-05-10 12:30:00');
INSERT INTO `dosc` VALUES (35, 28, 'vue 生命周期', 'admin', '已发布', '### 1.  [vue实例的生命周期](https://cn.vuejs.org/v2/guide/instance.html#实例生命周期)\n+ 什么是生命周期：从Vue实例创建、运行、到销毁期间，总是伴随着各种各样的事件，这些事件，统称为生命周期！\n+ [生命周期钩子](https://cn.vuejs.org/v2/api/#选项-生命周期钩子)：就是生命周期事件的别名而已；\n+ 生命周期钩子 = 生命周期函数 = 生命周期事件\n+ 主要的生命周期函数分类：\n - 创建期间的生命周期函数：\n   + beforeCreate：实例刚在内存中被创建出来，此时，还没有初始化好 data 和 methods 属性。\n   + created：实例已经在内存中创建OK，此时 data 和 methods 已经创建OK，此时还没有开始 编译模板。\n   + beforeMount：此时已经完成了模板的编译，但是还没有挂载(渲染)到页面中去。\n   + mounted：此时，已经将编译好的模板，挂载到了页面指定的容器中显示。\n - 运行期间的生命周期函数：\n  + beforeUpdate：状态更新之前执行此函数， 此时 data 中的状态值是最新的，但是界面上显示的 数据还是旧的，因为此时还没有开始重新渲染DOM节点\n  + updated：实例更新完毕之后调用此函数，此时 data 中的状态值 和 界面上显示的数据，都已经完成了更新，界面已经被重新渲染好了！\n - 销毁期间的生命周期函数：\n  + beforeDestroy：实例销毁之前调用。在这一步，实例仍然完全可用。\n  + destroyed：Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。\n', '<h3><a id=\"1__vuehttpscnvuejsorgv2guideinstancehtml_0\"></a>1.  <a href=\"https://cn.vuejs.org/v2/guide/instance.html#%E5%AE%9E%E4%BE%8B%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F\" target=\"_blank\">vue实例的生命周期</a></h3>\n<ul>\n<li>什么是生命周期：从Vue实例创建、运行、到销毁期间，总是伴随着各种各样的事件，这些事件，统称为生命周期！</li>\n<li><a href=\"https://cn.vuejs.org/v2/api/#%E9%80%89%E9%A1%B9-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90\" target=\"_blank\">生命周期钩子</a>：就是生命周期事件的别名而已；</li>\n<li>生命周期钩子 = 生命周期函数 = 生命周期事件</li>\n<li>主要的生命周期函数分类：</li>\n</ul>\n<ul>\n<li>创建期间的生命周期函数：\n<ul>\n<li>beforeCreate：实例刚在内存中被创建出来，此时，还没有初始化好 data 和 methods 属性。</li>\n<li>created：实例已经在内存中创建OK，此时 data 和 methods 已经创建OK，此时还没有开始 编译模板。</li>\n<li>beforeMount：此时已经完成了模板的编译，但是还没有挂载(渲染)到页面中去。</li>\n<li>mounted：此时，已经将编译好的模板，挂载到了页面指定的容器中显示。</li>\n</ul>\n</li>\n<li>运行期间的生命周期函数：</li>\n</ul>\n<ul>\n<li>beforeUpdate：状态更新之前执行此函数， 此时 data 中的状态值是最新的，但是界面上显示的 数据还是旧的，因为此时还没有开始重新渲染DOM节点</li>\n<li>updated：实例更新完毕之后调用此函数，此时 data 中的状态值 和 界面上显示的数据，都已经完成了更新，界面已经被重新渲染好了！</li>\n</ul>\n<ul>\n<li>销毁期间的生命周期函数：</li>\n</ul>\n<ul>\n<li>beforeDestroy：实例销毁之前调用。在这一步，实例仍然完全可用。</li>\n<li>destroyed：Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。</li>\n</ul>\n', '2020-05-15 14:06:38');
INSERT INTO `dosc` VALUES (36, 28, 'Vue的学习之路', 'admin', '未发布', '# 拉刀光拉克的\n### 乐山电力咖喱岛\n\n* 打了干了\n* 的拉开过来\n* 看到了咖喱岛赶快来\n鞍山道格拉斯开工啦快四年旮旯里', '<h1><a id=\"_0\"></a>拉刀光拉克的</h1>\n<h3><a id=\"_1\"></a>乐山电力咖喱岛</h3>\n<ul>\n<li>打了干了</li>\n<li>的拉开过来</li>\n<li>看到了咖喱岛赶快来<br />\n鞍山道格拉斯开工啦快四年旮旯里</li>\n</ul>\n', '2020-05-17 09:08:14');

-- ----------------------------
-- Table structure for identifycode
-- ----------------------------
DROP TABLE IF EXISTS `identifycode`;
CREATE TABLE `identifycode`  (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `flag` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Compact;

-- ----------------------------
-- Records of identifycode
-- ----------------------------
INSERT INTO `identifycode` VALUES (20, 'PQ7NTS', 'false');
INSERT INTO `identifycode` VALUES (21, '4NE3GF', 'true');
INSERT INTO `identifycode` VALUES (22, '9N9XO3', 'true');
INSERT INTO `identifycode` VALUES (23, 'VW4A5Y', 'true');
INSERT INTO `identifycode` VALUES (24, 'SZWG7H', 'true');
INSERT INTO `identifycode` VALUES (25, 'O7RRR8', 'false');

-- ----------------------------
-- Table structure for storehouse
-- ----------------------------
DROP TABLE IF EXISTS `storehouse`;
CREATE TABLE `storehouse`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `storeName` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `storeDesc` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 33 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Compact;

-- ----------------------------
-- Records of storehouse
-- ----------------------------
INSERT INTO `storehouse` VALUES (28, '前端开发', '关于前端开发的学习分享呀');
INSERT INTO `storehouse` VALUES (29, '后端开发', 'Java、Nodejs等服务器端技术等你来探索');
INSERT INTO `storehouse` VALUES (30, '游戏开发', '爱玩游戏的你快来吧');
INSERT INTO `storehouse` VALUES (31, '信息安全', '关于信息安全的介绍');
INSERT INTO `storehouse` VALUES (32, '五一快乐', '管廊架来打开过来的了里的');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `role` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Compact;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (24, 'admin', '123123', '1');
INSERT INTO `user` VALUES (25, '花花', '123123', '2');
INSERT INTO `user` VALUES (26, '江小虫儿', '123123', '2');
INSERT INTO `user` VALUES (27, '哈哈', '123123', '2');

SET FOREIGN_KEY_CHECKS = 1;
