(function() {
	"use strict";
	var args = vge.urlparse(location.href),
		unionid = '',
		first = true,
		qr = args.s,
		openid = args.openid;
	var dom_location = document.getElementById("location");
	//  dom_info.innerHTML = '您扫的码是【'+url.substr(0,j)+'】<br>openid: '+openid;

	sessionStorage.clear();
	sessionStorage.openid = openid;
	sessionStorage.qr = qr;
	loading('玩命加载中');
	setTimeout(function() {
		if(sessionStorage.latitude === undefined) {
			sweep();
		}
	}, 1500);

	function locationed(res) {
		loading('玩命加载中');
		dom_location.style.display = 'none';
		sessionStorage.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
		sessionStorage.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
		sessionStorage.speed = res.speed; // 速度，以米/每秒计
		sessionStorage.accuracy = res.accuracy; // 位置精度
		// dom_location.innerHTML=[latitude,longitude,speed,accuracy].join(', ');
		sweep();
	}

	//	var requrl = 'http://' + vge.h5ost + '/wx/vxuinfo?openid=' + openid;
	//	loading('玩命加载中');
	//	vge.ajxget(requrl, 4000, function(r) {
	//		try {
	//			var o = JSON.parse(r);
	//			unionid = o.unionid;
	//			sessionStorage.unionid = unionid;
	//			loading('玩命加载中');
	//			wx.ready(function() {
	//				wx.getLocation({
	//					type: 'wgs84',
	//					cancel: function(res) {
	//						loaded();
	//						dom_location.style.display = 'block';
	//						dom_location.addEventListener('click', function() {
	//							dom_location.style.display = 'none';
	//							sweep();
	//						}, false);
	//					},
	//					success: locationed, //接口调用完成时执行的回调函数，无论成功或失败都会执行。
	//					fail: function(res) {
	//						loaded();
	//						dom_location.style.display = 'block';
	//						dom_location.addEventListener('click', function() {
	//							dom_location.style.display = 'none';
	//							sweep();
	//						}, false);
	//					}
	//				});
	//			});
	//		} catch(e) {
	//			vge.clog('errmsg', [requrl, e]);
	//		}
	//	});

	function sweep() {
		loading('玩命加载中');
		if(first) {
			first = false;
			var japi = vge.common + '/vjifenInterface/sweep/sweepQrcode';
			var req = { "projectServerName": "guangxi",
				"openid": openid,
				"unionid": unionid,
				"sweepstr": qr,
				"longitude": sessionStorage.longitude === undefined ? '' : sessionStorage.longitude, //"经度"
				"latitude": sessionStorage.latitude === undefined ? '' : sessionStorage.latitude //"纬度"
			};
			vge.callJApi(japi, req, cb);
			vge.clog('调接口次数', [japi, JSON.stringify(req)]);
		} else {
			return;
		}
	}

	function cb(jo) {
		var getcash = '/v/gxqp/getcash.html', // 扫码红包普通奖
			repcash = '/v/gxqp/repcash.html', // 用户再次扫码
			getMsg = '/v/gxqp201703/getMsg.html?bizcode=',
			prize = '/v/gxqp/prize.html', // 扫码红包一二等奖
			batchName = '',
			fail = 'http://' + vge.qpgx_host + '/v/gxqp/fail.html?bizcode=';
		if(jo.result.code == '0') {
			if(jo.reply && jo.reply.activityVersion === '2') { // 春节版
				batchName = jo.reply.batchName === undefined ? '' : encodeURIComponent(jo.reply.batchName);
				getcash = '/v/gxqp20171214/getcash.html?bizcode=0'; // 扫码红包普通奖
				repcash = '/v/gxqp20171214/getcash.html?bizcode=11'; // 用户再次扫码
				prize = 'http://' + location.host + '/v/gxqp20171214/prize.html?bizcode='; // 扫码红包一二等奖
				fail = 'http://' + location.host + '/v/gxqp20171214/fail.html?bizcode=';
				getMsg = '/v/gxqp20171214/getMsg.html?bizcode=';
			}

			if(jo.reply && jo.reply.activityVersion === '3') {
				batchName = jo.reply.batchName === undefined ? '' : encodeURIComponent(jo.reply.batchName);
				getcash = '/v/gxqp201703/getcash.html'; // 扫码红包普通奖
				repcash = '/v/gxqp201703/rep.html?bizcode=11'; // 用户再次扫码
				prize = 'http://' + location.host + '/v/gxqp201703/prize.html?bizcode='; // 扫码红包一二等奖
				fail = 'http://' + vge.qpgx_host + '/v/gxqp201703/fail.html?batchName=' + batchName + '&bizcode=';
			}

			switch(jo.result.businessCode) {
				case '0': // 普通奖
					sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
					sessionStorage.currentMoney = jo.reply.currentMoney;
					sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
					sessionStorage.earnTime = jo.reply.earnTime;
					location.replace(getcash);
					break;
				case '11': // 自己重复扫，普通奖
					sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
					sessionStorage.currentMoney = jo.reply.currentMoney;
					sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
					sessionStorage.earnTime = jo.reply.earnTime;
					location.replace(repcash);
					break;
				case '12': // 可疑
					location.replace(getMsg + jo.result.businessCode);
					break;
				case '13': // 黑名单
					location.replace(getMsg + jo.result.businessCode);
					break;
				case '14': // 指定
					location.replace(getMsg + jo.result.businessCode);
					break;
				case '15': //大奖核销
					if(jo.reply) {
						sessionStorage.earnTime = jo.reply.earnTime;
						sessionStorage.grandPrizeType = jo.reply.grandPrizeType;
						sessionStorage.gpt = jo.reply.grandPrizeType;
					}
					if(jo.reply.activityVersion === '2') {
						location.replace(prize+jo.result.businessCode);
					} else {
						location.replace('http://' + location.host + '/v/gxqp201703/checkPrize.html?bizcode=' + jo.result.businessCode);
					}
					break;
				case '7': // 一等奖
					if(jo.reply !== undefined) {
						if(jo.reply.username !== undefined) {
							sessionStorage.username = jo.reply.username;
							sessionStorage.idcard = jo.reply.idcard;
							sessionStorage.phonenum = jo.reply.phonenum;
						} else { // 未填写过信息
							sessionStorage.skukey = jo.reply.skukey;
							sessionStorage.vqr = jo.reply.prizeVcode;
							sessionStorage.gpt = jo.reply.grandPrizeType;
							sessionStorage.grandPrizeType = jo.reply.grandPrizeType;
						}
					} else {
						sessionStorage.username = '信息查询失败 no reply';
					}
					location.replace(prize+jo.result.businessCode);
					break;
				case '-1':
					title_tip('尊敬的用户', '亲，扫码人数太多，后台余额不足<br />掌柜正在快马加鞭进行充值。<br />请保存好瓶盖，晚些时候再试~', '我知道了');
					break;
				default:
					sessionStorage.earnTime = jo.reply.earnTime;
					sessionStorage.batchName = jo.reply.batchName;
					location.replace(fail + jo.result.businessCode);
			}
		} else if(jo.result.code == '-1') { //jo.result.code!=0
			title_tip('尊敬的用户', '系统升级中，请稍后再试！', '我知道了');
		} else {
			title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
		}
	}

	function loading(txt) {
		// dom_content.innerHTML += $('#tpl_toast').html();
		$('#loadingToast .weui_toast_content').html(txt);
		$('#loadingToast').show();
	}

	function loaded() {
		$('#loadingToast').hide();
	}

	function toast(txt) {
		$('#toast .weui_toast_content').html(txt);
		$('#toast').show();
		setTimeout(function() {
			$('#toast').hide();
		}, 2000);
	}

})();