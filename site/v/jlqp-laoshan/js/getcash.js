(function () {
    'use strict';
    var timer = null,
        i = 0,
        tx = false,
        flag = false;
    var openid = sessionStorage.openid === undefined ? '' : sessionStorage.openid,
        args = vge.urlparse(location.href),
        dom_btn = document.getElementById("btn"),
        hbopenid = args.openid,
        bizcode = sessionStorage.bizcode === undefined ? args.bizcode : sessionStorage.bizcode,
        currentMoney = sessionStorage.currentMoney === undefined ? '' : sessionStorage.currentMoney,
        totalAccountMoney = sessionStorage.totalAccountMoney === undefined ? '' : sessionStorage.totalAccountMoney;

    var dayScanNum = sessionStorage.dayScanNum;

    if (bizcode === '0') {
        $('.index').css('display', 'block');
        $('.cash').css('display', 'none');
        $('.money').html('¥<span>' + currentMoney + '</span>元');
    } else if (bizcode === '11') {
        $('.index').css('display', 'none');
        $('.cash').css('display', 'block');
        $('.money').html('<span>您已扫过</span>');
        $('.tip').html(sessionStorage.earnTime + '<br /><span>扫码并获得</span>' + currentMoney + '元')
    }

    $('.index').on('click', function () {
        if (sessionStorage.isPopAd == 'true') {
            return
        }
        $('.index').fadeOut();
        $('.cash').fadeIn(function () {
            initClipboard && initClipboard();
            // if (dayScanNum < 2 && bizcode === '0') {
            //     setTimeout(function () {
            //         //酒王
            //         $('#jw_box').fadeIn(10);
            //         $('#jw_box .jw_content img').eq(0).css({
            //             'top': '0',
            //             'opacity': 1
            //         });
            //         $('#jw_box .jw_content img').eq(1).css({
            //             'top': '1.2rem',
            //             'opacity': 1
            //         });
            //         $('#jw_box .jw_content img').eq(2).css({
            //             'top': '2.35rem',
            //             'opacity': 1
            //         });
            //         $('#jw_box .jw_content img').eq(3).css({
            //             'top': '4.75rem',
            //             'opacity': 1
            //         });
            //         $('.jw_person').addClass('move');
            //     }, 1500);
            // }
			if(Date.parse(new Date())<Date.parse(new Date(2020,0,10))){//十号之前
				setTimeout(function(){
					$('.taocd').fadeIn(1);
				},1500);
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
        sessionStorage.bizcode = 11;
    });

    if (totalAccountMoney < 1) {
        $('#btn').css({
            'background': 'url(/v/jlqp-laoshan/img/button_tobag.png?v=1) no-repeat center',
            '-webkit-background-size': 'auto 100%'
        });
        if (currentMoney == 0) {
            $('#btn').css({
                'background': 'url(/v/jlqp-laoshan/img/button_look.png?v=1) no-repeat center',
                '-webkit-background-size': 'auto 100%'
            });
            $('.money').html('<span>谢谢参与</span>');
        }
        if (bizcode === '11') {
            $('#btn').css({
                'background': 'url(/v/jlqp-laoshan/img/button_look.png?v=1) no-repeat center',
                '-webkit-background-size': 'auto 100%'
            });
        }
    } else {
        $('#btn').css({
            'background': 'url(/v/jlqp-laoshan/img/button_tx.png?v=1) no-repeat center',
            '-webkit-background-size': 'auto 100%'
        });
        $('#tip').html('您的红包累计金额为' + totalAccountMoney + '元，点击上方“立即提现”按钮把钱拿走吧')
    }

    dom_btn.addEventListener('click', dot, false);

    function dot() {
        dom_btn.removeEventListener('click', dot, false);
        setTimeout(function () {
            dom_btn.addEventListener('click', dot, false);
        }, 1000);
        if (sessionStorage.totalAccountMoney < 1) {
            subscribe();
        } else {
            $('#loading').css('display', 'block');
            give_spack();
        }
    }


    function give_spack() { //提现
        var javai = vge.jlqp + '/DBTJLQPInterface/gifts/getGiftspack';
        var req = {
            "openid": openid,
            "hbopenid": hbopenid
        };
        vge.callJApi(javai, req,
            function (jo) {
                $('#loading').css('display', 'none');
                if (jo.result.code == '0') {
                    if (jo.result.businessCode === '0') {
                        $('#alert').css('display', 'block');
                        sessionStorage.totalAccountMoney = '0';
                        $('#btn').css({
                            'background': 'url(/v/jlqp-laoshan/img/button_look.png?v=1) no-repeat center',
                            '-webkit-background-size': 'auto 100%'
                        });
                    } else if (jo.result.businessCode === '1') { //1
                        title_tip('提 示', '您的待提余额不足1元，再喝几瓶攒够1元发红包！', '我知道了');
                    } else if (jo.result.businessCode === '2') { //后台金额不足
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    } else if (jo.result.businessCode === '-2') { //-2
                        title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
                    } else if (jo.result.businessCode === '5') { //超限
                        title_tip('尊敬的用户', jo.result.msg, '我知道了');
                    } else if (jo.result.businessCode === '3') { //1
                        title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
                    } else if (jo.result.businessCode === '-1') { //-1
                        title_tip('提 示', '系统升级中...', '我知道了');
                    } else {
                        title_tip('尊敬的用户', jo.result.msg, '我知道了');
                    }
                } else { //code!='0'
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            });
    }

    $('#alert').on('click', function () {
        $('#alert').css('display', 'none');
        subscribe();
    });

    function subscribe() { //判断关注
        var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.jlqpappid;
        vge.ajxget(requrl, 5000, function (r) {
            try {
                var o = JSON.parse(r);
                if (o.subscribe == 0) { //未关注
                    window.location.replace('http://' + location.host + '/v/jlqp-laoshan/attention.html');
                } else { //已关注用户
                    window.location.replace('http://' + location.host + '/jlqp-laoshan/too/mybag');
                }
            } catch (e) {
                vge.clog('errmsg', [requrl, e]);
            }
        }, function (err) {
            vge.clog('errmsg', [requrl, err]);
        });
    }
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


    $('.rule').on('click', function () {
        location.href = "https://mp.weixin.qq.com/s?__biz=MzUxNDg5OTU3Nw==&mid=100000680&idx=1&sn=a2802d1062c78cc90981c50bec4f33db&chksm=79bfa8be4ec821a82dc2e7993534276cafc0747bddcfab98ac8223f1b1de6361d6bf51462550#rd";
    });
    $('.pravite').on('click', function () {
        location.href = "https://mp.weixin.qq.com/s?__biz=MzUxNDg5OTU3Nw==&mid=100000013&idx=1&sn=c13347acba4ea2ed7255cb68b3ad58be&chksm=79bfaa1b4ec8230dfda68ca4f1d7d0579383adab04f1fb731e85ade7880cb78db151ac6ffc96#rd";
    });


    // 送酒上门按钮
    addNewBtn();

    function addNewBtn() {
        if (bizcode == 11) {
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

    if (bizcode == 11) {
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
        sessionStorage.isPopAd = 'true';
        var specialIdName = 'spexx' + (id || 'xts');
        var specialId = '#' + specialIdName;
        if ($('#btn2020Close').length) {
            $(specialId).fadeIn();
            $(specialId + ' .dialog-img').attr('src', dialogImg);
            sessionStorage.isPopAd = false;
        } else {
            var dialogStr = '<div id="' + specialIdName + '" style="width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.8);position: absolute;top: 0;left: 0;z-index: 99;display: none;"><div style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;"><div style="width: 75%;"><img class="dialog-img" src="' + dialogImg + '" alt="" style="width: 100%; height: auto; position: relative; z-index: 2;"><div id="btn2020Close" style="width: 2rem; height: 2rem; background:url(/v/qmbp/img/618/dialog-2020-close.png) no-repeat center top; background-size: 1.24rem 1.24rem;margin: 0.5rem auto 0;"></div></div></div></div>'


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