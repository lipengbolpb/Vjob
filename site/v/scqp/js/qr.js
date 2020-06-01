(function () { 
    "use strict";
    ini_wxshare(vge.scqpappid);
    var now1 = new Date();
    var args = vge.urlparse(location.href),
        qr = args.s,
        openid = args.openid,
        vjifenOpenid=args.vjifenOpenid,
        unionid = '';
    var flag = true;
    var i = 0;
    // $('#info').html('您扫的码是【'+qr+'】<br>openid: '+openid+'<br>scqpappid:'+vge.scqpappid);

    var dom_location = document.getElementById('location'),
        dom_fail = document.getElementById('fail');

    sessionStorage.clear();
    sessionStorage.openid = openid;
    sessionStorage.qr = qr;

    // setTimeout(function () { // 应对定位调用异常
    //     if (sessionStorage.latitude === undefined) {
    //         sweep();
    //     }
    // }, 4000);

    // function locationed(res) {
    //     sessionStorage.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
    //     sessionStorage.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
    //     sessionStorage.speed = res.speed; // 速度，以米/每秒计
    //     sessionStorage.accuracy = res.accuracy; // 位置精度
    //     sweep();
    // }


    // loading('玩命加载中'); //获取用户信息  
    // wx.ready(function () {
    //     loading('玩命加载中');
    //     wx.getLocation({
    //         type: 'wgs84',
    //         complete: locationed //接口调用完成时执行的回调函数，无论成功或失败都会执行。
    //     });
    // });

    // function sweep() {
    //     if (flag) {
    //         flag = false;
    //         loading('玩命加载中'); //调用接口
    //         var japi = vge.common+ '/vjifenInterface/sweep/sweepQrcode';
    //         var req = { "projectServerName": "sichuan",
    //             "openid": openid,
    //             //          	"unionid":unionid,
    //             "sweepstr": qr,
    //             "longitude": sessionStorage.longitude === undefined ? '00' : sessionStorage.longitude, //"经度"
    //             "latitude": sessionStorage.latitude === undefined ? '00' : sessionStorage.latitude //"纬度"
    //         };
    //         vge.clog('debug', [japi, JSON.stringify(req)]);
    //         vge.callJApi(japi, req, cb);
    //     }

    // }

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
        sessionStorage.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        sessionStorage.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        sessionStorage.speed = res.speed; // 速度，以米/每秒计
        sessionStorage.accuracy = res.accuracy; // 位置精度
        sweep();
        // loadImg(i);
    }
    wx.ready(function () {
        wxGetLocation();
        wx.hideOptionMenu();
    });

    dom_fail.addEventListener('click', function () {
        dom_location.style.display = 'none';
        dom_fail.style.display = 'none';
        sweep();
        // loadImg(i);
    }, false);

    function wxGetLocation() {
        wx.getLocation({
            type: 'wgs84',
            cancel: function (res) {
                loaded();
                dom_location.style.display = 'block';
                dom_location.addEventListener('click', function () {
                    dom_location.style.display = 'none';
                    dom_fail.style.display = 'none';
                    sweep();
                    // loadImg(i);
                }, false);
            },
            success: locationed, //接口调用完成时执行的回调函数，无论成功或失败都会执行。
            fail: function (res) {
                loaded();
                dom_location.style.display = 'none';
                dom_fail.style.display = 'block';
            }
        });
    }

    function sweep() {
        if (flag) {
            flag = false;
            loading('玩命加载中'); //调用接口
            var japi = vge.common+ '/vjifenInterface/sweep/sweepQrcode';
            var req = { "projectServerName": "sichuan",
                "openid": openid,
                "sweepstr": qr,
                "vjifenOpenid":vjifenOpenid,
                "longitude": sessionStorage.longitude === undefined ? '00' : sessionStorage.longitude, //"经度"
                "latitude": sessionStorage.latitude === undefined ? '00' : sessionStorage.latitude //"纬度"
            };
            vge.clog('debug', [japi, JSON.stringify(req)]);
            vge.callJApi(japi, req, cb);
        }

    }

    function cb(jo) {
        //      loaded();
        //         if(!confirm('返回码:'+jo.result.businessCode+' 是否跳转')) {
        //             return;
        //         }
        if (jo.result.code == '0') {
            var PROJECT = 'scqp-common3.0';
            if (jo.reply) {
                if (jo.reply.activityVersion == '3') {
                    PROJECT = 'scqp-common3.0';
                } else if (jo.reply.activityVersion == '1') {
                    PROJECT = 'scqp';
                }
                // 根据不同版本号选择不同活动规则
                sessionStorage.activityVersion = jo.reply.activityVersion;
                sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
                sessionStorage.city = jo.reply.city;
            }
            switch (jo.result.businessCode) {
                case '0': // 普通奖
                    sessionStorage.taoEasterEgg = jo.reply.taoEasterEgg || '';
                    sessionStorage.taoMemberOrderFlag = jo.reply.taoMemberOrderFlag;
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
					sessionStorage.dayScanNum = jo.reply.dayScanNum;
                    location.replace('http://' + location.host + '/' + PROJECT + '/txo/getcash?bizcode=' + jo.result.businessCode);
                    break;
                case '11': // 自己重复扫，普通奖
                    sessionStorage.taoEasterEgg = jo.reply.taoEasterEgg || '';
                    sessionStorage.taoMemberOrderFlag = jo.reply.taoMemberOrderFlag;
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    location.replace('http://' + location.host + '/' + PROJECT + '/txo/getcash?bizcode=' + jo.result.businessCode);
                    break;
                case '12': // 可疑用户
                    location.replace('http://' + location.host + '/v/' + PROJECT + '/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '13': // 黑名单
                    location.replace('http://' + location.host + '/v/' + PROJECT + '/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '14': // 与12相同
                   
                    location.replace('http://' + location.host + '/v/' + PROJECT + '/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '7': // 大奖
                    sessionStorage.username = jo.reply.username === undefined ? '' : jo.reply.username;
                    sessionStorage.phonenum = jo.reply.phonenum === undefined ? '' : jo.reply.phonenum;
                    sessionStorage.address = jo.reply.address === undefined ? '' : jo.reply.address;
                    sessionStorage.skukey = jo.reply.skukey;
                    sessionStorage.prizeVcode = jo.reply.prizeVcode;
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    
                    if (jo.reply.grandPrizeType == 'p' || jo.reply.grandPrizeType == 'P') {
                        location.replace('http://' + location.host + '/v/' + PROJECT + '/prize.html?bizcode=' + jo.result.businessCode);
                    }
                    break;
                case '15': //他人重复扫大奖
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    if (jo.reply.grandPrizeType == 'p' || jo.reply.grandPrizeType == 'P') {
                        location.replace('http://' + location.host + '/v/' + PROJECT + '/prize.html?bizcode=' + jo.result.businessCode);
                    }
                    break;
                default:
                    if (jo.reply) {
                        sessionStorage.batchName = jo.reply.batchName === undefined ? '' : jo.reply.batchName;
                        sessionStorage.msg = jo.result.msg;
                    }
                    location.replace('http://' + location.host + '/v/' + PROJECT + '/fail.html?bizcode=' + jo.result.businessCode);
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