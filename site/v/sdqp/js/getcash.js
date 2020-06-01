(function () {
    'use strict';
    var dom_mark = document.getElementById('mark'),
        dom_btn = document.getElementById('btn'),
        dom_alert = document.getElementById('alert'),
        dom_money = document.getElementById('money'),
        dom_tolMoney = document.getElementById('tolMoney'),
        dom_left = document.getElementById('left'),
        dom_wxmark = document.getElementById('wxmark'),
        dom_title = document.getElementById('title'),
        dom_bgmoney = document.getElementById('bgmoney'),
        dom_span1 = document.getElementById('span1'),
        dom_span2 = document.getElementById('span2'),
        dom_p2 = document.getElementsByClassName('p2')[1],
        dom_right = document.getElementById('right');

    var currentMoney = sessionStorage.currentMoney === undefined ? '' : sessionStorage.currentMoney, //中奖金额
        totalAccountMoney = sessionStorage.totalAccountMoney === undefined ? '' : sessionStorage.totalAccountMoney, //累计金额
        openid = sessionStorage.openid === undefined ? '' : sessionStorage.openid; //openid

    var args = vge.urlparse(location.href),
        bizcode = args.bizcode,
        hbopenid = args.openid; //红包openid

    var flag = true; //提现标志

    // 广告
    if (new Date().getTime() <= 1556985600000 && sessionStorage.dayScanNum < 3) { //5.5当天
        $('.active').css('display', 'block');
        $('.active').on('click', function (event) {
            $('.active').css('display', 'none');
            event.stopPropagation();
        });
    }

    dom_left.addEventListener('click', function () { //活动规则
        window.location.href = "http://mp.weixin.qq.com/s?__biz=MzI5NjQ4MDMyNg==&mid=100000002&idx=1&sn=f7c8f4e597107e9983d0bf56c6c1e8d7&chksm=6c42fa2b5b35733da6a6d7899487459c31e0d7ec13c4e250ceebd14706fca25e2e54d59a3233#rd";
    }, false);
    dom_right.addEventListener('click', function () { //隐私说明
        window.location.href = "http://mp.weixin.qq.com/s?__biz=MzI5NjQ4MDMyNg==&mid=100000006&idx=1&sn=ccd140506a659b0e2b9d43f841d5d25f&chksm=6c42fa2f5b357339732e51b3efda6b91ebd3065f40b323d578ad8fffa68c8044664a7a6c8175#rd";
    }, false);

    if (bizcode == '11') {
        // $('#jw_icon').css('display', 'block');
        document.getElementById("repscan").style.display = 'block';
    } else {
        // $('#jw_icon').css('display', 'block');
    }
    dom_tolMoney.innerHTML = totalAccountMoney;
    dom_money.innerHTML = currentMoney;
    if (currentMoney == 0) {
        dom_title.style.fontSize = '0.65';
        dom_title.innerHTML = '您不在活动区域内<br />仅限山东省哦~';
        dom_title.style.fontSize = '0.6rem';
        dom_title.style.marginTop = '0.6rem';
        dom_title.style.width = '115%';
        dom_p2.style.display = 'none';
    }
    var str = currentMoney.toString();
    var num = str.replace('.', '');
    if (num.length >= 4) {
        dom_money.style.fontSize = '1.1rem';
        dom_span1.style.fontSize = '0.6rem';
        dom_span2.style.fontSize = '0.6rem';
    }
    if (totalAccountMoney >= 1 && bizcode == '0') {
        dom_btn.value = '点击提现';
        setTimeout(function () {
            dom_mark.style.display = 'block';
            dom_mark.setAttribute('class', 'out mark');
            dom_btn.addEventListener('click', tx, false);
        }, 2000);
    } else if (totalAccountMoney >= 1 && bizcode == '11') {
        dom_btn.value = '点击提现';
        setTimeout(function () {
            dom_mark.style.display = 'block';
            dom_mark.setAttribute('class', 'out mark');
            dom_btn.addEventListener('click', tx, false);
        }, 2000);
    } else {
        dom_btn.value = '存入我的零钱包';
        dom_btn.addEventListener('click', function () {
            var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.sdqpappid;
            vge.ajxget(requrl, 5000, function (r) {
                try {
                    var o = JSON.parse(r);
                    if (o.subscribe == 0) { //未关注
                        window.location.replace('http://' + location.host + '/v/sdqp/attention.html');
                    } else { //已关注用户
                        window.location.replace('http://' + location.host + '/sdqp/too/mybag');
                    }
                } catch (e) {
                    vge.clog('errmsg', [requrl, e]);
                }
            }, function (err) {
                vge.clog('errmsg', [requrl, err]);
            });
        }, false);
    }

    function tx() {
        if (flag) {
            give_spack();
        }
    }
    dom_alert.addEventListener('click', function () {
        var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.sdqpappid;
        vge.ajxget(requrl, 5000, function (r) {
            try {
                var o = JSON.parse(r);
                if (o.subscribe == 0) { //未关注
                    window.location.replace('http://' + location.host + '/v/sdqp/attention.html');
                } else { //已关注用户
                    dom_btn.value = '查看我的红包';
                    dom_wxmark.style.display = 'none';
                    dom_mark.style.display = 'none';
                    dom_btn.removeEventListener('click', tx, false);
                    dom_btn.addEventListener('click', function () {
                        window.location.replace('http://' + location.host + '/sdqp/too/mybag');
                    }, false);
                }
            } catch (e) {
                vge.clog('errmsg', [requrl, e]);
            }
        }, function (err) {
            vge.clog('errmsg', [requrl, err]);
        });
    }, false);

    function give_spack() { //提现
        var javai = vge.sdqp + '/DBTSDQPInterface/gifts/getGiftspack';
        var req = {
            "openid": openid,
            "hbopenid": hbopenid
        };
        vge.callJApi(javai, req,
            function (jo) {
                if (jo.result.code == '0') {
                    if (jo.result.businessCode === '0') {
                        dom_wxmark.style.display = 'block';
                        flag = false;
                    } else if (jo.result.businessCode === '1') { //1
                        title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
                    } else if (jo.result.businessCode === '-1') { //-1
                        title_tip('提 示', '系统升级中...', '我知道了');
                    } else if (jo.result.businessCode === '-2') { //-1
                        title_tip('提 示', '提现操作过于频繁', '我知道了');
                    } else if (jo.result.businessCode === '3') {
                        title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
                        first = true;
                    } else if (jo.result.businessCode === '2') { //后台金额不足
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    } else if (jo.result.businessCode === '4') {
                        title_tip('尊敬的用户', '提现处理中，请稍后查看详细记录!', '我知道了');
                    } else if (jo.result.businessCode === '5') { //5
                        title_tip('尊敬的用户', jo.result.msg, '我知道了');
                    } else {
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    }
                } else { //code!='0'
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            });
    }
    //酒王战绩
    //     $('#jw_icon').on('click', function () {
    //         $('#jiuw_box').fadeIn(1, function () {
    //             $('#jiuw_box div').css('bottom', '0rem');
    //         });
    //         $('#jiuw_box .close').on('click', function () {
    //             $('#jiuw_box div').css('bottom', '-11rem');
    //             $('#jiuw_box').fadeOut(1);
    //         });
    //     });


})();