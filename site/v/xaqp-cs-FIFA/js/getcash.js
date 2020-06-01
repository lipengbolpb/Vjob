window.onload = function () {
    /**
     * 定义各项参数
     */
    var config = { //配置项参数
        spackPort: vge.xaqp + '/DBTXIANQPInterface/gifts/getGiftspack',
        appid: vge.xaqpappid,
        project: 'xaqp-cs-FIFA',
        ruleUrl: 'https://mp.weixin.qq.com/s?__biz=MzI2MDk3NTY3NQ==&mid=100000096&idx=1&sn=5c0ad84b998498590390273cea1a686c&chksm=6a603c345d17b5224e5427602e9a0a13f694ec59db9cf8cd85e43c05d8e879c7af06d0ac8cf1#rd',
        explainUrl: 'https://mp.weixin.qq.com/s?__biz=MzI2MDk3NTY3NQ==&mid=100000098&idx=1&sn=8b9b57279940e327eab18608ebad34f0&chksm=6a603c365d17b52077a5d7160d535aa14237364e942708d5790a93f314914c5a90e0aa4e8b72#rd'
    };
    $('.game1').on('click', function () {
        location.href = 'http://' + location.host + '/v/xaqp-common/game/game_1.html';
    });
    var args = vge.urlparse(location.href),
        bizcode = args.bizcode,
        hbopenid = args.openid,
        openid = sessionStorage.openid === undefined ? '' : sessionStorage.openid,
        currentMoney = sessionStorage.currentMoney === undefined ? '' : sessionStorage.currentMoney,
        totalAccountMoney = sessionStorage.totalAccountMoney === undefined ? '' : sessionStorage.totalAccountMoney,
        codeContentUrl = sessionStorage.codeContentUrl === undefined ? '' : sessionStorage.codeContentUrl,
        earnTime = sessionStorage.earnTime === undefined ? '' : sessionStorage.earnTime,
        again = sessionStorage.again === undefined ? 'false' : sessionStorage.again,
        activityVersion = sessionStorage.activityVersion === undefined ? '' : sessionStorage.activityVersion,
        kbUrl = sessionStorage.kbUrl === undefined ? '' : sessionStorage.kbUrl,
        tx = true,
        flag = true;
    /**
     * 页面的初始化展示
     */
    function init() {
        //判断是否是0元
        if (Number(currentMoney) === 0) {
            $('.msg').css('display', 'none');
            $('.cashZero').css('display', 'block');
        } else {
            $('.money').text(currentMoney);
        }
        // 判断首扫or重复扫
        if (bizcode == 11 || again == 'true') {
            $('.msg').css('display', 'none');
            $('.cashZero').css('display', 'block');
            $('.cashZero').find('p').eq(0).text('您已扫过');
            $('.cashZero').find('p').eq(1).html('每瓶仅限<br>扫码一次');
            if (sessionStorage.earnTime == '') {
                $('.notice').html('您已扫过这瓶酒<br>并获得<span class="earnMoney">¥' + currentMoney + '元</span>');
            } else {
                $('.notice').html('您已于<span class="earnTime">' + earnTime + '</span>扫过这瓶酒<br>并获得<span class="earnMoney">¥' + currentMoney + '元</span>');
            }
            if (Number(totalAccountMoney) >= 1) {
                $('.btn').val('立即提现');
            } else {
                $('.btn').val('存入我的零钱包');
            }
            $('.cash').css('display', 'block');
            events();
        } else {
            if (Number(totalAccountMoney) >= 1) {
                $('.notice').html('温馨提示：您的红包累计金额为' + totalAccountMoney + '元，<br>点击上方按钮把钱拿走吧！');
                $('.btn').val('立即提现');
            } else {
                $('.btn').val('存入我的零钱包');
            }
            $('.get').css('display', 'block');
            setTimeout(function(){
                $('.getCoco').addClass('animationCocoUp');
                $('.getFootball').addClass('animationJump');
                $('.getColor').fadeIn(120);
            }, 500);
            setTimeout(function () {
                $('.milk1').css('display', 'block');
                setTimeout(function () {
                    $('.milk1').css('display', 'none');
                    $('.milk2').css('display', 'block');
                    setTimeout(function () {
                        $('.milk2').css('display', 'none');
                        $('.milk3').css('display', 'block');
                        $('.foam').addClass('animationFlow');
                        $('.get').fadeOut(2000);
                        $('.cash').fadeIn(2000);
                        setTimeout(function () {
                            if (Number(totalAccountMoney) < 1 && kbUrl != '' && kbUrl != undefined && kbUrl != 'undefined') {
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
                            events();
                        }, 1500);
                    }, 150);
                }, 150);
            }, 1400);
        }
    }

    function events() {
        //活动规则
        $('.rule').on('touchstart', function () {
            window.location.href = config.ruleUrl;
        });
        //隐私说明
        $('.explain').on('touchstart', function () {
            window.location.href = config.explainUrl;
        });
        //提现成功后判断关注
        $('.mask').on('touchstart', function () {
            $('.mask').css('display', 'none');
            ifremeber();
        });
        $('.btn').on('touchstart', function () {
            totalAccountMoney = sessionStorage.totalAccountMoney;
            if (Number(totalAccountMoney) >= 1) {
                if (tx) {
                    tx = false;
                    $('#loading').css('display', 'block');
                    give_spack();
                }
            } else {
                if (flag) {
                    ifremeber();
                }
            }
        });
    }

    /* 提现 */
    function give_spack() {
        var javai = config.spackPort;
        var req = {
            "openid": openid,
            "hbopenid": hbopenid
        };
        $.ajax({
            type: "POST",
            url: javai,
            data: JSON.stringify(req),
            dataType: 'json',
            success: function (jo, status, xhr) {
                $('.loading').css('display', 'none');
                if (jo.result.code == '0') {
                    if (jo.result.businessCode === '0') {
                        sessionStorage.totalAccountMoney = 0;
                        flag = false;
                        tx = false;
                        $('.hb').css('display', 'none');
                        $('.mask').css('display', 'block');
                        $('.btn').val('我知道了');
                        $('.notice').css('display','none');
                        $('.link').css('display','none');
                        $('#sale_icon').css('display','none');
                        $('#sign_logo').css('display','none');
                        if (kbUrl != '' && kbUrl != undefined && kbUrl != 'undefined') {
                            setTimeout(function () {
                                $('.ad').fadeIn(function () {
                                    $('.adClose').on('click', function () {
                                        $('.ad').fadeOut();
                                    });
                                    $('.adFootball').on('click', function () {
                                        window.location.href = kbUrl;
                                        // title_tip('提 示', '敬请期待', '我知道了');
                                    });
                                    flag = true;
                                });
                            }, 1000);
                        } else {
                            flag = true;
                        }
                    } else if (jo.result.businessCode === '1') { //1
                        title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
                        tx = true;
                    } else if (jo.result.businessCode === '2') { //1
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                        tx = true;
                    } else if (jo.result.businessCode === '4') { //1
                        title_tip('提现处理中，请稍后查看详细记录', '我知道了');
                        tx = true;
                    } else if (jo.result.businessCode === '3') { //1
                        title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
                        tx = true;
                    } else if (jo.result.businessCode === '-1') { //-1
                        title_tip('提 示', '系统升级中...', '我知道了');
                        tx = true;
                    } else if (jo.result.businessCode === '-2') { //-1
                        title_tip('提 示', '提现操作过于频繁', '我知道了');
                        tx = true;
                    } else if (jo.result.businessCode === '5') { //5
                        title_tip('尊敬的用户', jo.result.msg, '我知道了');
                        tx = true;
                    } else {
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                        tx = true;
                    }
                } else if (jo.result.code == '-1') {
                    title_tip('尊敬的用户', '系统升级中...', '我知道了');
                    tx = true;
                } else { //code!='0'
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    tx = true;
                }
            },
            error: function (res, status, xhr) {
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            }
        });
    }
    /* 判断关注 */
    function ifremeber() {
        var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + config.appid;
        vge.ajxget(requrl, 5000, function (r) {
            try {
                var o = JSON.parse(r);
                if (o.subscribe == '0') { //未关注
                    window.location.replace('http://' + location.host + '/v/' + config.project + '/attention.html');
                } else { //已关注用户
                    window.location.replace('http://' + location.host + '/' + config.project + '/too/mybag');
                }
            } catch (e) {
                vge.clog('errmsg', [requrl, e]);
            }
        }, function (err) {
            vge.clog('errmsg', [requrl, err]);
        });
    }

    $(document).ready(function () {
        init();
    });
}