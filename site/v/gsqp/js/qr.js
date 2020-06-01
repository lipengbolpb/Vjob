(function () {
    "use strict";
    ini_wxshare(vge.gsqpappid);
    var args = vge.urlparse(location.href),
        qr = args.s,
        openid = args.openid,
        vjifenOpenid = args.vjifenOpenid,
        unionid = '',
        i = 0 ;
    var flag = true;
    // $('#info').html('您扫的码是【'+qr+'】<br>openid: '+openid+'<br>jxqpappid:'+vge.jxqpappid);

    var dom_location = document.getElementById('location'),
        dom_fail = document.getElementById('fail');

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
        // loading('玩命加载中');
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
                dom_location.addEventListener('click', function () {
                    dom_location.style.display = 'none';
                    dom_fail.style.display = 'none';
                    if (qr.indexOf('MS_') != -1) {
                        getMS();
                    } else {
                        sweep();
                    }
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
                    if (qr.indexOf('MS_') != -1) {
                        getMS();
                    } else {
                        sweep();
                    }
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
            var japi = vge.common + '/vjifenInterface/sweep/sweepQrcode';
            var req = {
                "openid": openid,
                "vjifenOpenid": vjifenOpenid,
                "sweepstr": qr,
                "longitude": sessionStorage.longitude === undefined ? '00' : sessionStorage.longitude, //"经度"
                "latitude": sessionStorage.latitude === undefined ? '00' : sessionStorage.latitude, //"纬度"
                "projectServerName":"gansu",
            };
            vge.clog('debug', [japi, JSON.stringify(req)]);
            vge.callJApi(japi, req, cb);
        }
    }

    function cb(jo) {
        if (jo.result.code == '0') {
            var PROJECT = 'gsqp';
            if (jo.reply) {
                if (jo.reply.activityVersion == '1') {
                    PROJECT = 'gsqp';
                } else {
                    PROJECT = 'gsqp';
                }
            } else {
                PROJECT = 'gsqp';
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
					sessionStorage.city = jo.reply.city;// 	扫码城市
                    location.replace('http://' + location.host + '/v/' + PROJECT + '/getcash.html?bizcode=' + jo.result.businessCode);
                    break;
                case '7': // 大奖
                    sessionStorage.username = jo.reply.username === undefined ? '' : jo.reply.username;
                    sessionStorage.phonenum = jo.reply.phonenum === undefined ? '' : jo.reply.phonenum;
                    sessionStorage.idcard = jo.reply.idcard === undefined ? '' : jo.reply.idcard;
                    sessionStorage.skukey = jo.reply.skukey;
                    sessionStorage.prizeVcode = jo.reply.prizeVcode;
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    location.replace('http://' + location.host + '/v/' + PROJECT + '/prize.html?bizcode=' + jo.result.businessCode);
                    break;
                case '11': // 自己重复扫，普通奖
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime;
                    location.replace('http://' + location.host + '/v/' + PROJECT + '/getcash.html?bizcode=' + jo.result.businessCode);
                    break;
                case '12': // 
                    location.replace('http://' + location.host + '/v/' + PROJECT + '/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '13': // 
                    location.replace('http://' + location.host + '/v/' + PROJECT + '/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '14': // 
                    location.replace('http://' + location.host + '/v/' + PROJECT + '/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '15': //他人重复扫大奖
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
                    location.replace('http://' + location.host + '/v/' + PROJECT + '/prize.html?bizcode=' + jo.result.businessCode);
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
        } else if (jo.result.code == '-1') { //code !=0;
            title_tip('尊敬的用户', '系统升级中，请稍后再试！', '我知道了');
        } else {
            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
        }
    }

    function getMS() {
        if (flag) {
            flag = false;
            // 1-电视秒杀
            // 2-商场秒杀
            // 3-文章秒杀
            // 无-电视秒杀
            // switch (qr.slice(3, 4)) {
            //     case '1':
            //         sessionStorage.Ms_prizeType = '1';
            //         break;
            //     case '2':
            //         sessionStorage.Ms_prizeType = '2';
            //         break;
            //     case '3':
            //         sessionStorage.Ms_prizeType = '3';
            //         break;
            //     default:
            //         sessionStorage.Ms_prizeType = '1';
            //         break;
            // }
            loading('玩命加载中'); //调用接口
            var japi = vge.common + '/vjifenInterface/vpoints/seckill/sweepQrcode';
            var req = {
                "openid": openid,
                "vjifenOpenid": vjifenOpenid,
                "sweepstr": qr,
                "longitude": sessionStorage.longitude === undefined ? '00' : sessionStorage.longitude, //"经度"
                "latitude": sessionStorage.latitude === undefined ? '00' : sessionStorage.latitude, //"纬度"
                "projectServerName":"gansu",
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
                location.replace('http://' + location.host + '/v/gsqp/getcash.html?bizcode=' + jo.result.businessCode);
            } else {
                sessionStorage.msg = jo.result.msg;
                location.replace('http://' + location.host + '/v/gsqp/fail.html?ms=true');
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

})();