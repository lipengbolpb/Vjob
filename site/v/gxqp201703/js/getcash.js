(function(){
	'use strict';
	
	var timer=null,first = true,
		args = vge.urlparse(location.href),
		currentMoney=sessionStorage.currentMoney===undefined?'0.00':sessionStorage.currentMoney,
		totalAccountMoney=sessionStorage.totalAccountMoney===undefined?'0.00':sessionStorage.totalAccountMoney,
		codeContentUrl=sessionStorage.codeContentUrl,
		hbopenid=sessionStorage.hbopenid,//hbopenid
		openid = args.openid,
		bizcode=args.bizcode===undefined?0:args.bizcode;
	
	
	
	$('#zjc').attr('src',codeContentUrl);
	
	$('#private').on('click',function(){
		location.href = 'http://mp.weixin.qq.com/s/aPZAyVDA-sd0BBuleQhR8w';
	});
	
	$('#rule').on('click',function(){
		location.href = 'http://mp.weixin.qq.com/s/sixtZCCrUHhHuqgh9PrvnQ';
	});
	
	$(document).ready(function(){
		$('#open').on('click',function(){
			$(this).addClass('open');
			timer = setTimeout(function(){		
				$('#cover-b').css({'top':'20rem','opacity':'0'});
				$('#cover-t').css({'top':'-20rem','opacity':'0'});
				$('#jw_icon').css('display','block');
			},800);
			setTimeout(function(){
				$('.cash').animate({'opacity':'0'},500,function(){
					$('.cash').css('display','none');
					$('#current').html(currentMoney);
					if(Number(currentMoney) === 0){
						$('.hb').html('<img id="zero" src="/v/gxqp201703/img/0yuan.png?v=1"/>');
					}
				})
			},1200);
			if(Number(totalAccountMoney)>=1){
				$('#tip').html('温馨提示：您的红包累计金额为' + totalAccountMoney + '元，已超过1元，已自动提现至您的微信零钱里，请注意留意您的"微信支付"消息吧！');
				$('#tobag').val('查看我的红包');
				if(first){
					give_spack();
//					if(Number(totalAccountMoney)<88888.88){
//						give_spack();
//					}else{
//						location.href = 'http://'+location.host+'/v/gxqp201703/getMsg.html?bizcode=12&tx=1';
//					}
				}
			}
		});
	});
	if(bizcode==11){
		$('#jw_icon').css('display','block');
		$('#current').html(currentMoney);
		if(Number(currentMoney) === 0){
			$('.hb').html('<img id="zero" src="/v/gxqp201703/img/0yuan.png?v=1"/>');
		}
	}
	if(Number(totalAccountMoney)>=1){
		$('#tip').html('温馨提示：您的红包累计金额为' + totalAccountMoney + '元，已超过1元，已自动提现至您的微信零钱里，请注意留意您的"微信支付"消息吧！');
		$('#tobag').val('查看我的红包');
	}

	function rander2(x, y) {//随机金钱
		x = Math.floor(Math.random() * 100);
		y = Math.ceil(Math.random() * 100);
		if (y < 10) {
			y = '0' + y;
		} else if (y.toString().charAt(1) === '0') {
			y = y.toString().charAt(0);
		}
		$('#current').html(x + '.' + y);
	}
	function mon_suiji(cb) {
		var n = false,
		    x = 0,
		    y = 0;
		var timer1 = setTimeout(function() {
			n = true;
		},1000);
		var timer2 = setInterval(function() {
			if (!n) {
				rander2(x, y);
			} else {
				clearInterval(timer1);
				clearTimeout(timer2);
				$('#current').html(currentMoney);
				if(Number(currentMoney) === 0){
					$('.hb').html('<img id="zero" src="/v/gxqp201703/img/0yuan.png?v=1"/>');
				}
			}
		},10);
	}
	
	$('#tobag').on('click',function(){
		location.href='http://'+location.host+'/gxqp201703/too/mybag';
	});
	
	function give_spack () {
//		title_tip('提 示','微信提现升级中，您可先扫码，红包会自动累积哦！','我知道了');
		var javai = vge.common + '/vjifenInterface/gifts/getGiftspack';
		var req = { "projectServerName": "guangxi",
			"openid":sessionStorage.vjifenOpenid,
			"hbopenid":hbopenid,
			"unionid":sessionStorage.unionid===undefined?'':sessionStorage.unionid
		};
		vge.callJApi(javai, req, function(jo) {
			if (jo.result.code=='0') {
            if( jo.result.businessCode==='0') {
					first = false;
					title_tip('提 示','您的红包累计金额为' + totalAccountMoney + '元，已自动提现至您的微信零钱里，请留意您的"微信支付"消息','我知道了',undefined,ifremeber);
				} else if( jo.result.businessCode==='1'){//1
					title_tip('提 示','您的红包金额不足，再喝几瓶攒够1元发红包！','我知道了');
				} else if( jo.result.businessCode==='4'){//1
					title_tip('提 示','提现处理中，请稍后查看详细记录','我知道了');
				} else if( jo.result.businessCode==='5'){//1
					title_tip('提 示',jo.result.msg,'我知道了');
				} else if( jo.result.businessCode==='-1'){//1
					title_tip('提 示','提现操作过于频繁，请稍后再试！','我知道了');
				} else if (jo.result.businessCode === '-2') { //-2
	            	title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
	        	} else if( jo.result.businessCode==='2'){//2
					title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
				} else if( jo.result.businessCode==='3'){//1
					title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
				} else{
					title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
					first=true;
				}
			} else{//code!='0'
				title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
				first=true;
			}
		});
	}
	

	function ifremeber() {
		var req = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.gxqpappid;
		vge.ajxget(req, 5000, function(r) {
			try {
				var o = JSON.parse(r);
				if(o.subscribe == '0') { //未关注
					window.location.replace('http://' + location.host + '/v/gxqp201703/attention.html');
				} else { //已关注用户
//					document.getElementsByClassName('mark')[0].style.display = 'none';
					window.location.replace('http://' + location.host + '/gxqp201703/too/mybag');
				}
			} catch(e) {
				vge.clog('errmsg', [req, e]);
			}
		}, function(err) {
			vge.clog('errmsg', [req, err]);
		});
	}
	
	//酒王战绩
	$('#jw_icon').on('touchstart',function(){
		$('#jiuw_box').fadeIn(1,function(){
			$('#jiuw_box div').css('bottom','0rem');
		});
		$('#jiuw_box .close').on('touchstart',function(){
			$('#jiuw_box div').css('bottom','-11rem');
			$('#jiuw_box').fadeOut(1);
		});
	});
})();
