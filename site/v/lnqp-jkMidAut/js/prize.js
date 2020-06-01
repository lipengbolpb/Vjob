(function () {
    'use strict'

    var CHECKCODE_URL = vge.lnqp + '/DBTLNQPInterface/user/getCaptcha';
    var SUBMESSAGE_URL = vge.lnqp + '/DBTLNQPInterface/user/savePrize';
    var RULE_HREF = 'https://mp.weixin.qq.com/s?__biz=MzA3MTA2MjM3Mw==&mid=503561262&idx=1&sn=c9c0c99d83b8c3a17b6f26e2cab2081f&chksm=04c45a2433b3d332bf8407c4484d29f84469534302437b372f1feb38f21f5f87371b1f8d4077#rd';
    var SECRET_HREF = 'https://mp.weixin.qq.com/s?__biz=MzA3MTA2MjM3Mw==&mid=503561265&idx=1&sn=efbb3c01840b14272311dadcc7dfb02c&chksm=04c45a3b33b3d32dd931d774c505e5595c4b293a63be8eba808b1f7b5ddcba8ebbd551a41788#rd';
    var PHONE_NUM = '024-31932190';

    var dom_get = document.getElementsByClassName('yz')[0];

    var reg1 = /^1[0-9]{10}$/, //验证手机号
        reg2 = /^[1-9][0-9xX]{17}$/, //验证身份证号
        reg3 = /^[0-9]{4}$/;

    var openid = sessionStorage.openid === undefined ? '' : sessionStorage.openid,
        unionid = sessionStorage.unionid === undefined ? '' : sessionStorage.unionid,
        username = sessionStorage.username === undefined ? '' : sessionStorage.username,
        idcard = sessionStorage.idcard === undefined ? '' : sessionStorage.idcard,
        phonenum = sessionStorage.phonenum === undefined ? '' : sessionStorage.phonenum,
        skukey = sessionStorage.skukey === undefined ? '' : sessionStorage.skukey,
        address = sessionStorage.address === undefined ? '' : sessionStorage.address,
        earnTime = sessionStorage.earnTime === undefined ? '' : sessionStorage.earnTime,
        prizeVcode = sessionStorage.prizeVcode === undefined ? '' : sessionStorage.prizeVcode, //具体码
        grandPrizeType = sessionStorage.grandPrizeType === undefined ? '' : sessionStorage.grandPrizeType; //特等奖类别
    var countdowntimer = null;
    var again = sessionStorage.again === undefined ? '' : sessionStorage.again;
    var args = vge.urlparse(location.href),
        bizcode = args.bizcode;
    $(document).ready(function () {
        init();

        function init() {
            if (bizcode == 15) {
                $('.info').css('display', 'none');
                $('.get').css('display', 'none');
                $('.repcash').css('display', 'block');
                $('.earnTime').html(earnTime);
            } else {
                if (again == 'true' || again == true) {
                    $('.info').css('display', 'block');
                } else {
                    if (idcard != '' && phonenum != '' && username != '') { //已经填写过信息
                        $('.get').css('display', 'none');
                        $('.info').css('display', 'block');
                        $('.name').val(username);
                        $('.idcard').val(idcard);
                        $('.tel').val(phonenum);
                        $('.address').val(address);
                        $('.name').attr('readOnly', true);
                        $('.idcard').attr('readOnly', true);
                        $('.tel').attr('readOnly', true);
                        $('.address').attr('readOnly', true);
                        $('#btn').attr('disabled', true);
                        $('.code').css('display', 'none');
                        $('.yz').css('display', 'none');
                        $('#btn').val('提交成功');
                        $('.alert').html('温馨提示：您的信息已提交成功，请耐心等待主办方与您联系');
                    } else {
                        $('.get').css('display', 'block');
                    }
                }
            }
        }

        $('.ck').on('click', function () {
            $('.get').fadeOut();
            $('.info').fadeIn();
            sessionStorage.again = true;
        });
        $('a.ckff').on('click', function () {
            $('div.ckff').css('display', 'block');
        });
        $('a.cktel').on('click', function () {
            $('div.cktel').css('display', 'block');
        });
        
        $('.closetel').on('click', function () {
            $('div.cktel').css('display', 'none');
        });
        $('.closeff').on('click', function () {
            $('div.ckff').css('display', 'none');
        });
        $('.name,.idcard,.tel,.code,.address').keyup(function () {
            if ($(this).val() == '') {
                $(this).css('backgroundImage', 'url(/v/lnqp/img/input-icon1.png)');
            } else {
                $(this).css('backgroundImage', 'url(/v/lnqp/img/input-icon2.png)');
            }
        });

        $('.yz').on('click', function () {
            getYzcode();
        });

        $('#btn').on('click', function () {
           send();
        });

        function getCheckCode(cb) { // 获取手机验证码
            var javai = CHECKCODE_URL;
            var req = {
                "phonenum": $('.tel').val()
            };
            vge.callJApi(javai, req, function (jo) {
                if (jo.result.code == '0') {
                    if (jo.result.businessCode == '0') {
                        cb(); //成功，开始倒计时
                    } else if (jo.result.businessCode === '2') {
                        title_tip('尊敬的用户', '您填写的手机号错误，发送验证码失败！', '我知道了');
                    } else { //1 为服务器报错
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    }
                } else { //code!='0'
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            });
        }

        function getYzcode() {
            if ($('.name').val() === '' || $('.name').val().indexOf(' ') !== -1) {
                title_tip('提 示', '请输入正确的姓名哦！~', '我知道了');
            } else if (!reg2.test($('.idcard').val()) || !getIdcardValidateCode($('.idcard').val())) {
                title_tip('提 示', '请填写正确的身份证号哦！~', '我知道了');
            } else if ($('.address').val() === '' || $('.address').val().indexOf(' ') !== -1) {
                title_tip('提 示', '请填写正确的收货地址！~', '我知道了');
            } else if (!reg1.test($('.tel').val())) {
                title_tip('提 示', '请填写正确的手机号！~', '我知道了');
            } else {
                if ($('.yz').val() === '获取验证码' || $('.yz').val() === '重新获取') {
                    getCheckCode(function () {
                        countdown(dom_get, 60);
                    });
                } else {
                    $('.yz').off('click');
                }
            }
        }

        function countdown(tag, time) {
            var i = time;
            tag.value = i + '秒';
            countdowntimer = setInterval(function () {
                i--;
                tag.value = i + '秒';
                if (i === 0) {
                    tag.value = '重新获取';
                    i = time;
                    clearInterval(countdowntimer); // 清除定时器
                    $('.yz').on('click', function () {
                        getYzcode();
                    });
                    countdowntimer = null;
                }
            }, 1000);
        }

        function send() {
            if ($('.name').val() === '' || $('.name').val().indexOf(' ') !== -1) {
                title_tip('提 示', '请输入正确的姓名哦！~', '我知道了');
            } else if (!reg2.test($('.idcard').val()) || !getIdcardValidateCode($('.idcard').val())) {
                title_tip('提 示', '请填写正确的身份证号哦！~', '我知道了');
            } else if ($('.address').val() === '' || $('.address').val().indexOf(' ') !== -1) {
                title_tip('提 示', '请填写正确的收货地址！~', '我知道了');
            } else if (!reg1.test($('.tel').val())) {
                title_tip('提 示', '请填写正确的手机号！~', '我知道了');
            } else {
                sub_message();
            }
        }

        function sub_message() { // 提交注册信息
            var javai = SUBMESSAGE_URL;
            var req = {
                "openid": openid,
                "unionid": unionid,
                "address": $('.address').val(),
                "username": $('.name').val(),
                "idcard": $('.idcard').val(),
                "skukey": skukey,
                "phonenum": $('.tel').val(),
                "grandPrizeType": grandPrizeType,
                "prizeVcode": prizeVcode,
                "captcha": $('.code').val()
            };
            vge.callJApi(javai, req, function (jo) {
                if (jo.result.code === '0') {
                    if (jo.result.businessCode === '0') {
                        title_tip('提 示', '您的中奖信息我们已经收到，请尽快拨打兑奖电话联系我们进行身份核实', '我知道了');
                        $('.alert').html('温馨提示：您的信息已提交成功，请耐心等待主办方与您联系');
                        $('#btn').val('提交成功');
                        $('#btn').attr('disabled', 'true');
                        $('.yz').attr('disabled', 'true');
                        $('.code').css('display', 'none');
                        $('.yz').css('display', 'none');
                        $('.tel').css('border', 'none');
                        $('.name').attr('readOnly', 'true');
                        $('.idcard').attr('readOnly', 'true');
                        $('.tel').attr('readOnly', 'true');
                    } else if (jo.result.businessCode == '1') { //1
                        title_tip('提 示', '验证码已失效', '我知道了');
                    } else if (jo.result.businessCode == '2') { //2
                        title_tip('提 示', '您填写的验证码有误', '我知道了');
                    } else if (jo.result.businessCode == '-1') {
                        title_tip('提 示', '系统升级中...', '我知道了');
                    } else if (jo.result.businessCode == '4') {
                        title_tip('提 示', '兑奖截止时间已过期', '我知道了');
                    } else {
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    }
                } else { //code!='0'
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            });
        }

        $('.rule').on('click', function () {
            console.log(RULE_HREF);
            window.location.href = RULE_HREF;
        });
        $('.secret').on('click', function () {
            console.log(SECRET_HREF);
            window.location.href = SECRET_HREF;
        });
    });
})()