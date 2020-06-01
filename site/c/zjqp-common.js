'use strict';
console.log(`load once, module.id:${module.id}`);
const urlencode = encodeURIComponent,
      ejsq = require('../modules/ejsq'),
      base = require('./base');

let appid='',appid2='',appid3='';
if(global.online) {
    appid='wx098a7c50dc660fc7';  // 青啤浙江
    appid2='wxa42a20606316e2e9'; // V积分 用于微信支付, wx1071182f6476d694 超市会员卡wx17dec671d4c28446
    appid3='wxe2a3ba29612c0e0e';
}else{
    appid='wx4dfa76a275a789a1';  // vjifen测试
    appid2='wx459ee9aa61f38da3'; // V积分会员卡 开通了支付
}

exports.t = base.t;

exports.to = (req, res, uri)=> {
    base.to(req, res, uri, appid);
};

exports.txo = (req, res, uri)=> {//获取支付openid
    base.to(req, res, uri, appid2); 
};

exports.too = (req, res, uri)=> {// 获取支付openid + v积分唯一标识
    base.too(req, res, uri, appid3, appid2);
};

exports.tvo = (req, res, uri)=> {//v积分唯一标识+青啤企业openid
    base.tvo(req, res, uri, appid, appid3);
};
//浙江项目较为特殊，需注意

