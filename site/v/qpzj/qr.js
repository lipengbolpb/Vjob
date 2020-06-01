(function () {
    "use strict";
    ini_wxshare(vge.qpzjappid);

    var args = vge.urlparse(location.href),
        unionid = '',
        first = true,
        qr = args.s,
        vjifenOpenid = args.vjifenOpenid,
        openid = args.openid, //青啤企openid
        i = 0;
    // alert(vjifenOpenid);//olcf0sx5
    // alert(openid);//olcf0sx5
    var dom_location = document.getElementById('location'),
        dom_fail = document.getElementById('fail');

    sessionStorage.clear();
    sessionStorage.openid = openid; //留备引导关注
    sessionStorage.vjifenOpenid = vjifenOpenid; //留备引导关注
    sessionStorage.qr = qr;

    setTimeout(function () { // 应对定位调用异常
        if (sessionStorage.latitude === undefined) {
            //          sweep();
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
	// 			// if (qr.indexOf('MS_') != -1) {
	// 			//     getMS();
	// 			// } else {
	// 			//     sweep();
    //             // }
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
        if (first) {
            first = false;
            loading('玩命加载中');
            var japi = vge.common + '/vjifenInterface/sweep/sweepQrcode';
            var req = { "projectServerName": "zhejiang",
                "openid": vjifenOpenid, //"v积分"
                "unionid": unionid,
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
        loaded();
        if (jo.result.code == '0') {
            var project = 'zjqp-common2.0';
            if (jo.reply) {
                if (jo.reply.activityVersion == '1') { //普通版
                    project = 'qpzj';
                } else if (jo.reply.activityVersion == '2') { //新年版
                    project = 'zjqp20180130';
                } else if (jo.reply.activityVersion == '3') { //经典版
                    project = 'zjqp-common2.0';
                } else if (jo.reply.activityVersion == '4') { //世界杯
                    project = 'zjqp-FIFA';
                } else {
                    project = 'zjqp-common2.0';
                }
                //  skyType 用于区分瓶和罐 //0是瓶1是罐
                if (jo.reply.skuType) {
                    sessionStorage.skuType = jo.reply.skuType === undefined ? '1' : jo.reply.skuType;
                }
				sessionStorage.dayScanNum = jo.reply.dayScanNum === undefined ? '2' : jo.reply.dayScanNum;
				sessionStorage.skukey = jo.reply.skukey;
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
				location.replace('http://' + location.host + '/v/zjqp-common2.0/verification.html?bizcode=' + jo.result.businessCode);
				return false;
			}

            switch (jo.result.businessCode) {
                case '0': // 普通奖
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    //新签到
                    sessionStorage.weekSignFlag = jo.reply.weekSignFlag; //用户是否开启自然周签到，1:开启、0或空:关闭
                    sessionStorage.weekSignPopup = jo.reply.weekSignPopup; //自然周签到弹出提示，1:弹出提示、0或空:不弹出
                    sessionStorage.setItem('signCogAry', JSON.stringify(jo.reply.signCogAry));
                    //捆绑
                    sessionStorage.promotionFlag = jo.reply.promotionFlag; //用户是否开启自然周签到，1:开启、0或空:关闭
                    sessionStorage.promotionPopup = jo.reply.promotionPopup; //自然周签到弹出提示，1:弹出提示、0或空:不弹出
                    sessionStorage.setItem('promotionCogAry', JSON.stringify(jo.reply.promotionCogAry));
                    //时间
                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
                    sessionStorage.bizcode = jo.result.businessCode; //受too影响作出的改动
                    location.replace('http://' + location.host + '/' + project + '/too/getcash?bizcode=' + jo.result.businessCode);
                    break;
                case '7': // 大奖
                    sessionStorage.username = jo.reply.username === undefined ? '' : jo.reply.username;
                    sessionStorage.phonenum = jo.reply.phonenum === undefined ? '' : jo.reply.phonenum;
                    sessionStorage.idcard = jo.reply.idcard === undefined ? '' : jo.reply.idcard;
					sessionStorage.address = jo.reply.address === undefined ? '' : jo.reply.address;
                    sessionStorage.skukey = jo.reply.skukey;
                    sessionStorage.prizeVcode = jo.reply.prizeVcode;
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    if (jo.reply.grandPrizeType == '1'||jo.reply.grandPrizeType.toLowerCase()=='q'||jo.reply.grandPrizeType.toLowerCase()=='r'||jo.reply.grandPrizeType.toLowerCase()=='p') {
                        location.replace('http://' + location.host + '/v/' + project + '/prize.html?bizcode=' + jo.result.businessCode);
                    } else {
                        title_tip('尊敬的用户', '扫码异常', '我知道了');
                    }
                    break;
                case '11': // 自己重复扫，普通奖
                    if (jo.reply.skukey == '241510936-008') {
                        location.replace('http://' + location.host + '/v/qpzj/ad.html');
                    } else {
                        sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                        sessionStorage.currentMoney = jo.reply.currentMoney;
                        sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                        sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime;
                        sessionStorage.bizcode = jo.result.businessCode;
                        sessionStorage.again = 'true';
                        if (project == 'qpzj') {
                            location.replace('http://' + location.host + '/' + project + '/too/repcash?bizcode=' + jo.result.businessCode);
                        } else {
                            location.replace('http://' + location.host + '/' + project + '/too/getcash?bizcode=' + jo.result.businessCode);
                        }
                    }
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
                case '15': //他人重复扫大奖
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
                    location.replace('http://' + location.host + '/v/' + project + '/prize.html?bizcode=' + jo.result.businessCode);
                    break;
                case '2':
                    if (jo.reply) {
                        if (jo.reply.skukey == '241510936-008') {
                            location.replace('http://' + location.host + '/v/qpzj/ad.html');
                        } else {
                            if (jo.reply) {
                                sessionStorage.batchName = jo.reply.batchName === undefined ? '' : jo.reply.batchName;
                                sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime;
                                sessionStorage.msg = jo.result.msg;
                            } else {
                                sessionStorage.earnTime = '';
                            }
                            location.replace('http://' + location.host + '/v/' + project + '/fail.html?bizcode=' + jo.result.businessCode);
                        }
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