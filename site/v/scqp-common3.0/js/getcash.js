(function() {
	'use strict';
	window.onload = function() {
		var SPACK_PORT = vge.common+ '/vjifenInterface/gifts/getGiftspack'; //提现接口
		var APPID = vge.scqpappid;
		var PROJECT = 'scqp-common3.0';
		var RULE_URL =
			'https://mp.weixin.qq.com/s?__biz=MzU4MTAyOTg2OQ==&mid=100000004&idx=1&sn=dbc8298a8e40f7026ffc7e8352fe897d&chksm=7d4c9b864a3b1290652776ae780a8998740cea36072ce58b9e0a838d06ec32e0234e9622d62e#rd';
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
			}
		}
		if (Number(totalAccountMoney) >= 1) {
			$('.notice').html('温馨提示：您的红包累计金额为' + totalAccountMoney + '元，<br>点击上方按钮把钱拿走吧！');
			$('#btn').val('立即提现');
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
				initClipboard && initClipboard();
				// setTimeout(() => {
				// 	$('.liantong').css('display', 'block');
				// }, 1000);

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
				if (tx) {
					tx = false;
					$('#loading').css('display', 'block');
					give_spack();
				}
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
			var req = { "projectServerName": "sichuan",
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


		// 送酒上门按钮
		addNewBtn();
		function addNewBtn() {
			var targetUrl = '';
			var city = sessionStorage.city;
			var cities = ['成都市', '自贡市', '攀枝花市', '泸州市', '德阳市', '绵阳市', '遂宁市', '内江市', '乐山市', '眉山市', '宜宾市', '达州市', '凉山彝族自治州', '甘孜藏族自治州'];
			var urls = [
				['成都市', 'http://smp.tsingtao.com.cn/yhb/#/buy2c?areacode=291182'],
				['自贡市', 'http://smp.tsingtao.com.cn/yhb/#/buy2c?areacode=291203'],
				['攀枝花市', 'http://smp.tsingtao.com.cn/yhb/#/buy2c?areacode=291211'],
				['泸州市', 'http://smp.tsingtao.com.cn/yhb/#/buy2c?areacode=291218'],
				['德阳市', 'http://smp.tsingtao.com.cn/yhb/#/buy2c?areacode=291227'],
				['绵阳市', 'http://smp.tsingtao.com.cn/yhb/#/buy2c?areacode=291235'],
				['遂宁市', 'http://smp.tsingtao.com.cn/yhb/#/buy2c?areacode=291255'],
				['内江市', 'http://smp.tsingtao.com.cn/yhb/#/buy2c?areacode=291262'],
				['乐山市', 'http://smp.tsingtao.com.cn/yhb/#/buy2c?areacode=291269'],
				['眉山市', 'http://smp.tsingtao.com.cn/yhb/#/buy2c?areacode=291293'],
				['宜宾市', 'http://smp.tsingtao.com.cn/yhb/#/buy2c?areacode=291301'],
				['达州市', 'http://smp.tsingtao.com.cn/yhb/#/buy2c?areacode=291320'],
				['凉山彝族自治州', 'http://smp.tsingtao.com.cn/yhb/#/buy2c?areacode=291384'],
				['甘孜藏族自治州', 'http://smp.tsingtao.com.cn/yhb/#/buy2c?areacode=291365'],
			];
			if (cities.indexOf(city) !== -1) {
				targetUrl = urls[cities.indexOf(city)][1];
			}
			if (targetUrl) {
				$('#btn-to-home').css('display', 'block');
				$('#btn-to-home').click(function () { 
					setTimeout(function () {
						window.location.href = targetUrl;
					}, 10);
					_hmt.push(['_trackEvent', 'click', '领取红包页', '点击送酒上门按钮-四川']);
				})
			}
		}


		/***********618彩蛋***********/
		console.log(isInTimeRange && isInTimeRange(), 'specialDialog');

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
			if (Number(dayScanNum) !== Number(dayScanNum) || dayScanNum > 3) {
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
