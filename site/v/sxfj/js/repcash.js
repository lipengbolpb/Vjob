(function() {
	var timer = null,
		timer2 = null,
		s = 0;
	var myaudio = document.getElementById("audio");

	var time = 12,
		audioSrc = '',
		poetryList = 4,
		i = 0,
		hei = '',
		hei2 = '';

	var poetryArr = [10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 10, 3, 4, 10],
		poeIndex = Math.floor(Math.random() * 20);

	var openid = sessionStorage.openid === undefined ? '' : sessionStorage.openid,
		args = vge.urlparse(location.href),
		hbopenid = args.openid,
		bizcode = args.bizcode,
		currentMoney = sessionStorage.currentMoney === undefined ? '' : sessionStorage.currentMoney,
		totalAccountMoney = sessionStorage.totalAccountMoney === undefined ? '' : sessionStorage.totalAccountMoney;

	audioReq(poetryArr[poeIndex] + '');

	if(totalAccountMoney>=1){
		$('#btn').css({
			'background-image': 'url(/v/sxfj/img/button_1.png)',
			'-webkit-background-size': 'auto 100%;'
		});
		$('p.tip').html(`您已于${sessionStorage.earnTime}扫过这瓶酒，<br />并获得<span>¥${currentMoney}元</span>`);
//		$('p.tip').html(`您的红包累计金额为${totalAccountMoney}元,已经大于1元了,点击上方“立即提现”按钮把钱拿走吧`);
	}else{
		$('p.tip').html(`您已于${sessionStorage.earnTime}扫过这瓶酒，<br />并获得<span>¥${currentMoney}元</span>`);
	}
	
	

	function audioReq(cs) { //音频和文字
		$('img.poetry').attr('src', `/v/sxfj/img/poetry_${cs}.png`);
	}

	$('#btn').on('click', function() {
		if(totalAccountMoney < 1) {
			ifremeber();
		} else {
			$('#btn').unbind();
			$('#btn').css({
				'background-image': 'none',
				'-webkit-background-size': 'auto 100%;'
			});
			$('#btn').html('<img src="/v/sxfj/img/loading.gif"/>');
			give_spack();
		}
	});

	function give_spack() { //提现
		var javai = vge.sxfj + '/DBTSXFJInterface/gifts/getGiftspack';
		var req = {
			"openid": openid,
			"hbopenid": hbopenid
		};
		vge.callJApi(javai, req,
			function(jo) {
				$('#btn').css({
					'background-image': 'url(/v/sxfj/img/button_1.png)',
					'-webkit-background-size': 'auto 100%;'
				});
				$('#btn').html('');
				$('#btn').on('click', function() {
					if(totalAccountMoney < 1) {
						ifremeber();
					} else {
						$('#btn').unbind();
						$('#btn').css({
							'background-image': 'none',
							'-webkit-background-size': 'auto 100%;'
						});
						$('#btn').html('<img src="/v/sxfj/img/loading.gif"/>');
						give_spack();
					}
				});
				if(jo.result.code == '0') {
					if(jo.result.businessCode === '0') {
						$('#tx_tip').css('display', 'block');
						$('.content').css('display','none');
						$('#btn').css({
							'background-image': 'url(/v/sxfj/img/button_2.png)',
							'-webkit-background-size': 'auto 100%;'
						});
						sessionStorage.totalAccountMoney = 0;
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
						title_tip('尊敬的用户', jo.result.msg, '我知道了');
					}
				} else if(jo.result.code == '-1') {
					title_tip('尊敬的用户', '系统升级中...', '我知道了');
				} else { //code!='0'
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				}
			});
	}

	function ifremeber() {
		var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.sxfjappid;
		vge.ajxget(requrl, 5000, function(r) {
			try {
				var o = JSON.parse(r);
				if(o.subscribe == '0') { //未关注
					window.location.replace('http://' + location.host + '/v/sxfj/attention.html');
				} else { //已关注用户
					window.location.replace('http://' + location.host + '/sxfj/too/mybag');
				}
			} catch(e) {
				vge.clog('errmsg', [requrl, e]);
			}
		}, function(err) {
			vge.clog('errmsg', [requrl, err]);
		});
	}

	$('#tx_tip').on('click', function() {
		$('#tx_tip').css('display', 'none');
		$('.content').css('display','block');
		ifremeber();
	});
	
	$('#rule').on('click',function(){
		location.href = 'https://mp.weixin.qq.com/s?__biz=MzA3NzQzNzEwMw==&mid=510134002&idx=1&sn=ed9c5bfefa62b38973c92ed525fe3394&chksm=04cea73233b92e24f2b669c3b30712d5d495f621bfe5a73cce19a3a63a5504be32595fae1ca5#rd';
	});
	$('#private').on('click',function(){
		location.href = 'https://mp.weixin.qq.com/s?__biz=MzA3NzQzNzEwMw==&mid=510134001&idx=1&sn=fdceb4d68cd701942ffc3dd14916af4c&chksm=04cea73133b92e27ce6c210a2d6d0f0d9163261832ce9d05036d42181e9f5b2576cbc4494e22#rd';
	});
	
})();