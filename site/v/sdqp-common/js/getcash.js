'use strict';
var SPACK_PORT = vge.sdqp + '/DBTSDQPInterface/gifts/getGiftspack';
var APPID = vge.sdqpappid;
var PROJECT = 'sdqp-common';
var RULE_URL = 'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503282327&idx=1&sn=1ba4198603d40246536c41a8ed864760&chksm=071ddf26306a563023571a13955a962912e4d0657804548418c1dad17780711470c95db9c755#rd';
var EXPLAIN_URL = 'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503282331&idx=1&sn=379adf14e4cdb00e7bdf0b7049dd7a35&chksm=071ddf2a306a563c594d96b4b5e7e11b6abb291f6b5c9ef180d6b2d53e97a44fb4c95bbc41d9#rd';

/* 定义各项参数 */
var currentMoney = sessionStorage.currentMoney,
    totalAccountMoney = sessionStorage.totalAccountMoney,
    codeContentUrl = sessionStorage.codeContentUrl,
    earnTime = sessionStorage.earnTime,
    openid = sessionStorage.openid,
    args = vge.urlparse(location.href),
    bizcode = args.bizcode,
    hbopenid = args.openid,
    first = sessionStorage.first === undefined ? true : sessionStorage.first,
    again = sessionStorage.again === undefined ? false : sessionStorage.again,
    activityVersion = sessionStorage.activityVersion === undefined ? '' : sessionStorage.activityVersion,
    tx = true,
    act = false,
    needAlert = false;

! function () { //页面初始化
    switch (activityVersion) {
        case '2': //经典8度
            $('.slogan').attr('src', '/v/sdqp-common/img/slogan-2.png');
            $('.bear').attr('src', '/v/sdqp-common/img/bear-2.png');
            //活动规则
            $('.rule').on('click', function () {
                window.location.href = 'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503282568&idx=1&sn=79489c81bd849ea310efeb93e144a70f&chksm=071dde39306a572f67276b98a77f9bff81c14740bc90f6389a94346784e74491bbf604181bf4#rd';
            });
            //隐私说明
            $('.explain').on('click', function () {
                window.location.href = EXPLAIN_URL;
            });
            break;
        case '3': //1903
            $('.slogan').css('margin', '2rem auto 0');
            $('.slogan').attr('src', '/v/sdqp-common/img/slogan-3.png');
            $('.bear').attr('src', '/v/sdqp-common/img/bear-3.png');
            //活动规则
            $('.rule').on('click', function () {
                window.location.href = 'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503282572&idx=1&sn=5039e09dd28713d076ef3caf20691f88&chksm=071dde3d306a572bd446939bf7d4ea0fa2114f7a94a66a5f2626084ab5a2810c456e4419bb5c#rd';
            });
            //隐私说明
            $('.explain').on('click', function () {
                window.location.href = EXPLAIN_URL;
            });
            break;
        case '4': //白啤
            $('.slogan').css('margin', '3rem auto 0');
            $('.slogan').attr('src', '/v/sdqp-common/img/slogan-4.png');
            $('.bear').attr('src', '/v/sdqp-common/img/bear-4.png');
            //活动规则
            $('.rule').on('click', function () {
                window.location.href = 'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503282566&idx=1&sn=327d57d1dce6d27055056a9134ea6ebe&chksm=071dde37306a5721a7d3811b449010e92eb8d4798c2b71b4fdcfdc693a0c82ed0aebd16acdd9#rd';
            });
            //隐私说明
            $('.explain').on('click', function () {
                window.location.href = EXPLAIN_URL;
            });
            break;
        case '5': //纯生
            $('.slogan').css({
                'margin': '2rem auto 0',
                'width': '12rem'
            });
            $('.slogan').attr('src', '/v/sdqp-common/img/slogan-5.png');
            $('.bear').attr('src', '/v/sdqp-common/img/bear-5.png');
            //活动规则
            $('.rule').on('click', function () {
                window.location.href = 'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503282570&idx=1&sn=e60314c16bb7659b22e10cf2a5ac3ed0&chksm=071dde3b306a572d3a1dfb56e1c0d33e708fe0e807285f5609f319f32abf8d05de8d979a0629#rd';
            });
            //隐私说明
            $('.explain').on('click', function () {
                window.location.href = EXPLAIN_URL;
            });
            break;
    }

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
        $('#jw_icon').css('display', 'block');
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
$('.hbGet,.open').on('click', function () {
    $('.open').addClass('kai');
    sessionStorage.again = 'true';
    setTimeout(function () {
        $('.get').fadeOut();
        $('.cash').fadeIn();
        $('#jw_icon').css('display', 'block');
        // cb();
    }, 1000);
});

//提现成功后判断关注
$('.mask').on('click', function () {
    // $('.mask').css('display', 'none');
    ifremeber();
});
$('#btn,#repbtn').on('click', function () {
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

/* 提现 */
function give_spack() {
    var javai = SPACK_PORT;
    var req = {
        "openid": openid,
        "hbopenid": hbopenid
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