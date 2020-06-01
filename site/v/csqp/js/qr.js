(function () {
    "use strict";
    ini_wxshare(vge.csqpappid);
    var args = vge.urlparse(location.href),
        i = 0,
        qr = args.s,
        vjifenOpenid = args.vjifenOpenid,
        openid = args.openid;
    var flag = true;

    var dom_location = document.getElementById('location'),
        dom_fail = document.getElementById('fail');

    sessionStorage.clear();
    sessionStorage.openid = openid;
    sessionStorage.qr = qr;

    setTimeout(function () { // 应对定位调用异常
        if (sessionStorage.latitude === undefined) {
            //          sweep();
        }
    }, 4000);

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
	// 		})
	// 	}else{
	// 		console.log(i)
	// 	}
	// }

    function locationed(res) {
        dom_location.style.display = 'none';
        dom_fail.style.display = 'none';
        // loading('玩命加载中');
        sessionStorage.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        sessionStorage.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        sessionStorage.speed = res.speed; // 速度，以米/每秒计
        sessionStorage.accuracy = res.accuracy; // 位置精度
        sweep();
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
        if (flag) {
            i++;
            flag = false;
            loading('玩命加载中'); //调用接口
            var japi = vge.csqp + '/DBTHuNanQPInterface/sweep/sweepQrcode';
            var req = {
                "openid": openid,
                "vjifenOpenid": vjifenOpenid,
                "sweepstr": qr,
                "longitude": sessionStorage.longitude === undefined ? '00' : sessionStorage.longitude, //"经度"
                "latitude": sessionStorage.latitude === undefined ? '00' : sessionStorage.latitude //"纬度"
            };
            vge.clog('debug', [japi, JSON.stringify(req), i]);
            vge.callJApi(japi, req, cb);
        }

    }




    function cb(jo) {
        var now = new Date();
        console.log("时间:" + now.getTime());
        if (jo.result.code == '0') {
            var replace = 'csqp-common';
            if (jo.reply) {
                // vge.clog('阶梯红包', [JSON.stringify(jo.reply)]);
                // 中秋节红包
                if (jo.reply.scanLadderFlag) {
                    sessionStorage.scanLadderFlag = jo.reply.scanLadderFlag;
                } 
                if (jo.reply.spuDayScanNum) { // "spuDayScanNum":"用户当天SPU扫码次数",
                    sessionStorage.spuDayScanNum = jo.reply.spuDayScanNum;
                }
                // 仅对经典19展示中秋弹窗
                sessionStorage.skukey = jo.reply.skukey;

                if (jo.reply.activityVersion == '1') { //听故事版
                    replace = 'csqp';
                } else if (jo.reply.activityVersion == '2') { //新年版
                    replace = 'csqp20180130';
                } else if (jo.reply.activityVersion == '3') { //经典通用版
                    replace = 'csqp-common3.0';
                } else if (jo.reply.activityVersion == '4') { //世界杯
                    replace = 'csqp-FIFA';
                } else {
                    replace = 'csqp-common3.0';
                }
            }
            switch (jo.result.businessCode) {
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
                    sessionStorage.currentVpoints = jo.reply.currentVpoints;
                    // K币
                    sessionStorage.kbUrl = jo.reply.kbUrl === undefined ? '' : jo.reply.kbUrl;
                    // 捆绑促销
                    sessionStorage.promotionFlag = jo.reply.promotionFlag === undefined ? '' : jo.reply.promotionFlag; //用户是否开启自然周签到，1:开启、0或空:关闭
                    sessionStorage.promotionPopup = jo.reply.promotionPopup === undefined ? '' : jo.reply.promotionPopup; //自然周签到弹出提示，1:弹出提示、0或空:不弹出
                    sessionStorage.setItem('promotionCogAry', JSON.stringify(jo.reply.promotionCogAry));
                    if(replace == 'csqp-common3.0'){
                      location.replace('http://' + location.host + '/v/' + replace + '/getcash.html?bizcode=' + jo.result.businessCode);
                    }else{
                      location.replace('http://' + location.host + '/' + replace + '/txo/getcash?bizcode=' + jo.result.businessCode);
                    }
                    break;
                case '7': // 大奖
                    sessionStorage.username = jo.reply.username === undefined ? '' : jo.reply.username;
                    sessionStorage.phonenum = jo.reply.phonenum === undefined ? '' : jo.reply.phonenum;
                    sessionStorage.idcard = jo.reply.idcard === undefined ? '' : jo.reply.idcard;
                    sessionStorage.skukey = jo.reply.skukey;
                    sessionStorage.prizeVcode = jo.reply.prizeVcode;
                    sessionStorage.expireTime = jo.reply.expireTime === undefined ? '' : jo.reply.expireTime; //扫码时间
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    if (jo.reply.grandPrizeType == '1') { //草莓音乐节
                        location.replace('http://' + location.host + '/v/' + replace + '/prize.html?bizcode=' + jo.result.businessCode);
                    } else if (jo.reply.grandPrizeType == 'P'|| jo.reply.grandPrizeType == 'p') { //P等奖-冬奥环球之旅
                        location.replace('http://' + location.host + '/v/' + replace + '/prize.html?bizcode=' + jo.result.businessCode);
                    } else if (jo.reply.grandPrizeType == 'Q'||jo.reply.grandPrizeType == 'q') { //Q等奖-冰雪冬令营
                        location.replace('http://' + location.host + '/v/' + replace + '/prize.html?bizcode=' + jo.result.businessCode);
                    } else if (jo.reply.grandPrizeType == 'R'||jo.reply.grandPrizeType == 'r') { //R等奖-青啤有一套
                        location.replace('http://' + location.host + '/v/' + replace + '/prize.html?bizcode=' + jo.result.businessCode);
                    } else {
                        title_tip('尊敬的用户', '扫码异常', '我知道了');
                    }
                    break;
                case '11': // 自己重复扫，普通奖
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime;
                    sessionStorage.dayScanNum = jo.reply.dayScanNum;
                    sessionStorage.currentVpoints = jo.reply.currentVpoints;
                    if(replace == 'csqp-common3.0'){
                      location.replace('http://' + location.host + '/v/' + replace + '/getcash.html?bizcode=' + jo.result.businessCode);
                    }else{
                      location.replace('http://' + location.host + '/' + replace + '/txo/getcash?bizcode=' + jo.result.businessCode);
                    }
                    break;
                case '12': // 
                    location.replace('http://' + location.host + '/v/' + replace + '/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '13': // 
                    location.replace('http://' + location.host + '/v/' + replace + '/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '14': // 
                    location.replace('http://' + location.host + '/v/' + replace + '/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '15': //他人重复扫大奖
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
                    if (jo.reply.grandPrizeType == '1') { //草莓音乐节
                        location.replace('http://' + location.host + '/v/' + replace + '/prize.html?bizcode=' + jo.result.businessCode);
                    } else if (jo.reply.grandPrizeType == 'P'|| jo.reply.grandPrizeType == 'p') { //P等奖-冬奥环球之旅
                        location.replace('http://' + location.host + '/v/' + replace + '/prize.html?bizcode=' + jo.result.businessCode);
                    } else if (jo.reply.grandPrizeType == 'Q'||jo.reply.grandPrizeType == 'q') { //Q等奖-冰雪冬令营
                        location.replace('http://' + location.host + '/v/' + replace + '/prize.html?bizcode=' + jo.result.businessCode);
                    } else if (jo.reply.grandPrizeType == 'R'||jo.reply.grandPrizeType == 'r') { //R等奖-青啤有一套
                        location.replace('http://' + location.host + '/v/' + replace + '/prize.html?bizcode=' + jo.result.businessCode);
                    } else {
                        title_tip('尊敬的用户', '扫码异常', '我知道了');
                    }
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