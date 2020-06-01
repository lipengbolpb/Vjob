window.onload = function () {
    /**
     * 定义各项参数
     */
    var config = { //配置项参数
        spackPort: vge.hnqp + '/DBTHuaNQPInterface/gifts/getGiftspack',
        appid: vge.hnqpappid,
        project: 'hnqp-FIFA',
        ruleUrl: 'https://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502815464&idx=1&sn=110c5ba4b768541ad16fc9177b24275e&chksm=087298363f051120ff0e7252c385d5605f03def0e1711b464d83886cca60cad25af92846700e#rd',
        explainUrl: 'https://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502815466&idx=1&sn=c3da08cec49d4b1e4c86f0d291191675&chksm=087298343f0511224872c4686e29b0871e73de12c69ae15a40d0a5bd232071a38503eeb2fc4f#rd'
    };
    // $('.game1').on('click', function () {
    //     location.href = 'http://' + location.host + '/v/xaqp-common/game/game_1.html';
    // });
    var args = vge.urlparse(location.href),
        bizcode = args.bizcode,
        hbopenid = args.openid,
        openid = sessionStorage.openid === undefined ? '' : sessionStorage.openid,
        currentMoney = sessionStorage.currentMoney === undefined ? '' : sessionStorage.currentMoney,
        totalAccountMoney = sessionStorage.totalAccountMoney === undefined ? '' : sessionStorage.totalAccountMoney,
        codeContentUrl = sessionStorage.codeContentUrl === undefined ? '' : sessionStorage.codeContentUrl,
        earnTime = sessionStorage.earnTime === undefined ? '' : sessionStorage.earnTime,
        again = sessionStorage.again === undefined ? 'false' : sessionStorage.again,
        activityVersion = sessionStorage.activityVersion === undefined ? '' : sessionStorage.activityVersion,
        kbUrl = sessionStorage.kbUrl === undefined ? '' : sessionStorage.kbUrl,
        STRCODE = sessionStorage.STRCODE === undefined ? '' : sessionStorage.STRCODE,
        tx = true,
        flag = true,
        first = true;
    /**
     * 页面的初始化展示
     */
    function init() {
        //判断是否是0元
        if (Number(currentMoney) === 0) {
            $('.msg').css('display', 'none');
            $('.cashZero').css('display', 'block');
        } else {
            $('.money').text(currentMoney);
        }
        // 判断首扫or重复扫
        if (bizcode == 11 || again == 'true') {
            $('.msg').css('display', 'none');
            $('.cashZero').css('display', 'block');
            $('.cashZero').find('p').eq(0).text('您已扫过');
            $('.cashZero').find('p').eq(1).html('每瓶仅限<br>扫码一次');
            if (sessionStorage.earnTime == '') {
                $('.notice').html('您已扫过这瓶酒<br>并获得<span class="earnMoney">¥' + currentMoney + '元</span>');
            } else {
                $('.notice').html('您已于<span class="earnTime">' + earnTime + '</span>扫过这瓶酒<br>并获得<span class="earnMoney">¥' + currentMoney + '元</span>');
            }
            if (Number(totalAccountMoney) >= 1) {
                $('.btn').val('立即提现');
            } else {
                $('.btn').val('存入我的零钱包');
            }
            $('.cash').css('display', 'block');
            events();
        } else {
            if (Number(totalAccountMoney) >= 1) {
                $('.notice').html('温馨提示：您的红包累计金额为' + totalAccountMoney + '元，<br>点击上方按钮把钱拿走吧！');
                $('.btn').val('立即提现');
            } else {
                $('.btn').val('存入我的零钱包');
            }
            $('.get').css('display', 'block');
            $('.get').on('click', open);
        }
    }

    function open() {
        $('.get').unbind('click');
        if (first) {
            first = false;
            sessionStorage.again = true;
            if (STRCODE == 'true') { //从输入串码进入，模拟拆红包
                animationenCup();
            } else { //否则调接口
                loading();
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
                        loaded();
                        if (res.result.code == '0') {
                            switch (res.result.businessCode) {
                                case '0': // 普通奖
                                    currentMoney = res.reply.currentMoney;
                                    totalAccountMoney = res.reply.totalAccountMoney;
                                    earnTime = res.reply.earnTime;
                                    sessionStorage.again = false;
                                    sessionStorage.totalAccountMoney = res.reply.totalAccountMoney;
                                    sessionStorage.currentMoney = res.reply.currentMoney;
                                    sessionStorage.weekSignFlag = res.reply.weekSignFlag; //是否开户自然周签到，1:开启、0或空:关闭
                                    sessionStorage.weekSignDays = res.reply.weekSignDays; //当前周已签到周几集合
                                    sessionStorage.weekSignEarnFlag = res.reply.weekSignEarnFlag; //周签到红包是否已领取，1:已领取、0未领取
                                    sessionStorage.weekSignEarnMoney = res.reply.weekSignEarnMoney; //周签到红包金额
                                    sessionStorage.weekSignLimitDay = res.reply.weekSignLimitDay; //周签到天数限制
                                    sessionStorage.weekSignDiffDay = res.reply.weekSignDiffDay; //周签到还差天数
                                    sessionStorage.weekSignPercent = res.reply.weekSignPercent; //进度百分比
                                    sessionStorage.weekSignPopup = res.reply.weekSignPopup; //自然周签到弹出提示
                                    sessionStorage.earnTime = res.reply.earnTime === undefined ? '' : res.reply.earnTime; //扫码时间
                                    sessionStorage.dayScanNum = res.reply.dayScanNum;
                                    // K币
                                    sessionStorage.kbUrl = res.reply.kbUrl === undefined ? '' : res.reply.kbUrl;
                                    // 捆绑促销
                                    sessionStorage.promotionFlag = res.reply.promotionFlag === undefined ? '' : res.reply.promotionFlag; //用户是否开启自然周签到，1:开启、0或空:关闭
                                    sessionStorage.promotionPopup = res.reply.promotionPopup === undefined ? '' : res.reply.promotionPopup; //自然周签到弹出提示，1:弹出提示、0或空:不弹出
                                    sessionStorage.setItem('promotionCogAry', JSON.stringify(res.reply.promotionCogAry));
                                    //判断是否是0元
                                    if (Number(currentMoney) === 0) {
                                        $('.msg').css('display', 'none');
                                        $('.cashZero').css('display', 'block');
                                    } else {
                                        $('.money').text(currentMoney);
                                    }
                                    if (Number(totalAccountMoney) >= 1) {
                                        $('.notice').html('温馨提示：您的红包累计金额为' + totalAccountMoney + '元，<br>点击上方按钮把钱拿走吧！');
                                        $('.btn').val('立即提现');
                                    } else {
                                        $('.btn').val('存入我的零钱包');
                                    }
                                    animationenCup();
                                    break;
                                case '7': // 大奖
                                    sessionStorage.username = res.reply.username === undefined ? '' : res.reply.username;
                                    sessionStorage.phonenum = res.reply.phonenum === undefined ? '' : res.reply.phonenum;
                                    sessionStorage.idcard = res.reply.idcard === undefined ? '' : res.reply.idcard;
                                    sessionStorage.skukey = res.reply.skukey === undefined ? '' : res.reply.skukey;
                                    sessionStorage.prizeVcode = res.reply.prizeVcode === undefined ? '' : res.reply.prizeVcode;
                                    sessionStorage.grandPrizeType = res.reply.grandPrizeType;
                                    if (res.reply.grandPrizeType == 'p' || res.reply.grandPrizeType == 'P') {
                                        location.replace('http://' + location.host + '/v/' + config.project + '/prize.html?bizcode=' + res.result.businessCode);
                                    } else if (res.reply.grandPrizeType == '1' || res.reply.grandPrizeType == '2') {
                                        location.replace('http://' + location.host + '/v/hnqp20171205/prize.html?bizcode=' + res.result.businessCode);
                                    } else {
                                        title_tip('尊敬的用户', '扫码异常', '我知道了');
                                    }
                                    break;
                                case '15': //他人重复扫大奖
                                    sessionStorage.grandPrizeType = res.reply.grandPrizeType === undefined ? '' : res.reply.grandPrizeType;
                                    sessionStorage.earnTime = res.reply.earnTime === undefined ? '' : res.reply.earnTime; //扫码时间
                                    if (res.reply.grandPrizeType == '1' || res.reply.grandPrizeType == '2') {
                                        location.replace('http://' + location.host + '/v/hnqp20171205/prize.html?bizcode=' + res.result.businessCode);
                                    } else if (res.reply.grandPrizeType == 'p' || res.reply.grandPrizeType == 'P') {
                                        location.replace('http://' + location.host + '/v/' + config.project + '/prize.html?bizcode=' + res.result.businessCode);
                                    }
                                    // location.replace('http://' + location.host + '/v/' + config.project + '/prize.html?bizcode=' + res.result.businessCode);
                                    break;
                                case '11': // 自己重复扫，普通奖
                                    sessionStorage.totalAccountMoney = res.reply.totalAccountMoney;
                                    sessionStorage.currentMoney = res.reply.currentMoney;
                                    sessionStorage.codeContentUrl = res.reply.codeContentUrl;
                                    sessionStorage.earnTime = res.reply.earnTime === undefined ? '' : res.reply.earnTime;
                                    location.replace('http://' + location.host + '/' + config.project + '/txo/getcash?bizcode=' + res.result.businessCode);
                                    break;
                                case '12': // 可疑
                                    location.replace('http://' + location.host + '/v/' + config.project + '/getMsg.html?bizcode=' + res.result.businessCode);
                                    break;
                                case '13': // 黑名单
                                    location.replace('http://' + location.host + '/v/' + config.project + '/getMsg.html?bizcode=' + res.result.businessCode);
                                    break;
                                case '14': // 指定
                                    location.replace('http://' + location.host + '/v/' + config.project + '/getMsg.html?bizcode=' + res.result.businessCode);
                                    break;
                                default:
                                    if (res.reply) {
                                        sessionStorage.batchName = res.reply.batchName === undefined ? '' : res.reply.batchName;
                                        sessionStorage.earnTime = res.reply.earnTime === undefined ? '' : res.reply.earnTime;
                                        sessionStorage.msg = res.result.msg;
                                    } else {
                                        sessionStorage.earnTime = '';
                                    }
                                    location.replace('http://' + location.host + '/v/' + config.project + '/fail.html?bizcode=' + res.result.businessCode);
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
        }
    }

    function animationenCup() {
        sessionStorage.again = true;
        $('.getCoco').addClass('animationCocoUp');
        $('.getFootball').addClass('animationJump');
        $('.getColor').fadeIn(120);
        setTimeout(function () {
            $('.milk1').css('display', 'block');
            setTimeout(function () {
                $('.milk1').css('display', 'none');
                $('.milk2').css('display', 'block');
                setTimeout(function () {
                    $('.milk2').css('display', 'none');
                    $('.milk3').css('display', 'block');
                    $('.foam').addClass('animationFlow');
                    $('.get').fadeOut(2000);
                    $('.cash').fadeIn(2000);
                    kbUrl = sessionStorage.kbUrl;
                    setTimeout(function () {
                        if (Number(totalAccountMoney) < 1 && kbUrl != '' && kbUrl != undefined && kbUrl != 'undefined') {
                            $('.ad').fadeIn(function () {
                                $('.adClose').on('click', function () {
                                    $('.ad').fadeOut();
                                });
                                $('.adFootball').on('click', function () {
                                    window.location.href = kbUrl;
                                    // title_tip('提 示', '敬请期待', '我知道了');
                                });
                            });
                        }
                        events();
                    }, 1500);
                }, 150);
            }, 150);
        }, 900);
    }

    function events() {
        //活动规则
        $('.rule').on('touchstart', function () {
            window.location.href = config.ruleUrl;
        });
        //隐私说明
        $('.explain').on('touchstart', function () {
            window.location.href = config.explainUrl;
        });
        //提现成功后判断关注
        $('.mask').on('touchstart', function () {
            $('.mask').css('display', 'none');
            ifremeber();
        });
        $('.btn').on('touchstart', function () {
            totalAccountMoney = sessionStorage.totalAccountMoney;
            if (Number(totalAccountMoney) >= 1) {
                if (tx) {
                    tx = false;
                    $('#loading').css('display', 'block');
                    give_spack();
                }
            } else {
                if (flag) {
                    ifremeber();
                }
            }
        });
    }

    /* 提现 */
    function give_spack() {
        var javai = config.spackPort;
        var req = {
            "openid": openid,
            "hbopenid": hbopenid
        };
        $.ajax({
            type: "POST",
            url: javai,
            data: JSON.stringify(req),
            dataType: 'json',
            success: function (jo, status, xhr) {
                $('.loading').css('display', 'none');
                if (jo.result.code == '0') {
                    if (jo.result.businessCode === '0') {
                        sessionStorage.totalAccountMoney = 0;
                        flag = false;
                        tx = false;
                        $('.hb').css('display', 'none');
                        $('.mask').css('display', 'block');
                        $('.btn').val('我知道了');
                        $('.notice').css('display', 'none');
                        $('.link').css('display', 'none');
                        $('#sale_icon').css('display', 'none');
                        $('#sign_logo').css('display', 'none');
                        if (kbUrl != '' && kbUrl != undefined && kbUrl != 'undefined') {
                            setTimeout(function () {
                                $('.ad').fadeIn(function () {
                                    $('.adClose').on('click', function () {
                                        $('.ad').fadeOut();
                                    });
                                    $('.adFootball').on('click', function () {
                                        window.location.href = kbUrl;
                                        // title_tip('提 示', '敬请期待', '我知道了');
                                    });
                                    flag = true;
                                });
                            }, 1000);
                        } else {
                            flag = true;
                        }
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
            },
            error: function (res, status, xhr) {
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            }
        });
    }
    /* 判断关注 */
    function ifremeber() {
        var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + config.appid;
        vge.ajxget(requrl, 5000, function (r) {
            try {
                var o = JSON.parse(r);
                if (o.subscribe == '0') { //未关注
                    window.location.replace('http://' + location.host + '/v/' + config.project + '/attention.html');
                } else { //已关注用户
                    window.location.replace('http://' + location.host + '/' + config.project + '/too/mybag');
                }
            } catch (e) {
                vge.clog('errmsg', [requrl, e]);
            }
        }, function (err) {
            vge.clog('errmsg', [requrl, err]);
        });
    }

    function loading() {
        $('#loading').css('display', 'block');
    }

    function loaded() {
        $('#loading').css('display', 'none');
    }

    $(document).ready(function () {
        init();
    });
};