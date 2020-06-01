(function() { 
	"use strict";
	ini_wxshare(vge.shqpappid);
	var args = vge.urlparse(location.href),
		qr = args.s,
		openid = args.openid,
		project = 'shqp',
		vjifenOpenid = args.vjifenOpenid,
		i = 0;
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
	loading('玩命加载中'); //获取用户信息  

	 // 中秋动画
	//  var imgList = [
	// 	'http://'+location.host+'/v/sdqp/imgMidAutumn/logo.png',
	// 	'http://'+location.host+'/v/sdqp/imgMidAutumn/moon_1.png',
	// 	'http://'+location.host+'/v/sdqp/imgMidAutumn/moon_2.png',
	// 	'http://'+location.host+'/v/sdqp/imgMidAutumn/moon_3.png',
	// 	'http://'+location.host+'/v/sdqp/imgMidAutumn/person_left.png',
	// 	'http://'+location.host+'/v/sdqp/imgMidAutumn/person_right.png',
	// 	'http://'+location.host+'/v/sdqp/imgMidAutumn/rabbit_1.png',
	// 	'http://'+location.host+'/v/sdqp/imgMidAutumn/rabbit_2.png',
	// 	'http://'+location.host+'/v/sdqp/imgMidAutumn/rabbit_3.png',
	// 	'http://'+location.host+'/v/sdqp/imgMidAutumn/bottom.png',
	// 	'http://'+location.host+'/v/sdqp/imgMidAutumn/product.png',
	// 	'http://'+location.host+'/v/sdqp/imgMidAutumn/bg_b.png',
	// 	'http://'+location.host+'/v/sdqp/imgMidAutumn/bg_t.png'
	// ];
	// function loadImg(i){
	// 	var img = new Image();
	// 	img.src = imgList[i];
	// 	img.onload = function(){
	// 		if(i<imgList.length){
	// 			console.log(imgList[i],img)
	// 			loadImg(++i)
	// 		}
	// 	}
	// 	if(i>=imgList.length){
	// 		console.log(i,'图片加载完成');
	// 		//执行动画
	// 		loaded();
	// 		_hmt.push(['_trackEvent', 'click', '获取地理位置页', '中秋动画展示']);
	// 		$('#midAutumn').css('visibility','visible')
	// 		$('.moon_2_box,.moon_3_box,.person_1_box,.person_2_box,.foam_over').addClass('ani');
	// 		$('.foam_over').on('animationend',function(){
	// 			// if (qr.indexOf('MS_') != -1) {
	// 			//     getMS();
	// 			// } else {
	// 			//     sweep();
	// 			// }
	// 			sweep();
	// 		})
	// 	}else{
	// 		console.log(i)
	// 	}
	// }

	function locationed(res) {
		_hmt.push(['_trackEvent', 'click', '1.1获取地理位置页', '点击是']);
		dom_location.style.display = 'none';
		dom_fail.style.display = 'none';
		sessionStorage.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
		sessionStorage.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
		sessionStorage.speed = res.speed; // 速度，以米/每秒计
		sessionStorage.accuracy = res.accuracy; // 位置精度
		sweep();
		// loadImg(i);
	}
	wx.ready(function() {
		// loading('玩命加载中');
		wx.hideOptionMenu();
		wxGetLocation();
	});
	
	function wxGetLocation() {
		wx.getLocation({
			type: 'wgs84',
			cancel: function(res) {
				loaded();
				dom_location.style.display = 'block';
				_hmt.push(['_trackEvent', 'click', '1.2获取地理位置页', '点击否']);
				dom_location.addEventListener('click', function() {
					_hmt.push(['_trackEvent', 'click', '2.1获取地理位置页', '我知道了']);
					$('.location').css('display', 'none');
					sweep();
					// loadImg(i);
				}, false);
			},
			success: locationed, //接口调用完成时执行的回调函数，无论成功或失败都会执行。
			fail: function(res) {
				loaded();
				_hmt.push(['_trackEvent', 'click', '1.3获取地理位置页', '获取失败']);
				dom_fail.style.display = 'block';
				dom_fail.addEventListener('click', function() {
					_hmt.push(['_trackEvent', 'click', '2.1获取地理位置页', '我知道了']);
					dom_fail.style.display = 'none';
					sweep();
					// loadImg(i);
				}, false);
			}
		});
	}

	function sweep() {
		if(flag) {
			flag = false;
			loading('玩命加载中'); //调用接口
			var japi = vge.common + '/vjifenInterface/sweep/sweepQrcode';
			var req = {
				"projectServerName": "shanghaiqp",
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
					project = 'shqp';
				} 
				
				sessionStorage.skuType = jo.reply.skuType === undefined ? '1' : jo.reply.skuType;
				sessionStorage.dayScanNum = jo.reply.dayScanNum; //扫码次数
                sessionStorage.taoEasterEgg = jo.reply.taoEasterEgg;  //返回的淘口令
                sessionStorage.taoMemberOrderFlag = jo.reply.taoMemberOrderFlag; //入会 or 淘彩蛋 弹框
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
					//新签到
					sessionStorage.weekSignFlag = jo.reply.weekSignFlag; //用户是否开启自然周签到，1:开启、0或空:关闭
					sessionStorage.weekSignPopup = jo.reply.weekSignPopup; //自然周签到弹出提示，1:弹出提示、0或空:不弹出
					sessionStorage.setItem('signCogAry', JSON.stringify(jo.reply.signCogAry));
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