(function() {
	"use strict";

	var h = document.body.clientHeight,
		height = document.getElementsByClassName('top')[0].clientHeight,
		h2 = h - height;
	document.getElementsByTagName('body')[0].style.height = h + 'px';
	document.getElementsByClassName('bottom')[0].style.minHeight = h2 - 8 + 'px';

	var reg1 = /[0-9a-zA-Z]{11}/,
		reg2 = /^1[0-9]{10}/,
		reg3 = /[0-9]{4}/;
	var countdowntimer = null,
		scode = '',
		project = 'gxqp201703',
		status = false;
	var batch = document.getElementById("batch");
	var strcode = document.getElementById("str_code"),
		btn = document.getElementById("btn"),
		get_yz = document.getElementById("get_yz");

	var args = vge.urlparse(location.href),
		hbopenid = args.openid,//支付
	    vjifenOpenid=args.vjifenOpenid,//v积分
		unionid = '';
	
	sessionStorage.hbopenid = hbopenid;
    sessionStorage.vjifenOpenid = vjifenOpenid;

	function only_strcode() {
		status = false;
		strcode.addEventListener('input', function() {
			if(reg1.test($('#str_code').val())) {
				$('#btn').css({
					'background': '#ffc600',
					'color': '#d60009'
				});
				btn.disabled = false;
			} else {
				$('#btn').css({
					'background': '#fee880',
					'color': '#d78a8d'
				});
				btn.disabled = true;
			}
		}, false);
	}

	function need_yzcode() {
		$('.tel_box').css('display', 'block');
		$('.yz_box').css('display', 'block');
		status = true;
		document.addEventListener('keyup', function() {
			if(reg1.test($('#str_code').val()) && reg2.test($('#tel').val()) && reg3.test($('#yz_code').val())) {
				$('#btn').css({
					'background': '#ffdc45',
					'color': '#ea5244'
				});
				btn.disabled = false;
			} else {
				$('#btn').css({
					'background': '#fee880',
					'color': '#d78a8d'
				});
				btn.disabled = true;
			}
		}, false);
	}

	btn.addEventListener('click', function() {
		scode = $('#str_code').val().trim();
		if(!status) { //不需要验证码
			if(scode.length < 11 || scode.indexOf(' ') !== -1) {
				title_tip('提 示', '填写的串码有误，请仔细核对您的串码！', '我知道了');
				return;
			} else {
				sendcode();
//				var requrl = 'http://' + vge.h5ost + '/wx/vxuinfo?openid=' + openid;
//				vge.ajxget(requrl, 5000, function(r) {
//					try {
//						var o = JSON.parse(r);
//						unionid = o.unionid;
//						sessionStorage.unionid = unionid;
//						sendcode();
//					} catch(e) {
//						vge.clog('errmsg', [requrl, e]);
//					}
//				}, function(err) {
//					vge.clog('errmsg', [requrl, e]);
//				});
			}
		} else { //需要验证码
			if(!reg1.test(scode)) {
				title_tip('提 示', '请填写正确的瓶盖串码哦！~', '我知道了');
			} else if(!reg2.test($('#tel').val())) {
				title_tip('提 示', '请填写正确的手机号！~', '我知道了');
			} else if(!reg3.test($('#yz_code').val())) {
				title_tip('提 示', '请输入正确的验证码~', '我知道了');
			} else {
				sendcode();
//				var requrl = 'http://' + vge.h5ost + '/wx/vxuinfo?openid=' + openid;
//				vge.ajxget(requrl, 5000, function(r) {
//					try {
//						var o = JSON.parse(r);
//						unionid = o.unionid;
//						sessionStorage.unionid = unionid;
//						sendcode();
//					} catch(e) {
//						vge.clog('errmsg', [requrl, e]);
//					}
//				}, function(err) {
//					vge.clog('errmsg', [requrl, e]);
//				});
			}
		}
	}, false);

	get_yz.addEventListener('click', getYzcode, false);

	function getYzcode() {
		if(!reg1.test($('#str_code').val())) {
			title_tip('提 示', '请填写正确的瓶盖串码哦！~', '我知道了');
		} else if(!reg2.test($('#tel').val())) {
			title_tip('提 示', '请填写正确的手机号！~', '我知道了');
		} else {
			if(get_yz.innerHTML === '获取验证码') {
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
		var req = { "projectServerName": "guangxi",
			"phonenum": $('#tel').val(),
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
		countdowntimer = setInterval(function() {
			i--;
			tag.innerHTML = i + '秒';
			if(i === 0) {
				tag.innerHTML = '获取验证码';
				i = 60;
				clearInterval(countdowntimer); // 清除定时器
				get_yz.addEventListener('click', getYzcode, false);
				countdowntimer = null;
			} else {
				get_yz.removeEventListener('click', getYzcode, false);
			}
		}, 1000);
	}
	init();

	function init() {
		var javai = vge.common + '/vjifenInterface/sweep/getFailCount';
		var req = { "projectServerName": "guangxi",
			"openid": vjifenOpenid
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
		var req = { "projectServerName": "guangxi",
			"openid": vjifenOpenid,
			"serialcode": scode,
			"phone": $('#tel').val() === '' ? '' : $('#tel').val(),
			"verifycode": $('#yz_code').val() === '' ? '' : $('#yz_code').val(),
			"longitude": sessionStorage.longitude === undefined ? '' : sessionStorage.longitude, //"经度"
			"latitude": sessionStorage.latitude === undefined ? '' : sessionStorage.latitude //"纬度"
		};
		vge.callJApi(javai, req, function(jo) {
			if(jo.result.code === '0') {
				if(jo.reply && jo.reply.activityVersion === '2') { // 春节版
					project = 'gxqp20171214';
				}

				if(jo.reply && jo.reply.activityVersion === '3') { //歌诗达游轮版

				}

				if(jo.reply && jo.reply.activityVersion === '4') { //经典版
					project = 'gxqp-common';
				}

				switch(jo.result.businessCode) {
					case '0':
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
						sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
						location.replace('http://' + location.host + '/' + project + '/txo/getcash?bizcode=' + jo.result.businessCode);
						break;
					case '1': // 1 - 该积分码不存在"
						$('.alert').css('display', 'block');
						$('.fail_tip').attr('src', '/v/gxqp20171214/img/fail_tip_1.png');
						break;
					case '2': // 2 - 该积分码已经被使用过
						$('.alert').css('display', 'block');
						$('.time').html('扫码时间：<span>' + jo.reply.earnTime + '</span><br />再扫一瓶试试看')
						$('.fail_tip').attr('src', '/v/gxqp20171214/img/fail_tip_2.png');
						break;
					case '3': // 3 - 积分码已过期
						$('.alert').css('display', 'block');
						$('.fail_tip').attr('src', '/v/gxqp20171214/img/fail_tip_3.png');
						break;
					case '4': // 4 - 活动未开始
						$('.alert').css('display', 'block');
						$('.fail_tip').attr('src', '/v/gxqp20171214/img/fail_tip_4.png');
						batch.innerHTML = jo.reply.batchName + '<br />服务热线：4008365591';
						break;
					case '5': // 5 - 活动已结束
						$('.alert').css('display', 'block');
						$('.fail_tip').attr('src', '/v/gxqp20171214/img/fail_tip_5.png');
						break;
					case '6': // 6 - 积分码异常(通常为服务器报错)
						$('.alert').css('display', 'block');
						$('.fail_tip').attr('src', '/v/gxqp20171214/img/fail_tip_6.png');
						break;
					case '7': // 7 - 一等奖
						if(jo.reply !== undefined) {
							if(jo.reply.username !== undefined) {
								sessionStorage.username = jo.reply.username;
								sessionStorage.idcard = jo.reply.idcard;
								sessionStorage.phonenum = jo.reply.phonenum;
								sessionStorage.skukey = jo.reply.skukey;
								sessionStorage.vqr = jo.reply.prizeVcode;
								sessionStorage.gpt = jo.reply.grandPrizeType;
								sessionStorage.grandPrizeType = jo.reply.grandPrizeType;
							} else { // 未填写过信息
								sessionStorage.skukey = jo.reply.skukey;
								sessionStorage.vqr = jo.reply.prizeVcode;
								sessionStorage.gpt = jo.reply.grandPrizeType;
								sessionStorage.grandPrizeType = jo.reply.grandPrizeType;
							}
						} else {
							sessionStorage.username = '信息查询失败 no reply';
						}
						if(jo.reply.grandPrizeType == '1' || jo.reply.grandPrizeType == '2') { //金银元宝
							location.replace('http://' + location.host + '/v/gxqp20171214/prize.html?bizcode=' + jo.result.businessCode);
						} else if(jo.reply.grandPrizeType == '0') { //歌诗达游轮
							location.replace('http://' + location.host + '/v/gxqp201703/prize.html?bizcode=' + jo.result.businessCode);
						} else if(jo.reply.grandPrizeType == 'p' || jo.reply.grandPrizeType == 'P') {
							location.replace('http://' + location.host + '/v/gxqp-common/prize.html?bizcode=' + jo.result.businessCode);
						} else {
							title_tip('尊敬的用户', '扫码异常', '我知道了');
						}
						break;
					case '8': // 8-需要验证码
						title_tip('提 示', '您需要输入验证码！', '我知道了');
						need_yzcode();
						break;
					case '9': // 9-验证码不正确
						title_tip('提 示', '您输入的验证码不正确，请重新输入！', '我知道了');
						break;
					case '10': // 10-错误超过6次,请明天再试
						$('.alert').css('display', 'block');
						$('.fail_tip').attr('src', '/v/gxqp20171214/img/str_fail_1.png');
						only_strcode();
						break;
					case '11':
						sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
						sessionStorage.currentMoney = jo.reply.currentMoney;
						sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
						sessionStorage.earnTime = jo.reply.earnTime;
						if(jo.reply.activityVersion === '3') {
							location.replace('http://' + location.host + '/' + project + '/txo/repcash?bizcode=' + jo.result.businessCode);
						} else {
							location.replace('http://' + location.host + '/' + project + '/txo/getcash?bizcode=' + jo.result.businessCode);
						}
						break;
					case '12': // 可疑
						location.replace('http://' + location.host + '/v/' + project + '/getMsg.html?bizcode=' + jo.result.businessCode);
						break;
					case '13': // 黑名单
						location.replace('http://' + location.host + '/v/' + project + '/getMsg.html?bizcode=' + jo.result.businessCode);
						break;
					case '14': // 指定
						location.replace('http://' + location.host + '/v/' + project + '/getMsg.html?bizcode=' + jo.result.businessCode);
						break;
					case '15': //大奖核销
						if(jo.reply) {
							sessionStorage.earnTime = jo.reply.earnTime;
							sessionStorage.grandPrizeType = jo.reply.grandPrizeType;
							sessionStorage.gpt = jo.reply.grandPrizeType;
						}

						if(jo.reply.grandPrizeType == '1' || jo.reply.grandPrizeType == '2') { //金银元宝
							location.replace('http://' + location.host + '/v/gxqp20171214/prize.html?bizcode=' + jo.result.businessCode);
						} else if(jo.reply.grandPrizeType == '0') { //歌诗达游轮
							location.replace('http://' + location.host + '/v/gxqp201703/checkPrize.html?bizcode=' + jo.result.businessCode);
						} else if(jo.reply.grandPrizeType == 'p' || jo.reply.grandPrizeType == 'P') {
							location.replace('http://' + location.host + '/v/gxqp-common/prize.html?bizcode=' + jo.result.businessCode);
						} else {
							title_tip('尊敬的用户', '扫码异常', '我知道了');
						}

						break;
					case '-1':
						title_tip('尊敬的用户', '亲，扫码人数太多，后台余额不足<br />掌柜正在快马加鞭进行充值。<br />请保存好瓶盖，晚些时候再试~', '我知道了');
						break;
					default:
						alert('未知返回码' + jo.result.businessCode + jo.result.msg);
				}
			} else { //code!='0'
				title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			}
		});
	}
	$('.alert').on('click', function() {
		$('.alert,#batch,.time').css('display', 'none');
	});
})();