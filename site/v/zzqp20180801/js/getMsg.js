(function () {
    var openid = sessionStorage.openid,
        qr = sessionStorage.sweepstr,
        flag = true;

    var args = vge.urlparse(location.href),
        bizcode = args.bizcode;

    var get_yz = document.getElementById("get_yz");
    var countdowntimer = null;

    var reg1 = /^1[0-9]{10}$/,
        reg2 = /^[1-9][0-9xX]{17}$/,
        reg3 = /^[0-9]{4}$/;

    if (bizcode == 12 || bizcode == 14) { //可疑和指定
        document.getElementById('wrap').style.display = 'block';
        document.getElementById("wrap1").style.display = 'none';
    } else if (bizcode == 13) { //黑名单
        document.getElementById("wrap1").style.display = 'block';
        document.getElementById('wrap').style.display = 'none';
    }

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
        var javai = vge.zzqp + '/DBTHNQPInterface/user/getCaptcha';
        var req = {
            "phonenum": $('#tel').val(),
            "sendtype": "1"
        };
        vge.callJApi(javai, req, function (jo) {
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
        var javai = vge.zzqp + '/DBTHNQPInterface/user/updateUserInfoMobile';
        var req = {
            "openid": openid,
            "phonenum": $('#tel').val(),
            "captcha": $('#yz_code').val()
        };
        vge.callJApi(javai, req, function (jo) {
            if (jo.result.code === '0') {
                if (jo.result.businessCode === '0') {
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
            var japi = vge.zzqp + '/DBTHNQPInterface/sweep/sweepQrcode';
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
        // if(!confirm('返回码:'+jo.result.businessCode+' 是否跳转')) {
        // 	return;
        // }
        var replace = '/v/zzqp20170815/index.html?bizcode=';
        if (jo.result.code == '0') {
            console.log(jo);
            if (jo.result.versionCode) {
                if (jo.result.versionCode == '1.17.0214') {
                    replace = '/v/zzqp0214/guifei.html?bizcode=';
                } else if (jo.result.versionCode == '2') { //集卡版
                    replace = '/v/zzqp20180401/getcash.html?bizcode=';
                    sessionStorage.sweepCode = jo.reply.sweepCode == undefined ? '' : jo.reply.sweepCode;
                    sessionStorage.currentMoney = jo.reply.currentMoney == undefined ? '' : jo.reply.currentMoney;
                    sessionStorage.currentJifen = jo.reply.currentJifen == undefined ? '' : jo.reply.currentJifen;
                    sessionStorage.prizeType = jo.reply.prizeType == undefined ? '' : jo.reply.prizeType;
                    sessionStorage.cardType = jo.reply.cardType == undefined ? '' : jo.reply.cardType;
                    sessionStorage.username = jo.reply.username == undefined ? '' : jo.reply.username;
                    sessionStorage.idcard = jo.reply.idcard == undefined ? '' : jo.reply.idcard;
                    sessionStorage.phonenum = jo.reply.phonenum == undefined ? '' : jo.reply.phonenum;
                    sessionStorage.weekSignFlag = jo.reply.weekSignFlag == undefined ? '' : jo.reply.weekSignFlag;
                    sessionStorage.weekSignPopup = jo.reply.weekSignPopup == undefined ? '' : jo.reply.weekSignPopup;
                    sessionStorage.weekSignDays = jo.reply.weekSignDays == undefined ? '' : jo.reply.weekSignDays;
                    sessionStorage.weekSignEarnFlag = jo.reply.weekSignEarnFlag == undefined ? '' : jo.reply.weekSignEarnFlag;
                    sessionStorage.weekSignEarnMoney = jo.reply.weekSignEarnMoney == undefined ? '' : jo.reply.weekSignEarnMoney;
                    sessionStorage.weekSignLimitDay = jo.reply.weekSignLimitDay == undefined ? '' : jo.reply.weekSignLimitDay;
                    sessionStorage.weekSignDiffDay = jo.reply.weekSignDiffDay == undefined ? '' : jo.reply.weekSignDiffDay;
                    sessionStorage.weekSignPercent = jo.reply.weekSignPercent == undefined ? '' : jo.reply.weekSignPercent;
                    sessionStorage.earnTime = jo.reply.earnTime == undefined ? '' : jo.reply.earnTime;
                } else if (jo.result.versionCode == '1') {
                    replace = '/v/zzqp20180401/index.html?bizcode=';
                } else if (jo.result.versionCode == '3') { //科技感
                    replace = '/v/zzqp20180801/getcash.html?bizcode=';
                    sessionStorage.sweepCode = jo.reply.sweepCode == undefined ? '' : jo.reply.sweepCode;
                    sessionStorage.currentMoney = jo.reply.currentMoney == undefined ? '' : jo.reply.currentMoney;
                    sessionStorage.currentJifen = jo.reply.currentJifen == undefined ? '' : jo.reply.currentJifen;
                    sessionStorage.prizeType = jo.reply.prizeType == undefined ? '' : jo.reply.prizeType;
                    sessionStorage.username = jo.reply.username == undefined ? '' : jo.reply.username;
                    sessionStorage.idcard = jo.reply.idcard == undefined ? '' : jo.reply.idcard;
                    sessionStorage.phonenum = jo.reply.phonenum == undefined ? '' : jo.reply.phonenum;
                    sessionStorage.earnTime = jo.reply.earnTime == undefined ? '' : jo.reply.earnTime;
                } else {
                    replace = '/v/zzqp20180401/index.html?bizcode=';
                }
            }
            switch (jo.result.businessCode) {
                case '0': // 普通奖
                    location.replace('http://' + location.host + replace + jo.result.businessCode);
                    break;
                case '19': // 问卷
                    sessionStorage.questionList = JSON.stringify(jo.reply.questionList);
                    location.replace('http://' + location.host + replace + jo.result.businessCode);
                    break;
                case '1': // 该积分码不存在
                    location.replace('http://' + location.host + replace + jo.result.businessCode);
                    break;
                case '2': // 该积分码已经被使用过
                    location.replace('http://' + location.host + replace + jo.result.businessCode);
                    break;
                case '3': // 积分码已过期
                    location.replace('http://' + location.host + replace + jo.result.businessCode);
                    break;
                case '4': // 活动未开始
                    console.log(jo.result.remarks);
                    sessionStorage.remarks = jo.result.remarks;
                    location.replace('http://' + location.host + replace + jo.result.businessCode);
                    break;
                case '5': // 活动已结束
                    if (relist.indexOf(jo.result.remarks) !== -1) {
                        location.replace('http://' + location.host + '/v/zzqp20170815/mistake.html');
                    } else {
                        location.replace('http://' + location.host + replace + jo.result.businessCode);
                    }
                    break;
                case '7': // 大奖
                    location.replace('http://' + location.host + replace + jo.result.businessCode);
                    break;
                case '11': // 自己重复扫，普通奖
                    location.replace('http://' + location.host + replace + jo.result.businessCode);
                    break;
                case '12': // 可疑用户
                    if (jo.result.versionCode == '2') {
                        location.replace('http://' + location.host + '/v/zzqp20180401/getMsg.html?bizcode=' + jo.result.businessCode);
                    } else {
                        location.replace('http://' + location.host + '/v/zzqp20170815/getMsg.html?bizcode=' + jo.result.businessCode);
                    }
                    break;
                case '14': // 指定用户
                    if (jo.result.versionCode == '2') {
                        location.replace('http://' + location.host + '/v/zzqp20180401/getMsg.html?bizcode=' + jo.result.businessCode);
                    } else {
                        location.replace('http://' + location.host + '/v/zzqp20170815/getMsg.html?bizcode=' + jo.result.businessCode);
                    }
                    break;
                case '15': // 一等奖核销
                    if (jo.reply.earnTime) {
                        sessionStorage.earnTime = jo.reply.earnTime;
                    }
                    location.replace('http://' + location.host + replace + jo.result.businessCode);
                    break;
                case '13': // 黑名单
                    if (jo.result.versionCode == '2') {
                        location.replace('http://' + location.host + '/v/zzqp20180401/getMsg.html?bizcode=' + jo.result.businessCode);
                    } else {
                        location.replace('http://' + location.host + '/v/zzqp20170815/getMsg.html?bizcode=' + jo.result.businessCode);
                    }
                    break;
                case '-1': // 系统升级中
                    location.replace('http://' + location.host + replace + jo.result.businessCode);
                    break;
                default:
                    location.replace('http://' + location.host + replace + jo.result.businessCode);
            }
        } else { //code != 0;
            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
        }
    }
})();