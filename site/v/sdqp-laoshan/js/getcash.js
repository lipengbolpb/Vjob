(function () {
    'use strict';
    var dom_mark = document.getElementById('mark'),
        dom_btn_open = $('#open-btn'),
        dom_btn = document.getElementById('btn'),
        dom_alert = document.getElementById('alert'),
        dom_money = document.getElementById('money'),
        dom_tolMoney = document.getElementById('tolMoney'),
        dom_rule = document.getElementById('activity-rule'),
        dom_wxmark = document.getElementById('wxmark'),
        dom_title = document.getElementById('title'),
        dom_bgmoney = document.getElementById('bgmoney'),
        dom_span1 = document.getElementById('span1'),
        dom_span2 = document.getElementById('span2'),
        dom_p2 = document.getElementsByClassName('p2')[1],
        dom_right = document.getElementById('right');

    var currentMoney = sessionStorage.currentMoney === undefined ? '' : sessionStorage.currentMoney, //中奖金额
        totalAccountMoney = sessionStorage.totalAccountMoney === undefined ? '' : sessionStorage.totalAccountMoney, //累计金额
        openid = sessionStorage.openid === undefined ? '' : sessionStorage.openid,//openid
        earnTime = sessionStorage.earnTime === undefined ? '' : sessionStorage.earnTime; //earnTime

    var args = vge.urlparse(location.href),
        bizcode = args.bizcode,
        again = sessionStorage.again,
        hbopenid = args.openid; //红包openid

    var APPID = vge.sdqpappid;
    var flag = true; //提现标志
    var PROJECT = 'sdqp-laoshan';
    // 广告
    if (new Date().getTime() <= 1556985600000 && sessionStorage.dayScanNum < 3) { //5.5当天
        $('.active').css('display', 'block');
        $('.active').on('click', function (event) {
            $('.active').css('display', 'none');
            event.stopPropagation();
        });
    }
    dom_btn_open.click(function () {
        $('.unopened-bag').fadeOut();
        $('.opened-bag').fadeIn();
        sessionStorage.again = true;
        setTimeout(function () {
            $('div.alert_jw').css('display', 'flex');
        }, 960);
    })
    dom_rule.addEventListener('click', function () { //活动规则
        window.location.href = "https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503283819&idx=1&sn=3c385433dfe61505d8de6c2a82b26db3&chksm=071d25da306aacccb5b0c166c136157b159ac6407d5175c6871250d538bcf6f50d978d569490#rd";
    }, false);
    //关闭城市酒王排行酒王弹窗
    $('div.alert_jw p').on('click', function () {
        $('div.alert_jw').css('display', 'none');
        $('.icon_jw').css('visibility', 'visible');
    });
    $('.icon_jw').on('click', function () {
        $('div.alert_jw').css('display', 'flex');
        $('.icon_jw').css('visibility', 'hidden');
    });
    if (bizcode == '11' || again == 'true') {
        $('.opened-bag').show();
        $('.bag .p1').hide();
        $('.bag .p2').hide();
        $('.bag .total-money').hide();
        $('.bag .p3').show();
        $('.bag .p4').show();
        $('.bag .repeat-tip').show();
    } else {
        loadingImg(function() {
            $('.unopened-bag').show();
        });
        if (Number(currentMoney) == 0) {
            dom_title.style.fontSize = '0.65';
            dom_title.innerHTML = '你离红包只差一点点';
            dom_title.style.fontSize = '0.8rem';
            dom_title.style.marginTop = '1.3rem';
            dom_title.style.width = '100%';
            dom_p2.style.display = 'none';
        }else if (sessionStorage.perMantissaPrize && bizcode != 21) { //逢19开启
            $('.notice').addClass('is19');
            $('.day19').show();
            $('.bag .p1').hide();
            $('.bag .p2').hide();
            $('.day-num').text(JSON.parse(sessionStorage.perMantissaPrize).perMantissaNum)
        }
    }
    dom_tolMoney.innerHTML = totalAccountMoney;
    $('.allMoneyNum').html(totalAccountMoney)
    $('.repeat-tip .repeat-time').html('您已于' + earnTime + '扫过这瓶酒');
    $('.repeat-tip .repeat-money').html('并获得了￥' + currentMoney + '元');
    $('.money').html(currentMoney);
    
    var str = currentMoney.toString();
    var num = str.replace('.', '');
    if (num.length >= 4) {
        dom_money.style.fontSize = '2.2rem';
        dom_span1.style.fontSize = '0.8rem';
        dom_span2.style.fontSize = '0.8rem';
    }
    // debugger
    if (totalAccountMoney >= 1 && (bizcode != '11' && again != 'true')) {
        dom_btn.value = '立即提现';
    } else {
        if (bizcode == '11' || again == 'true') {
            dom_btn.value = '查看红包余额';
        } else {
            dom_btn.value = '存入我的零钱包';
        }
    }
    dom_btn.addEventListener('click', ifremeber, false);
    
    dom_alert.addEventListener('click', function () {
        var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.sdqpappid;
        vge.ajxget(requrl, 5000, function (r) {
            try {
                var o = JSON.parse(r);
                if (o.subscribe == 0) { //未关注
                    window.location.replace('http://' + location.host + '/v/sdqp-laoshan/attention.html');
                } else { //已关注用户
                    dom_btn.value = '查看我的红包';
                    dom_wxmark.style.display = 'none';
                    // dom_mark.style.display = 'none';
                    dom_btn.removeEventListener('click', ifremeber, false);
                    dom_btn.addEventListener('click', function () {
                        window.location.replace('http://' + location.host + '/sdqp-laoshan/too/mybag');
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

    // 动画图片加载
    function loadingImg(cbFn) {
        var imgList = [
            'http://' + location.host + '/v/sdqp-laoshan/img/l-turntable.png',
            'http://' + location.host + '/v/sdqp-laoshan/img/l-slogan.png',
            'http://' + location.host + '/v/sdqp-laoshan/img/l-bag-btn.png',
            'http://' + location.host + '/v/sdqp-laoshan/img/l-glasses.png',
        ];
        loadImg(0);
        function loadImg(i) {
            if (i >= imgList.length) {
                console.log(i, '图片加载完成');
                //执行动画
                // loaded();
                cbFn && cbFn();
                return
            } else {
                console.log(i)
            }
            var img = new Image();
            img.src = imgList[i];
            img.onload = function () {
                if (i < imgList.length) {
                    console.log(imgList[i], img, i)
                    loadImg(++i)
                }
            }
        }
    }
    /* 判断关注 */
    function ifremeber() {
        var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + APPID;
        vge.ajxget(requrl, 5000, function (r) {
            try {
                var o = JSON.parse(r);
                if (o.subscribe == '0') { //未关注
                    window.location.replace('http://' + location.host + '/v/' + PROJECT + '/attention.html');
                } else { //已关注用户   too
                    location.hash = '12';
                    setTimeout(function() {
                        window.location.replace('http://' + location.host + '/' + PROJECT + '/txo/mybag');
                    },10);
                }
            } catch (e) {
                vge.clog('errmsg', [requrl, e]);
            }
        }, function (err) {
            vge.clog('errmsg', [requrl, err]);
        });
    }
})();