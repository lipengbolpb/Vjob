(function () {
    "use strict";
    ini_wxshare(vge.hnqpappid);

    var args = vge.urlparse(location.href),
        unionid = '',
        first = true,
        qr = args.s,
        vjifenOpenid = args.vjifenOpenid,
		i=0,
        openid = args.openid;
	
	var batchList = ['7F6','4QH','E8G','SNR','RB3','K3W','VJQ'];
	
    var dom_location = document.getElementById('location');
    var dom_fail = document.getElementById('location_fail');
    var dom_locationNewyear = document.getElementById('location-newyear');
    var dom_locationJingdian = document.getElementById('location-jingdian');
    sessionStorage.clear();
    sessionStorage.openid = openid;
    sessionStorage.qr = qr;

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
        loading('玩命加载中');
        sessionStorage.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        sessionStorage.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        sessionStorage.speed = res.speed; // 速度，以米/每秒计
        sessionStorage.accuracy = res.accuracy; // 位置精度
        sweep();
        // loadImg(i);
    }
	if(batchList.indexOf(qr.substring(0,3))!=-1){
		return false;
	}else{
		document.title = '青岛啤酒华南';
		wx.ready(function () {
	        wx.hideOptionMenu();
	        wxGetLocation();
	   });	
	}
	
    function wxGetLocation() {
        wx.getLocation({
            type: 'wgs84',
            cancel: function (res) {
                loaded();
                dom_location.style.display = 'block';
                dom_location.addEventListener('click', function () {
                    dom_location.style.display = 'none';
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
            first = false;
            loading('玩命加载中');
            var japi = vge.common + '/vjifenInterface/sweep/sweepVerify';
            var req = { "projectServerName": "huanan",
                "openid": openid,
                "vjifenOpenid": vjifenOpenid,
                "sweepstr": qr,
                "longitude": sessionStorage.longitude, //"经度"
                "latitude": sessionStorage.latitude //"纬度"
            };
            vge.clog('debug', [japi, JSON.stringify(req)]);
            vge.callJApi(japi, req, cb);
        }
    }

    function cb(jo) {
        loaded();
        vge.clog('wxl', [JSON.stringify(jo)]);
        if (jo.result.code == '0') {
            if (jo.result.businessCode == '-1') {
                loaded();
                title_tip('尊敬的用户', '系统升级中...', '我知道了');
                return;
            } else if (jo.result.businessCode == '2' && jo.reply == undefined) {
                loaded();
                title_tip('尊敬的用户', '识别失败，请稍后再试', '我知道了');
                return;
            }
            var PROJECT = 'gdqp';
            if (jo.reply) {
                if (jo.reply.activityVersion == '1') { //广东普通版
                    PROJECT = 'gdqp';
                } else if (jo.reply.activityVersion == '2') { //海南普通版
                    PROJECT = 'hnqp';
                } else if (jo.reply.activityVersion == '3') { //海南灌装（自行车）
                    PROJECT = 'hnqp20170520';
                } else if (jo.reply.activityVersion == '4') { //广东灌装（纯生）
                    // PROJECT = 'hnqp20171205';
                    PROJECT = 'hnqp-common3.0';
                } else if (jo.reply.activityVersion == '5') { //广东灌装（绿罐）
                    // PROJECT = 'hnqp20171206';
                    PROJECT = 'hnqp-common3.0';
                } else if (jo.reply.activityVersion == '6') { //新年版
                    PROJECT = 'hnqp20180130';
                } else if (jo.reply.activityVersion == '7') { //经典通用版
                    PROJECT = 'hnqp-common3.0';
                } else if (jo.reply.activityVersion == '8') { //世界杯扫码版
                    PROJECT = 'hnqp-common3.0';
                } else if (jo.reply.activityVersion == '9') { //世界杯俄罗斯版
                    PROJECT = 'hnqp-zunxiang';
                }
                // 根据不同版本号选择不同活动规则
                sessionStorage.activityVersion = jo.reply.activityVersion;
				sessionStorage.skukey = jo.reply.skukey;
            }
            switch (jo.result.businessCode) {
                case '0': // 普通奖
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
                    if(PROJECT == 'gdqp'){
                        location.replace('http://' + location.host + '/' + PROJECT + '/txo/getcash?bizcode=' + jo.result.businessCode);
                    }else{
                        location.replace('http://' + location.host + '/v/' + PROJECT + '/getcash.html?bizcode=' + jo.result.businessCode);
                    }
                    break;
                case '7': // 大奖
                    sessionStorage.username = jo.reply.username === undefined ? '' : jo.reply.username;
                    sessionStorage.phonenum = jo.reply.phonenum === undefined ? '' : jo.reply.phonenum;
                    sessionStorage.idcard = jo.reply.idcard === undefined ? '' : jo.reply.idcard;
                    sessionStorage.skukey = jo.reply.skukey;
                    sessionStorage.prizeVcode = jo.reply.prizeVcode;
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    PROJECT = "hnqp-zunxiang";
                    if (jo.reply.grandPrizeType == 'p' || jo.reply.grandPrizeType == 'P') {
                        location.replace('http://' + location.host + '/v/' + PROJECT + '/prize.html?bizcode=' + jo.result.businessCode);
                    } else if (jo.reply.grandPrizeType == 'q' || jo.reply.grandPrizeType == 'Q') {//冬奥环球之旅1次
                        location.replace('http://' + location.host + '/v/' + PROJECT + '/prize.html?bizcode=' + jo.result.businessCode);
                    } else if (jo.reply.grandPrizeType == 'r' || jo.reply.grandPrizeType == 'R') {//冬奥冰雪冬令营
                        location.replace('http://' + location.host + '/v/' + PROJECT + '/prize.html?bizcode=' + jo.result.businessCode);
                    } else if (jo.reply.grandPrizeType == 's' || jo.reply.grandPrizeType == 'S') {//P20手机
                        location.replace('http://' + location.host + '/v/' + PROJECT + '/prize.html?bizcode=' + jo.result.businessCode);
                    } else if (jo.reply.grandPrizeType == 't' || jo.reply.grandPrizeType == 'T') {//青啤有一套
                        location.replace('http://' + location.host + '/v/' + PROJECT + '/prize.html?bizcode=' + jo.result.businessCode);
                    }  else if (jo.reply.grandPrizeType == '1' || jo.reply.grandPrizeType == '2') {
                        location.replace('http://' + location.host + '/v/hnqp20171205/prize.html?bizcode=' + jo.result.businessCode);
                    } else {
                        title_tip('尊敬的用户', '扫码异常', '我知道了');
                    }
                    break;
                case '15': //他人重复扫大奖
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
                    PROJECT = "hnqp-zunxiang";
                    if(jo.reply.grandPrizeType == '1' || jo.reply.grandPrizeType == '2'){
                        location.replace('http://' + location.host + '/v/hnqp20171205/prize.html?bizcode=' + jo.result.businessCode);
                    }else if(jo.reply.grandPrizeType == 'p' || jo.reply.grandPrizeType == 'P'){
                        location.replace('http://' + location.host + '/v/' + PROJECT + '/prize.html?bizcode=' + jo.result.businessCode);
                    }else if(jo.reply.grandPrizeType == 'q' || jo.reply.grandPrizeType == 'Q'){
                        location.replace('http://' + location.host + '/v/' + PROJECT + '/prize.html?bizcode=' + jo.result.businessCode);
                    }else if(jo.reply.grandPrizeType == 'r' || jo.reply.grandPrizeType == 'R'){
                        location.replace('http://' + location.host + '/v/' + PROJECT + '/prize.html?bizcode=' + jo.result.businessCode);
                    }else if(jo.reply.grandPrizeType == 's' || jo.reply.grandPrizeType == 'S'){
                        location.replace('http://' + location.host + '/v/' + PROJECT + '/prize.html?bizcode=' + jo.result.businessCode);
                    }else if(jo.reply.grandPrizeType == 't' || jo.reply.grandPrizeType == 'T'){
                        location.replace('http://' + location.host + '/v/' + PROJECT + '/prize.html?bizcode=' + jo.result.businessCode);
                    }
                    // location.replace('http://' + location.host + '/v/' + PROJECT + '/prize.html?bizcode=' + jo.result.businessCode);
                    break;
                case '11': // 自己重复扫，普通奖
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime;
                    if (PROJECT == 'gdqp' || PROJECT == 'hnqp20171206') {
                        if (sessionStorage.currentMoney == 19.03) {
                            location.replace('http://' + location.host + '/gdqp/txo/1903?bizcode=' + jo.result.businessCode);
                        } else {
                            location.replace('http://' + location.host + '/' + PROJECT + '/txo/getcash?bizcode=' + jo.result.businessCode);
                        }
                    } else {
                        location.replace('http://' + location.host + '/v/' + PROJECT + '/getcash.html?bizcode=' + jo.result.businessCode);
                    }
                    break;
                case '12': // 可疑
                    location.replace('http://' + location.host + '/v/' + PROJECT + '/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '13': // 黑名单
                    location.replace('http://' + location.host + '/v/' + PROJECT + '/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '14': // 指定
                    location.replace('http://' + location.host + '/v/' + PROJECT + '/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                default:
                    if (jo.reply) {
                        sessionStorage.batchName = jo.reply.batchName === undefined ? '' : jo.reply.batchName;
                        sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime;
                        sessionStorage.msg = jo.result.msg;
                    } else {
                        sessionStorage.earnTime = '';
                    }
                    location.replace('http://' + location.host + '/v/' + PROJECT + '/fail.html?bizcode=' + jo.result.businessCode);
            }
        } else if (jo.result.code == '-1') {
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