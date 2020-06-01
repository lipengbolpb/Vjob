(function() {
    "use strict";
    ini_wxshare(vge.zlccappid);
	var args = vge.urlparse(location.href),
        qr = args.s, openid=args.openid,unionid='';
    var flag = true,nickname='',headimgurl='';
   	subscribe();
    sessionStorage.clear();
    sessionStorage.openid = openid;
    sessionStorage.qr = qr;
	
	subscribe();
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

	
	loading('玩命加载中');//获取用户信息  
	wx.ready(function() {
        loading('玩命加载中');
        WeixinJSBridge.call('hideOptionMenu');//隐藏右上角菜单	
        wx.getLocation({
            type: 'wgs84',
            complete:locationed//接口调用完成时执行的回调函数，无论成功或失败都会执行。
        });
    });
    
    function sweep() {
    	if(flag){
    		flag = false;
    		loading('玩命加载中');//调用接口
        	var japi = vge.zlcc+'/DBTZLCCInterface/sweep/sweepQrcode';
        	var req = {
            	"openid":openid,
        	    "sweepstr":qr,
				"nickname":nickname,//"昵称"
				"sex":sessionStorage.sex===undefined?'':sessionStorage.sex,
				"province":sessionStorage.province===undefined?'':sessionStorage.province,
				"city":sessionStorage.city===undefined?'':sessionStorage.city,
				"country":sessionStorage.country===undefined?'':sessionStorage.country,
				"headimgurl":headimgurl,//"头像"
        	    "longitude": sessionStorage.longitude===undefined?'00':sessionStorage.longitude, //"经度"
        	    "latitude": sessionStorage.latitude===undefined?'00':sessionStorage.latitude //"纬度"
        	};
        vge.clog('debug', [japi, JSON.stringify(req)]);
        vge.callJApi(japi, req, cb);
    	}
        
    }
    
    function subscribe(){//判断关注
		var requrl='http://'+vge.o3host+'/wx3/uinfo2?openid='+openid+'&appid='+vge.zlccappid;
		vge.ajxget(requrl, 5000, function(o){
			try{
				var r = JSON.parse(o);
				if(r.subscribe==0) {//未关注
					
				}else{//已关注用户
					nickname = r.nickname===''?'未知用户':r.nickname;
			        headimgurl = r.headimgurl==='/0'?'/v/zzqp/img/bg/headimg.png':r.headimgurl;
			        sessionStorage.nickname = nickname;
			      	sessionStorage.headimgurl = headimgurl;
			      	sessionStorage.sex = r.sex;
			      	sessionStorage.city = r.city;
			      	sessionStorage.province = r.province;
			      	sessionStorage.country = r.country;
				    vge.clog('获取用户信息', [JSON.stringify(r),headimgurl]);
				}
				vge.clog('中粮个人信息', JSON.stringify(r));
			}catch(e){
				vge.clog('errmsg', [requrl, e]);
			}
		},function(err){
			vge.clog('errmsg', [requrl, err]);
		});
	}
    
    
    function cb(jo) {
		if(jo.result.code == '0'){
			if(headimgurl==''){
				sessionStorage.headimgurl = '/v/zzqp/img/bg/headimg.png?v=1';
			}
			if(jo.result.businessCode=='2'&&jo.reply==undefined){
				loaded();
				title_tip('尊敬的用户','此码被频繁扫描，请稍后再试！','我知道了');
				return;
			}
        	switch (jo.result.businessCode) {
	        case '0':               // 普通奖
				sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
				sessionStorage.currentMoney = jo.reply.currentMoney;
				sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
				sessionStorage.earnTime = jo.reply.earnTime;
				sessionStorage.bizcode = jo.result.businessCode;
				location.replace('http://' + location.host + '/zlcc/txo/getcash?bizcode='+jo.result.businessCode);
	            break;
	        case '11':              // 自己重复扫，普通奖
				sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
				sessionStorage.currentMoney = jo.reply.currentMoney;
				sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
				sessionStorage.earnTime = jo.reply.earnTime;
				location.replace('http://' + location.host + '/zlcc/txo/getcash?bizcode='+jo.result.businessCode);
	            break;
	        case '12':              // 可疑用户
				location.replace('http://' + location.host + '/v/zlcc/getMsg.html?bizcode='+jo.result.businessCode);
	            break;    
	        case '13':              // 黑名单
				location.replace('http://' + location.host + '/v/zlcc/getMsg.html?bizcode='+jo.result.businessCode);
	            break;  
	        case '14':              // 指定
				location.replace('http://' + location.host + '/v/zlcc/getMsg.html?bizcode='+jo.result.businessCode);
	            break;   
	        case '16':              // 非销售人员
				location.replace('http://' + location.host + '/v/zlcc/active.html?bizcode='+jo.result.businessCode);
	            break;   
	        case '-1':              // 非销售人员
				title_tip('尊敬的用户','系统升级中，请稍后再试！','我知道了');
				loaded();
	            break;     
	        default:
        		sessionStorage.batchName = jo.reply.batchName===undefined?'':jo.reply.batchName;
        		sessionStorage.nickName = jo.reply.nickName===undefined?'':jo.reply.nickName;
        		sessionStorage.earnTime = jo.reply.earnTime===undefined?'':jo.reply.earnTime;
				location.replace('http://' + location.host + '/v/zlcc/fail.html?bizcode='+jo.result.businessCode);
	        }	
	   	}else if(jo.result.code == '-1'){//code !=0;
	   		title_tip('尊敬的用户','系统升级中，请稍后再试！','我知道了');
	   	}else{
	   		title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
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
