(function() {
	var dom_open = document.getElementById('open'),
		dom_cash = document.getElementsByClassName('cash')[0],
		dom_get = document.getElementsByClassName('get')[0],
		dom_tixian = document.getElementsByClassName('tixian')[0],
		dom_btn = document.getElementById('btn'),
		dom_mark = document.getElementsByClassName('mark')[0],
		dom_bike = document.getElementById('get_bike'),
		dom_sign = document.getElementsByClassName('sign')[0],
		dom_bar = document.getElementsByClassName('getbtn')[0],
		dom_money = document.getElementById('money'),
		dom_curMoney = document.getElementsByClassName('curMoney')[0],
		dom_title = document.getElementsByClassName('title')[0],
		dom_explain = document.getElementsByClassName('explain')[0],
		dom_rule = document.getElementsByClassName('rule')[0],
		dom_zhang = document.getElementsByClassName('zhang')[0],
		dom_yuan = document.getElementsByClassName('yuan')[0],
		dom_wxmark = document.getElementById('wxmark'),
		dom_notice = document.getElementById('notice');

	var openid = sessionStorage.openid === undefined ? '' : sessionStorage.openid,
		args = vge.urlparse(location.href),
		hbopenid = args.openid,
		bizcode = args.bizcode,
		currentMoney = sessionStorage.currentMoney === undefined ? '' : sessionStorage.currentMoney,
		totalAccountMoney = sessionStorage.totalAccountMoney === undefined ? '' : sessionStorage.totalAccountMoney,
		again = sessionStorage.again === undefined ? 'false' : sessionStorage.again;

	dom_curMoney.innerHTML = Number(totalAccountMoney).toFixed(2);
	dom_money.innerHTML = Number(currentMoney).toFixed(2);

	document.getElementById("scan_time").innerHTML = sessionStorage.earnTime;

	var L = 0,
		S = 0;
	var first = true,act = true;
	
	//图片切换
	if(new Date().getTime() < 1529683200000) { //6.16-6.22
		$('.active img').attr('src', '/v/hnqp20170520/img/20180616.jpg');
	} else if(new Date().getTime() > 1529683200000 && new Date().getTime() < 1530892800000) { //6.30-7.6
		$('.active img').attr('src', '/v/hnqp20170520/img/20180630.jpg');
	} else if(new Date().getTime() > 1530892800000 && new Date().getTime() < 1531670400000) { //7.13-7.15
		$('.active img').attr('src', '/v/hnqp20170520/img/20180713.jpg');
	} else if(new Date().getTime() > 1531670400000 && new Date().getTime() < 1532707200000) { //7.21-7.27
		$('.active img').attr('src', '/v/hnqp20170520/img/20180721.jpg');
	} else if(new Date().getTime() > 1532707200000 && new Date().getTime() < 1533484800000) { //8.3-8.5
		$('.active img').attr('src', '/v/hnqp20170520/img/20180803.jpg');
	} else { //8.5
		$('.active img').attr('src', '/v/hnqp20170520/img/20180803.jpg');
		act = false;
	}
	if(bizcode == 11) { //自己重复扫
		$('#jw_icon').css('display', 'block');
		dom_cash.style.display = 'none';
		dom_get.style.display = 'block';
		dom_get.style.opacity = '1';
		dom_zhang.style.display = 'block';
		if(Number(currentMoney) === 0) {
			dom_title.innerHTML = window.zeroText2();
			dom_title.style.fontSize = '1rem';
			dom_title.style.lineHeight = '1.8rem';
			dom_yuan.style.display = 'none';
		}
		var timer6 = setTimeout(move, 1000);
		dom_tixian.addEventListener('click', function() {
			if(first) {
				document.getElementById("loading_box").style.display = 'block';
				give_spack();
				first = false;
			}
		}, false);

		dom_btn.addEventListener('click', function() {
			var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.hnqpappid;
			vge.ajxget(requrl, 5000, function(r) {
				try {
					var o = JSON.parse(r);
					if(o.subscribe == 0) { //未关注
						window.location.replace('http://' + location.host + '/v/hnqp20170520/attention.html');
					} else { //已关注用户
						window.location.replace('http://' + location.host + '/hnqp20170520/too/mybag');
					}
				} catch(e) {
					vge.clog('errmsg', [requrl, e]);
				}
			}, function(err) {
				vge.clog('errmsg', [requrl, err]);
			});
		}, false);
	} else {
		dom_cash.style.display = 'block';
		dom_get.style.opacity = '0';
		dom_get.style.display = 'none';
		if(Number(currentMoney) === 0) {
			dom_title.innerHTML = window.zeroText2();
			dom_title.style.fontSize = '1rem';
			dom_title.style.lineHeight = '1.8rem';
			dom_yuan.style.display = 'none';
		}
	}

	if(Number(totalAccountMoney) >= 1) {
		dom_notice.innerHTML = '您的累计中奖金额大于等于1元啦，点击<br>立即提现按钮把钱拿走吧~';
	} else {
		dom_notice.innerHTML = '根据微信平台要求，红包累计大于等于1元后可提现，<br>不足1元的红包我们为您贴心准备了零钱包功能';
	}

	var data = {
		"openid": openid,
		"sweepstr": sessionStorage.qr,
		"longitude": sessionStorage.longitude === undefined ? '00' : sessionStorage.longitude, //"经度"
		"latitude": sessionStorage.latitude === undefined ? '00' : sessionStorage.latitude //"纬度"
	};

	//	dom_open.addEventListener('click',dot,false);
	$('#open').one('click', dot);

	function dot() {
		//		dom_open.removeEventListener('click',dot,false);
		document.getElementById("loading_box").style.display = 'block';
		//		sweep();
		$.ajax({
			type: "post",
			url: vge.hnqp + '/DBTHuaNQPInterface/sweep/sweepQrcode',
			async: true,
			data: JSON.stringify(data),
			success: function(jo) {
				cb(jo);
			}
		});

	}

	function cb(jo) {
		if(jo.result.code == '0') {
			$('#jw_icon').css('display', 'block');
			document.getElementById("loading_box").style.display = 'none';
			if(jo.reply) {
				sessionStorage.earnTime = jo.reply.earnTime;
				totalAccountMoney = jo.reply.totalAccountMoney;
				currentMoney = jo.reply.currentMoney;
			}
			dom_curMoney.innerHTML = Number(totalAccountMoney).toFixed(2);
			dom_money.innerHTML = Number(currentMoney).toFixed(2);
			if(Number(currentMoney) === 0) {
				dom_title.innerHTML = window.zeroText2();
				dom_title.style.fontSize = '1rem';
				dom_title.style.lineHeight = '1.8rem';
				dom_yuan.style.display = 'none';
			} else {
				dom_money.innerHTML = Number(currentMoney).toFixed(2);
			}
			if(Number(totalAccountMoney) >= 1) {
				dom_notice.innerHTML = '您的累计中奖金额大于等于1元啦，点击<br>立即提现按钮把钱拿走吧~';
			} else {
				dom_notice.innerHTML = '根据微信平台要求，红包累计大于等于1元后可提现，<br>不足1元的红包我们为您贴心准备了零钱包功能';
			}

			switch(jo.result.businessCode) {
				case '0': // 普通奖
					$('#open').one('click', dot);
					sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
					sessionStorage.currentMoney = jo.reply.currentMoney;
					sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
					sessionStorage.dayScanNum = jo.reply.dayScanNum;
					dom_cash.style.display = 'none';
					dom_get.style.display = 'block';
					dom_get.style.opacity = '1';
					if(again == 'true') {
						window.location.href = 'http://' + location.host + '/v/hnqp20170520/fail.html?bizcode=2';
					} else {
						sessionStorage.again = 'true';
					}
					var timer7 = setTimeout(move, 1000);
					dom_tixian.addEventListener('click', function() {
						if(first) {
							document.getElementById("loading_box").style.display = 'block';
							give_spack();
							first = false;
						}
					}, false);

					dom_btn.addEventListener('click', function() {
						var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.hnqpappid;
						vge.ajxget(requrl, 5000, function(r) {
							try {
								var o = JSON.parse(r);
								if(o.subscribe == 0) { //未关注
									window.location.replace('http://' + location.host + '/v/hnqp20170520/attention.html');
								} else { //已关注用户
									window.location.replace('http://' + location.host + '/hnqp20170520/too/mybag');
								}
							} catch(e) {
								vge.clog('errmsg', [requrl, e]);
							}
						}, function(err) {
							vge.clog('errmsg', [requrl, err]);
						});
					}, false);
					//广告页
					if(act&&sessionStorage.dayScanNum=='1') {
						var timer8 = setTimeout(function() {
							$('.active').css('display', 'block');
							$('.active').on('click', events);
						}, 1500);
					}else{
						events();
					}
					break;
				case '11': // 自己重复扫，普通奖
					location.replace('http://' + location.host + '/v/hnqp20170520/getcash.html?bizcode=' + jo.result.businessCode);
					break;
				case '12': // 可疑
					location.replace('http://' + location.host + '/v/hnqp20170520/getMsg.html?bizcode=' + jo.result.businessCode);
					break;
				case '13': // 黑名单
					location.replace('http://' + location.host + '/v/hnqp20170520/getMsg.html?bizcode=' + jo.result.businessCode);
					break;
				case '14': // 指定
					location.replace('http://' + location.host + '/v/hnqp20170520/getMsg.html?bizcode=' + jo.result.businessCode);
					break;
				case '7': // 大奖
                    sessionStorage.username = jo.reply.username === undefined ? '' : jo.reply.username;
                    sessionStorage.phonenum = jo.reply.phonenum === undefined ? '' : jo.reply.phonenum;
                    sessionStorage.idcard = jo.reply.idcard === undefined ? '' : jo.reply.idcard;
                    sessionStorage.skukey = jo.reply.skukey;
                    sessionStorage.prizeVcode = jo.reply.prizeVcode;
                	sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    location.replace('http://' + location.host + '/v/hnqp20170520/prize.html?bizcode=' + jo.result.businessCode);
                    break;
                case '15': //他人重复扫大奖
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                	sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
                    location.replace('http://' + location.host + '/v/hnqp20170520/prize.html?bizcode=' + jo.result.businessCode);
                    break;   	
				default:
					if(jo.reply) {
						sessionStorage.batchName = jo.reply.batchName === undefined ? '' : jo.reply.batchName;
					}
					sessionStorage.msg = jo.result.msg;
					location.replace('http://' + location.host + '/v/hnqp20170520/fail.html?bizcode=' + jo.result.businessCode);
			}

		} else if(jo.result.code == '-1') {
			title_tip('尊敬的用户', '系统升级中，请稍后再试！', '我知道了');
		} else {
			title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
		}
	}

	function events() {
		$('.active').css('display', 'none');
		dom_tixian.addEventListener('click', function() {
			if(first) {
				document.getElementById("loading_box").style.display = 'block';
				give_spack();
				first = false;
			}
		}, false);

		dom_btn.addEventListener('click', function() {
			var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.hnqpappid;
			vge.ajxget(requrl, 5000, function(r) {
				try {
					var o = JSON.parse(r);
					if(o.subscribe == 0) { //未关注
						window.location.replace('http://' + location.host + '/v/hnqp20170520/attention.html');
					} else { //已关注用户
						window.location.replace('http://' + location.host + '/hnqp20170520/too/mybag');
					}
				} catch(e) {
					vge.clog('errmsg', [requrl, e]);
				}
			}, function(err) {
				vge.clog('errmsg', [requrl, err]);
			});
		}, false);
	}

	//酒王战绩
	$('#jw_icon').on('touchstart', function() {
		$('#jiuw_box').fadeIn(1, function() {
			$('#jiuw_box div').css('bottom', '0rem');
		});
		$('#jiuw_box .close').on('touchstart', function() {
			$('#jiuw_box div').css('bottom', '-11rem');
			$('#jiuw_box').fadeOut(1);
		});
	});

	function move() {
		if(totalAccountMoney * 100 > 88) {
			L = 88;
			S = 88;
		} else {
			L = totalAccountMoney * 100;
			S = totalAccountMoney * 100;
		}
		dom_tixian.style.width = L + "%";
		dom_bike.style.left = S - 7 + "%";
		dom_sign.style.left = S - 7 + "%";
		setTimeout(function() {
			if(totalAccountMoney * 100 >= 100) {
				L = 100;
				dom_tixian.style.width = L + "%";
				dom_tixian.style.transition = "all 0.2s linear";
				setTimeout(function() {
					dom_tixian.disabled = false;
					dom_tixian.value = '立即提现';
					dom_mark.style.display = 'none';
				}, 200);
			}
		}, 900);
	}

	function rander2(x, y) { //随机金钱
		x = Math.floor(Math.random() * 100);
		y = Math.ceil(Math.random() * 100);
		if(y < 10) {
			y = '0' + y;
		} else if(y.toString().charAt(1) === '0') {
			y = y.toString().charAt(0);
		}
		dom_money.innerHTML = x + '.' + y;
	}

	function mon_suiji(cb) {
		var n = false,
			x = 0,
			y = 0;
		if(totalAccountMoney >= 1) {
			var timer = setTimeout(function() {
				n = true;
			}, 1200);
		} else {
			var timer = setTimeout(function() {
				n = true;
			}, 1000);
		}
		var timer1 = setInterval(function() {
			if(!n) {
				rander2(x, y);
			} else {
				clearInterval(timer1);
				clearTimeout(timer);
				dom_curMoney.innerHTML = Number(totalAccountMoney).toFixed(2);
				dom_money.innerHTML = Number(currentMoney).toFixed(2);
				cb();
			}
		}, 10);
	}

	dom_wxmark.addEventListener("click", function() {
		dom_wxmark.style.display = 'none';
		var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.hnqpappid;
		vge.ajxget(requrl, 5000, function(r) {
			try {
				var o = JSON.parse(r);
				if(o.subscribe == 0) { //未关注
					window.location.replace('http://' + location.host + '/v/hnqp20170520/attention.html');
				} else { //已关注用户
					// dom_wxmark.style.display = 'none';
					window.location.href = 'http://' + location.host + '/hnqp20170520/too/mybag';
				}
			} catch(e) {
				vge.clog('errmsg', [requrl, e]);
			}
		}, function(err) {
			vge.clog('errmsg', [requrl, err]);
		});
	}, false);

	function give_spack() {
		var javai = vge.hnqp + '/DBTHuaNQPInterface/gifts/getGiftspack';
		var req = {
			"openid": openid,
			"hbopenid": hbopenid
		};
		vge.callJApi(javai, req,
			function(jo) {
				document.getElementById("loading_box").style.display = 'none';
				if(jo.result.code == '0') {
					if(jo.result.businessCode === '0') {
						dom_wxmark.style.display = 'block';
						sessionStorage.totalAccountMoney = 0;
					} else if(jo.result.businessCode === '1') { //1
						title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
					} else if(jo.result.businessCode === '-2') { //-2
						title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
					} else if(jo.result.businessCode === '-1') { //-1
						title_tip('提 示', '系统升级中...', '我知道了');
					} else if(jo.result.businessCode === '3') { //1
						title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
					} else if(jo.result.businessCode === '2') { //-1
						title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
					} else if(jo.result.businessCode === '4') {
						title_tip('尊敬的用户', '提现处理中，请稍后查看详细记录!', '我知道了');
					} else if(jo.result.businessCode === '5') { //-1
						title_tip('尊敬的用户', jo.result.msg, '我知道了');
					} else {
						title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
						first = true;
					}
				} else { //code!='0'
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
					first = true;
				}
			});
	}

	dom_rule.addEventListener('click', function() { //活动规则
		location.href = "https://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502813444&idx=1&sn=de1a4e7434fc15e5f7bfdb65284f0012&chksm=087291da3f0518cc45bd77da201bf96bfd88dd3ab0b32aa68983d8924f240738987d60b83bfb#rd";
	}, false);
	dom_explain.addEventListener('click', function() { //隐私说明
		location.href = "http://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502813343&idx=1&sn=8b2760f63bc497a7dce4816749a2c57f&chksm=087290413f0519572fcaba5a59a1f76f660bb17be3dd9a39a97839236675d309c6123211dc65#rd";
	}, false);

})()