(function() {
	'use strict';
	window.onload = function() {
		var SPACK_PORT = vge.jsqp + '/DBTJSQPInterface/gifts/getGiftspack'; //提现接口
		var APPID = vge.jsqpappid;
		var PROJECT = 'jsqp-final2019';
		var RULE_URL = 'https://mp.weixin.qq.com/s?__biz=MzA3ODI1OTQyOQ==&mid=2652777305&idx=2&sn=691dd64eca2fbd82cfbca7e8da81469e&chksm=84affed3b3d877c530f85f36b1ab4260a79f54617126ee79da7b7c1620194ea62b4e3b2002e5&token=1799037996&lang=zh_CN#rd';
		// var EXPLAIN_URL = '';

		// if(sessionStorage.skuType==1){//罐装活动规则【有集福卡】
		// 	RULE_URL='https://mp.weixin.qq.com/s?__biz=MzU5MzczNDk5MQ==&mid=100000002&idx=1&sn=ba70d0cd0e090451578396e114b38cfe&chksm=7e0abd22497d3434de62043e7fd2d766e898873ba9350b7639e334ca07563e925c8cc4151f5a#rd';
		// }

		/* 定义各项参数 */
		var currentMoney = sessionStorage.currentMoney,
			totalAccountMoney = sessionStorage.totalAccountMoney,
			earnTime = sessionStorage.earnTime,
			openid = sessionStorage.openid, 
			args = vge.urlparse(location.href),
			bizcode = args.bizcode,
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
			// 集卡活动icon
			// if(sessionStorage.skuType==1){
			// 	$('.enterCard').fadeIn(function(){
			// 		$('.enterCard').on('click',function(){
			// 			location.href = 'http://'+location.host+'/jsqp-final2019/txo/collectCard';
			// 		});
			// 	});
			// }
		} else {
			$('.get').css('display', 'block');
			// 集卡活动宣传toast
			// if(sessionStorage.skuType==1){
			// 	$('.active_insert').css('display','flex');
			// 	$('.active_insert_close').on('click',function(){
			// 		$('.active_insert').css('display','none');
			// 	});
			// }
			if (Number(currentMoney) == 0) {
				$('.title').text('再喝一瓶试试看');
				$('.main').text('您离红包只差一点点');
				$('.main').css('fontSize', '1.4rem');
			} else {
				$('.title').text('恭喜您获得');
				$('.main').html('￥' + currentMoney + '<span class="yuan">元</span>');
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
				// setTimeout(() => {
				// 	$('.liantong').css('display', 'block');
				// }, 1000);

				// 集卡活动icon
				// if(sessionStorage.skuType==1){
				// 	$('.enterCard').fadeIn(function(){
				// 		$('.enterCard').on('click',function(){
				// 			location.href = 'http://'+location.host+'/jsqp-final2019/txo/collectCard';
				// 		});
				// 	});
				// }
				// if(sessionStorage.cardNo!='undefined'){
				// 	switch (sessionStorage.cardNo){//A:奥古特福卡,B:白啤福卡,C:纯生福卡,D:鸿运当头福卡,E:经典1903福卡
				// 		case 'A':
				// 			$('.collectCard').delay(500).fadeIn(100);
				// 			$('.bigbag img').attr('src','img/card/bottle-agt.png');
				// 			$('.collectCard .title').html('恭喜您获得1个奥古特福袋');
				// 			break;
				// 		case 'B':
				// 			$('.collectCard').delay(500).fadeIn(100);
				// 			$('.bigbag img').attr('src','img/card/bottle-bp.png');
				// 			$('.collectCard .title').html('恭喜您获得1个白啤福袋');
				// 			break;
				// 		case 'C':
				// 			$('.collectCard').delay(500).fadeIn(100);
				// 			$('.bigbag img').attr('src','img/card/bottle-cs.png');
				// 			$('.collectCard .title').html('恭喜您获得1个纯生福袋');
				// 			break;
				// 		case 'D':
				// 			$('.collectCard').delay(500).fadeIn(100);
				// 			$('.bigbag img').attr('src','img/card/bottle-hydt.png');
				// 			$('.collectCard .title').html('恭喜您获得1个鸿运当头福袋');
				// 			break;
				// 		case 'E':
				// 			$('.collectCard').delay(500).fadeIn(100);
				// 			$('.bigbag img').attr('src','img/card/bottle-jd.png');
				// 			$('.collectCard .title').html('恭喜您获得1个经典福袋');
				// 			break;				
				// 		default:
				// 			$('.collectCard').css('display','none');
				// 			break;
				// 	}
				// 	$('#iknow').on('click',function(){
				// 		$('.collectCard').css('display','none');
				// 	});
				// }
			});
			sessionStorage.again = 'true'
		});
		// 关闭联通流量广告
		// $('.liantong-close').on('touchstart', function() {
		// 	$('.liantong').css('display', 'none');
		// });
		// 查看联通流量
		// $('.liantong-btn').on('touchstart', function() {
		// 	window.location.href = 'https://m.10010.com/queen/qingdaobeer/qdbeer.html';
		// });

		// 点击提现按钮
		$('#btn').on('touchstart', function() {
			if (Number(totalAccountMoney) >= 1) {
				window.location.replace('http://' + location.host + '/' + PROJECT + '/too/mybag');
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
	}
})()
