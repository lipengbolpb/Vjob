(function() {
	"use strict";
	ini_wxshare(vge.shqpappid);
	var args = vge.urlparse(location.href),
		qr = args.s,
		openid = args.openid,
		project = 'shqpts',
		vjifenOpenid = args.vjifenOpenid;
	var flag = true,
		nickname = '',
		headimg = '';
	var dom_location = document.getElementById('location'),
		dom_fail = document.getElementById('fail');
	// $('#info').html('您扫的码是【'+qr+'】<br>openid: '+openid);

	sessionStorage.clear();
	sessionStorage.openid = openid;
	sessionStorage.qr = qr;

	// subscribe();

	function locationed(res) {
		loading('玩命加载中');
		_hmt.push(['_trackEvent', 'click', '抓取地理位置', '扫码']);
		dom_location.style.display = 'none';
		dom_fail.style.display = 'none';
		sessionStorage.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
		sessionStorage.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
		sessionStorage.speed = res.speed; // 速度，以米/每秒计
		sessionStorage.accuracy = res.accuracy; // 位置精度
		sweep();
	}
	loading('玩命加载中'); //获取用户信息  
	wx.ready(function() {
		loading('玩命加载中');
		wx.hideOptionMenu();
		wxGetLocation();
	});
	
	function wxGetLocation() {
		wx.getLocation({
			type: 'wgs84',
			cancel: function(res) {
				loaded();
				dom_location.style.display = 'block';
				_hmt.push(['_trackEvent', 'click', '拒绝抓取地理位置', '扫码']);
				dom_location.addEventListener('click', function() {
					$('.location').css('display', 'none');
					sweep();
				}, false);
			},
			success: locationed, //接口调用完成时执行的回调函数，无论成功或失败都会执行。
			fail: function(res) {
				loaded();
				_hmt.push(['_trackEvent', 'click', '抓取地理位置失败', '扫码']);
				dom_fail.style.display = 'block';
				dom_fail.addEventListener('click', function() {
					dom_fail.style.display = 'none';
					sweep();
				}, false);
			}
		});
	}

	function sweep() {
		if(flag) {
			flag = false;
			loading('玩命加载中'); //调用接口
			var japi = vge.shqp + '/DBTSHQPInterface/sweep/sweepQrcode';
			var req = {
				"openid": openid,
				"sweepstr": qr,
				"vjifenOpenid": vjifenOpenid,
				"headimgurl": headimg,
				"nickname": nickname,
				"longitude": sessionStorage.longitude === undefined ? '00' : sessionStorage.longitude, //"经度"
				"latitude": sessionStorage.latitude === undefined ? '00' : sessionStorage.latitude //"纬度"
			};
			vge.clog('debug', [japi, JSON.stringify(req)]);
			vge.callJApi(japi, req, cb);
		}

	}

	function subscribe() { //判断关注
		var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.shqpappid;
		vge.ajxget(requrl, 5000, function(r) {
			try {
				var o = JSON.parse(r);
				if(o.subscribe == 0) { //未关注

				} else { //已关注用户
					headimg = o.headimgurl;
					nickname = o.nickname;
				}
				vge.clog('个人信息', JSON.stringify(o));
			} catch(e) {
				vge.clog('errmsg', [requrl, e]);
			}
		}, function(err) {
			vge.clog('errmsg', [requrl, err]);
		});
	}

	function cb(jo) {
		vge.clog('返回信息', [JSON.stringify(jo)]);
		if(jo.result.code == '0') {
			if(jo.reply){
				if(jo.reply.activityVersion == '1') { //
					project = 'shqpts';
				} 
				
				sessionStorage.skuType = jo.reply.skuType === undefined ? '1' : jo.reply.skuType;
			}
			if(jo.result.businessCode=='30'){//大奖核销
				sessionStorage.infoKey = jo.reply.checkPrizeRecord.infoKey;
				sessionStorage.prizeName = jo.reply.checkPrizeRecord.prizeName;
				sessionStorage.prizeImg = jo.reply.checkPrizeRecord.prizeImg;
				sessionStorage.prizeVcode = jo.reply.checkPrizeRecord.prizeVcode;
				sessionStorage.userName = jo.reply.checkPrizeRecord.userName;
				sessionStorage.phoneNum = jo.reply.checkPrizeRecord.phoneNum;
				sessionStorage.earnTime = jo.reply.checkPrizeRecord.earnTime;
				sessionStorage.expireTime = jo.reply.checkPrizeRecord.expireTime;
				sessionStorage.checkUserName = jo.reply.checkPrizeRecord.checkUserName;
				sessionStorage.checkStatus = jo.reply.checkPrizeRecord.checkStatus;
				sessionStorage.checkTime = jo.reply.checkPrizeRecord.checkTime;
				sessionStorage.checkRemarks = jo.reply.checkPrizeRecord.checkRemarks;
				location.replace('http://' + location.host + '/v/shqp/verification.html?bizcode=' + jo.result.businessCode);
				return false;
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
					sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
					sessionStorage.dayScanNum = jo.reply.dayScanNum;
					sessionStorage.cardNo = jo.reply.cardNo;//集卡
					location.replace('http://' + location.host + '/v/' + project + '/getcash.html?bizcode=' + jo.result.businessCode);
					break;
				case '11': // 自己重复扫，普通奖
					sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
					sessionStorage.currentMoney = jo.reply.currentMoney;
					sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
					sessionStorage.earnTime = jo.reply.earnTime;
					location.replace('http://' + location.host + '/v/' + project + '/getcash.html?bizcode=' + jo.result.businessCode);
					break;
				case '12': // 
					location.replace('http://' + location.host + '/v/' + project + '/getMsg.html?bizcode=' + jo.result.businessCode);
					break;
				case '13': // 
					location.replace('http://' + location.host + '/v/' + project + '/getMsg.html?bizcode=' + jo.result.businessCode);
					break;
				case '14': // 
					location.replace('http://' + location.host + '/v/' + project + '/getMsg.html?bizcode=' + jo.result.businessCode);
					break;
				case '15': //
					sessionStorage.earnTime = jo.reply.earnTime;
					sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
					location.replace('http://' + location.host + '/v/' + project + '/prize.html?bizcode=' + jo.result.businessCode);
					break;
				case '7': //一等奖或二等奖
					sessionStorage.address = jo.reply.address === undefined ? '' : jo.reply.address;
					sessionStorage.username = jo.reply.username === undefined ? '' : jo.reply.username;
					sessionStorage.idcard = jo.reply.idcard === undefined ? '' : jo.reply.idcard;
					sessionStorage.phonenum = jo.reply.phonenum === undefined ? '' : jo.reply.phonenum;
					sessionStorage.skukey = jo.reply.skukey === undefined ? '' : jo.reply.skukey;
					//中奖具体码
					sessionStorage.prizeVcode = jo.reply.prizeVcode === undefined ? '' : jo.reply.prizeVcode;
					//特等奖类别
					sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
					if(jo.reply.grandPrizeType.toUpperCase()=='Q'||jo.reply.grandPrizeType.toUpperCase()=='R'){
						location.replace('http://' + location.host + '/v/' + project + '/prize.html?bizcode=' + jo.result.businessCode);
					}else{
						title_tip('尊敬的用户', '扫码异常！', '我知道了');
					}
					break;
				default:
					if(jo.reply) {
						sessionStorage.batchName = jo.reply.batchName === undefined ? '' : jo.reply.batchName;
						sessionStorage.earnTime = jo.reply.earnTime;
						sessionStorage.msg = jo.result.msg;
					}
					location.replace('http://' + location.host + '/v/' + project + '/fail.html?bizcode=' + jo.result.businessCode);
			}
		} else if(jo.result.code == '-1') { //code !=0;
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