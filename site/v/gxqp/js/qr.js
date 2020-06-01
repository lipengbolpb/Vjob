(function () { 
    ini_wxshare(vge.gxqpappid);
    var args = vge.urlparse(location.href),
        qr = args.s,
        first = true,
        openid = args.openid, //广西省区
        i=0,
        unionid = '',
        // project = 'gxqp201703',
        vjifenOpenid = args.vjifenOpenid;

    var dom_location = document.getElementById('location'),
        dom_fail = document.getElementById('fail');

    sessionStorage.clear();
    sessionStorage.openid = openid;
    sessionStorage.vjifenOpenid = vjifenOpenid;
    sessionStorage.qr = qr;
    // alert('hbopenid:'+hbopenid);//ojM
    // alert('vjifenOpenid:'+vjifenOpenid);//olcf0sx
    //  setTimeout(function () {
    //      if (sessionStorage.latitude === undefined) {
    ////          sweep();
    //      }
    //  }, 4500);

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
 //                sweep();
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
        // loading('玩命加载中');
        dom_location.style.display = 'none';
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
                sweep();
                // loadImg(i);
                // dom_location.style.display = 'block';
                // dom_location.addEventListener('click', function () {
                //     dom_location.style.display = 'none';
                //     sweep();
                // }, false);
            },
            success: locationed, //接口调用完成时执行的回调函数，无论成功或失败都会执行。
            fail: function (res) {
                loaded();
                sweep();
                // loadImg(i);
                // dom_location.style.display = 'none';
                // dom_location.style.display = 'block';
                // dom_location.addEventListener('click', function () {
                //     dom_location.style.display = 'none';
                //     dom_location.style.display = 'none';
                //     sweep();
                // }, false);
            }
        });
    }

    function sweep() {
        loading('玩命加载中');
        if (first) {
            first = false;
            var japi = vge.common + '/vjifenInterface/sweep/sweepQrcode';
            var req = { "projectServerName": "guangxi",
                "openid": vjifenOpenid,
                "sweepstr": qr,
                "vjifenOpenid": vjifenOpenid,
                "longitude": sessionStorage.longitude === undefined ? '' : sessionStorage.longitude, //"经度"
                "latitude": sessionStorage.latitude === undefined ? '' : sessionStorage.latitude //"纬度"
            };
            vge.callJApi(japi, req, cb);
            vge.clog('调接口次数', [japi, JSON.stringify(req)]);
        } else {
            return;
        }
    }

    function cb(jo) {
        vge.clog('调接口次数', [JSON.stringify(jo)]);
        loaded()
        if (jo.result.code == '0') {
            var PROJECT = 'gxqp-final2019';
            if (jo.reply) {
                if (jo.reply.activityVersion === '2') {
                    PROJECT = 'gxqp20171214';
                } else if (jo.reply.activityVersion === '3') {
                    PROJECT = 'gxqp201703';
                } else if (jo.reply.activityVersion === '4') {
                    PROJECT = 'gxqp-common2.0';
                } else if (jo.reply.activityVersion === '5') {
                    PROJECT = 'gxqp-FIFA';
                } else if (jo.reply.activityVersion === '6') {
                    PROJECT = 'gxqp-common3.0';
                } else if (jo.reply.activityVersion === '7') {
                    PROJECT = 'gxqp-final2019';
                } else {
                    PROJECT = 'gxqp-final2019';
                }
                sessionStorage.activityVersion = jo.reply.activityVersion;
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
				location.replace('http://' + location.host + '/v/gxqp-common3.0/verification.html?bizcode=' + jo.result.businessCode);
				return false;
			}
            switch (jo.result.businessCode) {
                case '0': // 普通奖
                    sessionStorage.taoEasterEgg = jo.reply.taoEasterEgg || '';
                    sessionStorage.taoMemberOrderFlag = jo.reply.taoMemberOrderFlag;
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
                    //新签到
                    sessionStorage.weekSignFlag = jo.reply.weekSignFlag; //用户是否开启自然周签到，1:开启、0或空:关闭
                    sessionStorage.weekSignPopup = jo.reply.weekSignPopup; //自然周签到弹出提示，1:弹出提示、0或空:不弹出
                    sessionStorage.setItem('signCogAry', JSON.stringify(jo.reply.signCogAry));
                    //捆绑
                    sessionStorage.promotionFlag = jo.reply.promotionFlag; //用户是否开启自然周签到，1:开启、0或空:关闭
                    sessionStorage.promotionPopup = jo.reply.promotionPopup; //自然周签到弹出提示，1:弹出提示、0或空:不弹出
                    sessionStorage.setItem('promotionCogAry', JSON.stringify(jo.reply.promotionCogAry));
                    sessionStorage.dayScanNum = jo.reply.dayScanNum;
                    if (PROJECT == 'gxqp-common3.0'||PROJECT == 'gxqp-common2.0'||PROJECT == 'gxqp-final2019' ) { //19年新上线项目采用扫点得流程
                        location.replace('http://' + location.host + '/v/' + PROJECT + '/getcash.html?bizcode=' + jo.result.businessCode);
                    } else {
                        location.replace('http://' + location.host + '/' + PROJECT + '/txo/getcash?bizcode=' + jo.result.businessCode);
                    }
                    break;
                case '11': // 自己重复扫，普通奖
                    sessionStorage.taoEasterEgg = jo.reply.taoEasterEgg || '';
                    sessionStorage.taoMemberOrderFlag = jo.reply.taoMemberOrderFlag;
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    sessionStorage.earnTime = jo.reply.earnTime;
                    if (PROJECT == 'gxqp-common3.0'||PROJECT == 'gxqp-common2.0'||PROJECT == 'gxqp-final2019') { //19年新上线项目采用扫点得流程
                        location.replace('http://' + location.host + '/v/' + PROJECT + '/getcash.html?bizcode=' + jo.result.businessCode);
                    } else {
                        location.replace('http://' + location.host + '/' + PROJECT + '/txo/repcash?bizcode=' + jo.result.businessCode);
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
                case '15': //大奖核销
                    /*if (jo.reply) {
                        sessionStorage.earnTime = jo.reply.earnTime;
                        sessionStorage.grandPrizeType = jo.reply.grandPrizeType;
                        sessionStorage.gpt = jo.reply.grandPrizeType;
                    }*/
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
                    // location.replace('http://' + location.host + '/v/' + project + '/prize.html?bizcode=' + jo.result.businessCode);
                    if (jo.reply.grandPrizeType == '1' || jo.reply.grandPrizeType == '2') { //金银元宝
                            location.replace('http://' + location.host + '/v/gxqp20171214/prize.html?bizcode=' + jo.result.businessCode);
                    } else if (jo.reply.grandPrizeType == '0') { //歌诗达游轮
                        location.replace('http://' + location.host + '/v/gxqp201703/prize.html?bizcode=' + jo.result.businessCode);
                    } else if (jo.reply.grandPrizeType == 'p' || jo.reply.grandPrizeType == 'P') {
                        if (jo.reply.activityVersion === '5') { //世界杯
                            location.replace('http://' + location.host + '/v/gxqp-FIFA/prize.html?bizcode=' + jo.result.businessCode);
                        } else {
                            location.replace('http://' + location.host + '/v/gxqp-common2.0/prize.html?bizcode=' + jo.result.businessCode);
                        }
                    } else if (jo.reply.grandPrizeType == 'Q' || jo.reply.grandPrizeType == 'q') {
                        location.replace('http://' + location.host + '/v/' + PROJECT + '/prize.html?bizcode=' + jo.result.businessCode);
                    } else if (jo.reply.grandPrizeType == 'R' || jo.reply.grandPrizeType == 'r') {
                        location.replace('http://' + location.host + '/v/' + PROJECT + '/prize.html?bizcode=' + jo.result.businessCode);
                    } else if (jo.reply.grandPrizeType == 'S' || jo.reply.grandPrizeType == 's') {
                        location.replace('http://' + location.host + '/v/' + PROJECT + '/prize.html?bizcode=' + jo.result.businessCode);
                    } else {
                        title_tip('尊敬的用户', '扫码异常', '我知道了');
                    }
                    break;
                case '7': // 一等奖
                    sessionStorage.username = jo.reply.username === undefined ? '' : jo.reply.username;
                    sessionStorage.phonenum = jo.reply.phonenum === undefined ? '' : jo.reply.phonenum;
                    sessionStorage.idcard = jo.reply.idcard === undefined ? '' : jo.reply.idcard;
                    sessionStorage.skukey = jo.reply.skukey;
                    sessionStorage.prizeVcode = jo.reply.prizeVcode;
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    // location.replace('http://' + location.host + '/v/' + project + '/prize.html?bizcode=' + jo.result.businessCode);
                    if (jo.reply.grandPrizeType == '1' || jo.reply.grandPrizeType == '2') { //金银元宝
                            location.replace('http://' + location.host + '/v/gxqp20171214/prize.html?bizcode=' + jo.result.businessCode);
                    } else if (jo.reply.grandPrizeType == '0') { //歌诗达游轮
                        location.replace('http://' + location.host + '/v/gxqp201703/prize.html?bizcode=' + jo.result.businessCode);
                    } else if (jo.reply.grandPrizeType == 'p' || jo.reply.grandPrizeType == 'P') {
                        if (jo.reply.activityVersion === '5') { //世界杯
                            location.replace('http://' + location.host + '/v/gxqp-FIFA/prize.html?bizcode=' + jo.result.businessCode);
                        } else {
                            location.replace('http://' + location.host + '/v/gxqp-common2.0/prize.html?bizcode=' + jo.result.businessCode);
                        }
                    } else if (jo.reply.grandPrizeType == 'Q' || jo.reply.grandPrizeType == 'q') {
                        location.replace('http://' + location.host + '/v/' + PROJECT + '/prize.html?bizcode=' + jo.result.businessCode);
                    } else if (jo.reply.grandPrizeType == 'R' || jo.reply.grandPrizeType == 'r') {
                        location.replace('http://' + location.host + '/v/' + PROJECT + '/prize.html?bizcode=' + jo.result.businessCode);
                    } else if (jo.reply.grandPrizeType == 'S' || jo.reply.grandPrizeType == 's') {
                        location.replace('http://' + location.host + '/v/' + PROJECT + '/prize.html?bizcode=' + jo.result.businessCode);
                    } else {
                        title_tip('尊敬的用户', '扫码异常', '我知道了');
                    }
                    break;
                case '-1':
                    title_tip('尊敬的用户', '亲，扫码人数太多，后台余额不足<br />掌柜正在快马加鞭进行充值。<br />请保存好瓶盖，晚些时候再试~', '我知道了');
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
        } else if (jo.result.code == '-1') { //jo.result.code!=0
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