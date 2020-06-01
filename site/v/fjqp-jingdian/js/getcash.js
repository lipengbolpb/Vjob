(function() {
	'use strict';
	window.onload = function() {
		var SPACK_PORT = vge.fjqp + '/DBTFJQPInterface/gifts/getGiftspack'; //提现接口
		var APPID = vge.fjqpappid;
		var RULE_URL = '';
		// 经典8度
		var RULE_URL1 =
			'https://mp.weixin.qq.com/s?__biz=MzIzMTA1NzgzNw==&mid=100000141&idx=1&sn=053490c136d62df82dca27c55e4c0eb3&chksm=68a8b14f5fdf3859ca90dc0a92b2f437da03717537a5cb20cfce631a183b0e6a74ba6bd71491#rd';
		// 经典10度
		var RULE_URL2 =
			'https://mp.weixin.qq.com/s?__biz=MzIzMTA1NzgzNw==&mid=100000139&idx=1&sn=8ac9bea394957a11d716bfa2c9e18f94&chksm=68a8b1495fdf385fc3db277579ab52bd232298ac5fb2dc49e6c37ed6e4a37d91b87697da627d#rd';
		// var EXPLAIN_URL = '';
		var activityVersion = sessionStorage.activityVersion
		if (activityVersion == 5) { // 经典8度版本号为 5
			RULE_URL = RULE_URL1;
		} else {
			RULE_URL = RULE_URL2; // 经典10度版本号为 10
		}

		/* 定义各项参数 */
		var currentMoney = sessionStorage.currentMoney,
			totalAccountMoney = sessionStorage.totalAccountMoney,
			earnTime = sessionStorage.earnTime,
			openid = sessionStorage.openid, //安徽
			args = vge.urlparse(location.href),
			bizcode = args.bizcode,

			again = sessionStorage.again === undefined ? false : sessionStorage.again,
			tx = true;
			
		sessionStorage.isAdAlert = 'true';	


		if (bizcode == 11 || again == 'true') {
			$('.title').text('您已扫过');
			$('.main').text('每瓶仅限扫码一次');
			$('.main').css('fontSize', '1.4rem');
			if (sessionStorage.earnTime == '' || sessionStorage.earnTime == undefined) {
				$('.time').html('您已扫过这瓶酒<br>并获得了￥' + currentMoney + '元')
			} else {
				$('.time').html('您已于' + earnTime + '扫过这瓶酒<br>并获得了￥' + currentMoney + '元')
			}
			$('.time,.cash').css('display', 'block');
			// $('.curtain').css('display', 'none');
		} else {
			// runAnimation();
			$('.get').css('display', 'block');
			if (Number(currentMoney) == 0) {
				$('.title').text('再喝一瓶试试看');
				$('.main').text('您离红包只差一点点');
				$('.main').css('fontSize', '1.4rem');
			} else {
				$('.title').text('恭喜您获得');
				$('.main').html('￥' + currentMoney + '<span class="yuan">元</span>');
			}
			// 抵抗疫情
			// if (new Date().getTime() > new Date(2020, 1, 4).getTime() && new Date().getTime() < new Date(2020, 1, 21).getTime() && sessionStorage.dayScanNum < 3&&sessionStorage.activityVersion==10) { //2020.2.4-2.20 每日两次
			// 	setTimeout(function() {
			// 		$('.active').css('display', 'flex');
			// 		$('.active .activeClose').on('click', function(e) {
			// 			e.stopPropagation();
			// 			$('.active').css('display', 'none');
			// 		})
			// 		sessionStorage.isAdAlert = 'false';
			// 	}, 800);
			// } else {
			// 	sessionStorage.isAdAlert = 'false';
			// }
		}
		if (Number(totalAccountMoney) >= 1) {
			$('.notice').html('温馨提示：您的红包累计金额为' + totalAccountMoney + '元，<br>点击上方按钮把钱拿走吧！');
			$('#btn').val('去提现');
		} else {
			if (bizcode == 11 || again == 'true' || Number(currentMoney) == 0) {
				$('#btn').val('查看红包余额');
			} else {
				$('#btn').val('存入我的零钱包');
			}
		}

		// 点击拆红包
		$('.open').on('touchstart', function() {
			// if(sessionStorage.isAdAlert=='true'){
			// 	return false;
			// }
			$('.get').fadeOut();
			$('.cash').fadeIn(function() {
				//拆后广告
				if (new Date().getTime() > new Date(2020, 1, 4).getTime() && new Date().getTime() < new Date(2020, 1, 21).getTime() && sessionStorage.dayScanNum < 3&&sessionStorage.activityVersion==10) { //2020.2.4-2.20 每日两次
					setTimeout(function() {
						$('.active').css('display', 'flex');
						$('.active .activeClose').on('click', function(e) {
							e.stopPropagation();
							$('.active').css('display', 'none');
						})
					}, 1500);
				}
			});
			sessionStorage.again = 'true'
		});
		// 关闭联通流量广告
		$('.liantong-close').on('touchstart', function() {
			$('.liantong').css('display', 'none');
		});
		// 查看联通流量
		$('.liantong-btn').on('touchstart', function() {
			window.location.href = 'https://m.10010.com/queen/qingdaobeer/qdbeer.html';
		});

		// 点击提现按钮
		$('#btn').on('touchstart', function() {
			if (Number(totalAccountMoney) >= 1) {
				// if (tx) {
				//     tx = false;
				//     $('#loading').css('display', 'block');
				//     give_spack();
				// }
				window.location.replace('http://' + location.host + '/fjqp-jingdian/too/mybag');
			} else {
				ifremeber();
			}
		});

		//提现成功后判断关注
		$('.mask').on('touchstart', function() {
			ifremeber();
		});
		// 点击活动规则
		$('.rule').on('touchstart', function() {
			window.location.href = RULE_URL;
		});

		function runAnimation() {
			// 执行所有动画
			$('.curtain').css('display', 'block');
			// 两侧窗帘向左右滑动 耗时0.5s
			$('.curtain-left').addClass('curtainLeftAnimate');
			$('.curtain-right').addClass('curtainRightAnimate');
			// 文字向上渐显 耗时1s
			$('.textTop,.textBottom').css({
				'display': 'block'
			});
			$('.textTop,.textBottom').addClass('textBoxAnimate');
			$('.text-1,.text-2').addClass('textImgAnimate');
			// 泡沫向下渐显 耗时0.5s
			$('.foamBox1,.foamBox2').css({
				'display': 'block'
			});
			$('.foamBox1,.foamBox2').addClass('textBoxAnimateDown');
			$('.text-1-foam,.text-2-foam').addClass('textImgAnimateDown');
			// 显示拆红包页面
			setTimeout(function() {
				// 隐藏curtain页面，显示get页面
				$('.textTop,.textBottom,.beer,.curtain-bg,.curtain-logo').fadeOut();
				$('.get').fadeIn();
				setTimeout(function() {
					$('.curtain').css({
						'display': 'none'
					});
				}, 600);
			}, 3000);
		}

		/* 提现 */
		function give_spack() {
			var javai = SPACK_PORT;
			var req = {
				"openid": openid,
				"hbopenid": hbopenid
			};
			$.ajax({
				type: "POST",
				url: javai,
				data: JSON.stringify(req),
				dataType: 'json',
				success: function(jo, status, xhr) {
					$('.loading').css('display', 'none');
					if (jo.result.code == '0') {
						if (jo.result.businessCode === '0') {
							$('.mask').css('display', 'block');
							tx = false;
						} else if (jo.result.businessCode === '1') { //1
							title_tip('提 示', '您的红包金额不足，再喝几支攒够1元发红包！', '我知道了');
							tx = true;
						} else if (jo.result.businessCode === '2') { //1
							title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
							tx = true;
						} else if (jo.result.businessCode === '4') { //1
							title_tip('提现处理中，请稍后查看详细记录', '我知道了');
							tx = true;
						} else if (jo.result.businessCode === '3') { //1
							title_tip('尊敬的用户',
								'<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>',
								'我知道了');
							tx = true;
						} else if (jo.result.businessCode === '-1') { //-1
							title_tip('提 示', '系统升级中...', '我知道了');
							tx = true;
						} else if (jo.result.businessCode === '-2') { //-1
							title_tip('提 示', '提现操作过于频繁', '我知道了');
							tx = true;
						} else if (jo.result.businessCode === '5') { //5
							title_tip('尊敬的用户', jo.result.msg, '我知道了');
							tx = true;
						} else {
							title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
							tx = true;
						}
					} else if (jo.result.code == '-1') {
						title_tip('尊敬的用户', '系统升级中...', '我知道了');
						tx = true;
					} else { //code!='0'
						title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
						tx = true;
					}
				},
				error: function(res, status, xhr) {
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				}
			});
		}

		/* 判断关注 */
		function ifremeber() {
			var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + APPID;
			vge.ajxget(requrl, 5000, function(r) {
				try {
					var o = JSON.parse(r);
					if (o.subscribe == '0') { //未关注
						window.location.replace('http://' + location.host + '/v/fjqp-jingdian/attention.html');
					} else { //已关注用户
						window.location.replace('http://' + location.host + '/fjqp-jingdian/too/mybag');
					}
				} catch (e) {
					vge.clog('errmsg', [requrl, e]);
				}
			}, function(err) {
				vge.clog('errmsg', [requrl, err]);
			});
		}
		// 送酒上门按钮
		addNewBtn();

		function addNewBtn() {
			if (bizcode == 11 || again == 'true') {
				$('#btn-to-home').css('display', 'none');
				console.log($('#btn-to-home'));
			}
			$('#btn-to-home').click(function () {
				try {
					_hmt.push(['_trackEvent', 'click', '领取红包页', '点击送酒上门按钮-福建']);
					setTimeout(function () {
						window.location.href = 'https://mp.weixin.qq.com/s/zd_3_mfObarhmBizOZUXkw';
					}, 10);
				} catch (e) {

				}
			})
		}
	}

	
})()
