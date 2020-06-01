(function () {
    "use strict";
    var dom_btn = document.getElementById('btn'),
        wrapper = document.getElementById('wrapper'),
        progress = document.getElementById('progress'),
        dom_ping = document.getElementById('ping'),
        btn_box = document.getElementById('btn_box'),
        progress_box = document.getElementById('progress_box'),
        pointer = document.getElementById('pointer'),
        dom_money = document.getElementById('money'),
        dom_message = document.getElementById('message'),
        bag_skip = document.getElementById('bag_skip'),
        bot_fix = document.getElementById('bottom'),
        dom_rule = document.getElementById('rule'),
        dom_private = document.getElementById('private'),
        mask = document.getElementById('mask'),
        gold_box = document.getElementById('goldbox'),
        bag_box = document.getElementById('bag_box'),
        tip_one = document.getElementById('tip_one'),
        qpbag_top = document.getElementById('qpbag_top'),
        qpbag_bot = document.getElementById('qpbag_bot');
    var first = true,
        flag = false,
        act = false,
        needAlert = false,
        timer3 = null,
        timer2 = null; //needAlert 弹窗开关 act活动那个推广开关

    //签到相关
    var weekSignFlag = sessionStorage.weekSignFlag === 'undefined' ? '0' : sessionStorage.weekSignFlag, //是否开户自然周签到，1:开启、0或空:关闭
        weekSignDays = sessionStorage.weekSignDays === 'undefined' ? '' : sessionStorage.weekSignDays, //当前周已签到周几集合
        weekSignEarnFlag = sessionStorage.weekSignEarnFlag === 'undefined' ? '0' : sessionStorage.weekSignEarnFlag, //周签到红包是否已领取，1:已领取、0未领取  2领取签到红包
        weekSignEarnMoney = sessionStorage.weekSignEarnMoney === 'undefined' ? '' : sessionStorage.weekSignEarnMoney, //周签到红包金额
        weekSignLimitDay = sessionStorage.weekSignLimitDay === 'undefined' ? '' : sessionStorage.weekSignLimitDay, //周签到天数限制
        weekSignDiffDay = sessionStorage.weekSignDiffDay === 'undefined' ? '' : sessionStorage.weekSignDiffDay, //周签到还差天数
        weekSignPopup = sessionStorage.weekSignPopup === 'undefined' ? '' : sessionStorage.weekSignPopup, //自然周签到弹出提示，1:弹出提示、0或空:不弹出"
        weekSignPercent = sessionStorage.weekSignPercent === 'undefined' ? '' : sessionStorage.weekSignPercent; //周签到完成百分比

    var dayScanNum = sessionStorage.dayScanNum === 'undefined' ? '' : sessionStorage.dayScanNum;

    if (new Date().getTime() > 1514563200000 && new Date().getTime() < 1514822400000 && dayScanNum == '1') {
        act = true;
    }

    if ((weekSignPopup == 1 && weekSignEarnFlag != 1) || act == true) {
        needAlert = true;
    }

    var hbopenid = sessionStorage.openid === undefined ? '' : sessionStorage.openid;
    var args = vge.urlparse(location.href),
        openid = args.openid,
        bizcode = args.bizcode;
    var newMoney = Number(sessionStorage.currentMoney === undefined ? '' : sessionStorage.currentMoney);
    newMoney = newMoney.toFixed(2);
    dom_money.innerHTML = newMoney;
    if (sessionStorage.codeContentUrl) dom_message.src = sessionStorage.codeContentUrl;
    var chu_mon = sessionStorage.totalAccountMoney === undefined ? 0 : sessionStorage.totalAccountMoney;

    dom_rule.addEventListener('click', function () {
        _hmt.push(['_trackEvent', 'click', '查看活动规则', 'getcash']);
        location.href = 'http://mp.weixin.qq.com/s?__biz=MzI1NTQ5MzA2Mw==&mid=100000003&idx=1&sn=6a7dd1bcae7ec35f8776e6a292a814b1&chksm=6a3457ab5d43debd0242f9296daec0c6019b51a235778c97805836f18e70ae044999cf45eec7#rd';
    }, false);
    dom_private.addEventListener('click', function () {
        _hmt.push(['_trackEvent', 'click', '查看隐私说明', 'getcash']);
        location.href = 'http://mp.weixin.qq.com/s?__biz=MzI1NTQ5MzA2Mw==&mid=100000005&idx=1&sn=e3a9e4ec229d970d429759cd14014433&chksm=6a3457ad5d43debbe4c4571cd37fda1682cd4cd5caab71faaf9931430143fb3d414cc39688c4#rd';
    }, false);

    var reg1 = /^1[0-9]{10}$/,
        reg2 = /^[1-9][0-9xX]{17}$/,
        reg3 = /^[0-9]{4}$/;

    mask.addEventListener('click', function () {
        _hmt.push(['_trackEvent', 'click', '知道了去我的', 'getcash']);
        //	    location.href='http://'+location.host+'/qpzj/too/mybag'; // 2016-10-09 14:10:29 
        mask.style.display = 'none';
        ifremeber();
    }, false);

    function active() {
        document.getElementsByClassName('active_tip')[0].style.display = 'none';
        bag_skip.addEventListener('touchstart', function () {
            $('#bag_skip').unbind();
            _hmt.push(['_trackEvent', 'click', '查看红包去我的', 'getcash']);
            ifremeber();
        }, false);

        if (parseInt(chu_mon) >= 1) {
            dom_btn.addEventListener('click', function () {
                _hmt.push(['_trackEvent', 'click', '点击提现按钮', 'getcash']);
                if (sessionStorage.again == 'second') {
                    title_tip('提 示', '红包已经领取啦！再扫几瓶试试手气', '我知道了');
                    return;
                }
                if (first) {
                    // title_tip('提 示','微信提现升级中，您可先扫码，红包会自动累积哦','我知道了');
                    //调取发红包接口
                    give_spack();
                    first = false;
                }
            }, false);
        }

    }

    // var chu_mon=1.7;
    function active_prograss() {
        var fix_two = parseFloat(chu_mon).toFixed(2);
        pointer.innerHTML = '￥' + chu_mon;
        var folat_mon = parseFloat(fix_two);

        function rander() {
            progress.style.width = (parseInt(progress.style.width) + 1) + '%';
            if ((parseInt(pointer.style.left)) >= 90) {
                pointer.style.left = pointer.style.left;
            } else {
                pointer.style.left = (parseInt(pointer.style.left) + 1) + '%';
            }
            if (parseInt(progress.style.width) >= 3 && parseInt(progress.style.width) <= 97) {
                dom_ping.style.left = (parseInt(progress.style.width) - 3 + 1) + '%';
            } else {
                dom_ping.style.left = dom_ping.style.left;
            }
        }
        window.requestAnimationFrame(active_pro);

        function active_pro() {
            if (folat_mon / 1 < 1) {
                if (folat_mon * 100 > parseInt(progress.style.width)) {
                    rander();
                    window.requestAnimationFrame(active_pro);
                } else {
                    window.cancelAnimationFrame(active_pro);
                }
            } else {
                if (parseInt(progress.style.width) < 100) {
                    rander();
                    window.requestAnimationFrame(active_pro);
                } else {
                    window.cancelAnimationFrame(active_pro);
                    progress.style.cssText = '-webkit-transition:all 1s;transition:all 1s;';
                    dom_btn.style.cssText = '-webkit-transition:all 1s;transition:all 1s;';
                    btn_box.style.cssText = '-webkit-transition:all 1s;transition:all 1s;';
                    pointer.style.cssText = '-webkit-transition:all 1s;transition:all 1s; position:absolute; top:0px; left:90%;';
                    progress.style.width = '100%';
                    progress.style.borderRadius = '4px';
                    progress.style.backgroundColor = '#EA554F';
                    dom_btn.style.color = '#fff';
                    dom_btn.innerHTML = '立即提现';
                    dom_btn.style.fontSize = '18px';
                    btn_box.style.backgroundColor = '#EA554F';
                    pointer.style.background = 'url(/v/qpzj/img/icon_red.png) 59% 42px no-repeat';
                    pointer.style.backgroundSize = '24%';
                    pointer.style.color = '#EA554F';
                    dom_ping.style.display = 'none';
                    tip_one.innerHTML = '您的累计中奖金额大于1元啦，点击下面按钮把钱拿走吧。';
                }
            }
        }
    }

    function rander2(x, y) {
        x = Math.floor(Math.random() * 100);
        y = Math.ceil(Math.random() * 100);
        if (y < 10) {
            y = '0' + y;
        } else if (y.toString().charAt(1) === '0') {
            y = y.toString().charAt(0);
        }
        dom_money.innerHTML = x + '.' + y;
    }

    function mon_suiji(cb) {
        var n = false,
            x = 0,
            y = 0;
        var timer = setTimeout(function () {
            n = true;
        }, 1500);
        var timer1 = setInterval(function () {
            if (!n) {
                rander2(x, y);
            } else {
                dom_money.innerHTML = sessionStorage.currentMoney === undefined ? '' : sessionStorage.currentMoney;
                if (sessionStorage.currentMoney == 0) {
                    document.getElementsByClassName('moneytip')[0].innerHTML = '离红包只差一点点！<br />再扫一罐试试吧';
                    document.getElementsByClassName('moneynum')[0].style.display = 'none';
                }
                clearInterval(timer1);
                clearTimeout(timer);
                cb();
            }
        }, 80);
    }

    //	document.getElementsByClassName('active')[0].addEventListener('click',active,false);

    if (sessionStorage.old !== undefined) {
        gold_box.style.display = 'none';
        bag_box.style.display = 'none';
        wrapper.style.display = 'block';
        active_prograss();
    } else {
        gold_box.addEventListener('click', function () {
            _hmt.push(['_trackEvent', 'click', '点击拆红包', 'getcash']);
            //			if(sessionStorage.monthPrizeFlag=='1'){//忠实消费者页面
            //				$('.give_box').css('display','block');
            //			}
            //			active();
            //			var timer4 = setTimeout(function(){//活动推广
            //				document.getElementsByClassName('active_tip')[0].style.display = 'block';
            //			},3000);
            gold_box.children[0].style.cssText = 'width: 26%; height: ' + window.goldheight + 'px; position: relative; list-style: none; -webkit-transform-style: preserve-3d; -webkit-animation:move 1s ease-in 0s 1 normal; border-radius: 100%; box-shadow:1px 1px 3px 0px rgba(57,54,54,0.8);';
            var timer2 = setTimeout(function () {
                qpbag_top.style.cssText = 'position: absolute; z-index: 11; -webkit-animation: move2 0.5s linear; -webkit-animation-fill-mode: forwards; ';
                qpbag_bot.style.cssText = 'position: absolute; z-index: 10; -webkit-animation: move3 0.5s linear; -webkit-animation-fill-mode: forwards; ';
                clearTimeout(timer2);
            }, 1000);
            var timer3 = setTimeout(function () {
                gold_box.style.display = 'none';
                bag_box.style.display = 'none';
                wrapper.style.display = 'block';
                clearTimeout(timer3);
                mon_suiji(active_prograss);
                sessionStorage.old = true;
            }, 1500);
        }, false);
    }

    $('#gold').on('animationend', function () {
        if (weekSignFlag == 1) { //签到开启
            timer3 = setTimeout(function () {
                $('.sign_logo').css('display', 'block'); //签到按钮
                if (weekSignEarnFlag == 1) { //已领取
                    $('.sign_title').attr('src', '/v/qpzj/img2/sign_title_2.png');
                    $('.sign_logo').css({
                        'background': 'url(/v/qpzj/img2/sign_ed.png) no-repeat right',
                        '-webkit-background-size': ' auto 100%'
                    });
                } else {
                    $('.light').css('visibility', 'visible');
                    $('#weekSignEarnMoney').css('display', 'none');
                    $('.sign_tip').html('本周签到达' + weekSignLimitDay + '天，可额外获得红包1个！');
                    $('.sign_cash').css({
                        'background': 'url(/v/qpzj/img2/sign_cash.png) no-repeat bottom',
                        '-webkit-background-size': '100% auto'
                    });
                }
                $('.sign_logo').on('click', function () {
                    _hmt.push(['_trackEvent', 'click', '查看签到红包', 'getcash']);
                    $('#sign,.content').css('display', 'block');
                });
                $('.sign_alert').on('click', function () { //签到天数提醒
                    $(this).css('display', 'none');
                    $('.content').css('display', 'block');
                });
                $('.close').on('click', function () {
                    $('#sign').css('display', 'none');
                });
            }, 1000);
        }
        if (needAlert) { //需要弹窗推广
            timer2 = setTimeout(function () {
                active();
                if (weekSignPopup == 1 && weekSignEarnFlag != 1) { //每天首次 且未领取签到红包就会弹出提示
                    if (weekSignEarnFlag == 2) {
                        $('#sign,.getSignCash').css('display', 'block');
                        $('.getSignCash').on('click', function () {
                            weekSignEarnFlag = '1';
                            $('#sign,.light,.getSignCash').css('display', 'none');
                            $('.content').css('display', 'block');
                            $('.sign_title').attr('src', '/v/qpzj/img2/sign_title_2.png');
                            $('.sign_logo').css({
                                'background': 'url(/v/qpzj/img2/sign_ed.png) no-repeat right',
                                '-webkit-background-size': ' auto 100%'
                            });
                            $('.sign_tip,#weekSignEarnMoney').css('display', 'block');
                            $('.sign_cash').css({
                                'background': 'url(/v/qpzj/img2/sign_cash_open.png) no-repeat bottom',
                                '-webkit-background-size': '100% auto'
                            });
                        });
                    } else {
                        $('#sign,.sign_alert').css('display', 'block');
                    }
                    if (act) {
                        $('.active_tip').css('display', 'block');
                        $('.active_tip').on('click', function () {
                            $(this).css('display', 'none');
                        });
                    }
                } else { //活动推送（手动）
                    if (act) {
                        $('.active_tip').css('display', 'block');
                        $('.active_tip').on('click', function () {
                            $(this).css('display', 'none');
                        });
                    }
                }
            }, 3500);
        } else {
            active();
        }
    });

    if (bizcode == 0) {
        //进度条
        $('.progress').html((weekSignLimitDay - weekSignDiffDay) + '/' + weekSignLimitDay);
        $('#progress2').css('width', weekSignPercent * 7.8 / 100 + 'rem');
        $('.days').html(weekSignLimitDay - weekSignDiffDay + '天');
        $('#weekSignEarnMoney').html(weekSignEarnMoney + '元');
        $('.weekSignEarnMoney').html('<span>' + weekSignEarnMoney + '</span>元');

        if (weekSignDays != '') {
            weekSignDays = weekSignDays.split(',').sort();
        }
        if (weekSignDays.length > 0) {
            for (var i = 0; i < weekSignDays[weekSignDays.length - 1]; i++) { //打叉
                document.getElementsByClassName('checks')[i].style.backgroundImage = 'url(/v/qpzj/img2/frok.png)';
            }
        }
        for (var j = 0; j < weekSignDays.length; j++) { //打√
            document.getElementsByClassName('checks')[weekSignDays[j] - 1].style.backgroundImage = 'url(/v/qpzj/img2/check.png)';
        }

    }

    //忠实消费者相关
    $('.give_box').on('click', '#close', function () {
        if (sessionStorage.submited) {
            $('.give_box').css('display', 'none');
        } else {
            $('.pic_box').attr('src', '/v/qpzj/img/give_box_1.png?v=1');
            $('.give_alert').css('display', 'block');
            $('.give_alert').on('click', '.leave', function () {
                $('.give_box').css('display', 'none');
            });
            $('.give_alert').on('click', '.continue', function () {
                $('.give_alert').css('display', 'none');
                $('.pic_box').attr('src', '/v/qpzj/img/give_box_2.png?v=1');
            });
        }
    });
    $('#tj').on('click', function () {
        if (flag) return;
        if ($('#user').val() === '' || $('#user').val().indexOf(' ') !== -1) {
            title_tip('提 示', '请输入正确的姓名哦！~', '我知道了');
        } else if (!reg1.test($('#tel').val())) {
            title_tip('提 示', '请填写正确的手机号！~', '我知道了');
        } else if ($('#address').val() === '') {
            title_tip('提 示', '请填写正确的地址信息！~', '我知道了');
        } else {
            //调提交接口
            $('#tj').html('<img src="/v/sxqp/img/loading.gif" class="loading"/>');
            prizeFlag();
        }
    });

    function prizeFlag() {
        _hmt.push(['_trackEvent', 'click', '忠实消费者', 'getcash']);
        var javai = vge.common + '/vjifenInterface/user/saveMonthPrize';
        var req = { "projectServerName": "zhejiang",
            "openid": openid, //浙江
            "hbopenid": hbopenid, //v积分
            "unionid": sessionStorage.unionid === undefined ? '' : sessionStorage.unionid,
            "username": $('#user').val(),
            "phonenum": $('#tel').val(),
            "address": $('#address').val()
        };
        vge.callJApi(javai, req, function (jo) {
            if (jo.result.code == '0') {
                if (jo.result.businessCode === '0') {
                    sessionStorage.submited = 'submited';
                    sessionStorage.removeItem('monthPrizeFlag');
                    $('#tj').html('提交成功');
                    $('#user').attr('readonly', 'readonly');
                    $('#tel').attr('readonly', 'readonly');
                    $('#address').attr('readonly', 'readonly');
                    flag = true;
                } else if (jo.result.businessCode === '1') { //1
                    $('#tj').html('提交信息');
                    flag = false;
                    title_tip('提 示', jo.result.msg, '我知道了');
                } else {
                    $('#tj').html('提交信息');
                    flag = false;
                    title_tip('尊敬的用户', jo.result.msg, '我知道了');
                }
            } else { //code!='0'
                flag = false;
                $('#tj').html('提交信息');
                title_tip('尊敬的用户', jo.result.msg, '我知道了');
            }
        });
    }

    //game
    $('.game1').on('click', function () { //真心话大冒险
        location.href = 'http://' + location.host + '/v/game/game_1.html';
    });
    $('.game2').on('click', function () { //骰子
        location.href = 'http://' + location.host + '/v/dice/index.html';
    });

    function give_spack() {
        _hmt.push(['_trackEvent', 'click', '发送提现请求', 'getcash']);
        var javai = vge.common + '/vjifenInterface/gifts/getGiftspack';
        var req = { "projectServerName": "zhejiang",
            "openid": openid, //浙江
            "hbopenid": hbopenid, //v积分
            "unionid": sessionStorage.unionid === undefined ? '' : sessionStorage.unionid
        };
        vge.callJApi(javai, req, function (jo) {
            if (jo.result.code == '0') {
                if (jo.result.businessCode === '0') {
                    sessionStorage.totalAccountMoney = 0;
                    sessionStorage.again = 'second';
                    mask.style.display = 'block';
                } else if (jo.result.businessCode === '1') { //1
                    title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
                } else if (jo.result.businessCode === '2') { //1
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                } else if (jo.result.businessCode === '3') { //1
                    title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
                } else if (jo.result.businessCode === '-2') { //-2
                    title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
                } else if (jo.result.businessCode === '-1') { //1
                    title_tip('提 示', '系统升级中...', '我知道了');
                } else if (jo.result.businessCode === '4') {
                    title_tip('尊敬的用户', '提现处理中，请稍后查看详细记录!', '我知道了');
                } else if (jo.result.businessCode === '5') { //5
                    title_tip('尊敬的用户', jo.result.msg, '我知道了');
                } else {
                    title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
                    first = true;
                }
            } else { //code!='0'
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                first = true;
            }
        });
    }

    function ifremeber() {
        var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.qpzjappid;
        vge.ajxget(requrl, 5000, function (r) {
            try {
                var o = JSON.parse(r);
                if (o.subscribe == '0') { //未关注
                    active();
                    window.location.replace('http://' + location.host + '/v/qpzj/attention.html');
                } else { //已关注用户
                    active();
                    window.location.replace('http://' + location.host + '/qpzj/too/mybag');
                }
            } catch (e) {
                vge.clog('errmsg', [requrl, e]);
            }
        }, function (err) {
            vge.clog('errmsg', [requrl, err]);
        });
    }
})();