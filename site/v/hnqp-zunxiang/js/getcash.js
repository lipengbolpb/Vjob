(function() {
	'use strict';
	window.onload = function() {
		var SPACK_PORT = vge.common + '/vjifenInterface/gifts/getGiftspack'; //提现接口
		var APPID = vge.hnqpappid;
		var PROJECT = 'hnqp-zunxiang';
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
			
		sessionStorage.isHotAreaName='true';
		sessionStorage.activeAlert = 'true';
		product();
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
				if (new Date().getTime() > 1557331200000&&sessionStorage.isHotAreaName=='true'&&new Date().getTime() < new Date(2019,9,11).getTime()) {//5.9
					setTimeout(function(){
						$('.product_box').css('display', 'block');
						$('.productClose').on('click', function() {
							$('.product_box').css('display', 'none');
							event.stopPropagation();
						});
						sessionStorage.isHotAreaName = false;
					},1000);
				} else {
					sessionStorage.isHotAreaName = false;
				}
				
				if(new Date().getTime()>new Date(2020,3,11).getTime()&&new Date().getTime()<new Date(2020,4,5).getTime()&&sessionStorage.activeAlert=='true'){
					setTimeout(function(){
						$('.active').css('display', 'flex');
						$('.activeClose').on('click', function() {
							$('.active').css('display', 'none');
							event.stopPropagation();
						});
						sessionStorage.activeAlert = false;
					},1000);
				} else {
					sessionStorage.activeAlert = false
				}
				
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

		function product() {
			var num = Math.floor(Math.random() * 9);
			$('img.product').attr('src', '/v/hnqp-common3.0/img/active/product_' + num + '.png');
			switch (sessionStorage.skukey) {
				case '241510936-022'://尊享纯生
					RULE_URL = 'https://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502816396&idx=1&sn=fdd79794e3a2cc0a7060d43bed755258&chksm=08729c523f05154401526c1fd3943ceef24a69ccfc6a983795de154b4b3c9cb5e1d125fa5d64#rd';
					$('img.copywriting').attr('src', '/v/hnqp-common3.0/img/active/copywriting_0.png');
					break;
				case '241510936-019'://纯生
					RULE_URL = 'https://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502816220&idx=1&sn=9192c6b9a355b0425a5a910e84477459&chksm=08729f023f051614047dc3e3774a197bdab727b881f52785a8320f23678aab3c0894c2583c18#rd';				
					$('img.copywriting').attr('src', '/v/hnqp-common3.0/img/active/copywriting_1.png');
					break;
				case '201609141-006'://纯生
					RULE_URL = 'https://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502816220&idx=1&sn=9192c6b9a355b0425a5a910e84477459&chksm=08729f023f051614047dc3e3774a197bdab727b881f52785a8320f23678aab3c0894c2583c18#rd';
					$('img.copywriting').attr('src', '/v/hnqp-common3.0/img/active/copywriting_1.png');
					break;
				case '241510936-021'://经典
					RULE_URL = 'https://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502816217&idx=1&sn=927c28befae193c402e2a2792abc8e85&chksm=08729f073f051611534ab0be13c2403d8e9a73fe7cbf58e267bc7bbd46b889773ffcda032e0a#rd';
					$('img.copywriting').attr('src', '/v/hnqp-common3.0/img/active/copywriting_2.png');
					break;			
				case '201609141-014'://经典
					RULE_URL = 'https://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502816217&idx=1&sn=927c28befae193c402e2a2792abc8e85&chksm=08729f073f051611534ab0be13c2403d8e9a73fe7cbf58e267bc7bbd46b889773ffcda032e0a#rd';
					$('img.copywriting').attr('src', '/v/hnqp-common3.0/img/active/copywriting_2.png');
					break;
				case '241510936-020'://绿罐
					RULE_URL = 'https://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502814670&idx=1&sn=1fde05a10e3df639bc2b6b284d173a75&chksm=087295103f051c064f603736c342e60aa539089478985e052a3145d1212c9391df67391d2064#rd';
					$('img.copywriting').attr('src', '/v/hnqp-common3.0/img/active/copywriting_3.png');
					break;
				case '201609141-012'://绿罐
					RULE_URL = 'https://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502814670&idx=1&sn=1fde05a10e3df639bc2b6b284d173a75&chksm=087295103f051c064f603736c342e60aa539089478985e052a3145d1212c9391df67391d2064#rd';
					$('img.copywriting').attr('src', '/v/hnqp-common3.0/img/active/copywriting_3.png');
					break;		
				default:
					sessionStorage.isHotAreaName = false;
					$('img.copywriting').attr('src', '/v/hnqp-common3.0/img/active/copywriting_2.png');
					RULE_URL = 'https://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502816217&idx=1&sn=927c28befae193c402e2a2792abc8e85&chksm=08729f073f051611534ab0be13c2403d8e9a73fe7cbf58e267bc7bbd46b889773ffcda032e0a#rd';
					break;
			}

		}
		// 冰墩墩活动弹窗
		setTimeout(function() {
			bingdundun();
		}, 400);
		// 点击拆红包
		$('.open').on('click', function() {
			if(sessionStorage.isHotAreaName=='true'||sessionStorage.activeAlert=='true'){
				return false;
			}
			$('.open').unbind();
			if (STRCODE == 'true') { //从输入串码进入，模拟拆红包
				init();
				$('.get').fadeOut();
				$('.cash').fadeIn(function() {
					if(new Date().getTime() < 1557331200000){
						$('.liantong').delay(3000).fadeIn(1);		
					}
				});
			} else {
				$('#loading').css('display', 'block');
				var req = { "projectServerName": "huanan",
					"openid": openid,
					"sweepstr": sessionStorage.qr,
					"longitude": sessionStorage.longitude === undefined ? '00' : sessionStorage.longitude, //"经度"
					"latitude": sessionStorage.latitude === undefined ? '00' : sessionStorage.latitude //"纬度"
				};
				$.ajax({
					type: "POST",
					url: vge.common + '/vjifenInterface/sweep/sweepQrcode',
					data: JSON.stringify(req),
					dataType: 'json',
					async: true,
					success: function(res, status, xhr) {
						$('#loading').css('display', 'none');
						vge.clog('hnqp-zunxiang', [JSON.stringify(res)]);
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
										if(new Date().getTime() < 1557331200000){
											$('.liantong').delay(3000).fadeIn(1);		
										}
										if (res.reply.weekSignFlag == '1') {
											initSign();										
											$('#btn-to-home').addClass('has-sign');
										}
										if (isTargetDate2() && bizcode != 11 && sessionStorage.again != 'true') {
											setTimeout(function () {
												specialDialog('./img/dialog-3-2-hou.png?v=0.01');
											}, 500);
										}
									});
									break;
								case '7': // 大奖
									sessionStorage.username = res.reply.username === undefined ? '' : res.reply.username;
									sessionStorage.phonenum = res.reply.phonenum === undefined ? '' : res.reply.phonenum;
									sessionStorage.idcard = res.reply.idcard === undefined ? '' : res.reply.idcard;
									sessionStorage.skukey = res.reply.skukey;
									sessionStorage.prizeVcode = res.reply.prizeVcode;
									sessionStorage.grandPrizeType = res.reply.grandPrizeType === undefined ? '' : res.reply.grandPrizeType;
									if (res.reply.grandPrizeType == 'p' || res.reply.grandPrizeType == 'P') {
										location.replace('http://' + location.host + '/v/' + replace + '/prize.html?bizcode=' + res.result.businessCode);
									} else if (res.reply.grandPrizeType == 'q' || res.reply.grandPrizeType == 'Q') {
										location.replace('http://' + location.host + '/v/' + replace + '/prize.html?bizcode=' + res.result.businessCode);
									} else if (res.reply.grandPrizeType == 'r' || res.reply.grandPrizeType == 'R') {
										location.replace('http://' + location.host + '/v/' + replace + '/prize.html?bizcode=' + res.result.businessCode);
									} else if (res.reply.grandPrizeType == 's' || res.reply.grandPrizeType == 'S') {
										location.replace('http://' + location.host + '/v/' + replace + '/prize.html?bizcode=' + res.result.businessCode);
									} else if (res.reply.grandPrizeType == 't' || res.reply.grandPrizeType == 'T') {
										location.replace('http://' + location.host + '/v/' + replace + '/prize.html?bizcode=' + res.result.businessCode);
									} else if (res.reply.grandPrizeType == 'u' || res.reply.grandPrizeType == 'U') {
										location.replace('http://' + location.host + '/v/' + replace + '/prize.html?bizcode=' + res.result.businessCode);
									} else if (res.reply.grandPrizeType == 'v' || res.reply.grandPrizeType == 'V') {//p30
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
			sessionStorage.again = 'true'
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
			// if (sessionStorage.activityVersion == '4') {
			// 	//广东灌装（纯生）
			// 	RULE_URL =
			// 		'https://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502816220&idx=1&sn=9192c6b9a355b0425a5a910e84477459&chksm=08729f023f051614047dc3e3774a197bdab727b881f52785a8320f23678aab3c0894c2583c18#rd';
			// } else if (sessionStorage.activityVersion == '5') {
			// 	//广东灌装（绿罐）
			// 	RULE_URL =
			// 		'https://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502816217&idx=1&sn=927c28befae193c402e2a2792abc8e85&chksm=08729f073f051611534ab0be13c2403d8e9a73fe7cbf58e267bc7bbd46b889773ffcda032e0a#rd';
			// } else {
			// 	//经典
			// 	RULE_URL =
			// 		'https://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502816396&idx=1&sn=fdd79794e3a2cc0a7060d43bed755258&chksm=08729c523f05154401526c1fd3943ceef24a69ccfc6a983795de154b4b3c9cb5e1d125fa5d64#rd';
			// }
			window.location.href = RULE_URL;
		});

		$('.icon_game').on('click', function() {
			location.href = 'http://w.vjifen.com/v/dice/index.html';
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
			var req = { "projectServerName": "huanan",
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

		// 冰墩墩活动弹窗
		function bingdundun() {
			try {
				if (bizcode == 11) return
				var endTime = new Date('2020-02-01').setHours(0, 0, 0);
				var curTime = new Date().getTime();
				if (curTime < endTime) {
					$('#bingdd-dialog').css('display', 'block');
					$('#bingdd-dialog').click(function () {						
						$('#bingdd-dialog').css('display', 'none');
					});
				}
			} catch (e) {
				console.log('冰墩墩活动弹窗错误' + e);

			}
		}
		
		if (isTargetDate() && bizcode != 11 && sessionStorage.again != 'true') {
			setTimeout(function () {
				specialDialog('./img/dialog-2-11.png');
			}, 200);
		}
		if (isTargetDate2() && bizcode != 11 && sessionStorage.again != 'true') {
			setTimeout(function () {
				specialDialog('./img/dialog-3-2-qian.png?v=0.01');
			}, 200);
		}

		// 送酒上门按钮 
		addNewBtn();

		function addNewBtn() {
			if (bizcode == 11 || sessionStorage.again == 'true') {
				$('#btn-to-home').css('display', 'none');
				console.log($('#btn-to-home'));
			}
			$('#btn-to-home').click(function () {
				try {
					setTimeout(function () {
						window.location.href = 'https://a.scene.divh5.net/ls/2Pj5EJw5';
					}, 10);
					_hmt.push(['_trackEvent', 'click', '领取红包页', '点击送酒上门按钮-华南']);
				} catch (e) {

				}
			})
		}



		///测试周签到
		// setTimeout(function () {
		// 	init();
		// 	$('.get').fadeOut();
		// 	$('#specialDialog').fadeOut();
		// 	$('.cash').fadeIn(function () {
		// 		if (new Date().getTime() < 1557331200000) {
		// 			$('.liantong').delay(3000).fadeIn(1);
		// 		}
		// 		initSign();
		// 		$('#btn-to-home').addClass('has-sign');
		// 		specialDialog('./img/dialog-3-2-hou.png?v=0.01');
		// 	});
		// 	console.log(1233333333333333);

		// }, 1000)

		
	}

	// 2月11-2月28日 添加广告页
	function specialDialog(dialogImg) { //
		if ($('#btn2020Close').length) {
			$('#specialDialog').show();
			$('#specialDialog .dialog-img').attr('src', dialogImg)
		} else {
			var dialogStr = `<div id="specialDialog"
           style="width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.6);position: absolute;top: 0;left: 0;z-index: 99;display: flex;justify-content: center;align-items: center;">
           <div style="height: 23.5rem;width: 12.366738rem;margin-top: 20px;position: relative;">
             <img class="dialog-img" src="${dialogImg}" alt="" style = "width: 12.324094rem; height: 19.7925rem; position: relative; z-index: 2;" >
             <div id="btn2020Close" style="width: 3.876333rem; height: 3rem; background: url('./img/dialog-close.png') no-repeat center; background-size: 1.876333rem 1.876333rem; position: absolute; bottom: 0; left: 50%; transform: translateX(-1.938166rem);">
             </div>
           </div>`;

			$('body').append(dialogStr);
			$('#btn2020Close').click(function () {
				$('#specialDialog').hide();
			})
		}
	}

	function isTargetDate() {
		var now = new Date();
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var date = now.getDate();
		if (year === 2020 && month === 2 && date >= 11 & date <=28) {
			return true
		} else {
			return false
		}
	}
	//3月2-3月22日 阶梯和签到
	function isTargetDate2() {
		var now = new Date();
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var date = now.getDate();
		if (year === 2020 && month === 3 && date >= 2 & date <=22) {
			return true
		} else {
			return false
		}
	}
})()
