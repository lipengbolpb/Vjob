'use strict';
(function(){
	ini_wxshare(vge.fjmallappid);
	var args = vge.urlparse(location.href),
		bizcode=Number(args.bizcode);
	
	switch (bizcode){
		case 1:
			$('#currentjf p').html('这个二维码不存在');
			$('#tip').html('请扫码正确的活动二维码');
			break;
		case 2:
			$('#currentjf p').html('此二维码已被扫过');
			if(sessionStorage.earnTime!=''&&sessionStorage.earnTime!=undefined){
				$('#tip').html('扫码时间：'+sessionStorage.earnTime+'<br />再扫一瓶试试看');
			}else{
				$('#tip').html('再扫一瓶试试看');
			}
			break;
		case 3:
			$('#currentjf p').html('这个二维码已过期');
			$('#tip').html('这么好的酒，要学会珍惜哦');
			break;
		case 4:
			$('#currentjf p').html('活动未开始');
			$('#tip').html('心急喝不了好啤酒，再等等哦<br />'+sessionStorage.batchName===undefined?'':sessionStorage.batchName+'<br />服务热线：4008-365-591');
			break;
		case 5:
			$('#currentjf p').html('活动已截止');
			$('#tip').html('好酒不等人，下次早点来哦');
			break;
		case 6:
			$('#currentjf p').html('系统繁忙 ');
			$('#tip').html('稍等片刻，畅想欢聚时刻');
			break;
		case 17:
			$('#currentjf p').html('好酒美味 更需趁早');
			$('#tip').html('您扫的这瓶酒<br />所属产品批次活动已结束');
			break;	
		case 19:
			$('#currentjf p').html('离红包只差一点点');
			$('#tip').html('再扫一瓶试试看');
			break;
		case 18:
			$('#currentjf p').html('好酒美味 更需趁早');
			$('#tip').html('此码未被使用<br />活动批次：' + batchName);
			title_tip('尊敬的用户', '此码未被使用<br />活动批次：' + batchName, '我知道了');
			break;	
		case -1:
			$('#currentjf p').html('系统升级中');
			$('#tip').html('稍安勿躁，敬请关注');
			break;	
		default:
			title_tip('尊敬的用户', bizcode + ':' + sessionStorage.msg, '我知道了');
			break;
	}
	
	
	$('#currentjf a').on('click',function(){
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
					sessionStorage.headimg = o.headimgurl;
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
