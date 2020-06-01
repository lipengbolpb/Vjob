(function() {
	"use strict";
	var currentMoney = sessionStorage.currentMoney,
		currentVpoints = sessionStorage.currentVpoints,
		totalAccountMoney = sessionStorage.totalAccountMoney;
	var args = vge.urlparse(location.href),
		openid = sessionStorage.openid,
		bizcode = args.bizcode,
		hbopenid = args.openid;
	sessionStorage.removeItem('companyKey');//
	if(sessionStorage.bizcode) {
		bizcode = sessionStorage.bizcode;
	}
	if(totalAccountMoney < 1) {
		$('#btn').html('存入我的账户');
	} else {
		$('p.tip_msg').text('您的红包累计金额为'+totalAccountMoney+'元，点击“立即提现”按钮把钱拿走吧');
		$('p.tip_msg').css('display', 'block');
	}
	document.getElementById("open").addEventListener('click',function(){
		sessionStorage.bizcode = 11;
		$('.cash_wrap').fadeOut(300);
		$('.cash_content').fadeIn(300, function() {
			$('.bottom').css('display', 'block');
			title_tip('提 示', '本活动将于2020年3月31日结束<br />新活动将于近期上线，敬请期待', '我知道了');
		});
	},false);
//	$('#open').on('click', function() {
//		sessionStorage.bizcode = 11;
//		$('.cash_wrap').fadeOut(300);
//		$('.cash_content').fadeIn(300, function() {
//			$('.bottom').css('display', 'block');
//		});
//	});

	if(currentMoney == 0 && currentVpoints == 0) {
		$('.money').html('谢谢惠顾~');
		$('.money').css('font-size', '1rem');
	} else if(currentMoney == 0 && currentVpoints != 0) {
		$('.money').html('获得<i>'+currentVpoints+'</i>积分');
		$('.cash_content').css('background-image', 'url(/v/terminal/img/cash_open_3.png)');
		$('.coin_l').attr('src', '/v/terminal/img/coin_l_1.png');
		$('.coin_r').attr('src', '/v/terminal/img/coin_r_1.png');
	} else if(currentMoney != 0 && currentVpoints == 0) {
		$('.money').html('获得<span>'+currentMoney+'</span>元');
	} else {
		$('.money').removeClass('odd');
		$('.cash_content').css('background-image', 'url(/v/terminal/img/cash_open_2.png)');
		$('.coin_r').attr('src', '/v/terminal/img/coin_r_1.png');
		$('.money').html('获得<span>'+currentMoney+'</span>元<br /><i>'+currentVpoints+'</i>积分');
	}

	if(bizcode == 11) {
		$('.cash_wrap').css('display', 'none');
		$('.repscan,.cash_content').css('display', 'block');
		$('.repscan p').html('扫码时间：'+ sessionStorage.earnTime);
		$('.bottom').css('display', 'block');
	} 
	
	document.getElementById("btn").addEventListener('click',btnClick,false);
	
	function btnClick(){
		document.getElementById("btn").removeEventListener('click',btnClick);
		setTimeout(function(){
			document.getElementById("btn").addEventListener('click',btnClick,false);
		},1000);
		if(totalAccountMoney < 1) {
			ifremeber();
			// location.href = 'http://'+location.host +'/terminal/too/details';
		} else {
			$(this).html('<img src="/v/terminal/img/loading.gif"/>');
			$('#btn').unbind();
			give_spack();
		}
	}
	
//	$('#btn').on('click', function() {
//		if(totalAccountMoney < 1) {
//			location.href = 'http://'+location.host +'/terminal/too/details';
//		} else {
//			$(this).html('<img src="/v/terminal/img/loading.gif"/>');
//			$('#btn').unbind();
//			give_spack();
//		}
//	});
	document.getElementById("alert").addEventListener('click',function(){
		this.style.display = 'none';
		ifremeber();
	},false);
//	$('#alert').on('click', function() {
//		$(this).fadeOut(1, function() {
//			location.href = 'http://'+location.host +'/terminal/too/details';
//		});
//	});

	function give_spack() { //提现
		var javai = vge.terminal + '/DBTVMTSInterface/gifts/getGiftspack';
		var req = {
			"openid": openid,
			"hbopenid": hbopenid
		};
		vge.callJApi(javai, req,
			function(jo) {
				$('#btn').html('立即提现');
				if(jo.result.code == '0') {
					if(jo.result.businessCode === '0') {
						sessionStorage.totalAccountMoney = 0;
						$('#btn').html('存入我的账户');
						$('#alert').css('display', 'block');
					} else if(jo.result.businessCode === '1') { //1
						title_tip('提 示', '您的红包金额不足，再扫几瓶攒够1元发红包！', '我知道了');
					} else if(jo.result.businessCode === '4') { //1
						title_tip('提 示', '提现处理中，请稍后查看详细记录', '我知道了');
					} else if(jo.result.businessCode === '-2') { //-2
						title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
					} else if(jo.result.businessCode === '2') { //1
						title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
					} else if(jo.result.businessCode === '3') { //1
						title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
					} else if(jo.result.businessCode === '-1') { //-1
						title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
					} else if(jo.result.businessCode === '5') {
						title_tip('提 示', jo.result.msg, '我知道了');
					} else {
						title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
					}
				} else if(jo.result.code == '-1') {
					title_tip('尊敬的用户', '系统升级中...', '我知道了');
				} else { //code!='0'
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				}
			});
	}
	if(sessionStorage.isVpointsShop==0||sessionStorage.noMall=='true'){//是否显示积分商城
		$('.mall').css('display','none');
	}
	$('.mall').on('click', function() {
		sessionStorage.removeItem('companyKey');
		location.href = 'http://'+location.host+'/v/terminal/IntegralMall/index.html';
	});
	$('.details').on('click', function() {
		ifremeber();
		// location.href = 'http://'+location.host +'/terminal/too/details';
	});
	
	/* 判断关注 */
	function ifremeber() {
	    var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.terminalappid;
	    vge.ajxget(requrl, 5000, function (r) {
	        try {
	            var o = JSON.parse(r);
	            if (o.subscribe == '0') { //未关注
	                window.location.replace('http://' + location.host + '/v/terminal/attention-zj.html');
	            } else { //已关注用户
	                window.location.replace('http://' + location.host + '/terminal/too/details');
	            }
	        } catch (e) {
	            vge.clog('errmsg', [requrl, e]);
	        }
	    }, function (err) {
	        vge.clog('errmsg', [requrl, err]);
	    });
	}
})();