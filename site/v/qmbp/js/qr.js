(function () {
    "use strict";
    ini_wxshare(vge.qmbpappid);
    var now1 = new Date();
    var args = vge.urlparse(location.href),
        qr = args.s,
        openid = args.openid,
        vjifenOpenid = args.vjifenOpenid,
        unionid = '';
    var flag = true;
    // $('#info').html('您扫的码是【'+qr+'】<br>openid: '+openid+'<br>scqpappid:'+vge.scqpappid);

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
        sweep();
    }
    wx.ready(function () {
        wxGetLocation();
    });

    dom_fail.addEventListener('click', function () {
        dom_location.style.display = 'none';
        dom_fail.style.display = 'none';
        sweep();
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
            var japi = vge.common + '/vjifenInterface/sweep/sweepQrcode';
            var req = {
                "projectServerName":"qmbaipi",
                "openid": openid,
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
        vge.clog('全麦白啤扫码返回结果', [JSON.stringify(jo)]);
        if (jo.result.code == '0') {
            if (jo.reply.dayScanNum) {
                sessionStorage.dayScanNum = jo.reply.dayScanNum;
            }
            if (jo.reply.skuYear) {  //区分年份
                sessionStorage.skuYear = jo.reply.skuYear === undefined ? '' : jo.reply.skuYear;
            }
            if (jo.reply) {
                sessionStorage.city = jo.reply.city;
                sessionStorage.county = jo.reply.county;
            }
            switch (jo.result.businessCode) {
                case '0': // 普通奖
                    //集卡
                    if(jo.reply.cardNo){
                        sessionStorage.cardNo = jo.reply.cardNo;
                    }
                    // 优惠券
                    if (jo.reply.ticketInfo) {
                        sessionStorage.setItem('ticketInfo', JSON.stringify(jo.reply.ticketInfo));
                    }
                    sessionStorage.dayScanNum = jo.reply.dayScanNum;
                    sessionStorage.taoEasterEgg = jo.reply.taoEasterEgg || '';
                    sessionStorage.taoMemberOrderFlag = jo.reply.taoMemberOrderFlag;
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney==undefined?'0':jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney==undefined?'0':jo.reply.currentMoney;
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime;
					sessionStorage.province = jo.reply.province;
                    location.replace('http://' + location.host + '/v/qmbp/getcash.html?bizcode=' + jo.result.businessCode);
                    break;
                case '11': // 自己重复扫，普通奖
                    // 优惠券
                    if (jo.reply.ticketInfo) {
                        sessionStorage.setItem('ticketInfo', JSON.stringify(jo.reply.ticketInfo));
                    }
                    sessionStorage.taoEasterEgg = jo.reply.taoEasterEgg || '';
                    sessionStorage.taoMemberOrderFlag = jo.reply.taoMemberOrderFlag;
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney==undefined?'0':jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney==undefined?'0':jo.reply.currentMoney;
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime;
                    location.replace('http://' + location.host + '/v/qmbp/getcash.html?bizcode=' + jo.result.businessCode);
                    break;
                case '12': // 可疑用户
                    location.replace('http://' + location.host + '/v/qmbp/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '13': // 黑名单
                    location.replace('http://' + location.host + '/v/qmbp/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '14': // 与12相同
                    location.replace('http://' + location.host + '/v/qmbp/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '7': // 大奖
                    sessionStorage.username = jo.reply.username === undefined ? '' : jo.reply.username;
                    sessionStorage.phonenum = jo.reply.phonenum === undefined ? '' : jo.reply.phonenum;
                    sessionStorage.address = jo.reply.address === undefined ? '' : jo.reply.address;
                    sessionStorage.idcard = jo.reply.idcard === undefined ? '' : jo.reply.idcard;
                    sessionStorage.skukey = jo.reply.skukey;
                    sessionStorage.prizeVcode = jo.reply.prizeVcode;
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    location.replace('http://' + location.host + '/v/qmbp/prize.html?bizcode=' + jo.result.businessCode);
                    break;
                case '15': //他人重复扫大奖
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
                    location.replace('http://' + location.host + '/v/qmbp/prize.html?bizcode=' + jo.result.businessCode);
                    break;
                default:
                    if (jo.reply) {
                        sessionStorage.batchName = jo.reply.batchName === undefined ? '' : jo.reply.batchName;
                        sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime;
                    } else {
                        sessionStorage.earnTime = '';
                    }
                    location.replace('http://' + location.host + '/v/qmbp/fail.html?bizcode=' + jo.result.businessCode);
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