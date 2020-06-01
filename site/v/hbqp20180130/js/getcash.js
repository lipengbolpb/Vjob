(function() {
	'use strict';
	ini_wxshare(vge.hbqpappid);
	/* 定义各项参数 */
	var currentMoney = sessionStorage.currentMoney,
		totalAccountMoney = sessionStorage.totalAccountMoney,
		codeContentUrl = sessionStorage.codeContentUrl,
		earnTime = sessionStorage.earnTime,
		openid = sessionStorage.openid,
		args = vge.urlparse(location.href),
		bizcode = args.bizcode,
		hbopenid = args.openid,
		tx = true,
		act = true,
		needAlert = false,
		repflag = true,
		disabled = true,
		again = sessionStorage.again === 'undefined' ? false : sessionStorage.again,
		activityVersion = sessionStorage.activityVersion === 'undefined' ? '' : sessionStorage.activityVersion,
		weekSignFlag = sessionStorage.weekSignFlag === 'undefined' ? '0' : sessionStorage.weekSignFlag, //是否开户自然周签到，1:开启、0或空:关闭
		weekSignDays = sessionStorage.weekSignDays === 'undefined' ? '' : sessionStorage.weekSignDays, //当前周已签到周几集合
		weekSignEarnFlag = sessionStorage.weekSignEarnFlag === 'undefined' ? '0' : sessionStorage.weekSignEarnFlag, //周签到红包是否已领取，1:已领取、0未领取  2领取签到红包
		weekSignEarnMoney = sessionStorage.weekSignEarnMoney === 'undefined' ? '' : sessionStorage.weekSignEarnMoney, //周签到红包金额
		weekSignLimitDay = sessionStorage.weekSignLimitDay === 'undefined' ? '' : sessionStorage.weekSignLimitDay, //周签到天数限制
		weekSignDiffDay = sessionStorage.weekSignDiffDay === 'undefined' ? '' : sessionStorage.weekSignDiffDay, //周签到还差天数
		weekSignPopup = sessionStorage.weekSignPopup === 'undefined' ? '' : sessionStorage.weekSignPopup, //自然周签到弹出提示，1:弹出提示、0或空:不弹出"
		weekSignPercent = sessionStorage.weekSignPercent === 'undefined' ? '' : sessionStorage.weekSignPercent; //周签到完成百分比
	if((weekSignPopup == 1 && weekSignEarnFlag != 1) || act == true) {
		needAlert = true;
	}

	$('.canvas_money').css({'height':$('.canvas_money').width() * 0.55+'px','line-height':$('.canvas_money').width() * 0.55+'px'});

	var params = {
		APPID: vge.hbqpappid, //公众号appid
		PROJECT: 'hbqp20180130', //项目名称
		SPACK_PORT: vge.hbqp + '/DBTHBQPInterface/gifts/getGiftspack', //提现接口
		RULE_URL: 'https://mp.weixin.qq.com/s?__biz=MzI5NjQ4MDMyNg==&mid=100000434&idx=1&sn=574cee8ee7b46fa52c563439160dc897&chksm=6c42f99b5b35708d3fe2102900fa421ca67df4bdb7ed084f6fa524da5b60fd337b678a7824a8#rd', //活动规则
		EXPLAIN_URL: 'http://mp.weixin.qq.com/s?__biz=MzI5NjQ4MDMyNg==&mid=100000006&idx=1&sn=ccd140506a659b0e2b9d43f841d5d25f&chksm=6c42fa2f5b357339732e51b3efda6b91ebd3065f40b323d578ad8fffa68c8044664a7a6c8175#rd' //隐私说明
	}
	var skukeyList = ['241510936-001', '241510936-003', '241510936-005', '241510936-008', '241510936-010', '241510936-011'];

	var animate = {
		fireup: function() { //烟火升空
			$('.home-fireRight').addClass('fireupRight');
			$('.home-fireLeft').addClass('fireupLeft');
		},
		fireblast: function() { //烟火爆炸
			$('.home-blastRight').addClass('fireblastRight');
			$('.home-blastLeft').addClass('fireblastLeft');
		},
		showGet: function() { //显示拆红包页
			$('.home').fadeOut();
			$('.get').fadeIn();
		},
		kai: function() { //点击开按钮
			$('.open').addClass('kai');
			$('.open').on('animationend', function() {
				$('.get').fadeOut(600);
				$('.cash').fadeIn(600,function(){
					$('.logo1').css('opacity',0);
				});
				$('#jw_icon').css('display','block');
				sign.signInit();
				sign.signOpen();
			});
		},
		launch: function() { //对联展开
			$('.coupletMaskLeft').addClass('launch');
			setTimeout(function() {
				$('.coupletMaskRight').addClass('launch');
			}, 800);
		},
		loading: function() {
			$('#loading').css('display', 'block');
		},
		loaded: function() {
			$('#loading').css('display', 'none');
		}
	}
	var sign = {
		signInit: function() {
			if(bizcode == 0) {
				//进度条
				$('.progress').html((weekSignLimitDay - weekSignDiffDay) + '/' + weekSignLimitDay);
				$('#progress2').css('width', weekSignPercent * 7.8 / 100 + 'rem');
				$('.days').html(weekSignLimitDay - weekSignDiffDay + '天');
				$('#weekSignEarnMoney').html(weekSignEarnMoney + '元');
				$('.weekSignEarnMoney').html('<span>' + weekSignEarnMoney + '</span>元');

				if(weekSignDays != '') {
					weekSignDays = weekSignDays.split(',').sort();
				}
				var weeks = new Date();
				weeks = (weeks.getDay() + 6) % 7;
				for(var i = 0; i < weeks; i++) { //打钩打叉
					document.getElementsByClassName('checks')[i].style.backgroundImage = 'url(/v/' + params.PROJECT + '/img2/frok.png)';
				}
				for(var j = 0; j < weekSignDays.length; j++) { //打√
					document.getElementsByClassName('checks')[weekSignDays[j] - 1].style.backgroundImage = 'url(/v/' + params.PROJECT + '/img2/check.png)';
				}
			}
		},
		signOpen: function() {
			if(weekSignFlag == 1) { //签到开启
				setTimeout(function() {
					$('.sign_logo').css('display', 'block'); //签到按钮
					if(weekSignEarnFlag == 1) { //已领取
						$('.sign_title').attr('src', '/v/' + params.PROJECT + '/img2/sign_title_2.png');
						$('.sign_logo').css({
							'background': 'url(/v/' + params.PROJECT + '/img2/sign_ed.png) no-repeat right',
							'-webkit-background-size': ' auto 100%'
						});
					} else {
						$('.light').css('visibility', 'visible');
						$('#weekSignEarnMoney').css('display', 'none');
						$('.sign_tip').html('本周签到达' + weekSignLimitDay + '天，可额外获得红包1个！');
						$('.sign_cash').css({
							'background': 'url(/v/' + params.PROJECT + '/img2/sign_cash.png) no-repeat bottom',
							'-webkit-background-size': '100% auto'
						});
					}
					$('.sign_logo').on('touchstart', function() {
						$('#sign,.content').css('display', 'block');
					});
					$('.sign_alert').on('touchstart', function() { //签到天数提醒
						$('.sign_alert').css('display', 'none');
						$('.content').css('display', 'block');
					});
					$('.close').on('touchstart', function() {
						$('#sign').css('display', 'none');
					});
				}, 700);
			}
			if(needAlert) { //需要弹窗推广
				setTimeout(function() {
					if(weekSignPopup == 1 && weekSignEarnFlag != 1) { //每天首次 且未领取签到红包就会弹出提示
						if(weekSignEarnFlag == 2) {
							$('#sign,.getSignCash').css('display', 'block');
							$('.getSignCash').on('touchstart', function() {
								weekSignEarnFlag = '1';
								$('#sign,.light,.getSignCash').css('display', 'none');
								$('.content').css('display', 'block');
								$('.sign_title').attr('src', '/v/qpzj/img2/sign_title_2.png');
								$('.sign_logo').css({
									'background': 'url(/v/qpzj/img2/sign_ed.png) no-repeat right',
									'-webkit-background-size': ' auto 100%'
								});
								$('.sign_tip,#weekSignEarnMoney').css('display', 'block');
								$('.sign_cash').css({
									'background': 'url(/v/qpzj/img2/sign_cash_open.png) no-repeat bottom',
									'-webkit-background-size': '100% auto'
								});
							});
						} else {
							$('#sign,.sign_alert').css('display', 'block');
						}
					} else { //活动推送（手动）
						$('#active').css({
							'display': 'block',
							'opacity': 1
						});
						document.getElementById('active').addEventListener('touchstart', function() {
							document.getElementById('active').style.display = 'none';
						}, false);
					}
				}, 600);
			}
		}
	}
	//页面初始化
	var init = function() {
		if(Number(currentMoney) == 0) { //中奖金额为0
			$('.congratulate').html('离红包只差一点点<br>再扫一瓶试试');
			$('.congratulate').css({
				'margin': '2rem auto 0',
				'fontSize': '1rem'
			});
			$('.prize').css('display', 'none');
		} else {
			$('#money').html(currentMoney);
		}

		if(bizcode == 11 || again == 'true') { //重复扫
			disabled = false;
			$('#jw_icon').css('display','block');
			if(Number(totalAccountMoney) >= 1) {
				// $('.notice').html('温馨提示：您的红包累计金额为' + totalAccountMoney + '元，<br>点击上方按钮把钱拿走吧！');
				$('#btn').val('立即提现');
				$('#repbtn').val('立即提现');
			} else {
				$('#btn').val('查看红包余额');
				$('#repbtn').val('查看红包余额');
			}
			$('.repcash').css('display', 'block');
			if(sessionStorage.earnTime == '') {
				$('.earn').html('您已扫过这瓶酒<br>并获得<span class="earnMoney">¥' + currentMoney + '元</span>');
			} else {
				$('.earn').html('您已于<span class="earnTime">' + earnTime + '</span>扫过这瓶酒<br>并获得<span class="earnMoney">¥' + currentMoney + '元</span>');
			}
		} else {
			var per = Math.floor(Math.random() * 9 + 1) / 10, //控制随机区间0.1-0.9
				cur = 0,
				cav = 0,
				com = 0;
			if(skukeyList.indexOf(sessionStorage.skukey) != -1) {
				per = 0.9;
			}
			cur = (currentMoney * per).toFixed(2);
			cav = (currentMoney - cur).toFixed(2);
			if(cur <= 0.1 && cav <= 0.1) {
				cur = currentMoney;
				$('.canvas_money').html('谢谢惠顾');
			} else if(cur <= 0.1 && cav > 0.1) {
				com = cur;
				cur = cav;
				cav = com;
				$('#canvas_money').text(cav);
			} else if(cur > 0.1 && cav <= 0.1) {
				$('#canvas_money').text(cav);
			} else {
				$('#canvas_money').text(cav);
			}
			$('#money').html(cur);
			$('.totalMoney span').text(currentMoney);
			if(currentMoney == 0) {
				$('.getmoney').html('离红包只差一点点~');
				$('.totalMoney').html('离红包只差一点点~');
				$('#money_alert .title').css('visibility', 'hidden');
			}

			if(Number(totalAccountMoney) >= 1) {
				//			$('.notice').html('温馨提示：您的红包累计金额为' + totalAccountMoney + '元，<br>点击上方按钮把钱拿走吧！');
				$('#btn').val('立即提现');
				$('#repbtn').val('立即提现');
			} else {
				$('#btn').val('存入我的零钱包');
				$('#repbtn').val('存入我的零钱包');
			}
			$('.home').css('display', 'block');
		}

	}

	//刮刮卡
	function initCanvas() {
		var w = document.body.clientWidth * 0.546,
			h = w * 0.5;

		var c = document.getElementById('cardCanvas');
		var ctx = c.getContext('2d');
		c.width = w; //画布宽  
		c.height = h; //画布高  
		var img = new Image(); // 创建img元素
		img.src = '/v/hbqp20180130/img/canvas_mask.png'; // 设置图片源地址
		img.onload = function() {
			// 执行drawImage语句
			ctx.drawImage(img, 0, 0, w, h);
		}
		//移动端  
		c.addEventListener('touchstart', function(e) {
			disabled = false;
			var e = e || window.event;
			var x = e.touches[0].clientX - c.offsetLeft;
			var y = e.touches[0].clientY - c.offsetTop;
			ctx.moveTo(x, y);
			c.addEventListener('touchmove', gmove, false)
		}, false)
		c.addEventListener('touchend', function() {
			clearC();
		}, false)

		//PC端  
		c.addEventListener('mousedown', function(e) {
			var e = e || window.event;
			var x = e.clientX - c.offsetLeft;
			var y = e.clientY - c.offsetTop;
			ctx.moveTo(x, y)
			c.addEventListener('mousemove', gmove, false)
		}, false)
		c.addEventListener('mouseup', function() {
			clearC();
			c.removeEventListener('mousemove', gmove, false)
		}, false)

		function gmove(e) { //刮卡函数  
			if(typeof e.touches != 'undefined') {
				e = e.touches[0];
			}
			var mx = e.clientX - c.offsetLeft;
			var my = e.clientY - c.offsetTop;
			ctx.strokeStyle = "white";
			ctx.lineCap = "round"; //绘制的线结束时为圆形  
			ctx.lineJoin = "round"; //当两条线交汇时创建圆形边角  
			ctx.lineWidth = 30;
			ctx.lineTo(mx, my);
			ctx.stroke();
			ctx.globalCompositeOperation = "destination-out";
		}

		function clearC() { //刮开一定面积执行擦除画布函数  
			var data = ctx.getImageData(0, 0, c.width, c.height).data;
			for(var i = 0, j = 0; i < data.length; i += 4) { //data.length=c.width*c.heigth*4,一个像素块是一个对象RGBA四个值,A范围为0~255  
				if(data[i] && data[i + 1] && data[i + 2] && data[i + 3]) { //存在imageData对象时j加1  PS:该像素区域透明即为不存在该对象  
					j++;
				}
			}
			if(j <= c.width * c.height * 0.7) { //超过canvas面积的60%，就清除画布  
				ctx.clearRect(0, 0, c.width, c.height);
				setTimeout(function() {
					$('#money_alert').css('display', 'block');
				}, 1000);
			}
		}
	}

	/* 提现 */
	var give_spack = function() {
		var url = params.SPACK_PORT;
		var req = {
			"openid": openid,
			"hbopenid": hbopenid
		};
		$.ajax({
			type: "POST",
			url: url,
			data: JSON.stringify(req),
			dataType: 'json',
			success: function(res, status, xhr) {
				console.log(res);
				animate.loaded();
				if(res.result.code == '0') {
					if(res.result.businessCode === '0') {
						$('.mask').css('display', 'block');
						$('.sign_alert').css('display', 'none');
						tx = false;
					} else if(res.result.businessCode === '1') { //1
						title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
					} else if(res.result.businessCode === '2') { //1
						title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
					} else if(res.result.businessCode === '4') { //1
						title_tip('提现处理中，请稍后查看详细记录', '我知道了');
					} else if(res.result.businessCode === '3') { //1
						title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
					} else if(res.result.businessCode === '-1') { //-1
						title_tip('提 示', '系统升级中...', '我知道了');
					} else if(res.result.businessCode === '-2') { //-1
						title_tip('提 示', '提现操作过于频繁', '我知道了');
					} else if(res.result.businessCode === '5') { //5
						title_tip('尊敬的用户', res.result.msg, '我知道了');
					} else {
						title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
					}
				} else if(res.result.code == '-1') { //code!='0'
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
	/* 判断关注 */
	var ifremeber = function() {
		var req = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + params.APPID;
		vge.ajxget(req, 5000, function(r) {
			try {
				var o = JSON.parse(r);
				if(o.subscribe == '0') { //未关注
					window.location.replace('http://' + location.host + '/v/' + params.PROJECT + '/attention.html');
				} else { //已关注用户
					window.location.replace('http://' + location.host + '/' + params.PROJECT + '/too/mybag');
				}
			} catch(e) {
				vge.clog('errmsg', [req, e]);
			}
		}, function(err) {
			vge.clog('errmsg', [req, err]);
		});
	}

	window.onload = function() {
		//隐藏黄晓明！显示拆红包页面
		$('.home-blastLeft').on('animationend', function() {
			setTimeout(function() {
				animate.showGet();
			}, 1000);
		});
		animate.launch();
		wx.ready(function() {
			wx.hideOptionMenu(); // 隐藏微信右上角菜单
			if(bizcode == '0' && again != 'true') {
				animate.fireup();
				animate.fireblast();
//				var myaudio = document.getElementById('bgm');
//				myaudio.setAttribute('src', '/v/' + params.PROJECT + '/music/bgm.mp3?v=1');
//				myaudio.load();
//				myaudio.play();
//				myaudio.addEventListener("timeupdate", timeupdate, false);
//
//				function timeupdate() {
//					if(myaudio.currentTime !== 0 && repflag) {
//						repflag = false;
//						myaudio.removeEventListener("timeupdate", timeupdate, false);
//						animate.fireup();
//						animate.fireblast();
//
//						return;
//					}
//				}
			}
		});
		//点击开红包
		$('.open').on('touchstart', function() {
			sessionStorage.again = true;
			animate.kai();
			if(act) {
				$('#active').css({
					'display': 'block',
					'opacity': 0
				});
			}
			initCanvas();
		});
		//活动规则
		$('.rule').on('touchstart', function() {
			window.location.href = params.RULE_URL;
		});
		//隐私说明
		$('.explain').on('touchstart', function() {
			window.location.href = params.EXPLAIN_URL;
		});
		//提现成功后判断关注
		$('.mask').on('touchstart', function() {
			$('.mask').css('display', 'none');
			$('.sign_alert').css('display', 'block');
			ifremeber();
		});
		//提现按钮
		$('#btn,#repbtn').on('touchstart', function() {
			if(Number(totalAccountMoney) >= 1) {
				if(tx) {
					tx = false;
					animate.loading();
					give_spack();
				}
			} else {
				ifremeber();
			}
		});
		init();
		//酒王战绩
		$('#jw_icon').on('touchstart',function(){
			$('#jiuw_box').fadeIn(1,function(){
				$('#jiuw_box div').css('bottom','0rem');
			});
			$('#jiuw_box .close').on('touchstart',function(){
				$('#jiuw_box div').css('bottom','-11rem');
				$('#jiuw_box').fadeOut(1);
			});
		});
	}
})();