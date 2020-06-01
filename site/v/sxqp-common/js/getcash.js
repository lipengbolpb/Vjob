(function() {
	'use strict';
	var SPACK_PORT = vge.sxqp + '/DBTSXQPInterface/gifts/getGiftspack';
	var APPID = vge.sxqpappid;
	var PROJECT = 'sxqp-common';
	var RULE_URL = 'https://mp.weixin.qq.com/s?__biz=MzIwNTg2Mzc4OA==&mid=100000068&idx=1&sn=35c31b6db3732584c453076087cb5bed&chksm=172b2f47205ca651cc29c2e855b9355d0649489cfb7394a063358013057340aad6dc8195a05f#rd';
	var EXPLAIN_URL = 'https://mp.weixin.qq.com/s?__biz=MzIwNTg2Mzc4OA==&mid=100000068&idx=1&sn=35c31b6db3732584c453076087cb5bed&chksm=172b2f47205ca651cc29c2e855b9355d0649489cfb7394a063358013057340aad6dc8195a05f#rd';

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

	if((weekSignPopup == 1 && weekSignEarnFlag != 1) || act == true) {
		needAlert = true;
	}

	! function() { //页面初始化
		if(Number(currentMoney) == 0) { //中奖金额为0
			$('.congratulate').html('离红包只差一点点<br>再扫一瓶试试');
			$('.congratulate').css({
				'margin': '2rem auto 0',
				'fontSize': '1rem'
			});
			$('.prize').css('display', 'none');
		} else {
			$('#money').html(currentMoney);
		}

		if(bizcode == 11 || again == 'true') { //重复扫
			events();
			$('#jw_icon').css('display', 'block');
			if(Number(totalAccountMoney) >= 0.3) {
				$('.notice').html('温馨提示：您的红包累计金额为' + totalAccountMoney + '元，<br>点击上方按钮把钱拿走吧！');
				$('#btn').val('立即提现');
				$('#repbtn').val('立即提现');
			} else {
				$('#btn').val('查看红包余额');
				$('#repbtn').val('查看红包余额');
			}
			$('.repcash').css('display', 'block');
			if(sessionStorage.earnTime == '') {
				$('.earn').html('您已扫过这瓶酒<br>并获得<span class="earnMoney">¥' + currentMoney + '元</span>');
			} else {
				$('.earn').html('您已于<span class="earnTime">' + earnTime + '</span>扫过这瓶酒<br>并获得<span class="earnMoney">¥' + currentMoney + '元</span>');
			}
		} else {
			if(Number(totalAccountMoney) >= 0.3) {
				$('.notice').html('温馨提示：您的红包累计金额为' + totalAccountMoney + '元，<br>点击上方按钮把钱拿走吧！');
				$('#btn').val('立即提现');
				$('#repbtn').val('立即提现');
			} else {
				$('#btn').val('存入我的零钱包');
				$('#repbtn').val('存入我的零钱包');
			}
			$('.get').css('display', 'block');
		}
	}();

	//拆红包
	$('.hbGet,.open').on('click', function() {
		$('.open').addClass('kai');
		sessionStorage.again = 'true';
		setTimeout(function() {
			$('.get').fadeOut();
			$('.cash').fadeIn();
			$('#jw_icon').css('display', 'block');
			cb();
		}, 1000);
	});
	//签到
	function cb() {
		setTimeout(function() {
			if(weekSignFlag == 1) { //签到开启
				var timer = setTimeout(function() {
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
					events();
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
					} else { //活动推送（手动）
						if(act) {
							document.getElementById('active').style.display = 'block';
							document.getElementById('active').addEventListener('click', function() {
								document.getElementById('active').style.display = 'none';
							}, false);
						}
					}
				}, 500);
			} else {
				events();
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

	function events() {
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
			if(Number(totalAccountMoney) >= 0.3) {
				if(tx) {
					tx = false;
					$('#loading').css('display', 'block');
					give_spack();
				}
			} else {
				ifremeber();
			}
		});
	}

	/* 提现 */
	function give_spack() {
		var javai = SPACK_PORT;
		var req = {
			"openid": openid,
			"hbopenid": hbopenid
		};
		vge.callJApi(javai, req,
			function(jo) {
				$('.loading').css('display', 'none');
				if(jo.result.code == '0') {
					if(jo.result.businessCode === '0') {
						$('.mask').css('display', 'block');
						tx = false;
					} else if(jo.result.businessCode === '1') { //1
						title_tip('提 示', '您的红包金额不足，再喝几瓶攒够0.3元发红包！', '我知道了');
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
	//酒王战绩
	$('#jw_icon').on('click', function() {
		$('#jiuw_box').fadeIn(1, function() {
			$('#jiuw_box div').css('bottom', '0rem');
		});
		$('#jiuw_box .close').on('click', function() {
			$('#jiuw_box div').css('bottom', '-11rem');
			$('#jiuw_box').fadeOut(1);
		});
	});
})();