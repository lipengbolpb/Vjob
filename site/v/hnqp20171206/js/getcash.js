'use strict'

var openid = sessionStorage.openid === undefined ? '' : sessionStorage.openid,
    args = vge.urlparse(location.href),
    hbopenid = args.openid,
    bizcode = args.bizcode,
    currentMoney = sessionStorage.currentMoney === undefined ? '' : sessionStorage.currentMoney,
    totalAccountMoney = sessionStorage.totalAccountMoney === undefined ? '' : sessionStorage.totalAccountMoney,
    again = sessionStorage.again === undefined ? 'false' : sessionStorage.again,
    earnTime = sessionStorage.earnTime === undefined ? '' : sessionStorage.earnTime;
var first = true,
    flag = true,
    tx = true;

totalAccountMoney = Number(totalAccountMoney).toFixed(2);
currentMoney = Number(currentMoney).toFixed(2);

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

init();

function init() { //页面展示初始化
    if (bizcode == 11 || again == 'true') { //自己重复扫
        $('.cash').css('display', 'none');
        $('.getted').css('display', 'block');
        $('.rescan').css('display', 'block');
        $('.title').css('display', 'none');
        $('.content').css('display', 'none');
        $('.notice').css('fontSize', '0.65rem');
        $('.notice').html('您已于' + earnTime + '扫过这瓶酒<br>并获得<span style="font-weight:bold">¥' + currentMoney + '元</span>');
        if (Number(totalAccountMoney) >= 1) {
            $('#btn').val('立即提现');
        } else {
            $('#btn').val('查看红包余额');
        }
        $('#btn').on('click', function () {
            if (Number(totalAccountMoney) >= 1) {
                if (tx) {
                    tx = false;
                    $('.loading').css('display', 'block');
                    give_spack();
                }
            } else {
                ifremeber();
            }
        });

    } else {
        $('.cash').css('display', 'block');
        $('.getted').css('display', 'none');
        if (Number(totalAccountMoney) >= 1) {
            $('#btn').val('立即提现');
            $('.notice').html('温馨提示：您的红包累计金额为' + totalAccountMoney + '元，<br>点击上方按钮把钱拿走吧！');
        } else {
            $('#btn').val('存入我的零钱包');
            $('.notice').html('根据微信平台要求，红包累计大于等于1元后可提现，<br>不足1元的红包我们为您贴心准备了零钱包功能');
        }
    }

    if (Number(currentMoney) == 0) { //中奖金额为0
        $('.title').css({
            'top': '4rem',
            'fontSize': '1rem'
        });
        $('.title').html(window.zeroText()); //通用方法 六条随机提示
        $('.content').css('display', 'none');
    } else if (Number(currentMoney) >= 1) {
        $('#money').html(currentMoney);
    } else {
        $('#money').html(currentMoney);
    }
	$('.icon_game').on('click',function(){
		location.href = 'http://w.vjifen.com/v/dice/index.html?province=hn_3';
	});
}


function give_spack() {
    var javai = vge.hnqp + '/DBTHuaNQPInterface/gifts/getGiftspack';
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
                    sessionStorage.totalAccountMoney = 0;
                    tx = false;
                } else if (jo.result.businessCode === '1') { //1
                    title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
                    tx = true;
                } else if (jo.result.businessCode === '-2') { //-2
                    title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
                    tx = true;
                } else if (jo.result.businessCode === '-1') { //-1
                    title_tip('提 示', '系统升级中...', '我知道了');
                    tx = true;
                } else if (jo.result.businessCode === '3') { //1
                    title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
                    tx = true;
                } else if (jo.result.businessCode === '2') { //-1
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    tx = true;
                } else if (jo.result.businessCode === '4') {
                    title_tip('尊敬的用户', '提现处理中，请稍后查看详细记录!', '我知道了');
                    tx = true;
                } else if (jo.result.businessCode === '5') { //-1
                    title_tip('尊敬的用户', jo.result.msg, '我知道了');
                    tx = true;
                } else {
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    tx = true;
                }
            } else { //code!='0'
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                tx = true;
            }
        });
}

function ifremeber() {
    var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.hnqpappid;
    vge.ajxget(requrl, 5000, function (r) {
        try {
            var o = JSON.parse(r);
            if (o.subscribe == '0') { //未关注
                $('.mask').css('display', 'none');
                window.location.replace('http://' + location.host + '/v/hnqp20171206/attention.html');
            } else { //已关注用户
                $('.mask').css('display', 'none');
                window.location.replace('http://' + location.host + '/hnqp20171206/too/mybag');
            }
        } catch (e) {
            vge.clog('errmsg', [requrl, e]);
        }
    }, function (err) {
        vge.clog('errmsg', [requrl, err]);
    });
}

$('.mask').on('click', function () {
    ifremeber();
});

$('.open').on('click', function () {
    var data = {
        "openid": openid,
        "sweepstr": sessionStorage.qr,
        "longitude": sessionStorage.longitude === undefined ? '00' : sessionStorage.longitude, //"经度"
        "latitude": sessionStorage.latitude === undefined ? '00' : sessionStorage.latitude //"纬度"
    };
    if (first) {
        first = false;
        $('.open').addClass('kai');
        $.ajax({
            type: "post",
            url: vge.hnqp + '/DBTHuaNQPInterface/sweep/sweepQrcode',
            async: true,
            data: JSON.stringify(data),
            success: function (jo) {
                setTimeout(function () {
                    $('.cash').fadeOut();
                    $('.getted').fadeIn(600, function () {
                        // if (Number(jo.reply.dayScanNum) < 2) {
                        //     setTimeout(function () {
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
                        //     }, 1000)
                        //     $('#jw_box .jw_close').on('click', function () {
                        //         $('#jw_box').css('display', 'none');
                        //     });
                        // }
						if(new Date().getTime() > 1556640000000 && new Date().getTime() < 1556985600000){
							setTimeout(function(){
								$('.active').css('display','block');
								$('.active .activeClose').on('click',function(){
									$('.active').css('display','none');
								});
							},1000)
						}
                    });
                }, 1000);
                sessionStorage.again = 'true';
                cb(jo);
            }
        });
    }
});

function cb(jo) {
    if (jo.result.code == '0') {
        if (jo.reply) {
            sessionStorage.earnTime = jo.reply.earnTime;
            totalAccountMoney = jo.reply.totalAccountMoney;
            currentMoney = jo.reply.currentMoney;
        }
        if (Number(totalAccountMoney) >= 1) {
            $('#btn').val('立即提现');
            $('.notice').html('温馨提示：您的红包累计金额为' + totalAccountMoney + '元，<br>点击上方按钮把钱拿走吧！');
        } else {
            $('#btn').val('存入我的零钱包');
            $('.notice').html('根据微信平台要求，红包累计大于等于1元后可提现，<br>不足1元的红包我们为您贴心准备了零钱包功能');
        }

        if (Number(currentMoney) == 0) { //中奖金额为0
            $('.title').css({
                'top': '4rem',
                'fontSize': '1rem'
            });
            $('.title').html(window.zeroText()); //通用方法 六条随机提示
            $('.content').css('display', 'none');
        } else {
            $('#money').html(currentMoney);
        }

        $('#btn').on('click', function () {
            if (Number(totalAccountMoney) >= 1) {
                if (tx) {
                    tx = false;
                    $('.loading').css('display', 'block');
                    give_spack();
                }
            } else {
                ifremeber();
            }
        });
        switch (jo.result.businessCode) {
            case '0': // 普通奖
                sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                sessionStorage.currentMoney = jo.reply.currentMoney;
                if (sessionStorage.currentMoney == 19.03) { //1903
                    location.replace('http://' + location.host + '/gdqp/txo/1903?bizcode=' + bizcode);
                }
                if (again == true) {
                    window.location.href = 'http://' + location.host + '/v/hnqp20171206/fail.html?bizcode=2';
                } else {
                    sessionStorage.again = true;
                }
                break;
            case '11': // 自己重复扫，普通奖
                if (sessionStorage.currentMoney == 19.03) { //1903
                    location.replace('http://' + location.host + '/gdqp/txo/1903?bizcode=' + jo.result.businessCode);
                } else {
                    location.replace('http://' + location.host + '/hnqp20171206/txo/getcash?bizcode=' + jo.result.businessCode);
                }
                break;
            case '12': // 可疑
                location.replace('http://' + location.host + '/v/hnqp20171206/getMsg.html?bizcode=' + jo.result.businessCode);
                break;
            case '13': // 黑名单
                location.replace('http://' + location.host + '/v/hnqp20171206/getMsg.html?bizcode=' + jo.result.businessCode);
                break;
            case '14': // 指定
                location.replace('http://' + location.host + '/v/hnqp20171206/getMsg.html?bizcode=' + jo.result.businessCode);
                break;
            default:
                if (jo.reply) {
                    sessionStorage.batchName = jo.reply.batchName === undefined ? '' : jo.reply.batchName;
                }
                sessionStorage.msg = jo.result.msg;
                location.replace('http://' + location.host + '/v/hnqp20171206/fail.html?bizcode=' + jo.result.businessCode);
        }

    } else if (jo.result.code == '-1') {
        title_tip('尊敬的用户', '系统升级中，请稍后再试！', '我知道了');
    } else {
        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
    }
}

$('.rule').on('click', function () {
    location.href = "https://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502814670&idx=1&sn=1fde05a10e3df639bc2b6b284d173a75&chksm=087295103f051c064f603736c342e60aa539089478985e052a3145d1212c9391df67391d2064#rd";
});
$('.explain').on('click', function () {
    location.href = "https://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502814672&idx=1&sn=17d2f6d0248e3087c85985f8b4311b38&chksm=0872950e3f051c185f27582526dbe79ce6ec7d4feb72dc9731185f1b65a196c4bf4f745e16ca#rd";
});

var timer = setInterval(function () {
    if (flag) {
        flag = false;
        $('.kungfu').attr('src', '/v/hnqp20171206/img/kungfu-2.png');
    } else {
        flag = true;
        $('.kungfu').attr('src', '/v/hnqp20171206/img/kungfu-1.png');
    }
}, 500)