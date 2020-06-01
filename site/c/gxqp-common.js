'use strict';
console.log(`load once, module.id:${module.id}`);
const urlencode = encodeURIComponent,
      ejsq = require('../modules/ejsq'),
      base = require('./base');

let appid='',appid2='',appid3='';
if(global.online) {
    appid='wxc5ab763f6a07a4d7';  // 广西
	  appid2='wxa42a20606316e2e9'; // V积分 用于微信支付, wx17dec671d4c28446 新通道
	  appid3='wxe2a3ba29612c0e0e';  // 广西
}else{
    appid='wx1ce2ca65ccc5aa5e';  // 华南青啤测试
    appid2='wx459ee9aa61f38da3'; // V积分会员卡 开通了支付
    appid3='wx459ee9aa61f38da3';  // 广西
}

exports.t = base.t;

exports.to = (req, res, uri)=> {
    base.to(req, res, uri, appid3);//v积分
};

exports.txo = (req, res, uri)=> {
    base.to(req, res, uri, appid); // 广西特殊，此处获取企业openid
};

exports.too = (req, res, uri)=> {
    base.too(req, res, uri, appid3, appid2);
};

exports.tvo = (req, res, uri)=> {//扫码获取v积分唯一标识
    base.tvo(req, res, uri, appid2, appid3);
};
