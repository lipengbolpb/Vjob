$(document).ready(function () {
    var PROJECT = 'zzqp20180401';
    var again = sessionStorage.again === undefined ? 'false' : sessionStorage.again;
    var args = vge.urlparse(location.href),
        bizcode = args.bizcode,
        openid = sessionStorage.openid,
        APPID = vge.zzqpappid;

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

    var flag = true;
    setInterval(function(){
        if(flag){
            $('.adTitle').attr('src','img/ad/title_2.png');
            flag = false;
        }else{
            $('.adTitle').attr('src','img/ad/title_1.png');
            flag = true;
        }
    },500);
    $('.adClose').on('click',function(){
        $('.ad').css('display','none');
    });

    function init() { //页面初始化
        switch (bizcode) {
            case '-1':
                $('.fail-title').attr('src', '/v/' + PROJECT + '/img/fail-up-title.png');
                $('.content').text('稍安勿躁，敬请期待');
                $('.select').css('zIndex', '1');
                $('.main').css('display', 'block');
                $('.russia').css('display', 'none');
                $('.fail').css('display', 'block');
                break;
            case '0': //自己第一次扫
                $('.money').text(currentJifen);
                $('.scan').css('display', 'block');
                $('.main').css('display', 'block');
                // $('.active_1').css('display', 'block');
                break;
            case '1': //这个码不存在
                $('.fail-title').attr('src', '/v/' + PROJECT + '/img/fail-biz-title.png');
                $('.content').text('二维码异常');
                $('.select').css('zIndex', '1');
                $('.main').css('display', 'block');
                $('.russia').css('display', 'none');
                $('.fail').css('display', 'block');
                break;
            case '2': //已被别人使用
                $('.fail-title').attr('src', '/v/' + PROJECT + '/img/fail-used-title.png');
                if (earnTime !== '') {
                    $('.content').html('扫码时间：<span style="color:#ffffff;">' + earnTime + '<span><br><span style="color:#ffffff">再扫一瓶试试看</span>');
                } else {
                    $('.content').html('<span style="color:#ffffff">再扫一瓶试试看</span>');
                }
                $('.russia').css('display', 'none');
                $('.fail').css('display', 'block');
                $('.fail-close').css('display', 'block');
                $('.select').css('zIndex', '1');
                $('.main').css('display', 'block');
                break;
            case '3': //积分码已过期
                $('.fail-title').attr('src', '/v/' + PROJECT + '/img/fail-timeout-title.png');
                $('.content').text('下次请早哦');
                $('.select').css('zIndex', '1');
                $('.russia').css('display', 'none');
                $('.fail').css('display', 'block');
                $('.main').css('display', 'block');
                break;
            case '4': //活动未开始
                $('.fail-title').attr('src', '/v/' + PROJECT + '/img/fail-unstart-title.png');
                $('.content').text('心急喝不了好啤酒，再等等哦');
                $('#batch').html(batchName + '<br />服务热线：15378785617<br/>工作时间：9:00-17:00');
                $('.select').css('zIndex', '1');
                $('.russia').css('display', 'none');
                $('.fail').css('display', 'block');
                $('.main').css('display', 'block');
                break;
            case '5': //活动已结束
                $('.fail-title').attr('src', '/v/' + PROJECT + '/img/fail-over-title.png');
                $('.content').text('国足没踢进世界杯，差的就是你这一瓶');
                $('.select').css('zIndex', '1');
                $('.russia').css('display', 'none');
                $('.fail').css('display', 'block');
                $('.main').css('display', 'block');
                break;
            case '6': //积分码异常
                $('.fail-title').attr('src', '/v/' + PROJECT + '/img/fail-biz-title.png');
                $('.content').text('稍等片刻，码上欢聚这一杯');
                $('.select').css('zIndex', '1');
                $('.russia').css('display', 'none');
                $('.fail').css('display', 'block');
                $('.main').css('display', 'block');
                break;
            case '7': //大奖
                if (prizeType != '') {
                    switch (prizeType) {
                        case '6': //世界杯门票
                            $('.prize-ico').css({
                                'width': '30%',
                                'top': '1.5rem',
                                'left': '-8%'
                            });
                            $('.peizeType').text('世界杯决赛阶段门票一张');
                            $('.prize-ico').attr('src', '/v/' + PROJECT + '/img/prize-0.png');
                            break;
                        case '7': //俄罗斯之旅
                            $('.prize-ico').css({
                                'width': '40%',
                                'top': '0',
                                'left': '-7%'
                            });
                            $('.peizeType').text('俄罗斯旅游大奖一人次');
                            $('.prize-ico').attr('src', '/v/' + PROJECT + '/img/prize-1.png');
                            break;
                        case '8': //运动手环
                            $('.prize-ico').css({
                                'width': '22%',
                                'top': '-0.5rem',
                                'left': '-5%'
                            });
                            $('.peizeType').text('华为运动手环一个');
                            $('.prize-ico').attr('src', '/v/' + PROJECT + '/img/prize-2.png');
                            break;
                        case '9': //足球
                            $('.prize-ico').css({
                                'width': '25%',
                                'top': '-0.5rem',
                                'left': '-5%'
                            });
                            $('.peizeType').text('青岛啤酒定制足球一个');
                            $('.prize-ico').attr('src', '/v/' + PROJECT + '/img/prize-3.png');
                            break;
                    }
                    if (username != '' && idcard != '' && phonenum != '') { //已填写
                        $('.mask').css('display', 'block');
                        $('.ck').text('点击此链接去查看>>');
                    } else { //未填写
                        $('.ck').text('点击此链接去兑奖>>');
                    }
                    // $('.select').css('top', '5rem');
                    $('.prize').css('display', 'block');
                    $('.ck').on('click', function () {
                        document.location.replace('http://' + location.host + '/v/' + PROJECT + '/prize.html?bizcode=' + prizeType);
                    });
                } else {
                    $('.select').css({
                        'margin': '6rem auto 0'
                    });
                    title_tip('提 示', '获取prizeType失败', '我知道了');
                }
                break;
            case '11': //自己重复扫
                if (earnTime != '') {
                    $('.rescan-content').text(earnTime);
                } else {
                    $('.rescan-title').text('');
                    $('.rescan-content').text('');
                }
                $('.rescan-money').text(currentJifen + '积分');
                // $('.select').css('top', '11.5rem');
                $('.rescan').css('display', 'block');
                $('.main').css('display', 'block');
                break;
            case '15': //大奖核销
                if (prizeType != '') {
                    switch (prizeType) {
                        case '6': //世界杯门票
                            $('.prize-ico').css({
                                'width': '30%',
                                'top': '1.5rem',
                                'left': '-8%'
                            });
                            $('.mask').css({
                                'width': '20%',
                                'top': '2rem',
                                'left': '-5%'
                            });
                            $('.prize-ico').attr('src', '/v/' + PROJECT + '/img/prize-0.png');
                            break;
                        case '7': //俄罗斯之旅
                            $('.prize-ico').css({
                                'width': '40%',
                                'top': '0',
                                'left': '-7%'
                            });
                            $('.mask').css({
                                'width': '20%'
                            });
                            $('.prize-ico').attr('src', '/v/' + PROJECT + '/img/prize-1.png');
                            break;
                        case '8': //运动手环
                            $('.prize-ico').css({
                                'width': '22%',
                                'top': '-0.5rem',
                                'left': '-5%'
                            });
                            $('.mask').css({
                                'width': '20%',
                                'left': '-4%'
                            });
                            $('.prize-ico').attr('src', '/v/' + PROJECT + '/img/prize-2.png');
                            break;
                        case '9': //足球
                            $('.prize-ico').css({
                                'width': '25%',
                                'top': '-0.5rem',
                                'left': '-5%'
                            });
                            $('.mask').css({
                                'width': '20%',
                                'top': '-0.2rem',
                                'left': '-2%'
                            });
                            $('.prize-ico').attr('src', '/v/' + PROJECT + '/img/prize-3.png');
                            break;
                    }
                    if (username != '' && idcard != '' && phonenum != '') { //已填写
                        // $('.mask').css('display', 'block');
                        $('.ck').text('点击此链接去查看>>');
                    } else { //未填写
                        $('.ck').text('点击此链接去兑奖>>');
                    }
                    $('.mask').css('display', 'block');
                    $('.prize').css('display', 'block');
                    $('.peizeType').text('大奖已被扫');
                    $('.peizeType').css('top', '1.3rem');
                    $('#prizeTitle').css('display', 'none');
                    $('.ck').unbind();
                    $('.ck').css('textDecoration', 'none');
                    $('.ck').css('top', '3rem');
                    $('.ck').html('<span style="color:#fff600;">扫码时间:</span><span style="color:#ffffff;">' + earnTime + '</span>');
                } else {
                    $('.select').css({
                        'margin': '6rem auto 0'
                    });
                    title_tip('提 示', '获取prizeType失败', '我知道了');
                }
                break;
        }

        $('.mall').on('click', function () {
            sessionStorage.again = true;
            document.location.href = 'http://' + location.host + '/v/zzqp20171214/IntegralMall/index.html';
        });
        $('.guess').on('click', function () {
            // title_tip('提 示', '敬请期待！', '我知道了');
            sessionStorage.again = true;
            document.location.href = 'http://' + location.host + '/' + PROJECT + '/to/guess';
        });
        $('.personal').on('click', function () {
            sessionStorage.again = true;
            ifremeber();
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
                    window.location.replace('http://' + location.host + '/' + PROJECT + '/too/personal');
                }
            } catch (e) {
                vge.clog('errmsg', [requrl, e]);
            }
        }, function (err) {
            vge.clog('errmsg', [requrl, err]);
        });
    }

    function musicStart() {
        $('.audio').addClass('running');
        document.getElementById('bgm').play();
    }

    function musicStop() {
        $('.audio').removeClass('running');
        document.getElementById('bgm').pause();
    }

    $('.fail-close').on('click', function () {
        $('.fail').fadeOut();
        $('.select').css('zIndex', '2');
        $('.russia').css('display', 'block');
    });

    $('.audio').on('click', function () {
        if ($('.audio').hasClass('running')) {
            musicStop();
        } else {
            musicStart();
        }
    });

    init();
});