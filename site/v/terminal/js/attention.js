(function() {
	"use strict";
	ini_wxshare(vge.terminalappid);
	var args = vge.urlparse(location.href),
		openid = args.openid,
		secretKey = args.secretKey,
		terminalUserType = args.terminalUserType;
	var flag = true;

	sessionStorage.clear();
	sessionStorage.openid = openid;
	sessionStorage.secretKey = secretKey;
	loading('身份校验中'); //调用接口

	// setTimeout(function() { // 应对定位调用异常
	// 	if (sessionStorage.latitude === undefined) {
	// 		sweep();
	// 	}
	// }, 4000);

	function locationed(res) {
		sessionStorage.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
		sessionStorage.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
		sessionStorage.speed = res.speed; // 速度，以米/每秒计
		sessionStorage.accuracy = res.accuracy; // 位置精度
		sweep();
	}


	wx.ready(function() {
		WeixinJSBridge.call('hideOptionMenu'); //隐藏右上角菜单	
		wx.getLocation({
			type: 'wgs84',
			complete: locationed //接口调用完成时执行的回调函数，无论成功或失败都会执行。
		});
	});

	function sweep() {
		if (flag) {
			flag = false;
			var japi = vge.terminal + '/DBTVMTSInterface/terminal/validTerminalUser';
			var req = {
				"openid": openid,
				"secretKey": secretKey,
				"longitude": sessionStorage.longitude === undefined ? '00' : sessionStorage.longitude, //"经度"
				"latitude": sessionStorage.latitude === undefined ? '00' : sessionStorage.latitude //"纬度"
			};
			vge.clog('debug', [japi, JSON.stringify(req)]);
			vge.callJApi(japi, req, cb);
		}

	}

	function isHlj() {
		wx.getLocation({
			type: 'wgs84',
			cancel: function(res) {
				isHlj();
			},
			success: locationed,
			fail: function(res) {
				isHlj();
			}
		});
	}


	function cb(jo) {
		loaded();
		if (jo.result.code == '0') {
			switch (jo.result.businessCode) {

				case '0': // 校验成功
					if (jo.reply) {
						sessionStorage.province = jo.reply.province;
						sessionStorage.city = jo.reply.city;
						sessionStorage.county = jo.reply.county;
						sessionStorage.phoneNum = jo.reply.phoneNum;
						sessionStorage.companyList = JSON.stringify(jo.reply.agentCompanyAry);
					}
					if (jo.reply.terminal) {
						sessionStorage.terminalKey = jo.reply.terminal.terminalKey;
					}
					sessionStorage.terminalUserType = terminalUserType;
					if (jo.reply.agentCompanyAry[0].companyKey == '20190604' && (sessionStorage.longitude === undefined ||
							sessionStorage.longitude === 'undefined')) {
						flag = true;
						isHlj();
					} else {
						location.replace('http://' + location.host + '/v/terminal/addTerminal.html?bizcode=' + jo.result.businessCode);
					}
					break;
				case '1':
					title_tip('尊敬的用户', jo.result.msg, '我知道了');
					break;
				case '2':
					title_tip('尊敬的用户', jo.result.msg, '我知道了');
					break;
				case '3':
					title_tip('尊敬的用户', jo.result.msg, '我知道了');
					break;
				default:
					title_tip('尊敬的用户', jo.result.msg, '我知道了');
					break;
			}
		} else if (jo.result.code == '-1') { //code !=0;
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
