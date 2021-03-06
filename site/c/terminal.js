'use strict';
console.log(`load once, module.id:${module.id}`);
const urlencode = encodeURIComponent,
	ejsq = require('../modules/ejsq'),
	base = require('./base');

let appid = '',
	appid2 = '';
if (global.online) {
	appid = 'wx80624d4d4c0b0319'; // 品牌活动
	appid2 = 'wx17dec671d4c28446'; // V积分 用于微信支付, wxe2a3ba29612c0e0e 超市会员卡
} else {
	appid = 'wx2ab0c730d1216192'; // 河北青啤测试
	appid2 = 'wx459ee9aa61f38da3'; // V积分会员卡 开通了支付
}

exports.t = base.t;

//exports.to = (req, res, uri)=> {
//  base.to(req, res, uri, appid);
//};

exports.to = (req, res, uri) => { //有改动
	base.to(req, res, uri, appid);
};
exports.txo = (req, res, uri) => { //有改动
	base.to(req, res, uri, appid2); // 获取支付openid
};

exports.too = (req, res, uri) => {
	base.too(req, res, uri, appid, appid2);
};
