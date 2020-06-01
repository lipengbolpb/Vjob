'use strict'

var CHECKCODE_URL = vge.sdqp + '/DBTSDQPInterface/user/getCaptcha';
var SUBMESSAGE_URL = vge.sdqp + '/DBTSDQPInterface/user/savePrize';
var RULE_HREF = 'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503282601&idx=1&sn=d4719b7b5f8035e2bd864a0fccf8ca31&chksm=071dde18306a570ef77cd9f87c7cbdb39c424e0aef88b8043e218323225307cd61c045d3762a#rd';
var SECRET_HREF = 'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503282603&idx=1&sn=839432c78acaf688767c06e397b07f82&chksm=071dde1a306a570c9b7abbab3d420220ca7e05f864f3d698de7e96a5e36209d240d9d817e790#rd';
var PHONE_NUM = '4006800899';
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
    activityVersion = sessionStorage.activityVersion === undefined ? '' : sessionStorage.activityVersion,
    grandPrizeType = sessionStorage.grandPrizeType === undefined ? '' : sessionStorage.grandPrizeType; //特等奖类别
var countdowntimer = null;
var again = sessionStorage.again === undefined ? '' : sessionStorage.again;
var args = vge.urlparse(location.href),
    bizcode = args.bizcode;
if (activityVersion == '7') { //经典
    RULE_HREF = 'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503282609&idx=1&sn=1cc5d8ae02ab4428804b4f902990b8c0&chksm=071dde00306a5716feba1fca52584911cdcfc6bb73ad7093806eaafa4b68dbeda1f6591c7333#rd';
} else if (activityVersion == '8') { //1903
    RULE_HREF = 'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503282605&idx=1&sn=a6e309c7f2d498e11c98ce08224fc04d&chksm=071dde1c306a570adeb92c3896b6e3b7b313bf158c5becdd21953615bae0747fa7cc58b639d9#rd';
} else if (activityVersion == '9') { //纯生
    RULE_HREF = 'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503282607&idx=1&sn=4a8a5a0910196f50d57f21f436cb8890&chksm=071dde1e306a57080726f693b82ca3f392043e00b82c6d0d071279104a339f48bfd3af75029c#rd';
}
$(document).ready(function () {
    if (grandPrizeType == 'p' || grandPrizeType == 'P') {
        init();
    }

    function init() {
        if (bizcode == 15) {
            $('.info').css('display', 'none');
            $('.cash').css('display', 'none');
            $('.repcash').css('display', 'block');
            $('.earnTime').html(earnTime);
        } else {
            if (again == 'true' || again == true) {
                $('.info').css('display', 'block');
            } else {
                if (idcard != '' && phonenum != '' && username != '') { //已经填写过信息
                    $('.cash').css('display', 'none');
                    $('.info').css('display', 'block');
                    $('.name').val(username);
                    $('.idcard').val(idcard);
                    $('.tel').val(phonenum);
                    $('.name').attr('readOnly', true);
                    $('.idcard').attr('readOnly', true);
                    $('.tel').attr('readOnly', true);
                    $('#btn').attr('disabled', true);
                    $('.code').css('display', 'none');
                    $('.yz').css('display', 'none');
                    $('#btn').val('提交成功');
                    $('.alert').html('温馨提示：您的信息已提交成功，请耐心等待主办方与您联系');
                } else {
                    $('.cash').css('display', 'block');
                }
            }
        }
    }

    $('.ck').on('click', function () {
        $('.cash').fadeOut();
        $('.info').fadeIn();
        sessionStorage.again = true;
    });
    $('.ckff').on('click', function () {
        $('.change').css('display', 'block');
    });
    $('.close').on('click', function () {
        $('.change').css('display', 'none');
    });
    $('.name,.idcard,.tel,.code').keyup(function () {
        if ($(this).val() == '') {
            $(this).css('backgroundImage', 'url(img/input-icon1.png)');
        } else {
            $(this).css('backgroundImage', 'url(img/input-icon2.png)');
        }
    });

    $('.yz').on('click', function () {
        getYzcode();
    });

    $('#btn').on('click', function () {
        if (!$('.name').val() == '' && !$('.name').val().indexOf(' ') !== -1 && reg1.test($('.tel').val()) && reg3.test($('.code').val())) {
            send();
        }
    });


    function getCheckCode(cb) { // 获取手机验证码
        var javai = CHECKCODE_URL;
        var req = {
            "phonenum": $('.tel').val()
        };
        $.ajax({
            type: "POST",
            url: javai,
            data: JSON.stringify(req),
            dataType: 'json',
            success: function (jo, status, xhr) {
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
            },
            error: function (res, status, xhr) {
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            }
        });
    }

    function getYzcode() {
        if ($('.name').val() === '' || $('.name').val().indexOf(' ') !== -1) {
            title_tip('提 示', '请输入正确的姓名哦！~', '我知道了');
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
            "address": 'address',
            "username": $('.name').val(),
            "idcard": '000000',
            "skukey": skukey,
            "phonenum": $('.tel').val(),
            "grandPrizeType": grandPrizeType,
            "prizeVcode": prizeVcode,
            "captcha": $('.code').val()
        };
        $.ajax({
            type: "POST",
            url: javai,
            data: JSON.stringify(req),
            dataType: 'json',
            success: function (jo, status, xhr) {
                if (jo.result.code === '0') {
                    if (jo.result.businessCode === '0') {
                        title_tip('提 示', '您的中奖信息我们已经收到，请拨打<br> ' + PHONE_NUM + '联系我们进行身份核实', '我知道了');
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
            },
            error: function (res, status, xhr) {
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            }
        });
    }

    $('.rule').on('click', function () {
        window.location.href = RULE_HREF;
    });
    $('.secret').on('click', function () {
        window.location.href = SECRET_HREF;
    });
});