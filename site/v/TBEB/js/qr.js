(function () {
    "use strict";
    ini_wxshare(vge.tbebappid);
    var args = vge.urlparse(location.href),
        qr = args.s,
        openid = args.openid,
        vjifenOpenid = args.vjifenOpenid;
    var flag = true;
    //$('#info').html('您扫的码是【'+qr+'】<br>openid: '+openid);
    title_tip('提示', '活动已结束！', '我知道了');
    return;

    var nickname = '',
        headimgurl = '';
    sessionStorage.clear();
    sessionStorage.openid = openid;
    sessionStorage.qr = qr;
    // loading('玩命加载中'); //获取用户信息
    // setTimeout(function () { // 应对定位调用异常
    //     if (sessionStorage.latitude === undefined) {
    //         sweep();
    //     }
    // }, 3000);

    function locationed(res) {
        sessionStorage.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        sessionStorage.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        sessionStorage.speed = res.speed; // 速度，以米/每秒计
        sessionStorage.accuracy = res.accuracy; // 位置精度
        sweep();
    }


    // $.get('http://' + vge.o3host + '/wx3/uinfo?openid=' + openid, function (r) {
    //     r = JSON.parse(r);
    //     nickname = r.nickname === '' ? '未知用户' : r.nickname;
    //     headimgurl = r.headimgurl === '' ? '/v/zzqp/img/bg/headimg.png' : r.headimgurl === '/0' ? '/v/zzqp/img/bg/headimg.png' : r.headimgurl;
    //     sessionStorage.nickname = nickname;
    //     sessionStorage.headimgurl = headimgurl;
    //     sessionStorage.sex = r.sex;
    //     sessionStorage.city = r.city;
    //     sessionStorage.province = r.province;
    //     sessionStorage.country = r.country;
    //     vge.clog('获取用户信息', [JSON.stringify(r), headimgurl]);
    // });
    // wx.ready(function () {
    //     WeixinJSBridge.call('hideOptionMenu'); //隐藏右上角菜单	
    //     wx.getLocation({
    //         type: 'wgs84',
    //         complete: locationed //接口调用完成时执行的回调函数，无论成功或失败都会执行。
    //     });
    // });

    function sweep() {
        if (flag) {
            flag = false;
            var japi = vge.tbeb + '/DBTECQPInterface/sweep/sweepQrcode';
            var req = {
                "openid": openid,
                "sweepstr": qr,
                "vjifenOpenid": vjifenOpenid,
                "longitude": sessionStorage.longitude === undefined ? '00' : sessionStorage.longitude, //"经度"
                "latitude": sessionStorage.latitude === undefined ? '00' : sessionStorage.latitude, //"纬度"
                "nickname": nickname, //"昵称"
                "headimgurl": headimgurl, //"头像"
                "sex": sessionStorage.sex === undefined ? '' : sessionStorage.sex,
                "province": sessionStorage.province === undefined ? '' : sessionStorage.province,
                "city": sessionStorage.city === undefined ? '' : sessionStorage.city
            };
            vge.clog('debug', [japi, JSON.stringify(req)]);
            vge.callJApi(japi, req, cb);
        }
    }

    function cb(jo) {
        // if (new Date().getTime() > 1525449600000) { //5月5日0点关闭
        //     sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
        //     sessionStorage.currentMoney = jo.reply.currentMoney;
        //     sessionStorage.currentVpoints = jo.reply.currentVpoints;
        //     location.replace('http://' + location.host + '/TBEB/txo/over');
        // } else {
        if (jo.result.code == '0') {
            switch (jo.result.businessCode) {
                case '0': // 普通奖
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.currentVpoints = jo.reply.currentVpoints;
                    location.replace('http://' + location.host + '/TBEB/txo/index?bizcode=' + jo.result.businessCode);
                    break;
                case '11': // 自己重复扫，普通奖
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.currentVpoints = jo.reply.currentVpoints;
                    location.replace('http://' + location.host + '/TBEB/txo/result?bizcode=' + jo.result.businessCode);
                    break;
                case '12':
                    location.replace('http://' + location.host + '/v/TBEB/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '13':
                    location.replace('http://' + location.host + '/v/TBEB/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '14':
                    location.replace('http://' + location.host + '/v/TBEB/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                default:
                    if (jo.reply) {
                        sessionStorage.batchName = jo.reply.batchName === undefined ? '' : jo.reply.batchName;
                        sessionStorage.msg = jo.result.msg;
                    }
                    location.replace('http://' + location.host + '/v/TBEB/fail.html?bizcode=' + jo.result.businessCode);
            }
        } else if (jo.result.code == '-1') { //code !=0;
            title_tip('尊敬的用户', '系统升级中，请稍后再试！', '我知道了');
        } else {
            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
        }
        // }
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