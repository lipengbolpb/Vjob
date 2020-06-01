'use strict';
console.log(`load once, module.id:${module.id}`);
const urlencode = encodeURIComponent,
	ejsq = require('../modules/ejsq'),
	base = require('./base');

let appid = '',
	appid2 = '',
	appid3;
if (global.online) {
	appid = 'wx1b8498dda1e9d50e'; // 上海
	appid2 = 'wxa42a20606316e2e9'; // V积分 用于微信支付, wxa42a20606316e2e9 乐享V积分
	appid3 = 'wxe2a3ba29612c0e0e';
} else {
	appid = 'wx2ab0c730d1216192'; // 
	appid2 = 'wx459ee9aa61f38da3'; // V积分会员卡 开通了支付
	appid3 = 'wx459ee9aa61f38da3';
}

exports.t = base.t;

exports.to = (req, res, uri) => {
	base.to(req, res, uri, appid);
};

exports.txo = (req, res, uri) => {
	base.to(req, res, uri, appid2); // 获取支付openid
};

exports.too = (req, res, uri) => {
	base.too(req, res, uri, appid, appid2);
};

exports.tvo = (req, res, uri) => {
	base.tvo(req, res, uri, appid, appid3);
};

exports.tro = (req, res, uri) => {
	base.tro(req, res, uri, appid, appid3);
};

exports.tto = (req, res, uri) => {
	base.too(req, res, uri, appid, appid2);
};