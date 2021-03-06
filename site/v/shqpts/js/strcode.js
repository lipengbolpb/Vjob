(function () {
    $(document).ready(function () {
        var CODE_URL = vge.shqp + '/DBTSHQPInterface/user/getCaptcha';
        var INIT_URL = vge.shqp + '/DBTSHQPInterface/sweep/getFailCount';
        var SEND_URL = vge.shqp + '/DBTSHQPInterface/sweep/serialCode';
        var APPID = vge.shqpappid;
        var PHONE_NUM = '15801152037';

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
            scode = $('#str_code').val().trim().toUpperCase();
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
                            location.replace('http://' + location.host + '/v/shqpts/getcash.html?bizcode='+jo.result.businessCode);
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
                            //$('.err').attr('src', '/v/ahqp-common3.0/img/err_2.png');
                            $('.err').css('display', 'none');
                            $('.title').html('这个二维码已被扫');
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
                            //$('.err').attr('src', '/v/ahqp-common3.0/img/err_4.png');
                            $('.err').css('display', 'none');
                            $('.title').html('活动未开始');
                            $('.content').html('心急喝不了好啤酒，再等等哦~');
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
                            //$('.err').attr('src', '/v/ahqp-common3.0/img/err_5.png');
                            $('.err').css('display', 'none');
                            $('.title').html('活动已截止');
                            $('.content').html('好久不等人，下次早点来哦~');
                            $('#btn').css({
                                'backgroundColor': '#e5e5e5',
                                'color': '#ffffff'
                            });
                            $('#btn').attr('disabled', 'disabled');
                            break;
                        case '6': // 6 - 积分码异常(通常为服务器报错)
                            $('.sloganBox').css('display', 'none');
                            $('.mask').css('display', 'block');
                            //$('.err').attr('src', '/v/ahqp-common3.0/img/err_-1.png');
                            $('.err').css('display', 'none');
                            $('.title').html('系统升级中');
                            $('.content').html('亲稍安勿躁，敬请关注~');
                            $('#btn').css({
                                'backgroundColor': '#e5e5e5',
                                'color': '#ffffff'
                            });
                            $('#btn').attr('disabled', 'disabled');
                            break;
                        case '7': // 大奖
                            sessionStorage.username = jo.reply.username === undefined ? '' : jo.reply.username;
                            sessionStorage.phonenum = jo.reply.phonenum === undefined ? '' : jo.reply.phonenum;
                            sessionStorage.idcard = jo.reply.idcard === undefined ? '' : jo.reply.idcard;
                            sessionStorage.address = jo.reply.address === undefined ? '' : jo.reply.address;
                            sessionStorage.skukey = jo.reply.skukey;
                            sessionStorage.prizeVcode = jo.reply.prizeVcode;
                            sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                            if(jo.reply.grandPrizeType.toUpperCase()=='Q'||jo.reply.grandPrizeType.toUpperCase()=='R'){
                                location.replace('http://' + location.host + '/v/shqpts/prize.html?bizcode=' + jo.result.businessCode);
                            }else{
                                title_tip('尊敬的用户', '扫码异常！', '我知道了');
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
                            //$('.err').attr('src', '/v/ahqp-common3.0/img/err_6.png');
                            $('.err').css('display', 'none');
                            $('.title').html('您输入的次数太多');
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
                            location.replace('http://' + location.host + '/v/shqpts/getcash.html?bizcode=' + jo.result.businessCode);
                            break;
                        case '12': // 可疑用户
                            location.replace('http://' + location.host + '/v/shqpts/getMsg.html?bizcode=' + jo.result.businessCode);
                            break;
                        case '13': // 黑名单
                            location.replace('http://' + location.host + '/v/shqpts/getMsg.html?bizcode=' + jo.result.businessCode);
                            break;
                        case '14': // 与12相同
                            location.replace('http://' + location.host + '/v/shqpts/getMsg.html?bizcode=' + jo.result.businessCode);
                            break;
                        case '15': //他人重复扫大奖
                            sessionStorage.grandPrizeType = jo.reply.grandPrizeType === undefined ? '' : jo.reply.grandPrizeType;
                            sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
                            location.replace('http://' + location.host + '/v/shqpts/prize.html?bizcode=' + jo.result.businessCode);
                            break;
                        case '-1':
                            $('.sloganBox').css('display', 'none');
                            $('.mask').css('display', 'block');
                            //$('.err').attr('src', '/v/ahqp-common3.0/img/err_-1.png');
                            //$('.err').css('display', 'block');
                            $('.title').html('系统升级中');
                            $('.content').html('亲稍安勿躁，敬请关注~');
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
                            if(sessionStorage.skuType == 0){
                                $('.content').html('您扫的这瓶酒<br />所属产品批次活动已结束');
                            }else if(sessionStorage.skuType == 1){
                                $('.content').html('您扫的这罐酒<br />所属产品批次活动已结束');
                            };
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
                            location.replace('http://' + location.host + '/v/shqpts/fail.html?bizcode='+jo.result.businessCode);
                    }
                } else { //code!='0'
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            });
        }

        init(); //初始化查询输入次数
    });
})()