(function() {
    "use strict";
    ini_wxshare(vge.zzqpappid);
	var args = vge.urlparse(location.href),
		nickname = '',headimgurl = '',
        qr = args.s, openid=args.openid;
        
    var flag = true;   
    
    //$('#info').html('您扫的码是【'+qr+'】<br>openid: '+openid);
   
    sessionStorage.clear();
    sessionStorage.openid = openid;
    sessionStorage.sweepstr = qr;

    setTimeout(function() { // 应对定位调用异常
        if (sessionStorage.latitude===undefined) {
            sweep();
        }
    }, 5000);

    function locationed(res){
        sessionStorage.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        sessionStorage.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        sessionStorage.speed = res.speed; // 速度，以米/每秒计
        sessionStorage.accuracy = res.accuracy; // 位置精度
        console.log('经度：'+res.longitude);
        sweep();
    }

	
	loading('玩命加载中');//获取用户信息
	
    $.get('http://'+vge.o3host+'/wx3/uinfo?openid='+openid, function(r){
        loading('玩命加载中');//获取用户信息
        r = JSON.parse(r);
        nickname = r.nickname===''?'未知用户':r.nickname;
        headimgurl = r.headimgurl===''?'/v/zzqp/img/bg/headimg.png':r.headimgurl;
        sessionStorage.nickname = nickname;
      	sessionStorage.headimgurl = headimgurl;
      	sessionStorage.sex = r.sex;
      	sessionStorage.city = r.city;
      	sessionStorage.province = r.province;
      	sessionStorage.country = r.country;
        wx.ready(function() {
	        loading('玩命加载中');
	        WeixinJSBridge.call('hideOptionMenu');//隐藏右上角菜单	
	        wx.getLocation({
	            type: 'wgs84',
	            complete:locationed//接口调用完成时执行的回调函数，无论成功或失败都会执行。
	        });
	    });
	    vge.clog('获取用户信息', [JSON.stringify(r),headimgurl]);
    });	
	
    
    function sweep() {
    	if(flag){
    		flag = false;
    		loading('玩命加载中');//调用接口
        	var japi = vge.zzqp+'/DBTHNQPInterface/sweep/sweepQrcode';
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
    
    
    
    
    function cb(jo) {
       	// if(!confirm('返回码:'+jo.result.businessCode+' 是否跳转')) {
        // 	return;
       	// }
       	var replace = '/v/zzqpNew/index.html?bizcode=';
       	if(jo.result.code=='0'){
       		console.log(jo);
       		if(jo.result.versionCode){
	       		if(jo.result.versionCode=='1.17.0214'){
	       			replace = '/v/zzqp0214/guifei.html?bizcode=';
	       		}else{
	       			replace = '/v/zzqpNew/index.html?bizcode=';
	       		}
       		}
	    	switch (jo.result.businessCode) {
	        case '0':               // 普通奖
				location.replace('http://' + location.host + replace + jo.result.businessCode);
	            break;
	        case '1':               // 该积分码不存在
				location.replace('http://' + location.host + replace + jo.result.businessCode);
	            break;
	        case '2':               // 该积分码已经被使用过
				location.replace('http://' + location.host + replace + jo.result.businessCode);
	            break;
	        case '3':               // 积分码已过期
				location.replace('http://' + location.host + replace + jo.result.businessCode);
	            break; 
	        case '4':               // 活动未开始
	        	console.log(jo.result.remarks);
	        	sessionStorage.remarks = jo.result.remarks;
				location.replace('http://' + location.host + replace + jo.result.businessCode);
	            break;
	        case '5':               // 活动已结束
				location.replace('http://' + location.host + replace + jo.result.businessCode);
	            break;    
	        case '11':              // 自己重复扫，普通奖
				location.replace('http://' + location.host + replace + jo.result.businessCode);
	            break;
	        case '12':              // 可疑用户
				location.replace('http://' + location.host + '/v/zzqpNew/getMsg.html?bizcode=' + jo.result.businessCode);
	            break;
	        case '14':              // 指定用户
				location.replace('http://' + location.host + '/v/zzqpNew/getMsg.html?bizcode=' + jo.result.businessCode);
	            break;  
	        case '15':   // 一等奖核销
	        	if(jo.reply.earnTime){
	        		sessionStorage.earnTime = jo.reply.earnTime;
	        	}	        	
				location.replace('http://' + location.host + replace + jo.result.businessCode);
	            break;      
	        case '13':              // 黑名单
				location.replace('http://' + location.host + '/v/zzqpNew/getMsg.html?bizcode=' + jo.result.businessCode);
	            break;    
	        case '-1':              // 系统升级中
				location.replace('http://' + location.host + replace + jo.result.businessCode);
	            break;    
	        default:
				location.replace('http://' + location.host + replace + jo.result.businessCode);
	       	}		
       	}else{//code != 0;
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
