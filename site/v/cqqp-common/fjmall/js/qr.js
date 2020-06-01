(function() {
	"use strict";
	ini_wxshare(vge.fjmallappid);
	var args = vge.urlparse(location.href),
		qr = args.s,
		openid = args.openid,
		vjifenOpenid = args.vjifenOpenid;
	var flag = true;
	var tosq = document.getElementsByClassName('tosq')[0];

	var project = 'fjmall';

	sessionStorage.clear();
	sessionStorage.openid = openid;
	sessionStorage.qr = qr;
	ifremeber();
	//  setTimeout(function() { // 应对定位调用异常
	//      if (sessionStorage.latitude===undefined) {
	//          sweep();
	//      }
	//  }, 4000);

	loading('玩命加载中');

	function locationed(res) {
		$('#location,#fail').css('display','none');
		loading('玩命加载中');
		_hmt.push(['_trackEvent', 'click', '允许抓取-汾酒全国', '扫码']);
		sessionStorage.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
		sessionStorage.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
		sessionStorage.speed = res.speed; // 速度，以米/每秒计
		sessionStorage.accuracy = res.accuracy; // 位置精度
		sweep();
	}
	wx.ready(function() {
		wxGetLocation();
	});
	function wxGetLocation() {
		wx.getLocation({
			type: 'wgs84',
			cancel: function(res) {
				loaded();
				$('#location').fadeIn(10);
				$('body').addClass('bg');
				_hmt.push(['_trackEvent', 'click', '拒绝抓取-汾酒全国', '扫码']);
				$('#location .tosq').on('click',function(){
					$('#location').fadeOut(10);
					wxGetLocation();
				});
				$('#location .close').on('click',function(){
					wx.closeWindow();
				});
			},
			success: locationed, //接口调用完成时执行的回调函数，无论成功或失败都会执行。
			fail: function(res) {
				loaded();
				_hmt.push(['_trackEvent', 'click', '抓取失败-北销', '扫码']);
				$('#location').css('display','none');
				$('#fail').css('display','block');
				$('body').addClass('bg');
				$('#fail .close').on('click',function(){
					wx.closeWindow();
				});
			}
		});
	}

	function sweep() {
		if(flag) {
			flag = false;
			loading('玩命加载中'); //调用接口
			var japi = vge.fjmall + '/DBTFJQHInterface/sweep/sweepQrcode';
			var req = {
				"openid": openid,
				"sweepstr": qr,
				"vjifenOpenid":vjifenOpenid,
				"longitude": sessionStorage.longitude === undefined ? '00' : sessionStorage.longitude, //"经度"
				"latitude": sessionStorage.latitude === undefined ? '00' : sessionStorage.latitude,//"纬度"
				"headimgurl": sessionStorage.headimg,
				"nickname": sessionStorage.nickname,
			};
			vge.clog('debug', [japi, JSON.stringify(req)]);
			vge.callJApi(japi, req, cb);
		}

	}

	function cb(jo) {
		if(jo.result.code == '0') {
			switch(jo.result.businessCode) {
				case '0': // 普通奖
					sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
					sessionStorage.currentMoney = jo.reply.currentMoney;
					sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
					sessionStorage.currentVpoints = jo.reply.currentVpoints;
					sessionStorage.weekSignFlag = jo.reply.weekSignFlag; //是否开户自然周签到，1:开启、0或空:关闭
					sessionStorage.weekSignDays = jo.reply.weekSignDays; //当前周已签到周几集合
					sessionStorage.weekSignEarnFlag = jo.reply.weekSignEarnFlag; //周签到红包是否已领取，1:已领取、0未领取
					sessionStorage.weekSignEarnMoney = jo.reply.weekSignEarnMoney; //周签到红包金额
					sessionStorage.weekSignLimitDay = jo.reply.weekSignLimitDay; //周签到天数限制
					sessionStorage.weekSignDiffDay = jo.reply.weekSignDiffDay; //周签到还差天数
					sessionStorage.weekSignPercent = jo.reply.weekSignPercent; //进度百分比
					sessionStorage.weekSignPopup = jo.reply.weekSignPopup; //自然周签到弹出提示
					sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
					location.replace('http://' + location.host + '/v/'+project+'/getcash.html?bizcode=' + jo.result.businessCode);
					break;
				case '7': // 大奖
					sessionStorage.username = jo.reply.username === undefined ? '' : jo.reply.username;
					sessionStorage.phonenum = jo.reply.phonenum === undefined ? '' : jo.reply.phonenum;
					sessionStorage.idcard = jo.reply.idcard === undefined ? '' : jo.reply.idcard;
					sessionStorage.skukey = jo.reply.skukey;
					sessionStorage.prizeVcode = jo.reply.prizeVcode;
					sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
					location.replace('http://' + location.host + '/v/'+project+'/prize.html?bizcode=' + jo.result.businessCode);
					break;
				case '11': // 自己重复扫，普通奖
					sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
					sessionStorage.currentMoney = jo.reply.currentMoney;
					sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
					sessionStorage.currentVpoints = jo.reply.currentVpoints;
					sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime;
					location.replace('http://' + location.host + '/v/'+project+'/getcash.html?bizcode=' + jo.result.businessCode);
					break;
				case '12': // 
					location.replace('http://' + location.host + '/v/'+project+'/getMsg.html?bizcode=' + jo.result.businessCode);
					break;
				case '13': // 
					location.replace('http://' + location.host + '/v/'+project+'/getMsg.html?bizcode=' + jo.result.businessCode);
					break;
				case '14': // 
					location.replace('http://' + location.host + '/v/'+project+'/getMsg.html?bizcode=' + jo.result.businessCode);
					break;
				case '15': //他人重复扫大奖
					sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
					sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
					location.replace('http://' + location.host + '/v/'+project+'/prize.html?bizcode=' + jo.result.businessCode);
					break;
				default:
					if(jo.reply) {
						sessionStorage.batchName = jo.reply.batchName === undefined ? '' : jo.reply.batchName;
						sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime;
						sessionStorage.msg = jo.result.msg;
					} else {
						sessionStorage.earnTime = '';
					}
					location.replace('http://' + location.host + '/v/'+project+'/fail.html?bizcode=' + jo.result.businessCode);
			}
		} else if(jo.result.code == '-1') { //code !=0;
			title_tip('尊敬的用户', '系统升级中，请稍后再试！', '我知道了');
		} else {
			title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
		}
	}
		
	function ifremeber() {
		var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.fjmallappid;
		vge.ajxget(requrl, 5000, function(r) {
			try {
				var o = JSON.parse(r);
				if(o.subscribe == '0') { //未关注
					sessionStorage.nickname = '游客';
					sessionStorage.headimg = '/v/fjmall/img/headimg.png';
				} else { //已关注用户
					sessionStorage.nickname = o.nickname;
					sessionStorage.headimg = o.headimgurl == '' ? '/v/fjmall/img/headimg.png' : o.headimgurl;
				}
			} catch(e) {
				vge.clog('errmsg', [requrl, e]);
			}
		}, function(err) {
			vge.clog('errmsg', [requrl, err]);
		});
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