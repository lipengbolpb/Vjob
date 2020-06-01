(function() {
	var str_code = document.getElementById("str_code"),
		dom_btn = document.getElementById("btn"),
		mark = document.getElementsByClassName("mark")[0],
		tel_code = document.getElementById("telcode"),
		telcode_box = document.getElementById('telcode_box'),
		dom_vertion = document.getElementById('yz_box'),
		get_yz = document.getElementById('get_yz'),
		pic_tip = document.getElementById('pic_tip'),
		dom_vertion_code = document.getElementById('yz_code'),
		time = document.getElementsByClassName('time')[0],
		dom_know = document.getElementsByClassName('close')[0];

	var args = vge.urlparse(location.href),
		openid = args.openid,
		bizcode = '',
		unionid = '',
		project = 'sxqp';
	sessionStorage.openid = openid;
	var reg1 = /[0-9a-zA-Z]{12}/,
		reg2 = /^1[0-9]{10}/,
		reg3 = /[0-9]{4}/;
	var scode = '',
		status = false;

	sessionStorage.openid = openid;

	function only_strcode() {
		telcode_box.style.display = 'none';
		dom_vertion.style.display = 'none';
		status = false;
		str_code.addEventListener('keyup', function() {
			if(reg1.test(str_code.value)) {
				dom_btn.disabled = false;
				dom_btn.style.color = '#fada69';
			} else {
				dom_btn.disabled = true;
				dom_btn.style.color = '#ffffff';
			}
		}, false);
	}

	pic_tip.addEventListener('click', function() {
		mark.style.display = 'none';
	}, false);

	function need_yzcode() {
		dom_btn.style.marginBottom = '1rem';
		telcode_box.style.display = 'block';
		dom_vertion.style.display = 'block';
		document.getElementsByTagName('body')[0].onload = window.scrollTo(0, document.body.scrollHeight); //自动滚动到底部
		status = true;
		document.addEventListener('keyup', function() {
			if(reg1.test(str_code.value) && reg2.test(tel_code.value) && reg3.test(dom_vertion_code.value)) {
				dom_btn.disabled = false;
				dom_btn.style.color = '#fada69';
			} else {
				dom_btn.disabled = true;
				dom_btn.style.color = '#ffffff';
			}
		}, false);
	}

	dom_btn.addEventListener('click', function() {
		scode = str_code.value.trim();
		sessionStorage.qr = scode;
		if(!status) { //不需要验证码
			if(scode.length < 12 || scode.indexOf(' ') !== -1) {
				title_tip('提 示', '填写的串码有误，请仔细核对您的串码！', '我知道了');
				return;
			} else {
				var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.sxqpappid;
				vge.ajxget(requrl, 5000, function(r) {
					try {
						var o = JSON.parse(r);
						unionid = o.unionid;
						sessionStorage.unionid = unionid;
						sendcode();
					} catch(e) {
						vge.clog('errmsg', [requrl, e]);
					}
				}, function(err) {
					vge.clog('errmsg', [requrl, e]);
				});
			}
		} else { //需要验证码
			if(!reg1.test(scode)) {
				title_tip('提 示', '请填写正确的瓶盖串码哦！~', '我知道了');
			} else if(!reg2.test(tel_code.value)) {
				title_tip('提 示', '请填写正确的手机号！~', '我知道了');
			} else if(!reg3.test(dom_vertion_code.value)) {
				title_tip('提 示', '请输入正确的验证码~', '我知道了');
			} else {
				var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.sxqpappid;
				vge.ajxget(requrl, 5000, function(r) {
					try {
						var o = JSON.parse(r);
						unionid = o.unionid;
						sessionStorage.unionid = unionid;
						sendcode();
					} catch(e) {
						vge.clog('errmsg', [requrl, e]);
					}
				}, function(err) {
					vge.clog('errmsg', [requrl, e]);
				});
			}
		}
	}, false);

	get_yz.addEventListener('click', getYzcode, false);

	function getYzcode() {
		if(!reg1.test(str_code.value)) {
			title_tip('提 示', '请填写正确的瓶盖串码哦！~', '我知道了');
		} else if(!reg2.test(tel_code.value)) {
			title_tip('提 示', '请填写正确的手机号！~', '我知道了');
		} else {
			if(get_yz.value === '获取验证码') {
				getCheckCode(function() {
					countdown(get_yz, 60);
				});
			} else {
				get_yz.removeEventListener('click', getYzcode, false);
			}
		}
	}

	function getCheckCode(cb) { //获取验证码
		var javai = vge.common + '/vjifenInterface/user/getCaptcha';
		var req = {
			"phonenum": tel_code.value,
			"sendtype": 1 ,//0-一等奖,1-普通(一等奖页面不传，后台默认值，串码页面都传1)
			"projectServerName":"shanxi",
		};
		vge.callJApi(javai, req, function(jo) {
			if(jo.result.code == '0') {
				if(jo.result.businessCode == '0') {
					//成功，开始倒计时
					cb();
				} else if(jo.result.businessCode === '2') { //1
					title_tip('尊敬的用户', '您填写的手机号错误，发送验证码失败！', '我知道了');
				} else {
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				}
			} else { //code!='0'
				title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			}
		});
	}

	function countdown(tag, time) {
		var i = time;
		tag.value = i + '秒';
		var countdowntimer = setInterval(function() {
			i--;
			tag.value = i + '秒';
			if(i < 1) {
				tag.value = '获取验证码';
				i = 60;
				clearInterval(countdowntimer); // 清除定时器
				get_yz.addEventListener('click', getYzcode, false);
				countdowntimer = null;
			} else {
				get_yz.removeEventListener('click', getYzcode, false);
			}
		}, 1000);
	}

	dom_know.addEventListener("click", function() {
		mark.style.display = 'none';
	});

	function init() {
		var javai = vge.common + '/vjifenInterface/sweep/getFailCount';
		var req = {
			"openid": openid,
			"projectServerName":"shanxi",
		};
		vge.callJApi(javai, req, function(jo) {
			if(jo.result.code === '0') {
				switch(jo.result.businessCode) {
					case '0':
						only_strcode();
						break;
					case '1': // 1 - 程序异常,,
						title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
						break;
					case '2': // 2 - 需要验证码
						need_yzcode();
						break;
					case '3': // 3 - 错误超过6次
						only_strcode();
						break;
					default:
						alert('未知返回码' + jo.result.businessCode + jo.result.msg);
				}
			} else { //code!='0'
				title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			}
		});
	}

	function sendcode() {
		var javai = vge.common + '/vjifenInterface/sweep/serialCode';
		var req = {
			"openid": openid,
			// "unionid":unionid,
			"serialcode": scode,
			"verifycode": dom_vertion_code.value === '' ? '' : dom_vertion_code.value,
			"phone": tel_code.value === '' ? '' : tel_code.value,
			"longitude": sessionStorage.longitude === undefined ? '' : sessionStorage.longitude, //"经度"
			"latitude": sessionStorage.latitude === undefined ? '' : sessionStorage.latitude ,//"纬度"
			"projectServerName":"shanxi",
		};
		vge.callJApi(javai, req, function(jo) {
			if(jo.result.code == '0') {
				if(jo.reply && jo.reply.activityVersion == '3') {
					project = 'sxqp20180130';
					sessionStorage.skukey = jo.reply.skukey;
					sessionStorage.activityVersion = jo.reply.activityVersion;
				} else if(jo.reply && jo.reply.activityVersion == '4') {
					project = 'sxqp-common';
					sessionStorage.skukey = jo.reply.skukey;
					sessionStorage.activityVersion = jo.reply.activityVersion;
				} else {
					
				}
				if(jo.reply) {
					sessionStorage.skukey = jo.reply.skukey;
					sessionStorage.activityVersion = jo.reply.activityVersion;
					sessionStorage.batchName = jo.reply.batchName === undefined ? '' : jo.reply.batchName;
					sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime;
				}
				switch(jo.result.businessCode) {
					case '0': // 普通奖
						sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
						sessionStorage.currentMoney = jo.reply.currentMoney;
						sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
						sessionStorage.weekSignFlag = jo.reply.weekSignFlag; //是否开户自然周签到，1:开启、0或空:关闭
						sessionStorage.weekSignDays = jo.reply.weekSignDays; //当前周已签到周几集合
						sessionStorage.weekSignEarnFlag = jo.reply.weekSignEarnFlag; //周签到红包是否已领取，1:已领取、0未领取
						sessionStorage.weekSignEarnMoney = jo.reply.weekSignEarnMoney; //周签到红包金额
						sessionStorage.weekSignLimitDay = jo.reply.weekSignLimitDay; //周签到天数限制
						sessionStorage.weekSignDiffDay = jo.reply.weekSignDiffDay; //周签到还差天数
						sessionStorage.weekSignPercent = jo.reply.weekSignPercent; //进度百分比
						sessionStorage.weekSignPopup = jo.reply.weekSignPopup; //自然周签到弹出提示
						sessionStorage.earnTime = jo.reply.earnTime;
						location.replace('http://' + location.host + '/' + project + '/txo/getcash?bizcode=' + jo.result.businessCode);
						break;
					case '11': // 自己重复扫，普通奖
						sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
						sessionStorage.currentMoney = jo.reply.currentMoney;
						sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
						sessionStorage.earnTime = jo.reply.earnTime;
						location.replace('http://' + location.host + '/' + project + '/txo/getcash?bizcode=' + jo.result.businessCode);
						break;
					case '12': // 可疑用户
						location.replace('http://' + location.host + '/v/' + project + '/getMsg.html?bizcode=' + jo.result.businessCode);
						break;
					case '13': // 黑名单
						location.replace('http://' + location.host + '/v/' + project + '/getMsg.html?bizcode=' + jo.result.businessCode);
						break;
					case '14': // 指定
						location.replace('http://' + location.host + '/v/' + project + '/getMsg.html?bizcode=' + jo.result.businessCode);
						break;
					case '-1': // 升级中
						mark.style.display = 'block';
						pic_tip.src = '/v/sxqp/img/fail_tip_3.png?v=1';
						break;
					case '1': // 不存在
						mark.style.display = 'block';
						pic_tip.src = '/v/sxqp/img/fail_tip_7.png?v=1';
						break;
					case '2': // 被扫过
						if(jo.reply) {
							mark.style.display = 'block';
							time.style.display = 'block';
							pic_tip.src = '/v/sxqp/img/fail_tip_2.png?v=1';
							document.getElementById('time').innerHTML = sessionStorage.earnTime;
						} else {
							title_tip('尊敬的用户', '您的操作太频繁了，稍后再试~', '我知道了');
						}
						break;
					case '3': // 过期
						mark.style.display = 'block';
						pic_tip.src = '/v/sxqp/img/fail_tip_1.png?v=1';
						break;
					case '4': // 未开始
						mark.style.display = 'block';
						time.style.display = 'block';
						pic_tip.src = '/v/sxqp/img/fail_tip_5.png?v=1';
						time.innerHTML = sessionStorage.batchName + '<br />服务热线：15311695989';
						break;
					case '5': // 已截止
						mark.style.display = 'block';
						pic_tip.src = '/v/sxqp/img/fail_tip_6.png?v=1';
						break;
					case '6': // 指定
						mark.style.display = 'block';
						pic_tip.src = '/v/sxqp/img/fail_tip_3.png?v=1';
						break;
					case '8': // 需要验证码
						need_yzcode();
						break;
					case '9': // 验证码错误
						title_tip('尊敬的用户', '验证码错误！~', '我知道了');
						break;
					case '10': // 错误超过6次,请明天再试
						title_tip('尊敬的用户', '错误次数太多啦，明天再来试试吧~', '我知道了');
						break;
					default:
						bizcode = jo.result.businessCode === '' ? 'x' : jo.result.businessCode;
						alert('出错了，请稍后再试！' + bizcode);
				}
			} else if(jo.result.code == '-1') { //code !=0;
				title_tip('尊敬的用户', '系统升级中，请稍后再试！', '我知道了');
			} else {
				title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			}
		});
	}
	init(); //初始化查询输入次数
})();