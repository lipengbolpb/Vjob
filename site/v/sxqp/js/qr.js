(function () {
    "use strict";
    ini_wxshare(vge.sxqpappid);
    var args = vge.urlparse(location.href),
        qr = args.s,
        openid = args.openid,
        vjifenOpenid = args.vjifenOpenid,
        unionid = '',
        i = 0;
    var flag = true,
        project = 'sxqp-common2.0';

    var dom_location = document.getElementById('location'),
        dom_fail = document.getElementById('fail');

    sessionStorage.clear();
    sessionStorage.openid = openid;
    sessionStorage.qr = qr;

    //	setTimeout(function() { // 应对定位调用异常
    //      if (sessionStorage.latitude===undefined) {
    //          sweep();
    //      }
    //  }, 5000);

    loading('玩命加载中');

    // 中秋动画
	// var imgList = [
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
	// 		$('#midAutumn').css('visibility','visible')
	// 		$('.moon_2_box,.moon_3_box,.person_1_box,.person_2_box,.foam_over').addClass('ani');
	// 		$('.foam_over').on('animationend',function(){
	// 			if (qr.indexOf('MS_') != -1) {
	// 			    getMS();
	// 			} else {
	// 			    sweep();
	// 			}
	// 		})
	// 	}else{
	// 		console.log(i)
	// 	}
	// }

    function locationed(res) {
        dom_location.style.display = 'none';
        dom_fail.style.display = 'none';
        // loading('玩命加载中');
        _hmt.push(['_trackEvent', 'click', '允许抓取-山西', '扫码']);
        sessionStorage.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        sessionStorage.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        sessionStorage.speed = res.speed; // 速度，以米/每秒计
        sessionStorage.accuracy = res.accuracy; // 位置精度
        if (qr.indexOf('MS_') != -1) {
            getMS();
        } else {
            sweep();
        }
        // loadImg(i);
    }
    wx.ready(function () {
        wx.hideOptionMenu();
        wxGetLocation();
    });

    function wxGetLocation() {
        wx.getLocation({
            type: 'wgs84',
            cancel: function (res) {
                loaded();
                dom_location.style.display = 'block';
                _hmt.push(['_trackEvent', 'click', '拒绝抓取-山西', '扫码']);
                dom_location.addEventListener('click', function () {
                    $('.location').css('display', 'none');
                    if (qr.indexOf('MS_') != -1) {
                        getMS();
                    } else {
                        sweep();
                    }
                    // loadImg(i);
                }, false);
            },
            success: locationed, //接口调用完成时执行的回调函数，无论成功或失败都会执行。
            fail: function (res) {
                loaded();
                _hmt.push(['_trackEvent', 'click', '抓取失败-山西', '扫码']);
                dom_location.style.display = 'none';
                dom_fail.style.display = 'block';
                dom_fail.addEventListener('click', function () {
                    dom_location.style.display = 'none';
                    dom_fail.style.display = 'none';
                    if (qr.indexOf('MS_') != -1) {
                        getMS();
                    } else {
                        sweep();
                    }
                    // loadImg(i);
                }, false);
            }
        });
    }

    function sweep() {
        if (flag) {
            flag = false;
            loading('玩命加载中'); //调用接口
            var japi = vge.common + '/vjifenInterface/sweep/sweepQrcode';
            var req = {
                "openid": openid,
                "vjifenOpenid": vjifenOpenid,
                "sweepstr": qr,
                "longitude": sessionStorage.longitude === undefined ? '00' : sessionStorage.longitude, //"经度"
                "latitude": sessionStorage.latitude === undefined ? '00' : sessionStorage.latitude ,//"纬度"
                "projectServerName":"shanxi",
            };
            vge.clog('debug', [japi, JSON.stringify(req)]);
            vge.callJApi(japi, req, cb);
        }
    }
	function getMS() {
	    if (flag) {
	        loading('玩命加载中'); //调用接口
	        var japi = vge.common + '/vjifenInterface/vpoints/seckill/sweepQrcode';
	        var req = {
	            "openid": openid,
	            "vjifenOpenid": vjifenOpenid,
	            "sweepstr": qr,
	            "longitude": sessionStorage.longitude === undefined ? '00' : sessionStorage.longitude, //"经度"
                "latitude": sessionStorage.latitude === undefined ? '00' : sessionStorage.latitude ,//"纬度"
                "projectServerName":"shanxi",
	        };
	        vge.clog('debug', [japi, JSON.stringify(req)]);
	        vge.callJApi(japi, req, getMScb);
	    }
	}
	function getMScb(jo) {
	    if (jo.result.code == '0') {
	        if (jo.result.businessCode == '0') {
	            sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
	            sessionStorage.currentMoney = jo.reply.currentMoney;
	            sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
	            location.replace('http://' + location.host + '/sxqpMS/txo/getcash?bizcode=' + jo.result.businessCode);
	        } else {
	            sessionStorage.msg = jo.result.msg;
	            location.replace('http://' + location.host + '/v/sxqpMS/fail.html');
	        }
	    }
	}
    function cb(jo) {
        if (jo.result.code == '0') {
            if (jo.reply) {
                if(jo.reply.skukey){
                    if(jo.reply.skukey == '241510936-004'){
                        location.replace('http://' + location.host + '/v/sxqp/ad.html');
                        return;
                    }
                }
                if(jo.reply.dayScanNum){
                    sessionStorage.dayScanNum = jo.reply.dayScanNum;
                }
                if (jo.reply.activityVersion == '3') {
                    project = 'sxqp20180130';
                    sessionStorage.skukey = jo.reply.skukey;
                    sessionStorage.activityVersion = jo.reply.activityVersion;
                } else if (jo.reply.activityVersion == '4') {
                    project = 'sxqp-common2.0';
                    sessionStorage.skukey = jo.reply.skukey;
                    sessionStorage.activityVersion = jo.reply.activityVersion;
                } else if (jo.reply.activityVersion == '5') {
                    project = 'sxqp-FIFA';
                    sessionStorage.skukey = jo.reply.skukey;
                    sessionStorage.activityVersion = jo.reply.activityVersion;
                } else {
                    project = 'sxqp';
                    sessionStorage.skukey = jo.reply.skukey;
                    sessionStorage.activityVersion = jo.reply.activityVersion;
                }
				sessionStorage.dayScanNum = jo.reply.dayScanNum;
            }
            switch (jo.result.businessCode) {
                case '0': // 普通奖
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    sessionStorage.weekSignFlag = jo.reply.weekSignFlag;
                    sessionStorage.weekSignDays = jo.reply.weekSignDays;
                    sessionStorage.weekSignEarnFlag = jo.reply.weekSignEarnFlag;
                    sessionStorage.weekSignEarnMoney = jo.reply.weekSignEarnMoney;
                    sessionStorage.weekSignLimitDay = jo.reply.weekSignLimitDay;
                    sessionStorage.weekSignDiffDay = jo.reply.weekSignDiffDay;
                    sessionStorage.weekSignPercent = jo.reply.weekSignPercent;
                    sessionStorage.weekSignPopup = jo.reply.weekSignPopup;
                    sessionStorage.skukey = jo.reply.skukey;
                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime;
                    sessionStorage.prizeType = jo.reply.prizeType === undefined ? '' : jo.reply.prizeType;
                    sessionStorage.activityScanCount = jo.reply.activityScanCount === undefined ? '' : jo.reply.activityScanCount;
                    sessionStorage.kbUrl = jo.reply.kbUrl === undefined ? '' : jo.reply.kbUrl;
                    // 捆绑促销
                    sessionStorage.promotionFlag = jo.reply.promotionFlag === undefined ? '' : jo.reply.promotionFlag; //用户是否开启自然周签到，1:开启、0或空:关闭
                    sessionStorage.promotionPopup = jo.reply.promotionPopup === undefined ? '' : jo.reply.promotionPopup; //自然周签到弹出提示，1:弹出提示、0或空:不弹出
                    sessionStorage.setItem('promotionCogAry', JSON.stringify(jo.reply.promotionCogAry));


                    // sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    // sessionStorage.currentMoney = jo.reply.currentMoney;
                    // sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    // sessionStorage.earnTime = jo.reply.earnTime;
                    // //签到
                    // sessionStorage.weekSignFlag = jo.reply.weekSignFlag; //用户是否开启自然周签到，1:开启、0或空:关闭
                    // sessionStorage.weekSignPopup = jo.reply.weekSignPopup; //自然周签到弹出提示，1:弹出提示、0或空:不弹出
                    // sessionStorage.setItem('signCogAry', JSON.stringify(jo.reply.signCogAry));
                    // // K币
                    // // sessionStorage.kbUrl = jo.reply.kbUrl === undefined ? '' : jo.reply.kbUrl;
                    // // 捆绑促销
                    // sessionStorage.promotionFlag = jo.reply.promotionFlag === undefined ? '' : jo.reply.promotionFlag; //用户是否开启自然周签到，1:开启、0或空:关闭
                    // sessionStorage.promotionPopup = jo.reply.promotionPopup === undefined ? '' : jo.reply.promotionPopup; //自然周签到弹出提示，1:弹出提示、0或空:不弹出
                    // sessionStorage.setItem('promotionCogAry', JSON.stringify(jo.reply.promotionCogAry));
                    // 跳转
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
                case '7': // 大奖
                    sessionStorage.username = jo.reply.username === undefined ? '' : jo.reply.username;
                    sessionStorage.phonenum = jo.reply.phonenum === undefined ? '' : jo.reply.phonenum;
                    sessionStorage.idcard = jo.reply.idcard === undefined ? '' : jo.reply.idcard;
                    sessionStorage.skukey = jo.reply.skukey;
                    sessionStorage.prizeVcode = jo.reply.prizeVcode;
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    location.replace('http://' + location.host + '/v/' + project + '/prize.html?bizcode=' + jo.result.businessCode);
                    break;
                case '15': //他人重复扫大奖
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
                    location.replace('http://' + location.host + '/v/' + project + '/prize.html?bizcode=' + jo.result.businessCode);
                    break;
                default:
                    if (jo.reply) {
                        sessionStorage.batchName = jo.reply.batchName === undefined ? '' : jo.reply.batchName;
                        sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime;
                        sessionStorage.msg = jo.result.msg;
                    } else {
                        sessionStorage.earnTime = '';
                    }
                    location.replace('http://' + location.host + '/v/' + project + '/fail.html?bizcode=' + jo.result.businessCode);
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
        setTimeout(function () {
            $('#toast').hide();
        }, 2000);
    }

})();