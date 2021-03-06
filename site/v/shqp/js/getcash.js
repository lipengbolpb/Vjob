(function() {
	'use strict';
	window.onload = function() {
		var SPACK_PORT = vge.common + '/vjifenInterface/gifts/getGiftspack'; //提现接口
		var APPID = vge.shqpappid;
		// 瓶规则
		var RULE_URL = 'https://mp.weixin.qq.com/s?__biz=MzA3MzEyODkyMw==&mid=502053621&idx=1&sn=a5f089d327570c991049c5089d3f5aee&chksm=070bd441307c5d57acb5a74ca72f3f6063c58f4f212c172c046be882e872e73837ec3c672e50#rd';
		
		// var EXPLAIN_URL = '';

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
		
		// 用户当前活动当天扫码次数
		var dayScanNum = sessionStorage.dayScanNum == undefined ? '' : sessionStorage.dayScanNum;
		var taoEasterEgg = sessionStorage.taoEasterEgg ==  undefined ? '' : sessionStorage.taoEasterEgg;  //返回的淘口令
        var taoMemberOrderFlag = sessionStorage.taoMemberOrderFlag  ==  undefined ? '' : sessionStorage.taoMemberOrderFlag; //入会 or 淘彩蛋 弹框
		sessionStorage.isPopAd = 'true'; //弹广告页之前禁止拆红包
		
        // 淘彩蛋广告页面  5.25~6.20  每天3次 拆红包的之前
		if( bizcode != 11 && new Date().getTime()>=new Date(2020,4,25).getTime() && new Date().getTime()<new Date(2020,5,21).getTime() && Number(dayScanNum)<4 && sessionStorage.isPopAd =='true'){  //前3次展示
			setTimeout(function(){
				$('.ad0618').css('display', 'block');
				$('.ad0618 .close').on('click',function(e){
					e.stopPropagation();
					$('.ad0618').css('display','none');
				})
				sessionStorage.isPopAd = 'false';
			},500);
		}else{
			sessionStorage.isPopAd = 'false';
		}

		// 展示淘口令
		function showtkl(){
			if(taoEasterEgg && taoEasterEgg != 'undefined' && taoEasterEgg != '' && taoEasterEgg != 'null'){ // if有618口令
				$('#tkl618').val(taoEasterEgg); // 赋值淘口令
				if(taoMemberOrderFlag == '1'){ // 1入会口令  0否
					$('.caidan618').attr("src","/v/nmqp/img/20200618/618Toast.png");
				}
				$('.taocd618').css('display', 'block');
				
				// setTimeout(function(){
				// 	$('.taocd618').css('display', 'block');
				// },1000);
				$('.close_cd618').on('click',function(){
					$('.taocd618').css('display', 'none');
				})
				$('.copy_cd618').on('click',function(){
					var clipboard = new ClipboardJS('.copy_cd618');
					clipboard.on('success', function(e) {
						console.log(e);
						$('.taocd618').css('display', 'none');
						setTimeout(function() {
							toast('复制口令成功')
						},100);
					});
					clipboard.on('error', function(e) {
						console.log(e);
					});
				});
			}
		}
		
		function toast(txt) {
			$('#toast .weui_toast_content').html(txt);
			$('#toast').show();
			setTimeout(function () {
				$('#toast').hide();
			}, 2000);
		}

		if (bizcode == 11 || again == 'true') {
			// 国庆节大额红包
			if(Number(currentMoney) == 8.88 || Number(currentMoney) == 18.88 || Number(currentMoney) == 88.88 || Number(currentMoney) == 188.88){
				$('.time,.bigCash').css('display', 'block');
				$('.logo').attr('src','/v/shqp/img/bigCash/brand.png');
			}else{
				$('.time,.cash').css('display', 'block');
			}

			$('.title').text('您已扫过');
			$('p.main').text('每瓶仅限扫码一次');
			$('p.main').css('fontSize', '1.4rem');
			if (sessionStorage.earnTime == '' || sessionStorage.earnTime == undefined) {
				$('.time').html('您已扫过这瓶酒<br>并获得了￥' + currentMoney + '元')	
			} else {
				$('.time').html('您已于' + earnTime + '扫过这瓶酒<br>并获得了￥' + currentMoney + '元')
			}

			setTimeout(() => {
				showtkl(); // 展示淘口令
			},1000)

		} else {
			// runAnimation();
			$('.get').css('display', 'block');
			if (Number(currentMoney) == 0) {
				// $('.title').text('再喝一瓶试试看');
				// $('p.main').text('您离红包只差一点点');

				$('.title').text('您不在活动区域');
				$('p.main').text('本活动区域仅限：上海市，昆山市，太仓市');
				$('p.main').css('fontSize', '1.4rem');
			} else if (Number(currentMoney) == 8.88 || Number(currentMoney) == 18.88 || Number(currentMoney) == 88.88 || Number(currentMoney) == 188.88){  // 国庆节大额红包
				$('.bigCash').css('display', 'block');
				$('.logo').attr('src','/v/shqp/img/bigCash/brand.png');
				$('.title').text('恭喜您获得大额红包');
				$('p.main').html('￥' + currentMoney + '<span class="yuan">元</span>');
			} else {
				$('.cash').css('display', 'block');
				$('.title').text('恭喜您本次扫码获得');
				$('p.main').html('￥' + currentMoney + '<span class="yuan">元</span>');
			}
		}
		$('.totalMoney').text('您的账户余额' + totalAccountMoney + '元');
		if (Number(totalAccountMoney) >= 1) {
			// $('.notice').html('温馨提示：您的红包累计金额为' + totalAccountMoney + '元，<br>点击上方按钮把钱拿走吧！');
			$('.btn').val('立即提现');
		} else {
			if (bizcode == 11 || again == 'true' || Number(currentMoney) == 0) {
				$('.btn').val('查看红包余额');
			} else {
				$('.btn').val('存入我的零钱包');
			}
		}

		// 点击拆红包
		$('.open').on('touchstart', function() {
            if(sessionStorage.isPopAd=='true'){  //未看到618淘广告
				return false;
			}

			_hmt.push(['_trackEvent', 'click', '3.1拆红包页', '点击拆红包']);
			$('.get').fadeOut();

			// 特定大红包
			if (Number(currentMoney) == 8.88 || Number(currentMoney) == 18.88 || Number(currentMoney) == 88.88 || Number(currentMoney) == 188.88){  // 国庆节大额红包
				$('.bigCash').fadeIn(function() {
					$('.logo').attr('src','/v/shqp/img/bigCash/brand.png');
					// setTimeout(() => {
					// 	// $('.liantong').delay(10000).fadeIn(1);
					// 	// _hmt.push(['_trackEvent', 'click', '得红包-提现红包页', '弹出流量广告']);
					// }, 1000);
				});
			}else{
				$('.cash').fadeIn();
				// $('.cash').fadeIn(function() {
				// 	setTimeout(() => {
				// 		// $('.liantong').delay(10000).fadeIn(1);
				// 		// _hmt.push(['_trackEvent', 'click', '得红包-提现红包页', '弹出流量广告']);
				// 		// 瓶装toast 广告 【 0瓶  1罐】
				// 		// if(sessionStorage.skuType == 0){
				// 		//   $('.active').css('display', 'block');
				// 		// }
				// 	}, 1000);
				// });
			}

			setTimeout(() => {
				showtkl(); // 展示淘口令
			},1000)

			sessionStorage.again = 'true'
		});
		// 关闭宣传广告页
		// $('.activeClose').on('touchstart',function(){
		// 	$('.active').css('display', 'none');
		// })
		// 关闭联通流量广告
		// $('.toBag').on('click', function() {
		// 	_hmt.push(['_trackEvent', 'click', '得红包-提现红包页', '关闭流量广告']);
		// 	$('.liantong').css('display', 'none');
		// });
		// 已删除。。
		// $('.liantong-close').on('touchstart', function() {
		// 	$('.liantong').css('display', 'none');
		// });

		// 查看联通流量
		// $('.liantong-btn').on('touchstart', function() {
		// 	_hmt.push(['_trackEvent', 'click', '6.1联通流量页', '领流量']);
		// 	window.location.href = 'https://m.10010.com/queen/qingdaobeer/qdbeer.html';
		// });

		// 点击提现按钮
		$('.btn').on('touchstart', function() {
			if (Number(totalAccountMoney) >= 1) {
				if (bizcode == 11 || again == 'true') {
					_hmt.push(['_trackEvent', 'click', '8.3二次扫码页', '立即提现']);
				}else{
					_hmt.push(['_trackEvent', 'click', '4.1得红包-提现红包页', '立即提现']);
				}
				ifremeber();
			} else {
				if (bizcode == 11 || again == 'true'){
					_hmt.push(['_trackEvent', 'click', '8.1二次扫码页', '进入零钱包']);
				}else{
					_hmt.push(['_trackEvent', 'click', '5.1得红包-提现红包页', '进入零钱包']);
				}
				window.location.replace('http://' + location.host + '/shqp/txo/mybag');
			}
		});

		// 点击活动规则
		$('.rule').on('touchstart', function() {
			if (bizcode == 11 || again == 'true'){
				_hmt.push(['_trackEvent', 'click', '8.2二次扫码页', '活动规则']);
			}else{
				_hmt.push(['_trackEvent', 'click', '4.2得红包-提现红包页', '活动规则']);
			}
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
				"projectServerName": "shanghaiqp",
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
						window.location.replace('http://' + location.host + '/v/shqp/attention.html');
					} else { //已关注用户
						window.location.replace('http://' + location.host + '/shqp/txo/mybag');
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
					window.location.href = 'http://www.wenjuan.in/s/AbIjQv/?from=singlemessage&isappinstalled=0';
				}, 10);
				_hmt.push(['_trackEvent', 'click', '领取红包页', '点击送酒上门按钮-上海']);
			})
		}
	}
})()
