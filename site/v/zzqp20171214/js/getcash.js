'use strict'
$(document).ready(function () {

    var again = sessionStorage.again === undefined ? 'false' : sessionStorage.again;
    var args = vge.urlparse(location.href),
        bizcode = args.bizcode;

    var currentMoney = sessionStorage.currentMoney === undefined ? '' : sessionStorage.currentMoney, //当前扫码金额，单位分
        currentJifen = sessionStorage.currentJifen === undefined ? '' : sessionStorage.currentJifen, //当前扫码积分
        prizeType = sessionStorage.prizeType === undefined ? '' : sessionStorage.prizeType, //奖品类型
        cardType = sessionStorage.cardType === undefined ? '' : sessionStorage.cardType, //集卡类型
        username = sessionStorage.username == undefined ? '' : sessionStorage.username,
        idcard = sessionStorage.idcard == undefined ? '' : sessionStorage.idcard,
        phonenum = sessionStorage.phonenum == undefined ? '' : sessionStorage.phonenum,
        address = sessionStorage.address == undefined ? '' : sessionStorage.address,
        weekSignFlag = sessionStorage.weekSignFlag === undefined ? '' : sessionStorage.weekSignFlag, //是否开户自然周签到1:开启、0或空:关闭
        weekSignPopup = sessionStorage.weekSignPopup === undefined ? '' : sessionStorage.weekSignPopup, //自然周签到弹出提示
        weekSignDays = sessionStorage.weekSignDays === undefined ? '' : sessionStorage.weekSignDays, //当前周已签到周几集合
        weekSignEarnFlag = sessionStorage.weekSignEarnFlag === undefined ? '' : sessionStorage.weekSignEarnFlag, //周签到红包是否已领取0未领取、1:已领取、2:领取签到红包
        weekSignEarnMoney = sessionStorage.weekSignEarnMoney === undefined ? '' : sessionStorage.weekSignEarnMoney, //周签到红包金额
        weekSignLimitDay = sessionStorage.weekSignLimitDay === undefined ? '' : sessionStorage.weekSignLimitDay, //周签到天数限制
        weekSignDiffDay = sessionStorage.weekSignDiffDay === undefined ? '' : sessionStorage.weekSignDiffDay, //周签到还差天数
        weekSignPercent = sessionStorage.weekSignPercent === undefined ? '' : sessionStorage.weekSignPercent, //周签到完成百分比
        earnTime = sessionStorage.earnTime === undefined ? '' : sessionStorage.earnTime, //特等奖中出时间
        batchName = sessionStorage.remarks === undefined ? '' : sessionStorage.remarks;

    var init = function () { //页面初始化
        //首扫与重复扫
        if (again != 'true' && bizcode == '0' || bizcode == '7') {
            cardshow(true);
        } else {
            cardshow(false);
        }
        switch (bizcode) { //异常情况
            case '-1':
                $('.fail-title').attr('src', '/v/zzqp20171214/img/fail-up-title.png');
                $('.fail-bg').attr('src', '/v/zzqp20171214/img/fail-up-bg.png');
                $('.content').text('稍安勿躁，敬请期待');
                $('.fail').css('display', 'block');
                break;
            case '0':
                $('#accumulate').text(currentJifen);
                $('.gift').css('display', 'none');
                if (bizcode != '11') {
                    $('.points').css('display', 'block');
                }
                break;
            case '1': //这个码不存在
                $('.fail-title').attr('src', '/v/zzqp20171214/img/fail-biz-title.png');
                $('.fail-bg').attr('src', '/v/zzqp20171214/img/fail-biz-bg.png');
                $('.content').text('二维码异常');
                $('.fail').css('display', 'block');
                break;
            case '2': //已被使用
                $('.fail-title').attr('src', '/v/zzqp20171214/img/fail-used-title.png');
                $('.fail-bg').attr('src', '/v/zzqp20171214/img/fail-used-bg.png');
                $('.content').html('扫码时间：<span style="color:#ffffff;">' + earnTime + '<span><br><span style="color:#f6bf62">再扫一瓶试试看</span>');
                $('.fail').css('display', 'block');
                $('.fail-close').css('display', 'block');
                break;
            case '3': //积分码已过期
                $('.fail-title').attr('src', '/v/zzqp20171214/img/fail-timeout-title.png');
                $('.fail-bg').attr('src', '/v/zzqp20171214/img/fail-timeout-bg.png');
                $('.content').text('下次请早哦');
                $('.fail').css('display', 'block');
                break;
            case '4': //活动未开始
                $('.fail-title').attr('src', '/v/zzqp20171214/img/fail-unstart-title.png');
                $('.fail-bg').attr('src', '/v/zzqp20171214/img/fail-unstart-bg.png');
                $('.content').text('心急喝不了好啤酒，再等等哦');
                $('#batch').html(batchName + '<br />服务热线：15378785617<br/>工作时间：9:00-17:00');
                $('.fail').css('display', 'block');
                break;
            case '5': //活动已结束
                $('.fail-title').attr('src', '/v/zzqp20171214/img/fail-over-title.png');
                $('.fail-bg').attr('src', '/v/zzqp20171214/img/fail-over-bg.png');
                $('.content').text('过了这个村，我在下一个村等你');
                $('.fail').css('display', 'block');
                break;
            case '6': //积分码异常
                $('.fail-title').attr('src', '/v/zzqp20171214/img/fail-biz-title.png');
                $('.fail-bg').attr('src', '/v/zzqp20171214/img/fail-biz-bg.png');
                $('.content').text('稍等片刻，码上欢聚');
                $('.fail').css('display', 'block');
                break;
            case '7': //大奖
                if (prizeType != '') {
                    $('.points').css('display', 'none');
                    switch (prizeType) {
                        case '6': //世界杯门票
                            $('.prize').css({
                                'width': '35%',
                                'marginLeft': '15%',
                                'marginTop': '0.5rem'
                            });
                            $('.tedeng').css({
                                'width': '45%'
                            });
                            $('.mybescan').css({
                                'left': '20%',
                                'top': '0.5rem'
                            });
                            $('.prizeTitle').text('恭喜您');
                            $('.peizeType').text('获得特等奖');
                            $('.prize').attr('src', '/v/zzqp20171214/img/getcash-prize0.png?v=1');
                            break;
                        case '7': //俄罗斯之旅
                            $('.prize').css({
                                'width': '20%',
                                'marginLeft': '15%',
                                'marginTop': '1rem'
                            });
                            $('.mybescan').css({
                                'left': '15%'
                            });
                            $('.peizeType').text('俄罗斯旅游大奖一人次');
                            $('.prize').attr('src', '/v/zzqp20171214/img/prize-1.png');
                            break;
                        case '8': //运动手环
                            $('.prize').css({
                                'width': '20%',
                                'marginLeft': '15%',
                                'marginTop': '0'
                            });
                            $('.mybescan').css({
                                'top': '10%',
                                'left': '14%'
                            });
                            $('.peizeType').text('华为运动手环一个');
                            $('.prize').attr('src', '/v/zzqp20171214/img/prize-2.png');
                            break;
                        case '9': //足球
                            $('.prize').css({
                                'width': '25%',
                                'marginLeft': '10%',
                                'marginTop': '0'
                            });
                            $('.mybescan').css({
                                'left': '10%',
                                'width': '25%'
                            });
                            $('.peizeType').text('青岛啤酒定制足球一个');
                            $('.prize').attr('src', '/v/zzqp20171214/img/prize-3.png');
                            break;
                    }
                    if (username != '' && idcard != '' && phonenum != '') { //已填写
                        $('.mybescan').css('display', 'block');
                        $('.ck').text('点击此链接去查看>>');
                    } else { //未填写
                        $('.ck').text('点击此链接去兑奖>>');
                    }
                    $('.gift').css('display', 'block');
                    $('.ck').on('click', function () {
                        document.location.replace('http://' + location.host + '/v/zzqp20171214/prize.html?bizcode=' + prizeType);
                    });
                }
                break;
            case '11': //自己重复扫
                if (earnTime != '') {
                    $('.earnTime').text(earnTime);
                } else {
                    $('.earn').text('您已扫过这瓶酒');
                }
                $('.get').text(currentJifen + '积分');
                $('.rescan').css('display', 'block');
                break;
            case '15': //大奖核销
                if (prizeType == '6') { //世界杯门票
                    $('.verify-img').css({
                        'width': '100%',
                        'left': '10%'
                    });
                    $('.verify-img').attr('src', '/v/zzqp20171214/img/prize-0.png');
                } else if (prizeType == '7') { //俄罗斯之旅
                    $('.verify-img').css({
                        'width': '80%',
                        'left': '20%'
                    });
                    $('.verify-img').attr('src', '/v/zzqp20171214/img/prize-1.png');
                } else if (prizeType == '8') { //运动手环
                    $('.verify-img').css({
                        'width': '65%',
                        'left': '30%',
                        'top': '-0.3rem'
                    });
                    $('.verify-img').attr('src', '/v/zzqp20171214/img/prize-2.png');
                } else if (prizeType == '9') { //足球
                    $('.verify-img').css({
                        'width': '90%',
                        'left': '15%',
                        'top': '-0.3rem'
                    });
                    $('.verify-img').attr('src', '/v/zzqp20171214/img/prize-3.png');
                }
                $('.giftEarnTime').text(earnTime);
                $('.verify').css('display', 'block');
                break;
        }

        $('.personal').on('click', function () {
            sessionStorage.again = true;
            document.location.href = 'http://' + location.host + '/zzqp20171214/too/personal';
        });

        $('.sign').on('click', function () {
            if (weekSignFlag == '1') {
                sessionStorage.again = true;
                document.location.href = 'http://' + location.host + '/v/zzqp20171214/sign.html?bizcode=' + bizcode;
            } else {
                title_tip('提 示', '本周签到活动暂时关闭', '我知道了');
            }
        });
        $('.mall').on('click', function () {
            sessionStorage.again = true;
            document.location.href = 'http://' + location.host + '/v/zzqp20171214/IntegralMall/index.html';
        });
        //酒王战绩
        $('#jw_icon').css('display', 'block');
        $('#jw_icon').on('click', function () {
            $('#jiuw_box').fadeIn(1, function () {
                $('#jiuw_box div').css('bottom', '0rem');
            });
            $('#jiuw_box .close').on('click', function () {
                $('#jiuw_box div').css('bottom', '-11rem');
                $('#jiuw_box').fadeOut(1);
            });
        });
    }

    var cardshow = function (flag) {
        //cardType ==> 有集卡类型时，弹出卡片，没有该类型时，不弹
        //flag ==> 首扫弹卡。重复扫不弹。
        if (cardType != '' && flag == true) {
            switch (cardType) {
                case 'A':
                    $('.cardtype').text('伏尔加格勒卡');
                    $('.card').attr('src', '/v/zzqp20171214/img/getcash-card-0.png');
                    break;
                case 'B':
                    $('.cardtype').text('加里宁格勒卡');
                    $('.card').attr('src', '/v/zzqp20171214/img/getcash-card-1.png');
                    break;
                case 'C':
                    $('.cardtype').text('莫斯科卡');
                    $('.card').attr('src', '/v/zzqp20171214/img/getcash-card-2.png');
                    break;
                case 'D':
                    $('.cardtype').text('圣彼得堡卡');
                    $('.card').attr('src', '/v/zzqp20171214/img/getcash-card-3.png');
                    break;
                case 'E':
                    $('.cardtype').text('叶卡捷琳堡卡');
                    $('.card').attr('src', '/v/zzqp20171214/img/getcash-card-4.png');
                    break;
            }
            $('.cardClose').on('click', function () {
                $('.mask').fadeOut();
                signshow(true);
            });
            $('.mask').fadeIn();
            document.getElementById('xiuxiu').play();
        } else {
            $('.mask').css('display', 'none');
            signshow(false);
        }
    }

    var signshow = function (flag) {
        if (flag == true && weekSignFlag == '1' && weekSignEarnFlag == '2') {
            $('#money').text(Number(weekSignEarnMoney) / 100);
            $('.singClose').on('click', function () {
                $('.reach').fadeOut();
            });
            $('.reach').fadeIn();
        } else {
            $('.reach').css('display', 'none');
        }
    }

    var musicStart = function () {
        $('.audio').addClass('running');
        document.getElementById('bgm').play();
    }

    var musicStop = function () {
        $('.audio').removeClass('running');
        document.getElementById('bgm').pause();
    }


    $('.fail-close').on('click', () => {
        $('.fail').fadeOut();
    });

    $('.audio').on('click', () => {
        if ($('.audio').hasClass('running')) {
            musicStop();
        } else {
            musicStart();
        }
    });
    init();
});