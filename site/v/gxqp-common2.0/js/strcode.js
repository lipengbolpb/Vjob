(function () {
    $(document).ready(function () {
        var CODE_URL = vge.common + '/vjifenInterface/user/getCaptcha';
        var INIT_URL = vge.common + '/vjifenInterface/sweep/getFailCount';
        var SEND_URL = vge.common + '/vjifenInterface/sweep/serialCode';
        var APPID = vge.gxqpappid;
        var PROJECT = 'gxqp-common2.0';
        var PHONENUM = '0771-3806691';

        var get_yz = document.getElementById('vertion_btn');
        $(document).ready(function () { //防止虚拟键盘弹出后页面布局被压缩
            $('body').height($('body')[0].clientHeight);
            var H1 = $('body')[0].clientHeight - 60 + 'px';
            // var H2 = $('body')[0].clientHeight - 20 + 'px';
            $('.batch').css('top', H1);
            // $('.copyright').css('top', H2);
        });

        var args = vge.urlparse(location.href),
            openid = args.vjifenOpenid,
            unionid = '';

        sessionStorage.onenid = openid;
        sessionStorage.vjifenOpenid = openid;
        sessionStorage.hbopenid = args.openid; //支付
        var reg1 = /[0-9a-zA-Z]{11}/,
            reg2 = /^1[0-9]{10}/,
            reg3 = /[0-9]{4}/;
        var scode = '',
            status = false;

        function only_strcode() {
            status = false;
            document.getElementById('str_code').addEventListener('input', function () {
                if (reg1.test($('#str_code').val())) {
                    $('#btn').css({
                        'backgroundColor': '#ffe036',
                        'color': '#cf3c35'
                    });
                    $('#btn').attr('disabled', false);
                    // $('#btn').on('click', dot);
                } else {
                    $('#btn').css({
                        'backgroundColor': '#d3d3d3',
                        'color': '#ffffff'
                    });
                    $('#btn').attr('disabled', 'disabled');
                }
            }, false);
        }

        function need_yzcode() {
            $('#telcode').css('display', 'block');
            $('#vertion').css('display', 'block');
            $('body').load(function () {
                window.scrollTo(0, document.body.scrollHeight);
            });
            status = true;
            document.addEventListener('input', function () {
                if (reg1.test($('#str_code').val()) && reg2.test($('#telcode_box').val()) && reg3.test($('#vertion_code').val())) {
                    $('#btn').css({
                        'backgroundColor': '#ffe036',
                        'color': '#cf3c35'
                    });
                    $('#btn').attr('disabled', false);
                    // $('#btn').on('click', dot);
                } else {
                    $('#btn').css({
                        'backgroundColor': '#d3d3d3',
                        'color': '#ffffff'
                    });
                    $('#btn').attr('disabled', 'disabled');
                }
            }, false);
        }

        $('#btn').on('click', dot);

        function dot() {
            $('#btn').unbind();
            setTimeout(function () {
                $('#btn').on('click', dot);
            }, 1000);
            scode = $('#str_code').val().trim();
            sessionStorage.qr = scode;
            if (!status) { //不需要验证码
                if (scode.length < 11 || scode.indexOf(' ') !== -1) {
                    title_tip('提 示', '填写的串码有误，请仔细核对您的串码！', '我知道了');
                    return;
                } else {
                    var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + APPID;
                    vge.ajxget(requrl, 5000, function (r) {
                        try {
                            var o = JSON.parse(r);
                            unionid = o.unionid;
                            sessionStorage.unionid = unionid;
                            sendcode();
                        } catch (e) {
                            vge.clog('errmsg', [requrl, e]);
                        }
                    }, function (err) {
                        vge.clog('errmsg', [requrl, e]);
                    });
                }
            } else { //需要验证码
                if (!reg1.test($('#str_code').val().trim())) {
                    title_tip('提 示', '请填写正确的瓶盖串码哦！~', '我知道了');
                } else if (!reg2.test($('#telcode_box').val())) {
                    title_tip('提 示', '请填写正确的手机号！~', '我知道了');
                } else if (!reg3.test($('#vertion_code').val())) {
                    title_tip('提 示', '请输入正确的验证码~', '我知道了');
                } else {
                    var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + APPID;
                    vge.ajxget(requrl, 5000, function (r) {
                        try {
                            var o = JSON.parse(r);
                            unionid = o.unionid;
                            sessionStorage.unionid = unionid;
                            sendcode();
                        } catch (e) {
                            vge.clog('errmsg', [requrl, e]);
                        }
                    }, function (err) {
                        vge.clog('errmsg', [requrl, e]);
                    });
                }
            }
        }

        $('#vertion_btn').on('click', function () {
            getYzcode();
        })

        function getYzcode() {
            if (!reg1.test($('#str_code').val())) {
                title_tip('提 示', '请填写正确的瓶盖串码哦！~', '我知道了');
            } else if (!reg2.test($('#telcode_box').val())) {
                title_tip('提 示', '请填写正确的手机号！~', '我知道了');
            } else {
                if ($('#vertion_btn').val() === '获取验证码') {
                    getCheckCode(function () {
                        countdown(get_yz, 60);
                    });
                } else {
                    $('#vertion_btn').off('click', getYzcode);
                }
            }
        }

        function getCheckCode(cb) { //获取验证码
            var javai = CODE_URL;
            var req = { "projectServerName": "guangxi",
                "phonenum": $('#telcode_box').val(),
                "sendtype": 1 //0-一等奖,1-普通(一等奖页面不传，后台默认值，串码页面都传1)
            };
            vge.callJApi(javai, req, function (jo) {
                if (jo.result.code == '0') {
                    if (jo.result.businessCode == '0') {
                        //成功，开始倒计时
                        cb();
                    } else if (jo.result.businessCode === '2') { //1
                        title_tip('尊敬的用户', '您填写的手机号错误，发送验证码失败！', '我知道了');
                    } else {
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    }
                } else { //code!='0'
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            });
        }

        function countdown(tag, time) {
            var i = time;
            tag.value = i + '秒';
            var countdowntimer = setInterval(function () {
                i--;
                tag.value = i + '秒';
                if (i < 1) {
                    tag.value = '获取验证码';
                    i = 60;
                    clearInterval(countdowntimer); // 清除定时器
                    get_yz.addEventListener('click', getYzcode, false);
                    countdowntimer = null;
                } else {
                    get_yz.removeEventListener('click', getYzcode, false);
                }
            }, 1000);
        }

        function init() {
            var javai = INIT_URL;
            var req = { "projectServerName": "guangxi",
                "openid": openid
            };
            vge.callJApi(javai, req, function (jo) {
                if (jo.result.code === '0') {
                    switch (jo.result.businessCode) {
                        case '0':
                            only_strcode();
                            break;
                        case '1': // 1 - 程序异常,,
                            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                            break;
                        case '2': // 2 - 需要验证码
                            need_yzcode();
                            break;
                        case '3': // 3 - 错误超过6次
                            only_strcode();
                            break;
                        default:
                            alert('未知返回码' + jo.result.businessCode + jo.result.msg);
                    }
                } else { //code!='0'
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            });
        }

        function sendcode() {
            $('.loading').css('display', 'block');
            var javai = SEND_URL;
            var req = { "projectServerName": "guangxi",
                "openid": openid,
                // "unionid":unionid,
                "serialcode": scode,
                "verifycode": $('#vertion_code').val() === '' ? '' : $('#vertion_code').val(),
                "phone": $('#telcode_box').val() === '' ? '' : $('#telcode_box').val(),
                "longitude": sessionStorage.longitude === undefined ? '' : sessionStorage.longitude, //"经度"
                "latitude": sessionStorage.latitude === undefined ? '' : sessionStorage.latitude //"纬度"
            };
            vge.callJApi(javai, req, function (jo) {
                console.log(jo);
                $('.loading').css('display', 'none');
                if (jo.result.code === '0') {
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
                        case '0':
                            sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                            sessionStorage.currentMoney = jo.reply.currentMoney;
                            sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                            sessionStorage.earnTime = jo.reply.earnTime;
                            //签到
                            sessionStorage.weekSignFlag = jo.reply.weekSignFlag; //用户是否开启自然周签到，1:开启、0或空:关闭
                            sessionStorage.weekSignPopup = jo.reply.weekSignPopup; //自然周签到弹出提示，1:弹出提示、0或空:不弹出
                            sessionStorage.setItem('signCogAry', JSON.stringify(jo.reply.signCogAry));
                            // K币
                            sessionStorage.kbUrl = jo.reply.kbUrl === undefined ? '' : jo.reply.kbUrl;
                            // 捆绑促销
                            sessionStorage.promotionFlag = jo.reply.promotionFlag === undefined ? '' : jo.reply.promotionFlag; //用户是否开启自然周签到，1:开启、0或空:关闭
                            sessionStorage.promotionPopup = jo.reply.promotionPopup === undefined ? '' : jo.reply.promotionPopup; //自然周签到弹出提示，1:弹出提示、0或空:不弹出
                            sessionStorage.setItem('promotionCogAry', JSON.stringify(jo.reply.promotionCogAry));
                            location.replace('http://' + location.host + '/' + PROJECT + '/txo/getcash?bizcode=' + jo.result.businessCode);
                            break;
                        case '1': // 1 - 该积分码不存在"
                            $('.slogan').css('display', 'none');
                            $('.mask').css('display', 'block');
                            $('.title').html('这个串码不存在');
                            $('.content').html('仔细核对盖码哦~');
                            break;
                        case '2': // 2 - 该积分码已经被使用过
                            $('.slogan').css('display', 'none');
                            $('.mask').css('display', 'block');
                            $('.title').html('这个串码已被扫');
                            $('.content').html('<span>扫码时间:</span><span style="color:#ffffff;">' + jo.reply.earnTime + '</span><br><span>再扫一瓶试试看~</span>');
                            break;
                        case '3': // 3 - 积分码已过期
                            $('.slogan').css('display', 'none');
                            $('.mask').css('display', 'block');
                            $('.title').html('这个串码已过期');
                            $('.content').html('这么好的啤酒要学会珍惜~');
                            break;
                        case '4': // 4 - 活动未开始
                            $('.slogan').css('display', 'none');
                            $('.mask').css('display', 'block');
                            $('.title').html('活动未开始');
                            $('.content').html('亲再等等哦~');
                            $('.batch').html(jo.reply.batchName + '<br />服务热线：' + PHONENUM);
                            break;
                        case '5': // 5 - 活动已结束
                            $('.slogan').css('display', 'none');
                            $('.mask').css('display', 'block');
                            $('.title').html('活动已截止');
                            $('.content').html('下次早点来哦~');
                            break;
                        case '6': // 6 - 积分码异常(通常为服务器报错)
                            $('.slogan').css('display', 'none');
                            $('.mask').css('display', 'block');
                            $('.title').html('系统升级中');
                            $('.content').html('亲稍安勿躁，敬请期待~');
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
                        case '8': // 8-需要验证码
                            title_tip('提 示', '请输入验证码！', '我知道了');
                            need_yzcode();
                            break;
                        case '9': // 9-验证码不正确
                            title_tip('提 示', '您输入的验证码不正确，请重新输入！', '我知道了');
                            break;
                        case '10': // 10-错误超过6次,请明天再试
                            $('.slogan').css('display', 'none');
                            $('.mask').css('display', 'block');
                            $('.title').html('错误次数过多');
                            $('.content').html('明天再来试试吧');
                            break;
                        case '11':
                            sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                            sessionStorage.currentMoney = jo.reply.currentMoney;
                            sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                            sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime;
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
                        case '15': //他人重复扫大奖
                            sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                            sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
                            location.replace('http://' + location.host + '/v/' + PROJECT + '/prize.html?bizcode=' + jo.result.businessCode);
                            break;
                        case '-1':
                            $('.slogan').css('display', 'none');
                            $('.mask').css('display', 'block');
                            $('.title').html('系统升级中');
                            $('.content').html('酒香不怕巷子深，稍后再试吧');
                            break;
                        case '17': //酒品已过期
                            $('.slogan').css('display', 'none');
                            $('.mask').css('display', 'block');
                            $('.title').html('好酒美味 更需趁早');
                            $('.content').html('您扫的这瓶酒<br />所属产品批次活动已结束');
                            break;
                        default:
                            if (jo.reply) {
                                sessionStorage.batchName = jo.reply.batchName === undefined ? '' : jo.reply.batchName;
                                sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime;
                            } else {
                                sessionStorage.earnTime = '';
                            }
                            location.replace('http://' + location.host + '/v/' + PROJECT + '/fail.html?bizcode=' + jo.result.businessCode);
                    }
                } else { //code!='0'
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            });
        }

        init(); //初始化查询输入次数
    });
})()