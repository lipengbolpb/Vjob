(function () {
    var openid = sessionStorage.openid,
        qr = sessionStorage.qr,
        flag = true,
        tj = true;

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

    $('#tj').on('click', function () {
        if (!reg1.test($('#tel').val())) {
            title_tip('提 示', '请填写正确的手机号！~', '我知道了');
        } else if (!reg3.test($('#yz_code').val())) {
            title_tip('提 示', '请填写正确的验证码！~', '我知道了');
        } else {
            //调提交接口
            if (tj) {
                tj = false;
                document.getElementsByClassName('loading')[0].style.display = 'block';
                sub_message();
            }
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

        var javai = vge.hnqp + '/DBTHuaNQPInterface/user/getCaptcha';
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
        var javai = vge.hnqp + '/DBTHuaNQPInterface/user/updateUserInfoMobile';
        var req = {
            "openid": openid,
            "phonenum": $('#tel').val(),
            "captcha": $('#yz_code').val()
        };
        vge.callJApi(javai, req, function (jo) {
            document.getElementsByClassName('loading')[0].style.display = 'none';
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
        if(flag){
            flag = false;
            var data = {
                "openid": openid,
                "sweepstr": qr,
                "longitude": sessionStorage.longitude === undefined ? '00' : sessionStorage.longitude, //"经度"
                "latitude": sessionStorage.latitude === undefined ? '00' : sessionStorage.latitude //"纬度"
            };
            $.ajax({
                type: "post",
                url: vge.hnqp + '/DBTHuaNQPInterface/sweep/sweepVerify',
                async: true,
                data: JSON.stringify(data),
                success: function (jo) {
                    cbk(jo);
                }
            });
        }
    }

    function cbk(jo) {
        if (jo.result.code == '0') {
            sessionStorage.earnTime = jo.reply.earnTime;
            if (jo.reply.activityVersion === "1") { //广东
                switch (jo.result.businessCode) {
                    case '0': // 普通奖
                        sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                        sessionStorage.currentMoney = jo.reply.currentMoney;
                        sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                        location.replace('http://' + location.host + '/gdqp/txo/getcash?bizcode=' + jo.result.businessCode);
                        break;
                    case '11': // 自己重复扫，普通奖
                        sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                        sessionStorage.currentMoney = jo.reply.currentMoney;
                        sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                        if (sessionStorage.currentMoney == 19.03) {
                            location.replace('http://' + location.host + '/gdqp/txo/1903?bizcode=' + jo.result.businessCode);
                        } else {
                            location.replace('http://' + location.host + '/gdqp/txo/getcash?bizcode=' + jo.result.businessCode);
                        }
                        break;
                    case '12': // 可疑
                        location.replace('http://' + location.host + '/v/gdqp/getMsg.html?bizcode=' + jo.result.businessCode);
                        break;
                    case '13': // 黑名单
                        location.replace('http://' + location.host + '/v/gdqp/getMsg.html?bizcode=' + jo.result.businessCode);
                        break;
                    case '14': // 指定
                        location.replace('http://' + location.host + '/v/gdqp/getMsg.html?bizcode=' + jo.result.businessCode);
                        break;
                    default:
                        if (jo.reply) {
                            sessionStorage.batchName = jo.reply.batchName === undefined ? '' : jo.reply.batchName;
                            sessionStorage.earnTime = jo.reply.earnTime;
                            sessionStorage.msg = jo.result.msg;
                        }
                        location.replace('http://' + location.host + '/v/gdqp/fail.html?bizcode=' + jo.result.businessCode);
                }
            } else if (jo.reply.activityVersion === "2") { //海南
                switch (jo.result.businessCode) {
                    case '0': // 普通奖
                        sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                        sessionStorage.currentMoney = jo.reply.currentMoney;
                        sessionStorage.codeContentUrl = jo.reply.codeContentUrl;

                        location.replace('http://' + location.host + '/hnqp/txo/getcash');
                        break;
                    case '11': // 自己重复扫，普通奖
                        sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                        sessionStorage.currentMoney = jo.reply.currentMoney;
                        sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                        location.replace('http://' + location.host + '/hnqp/txo/repcash');
                        break;
                    case '12': // 可疑
                        location.replace('http://' + location.host + '/v/hnqp/getMsg.html?bizcode=' + jo.result.businessCode);
                        break;
                    case '13': // 黑名单
                        location.replace('http://' + location.host + '/v/hnqp/getMsg.html?bizcode=' + jo.result.businessCode);
                        break;
                    case '14': // 指定
                        location.replace('http://' + location.host + '/v/hnqp/getMsg.html?bizcode=' + jo.result.businessCode);
                        break;
                    default:
                        if (jo.reply) {
                            sessionStorage.batchName = jo.reply.batchName === undefined ? '' : jo.reply.batchName;
                            sessionStorage.earnTime = jo.reply.earnTime;
                            sessionStorage.msg = jo.result.msg;
                        }
                        location.replace('http://' + location.host + '/v/hnqp/fail.html?bizcode=' + jo.result.businessCode);
                }
            } else if (jo.reply.activityVersion === "3") { //海南灌装
                switch (jo.result.businessCode) {
                    case '0': // 普通奖
                        sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                        sessionStorage.currentMoney = jo.reply.currentMoney;
                        sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                        location.replace('http://' + location.host + '/hnqp20170520/txo/getcash');
                        break;
                    case '11': // 自己重复扫，普通奖
                        sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                        sessionStorage.currentMoney = jo.reply.currentMoney;
                        sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                        location.replace('http://' + location.host + '/hnqp20170520/txo/getcash?bizcode=' + jo.result.businessCode);
                        break;
                    case '12': // 可疑
                        location.replace('http://' + location.host + '/v/hnqp20170520/getMsg.html?bizcode=' + jo.result.businessCode);
                        break;
                    case '13': // 黑名单
                        location.replace('http://' + location.host + '/v/hnqp20170520/getMsg.html?bizcode=' + jo.result.businessCode);
                        break;
                    case '14': // 指定
                        location.replace('http://' + location.host + '/v/hnqp20170520/getMsg.html?bizcode=' + jo.result.businessCode);
                        break;
                    default:
                        if (jo.reply) {
                            sessionStorage.batchName = jo.reply.batchName === undefined ? '' : jo.reply.batchName;
                            sessionStorage.earnTime = jo.reply.earnTime;
                            sessionStorage.msg = jo.result.msg;
                        }
                        location.replace('http://' + location.host + '/v/hnqp20170520/fail.html?bizcode=' + jo.result.businessCode);
                }
            } else if (jo.reply.activityVersion === "4") { //广东罐装版(纯生)
                switch (jo.result.businessCode) {
                    case '0': // 普通奖
                        sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                        sessionStorage.currentMoney = jo.reply.currentMoney;
                        sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                        location.replace('http://' + location.host + '/hnqp20171205/txo/getcash');
                        break;
                    case '11': // 自己重复扫，普通奖
                        sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                        sessionStorage.currentMoney = jo.reply.currentMoney;
                        sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                        if (sessionStorage.currentMoney == 19.03) {
                            location.replace('http://' + location.host + '/gdqp/txo/1903?bizcode=' + jo.result.businessCode);
                        } else {
                            location.replace('http://' + location.host + '/hnqp20171205/txo/getcash?bizcode=' + jo.result.businessCode);
                        }
                        break;
                    case '12': // 可疑
                        location.replace('http://' + location.host + '/v/hnqp20171205/getMsg.html?bizcode=' + jo.result.businessCode);
                        break;
                    case '13': // 黑名单
                        location.replace('http://' + location.host + '/v/hnqp20171205/getMsg.html?bizcode=' + jo.result.businessCode);
                        break;
                    case '14': // 指定
                        location.replace('http://' + location.host + '/v/hnqp20171205/getMsg.html?bizcode=' + jo.result.businessCode);
                        break;
                    default:
                        if (jo.reply) {
                            sessionStorage.batchName = jo.reply.batchName === undefined ? '' : jo.reply.batchName;
                            sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime;
                            sessionStorage.msg = jo.result.msg;
                        }
                        location.replace('http://' + location.host + '/v/hnqp20171205/fail.html?bizcode=' + jo.result.businessCode);
                }
            } else if (jo.reply.activityVersion === "5") { //广东罐装版(绿罐)
                switch (jo.result.businessCode) {
                    case '0': // 普通奖
                        sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                        sessionStorage.currentMoney = jo.reply.currentMoney;
                        sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                        location.replace('http://' + location.host + '/hnqp20171206/txo/getcash');
                        break;
                    case '11': // 自己重复扫，普通奖
                        sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                        sessionStorage.currentMoney = jo.reply.currentMoney;
                        sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                        if (sessionStorage.currentMoney == 19.03) {
                            location.replace('http://' + location.host + '/gdqp/txo/1903?bizcode=' + jo.result.businessCode);
                        } else {
                            location.replace('http://' + location.host + '/hnqp20171206/txo/getcash?bizcode=' + jo.result.businessCode);
                        }
                        break;
                    case '12': // 可疑
                        location.replace('http://' + location.host + '/v/hnqp20171206/getMsg.html?bizcode=' + jo.result.businessCode);
                        break;
                    case '13': // 黑名单
                        location.replace('http://' + location.host + '/v/hnqp20171206/getMsg.html?bizcode=' + jo.result.businessCode);
                        break;
                    case '14': // 指定
                        location.replace('http://' + location.host + '/v/hnqp20171206/getMsg.html?bizcode=' + jo.result.businessCode);
                        break;
                    default:
                        if (jo.reply) {
                            sessionStorage.batchName = jo.reply.batchName === undefined ? '' : jo.reply.batchName;
                            sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime;
                            sessionStorage.msg = jo.result.msg;
                        }
                        location.replace('http://' + location.host + '/v/hnqp20171206/fail.html?bizcode=' + jo.result.businessCode);
                }
            }
        } else if (jo.result.code == '-1') {
            title_tip('尊敬的用户', '系统升级中，请稍后再试！', '我知道了');
        } else {
            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
        }
    }
})();