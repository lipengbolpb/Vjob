(function() {
    "use strict";
    ini_wxshare(vge.fjlbfappid);
    var now1 = new Date();
	var args = vge.urlparse(location.href),
        qr = args.s, openid=args.openid,vjifenOpenid=args.vjifenOpenid;
    var flag = true;
   	
   	var dom_location = document.getElementById('location'),
        dom_fail = document.getElementById('fail');
   	
    sessionStorage.clear();
    sessionStorage.openid = openid;
    sessionStorage.qr = qr;

//	setTimeout(function() { // 应对定位调用异常
//      if (sessionStorage.latitude===undefined) {
//          sweep();
//      }
//  }, 5000);
	vge.clog('汾酒老白汾', ['vjf-h5-log',transTime(),openid,'汾酒老白汾',location.href.split('?')[0],'扫码','进入扫码页面']);
    loading('玩命加载中');
    function locationed(res){
    	dom_location.style.display = 'none';
    	dom_fail.style.display = 'none';
        loading('玩命加载中');
        _hmt.push(['_trackEvent', 'click', '允许抓取-汾酒', '扫码']);
        sessionStorage.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        sessionStorage.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        sessionStorage.speed = res.speed; // 速度，以米/每秒计
        sessionStorage.accuracy = res.accuracy; // 位置精度
        sweep();
    }
	
    wx.ready(function() {
    	wx.hideOptionMenu();
        wxGetLocation();
    });
	
	
    function wxGetLocation(){
		vge.clog('汾酒老白汾', ['vjf-h5-log',transTime(),openid,'汾酒老白汾',location.href.split('?')[0],'扫码','调用地理位置']);
        wx.getLocation({
            type: 'wgs84',
            cancel:function(res){
            	loaded();
            	_hmt.push(['_trackEvent', 'click', '拒绝抓取-汾酒', '扫码']);
                dom_location.style.display = 'block';
                dom_location.addEventListener('click',function(){
			        $('.location').css('display','none');
                	sweep();
			    },false);
            },
            success:locationed,//接口调用完成时执行的回调函数，无论成功或失败都会执行。
            fail:function(res){
            	loaded();
            	_hmt.push(['_trackEvent', 'click', '抓取失败-汾酒', '扫码']);
                dom_location.style.display = 'none';
                dom_fail.style.display = 'block';
                dom_fail.addEventListener('click',function(){
			    	dom_location.style.display = 'none';
			    	dom_fail.style.display = 'none';
			    	sweep();
			    },false);
            }
        });
    }
    
    function sweep() {
    	if(flag){
    		flag = false;
    		loading('玩命加载中');//调用接口
        	var japi = vge.fjlbf+'/DBTFJLBInterface/sweep/sweepQrcode';
        	var req = {
            	"openid":openid,
                "vjifenOpenid":vjifenOpenid,
            	"sweepstr":qr,
            	"longitude": sessionStorage.longitude===undefined?'00':sessionStorage.longitude, //"经度"
            	"latitude": sessionStorage.latitude===undefined?'00':sessionStorage.latitude //"纬度"
        	};
        vge.clog('debug', [japi, JSON.stringify(req)]);
        vge.callJApi(japi, req, cb);
    	}
        
    }
    
    
    function transTime(){
    	var now = new Date();
    	var mon = now.getMonth()+1<10?'0'+(now.getMonth()+1):now.getMonth()+1,
    		day = now.getDate()<10?'0'+now.getDate():now.getDate(),
    		h = now.getHours()<10?'0'+now.getHours():now.getHours(),
    		m = now.getMinutes()<10?'0'+now.getMinutes():now.getMinutes(),
    		s = now.getSeconds()<10?'0'+now.getSeconds():now.getSeconds();
    	return now.getFullYear()+'-'+mon+'-'+day+'T'+h+":"+m+':'+s;
    }
    
    function cb(jo) {
		vge.clog('汾酒老白汾', ['vjf-h5-log',transTime(),openid,'汾酒老白汾',location.href.split('?')[0],'扫码','调用扫码并返回结果']);
		if(jo.result.code == '0'){
        	switch (jo.result.businessCode) {

	        case '0':               // 普通奖
				sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
				sessionStorage.currentMoney = jo.reply.currentMoney;
				sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
				sessionStorage.weekSignFlag = jo.reply.weekSignFlag;//是否开户自然周签到，1:开启、0或空:关闭
				sessionStorage.weekSignDays = jo.reply.weekSignDays;//当前周已签到周几集合
				sessionStorage.weekSignEarnFlag = jo.reply.weekSignEarnFlag;//周签到红包是否已领取，1:已领取、0未领取
				sessionStorage.weekSignEarnMoney = jo.reply.weekSignEarnMoney;//周签到红包金额
				sessionStorage.weekSignLimitDay = jo.reply.weekSignLimitDay;//周签到天数限制
				sessionStorage.weekSignDiffDay = jo.reply.weekSignDiffDay;//周签到还差天数
				sessionStorage.weekSignPercent = jo.reply.weekSignPercent;//进度百分比
				sessionStorage.weekSignPopup = jo.reply.weekSignPopup;//自然周签到弹出提示
				sessionStorage.earnTime = jo.reply.earnTime;
				sessionStorage.dayScanNum = jo.reply.dayScanNum;
				location.replace('http://' + location.host + '/v/fjlbf/getcash.html?bizcode='+jo.result.businessCode);
	            break;
	        case '11':              // 自己重复扫，普通奖
				sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
				sessionStorage.currentMoney = jo.reply.currentMoney;
				sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
				sessionStorage.earnTime = jo.reply.earnTime;
				location.replace('http://' + location.host + '/v/fjlbf/repcash.html?bizcode='+jo.result.businessCode);
	            break;
	        case '12':              // 可疑用户
				location.replace('http://' + location.host + '/v/fjlbf/getMsg.html?bizcode='+jo.result.businessCode);
	            break;    
	        case '13':              // 黑名单
				location.replace('http://' + location.host + '/v/fjlbf/getMsg.html?bizcode='+jo.result.businessCode);
	            break;  
	        case '14':              // 指定
				location.replace('http://' + location.host + '/v/fjlbf/getMsg.html?bizcode='+jo.result.businessCode);
	            break;     
	        default:
	        	if(jo.reply){
	        		sessionStorage.batchName = jo.reply.batchName===undefined?'':jo.reply.batchName;
                    sessionStorage.earnTime = jo.reply.earnTime===undefined?'':jo.reply.earnTime;
                    sessionStorage.msg = jo.result.msg;
	        	}else{
                    sessionStorage.earnTime = '';
                }	
				location.replace('http://' + location.host + '/v/fjlbf/fail.html?bizcode='+jo.result.businessCode);
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
