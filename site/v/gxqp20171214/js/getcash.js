(function() {
	'use strict';

	var h = document.body.clientHeight,
		height = document.getElementsByClassName('top')[0].clientHeight,
		h2 = h - height;
	document.getElementsByClassName('bottom')[1].style.minHeight = h2 - 8 + 'px';

	var timer = null,
		first = true,
		args = vge.urlparse(location.href),
		currentMoney = sessionStorage.currentMoney === undefined ? '0.00' : sessionStorage.currentMoney,
		totalAccountMoney = sessionStorage.totalAccountMoney === undefined ? '0.00' : sessionStorage.totalAccountMoney,
		codeContentUrl = sessionStorage.codeContentUrl === undefined ? 'img/duilian_1.png' : sessionStorage.codeContentUrl,
		hbopenid = sessionStorage.hbopenid,//v积分
		openid = args.openid,//企业
		bizcode = args.bizcode;

	if(sessionStorage.bizcode) {
		bizcode = sessionStorage.bizcode;
	}
	if(bizcode == 0) {
		$('.cash_warp').css('display','block');
		if(currentMoney > 0) {
			$('.money_msg').html('<span>恭喜您获得</span><br /><em>' + currentMoney + '</em>元');
		} else {
			$('.money_msg').html('<span>谢谢参与</span><br />祝您天天鸿运');
		}
		if(totalAccountMoney < 1) {
			$('.tip').html('根据微信平台要求，红包累计大于等于1元后可提现，不足1元的红包我们为您贴心准备了零钱包功能');
		} else {
			$('.tip').html('您的红包累计金额为¥' + totalAccountMoney + '元，赶快点击下方“立即提现”按钮把钱拿走吧~');
		}
	} else {
		$('.cash_content').css('visibility', 'visible');
		$('.money_msg').html('<span>此红包</span><br />您已扫过');
		$('.money_msg').css('font-weight', 'bold');
		if(totalAccountMoney < 1) {
			$('.tip').html('您已于' + sessionStorage.earnTime + '扫过这瓶酒并获得¥' + currentMoney + '元');
		} else {
			$('.tip').html('您已于' + sessionStorage.earnTime + '扫过这瓶酒并获得¥' + currentMoney + '元');
		}
		if(totalAccountMoney >= 1) {
			give_spack();
		}
	}
	$('#open').on('click', function() {
		$(this).addClass('rotate');
	});

	$('#open').on('transitionend', function() {
		$('.cash_warp').fadeOut(200, function() {
			$('.cash_content').css('visibility', 'visible');
			if(totalAccountMoney >= 1) {
				give_spack();
			}
		});
		document.getElementById("audio").play();
	});
	
	$('#private').on('click', function() {
		location.href = 'http://mp.weixin.qq.com/s/aPZAyVDA-sd0BBuleQhR8w';
	});

	$('#rule').on('click', function() {
		location.href = 'http://mp.weixin.qq.com/s/sixtZCCrUHhHuqgh9PrvnQ';
	});

	$('.duilian').attr('src', codeContentUrl);
	if(currentMoney <= 0) {
		$('.duilian').css('width', '90%');
	}

	$('.alert').on('click', function() {
		$(this).css('display', 'block');
		location.href = 'http://' + location.host + '/gxqp20171214/too/mybag';
	});
	$('#btn').on('click', function() {
		location.href = 'http://' + location.host + '/gxqp20171214/too/mybag';
	});

	function give_spack() { //提现
		var javai = vge.common + '/vjifenInterface/gifts/getGiftspack';
		var req = { "projectServerName": "guangxi",
			"openid": sessionStorage.vjifenOpenid,
			"hbopenid": hbopenid
		};
		vge.callJApi(javai, req,
			function(jo) {
				if(jo.result.code == '0') {
					if(jo.result.businessCode === '0') {
						$('.alert').fadeIn(200);
					} else if(jo.result.businessCode === '1') { //1
						title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
					} else if(jo.result.businessCode === '2') { //1
						title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
					} else if(jo.result.businessCode === '4') { //1
						title_tip('提现处理中，请稍后查看详细记录', '我知道了');
					} else if(jo.result.businessCode === '-2') { //-2
						title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
					} else if(jo.result.businessCode === '3') { //1
						title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
					} else if(jo.result.businessCode === '-1') { //-1
						title_tip('提 示', '系统升级中...', '我知道了');
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

})();