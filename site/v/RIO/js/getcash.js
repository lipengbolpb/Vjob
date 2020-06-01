(function () {
    'use strict';
    var hwb = document.documentElement.clientHeight / document.documentElement.clientWidth;
    var args = vge.urlparse(location.href),
        openid = args.openid,
        prizeVcode = args.prizeVcode,
        bizcode = args.bizcode;
    if (hwb < 1.5) { //矮屏幕手机 牛位置
        $('.fail_tip').css({
            'width': '11rem',
            'margin': '3rem auto 0'
        });
        $('.btn').css({
            'width': '8rem',
            'margin': '1.2rem 0 0 4rem'
        });
        $('.logo_b').css({
            'width': '8rem',
            'margin': '0 auto'
        });
        $('#btn').css({
            'top': '10rem'
        });
    }
    document.querySelector('body').addEventListener('touchmove', function (e) {
        e.preventDefault();
    });

    if (!!(args.openid)) {
        sessionStorage.prizeVcode = prizeVcode;
        sessionStorage.openid = openid;
        findCouponByUserVcode();
    } else {
        init(false);
    }

    function init(flag) {
        if (sessionStorage.prizeType == 'H') { //5元代金券
            $('.fail_tip').attr('src', '/v/RIO/img/quan_5.png');
        } else if (sessionStorage.prizeType == 'I') { //69减10元代金券
            $('.fail_tip').attr('src', '/v/RIO/img/quan_10.png');
        }
        $('#btn').on('click', function () {
            if (flag == true) { //公众号推送链接进入
                getCoupon(sessionStorage.prizeType);
            } else { //扫码进入
                switch (bizcode) {
                    case '0': //已填手机号，已关注
                        getCoupon(sessionStorage.prizeType); //先调接口，再跳转第三方
                        break;
                    case '11':
                        getCoupon(sessionStorage.prizeType); //先调接口，再跳转第三方
                        break;
                    case '20': //未填手机号
                        //去填手机号
                        location.replace('http://' + location.host + '/RIO/txo/phonenum?bizcode=20');
                        break;
                    case '21': //未关注
                        //去关注
                        location.replace('http://' + location.host + '/v/RIO/attention.html?bizcode=21');
                        break;
                    case '22': //未填手机号，未关注
                        //去填手机号
                        location.replace('http://' + location.host + '/RIO/txo/phonenum?bizcode=22');
                        break;
                    default:
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            }
        });
    }

    function findCouponByUserVcode() { //根据二维码获取用户优惠券
        var javai = vge.rio + '/DBTRioInterface/gifts/findCouponByUserVcode';
        var req = {
            "openid": openid,
            "prizeVcode": sessionStorage.prizeVcode
        };
        $.ajax({
            type: "POST",
            url: javai,
            data: JSON.stringify(req),
            dataType: 'json',
            success: function (res, status, xhr) {
                if (res.result.code == '0') {
                    if (res.result.businessCode == '0') {
                        sessionStorage.prizeType = res.reply.prizeType;
                        init(true);
                    } else {
                        title_tip('尊敬的用户', jo.result.msg, '我知道了');
                    }
                } else if (jo.result.code == '-1') { //code !=0;
                    title_tip('尊敬的用户', '系统升级中，请稍后再试！', '我知道了');
                } else {
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            },
            error: function (res, status, xhr) {
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            }
        });
    }

    function getCoupon(index) {
        var javai = vge.rio + '/DBTRioInterface/gifts/getCoupon';
        var req = {
            "openid": sessionStorage.openid,
            "prizeVcode": sessionStorage.prizeVcode
        };
        $.ajax({
            type: "POST",
            url: javai,
            data: JSON.stringify(req),
            dataType: 'json',
            success: function (res, status, xhr) {
                if (res.result.code == '0') {
                    if (res.result.businessCode == '0') {
                        if (index == 'H') {//5
                            location.href = 'https://h5.youzan.com/v2/ump/promocard/fetch?alias=ew5dylkv';
                        } else if (index == 'I') {
                            location.href = 'https://h5.youzan.com/v2/ump/promocard/fetch?alias=1gnxwp7bj';
                        }
                    } else {
                        title_tip('尊敬的用户', res.result.msg, '我知道了');
                    }
                } else if (res.result.code == '-1') { //code !=0;
                    title_tip('尊敬的用户', '系统升级中，请稍后再试！', '我知道了');
                } else {
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            },
            error: function (res, status, xhr) {
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            }
        });
    }
})();