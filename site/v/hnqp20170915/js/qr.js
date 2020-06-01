(function() {
    "use strict";
    ini_wxshare(vge.hnqpappid);
    
	var args = vge.urlparse(location.href),
        unionid='',
        first = true,
       	times = 0,
        qr = args.s, openid=args.openid;
    
  //$('#info').html('您扫的码是【'+qr+'】<br>openid: '+openid);
    sessionStorage.clear();
    sessionStorage.openid = openid;
    sessionStorage.qr = qr;

    setTimeout(function() { // 应对定位调用异常
        if (sessionStorage.latitude===undefined) {
            sweep();
        }
    }, 4000);

    function locationed(res){
        sessionStorage.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        sessionStorage.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        sessionStorage.speed = res.speed; // 速度，以米/每秒计
        sessionStorage.accuracy = res.accuracy; // 位置精度
        sweep();
    }

    loading('玩命加载中');
    wx.ready(function() {
    	loaded();
        loading('玩命加载中');
        wx.getLocation({
            type: 'wgs84',
            complete:locationed//接口调用完成时执行的回调函数，无论成功或失败都会执行。
        });
    });
    
    
    function sweep() {
    	if(first){
    		times++;
    		first = false;
    		loaded();
    		loading('玩命加载中');
	        var japi = vge.hnqp+'/DBTHuaNQPInterface/sweep/sweepVerify';
	        var req = {
	            "openid":openid,
	//          "unionid":unionid,
	            "sweepstr":qr,
	            "longitude": sessionStorage.longitude===undefined?'00':sessionStorage.longitude, //"经度"
	            "latitude": sessionStorage.latitude===undefined?'00':sessionStorage.latitude //"纬度"
	        };
	        vge.clog('debug', [japi, JSON.stringify(req),times]);
	        vge.callJApi(japi, req, cb);
    	}
    }
    
    function cb(jo) {
		if(jo.result.code == '0'){
			if(jo.result.businessCode=='-1'){
				loaded();
				title_tip('尊敬的用户', '系统升级中...', '我知道了');
				return ;
			}else if(jo.result.businessCode=='2'&&jo.reply == undefined){
				loaded();
				title_tip('尊敬的用户', '识别失败，请稍后再试', '我知道了');
				return ;
			}
			sessionStorage.earnTime = jo.reply.earnTime;
        	switch (jo.result.businessCode) {
	        case '0':               // 普通奖
				sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
				sessionStorage.currentMoney = jo.reply.currentMoney;
				sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
				sessionStorage.activityVersion = jo.reply.activityVersion;//1.广东    2.海南    3.海南罐装
				location.replace('http://' + location.host + '/hnqp20170915/txo/getcash?bizcode='+jo.result.businessCode);
	            break;
	        case '11':              // 自己重复扫，普通奖
				sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
				sessionStorage.currentMoney = jo.reply.currentMoney;
				sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
				location.replace('http://' + location.host + '/hnqp20170915/txo/repcash?bizcode='+jo.result.businessCode);
	            break;
	        case '12':              // 可疑
				location.replace('http://' + location.host + '/v/hnqp20170915/getMsg.html?bizcode='+jo.result.businessCode);
	            break;    
	        case '13':              // 黑名单
				location.replace('http://' + location.host + '/v/hnqp20170915/getMsg.html?bizcode='+jo.result.businessCode);
	            break; 
	        case '14':              // 指定
				location.replace('http://' + location.host + '/v/hnqp20170915/getMsg.html?bizcode='+jo.result.businessCode);
	            break;     
	        default:
	        	if(jo.reply){
		        	sessionStorage.batchName = jo.reply.batchName===undefined?'':jo.reply.batchName;
	        	}
				location.replace('http://' + location.host + '/v/hnqp20170915/fail.html?bizcode='+jo.result.businessCode);
	        }	
	    }else if(jo.result.code == '-1'){
	    	title_tip('尊敬的用户','系统升级中，请稍后再试！','我知道了');
	    }else{
	    	title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
	    }
	}

    
    function loading(txt) {
        // dom_content.innerHTML += $('#tpl_toast').html();
        $('#loadingToast .weui_toast_content').html(txt);
        $('#loadingToast').show();
    }
    function loaded() {
        $('#loadingToast').hide();
    }
    function toast(txt) {
        $('#toast .weui_toast_content').html(txt);
        $('#toast').show();
        setTimeout(function () {
            $('#toast').hide();
        }, 2000);
    }

})();
