// var mcd = require('memcached'),
//     nmc = new mcd(global.mc.nlocation);

var nmc = require('../modules/nmcache');

// 缓存地理信息
exports.xyset=function(k,v){
	nmc.set(['xy',k].join('_'), v.join('L'), 0);
};

exports.xyget=function(k,cb){
	nmc.get(['xy',k].join('_'), function(e, d){
		cb(d);
	});
};

exports.xydel=function(){
	// delete cache.location[k];
	nmc.del(['xy',k].join('_'));
};

// 缓存微信用户信息
exports.del_user = function(openid) {
    nmc.del('user-'+ openid);
};

exports.get_user = function(openid, cb) {
    nmc.get('user-'+ openid, cb);
};

exports.set_user = function(openid,v,t) {
    nmc.set('user-'+ openid, v, t);
};

// wx-jssdk ticket
exports.set_ticket=function(v){
	nmc.set('jsdk-ticket', v, 0, function(e,d){
		console.log('set_ticket',d,e);
	});
};

exports.get_ticket=function(cb){
	nmc.get('jsdk-ticket', function(e, d){
		cb(d);
	});
};
