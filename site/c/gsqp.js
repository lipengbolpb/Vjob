'use strict';
console.log(`load once, module.id:${module.id}`);
const urlencode = encodeURIComponent,
    ejsq = require('../modules/ejsq'),
    base = require('./base');

let appid = '',
    appid2 = '',
    appid3;
if (global.online) {
    appid = 'wx0f50f91983d3de64'; // 甘肃 gh_e17235e4f1f3
    appid2 = 'wx17dec671d4c28446'; // V积分 用于微信支付, wx1071182f6476d694 超市会员卡
    appid3 = 'wxe2a3ba29612c0e0e';
} else {
    appid = 'wx1ce2ca65ccc5aa5e'; // 安徽
    appid2 = 'wx459ee9aa61f38da3'; // V积分会员卡 开通了支付
    appid3 = 'wx1ce2ca65ccc5aa5e';
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