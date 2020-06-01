(function() {
	'use strict';
	window.onload = function() {
		var SPACK_PORT = vge.sdqp + '/DBTSDQPInterface/gifts/getGiftspack'; //提现接口
		var APPID = vge.sdqpappid;
		// 瓶规则
		var RULE_URL = 'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503283375&idx=1&sn=0180f13ff7173e255c7f6494b6d578a7&chksm=071ddb1e306a52089109a4d23e5b49930828072c36e8048c6d9e1b0eef77247c2f0e8aed8945#rd';
		var project = 'sdqp-prs';
		// var EXPLAIN_URL = '';

		/* 定义各项参数 */
		var currentMoney = sessionStorage.currentMoney,
			totalAccountMoney = sessionStorage.totalAccountMoney,
			earnTime = sessionStorage.earnTime,
			openid = sessionStorage.openid, 
			args = vge.urlparse(location.href),
			bizcode = args.bizcode,
			tx = true;
		bizcode = sessionStorage.bizcode === undefined ? bizcode : sessionStorage.bizcode;	

	   var grandPrizeType = sessionStorage.grandPrizeType === undefined ? '' : sessionStorage.grandPrizeType; //特等奖类别

		// 用户当前活动当天扫码次数
		var dayScanNum = sessionStorage.dayScanNum == undefined ? '' : sessionStorage.dayScanNum;
		
		var taoEasterEgg = sessionStorage.taoEasterEgg ==  undefined ? '' : sessionStorage.taoEasterEgg;  //返回的淘口令
        var taoMemberOrderFlag = sessionStorage.taoMemberOrderFlag  ==  undefined ? '' : sessionStorage.taoMemberOrderFlag; //入会 or 淘彩蛋 弹框

		// 用户当天所有活动扫码次数
		var scanLadderFlag = sessionStorage.scanLadderFlag == undefined ? '' : sessionStorage.scanLadderFlag;
		// 用户当前活动累计扫码次数
	   var userActivityDayScanNum = sessionStorage.userActivityDayScanNum == undefined ? '' : sessionStorage.userActivityDayScanNum;
		// 用户扫码捆绑产品数量
		var spuDayScanNum = sessionStorage.spuDayScanNum == undefined ? '' : sessionStorage.spuDayScanNum;
		
		sessionStorage.isPopAd = 'true';// 618活动的弹广告页之前禁止拆红包
		sessionStorage.is19Ad = 'true';//弹广告页之前禁止拆红包


		// 淘彩蛋广告页面  5.25~6.20  每天3次 拆红包的之前
		if(bizcode != 11 && new Date().getTime()>=new Date(2020,4,25).getTime() && new Date().getTime()<new Date(2020,5,21).getTime() && Number(dayScanNum)<4 && sessionStorage.isPopAd =='true'){  //前3次展示
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
		// 复制口令成功toast
		function toast(txt) {
			$('#toast .weui_toast_content').html(txt);
			$('#toast').show();
			setTimeout(function () {
				$('#toast').hide();
			}, 2000);
		}

		if(sessionStorage.skukey=='201609141-024'){ // 2020年外箱产品 皮尔森10.5度450*12箱啤Z
			// slogan
			$('.get .slogan').attr('src', '/v/sdqp-prs/img/slogan2020.png?v=1');
            // 点击活动规则
			$('.rule').on('touchstart', function() {
				window.location.href = 'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503283705&idx=1&sn=de74877b421a3a0239173fc3f16de1d7&chksm=071dda48306a535e407ba12b14b46641582edc1cd830d3479ff4e8beb2ec69e9bc03bb3a099d#rd';
			}); 
		}  else {
			// 点击活动规则
			$('.rule').on('touchstart', function() {
				window.location.href = RULE_URL;
			});
		}
		
		if (bizcode == 11) {
			$('.title').text('您已扫过');
			$('.main').text('每瓶仅限扫码一次');
			$('.main').css('fontSize', '1.4rem');
			if (sessionStorage.earnTime == '' || sessionStorage.earnTime == undefined) {
				if(sessionStorage.skuType == 0){
				   $('.time').html('您已扫过这瓶酒<br>并获得了￥' + currentMoney + '元')					
				}else if(sessionStorage.skuType == 1){
				   $('.time').html('您已扫过这罐酒<br>并获得了￥' + currentMoney + '元')
				}
			} else {
				$('.time').html('您已于' + earnTime + '扫过这瓶酒<br>并获得了￥' + currentMoney + '元')
			}
			$('.time,.cash').css('display', 'block');
			// $('.curtain').css('display', 'none');
			if(new Date().getTime()<new Date(2021,0).getTime()&&new Date().getTime()>new Date(2020,3,28).getTime()){//上线时间：2020年4月28日 下线时间：2020年12月31日
				if(new Date().getTime()>new Date(2020,4,24).getTime() && new Date().getTime()<new Date(2020,5,21).getTime()){
				    $('div.tomall').css('display','none');  // 618期间不出现微盟
				} else {
					$('div.tomall').css('display','flex');
		    		_hmt.push(['_trackEvent', 'click', '重复扫码', '重复扫码显示电商广告弹窗']);
				}
			}

			setTimeout(() => {
				showtkl(); // 展示淘口令
			},1000)
			
		} else {
			// runAnimation();
			$('.get').css('display', 'block');
			if (Number(currentMoney) == 0) {
				$('.title').html('您不在活动区域内<br />仅限山东省哦~');
				// $('.main').text('您离红包只差一点点');
				// $('.main').css('fontSize', '1.4rem');
			} else {
				if (sessionStorage.perMantissaPrize) { //逢19开启
					if (JSON.parse(sessionStorage.perMantissaPrize).perMantissaPrizeFlag == 1 && bizcode != 21) { //逢19红包
						$('.title').text('恭喜您获得');
						$('.main').html('“要酒日”大红包<br> ￥' + currentMoney + '<span class="yuan">元</span>');
					} else {
						$('.title').html('恭喜客官本月“要酒日”扫到第' + JSON.parse(sessionStorage.perMantissaPrize).perMantissaNum +
							'支');
						$('.main').html('￥' + currentMoney + '<span class="yuan">元</span>');
					}
				}else{
					$('.title').text('恭喜您获得');
				    $('.main').html('￥' + currentMoney + '<span class="yuan">元</span>');
				}
			}
			// 要酒日宣传页 11月份要酒日
			// if(new Date().getTime()>new Date(2019,11,17).getTime() && new Date().getTime()<new Date(2019,11,20).getTime() && Number(dayScanNum)<3 && sessionStorage.isPopAd =='true'){ //2019.11.15~11.19 每日两次
			// 	setTimeout(function(){
			// 		$('.active').css('display','flex');
			// 		$('.active .activeClose').on('click',function(e){
			// 			e.stopPropagation();
			// 			$('.active').css('display','none');
			// 		})
			// 		sessionStorage.isPopAd = 'false';
			// 	},500);
			// }else{
			// 	sessionStorage.isPopAd = 'false';
			// }


			// 宣传广告2020
			// if(new Date().getTime() > new Date(2020,2,18).getTime() && new Date().getTime()<new Date(2020,2,20).getTime() && Number(dayScanNum)<3 && sessionStorage.isPopAd =='true' && sessionStorage.province=='山东省'){ //2020年2月14日-2月20日 每日两次
			// 	setTimeout(function(){
			// 		$('.active').css('display','flex');
			// 		$('.active .activeClose').on('click',function(e){
			// 			e.stopPropagation();
			// 			$('.active').css('display','none');
			// 		})
			// 		sessionStorage.isPopAd = 'false';
			// 	},500);
			// }else{
			// 	sessionStorage.isPopAd = 'false';
			// }

            // 济宁市 邹城市大奖 （已过期~~~）
			// if(new Date().getTime()>new Date(2020,3,15).getTime() && new Date().getTime()<new Date(2020,4,15).getTime() && Number(dayScanNum) < 3 && sessionStorage.city == '济宁市' && sessionStorage.county == '邹城市' ){ //邹城市的大奖 每日两次
			// 	// 2020年5月1日-2020年5月5日新的弹框
			// 	if(new Date().getTime()>new Date(2020,4,1).getTime() && new Date().getTime()<new Date(2020,4,6).getTime()){
			// 		$('.activeImg').attr("src","/v/sdqp-common2.0/img/20200501.png");
			// 	} else {
			// 		$('.activeImg').attr("src","/v/sdqp-common2.0/img/ad0416.png");
			// 	}
			// 	setTimeout(function(){
			// 		$('.active').css('display','flex');
			// 		$('.active .activeClose').on('click',function(e){
			// 			e.stopPropagation();
			// 			$('.active').css('display','none');
			// 		})
			// 		sessionStorage.isPopAd = 'false';
			// 	},500);
			// }else{
			// 	sessionStorage.isPopAd = 'false';
			// }

			// 19日广告
			if (new Date().getTime()>new Date(2020,4,17).getTime() && new Date().getTime()<new Date(2020,4,20).getTime() && Number(dayScanNum) < 3 ) {
				setTimeout(function() {
					$('.active19').css('display', 'block');
					$('.active19 .activeClose').on('click', function(event) {
						event.stopPropagation();
						$('.active19').css('display', 'none');
					});
					sessionStorage.is19Ad = 'false';
				}, 200);
			}else{
				sessionStorage.is19Ad = 'false';
			}

			// scanLadderFlag = 0; //默认关闭
			if (scanLadderFlag == '1') {  //userActivityDayScanNum
				switch (spuDayScanNum) {
					case '1':
						$('.ladder-1').text('健康步步高');
						$('.ladder-2').text('下一瓶红包会更高');
						// $('.ladder-3').text('红包会更高'); 
						break;
					case '2':
						$('.ladder-1').text('快乐步步高');
						$('.ladder-2').text('下一瓶红包会更高');
						// $('.ladder-3').text('红包会更高');
						break;
					case '3':
						$('.ladder-1').text('运气步步高');
						$('.ladder-2').text('下一瓶红包会更高');
						// $('.ladder-3').text('红包会更高');
						break;
					case '4':
						$('.ladder-1').text('福气步步高');
						$('.ladder-2').text('下一瓶红包会更高');
						// $('.ladder-3').text('红包会更高');
						break;
					case '5':
						$('.ladder-1').text('财气步步高');
						$('.ladder-2').text('下一瓶红包会更高');
						// $('.ladder-3').text('红包会更高');
						break;
					case '6':
						$('.ladder-1').text('青啤虽好');
						$('.ladder-2').text('莫贪杯，明日再战');
						// $('.ladder-3').text('红包会更高');
						break;					
					// case '7':
					// 	$('.ladder-1').text('幸运2020鼠来宝');
					// 	$('.ladder-2').text('第11支及以上');
					// 	$('.ladder-3').text('乐抢2020元惊喜红包');
					// 	break;
					// case '8':
					// 	$('.ladder-1').text('幸运2020鼠来宝');
					// 	$('.ladder-2').text('第11支及以上');
					// 	$('.ladder-3').text('乐抢2020元惊喜红包');
					// 	break;
					// case '9':
					// 	$('.ladder-1').text('幸运2020鼠来宝');
					// 	$('.ladder-2').text('第11支及以上');
					// 	$('.ladder-3').text('乐抢2020元惊喜红包');
					// 	break;
					// case '10':
					// 	$('.ladder-1').text('幸运2020鼠来宝');
					// 	$('.ladder-2').text('第11支及以上');
					// 	$('.ladder-3').text('乐抢2020元惊喜红包');
					// 	break;
					default:
						$('.ladder-1').text('');
						$('.ladder-2').text('');
						break;
				}
			} else {
				$('.ladder-1').text('');
				$('.ladder-2').text('');
			}

		}
		// $('.totalMoney').text('您的账户余额' + totalAccountMoney + '元');

		if (Number(totalAccountMoney) >= 1) {
			$('.notice').html('温馨提示：您的红包累计金额为' + totalAccountMoney + '元，<br>点击上方按钮把钱拿走吧！');
			$('#btn').val('去提现');
		} else {
			if (bizcode == 11|| Number(currentMoney) == 0) {
				$('#btn').val('查看红包余额');
			} else {
				$('#btn').val('存入我的零钱包');
			}
		}
		
		// 点击拆红包
		$('.open').on('touchstart', function() {
			if(sessionStorage.isPopAd =='true' || sessionStorage.is19Ad =='true'){  //广告展示才可拆红包
				return false;
			}
			if (sessionStorage.perMantissaPrize) { //逢19开启
				pmdAnm();
			}
			$('.get').fadeOut();
			$('.cash').fadeIn(function() {

				setTimeout(() => {
					showtkl(); // 展示淘口令
				},1000)
				
				if (bizcode == 21) {
					setTimeout(function() {
						$('.getPrize').css('display', 'block');
						if(grandPrizeType == 'p02' || grandPrizeType == 'P02'){//济宁市邹城市“青岛啤酒大礼包”(2020年4月16日-5月17日)
							$('.getPrize').addClass('newGet');
							$('.getPrize').html('<img src="/v/sdqp-common2.0/img/qp_prize.png" class="getBtn">')
						} 
						$('.getPrize .ck,.getBtn').on('click', function() {
							sessionStorage.again = true;
							location.replace('http://' + location.host + '/v/sdqp-prs/prize.html?bizcode=' + bizcode)
						})
					}, 1000);
				}

				setTimeout(() => {
					// $('.liantong').css('display', 'block');
					$('div.alert_jw').css('display','flex');
				}, 1000);
				//淘彩蛋
				if(Date.parse(new Date())<Date.parse(new Date(2020,0,10))){//十号之前
					setTimeout(function(){
						$('.taocd').fadeIn(1);
					},2000);
					$('.close_cd').on('click',function(){
						$('.taocd').fadeOut(1);
					})
					$('.caidan').on('click',function(){
						var clipboard = new ClipboardJS('.caidan');
						clipboard.on('success', function(e) {
						    console.log(e);
							title_tip('提 示', '复制口令成功！', '我知道了');
						});
						clipboard.on('error', function(e) {
						    console.log(e);
						});
					});
				}
			});
			sessionStorage.bizcode = '11';
		});
		// 关闭联通流量广告
		$('.liantong-close').on('touchstart', function() {
			setTimeout(function(){
				$('.liantong').css('display', 'none');
			},100)
		});
		// 查看联通流量
		$('.liantong-btn').on('touchstart', function() {
			window.location.href = 'https://m.10010.com/queen/qingdaobeer/qdbeer.html';
		});
		//关闭酒王弹窗
		$('div.alert_jw p').on('click',function(){
			$('div.alert_jw').css('display','none');
			$('.icon_jw').css('visibility','visible');
			// $('#btn-to-home').css('visibility', 'visible');
		});
		$('.icon_jw').on('click',function(){
			$('div.alert_jw').css('display','flex');
			$('.icon_jw').css('visibility','hidden');
			// $('#btn-to-home').css('visibility', 'hidden');
		});
		// 点击提现按钮
		$('#btn').on('touchstart', function() {
			if (Number(totalAccountMoney) >= 1) {  // 提现大于1元判断关注
				ifremeber();
			} else {  // too
				window.location.replace('http://' + location.host + '/'+ project +'/txo/mybag');				
			}
		});
		// 关闭电商弹窗
		$('div.tomall .activeClose').on('click',function(){
			$('div.tomall').fadeOut(1);
		});
		// 跳转电商
		$('div.tomall .tomall').on('click',function(){
			_hmt.push(['_trackEvent', 'click', '重复扫码', '点击领取优惠券']);
			location.href = 'https://100000648415.retail.n.weimob.com/saas/retail/100000648415/283984415/market/coupon/pickcoupon?id=10056256';
		});

		//提现成功后判断关注
		// $('.mask').on('touchstart', function() {
		// 	ifremeber();
		// });
		// // 点击活动规则
		// $('.rule').on('touchstart', function() {
		// 	window.location.href = RULE_URL;
		// 	// if(sessionStorage.skuType == 0){
		// 	//   window.location.href = botRULE_URL;
		// 	// }else if(sessionStorage.skuType == 1){
		// 	//   window.location.href = canRULE_URL;				
		// 	// }
		// });

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
						window.location.replace('http://' + location.host + '/v/'+ project +'/attention.html');
					} else { //已关注用户  too appid appid2支付openid
						window.location.replace('http://' + location.host + '/'+ project +'/txo/mybag');
					}
				} catch (e) {
					vge.clog('errmsg', [requrl, e]);
				}
			}, function(err) {
				vge.clog('errmsg', [requrl, err]);
			});
		}

		// 跑马灯动画
		function pmdAnm() {
			var pList = JSON.parse(sessionStorage.perMantissaPrize).perMantissaEarnUser;
			if (pList == undefined || pList.length < 1) {
				return false;
			} else {
				for (var i = 0; i < pList.length; i++) {
					var nickName = pList[i].nickName === undefined ? '...' : pList[i].nickName;
					if (pList[i].earnMoney) {
						$('.pmd').append('<p>恭喜“' + nickName + '”扫到第' + pList[i].prizeScanNum + '支，中得“要酒日”' + pList[i].earnMoney +
							'元大红包</p>');
					} else if (pList[i].prizeName) {
						$('.pmd').append('<p>恭喜“' + nickName + '”扫到第' + pList[i].prizeScanNum + '支，中得“' + pList[i].prizeName +
							'”礼盒一份</p>');
					}
				}
			}
			var pmdw = 0;
			$('.pmd p').each(function() {
				pmdw += $(this).innerWidth();
			});
			$('.pmd').css('width', pmdw + 20 + 'px');
			if ($('.pmd p').size() > 1) {
				$('.pmd').css({
					'transition': 'all linear ' + ($('.pmd p').size() + 1) * 3 + 's',
					'left': -pmdw - 10 + 'px'
				});
				$('.pmd').on('transitionend', function() {
					$('.pmd').css({
						'transition': 'none',
						'left': '0'
					});
					var setTimer = setTimeout(function() {
						$('.pmd').css({
							'transition': 'all linear ' + $('.pmd p').size() * 3 + 's',
							'left': -pmdw - 10 + 'px'
						});
					}, 100)
					setTimer = null;
				});
			} else {
				$('.pmd').css({
					'transition': 'all linear ' + '5s',
					'left': -pmdw + 'px'
				});
				$('.pmd').on('transitionend', function() {
					$('.pmd').css({
						'transition': 'none',
						'left': '100%'
					});
					var setTimer = setTimeout(function() {
						$('.pmd').css({
							'transition': 'all linear ' + '5s',
							'left': -pmdw + 'px'
						});
					}, 100);
					setTimer = null;
				});
			}
		};
		// 送酒上门按钮
		//  addNewBtn(bizcode);
	}


	 // 送酒上门按钮
	// 	 function addNewBtn(bizcode) {
	// 	 if (bizcode == '11') {
	// 		 $('#btn-to-home').css('display', 'none');
	// 		 console.log($('#btn-to-home'));
			 
	// 	 }
	//  	$('#btn-to-home').click(function () {
	//  		try {
	//  			_hmt.push(['_trackEvent', 'click', '领取红包页', '点击送酒上门按钮-山东']);
	//  			setTimeout(function () {
	//  				window.location.href = 'https://mp.weixin.qq.com/s/W9h8SwmaEzZOx0RFqGga8Q';
	//  			}, 10);
	//  		} catch (e) {

	//  		}
	//  	})
	//  }
})()
