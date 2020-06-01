$(document).ready(function () {
    var PROJECT = 'zzqp20180801';
    var again = sessionStorage.again === undefined ? 'false' : sessionStorage.again;
    var args = vge.urlparse(location.href),
        bizcode = args.bizcode,
        openid = sessionStorage.openid,
        APPID = vge.zzqpappid;

    var currentMoney = sessionStorage.currentMoney === undefined ? '' : sessionStorage.currentMoney, //当前扫码金额，单位分
        currentJifen = sessionStorage.currentJifen === undefined ? '' : sessionStorage.currentJifen, //当前扫码积分
        prizeType = sessionStorage.prizeType === undefined ? '' : sessionStorage.prizeType, //奖品类型
        username = sessionStorage.username == undefined ? '' : sessionStorage.username,
        idcard = sessionStorage.idcard == undefined ? '' : sessionStorage.idcard,
        phonenum = sessionStorage.phonenum == undefined ? '' : sessionStorage.phonenum,
        address = sessionStorage.address == undefined ? '' : sessionStorage.address,
        earnTime = sessionStorage.earnTime === undefined ? '' : sessionStorage.earnTime, //特等奖中出时间
        batchName = sessionStorage.remarks === undefined ? '' : sessionStorage.remarks;

//  if (bizcode == 0) {
//      $('#midAutumn_box').load('/v/midAutumn/midAutumn.html', function () { //加载中秋动画
//          $('#mid_title_box_b').on('animationend', function () {
//              setTimeout(function () {
//                  $('#midAutumn_box').fadeOut(300);
//              }, 1000)
//          });
//      });
//  } else {
//      $('#midAutumn_box').fadeOut(1);
//  }

    function init() { //页面初始化
        switch (bizcode) {
            case '-1':
                $('.failContent').text('系统升级');
                $('.failTip').text('稍安勿躁，敬请期待');
                $('.fail').css('display', 'block');
                $('.wrap').css('display', 'none');
                break;
            case '0': //自己第一次扫,中出积分
                $('.money').text(currentJifen);
                $('.main').css('display', 'block');
                $('.fail').css('display', 'none');
                $('.wrap').css('display', 'block');
                break;
            case '1': //这个码不存在
                $('.failContent').text('系统繁忙');
                $('.failTip').text('二维码异常');
                $('.fail').css('display', 'block');
                $('.wrap').css('display', 'none');
                break;
            case '2': //已被别人使用
                $('.failContent').html('这个二维码<br>已被扫');
                if (earnTime !== '') {
                    $('.failTip').html('扫码时间：<span style="color:#ffffff;">' + earnTime + '<span><br><span style="color:#ffffff">再扫一瓶试试看</span>');
                } else {
                    $('.failTip').html('<span style="color:#ffffff">再扫一瓶试试看</span>');
                }
                $('.fail').css('display', 'block');
                $('.wrap').css('display', 'none');
                $('.failClose').css('display', 'block');
                break;
            case '3': //积分码已过期
                $('.failContent').html('这个二维码<br>已过期');
                $('.failTip').text('下次请早哦');
                $('.fail').css('display', 'block');
                $('.wrap').css('display', 'none');
                break;
            case '4': //活动未开始
                $('.failContent').html('活动未开始');
                $('.failTip').text('心急喝不了好啤酒，再等等哦');
                $('#batch').html(batchName + '<br />服务热线：15378785617<br/>工作时间：9:00-17:00');
                $('.fail').css('display', 'block');
                $('.wrap').css('display', 'none');
                break;
            case '5': //活动已结束
                $('.failContent').html('活动已截止');
                $('.failTip').text('国足没踢进世界杯，差的就是你这一瓶');
                $('.fail').css('display', 'block');
                $('.wrap').css('display', 'none');
                break;
            case '6': //积分码异常
                $('.failContent').html('系统繁忙');
                $('.failTip').text('稍等片刻，码上欢聚这一杯');
                $('.fail').css('display', 'block');
                $('.wrap').css('display', 'none');
                break;
            case '7': //大奖
                if (prizeType != '') {
                    switch (prizeType) {
                        case '6': //世界杯门票
                            $('.peizeType').text('世界杯决赛阶段门票一张');
                            $('.prize-ico').attr('src', '/v/' + PROJECT + '/img/prize-0.png');
                            break;
                        case '7': //俄罗斯之旅
                            $('.peizeType').text('俄罗斯旅游大奖一人次');
                            $('.prize-ico').attr('src', '/v/' + PROJECT + '/img/prize-1.png');
                            break;
                        case '8': //运动手环
                            $('.prize-ico').css({
                                'width': '25%',
                                'top': '0.5rem',
                                'left': '10%'
                            });
                            $('.peizeType').text('华为运动手环一个');
                            $('.prize-ico').attr('src', '/v/' + PROJECT + '/img/prize-2.png');
                            break;
                        case '9': //足球
                            $('.prize-ico').css({
                                'width': '25%',
                                'top': '0.5rem',
                                'left': '10%'
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
                    $('.prize').css('display', 'block');
                    $('.ck').on('click', function () {
                        document.location.replace('http://' + location.host + '/v/' + PROJECT + '/prize.html?bizcode=' + prizeType);
                    });
                    $('.fail').css('display', 'none');
                    $('.wrap').css('display', 'block');
                } else {
                    title_tip('提 示', '获取prizeType失败', '我知道了');
                }
                break;
            case '11': //自己重复扫
                $('.mainTitle').html('您已扫过');
                $('.mainContent').css({
                    'fontSize': '0.5rem',
                    'marginTop': '1rem'
                });
                if (earnTime !== '') {
                    $('.mainContent').html('扫码时间：' + earnTime);
                } else {
                    $('.mainContent').html('');
                }
                $('.main').css('display', 'block');
                $('.fail').css('display', 'none');
                $('.wrap').css('display', 'block');
                break;
            case '15': //大奖核销
                if (prizeType != '') {
                    switch (prizeType) {
                        case '6': //世界杯门票
                            $('.prize-ico').attr('src', '/v/' + PROJECT + '/img/prize-0.png');
                            break;
                        case '7': //俄罗斯之旅
                            $('.prize-ico').attr('src', '/v/' + PROJECT + '/img/prize-1.png');
                            break;
                        case '8': //运动手环
                            $('.prize-ico').css({
                                'width': '25%',
                                'top': '0.5rem',
                                'left': '10%'
                            });
                            $('.mask').css({
                                'top': '0.8rem',
                                'left': '10%'
                            });
                            $('.prize-ico').attr('src', '/v/' + PROJECT + '/img/prize-2.png');
                            break;
                        case '9': //足球
                            $('.prize-ico').css({
                                'width': '25%',
                                'top': '0.5rem',
                                'left': '10%'
                            });
                            $('.mask').css({
                                'top': '0.4rem',
                                'left': '9.8%'
                            });
                            $('.prize-ico').attr('src', '/v/' + PROJECT + '/img/prize-3.png');
                            break;
                    }
                    // if (username != '' && idcard != '' && phonenum != '') { //已填写
                    //     $('.ck').text('点击此链接去查看>>');
                    // } else { //未填写
                    //     $('.ck').text('点击此链接去兑奖>>');
                    // }
                    $('.mask').css('display', 'block');
                    $('.prize').css('display', 'block');
                    $('.fail').css('display', 'none');
                    $('.wrap').css('display', 'block');
                    $('.peizeType').text('大奖已被扫');
                    $('.peizeType').css('top', '1.3rem');
                    $('#prizeTitle').css('display', 'none');
                    $('.ck').unbind();
                    $('.ck').css('textDecoration', 'none');
                    $('.ck').css('top', '3rem');
                    $('.ck').html('<span style="color:#fff600;">扫码时间:</span><span style="color:#ffffff;">' + earnTime + '</span>');
                } else {
                    title_tip('提 示', '获取prizeType失败', '我知道了');
                }
                break;
        }

        $('.mallBtn').on('click', function () {
            sessionStorage.again = true;
            ifremeber(true);
        });
        $('.personalBtn').on('click', function () {
            sessionStorage.again = true;
            ifremeber(false);
        });
    }
    /* 判断关注 */
    function ifremeber(flag) {
        var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + APPID;
        vge.ajxget(requrl, 5000, function (r) {
            try {
                var o = JSON.parse(r);
                if (o.subscribe == '0') { //未关注
                    window.location.replace('http://' + location.host + '/v/' + PROJECT + '/attention.html');
                } else { //已关注用户
                    if (flag) {
                        window.location.href = 'http://' + location.host + '/v/zzqp20171214/IntegralMall/index.html';
                    } else {
                        window.location.href = 'http://' + location.host + '/' + PROJECT + '/too/personal';
                        // window.location.replace('http://' + location.host + '/' + PROJECT + '/too/personal');
                    }
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

    $('.failClose').on('click', function () {
        $('.fail').fadeOut();
        $('.wrap').fadeIn();
    });

    $('.audio').on('click', function () {
        if ($('.audio').hasClass('running')) {
            musicStop();
        } else {
            musicStart();
        }
    });

    init();

    //ufo动画
    function ufoAnimation() {
        var flag = 0;
        setInterval(function () {
            if (flag == 0) {
                $('.ufoTop').css('transform', 'rotate(0deg)');
                $('.ufoLight').css('height', '7rem');
                flag = 1;
                // console.log(flag);
            } else if (flag == 1) {
                $('.ufoTop').css('transform', 'rotate(-10deg)');
                $('.ufoLight').css('height', '5rem');
                flag = 2;
                // console.log(flag);
            } else if (flag == 2) {
                $('.ufoTop').css('transform', 'rotate(-20deg)');
                $('.ufoLight').css('height', '4rem');
                flag = 3;
                // console.log(flag);
            } else if (flag == 3) {
                $('.ufoTop').css('transform', 'rotate(0deg)');
                $('.ufoLight').css('height', '7rem');
                flag = 0;
                // console.log(flag);
            }
        }, 300);
    }
    ufoAnimation();
});