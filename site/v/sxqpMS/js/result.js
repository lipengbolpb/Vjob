(function () {
    'use strict';
    var timer = null,
        i = 0,
        tx = false,
        flag = false,
        timer1 = null,
        active = false,
        act = true,
        needAlert = false; //needAlert 弹窗开关 act活动那个推广开关
    var openid = sessionStorage.openid === undefined ? '' : sessionStorage.openid,
        knock = document.getElementById("knock"),
        args = vge.urlparse(location.href),
        hbopenid = args.openid,
        bizcode = args.bizcode,
        currentMoney = sessionStorage.currentMoney === undefined ? '' : sessionStorage.currentMoney,
        totalAccountMoney = sessionStorage.totalAccountMoney === undefined ? '' : sessionStorage.totalAccountMoney,
        bizcode = sessionStorage.bizcode === undefined ? bizcode : sessionStorage.bizcode,
        activityVersion = sessionStorage.activityVersion === undefined ? '' : sessionStorage.activityVersion;

    var dayScanNum = sessionStorage.dayScanNum;

    $('.time').html('扫码时间：' + sessionStorage.earnTime);

    $(document).ready(function () {
        $('.slogan_1').addClass('slogan_1_animate');
        $('.slogan_2').addClass('slogan_2_animate');
        $('.open').addClass('open_animate');
    });

    if (bizcode == 0) {
        if (activityVersion == '1') { //根据版本号替换slogan和啤酒
            $('.beer').attr('src', '/v/sxqp/img/beer.png');
        } else {
            $('.beer').attr('src', '/v/sxqp/img/beer-hd.png');
        }
        $('.index').css('display', 'block');
    } else {
        $('.cash,.repscan,.time').css('display', 'block');
        $('#tx').on('click', function () {
            if (tx) {
                ifremeber();
            } else {
                $('#loading').css('display', 'block');
                if (Number(totalAccountMoney) >= 88.88) {
                    sessionStorage.hbopenid = hbopenid;
                    location.href = 'http://' + location.host + '/v/sxqp/getMsg.html?bizcode=12&tx=1';
                } else {
                    give_spack();
                }
            }
        });
    }

    if (currentMoney == 0) {
        $('.title').html('离红包只差一点点！');
        $('#currentMoney').html('再扫一瓶吧');
    } else {
        $('#currentMoney').html('¥<span>' + Number(currentMoney).toFixed(2) + '</span>元');
    }

    $('.open').on('animationend', function () {
        $('.beer').css('display', 'none');
        $('.slogan_2').fadeOut();
        $('.open').on('click', function () {
            sessionStorage.bizcode = 11;
            $('div.cash').fadeIn();
            $('.index').fadeOut();
            if (knock.pause) {
                knock.setAttribute('src', '/v/sxqp/5293.mp3?v=1.0.0');
                knock.play();
            }
            $('#tx').on('click', function (event) {
                event.stopPropagation();
                if (tx) {
                    ifremeber();
                } else {
                    $('#loading').css('display', 'block');
                    if (Number(totalAccountMoney) >= 88.88) {
                        sessionStorage.hbopenid = hbopenid;
                        location.href = 'http://' + location.host + '/v/sxqp/getMsg.html?bizcode=12&tx=1';
                    } else {
                        give_spack();
                    }
                }
            });
//             if (Number(totalAccountMoney) < 0.3) {
//                 setTimeout(function () {
//                     kbActive();
//                 }, 1500);
//             }
        });
    });

    //提现状态
    if (Number(totalAccountMoney) < 0.3) {
        tx = true;
        $('#tx').val('查看我的零钱包');
    } else {
        $('.tx_tip').html('温馨提示：您的红包累计金额已达<span id="total">' + totalAccountMoney + '</span>元啦<br />点击“立即提现”把钱拿走吧');
    }

    $('.tx_mark').on('click', markEvent);

    function markEvent(event) {
        event.stopPropagation();
        $('.tx_mark,.active,#tx_mark').fadeOut();
        if (active) {

        } else {
            ifremeber();
        }
    }

    timer = setInterval(function () {
        i++;
        if (i % 2 === 0) {
            $('.slogan_2').attr('src', '/v/sxqp/img/slogan_3.png');
        } else {
            $('.slogan_2').attr('src', '/v/sxqp/img/slogan_2.png');
        }
    }, 500);

    function give_spack() { //提现
        // title_tip('提 示', '微信提现升级中，您可先扫码，红包会自动累积哦！', '我知道了');
        var javai = vge.sxqp + '/DBTSXQPInterface/gifts/getGiftspack';
        var req = {
            "openid": openid,
            "hbopenid": hbopenid
        };
        vge.callJApi(javai, req,
            function (jo) {
                $('#loading').css('display', 'none');
                if (jo.result.code == '0') {
                    if (jo.result.businessCode === '0') {
                        $('.tx_mark').unbind('click');
                        $('.tx_mark,#tx_mark').css('display', 'block');
						$('.tx_mark').on('click', function () {
                           event.stopPropagation();
                           ifremeber();
						});
                        tx = true;
                    } else if (jo.result.businessCode === '1') { //1
                        title_tip('提 示', '您的红包金额不足，再喝几瓶攒够0.3元发红包！', '我知道了');
                        tx = false;
                    } else if (jo.result.businessCode === '2') { //1
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                        tx = false;
                    } else if (jo.result.businessCode === '-2') { //-2
                        title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
                    } else if (jo.result.businessCode === '4') { //1
                        title_tip('提现处理中，请稍后查看详细记录', '我知道了');
                        tx = false;
                    } else if (jo.result.businessCode === '3') { //1
                        title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
                        tx = false;
                    } else if (jo.result.businessCode === '-1') { //-1
                        title_tip('提 示', '系统升级中...', '我知道了');
                        tx = false;
                    } else if (jo.result.businessCode === '5') { //-1
                        title_tip('提 示', jo.result.msg, '我知道了');
                        tx = false;
                    } else {
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                        tx = false;
                    }
                } else if (jo.result.code == '-1') {
                    title_tip('尊敬的用户', '系统升级中...', '我知道了');
                    tx = false;
                } else { //code!='0'
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    tx = false;
                }
            });
    }

    function ifremeber() {
        var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.sxqpappid;
        vge.ajxget(requrl, 5000, function (r) {
            try {
                var o = JSON.parse(r);
                if (o.subscribe == '0') { //未关注
                    window.location.replace('http://' + location.host + '/v/sxqp/attention.html');
                } else { //已关注用户
                    window.location.replace('http://' + location.host + '/sxqp/too/mybag');
                }
            } catch (e) {
                vge.clog('errmsg', [requrl, e]);
            }
        }, function (err) {
            vge.clog('errmsg', [requrl, err]);
        });
    }

    $('.rule').on('click', function () {
        location.href = 'https://mp.weixin.qq.com/s?__biz=MzIwNTg2Mzc4OA==&mid=100000029&idx=1&sn=3b43ec60b77aa3bcba2d1f5569c1218c&chksm=172b2f1e205ca608958bc5426239ffa6fffaaa4bef34167c3ff9902dff05452d6fb43988aa41#rd';
    });

    function kbActive() {
        //kb链接：只和是否有链接有关，与其他配置项无关，小于1元自动弹出
        //大于1元的，提现成功过后1秒弹出，关闭后继续正常流程
        // kb竞猜活动
        var kbUrl = sessionStorage.kbUrl;
        if (kbUrl != '' && kbUrl != undefined && kbUrl != 'undefined') {
            $('.ad').fadeIn(function () {
                $('.adClose').on('click', function () {
                    $('.ad').fadeOut();
                });
                $('.adFootball').on('click', function () {
                    window.location.href = kbUrl;
                    // title_tip('提 示', '敬请期待', '我知道了');
                });
            });
        }
    }

})();