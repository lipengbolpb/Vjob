'use strict'

$(document).ready(function () {
    var args = vge.urlparse(location.href),
        openid = args.openid,
        hbopenid = args.hbopenid;
    sessionStorage.openid = openid;
    var cardType = sessionStorage.cardType === undefined ? '' : sessionStorage.cardType; //集卡类型
    var PROJECT = 'zzqp20180401';
    var currentpage = 1,
        next = true,
        count = 10,
        first = true,
        tx = true,
        complate = true,
        cardFlag = true,
        pointFlag = true;

    var init = function () {
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
                        $('.card').on('click', function () {
                            if (res.reply.giftPacks.weekSignFlag == '1') {
                                if (cardFlag) {
                                    cardFlag = false;
                                    cardInit(res.reply.giftPacks);
                                }
                                $('.sign').fadeIn();
                                $('.my').fadeOut();
                            } else {
                                title_tip('提 示', '本周签到活动暂时关闭', '我知道了');
                            }
                        });
                        $('.point').on('click', function () {
                            $('.points').fadeIn();
                            $('.my').fadeOut();
                            if (pointFlag) {
                                pointFlag = false;
                                pointInit(res.reply.userAccountInfo);
                            }
                        });
                        if (Number(res.reply.userAccountInfo.accountVpoints) / 100 >= 1 && tx) {
                            $('#tx').css({
                                'backgroundColor': '#fbe541',
                                'color': '#005921',
                                'boxShadow': '0px 4px 2px #ac9c22'
                            });
                            $('#tx').on('click', function () {
                                give_spack();
                            });
                        }
                        $('#total').text(Number(res.reply.userAccountInfo.accountVpoints) / 100 + '元');
                        prizeListInit(res.reply.userPrizeList);
                        $('.iknow').on('click', function () {
                            window.location.reload();
                        });
                        $('.my').on('click', function () {
                            $('.my-prize').fadeIn();
                        });
                        $('#prize-back').on('click', function () {
                            $('.my-prize').fadeOut();
                        });
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

    var cardInit = function (res) {
        console.log(res);
        var weekSignFlag = res.weekSignFlag === 'undefined' ? '0' : res.weekSignFlag, //是否开户自然周签到，1:开启、0或空:关闭
            weekSignDays = res.weekSignDays === 'undefined' ? '' : res.weekSignDays, //当前周已签到周几集合
            weekSignEarnFlag = res.weekSignEarnFlag === 'undefined' ? '0' : res.weekSignEarnFlag, //周签到红包是否已领取，1:已领取、0未领取  2领取签到红包
            weekSignEarnMoney = res.weekSignEarnMoney === 'undefined' ? '' : res.weekSignEarnMoney, //周签到红包金额
            weekSignLimitDay = res.weekSignLimitDay === 'undefined' ? '' : res.weekSignLimitDay, //周签到天数限制
            weekSignDiffDay = res.weekSignDiffDay === 'undefined' ? '' : res.weekSignDiffDay, //周签到还差天数
            weekSignPopup = res.weekSignPopup === 'undefined' ? '' : res.weekSignPopup, //自然周签到弹出提示，1:弹出提示、0或空:不弹出"
            weekSignPercent = res.weekSignPercent === 'undefined' ? '' : res.weekSignPercent; //周签到完成百分比
        if (weekSignFlag == '1') {
            $('.scale').text((weekSignLimitDay - weekSignDiffDay) + '/' + weekSignLimitDay);
            $('.inner').css('width', weekSignPercent + '%');
            if (weekSignEarnFlag == '2') { //签到目标达成，未领取
                $('#money').text(Number(weekSignEarnMoney) / 100);
                $('.signtitle').attr('src', '/v/' + PROJECT + '/img/sign-title-get.png?v=1');
                $('.complete').css('display', 'block');
                $('.notice').css('display', 'block');
            } else if (weekSignEarnFlag == '1') { //签到目标达成，已领取
                $('#money').text(Number(weekSignEarnMoney) / 100);
                $('.signtitle').attr('src', '/v/' + PROJECT + '/img/sign-title-get.png?v=1');
                $('.used').css('display', 'block');
                $('.complete').css('display', 'block');
                $('.notice').css('display', 'block');
            } else { //签到目标未达成，还差xx天
                $('.signtitle').attr('src', '/v/' + PROJECT + '/img/sign-title-progress.png?v=1');
                $('.day').text(weekSignDiffDay);
                $('.rough').css('display', 'block');
            }

            if (weekSignDays != '') {
                weekSignDays = weekSignDays.split(',').sort();
            }
            if (weekSignDays.length > 0) {
                for (let i = 0; i < weekSignDays[weekSignDays.length - 1]; i++) { //x
                    let img = $('<img src="">');
                    img.attr('src', '/v/' + PROJECT + '/img/no.png');
                    $('.select').eq(i).append(img);
                }
            }
            for (let j = 0; j < weekSignDays.length; j++) { //√
                $('.select').eq(weekSignDays[j] - 1).empty();
                let img = $('<img src="">');
                img.attr('src', '/v/' + PROJECT + '/img/yes.png');
                $('.select').eq(weekSignDays[j] - 1).append(img);
            }
        }
    }

    var pointInit = function (res) {
        $('.pointNum').text(res.accountJifen);
        let H = document.documentElement.clientHeight || document.body.clientHeight;
        $('#show').on('click', function () {
            $('.mybag_top').css('marginTop', -H + 'px');
        });
        $('#hide').on('click', function () {
            $('.mybag_top').css('marginTop', 0 + 'px');
        });
        $('.enter').on('click', function () {
            document.location.replace('http://' + location.host + '/v/zzqp20171214/IntegralMall/index.html');
        });
        $('.pointback').on('click', function () {
            $('.points').fadeOut();
            $('.my').fadeIn();
        });
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
                                let li = $('<li><p class="title list_left"><span class="title">' + params.monwhere + '</span><br /><span class="time">' + params.gettime + '</span></p><p class="money title list_left" style="color:' + params.color + '"><span>' + params.money + '</span>积分</p></li>');
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

    var give_spack = function () {
        loading();
        let data = {
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

    $('.rule').on('click', function () {
        document.location.href = 'https://mp.weixin.qq.com/s?__biz=MzIxNzYzOTExOQ==&mid=100000362&idx=1&sn=8e38ed26f3bd3dde1fcf2c7925af37d5&chksm=17f7f3ca20807adce900b388d3f20792bbfd78fea08ce564ccde4df3d88b42db50927707e7d3#rd';
    });
    $('.explain').on('click', function () {
        document.location.href = 'https://mp.weixin.qq.com/s?__biz=MzIxNzYzOTExOQ==&mid=100000364&idx=1&sn=0bf14ca35554183e9ac936cdd4812173&chksm=17f7f3cc20807ada1bb662e60f0bc699a96aab764a714b7379cb8f75c0bc5d81a4841925c5a1#rd';
    });

    var loading = function () {
        $('.loading').css('display', 'block');
    }
    var loaded = function () {
        $('.loading').css('display', 'none');
    }
    var musicStart = function () {
        $('.audio').addClass('running');
        document.getElementById('bgm').play();
    }
    var musicStop = function () {
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
    $('.cardback').on('click', function () {
        $('.sign').fadeOut();
        $('.my').fadeIn();
    });
    var prizeListInit = function (list) {
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
                    content = content.replace('{{{color}}}', '004a19');
                } else {
                    content = content.replace('{{{color}}}', '05732a');
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

    var submessage = function (id, sweepCode, useStatus) {
        sessionStorage.sweepCode = sweepCode === undefined ? '' : sweepCode;
        sessionStorage.useStatus = useStatus === undefined ? '' : useStatus;
        window.location.replace('http://' + location.host + '/v/zzqp20180401/prize.html?bizcode=' + id);
        // window.location.href = 'http://' + location.host + '/v/zzqp20180401/prize.html?bizcode=' + id;
    }

    var template = `
        <li style="background:#{{{color}}}">
            <div class="left">
                <p>{{{prizeType}}}</p>
                <p>中奖时间<span>{{{time}}}</span></p>
            </div>
            <div class="right">
                <input type="button" value="{{{status}}}" id="{{{id}}}" ifget="{{{ifstatus}}}" ifclick={{{ifclick}}} sweepCode="{{{sweepCode}}}" class="subBtn" style="background:{{{bgc}}};color:{{{fontcolor}}}">
            </div>
        </li>
    `;

    init();
});