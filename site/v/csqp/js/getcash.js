(function() {

	'use strict';
	var timer = null,
		i = 0,
		tx = false,
		timer2 = null;
	var openid = sessionStorage.openid === undefined ? '' : sessionStorage.openid,
		args = vge.urlparse(location.href),
		hbopenid = args.openid,
		bizcode = args.bizcode,
		currentMoney = sessionStorage.currentMoney === undefined ? '' : sessionStorage.currentMoney,
		totalAccountMoney = sessionStorage.totalAccountMoney === undefined ? '' : sessionStorage.totalAccountMoney;

	if(sessionStorage.bizcode) {
		bizcode = sessionStorage.bizcode;
	}
	$('#current').html(Number(currentMoney).toFixed(2));

	var first = true,
		flag = false,
		act = true,
		needAlert = false,
		timer3 = null,
		timer2 = null; //needAlert 弹窗开关 act活动那个推广开关

	//签到相关
	var weekSignFlag = sessionStorage.weekSignFlag === 'undefined' ? '0' : sessionStorage.weekSignFlag, //是否开户自然周签到，1:开启、0或空:关闭
		weekSignDays = sessionStorage.weekSignDays === 'undefined' ? '' : sessionStorage.weekSignDays, //当前周已签到周几集合
		weekSignEarnFlag = sessionStorage.weekSignEarnFlag === 'undefined' ? '0' : sessionStorage.weekSignEarnFlag, //周签到红包是否已领取，1:已领取、0未领取  2领取签到红包
		weekSignEarnMoney = sessionStorage.weekSignEarnMoney === 'undefined' ? '' : sessionStorage.weekSignEarnMoney, //周签到红包金额
		weekSignLimitDay = sessionStorage.weekSignLimitDay === 'undefined' ? '' : sessionStorage.weekSignLimitDay, //周签到天数限制
		weekSignDiffDay = sessionStorage.weekSignDiffDay === 'undefined' ? '' : sessionStorage.weekSignDiffDay, //周签到还差天数
		weekSignPopup = sessionStorage.weekSignPopup === 'undefined' ? '' : sessionStorage.weekSignPopup, //自然周签到弹出提示，1:弹出提示、0或空:不弹出"
		weekSignPercent = sessionStorage.weekSignPercent === 'undefined' ? '' : sessionStorage.weekSignPercent; //周签到完成百分比
	
	if(new Date().getTime()>1514822400000){
		act = false;
	}
	
	if((weekSignPopup == 1 && weekSignEarnFlag != 1) || act == true) {
		if(bizcode != 11) {
			needAlert = true;
		}
	}

	var H = document.documentElement.clientHeight || document.body.clientHeight;
	if(H == 519) {
		$('.mark_cash').css('overflow-x', 'hidden');
		$('#explain1').css('bottom', '-1.5rem');
	}

	//提现状态
	if(Number(totalAccountMoney) < 1) {
		$('#tx').css({
			'background': '#d0d0d0',
			'color': '#8c8c8c'
		});
		tx = true;
	} else {
		$('#tip').html('温馨提示：您的红包累计金额已达<span id="total">' + totalAccountMoney + '</span>元啦<br />点击“立即提现”把钱拿走吧');
	}

	if(Number(currentMoney) === 0) { //提示语
		$('.tip').html(window.zeroText2());
		$('.tip').css('fontSize', '0.8rem');
		$('.current').css('display', 'none');
	}

	if(bizcode == 11) { //重复扫码
		$('#open').css('display', 'none');
		$('.mark_cash').animate({
			'opacity': '1'
		}, 500, function() {
			$('#explain').css('display', 'none');
			clearInterval(timer);
		});
		$('.coin1').addClass('ani1');
		$('.coin2').addClass('ani2');
		$('.coin3').addClass('ani3');
		$('.time').html('扫码入账时间：' + sessionStorage.earnTime);
	}
	$('#open').on('click', function() {
		_hmt.push(['_trackEvent', 'click', '拆红包', 'cash']);
		sessionStorage.bizcode = 11;
		$(this).attr('src', '/v/csqp/img/hbopen.png');
		$(this).fadeOut(400, function() {
			$('.coin1').addClass('ani1');
			$('.coin2').addClass('ani2');
			$('.coin3').addClass('ani3');
		});
		$('.mark_cash').animate({
			'opacity': '1'
		}, 1000, function() {
			$('#explain').css('display', 'none');
			clearInterval(timer);
		});
	});

	$('.coin3').on('animationend', function() {
		if(weekSignFlag == 1) { //签到开启
			timer3 = setTimeout(function() {
				$('.sign_logo').css('display', 'block'); //签到按钮
				if(weekSignEarnFlag == 1) { //已领取
					$('.sign_title').attr('src', '/v/qpzj/img2/sign_title_2.png');
					$('.sign_logo').css({
						'background': 'url(/v/qpzj/img2/sign_ed.png) no-repeat right',
						'-webkit-background-size': ' auto 100%'
					});
				} else {
					$('.light').css('visibility', 'visible');
					$('#weekSignEarnMoney').css('display', 'none');
					$('.sign_tip').html('本周签到达' + weekSignLimitDay + '天，可额外获得红包1个！');
					$('.sign_cash').css({
						'background': 'url(/v/qpzj/img2/sign_cash.png) no-repeat bottom',
						'-webkit-background-size': '100% auto'
					});
				}
				$('.sign_logo').on('click', function() {
					_hmt.push(['_trackEvent', 'click', '查看签到红包', 'cash']);
					$('#sign,.content').css('display', 'block');
				});
				$('.sign_alert').on('click', function() { //签到天数提醒
					$(this).css('display', 'none');
					$('.content').css('display', 'block');
				});
				$('.close').on('click', function() {
					$('#sign').css('display', 'none');
				});
			}, 1000);
		}
		if(needAlert) { //需要弹窗推广
			timer2 = setTimeout(function() {
				active();
				if(weekSignPopup == 1 && weekSignEarnFlag != 1) { //每天首次 且未领取签到红包就会弹出提示
					if(weekSignEarnFlag == 2) {
						$('#sign,.getSignCash').css('display', 'block');
						$('.getSignCash').on('click', function() {
							weekSignEarnFlag = '1';
							$('#sign,.light,.getSignCash').css('display', 'none');
							$('.content').css('display', 'block');
							$('.sign_title').attr('src', '/v/qpzj/img2/sign_title_2.png');
							$('.sign_logo').css({
								'background': 'url(/v/qpzj/img2/sign_ed.png) no-repeat right',
								'-webkit-background-size': ' auto 100%'
							});
							$('.sign_tip,#weekSignEarnMoney').css('display', 'block');
							$('.sign_cash').css({
								'background': 'url(/v/qpzj/img2/sign_cash_open.png) no-repeat bottom',
								'-webkit-background-size': '100% auto'
							});
						});
					} else {
						$('#sign,.sign_alert').css('display', 'block');
					}
					if(act) {
						document.getElementsByClassName('active_tip')[0].style.display = 'block';
						document.getElementsByClassName('active_tip')[0].addEventListener('click', function() {
							document.getElementsByClassName('active_tip')[0].style.display = 'none';
						}, false);
					}
				} else { //活动推送（手动）
					if(act) {
						document.getElementsByClassName('active_tip')[0].style.display = 'block';
						document.getElementsByClassName('active_tip')[0].addEventListener('click', function() {
							document.getElementsByClassName('active_tip')[0].style.display = 'none';
						}, false);
					}
				}
			}, 1500);
		} else {
			active();
		}
	});

	function active() {
		document.getElementsByClassName('active_tip')[0].style.display = 'none';
		$('#tx').on('click', function() {
			$('#tx').unbind();
			if(tx) return;
			_hmt.push(['_trackEvent', 'click', '提现', 'cash']);
			give_spack();
		});
		$('.wxmark').on('click', function() {
			$(this).css('display', 'none');
			ifremeber();
		});
		$('#tobag').on('click', function() {
			_hmt.push(['_trackEvent', 'click', '查看红包记录', 'cash']);
			ifremeber();
		});
		$('#story').on('click', function() {
			_hmt.push(['_trackEvent', 'click', '听故事', 'cash']);
			if(first) {
				title_tip('温馨提示', '建议在wifi环境下收听', '我知道了', '', listen);
				first = false;
			} else {
				listen();
			}
		});

	}

	if(bizcode == 0) {
		//进度条
		$('.progress').html((weekSignLimitDay - weekSignDiffDay) + '/' + weekSignLimitDay);
		$('#progress2').css('width', weekSignPercent * 7.8 / 100 + 'rem');
		$('.days').html(weekSignLimitDay - weekSignDiffDay + '天');
		$('#weekSignEarnMoney').html(weekSignEarnMoney + '元');
		$('.weekSignEarnMoney').html('<span>' + weekSignEarnMoney + '</span>元');

		if(weekSignDays != '') {
			weekSignDays = weekSignDays.split(',').sort();
		}
		if(weekSignDays.length > 0) {
			for(var i = 0; i < weekSignDays[weekSignDays.length - 1]; i++) { //打叉
				document.getElementsByClassName('checks')[i].style.backgroundImage = 'url(/v/qpzj/img2/frok.png)';
			}
		}
		for(var j = 0; j < weekSignDays.length; j++) { //打√
			document.getElementsByClassName('checks')[weekSignDays[j] - 1].style.backgroundImage = 'url(/v/qpzj/img2/check.png)';
		}

	}

	$('#explain').on('click', function() {
		_hmt.push(['_trackEvent', 'click', '查看活动说明', 'cash']);
		$('#active').fadeIn(300);
		flag = true;
		$(this).css('display', 'none');
	});
	$('#explain1').on('click', function() {
		$('#active').fadeIn(300);
		flag = false;
		$(this).css('display', 'none');
	});
	$('#close').on('click', function() {
		$('#active').css('display', 'none');
		$('#explain1').css('display', 'block');
		if(flag) {
			$('#explain').css('display', 'block');
		}
	});

	timer = setInterval(function() {
		i++;
		if(i % 2 === 0) {
			$('#break1').css('display', 'none');
			$('#break2').css('display', 'block');
		} else {
			$('#break2').css('display', 'none');
			$('#break1').css('display', 'block');
		}
	}, 500);

	function give_spack() { //提现
		// title_tip('提 示', '微信提现升级中，您可先扫码，红包会自动累积哦！', '我知道了');
		var javai = vge.csqp + '/DBTHuNanQPInterface/gifts/getGiftspack';
		var req = {
			"openid": openid,
			"hbopenid": hbopenid
		};
		vge.callJApi(javai, req,
			function(jo) {
				$('#tx').on('click', function() {
					$('#tx').unbind();
					if(tx) return;
					_hmt.push(['_trackEvent', 'click', '提现', 'cash']);
					give_spack();
				});
				if(jo.result.code == '0') {
					if(jo.result.businessCode === '0') {
						$('.wxmark').fadeIn(200);
						tx = true;
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

	function ifremeber() {
		var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.csqpappid;
		vge.ajxget(requrl, 5000, function(r) {
			try {
				var o = JSON.parse(r);
				if(o.subscribe == '0') { //未关注
					window.location.replace('http://' + location.host + '/v/csqp/attention.html');
				} else { //已关注用户
					window.location.replace('http://' + location.host + '/csqp/too/mybag');
				}
			} catch(e) {
				vge.clog('errmsg', [requrl, e]);
			}
		}, function(err) {
			vge.clog('errmsg', [requrl, err]);
		});
	}

	$('#game_1').on('click', function() {
		location.href = 'http://' + location.host + '/v/csqp/game_1.html';
	});
	$('#game_2').on('click', function() {
		location.href = 'http://' + location.host + '/v/csqp/game/index.html';
	});

	var dom_audio = document.getElementById('myaudio');

	function listen() {
		var n = parseInt(Math.random() * 100) + 1;
		dom_audio.src = arr[n];
		dom_audio.play();
	}
	var arr = [
		'http://m.hnradio.com/wx/2wm100/mp3/0125%C7%E0%D2%F4%2D92%BB%A83%B7%D6%D6%D3%B5%C4%CA%B1%BC%E4%C8%A5%B8%D0%D0%BB.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/0301%C7%D7%D7%D3%B9%CA%CA%C208+%CE%D2%B2%BB%C4%DC%CF%C8%C9%FA%D4%E1%C0%F1.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/0405%B6%A1%CE%C4%C9%BD%2D01%B3%AC%C8%CB%B5%C4%D3%C2%B8%D2.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/0405%B6%A1%CE%C4%C9%BD%2D65%CA%D0%B3%A4%B5%C4%D3%C2%C6%F8.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/0427%D0%A4%D3%F1%2D73%CE%D2%B5%C4%B5%DA%D2%BB%B3%A1%CF%B7.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/0517%C3%F1%B8%E8%B1%B3%BA%F3%B5%C4%B9%CA%CA%C211%2D%CC%F4%B5%A3%B2%E8%D2%B6%C9%CF%B1%B1%BE%A9.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/0517%C3%F1%B8%E8%B1%B3%BA%F3%B5%C4%B9%CA%CA%C230%2D%B0%BD%B0%FC%CF%E0%BB%E1.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/0601%BB%E9%D2%F6%B9%CA%CA%C2%2D04%C2%F2%CA%B2%C3%B4%D1%F9%B5%C4%C9%B3%B7%A2.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/0601%BB%E9%D2%F6%B9%CA%CA%C2%2D08%CC%DB%B3%F6%C0%B4%B5%C4%C5%AE%C8%CB%D0%C4%B7%FE.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/0704%B3%C2%C1%C1%2D40%B0%D7%CA%D7%B2%BB%CF%E0%C0%EB.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/0704%B3%C2%C1%C1%2D42%D5%C5%BC%CC%B5%C4%B7%E3%C7%C5%B2%BB%C3%DF%D2%B9.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/0704%B3%C2%C1%C1%2D82%CF%E0%BC%E5%BA%CE%CC%AB%BC%B1.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/0706%C0%E8%BD%AD%2D01%B8%F8%A1%B0%CE%DE%C3%FB%D5%BD%CA%BF%A1%B1%B5%C4%D0%C5.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/0706%C0%E8%BD%AD%2D04%B4%F8%B4%CC%B5%C4%B3%A4%D2%CE.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/0803%D3%C5%D6%CA%C9%FA%BB%EE%2D01%C7%DA%D0%B4%B8%D0%D0%BB%D0%C5.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/0803%D3%C5%D6%CA%C9%FA%BB%EE%2D06%CB%E6%CA%D6%B5%C4%D0%A1%C0%F1%CE%EF.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/0810%BF%B9%D5%BD%D3%A2%D0%DB%2D01%D1%A6%D4%C0.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/0810%BF%B9%D5%BD%D3%A2%D0%DB%2D39%D9%FE%D0%C7%BA%A3.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/0907%BB%C6%DE%B1%2D05%BB%A82000%D4%AA%BD%A8%B3%C9%D2%BB%D7%F9%B0%D9%BB%F5%B4%F3%C2%A5.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/0907%BB%C6%DE%B1%2D12%D3%C3%B1%F8%B0%D1%CA%D8%B5%C4%CD%C1%B6%B9.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/1018%B7%BD%C3%F7%2D01%C2%E8%C2%E8%D4%DA%B5%C4%B5%D8%B7%BD.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/1018%B7%BD%C3%F7%2D29%D6%BB%D2%AA%B0%CB%CC%EC%C5%AF.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/1021%C1%F5%C4%C8%2D01%B2%BB%D4%F8%C0%CF%C8%A5.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/1021%C1%F5%C4%C8%2D93%CE%AA%B0%AE%B5%B1%C9%B3%B4%FC.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/110523%B3%AC%BC%B6100%2D01%B0%D4%CD%F5%B1%F0%BC%A7.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/110523%B3%AC%BC%B6100%2D04%B4%F3%CA%A5%C8%A2%C6%DE.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/110801%B3%AC%BC%B6100%2D01%D5%E6%D5%FD%B5%C4%D0%E8%D2%AA.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/110905%B3%AC%BC%B6100%D3%DA%B7%BC%2D04%B2%C1%B2%A3%C1%A7.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/110905%B3%AC%BC%B6100%D3%DA%B7%BC%2D27%D6%BB%B9%DC%C0%ED%BA%C5%C0%EB%D7%D4%BC%BA%D7%EE%BD%FC%B5%C4%C8%CB.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/111010%D1%EE%B2%A8%2D01%D1%C5%BC%D3%B4%EF%A3%BA%D1%B0%C5%BC%CD%BC%CA%E9%B9%DD.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/111010%D1%EE%B2%A8%2D19%D0%C2%BC%D3%C6%C2%B5%C4%B1%DE%D0%CC.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/1114%BB%C6%DE%B1%A1%AA%A1%AA1%C1%F5%DC%AD.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/1114%BB%C6%DE%B1%A1%AA%A1%AA38%C1%FA%D3%A6%CC%A8.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/120306%CE%E9%D6%DE%CD%AE%2D01%C6%B6%C7%EE%B5%C4%D0%A1%CC%E1%C7%D9%CA%D6.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/120416%BA%E7%D4%C6%2D01%C1%F4%D1%D4%B5%B5%B0%B8%B9%DD.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/120416%BA%E7%D4%C6%2D22%D5%E6%C8%CB%CD%BC%CA%E9%B9%DD.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/120709%BA%AB%C7%C7%C9%FA%2D01%CE%B0%B4%F3%B5%C4%CA%A7%B0%DC.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/120709%BA%AB%C7%C7%C9%FA%2D13%CA%B7%C9%CF%C0%FA%CA%B1%D7%EE%BE%C3%B5%C4%C2%ED%C0%AD%CB%C9.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/1207%C0%EE%D1%EF%2D02%C4%A2%B9%BD%B9%DC%C0%ED.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/1207%C0%EE%D1%EF%2D100%D1%A1%D4%F1%D0%C4%C0%ED.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/120813%B7%BD%C3%F7%2D02%CD%F5%C2%E5%B1%F6+%C8%FD%C3%AB.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/120813%B7%BD%C3%F7%2D08%CD%F5%D0%A1%B2%A8%D6%C2%C0%EE%D2%F8%BA%D3%B5%C4%C7%E9%CA%E9.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/121008%D5%C5%D4%C3%2D03%D3%D0%D2%BB%D6%D6%CD%D1%D3%EB%C7%E9%C9%AB%CE%DE%B9%D8.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/121008%D5%C5%D4%C3%2D07%B5%E7%CC%DD%C0%EF%B5%C4%BE%B5%D7%D3.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/121119%C0%E8%BD%AD%2D05%B0%C1%C2%FD%D3%EB%C6%AB%BC%FB.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/121119%C0%E8%BD%AD%2D34%D0%A1%CD%F5%D7%D3.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/1212%CB%EF%D5%BC%C9%BD%2D19%C1%D6%D3%EF%CC%C3%CA%C7%D5%E2%D1%F9%C9%CF%BF%CE%B5%C4.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/1212%CB%EF%D5%BC%C9%BD%2D41%C3%B7%C0%BC%B7%BC%B0%AE%CD%BD%C7%E9%C9%EE.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/1221%B6%AD%C0%F6%C6%BC%2D03%B0%D7%D1%D2%CB%C9%B5%C4%B8%B8%C7%D7.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/1221%B6%AD%C0%F6%C6%BC%2D04%C1%BA%C6%F4%B3%AC%B1%BB%B8%EE%B4%ED%C9%F6.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/130225%C0%D7%D1%F4%2D07%C8%F0%CA%BF%C8%CB.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/130225%C0%D7%D1%F4%2D68%D0%A1%C1%FA%CF%BA%B5%C4%BE%BA%D5%F9%BB%FA%D6%C6.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/130328%D5%C5%C3%EE%D1%F4%2D01%CB%CE%CC%AB%D7%E6%D6%AE%CB%C0.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/130328%D5%C5%C3%EE%D1%F4%2D07%BA%CD%AB%7C%CE%AA%BA%CE%B5%C3%B3%E8.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/130520%C7%E5%D2%F4%2D03%B5%F5%D4%DA%BE%AE%CD%B0%C0%EF%B5%C4%B2%CB%B9%FB.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/130520%C7%E5%D2%F4%2D10%D4%A4%B6%A860%C4%EA%B5%C4%BB%A8.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/130624%C0%EE%B1%F8%2D22%BF%EC%C0%D6%D2%BB%D0%A1%CA%B1.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/130624%C0%EE%B1%F8%2D27%BD%F0%D7%D3%D7%F6%B5%C4%D2%CE%D7%D3.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/130708%D1%EE%C2%FC%2D01%B0%EB%CD%B0%CF%F0%BD%BA%D6%AD.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/130708%D1%EE%C2%FC%2D28%CF%D6%CA%B5%B1%C8%D2%FE%BB%BC%B8%FC%D6%D8%D2%AA.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/130812%D1%EE%B2%A8%2D10%CD%E2%BD%BB%BC%D2%B5%C4%BB%B0%B2%BB%BA%C3%CC%D7.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/130812%D1%EE%B2%A8%2D29%D6%DC%B6%F7%C0%B4%B5%C4%CD%E2%BD%BB%D3%EF%D1%D4.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/131216%B3%AC%BC%B6100%2D02%C8%D5%D7%D3%B2%BB%CA%C7%D7%E2%B3%F6%C0%B4%B5%C4.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/131216%B3%AC%BC%B6100%2D05%B3%C1%CF%E3%CA%F7%B5%C4%C9%CB%BF%DA.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/140421%BE%CF%C6%BC%2D06%D7%DC%D3%D0%D2%BB%B4%CE%BF%DE%C6%FC%C8%C3%CE%D2%C3%C7%CB%B2%BC%E4%B3%A4%B4%F3.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/140421%BE%CF%C6%BC%2D09%CE%D2%D6%BB%D4%CA%D0%ED%C4%E3%B1%BF%CA%AE%C4%EA.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/140421%BE%CF%C6%BC%2D88%C8%E7%BA%CE%C8%C3%BA%A2%D7%D3%C3%E6%B6%D4%CB%C0%CD%F6.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/140715%D5%C5%D4%C3%2D14%D7%B7%C7%F3%D5%DF%B5%C4%B8%B1%B2%FA%C6%B7.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/140715%D5%C5%D4%C3%2D72%BF%AA%CB%AE%C0%EF%B5%C4%BA%FA%C2%DC%B2%B7.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/140922%CA%AF%C7%ED%ADU%2D03%D2%B9%D3%EA%BC%C4%B1%B1.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/140922%CA%AF%C7%ED%ADU%2D42%D4%F9%CD%F4%C2%D7.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/141103%D5%D4%C1%EB%2D02%D3%CC%CC%AB%C8%CB%B5%C4%B9%AB%D5%FD%B9%DB%C4%EE.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/141103%D5%D4%C1%EB%2D09%CB%FB%CE%AA%CA%B2%C3%B4%B1%BB%BE%DC%C7%A9.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/141208%D4%F8%BF%AD%2D01%D7%B9%BB%FA%C0%ED%C2%DB.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/141208%D4%F8%BF%AD%2D20%B9%B5%CD%A8%B5%C4%CE%BB%B2%EE%D0%A7%D3%A6.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/150112%D1%EE%C2%FC%2D03%CE%F3%BB%E1%C1%CB50%C4%EA.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/150112%D1%EE%C2%FC%2D43%C8%CB%C2%F6%CA%C7%A1%B0%C2%E9%B7%B3%A1%B1%B3%F6%C0%B4%B5%C4.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/%B6%A1%BD%A8%BB%AA%2D%C8%C3%B1%BF%C4%D0%D3%D1%D1%A7%BB%E1%C0%CB%C2%FE.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/%B6%A1%BD%A8%BB%AA%2D%D4%DE%C3%C0%CA%C7%B0%B5%CA%D2%D6%D0%B5%C4%D2%BB%D6%A7%C0%AF%D6%F2.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/%BA%CE%D1%D2%BF%C2%2D01%C4%D1%BB%D8%C6%BD%B3%A3.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/%BA%CE%D1%D2%BF%C2%2D13%B3%D4%CF%C2%C8%D3%CF%F2%D7%D4%BC%BA%B5%C4%CF%E3%BD%B6.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/%BA%CE%D1%D2%BF%C2%2D14%D7%EE%B7%BD%B1%E3%B5%C4%D7%F9%CE%BB%C1%F4%B8%F8%B1%F0%C8%CB.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/%CB%EF%D5%BC%C9%BD%2D10%B8%F0%D3%C5%B5%C4%B0%AE%C7%E9%B9%DB.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/%CB%EF%D5%BC%C9%BD%2D78%BB%C6%D5%B4+%C1%D6%D1%E0%C4%DD.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/%B2%DC%B2%D3%2D01%BB%AA%CA%A2%B6%D9%B5%C4%D7%DC%CD%B3%D0%B6%C8%CE%B8%E6%B1%F0%B4%C7.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/%B2%DC%B2%D3%2D08%CE%C2%CB%B9%B6%D9+%C7%F0%BC%AA%B6%FB.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/%B2%DC%B2%D3%2D20%BF%CF%C4%E1%B5%CF%B5%C7%D4%C2%D1%DD%BD%B2.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/%B2%DC%B2%D3%2D27%D2%C1%C0%F6%C9%AF%B0%D7%D2%BB%CA%C0.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/%C9%F2%D6%F1%D2%F4%A1%AA%A1%AA13%C4%B8%C7%D7%B5%C4%D0%AC%BC%DC.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/%C9%F2%D6%F1%D2%F4%A1%AA%A1%AA7%B9%FB%C8%BB%BB%D8%BC%D2.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/%D0%A4%D3%F1%2D10%D4%F8%CA%C7%BD%F1%B4%BA%BF%B4%BB%A8%C8%CB.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/%BA%E7%D4%C6%2D01%C4%B8.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/%BA%E7%D4%C6%2D13%BA%C3.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/%C9%E8%BC%C6%C8%CB%C9%FA16%2D%D1%A7%BB%E1%D3%EB%C4%B0%C9%FA%C8%CB%CF%E0%B4%A6.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/%C9%E8%BC%C6%C8%CB%C9%FA22%2D%B2%BB%B6%C0%D5%BC%C8%D9%D3%FE.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/%B3%AC%BC%B6100%A1%AA%A1%AA%B2%DC%B2%D301+90%A3%AF10%B7%A8%D4%F2.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/%B3%AC%BC%B6100%A1%AA%A1%AA%B2%DC%B2%D320+%C7%F4%CD%BD%C0%A7%BE%B3.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/%C7%E0%D2%F4%2D04%CE%DE%D0%E8%CC%AB%B6%E0%28%B3%C2%B9%F0%B7%BC%29.mp3',
		'http://m.hnradio.com/wx/2wm100/mp3/%C7%E0%D2%F4%2D96%B6%FE%CA%AE%B7%D6%D6%D3%BA%CD%CA%AE%CE%E5%B7%D6%D6%D3.mp3'
	];
})();