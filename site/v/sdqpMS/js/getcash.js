(function () {
    'use strict';
    var SPACK_PORT = vge.sdqp + '/DBTSDQPInterface/gifts/getGiftspack';
    var APPID = vge.sdqpappid;
    var PROJECT = 'sdqpMS';
    var RULE_URL = '';
    var EXPLAIN_URL = '';
    /* 定义各项参数 */
    var currentMoney = sessionStorage.currentMoney,
        totalAccountMoney = sessionStorage.totalAccountMoney,
        codeContentUrl = sessionStorage.codeContentUrl == 'undefined' ? '' : sessionStorage.codeContentUrl,
        earnTime = sessionStorage.earnTime,
        openid = sessionStorage.openid,
        args = vge.urlparse(location.href),
        bizcode = args.bizcode,
        hbopenid = args.openid,
        again = sessionStorage.again === undefined ? false : sessionStorage.again,
        tx = true;
    var activityVersion = sessionStorage.activityVersion == 'undefined' ? '' : sessionStorage.activityVersion;
    activityVersion = '5';

    var Ms_prizeType = sessionStorage.Ms_prizeType === undefined ? '1' : sessionStorage.Ms_prizeType;
    // 1-电视秒杀
    // 2-商场秒杀
    // 3-文章秒杀
    // 无-电视秒杀
    switch (Ms_prizeType) {
        case '1':
            RULE_URL = 'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503282863&idx=1&sn=989c577ee22d7f6451d5d0a5cc4fc5a5&chksm=071dd91e306a5008442a3f45ec3ff86005009763a47649affce8ac6b5bb5f29356fbc59c9b94#rd';
            break;
        case '2':
            RULE_URL = 'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503282865&idx=1&sn=31a5397ec70c63179f70b043b014e728&chksm=071dd900306a5016e06f37f0dd2e756c6311ae9218caa6ccdb5b7511bfc655fd892e5682998b#rd';
            break;
        case '3':
            RULE_URL = 'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503282864&idx=1&sn=5e2840b690f4a432757d87c7897af14f&chksm=071dd901306a50179bb5551aec90fa96160dde2c7570c28210263389ae700ebe045194a0561f#rd';
            break;
        default:
            RULE_URL = 'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503282863&idx=1&sn=989c577ee22d7f6451d5d0a5cc4fc5a5&chksm=071dd91e306a5008442a3f45ec3ff86005009763a47649affce8ac6b5bb5f29356fbc59c9b94#rd';
            break;
    }
    //活动规则
    $('.rule').on('click', function () {
        window.location.href = RULE_URL;
    });
    //隐私说明
    // $('.explain').on('click', function () {
    //     window.location.href = EXPLAIN_URL;
    // });

    if (activityVersion == '2') {
        $('.slogan').css({
            'margin': '2rem auto 0'
        });
        $('.beer').css({
            'width': '18%'
        });
        $('.slogan').attr('src', '/v/sdqp-common2.0/img/slogan-2.png');
        $('.beer').attr('src', '/v/sdqp-common2.0/img/bear-2.png');
        // //活动规则
        // $('.rule').on('click', function () {
        //     window.location.href = 'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503282568&idx=1&sn=79489c81bd849ea310efeb93e144a70f&chksm=071dde39306a572f67276b98a77f9bff81c14740bc90f6389a94346784e74491bbf604181bf4#rd';
        // });
        // //隐私说明
        // $('.explain').on('click', function () {
        //     window.location.href = 'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503282642&idx=1&sn=847032c660ccfe50076c11bd3fdef146&chksm=071dde63306a577515c82fd324fbedf7fffdb875afa97802c398252dfc43a68484a2d21c7e79#rd';
        // });
    } else if (activityVersion == '3') {
        $('.slogan').css({
            'margin': '2.5rem auto 0'
        });
        $('.beer').css({
            'width': '18%'
        });
        $('.slogan').attr('src', '/v/sdqp-common2.0/img/slogan-3.png');
        $('.beer').attr('src', '/v/sdqp-common2.0/img/bear-3.png');
        // //活动规则
        // $('.rule').on('click', function () {
        //     window.location.href = 'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503282572&idx=1&sn=5039e09dd28713d076ef3caf20691f88&chksm=071dde3d306a572bd446939bf7d4ea0fa2114f7a94a66a5f2626084ab5a2810c456e4419bb5c#rd';
        // });
        // //隐私说明
        // $('.explain').on('click', function () {
        //     window.location.href = 'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503282644&idx=1&sn=d53b06602093cb5614848c242c4f7e74&chksm=071dde65306a5773e7bb4385cdbefd4ed3f6cac88fbafdca203a0203f7ff0b20451483541edb#rd';
        // });
    } else if (activityVersion == '4') {
        $('.slogan').css({
            'margin': '3rem auto 0'
        });
        $('.beer').css({
            'width': '18%'
        });
        $('.slogan').attr('src', '/v/sdqp-common2.0/img/slogan-4.png');
        $('.beer').attr('src', '/v/sdqp-common2.0/img/bear-4.png');
        // //活动规则
        // $('.rule').on('click', function () {
        //     window.location.href = 'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503282566&idx=1&sn=327d57d1dce6d27055056a9134ea6ebe&chksm=071dde37306a5721a7d3811b449010e92eb8d4798c2b71b4fdcfdc693a0c82ed0aebd16acdd9#rd';
        // });
        // //隐私说明
        // $('.explain').on('click', function () {
        //     window.location.href = 'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503282646&idx=1&sn=4568ca4b8beb55a906ecbf8526701d11&chksm=071dde67306a577175344d394c9e37bf578b90d64a35f60721806b78955dfb7902e89e19e605#rd';
        // });
    } else if (activityVersion == '5') {
        $('.slogan').css({
            'margin': '2rem auto 0'
        });
        $('.beer').css({
            'width': '18%'
        });
        $('.slogan').attr('src', '/v/sdqp-common2.0/img/slogan-5.png');
        $('.beer').attr('src', '/v/sdqp-common2.0/img/bear-5.png');
        // //活动规则
        // $('.rule').on('click', function () {
        //     window.location.href = 'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503282570&idx=1&sn=e60314c16bb7659b22e10cf2a5ac3ed0&chksm=071dde3b306a572d3a1dfb56e1c0d33e708fe0e807285f5609f319f32abf8d05de8d979a0629#rd';
        // });
        // //隐私说明
        // $('.explain').on('click', function () {
        //     window.location.href = 'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503282648&idx=1&sn=704d57e95de736192d402220db0194fb&chksm=071dde69306a577f865e88019b90c5853816e1de4c807cf7c3b5b94a09acaa8100e05acc5c0b#rd';
        // });
    }


    (function () {
        if (Number(currentMoney) == 0) { //中奖金额为0
            $('.congratulate').html('离红包只差一点点<br>再扫一瓶试试');
            $('.congratulate').css({
                'margin': '1rem auto 0',
                'fontSize': '0.9rem'
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
    })();

    //拆红包
    $('.hbGet,.open').on('touchstart', function () {
        $('.open').addClass('kai');
        sessionStorage.again = 'true';
        setTimeout(function () {
            $('.get').fadeOut(600);
            $('.cash').fadeIn(600, function () {
                events();
                // 广告
                $('.active').css('display', 'block');
                $('.active').on('click', function (event) {
                    $('.active').css('display', 'none');
                    event.stopPropagation();
                });
                // 联通流量链接
                // $('.ad').css('display', 'block');
                // $('.adClose').on('click', function (event) {
                //     $('.ad').css('display', 'none');
                //     event.stopPropagation();
                // });
                // $('.adCover').on('click', function (event) {
                //     window.location.href = 'https://m.10010.com/queen/qingdaobeer/qdbeer.html';
                //     event.stopPropagation();
                // });
            });
        }, 1000);
    });

    function events() {
        //提现成功后判断关注
        $('.mask').on('touchstart', function () {
            // $('.mask').css('display', 'none');
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
    }

    /* 提现 */
    function give_spack() {
        var javai = SPACK_PORT;
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
                        $('#sign_logo').css('display', 'none');
                        $('#sale_icon').css('display', 'none');
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
            },
            error: function (res, status, xhr) {
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
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