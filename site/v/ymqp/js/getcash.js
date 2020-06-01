(function() {

	var dom_shrimp = document.getElementsByClassName('shrimp')[0],
		dom_bear = document.getElementsByClassName('bear')[0],
		dom_sausage = document.getElementsByClassName('sausage')[0],
		dom_cup = document.getElementsByClassName('cup')[0],
		dom_cupmask = document.getElementsByClassName('cupmask')[0],
		dom_hb = document.getElementsByClassName('hb')[0],
		dom_hb2 = document.getElementsByClassName('hb')[1],
		dom_repcash = document.getElementsByClassName('repcash')[0],
		dom_cash = document.getElementById('cash'),
		dom_get = document.getElementById('get'),
		dom_mask = document.getElementById('mask'),
		dom_btn = document.getElementById('btn'),
		dom_title = document.getElementById('title'),
		dom_money = document.getElementById('money'),
		dom_pic = document.getElementsByClassName('pic')[0],
		dom_loading = document.getElementsByClassName('loading')[0],
		dom_notice = document.getElementsByClassName('notice')[0],
		dom_food = document.getElementsByClassName('food')[0],
		dom_rule = document.getElementsByClassName('rule')[0],
		dom_close = document.getElementsByClassName('close')[0],
		dom_mask2 = document.getElementsByClassName('mask')[0],
		dom_game = document.getElementsByClassName('game')[0];

	var currentMoney = sessionStorage.currentMoney,
		totalAccountMoney = sessionStorage.totalAccountMoney,
		codeContentUrl = sessionStorage.codeContentUrl,
		openid = sessionStorage.openid,
		args = vge.urlparse(location.href),
		bizcode = args.bizcode,
		hbopenid = args.openid,
		first = sessionStorage.first === undefined ? true : sessionStorage.first;

	var flag = true,
		num = 1,
		tx = false;
	var timer = null,
		timer1 = null,
		timer2 = null,
		timer3 = null,
		act = false,
		needAlert = false; //needAlert 弹窗开关 act活动那个推广开关    
	if (sessionStorage.bizcode){
		bizcode = sessionStorage.bizcode;
	}
	
	//签到相关
	var weekSignFlag = sessionStorage.weekSignFlag === 'undefined' ? '0' : sessionStorage.weekSignFlag, //是否开户自然周签到，1:开启、0或空:关闭
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


	function active() {
		if(Number(totalAccountMoney) >= 1) { //大于1元可以提现
			dom_btn.addEventListener('click',myclick, false);
            function myclick(){
                dom_btn.removeEventListener('click',myclick,false);
                setTimeout(function(){
                    dom_btn.addEventListener('click',myclick, false);
                }, 1500);
				if(!tx) {
                    tx = true;
					dom_loading.style.display = 'block';
					if(new Date().getTime()<new Date(2019,6,1).getTime()){
						give_spack();
					}else{
						title_tip('提 示', '活动已截止！', '我知道了');
					}
				} else {
					ifremeber(); //判断关注
				}
            }
		} else { //小于1元不能提现
			dom_btn.addEventListener('click', function() {
				ifremeber(); //判断关注
			}, false);
		}

		dom_game.addEventListener('click', function() {
			location.href = 'http://' + location.host + '/v/ymqp/game/index.html';
		}, false);
	}


	setTimeout(function() {
		dom_food.addEventListener('click', function() {
			dom_get.style.display = 'block';
			dom_cash.style.display = 'none';
			sessionStorage.bizcode = 11;
			clearInterval(timer1);
			if(weekSignFlag == 1) { //签到开启
				timer3 = setTimeout(function() {
					$('.sign_logo').css('display', 'block'); //签到按钮
					if(weekSignEarnFlag == 1) { //已领取
						$('.sign_title').attr('src', '/v/qpzj/img2/sign_title_2.png');
						$('.sign_logo').css({
							'background': 'url(/v/qpzj/img2/sign_ed.png) no-repeat right',
							'-webkit-background-size': ' auto 100%'
						});
					} else {
						$('.light').css('visibility', 'visible');
						$('#weekSignEarnMoney').css('display', 'none');
						$('.sign_tip').html('本周签到达' + weekSignLimitDay + '天，可额外获得红包1个！');
						$('.sign_cash').css({
							'background': 'url(/v/qpzj/img2/sign_cash.png) no-repeat bottom',
							'-webkit-background-size': '100% auto'
						});
					}
					if(needAlert){
						setTimeout(function(){
							$('.sign_logo').on('click', function() {
								$('#sign,.content').css('display', 'block');
							});
						},1500);
					}else{
						$('.sign_logo').on('click', function() {
							$('#sign,.content').css('display', 'block');
						});	
					}
					
					$('.sign_alert').on('click', function() { //签到天数提醒
						$(this).css('display', 'none');
						$('.content').css('display', 'block');
					});
					$('.close').on('click', function() {
						$('#sign').css('display', 'none');
					});
				}, 1000);
			}
			if(needAlert) { //需要弹窗推广
				timer2 = setTimeout(function() {
					active();
					if(weekSignPopup == 1 && weekSignEarnFlag != 1) { //每天首次 且未领取签到红包就会弹出提示
						if(weekSignEarnFlag == 2) {
							$('#sign,.getSignCash').css('display', 'block');
							$('.getSignCash').on('click', function() {
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
						//					document.getElementById('alert').style.display = 'block';
						//				 	document.getElementsByClassName('qrClose')[0].addEventListener('click',function(){
						//				 		document.getElementById('alert').style.display = 'none';
						//				 	},false);
					}
				}, 2500);
			} else {
				active();
			}
		}, true);
	}, 3500);


	if(bizcode == 0) {
		//进度条
		$('.progress').html((weekSignLimitDay - weekSignDiffDay) + '/' + weekSignLimitDay);
		$('#progress').css('width', weekSignPercent * 7.8 / 100 + 'rem');
		$('.days').html(weekSignLimitDay - weekSignDiffDay + '天');
		$('#weekSignEarnMoney').html(weekSignEarnMoney + '元');
		$('.weekSignEarnMoney').html('<span>' + weekSignEarnMoney + '</span>元');

		if(weekSignDays != '') {
			weekSignDays = weekSignDays.split(',').sort();
		}
		if(weekSignDays.length > 0) {
			for(var i = 0; i < weekSignDays[weekSignDays.length - 1]; i++) { //打叉
				document.getElementsByClassName('checks')[i].style.backgroundImage = 'url(/v/sxqp/img2/frok.png)';
			}
		}
		for(var j = 0; j < weekSignDays.length; j++) { //打√
			document.getElementsByClassName('checks')[weekSignDays[j] - 1].style.backgroundImage = 'url(/v/sxqp/img2/check.png)';
		}

	}

    // 页面展示
	// dom_pic.src = codeContentUrl;
	dom_money.innerHTML = currentMoney;
	if(bizcode == 11) { //重复扫或刷新
		dom_get.style.display = 'block';
		dom_repcash.style.display = 'block';
		active();
	} else { //第一次扫
		dom_cash.style.display = 'block';
		// 动画
		dom_sausage.className = 'sausage shake';
		var timer1 = setInterval(function() {
			if(flag) {
				dom_shrimp.src = 'http://' + location.host + '/v/ymqp/img/shrimp2.png';
				flag = false;
			} else {
				dom_shrimp.src = 'http://' + location.host + '/v/ymqp/img/shrimp1.png';
				flag = true;
			}
		}, 600);

		setTimeout(function() {
			dom_bear.className = 'bear active';
		}, 1200);

		setTimeout(function() {
			var timer2 = setInterval(function() {
				dom_cup.src = 'http://' + location.host + '/v/ymqp/img/cup' + num + '.png';
				num++;
				if(num == 5) {
					clearInterval(timer2);
					setTimeout(function() {
						dom_bear.className = 'bear back';
						dom_sausage.className = 'sausage';
						dom_cupmask.style.display = 'block';
						dom_hb.style.display = 'block';
						dom_hb.className = 'hb hb_move';
					}, 200);
				}
			}, 300);
		}, 2000);
	}

	if(Number(currentMoney) == 0) { //中奖金额为0
		dom_hb2.src = 'http://' + location.host + '/v/ymqp/img/zero.png';
		dom_repcash.style.display = 'none';
		dom_title.style.display = 'none';
		dom_pic.style.display = 'none';
		dom_hb2.style.width = '75%';
		dom_hb2.style.marginTop = '1.5rem';
	}else if(Number(currentMoney) == 0.1){
        dom_pic.src = codeContentUrl;
    }else{
        dom_pic.src = '/v/ymqp/img/pic6.png';
    }

	if(Number(totalAccountMoney) >= 1) { //大于1元可以提现
		if(bizcode == 11) {
			dom_notice.innerHTML = '<span style="color:#e3c931">扫码时间:</span>' + sessionStorage.earnTime;
		} else {
			dom_notice.innerHTML = '温馨提示：您的红包累计金额为' + totalAccountMoney + '元，点击上方按钮把钱拿走吧！'
		}
		dom_btn.value = '立即提现';
	} else { //小于1元不能提现
		if(bizcode == 11) {
			dom_notice.innerHTML = '<span style="color:#e3c931">扫码时间:</span>' + sessionStorage.earnTime;
		}
		dom_btn.value = '存入我的零钱包';
	}

	dom_mask.addEventListener('click', function() {
		ifremeber(); //判断关注
	}, false);

	function give_spack() { //提现
		var javai = vge.ymqp + '/DBTXYMQPInterface/gifts/getGiftspack';
		var req = {
			"openid": openid,
			"hbopenid": hbopenid
		};
		vge.callJApi(javai, req,
			function(jo) {
				active();
				dom_loading.style.display = 'none';
				if(jo.result.code == '0') {
					if(jo.result.businessCode === '0') {
						dom_mask.style.display = 'block';
						tx = true;
					} else if(jo.result.businessCode === '1') { //1
						title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
					} else if(jo.result.businessCode === '2') { //1
						title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
					} else if(jo.result.businessCode === '4') { //1
						title_tip('提现处理中，请稍后查看详细记录', '我知道了');
					} else if(jo.result.businessCode === '3') { //1
						title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
					} else if(jo.result.businessCode === '-1') { //-1
						title_tip('提 示', '提现操作过于频繁', '我知道了');
					} else if(jo.result.businessCode === '-2') { //-1
						title_tip('提 示', '提现操作过于频繁', '我知道了');
					} else if(jo.result.businessCode === '5') { //5
						title_tip('尊敬的用户', jo.result.msg, '我知道了');
					} else {
						title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
					}
				} else if(jo.result.code == '-1') {
					title_tip('尊敬的用户', '系统升级中...', '我知道了');
				} else { //code!='0'
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				}
			});
	}

	function ifremeber() {
		var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.ymqpappid;
		vge.ajxget(requrl, 5000, function(r) {
			try {
				var o = JSON.parse(r);
				if(o.subscribe == '0') { //未关注
					active();
					dom_mask.style.display = 'none';
					window.location.replace('http://' + location.host + '/v/ymqp/attention.html');
				} else { //已关注用户
					active();
					dom_mask.style.display = 'none';
					window.location.replace('http://' + location.host + '/ymqp/too/mybag');
				}
			} catch(e) {
				vge.clog('errmsg', [requrl, e]);
			}
		}, function(err) {
			vge.clog('errmsg', [requrl, err]);
		});
	}

	dom_rule.addEventListener('click', function() {
		window.location.href = 'http://mp.weixin.qq.com/s/CuHmysSQf_QDhvcJvljOpQ';
	}, false);

})();