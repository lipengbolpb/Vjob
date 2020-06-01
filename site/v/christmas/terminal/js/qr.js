(function() {
    "use strict";
    ini_wxshare(vge.terminalappid);
	var args = vge.urlparse(location.href),
        qr = args.s, openid=args.openid,unionid='';
    var flag = true,flag2=true;
   	var dom_location = document.getElementsByClassName('location')[0],
        dom_fail = document.getElementsByClassName('location_fail')[0];
    sessionStorage.clear();
    sessionStorage.openid = openid;
    sessionStorage.qr = qr;
	
//  setTimeout(function() { // 应对定位调用异常
//      if (sessionStorage.latitude===undefined) {
//          sweep();
//      }
//  }, 4000);

    loading('玩命加载中');
    function locationed(res){
    	dom_location.style.display = 'none';
    	dom_fail.style.display = 'none';
        loading('玩命加载中');
        _hmt.push(['_trackEvent', 'click', '允许抓取-终端促销', '扫码']);
        sessionStorage.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        sessionStorage.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        sessionStorage.speed = res.speed; // 速度，以米/每秒计
        sessionStorage.accuracy = res.accuracy; // 位置精度
        queryUserIdentity();
    }
    wx.ready(function() {
        wxGetLocation();
    });

    dom_fail.addEventListener('click',function(){
   		dom_location.style.display = 'none';
    	dom_fail.style.display = 'none';
    	queryUserIdentity();
    },false);

    function wxGetLocation(){
        wx.getLocation({
            type: 'wgs84',
            cancel:function(res){
            	loaded();
                dom_location.style.display = 'block';
                _hmt.push(['_trackEvent', 'click', '拒绝抓取-终端促销', '扫码']);
                $('.pic_1').on('click',function(){
                	$('.location').css('display','none');
                	wxGetLocation();
                });
            },
            success:locationed,//接口调用完成时执行的回调函数，无论成功或失败都会执行。
            fail:function(res){
            	loaded();
                _hmt.push(['_trackEvent', 'click', '抓取失败-终端促销', '扫码']);
                dom_location.style.display = 'none';
                dom_fail.style.display = 'block';
                dom_fail.addEventListener('click',function(){
			    	dom_location.style.display = 'none';
			    	dom_fail.style.display = 'none';
			    	wx.closeWindow();
			    },false);
            }
        });
    }
    
    function queryUserIdentity() {
    	if(flag2){
    		flag2 = false;
    		loading('玩命加载中');//调用接口
        	var japi = vge.terminal+'/DBTVMTSInterface/user/queryUserIdentity';
        	var req = {
            	"openid":openid,
            	"isQueryActivity":1,
				"qrcode":qr
        	};
        vge.clog('debug', [japi, JSON.stringify(req)]);
        vge.callJApi(japi, req, function(jo){
        	loaded();
        	if(jo.result.code=='0'){
				if(jo.reply.iszj==1){
					location.replace('http://' + location.host + '/v/terminal/guide_2.html?bizcode='+jo.result.businessCode);
				}else{
					if(jo.result.businessCode=='6'||jo.result.businessCode=='7'||jo.result.businessCode=='9'){
						location.replace('http://' + location.host + '/v/terminal/guide_2.html?bizcode='+jo.result.businessCode);
					}else if(jo.result.businessCode=='4'||jo.result.businessCode=='5'||jo.result.businessCode=='8'){
						sessionStorage.brandIntroduceUrl = jo.reply.brandIntroduceUrl;
						location.replace('http://' + location.host + '/v/terminal/active.html?bizcode='+jo.result.businessCode);
					}else{
						title_tip('尊敬的用户',jo.result.msg,'我知道了');
					}
				}
        	}else{
        		title_tip('尊敬的用户',jo.result.msg,'我知道了');
        	}
        });
    	}
        
    }
    
    function sweep() {
    	if(flag){
    		flag = false;
    		loading('玩命加载中');//调用接口
        	var japi = vge.terminal+'/DBTVMTSInterface/sweep/sweepQrcode';
        	var req = {
            	"openid":openid,
            	"sweepstr":qr,
            	"longitude": sessionStorage.longitude===undefined?'00':sessionStorage.longitude, //"经度"
            	"latitude": sessionStorage.latitude===undefined?'00':sessionStorage.latitude //"纬度"
        	};
        vge.clog('debug', [japi, JSON.stringify(req)]);
        vge.callJApi(japi, req, cb);
    	}
        
    }
    
    function cb(jo) {
    	loaded();
    	vge.clog('debug', ['扫码返回', JSON.stringify(jo)]);
		if(jo.result.code == '0'){
			sessionStorage.headimgurl = '/v/terminal/img/headimg.png?v=1';
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
				sessionStorage.currentVpoints = jo.reply.currentVpoints;
				sessionStorage.isVpointsShop = jo.reply.isVpointsShop;
				location.replace('http://' + location.host + '/terminal/txo/getcash?bizcode='+jo.result.businessCode);
	            break;
	        case '11':              // 自己重复扫，普通奖
				sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
				sessionStorage.currentMoney = jo.reply.currentMoney;
				sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
				sessionStorage.earnTime = jo.reply.earnTime;
				sessionStorage.currentVpoints = jo.reply.currentVpoints;
				sessionStorage.isVpointsShop = jo.reply.isVpointsShop;
				location.replace('http://' + location.host + '/terminal/txo/getcash?bizcode='+jo.result.businessCode);
	            break;
	        case '7':              // 大奖
	        	sessionStorage.skukey = jo.reply.skukey;
	        	sessionStorage.prizeVcode = jo.reply.prizeVcode;
	        	sessionStorage.prizeType = jo.reply.prizeType;
	        	sessionStorage.companyKey = jo.reply.companyKey;
	        	if(jo.reply.username){
	        		sessionStorage.username = jo.reply.username;
	        		sessionStorage.idcard = jo.reply.idcard;
	        		sessionStorage.phonenum = jo.reply.phonenum;
	        	}
				location.replace('http://' + location.host + '/v/terminal/prize.html?bizcode='+jo.result.businessCode);
	            break; 
	        case '12':              // 可疑用户
				location.replace('http://' + location.host + '/v/terminal/getMsg.html?bizcode='+jo.result.businessCode);
	            break;     
	        case '13':              // 黑名单
				location.replace('http://' + location.host + '/v/terminal/getMsg.html?bizcode='+jo.result.businessCode);
	            break;  
	        case '14':              // 指定
				location.replace('http://' + location.host + '/v/terminal/getMsg.html?bizcode='+jo.result.businessCode);
	            break; 
	        case '15':              // 大奖核销
	        	sessionStorage.skukey = jo.reply.skukey;
	        	sessionStorage.prizeVcode = jo.reply.prizeVcode;
	        	sessionStorage.prizeType = jo.reply.prizeType;
	        	sessionStorage.earnTime = jo.reply.earnTime===undefined?'':jo.reply.earnTime;
				location.replace('http://' + location.host + '/v/terminal/prize.html?bizcode='+jo.result.businessCode);
	            break;     
	        case '16':              // 非销售人员
	        	sessionStorage.brandIntroduceUrl = jo.reply.brandIntroduceUrl;
				location.replace('http://' + location.host + '/v/terminal/active.html?bizcode='+jo.result.businessCode);
	            break;  
	        case '19':              // 游客
	        	sessionStorage.brandIntroduceUrl = jo.reply.brandIntroduceUrl;
				location.replace('http://' + location.host + '/v/terminal/active.html?bizcode='+jo.result.businessCode);
	            break;     
	        case '-1':              // 非销售人员
				title_tip('尊敬的用户','系统升级中，请稍后再试！','我知道了');
				loaded();
	            break;     
	        default:
        		sessionStorage.batchName = jo.reply.batchName===undefined?'':jo.reply.batchName;
        		sessionStorage.nickName = jo.reply.nickName===undefined?'':jo.reply.nickName;
        		sessionStorage.earnTime = jo.reply.earnTime===undefined?'':jo.reply.earnTime;
        		sessionStorage.pmPhoneNum = jo.reply.pmPhoneNum;
				location.replace('http://' + location.host + '/v/terminal/fail.html?bizcode='+jo.result.businessCode);
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
