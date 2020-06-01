'use strict';
exports.tips={
	VVXNetError:'网络繁忙，请您稍后再试',
	VVXCatchError:'访问错误，请您稍后再试'
};

exports.expires = {
    fileMatch: /^(jpg|js|css|png|gif)$/ig,
    maxAge: 606024365
};

exports.compress = {
    match: /css|js|html/ig
};

var os=require('os'), nis=os.networkInterfaces();

const test_server = ['192.168.0.202'];
global.online = true;
(function fipf(x){
	for(var i in x){
		if(typeof x[i]==='object'){
			fipf(x[i]);
		}else{
			console.log('NI:', i, x[i]);
            if(test_server.indexOf(x[i]) !== -1) {
			    global.ip=x[i];
                global.online = false;
			    return;
            }
		}
	}
})(nis);

if(global.online) {
    // 生产环境
    exports.port= 8090;
	global.h5server='w.vjifen.com';
	global.tcpserver='';
    global.o3host = 'x.vjifen.com';

}else{
    // 开发环境
	exports.port= 8030;
	global.h5server='vd.vjifen.com';
	global.tcpserver='';
    global.o3host = 'xt.vjifen.com';

    // // 配置移到 biz.cfg 里，可动态更新, 不能自动区分线上和测试
	// global.japi='';
	// global.jport=0;
	// global.jpath='/bizInterface';
	// global.mc={
	// 	nlocation:'192.168.0.249:54385', // 缓存地址
    //     jlocation:''
	// };
    
}

console.log(`online:${global.online},h5server:${global.h5server},mc:${global.mc}`);
