(function () {
    'use strict';
    var CHECKCODE_PORT = vge.common + '/vjifenInterface/user/getCaptcha';
    var SUBMESSAGE_PORT = vge.common + '/vjifenInterface/user/updateUserInfoMobile';
    var SWEEP_PORT = vge.common + '/vjifenInterface/sweep/sweepQrcode';
    var PROJECT = 'gxqp-common2.0';
    var PHONE_NUM = '0771-3806691';
    var NAME = '青岛啤酒广西';

    var openid = sessionStorage.vjifenOpenid,
        qr = sessionStorage.qr,
        flag = true;

    var args = vge.urlparse(location.href),
        bizcode = args.bizcode;

    var get_yz = document.getElementById("get_yz");
    var countdowntimer = null;

    var reg1 = /^1[0-9]{10}$/,
        reg2 = /^[1-9][0-9xX]{17}$/,
        reg3 = /^[0-9]{4}$/;

    $(document).ready(function () { //防止虚拟键盘弹出后页面布局被压缩
        $('body').height($('body')[0].clientHeight);
    });

    if (bizcode == 12) { //可疑
        document.getElementById('wrap').style.display = 'block';
        document.getElementById("wrap1").style.display = 'none';
    } else if (bizcode == 13) { //黑名单
        document.getElementById("wrap1").style.display = 'block';
        document.getElementById('wrap').style.display = 'none';
    } else if (bizcode == 14) { //与12相同
        document.getElementById('wrap').style.display = 'block';
        document.getElementById("wrap1").style.display = 'none';
    }

    document.getElementById('tips').textContent = '客服电话：' + PHONE_NUM;
    document.getElementById('content').innerHTML = '您的账号存在可疑风险，为确保您的账号安全，<br>1.请先长按识别下方公众号二维码<br>关注【' + NAME + '】公众号<br>2.联系客服，电话：' + PHONE_NUM;

    $('#tj').on('click', function () {
        if (!reg1.test($('#tel').val())) {
            title_tip('提 示', '请填写正确的手机号！~', '我知道了');
        } else if (!reg3.test($('#yz_code').val())) {
            title_tip('提 示', '请填写正确的验证码！~', '我知道了');
        } else {
            //调提交接口
            sub_message();
        }
    });

    function countdown(tag, time) {
        var i = time;
        tag.innerHTML = i + '秒';
        countdowntimer = setInterval(function () {
            i--;
            tag.innerHTML = i + '秒';
            if (i === 0) {
                tag.innerHTML = '获取验证码';
                i = 60;
                clearInterval(countdowntimer); // 清除定时器
                get_yz.addEventListener("click", getYzcode, false); //恢复计时器
                countdowntimer = null;
            }
        }, 1000);
    }
    get_yz.addEventListener('click', getYzcode, false);

    function getYzcode() {
        get_yz.removeEventListener('click', getYzcode, false);
        if (!reg1.test($('#tel').val())) {
            title_tip('提 示', '请填写正确的手机号！~', '我知道了');
            get_yz.addEventListener('click', getYzcode, false);
        } else {
            if (get_yz.innerHTML === '获取验证码') {
                getCheckCode(function () {
                    countdown(get_yz, 60);
                });
            } else {
                get_yz.removeEventListener('click', getYzcode, false);
            }
        }
    }

    function getCheckCode(cb) { // 获取手机验证码
        document.getElementsByClassName('loading')[0].style.display = 'block';
        var javai = CHECKCODE_PORT;
        var myoption = {
            "phonenum": $('#tel').val(),
            "sendtype": 1, 
            "projectServerName": "guangxi",
        };
        myoption = JSON.stringify(myoption);
        $.post(javai, myoption, function (jo) {
            console.log(jo);
            document.getElementsByClassName('loading')[0].style.display = 'none';
            if (jo.result.code == '0') {
                if (jo.result.businessCode == '0') {
                    //成功，开始倒计时
                    cb();
                } else if (jo.result.businessCode === '2') { //1
                    title_tip('尊敬的用户', '您填写的手机号错误，发送验证码失败！', '我知道了');
                    get_yz.addEventListener('click', getYzcode, false);
                } else {
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    get_yz.addEventListener('click', getYzcode, false);
                }
            } else { //code!='0'
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                get_yz.addEventListener('click', getYzcode, false);
            }
        });
    }

    function sub_message() { // 提交信息
        $('.loading').css('display', 'block');
        var javai = SUBMESSAGE_PORT;
        var req = { "projectServerName": "guangxi",
            "openid": openid,
            "phonenum": $('#tel').val(),
            "captcha": $('#yz_code').val()
        };
        $.ajax({
            type: "POST",
            url: javai,
            data: JSON.stringify(req),
            dataType: 'json',
            success: function (jo, status, xhr) {
                $('.loading').css('display', 'none');
                if (jo.result.code === '0') {
                    if (jo.result.businessCode === '0') {
                        $('#tj').unbind('click');
                        sweep();
                    } else if (jo.result.businessCode == '1') { //1
                        title_tip('提 示', '系统开了个小差', '我知道了');
                    } else if (jo.result.businessCode == '2') { //2
                        title_tip('提 示', '手机号码已存在', '我知道了');
                    } else if (jo.result.businessCode == '-1') { //-1
                        title_tip('提 示', '系统升级中...', '我知道了');
                    } else if (jo.result.businessCode == '3') { //
                        title_tip('提 示', '手机号验证失败', '我知道了');
                    } else {
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    }
                } else { //code!='0'
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            },
            error: function (res, status, xhr) {
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            }
        });
    }


    function sweep() {
        if (flag) {
            flag = false;
            var japi = SWEEP_PORT;
            var req = { "projectServerName": "guangxi",
                "openid": sessionStorage.vjifenOpenid,
                "vjifenOpenid": sessionStorage.vjifenOpenid,
                "sweepstr": qr,
                "longitude": sessionStorage.longitude === undefined ? '00' : sessionStorage.longitude, //"经度"
                "latitude": sessionStorage.latitude === undefined ? '00' : sessionStorage.latitude //"纬度"
            };
            $.ajax({
                type: "POST",
                url: japi,
                data: JSON.stringify(req),
                dataType: 'json',
                success: function (jo, status, xhr) {
                    if (jo.result.code == '0') {
                        if (jo.reply) {
                            sessionStorage.activityVersion = jo.reply.activityVersion;
                            sessionStorage.skukey = jo.reply.skukey === undefined ? '' : jo.reply.skukey;
                            if (jo.reply.activityVersion === '2') {
                                PROJECT = 'gxqp20171214';
                            } else if (jo.reply.activityVersion === '3') {
                                PROJECT = 'gxqp201703';
                            } else if (jo.reply.activityVersion === '4') {
                                PROJECT = 'gxqp-common2.0';
                            } else if (jo.reply.activityVersion === '5') {
                                PROJECT = 'gxqp-FIFA';
                            } else {
                                PROJECT = 'gxqp-common2.0';
                            }
                        }
                        switch (jo.result.businessCode) {
                            case '0': // 普通奖
                                sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                                sessionStorage.currentMoney = jo.reply.currentMoney;
                                sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                                sessionStorage.earnTime = jo.reply.earnTime;
                                //签到
                                sessionStorage.weekSignFlag = jo.reply.weekSignFlag; //用户是否开启自然周签到，1:开启、0或空:关闭
                                sessionStorage.weekSignPopup = jo.reply.weekSignPopup; //自然周签到弹出提示，1:弹出提示、0或空:不弹出
                                sessionStorage.setItem('signCogAry', JSON.stringify(jo.reply.signCogAry));
                                // K币
                                // sessionStorage.kbUrl = jo.reply.kbUrl === undefined ? '' : jo.reply.kbUrl;
                                // 捆绑促销
                                sessionStorage.promotionFlag = jo.reply.promotionFlag === undefined ? '' : jo.reply.promotionFlag; //用户是否开启自然周签到，1:开启、0或空:关闭
                                sessionStorage.promotionPopup = jo.reply.promotionPopup === undefined ? '' : jo.reply.promotionPopup; //自然周签到弹出提示，1:弹出提示、0或空:不弹出
                                sessionStorage.setItem('promotionCogAry', JSON.stringify(jo.reply.promotionCogAry));
                                // location.replace('http://' + location.host + '/' + PROJECT + '/txo/getcash?bizcode=' + jo.result.businessCode);
                                location.replace('http://' + location.host + '/' + PROJECT + '/txo/getcash?bizcode=' + jo.result.businessCode);
                                break;
                            case '11': // 自己重复扫，普通奖
                                sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                                sessionStorage.currentMoney = jo.reply.currentMoney;
                                sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                                sessionStorage.earnTime = jo.reply.earnTime;
                                if (project == 'gxqp-FIFA' || project == 'gxqp-common2.0') {
                                    location.replace('http://' + location.host + '/' + PROJECT + '/txo/getcash?bizcode=' + jo.result.businessCode);
                                } else {
                                    location.replace('http://' + location.host + '/' + PROJECT + '/txo/repcash?bizcode=' + jo.result.businessCode);
                                }
                                break;
                            case '12': // 可疑用户
                                location.replace('http://' + location.host + '/v/' + PROJECT + '/getMsg.html?bizcode=' + jo.result.businessCode);
                                break;
                            case '13': // 黑名单
                                location.replace('http://' + location.host + '/v/' + PROJECT + '/getMsg.html?bizcode=' + jo.result.businessCode);
                                break;
                            case '14': // 与12相同
                                location.replace('http://' + location.host + '/v/' + PROJECT + '/getMsg.html?bizcode=' + jo.result.businessCode);
                                break;
                            case '7': // 大奖
                                if (jo.reply !== undefined) {
                                    if (jo.reply.username !== undefined) {
                                        sessionStorage.username = jo.reply.username;
                                        sessionStorage.idcard = jo.reply.idcard;
                                        sessionStorage.phonenum = jo.reply.phonenum;
                                        sessionStorage.skukey = jo.reply.skukey;
                                        sessionStorage.vqr = jo.reply.prizeVcode;
                                        sessionStorage.gpt = jo.reply.grandPrizeType;
                                        sessionStorage.grandPrizeType = jo.reply.grandPrizeType;
                                    } else { // 未填写过信息
                                        sessionStorage.skukey = jo.reply.skukey;
                                        sessionStorage.vqr = jo.reply.prizeVcode;
                                        sessionStorage.gpt = jo.reply.grandPrizeType;
                                        sessionStorage.grandPrizeType = jo.reply.grandPrizeType;
                                    }
                                } else {
                                    sessionStorage.username = '信息查询失败 no reply';
                                }
                                // location.replace('http://' + location.host + '/v/' + project + '/prize.html?bizcode=' + jo.result.businessCode);
                                if (jo.reply.grandPrizeType == '1' || jo.reply.grandPrizeType == '2') { //金银元宝
                                    location.replace('http://' + location.host + '/v/gxqp20171214/prize.html?bizcode=' + jo.result.businessCode);
                                } else if (jo.reply.grandPrizeType == '0') { //歌诗达游轮
                                    location.replace('http://' + location.host + '/v/gxqp201703/prize.html?bizcode=' + jo.result.businessCode);
                                } else if (jo.reply.grandPrizeType == 'p' || jo.reply.grandPrizeType == 'P') {
                                    if (jo.reply.activityVersion === '5') { //世界杯
                                        location.replace('http://' + location.host + '/v/gxqp-FIFA/prize.html?bizcode=' + jo.result.businessCode);
                                    } else {
                                        location.replace('http://' + location.host + '/v/gxqp-common2.0/prize.html?bizcode=' + jo.result.businessCode);
                                    }
                                } else {
                                    title_tip('尊敬的用户', '扫码异常', '我知道了');
                                }
                                break;
                            case '15': //他人重复扫大奖
                                if (jo.reply) {
                                    sessionStorage.earnTime = jo.reply.earnTime;
                                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType;
                                    sessionStorage.gpt = jo.reply.grandPrizeType;
                                }
                                // location.replace('http://' + location.host + '/v/' + project + '/prize.html?bizcode=' + jo.result.businessCode);
                                if (jo.reply.grandPrizeType == '1' || jo.reply.grandPrizeType == '2') { //金银元宝
                                    location.replace('http://' + location.host + '/v/gxqp20171214/prize.html?bizcode=' + jo.result.businessCode);
                                } else if (jo.reply.grandPrizeType == '0') { //歌诗达游轮
                                    location.replace('http://' + location.host + '/v/gxqp201703/checkPrize.html?bizcode=' + jo.result.businessCode);
                                } else if (jo.reply.grandPrizeType == 'p' || jo.reply.grandPrizeType == 'P') {
                                    if (jo.reply.activityVersion === '5') { //世界杯
                                        location.replace('http://' + location.host + '/v/gxqp-FIFA/prize.html?bizcode=' + jo.result.businessCode);
                                    } else {
                                        location.replace('http://' + location.host + '/v/gxqp-common2.0/prize.html?bizcode=' + jo.result.businessCode);
                                    }
                                } else {
                                    title_tip('尊敬的用户', '扫码异常', '我知道了');
                                }
                                break;
                            default:
                                if (jo.reply) {
                                    sessionStorage.batchName = jo.reply.batchName === undefined ? '' : jo.reply.batchName;
                                    sessionStorage.earnTime = jo.reply.earnTime;
                                }
                                location.replace('http://' + location.host + '/v/' + PROJECT + '/fail.html?bizcode=' + jo.result.businessCode);
                        }
                    } else if (jo.result.code == '-1') { //code !=0;
                        title_tip('尊敬的用户', '系统升级中，请稍后再试！', '我知道了');
                    } else {
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    }
                },
                error: function (res, status, xhr) {
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            });
        }
    }

})();