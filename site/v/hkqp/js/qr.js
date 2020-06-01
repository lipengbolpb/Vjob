(function () {
    "use strict";
    ini_wxshare(vge.hkqpappid);

    var args = vge.urlparse(location.href),
        unionid = '',
        first = true,
        times = 0,
        qr = args.s,
        vjifenOpenid = args.vjifenOpenid,
        openid = args.openid,
        i=0;

    var dom_location = document.getElementById('location'),
        dom_fail = document.getElementById('fail');

    sessionStorage.clear();
    sessionStorage.openid = openid;
    sessionStorage.qr = qr;

    setTimeout(function () { // 应对定位调用异常
        if (sessionStorage.latitude === undefined) {
            // sweep();
        }
    }, 5000);

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
    //             sweep();
	// 			// if (qr.indexOf('MS_') != -1) {
	// 			//     getMS();
	// 			// } else {
	// 			//     sweep();
	// 			// }
	// 		})
	// 	}else{
	// 		console.log(i)
	// 	}
    // }
    
    function locationed(res) {
        dom_location.style.display = 'none';
        dom_fail.style.display = 'none';

        sessionStorage.latitude = res.latitude === undefined ? '00' : res.latitude; // 纬度，浮点数，范围为90 ~ -90
        sessionStorage.longitude = res.longitude === undefined ? '00' : res.longitude; // 经度，浮点数，范围为180 ~ -180。
        sessionStorage.speed = res.speed; // 速度，以米/每秒计
        sessionStorage.accuracy = res.accuracy; // 位置精度
        sweep();
		// loadImg(i);
    }

    wx.ready(function () {
        // loading('玩命加载中');
        wx.hideOptionMenu();
        // wx.getLocation({
        //     type: 'wgs84',
        //     complete: locationed //接口调用完成时执行的回调函数，无论成功或失败都会执行。
        // });
        wxGetLocation();
    });

    function wxGetLocation() {
        wx.getLocation({
            type: 'wgs84',
            cancel: function (res) {
                loaded();
                dom_location.style.display = 'block';
                dom_location.addEventListener('click', function () {
                    $('.location').css('display', 'none');
                    sweep();
					// loadImg(i);
                }, false);
            },
            success: locationed, //接口调用完成时执行的回调函数，无论成功或失败都会执行。
            fail: function (res) {
                loaded();
                dom_location.style.display = 'none';
                dom_fail.style.display = 'block';
                dom_fail.addEventListener('click', function () {
                    dom_location.style.display = 'none';
                    dom_fail.style.display = 'none';
                    sweep();
					// loadImg(i);
                }, false);
            }
        });
    }

    function sweep() {
        if (first) {
            times++;
            first = false;
            loading('玩命加载中');
            var japi = vge.common + '/vjifenInterface/sweep/sweepVerify';
            var req = {
                "openid": openid,
                "sweepstr": qr,
                "vjifenOpenid": vjifenOpenid,
                "longitude": sessionStorage.longitude, //"经度"
                "latitude": sessionStorage.latitude , //"纬度"
                "projectServerName":"hainan",
            };
            vge.clog('debug', [japi, JSON.stringify(req), times]);
            vge.callJApi(japi, req, cb);
        }
    }

    function cb(jo) {
        loaded();
        vge.clog('返回结果', [JSON.stringify(jo)]);
        if (jo.result.code == '0') {
            var replace = 'hkqp-common2.0';
            if (jo.reply) {
                if (jo.reply.activityVersion == '2') { //2000瓶 椰子版
                    replace = 'hkqp';
                } else if (jo.reply.activityVersion == '1') { //经典 通用版
                    replace = 'hkqp-common2.0';
                } else if (jo.reply.activityVersion == '3') { //世界杯版
                    replace = 'hkqp-FIFA';
                } else if (jo.reply.activityVersion == '4') {
                    replace = 'hkqp-common3.0';
                } else {
                    replace = 'hkqp-common2.0';
                }
                sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
				sessionStorage.hotAreaName = jo.reply.hotAreaName;//热区名称
				sessionStorage.spuDayScanNum = jo.reply.spuDayScanNum;//当天spu扫码人数
				sessionStorage.skukey = jo.reply.skukey;
            }
            switch (jo.result.businessCode) {
                case '0': // 普通奖
                    sessionStorage.taoEasterEgg = jo.reply.taoEasterEgg || '';
                    sessionStorage.taoMemberOrderFlag = jo.reply.taoMemberOrderFlag;
                    sessionStorage.dayScanNum = jo.reply.dayScanNum;
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
                    if (sessionStorage.longitude == '00' || sessionStorage.latitude == '00') {
                        dom_location.style.display = 'block';
                        dom_location.addEventListener('click', function () {
                            if (replace == 'hkqp-common3.0') { //19年上线项目采用扫点得模式
                                location.replace('http://' + location.host + '/v/' + replace + '/getcash.html?bizcode=' + jo.result.businessCode);
                            } else {
                                location.replace('http://' + location.host + '/' + replace + '/txo/getcash?bizcode=' + jo.result.businessCode);
                            }
                            // location.replace('http://' + location.host + '/' + replace + '/txo/getcash?bizcode=' + jo.result.businessCode);
                        }, false);
                    } else {
                        if (replace == 'hkqp-common3.0') { //19年上线项目采用扫点得模式
                            location.replace('http://' + location.host + '/v/' + replace + '/getcash.html?bizcode=' + jo.result.businessCode);
                        } else {
                            location.replace('http://' + location.host + '/' + replace + '/txo/getcash?bizcode=' + jo.result.businessCode);
                        }
                    }
                    break;
                case '11': // 自己重复扫，普通奖
                    sessionStorage.taoEasterEgg = jo.reply.taoEasterEgg || '';
                    sessionStorage.taoMemberOrderFlag = jo.reply.taoMemberOrderFlag;
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime;
                    if (replace = 'hkqp-common3.0') { //19年上线项目采用扫点得模式
                        location.replace('http://' + location.host + '/v/' + replace + '/getcash.html?bizcode=' + jo.result.businessCode);
                    } else {
                        location.replace('http://' + location.host + '/' + replace + '/txo/getcash?bizcode=' + jo.result.businessCode);
                    }
                    break;
                case '12': // 可疑
                    location.replace('http://' + location.host + '/v/' + replace + '/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '13': // 黑名单
                    location.replace('http://' + location.host + '/v/' + replace + '/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '14': // 指定
                    location.replace('http://' + location.host + '/v/' + replace + '/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '7': // 大奖
                    sessionStorage.username = jo.reply.username === undefined ? '' : jo.reply.username;
                    sessionStorage.phonenum = jo.reply.phonenum === undefined ? '' : jo.reply.phonenum;
                    sessionStorage.idcard = jo.reply.idcard === undefined ? '' : jo.reply.idcard;
                    sessionStorage.skukey = jo.reply.skukey;
                    sessionStorage.prizeVcode = jo.reply.prizeVcode;
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    if (jo.reply.grandPrizeType == 'P' || jo.reply.grandPrizeType == 'p') {
                        location.replace('http://' + location.host + '/v/' + replace + '/prize.html?bizcode=' + jo.result.businessCode);
                    } else {
                        title_tip('尊敬的用户', '扫码异常！', '我知道了');
                    }
                    break;
                case '15': //他人重复扫大奖
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
                    location.replace('http://' + location.host + '/v/' + replace + '/prize.html?bizcode=' + jo.result.businessCode);
                    break;
                default:
                    if (jo.reply) {
                        sessionStorage.batchName = jo.reply.batchName === undefined ? '' : jo.reply.batchName;
                        sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime;
                        sessionStorage.msg = jo.result.msg;
                    } else {
                        sessionStorage.earnTime = '';
                    }
                    location.replace('http://' + location.host + '/v/' + replace + '/fail.html?bizcode=' + jo.result.businessCode);
            }
        } else if (jo.result.code == '-1') {
            title_tip('尊敬的用户', '系统升级中，请稍后再试！', '我知道了');
        } else {
            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
        }
    }


    function loading(txt) {
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