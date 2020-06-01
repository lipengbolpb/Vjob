'use strict';
console.log(`load once, module.id:${module.id}`); //河南
const urlencode = encodeURIComponent,
    ejsq = require('../modules/ejsq'),
    base = require('./base');

let appid = '',
    appid2 = '',
    appid3 = '';
if (global.online) {
    appid = 'wx83f837b74f25eb06'; // 河南青啤
    appid2 = 'wx17dec671d4c28446'; // V积分 用于微信支付, wx1071182f6476d694 超市会员卡
    appid3 = 'wxe2a3ba29612c0e0e';
} else {
    appid = 'wx1ce2ca65ccc5aa5e'; // 品牌服务
    appid2 = 'wx459ee9aa61f38da3'; // V积分会员卡 开通了支付
}

exports.t = base.t;

exports.to = (req, res, uri) => { //有改动
    base.vo(req, res, uri, appid);
};
exports.txo = (req, res, uri) => { //有改动
    base.to(req, res, uri, appid2); // 获取支付openid
};

exports.too = (req, res, uri) => {
    base.too(req, res, uri, appid, appid2);
};
exports.vo = (req, res, uri) => { //有改动
    base.to(req, res, uri, appid);
};

exports.tvo = (req, res, uri) => {
    base.tuo(req, res, uri, appid, appid3);
};

exports.tro = (req, res, uri) => {
    base.tro(req, res, uri, appid, appid3);
};