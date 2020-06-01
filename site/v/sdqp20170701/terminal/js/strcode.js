(function() {
	var str_code = document.getElementById("str_code"),
		dom_btn = document.getElementById("btn"),
		tel_code = document.getElementById("telcode"),
		telcode_box = document.getElementById('telcode_box'),
		dom_vertion = document.getElementById('yz_box'),
		get_yz = document.getElementById('get_yz'),
		pic_tip = document.getElementById('pic_tip'),
		dom_vertion_code = document.getElementById('yz_code'),
		res_tip = document.getElementsByClassName('res_tip')[0],
		mark = document.getElementsByClassName('mark')[0],
		loading = document.getElementById("loading"),
		batch = document.getElementById("batch"),
		time = document.getElementsByClassName('time')[0];
	
	var height = document.documentElement.clientHeight || document.body.clientHeight;
	if (height !== "undefined"){
		document.getElementsByTagName("body")[0].style.height = height + "px";
	}
	
	var args = vge.urlparse(location.href),
		openid = args.openid,
		bizcode = '',
		unionid = '',
		project = 'terminal';
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
				dom_btn.style.color = '#ffffff';
			} else {
				dom_btn.disabled = true;
				dom_btn.style.color = '#ffffff';
			}
		}, false);
	}

	function need_yzcode() {
		dom_btn.style.marginBottom = '1rem';
		telcode_box.style.display = 'block';
		dom_vertion.style.display = 'block';
		document.getElementsByTagName('body')[0].onload = window.scrollTo(0, document.body.scrollHeight); //自动滚动到底部
		status = true;
		document.addEventListener('keyup', function() {
			if(reg1.test(str_code.value) && reg2.test(tel_code.value) && reg3.test(dom_vertion_code.value)) {
				dom_btn.disabled = false;
				dom_btn.style.color = '#ffffff';
			} else {
				dom_btn.disabled = true;
				dom_btn.style.color = '#ffffff';
			}
		}, false);
	}

	dom_btn.addEventListener('click', dot, false);

	function dot() {
		dom_btn.removeEventListener('click', dot);
		scode = str_code.value.trim();
		sessionStorage.qr = scode;
		if(!status) { //不需要验证码
			if(scode.length < 12 || scode.indexOf(' ') !== -1) {
				title_tip('提 示', '填写的串码有误，请仔细核对您的串码！', '我知道了');
				return;
			} else {
				loading.style.display = 'block';
				sendcode();
			}
		} else { //需要验证码
			if(!reg1.test(scode)) {
				title_tip('提 示', '请填写正确的串码哦！~', '我知道了');
			} else if(!reg2.test(tel_code.value)) {
				title_tip('提 示', '请填写正确的手机号！~', '我知道了');
			} else if(!reg3.test(dom_vertion_code.value)) {
				title_tip('提 示', '请输入正确的验证码~', '我知道了');
			} else {
				loading.style.display = 'block';
				sendcode();
			}
		}
	}
	get_yz.addEventListener('click', getYzcode, false);

	function getYzcode() {
		if(!reg1.test(str_code.value)) {
			title_tip('提 示', '请填写正确的串码哦！~', '我知道了');
		} else if(!reg2.test(tel_code.value)) {
			title_tip('提 示', '请填写正确的手机号！~', '我知道了');
		} else {
			if(get_yz.innerHTML === '获取验证码') {
				get_yz.removeEventListener('click', getYzcode, false);
				getCheckCode(function() {
					countdown(get_yz, 60);
				});
			} else {
				get_yz.removeEventListener('click', getYzcode, false);
			}
		}
	}

	function getCheckCode(cb) { //获取验证码
		var javai = vge.terminal + '/DBTVMTSInterface/user/getCaptcha';
		var req = {
			"phonenum": tel_code.value,
			"sendtype": 1 //0-一等奖,1-普通(一等奖页面不传，后台默认值，串码页面都传1)
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
		tag.innerHTML = i + '秒';
		var countdowntimer = setInterval(function() {
			i--;
			tag.innerHTML = i + '秒';
			if(i < 1) {
				tag.innerHTML = '获取验证码';
				clearInterval(countdowntimer); // 清除定时器
				get_yz.addEventListener('click', getYzcode, false);
				countdowntimer = null;
			} else {
				get_yz.removeEventListener('click', getYzcode, false);
			}
		}, 1000);
	}

	function init() {
		var javai = vge.terminal + '/DBTVMTSInterface/sweep/getFailCount';
		var req = {
			"openid": openid
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
		mark.className = 'mark border';
		var javai = vge.terminal + '/DBTVMTSInterface/sweep/serialCode';
		var req = {
			"openid": openid,
			"serialcode": scode,
			"showType":'0',//打开H5页面
			"verifycode": dom_vertion_code.value === '' ? '' : dom_vertion_code.value,
			"phone": tel_code.value === '' ? '' : tel_code.value,
			"longitude": sessionStorage.longitude === undefined ? '' : sessionStorage.longitude, //"经度"
			"latitude": sessionStorage.latitude === undefined ? '' : sessionStorage.latitude //"纬度"
		};
		vge.callJApi(javai, req, function(jo) {
			loading.style.display = 'none';
			dom_btn.addEventListener('click', dot, false);
			if(jo.result.code == '0') {
				sessionStorage.headimgurl = '/v/terminal/img/headimg.png?v=1';
				if(jo.reply) {
					sessionStorage.batchName = jo.reply.batchName === undefined ? '' : jo.reply.batchName;
					sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime;
	        		sessionStorage.nickName = jo.reply.nickName===undefined?'':jo.reply.nickName;
	        		sessionStorage.earnTime = jo.reply.earnTime===undefined?'':jo.reply.earnTime;
	        		sessionStorage.pmPhoneNum = jo.reply.pmPhoneNum;
				}
				switch(jo.result.businessCode) {
					case '0': // 普通奖
						sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
						sessionStorage.currentMoney = jo.reply.currentMoney;
						sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
						sessionStorage.earnTime = jo.reply.earnTime;
						sessionStorage.currentVpoints = jo.reply.currentVpoints;
						sessionStorage.isVpointsShop = jo.reply.isVpointsShop;
						location.replace('http://' + location.host + '/terminal/txo/getcash?bizcode=' + jo.result.businessCode);
						break;
					case '11': // 自己重复扫，普通奖
						sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
						sessionStorage.currentMoney = jo.reply.currentMoney;
						sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
						sessionStorage.earnTime = jo.reply.earnTime;
						sessionStorage.currentVpoints = jo.reply.currentVpoints;
						sessionStorage.isVpointsShop = jo.reply.isVpointsShop;
						location.replace('http://' + location.host + '/' + project + '/txo/getcash?bizcode=' + jo.result.businessCode);
						break;
					case '7': // 大奖
						sessionStorage.skukey = jo.reply.skukey;
						sessionStorage.prizeVcode = jo.reply.prizeVcode;
						sessionStorage.prizeType = jo.reply.prizeType;
						sessionStorage.companyKey = jo.reply.companyKey;
						if(jo.reply.username) {
							sessionStorage.username = jo.reply.username;
							sessionStorage.idcard = jo.reply.idcard;
							sessionStorage.phonenum = jo.reply.phonenum;
						}
						location.replace('http://' + location.host + '/v/terminal/prize.html?bizcode=' + jo.result.businessCode);
						break;
					case '12': // 可疑用户
						location.replace('http://' + location.host + '/v/terminal/getMsg.html?bizcode=' + jo.result.businessCode);
						break;
					case '13': // 黑名单
						location.replace('http://' + location.host + '/v/terminal/getMsg.html?bizcode=' + jo.result.businessCode);
						break;
					case '14': // 指定
						location.replace('http://' + location.host + '/v/terminal/getMsg.html?bizcode=' + jo.result.businessCode);
						break;
					case '15': // 大奖核销
						sessionStorage.skukey = jo.reply.skukey;
						sessionStorage.prizeVcode = jo.reply.prizeVcode;
						sessionStorage.prizeType = jo.reply.prizeType;
						sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime;
						location.replace('http://' + location.host + '/v/terminal/prize.html?bizcode=' + jo.result.businessCode);
						break;
					case '16': // 非销售人员
						sessionStorage.brandIntroduceUrl = jo.reply.brandIntroduceUrl;
						location.replace('http://' + location.host + '/v/terminal/active.html?bizcode=' + jo.result.businessCode);
						break;
					case '19': // 游客
						sessionStorage.brandIntroduceUrl = jo.reply.brandIntroduceUrl;
						location.replace('http://' + location.host + '/v/terminal/active.html?bizcode=' + jo.result.businessCode);
						break;

					case '-1': // 升级中
						res_tip.innerHTML = '系统升级中';
						break;
					case '1': // 不存在
						res_tip.innerHTML = '该串码不存在';
						break;
					case '2': // 被扫过
						if(jo.reply) {
							time.style.display = 'block';
							res_tip.innerHTML = '这个二维码已被扫！';
							document.getElementById('time').innerHTML = sessionStorage.earnTime;
						} else {
							title_tip('尊敬的用户', '您的操作太频繁了，稍后再试~', '我知道了');
						}
						break;
					case '3': // 过期
						res_tip.innerHTML = '二维码已过期';
						break;
					case '4': // 未开始
						res_tip.innerHTML = '活动未开始';
						batch.innerHTML = sessionStorage.batchName + '<br />服务热线：'+sessionStorage.pmPhoneNum;
						break;
					case '5': // 已截止
						res_tip.innerHTML = '活动已截止';
						break;
					case '6': // 指定
						res_tip.innerHTML = '红包在路上堵车啦';
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
						title_tip('尊敬的用户', bizcode + jo.result.msg, '我知道了');
				}
			} else if(jo.result.code == '-1') { //code !=0;
				title_tip('尊敬的用户', '系统升级中，请稍后再试！', '我知道了');
			} else {
				title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			}
		});
	}
	init(); //初始化查询输入次数
	wx.ready(function() {
		wx.closeWindow();
	});
})();