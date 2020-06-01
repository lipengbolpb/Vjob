(function () {
    "use strict";
    ini_wxshare(vge.ahqpappid);
    var now1 = new Date();
    var args = vge.urlparse(location.href),
        qr = args.s,
        openid = args.openid,
        unionid = '',
        strHb = '',
        i=0,
        vjifenOpenid = args.vjifenOpenid;
		
	if(qr.length==18){
		strHb = qr[0]+qr[1]+qr[3];
		if(strHb=='W8W'||strHb=='Z46'||strHb=='8C9'||strHb=='TXA'){//河北
			location.replace('http://'+location.host+'/hbqp/tro/qr?s='+qr+'&vjifenOpenid='+vjifenOpenid);
		}else{
			document.title="醉美安徽";
			loading('玩命加载中'); //获取用户信息  
			wx.ready(function () {
			    loading('玩命加载中');
			    wx.hideOptionMenu();
			    wxGetLocation();
			});
		}
	}else if(qr.length==12){
		strHb = qr.substr(0,3)
		if(strHb=='W8W'||strHb=='Z46'||strHb=='8C9'||strHb=='TXA'){//河北
			location.replace('http://'+location.host+'hbqp/tro/qr?s='+qr+'&vjifenOpenid='+vjifenOpenid);
		}else{
			document.title="醉美安徽";
			loading('玩命加载中'); //获取用户信息  
			wx.ready(function () {
			    loading('玩命加载中');
			    wx.hideOptionMenu();
			    wxGetLocation();
			});
		}
	}else{
		document.title="醉美安徽";
		loading('玩命加载中'); //获取用户信息  
		wx.ready(function () {
		    loading('玩命加载中');
		    wx.hideOptionMenu();
		    wxGetLocation();
		});
	}
    var flag = true,
        nickname = '',
        headimg = '';
    var dom_location = document.getElementById('location'),
        dom_fail = document.getElementById('fail');
    // $('#info').html('您扫的码是【'+qr+'】<br>openid: '+openid);

    sessionStorage.clear();
    sessionStorage.openid = openid;
    sessionStorage.qr = qr;

    subscribe();


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
        // loading('玩命加载中');
        _hmt.push(['_trackEvent', 'click', '抓取地理位置', '扫码']);
        dom_location.style.display = 'none';
        dom_fail.style.display = 'none';
        sessionStorage.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        sessionStorage.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        sessionStorage.speed = res.speed; // 速度，以米/每秒计
        sessionStorage.accuracy = res.accuracy; // 位置精度
        sweep();
        // loadImg(i);
    }

    function wxGetLocation() {
        wx.getLocation({
            type: 'wgs84',
            cancel: function (res) {
                loaded();
                dom_location.style.display = 'block';
                _hmt.push(['_trackEvent', 'click', '拒绝抓取地理位置', '扫码']);
                dom_location.addEventListener('click', function () {
                    $('.location').css('display', 'none');
                    sweep();
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
            var japi = vge.ahqp + '/DBTAHQPInterface/sweep/sweepQrcode';
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
        var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.ahqpappid;
        vge.ajxget(requrl, 5000, function (r) {
            try {
                var o = JSON.parse(r);
                if (o.subscribe == 0) { //未关注

                } else { //已关注用户
                    headimg = o.headimgurl;
                    nickname = o.nickname;
                }
                vge.clog('个人信息', JSON.stringify(o));
            } catch (e) {
                vge.clog('errmsg', [requrl, e]);
            }
        }, function (err) {
            vge.clog('errmsg', [requrl, err]);
        });
    }

    function cb(jo) {
        vge.clog('返回信息', [JSON.stringify(jo)]);
        if (jo.result.code == '0') {
            var project = 'ahqp-final2019';
            if (jo.reply) {
                if (jo.reply.activityVersion == '1') { //经典通用版
                    project = 'ahqp';
                } else if (jo.reply.activityVersion == '2') { //冬奥之旅版
                    project = 'ahqp-common3.0';
                } else if (jo.reply.activityVersion == '3') { //2109经典02版
                    project = 'ahqp-final2019';
                }
                sessionStorage.skuType = jo.reply.skuType === undefined ? '1' : jo.reply.skuType;
            }
            // alert('businessCode:' + jo.result.businessCode);
            // alert(jo.reply.weekSignFlag);
            // alert(jo.reply.weekSignPopup);
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

                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
                    if (project == 'ahqp-final2019' ) { //19年新上线项目采用扫点得流程
                        location.replace('http://' + location.host + '/v/' + project + '/getcash.html?bizcode=' + jo.result.businessCode);
                    } else{
                        location.replace('http://' + location.host + '/' + project + '/txo/getcash?bizcode=' + jo.result.businessCode);
                    }
                    break;
                case '11': // 自己重复扫，普通奖
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    sessionStorage.earnTime = jo.reply.earnTime;
                    if (project == 'ahqp-final2019' ) { //19年新上线项目采用扫点得流程
                        location.replace('http://' + location.host + '/v/' + project + '/getcash.html?bizcode=' + jo.result.businessCode);
                    } else{  
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
                    if (jo.reply.grandPrizeType == 'P' || jo.reply.grandPrizeType == 'p') {//冬奥环球之旅
                        location.replace('http://' + location.host + '/v/' + project + '/prize.html?bizcode=' + jo.result.businessCode);
                    } else if (jo.reply.grandPrizeType == 'Q' || jo.reply.grandPrizeType == 'q') {//冬奥冰雪冬令营
                        location.replace('http://' + location.host + '/v/' + project + '/prize.html?bizcode=' + jo.result.businessCode);
                    }else if (jo.reply.grandPrizeType == 'R' || jo.reply.grandPrizeType == 'r') {//青岛啤酒有一套礼盒
                        location.replace('http://' + location.host + '/v/' + project + '/prize.html?bizcode=' + jo.result.businessCode);
                    } else {
                        title_tip('尊敬的用户', '扫码异常', '我知道了');
                    }
                    
                    break;
                case '7': //一等奖或二等奖
                    sessionStorage.address = jo.reply.address === undefined ? '' : jo.reply.address;
                    sessionStorage.username = jo.reply.username === undefined ? '' : jo.reply.username;
                    sessionStorage.idcard = jo.reply.idcard === undefined ? '' : jo.reply.idcard;
                    sessionStorage.phonenum = jo.reply.phonenum === undefined ? '' : jo.reply.phonenum;
                    sessionStorage.skukey = jo.reply.skukey === undefined ? '' : jo.reply.skukey;
                    //中奖具体码
                    sessionStorage.prizeVcode = jo.reply.prizeVcode === undefined ? '' : jo.reply.prizeVcode;
                    //特等奖类别
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
					if(jo.reply.checkPrizeRecord){
						sessionStorage.checkStatus = jo.reply.checkPrizeRecord.checkStatus;
					}
					sessionStorage.checkOpenid = jo.reply.checkOpenid;
                    if (jo.reply.grandPrizeType == 'P' || jo.reply.grandPrizeType == 'p') {//冬奥环球之旅
                        location.replace('http://' + location.host + '/v/' + project + '/prize.html?bizcode=' + jo.result.businessCode);
                    } else if (jo.reply.grandPrizeType == 'Q' || jo.reply.grandPrizeType == 'q') {//冬奥冰雪冬令营
                        location.replace('http://' + location.host + '/v/' + project + '/prize.html?bizcode=' + jo.result.businessCode);
                    } else if (jo.reply.grandPrizeType == 'R' || jo.reply.grandPrizeType == 'r') {//青岛啤酒有一套礼盒
                        location.replace('http://' + location.host + '/v/' + project + '/prize.html?bizcode=' + jo.result.businessCode);
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