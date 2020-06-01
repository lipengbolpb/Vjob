(function () {
    $(document).ready(function () {
        var CODE_URL = vge.fjqp + '/DBTFJQPInterface/user/getCaptcha';
        var INIT_URL = vge.fjqp + '/DBTFJQPInterface/sweep/getFailCount';
        var SEND_URL = vge.fjqp + '/DBTFJQPInterface/sweep/serialCode';
        var APPID = vge.fjqpappid;
        var PROJECT = 'fjqp-common3.0';
        var PHONE_NUM = '15311695989';

        var get_yz = document.getElementById('vertion_btn');
        $(document).ready(function () { //防止虚拟键盘弹出后页面布局被压缩
            $('body').height($('body')[0].clientHeight);
            var H1 = $('body')[0].clientHeight - 60 + 'px';
            $('.batch').css('top', H1);
        });

        var args = vge.urlparse(location.href),
            openid = args.openid,
            unionid = '';
        sessionStorage.openid = openid;
        var reg1 = /[0-9a-zA-Z]{12}/,
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
                        'backgroundColor': '#e5e5e5',
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
                if (scode.length < 12 || scode.indexOf(' ') !== -1) {
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
            var req = {
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
            var req = {
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
            var req = {
                "openid": openid,
                // "unionid":unionid,
                "serialcode": scode,
                "verifycode": $('#vertion_code').val() === '' ? '' : $('#vertion_code').val(),
                "phone": $('#telcode_box').val() === '' ? '' : $('#telcode_box').val(),
                "longitude": sessionStorage.longitude === undefined ? '' : sessionStorage.longitude, //"经度"
                "latitude": sessionStorage.latitude === undefined ? '' : sessionStorage.latitude //"纬度"
            };
            vge.callJApi(javai, req, function (jo) {
                console.log('提交结果', jo);
                $('.loading').css('display', 'none');
                if (jo.result.code === '0') {
                    if (jo.reply) {
                        sessionStorage.activityVersion = jo.reply.activityVersion;
                        sessionStorage.skukey = jo.reply.skukey === undefined ? '' : jo.reply.skukey;
                        if (jo.reply.activityVersion == '1') {
                            PROJECT = 'fjqp';
                        } else if (jo.reply.activityVersion == '2') { //新年版
                            PROJECT = 'fjqp20180130';
                        } else if (jo.reply.activityVersion == '3') { //清爽开箱
                            PROJECT = 'fjqp-worldcup';
                        } else if (jo.reply.activityVersion == '4') { //高升
                            PROJECT = 'fjqp-common2.0';
                        } else if (jo.reply.activityVersion == '5') { //连江开箱
                            PROJECT = 'fjqp-lianjiang';
                        } else if (jo.reply.activityVersion == '6') { //世界杯扫码版
                            PROJECT = 'fjqp-common3.0';
                        } else if (jo.reply.activityVersion == '7') { //世界杯俄罗斯版
                            PROJECT = 'fjqp-russian-FIFA';
                        } else if (jo.reply.activityVersion == '8') { //经典11度高升罐装
                            PROJECT = 'fjqp20181105';
                        } else if (jo.reply.activityVersion == '9') { //清爽
                            PROJECT = 'fjqp20181120';
                        } else {
                            PROJECT = 'fjqp';
                        }
                    }
                    // jo.result.businessCode = sessionStorage.a;
                    switch (jo.result.businessCode) {
                        case '0':
                            sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                            sessionStorage.currentMoney = jo.reply.currentMoney;
                            sessionStorage.earnTime = jo.reply.earnTime;
                            //签到
                            sessionStorage.weekSignFlag = jo.reply.weekSignFlag; //用户是否开启自然周签到，1:开启、0或空:关闭
                            sessionStorage.weekSignPopup = jo.reply.weekSignPopup; //自然周签到弹出提示，1:弹出提示、0或空:不弹出
                            sessionStorage.setItem('signCogAry', JSON.stringify(jo.reply.signCogAry));
                            // 捆绑促销
                            sessionStorage.promotionFlag = jo.reply.promotionFlag === undefined ? '' : jo.reply.promotionFlag; //用户是否开启自然周签到，1:开启、0或空:关闭
                            sessionStorage.promotionPopup = jo.reply.promotionPopup === undefined ? '' : jo.reply.promotionPopup; //自然周签到弹出提示，1:弹出提示、0或空:不弹出
                            sessionStorage.setItem('promotionCogAry', JSON.stringify(jo.reply.promotionCogAry));
                            location.replace('http://' + location.host + '/' + PROJECT + '/txo/getcash?bizcode=' + jo.result.businessCode);
                            break;
                        case '1': // 1 - 该积分码不存在"
                            $('.sloganBox').css('display', 'none');
                            $('.mask').css('display', 'block');
                            $('.title').html('这个串码不存在');
                            $('.content').html('仔细核对盖码哦~');
                            $('.err').css('display', 'none');
                            $('#btn').css({
                                'backgroundColor': '#e5e5e5',
                                'color': '#ffffff'
                            });
                            $('#btn').attr('disabled', 'disabled');
                            break;
                        case '2': // 2 - 该积分码已经被使用过
                            $('.sloganBox').css('display', 'none');
                            $('.mask').css('display', 'block');
                            $('.err').attr('src', '/v/fjqp-common3.0/img/err_2.png');
                            $('.err').css('display', 'block');
                            $('.title').html('');
                            // $('.title').html('这个串码已被扫');
                            $('.content').html('<span>扫码时间:</span><span>' + jo.reply.earnTime + '</span>');
                            $('#btn').css({
                                'backgroundColor': '#e5e5e5',
                                'color': '#ffffff'
                            });
                            $('#btn').attr('disabled', 'disabled');
                            break;
                        case '3': // 3 - 积分码已过期
                            $('.sloganBox').css('display', 'none');
                            $('.mask').css('display', 'block');
                            $('.title').html('这个串码已过期');
                            $('.content').html('这么好的啤酒要学会珍惜~');
                            $('.err').css('display', 'none');
                            $('#btn').css({
                                'backgroundColor': '#e5e5e5',
                                'color': '#ffffff'
                            });
                            $('#btn').attr('disabled', 'disabled');
                            break;
                        case '4': // 4 - 活动未开始
                            $('.sloganBox').css('display', 'none');
                            $('.mask').css('display', 'block');
                            $('.err').attr('src', '/v/fjqp-common3.0/img/err_4.png');
                            $('.err').css('display', 'block');
                            $('.title').html('');
                            $('.content').html('亲再等等哦~');
                            $('.batch').html(jo.reply.batchName + '<br />服务热线：' + PHONE_NUM);
                            $('#btn').css({
                                'backgroundColor': '#e5e5e5',
                                'color': '#ffffff'
                            });
                            $('#btn').attr('disabled', 'disabled');
                            break;
                        case '5': // 5 - 活动已结束
                            $('.sloganBox').css('display', 'none');
                            $('.mask').css('display', 'block');
                            $('.err').attr('src', '/v/fjqp-common3.0/img/err_5.png');
                            $('.err').css('display', 'block');
                            $('.title').html('');
                            $('.content').html('下次早点来哦~');
                            $('#btn').css({
                                'backgroundColor': '#e5e5e5',
                                'color': '#ffffff'
                            });
                            $('#btn').attr('disabled', 'disabled');
                            break;
                        case '6': // 6 - 积分码异常(通常为服务器报错)
                            $('.sloganBox').css('display', 'none');
                            $('.mask').css('display', 'block');
                            $('.err').attr('src', '/v/fjqp-common3.0/img/err_-1.png');
                            $('.err').css('display', 'block');
                            $('.title').html('');
                            $('.content').html('亲稍安勿躁，敬请期待~');
                            $('#btn').css({
                                'backgroundColor': '#e5e5e5',
                                'color': '#ffffff'
                            });
                            $('#btn').attr('disabled', 'disabled');
                            break;
                        case '7': // 大奖
                            sessionStorage.address = jo.reply.address === undefined ? '' : jo.reply.address;
                            sessionStorage.username = jo.reply.username === undefined ? '' : jo.reply.username;
                            sessionStorage.idcard = jo.reply.idcard === undefined ? '' : jo.reply.idcard;
                            sessionStorage.phonenum = jo.reply.phonenum === undefined ? '' : jo.reply.phonenum;
                            sessionStorage.skukey = jo.reply.skukey === undefined ? '' : jo.reply.skukey;
                            //中奖具体码
                            sessionStorage.prizeVcode = jo.reply.prizeVcode === undefined ? '' : jo.reply.prizeVcode;
                            //特等奖类别
                            sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                            if (jo.reply.grandPrizeType === 'R' || jo.reply.grandPrizeType === 'r') {
                                location.replace('http://' + location.host + '/v/fjqp-worldcup/prize.html');
                            } else if (jo.reply.grandPrizeType === 's' || jo.reply.grandPrizeType === 'S' || jo.reply.grandPrizeType === 't' || jo.reply.grandPrizeType === 'T') {
                                location.replace('http://' + location.host + '/v/fjqp20181120/prize.html');
                            } else {
                                title_tip('尊敬的用户', '扫码异常', '我知道了');
                            }
                            break;
                        case '8': // 8-需要验证码
                            title_tip('提 示', '请输入验证码！', '我知道了');
                            need_yzcode();
                            break;
                        case '9': // 9-验证码不正确
                            title_tip('提 示', '您输入的验证码不正确，请重新输入！', '我知道了');
                            break;
                        case '10': // 10-错误超过6次,请明天再试
                            $('.sloganBox').css('display', 'none');
                            $('.mask').css('display', 'block');
                            $('.err').attr('src', '/v/fjqp-common3.0/img/err_6.png');
                            $('.err').css('display', 'block');
                            $('.title').html('');
                            $('.content').html('明天再来试试吧');
                            $('#btn').css({
                                'backgroundColor': '#e5e5e5',
                                'color': '#ffffff'
                            });
                            $('#btn').attr('disabled', 'disabled');
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
                            $('.sloganBox').css('display', 'none');
                            $('.mask').css('display', 'block');
                            $('.err').attr('src', '/v/fjqp-common3.0/img/err_-1.png');
                            $('.err').css('display', 'block');
                            $('.title').html('');
                            $('.content').html('酒香不怕巷子深，稍后再试吧');
                            $('#btn').css({
                                'backgroundColor': '#e5e5e5',
                                'color': '#ffffff'
                            });
                            $('#btn').attr('disabled', 'disabled');
                            break;
                        case '17': //酒品已过期
                            $('.sloganBox').css('display', 'none');
                            $('.mask').css('display', 'block');
                            $('.title').html('好酒美味 更需趁早');
                            $('.content').html('您扫的这瓶酒<br />所属产品批次活动已结束');
                            $('.err').css('display', 'none');
                            $('.title').html('');
                            $('#btn').css({
                                'backgroundColor': '#e5e5e5',
                                'color': '#ffffff'
                            });
                            $('#btn').attr('disabled', 'disabled');
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