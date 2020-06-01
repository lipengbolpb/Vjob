(function () {
    "use strict";
    ini_wxshare(vge.lnqpappid);
    var args = vge.urlparse(location.href),
        qr = args.s,
        openid = args.openid,
        vjifenOpenid = args.vjifenOpenid,
        unionid = '';
    var flag = true,
        replace = 'lnqp';

    var dom_location = document.getElementById('location'),
        dom_fail = document.getElementById('fail');

    sessionStorage.clear();
    sessionStorage.openid = openid;
    sessionStorage.qr = qr;

    loading('玩命加载中');

    function locationed(res) {
        dom_location.style.display = 'none';
        dom_fail.style.display = 'none';
        loading('玩命加载中');
        sessionStorage.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        sessionStorage.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        sessionStorage.speed = res.speed; // 速度，以米/每秒计
        sessionStorage.accuracy = res.accuracy; // 位置精度
        if (qr.indexOf('MS_') != -1) {
            getMS();
        } else {
            sweep();
        }
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
                    if (qr.indexOf('MS_') != -1) {
                        getMS();
                    } else {
                        sweep();
                    }
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
                }, false);
            }
        });
    }

    function sweep() {
        if (flag) {
            flag = false;
            loading('玩命加载中'); //调用接口
            var japi = vge.lnqp + '/DBTLNQPInterface/sweep/sweepQrcode';
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
	function transTime(){
		var now = new Date();
		var mon = now.getMonth()+1<10?'0'+(now.getMonth()+1):now.getMonth()+1,
			day = now.getDate()<10?'0'+now.getDate():now.getDate(),
			h = now.getHours()<10?'0'+now.getHours():now.getHours(),
			m = now.getMinutes()<10?'0'+now.getMinutes():now.getMinutes(),
			s = now.getSeconds()<10?'0'+now.getSeconds():now.getSeconds();
		return now.getFullYear()+'-'+mon+'-'+day+'T'+h+":"+m+':'+s;
	}
	
    function cb(jo) {
        vge.clog('辽宁扫码', ['vjf-h5-log',transTime(),openid,'辽宁青啤',location.href.split('?')[0],'扫码','扫码',jo.reply.activityVersion]);
        if (jo.result.code == '0') {
            // 辽宁单独字段 skyType 用于区分瓶和罐
            if (jo.reply) {
                if (jo.reply.skuType) {
                    sessionStorage.skuType = jo.reply.skuType === undefined ? '0' : jo.reply.skuType;
                }
                if(jo.reply.activityVersion=='3'){//集卡版本-新春
                	replace = 'lnqp-jk';
                }
                if(jo.reply.activityVersion=='4'){//集卡版本-中秋国庆
                	replace = 'lnqp-jkMidAut';
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
				sessionStorage.checkUserName = jo.reply.checkPrizeRecord.checkUserName;
				sessionStorage.checkStatus = jo.reply.checkPrizeRecord.checkStatus;
				sessionStorage.checkTime = jo.reply.checkPrizeRecord.checkTime;
				sessionStorage.checkRemarks = jo.reply.checkPrizeRecord.checkRemarks;
				location.replace('http://' + location.host + '/v/lnqp/verification.html?bizcode=' + jo.result.businessCode);
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
					sessionStorage.city = jo.reply.city;// 	扫码城市
                    // 一码双奖
                    if (jo.reply.doublePrize) {
                        sessionStorage.skukey = jo.reply.skukey;
                        sessionStorage.prizeVcode = jo.reply.prizeVcode;
                        sessionStorage.allAccountMoney = jo.reply.allAccountMoney;
                        sessionStorage.setItem('doublePrize', JSON.stringify(jo.reply.doublePrize));
                    }
                    //集卡
                    sessionStorage.cardNo = jo.reply.cardNo;
                    //时间
                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
					if(jo.reply.perMantissaPrize){//逢19
						sessionStorage.perMantissaPrize = JSON.stringify(jo.reply.perMantissaPrize);
					}
                    // 跳转
                    location.replace('http://' + location.host + '/' + replace + '/txo/getcash?bizcode=' + jo.result.businessCode);
                    break;
                case '11': // 自己重复扫，普通奖
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime;
                    location.replace('http://' + location.host + '/' + replace + '/txo/getcash?bizcode=' + jo.result.businessCode);
                    break;
                case '12': // 可疑用户
                    location.replace('http://' + location.host + '/v/' + replace + '/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '13': // 黑名单
                    location.replace('http://' + location.host + '/v/' + replace + '/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '14': // 与12相同
                    location.replace('http://' + location.host + '/v/' + replace + '/getMsg.html?bizcode=' + jo.result.businessCode);
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
					if(jo.reply.perMantissaPrize){
						sessionStorage.perMantissaPrize = JSON.stringify(jo.reply.perMantissaPrize);
					}
				    location.replace('http://' + location.host + '/' + replace + '/txo/getcash?bizcode=' + jo.result.businessCode);
				    break;			
                case '7': // 大奖
                    sessionStorage.username = jo.reply.username === undefined ? '' : jo.reply.username;
                    sessionStorage.phonenum = jo.reply.phonenum === undefined ? '' : jo.reply.phonenum;
                    sessionStorage.idcard = jo.reply.idcard === undefined ? '' : jo.reply.idcard;
                    sessionStorage.address = jo.reply.address === undefined ? '' : jo.reply.address;
                    sessionStorage.skukey = jo.reply.skukey;
                    sessionStorage.prizeVcode = jo.reply.prizeVcode;
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    var grandPrizeTypeArr = ['P', 'p', 'Q', 'q']
                    if (grandPrizeTypeArr.indexOf(jo.reply.grandPrizeType) !== -1) {
                        location.replace('http://' + location.host + '/v/' + replace + '/prize.html?bizcode=' + jo.result.businessCode);
                    } else {
                        title_tip('尊敬的用户', '扫码异常', '我知道了');
                    }
                    break;
                case '15': //他人重复扫大奖
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
                    location.replace('http://' + location.host + '/v/' + replace + '/prize.html?bizcode=' + jo.result.businessCode);
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
            var japi = vge.lnqp + '/DBTLNQPInterface/vpoints/seckill/sweepQrcode';
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
                sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
				if(jo.reply.prizeType=='M01'||jo.reply.prizeType=='M02'||jo.reply.prizeType=='M03'||jo.reply.prizeType=='M04'||jo.reply.prizeType=='M05'||jo.reply.prizeType=='M06'){
					sessionStorage.prizeType = jo.reply.prizeType;
					location.replace('http://' + location.host + '/v/lnqpMS/prize.html?bizcode=' + jo.result.businessCode);
				}else if(jo.reply.prizeType=='0'){//红包
					sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
					sessionStorage.currentMoney = jo.reply.currentMoney;
					sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
					location.replace('http://' + location.host + '/lnqpMS/txo/getcash?bizcode=' + jo.result.businessCode);
				}else{
					sessionStorage.prizeType = jo.reply.prizeType;
					location.replace('http://' + location.host + '/v/lnqpMS/prize.html?bizcode=' + jo.result.businessCode);
				}
            } else {
                sessionStorage.msg = jo.result.msg;
                location.replace('http://' + location.host + '/v/lnqpMS/fail.html?bizcode='+jo.result.businessCode);
            }
        }
    }
	
    function loading(txt) {
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
