(function () {
    "use strict";
    ini_wxshare(vge.jlqpappid);
    var args = vge.urlparse(location.href),
        qr = args.s,
        openid = args.openid,
        vjifenOpenid = args.vjifenOpenid,
        i=0,
        unionid = '';
    var flag = true,
        project = 'jlqp-common';

    var dom_location = document.getElementById('location'),
        dom_fail = document.getElementById('fail');

    sessionStorage.clear();
    sessionStorage.openid = openid;
    sessionStorage.qr = qr;

//    	setTimeout(function() { // 应对定位调用异常
//          if (sessionStorage.latitude===undefined) {
//              sweep();
//          }
//      }, 5000);

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
        // loading('玩命加载中');
        _hmt.push(['_trackEvent', 'click', '允许抓取-山西', '扫码']);
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
                _hmt.push(['_trackEvent', 'click', '拒绝抓取-山西', '扫码']);
                dom_location.addEventListener('click', function () {
                    $('.location').css('display', 'none');
                    sweep();
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
                    sweep();
                    // loadImg(i);
                }, false);
            }
        });
    }

    function sweep() {
        if (flag) {
            flag = false;
            loading('玩命加载中'); //调用接口
            var japi = vge.jlqp + '/DBTJLQPInterface/sweep/sweepQrcode';
            var req = {
                "openid": openid,
                "vjifenOpenid": vjifenOpenid,
                "sweepstr": qr,
                "longitude": sessionStorage.longitude === undefined ? '00' : sessionStorage.longitude, //"经度"
                "latitude": sessionStorage.latitude === undefined ? '00' : sessionStorage.latitude //"纬度"
            };
            vge.clog('debug', [japi, JSON.stringify(req)]);
            vge.callJApi(japi, req, cb);
        }

    }

    function cb(jo) {
        if (jo.result.code == '0') {
            if (jo.reply) {
                if (jo.reply.activityVersion == '1') {//经典
                    project = 'jlqp-common';
                    sessionStorage.skukey = jo.reply.skukey;
                    sessionStorage.activityVersion = jo.reply.activityVersion;
                } else if (jo.reply.activityVersion == '2') {//新年
                    project = 'jlqp-common';
                    sessionStorage.skukey = jo.reply.skukey;
                    sessionStorage.activityVersion = jo.reply.activityVersion;
                } else if (jo.reply.activityVersion == '3') {//崂山
                    project = 'jlqp-laoshan';
                    sessionStorage.skukey = jo.reply.skukey;
                    sessionStorage.activityVersion = jo.reply.activityVersion;
                } else if(jo.reply.activityVersion == '4'){ // 崂山手提版UI版本号：4
                    project = 'jlqp-laoshanShouti';
                    sessionStorage.skukey = jo.reply.skukey;
                    sessionStorage.activityVersion = jo.reply.activityVersion;
                } else {
                    project = 'jlqp-common';
                    sessionStorage.skukey = jo.reply.skukey;
                    sessionStorage.activityVersion = jo.reply.activityVersion;
                }
            }
            switch (jo.result.businessCode) {
                case '0': // 普通奖
                    sessionStorage.taoEasterEgg = jo.reply.taoEasterEgg || '';
                    sessionStorage.taoMemberOrderFlag = jo.reply.taoMemberOrderFlag;
                    sessionStorage.dayScanNum = jo.reply.dayScanNum;
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
                    sessionStorage.earnTime = jo.reply.earnTime;
                    location.replace('http://' + location.host + '/' + project + '/txo/getcash?bizcode=' + jo.result.businessCode);
                    break;
                case '11': // 自己重复扫，普通奖
                    sessionStorage.taoEasterEgg = jo.reply.taoEasterEgg || '';
                    sessionStorage.taoMemberOrderFlag = jo.reply.taoMemberOrderFlag;
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
                    sessionStorage.address = jo.reply.address === undefined ? '' : jo.reply.address;
                    sessionStorage.skukey = jo.reply.skukey;
                    sessionStorage.prizeVcode = jo.reply.prizeVcode;
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    // Q等奖-尖叫之夜演唱会门票
                    // if (jo.reply.grandPrizeType == 'p' || jo.reply.grandPrizeType == 'P' || jo.reply.grandPrizeType == 'q' || jo.reply.grandPrizeType == 'Q') {
                    //     location.replace('http://' + location.host + '/v/jlqp-common/prize.html?bizcode=' + jo.result.businessCode);
                    // } else if(jo.reply.grandPrizeType == '1'){
                    // 	location.replace('http://' + location.host + '/v/jlqp-laoshan/prize.html?bizcode=' + jo.result.businessCode);
                    // } 
                    if (jo.reply.grandPrizeType == 'p' || jo.reply.grandPrizeType == 'P' || jo.reply.grandPrizeType == 'q' || jo.reply.grandPrizeType == 'Q' || jo.reply.grandPrizeType == '1') {
                        location.replace('http://' + location.host + '/v/' + project + '/prize.html?bizcode=' + jo.result.businessCode);
                    } else {
                        title_tip('尊敬的用户', '扫码异常', '我知道了');
                    }
                    break;
                case '15': //他人重复扫大奖
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
                    location.replace('http://' + location.host + '/v/' + project + '/prize.html?bizcode=' + jo.result.businessCode);
                    break;
				case '22': //特殊批次提示品牌宣传页
				    location.replace('http://' + location.host + '/v/jlqp-common/active.html?bizcode=' + jo.result.businessCode);
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