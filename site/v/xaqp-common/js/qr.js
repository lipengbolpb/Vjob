(function () {
    "use strict";
    var APPID = vge.xaqpappid;
    var SWEEP_PORT = vge.xaqp + '/DBTXIANQPInterface/sweep/sweepQrcode';
    var PROJECT = 'xaqp-common2.0';

    ini_wxshare(APPID);
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
            var japi = SWEEP_PORT;
            var req = {
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
        if (jo.result.code == '0') {
            if (jo.reply) {
                if (jo.reply.activityVersion == '3') {
                    PROJECT = 'xaqp-cs-common2.0';
                } else if (jo.reply.activityVersion == '4') { //世界杯版
                    PROJECT = 'xaqp-FIFA';
                } else if (jo.reply.activityVersion == '5') { //汉斯世界杯版
                    PROJECT = 'xaqp-cs-FIFA';
                }
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
                    // 跳转
                    location.replace('http://' + location.host + '/' + PROJECT + '/txo/getcash?bizcode=' + jo.result.businessCode);
                    break;
                case '11': // 自己重复扫，普通奖
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    sessionStorage.skukey = jo.reply.skukey;
                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime;
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
                    sessionStorage.idcard = jo.reply.idcard === undefined ? '' : jo.reply.idcard;
                    sessionStorage.skukey = jo.reply.skukey;
                    sessionStorage.prizeVcode = jo.reply.prizeVcode;
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    location.replace('http://' + location.host + '/v/' + PROJECT + '/prize.html?bizcode=' + jo.result.businessCode);
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