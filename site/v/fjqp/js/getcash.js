(function () {
    var timer = null,
        timer2 = null,
        timer4 = null,
        tx = false,
        flag = false;
    var openid = sessionStorage.openid === undefined ? '' : sessionStorage.openid,
        args = vge.urlparse(location.href),
        dom_btn = document.getElementById("btn"),
        hbopenid = args.openid,
        bizcode = args.bizcode,
        currentMoney = sessionStorage.currentMoney === undefined ? '' : sessionStorage.currentMoney,
        totalAccountMoney = sessionStorage.totalAccountMoney === undefined ? '' : sessionStorage.totalAccountMoney;

    if (bizcode == '11') {
        $('.cash').html('<p id="title">您已扫过</p><p class="time">扫码时间：' + sessionStorage.earnTime + '</p><div id="btn">立即提现</div>');
        dom_btn = document.getElementById("btn"); //再次获取元素
    }
    if (sessionStorage.bizcode) {
        bizcode = sessionStorage.bizcode;
    }
    if (sessionStorage.tx) {
        tx = true;
    }
    //签到相关
    var act = false,
        needAlert = false; //needAlert 弹窗开关 act活动那个推广开关
    // var weekSignFlag = sessionStorage.weekSignFlag === 'undefined' ? '0' : sessionStorage.weekSignFlag, //是否开户自然周签到，1:开启、0或空:关闭
    //     weekSignDays = sessionStorage.weekSignDays === 'undefined' ? '' : sessionStorage.weekSignDays, //当前周已签到周几集合
    //     weekSignEarnFlag = sessionStorage.weekSignEarnFlag === 'undefined' ? '0' : sessionStorage.weekSignEarnFlag, //周签到红包是否已领取，1:已领取、0未领取  2领取签到红包
    //     weekSignEarnMoney = sessionStorage.weekSignEarnMoney === 'undefined' ? '' : sessionStorage.weekSignEarnMoney, //周签到红包金额
    //     weekSignLimitDay = sessionStorage.weekSignLimitDay === 'undefined' ? '' : sessionStorage.weekSignLimitDay, //周签到天数限制
    //     weekSignDiffDay = sessionStorage.weekSignDiffDay === 'undefined' ? '' : sessionStorage.weekSignDiffDay, //周签到还差天数
    //     weekSignPopup = sessionStorage.weekSignPopup === 'undefined' ? '' : sessionStorage.weekSignPopup, //自然周签到弹出提示，1:弹出提示、0或空:不弹出"
    //     weekSignPercent = sessionStorage.weekSignPercent === 'undefined' ? '' : sessionStorage.weekSignPercent; //周签到完成百分比

    // if (new Date().getTime() < 1524931200000 && sessionStorage.dayScanNum > 1) { //4.29号之前
    //     act = false;
    // }
    // if (new Date().getTime() > 1525190400000) { //5.2号之后
    //     act = false;
    // }

    // //图片切换
    // if (new Date().getTime() < 1524931200000) { //4.29前
    //     $('.active img').attr('src', '/v/fjqp/img/20180428.jpg');
    // } else if (new Date().getTime() > 1524931200000 && new Date().getTime() < 1525017600000) { //4.29
    //     $('.active img').attr('src', '/v/fjqp/img/20180429.jpg');
    // } else if (new Date().getTime() > 1525017600000 && new Date().getTime() < 1525104000000) { //4.30
    //     $('.active img').attr('src', '/v/fjqp/img/20180430.jpg');
    // } else { //5.1
    //     $('.active img').attr('src', '/v/fjqp/img/20180501.jpg');
    // }

    // if ((weekSignPopup == 1 && weekSignEarnFlag != 1) || act == true) {
    //     if (bizcode != 11) {
    //         needAlert = true;
    //     }
    // }

    var hh = document.getElementsByTagName('body')[0].clientHeight,
        ww = document.getElementsByTagName('body')[0].clientWidth;
    if (hh == 519 && ww == 360) {
        $('#box').css({
            '-webkit-transform': ' scaleY(.95)',
            'margin': '-1rem auto 0'
        });
    }

    if (bizcode == '0') {
        $('.getcash').css('display', 'block');
        $(document).ready(function () {
            // 圣诞节代码，下线时注销 start
            if (new Date().getTime() > 1544371200000) {
                // 12.10以后
                $('.christmas').on('click', function () {
                    $('.scan_b').addClass('scan');
                    $('.qr').delay(1000).fadeIn(1, function () {
                        $('.anim_1').delay(850).fadeOut(1, function () {
                            $('.anim_2').fadeIn(1);
                        });
                    });
                })
                setTimeout(function () {
                    $('.scan_b').addClass('scan');
                    $('.qr').delay(1000).fadeIn(1, function () {
                        $('.anim_1').delay(850).fadeOut(1, function () {
                            $('.anim_2').fadeIn(1);
                        });
                    });
                }, 3000);
            } else {
                $('.scan_b').addClass('scan');
                $('.qr').delay(1000).fadeIn(1, function () {
                    $('.anim_1').delay(850).fadeOut(1, function () {
                        $('.anim_2').fadeIn(1);
                    });
                });
            }
            // 圣诞节 end

            // $('.scan_b').addClass('scan');
            // $('.qr').delay(1000).fadeIn(1, function () {
            //     $('.anim_1').delay(850).fadeOut(1, function () {
            //         $('.anim_2').fadeIn(1);
            //     });
            // });
        });
    } else {
        $('.cash,.anim_2').css('display', 'block');
        $('.anim_1,.open,.bottle,.cash_bg').css('display', 'none');
        $('#test2,#test3').addClass('test');
        timer2 = setTimeout(function () {
            $('.money').css('visibility', 'visible').addClass('jump');
            clearTimeout(timer2);
        }, 400);
        dom_btn.addEventListener('click', dot, false);

        $('.game').on('click', function () { //骰子
            location.href = 'http://' + location.host + '/v/fjqp/game/index.html';
        });
        $('.game').css('display', 'block');
    }

    if (totalAccountMoney < 1) {
        $('#btn').html('存入我的零钱包');
        $('#money').html('¥<span>' + currentMoney + '</span>元');
        if (currentMoney == 0) {
            $('#money').html(window.zeroText2());
            $('#money').css({
                'font-size': '.7rem',
                'margin-top': '3rem',
                'line-height': '1.5em'
            });
            $('#tip').css('opacity', 0);
        }
    } else {
        $('#money').html('¥<span>' + currentMoney + '</span>元');
        if (currentMoney == 0) {
            $('#money').html(window.zeroText2());
            $('#money').css({
                'font-size': '.7rem',
                'margin-top': '3rem',
                'line-height': '1.5em'
            });
            $('#tip').css('opacity', 0);
        }
        $('#btn').html('立即提现');
        $('#tip').html('您的红包累计金额为' + totalAccountMoney + '元，点击上方“立即提现”按钮把钱拿走吧');
    }

    function dot() {
        _hmt.push(['_trackEvent', 'click', '提现', '红包页面']);
        dom_btn.removeEventListener('click', dot, false);
        if (totalAccountMoney < 1) {
            subscribe();
        } else {
            if (totalAccountMoney < 88.8) {
                give_spack();
            } else {
                sessionStorage.hbopenid = hbopenid;
                location.href = 'http://' + location.host + '/v/fjqp/getMsg.html?bizcode=12&tx=1';
            }
        }
    }

    //	sessionStorage.btn = $('#btn').html();

    $('.open').on('click', function () {
        _hmt.push(['_trackEvent', 'click', '拆红包', '红包页面']);
        $('.open').addClass('rotate');
        sessionStorage.bizcode = 11;
    });
    $('.open').on('animationend', function () {
        $('.open,.bottle').css('display', 'none');
        $('#test2,#test3').addClass('test');
        $('.cash').css('display', 'block');
        $('.cash_bg').delay(10).fadeOut(1);
        timer2 = setTimeout(function () {
            $('.money').css('visibility', 'visible').addClass('jump');
            clearTimeout(timer2);
        }, 500);
        // if (weekSignFlag == 1) { //签到开启
        //     timer3 = setTimeout(function () {
        //         $('.sign_logo').css('display', 'block'); //签到按钮
        //         if (weekSignEarnFlag == 1) { //已领取
        //             $('.sign_title').attr('src', '/v/qpzj/img2/sign_title_2.png');
        //             $('.sign_logo').css({
        //                 'background': 'url(/v/qpzj/img2/sign_ed.png) no-repeat right',
        //                 '-webkit-background-size': ' auto 100%'
        //             });
        //         } else {
        //             $('.light').css('visibility', 'visible');
        //             $('#weekSignEarnMoney').css('display', 'none');
        //             $('.sign_tip').html('本周签到达' + weekSignLimitDay + '天，可额外获得红包1个！');
        //             $('.sign_cash').css({
        //                 'background': 'url(/v/qpzj/img2/sign_cash.png) no-repeat bottom',
        //                 '-webkit-background-size': '100% auto'
        //             });
        //         }
        //         $('.sign_logo').on('click', function () {
        //             _hmt.push(['_trackEvent', 'click', '查看签到红包', 'cash']);
        //             $('#sign,.content').css('display', 'block');
        //         });
        //         $('.sign_alert').on('click', function () { //签到天数提醒
        //             $(this).css('display', 'none');
        //             $('.content').css('display', 'block');
        //         });
        //         $('.close').on('click', function () {
        //             $('#sign').css('display', 'none');
        //         });
        //     }, 1500);
        // }
        // if (needAlert) { //需要弹窗推广
        //     timer4 = setTimeout(function () {
        //         active();
        //         if (weekSignPopup == 1 && weekSignEarnFlag != 1) { //每天首次 且未领取签到红包就会弹出提示
        //             if (weekSignEarnFlag == 2) {
        //                 $('#sign,.getSignCash').css('display', 'block');
        //                 $('.getSignCash').on('click', function () {
        //                     weekSignEarnFlag = '1';
        //                     $('#sign,.light,.getSignCash').css('display', 'none');
        //                     $('.content').css('display', 'block');
        //                     $('.sign_title').attr('src', '/v/qpzj/img2/sign_title_2.png');
        //                     $('.sign_logo').css({
        //                         'background': 'url(/v/qpzj/img2/sign_ed.png) no-repeat right',
        //                         '-webkit-background-size': ' auto 100%'
        //                     });
        //                     $('.sign_tip,#weekSignEarnMoney').css('display', 'block');
        //                     $('.sign_cash').css({
        //                         'background': 'url(/v/qpzj/img2/sign_cash_open.png) no-repeat bottom',
        //                         '-webkit-background-size': '100% auto'
        //                     });
        //                 });
        //             } else {
        //                 $('#sign,.sign_alert').css('display', 'block');
        //             }
        //             if (act) {
        //                 //         广告页
        //                 $('.active').css('display', 'block');
        //                 //						var timer3 = setTimeout(function() {
        //                 //								$('.active').css('display', 'block');
        //                 //							}, 1500);
        //                 $('.active').on('click', function () {
        //                     $('.active').css('display', 'none');
        //                 });
        //             }
        //         } else { //活动推送（手动）
        //             if (act) {
        //                 $('.active').css('display', 'block');
        //                 //         广告页
        //                 //						var timer3 = setTimeout(function() {
        //                 //								$('.active').css('display', 'block');
        //                 //							}, 1500);
        //                 $('.active').on('click', function () {
        //                     $('.active').css('display', 'none');
        //                 });
        //             }
        //         }
        //     }, 1500);
        // } else {
        //     active();
        // }
        $('.game').css('display', 'block');
        active();
    });

    function active() {
        dom_btn.addEventListener('click', dot, false);
        $('.game').on('click', function () { //骰子
            location.href = 'http://' + location.host + '/v/fjqp/game/index.html';
        });
    }

    // if (bizcode == 0) { //签到相关
    //     //进度条
    //     $('.progress').html((weekSignLimitDay - weekSignDiffDay) + '/' + weekSignLimitDay);
    //     $('#progress2').css('width', weekSignPercent * 7.8 / 100 + 'rem');
    //     $('.days').html(weekSignLimitDay - weekSignDiffDay + '天');
    //     $('#weekSignEarnMoney').html(weekSignEarnMoney + '元');
    //     $('.weekSignEarnMoney').html('<span>' + weekSignEarnMoney + '</span>元');

    //     if (weekSignDays != '') {
    //         weekSignDays = weekSignDays.split(',').sort();
    //     }
    //     if (weekSignDays.length > 0) {
    //         for (var i = 0; i < weekSignDays[weekSignDays.length - 1]; i++) { //打叉
    //             document.getElementsByClassName('checks')[i].style.backgroundImage = 'url(/v/qpzj/img2/frok.png)';
    //         }
    //     }
    //     for (var j = 0; j < weekSignDays.length; j++) { //打√
    //         document.getElementsByClassName('checks')[weekSignDays[j] - 1].style.backgroundImage = 'url(/v/qpzj/img2/check.png)';
    //     }

    // }
    $('#close').on('click', function () {
        $('#alert').css('display', 'none');
        subscribe();
    });

    function give_spack() { //提现
        if (tx) {
            $('#btn').html('存入我的零钱包');
            subscribe();
            return;
        }
        var javai = vge.fjqp + '/DBTFJQPInterface/gifts/getGiftspack';
        var req = {
            "openid": openid,
            "hbopenid": hbopenid
        };
        vge.callJApi(javai, req,
            function (jo) {
                if (jo.result.code == '0') {
                    if (jo.result.businessCode === '0') {
                        tx = true;
                        sessionStorage.tx = true;
                        $('#alert').css('display', 'block');
                        $('#btn').html('存入我的零钱包');
                    } else if (jo.result.businessCode === '1') { //1
                        dom_btn.addEventListener('click', dot, false);
                        title_tip('提 示', '您的待提余额不足1元，再喝几瓶攒够1元发红包！', '我知道了');
                    } else if (jo.result.businessCode === '2') { //后台金额不足
                        dom_btn.addEventListener('click', dot, false);
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    } else if (jo.result.businessCode === '-2') { //-2
                        dom_btn.addEventListener('click', dot, false);
                        title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
                    } else if (jo.result.businessCode === '5') { //超限
                        dom_btn.addEventListener('click', dot, false);
                        title_tip('尊敬的用户', jo.result.msg, '我知道了');
                    } else if (jo.result.businessCode === '3') { //1
                        dom_btn.addEventListener('click', dot, false);
                        title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
                    } else if (jo.result.businessCode === '-1') { //-1
                        dom_btn.addEventListener('click', dot, false);
                        title_tip('尊敬的用户', '系统升级中', '我知道了');
                    } else {
                        dom_btn.addEventListener('click', dot, false);
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    }
                } else { //code!='0'
                    dom_btn.addEventListener('click', dot, false);
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            });
    }

    function subscribe() { //判断关注
        tx = true;
        var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.fjqpappid;
        vge.ajxget(requrl, 5000, function (r) {
            try {
                var o = JSON.parse(r);
                //				$('#btn').html(sessionStorage.btn);
                dom_btn.addEventListener('click', dot, false);
                if (o.subscribe == 0) { //未关注
                    window.location.replace('http://' + location.host + '/v/fjqp/attention.html');
                } else { //已关注用户
                    window.location.replace('http://' + location.host + '/fjqp/too/mybag');
                }
            } catch (e) {
                vge.clog('errmsg', [requrl, e]);
            }
        }, function (err) {
            vge.clog('errmsg', [requrl, err]);
        });
    }

    $('#rule').on('click', function () {
        _hmt.push(['_trackEvent', 'click', '活动规则', '红包页面']);
        location.href = "https://mp.weixin.qq.com/s?__biz=MzIzMTA1NzgzNw==&mid=100000009&idx=1&sn=6844a2d77ffa269160190a1de36bffcc&chksm=68a8b1cb5fdf38dda348abb0ce651513ebe89960008e4c31f41df209ca1830da0a720e07f307#rd";
    });

})();