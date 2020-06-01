(function () {
    "use strict";
    var args = vge.urlparse(location.href),
        qr = args.s,
        openid = args.openid,
        vjifenOpenid = args.vjifenOpenid,
        unionid = '',
        i = 0;
	vge.clog('打开页面，开始权限注入', [new Date().getTime(),openid,qr]);	
    ini_wxshare(vge.hbqpappid);
    var flag = true;
    var dom_location = document.getElementById('location'),
        dom_fail = document.getElementById('fail');

    sessionStorage.clear();
    sessionStorage.openid = openid;
    sessionStorage.qr = qr;

    //	  setTimeout(function() { // 应对定位调用异常
    //	      if (sessionStorage.latitude===undefined) {
    //	             sweep();
    //	      }
    //	  }, 4000);

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
    //                 location.replace('http://' + location.host + '/v/hbqpMS/index.html');
    //             } else {
    //                 vge.clog('地理位置结束开始调接口-已允许', [new Date().getTime(),openid,qr]);
    //                 sweep();
    //             }
	// 		})
	// 	}else{
	// 		console.log(i)
	// 	}
	// }

    function locationed(res) {
        // loading('玩命加载中');
        _hmt.push(['_trackEvent', 'click', '抓取地理位置', '扫码']);
        dom_location.style.display = 'none';
        dom_fail.style.display = 'none';
        sessionStorage.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        sessionStorage.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        sessionStorage.speed = res.speed; // 速度，以米/每秒计
        sessionStorage.accuracy = res.accuracy; // 位置精度
        // vge.clog('河北扫码精度', [res.accuracy]);
        if (qr.indexOf('MS_') != -1) {
            location.replace('http://' + location.host + '/v/hbqpMS/index.html');
        } else {
            vge.clog('地理位置结束开始调接口-已允许', [new Date().getTime(),openid,qr]);
            sweep();
        }
        // loadImg(i);
    }
    wx.ready(function () {
		// vge.clog('权限注入结束开始获取地理位置', [new Date().getTime(),openid,qr]);
        // loading('玩命加载中');
        wx.hideOptionMenu();
        wxGetLocation();
    });

    function wxGetLocation() {
        wx.getLocation({
            type: 'wgs84',
            cancel: function (res) {
                loaded();
                dom_location.style.display = 'block';
                _hmt.push(['_trackEvent', 'click', '拒绝抓取地理位置', '扫码']);
                dom_location.addEventListener('click', function () {
                    $('.location').css('display', 'none');
                    // loadImg(i);
                    if (qr.indexOf('MS_') != -1) {
                        location.replace('http://' + location.host + '/v/hbqpMS/index.html');
                    } else {
                        vge.clog('地理位置结束开始调接口-已允许', [new Date().getTime(),openid,qr]);
                        sweep();
                    }
                }, false);
            },
            success: locationed, //接口调用完成时执行的回调函数，无论成功或失败都会执行。
            fail: function (res) {
                loaded();
                _hmt.push(['_trackEvent', 'click', '抓取地理位置失败', '扫码']);
                dom_fail.style.display = 'block';
                dom_fail.addEventListener('click', function () {
                    dom_fail.style.display = 'none';
                    // loadImg(i);
                    if (qr.indexOf('MS_') != -1) {
                        location.replace('http://' + location.host + '/v/hbqpMS/index.html');
                    } else {
                        vge.clog('地理位置结束开始调接口-已允许', [new Date().getTime(),openid,qr]);
                        sweep();
                    }
                }, false);
            }
        });
    }

    function sweep() {
        if (flag) {
            flag = false;
            loading('玩命加载中'); //调用接口
            var japi = vge.hbqp + '/DBTHBQPInterface/sweep/sweepQrcode';
            var req = {
                "openid": openid,
                "sweepstr": qr,
                "vjifenOpenid": vjifenOpenid,
                "longitude": sessionStorage.longitude === undefined ? '00' : sessionStorage.longitude, //"经度"
                "latitude": sessionStorage.latitude === undefined ? '00' : sessionStorage.latitude //"纬度"
            };
            vge.clog('debug', [japi, JSON.stringify(req)]);
            vge.callJApi(japi, req, cb);
        }
    }

    function cb(jo) {
		vge.clog('接口返回结果并开始跳转', [new Date().getTime(),openid,qr]);
        if (jo.result.code == '0') {
            var replace = 'hbqp-common2.0';
            if (jo.reply && jo.reply.activityVersion == '3') {
                replace = 'hbqp20180130';
            } else if (jo.reply && jo.reply.activityVersion == '2') {
                replace = 'hbqp20180130';
            } else if (jo.reply && jo.reply.activityVersion == '4') {
                replace = 'hbqp-common2.0';
            } else if (jo.reply && jo.reply.activityVersion == '5') { //2019标准版
                replace = 'hbqp-common3.0';
            } else if (jo.reply && jo.reply.activityVersion == '6') { //经典灌装
                replace = 'hbqp-common2.0-tin';
            } else if (jo.reply && jo.reply.activityVersion == '7') { //崂山瓶装
                replace = 'hbqp20190513';
            } else if (jo.reply && jo.reply.activityVersion == '8') { //崂山罐装 ===> 一期纸箱版
                replace = 'hbqp-stageI';
            }
            switch (jo.result.businessCode) {
                case '0': // 普通奖
                    sessionStorage.dayScanNum = jo.reply.dayScanNum;
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.currentVpoints = jo.reply.currentVpoints;//扫码所得积分
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    //新签到
                    sessionStorage.weekSignFlag = jo.reply.weekSignFlag; //用户是否开启自然周签到，1:开启、0或空:关闭
                    sessionStorage.weekSignPopup = jo.reply.weekSignPopup; //自然周签到弹出提示，1:弹出提示、0或空:不弹出
                    sessionStorage.setItem('signCogAry', JSON.stringify(jo.reply.signCogAry));
                    //捆绑
                    sessionStorage.promotionFlag = jo.reply.promotionFlag; //用户是否开启自然周签到，1:开启、0或空:关闭
                    sessionStorage.promotionPopup = jo.reply.promotionPopup; //自然周签到弹出提示，1:弹出提示、0或空:不弹出
                    sessionStorage.setItem('promotionCogAry', JSON.stringify(jo.reply.promotionCogAry));
                    // 一码双奖
                    if (jo.reply.doublePrize) {
                        sessionStorage.skukey = jo.reply.skukey;
                        sessionStorage.prizeVcode = jo.reply.prizeVcode;
                        sessionStorage.allAccountMoney = jo.reply.allAccountMoney;
                        sessionStorage.setItem('doublePrize', JSON.stringify(jo.reply.doublePrize));
                    }
                    //时间
                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
                    sessionStorage.dayScanNum = jo.reply.dayScanNum;
                    // 跳转
                    if (replace == 'hbqp-common3.0' || replace == 'hbqp-stageI') {
                        location.replace('http://' + location.host + '/v/' + replace + '/getcash.html?bizcode=' + jo.result.businessCode);
                    } else {
                        location.replace('http://' + location.host + '/' + replace + '/txo/getcash?bizcode=' + jo.result.businessCode);
                    }
                    if (jo.reply.activityVersion == '7') { // || jo.reply.activityVersion == '8'
                        location.replace('http://' + location.host + '/v/' + replace + '/fail.html?bizcode=' + jo.result.businessCode);
                    }
                    break;
                case '11': // 自己重复扫，普通奖
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.currentVpoints = jo.reply.currentVpoints;//扫码所得积分
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime;
                    if (replace == 'hbqp-common3.0' || replace == 'hbqp-stageI') {
                        location.replace('http://' + location.host + '/v/' + replace + '/getcash.html?bizcode=' + jo.result.businessCode);
                    } else {
                        location.replace('http://' + location.host + '/' + replace + '/txo/getcash?bizcode=' + jo.result.businessCode);
                    }
                    if (jo.reply.activityVersion == '7') {  // || jo.reply.activityVersion == '8'
                        location.replace('http://' + location.host + '/v/' + replace + '/fail.html?bizcode=' + jo.result.businessCode);
                    }
                    break;
                case '12': // 可疑用户
                    location.replace('http://' + location.host + '/v/' + replace + '/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '13': // 黑名单
                    location.replace('http://' + location.host + '/v/' + replace + '/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '14': // 与12相同
                    location.replace('http://' + location.host + '/v/' + replace + '/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '7': // 大奖
                    sessionStorage.username = jo.reply.username === undefined ? '' : jo.reply.username;
                    sessionStorage.phonenum = jo.reply.phonenum === undefined ? '' : jo.reply.phonenum;
                    sessionStorage.idcard = jo.reply.idcard === undefined ? '' : jo.reply.idcard;
                    sessionStorage.address = jo.reply.address === undefined ? '' : jo.reply.address;
                    sessionStorage.skukey = jo.reply.skukey;
                    if(jo.reply.username !=undefined){
                        sessionStorage.isGet = true;
                    }
                    sessionStorage.prizeVcode = jo.reply.prizeVcode;
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    if (jo.reply.activityVersion === '7' ) { // || jo.reply.activityVersion === '8'
                        //s足球 r金球
                        if (jo.reply.grandPrizeType.toUpperCase() == 'S' || jo.reply.grandPrizeType.toUpperCase() == 'R' || jo.reply.grandPrizeType.toUpperCase() == 'T') {
                            if (jo.reply.reSweep === '1') { //非第一次扫
                                location.replace('http://' + location.host + '/v/hbqp20190513/prize.html?bizcode=' + jo.result.businessCode);
                                return;
                            } else if (jo.reply.reSweep === '0') {
                                location.replace('http://' + location.host + '/' + replace + '/txo/getcash?bizcode=' + jo.result.businessCode);
                                return;
                            }
                        }
                    }
                    if (jo.reply.grandPrizeType == 'p' || jo.reply.grandPrizeType == 'P') {
                        location.replace('http://' + location.host + '/v/hbqp-common2.0/prize.html?bizcode=' + jo.result.businessCode);
                    } else if(jo.reply.grandPrizeType == 's' || jo.reply.grandPrizeType == 'S') {//S金球
                        location.replace('http://' + location.host + '/v/' + replace + '/prize.html?bizcode=' + jo.result.businessCode);
                    } else if(jo.reply.grandPrizeType == 't' || jo.reply.grandPrizeType == 'T') {//T纪念保温杯
                        location.replace('http://' + location.host + '/v/' + replace + '/prize.html?bizcode=' + jo.result.businessCode);
                    } else if(jo.reply.grandPrizeType == 'r' || jo.reply.grandPrizeType == 'R') {//R青岛啤酒有一套
                        location.replace('http://' + location.host + '/v/' + replace + '/prize.html?bizcode=' + jo.result.businessCode);
                    } else if(jo.reply.grandPrizeType == 'u' || jo.reply.grandPrizeType == 'U') {// U等奖-冬奥冰雪冬令营  二等奖
                        location.replace('http://' + location.host + '/v/' + replace + '/prize.html?bizcode=' + jo.result.businessCode);
                    } else {
                        title_tip('尊敬的用户', '扫码异常', '我知道了');
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