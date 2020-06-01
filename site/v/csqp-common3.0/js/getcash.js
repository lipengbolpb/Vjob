(function() {
	'use strict';
	window.onload = function() {
		var SPACK_PORT = vge.csqp + '/DBTHuNanQPInterface/gifts/getGiftspack'; //提现接口
		var APPID = vge.csqpappid;
		// 规则
		var RULE_URL = 'https://mp.weixin.qq.com/s?__biz=MzA4MzMxMDgyNA==&mid=300055798&idx=1&sn=079af18b76443bfcedcbf2df8d5c5807&chksm=0beebd713c9934670d912788374003a71237c5969559122cf62841a2d179247b66a35be59215#rd';
		// var EXPLAIN_URL = '';

		/* 定义各项参数 */
		var currentMoney = sessionStorage.currentMoney,
			totalAccountMoney = sessionStorage.totalAccountMoney,
			earnTime = sessionStorage.earnTime,
			openid = sessionStorage.openid,//安徽 
			args = vge.urlparse(location.href),
			bizcode = args.bizcode,
			again = sessionStorage.again === undefined ? false : sessionStorage.again,
			tx = true;
			
			// spuDayScanNum   用户当天SPU扫码次数 
			var spuDayScanNum = sessionStorage.spuDayScanNum == undefined ? '' : sessionStorage.spuDayScanNum;
			// 用户当天所有活动扫码次数
			var scanLadderFlag = sessionStorage.scanLadderFlag == undefined ? '' : sessionStorage.scanLadderFlag;

			// 判断 经典19 活动
			var skukey = sessionStorage.skukey == undefined ? '' : sessionStorage.skukey;

			// // 用户当前活动当天扫码次数
			// var dayScanNum = sessionStorage.dayScanNum == undefined ? '3' : sessionStorage.dayScanNum;
			// // 用户当前活动累计扫码次数
			// var userActivityDayScanNum = sessionStorage.userActivityDayScanNum == undefined ? '' : sessionStorage.userActivityDayScanNum;

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
				// scanLadderFlag = 0; //默认关闭
				if (scanLadderFlag == '1') {
					switch (spuDayScanNum) {
						case '1':
							$('#ladder').html('恭喜您获得“国庆高升”红包<br/>下一罐金额会更高');
							break;
						case '2':
							$('#ladder').html('恭喜您获得“佳节高升”红包<br/>下一罐金额会更高');
							break;
						case '3':
							$('#ladder').html('恭喜您获得“欢庆高升”红包<br/>下一罐金额会更高');
							break;
						case '4':
							$('#ladder').html('恭喜您获得“周年高升”红包<br/>下一罐金额会更高');
							break;
						case '5':
							$('#ladder').html('恭喜您获得“祝福高升”红包');
							break;
						default:
							$('#ladder').html('');
							break;
					}
				} else {
					$('#ladder').text('');
				}
			}
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
			$('.get').fadeOut();
			$('.cash').fadeIn(function() {
				setTimeout(() => {
					$('.liantong').css('display', 'block');
				}, 5000);
				// 中秋宣传
				if (new Date().getTime() > new Date(2019,8,8).getTime() && new Date().getTime() < new Date(2019,8,16).getTime() && skukey == '241510936-006' ) { //9.9-9.15中秋宣传【仅经典19活动展示】
					setTimeout(function() {	
						$('.midAutomActive').css('display', 'block');
						$('.midAutomActive .activeClose').on('click', function(event) {
							event.stopPropagation();
							$('.midAutomActive').css('display', 'none');	
						});
					}, 3000);	
				} 
				// 国庆节宣传  9.27~10.6  9月27日凌晨上线 10月6日晚24点下线
				if (new Date().getTime() > new Date(2019,8,26).getTime() && new Date().getTime() < new Date(2019,9,7).getTime() && skukey == '241510936-006' ) { 
					console.log('nationalDayaaaa')
					setTimeout(function() {	
						$('.nationalDay').css('display', 'block');
						$('.nationalDay .activeClose').on('click', function(event) {
							event.stopPropagation();
							$('.nationalDay').css('display', 'none');	
						});
					}, 3000);	
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
				window.location.replace('http://' + location.host + '/csqp-common3.0/too/mybag');
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
						window.location.replace('http://' + location.host + '/v/csqp-common3.0/attention.html');
					} else { //已关注用户
						window.location.replace('http://' + location.host + '/csqp-common3.0/too/mybag');
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
