(function () {
    "use strict";
    ini_wxshare(vge.zzqpappid);
    var args = vge.urlparse(location.href),
        nickname = '',
        headimgurl = '',
        qr = args.s,
        openid = args.openid,
        vjifenOpenid = args.vjifenOpenid;

    var flag = true;

    //$('#info').html('您扫的码是【'+qr+'】<br>openid: '+openid);

    sessionStorage.clear();
    sessionStorage.openid = openid;
    sessionStorage.sweepstr = qr;

    setTimeout(function () { // 应对定位调用异常
        if (sessionStorage.latitude === undefined) {
            sweep();
        }
    }, 5000);

    function locationed(res) {
        sessionStorage.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        sessionStorage.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        sessionStorage.speed = res.speed; // 速度，以米/每秒计
        sessionStorage.accuracy = res.accuracy; // 位置精度
        sweep();
    }


    loading('玩命加载中'); //获取用户信息

    $.get('http://' + vge.o3host + '/wx3/uinfo?openid=' + openid, function (r) {
        loading('玩命加载中'); //获取用户信息
        r = JSON.parse(r);
        nickname = r.nickname === undefined? '未知用户' : r.nickname;
        headimgurl = r.headimgurl === undefined? '/v/zzqp/img/bg/headimg.png' : r.headimgurl;
        sessionStorage.nickname = nickname;
        sessionStorage.headimgurl = headimgurl;
        sessionStorage.sex = r.sex===undefined?'':r.sex;
        sessionStorage.city = r.city===undefined?'':r.city;
        sessionStorage.province = r.province===undefined?'':r.province;
        sessionStorage.country = r.country===undefined?'':r.country;
        vge.clog('获取用户信息', [JSON.stringify(r), headimgurl]);
    });

    wx.ready(function () {
        loading('玩命加载中');
        // WeixinJSBridge.call('hideOptionMenu'); //隐藏右上角菜单	
        wx.getLocation({
            type: 'wgs84',
            complete: locationed //接口调用完成时执行的回调函数，无论成功或失败都会执行。
        });
    });


    function sweep() {
        if (flag) {
            flag = false;
            loading('玩命加载中'); //调用接口
            var japi = vge.zzqp + '/DBTHNQPInterface/sweep/sweepQrcode';
            var req = {
                "openid": openid,
                "vjifenOpenid":vjifenOpenid,
                "sweepstr": qr,
                "nickname": nickname, //"昵称"
                "sex": sessionStorage.sex === undefined ? '' : sessionStorage.sex,
                "province": sessionStorage.province === undefined ? '' : sessionStorage.province,
                "city": sessionStorage.city === undefined ? '' : sessionStorage.city,
                "country": sessionStorage.country === undefined ? '' : sessionStorage.country,
                "headimgurl": headimgurl, //"头像"
                "longitude": sessionStorage.longitude === undefined ? '00' : sessionStorage.longitude, //"经度"
                "latitude": sessionStorage.latitude === undefined ? '00' : sessionStorage.latitude //"纬度"
            };
            vge.clog('debug', [japi, JSON.stringify(req)]);
            vge.callJApi(japi, req, cb);
        }
    }

    var relist = ['青啤河南经典10度500ml三厂088', '青啤河南经典10度500ml三厂092', '青啤河南经典10度500ml三厂093', '青啤河南经典10度500ml三厂102'];

    function cb(jo) {
        // if(!confirm('返回码:'+jo.result.businessCode+' 是否跳转')) {
        // 	return;
        // }
        vge.clog('返回值：', [JSON.stringify(jo)]);
        var replace = '/v/zzqpNew/index.html?bizcode=';
        if (jo.result.code == '0') {
            if (jo.result.versionCode) {
                sessionStorage.ticketExchangeTipFlag = jo.reply.ticketExchangeTipFlag == undefined ? '' : jo.reply.ticketExchangeTipFlag;
                if (jo.result.versionCode == '1.17.0214') {
                    replace = '/v/zzqp0214/guifei.html?bizcode=';
                } else if (jo.result.versionCode == '2') { //集卡版
                    replace = '/v/zzqp20180401/getcash.html?bizcode=';
                    sessionStorage.sweepCode = jo.reply.sweepCode == undefined ? '' : jo.reply.sweepCode;
                    sessionStorage.currentMoney = jo.reply.currentMoney == undefined ? '' : jo.reply.currentMoney;
                    sessionStorage.currentJifen = jo.reply.currentJifen == undefined ? '' : jo.reply.currentJifen;
                    sessionStorage.prizeType = jo.reply.prizeType == undefined ? '' : jo.reply.prizeType;
                    sessionStorage.cardType = jo.reply.cardType == undefined ? '' : jo.reply.cardType;
                    sessionStorage.username = jo.reply.username == undefined ? '' : jo.reply.username;
                    sessionStorage.idcard = jo.reply.idcard == undefined ? '' : jo.reply.idcard;
                    sessionStorage.phonenum = jo.reply.phonenum == undefined ? '' : jo.reply.phonenum;
                    sessionStorage.address = jo.reply.address == undefined ? '' : jo.reply.address;
                    sessionStorage.weekSignFlag = jo.reply.weekSignFlag == undefined ? '' : jo.reply.weekSignFlag;
                    sessionStorage.weekSignPopup = jo.reply.weekSignPopup == undefined ? '' : jo.reply.weekSignPopup;
                    sessionStorage.weekSignDays = jo.reply.weekSignDays == undefined ? '' : jo.reply.weekSignDays;
                    sessionStorage.weekSignEarnFlag = jo.reply.weekSignEarnFlag == undefined ? '' : jo.reply.weekSignEarnFlag;
                    sessionStorage.weekSignEarnMoney = jo.reply.weekSignEarnMoney == undefined ? '' : jo.reply.weekSignEarnMoney;
                    sessionStorage.weekSignLimitDay = jo.reply.weekSignLimitDay == undefined ? '' : jo.reply.weekSignLimitDay;
                    sessionStorage.weekSignDiffDay = jo.reply.weekSignDiffDay == undefined ? '' : jo.reply.weekSignDiffDay;
                    sessionStorage.weekSignPercent = jo.reply.weekSignPercent == undefined ? '' : jo.reply.weekSignPercent;
                    sessionStorage.earnTime = jo.reply.earnTime == undefined ? '' : jo.reply.earnTime;
                } else if (jo.result.versionCode == '1') {
                    replace = '/v/zzqpNew/index.html?bizcode=';
                } else if(jo.result.versionCode == '3'){//科技感版
                    replace = '/v/zzqp20180801/getcash.html?bizcode=';
                    sessionStorage.sweepCode = jo.reply.sweepCode == undefined ? '' : jo.reply.sweepCode;
                    sessionStorage.currentMoney = jo.reply.currentMoney == undefined ? '' : jo.reply.currentMoney;
                    sessionStorage.currentJifen = jo.reply.currentJifen == undefined ? '' : jo.reply.currentJifen;
                    sessionStorage.prizeType = jo.reply.prizeType == undefined ? '' : jo.reply.prizeType;
                    sessionStorage.cardType = jo.reply.cardType == undefined ? '' : jo.reply.cardType;
                    sessionStorage.username = jo.reply.username == undefined ? '' : jo.reply.username;
                    sessionStorage.idcard = jo.reply.idcard == undefined ? '' : jo.reply.idcard;
                    sessionStorage.phonenum = jo.reply.phonenum == undefined ? '' : jo.reply.phonenum;
                    sessionStorage.address = jo.reply.address == undefined ? '' : jo.reply.address;
                    sessionStorage.earnTime = jo.reply.earnTime == undefined ? '' : jo.reply.earnTime;
                }else{
                    replace = '/v/zzqpNew/index.html?bizcode=';
                }
            }
            switch (jo.result.businessCode) {
                case '0': // 普通奖
                    location.replace('http://' + location.host + replace + jo.result.businessCode);
                    break;
                case '19': // 问卷
                    sessionStorage.questionList = JSON.stringify(jo.reply.questionList);
                    location.replace('http://' + location.host + replace + jo.result.businessCode);
                    break;
                case '1': // 该积分码不存在
                    location.replace('http://' + location.host + replace + jo.result.businessCode);
                    break;
                case '2': // 该积分码已经被使用过
                    location.replace('http://' + location.host + replace + jo.result.businessCode);
                    break;
                case '3': // 积分码已过期
                    location.replace('http://' + location.host + replace + jo.result.businessCode);
                    break;
                case '4': // 活动未开始
                    console.log(jo.result.remarks);
                    sessionStorage.remarks = jo.result.remarks;
                    location.replace('http://' + location.host + replace + jo.result.businessCode);
                    break;
                case '5': // 活动已结束
                    if (relist.indexOf(jo.result.remarks) !== -1) {
                        location.replace('http://' + location.host + '/v/zzqp20170815/mistake.html');
                    } else {
                        location.replace('http://' + location.host + replace + jo.result.businessCode);
                    }
                    break;
                case '7': // 大奖
                    location.replace('http://' + location.host + replace + jo.result.businessCode);
                    break;
                case '11': // 自己重复扫，普通奖
                    location.replace('http://' + location.host + replace + jo.result.businessCode);
                    break;
                case '12': // 可疑用户
                    if (jo.result.versionCode == '2') {
                        location.replace('http://' + location.host + '/v/zzqp20180401/getMsg.html?bizcode=' + jo.result.businessCode);
                    } else {
                        location.replace('http://' + location.host + '/v/zzqp20180801/getMsg.html?bizcode=' + jo.result.businessCode);
                    }
                    break;
                case '14': // 指定用户
                    if (jo.result.versionCode == '2') {
                        location.replace('http://' + location.host + '/v/zzqp20180401/getMsg.html?bizcode=' + jo.result.businessCode);
                    } else {
                        location.replace('http://' + location.host + '/v/zzqp20180801/getMsg.html?bizcode=' + jo.result.businessCode);
                    }
                    break;
                case '15': // 一等奖核销
                    if (jo.reply.earnTime) {
                        sessionStorage.earnTime = jo.reply.earnTime;
                    }
                    location.replace('http://' + location.host + replace + jo.result.businessCode);
                    break;
                case '13': // 黑名单
                    if (jo.result.versionCode == '2') {
                        location.replace('http://' + location.host + '/v/zzqp20180401/getMsg.html?bizcode=' + jo.result.businessCode);
                    } else {
                        location.replace('http://' + location.host + '/v/zzqp20180801/getMsg.html?bizcode=' + jo.result.businessCode);
                    }
                    break;
                case '-1': // 系统升级中
                    location.replace('http://' + location.host + replace + jo.result.businessCode);
                    break;
                default:
                    location.replace('http://' + location.host + replace + jo.result.businessCode);
            }
        } else { //code != 0;
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