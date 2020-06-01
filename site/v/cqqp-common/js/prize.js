'use strict'

var CHECKCODE_URL = vge.common + '/vjifenInterface/user/getCaptcha';
var SUBMESSAGE_URL = vge.common + '/vjifenInterface/user/savePrize';
var RULE_HREF = 'https://mp.weixin.qq.com/s?__biz=MzIxNDE4NTQ4MA==&mid=502752198&idx=1&sn=27e9ecf95ba9d9b726db89dea94a741f&chksm=0fa8a0a138df29b795f77527ee658f6c9b9b0e4b4334e86b2a4e367513eedecf1f1b0ae451d8#rd';
var SECRET_HREF = 'https://mp.weixin.qq.com/s?__biz=MzIxNDE4NTQ4MA==&mid=502752202&idx=1&sn=2a0a901a585e39b4ce701bd5b44f6afe&chksm=0fa8a0ad38df29bbcdfb8f3434312d4105fe34331000ef0de00b3a5faf9fa293677ec4b26907#rd';

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
    if(grandPrizeType == '1'){
        init();
    }
    function init() {
        if (bizcode == 15) {
            $('.info').css('display', 'none');
            $('.get').css('display', 'none');
            $('.repcash').css('display', 'block');
            $('.earnTime').html(earnTime);
        } else {
            if (again == 'true' || again == true) {
                $('.info').css('display', 'block');
                if (idcard != '' && phonenum != '' && username != '') { //已经填写过信息
                    $('.get').css('display', 'none');
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
                }
            } else {
                if (idcard != '' && phonenum != '' && username != '') { //已经填写过信息
                    $('.get').css('display', 'none');
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
        if (!$('.name').val() == '' && !$('.name').val().indexOf(' ') !== -1 ) {
            send();
        }
    });


    function getCheckCode(cb) { // 获取手机验证码
        var javai = CHECKCODE_URL;
        var req = {
			"projectServerName": "chongqing",
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
        }else if (!reg1.test($('.tel').val())) {
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
        }else if (!reg1.test($('.tel').val())) {
            title_tip('提 示', '请填写正确的手机号！~', '我知道了');
        } else {
            sub_message();
        }
    }

    function sub_message() { // 提交注册信息
        var javai = SUBMESSAGE_URL;
        var req = {
			"projectServerName": "chongqing",
            "openid": openid,
            "unionid": unionid,
            "address": 'address',
            "username": $('.name').val(),
            "idcard": '0000',
            "skukey": skukey,
            "phonenum": $('.tel').val(),
            "grandPrizeType": grandPrizeType,
            "prizeVcode": prizeVcode,
            "captcha": $('.code').val()
        };
        vge.callJApi(javai, req, function (jo) {
            if (jo.result.code === '0') {
                if (jo.result.businessCode === '0') {
                    title_tip('提 示', '您的中奖信息我们已经收到，请拨打<br> 023-67532586联系我们进行身份核实', '我知道了');
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
                    sessionStorage.idcard = $('.idcard').val();
                    sessionStorage.username = $('.name').val();
                    sessionStorage.phonenum = $('.tel').val();
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
        window.location.href = RULE_HREF;
    });
    $('.secret').on('click', function () {
        window.location.href = SECRET_HREF;
    });
});