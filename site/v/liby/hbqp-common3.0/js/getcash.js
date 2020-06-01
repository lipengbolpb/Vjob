(function() {
	'use strict';
	var SPACK_PORT = vge.hbqp + '/DBTHBQPInterface/gifts/getGiftspack'; //提现接口
	var APPID = vge.hbqpappid;
	var PROJECT = 'hbqp-common3.0';
	var RULE_URL =
		'https://mp.weixin.qq.com/s/RYpbw3y5ThTtWDLPUVOCNA';
	// var EXPLAIN_URL = '';

	sessionStorage.isAdAlert = true;
	/* 定义各项参数 */
	var currentMoney = sessionStorage.currentMoney,
		totalAccountMoney = sessionStorage.totalAccountMoney,
		earnTime = sessionStorage.earnTime,
		openid = sessionStorage.openid,
		args = vge.urlparse(location.href),
		bizcode = args.bizcode,
		hbopenid = args.openid,
		again = sessionStorage.again === undefined ? false : sessionStorage.again,
		tx = true;
	
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
		sessionStorage.isAdAlert = false;
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
		if(new Date().getTime()>new Date(2019,5,12).getTime()&&new Date().getTime()<new Date(2019,5,26).getTime()&&sessionStorage.dayScanNum<2){//6.12-6.25 每天一次
			setTimeout(function(){
				$('.active').css('display','block');
				setTimeout(function(){
					$('.active').css('display','none');
				},15000);
				sessionStorage.isAdAlert = false;
			},800);
		}else if(sessionStorage.skukey=='201609141-018'){
			setTimeout(function(){
				$('.active').css('display','block');
				setTimeout(function(){
					$('.active').css('display','none');
				},15000);
				sessionStorage.isAdAlert = false;
			},800);
		}else{
			sessionStorage.isAdAlert = false;
		}
		$('.active').on('click',function(e){//任意时间可关闭弹窗
			e.stopPropagation();
			$('.active').css('display','none');
		})
	}
	if (Number(totalAccountMoney) >= 1) {
		$('.notice').html('温馨提示：您的红包累计金额为' + totalAccountMoney + '元<br>点击上方按钮把钱拿走吧！');
		$('#btn').val('去提现');
	} else {
		if (bizcode == 11 || again == 'true' || Number(currentMoney) == 0) {
			$('#btn').val('查看红包余额');
		} else {
			$('#btn').val('存入我的零钱包');
		}
	}

	// 自动拆红包
	// setTimeout(function () {
	//     if (sessionStorage.again == 'true' || bizcode == 11) {
	//         return;
	//     } else {
	//         sessionStorage.again = 'true';
	//         $('.get').fadeOut();
	//         $('.cash').fadeIn(function () {
	//             setTimeout(() => {
	//                 $('.liantong').css('display', 'block');
	//             }, 3000);
	//         });
	//     }
	// }, 2000);
	// 3.0点击拆红包
	// $('.get,.open').on('touchstart', function() {
	// 	sessionStorage.again = 'true';
	// 	$('.get .open').addClass('rotate');
	// 	$('.get').delay(1000).fadeOut();
	// 	$('.cash').delay(1000).fadeIn(function() {
	// 		setTimeout(() => {
	// 			// $('.liantong').css('display', 'block');
	// 		}, 3000);
	// 	});
	// });
	// 2.0点击拆红包
	$('.open').on('click', function() {
		if (sessionStorage.isAdAlert == 'true') {
			return false;
		}
		$('.open').addClass('rotate');
		sessionStorage.again = 'true';
		setTimeout(function() {
			$('.get').fadeOut(600);
			$('.cash').fadeIn(600);
		}, 1000);
	});
	// $('.doubleRule').on('click',function(e){
	// 	e.stopPropagation();
	// 	$('.double_rule_box').fadeIn(1);
	// })
	// 关闭联通流量广告
	$('.liantong-close').on('click', function() {
		$('.liantong').css('display', 'none');
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
					window.location.replace('http://' + location.host + '/v/' + PROJECT + '/attention.html');
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
})()
