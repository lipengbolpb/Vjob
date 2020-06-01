(function() {
	'use strict';

	var SPACK_PORT = vge.common + '/vjifenInterface/gifts/getGiftspack'; //提现接口
	var APPID = vge.hkqpappid; //appid
	var PROJECT = 'hkqp'; //项目名称地址
	var RULE_URL =
		'https://mp.weixin.qq.com/s?__biz=MzU0MTU3MTYzOA==&mid=100000005&idx=1&sn=27e6344fc4f6c0af99ee58243b4585eb&chksm=7b26ae5c4c51274a0ea22ea16a3c74d69af6498db7a1dc5fe35dd8c335da308cf1e7eeca6615#rd';
	var EXPLAIN_URL =
		'https://mp.weixin.qq.com/s?__biz=MzU0MTU3MTYzOA==&mid=100000008&idx=1&sn=f112ec51bd05e62806a310b3ad218044&chksm=7b26ae514c512747c94fce2656618efcd87781c302dbf5b81d99e8c3ca685956ef17fbb75f7a#rd';

	/* 定义各项参数 */
	var args = vge.urlparse(location.href),
		bizcode = args.bizcode,
		hbopenid = args.openid,
		openid = sessionStorage.openid,
		currentMoney = sessionStorage.currentMoney,
		totalAccountMoney = sessionStorage.totalAccountMoney,
		codeContentUrl = sessionStorage.codeContentUrl,
		earnTime = sessionStorage.earnTime,
		again = sessionStorage.again === undefined ? false : sessionStorage.again,
		tx = true,
		act = true,
		STRCODE = sessionStorage.STRCODE === undefined ? '' : sessionStorage.STRCODE;
	var skuList = ['241510936-001','241510936-002','241510936-003','241510936-004','241510936-005','241510936-006','241510936-007'];
	var dayScanNum = sessionStorage.dayScanNum;
	//图片切换
	sessionStorage.isHotAreaName=='true'

	var init = function() { //判断页面展示
		if (Number(currentMoney) == 0) { //中奖金额为0
			$('.congratulate').html(window.zeroText2()).css('font-size', '.8rem');
			$('.congratulate').css({
				'margin': '1rem auto 0',
				'fontSize': '1rem'
			});
			$('.prize').css('display', 'none');
		} else {
			$('#money').html(currentMoney);
		}
		if (bizcode == 11 || again == 'true') { //重复扫
			if (Number(totalAccountMoney) >= 1) {
				$('.notice').html('温馨提示：您的红包累计金额为' + totalAccountMoney + '元，<br>点击上方按钮把钱拿走吧！');
				$('#btn').val('立即提现');
			} else {
				if (act) {
					$('#btn').val('报名参加啤酒节');
				} else {
					$('#btn').val('查看红包余额');
				}
			}
			$('.earnTime').html(earnTime);
			$('.gettedMoney').html(currentMoney);
			$('.msg').css('display', 'none');
			$('.rescan').css('display', 'block');
			$('.cash').css('display', 'block');
		} else {
			if (Number(totalAccountMoney) >= 1) {
				$('.notice').html('温馨提示：您的红包累计金额为' + totalAccountMoney + '元，<br>点击上方按钮把钱拿走吧！');
				$('#btn').val('立即提现');
			} else {
				if (act) {
					$('#btn').val('报名参加啤酒节');
				} else {
					$('#btn').val('查看红包余额');
				}
			}
			$('.get').css('display', 'block');
			if((sessionStorage.skukey=='241510936-002'||sessionStorage.skukey=='241510936-005')&&sessionStorage.isHotAreaName=='true'){
				if(new Date().getTime()>1556553600000&&new Date().getTime()<1556985600000){
					$('#active .activeImg').attr('src', '/v/hkqp/img/20190428.png');
					$('#active .close').attr('src', '/v/hkqp/img/close_black.png');
					setTimeout(function() { //拆红包之前弹广告
						$('#active').css('display', 'block');
						$('#active .close').on('click', function(e) {
							e.stopPropagation();
							$('#active').css('display', 'none');
						});
						sessionStorage.isHotAreaName = 'false';
					}, 1000);
				}else{
					sessionStorage.isHotAreaName = 'false';
				}
			}else{
				if ((sessionStorage.hotAreaName == '三亚大区'||sessionStorage.hotAreaName == '三亚大区捆绑升级')&&skuList.indexOf(sessionStorage.skukey)!=-1&&sessionStorage.isHotAreaName=='true') {
					if ((sessionStorage.skukey == '241510936-001' || sessionStorage.skukey == '241510936-007' || sessionStorage.skukey == '241510936-004')&&sessionStorage.hotAreaName == '三亚大区捆绑升级') {
						$('#active .activeImg').attr('src', '/v/hkqp/img/20190428_sykb.png');
						$('#active .close').attr('src', '/v/hkqp/img/close_black.png');
					} else if ((sessionStorage.skukey == '241510936-006' || sessionStorage.skukey == '241510936-003')&&sessionStorage.hotAreaName == '三亚大区') {
						$('#active .activeImg').attr('src', '/v/hkqp/img/20190428_sy.png');
					}
					if(new Date().getTime()>1556553600000&&new Date().getTime()<1557849600000){
						setTimeout(function() { //拆红包之前弹广告
							$('#active').css('display', 'block');
							$('#active .close').on('click', function(e) {
								e.stopPropagation();
								$('#active').css('display', 'none');
							});
							sessionStorage.isHotAreaName = false;
						}, 1000);
					}else{
						sessionStorage.isHotAreaName = false;
					}
				} else{
					sessionStorage.isHotAreaName = false;
				}
			}
		}
	}
	var openhb = function() { //拆红包
		if(sessionStorage.isHotAreaName=='true'){
			return false;
		}
		if (sessionStorage.isPopAd == 'true') {
			console.log('openhb', sessionStorage.isPopAd);
			return false;  //广告之前禁止开红包
		}
		$('.open').unbind('click');
		if (STRCODE == 'true') { //从输入串码进入，模拟拆红包
			$('.open').addClass('kai');
			$('.open').on('animationend', function() {
				$('.get').fadeOut();
				$('.cash').fadeIn(600, cb);
			});
		} else {
			loading();
			var req = {
				"openid": openid,
				"sweepstr": sessionStorage.qr,
				"longitude": sessionStorage.longitude === undefined ? '00' : sessionStorage.longitude, //"经度"
				"latitude": sessionStorage.latitude === undefined ? '00' : sessionStorage.latitude, //"纬度"
				"projectServerName":"hainan",
			};
			$.ajax({
				type: "POST",
				url: vge.common + '/vjifenInterface/sweep/sweepQrcode',
				data: JSON.stringify(req),
				dataType: 'json',
				async: true,
				success: function(res, status, xhr) {
					console.log(res);
					loaded();
					if (res.result.code == '0') {
						var replace = PROJECT;
						switch (res.result.businessCode) {
							case '0': // 普通奖
								currentMoney = res.reply.currentMoney;
								totalAccountMoney = res.reply.totalAccountMoney;
								earnTime = res.reply.earnTime;
								sessionStorage.totalAccountMoney = res.reply.totalAccountMoney;
								sessionStorage.currentMoney = res.reply.currentMoney;
								sessionStorage.codeContentUrl = res.reply.codeContentUrl;
								sessionStorage.dayScanNum = res.reply.dayScanNum;
								sessionStorage.taoEasterEgg = res.reply.taoEasterEgg || '';
								sessionStorage.taoMemberOrderFlag = res.reply.taoMemberOrderFlag;
								init();
								$('.open').addClass('kai');
								$('.open').on('animationend', function() {
									$('.get').fadeOut();
									$('.cash').fadeIn(600, cb);
									initClipboard && initClipboard();
								});
								break;
							case '11': // 自己重复扫，普通奖
								sessionStorage.totalAccountMoney = res.reply.totalAccountMoney;
								sessionStorage.currentMoney = res.reply.currentMoney;
								sessionStorage.codeContentUrl = res.reply.codeContentUrl;
								sessionStorage.earnTime = res.reply.earnTime === undefined ? '' : res.reply.earnTime;

								sessionStorage.taoEasterEgg = res.reply.taoEasterEgg || '';
								sessionStorage.taoMemberOrderFlag = res.reply.taoMemberOrderFlag;
								location.replace('http://' + location.host + '/' + replace + '/txo/getcash?bizcode=' + res.result.businessCode);
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
							case '7': // 大奖
								sessionStorage.username = res.reply.username === undefined ? '' : res.reply.username;
								sessionStorage.phonenum = res.reply.phonenum === undefined ? '' : res.reply.phonenum;
								sessionStorage.idcard = res.reply.idcard === undefined ? '' : res.reply.idcard;
								sessionStorage.skukey = res.reply.skukey;
								sessionStorage.prizeVcode = res.reply.prizeVcode;
								sessionStorage.grandPrizeType = res.reply.grandPrizeType === undefined ? '' : res.reply.grandPrizeType;
								if (res.reply.grandPrizeType == 'P' || res.reply.grandPrizeType == 'p') {
									location.replace('http://' + location.host + '/v/' + replace + '/prize.html?bizcode=' + res.result.businessCode);
								} else {
									title_tip('尊敬的用户', '扫码异常！', '我知道了');
								}
								break;
							case '15': //他人重复扫大奖
								sessionStorage.grandPrizeType = res.reply.grandPrizeType === undefined ? '' : res.reply.grandPrizeType;
								sessionStorage.earnTime = res.reply.earnTime === undefined ? '' : res.reply.earnTime; //扫码时间
								location.replace('http://' + location.host + '/v/' + replace + '/prize.html?bizcode=' + res.result.businessCode);
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
					console.log(res);
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				}
			});
		}
	}

	function cb() {
		if (act && sessionStorage.dayScanNum == '1') {
			// setTimeout(function () {
			//     document.getElementById('active').style.display = 'block';
			//     document.getElementById('active').addEventListener('click', function () {
			//         document.getElementById('active').style.display = 'none';
			//     }, false);
			// }, 800);
		}
	}

	var loading = function() {
		$('#loading').css('display', 'block');
	}
	var loaded = function() {
		$('#loading').css('display', 'none');
	}
	var give_spack = function() {
		var url = SPACK_PORT;
		var req = {
			"openid": openid,
			"hbopenid": hbopenid,
			"projectServerName":"hainan",
		}
		$.ajax({
			type: "POST",
			url: url,
			data: JSON.stringify(req),
			dataType: 'json',
			success: function(res, status, xhr) {
				console.log(res);
				loaded();
				if (res.result.code == '0') {
					if (res.result.businessCode === '0') {
						$('.mask').css('display', 'block');
						tx = false;
					} else if (res.result.businessCode === '1') { //1
						title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
						tx = true;
					} else if (res.result.businessCode === '2') { //1
						title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
						tx = true;
					} else if (res.result.businessCode === '4') { //1
						title_tip('提现处理中，请稍后查看详细记录', '我知道了');
						tx = true;
					} else if (res.result.businessCode === '3') { //1
						title_tip('尊敬的用户',
							'<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>',
							'我知道了');
						tx = true;
					} else if (res.result.businessCode === '-1') { //-1
						title_tip('提 示', '系统升级中...', '我知道了');
						tx = true;
					} else if (res.result.businessCode === '-2') { //-1
						title_tip('提 示', '提现操作过于频繁', '我知道了');
						tx = true;
					} else if (res.result.businessCode === '5') { //5
						title_tip('尊敬的用户', res.result.msg, '我知道了');
						tx = true;
					} else {
						title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
						tx = true;
					}
				} else if (res.result.code == '-1') { //code!='0'
					title_tip('尊敬的用户', '系统升级中...', '我知道了');
					tx = true;
				} else {
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
					tx = true;
				}
			},
			error: function(res, status, xhr) {
				console.log(res);
				title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				tx = true;
			}
		});
	}
	/* 判断关注 */
	var ifremeber = function() {
		var req = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + APPID;
		vge.ajxget(req, 5000, function(r) {
			try {
				var o = JSON.parse(r);
				if (o.subscribe == '0') { //未关注
					window.location.replace('http://' + location.host + '/v/' + PROJECT + '/attention.html');
				} else { //已关注用户
					window.location.replace('http://' + location.host + '/' + PROJECT + '/too/mybag');
				}
			} catch (e) {
				vge.clog('errmsg', [req, e]);
			}
		}, function(err) {
			vge.clog('errmsg', [req, err]);
		});
	}

	
	window.onload = function() {
		ini_wxshare(vge.hkqpappid);
		// 隐藏微信右上角菜单
		wx.ready(function() {
			wx.hideOptionMenu();
		});
		init();
		//开红包
		$('.open').on('click', function() {
			openhb();
			sessionStorage.again = true;
		});
		//活动规则
		$('.rule').on('click', function() {
			window.location.href = RULE_URL;
		});
		//隐私说明
		$('.explain').on('click', function() {
			window.location.href = EXPLAIN_URL;
		});
		//提现成功后判断关注
		$('.mask').on('click', function() {
			$('.mask').css('display', 'none');
			ifremeber();
		});
		$('#btn').on('click', function() {
			if (Number(totalAccountMoney) >= 1) {
				if (tx) {
					tx = false;
					loading();
					give_spack();
				}
			} else {
				if (act) {
					window.location.replace('http://' + location.host + '/v/' + PROJECT + '/attention.html');
				} else {
					ifremeber();
				}
			}
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
	if (bizcode == 11 || again == 'true') {
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

})();
