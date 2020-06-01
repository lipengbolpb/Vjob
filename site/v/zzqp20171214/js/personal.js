'use strict'

$(document).ready(function () {
    var args = vge.urlparse(location.href),
        openid = args.openid,
        hbopenid = args.hbopenid;
    sessionStorage.openid = openid;
    var cardType = sessionStorage.cardType === undefined ? '' : sessionStorage.cardType; //集卡类型
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
                //              console.log(res);
                loaded();
                if (res.result.code == '0') {
                    if (res.result.businessCode == '0') {
                        $('.card').on('click', function () {
                            $('.cards').fadeIn();
                            $('.my').fadeOut();
                            if (cardFlag) {
                                cardFlag = false;
                                cardInit(res.reply.userAccountInfo);
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
                                'backgroundColor': '#f6bf62',
                                'color': '#9a1820'
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
                //              console.log(res);
            }
        });
    }

    var cardInit = function (res) {
        //页面展示
        //      console.log(res);
        var i = 0;
        var cardList = [Number(res.cardA), Number(res.cardB), Number(res.cardC), Number(res.cardD), Number(res.cardE)];
        //      console.log(cardList);
        if (res.cardA != '0' || res.cardB != '0' || res.cardC != '0' || res.cardD != '0' || res.cardE != '0') {
            var cardType = '';
            for (var i = 0; i < cardList.length; i++) {
                if (cardList[i] > 0) {
                    cardType = i;
                    break;
                }
            }
            var img = $('<img></img>');
            img.addClass('maincard');
            img.attr('src', '/v/zzqp20171214/img/getcash-card-' + cardType + '.png?v=1');
            $('.allcard').append(img);
        } else {
            i = 0;
            var img = $('<img></img>');
            img.addClass('maincard gray');
            img.attr('src', '/v/zzqp20171214/img/getcash-card-' + i + '.png?v=1');
            $('.allcard').append(img);
        }

        for (var i = 0; i < cardList.length; i++) { //底部集卡数量显示
            if (cardList[i] > 99) {
                $('.cardNum').eq(i).text('99+');
            } else {
                $('.cardNum').eq(i).text(cardList[i]);
            }
            if (cardList[i] == 0) {
                $('.card-icon').eq(i).attr('src', '/v/zzqp20171214/img/card-' + i + '.png?v=1');
            } else {
                $('.card-icon').eq(i).attr('src', '/v/zzqp20171214/img/card-' + i + '-have.png?v=1');
            }
        }

        if (Number(cardList[0]) > 0 && Number(cardList[1]) > 0 && Number(cardList[2]) > 0 && Number(cardList[3]) > 0 && Number(cardList[4]) > 0) {
            $('.exchange').css('backgroundColor', '#f6bf62');
            for (var i = 0; i < 5; i++) {
                var img = $('<img></img>');
                img.addClass('maincard');
                img.attr('src', '/v/zzqp20171214/img/getcash-card-' + i + '.png?v=1');
                $('.allcard').append(img);
            }
            $('.exchange').on('click', function () {
                if (complate) {
                    complate = false;
                    getall();
                }
            });
            $('.cardback').on('click', function () {
                window.location.reload();
            });
        } else {
            $('.cardback').on('click', function () {
                $('.cards').fadeOut();
                $('.my').fadeIn();
            });
        }
    }

    var pointInit = function (res) {
        $('.pointNum').text(res.accountJifen);
        var H = document.documentElement.clientHeight || document.body.clientHeight;
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
                    //                  console.log(res);
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
                                params.color = '#b83d14';
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
                    //                  console.log(res);
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

    var getall = function () {
        loading();
        var data = {
            "openid": openid
        };
        $.ajax({
            type: "POST",
            url: vge.zzqp + '/DBTHNQPInterface/user/exchangeCard',
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (res, status, xhr) {
                //              console.log(res);
                loaded();
                if (res.result.code == '0') {
                    if (res.result.businessCode == '0') {
                        setTimeout(function () {
                            $('.num').fadeOut();
                            $('.card-icon').eq(0).addClass('animate-card0');
                            $('.card-icon').eq(1).addClass('animate-card1');
                            $('.card-icon').eq(2).addClass('animate-card2');
                            $('.card-icon').eq(3).addClass('animate-card3');
                            $('.card-icon').eq(4).addClass('animate-card4');
                            setTimeout(function () {
                                $('.maincard').eq(0).css('zIndex', '1');
                                setTimeout(function () {
                                    $('.maincard').eq(1).css('zIndex', '2');
                                    setTimeout(function () {
                                        $('.maincard').eq(2).css('zIndex', '3');
                                        setTimeout(function () {
                                            $('.maincard').eq(3).css('zIndex', '4');
                                            setTimeout(function () {
                                                $('.maincard').eq(4).css('zIndex', '5');
                                                $('.maincard').eq(0).addClass('animate-rotate0');
                                                $('.maincard').eq(1).addClass('animate-rotate1');
                                                $('.maincard').eq(2).addClass('animate-rotate2');
                                                $('.maincard').eq(3).addClass('animate-rotate3');
                                                $('.maincard').eq(4).addClass('animate-rotate4');
                                                setTimeout(function () {
                                                    $('.maincard,.card-icon').fadeOut();
                                                    $('#money').text(Number(res.reply.earnMoney) / 100);
                                                    $('.success').fadeIn();
                                                    $('.banner').fadeOut();
                                                }, 2000);
                                            }, 200);
                                        }, 200);
                                    }, 200);
                                }, 200);
                            }, 500);
                        }, 800);
                        $('.exchange').css('backgroundColor', '#c6c6c6');
                        $('.exchange').unbind();
                    } else {
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    }
                } else { //code!='0'
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            },
            error: function (res, status, xhr) {
                //              console.log(res);
            }
        });
    }

    var give_spack = function () {
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
                //              console.log(res);
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
                //              console.log(res);
            }
        });
    }

    $('.rule').on('click', function () {
        document.location.href = 'https://mp.weixin.qq.com/s?__biz=MzIxNzYzOTExOQ==&mid=100000281&idx=1&sn=83fa80fb2c6035459939f5e6237ff547&chksm=17f7f3b920807aaf89718185e0b7db14145a8c5aad2a5f3328038c51de360d57381f7ef289e9#rd';
    });
    $('.explain').on('click', function () {
        document.location.href = 'https://mp.weixin.qq.com/s?__biz=MzIxNzYzOTExOQ==&mid=100000283&idx=1&sn=3f74aa6887f92fb12739734006d4768d&chksm=17f7f3bb20807aadeb6636b1e6d1fbaa7e0c4fa2c75a66b1a6418b65c6d121a0d5e38c39ec37#rd';
    });
    //酒王战绩
    // $('#jw_icon').css('display', 'block');
    // $('#jw_icon').on('click', function () {
    //     $('#jiuw_box').fadeIn(1, function () {
    //         $('#jiuw_box div').css('bottom', '0rem');
    //     });
    //     $('#jiuw_box .close').on('click', function () {
    //         $('#jiuw_box div').css('bottom', '-11rem');
    //         $('#jiuw_box').fadeOut(1);
    //     });
    // });

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

    var prizeListInit = function (list) {
        //      console.log(list);/
        if (list != undefined) {
            var l = list.length;
            for (var i = 0; i < l; i++) {
                var content = null;
                switch (list[i].prizeType) {
                    case '6':
                        content = template.replace('{{{prizeType}}}', '神秘俄罗斯旅游奖').replace('{{{time}}}', list[i].earnTime.substr(0, list[i].earnTime.length - 2));
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
                if (list[i].useStatus == '0') { //未领取
                    content = content.replace('{{{status}}}', '领取').replace('{{{bgc}}}', '#f6bf62').replace('{{{fontcolor}}}', '#9a1820');
                    content = content.replace('{{{ifclick}}}', 'true');
                } else { //已领取
                    content = content.replace('{{{status}}}', '已领取').replace('{{{bgc}}}', '#9c9b98').replace('{{{fontcolor}}}', '#ffffff');
                    content = content.replace('{{{ifclick}}}', 'false');
                }
                if (i % 2 == 0) {
                    content = content.replace('{{{color}}}', '790602');
                } else {
                    content = content.replace('{{{color}}}', 'ab1712');
                }
                $('#prizeUl').append(content);
            }
            for (var j = 0; j < l; j++) {
                (function (j) {
                    if ($('.subBtn').eq(j).attr('ifclick') === 'true') {
                        $('.subBtn').eq(j).on('click', () => {
                            submessage($('.subBtn').eq(j).attr('id'), $('.subBtn').eq(j).attr('sweepCode'));
                        });
                    }
                })(j);
            }
        }
    }

    var submessage = function (id, sweepCode) {
        sessionStorage.sweepCode = sweepCode === undefined ? '' : sweepCode;
        window.location.href = 'http://' + location.host + '/v/zzqp20171214/prize.html?bizcode=' + id;
    }

    var template = `
        <li style="background:#{{{color}}}">
            <div class="left">
                <p>{{{prizeType}}}</p>
                <p>中奖时间<span>{{{time}}}</span></p>
            </div>
            <div class="right">
                <input type="button" value="{{{status}}}" id="{{{id}}}" ifclick={{{ifclick}}} sweepCode="{{{sweepCode}}}" class="subBtn" style="background:{{{bgc}}};color:{{{fontcolor}}}">
            </div>
        </li>
    `;

    init();
});