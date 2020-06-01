(function () {
    var reg1 = /[0-9a-zA-Z]{11}/,
        reg2 = /^1[0-9]{10}/,
        reg3 = /[0-9]{4}/;
    var tel_code = document.getElementById("phonenum"),
        btn = document.getElementById("btn"),
        flag = true,
        args = vge.urlparse(location.href),
        hbopenid = args.openid,
        bizcode = args.bizcode;

    btn.addEventListener('click', function () {
        if (!reg2.test(tel_code.value)) {
            title_tip('提 示', '请填写正确的手机号！~', '我知道了');
        } else {
            updateUserInfoMobile();
        }
    }, false);

    function updateUserInfoMobile() {
        var japi = vge.rio + '/DBTRioInterface/user/updateUserInfoMobile';
        var req = {
            "openid": sessionStorage.openid,
            "phonenum": tel_code.value
        };
        $.ajax({
            type: "POST",
            url: japi,
            data: JSON.stringify(req),
            dataType: 'json',
            success: function (jo, status, xhr) {
                if (jo.result.code == '0') {
                    if (jo.result.businessCode == '0') {
                        //调扫码接口，判断码有没有被使用过
                        sweep();
                    } else if (jo.result.businessCode == '5') {
                        sessionStorage.earnTime = jo.reply.earnTime;
                        sessionStorage.prizeType = jo.reply.prizeType;
                        location.replace('http://' + location.host + '/v/RIO/fail.html?bizcode=' + jo.result.businessCode);
                    } else {
                        title_tip('提 示', jo.result.msg, '我知道了');
                    }
                } else {
                    title_tip('提 示', jo.result.msg, '我知道了');
                }
            },
            error: function (jo, status, xhr) {
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            }
        });
    }

    function sweep() {
        var japi = vge.rio + '/DBTRioInterface/sweep/sweepQrcode';
        var req = {
            "openid": sessionStorage.openid,
            "sweepstr": sessionStorage.qr,
            "vjifenOpenid": sessionStorage.vjifenOpenid,
            "headimgurl": sessionStorage.headimg,
            "subscribeStatus": sessionStorage.subscribeStatus,
            "nickname": sessionStorage.nickname,
            "longitude": sessionStorage.longitude === undefined ? '00' : sessionStorage.longitude, //"经度"
            "latitude": sessionStorage.latitude === undefined ? '00' : sessionStorage.latitude //"纬度"
        };
        $.ajax({
            type: "POST",
            url: japi,
            data: JSON.stringify(req),
            dataType: 'json',
            success: function (jo, status, xhr) {
                // alert(jo.result.code);
                // alert(jo.result.businessCode);
                if (jo.result.code == '0') {
                    switch (jo.result.businessCode) {
                        case '0': // 普通奖
                            if (bizcode == '20') { //未填手机号，已关注
                                //跳转第三方
                                if (sessionStorage.prizeType == 'H') {
                                    location.href = 'https://h5.youzan.com/v2/ump/promocard/fetch?alias=7o140tqz';
                                } else if (sessionStorage.prizeType == 'I') {
                                    location.href = 'https://h5.youzan.com/v2/ump/promocard/fetch?alias=18vf0memn';
                                }
                            } else if (bizcode == '22') { //未填手机号，未关注
                                //去关注
                                location.href = 'http://' + location.host + '/v/RIO/attention.html?bizcode=22';
                            }
                            break;
                        case '11': // 自己重复扫，普通奖
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
                        case '2':
                            sessionStorage.earnTime = jo.reply.earnTime;
                            sessionStorage.prizeType = jo.reply.prizeType;
                            location.replace('http://' + location.host + '/v/RIO/fail.html?bizcode=' + jo.result.businessCode);
                            break;
                        case '20': // 未填手机号
                            sessionStorage.prizeType = jo.reply.prizeType;
                            sessionStorage.useStatus = jo.reply.useStatus;
                            sessionStorage.prizeVcode = jo.reply.prizeVcode;
                            // location.replace('http://' + location.host + '/v/RIO/getcash.html?bizcode=' + jo.result.businessCode);
                            location.replace('http://' + location.host + '/RIO/txo/phonenum?bizcode=' + jo.result.businessCode);
                            break;
                        case '21': // 未关注
                            sessionStorage.prizeType = jo.reply.prizeType;
                            sessionStorage.useStatus = jo.reply.useStatus;
                            sessionStorage.prizeVcode = jo.reply.prizeVcode;
                            // location.replace('http://' + location.host + '/v/RIO/getcash.html?bizcode=' + jo.result.businessCode);
                            location.replace('http://' + location.host + '/v/RIO/attention.html?bizcode=' + jo.result.businessCode);
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
                        default:
                            if (jo.reply) {
                                sessionStorage.batchName = jo.reply.batchName === undefined ? '' : jo.reply.batchName;
                                sessionStorage.earnTime = jo.reply.earnTime;
                                sessionStorage.msg = jo.result.msg;
                            }
                            location.replace('http://' + location.host + '/v/RIO/fail2.html?bizcode=' + jo.result.businessCode);
                    }
                } else {
                    title_tip('提 示', jo.result.msg, '我知道了');
                }
            },
            error: function (jo, status, xhr) {
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            }
        });
    }
})();