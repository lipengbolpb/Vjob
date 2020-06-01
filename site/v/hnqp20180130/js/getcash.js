(function () {
    'use strict';
    ini_wxshare(vge.hnqpappid);
    /* 定义各项参数 */
    var currentMoney = sessionStorage.currentMoney,
        totalAccountMoney = sessionStorage.totalAccountMoney,
        codeContentUrl = sessionStorage.codeContentUrl,
        earnTime = sessionStorage.earnTime,
        openid = sessionStorage.openid,
        args = vge.urlparse(location.href),
        bizcode = args.bizcode,
        hbopenid = args.openid,
        tx = true,
        act = false,
        needAlert = false,
        repflag = true,
        STRCODE = sessionStorage.STRCODE === undefined ? '' : sessionStorage.STRCODE,
        again = sessionStorage.again === 'undefined' ? false : sessionStorage.again,
        activityVersion = sessionStorage.activityVersion === 'undefined' ? '' : sessionStorage.activityVersion,
        weekSignFlag = sessionStorage.weekSignFlag === 'undefined' ? '0' : sessionStorage.weekSignFlag, //是否开户自然周签到，1:开启、0或空:关闭
        weekSignDays = sessionStorage.weekSignDays === 'undefined' ? '' : sessionStorage.weekSignDays, //当前周已签到周几集合
        weekSignEarnFlag = sessionStorage.weekSignEarnFlag === 'undefined' ? '0' : sessionStorage.weekSignEarnFlag, //周签到红包是否已领取，1:已领取、0未领取  2领取签到红包
        weekSignEarnMoney = sessionStorage.weekSignEarnMoney === 'undefined' ? '' : sessionStorage.weekSignEarnMoney, //周签到红包金额
        weekSignLimitDay = sessionStorage.weekSignLimitDay === 'undefined' ? '' : sessionStorage.weekSignLimitDay, //周签到天数限制
        weekSignDiffDay = sessionStorage.weekSignDiffDay === 'undefined' ? '' : sessionStorage.weekSignDiffDay, //周签到还差天数
        weekSignPopup = sessionStorage.weekSignPopup === 'undefined' ? '' : sessionStorage.weekSignPopup, //自然周签到弹出提示，1:弹出提示、0或空:不弹出"
        weekSignPercent = sessionStorage.weekSignPercent === 'undefined' ? '' : sessionStorage.weekSignPercent; //周签到完成百分比
    if ((weekSignPopup == 1 && weekSignEarnFlag != 1) || act == true) {
        needAlert = true;
    }

    var params = {
        APPID: vge.hnqpappid, //公众号appid
        PROJECT: 'hnqp20180130', //项目名称
        SPACK_PORT: vge.hnqp + '/DBTHuaNQPInterface/gifts/getGiftspack', //提现接口
        RULE_URL: 'https://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502813444&idx=1&sn=de1a4e7434fc15e5f7bfdb65284f0012&chksm=087291da3f0518cc45bd77da201bf96bfd88cab6623861d2f148b61a4f240738987d60b83bfb#rd', //活动规则
        EXPLAIN_URL: 'http://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502813343&idx=1&sn=8b2760f63bc497a7dce4816749a2c57f&chksm=087290413f0519572fcaba5a59a1f76f660bb17be3dd9a39a97839236675d309c6123211dc65#rd' //隐私说明
    }

    var animate = {
        fireup: function () { //烟火升空
            $('.home-fireRight').addClass('fireupRight');
            $('.home-fireLeft').addClass('fireupLeft');
        },
        fireblast: function () { //烟火爆炸
            $('.home-blastRight').addClass('fireblastRight');
            $('.home-blastLeft').addClass('fireblastLeft');
        },
        showGet: function () { //显示拆红包页
            $('.home').fadeOut();
            $('.get').fadeIn();
        },
        kai: function () { //点击开按钮
            $('.open').addClass('kai');
            $('.open').on('animationend', function () {
                $('.get').fadeOut();
                $('.cash').fadeIn();
                $('#jw_icon').css('display','block');
                sign.signInit();
                sign.signOpen();
            });
        },
        launch: function () { //对联展开
            $('.coupletMaskLeft').addClass('launch');
            setTimeout(function () {
                $('.coupletMaskRight').addClass('launch');
            }, 800);
        },
        loading: function () {
            $('#loading').css('display', 'block');
        },
        loaded: function () {
            $('#loading').css('display', 'none');
        }
    }
    var sign = {
        signInit: function () {
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
                var weeks = new Date();
                weeks = (weeks.getDay() + 6) % 7;
                for (var i = 0; i < weeks; i++) { //打钩打叉
                    document.getElementsByClassName('checks')[i].style.backgroundImage = 'url(/v/' + params.PROJECT + '/img2/frok.png)';
                }
                for (var j = 0; j < weekSignDays.length; j++) { //打√
                    document.getElementsByClassName('checks')[weekSignDays[j] - 1].style.backgroundImage = 'url(/v/' + params.PROJECT + '/img2/check.png)';
                }
            }
        },
        signOpen: function () {
            if (weekSignFlag == 1) { //签到开启
                setTimeout(function () {
                    $('.sign_logo').css('display', 'block'); //签到按钮
                    if (weekSignEarnFlag == 1) { //已领取
                        $('.sign_title').attr('src', '/v/' + params.PROJECT + '/img2/sign_title_2.png');
                        $('.sign_logo').css({
                            'background': 'url(/v/' + params.PROJECT + '/img2/sign_ed.png) no-repeat right',
                            '-webkit-background-size': ' auto 100%'
                        });
                    } else {
                        $('.light').css('visibility', 'visible');
                        $('#weekSignEarnMoney').css('display', 'none');
                        $('.sign_tip').html('本周签到达' + weekSignLimitDay + '天，可额外获得红包1个！');
                        $('.sign_cash').css({
                            'background': 'url(/v/' + params.PROJECT + '/img2/sign_cash.png) no-repeat bottom',
                            '-webkit-background-size': '100% auto'
                        });
                    }
                    $('.sign_logo').on('click', function () {
                        $('#sign,.content').css('display', 'block');
                    });
                    $('.sign_alert').on('click', function () { //签到天数提醒
                        $('.sign_alert').css('display', 'none');
                        $('.content').css('display', 'block');
                    });
                    $('.close').on('click', function () {
                        $('#sign').css('display', 'none');
                    });
                }, 700);
            }
            if (needAlert) { //需要弹窗推广
                setTimeout(function () {
                    if (weekSignPopup == 1 && weekSignEarnFlag != 1) { //每天首次 且未领取签到红包就会弹出提示
                        if (weekSignEarnFlag == 2) {
                            $('#sign,.getSignCash').css('display', 'block');
                            $('.getSignCash').on('click', function () {
                                weekSignEarnFlag = '1';
                                $('#sign,.light,.getSignCash').css('display', 'none');
                                $('.content').css('display', 'block');
                                $('.sign_title').attr('src', '/v/hnqp20180130/img2/sign_title_2.png');
                                $('.sign_logo').css({
                                    'background': 'url(/v/hnqp20180130/img2/sign_ed.png) no-repeat right',
                                    '-webkit-background-size': ' auto 100%'
                                });
                                $('.sign_tip,#weekSignEarnMoney').css('display', 'block');
                                $('.sign_cash').css({
                                    'background': 'url(/v/hnqp20180130/img2/sign_cash_open.png) no-repeat bottom',
                                    '-webkit-background-size': '100% auto'
                                });
                            });
                        } else {
                            $('#sign,.sign_alert').css('display', 'block');
                        }
                    } else { //活动推送（手动）
                        // document.getElementById('active').style.display = 'block';
                        // document.getElementById('active').addEventListener('click', function() {
                        // 	document.getElementById('active').style.display = 'none';
                        // }, false);
                    }
                }, 2500);
            }
        }
    }
    //页面初始化
    var init = function () {
        if (Number(currentMoney) == 0) { //中奖金额为0
            $('.congratulate').html('离红包只差一点点<br>再扫一瓶试试');
            $('.congratulate').css({
                'margin': '2rem auto 0',
                'fontSize': '1rem'
            });
            $('.prize').css('display', 'none');
        } else {
            $('#money').html(currentMoney);
        }

        if (bizcode == 11 || again == 'true') { //重复扫
        	$('#jw_icon').css('display','block');
            if (Number(totalAccountMoney) >= 1) {
                // $('.notice').html('温馨提示：您的红包累计金额为' + totalAccountMoney + '元，<br>点击上方按钮把钱拿走吧！');
                $('#btn').val('立即提现');
                $('#repbtn').val('立即提现');
            } else {
                $('#btn').val('查看红包余额');
                $('#repbtn').val('查看红包余额');
            }
            $('.repcash').css('display', 'block');
            if (earnTime === '' || earnTime === undefined || earnTime === 'undefined') {
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
        }

    }
    /* 提现 */
    var give_spack = function () {
        var url = params.SPACK_PORT;
        var req = {
            "openid": openid,
            "hbopenid": hbopenid
        };
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(req),
            dataType: 'json',
            success: function (res, status, xhr) {
                console.log(res);
                animate.loaded();
                if (res.result.code == '0') {
                    if (res.result.businessCode === '0') {
                        $('.mask').css('display', 'block');
                        $('.sign_alert').css('display', 'none');
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
                } else if (res.result.code == '-1') { //code!='0'
                    title_tip('尊敬的用户', '系统升级中...', '我知道了');
                    tx = true;
                } else {
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    tx = true;
                }
            },
            error: function (res, status, xhr) {
                console.log(res);
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                tx = true;
            }
        });
    }
    /* 判断关注 */
    var ifremeber = function () {
        var req = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + params.APPID;
        vge.ajxget(req, 5000, function (r) {
            try {
                var o = JSON.parse(r);
                if (o.subscribe == '0') { //未关注
                    window.location.replace('http://' + location.host + '/v/' + params.PROJECT + '/attention.html');
                } else { //已关注用户
                    window.location.replace('http://' + location.host + '/' + params.PROJECT + '/too/mybag');
                }
            } catch (e) {
                vge.clog('errmsg', [req, e]);
            }
        }, function (err) {
            vge.clog('errmsg', [req, err]);
        });
    }

    window.onload = function () {
        //隐藏黄晓明！显示拆红包页面
        $('.home-blastLeft').on('animationend', function () {
            setTimeout(function () {
                animate.showGet();
            }, 1000);
        });
        animate.launch();
        wx.ready(function () {
            wx.hideOptionMenu(); // 隐藏微信右上角菜单
            if (bizcode == '0' && again != 'true') {
            	animate.fireup();
                animate.fireblast();
            	
//              var myaudio = document.getElementById('bgm');
//              myaudio.setAttribute('src', '/v/' + params.PROJECT + '/music/bgm.mp3?v=1');
//              myaudio.load();
//              myaudio.play();
//              myaudio.addEventListener("timeupdate", timeupdate, false);
//
//              function timeupdate() {
//                  if (myaudio.currentTime !== 0 && repflag) {
//                      repflag = false;
//                      myaudio.removeEventListener("timeupdate", timeupdate, false);
//                      animate.fireup();
//                      animate.fireblast();
//
//                      return;
//                  }
//              }
            }
        });
        //点击开红包
        $('.open').on('click', function () {
            $('.open').unbind('click');
            sessionStorage.again = true;
            if (STRCODE == 'true') { //从输入串码进入，模拟拆红包
                animate.kai();
            } else {
                animate.loading();
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
                        animate.loaded();
                        if (res.result.code == '0') {
                            var replace = params.PROJECT;
                            switch (res.result.businessCode) {
                                case '0': // 普通奖
                                    currentMoney = res.reply.currentMoney;
                                    totalAccountMoney = res.reply.totalAccountMoney;
                                    earnTime = res.reply.earnTime;
                                    sessionStorage.currentMoney = currentMoney;
                                    sessionStorage.totalAccountMoney = totalAccountMoney;
                                    sessionStorage.earnTime = earnTime;
                                    init();
                                    animate.kai();
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
        //活动规则
        $('.rule').on('click', function () {
            window.location.href = params.RULE_URL;
        });
        //隐私说明
        $('.explain').on('click', function () {
            window.location.href = params.EXPLAIN_URL;
        });
        //提现成功后判断关注
        $('.mask').on('click', function () {
            $('.mask').css('display', 'none');
            $('.sign_alert').css('display', 'block');
            ifremeber();
        });
        //提现按钮
        $('#btn,#repbtn').on('click', function () {
            if (Number(totalAccountMoney) >= 1) {
                if (tx) {
                    tx = false;
                    animate.loading();
                    give_spack();
                }
            } else {
                ifremeber();
            }
        });
        $('.game').on('click', function () {
            location.href = 'http://' + location.host + '/v/sxqp/game/index.html';
        });
        init();
        //酒王战绩
		$('#jw_icon').on('touchstart',function(){
			$('#jiuw_box').fadeIn(1,function(){
				$('#jiuw_box div').css('bottom','0rem');
			});
			$('#jiuw_box .close').on('touchstart',function(){
				$('#jiuw_box div').css('bottom','-11rem');
				$('#jiuw_box').fadeOut(1);
			});
		});
        $('.home').css('display', 'block');
    }
})();