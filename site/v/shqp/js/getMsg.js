(function () {
    'use strict';
    var CHECKCODE_PORT = vge.common + '/vjifenInterface/user/getCaptcha';
    var SUBMESSAGE_PORT = vge.common + '/vjifenInterface/user/updateUserInfoMobile';
    var SWEEP_PORT = vge.common + '/vjifenInterface/sweep/sweepQrcode';
    var PHONE_NUM = '021-66096684';
    var NAME = '青岛啤酒欢聚魔都';

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
			_hmt.push(['_trackEvent', 'click', '可疑页面', '提交信息']);
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
				_hmt.push(['_trackEvent', 'click', '可疑页面', '获取验证码']);
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
			"projectServerName": "shanghaiqp",
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
				"projectServerName": "shanghaiqp",
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
            if(jo.result.businessCode=='30'){//大奖核销
                sessionStorage.infoKey = jo.reply.checkPrizeRecord.infoKey;
                sessionStorage.prizeName = jo.reply.checkPrizeRecord.prizeName;
                sessionStorage.prizeImg = jo.reply.checkPrizeRecord.prizeImg;
                sessionStorage.prizeVcode = jo.reply.checkPrizeRecord.prizeVcode;
                sessionStorage.userName = jo.reply.checkPrizeRecord.userName;
                sessionStorage.phoneNum = jo.reply.checkPrizeRecord.phoneNum;
                sessionStorage.earnTime = jo.reply.checkPrizeRecord.earnTime;
                sessionStorage.expireTime = jo.reply.checkPrizeRecord.expireTime;
                sessionStorage.checkUserName = jo.reply.checkPrizeRecord.checkUserName;
                sessionStorage.checkStatus = jo.reply.checkPrizeRecord.checkStatus;
                sessionStorage.checkTime = jo.reply.checkPrizeRecord.checkTime;
                sessionStorage.checkRemarks = jo.reply.checkPrizeRecord.checkRemarks;
                location.replace('http://' + location.host + '/v/shqp/verification.html?bizcode=' + jo.result.businessCode);
                return false;
            }
            if(jo.reply){
                // 产品类型：0瓶、1罐
                sessionStorage.skuType = jo.reply.skuType;
            }
            switch (jo.result.businessCode) {
                case '0': // 普通奖
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    //新签到
                    sessionStorage.weekSignFlag = jo.reply.weekSignFlag; //用户是否开启自然周签到，1:开启、0或空:关闭
                    sessionStorage.weekSignPopup = jo.reply.weekSignPopup; //自然周签到弹出提示，1:弹出提示、0或空:不弹出
                    sessionStorage.setItem('signCogAry', JSON.stringify(jo.reply.signCogAry));
                    //捆绑
                    sessionStorage.promotionFlag = jo.reply.promotionFlag; //用户是否开启自然周签到，1:开启、0或空:关闭
                    sessionStorage.promotionPopup = jo.reply.promotionPopup; //自然周签到弹出提示，1:弹出提示、0或空:不弹出
                    sessionStorage.setItem('promotionCogAry', JSON.stringify(jo.reply.promotionCogAry));

                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
                    location.replace('http://' + location.host + '/v/shqp/getcash.html?bizcode='+jo.result.businessCode);
                    break;
                case '11': // 自己重复扫，普通奖
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    sessionStorage.earnTime = jo.reply.earnTime;
                    location.replace('http://' + location.host + '/v/shqp/getcash?bizcode=' + jo.result.businessCode);
                    break;
                case '12': // 
                    location.replace('http://' + location.host + '/v/shqp/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '13': // 
                    location.replace('http://' + location.host + '/v/shqp/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '14': // 
                    location.replace('http://' + location.host + '/v/shqp/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '15': //
                    sessionStorage.earnTime = jo.reply.earnTime;
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    location.replace('http://' + location.host + '/v/shqp/prize.html?bizcode=' + jo.result.businessCode);
                    
                    break;
                case '7': //一等奖或二等奖
                    sessionStorage.address = jo.reply.address === undefined ? '' : jo.reply.address;
                    sessionStorage.username = jo.reply.username === undefined ? '' : jo.reply.username;
                    sessionStorage.idcard = jo.reply.idcard === undefined ? '' : jo.reply.idcard;
                    sessionStorage.phonenum = jo.reply.phonenum === undefined ? '' : jo.reply.phonenum;
                    sessionStorage.skukey = jo.reply.skukey === undefined ? '' : jo.reply.skukey;
                    //中奖具体码
                    sessionStorage.prizeVcode = jo.reply.prizeVcode === undefined ? '' : jo.reply.prizeVcode;
                    //特等奖类别
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                    location.replace('http://' + location.host + '/v/shqp/prize.html?bizcode=' + jo.result.businessCode);
                    break;
                default:
                    if (jo.reply) {
                        sessionStorage.batchName = jo.reply.batchName === undefined ? '' : jo.reply.batchName;
                        sessionStorage.earnTime = jo.reply.earnTime;
                        sessionStorage.msg = jo.result.msg;
                    }
                    location.replace('http://' + location.host + '/v/shqp/fail.html?bizcode='+jo.result.businessCode);
            }
        } else if (jo.result.code == '-1') { //code !=0;
            title_tip('尊敬的用户', '系统升级中，请稍后再试！', '我知道了');
        } else {
            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
        }
    }
})();