(function () {
    "use strict";
    ini_wxshare(vge.rioappid);
    var args = vge.urlparse(location.href),
        qr = args.s,
        openid = args.openid,
        unionid = '',
        vjifenOpenid = args.vjifenOpenid;
    var flag = true,
        nickname = '',
        subscribeStatus = '',
        headimg = '';
    var dom_location = document.getElementById('location'),
        dom_fail = document.getElementById('fail');

    sessionStorage.clear();
    sessionStorage.openid = openid;
    sessionStorage.qr = qr;
    sessionStorage.vjifenOpenid = vjifenOpenid;

    function locationed(res) {
        loading('玩命加载中');
        dom_location.style.display = 'none';
        dom_fail.style.display = 'none';
        sessionStorage.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        sessionStorage.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        sessionStorage.speed = res.speed; // 速度，以米/每秒计
        sessionStorage.accuracy = res.accuracy; // 位置精度
        subscribe();
    }

    //	setTimeout(function(){
    //		subscribe();
    //	},3000);

    loading('玩命加载中'); //获取用户信息  
    wx.ready(function () {
        loading('玩命加载中');
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
                    subscribe();
                }, false);
            },
            success: locationed, //接口调用完成时执行的回调函数，无论成功或失败都会执行。
            fail: function (res) {
                loaded();
                dom_fail.style.display = 'block';
                dom_fail.addEventListener('click', function () {
                    dom_fail.style.display = 'none';
                    subscribe();
                }, false);
            }
        });
    }

    function sweep() {
        if (flag) {
            flag = false;
            loading('玩命加载中'); //调用接口
            var japi = vge.rio + '/DBTRioInterface/sweep/sweepQrcode';
            var req = {
                "openid": openid,
                "sweepstr": qr,
                "vjifenOpenid": vjifenOpenid,
                "headimgurl": headimg,
                "subscribeStatus": subscribeStatus,
                "nickname": nickname,
                "longitude": sessionStorage.longitude === undefined ? '00' : sessionStorage.longitude, //"经度"
                "latitude": sessionStorage.latitude === undefined ? '00' : sessionStorage.latitude //"纬度"
            };
            sessionStorage.nickname = nickname;
            sessionStorage.headimg = headimg;
            sessionStorage.subscribeStatus = subscribeStatus;
            vge.clog('debug', [japi, JSON.stringify(req)]);
            vge.callJApi(japi, req, cb);
        }
    }

    function subscribe() { //判断关注
        var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.rioappid;
        vge.ajxget(requrl, 5000, function (r) {
            try {
                var o = JSON.parse(r);
                if (o.subscribe == 0) { //未关注
                    subscribeStatus = '0';
                } else { //已关注用户
                    subscribeStatus = '1';
                    headimg = o.headimgurl;
                    nickname = o.nickname;
                }
                sweep();
                vge.clog('个人信息', JSON.stringify(o));
            } catch (e) {
                sweep();
                vge.clog('errmsg', [requrl, e]);
            }
        }, function (err) {
            sweep();
            vge.clog('errmsg', [requrl, err]);
        });
    }

    function cb(jo) {
        if (jo.result.code == '0') {
            vge.clog('返回', [JSON.stringify(jo)]);
            switch (jo.result.businessCode) {
                case '0': // 普通奖
                    sessionStorage.prizeType = jo.reply.prizeType;
                    sessionStorage.prizeVcode = jo.reply.prizeVcode;
                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
                    if (jo.reply.useStatus == 2) { //已扫未领取
                        location.replace('http://' + location.host + '/v/RIO/getcash.html?bizcode=' + jo.result.businessCode);
                    } else if (jo.reply.useStatus == 1) { //已领取
                        location.replace('http://' + location.host + '/v/RIO/fail.html?bizcode=' + jo.result.businessCode);
                    } else if (jo.reply.useStatus == 0) { //未扫
                        location.replace('http://' + location.host + '/v/RIO/getcash.html?bizcode=' + jo.result.businessCode);
                    }
                    break;
                case '11': // 自己重复扫，普通奖
                    sessionStorage.prizeVcode = jo.reply.prizeVcode;
                    sessionStorage.earnTime = jo.reply.earnTime;
                    sessionStorage.prizeType = jo.reply.prizeType;
                    if (jo.reply.useStatus == 2) { //已扫未领取
                        location.replace('http://' + location.host + '/v/RIO/getcash.html?bizcode=' + jo.result.businessCode);
                    } else if (jo.reply.useStatus == 1) { //已领取
                        location.replace('http://' + location.host + '/v/RIO/fail.html?bizcode=' + jo.result.businessCode);
                    } else if (jo.reply.useStatus == 0) { //未扫
                        location.replace('http://' + location.host + '/v/RIO/getcash.html?bizcode=' + jo.result.businessCode);
                    }
                    break;
                case '2': // 自己重复扫，普通奖
                    if (jo.reply.earnTime) {
                        sessionStorage.earnTime = jo.reply.earnTime;
                    }
                    if (jo.reply.prizeType) {
                        sessionStorage.prizeType = jo.reply.prizeType;
                    }
                    // sessionStorage.earnTime = jo.reply.earnTime;
                    // sessionStorage.prizeType = jo.reply.prizeType;
                    location.replace('http://' + location.host + '/v/RIO/fail.html?bizcode=' + jo.result.businessCode);
                    break;
                case '20': // 未填手机号
                    sessionStorage.prizeType = jo.reply.prizeType;
                    sessionStorage.useStatus = jo.reply.useStatus;
                    sessionStorage.prizeVcode = jo.reply.prizeVcode;
                    location.replace('http://' + location.host + '/v/RIO/getcash.html?bizcode=' + jo.result.businessCode);
                    // location.replace('http://' + location.host + '/RIO/txo/phonenum?bizcode=' + jo.result.businessCode);
                    break;
                case '21': // 未关注
                    sessionStorage.prizeType = jo.reply.prizeType;
                    sessionStorage.useStatus = jo.reply.useStatus;
                    sessionStorage.prizeVcode = jo.reply.prizeVcode;
                    location.replace('http://' + location.host + '/v/RIO/getcash.html?bizcode=' + jo.result.businessCode);
                    // location.replace('http://' + location.host + '/v/RIO/attention.html?bizcode=' + jo.result.businessCode);
                    break;
                case '22': //未关注，未填手机号
                    sessionStorage.prizeType = jo.reply.prizeType;
                    sessionStorage.useStatus = jo.reply.useStatus;
                    sessionStorage.prizeVcode = jo.reply.prizeVcode;
                    location.replace('http://' + location.host + '/v/RIO/getcash.html?bizcode=' + jo.result.businessCode);
                    break;
                case '12': // 
                    location.replace('http://' + location.host + '/v/RIO/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '13': // 
                    location.replace('http://' + location.host + '/v/RIO/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '14': // 
                    location.replace('http://' + location.host + '/v/RIO/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '15': //
                    sessionStorage.earnTime = jo.reply.earnTime;
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    location.replace('http://' + location.host + '/v/RIO/prize.html?bizcode=' + jo.result.businessCode);
                    break;
                case '7': //一等奖或二等奖
                    if (jo.reply.grandPrizeType == 0) {
                        sessionStorage.address = jo.reply.address === undefined ? '' : jo.reply.address;
                    }
                    sessionStorage.username = jo.reply.username === undefined ? '' : jo.reply.username;
                    sessionStorage.idcard = jo.reply.idcard === undefined ? '' : jo.reply.idcard;
                    sessionStorage.phonenum = jo.reply.phonenum === undefined ? '' : jo.reply.phonenum;
                    sessionStorage.skukey = jo.reply.skukey === undefined ? '' : jo.reply.skukey;
                    //中奖具体码
                    sessionStorage.prizeVcode = jo.reply.prizeVcode === undefined ? '' : jo.reply.prizeVcode;
                    //特等奖类别
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    location.replace('http://' + location.host + '/v/RIO/prize.html');
                    break;
                default:
                    if (jo.reply) {
                        sessionStorage.batchName = jo.reply.batchName === undefined ? '' : jo.reply.batchName;
                        sessionStorage.earnTime = jo.reply.earnTime;
                        sessionStorage.msg = jo.result.msg;
                    }
                    location.replace('http://' + location.host + '/v/RIO/fail2.html?bizcode=' + jo.result.businessCode);
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