(function() {
	'use strict';
	window.onload = function() {
		var SPACK_PORT = vge.common + '/vjifenInterface/gifts/getGiftspack'; //提现接口
		var APPID = vge.hkqpappid;
		var PROJECT = 'hkqp-common3.0';
		var RULE_URL =
			'https://mp.weixin.qq.com/s?__biz=MzU0MTU3MTYzOA==&mid=100000485&idx=1&sn=39b8cd6bafcd44c5edb282e2cacbf709&chksm=7b26adbc4c5124aaca6be59aa50c1969c49cd4f32fab9c6909d04d814fab5f02e9f1bd57d049#rd';
		// var EXPLAIN_URL = '';
		var skuList = ['241510936-001','241510936-002','241510936-003','241510936-004','241510936-005','241510936-006','241510936-007'];
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
		sessionStorage.isHotAreaName=='true'
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
				if((sessionStorage.skukey=='241510936-002'||sessionStorage.skukey=='241510936-005')&&sessionStorage.isHotAreaName=='true'){
					if(new Date().getTime()>1556553600000&&new Date().getTime()<1556985600000){
						$('.active .activeImg').attr('src', '/v/hkqp/img/20190428.png');
						$('.active .activeClose').attr('src', '/v/hkqp/img/close_black.png');
						setTimeout(function() { //拆红包之前弹广告
							$('.active').css('display', 'block');
							$('.active .activeClose').on('click', function(e) {
								e.stopPropagation();
								$('.active').css('display', 'none');
							});
							sessionStorage.isHotAreaName = false;
						}, 1000);
					}else{
						sessionStorage.isHotAreaName = false;
					}
				}else{
					if((sessionStorage.hotAreaName == '三亚大区'||sessionStorage.hotAreaName == '三亚大区捆绑升级')&&skuList.indexOf(sessionStorage.skukey)!=-1&&sessionStorage.isHotAreaName=='true'){
						if ((sessionStorage.skukey == '241510936-001' || sessionStorage.skukey == '241510936-007' || sessionStorage.skukey == '241510936-004')&&sessionStorage.hotAreaName == '三亚大区捆绑升级') {
							$('.active .activeImg').attr('src', '/v/hkqp/img/20190428_sykb.png');
							$('.active .activeClose').attr('src', '/v/hkqp/img/close_black.png');
						} else if ((sessionStorage.skukey == '241510936-006' || sessionStorage.skukey == '241510936-003')&&sessionStorage.hotAreaName == '三亚大区') {
							$('.active .activeImg').attr('src', '/v/hkqp/img/20190428_sy.png');
						}
						if (new Date().getTime()>1556553600000&&new Date().getTime()<1557849600000) {
							setTimeout(function() { //拆红包之前弹广告
								$('.active').css('display', 'block');
								$('.active .activeClose').on('click', function(e) {
									e.stopPropagation();
									$('.active').css('display', 'none');
								});
								sessionStorage.isHotAreaName = false;
							}, 1000);
						} else{
							sessionStorage.isHotAreaName = false;
						}
						
					}else{
						sessionStorage.isHotAreaName = false;
					}
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

		// 点击拆红包
		$('.open').on('click', function() {
			if(sessionStorage.isHotAreaName=='true'){
				return false;
			}
			if (sessionStorage.isPopAd == 'true') {
				console.log('openhb', sessionStorage.isPopAd);
				return false;  //广告之前禁止开红包
			}
			$('.open').unbind();
			if (STRCODE == 'true') { //从输入串码进入，模拟拆红包
				init();
				$('.get').fadeOut();
				$('.cash').fadeIn(function() {
					sessionStorage.again = 'true'
					if(new Date().getTime()>1557849600000||new Date().getTime()<1556553600000){
						setTimeout(function() {
							$('.liantong').css('display', 'block');
						}, 3000);
					}
				});
			} else {
				sessionStorage.again = 'true'
				$('#loading').css('display', 'block');
				var req = {
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
						$('#loading').css('display', 'none');
						// alert(res.result.code);
						// alert(res.result.businessCode);
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
									sessionStorage.taoEasterEgg = res.reply.taoEasterEgg || '';
									sessionStorage.taoMemberOrderFlag = res.reply.taoMemberOrderFlag;
									sessionStorage.dayScanNum = res.reply.dayScanNum;
									init();
									$('.get').fadeOut();
									$('.cash').fadeIn(function() {
										initClipboard && initClipboard();
										if(new Date().getTime()>1557849600000||new Date().getTime()<1556553600000){
											setTimeout(function() {
												$('.liantong').css('display', 'block');
											}, 3000);
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

									sessionStorage.taoEasterEgg = res.reply.taoEasterEgg || '';
									sessionStorage.taoMemberOrderFlag = res.reply.taoMemberOrderFlag;
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
						// alert('调取接口失败',res);
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
			// if (sessionStorage.activityVersion == '4') {
			//     //广东灌装（纯生）
			//     RULE_URL = 'https://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502816220&idx=1&sn=9192c6b9a355b0425a5a910e84477459&chksm=08729f023f051614047dc3e3774a197bdab727b881f52785a8320f23678aab3c0894c2583c18#rd';
			// } else if (sessionStorage.activityVersion == '5') {
			//     //广东灌装（绿罐）
			//     RULE_URL = 'https://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502816217&idx=1&sn=927c28befae193c402e2a2792abc8e85&chksm=08729f073f051611534ab0be13c2403d8e9a73fe7cbf58e267bc7bbd46b889773ffcda032e0a#rd';
			// }else{
			//     //经典
			//     RULE_URL = 'https://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502816218&idx=1&sn=5cf1fb2631a150b2b332d24ec3e94842&chksm=08729f043f05161264267b53d29c5d09b9d4ee3e41d9559afdfb3a3d44508f77263cbbded2e6#rd';
			// }
			window.location.href = RULE_URL;
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
				"hbopenid": hbopenid,
				"projectServerName":"hainan",
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

		// 送酒上门按钮
		addNewBtn();

		function addNewBtn() {
			// if (bizcode == 11 || again == 'true') {
			// 	$('#btn-to-home').css('display', 'none');
			// 	console.log($('#btn-to-home'));
			// }
			$('#btn-to-home').click(function () {
				setTimeout(function () {
					window.location.href = 'https://smp.tsingtao.com.cn/yhb2/';
				}, 10);
				_hmt.push(['_trackEvent', 'click', '领取红包页', '点击送酒上门按钮-海南']);
			})
		}


		/***********618彩蛋***********/
		if (bizcode == 11 || sessionStorage.again == 'true') {
			initClipboard && initClipboard();
		} else if (isInTimeRange && isInTimeRange()) {

			specialDialog && specialDialog('/v/scqp-common3.0/img/618/dialog-2020-618.png');
		}

		function initClipboard() {
			var taoEasterEgg = sessionStorage.taoEasterEgg;
			var taoFlag = sessionStorage.taoMemberOrderFlag;
			if (!taoEasterEgg) {
				return
			}

			var htmlStr = '';
			setTimeout(function () {
				$('.taocd618').fadeIn();
			}, 1000);
			if ($('.taocd618').length) {
				$('.taocd618').fadeIn();
			} else {
				var caidan = '<div class="taocd618" style="width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.8);position: absolute;top: 0;left: 0;z-index: 99;display:none;"><div style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;"><div class="cdbox618" style="height: 12.5rem;position: relative;margin-top:-1.6rem;"><input type="text" id="tkl618" value="easterEggFlag" readonly style="position:absolute; top:2rem;left:1rem; z-index:-1;opacity:0;"/><img src="/v/scqp-common3.0/img/618/i2020618-caidan.png" class="caidan618"   style="width: 13.44rem; height: auto;"><img class="close_cd618" src="/v/scqp-common3.0/img/618/dialog-2020-close.png" style="height: 1.24rem;width:1.24rem;position:absolute; top:0rem;right:0.8rem;"><img class="copy_cd618 copy-caidan" src="/v/scqp-common3.0/img/618/i2020618-btn.png" style="height: 1.62rem;width:7.04rem;position:absolute; top:8.5rem;left:50%;margin-left: -3.77rem;" data-clipboard-action="copy" data-clipboard-target="#tkl618"></div></div></div>';


				var ruhui = '<div class="taocd618" style="width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.8);position: absolute;top: 0;left: 0;z-index: 99;display:none;"><div style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;"><div class="cdbox618" style="height: 12.5rem;position: relative;margin-top:-1.6rem;"><input type="text" id="tkl618" value="easterEggFlag" readonly style="position:absolute; top:2rem;left:1rem; z-index:-1;opacity:0;"/><img src="/v/scqp-common3.0/img/618/i2020618-kouling.png" class="caidan618"   style="width: 14rem; height: auto;"><img class="close_cd618" src="/v/scqp-common3.0/img/618/dialog-2020-close.png" style="height: 1.24rem;width:1.24rem;position:absolute; top:0.24rem;right:1rem;"><img class="copy_cd618 copy-caidan" src="/v/scqp-common3.0/img/618/i2020618-btn.png" style="height: 1.62rem;width:7.04rem;position:absolute; top:8.6rem;left:50%;margin-left: -3.77rem;" data-clipboard-action="copy" data-clipboard-target="#tkl618"></div></div></div>';

				if (taoFlag == 1) {
					htmlStr = ruhui;
					console.log('入会');

				} else {
					htmlStr = caidan;
					console.log('彩蛋');
				}
				htmlStr = htmlStr.replace('easterEggFlag', taoEasterEgg);

				$('body').append(htmlStr);
				setTimeout(function () {
					$('.taocd618').fadeIn();
					$('.close_cd618').on('click', function () {
						$('.taocd618').fadeOut();
					});

					$('.copy_cd618').click(function () {
						console.log('caidan click');
						var clipboard = new ClipboardJS('.copy_cd618');
						clipboard.on('success', function (e) {
							console.log(e);
							$('.taocd618').fadeOut();
							setTimeout(function () {
								toast('复制口令成功')
							}, 100);
						});
						clipboard.on('error', function (e) {
							console.log(e);
						});
					});
				}, 1000);


			}


		}

		function specialDialog(dialogImg, id) { //
			var dayScanNum = sessionStorage.dayScanNum;
			if (Number(dayScanNum) !== Number(dayScanNum) || dayScanNum > 2) {
				return
			}
			sessionStorage.isPopAd = true;
			var specialIdName = 'spexx' + (id || 'xts');
			var specialId = '#' + specialIdName;
			if ($('#btn2020Close').length) {
				$(specialId).fadeIn();
				$(specialId + ' .dialog-img').attr('src', dialogImg)
			} else {
				var dialogStr = '<div id="' + specialIdName + '" style="width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.8);position: absolute;top: 0;left: 0;z-index: 99;display: none;"><div style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;"><div style="width: 75%;"><img class="dialog-img" src="' + dialogImg + '" alt="" style="width: 100%; height: auto; position: relative; z-index: 2;"><div id="btn2020Close" style="width: 2rem; height: 2rem; background:url(/v/scqp-common3.0/img/618/dialog-2020-close.png) no-repeat center top; background-size: 1.24rem 1.24rem;margin: 0.1rem auto 0;"></div></div></div></div>'


				$('body').append(dialogStr);
				setTimeout(function () {
					$(specialId).fadeIn();
					sessionStorage.isPopAd = false;
					$('#btn2020Close').click(function () {

						$(specialId).fadeOut();
					})
				}, 500);
			}
		}
		// 判断是否在5月25至6月20日之间
		function isInTimeRange() {
			var startTime = new Date(2020, 4, 25).setHours(0, 0, 0);
			var endTime = new Date(2020, 5, 20).setHours(23, 59, 59);
			var curTime = new Date().getTime();

			if (curTime > startTime && curTime < endTime) {
				console.log(true);
				return true
			} else {
				console.log(false);
				return false
			}
			console.log(curTime, new Date(startTime), new Date(endTime));

		}

		function toast(txt) {
			$('#toast .weui_toast_content').html(txt);
			$('#toast').show();
			setTimeout(function () {
				$('#toast').hide();
			}, 2000);
		}
    /***********618彩蛋***********/
	}
})()
