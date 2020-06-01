(function () {
    'use strict';
    var SPACK_PORT = vge.jlqp + '/DBTJLQPInterface/gifts/getGiftspack';
    var APPID = vge.jlqpappid;
    var PROJECT = 'jlqp-common';
    var RULE_URL = 'https://mp.weixin.qq.com/s?__biz=MzUxNDg5OTU3Nw==&mid=100000678&idx=1&sn=ff0449525974872d9b6189bf29fd7805&chksm=79bfa8b04ec821a6ebe5f6cb1aaa1f9f6466eb2837fb1edcee2d94db59104ad9c28f7a8bb2ca#rd';
    var EXPLAIN_URL = 'https://mp.weixin.qq.com/s?__biz=MzUxNDg5OTU3Nw==&mid=100000070&idx=1&sn=d4d0c676e1ea5114668fab93fcc70f1d&chksm=79bfaa504ec82346e9b8a039cfe2c0cb485a7f71f87ea2d638bd04a22a282be417e687927cd8#rd';
	
	if(sessionStorage.activityVersion=='5'){//纯干
		RULE_URL = 'https://mp.weixin.qq.com/s?__biz=MzUxNDg5OTU3Nw==&mid=100001024&idx=1&sn=424173f414b5ec747bb44e933fee3205&chksm=79bfae164ec8270088382ebde702918fc76256eebe9b553ff0e18aad762136959b4fd5d74596#rd';
		EXPLAIN_URL = 'https://mp.weixin.qq.com/s?__biz=MzUxNDg5OTU3Nw==&mid=100001026&idx=1&sn=53173ae0e27246b031950bdf11778f40&chksm=79bfae144ec82702957751ce4394ae19165f2e79765e8a068d31086fd244d49f86bf34070cfe#rd';
	}
	
    /* 定义各项参数 */
    var currentMoney = sessionStorage.currentMoney,
        totalAccountMoney = sessionStorage.totalAccountMoney,
        codeContentUrl = sessionStorage.codeContentUrl,
        earnTime = sessionStorage.earnTime,
        openid = sessionStorage.openid,
        args = vge.urlparse(location.href),
        bizcode = args.bizcode,
        hbopenid = args.openid,
        first = sessionStorage.first === undefined ? true : sessionStorage.first,
        again = sessionStorage.again === undefined ? false : sessionStorage.again,
        activityVersion = sessionStorage.activityVersion === undefined ? '' : sessionStorage.activityVersion,
        tx = true,
        act = true,
        needAlert = false,
        dayScanNum = sessionStorage.dayScanNum;
		
    var weekSignFlag = sessionStorage.weekSignFlag === 'undefined' ? '0' : sessionStorage.weekSignFlag, //是否开户自然周签到，1:开启、0或空:关闭
        weekSignDays = sessionStorage.weekSignDays === 'undefined' ? '' : sessionStorage.weekSignDays, //当前周已签到周几集合
        weekSignEarnFlag = sessionStorage.weekSignEarnFlag === 'undefined' ? '0' : sessionStorage.weekSignEarnFlag, //周签到红包是否已领取，1:已领取、0未领取  2领取签到红包
        weekSignEarnMoney = sessionStorage.weekSignEarnMoney === 'undefined' ? '' : sessionStorage.weekSignEarnMoney, //周签到红包金额
        weekSignLimitDay = sessionStorage.weekSignLimitDay === 'undefined' ? '' : sessionStorage.weekSignLimitDay, //周签到天数限制
        weekSignDiffDay = sessionStorage.weekSignDiffDay === 'undefined' ? '' : sessionStorage.weekSignDiffDay, //周签到还差天数
        weekSignPopup = sessionStorage.weekSignPopup === 'undefined' ? '' : sessionStorage.weekSignPopup, //自然周签到弹出提示，1:弹出提示、0或空:不弹出"
        weekSignPercent = sessionStorage.weekSignPercent === 'undefined' ? '' : sessionStorage.weekSignPercent; //周签到完成百分比
    sessionStorage.isPopAd = 'true';//弹广告页之前禁止拆红包


    if ((weekSignPopup == 1 && weekSignEarnFlag != 1) || act == true) {
        needAlert = true;
    }

    // ! function () { //页面初始化     
    // }();

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
        events();
        // $('#jw_icon').css('display', 'block');
        if (Number(totalAccountMoney) >= 1) {
            $('.notice').html('温馨提示：您的红包累计金额为' + totalAccountMoney + '元，<br>点击上方按钮把钱拿走吧！');
            $('#btn').val('立即提现');
            $('#repbtn').val('立即提现');
        } else {
            $('#btn').val('查看红包余额');
            $('#repbtn').val('查看红包余额');
        }
        $('.repcash').css('display', 'block');
        if (sessionStorage.earnTime == '') {
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
        $('.get').css('display', 'block');

        // 广告区域
        // 经典8度500*6箱啤：241510936-001
        // 经典8度500*6箱啤【2019】：241510936-004
        // 国庆节宣传页
        if (new Date().getTime() > new Date(2019,8,27).getTime() && new Date().getTime() < new Date(2019,9,8).getTime() && Number(dayScanNum) < 3 && sessionStorage.isPopAd =='true' && (sessionStorage.skukey =='241510936-001' || sessionStorage.skukey =='241510936-004')) { //9.28~10.7撤销，每天弹两次
            $('#active .activeImg').attr('src','/v/jlqp-common/img/20191001.jpg')				
            setTimeout(function() {	
                $('#active').css('display', 'block');
                $('#active .activeclose').on('click', function(event) {
                    event.stopPropagation();
                    $('#active').css('display', 'none');	
                });
                sessionStorage.isPopAd =false;
            }, 1000);	
        } else{
            sessionStorage.isPopAd =false;
        }
    }

    //拆红包
    $('.hbGet,.open').on('click', function () {
        if(sessionStorage.isPopAd=='true'){
			return false;
		}
        $('.open').addClass('kai');
        sessionStorage.again = 'true';
        setTimeout(function () {
            $('.get').fadeOut();
            $('.cash').fadeIn();
            initClipboard && initClipboard();
            cb();
        }, 1000);
		if(Date.parse(new Date())<Date.parse(new Date(2020,0,10))){//十号之前
			setTimeout(function(){
				$('.taocd').fadeIn(1);
			},2500);
			$('.close_cd').on('click',function(){
				$('.taocd').fadeOut(1);
			})
			$('.caidan').on('click',function(){
				var clipboard = new ClipboardJS('.caidan');
				clipboard.on('success', function(e) {
				    console.log(e);
					title_tip('提 示', '复制口令成功！', '我知道了');
				});
				clipboard.on('error', function(e) {
				    console.log(e);
				});
			});
		}
    });
	
    //签到
    function cb() {
        setTimeout(function () {
            if (weekSignFlag == 1) { //签到开启
                var timer = setTimeout(function () {
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
                        $('#sign,.content').css('display', 'block');
                    });
                    $('.sign_alert').on('click', function () { //签到天数提醒
                        $(this).css('display', 'none');
                        $('.content').css('display', 'block');
                    });
                    $('.close').on('click', function () {
                        $('#sign').css('display', 'none');
                    });
                }, 700);
            }
            if (needAlert) { //需要弹窗推广
                var timer = setTimeout(function () {
                    events();
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
                    } else { //活动推送（手动）
                        if (act) {
                            if (new Date().getTime()<new Date(2019,7,18).getTime()) { //8.17下线
                            	document.getElementById('active').style.display = 'block';
                            	document.getElementById('activeclose').addEventListener('click', function () {
                            		document.getElementById('active').style.display = 'none';
                            	}, false);
                            }
                        }
                    }
                }, 500);
            } else {
                events();
            }
        }, 1000);
    }
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
            document.getElementsByClassName('checks')[i].style.backgroundImage = 'url(/v/sdqp-common/img2/frok.png)';
        }
        for (var j = 0; j < weekSignDays.length; j++) { //打√
            document.getElementsByClassName('checks')[weekSignDays[j] - 1].style.backgroundImage = 'url(/v/sdqp-common/img2/check.png)';
        }
    }

    function events() {
        //活动规则
        $('.rule').on('click', function () {
            window.location.href = RULE_URL;
        });
        //隐私说明
        $('.explain').on('click', function () {
            window.location.href = EXPLAIN_URL;
        });
        //提现成功后判断关注
        $('.mask').on('click', function () {
            $('.mask').css('display', 'none');
            ifremeber();
        });
        $('#btn,#repbtn').on('click', function () {
            if (Number(totalAccountMoney) >= 1) {
                if (tx) {
                    tx = false;
                    $('#loading').css('display', 'block');
                    give_spack();
                }
            } else {
                ifremeber();
            }
        });
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
    }

    /* 提现 */
    function give_spack() {
        var javai = SPACK_PORT;
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
                        tx = false;
                    } else if (jo.result.businessCode === '1') { //1
                        title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
                        tx = true;
                    } else if (jo.result.businessCode === '2') { //1
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                        tx = true;
                    } else if (jo.result.businessCode === '4') { //1
                        title_tip('提现处理中，请稍后查看详细记录', '我知道了');
                        tx = true;
                    } else if (jo.result.businessCode === '3') { //1
                        title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
                        tx = true;
                    } else if (jo.result.businessCode === '-1') { //-1
                        title_tip('提 示', '系统升级中...', '我知道了');
                        tx = true;
                    } else if (jo.result.businessCode === '-2') { //-1
                        title_tip('提 示', '提现操作过于频繁', '我知道了');
                        tx = true;
                    } else if (jo.result.businessCode === '5') { //5
                        title_tip('尊敬的用户', jo.result.msg, '我知道了');
                        tx = true;
                    } else {
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                        tx = true;
                    }
                } else if (jo.result.code == '-1') {
                    title_tip('尊敬的用户', '系统升级中...', '我知道了');
                    tx = true;
                } else { //code!='0'
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    tx = true;
                }
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
                    window.location.replace('http://' + location.host + '/' + PROJECT + '/too/mybag');
                }
            } catch (e) {
                vge.clog('errmsg', [requrl, e]);
            }
        }, function (err) {
            vge.clog('errmsg', [requrl, err]);
        });
    }
    //酒王战绩
    // $('#jw_icon').on('click', function () {
    //     $('#jiuw_box').fadeIn(1, function () {
    //         $('#jiuw_box div').css('bottom', '0rem');
    //     });
    //     $('#jiuw_box .close').on('click', function () {
    //         $('#jiuw_box div').css('bottom', '-11rem');
    //         $('#jiuw_box').fadeOut(1);
    //     });
    // });


    // 送酒上门按钮
    addNewBtn();

    function addNewBtn() {
        if (bizcode == 11 || again == 'true') {
            $('#btn-to-home').css('display', 'none');
            console.log($('#btn-to-home'));
        }
        $('#btn-to-home').click(function () { 
            setTimeout(function () {
                window.location.href = 'https://mp.weixin.qq.com/s/gqPTq-6Wp7mec5r2uchuVA';
            }, 10);
            _hmt.push(['_trackEvent', 'click', '领取红包页', '点击送酒上门按钮-吉林']);
        })
    }



    /***********618彩蛋***********/

    if (bizcode == 11 || again == 'true') {
        initClipboard && initClipboard();
    } else if (isInTimeRange && isInTimeRange()) {

        specialDialog && specialDialog('/v/qmbp/img/618/dialog-2020-618.png');
    }

    function initClipboard() {
        var taoEasterEgg = sessionStorage.taoEasterEgg;
        var taoFlag = sessionStorage.taoMemberOrderFlag;
        if (!taoEasterEgg) {
            return
        }

        var htmlStr = '';
        setTimeout(function () {
            $('.taocd618').fadeIn();
        }, 1000);
        if ($('.taocd618').length) {
            $('.taocd618').fadeIn();
        } else {
            var caidan = '<div class="taocd618" style="width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.8);position: absolute;top: 0;left: 0;z-index: 99;display:none;"><div style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;"><div class="cdbox618" style="height: 12.5rem;position: relative;margin-top:-1.6rem;"><input type="text" id="tkl618" value="easterEggFlag" readonly style="position:absolute; top:2rem;left:1rem; z-index:-1;opacity:0;"/><img src="/v/qmbp/img/618/i2020618-caidan.png" class="caidan618"   style="width: 13.44rem; height: auto;"><img class="close_cd618" src="/v/qmbp/img/618/dialog-2020-close.png" style="height: 1.24rem;width:1.24rem;position:absolute; top:0rem;right:0.8rem;"><img class="copy_cd618 copy-caidan" src="/v/qmbp/img/618/i2020618-btn.png" style="height: 1.62rem;width:7.04rem;position:absolute; top:8.5rem;left:50%;margin-left: -3.77rem;" data-clipboard-action="copy" data-clipboard-target="#tkl618"></div></div></div>';


            var ruhui = '<div class="taocd618" style="width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.8);position: absolute;top: 0;left: 0;z-index: 99;display:none;"><div style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;"><div class="cdbox618" style="height: 12.5rem;position: relative;margin-top:-1.6rem;"><input type="text" id="tkl618" value="easterEggFlag" readonly style="position:absolute; top:2rem;left:1rem; z-index:-1;opacity:0;"/><img src="/v/qmbp/img/618/i2020618-kouling.png" class="caidan618"   style="width: 14rem; height: auto;"><img class="close_cd618" src="/v/qmbp/img/618/dialog-2020-close.png" style="height: 1.24rem;width:1.24rem;position:absolute; top:0.24rem;right:1rem;"><img class="copy_cd618 copy-caidan" src="/v/qmbp/img/618/i2020618-btn.png" style="height: 1.62rem;width:7.04rem;position:absolute; top:8.6rem;left:50%;margin-left: -3.77rem;" data-clipboard-action="copy" data-clipboard-target="#tkl618"></div></div></div>';

            if (taoFlag == 1) {
                htmlStr = ruhui;
                console.log('入会');

            } else {
                htmlStr = caidan;
                console.log('彩蛋');
            }
            htmlStr = htmlStr.replace('easterEggFlag', taoEasterEgg);

            $('body').append(htmlStr);
            setTimeout(function () {
                $('.taocd618').fadeIn();
                $('.close_cd618').on('click', function () {
                    $('.taocd618').fadeOut();
                });

                $('.copy_cd618').click(function () {
                    console.log('caidan click');
                    var clipboard = new ClipboardJS('.copy_cd618');
                    clipboard.on('success', function (e) {
                        console.log(e);
                        $('.taocd618').fadeOut();
                        setTimeout(function () {
                            toast('复制口令成功')
                        }, 100);
                    });
                    clipboard.on('error', function (e) {
                        console.log(e);
                    });
                });
            }, 1000);


        }


    }

    function specialDialog(dialogImg, id) { //
        var dayScanNum = sessionStorage.dayScanNum;
        if (Number(dayScanNum) !== Number(dayScanNum) || dayScanNum > 3) {
            return
        }
        sessionStorage.isPopAd = true;
        var specialIdName = 'spexx' + (id || 'xts');
        var specialId = '#' + specialIdName;
        if ($('#btn2020Close').length) {
            $(specialId).fadeIn();
            $(specialId + ' .dialog-img').attr('src', dialogImg);
            sessionStorage.isPopAd = false;
        } else {
            var dialogStr = '<div id="' + specialIdName + '" style="width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.8);position: absolute;top: 0;left: 0;z-index: 99;display: none;"><div style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;"><div style="width: 75%;"><img class="dialog-img" src="' + dialogImg + '" alt="" style="width: 100%; height: auto; position: relative; z-index: 2;"><div id="btn2020Close" style="width: 2rem; height: 2rem; background:url(/v/qmbp/img/618/dialog-2020-close.png) no-repeat center top; background-size: 1.24rem 1.24rem;margin: 0.1rem auto 0;"></div></div></div></div>'


            $('body').append(dialogStr);
            setTimeout(function () {
                $(specialId).fadeIn();
                sessionStorage.isPopAd = false;
                $('#btn2020Close').click(function () {

                    $(specialId).fadeOut();
                })
            }, 500);
        }
    }
    // 判断是否在5月25至6月20日之间
    function isInTimeRange() {
        var startTime = new Date(2020, 4, 25).setHours(0, 0, 0);
        var endTime = new Date(2020, 5, 20).setHours(23, 59, 59);
        var curTime = new Date().getTime();

        if (curTime > startTime && curTime < endTime) {
            console.log(true);
            return true
        } else {
            console.log(false);
            return false
        }
        console.log(curTime, new Date(startTime), new Date(endTime));

    }

    function toast(txt) {
        $('#toast .weui_toast_content').html(txt);
        $('#toast').show();
        setTimeout(function () {
            $('#toast').hide();
        }, 2000);
    }
    /***********618彩蛋***********/
})();