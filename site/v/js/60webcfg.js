vge.register('vge', function(g) {
	var z = this;
	z.h5ost = location.host; // 包含端口号
	if (['x.vjifen.com', '10.131.166.37:9001','10.105.25.240:9001'].indexOf(z.h5ost) !== -1) { // online
		z.jhost = 'i.vjifen.com';
		z.jport = 80;
        
	    z.imgsrv = 'img.vjifen.com:8000';
		// z.imgsrv = 'img.vjifen.com:8000/images/';

		// 青啤红包接口
		// z.qapi = 'http://gift.vjifen.com:9898/DBTQGift/';
		z.qapi = 'http://gift.vjifen.com/DBTQGift/';
	} else {
		z.imgsrv = '192.168.0.241';

        if(location.host === 'xt.vjifen.com') {
            z.jhost = '192.168.0.247';
		    z.jport = 9080;
		    // 青啤红包接口根目录
		    z.qapi='http://192.168.0.247:10080/DBTQGift/';  // 准线上，测试
        }else{
		    z.jport = 8080;
		    z.jhost = '192.168.0.240';
            
		    z.qapi = 'http://192.168.0.221:9080/DBTQGift/'; // 开发
        }
	}
    z.japi = z.jhost + ':' + z.jport + '/DBTVinterface';
});
