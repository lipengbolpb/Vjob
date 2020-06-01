(function() {
	'use strict';
	var SPACK_PORT = vge.common + '/vjifenInterface/gifts/getGiftspack';
	var APPID = vge.hkqpappid;
	var PROJECT = 'hkqp-common';
	var RULE_URL = 'https://mp.weixin.qq.com/s?__biz=MzU0MTU3MTYzOA==&mid=100000097&idx=1&sn=1b498e37f350814f2f34afad8d27594f&chksm=7b26ae384c51272e0122c12c393b163dcb026e1ac259ab1d26dd095e5515022342d920e91ea3#rd';
	var EXPLAIN_URL = 'https://mp.weixin.qq.com/s?__biz=MzU0MTU3MTYzOA==&mid=100000099&idx=1&sn=b370ee758814a3964efa90e6db2cd23a&chksm=7b26ae3a4c51272c2fc68ad68ffc148902c18b647de0d05f58a5779f9f335ade6e6c1153430f#rd';

	/* 定义各项参数 */
	var currentMoney = sessionStorage.currentMoney,
		totalAccountMoney = sessionStorage.totalAccountMoney,
		codeContentUrl = sessionStorage.codeContentUrl,
		earnTime = sessionStorage.earnTime,
		openid = sessionStorage.openid,
		args = vge.urlparse(location.href),
		bizcode = args.bizcode,
		hbopenid = args.openid,
		first = sessionStorage.first === undefined ? true : sessionStorage.first,
		again = sessionStorage.again === undefined ? false : sessionStorage.again,
		activityVersion = sessionStorage.activityVersion === undefined ? '' : sessionStorage.activityVersion,
		STRCODE = sessionStorage.STRCODE === undefined ? '' : sessionStorage.STRCODE,
		tx = true,
		act = true,
		needAlert = false;

	var weekSignFlag = sessionStorage.weekSignFlag === 'undefined' ? '0' : sessionStorage.weekSignFlag, //是否开户自然周签到，1:开启、0或空:关闭
		weekSignDays = sessionStorage.weekSignDays === 'undefined' ? '' : sessionStorage.weekSignDays, //当前周已签到周几集合
		weekSignEarnFlag = sessionStorage.weekSignEarnFlag === 'undefined' ? '0' : sessionStorage.weekSignEarnFlag, //周签到红包是否已领取，1:已领取、0未领取  2领取签到红包
		weekSignEarnMoney = sessionStorage.weekSignEarnMoney === 'undefined' ? '' : sessionStorage.weekSignEarnMoney, //周签到红包金额
		weekSignLimitDay = sessionStorage.weekSignLimitDay === 'undefined' ? '' : sessionStorage.weekSignLimitDay, //周签到天数限制
		weekSignDiffDay = sessionStorage.weekSignDiffDay === 'undefined' ? '' : sessionStorage.weekSignDiffDay, //周签到还差天数
		weekSignPopup = sessionStorage.weekSignPopup === 'undefined' ? '' : sessionStorage.weekSignPopup, //自然周签到弹出提示，1:弹出提示、0或空:不弹出"
		weekSignPercent = sessionStorage.weekSignPercent === 'undefined' ? '' : sessionStorage.weekSignPercent; //周签到完成百分比

	//图片切换
	if(new Date().getTime() < 1529683200000) { //6.16-6.22
		$('#active img').attr('src', '/v/hkqp/img/20180616.jpg');
	} else if(new Date().getTime() > 1529683200000 && new Date().getTime() < 1530892800000) { //6.30-7.6
		$('#active img').attr('src', '/v/hkqp/img/20180630.jpg');
	} else if(new Date().getTime() > 1530892800000 && new Date().getTime() < 1531670400000) { //7.13-7.15
		$('#active img').attr('src', '/v/hkqp/img/20180713.jpg');
	} else if(new Date().getTime() > 1531670400000 && new Date().getTime() < 1532707200000) { //7.21-7.27
		$('#active img').attr('src', '/v/hkqp/img/20180721.jpg');
	} else if(new Date().getTime() > 1532707200000 && new Date().getTime() < 1533484800000) { //8.3-8.5
		$('#active img').attr('src', '/v/hkqp/img/20180803.jpg');
	} else { //8.5
		$('#active img').attr('src', '/v/hkqp/img/20180803.jpg');
		act = false;
	}

	if((weekSignPopup == 1 && weekSignEarnFlag != 1) || act == true) {
		needAlert = true;
	}

	function init() {
		if(Number(currentMoney) == 0) { //中奖金额为0
			$('.congratulate').html(window.zeroText2()).css('font-size', '.8rem');
			$('.congratulate').css({
				'margin': '2rem auto 0',
				'fontSize': '1rem'
			});
			$('.prize').css('display', 'none');
		} else {
			$('#money').html(currentMoney);
		}

		if(bizcode == 11 || again == 'true') { //重复扫
			if(Number(totalAccountMoney) >= 1) {
				$('.notice').html('温馨提示：您的红包累计金额为' + totalAccountMoney + '元，<br>点击上方按钮把钱拿走吧！');
				$('#btn').val('立即提现');
				$('#repbtn').val('立即提现');
			} else {
				if(act) {
					$('#btn').val('报名参加啤酒节');
					$('#repbtn').val('报名参加啤酒节');
				} else {
					$('#btn').val('查看红包余额');
					$('#repbtn').val('查看红包余额');
				}
			}
			$('.repcash').css('display', 'block');
			if(sessionStorage.earnTime == '') {
				$('.earn').html('您已扫过这瓶酒<br>并获得<span class="earnMoney">¥' + currentMoney + '元</span>');
			} else {
				$('.earn').html('您已于<span class="earnTime">' + earnTime + '</span>扫过这瓶酒<br>并获得<span class="earnMoney">¥' + currentMoney + '元</span>');
			}
		} else {
			if(Number(totalAccountMoney) >= 1) {
				$('.notice').html('温馨提示：您的红包累计金额为' + totalAccountMoney + '元，<br>点击上方按钮把钱拿走吧！');
				$('#btn').val('立即提现');
				$('#repbtn').val('立即提现');
			} else {
				if(act) {
					$('#btn').val('报名参加啤酒节');
					$('#repbtn').val('报名参加啤酒节');
				} else {
					$('#btn').val('查看红包余额');
					$('#repbtn').val('查看红包余额');
				}
			}
			$('.get').css('display', 'block');
		}
	}

	//拆红包
	$('.hbGet,.open').on('click', function() {
		$('.hbGet,.open').unbind('click');
		sessionStorage.again = true;
		if(STRCODE == 'true') { //从输入串码进入，模拟拆红包
			$('.open').addClass('kai');
			$('.open').on('animationend', () => {
				$('.get').fadeOut();
				$('.cash').fadeIn();
				cb();
			});
		} else {
			$('#loading').css('display', 'block');
			let req = {
				"openid": openid,
				"sweepstr": sessionStorage.qr,
				"longitude": sessionStorage.longitude === undefined ? '00' : sessionStorage.longitude, //"经度"
				"latitude": sessionStorage.latitude === undefined ? '00' : sessionStorage.latitude ,//"纬度"
				"projectServerName":"hainan",
			};
			$.ajax({
				type: "POST",
				url: vge.common + '/vjifenInterface/sweep/sweepQrcode',
				data: JSON.stringify(req),
				dataType: 'json',
				async: true,
				success: function(res, status, xhr) {
					vge.clog('返回结果2', [JSON.stringify(res)]);
					$('#loading').css('display', 'none');
					if(res.result.code == '0') {
						let replace = PROJECT;
						switch(res.result.businessCode) {
							case '0': // 普通奖
								currentMoney = res.reply.currentMoney;
								totalAccountMoney = res.reply.totalAccountMoney;
								earnTime = res.reply.earnTime;
								sessionStorage.totalAccountMoney = res.reply.totalAccountMoney;
								sessionStorage.currentMoney = res.reply.currentMoney;
								sessionStorage.earnTime = res.reply.earnTime === undefined ? '' : res.reply.earnTime;
								sessionStorage.dayScanNum = res.reply.dayScanNum;
								init();
								$('.open').addClass('kai');
								$('.open').on('animationend', () => {
									$('.get').fadeOut();
									$('.cash').fadeIn();
									cb();
								});
								break;
							case '11': // 自己重复扫，普通奖
								sessionStorage.totalAccountMoney = res.reply.totalAccountMoney;
								sessionStorage.currentMoney = res.reply.currentMoney;
								sessionStorage.codeContentUrl = res.reply.codeContentUrl;
								sessionStorage.earnTime = res.reply.earnTime === undefined ? '' : res.reply.earnTime;
								location.replace('http://' + location.host + '/' + replace + '/txo/getcash?bizcode=' + res.result.businessCode);
								break;
							case '12': // 可疑
								location.replace('http://' + location.host + '/v/' + replace + '/getMsg.html?bizcode=' + res.result.businessCode);
								break;
							case '13': // 黑名单
								location.replace('http://' + location.host + '/v/' + replace + '/getMsg.html?bizcode=' + res.result.businessCode);
								break;
							case '14': // 指定
								location.replace('http://' + location.host + '/v/' + replace + '/getMsg.html?bizcode=' + res.result.businessCode);
								break;
							case '7': // 大奖
								sessionStorage.username = res.reply.username === undefined ? '' : res.reply.username;
								sessionStorage.phonenum = res.reply.phonenum === undefined ? '' : res.reply.phonenum;
								sessionStorage.idcard = res.reply.idcard === undefined ? '' : res.reply.idcard;
								sessionStorage.skukey = res.reply.skukey;
								sessionStorage.prizeVcode = res.reply.prizeVcode;
								sessionStorage.grandPrizeType = res.reply.grandPrizeType === undefined ? '' : res.reply.grandPrizeType;
								if(res.reply.grandPrizeType == 'P' || res.reply.grandPrizeType == 'p') {
									location.replace('http://' + location.host + '/v/' + replace + '/prize.html?bizcode=' + res.result.businessCode);
								} else {
									title_tip('尊敬的用户', '扫码异常！', '我知道了');
								}
								break;
							case '15': //他人重复扫大奖
								sessionStorage.grandPrizeType = res.reply.grandPrizeType === undefined ? '' : res.reply.grandPrizeType;
								sessionStorage.earnTime = res.reply.earnTime === undefined ? '' : res.reply.earnTime; //扫码时间
								location.replace('http://' + location.host + '/v/' + replace + '/prize.html?bizcode=' + res.result.businessCode);
							default:
								if(res.reply) {
									sessionStorage.batchName = res.reply.batchName === undefined ? '' : res.reply.batchName;
									sessionStorage.earnTime = res.reply.earnTime === undefined ? '' : res.reply.earnTime;
									sessionStorage.msg = res.result.msg;
								} else {
									sessionStorage.earnTime = '';
								}
								location.replace('http://' + location.host + '/v/' + replace + '/fail.html?bizcode=' + res.result.businessCode);
						}
					} else if(res.result.code == '-1') { //code!='0'
						title_tip('尊敬的用户', '系统升级中...', '我知道了');
					} else {
						title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
					}
				},
				error: function(res, status, xhr) {
					console.log(res);
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				}
			});
		}
	});
	//签到
	function cb() {
		setTimeout(function() {
			if(weekSignFlag == 1) { //签到开启
				var timer = setTimeout(function() {
					$('.sign_logo').css('display', 'block'); //签到按钮
					if(weekSignEarnFlag == 1) { //已领取
						$('.sign_title').attr('src', '/v/' + PROJECT + '/img2/sign_title_2.png');
						$('.sign_logo').css({
							'background': 'url(/v/' + PROJECT + '/img2/sign_ed.png) no-repeat right',
							'-webkit-background-size': ' auto 100%'
						});
					} else {
						$('.light').css('visibility', 'visible');
						$('#weekSignEarnMoney').css('display', 'none');
						$('.sign_tip').html('本周签到达' + weekSignLimitDay + '天，可额外获得红包1个！');
						$('.sign_cash').css({
							'background': 'url(/v/' + PROJECT + '/img2/sign_cash.png) no-repeat bottom',
							'-webkit-background-size': '100% auto'
						});
					}
					$('.sign_logo').on('click', function() {
						$('#sign,.content').css('display', 'block');
					});
					$('.sign_alert').on('click', function() { //签到天数提醒
						$(this).css('display', 'none');
						$('.content').css('display', 'block');
					});
					$('.close').on('click', function() {
						$('#sign').css('display', 'none');
					});
				}, 700);
			}
			if(needAlert) { //需要弹窗推广
				var timer = setTimeout(function() {
					// active();
					if(weekSignPopup == 1 && weekSignEarnFlag != 1) { //每天首次 且未领取签到红包就会弹出提示
						if(weekSignEarnFlag == 2) {
							$('#sign,.getSignCash').css('display', 'block');
							$('.getSignCash').on('click', function() {
								weekSignEarnFlag = '1';
								$('#sign,.light,.getSignCash').css('display', 'none');
								$('.content').css('display', 'block');
								$('.sign_title').attr('src', '/v/' + PROJECT + '/img2/sign_title_2.png');
								$('.sign_logo').css({
									'background': 'url(/v/' + PROJECT + '/img2/sign_ed.png) no-repeat right',
									'-webkit-background-size': ' auto 100%'
								});
								$('.sign_tip,#weekSignEarnMoney').css('display', 'block');
								$('.sign_cash').css({
									'background': 'url(/v/' + PROJECT + '/img2/sign_cash_open.png) no-repeat bottom',
									'-webkit-background-size': '100% auto'
								});
							});
						} else {
							$('#sign,.sign_alert').css('display', 'block');
							if(sessionStorage.dayScanNum=='1'){
								document.getElementById('active').style.display = 'block';
								document.getElementById('active').addEventListener('click', function() {
									document.getElementById('active').style.display = 'none';
								}, false);
							}
						}
					} else { //活动推送（手动）
						if(sessionStorage.dayScanNum=='1'){
							document.getElementById('active').style.display = 'block';
							document.getElementById('active').addEventListener('click', function() {
								document.getElementById('active').style.display = 'none';
							}, false);
						}
					}
				}, 500);
			} else {
				// active();
			}
		}, 1000);
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
		var weeks = new Date();
		weeks = (weeks.getDay() + 6) % 7;
		for(var i = 0; i < weeks; i++) { //打钩打叉
			document.getElementsByClassName('checks')[i].style.backgroundImage = 'url(/v/sdqp-common/img2/frok.png)';
		}
		for(var j = 0; j < weekSignDays.length; j++) { //打√
			document.getElementsByClassName('checks')[weekSignDays[j] - 1].style.backgroundImage = 'url(/v/sdqp-common/img2/check.png)';
		}
	}
	//活动规则
	$('.rule').on('click', function() {
		window.location.href = RULE_URL;
	});
	//隐私说明
	$('.explain').on('click', function() {
		window.location.href = EXPLAIN_URL;
	});
	//提现成功后判断关注
	$('.mask').on('click', function() {
		$('.mask').css('display', 'none');
		ifremeber();
	});
	$('#btn,#repbtn').on('click', function() {
		if(Number(totalAccountMoney) >= 1) {
			if(tx) {
				tx = false;
				$('#loading').css('display', 'block');
				give_spack();
			}
		} else {
			if(act) {
				window.location.replace('http://' + location.host + '/v/' + PROJECT + '/attention.html');
			} else {
				ifremeber();
			}
		}
	});

	/* 提现 */
	function give_spack() {
		var javai = SPACK_PORT;
		var req = {
			"openid": openid,
			"hbopenid": hbopenid,
			"projectServerName":"hainan",
		};
		vge.callJApi(javai, req,
			function(jo) {
				$('.loading').css('display', 'none');
				if(jo.result.code == '0') {
					if(jo.result.businessCode === '0') {
						$('.mask').css('display', 'block');
						tx = false;
					} else if(jo.result.businessCode === '1') { //1
						title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
						tx = true;
					} else if(jo.result.businessCode === '2') { //1
						title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
						tx = true;
					} else if(jo.result.businessCode === '4') { //1
						title_tip('提现处理中，请稍后查看详细记录', '我知道了');
						tx = true;
					} else if(jo.result.businessCode === '3') { //1
						title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
						tx = true;
					} else if(jo.result.businessCode === '-1') { //-1
						title_tip('提 示', '系统升级中...', '我知道了');
						tx = true;
					} else if(jo.result.businessCode === '-2') { //-1
						title_tip('提 示', '提现操作过于频繁', '我知道了');
						tx = true;
					} else if(jo.result.businessCode === '5') { //5
						title_tip('尊敬的用户', jo.result.msg, '我知道了');
						tx = true;
					} else {
						title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
						tx = true;
					}
				} else if(jo.result.code == '-1') {
					title_tip('尊敬的用户', '系统升级中...', '我知道了');
					tx = true;
				} else { //code!='0'
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
					tx = true;
				}
			});
	}

	/* 判断关注 */
	function ifremeber() {
		var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + APPID;
		vge.ajxget(requrl, 5000, function(r) {
			try {
				var o = JSON.parse(r);
				if(o.subscribe == '0') { //未关注
					window.location.replace('http://' + location.host + '/v/' + PROJECT + '/attention.html');
				} else { //已关注用户
					window.location.replace('http://' + location.host + '/' + PROJECT + '/too/mybag');
				}
			} catch(e) {
				vge.clog('errmsg', [requrl, e]);
			}
		}, function(err) {
			vge.clog('errmsg', [requrl, err]);
		});
	}

	init();
})();