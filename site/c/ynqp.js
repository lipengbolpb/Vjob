'use strict';
console.log(`load once, module.id:${module.id}`);
const urlencode = encodeURIComponent,
      ejsq = require('../modules/ejsq'),
      base = require('./base');

let appid='',appid2='',appid3='';
if(global.online) {
    appid='wxc0ff894456f9b6d3';  // 云南青啤wxc0ff894456f9b6d3 ghid:gh_cedb317c52da
		appid2 = 'wxa42a20606316e2e9'; // V积分 用于微信支付, wx1071182f6476d694 超市会员卡
		appid3='wxe2a3ba29612c0e0e';// 欢乐送V积分唯一标识
}else{
    appid='wxc0ff894456f9b6d3';  // 云南青啤测试
    appid2='wx459ee9aa61f38da3'; // V积分会员卡 开通了支付
    appid3='wx459ee9aa61f38da3';// 欢乐送V积分唯一标识
}

exports.t = base.t;

exports.to = (req, res, uri)=> {
    base.to(req, res, uri, appid);
};

exports.txo = (req, res, uri)=> {
    base.to(req, res, uri, appid2); // 获取支付openid
};

exports.too = (req, res, uri)=> {
    base.too(req, res, uri, appid, appid2);
};

exports.tvo = (req, res, uri)=> {
    base.tvo(req, res, uri, appid, appid3);
};

