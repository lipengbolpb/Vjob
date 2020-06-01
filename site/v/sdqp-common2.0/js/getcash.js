(function() {
	'use strict';
	var SPACK_PORT = vge.sdqp + '/DBTSDQPInterface/gifts/getGiftspack';
	var APPID = vge.sdqpappid;
	var PROJECT = 'sdqp-common2.0';
	var RULE_URL =
		'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503282638&idx=1&sn=17ceec54422818f75ebcec7fff6576b8&chksm=071dde7f306a576970ffd587f6b8e1653fd0da5df5506db8b3e695fb2fb1b646e2b628ddabcc#rd';
	var EXPLAIN_URL =
		'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503282640&idx=1&sn=d205e21a47475f7c871ee8dc820df452&chksm=071dde61306a5777c0a03e2b84b01c5f3084ee5a5a4c326cb4552197dd4055e2a4871b305548#rd';
	/* 定义各项参数 */
	var currentMoney = sessionStorage.currentMoney,
		totalAccountMoney = sessionStorage.totalAccountMoney == 'undefined' ? '' : sessionStorage.totalAccountMoney,
		codeContentUrl = sessionStorage.codeContentUrl == 'undefined' ? '' : sessionStorage.codeContentUrl,
		earnTime = sessionStorage.earnTime,
		openid = sessionStorage.openid,
		args = vge.urlparse(location.href),
		bizcode = args.bizcode,
		hbopenid = args.openid,
		bizcode = sessionStorage.bizcode === undefined ? bizcode : sessionStorage.bizcode,
		tx = true;
	var grandPrizeType = sessionStorage.grandPrizeType === undefined ? '' : sessionStorage.grandPrizeType; //特等奖类别
	// 用户当天所有活动扫码次数
	var scanLadderFlag = sessionStorage.scanLadderFlag == undefined ? '' : sessionStorage.scanLadderFlag;
	// 用户当前活动当天扫码次数
	var dayScanNum = sessionStorage.dayScanNum == undefined ? '3' : sessionStorage.dayScanNum;  // 扫码次数
    
    var taoEasterEgg = sessionStorage.taoEasterEgg ==  undefined ? '' : sessionStorage.taoEasterEgg;  //返回的淘口令
    var taoMemberOrderFlag = sessionStorage.taoMemberOrderFlag  ==  undefined ? '' : sessionStorage.taoMemberOrderFlag; //入会 or 淘彩蛋 弹框

	// 用户当前活动累计扫码次数
	var userActivityDayScanNum = sessionStorage.userActivityDayScanNum == undefined ? '' : sessionStorage.userActivityDayScanNum;
	
	// 用户扫码捆绑产品数量
	var spuDayScanNum = sessionStorage.spuDayScanNum == undefined ? '' : sessionStorage.spuDayScanNum;
	
	var activityVersion = sessionStorage.activityVersion == 'undefined' ? '' : sessionStorage.activityVersion;
	sessionStorage.isPopAd = 'true';// 618淘口令弹广告页之前禁止拆红包 

	sessionStorage.isPopAdS = 'true';//弹广告页之前禁止拆红包
	sessionStorage.isPopAd19 = 'true';//弹广告页之前禁止拆红包
	sessionStorage.Ad2020 = 'true'; //2020弹广告页之前禁止拆红包
	
	
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
	// 口令复制成功的toast
	function toast(txt) {
		$('#toast .weui_toast_content').html(txt);
		$('#toast').show();
		setTimeout(function () {
			$('#toast').hide();
		}, 2000);
	}

	if (activityVersion == '7') {
		$('.get .slogan').css({
			'margin': '2rem auto 0'
		});
		$('.get .beer,.repcash .beer').css({
			'width': '10%',
			'bottom': '0.2rem'
		});
		// $('.get .slogan').attr('src', '/v/sdqp-common2.0/img/slogan2020.png');
		$('.get .slogan').attr('src', '/v/sdqp-common2.0/img/slogan-1.png');
		$('.get .beer,.repcash .beer').attr('src', '/v/sdqp-common2.0/img/bear-1.png');
		//活动规则
		$('.rule').on('click', function() {
			window.location.href =
				'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503283203&idx=1&sn=a7d25ac9e37a51fb30c88cf677c1093b&chksm=071ddbb2306a52a47722849f0f9fd103603a2be296fc1b87203abde06dfd1c0b6b9437fc3f60#rd';
		});
		//隐私说明
		$('.explain').on('click', function() {
			window.location.href =
				'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503283203&idx=1&sn=a7d25ac9e37a51fb30c88cf677c1093b&chksm=071ddbb2306a52a47722849f0f9fd103603a2be296fc1b87203abde06dfd1c0b6b9437fc3f60#rd';
		});
	} else if (activityVersion == '2') {
		$('.get .slogan').css({
			'margin': '2rem auto 0'
		});
		$('.get .beer,.repcash .beer').css({
			'width': '18%'
		});
		$('.get .slogan').attr('src', '/v/sdqp-common2.0/img/slogan-2.png');
		$('.get .beer,.repcash .beer').attr('src', '/v/sdqp-common2.0/img/bear-2.png');
		//活动规则
		$('.rule').on('click', function() {
			window.location.href =
				'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503282568&idx=1&sn=79489c81bd849ea310efeb93e144a70f&chksm=071dde39306a572f67276b98a77f9bff81c14740bc90f6389a94346784e74491bbf604181bf4#rd';
		});
		//隐私说明
		$('.explain').on('click', function() {
			window.location.href =
				'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503282642&idx=1&sn=847032c660ccfe50076c11bd3fdef146&chksm=071dde63306a577515c82fd324fbedf7fffdb875afa97802c398252dfc43a68484a2d21c7e79#rd';
		});
	} else if (activityVersion == '3') {
		$('.get .slogan').css({
			'margin': '2.5rem auto 0'
		});
		$('.get .beer,.repcash .beer').css({
			'width': '20%'
		});
		// $('.get .slogan').attr('src', '/v/sdqp-common2.0/img/slogan2020.png');
		$('.get .slogan').attr('src', '/v/sdqp-common2.0/img/slogan-3.png');
		$('.get .beer,.repcash .beer').attr('src', '/v/sdqp-common2.0/img/bear-3.png?v=1');
		//活动规则
		$('.rule').on('click', function() {
			window.location.href =
				'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503282572&idx=1&sn=5039e09dd28713d076ef3caf20691f88&chksm=071dde3d306a572bd446939bf7d4ea0fa2114f7a94a66a5f2626084ab5a2810c456e4419bb5c#rd';
		});
		//隐私说明
		$('.explain').on('click', function() {
			window.location.href =
				'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503282644&idx=1&sn=d53b06602093cb5614848c242c4f7e74&chksm=071dde65306a5773e7bb4385cdbefd4ed3f6cac88fbafdca203a0203f7ff0b20451483541edb#rd';
		});
	} else if (activityVersion == '4') {
		$('.get .slogan').css({
			'margin': '3rem auto 0'
		});
		$('.get .beer,.repcash .beer').css({
			'width': '18%'
		});
		// $('.get .slogan').attr('src', '/v/sdqp-common2.0/img/slogan2020.png');
		$('.get .slogan').attr('src', '/v/sdqp-common2.0/img/slogan-4.png');
		$('.get .beer,.repcash .beer').attr('src', '/v/sdqp-common2.0/img/bear-4.png');
		//活动规则
		$('.rule').on('click', function() {
			window.location.href =
				'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503282566&idx=1&sn=327d57d1dce6d27055056a9134ea6ebe&chksm=071dde37306a5721a7d3811b449010e92eb8d4798c2b71b4fdcfdc693a0c82ed0aebd16acdd9#rd';
		});
		//隐私说明
		$('.explain').on('click', function() {
			window.location.href =
				'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503282646&idx=1&sn=4568ca4b8beb55a906ecbf8526701d11&chksm=071dde67306a577175344d394c9e37bf578b90d64a35f60721806b78955dfb7902e89e19e605#rd';
		});
	} else if (activityVersion == '5') {
		$('.get .slogan').css({
			'margin': '2rem auto 0'
		});
		$('.get .beer,.repcash .beer').css({
			'width': '18%'
		});
		// $('.get .slogan').attr('src', '/v/sdqp-common2.0/img/slogan2020.png');
		$('.get .slogan').attr('src', '/v/sdqp-common2.0/img/slogan-5.png');	    
		$('.get .beer,.repcash .beer').attr('src', '/v/sdqp-common2.0/img/bear-5.png');
		//活动规则
		$('.rule').on('click', function() {
			window.location.href =
				'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503282570&idx=1&sn=e60314c16bb7659b22e10cf2a5ac3ed0&chksm=071dde3b306a572d3a1dfb56e1c0d33e708fe0e807285f5609f319f32abf8d05de8d979a0629#rd';
		});
		//隐私说明
		$('.explain').on('click', function() {
			window.location.href =
				'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503282648&idx=1&sn=704d57e95de736192d402220db0194fb&chksm=071dde69306a577f865e88019b90c5853816e1de4c807cf7c3b5b94a09acaa8100e05acc5c0b#rd';
		});
	}

	// sku版本判断  2020
	if(sessionStorage.skukey=='201609141-024'||sessionStorage.skukey=='201609141-025'||sessionStorage.skukey=='201609141-026'||sessionStorage.skukey=='201609141-027'||sessionStorage.skukey=='201609141-029'||sessionStorage.skukey=='201609141-030'){
		$('.get .slogan').attr('src', '/v/sdqp-common2.0/img/slogan2020.png');	
		
		if (activityVersion == '7') {
			//活动规则
			$('.rule').on('click', function() {
				window.location.href =
					'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503283709&idx=1&sn=f719874c7cab48cef482c2004b77e758&chksm=071dda4c306a535a1f8d7d9ec79e1acc8f50e00618bcde85590942211bb1fab8b205675697df#rd';
			});
			//隐私说明
			$('.explain').on('click', function() {
				window.location.href =
					'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503283709&idx=1&sn=f719874c7cab48cef482c2004b77e758&chksm=071dda4c306a535a1f8d7d9ec79e1acc8f50e00618bcde85590942211bb1fab8b205675697df#rd';
			});
		}  else if (activityVersion == '3'){
			//活动规则
			$('.rule').on('click', function() {
				window.location.href =
					'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503283707&idx=1&sn=74c93bb504b7437bd1a6616d831aa437&chksm=071dda4a306a535c3afc05fa8534c723c28bdbf10695bbf6db509381b61518ed07acaada711e#rd';
			});
			//隐私说明
			$('.explain').on('click', function() {
				window.location.href =
					'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503283711&idx=1&sn=e5030c31a17e8beb98e9e430548a4272&chksm=071dda4e306a53584f5eb7dea5102b740fe0ccb09bc6af13b0341170b611f742b25a8dafd764#rd';
			});
		}  else if (activityVersion == '4'){
			//活动规则
			$('.rule').on('click', function() {
				window.location.href =
					'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503283707&idx=1&sn=74c93bb504b7437bd1a6616d831aa437&chksm=071dda4a306a535c3afc05fa8534c723c28bdbf10695bbf6db509381b61518ed07acaada711e#rd';
			});
			//隐私说明
			$('.explain').on('click', function() {
				window.location.href =
					'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503283711&idx=1&sn=e5030c31a17e8beb98e9e430548a4272&chksm=071dda4e306a53584f5eb7dea5102b740fe0ccb09bc6af13b0341170b611f742b25a8dafd764#rd';
			});
		}  else if (activityVersion == '5'){
			//活动规则
			$('.rule').on('click', function() {
				window.location.href =
					'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503283707&idx=1&sn=74c93bb504b7437bd1a6616d831aa437&chksm=071dda4a306a535c3afc05fa8534c723c28bdbf10695bbf6db509381b61518ed07acaada711e#rd';
			});
			//隐私说明
			$('.explain').on('click', function() {
				window.location.href =
					'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503283711&idx=1&sn=e5030c31a17e8beb98e9e430548a4272&chksm=071dda4e306a53584f5eb7dea5102b740fe0ccb09bc6af13b0341170b611f742b25a8dafd764#rd';
			});
		}

	}

   
	// 账户余额
	// $('.totalMoney').text('您的账户余额' + totalAccountMoney + '元');

	if (codeContentUrl == 'undefined' || codeContentUrl == '') {
		$('.toast').css('display', 'none');
	} else {
		$('.toast').attr('src', codeContentUrl);
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
		$('.pmd').css('width', pmdw + 10 + 'px');
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
	}

	(function() {
		if (Number(currentMoney) == 0) { //中奖金额为0
			$('.congratulate').html('您不在活动区域内<br />仅限山东省哦~');
			$('.congratulate').css({
				'margin': '1rem auto 0',
				'fontSize': '0.9rem'
			});
			$('.prize').css('display', 'none');
		} else {
			if (sessionStorage.perMantissaPrize) { //逢19开启
				if (JSON.parse(sessionStorage.perMantissaPrize).perMantissaPrizeFlag == 1 && bizcode != 21) { //逢19红包
					$('.fyj').text('“要酒日”大红包');
					$('.yjrtip').html('本月“要酒日”扫到第' + JSON.parse(sessionStorage.perMantissaPrize).perMantissaNum + '支');
				} else {
					$('.congratulate').html('恭喜客官本月“要酒日”<br />扫到第' + JSON.parse(sessionStorage.perMantissaPrize).perMantissaNum +
						'支');
					$('.congratulate').css({
						'fontSize': '0.6rem'
					});
				}
			}
			$('#money').html(currentMoney);
		}
		if (bizcode == 11) { //重复扫
			events();
			if (Number(totalAccountMoney) >= 1) {
				$('.notice').html('温馨提示：您的红包累计金额为' + totalAccountMoney + '元，<br>点击上方按钮把钱拿走吧！');
				$('#btn').val('立即提现');
				$('#repbtn').val('立即提现');
			} else {
				$('#btn').val('查看红包余额');
				$('#repbtn').val('查看红包余额');
			}
			$('.repcash').css('display', 'block');
			if (sessionStorage.earnTime == '') {
				$('.earn').html('您已扫过这瓶酒<br>并获得<span class="earnMoney">¥' + currentMoney + '元</span>');
			} else {
				$('.earn').html('您已于<span class="earnTime">' + earnTime + '</span>扫过这瓶酒<br>并获得<span class="earnMoney">¥' +
					currentMoney + '元</span>');
			}
			if(new Date().getTime()<new Date(2021,0).getTime()&&new Date().getTime()>new Date(2020,3,28).getTime()){//上线时间：2020年4月28日 下线时间：2020年12月31日
				if(new Date().getTime()>new Date(2020,4,24).getTime() && new Date().getTime()<new Date(2020,5,21).getTime()){
				    $('div.tomall').css('display','none');  // 618期间不出现
				} else {
					$('div.tomall').css('display','flex');
			    	_hmt.push(['_trackEvent', 'click', '重复扫码', '重复扫码显示电商广告弹窗']);
				}
			}

			setTimeout(() => {
				showtkl(); // 展示淘口令
			},1000)

		} else {
			if (Number(totalAccountMoney) >= 1) {
				$('.notice').html('温馨提示：您的红包累计金额为' + totalAccountMoney + '元，<br>点击上方按钮把钱拿走吧！');
				$('#btn').val('立即提现');
				$('#repbtn').val('立即提现');
			} else {
				$('#btn').val('存入我的零钱包');
				$('#repbtn').val('存入我的零钱包');
			}
			$('.get').css('display', 'block');


			// 济宁市邹城弹窗 3  4月    4-16~~5.17  且  2020年5月1日-2020年5月5日新的弹框
			if (new Date().getTime()>new Date(2020,3,15).getTime() && new Date().getTime()<new Date(2020,4,15).getTime() && Number(dayScanNum) < 3 && sessionStorage.city == '济宁市' && sessionStorage.county == '邹城市') {
				// 2020年5月1日-2020年5月5日新的弹框
				if(new Date().getTime()>new Date(2020,4,1).getTime() && new Date().getTime()<new Date(2020,4,6).getTime()){
					$('.activeMain').attr("src","/v/sdqp-common2.0/img/20200501.png");
				} else {
					$('.activeMain').attr("src","/v/sdqp-common2.0/img/ad0416.png");
				}
				setTimeout(function() {
					$('.active').css('display', 'block');
					$('.active .activeClose').on('click', function(event) {
						event.stopPropagation();
						$('.active').css('display', 'none');
					});
					sessionStorage.Ad2020 = 'false';
				}, 500);
			}else{
				sessionStorage.Ad2020 = 'false';
			}
			// 19日广告
			if (new Date().getTime()>new Date(2020,4,17).getTime() && new Date().getTime()<new Date(2020,4,20).getTime() && Number(dayScanNum) < 3 ) {
				setTimeout(function() {
					$('.active19').css('display', 'block');
					$('.active19 .activeClose').on('click', function(event) {
						event.stopPropagation();
						$('.active19').css('display', 'none');
					});
					sessionStorage.isPopAd19 = 'false';
				}, 200);
			}else{
				sessionStorage.isPopAd19 = 'false';
			}
			// 2020宣传广告页面
			// if (new Date().getTime() > new Date(2020,2,18).getTime() && new Date().getTime() < new Date(2020,2,20).getTime() &&  Number(dayScanNum) < 3 &&(activityVersion != '2' || !activityVersion != '6' ) && sessionStorage.Ad2020 =='true'&&sessionStorage.province=='山东省') { //2020年2月14日-2月20日，每天弹两次
			// 	setTimeout(function() {	
			// 		$('.active').css('display', 'block');
			// 		$('.active .activeClose').on('click', function(event) {
			// 			event.stopPropagation();
			// 			$('.active').css('display', 'none');	
			// 		});
			// 		sessionStorage.Ad2020=false;
			// 	}, 800);	
			// } else{
			// 	sessionStorage.Ad2020=false;
			// }

			//  alert('scanLadderFlag' + scanLadderFlag)
			//  alert('spuDayScanNum' + spuDayScanNum)
			// scanLadderFlag = 0; //默认关闭
			if (scanLadderFlag == '1') { // userActivityDayScanNum
				switch (spuDayScanNum) {
					case '1':
						$('.ladder-1').text('');
						$('.ladder-2').text('健康步步高');
						$('.ladder-3').text('下一瓶');
						$('.ladder-4').text('红包会更高');
						break;
					case '2':
						$('.ladder-1').text('');
						$('.ladder-2').text('快乐步步高');
						$('.ladder-3').text('下一瓶');
						$('.ladder-4').text('红包会更高');
						break;
					case '3':
						$('.ladder-1').text('');
						$('.ladder-2').text('运气步步高');
						$('.ladder-3').text('下一瓶');
						$('.ladder-4').text('红包会更高');
						break;
					case '4':
						$('.ladder-1').text('');
						$('.ladder-2').text('福气步步高');
						$('.ladder-3').text('下一瓶');
						$('.ladder-4').text('红包会更高');
						break;
					case '5':
						$('.ladder-1').text('');
						$('.ladder-2').text('财气步步高');
						$('.ladder-3').text('下一瓶');
						$('.ladder-4').text('红包会更高');
						break;
					case '6':
						$('.ladder-1').text('');
						$('.ladder-2').text('青啤虽好');
						$('.ladder-3').text('莫贪杯');
						$('.ladder-4').text('明日再战');
						break;					
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
	})();

	//拆红包
	$('.hbGet,.open').on('touchstart', function() {
		// sessionStorage.isPopAdS=='true'||sessionStorage.isPopAd=='true'|| sessionStorage.isPopAd19 == 'true'||
		if(sessionStorage.isPopAd == 'true' || sessionStorage.isPopAd19 == 'true'){  //展示广告后才可拆
		    alert('aaa')
			return false;
		}
		$('.open').addClass('kai');
		if (bizcode == 0) {
			sessionStorage.bizcode = 11;
		}
		if (sessionStorage.perMantissaPrize) { //逢19开启
			pmdAnm();
		}
		setTimeout(function() {
			$('.get').fadeOut(600);
			$('.cash').fadeIn(600, function() {

				setTimeout(() => {
					showtkl(); // 展示淘口令
				},1000)
				
				// 广告
				if (bizcode == 21) {
					setTimeout(function() {
						$('.getPrize').css('display', 'block');
						if (grandPrizeType == 'p' || grandPrizeType == 'P') {//青啤有一套
				            $('.slogan').attr("src","/v/sdqp-common2.0/img/prize2.png?v=1.0.0");
				            $('.beer').attr("src","/v/sdqp-common2.0/img/beer_prize.png");
				        } else if (grandPrizeType == 'q' || grandPrizeType == 'Q') {//天空音乐节门票
				            $('.slogan').attr("src","/v/sdqp-common2.0/img/prize1.png");
				             $('.beer').attr("src","/v/sdqp-common2.0/img/beer_prize1.png");
				        } else if (grandPrizeType == 'r' || grandPrizeType == 'R') {//张信哲演唱会
				        	$('.logo').css('display', 'none');
				        	$('.getPrize').addClass('get_vocal');
				        	$('.ck').val('点击领取');
				            $('.slogan').attr("src","/v/sdqp-common2.0/img/vocal.png");
				            //$('.beer').attr("src","/v/sdqp-common2.0/img/beer_prize1.png");
				        } else if (grandPrizeType == 's' || grandPrizeType == 'S') {//草莓音乐节门票
				            $('.slogan').attr("src","/v/sdqp-common2.0/img/prize_c.png");
				            $('.getPrize').addClass('get_cm');
				            $('.ck').val('立即兑奖');
				        } else if (grandPrizeType == 't' || grandPrizeType == 'T') {//电音节
				            $('.slogan').attr("src","/v/sdqp-common2.0/img/prize3.png");
				            $('.ck').val('立即兑奖');
				        } else if(grandPrizeType == '1'){//凤凰音乐节
							$('.getPrize').addClass('newGet');
							$('.getPrize').html('<img src="/v/sdqp-common2.0/img/fh_prize.jpg" class="getBtn">')
						} else if(grandPrizeType == '2'){//黄海足球俱乐部
							$('.getPrize').addClass('newGet');
							$('.getPrize').html('<img src="/v/sdqp-common2.0/img/hhzq_prize.jpg" class="getBtn">')
						} else if (grandPrizeType == 'v' || grandPrizeType == 'V') {//泡泡音乐节
				            $('.slogan').attr("src","/v/sdqp-common2.0/img/prize-v.png");
				            $('.ck').val('立即兑奖');
				        } else if (grandPrizeType == 'w' || grandPrizeType == 'W') {//烟台音乐嘉年华
				            $('.slogan').attr("src","/v/sdqp-common2.0/img/prize-w.png");
				            $('.ck').val('立即兑奖');
				        } else if (grandPrizeType == 'x' || grandPrizeType == 'X') {//潍坊音乐嘉年华
				            $('.slogan').attr("src","/v/sdqp-common2.0/img/prize-x.png");
				            $('.ck').val('立即兑奖');
						} else if (grandPrizeType == 'y' || grandPrizeType == 'Y') {//青岛白啤6瓶体验券
				        	$('.logo').css('display', 'none');
				        	$('.getPrize').addClass('get_coupon');
				        	$('.ck').val('点击领取');
							$('.slogan').attr("src","/v/sdqp-common2.0/img/beerCoupon.png?v=1.0.1");
							
				        } else if (grandPrizeType == 'z' || grandPrizeType == 'Z') {//鲁能泰山主场中超球票奖
				        	$('.logo').css('display', 'none');
				        	$('.getPrize').addClass('get_ticket');
				        	$('.ck').val('点击领取');
				            $('.slogan').attr("src","/v/sdqp-common2.0/img/ballTicket.png");
				        } else if(grandPrizeType == 'p02' || grandPrizeType == 'P02'){//济宁市邹城市“青岛啤酒大礼包”(2020年4月16日-5月17日)
							$('.getPrize').addClass('newGet');
							$('.getPrize').html('<img src="/v/sdqp-common2.0/img/qp_prize.png" class="getBtn">')
						} 
						$('.getPrize .ck,.getBtn').on('click', function() {
							sessionStorage.again = true;
							location.replace('http://' + location.host + '/v/sdqp-common2.0/prize.html?bizcode=' + bizcode)
						})
						events();
					}, 1000);
				} else {
					events();
				}

				/*if (new Date().getTime() <= new Date(2019,4,29).getTime() && Number(dayScanNum) < 3&&(sessionStorage.skukey=='241510936-006'||sessionStorage.skukey=='241510936-013'||sessionStorage.skukey=='241510936-018')) { //5.29撤销，每天弹两次
					setTimeout(function() {
						$('.active').css('display', 'block');
						$('.active .activeClose').on('click', function(event) {
							$('.active').css('display', 'none');
							event.stopPropagation();
						});
					}, 2000);
				}*/

				// 2s弹出酒王之旅
				// setTimeout(function () {
				// 	$(".travelMask").fadeIn(1000);
				// 	$(".wineTravel").fadeIn(1000);
				// }, 900);
				
				// 先出广告宣传，再出城市酒王
				// 白啤体验券
				// if (Number(dayScanNum) < 2 && sessionStorage.city == '济宁市' && sessionStorage.county == '任城区') {
				// 	setTimeout(function() {
				// 		$('.activeCoupon').css('display', 'block');
				// 		$('.activeCoupon .activeClose').on('click', function(event) {
				// 			$('.activeCoupon').css('display', 'none');
				// 			event.stopPropagation();
				// 		});
				// 	}, 500);
				// }
				//                              2 3 4 5 7 9
				// 经典1903体验券  activityVersion 3 4 5 7  2019.10.12~10.28
				// if ((activityVersion != '2' && activityVersion != '9') && new Date().getTime()>new Date(2019,9,11) && new Date().getTime()<new Date(2019,9,29) && Number(dayScanNum) < 3 && sessionStorage.city == '济宁市' && sessionStorage.county == '任城区') {
				// 	setTimeout(function() {
				// 		$('.activeCoupon').css('display', 'block');
				// 		$('.activeCoupon .activeClose').on('click', function(event) {
				// 			$('.activeCoupon').css('display', 'none');
				// 			event.stopPropagation();
				// 		});
				// 	}, 500);
				// }

				// .96s弹出城市酒王排行
				setTimeout(function () {
					$('div.alert_jw').css('display','flex');
				}, 960);
				
				// if (Number(dayScanNum) < 2&&sessionStorage.city=='青岛市') {
				// 	setTimeout(function() {
				// 		// $('.ad').css('display', 'none');
				// 		$('.activeBehind').css('display', 'block');
				// 		$('.activeBehind .activeClose').on('click', function(event) {
				// 			$('.activeBehind').css('display', 'none');
				// 			event.stopPropagation();
				// 		});
				// 	}, 2000);
				// }
				// 淘彩蛋
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
		}, 1000);
	});
     //关闭城市酒王排行酒王弹窗
    $('div.alert_jw p').on('click',function(){
    	$('div.alert_jw').css('display','none');
    	$('.icon_jw').css('visibility','visible');
    });
    $('.icon_jw').on('click',function(){
    	$('div.alert_jw').css('display','flex');
    	$('.icon_jw').css('visibility','hidden');
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
	
    // 酒王之旅toast
	// $('.closeToast').on('click',function(){
	// 	$(".travelMask").fadeOut(600);
	// 	$(".wineTravel").fadeOut(600);
	// })
	// 
	// $('.traEntry').on('click',function(){
	// 	$(".travelMask").fadeIn(600);
	// 	$(".wineTravel").fadeIn(600);
	// 	// window.location.href = 'http://' + location.host + '/v/sdqp/load.html?openid='+ openid;
	// })
	// $('.travelBtn').on('click', function() {
	// 	window.location.href = 'http://' + location.host + '/v/sdqp/load.html?openid='+ openid;
	// });
	

	function events() {
		//活动规则
		// $('.rule').on('touchstart', function () {
		//     window.location.href = RULE_URL;
		// });
		//隐私说明
		// $('.explain').on('touchstart', function () {
		//     window.location.href = EXPLAIN_URL;
		// });
		//提现成功后判断关注
		$('.mask').on('touchstart', function() {
			// $('.mask').css('display', 'none');
			ifremeber();
		});
		$('#btn,#repbtn').on('touchstart', function() {
			// 3 4 5 7    关注
			// 2 9        不关注
			if (Number(totalAccountMoney) >= 1) {
				ifremeber();
			} else {
				window.location.replace('http://' + location.host + '/sdqp-common2.0/txo/mybag');		
			}			
		});
	}

	/* 提现 */
	// function give_spack() {
	// 	var javai = SPACK_PORT;
	// 	var req = {
	// 		"openid": openid,
	// 		"hbopenid": hbopenid
	// 	};
	// 	$.ajax({
	// 		type: "POST",
	// 		url: javai,
	// 		data: JSON.stringify(req),
	// 		dataType: 'json',
	// 		success: function(jo, status, xhr) {
	// 			$('.loading').css('display', 'none');
	// 			if (jo.result.code == '0') {
	// 				if (jo.result.businessCode === '0') {
	// 					$('#sign_logo').css('display', 'none');
	// 					$('#sale_icon').css('display', 'none');
	// 					$('.mask').css('display', 'block');
	// 					tx = false;
	// 				} else if (jo.result.businessCode === '1') { //1
	// 					title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
	// 					tx = true;
	// 				} else if (jo.result.businessCode === '2') { //1
	// 					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
	// 					tx = true;
	// 				} else if (jo.result.businessCode === '4') { //1
	// 					title_tip('提现处理中，请稍后查看详细记录', '我知道了');
	// 					tx = true;
	// 				} else if (jo.result.businessCode === '3') { //1
	// 					title_tip('尊敬的用户',
	// 						'<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>',
	// 						'我知道了');
	// 					tx = true;
	// 				} else if (jo.result.businessCode === '-1') { //-1
	// 					title_tip('提 示', '系统升级中...', '我知道了');
	// 					tx = true;
	// 				} else if (jo.result.businessCode === '-2') { //-1
	// 					title_tip('提 示', '提现操作过于频繁', '我知道了');
	// 					tx = true;
	// 				} else if (jo.result.businessCode === '5') { //5
	// 					title_tip('尊敬的用户', jo.result.msg, '我知道了');
	// 					tx = true;
	// 				} else {
	// 					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
	// 					tx = true;
	// 				}
	// 			} else if (jo.result.code == '-1') {
	// 				title_tip('尊敬的用户', '系统升级中...', '我知道了');
	// 				tx = true;
	// 			} else { //code!='0'
	// 				title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
	// 				tx = true;
	// 			}
	// 		},
	// 		error: function(res, status, xhr) {
	// 			title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
	// 		}
	// 	});
	// }

	/* 判断关注 */
	function ifremeber() {
		var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + APPID;
		vge.ajxget(requrl, 5000, function(r) {
			try {
				var o = JSON.parse(r);
				if (o.subscribe == '0') { //未关注
					window.location.replace('http://' + location.host + '/v/' + PROJECT + '/attention.html');
				} else { //已关注用户   too
					window.location.replace('http://' + location.host + '/' + PROJECT + '/txo/mybag');
				}
			} catch (e) {
				vge.clog('errmsg', [requrl, e]);
			}
		}, function(err) {
			vge.clog('errmsg', [requrl, err]);
		});
	}

	 // 送酒上门按钮
	//  addNewBtn();

	//  function addNewBtn() {
	// 	 if (activityVersion == '3' ||activityVersion == '4' ||activityVersion == '5' ||activityVersion == '7') {
	// 		 $('#btn-to-home').click(function () {
	// 		 	try {
	// 		 		_hmt.push(['_trackEvent', 'click', '领取红包页', '点击送酒上门按钮-山东']);
	// 		 		setTimeout(function () {
	// 		 			window.location.href = 'https://mp.weixin.qq.com/s/W9h8SwmaEzZOx0RFqGga8Q';
	// 		 		}, 10);
	// 		 	} catch (e) {

	// 		 	}
	// 		 });
	// 	 } else {
	// 		 $('#btn-to-home').css('display', 'none');
	// 	 }
	 	
	//  }
})();


// if (Number(totalAccountMoney) >= 1) {
// 	if (tx) {
// 		tx = false;
// 		$('#loading').css('display', 'block');
// 		give_spack();
// 	}
// } else {
// 	ifremeber();
// }