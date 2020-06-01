'use strict'

$(document).ready(function () {
    var args = vge.urlparse(location.href),
        openid = args.openid,
        hbopenid = args.hbopenid;
    sessionStorage.openid = openid;
    var PROJECT = 'zzqp20180801';
    var currentpage = 1,
        next = true,
        count = 10,
        first = true,
        tx = true,
        flag = true,
        complate = true,
        cardFlag = true,
        pointFlag = true;

    function init() {
        loading();
        var data = {
            "openid": openid,
            "activityVersion": 2
        };
        $.ajax({
            type: "POST",
            url: vge.zzqp + '/DBTHNQPInterface/myInfo/queryMyInfo',
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (res, status, xhr) {
                console.log(res);
                loaded();
                if (res.result.code == '0') {
                    if (res.result.businessCode == '0') {
                        //是否可提现
                        console.log(Number(res.reply.userAccountInfo.accountVpoints) / 100 );
                        if (Number(res.reply.userAccountInfo.accountVpoints) / 100 >= 1 && tx) {
                            $('.btn').css({
                                'backgroundColor': '#fbe541',
                                'color': '#005921',
                                'boxShadow': '0px 4px 2px #ac9c22'
                            });
                            $('.btn').attr('disabled', false);
                        }
                        //账户金额
                        $('.money').text(Number(res.reply.userAccountInfo.accountVpoints) / 100 + '元');
                        //账户积分
                        $('#total').text(res.reply.userAccountInfo.accountJifen);
                        //我知道了
                        $('.iknow').on('click', function () {
                            window.location.reload();
                        });
                        prizeListInit(res.reply.userPrizeList);
                    } else if (res.result.businessCode == '1') { //用户信息不存在
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    }
                } else { //code!='0'
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            },
            error: function (res, status, xhr) {
                console.log(res);
            }
        });
    }

    $('.btn').on('click', function () {
        $('.btn').attr('disabled', true);
        give_spack();
        setTimeout(function () {
            $('.btn').attr('disabled', false);
        }, 1000);
    });

    $('.mall').on('click', function () {
        document.location.replace('http://' + location.host + '/v/zzqp20171214/IntegralMall/index.html');
    });

    function give_spack() {
        loading();
        var data = {
            "openid": openid,
            "hbopenid": hbopenid,
            "withdrawMoney": ''
        };
        $.ajax({
            type: "POST",
            url: vge.zzqp + '/DBTHNQPInterface/gifts/getGiftspack',
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (res, status, xhr) {
                console.log(res);
                loaded();
                if (res.result.code == '0') {
                    if (res.result.businessCode === '0') {
                        $('.mask').css('display', 'block');
                        tx = false;
                    } else if (res.result.businessCode === '1') { //1
                        title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
                        tx = true;
                    } else if (res.result.businessCode === '2') { //1
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                        tx = true;
                    } else if (res.result.businessCode === '4') { //1
                        title_tip('提现处理中，请稍后查看详细记录', '我知道了');
                        tx = true;
                    } else if (res.result.businessCode === '3') { //1
                        title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
                        tx = true;
                    } else if (res.result.businessCode === '-1') { //-1
                        title_tip('提 示', '系统升级中...', '我知道了');
                        tx = true;
                    } else if (res.result.businessCode === '-2') { //-1
                        title_tip('提 示', '提现操作过于频繁', '我知道了');
                        tx = true;
                    } else if (res.result.businessCode === '5') { //5
                        title_tip('尊敬的用户', res.result.msg, '我知道了');
                        tx = true;
                    } else {
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                        tx = true;
                    }
                } else { //code!='0'
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            },
            error: function (res, status, xhr) {
                console.log(res);
            }
        });
    }

    // $('.rule').on('click', function () {
    //     document.location.href = 'https://mp.weixin.qq.com/s?__biz=MzIxNzYzOTExOQ==&mid=100000362&idx=1&sn=8e38ed26f3bd3dde1fcf2c7925af37d5&chksm=17f7f3ca20807adce900b388d3f20792bbfd78fea08ce564ccde4df3d88b42db50927707e7d3#rd';
    // });
    // $('.explain').on('click', function () {
    //     document.location.href = 'https://mp.weixin.qq.com/s?__biz=MzIxNzYzOTExOQ==&mid=100000364&idx=1&sn=0bf14ca35554183e9ac936cdd4812173&chksm=17f7f3cc20807ada1bb662e60f0bc699a96aab764a714b7379cb8f75c0bc5d81a4841925c5a1#rd';
    // });

    function loading() {
        $('.loading').css('display', 'block');
    }

    function loaded() {
        $('.loading').css('display', 'none');
    }

    function musicStart() {
        $('.audio').addClass('running');
        document.getElementById('bgm').play();
    }

    function musicStop() {
        $('.audio').removeClass('running');
        document.getElementById('bgm').pause();
    }
    $('.audio').on('click', function () {
        if ($('.audio').hasClass('running')) {
            musicStop();
        } else {
            musicStart();
        }
    });
    var H = document.documentElement.clientHeight || document.body.clientHeight;
    $('#show').on('click', function () {
        if (flag == true) {
            flag = false;
            var onepage_note = function (currentpage, cb) {
                loading();
                var data = {
                    "openid": openid,
                    "prizeType": 1, //1积分红包，2现金红包
                    "currentPage": currentpage,
                    "count": count
                };
                $.ajax({
                    type: "POST",
                    url: vge.zzqp + '/DBTHNQPInterface/gifts/queryAllGiftsList',
                    data: JSON.stringify(data),
                    dataType: 'json',
                    success: function (res, status, xhr) {
                        console.log(res);
                        loaded();
                        if (res.result.code === '0') {
                            if (res.result.businessCode === '0') {
                                if (currentpage == 1 && res.reply.length < count) {
                                    $('#more').text('仅显示近30天的记录');
                                    $('#more').css({
                                        'display': 'block',
                                        'fontSize': '0.6rem'
                                    });
                                    $('#more').unbind('click', getm);
                                }
                                var i = 0,
                                    lst = res.reply,
                                    l = lst.length;
                                if (l === 0 || lst === undefined) {
                                    $('#more').text('仅显示近30天的记录');
                                    $('#more').css({
                                        'display': 'block',
                                        'fontSize': '0.6rem'
                                    });
                                    $('#more').unbind('click', getm);
                                    if (first) {
                                        $('#mon_list').css('display', 'none');
                                        $('#no_list').css('display', 'block');
                                        first = false;
                                    } else {
                                        $('#no_list').css('display', 'none');
                                    }
                                    next = false;
                                    if (cb !== undefined) {
                                        cb();
                                    }
                                    return;
                                }
                                first = false;
                                var params = {},
                                    hs = [],
                                    mon_where = '';
                                $('#more').css('display', 'block');
                                $('#no_list').css('display', 'none');
                                for (i = 0; i < l; ++i) {
                                    params.color = '#fce442';
                                    params.monwhere = '积分获取';
                                    params.money = '+' + lst[i].earnJifen;
                                    params.gettime = lst[i].earnTime;
                                    var li = $('<li><p class="title list_left"><span class="title">' + params.monwhere + '</span><br /><span class="time">' + params.gettime + '</span></p><p class="money title list_left" style="color:' + params.color + '"><span>' + params.money + '</span>积分</p></li>');
                                    $('#mon_list').append(li);
                                }
                                if (cb !== undefined) {
                                    cb();
                                }
                                if (l < count) {
                                    $('#no_list').css('display', 'none');
                                    $('#more').text('仅显示近30天的记录');
                                    $('#more').css({
                                        'display': 'block',
                                        'fontSize': '0.6rem'
                                    });
                                    $('#more').unbind('click', getm);
                                    next = false;
                                    if (cb !== undefined) {
                                        cb();
                                    }
                                    return;
                                }
                            } else if (res.result.businessCode === '2') { //无红包记录
                                if (first) {
                                    $('#more').text('仅显示近30天的记录');
                                    $('#more').css({
                                        'display': 'block',
                                        'fontSize': '0.6rem'
                                    });
                                    $('#more').unbind('click', getm);
                                    $('#mon_list').css('display', 'none');
                                    $('#no_list').css('display', 'block');
                                    first = false;
                                } else {
                                    $('#no_list').css('display', 'none');
                                    $('#more').text('仅显示近30天的记录');
                                    $('#more').css({
                                        'display': 'block',
                                        'fontSize': '0.6rem'
                                    });
                                    $('#more').unbind('click', getm);
                                }
                                if (cb !== undefined) {
                                    cb();
                                }
                                next = false;
                                return;
                            } else { //businessCode:1失败
                                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                            }
                        } else { //code!='0'
                            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                        }
                    },
                    error: function (res, status, xhr) {
                        console.log(res);
                    }
                });
            }
            onepage_note(currentpage);
            var getm = function () {
                if (next) {
                    ++currentpage;
                    onepage_note(currentpage);
                }
            }
            $('#more').on('click', function () {
                getm();
            });
        }
        $('.mybag_top').css('marginTop', -H + 'px');
    });
    $('#hide').on('click', function () {
        $('.mybag_top').css('marginTop', 0 + 'px');
    });
    $('.my').on('click', function () {
        $('.my-prize').fadeIn();
    });
    $('#prize-back').on('click', function () {
        $('.my-prize').fadeOut();
    });

    function prizeListInit(list) {
        console.log(list);
        if (list != undefined) {
            var l = list.length;
            for (let i = 0; i < l; i++) {
                var content = null;
                switch (list[i].prizeType) {
                    case '6':
                        content = template.replace('{{{prizeType}}}', '世界杯门票').replace('{{{time}}}', list[i].earnTime.substr(0, list[i].earnTime.length - 2));
                        break;
                    case '7':
                        content = template.replace('{{{prizeType}}}', '俄罗斯之旅').replace('{{{time}}}', list[i].earnTime.substr(0, list[i].earnTime.length - 2));
                        break;
                    case '8':
                        content = template.replace('{{{prizeType}}}', '华为运动手环').replace('{{{time}}}', list[i].earnTime.substr(0, list[i].earnTime.length - 2));
                        break;
                    case '9':
                        content = template.replace('{{{prizeType}}}', '青啤定制足球').replace('{{{time}}}', list[i].earnTime.substr(0, list[i].earnTime.length - 2));
                        break;
                }
                content = content.replace('{{{id}}}', list[i].prizeType);
                content = content.replace('{{{sweepCode}}}', list[i].sweepCode);
                content = content.replace('{{{ifstatus}}}', list[i].useStatus);
                if (list[i].useStatus == '0') { //未领取
                    content = content.replace('{{{status}}}', '领取').replace('{{{bgc}}}', '#fff601').replace('{{{fontcolor}}}', '#07722a');
                    content = content.replace('{{{ifclick}}}', 'true');
                } else { //已领取
                    content = content.replace('{{{status}}}', '已领取').replace('{{{bgc}}}', '#9c9b98').replace('{{{fontcolor}}}', '#ffffff');
                    content = content.replace('{{{ifclick}}}', 'false');
                }
                if (i % 2 == 0) {
                    content = content.replace('{{{color}}}', '27a5df');
                } else {
                    content = content.replace('{{{color}}}', '0a2753');
                }
                $('#prizeUl').append(content);
            }
            for (let j = 0; j < l; j++) {
                if ($('.subBtn').eq(j).attr('ifclick') === 'true') {
                    $('.subBtn').eq(j).on('click', () => {
                        submessage($('.subBtn').eq(j).attr('id'), $('.subBtn').eq(j).attr('sweepCode'), $('.subBtn').eq(j).attr('ifget'));
                    });
                }
            }
        }
    }

    function submessage(id, sweepCode, useStatus) {
        sessionStorage.sweepCode = sweepCode === undefined ? '' : sweepCode;
        sessionStorage.useStatus = useStatus === undefined ? '' : useStatus;
        window.location.replace('http://' + location.host + '/v/zzqp20180801/prize.html?bizcode=' + id);
    }

    var template =
        '<li style="background:#{{{color}}}">' +
        '<div class="left">' +
        '<p>{{{prizeType}}}</p>' +
        '<p>中奖时间<span>{{{time}}}</span></p>' +
        '</div>' +
        '<div class="right">' +
        '<input type="button" value="{{{status}}}" id="{{{id}}}" ifget="{{{ifstatus}}}" ifclick={{{ifclick}}} sweepCode="{{{sweepCode}}}" class="subBtn" style="background:{{{bgc}}};color:{{{fontcolor}}}">' +
        '</div>' +
        '</li>';

    init();
});