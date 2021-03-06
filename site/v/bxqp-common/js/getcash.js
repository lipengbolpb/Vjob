(function () {
    'use strict';
    var SPACK_PORT = vge.common + '/vjifenInterface/gifts/getGiftspack';
    var APPID = vge.bxqpappid;
    var PROJECT = 'bxqp-common';
    var RULE_URL = 'https://mp.weixin.qq.com/s?__biz=MzU2NTA3MzU1MQ==&mid=100000029&idx=1&sn=e97fb3399ca1983175590966aac874d8&chksm=7c4002fd4b378bebca011b8d0666c71d0027f197676bbf4d8d33bf762ac190e956b794c82fb9#rd';
    var EXPLAIN_URL = 'https://mp.weixin.qq.com/s?__biz=MzU2NTA3MzU1MQ==&mid=100000031&idx=1&sn=d49b32963d6c691bf8a8761b3b9e786f&chksm=7c4002ff4b378be9a502ee41ea993ee98d3a96101b00e91f74094dcf3c150ebc955b9982a96d#rd';
    /* 定义各项参数 */
    var currentMoney = sessionStorage.currentMoney,
        totalAccountMoney = sessionStorage.totalAccountMoney,
        codeContentUrl = sessionStorage.codeContentUrl,
        earnTime = sessionStorage.earnTime,
        openid = sessionStorage.openid,
        args = vge.urlparse(location.href),
        bizcode = args.bizcode,
        hbopenid = args.openid,
        disabled = true,
        first = sessionStorage.first === undefined ? true : sessionStorage.first,
        again = sessionStorage.again === undefined ? false : sessionStorage.again,
        activityVersion = sessionStorage.activityVersion === undefined ? '' : sessionStorage.activityVersion,
        tx = true,
        act = false,
        needAlert = false;

    var dayScanNum = sessionStorage.dayScanNum;

    if (codeContentUrl == 'undefined' || codeContentUrl == '') {
        $('.toast').css('display', 'none');
    } else {
        $('.toast').css('display', 'block');
        $('.toast').attr('src', codeContentUrl);
    }

    ! function () { //页面初始化
        if (Number(currentMoney) == 0) { //中奖金额为0
            $('.congratulate').html('离红包只差一点点<br>再扫一瓶试试');
            $('.congratulate').css({
                'margin': '2rem auto 0',
                'fontSize': '1rem'
            });
            $('.prize').css('display', 'none');
        } else {
            $('#money').html(currentMoney);
        }
        if (bizcode == 11 || again == 'true') { //重复扫
            events();
            if (Number(totalAccountMoney) >= 1) {
                $('.notice').html('温馨提示：您的红包累计金额为' + totalAccountMoney + '元，<br>点击上方按钮把钱拿走吧！');
                $('#btn').val('立即提现');
                $('#repbtn').val('立即提现');
            } else {
                $('#btn').val('查看红包余额');
                $('#repbtn').val('查看红包余额');
            }
            $('.repcash').css('display', 'block');
            if (sessionStorage.earnTime == '') {
                $('.earn').html('您已扫过这瓶酒<br>并获得<span class="earnMoney">¥' + currentMoney + '元</span>');
            } else {
                $('.earn').html('您已于<span class="earnTime">' + earnTime + '</span>扫过这瓶酒<br>并获得<span class="earnMoney">¥' + currentMoney + '元</span>');
            }
        } else {
            if (Number(totalAccountMoney) >= 1) {
                $('.notice').html('温馨提示：您的红包累计金额为' + totalAccountMoney + '元，<br>点击上方按钮把钱拿走吧！');
                $('#btn').val('立即提现');
                $('#repbtn').val('立即提现');
            } else {
                $('#btn').val('存入我的零钱包');
                $('#repbtn').val('存入我的零钱包');
            }
            $('.get').css('display', 'block');
        }
    }();

    //拆红包
    $('.hbGet,.open').on('touchstart', function () {
        $('.open').addClass('kai');
        sessionStorage.again = 'true';
        setTimeout(function () {
            $('.get').fadeOut(600);
            $('.cash').fadeIn(600, function () {
                events();
                // setTimeout(function () {
                //     if (Number(dayScanNum) < 2) {
                //         //酒王
                //         $('#jw_box').fadeIn(10);
                //         $('#jw_box .jw_content img').eq(0).css({
                //             'top': '0',
                //             'opacity': 1
                //         });
                //         $('#jw_box .jw_content img').eq(1).css({
                //             'top': '1.2rem',
                //             'opacity': 1
                //         });
                //         $('#jw_box .jw_content img').eq(2).css({
                //             'top': '2.35rem',
                //             'opacity': 1
                //         });
                //         $('#jw_box .jw_content img').eq(3).css({
                //             'top': '4.75rem',
                //             'opacity': 1
                //         });
                //         $('.jw_person').addClass('move');
                //     }
                // }, 1500);
            });
        }, 1000);
    });

    function events() {
        //活动规则
        $('.rule').on('touchstart', function () {
            window.location.href = RULE_URL;
        });
        //隐私说明
        $('.explain').on('touchstart', function () {
            window.location.href = EXPLAIN_URL;
        });
        //提现成功后判断关注
        $('.mask').on('touchstart', function () {
            $('.mask').css('display', 'none');
            ifremeber();
        });
        $('#btn,#repbtn').on('touchstart', function () {
            if (Number(totalAccountMoney) >= 1) {
                if (tx) {
                    tx = false;
                    $('#loading').css('display', 'block');
                    give_spack();
                }
            } else {
                ifremeber();
            }
        });

        //酒王
        // $('.jw_btn').on('click', function () {
        //     $('#jw_box').fadeIn(10);
        //     $('#jw_box .jw_content img').eq(0).css({
        //         'top': '0',
        //         'opacity': 1
        //     });
        //     $('#jw_box .jw_content img').eq(1).css({
        //         'top': '1.2rem',
        //         'opacity': 1
        //     });
        //     $('#jw_box .jw_content img').eq(2).css({
        //         'top': '2.35rem',
        //         'opacity': 1
        //     });
        //     $('#jw_box .jw_content img').eq(3).css({
        //         'top': '4.75rem',
        //         'opacity': 1
        //     });
        //     $('.jw_person').addClass('move');
        // });
        // $('#jw_box .jw_close').on('click', function () {
        //     $('#jw_box').css('display', 'none');
        // });
    }


    /* 提现 */
    function give_spack() {
        var javai = SPACK_PORT;
        var req = {
            "openid": openid,
            "hbopenid": hbopenid,
            "projectServerName":"beixiao",
        };
        vge.callJApi(javai, req,
            function (jo) {
                $('.loading').css('display', 'none');
                if (jo.result.code == '0') {
                    if (jo.result.businessCode === '0') {
                        $('.mask').css('display', 'block');
                        tx = false;
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
            });
    }

    /* 判断关注 */
    function ifremeber() {
        var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + APPID;
        vge.ajxget(requrl, 5000, function (r) {
            try {
                var o = JSON.parse(r);
                if (o.subscribe == '0') { //未关注
                    window.location.replace('http://' + location.host + '/v/' + PROJECT + '/attention.html');
                } else { //已关注用户
                    window.location.replace('http://' + location.host + '/' + PROJECT + '/too/mybag');
                }
            } catch (e) {
                vge.clog('errmsg', [requrl, e]);
            }
        }, function (err) {
            vge.clog('errmsg', [requrl, err]);
        });
    }
})();