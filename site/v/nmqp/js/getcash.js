(function() {
	'use strict';
	window.onload = function() {
		var SPACK_PORT = vge.common + '/vjifenInterface/gifts/getGiftspack'; //提现接口
		var APPID = vge.nmqpappid;
		// 瓶规则
		var botRULE_URL = 'https://mp.weixin.qq.com/s?__biz=Mzg3MzE0Mjc3NQ==&mid=100000005&idx=1&sn=7221a7cf4b590920cf7d4412fd59d4c6&chksm=4ee5c19d7992488b82702997f715f1cce876da8c8344efa61ab409899f6849bc06ef506d1d1a#rd';
		// 罐装规则
		var canRULE_URL = 'https://mp.weixin.qq.com/s?__biz=Mzg3MzE0Mjc3NQ==&mid=100000010&idx=1&sn=74244e1acac39d1c5c56ae5fca4d733d&chksm=4ee5c19279924884c4ade431846ec449dcb1b906e9ae013bfa9275d52958d3fb26af68cc8684#rd';
		
		// var EXPLAIN_URL = '';

		/* 定义各项参数 */
		var currentMoney = sessionStorage.currentMoney,
			totalAccountMoney = sessionStorage.totalAccountMoney,
			earnTime = sessionStorage.earnTime,
			openid = sessionStorage.openid,
			args = vge.urlparse(location.href),
			bizcode = args.bizcode,
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


		if (bizcode == 11 || again == 'true') {
			$('.title').text('您已扫过');
			if(sessionStorage.skuType == 0){
				$('.main').text('每瓶仅限扫码一次');
			}else if(sessionStorage.skuType == 1){
				$('.main').text('每罐仅限扫码一次');
			}
			$('.main').css('fontSize', '1.4rem');
			if (sessionStorage.earnTime == '' || sessionStorage.earnTime == undefined) {
				if(sessionStorage.skuType == 0){
				   $('.time').html('您已扫过这瓶酒<br>并获得了￥' + currentMoney + '元')					
				}else if(sessionStorage.skuType == 1){
				   $('.time').html('您已扫过这罐酒<br>并获得了￥' + currentMoney + '元')
				}
			} else {
				if(sessionStorage.skuType == 0){
				   $('.time').html('您已于' + earnTime + '扫过这瓶酒<br>并获得了￥' + currentMoney + '元')
				}else if(sessionStorage.skuType == 1){
			       $('.time').html('您已于' + earnTime + '扫过这罐酒<br>并获得了￥' + currentMoney + '元')
				}
			}
			$('.time,.cash').css('display', 'block');
			// $('.curtain').css('display', 'none');

			setTimeout(() => {
				showtkl(); // 展示淘口令
			},1000)

		} else {
			// runAnimation();
			$('.get').css('display', 'block');
			if (Number(currentMoney) == 0) {
				if(sessionStorage.skuType == 0){
				  $('.title').text('再喝一瓶试试看');
				}else if(sessionStorage.skuType == 1){
			      $('.title').text('再喝一罐试试看');
				}
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
			if(sessionStorage.isPopAd=='true'){  //未看到618淘广告
				return false;
			}

			$('.get').fadeOut();
			$('.cash').fadeIn(function() {
				setTimeout(() => {
					showtkl();
					// $('.liantong').delay(2000).fadeIn(1);
					// 瓶装toast 广告 【 0瓶  1罐】
					// if(sessionStorage.skuType == 0){
					//   $('.active').css('display', 'block');
					// }
				}, 1000);
			});
			sessionStorage.again = 'true'
		});

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
		
		// 关闭宣传广告页
		// $('.activeClose').on('touchstart',function(){
		// 	$('.active').css('display', 'none');
		// })
		// // 关闭联通流量广告
		// $('.liantong-close').on('touchstart', function() {
		// 	$('.liantong').css('display', 'none');
		// });
		// // 查看联通流量
		// $('.liantong-btn').on('touchstart', function() {
		// 	window.location.href = 'https://m.10010.com/queen/qingdaobeer/qdbeer.html';
		// });

		// 点击提现按钮
		$('#btn').on('touchstart', function() {
			if (Number(totalAccountMoney) >= 1) {
				// if (tx) {
				//     tx = false;
				//     $('#loading').css('display', 'block');
				//     give_spack();
				// }
				window.location.replace('http://' + location.host + '/nmqp/too/mybag');
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
			if(sessionStorage.skuType == 0){
			  window.location.href = botRULE_URL;
			}else if(sessionStorage.skuType == 1){
			  window.location.href = canRULE_URL;				
			}
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
				"hbopenid": hbopenid,
				"projectServerName":"neimeng",
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
						window.location.replace('http://' + location.host + '/v/nmqp/attention.html');
					} else { //已关注用户
						window.location.replace('http://' + location.host + '/nmqp/too/mybag');
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
