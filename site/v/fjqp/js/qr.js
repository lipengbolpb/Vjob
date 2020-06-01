(function () {
    "use strict";
    ini_wxshare(vge.fjqpappid);
    var now1 = new Date();
    var args = vge.urlparse(location.href),
        qr = args.s,
        openid = args.openid,
        unionid = '',
        project = 'fjqp',
        vjifenOpenid = args.vjifenOpenid,
        i = 0;
    var flag = true,
        nickname = '',
        headimg = '';
    var dom_location = document.getElementById('location'),
        dom_fail = document.getElementById('fail');
    // $('#info').html('您扫的码是【'+qr+'】<br>openid: '+openid);
    if (qr == 'QSF4AZTE7QBCPZJ46W') {
        // window.location.href = 'https://mp.weixin.qq.com/s?__biz=MzI1NTQ5MzA2Mw==&mid=100000746&idx=1&sn=c7db533182918f75680e894603d0b183&chksm=6a3455425d43dc5426799ceff63583bf860bee4cfb54f3ab7cfc1ab279f173d762cdfff35e16#rd';
		location.replace('http://'+location.host+'/v/fjqp/terminal_guide.html');
		return;
    }
	document.title = '青岛啤酒东南营销';
    sessionStorage.clear();
    sessionStorage.openid = openid;
    sessionStorage.qr = qr;

    subscribe();

    loading('玩命加载中'); //获取用户信息

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
        // loading('玩命加载中');
        _hmt.push(['_trackEvent', 'click', '抓取地理位置', '扫码']);
        dom_location.style.display = 'none';
        dom_fail.style.display = 'none';
        sessionStorage.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        sessionStorage.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        sessionStorage.speed = res.speed; // 速度，以米/每秒计
        sessionStorage.accuracy = res.accuracy; // 位置精度
        if (qr.indexOf('MS_') != -1) {
            getMS();
        } else {
            // newYearAnimate(function () {
            //     console.log('动画结束');
            //     sweep();
            // })
            sweep();
        }
        // loadImg(i);
    }
    wx.ready(function () {
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
                    if (qr.indexOf('MS_') != -1) {
                        getMS();
                    } else {
                        // newYearAnimate(function () {
                        //     console.log('动画结束');
                        //     sweep();
                        // })
                        sweep();
                    }
                    // loadImg(i);
                }, false);
            },
            success: locationed, //接口调用完成时执行的回调函数，无论成功或失败都会执行。
            fail: function (res) {
                loaded();
                _hmt.push(['_trackEvent', 'click', '抓取地理位置失败', '扫码']);
                dom_fail.style.display = 'block';
                dom_fail.addEventListener('click', function () {
                    dom_fail.style.display = 'none';
                    if (qr.indexOf('MS_') != -1) {
                        getMS();
                    } else {
                        // newYearAnimate(function () {
                        //     console.log('动画结束');
                        //     sweep();
                        // })
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
            var japi = vge.fjqp + '/DBTFJQPInterface/sweep/sweepQrcode';
            var req = {
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
        var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.fjqpappid;
        vge.ajxget(requrl, 5000, function (r) {
            try {
                var o = JSON.parse(r);
                if (o.subscribe == 0) { //未关注

                } else { //已关注用户
                    headimg = o.headimgurl;
                    nickname = o.nickname;
                }
            } catch (e) {
                vge.clog('errmsg', [requrl, e]);
            }
        }, function (err) {
            vge.clog('errmsg', [requrl, err]);
        });
    }

    function cb(jo) {
		vge.clog('福建返回信息', [JSON.stringify(jo)]);
        if (jo.result.code == '0') {
            if (jo.reply) {
                if (jo.reply.activityVersion == '1') {
                    project = 'fjqp';
                } else if (jo.reply.activityVersion == '2') { //新年版
                    project = 'fjqp20180130';
                } else if (jo.reply.activityVersion == '3') { //清爽开箱18版
                    project = 'fjqp-worldcup';
                } else if (jo.reply.activityVersion == '4') { //高升
                    project = 'fjqp-common2.0';
                } else if (jo.reply.activityVersion == '5') { //原为连江开箱 改为经典8度
                    project = 'fjqp-jingdian';
                    sessionStorage.setItem('activityVersion', jo.reply.activityVersion);
                } else if (jo.reply.activityVersion == '6') { //世界杯扫码版
                    project = 'fjqp-common3.0';
                } else if (jo.reply.activityVersion == '7') { //清爽开箱19版
                    project = 'fjqp20190315';
                } else if (jo.reply.activityVersion == '8') { //经典11度高升罐装
                    project = 'fjqp20181105';
                } else if (jo.reply.activityVersion == '9') { //清爽
                  project = 'fjqp20181120';
                } else if (jo.reply.activityVersion == '10') { //经典10度
                  project = 'fjqp-jingdian';
                  sessionStorage.setItem('activityVersion', jo.reply.activityVersion);
                } else {
                    project = 'fjqp';
                }
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
			    sessionStorage.exchangeDate = jo.reply.checkPrizeRecord.exchangeDate;
			    sessionStorage.checkUserName = jo.reply.checkPrizeRecord.checkUserName;
			    sessionStorage.checkStatus = jo.reply.checkPrizeRecord.checkStatus;
			    sessionStorage.checkTime = jo.reply.checkPrizeRecord.checkTime;
			    sessionStorage.checkRemarks = jo.reply.checkPrizeRecord.checkRemarks;
			    location.replace('http://' + location.host + '/v/fjqp-common3.0/verification.html?bizcode=' + jo.result.businessCode);
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
                    sessionStorage.dayScanNum = jo.reply.dayScanNum;
					// 阶梯
					sessionStorage.scanLadderFlag = jo.reply.scanLadderFlag;
					sessionStorage.spuDayScanNum = jo.reply.spuDayScanNum;
					sessionStorage.skukey = jo.reply.skukey;
                    if (project == 'fjqp20190315' || project == 'fjqp-jingdian') { //19年新上线项目采用扫点得流程，则不需要获取hbopenid
                        location.replace('http://' + location.host + '/v/' + project + '/getcash.html?bizcode=' + jo.result.businessCode);
                    } else {
                        location.replace('http://' + location.host + '/' + project + '/txo/getcash?bizcode=' + jo.result.businessCode);
                    }
                    break;
                case '11': // 自己重复扫，普通奖
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    sessionStorage.earnTime = jo.reply.earnTime;
                    if (project == 'fjqp20190315' || project == 'fjqp-jingdian') { //19年新上线项目采用扫点得
                        location.replace('http://' + location.host + '/v/' + project + '/getcash.html?bizcode=' + jo.result.businessCode);
                    } else {
                        location.replace('http://' + location.host + '/' + project + '/txo/getcash?bizcode=' + jo.result.businessCode);
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
                case '15': //
                    sessionStorage.earnTime = jo.reply.earnTime;
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    // if (jo.reply.grandPrizeType === 'R' || jo.reply.grandPrizeType === 'r') {
                    //     location.replace('http://' + location.host + '/v/fjqp-worldcup/prize.html');
                    // } else {
                    location.replace('http://' + location.host + '/v/' + project + '/prize.html?bizcode=' + jo.result.businessCode);
                    // }
                    break;
                case '7': //一等奖或二等奖 s手表 t耳机
                    sessionStorage.address = jo.reply.address === undefined ? '' : jo.reply.address;
                    sessionStorage.username = jo.reply.username === undefined ? '' : jo.reply.username;
                    sessionStorage.idcard = jo.reply.idcard === undefined ? '' : jo.reply.idcard;
                    sessionStorage.phonenum = jo.reply.phonenum === undefined ? '' : jo.reply.phonenum;
                    sessionStorage.skukey = jo.reply.skukey === undefined ? '' : jo.reply.skukey;
                    //中奖具体码
                    sessionStorage.prizeVcode = jo.reply.prizeVcode === undefined ? '' : jo.reply.prizeVcode;
                    //特等奖类别
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    if (jo.reply.grandPrizeType === 'R' || jo.reply.grandPrizeType === 'r') {
                        location.replace('http://' + location.host + '/v/fjqp-worldcup/prize.html');
                    } else if (jo.reply.grandPrizeType === 's' || jo.reply.grandPrizeType === 'S' || jo.reply.grandPrizeType === 't' || jo.reply.grandPrizeType === 'T') {
                      location.replace('http://' + location.host + '/v/fjqp20181120/prize.html');
                    } else if (jo.reply.grandPrizeType === '2' || jo.reply.grandPrizeType === 2 || jo.reply.grandPrizeType === 'Q' || jo.reply.grandPrizeType === 'q' || jo.reply.grandPrizeType === 'U' || jo.reply.grandPrizeType === 'u' || jo.reply.grandPrizeType === 'V' || jo.reply.grandPrizeType === 'v') {
                      // 经典8度和经典10度
                      location.replace('http://' + location.host + '/v/fjqp-jingdian/prize.html');
                    } else {
                        title_tip('尊敬的用户', '扫码异常', '我知道了');
                    }
                    break;
                default:
                    if (jo.reply) {
                        sessionStorage.batchName = jo.reply.batchName === undefined ? '' : jo.reply.batchName;
                        sessionStorage.earnTime = jo.reply.earnTime;
                        sessionStorage.msg = jo.result.msg;
                    }
                    location.replace('http://' + location.host + '/v/' + project + '/fail.html?bizcode=' + jo.result.businessCode);
            }
        } else if (jo.result.code == '-1') { //code !=0;
            title_tip('尊敬的用户', '系统升级中，请稍后再试！', '我知道了');
        } else {
            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
        }
    }

	function getMS() {
	    if (flag) {
	        flag = false;
	        loading('玩命加载中'); //调用接口
	        var japi = vge.fjqp + '/DBTFJQPInterface/vpoints/seckill/sweepQrcode';
	        var req = {
	            "openid": openid,
	            "vjifenOpenid": vjifenOpenid,
	            "sweepstr": qr,
	            "longitude": sessionStorage.longitude === undefined ? '00' : sessionStorage.longitude, //"经度"
	            "latitude": sessionStorage.latitude === undefined ? '00' : sessionStorage.latitude //"纬度"
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
				sessionStorage.dayScanNum = jo.reply.dayScanNum;
				sessionStorage.isMS = 'true';
				location.replace('http://' + location.host + '/fjqp-common2.0/txo/getcash?bizcode=' + jo.result.businessCode);
	        } else if(jo.result.businessCode == '11'){
				sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
				sessionStorage.currentMoney = jo.reply.currentMoney;
				sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
				sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
				sessionStorage.dayScanNum = jo.reply.dayScanNum;
				location.replace('http://' + location.host + '/fjqp-common2.0/txo/getcash?bizcode=' + jo.result.businessCode);
			} else {
	            sessionStorage.msg = jo.result.msg;
	            location.replace('http://' + location.host + '/v/fjqp-common2.0/fail.html?bizcode='+jo.result.businessCode);
	        }
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
// function newYearAnimate(callback) {


//     var imgList = [
//         'http://' + location.host + '/v/fjqp/imgNewYear/logo.png',
//         'http://' + location.host + '/v/fjqp/imgNewYear/bg.png',
//         'http://' + location.host + '/v/fjqp/imgNewYear/light1.png',
//         'http://' + location.host + '/v/fjqp/imgNewYear/light2.png',
//         'http://' + location.host + '/v/fjqp/imgNewYear/light3.png',
//         'http://' + location.host + '/v/fjqp/imgNewYear/light4.png',
//         'http://' + location.host + '/v/fjqp/imgNewYear/light5.png',
//         'http://' + location.host + '/v/fjqp/imgNewYear/light6.png',
//         'http://' + location.host + '/v/fjqp/imgNewYear/light7.png',
//         'http://' + location.host + '/v/fjqp/imgNewYear/light8.png',
//         'http://' + location.host + '/v/fjqp/imgNewYear/light9.png',
//         'http://' + location.host + '/v/fjqp/imgNewYear/light10.png',
//         'http://' + location.host + '/v/fjqp/imgNewYear/light11.png',
//         'http://' + location.host + '/v/fjqp/imgNewYear/light12.png',
//         'http://' + location.host + '/v/fjqp/imgNewYear/shitou.png',
//         'http://' + location.host + '/v/fjqp/imgNewYear/beer-text.png',
//         'http://' + location.host + '/v/fjqp/imgNewYear/daniao.png',
//         'http://' + location.host + '/v/fjqp/imgNewYear/bottom.png',
//         'http://' + location.host + '/v/fjqp/imgNewYear/manyanimal.png',
//     ];
//     loadImg(0)

//     function loadImg(i) {
//         var img = new Image();
//         img.src = imgList[i];
//         img.onload = function () {
//             if (i < imgList.length) {
//                 console.log(imgList[i], img)
//                 loadImg(++i)
//             }
//         }
//         if (i >= imgList.length) {
//             console.log(i, '图片加载完成');
//             //执行动画
//             $('#animate-new-year').show();
//             startAnimate(callback);
//             loaded();
//         } else {
//             console.log(i)
//         }
//     }



//     function startAnimate(callback) {
//         $('.shitou').addClass('animated-loin loin');
//         setTimeout(function () {
//             $('.wrap-animate').addClass('wrap-animate-end');
//         }, 800);
//         setTimeout(function () {
//             $('.light1').addClass('light1-ani');
//             $('.light2').addClass('light2-ani');
//             $('.light3').addClass('light3-ani');
//             $('.light4').addClass('light4-ani');
//             $('.light5').addClass('light5-ani');
//             $('.light6').addClass('light6-ani');
//             $('.light7').addClass('light7-ani');
//             $('.light8').addClass('light8-ani');
//             $('.light11').addClass('light11-ani');
//             $('.light13').addClass('light13-ani');
//             $('.beer-text').addClass('beer-show');
//             setTimeout(function () {
//                 feiniao();
//                 $('#animate-new-year').animate({
//                     opacity: 0
//                 }, 1100, callback);
//             }, 900);
//         }, 2000);
//     }

//     // $('.daniao').css()

//     /*
//      * t : time 已过时间
//      * b : begin 起始值
//      * c : count 总的运动值
//      * d : duration 持续时间
//      */
//     var Tween = {
//         linear: function (t, b, c, d) { //匀速
//             return c * t / d + b;
//         },
//         easeIn: function (t, b, c, d) { //加速曲线
//             return c * (t /= d) * t + b;
//         },
//         easeOut: function (t, b, c, d) { //减速曲线
//             return -c * (t /= d) * (t - 2) + b;
//         },
//     }

//     function feiniao() {
//         var fontSize = parseFloat(document.documentElement.style.fontSize);
//         animation('.daniao', {
//             top: -4.264 * fontSize,
//             left: 2.985 * fontSize,
//             transform: -30,
//         }, {
//             transform: 35,
//             top: 10.66 * fontSize,
//             left: 15.3518 * fontSize,
//         }, 600, {
//             top: 'linear',
//             left: 'easeIn',
//             transform: 'easeIn',
//         }, function () {
//             animation('.daniao', {
//                 top: 8.31556 * fontSize,
//                 left: -11.94029 * fontSize,
//                 transform: -75,
//             }, {
//                 transform: -30,
//             }, 700, {
//                 top: 'linear',
//                 left: 'easeOut',
//                 transform: 'easeOut',
//             })
//         });
//     }

//     function animation(ele, attr, start, duration, fx, cb) {
//         // if (ele.animation) return;
//         var _$ele = $(ele)
//         console.log(_$ele);

//         var beginValue = {},
//             changeValue = {},
//             fxObj = {};
//         for (var key in attr) {
//             beginValue[key] = start[key] || parseInt(_$ele.css(key)) || 0;

//             changeValue[key] = attr[key] - beginValue[key];
//             if (typeof fx === 'function') {
//                 fxObj[key] = fx;
//             } else {
//                 fxObj = fx;
//             }
//         }

//         var d = duration;
//         var startTime = Date.now();
//         var current, c, b, t, _this = this;
//         window.cancelAnimationFrame(ele.animation);
//         fn();

//         function fn() {
//             _$ele.animation = window.requestAnimationFrame(fn, _$ele);
//             t = Date.now() - startTime;

//             if (t >= d) {
//                 t = d;
//                 window.cancelAnimationFrame(_$ele.animation);
//                 _$ele.animation = null;
//                 cb && cb();
//             }
//             for (key in changeValue) {
//                 c = changeValue[key];
//                 b = beginValue[key];

//                 current = Tween[fxObj[key]](t, b, c, d);

//                 _$ele.css(key, current + 'px')
//                 if (key === 'transform') {
//                     _$ele.css(key, 'rotate(' + current + 'deg)')
//                 } else {
//                     _$ele.css(key, current + 'px')
//                 }
//             }

//         };
//     };
// }
})();
