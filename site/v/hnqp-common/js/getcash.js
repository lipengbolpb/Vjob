'use strict';
var SPACK_PORT = vge.hnqp + '/DBTHuaNQPInterface/gifts/getGiftspack';
var APPID = vge.hnqpappid;
var PROJECT = 'hnqp-common';
var RULE_URL = 'https://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502815128&idx=1&sn=efa305626504f5c24bf42c9ef43f0be1&chksm=08729b463f051250e5f97c9a8863080e9305954d8b3a52bd68115ef3048590d3eabffcde992b#rd';
var EXPLAIN_URL = 'https://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502815130&idx=1&sn=fbcd593daf81c1a423394c3f5d0d93b2&chksm=08729b443f05125229916ba53d9be541f67a98a9df10651928a757240c4711bc6aa0e253c7d9#rd';

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
    STRCODE = sessionStorage.STRCODE === undefined ? '' : sessionStorage.STRCODE,
    tx = true,
    act = false,
    needAlert = false;

// var weekSignFlag = sessionStorage.weekSignFlag === 'undefined' ? '0' : sessionStorage.weekSignFlag, //是否开户自然周签到，1:开启、0或空:关闭
//     weekSignDays = sessionStorage.weekSignDays === 'undefined' ? '' : sessionStorage.weekSignDays, //当前周已签到周几集合
//     weekSignEarnFlag = sessionStorage.weekSignEarnFlag === 'undefined' ? '0' : sessionStorage.weekSignEarnFlag, //周签到红包是否已领取，1:已领取、0未领取  2领取签到红包
//     weekSignEarnMoney = sessionStorage.weekSignEarnMoney === 'undefined' ? '' : sessionStorage.weekSignEarnMoney, //周签到红包金额
//     weekSignLimitDay = sessionStorage.weekSignLimitDay === 'undefined' ? '' : sessionStorage.weekSignLimitDay, //周签到天数限制
//     weekSignDiffDay = sessionStorage.weekSignDiffDay === 'undefined' ? '' : sessionStorage.weekSignDiffDay, //周签到还差天数
//     weekSignPopup = sessionStorage.weekSignPopup === 'undefined' ? '' : sessionStorage.weekSignPopup, //自然周签到弹出提示，1:弹出提示、0或空:不弹出"
//     weekSignPercent = sessionStorage.weekSignPercent === 'undefined' ? '' : sessionStorage.weekSignPercent; //周签到完成百分比

// if ((weekSignPopup == 1 && weekSignEarnFlag != 1) || act == true) {
//     needAlert = true;
// }

function init() {
    if (Number(currentMoney) == 0) { //中奖金额为0
        $('.congratulate').html(window.zeroText()).css('font-size','.8rem');
        $('.congratulate').css({
            'margin': '2rem auto 0',
            'fontSize': '1rem'
        });
        $('.prize').css('display', 'none');
    } else {
        // $('#money').html(currentMoney);
        $('.congratulate').html('恭喜你获得');
        $('.congratulate').css({
            'margin': '0 auto',
            'fontSize': '0.75rem'
        });
        $('.prize').html('<span>¥</span> <span id="money">' + currentMoney + '</span> <span>元</span>');
        $('.prize').css('display', 'block');
    }

    if (bizcode == 11 || again == 'true') { //重复扫
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
}

//拆红包
$('.hbGet,.open').on('click', function () {
    $('.hbGet,.open').unbind('click');
    sessionStorage.again = true;
    if (STRCODE == 'true') { //从输入串码进入，模拟拆红包
        $('.open').addClass('kai');
        $('.open').on('animationend', () => {
            $('.get').fadeOut();
            $('.cash').fadeIn();
            // cb();
        });
    } else {
        $('#loading').css('display', 'block');
        var req = {
            "openid": openid,
            "sweepstr": sessionStorage.qr,
            "longitude": sessionStorage.longitude === undefined ? '00' : sessionStorage.longitude, //"经度"
            "latitude": sessionStorage.latitude === undefined ? '00' : sessionStorage.latitude //"纬度"
        };
        $.ajax({
            type: "POST",
            url: vge.hnqp + '/DBTHuaNQPInterface/sweep/sweepQrcode',
            data: JSON.stringify(req),
            dataType: 'json',
            async: true,
            success: function (res, status, xhr) {
                console.log(res);
                $('#loading').css('display', 'none');
                if (res.result.code == '0') {
                    var replace = PROJECT;
                    switch (res.result.businessCode) {
                        case '0': // 普通奖
                            currentMoney = res.reply.currentMoney;
                            totalAccountMoney = res.reply.totalAccountMoney;
                            earnTime = res.reply.earnTime;
                            sessionStorage.totalAccountMoney = res.reply.totalAccountMoney;
                            sessionStorage.currentMoney = res.reply.currentMoney;
                            sessionStorage.earnTime = res.reply.earnTime === undefined ? '' : res.reply.earnTime;
                            init();
                            $('.open').addClass('kai');
                            $('.open').on('animationend', () => {
                                $('.get').fadeOut();
                                $('.cash').fadeIn();
                                // cb();
                            });
                            break;
                        case '7': // 大奖
                            sessionStorage.username = jo.reply.username === undefined ? '' : jo.reply.username;
                            sessionStorage.phonenum = jo.reply.phonenum === undefined ? '' : jo.reply.phonenum;
                            sessionStorage.idcard = jo.reply.idcard === undefined ? '' : jo.reply.idcard;
                            sessionStorage.skukey = jo.reply.skukey;
                            sessionStorage.prizeVcode = jo.reply.prizeVcode;
                            sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                            if (jo.reply.grandPrizeType) {
                                location.replace('http://' + location.host + '/v/hnqp-common/prize.html?bizcode=' + jo.result.businessCode);
                            } else {
                                title_tip('尊敬的用户', '扫码异常', '我知道了');
                            }
                            break;
                        case '15': //他人重复扫大奖
                            sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                            sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
                            location.replace('http://' + location.host + '/v/hnqp-common/prize.html?bizcode=' + jo.result.businessCode);
                            break;
                        case '11': // 自己重复扫，普通奖
                            sessionStorage.totalAccountMoney = res.reply.totalAccountMoney;
                            sessionStorage.currentMoney = res.reply.currentMoney;
                            sessionStorage.codeContentUrl = res.reply.codeContentUrl;
                            sessionStorage.earnTime = res.reply.earnTime === undefined ? '' : res.reply.earnTime;
                            location.replace('http://' + location.host + '/' + replace + '/txo/getcash?bizcode=' + res.result.businessCode);
                            break;
                        case '12': // 可疑
                            location.replace('http://' + location.host + '/v/' + replace + '/getMsg.html?bizcode=' + res.result.businessCode);
                            break;
                        case '13': // 黑名单
                            location.replace('http://' + location.host + '/v/' + replace + '/getMsg.html?bizcode=' + res.result.businessCode);
                            break;
                        case '14': // 指定
                            location.replace('http://' + location.host + '/v/' + replace + '/getMsg.html?bizcode=' + res.result.businessCode);
                            break;
                        default:
                            if (res.reply) {
                                sessionStorage.batchName = res.reply.batchName === undefined ? '' : res.reply.batchName;
                                sessionStorage.earnTime = res.reply.earnTime === undefined ? '' : res.reply.earnTime;
                                sessionStorage.msg = res.result.msg;
                            } else {
                                sessionStorage.earnTime = '';
                            }
                            location.replace('http://' + location.host + '/v/' + replace + '/fail.html?bizcode=' + res.result.businessCode);
                    }
                } else if (res.result.code == '-1') { //code!='0'
                    title_tip('尊敬的用户', '系统升级中...', '我知道了');
                } else {
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            },
            error: function (res, status, xhr) {
                console.log(res);
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            }
        });
    }
});
//签到
// function cb() {
//     setTimeout(function () {
//         if (weekSignFlag == 1) { //签到开启
//             var timer = setTimeout(function () {
//                 $('.sign_logo').css('display', 'block'); //签到按钮
//                 if (weekSignEarnFlag == 1) { //已领取
//                     $('.sign_title').attr('src', '/v/' + PROJECT + '/img2/sign_title_2.png');
//                     $('.sign_logo').css({
//                         'background': 'url(/v/' + PROJECT + '/img2/sign_ed.png) no-repeat right',
//                         '-webkit-background-size': ' auto 100%'
//                     });
//                 } else {
//                     $('.light').css('visibility', 'visible');
//                     $('#weekSignEarnMoney').css('display', 'none');
//                     $('.sign_tip').html('本周签到达' + weekSignLimitDay + '天，可额外获得红包1个！');
//                     $('.sign_cash').css({
//                         'background': 'url(/v/' + PROJECT + '/img2/sign_cash.png) no-repeat bottom',
//                         '-webkit-background-size': '100% auto'
//                     });
//                 }
//                 $('.sign_logo').on('click', function () {
//                     $('#sign,.content').css('display', 'block');
//                 });
//                 $('.sign_alert').on('click', function () { //签到天数提醒
//                     $(this).css('display', 'none');
//                     $('.content').css('display', 'block');
//                 });
//                 $('.close').on('click', function () {
//                     $('#sign').css('display', 'none');
//                 });
//             }, 700);
//         }
//         if (needAlert) { //需要弹窗推广
//             var timer = setTimeout(function () {
//                 // active();
//                 if (weekSignPopup == 1 && weekSignEarnFlag != 1) { //每天首次 且未领取签到红包就会弹出提示
//                     if (weekSignEarnFlag == 2) {
//                         $('#sign,.getSignCash').css('display', 'block');
//                         $('.getSignCash').on('click', function () {
//                             weekSignEarnFlag = '1';
//                             $('#sign,.light,.getSignCash').css('display', 'none');
//                             $('.content').css('display', 'block');
//                             $('.sign_title').attr('src', '/v/' + PROJECT + '/img2/sign_title_2.png');
//                             $('.sign_logo').css({
//                                 'background': 'url(/v/' + PROJECT + '/img2/sign_ed.png) no-repeat right',
//                                 '-webkit-background-size': ' auto 100%'
//                             });
//                             $('.sign_tip,#weekSignEarnMoney').css('display', 'block');
//                             $('.sign_cash').css({
//                                 'background': 'url(/v/' + PROJECT + '/img2/sign_cash_open.png) no-repeat bottom',
//                                 '-webkit-background-size': '100% auto'
//                             });
//                         });
//                     } else {
//                         $('#sign,.sign_alert').css('display', 'block');
//                     }
//                 } else { //活动推送（手动）
//                     // document.getElementById('alert').style.display = 'block';
//                     // document.getElementsByClassName('qrClose')[0].addEventListener('click',function(){
//                     // 	document.getElementById('alert').style.display = 'none';
//                     // },false);
//                 }
//             }, 500);
//         } else {
//             // active();
//         }
//     }, 1000);
// }
// if (bizcode == 0) {
//     //进度条
//     $('.progress').html((weekSignLimitDay - weekSignDiffDay) + '/' + weekSignLimitDay);
//     $('#progress2').css('width', weekSignPercent * 7.8 / 100 + 'rem');
//     $('.days').html(weekSignLimitDay - weekSignDiffDay + '天');
//     $('#weekSignEarnMoney').html(weekSignEarnMoney + '元');
//     $('.weekSignEarnMoney').html('<span>' + weekSignEarnMoney + '</span>元');

//     if (weekSignDays != '') {
//         weekSignDays = weekSignDays.split(',').sort();
//     }
//     var weeks = new Date();
//     weeks = (weeks.getDay() + 6) % 7;
//     for (var i = 0; i < weeks; i++) { //打钩打叉
//         document.getElementsByClassName('checks')[i].style.backgroundImage = 'url(/v/sdqp-common/img2/frok.png)';
//     }
//     for (var j = 0; j < weekSignDays.length; j++) { //打√
//         document.getElementsByClassName('checks')[weekSignDays[j] - 1].style.backgroundImage = 'url(/v/sdqp-common/img2/check.png)';
//     }
// }
//活动规则
$('.rule').on('click', function () {
    window.location.href = RULE_URL;
});
//隐私说明
$('.explain').on('click', function () {
    window.location.href = EXPLAIN_URL;
});
//提现成功后判断关注
$('.mask').on('click', function () {
    $('.mask').css('display', 'none');
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

init();