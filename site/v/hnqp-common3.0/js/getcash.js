(function() {
	'use strict';
	window.onload = function() {
		var SPACK_PORT = vge.hnqp + '/DBTHuaNQPInterface/gifts/getGiftspack'; //提现接口
		var APPID = vge.hnqpappid;
		var PROJECT = 'hnqp-common3.0';
		var RULE_URL = '';
		// var EXPLAIN_URL = '';

		/* 定义各项参数 */
		var currentMoney = sessionStorage.currentMoney,
			totalAccountMoney = sessionStorage.totalAccountMoney,
			earnTime = sessionStorage.earnTime,
			openid = sessionStorage.openid,
			args = vge.urlparse(location.href),
			bizcode = args.bizcode,
			// hbopenid = args.openid,
			// again = sessionStorage.again === undefined ? false : sessionStorage.again,
			tx = true,
			first = true,
			STRCODE = sessionStorage.STRCODE === undefined ? '' : sessionStorage.STRCODE;
		init();

		function init() {
			if (bizcode == 11 || sessionStorage.again == 'true') {
				$('.cash .main').css({
					'textAlign': 'center',
					'width': '100%',
					'marginLeft': '0'
				});
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
				// if (first) {
				//     first = false;
				//     // runAnimation();
				//     $('.get').css({
				//         'display': 'block'
				//     });
				// }
				if (Number(currentMoney) == 0) {
					$('.cash .main').css({
						'textAlign': 'center',
						'width': '100%',
						'marginLeft': '0'
					});
					$('.title').text('再喝一瓶试试看');
					$('.main').text('您离红包只差一点点');
					$('.main').css('fontSize', '1.4rem');
				} else {
					$('.cash .main').css({
						'textAlign': 'left',
						'width': '80%',
						'marginLeft': '20%'
					});
					$('.title').text('恭喜您获得');
					$('.main').html('￥' + currentMoney + '<span class="yuan">元</span>');
				}
				$('.get').css({
					'display': 'block'
				});
				// setTimeout(function () {
				//     if (sessionStorage.again == 'true') {
				//         return;
				//     }
				//     $('.get').fadeOut();
				//     $('.cash').fadeIn(function () {
				//         setTimeout(function () {
				//             $('.liantong').css('display', 'block');
				//         }, 1000);
				//     });
				//     sessionStorage.again = 'true';
				// }, 2000);
			}
			if (Number(totalAccountMoney) >= 1) {
				$('.notice').html('温馨提示：您的红包累计金额为' + totalAccountMoney + '元，<br>点击上方按钮把钱拿走吧！');
				$('#btn').val('去提现');
			} else {
				if (bizcode == 11 || sessionStorage.again == 'true' || Number(currentMoney) == 0) {
					$('#btn').val('查看红包余额');
				} else {
					$('#btn').val('存入我的零钱包');
				}
			}
		}

		// 点击拆红包
		$('.open').on('click', function() {
			sessionStorage.again = 'true'
			$('.open').unbind();
			if (STRCODE == 'true') { //从输入串码进入，模拟拆红包
				init();
				$('.get').fadeOut();
				$('.cash').fadeIn(function() {
					setTimeout(function() {
						if(new Date().getTime() > 1556640000000 && new Date().getTime() < 1556985600000){
							$('.active').css('display', 'block');
							$('.active').on('click', function() {
								$('.active').css('display', 'none');
								event.stopPropagation();
							});
						}else{
							$('.liantong').delay(2000).fadeIn(1);	
						}
					}, 1000);
				});
			} else {
				$('#loading').css('display', 'block');
				var req = {
					"openid": openid,
					"sweepstr": sessionStorage.qr,
					"longitude": sessionStorage.longitude === undefined ? '00' : sessionStorage.longitude, //"经度"
					"latitude": sessionStorage.latitude === undefined ? '00' : sessionStorage.latitude //"纬度"
				};
				$.ajax({
					type: "POST",
					url: vge.hnqp + '/DBTHuaNQPInterface/sweep/sweepQrcode',
					data: JSON.stringify(req),
					dataType: 'json',
					async: true,
					success: function(res, status, xhr) {
						$('#loading').css('display', 'none');
						if (res.result.code == '0') {
							var replace = PROJECT;
							switch (res.result.businessCode) {
								case '0': // 普通奖
									currentMoney = res.reply.currentMoney;
									totalAccountMoney = res.reply.totalAccountMoney;
									earnTime = res.reply.earnTime;
									sessionStorage.totalAccountMoney = res.reply.totalAccountMoney;
									sessionStorage.currentMoney = res.reply.currentMoney;
									sessionStorage.earnTime = res.reply.earnTime === undefined ? '' : res.reply.earnTime;
									//新签到
									sessionStorage.weekSignFlag = res.reply.weekSignFlag; //用户是否开启自然周签到，1:开启、0或空:关闭
									sessionStorage.weekSignPopup = res.reply.weekSignPopup; //自然周签到弹出提示，1:弹出提示、0或空:不弹出
									sessionStorage.setItem('signCogAry', JSON.stringify(res.reply.signCogAry));
									//捆绑
									sessionStorage.promotionFlag = res.reply.promotionFlag; //用户是否开启自然周签到，1:开启、0或空:关闭
									sessionStorage.promotionPopup = res.reply.promotionPopup; //自然周签到弹出提示，1:弹出提示、0或空:不弹出
									sessionStorage.setItem('promotionCogAry', JSON.stringify(res.reply.promotionCogAry));
									bizcode = 0;
									sessionStorage.again = 'false';
									init();
									$('.get').fadeOut();
									$('.cash').fadeIn(function() {
										setTimeout(function() {
											if(new Date().getTime() > 1556640000000 && new Date().getTime() < 1556985600000){
												$('.active').css('display', 'block');
												$('.active').on('click', function() {
													$('.active').css('display', 'none');
													event.stopPropagation();
												});
											}else{
												$('.liantong').delay(2000).fadeIn(1);	
											}
										}, 1000);
									});
									break;
								case '7': // 大奖
									sessionStorage.username = res.reply.username === undefined ? '' : res.reply.username;
									sessionStorage.phonenum = res.reply.phonenum === undefined ? '' : res.reply.phonenum;
									sessionStorage.idcard = res.reply.idcard === undefined ? '' : res.reply.idcard;
									sessionStorage.skukey = res.reply.skukey;
									sessionStorage.prizeVcode = res.reply.prizeVcode;
									sessionStorage.grandPrizeType = res.reply.grandPrizeType === undefined ? '' : res.reply.grandPrizeType;
									replace = "hnqp-zunxiang";
									if (res.reply.grandPrizeType == 'p' || res.reply.grandPrizeType == 'P') {
										location.replace('http://' + location.host + '/v/' + replace + '/prize.html?bizcode=' + res.result.businessCode);
									} else if (res.reply.grandPrizeType == 'q' || res.reply.grandPrizeType == 'Q') {//冬奥环球之旅1次				                     
				                        location.replace('http://' + location.host + '/v/' + replace + '/prize.html?bizcode=' + res.result.businessCode);
				                    } else if (res.reply.grandPrizeType == 'r' || res.reply.grandPrizeType == 'R') {//冬奥冰雪冬令营
				                       location.replace('http://' + location.host + '/v/' + replace + '/prize.html?bizcode=' + res.result.businessCode);
				                    } else if (res.reply.grandPrizeType == 's' || res.reply.grandPrizeType == 'S') {//P20手机
				                       location.replace('http://' + location.host + '/v/' + replace + '/prize.html?bizcode=' + res.result.businessCode);
				                    } else if (res.reply.grandPrizeType == 't' || res.reply.grandPrizeType == 'T') {//青啤有一套
				                       location.replace('http://' + location.host + '/v/' + replace + '/prize.html?bizcode=' + res.result.businessCode);
				                    } else {
										title_tip('尊敬的用户', '扫码异常', '我知道了');
									}
									break;
								case '15': //他人重复扫大奖
									sessionStorage.grandPrizeType = res.reply.grandPrizeType === undefined ? '' : res.reply.grandPrizeType;
									sessionStorage.earnTime = res.reply.earnTime === undefined ? '' : res.reply.earnTime; //扫码时间
									location.replace('http://' + location.host + '/v/' + replace + '/prize.html?bizcode=' + res.result.businessCode);
									break;
								case '11': // 自己重复扫，普通奖
									sessionStorage.totalAccountMoney = res.reply.totalAccountMoney;
									sessionStorage.currentMoney = res.reply.currentMoney;
									sessionStorage.codeContentUrl = res.reply.codeContentUrl;
									sessionStorage.earnTime = res.reply.earnTime === undefined ? '' : res.reply.earnTime;
									location.replace('http://' + location.host + '/v/' + replace + '/getcash.html?bizcode=' + res.result.businessCode);
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
								default:
									if (res.reply) {
										sessionStorage.batchName = res.reply.batchName === undefined ? '' : res.reply.batchName;
										sessionStorage.earnTime = res.reply.earnTime === undefined ? '' : res.reply.earnTime;
										sessionStorage.msg = res.result.msg;
									} else {
										sessionStorage.earnTime = '';
									}
									location.replace('http://' + location.host + '/v/' + replace + '/fail.html?bizcode=' + res.result.businessCode);
							}
						} else if (res.result.code == '-1') { //code!='0'
							title_tip('尊敬的用户', '系统升级中...', '我知道了');
						} else {
							title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
						}
					},
					error: function(res, status, xhr) {
						title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
					}
				});
			}

		});
		// 关闭联通流量广告
		$('.liantong-close').on('click', function() {
			$('.liantong').css('display', 'none');
			event.stopPropagation(); //阻止冒泡
		});
		// 查看联通流量
		$('.liantong-btn').on('click', function() {
			window.location.href = 'https://m.10010.com/queen/qingdaobeer/qdbeer.html';
		});

		// 点击提现按钮
		$('#btn').on('click', function() {
			if (Number(totalAccountMoney) >= 1) {
				// if (tx) {
				//     tx = false;
				//     $('#loading').css('display', 'block');
				//     give_spack();
				// }
				window.location.replace('http://' + location.host + '/' + PROJECT + '/too/mybag');
			} else {
				ifremeber();
			}
		});

		//提现成功后判断关注
		$('.mask').on('click', function() {
			ifremeber();
		});
		// 点击活动规则
		$('.rule').on('click', function() {
			if (sessionStorage.activityVersion == '4') {
				//广东灌装（纯生）
				RULE_URL =
					'https://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502816220&idx=1&sn=9192c6b9a355b0425a5a910e84477459&chksm=08729f023f051614047dc3e3774a197bdab727b881f52785a8320f23678aab3c0894c2583c18#rd';
			} else if (sessionStorage.activityVersion == '5') {
				//广东灌装（绿罐）
				RULE_URL =
					'https://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502816217&idx=1&sn=927c28befae193c402e2a2792abc8e85&chksm=08729f073f051611534ab0be13c2403d8e9a73fe7cbf58e267bc7bbd46b889773ffcda032e0a#rd';
			} else {
				//经典
				RULE_URL =
					'https://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502816218&idx=1&sn=5cf1fb2631a150b2b332d24ec3e94842&chksm=08729f043f05161264267b53d29c5d09b9d4ee3e41d9559afdfb3a3d44508f77263cbbded2e6#rd';
			}
			window.location.href = RULE_URL;
		});

		$('.icon_game').on('click', function() {
			location.href = 'http://w.vjifen.com/v/dice/index.html?province=hn_5';
		});

		// function runAnimation() {
		//     // 执行所有动画
		//     $('.curtain').css('display', 'block');
		//     // 两侧窗帘向左右滑动 耗时0.5s
		//     $('.curtain-left').addClass('curtainLeftAnimate');
		//     $('.curtain-right').addClass('curtainRightAnimate');
		//     // 文字向上渐显 耗时1s
		//     $('.textTop,.textBottom').css({
		//         'display': 'block'
		//     });
		//     $('.textTop,.textBottom').addClass('textBoxAnimate');
		//     $('.text-1,.text-2').addClass('textImgAnimate');
		//     // 泡沫向下渐显 耗时0.5s
		//     $('.foamBox1,.foamBox2').css({
		//         'display': 'block'
		//     });
		//     $('.foamBox1,.foamBox2').addClass('textBoxAnimateDown');
		//     $('.text-1-foam,.text-2-foam').addClass('textImgAnimateDown');
		//     // 显示拆红包页面
		//     setTimeout(function () {
		//         // 隐藏curtain页面，显示get页面
		//         $('.textTop,.textBottom,.beer,.curtain-bg,.curtain-logo').fadeOut();
		//         $('.get').fadeIn();
		//         setTimeout(function () {
		//             $('.curtain').css({
		//                 'display': 'none'
		//             });
		//         }, 600);
		//     }, 3000);
		// }

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
						window.location.href = 'http://' + location.host + '/v/' + PROJECT + '/attention.html';
					} else { //已关注用户
						window.location.replace('http://' + location.host + '/' + PROJECT + '/too/mybag');
					}
				} catch (e) {
					vge.clog('errmsg', [requrl, e]);
				}
			}, function(err) {
				vge.clog('errmsg', [requrl, err]);
			});
		}
	}
})()
