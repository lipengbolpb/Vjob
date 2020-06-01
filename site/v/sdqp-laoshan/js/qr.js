(function () {
    "use strict";
    ini_wxshare(vge.sdqpappid);
    var args = vge.urlparse(location.href),
        qr = args.s,
        openid = args.openid,
		i=0,
        vjifenOpenid = args.vjifenOpenid,
        unionid = '';
    var flag = true;
    var project = 'sdqp';

    sessionStorage.clear();
    sessionStorage.qr = qr;
    sessionStorage.openid = openid;
    var dom_location = document.getElementById('location'),
        dom_fail = document.getElementById('fail');

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
        _hmt.push(['_trackEvent', 'click', '允许抓取-山东', '扫码']);
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
                _hmt.push(['_trackEvent', 'click', '拒绝抓取-山东', '扫码']);
                dom_location.addEventListener('click', function () {
                    $('.location').css('display', 'none');
                    if (qr.indexOf('MS_') != -1) {
                        getMS();
                    } else {
                        sweep();
                    }
					// loadImg(i);
                }, false);
            },
            success: locationed, //接口调用完成时执行的回调函数，无论成功或失败都会执行。
            fail: function (res) {
                loaded();
                _hmt.push(['_trackEvent', 'click', '抓取失败-山东', '扫码']);
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
					// loadImg(i);
                }, false);
            }
        });
    }

    function sweep() {
        if (flag) {
            flag = false;
            loading('玩命加载中'); //调用接口
            var japi = vge.sdqp + '/DBTSDQPInterface/sweep/sweepQrcode';
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
		// vge.clog('返回信息啦啦', [JSON.stringify(jo)]);
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

            if (jo.reply) {
                if (jo.reply.scanLadderFlag) {  //阶梯开关
                    sessionStorage.scanLadderFlag = jo.reply.scanLadderFlag;
                }
                if (jo.reply.dayScanNum) { //扫码的次数
                    sessionStorage.dayScanNum = jo.reply.dayScanNum;
                }
                if (jo.reply.userActivityDayScanNum) { //当前活动的扫码的次数
                    sessionStorage.userActivityDayScanNum = jo.reply.userActivityDayScanNum;
                }

                if (jo.reply.spuDayScanNum) { //阶梯扫码返回的次数 即将废弃 [其他省区scanLadderNum] 
                    sessionStorage.spuDayScanNum = jo.reply.spuDayScanNum;
                }

                sessionStorage.skukey = jo.reply.skukey;
                sessionStorage.activityVersion = jo.reply.activityVersion;
                sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
                sessionStorage.exchangeDate = jo.reply.exchangeDate === undefined ? '' : jo.reply.exchangeDate;//兑奖时间
                
                // 活动版本区分
                if (jo.reply.activityVersion === "1") {   //奥古特
                    project = 'sdqp-agt';
                } else if (jo.reply.activityVersion === "2" || jo.reply.activityVersion === "3" || jo.reply.activityVersion === "4" || jo.reply.activityVersion === "5" || jo.reply.activityVersion === "7" || jo.reply.activityVersion === "9") { 
                    //经典8度
                    //世界杯版 //7-经典 8-1903【已释放】==>皮尔森  9-纯生
                    project = 'sdqp-common2.0';
                } else if (jo.reply.activityVersion === "6") { //经典新年版
                    project = 'sdqp20180130';
                } else if(jo.reply.activityVersion === "8"){
                    project = 'sdqp-prs';
                } else {
                    project = 'sdqp-common2.0';
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
                location.replace('http://' + location.host + '/v/sdqp-common2.0/verification.html?bizcode=' + jo.result.businessCode);
                return false;
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
                    sessionStorage.setItem('signCogAry', JSON.stringify(jo.reply.signCogAry));
                    //捆绑
                    sessionStorage.promotionFlag = jo.reply.promotionFlag; //用户是否开启自然周签到，1:开启、0或空:关闭
                    sessionStorage.promotionPopup = jo.reply.promotionPopup; //自然周签到弹出提示，1:弹出提示、0或空:不弹出
                    sessionStorage.setItem('promotionCogAry', JSON.stringify(jo.reply.promotionCogAry));
                    //时间
                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
                    if(jo.reply.perMantissaPrize){//逢19
                        sessionStorage.perMantissaPrize = JSON.stringify(jo.reply.perMantissaPrize);
                    }
					sessionStorage.province = jo.reply.province;// 	扫码省区
                    sessionStorage.city = jo.reply.city;// 	扫码城市
                    sessionStorage.county = jo.reply.county; //扫码县/区
                    sessionStorage.earnTime = jo.reply.earnTime;
                    if (project == 'sdqp-common2.0') { 
                        location.replace('http://' + location.host + '/'+ project +'/txo/getcash?bizcode=' + jo.result.businessCode);
                    } else {
                        location.replace('http://' + location.host + '/v/'+ project +'/getcash.html?bizcode=' + jo.result.businessCode);
                    }
                    break;
                case '11': // 自己重复扫，普通奖
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
                    if(jo.reply.perMantissaPrize){//逢19
                        sessionStorage.perMantissaPrize = JSON.stringify(jo.reply.perMantissaPrize);
                    }
                    if (project == 'sdqp-common2.0') { 
                        location.replace('http://' + location.host + '/'+ project +'/txo/getcash?bizcode=' + jo.result.businessCode);
                    } else {
                        location.replace('http://' + location.host + '/v/'+ project +'/getcash.html?bizcode=' + jo.result.businessCode);
                    }
                    break;
                case '12': // 可疑
                    location.replace('http://' + location.host + '/v/'+ project +'/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '13': // 黑名单
                    location.replace('http://' + location.host + '/v/'+ project +'/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '14': // 指定
                    location.replace('http://' + location.host + '/v/'+ project +'/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '21': // 逢19
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
                    sessionStorage.exchangeDate = jo.reply.exchangeDate === undefined ? '' : jo.reply.exchangeDate;
                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
                    sessionStorage.phonenum = jo.reply.phonenum === undefined ? '' : jo.reply.phonenum;
                    sessionStorage.idcard = jo.reply.idcard === undefined ? '' : jo.reply.idcard;
                    sessionStorage.skukey = jo.reply.skukey;
                    sessionStorage.prizeVcode = jo.reply.prizeVcode;
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    sessionStorage.exchangeChannel = jo.reply.exchangeChannel === undefined ? '' : jo.reply.exchangeChannel;
                    if(jo.reply.perMantissaPrize){
                        sessionStorage.perMantissaPrize = JSON.stringify(jo.reply.perMantissaPrize);
                    }

                    if(jo.reply.exchangeChannel == '5'){  //皮尔森——要酒日大奖
                        location.replace('http://' + location.host + '/v/'+ project +'/prize.html?bizcode=' + jo.result.businessCode);
                    }

                    if (project == 'sdqp-common2.0') { 
                        location.replace('http://' + location.host + '/'+ project +'/txo/getcash?bizcode=' + jo.result.businessCode);
                    } else {
                        location.replace('http://' + location.host + '/v/'+ project +'/getcash.html?bizcode=' + jo.result.businessCode);
                    }
                    
                    break;		
                case '7': // 大奖
                    sessionStorage.username = jo.reply.username === undefined ? '' : jo.reply.username;
                    sessionStorage.phonenum = jo.reply.phonenum === undefined ? '' : jo.reply.phonenum;
                    sessionStorage.idcard = jo.reply.idcard === undefined ? '' : jo.reply.idcard;
                    sessionStorage.skukey = jo.reply.skukey;
                    sessionStorage.prizeVcode = jo.reply.prizeVcode;
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    sessionStorage.exchangeChannel = jo.reply.exchangeChannel === undefined ? '' : jo.reply.exchangeChannel;
                    if(jo.reply.exchangeChannel == '5'){  //皮尔森——要酒日大奖
                        location.replace('http://' + location.host + '/v/'+ project +'/prize.html?bizcode=' + jo.result.businessCode);
                    }
                    if (jo.reply.grandPrizeType == 'p' || jo.reply.grandPrizeType == 'P' || jo.reply.grandPrizeType == 'q'|| jo.reply.grandPrizeType == 'Q') {
                        location.replace('http://' + location.host + '/v/'+ project +'/prize.html?bizcode=' + jo.result.businessCode);
                    } else if(jo.reply.grandPrizeType == 'r' || jo.reply.grandPrizeType == 'R' || jo.reply.grandPrizeType == 's'|| jo.reply.grandPrizeType == 'S') {
                        location.replace('http://' + location.host + '/v/'+ project +'/prize.html?bizcode=' + jo.result.businessCode);
                    } else if(jo.reply.grandPrizeType == 't' || jo.reply.grandPrizeType == 'T'||jo.reply.grandPrizeType=='1'||jo.reply.grandPrizeType=='2') {//电音节
                        location.replace('http://' + location.host + '/v/'+ project +'/prize.html?bizcode=' + jo.result.businessCode);
                    } else if(jo.reply.grandPrizeType == 'u' || jo.reply.grandPrizeType == 'U') { //皮尔森——冬奥冰雪冬令营壹人次
                        location.replace('http://' + location.host + '/v/'+ project +'/prize.html?bizcode=' + jo.result.businessCode);
                    } else if(jo.reply.grandPrizeType == 'v' || jo.reply.grandPrizeType == 'V') { //泡泡音乐节
                        location.replace('http://' + location.host + '/v/'+ project +'/prize.html?bizcode=' + jo.result.businessCode);
                    } else if(jo.reply.grandPrizeType == 'w' || jo.reply.grandPrizeType == 'W') { //烟台嘉年华
                        location.replace('http://' + location.host + '/v/'+ project +'/prize.html?bizcode=' + jo.result.businessCode);
                    } else if(jo.reply.grandPrizeType == 'x' || jo.reply.grandPrizeType == 'X') { //烟台嘉年华
                        location.replace('http://' + location.host + '/v/'+ project +'/prize.html?bizcode=' + jo.result.businessCode);
                    } else if(jo.reply.grandPrizeType == 'y' || jo.reply.grandPrizeType == 'Y') { //Y等奖青岛白啤6瓶体验券
                        location.replace('http://' + location.host + '/v/'+ project +'/prize.html?bizcode=' + jo.result.businessCode);
                    } else if(jo.reply.grandPrizeType == 'z' || jo.reply.grandPrizeType == 'Z') { //鲁能泰山主场中超球票奖
                        location.replace('http://' + location.host + '/v/'+ project +'/prize.html?bizcode=' + jo.result.businessCode);
                    } else if(jo.reply.grandPrizeType == 'p01' || jo.reply.grandPrizeType == 'P01') { //黄金冰墩墩
                        location.replace('http://' + location.host + '/v/'+ project +'/prize.html?bizcode=' + jo.result.businessCode);
                    }
                    else {//R等奖-张信哲演唱会 S等奖-草莓音乐节门票
                        title_tip('尊敬的用户', '扫码异常', '我知道了');
                    }
                    break;
                case '15': //他人重复扫大奖
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
                    sessionStorage.exchangeDate = jo.reply.exchangeDate === undefined ? '' : jo.reply.exchangeDate;
                    sessionStorage.exchangeChannel = jo.reply.exchangeChannel === undefined ? '' : jo.reply.exchangeChannel;
                    location.replace('http://' + location.host + '/v/'+ project +'/prize.html?bizcode=' + jo.result.businessCode);
                    break;
                default:
                    if (jo.reply) {
                        sessionStorage.batchName = jo.reply.batchName === undefined ? '' : jo.reply.batchName;
                        sessionStorage.msg = jo.result.msg;
                    }
                    location.replace('http://' + location.host + '/v/'+ project +'/fail.html?bizcode=' + jo.result.businessCode);
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
            switch (qr.slice(3, 4)) {
                case '1':
                    sessionStorage.Ms_prizeType = '1';
                    break;
                case '2':
                    sessionStorage.Ms_prizeType = '2';
                    break;
                case '3':
                    sessionStorage.Ms_prizeType = '3';
                    break;
                default:
                    sessionStorage.Ms_prizeType = '1';
                    break;
            }
            loading('玩命加载中'); //调用接口
            // var japi = 'http://192.168.0.249:38040/vjfproject/vpoints/seckill/sweepQrcode';
            var japi = vge.sdqp + '/DBTSDQPInterface/vpoints/seckill/sweepQrcode';
            var req = {
                "openid": openid,
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
                sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
                location.replace('http://' + location.host + '/sdqpMS/txo/getcash?bizcode=' + jo.result.businessCode);
            } else {
                sessionStorage.msg = jo.result.msg;
                location.replace('http://' + location.host + '/v/sdqpMS/fail.html');
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