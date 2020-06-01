'use strict';
console.log(`load once, module.id:${module.id}`);
const urlencode = encodeURIComponent,
      ejsq = require('../modules/ejsq'),
      base = require('./base');

let appid='',appid2='';
if(global.online) {
    appid='wx2ab0c730d1216192';
    appid2='wxe2a3ba29612c0e0e';
}else{
    appid='wx2ab0c730d1216192',  // 数位港湾
    appid2='wx459ee9aa61f38da3'; // V积分会员卡 开通了支付
}

exports.t = base.t;

exports.to = (req, res, uri)=> {
    base.to(req, res, uri, appid);
};

exports.to2 = (req, res, uri)=> { // 获得支付用的openid
    base.to(req, res, uri, appid2);
};

exports.too = (req, res, uri)=> {
    base.too(req, res, uri, appid, appid2);
};
