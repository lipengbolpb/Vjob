'use strict';
(function(){
	ini_wxshare(vge.fjmallappid);
	var args = vge.urlparse(location.href),
		bizcode=args.bizcode;
	if(sessionStorage.bizcode){
		bizcode = sessionStorage.bizcode;
	}
	
	if(bizcode==0){
		if(sessionStorage.currentVpoints==0){
			$('#currentjf p').html('本次扫码未获得积分');
		}else{
			$('#currentjf p').html('恭喜您获得<span>'+transfNum(sessionStorage.currentVpoints)+'</span>积分');
		}
		$('#tip').html('积分价值约'+sessionStorage.currentVpoints/100+'元<br />可兑换BOSS音响、范思哲箱包等礼品');
	}else{
		$('#currentjf p').html('此二维码您已扫过');
		$('#currentjf a').text('立即进入');
		$('#tip').html('获得'+transfNum(sessionStorage.currentVpoints)+'积分，价值约'+sessionStorage.currentVpoints/100+'元<br />扫码时间：'+sessionStorage.earnTime)
	}
	
	$('#currentjf a').on('click',function(){
		sessionStorage.bizcode = 11;
		ifremeber();
	});
	
	
	function ifremeber() {
		var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + sessionStorage.openid + '&appid=' + vge.fjmallappid;
		vge.ajxget(requrl, 5000, function(r) {
			try {
				var o = JSON.parse(r);
				if(o.subscribe == '0') { //未关注
					sessionStorage.nickname = '游客';
					sessionStorage.headimg = '/v/fjmall/img/headimg.png';
					$('#attention').fadeIn(100);
				} else { //已关注用户
					sessionStorage.nickname = o.nickname;
					sessionStorage.headimg = o.headimgurl == '' ? '/v/fjmall/img/headimg.png' : o.headimgurl;
					location.href = 'http://'+location.host+'/v/fjmall/index.html';
				}
			} catch(e) {
				vge.clog('errmsg', [requrl, e]);
			}
		}, function(err) {
			vge.clog('errmsg', [requrl, err]);
		});
	}
	
	$('#attention .togz').on('click',function(){
		location.href = 'http://'+location.host+'/v/fjmall/attention.html';
	});
	
	$('#attention .close').on('click',function(){
		$('#attention').fadeOut(100);
//		wx.closeWindow();
	});
	
	function transfNum(num) {
		if(num < 1000) {
			return num;
		} else {
			var str = num + '',
				reg = /\*/g;
			var arr = '',
				Int = '',
				Float = '',
				resStr1 = [],
				resStr2 = [];
			if(str.indexOf(".") !== -1) {
				arr = str.split(".");
				Int = arr[0].split('');
				Float = arr[1].split('');
			} else {
				Int = str.split('');
			}
			Int = Int.reverse();
			for(var i = 0; i < Int.length; i++) {
				resStr1.push(Int[i]);
				if(i % 3 === 2) {
					resStr1.push(',');
				}
			}
			resStr1 = resStr1.reverse().join('*');
			resStr1 = resStr1.replace(reg, '');
			if(resStr1[0] == ',') {
				resStr1 = resStr1.substr(1, resStr1.length);
			}
			for(var j = 0; j < Float.length; j++) {
				resStr2.push(Float[j]);
				if(j % 3 === 2) {
					resStr2.push(',');
				}
			}
			resStr2 = resStr2.join('*');
			resStr2 = resStr2.replace(reg, '');
			if(resStr2[resStr2.length - 1] == ',') {
				resStr2 = resStr2.substr(0, resStr2.length - 1);
			}
			if(Float.length < 1) {
				return resStr1;
			} else {
				return resStr1 + '.' + resStr2;
			}
		}
	}
})()
