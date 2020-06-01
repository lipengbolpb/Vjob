(function () {
	'use strict';
    var CHECKCODE_PORT = vge.hbqp + '/DBTHBQPInterface/user/getCaptcha';
    var SUBMESSAGE_PORT = vge.hbqp + '/DBTHBQPInterface/user/updateUserInfoMobile';
    var SWEEP_PORT = vge.hbqp + '/DBTHBQPInterface/sweep/sweepQrcode';
    var PROJECT = 'hbqp-FIFA';
    var PHONE_NUM = '0311-66600300';
    var NAME = '青岛啤酒乐享河北';

    var openid = sessionStorage.openid,
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
            "sendtype": 1
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
        var javai = SUBMESSAGE_PORT;
        var req = {
            "openid": openid,
            "phonenum": $('#tel').val(),
            "captcha": $('#yz_code').val()
        };
        vge.callJApi(javai, req, function (jo) {
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
        });
    }


    function sweep() {
        if (flag) {
            flag = false;
            var japi = SWEEP_PORT;
            var req = {
                "openid": openid,
                "sweepstr": qr,
                "longitude": sessionStorage.longitude === undefined ? '00' : sessionStorage.longitude, //"经度"
                "latitude": sessionStorage.latitude === undefined ? '00' : sessionStorage.latitude //"纬度"
            };
            vge.clog('debug', [japi, JSON.stringify(req)]);
            vge.callJApi(japi, req, cbk);
        }
    }

    function cbk(jo) {
        if (jo.result.code == '0') {
            switch (jo.result.businessCode) {
                case '0': // 普通奖
                    sessionStorage.activityVersion = jo.reply.activityVersion;
                    sessionStorage.weekSignFlag = jo.reply.weekSignFlag; //是否开户自然周签到，1:开启、0或空:关闭
                    sessionStorage.weekSignDays = jo.reply.weekSignDays; //当前周已签到周几集合
                    sessionStorage.weekSignEarnFlag = jo.reply.weekSignEarnFlag; //周签到红包是否已领取，1:已领取、0未领取
                    sessionStorage.weekSignEarnMoney = jo.reply.weekSignEarnMoney; //周签到红包金额
                    sessionStorage.weekSignLimitDay = jo.reply.weekSignLimitDay; //周签到天数限制
                    sessionStorage.weekSignDiffDay = jo.reply.weekSignDiffDay; //周签到还差天数
                    sessionStorage.weekSignPercent = jo.reply.weekSignPercent; //进度百分比
                    sessionStorage.weekSignPopup = jo.reply.weekSignPopup; //自然周签到弹出提示
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    sessionStorage.earnTime = jo.reply.earnTime;
                    sessionStorage.kbUrl = jo.reply.kbUrl === undefined ? '' : jo.reply.kbUrl;
                    // 捆绑促销
                    sessionStorage.promotionFlag = jo.reply.promotionFlag === undefined ? '' : jo.reply.promotionFlag; //用户是否开启自然周签到，1:开启、0或空:关闭
                    sessionStorage.promotionPopup = jo.reply.promotionPopup === undefined ? '' : jo.reply.promotionPopup; //自然周签到弹出提示，1:弹出提示、0或空:不弹出
                    sessionStorage.setItem('promotionCogAry', JSON.stringify(jo.reply.promotionCogAry));
                    location.replace('http://' + location.host + '/' + PROJECT + '/txo/getcash?bizcode=' + jo.result.businessCode);
                    break;
                case '11': // 自己重复扫，普通奖
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    sessionStorage.earnTime = jo.reply.earnTime;
                    location.replace('http://' + location.host + '/' + PROJECT + '/txo/getcash?bizcode=' + jo.result.businessCode);
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
                    sessionStorage.username = jo.reply.username === undefined ? '' : jo.reply.username;
                    sessionStorage.phonenum = jo.reply.phonenum === undefined ? '' : jo.reply.phonenum;
                    sessionStorage.idcard = jo.reply.idcard === undefined ? '' : jo.reply.idcard;
                    sessionStorage.skukey = jo.reply.skukey;
                    sessionStorage.prizeVcode = jo.reply.prizeVcode;
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    location.replace('http://' + location.host + '/v/' + PROJECT + '/prize.html?bizcode=' + jo.result.businessCode);
                    break;
                case '15': //他人重复扫大奖
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
                    location.replace('http://' + location.host + '/v/' + PROJECT + '/prize.html?bizcode=' + jo.result.businessCode);
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
    }
})();