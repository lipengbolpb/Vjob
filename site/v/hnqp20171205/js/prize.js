'use strict'

var CHECKCODE_URL = vge.hnqp + '/DBTHuaNQPInterface/user/getCaptcha';
var SUBMESSAGE_URL = vge.hnqp + '/DBTHuaNQPInterface/user/savePrize';
var RULE_HREF = 'https://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502814650&idx=1&sn=b1f5383305d3095ab91a8824fe5c66cc&chksm=087295643f051c724ad3dfc0625615e175b78154ce3c219812839eb373881e4b2188ebbd3cb3#rd';
var SECRET_HREF = 'https://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502814652&idx=1&sn=c7438fdd674233312db14254bec6c30d&chksm=087295623f051c7466342c1a4c50eab1e81a478954d603dacd8ce33df71ad1cf6b27ed025d7b#rd';

var dom_get = document.getElementsByClassName('yz')[0];

var reg1 = /^1[0-9]{10}$/, //验证手机号
    reg2 = /^[1-9][0-9xX]{17}$/, //验证身份证号
    reg3 = /^[0-9]{4}$/;

var openid = sessionStorage.openid === undefined ? '' : sessionStorage.openid,
    username = sessionStorage.username === undefined ? '' : sessionStorage.username,
    idcard = sessionStorage.idcard === undefined ? '' : sessionStorage.idcard,
    phonenum = sessionStorage.phonenum === undefined ? '' : sessionStorage.phonenum,
    skukey = sessionStorage.skukey === undefined ? '' : sessionStorage.skukey,
    address = sessionStorage.address === undefined ? '' : sessionStorage.address,
    earnTime = sessionStorage.earnTime === undefined ? '' : sessionStorage.earnTime,
    prizeVcode = sessionStorage.prizeVcode === undefined ? '' : sessionStorage.prizeVcode, //具体码
    grandPrizeType = sessionStorage.grandPrizeType === undefined ? '' : sessionStorage.grandPrizeType; //特等奖类别
var countdowntimer = null;
var flag = sessionStorage.flag === undefined ? '' : sessionStorage.flag;
var args = vge.urlparse(location.href),
    bizcode = args.bizcode;
$(document).ready(function () {
    init();

    function init() {
        if (grandPrizeType == '1') { //手机
            $('.repslogan').attr('src', '/v/hnqp20171205/img/prize-2.png');
            $('.ck').css('top', '17rem');
            $('.getslogan').css({
                'width': '60%',
                'left': '20%'
            });
            $('.getslogan').attr('src', '/v/hnqp20171205/img/prize-slogan2.png');
            $('.drum').css({
                'width': '35%',
                'left': '32.5%',
                'top': '9.5rem'
            });
            $('.drum').attr('src', '/v/hnqp20171205/img/prize-2.png');
            $('#prizeslogan').css({
                'width': '40%',
                'left': '30%'
            });
            $('#prizeslogan').attr('src', '/v/hnqp20171205/img/prizecash-2.png');
            $('.type').html('一等奖');
            $('.p1').html('华为Mata8手机1部(价值2399元，共166个，中奖率：0.003‰)');
            $('.p2').html('活动区域：广东省 <br > 活动截止时间： 2018 年11月30日 <br > 兑奖截止时间： 2018 年12月31日 ');
        } else if (grandPrizeType == '2') { //手环
            $('.repslogan').attr('src', '/v/hnqp20171205/img/prize-3.png');
            $('.ck').css('top', '17rem');
            $('.getslogan').css({
                'width': '60%',
                'left': '20%'
            });
            $('.getslogan').attr('src', '/v/hnqp20171205/img/prize-slogan2.png');
            $('.drum').css({
                'width': '35%',
                'left': '32.5%',
                'top': '9.5rem'
            });
            $('.drum').attr('src', '/v/hnqp20171205/img/prize-3.png');
            $('#prizeslogan').css({
                'width': '40%',
                'left': '30%'
            });
            $('#prizeslogan').attr('src', '/v/hnqp20171205/img/prizecash-3.png');
            $('.type').html('二等奖');
            $('.p1').html('华为B2智能手环1个(价值599元，共1666个，中奖率：0.017‰)');
            $('.p2').html('活动区域：广东省 <br > 活动截止时间： 2018 年11月30日 <br > 兑奖截止时间： 2018 年12月31日 ');
        } else if (grandPrizeType == 'p' || grandPrizeType == 'P') { //俄罗斯之旅
            $('.repslogan').attr('src', '/v/hnqp20171205/img/prize-1.png');
            $('.getslogan').attr('src', '/v/hnqp20171205/img/prize-slogan.png');
            $('.drum').attr('src', '/v/hnqp20171205/img/prize-1.png');
            $('#prizeslogan').attr('src', '/v/hnqp20171205/img/prizecash-1.png');
            $('.type').html('畅赢奖');
            $('.p1').html('俄罗斯之旅1次(价值4999元，共1000个，中奖率:0.001‰)');
            $('.p2').html('活动区域：全国 <br > 活动截止时间： 2018 年08月30日 <br > 兑奖截止时间： 2018 年09月30日 ');
        }
        if (bizcode == 15) { //大奖核销
            $('.cash').css('display', 'none');
            $('.get').css('display', 'none');
            $('.repcash').css('display', 'block');
            $('.earnTime').html(earnTime);
        } else {
            if (flag == 'true' || flag == true) {
                if (phonenum != '' && username != '') { //已经填写过信息
                    $('.get').css('display', 'none');
                    $('.cash').css('display', 'block');
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
                $('.cash').css('display', 'block');
            } else {
                if (phonenum != '' && username != '') { //已经填写过信息
                    $('.get').css('display', 'none');
                    $('.cash').css('display', 'block');
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
        $('.cash').fadeIn();
        sessionStorage.flag = true;
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
        } else if (!reg3.test($('.code').val())) {
            title_tip('提 示', '请填写正确的验证码！~', '我知道了');
        } else {
            if (openid == '' || openid == 'undefined' || prizeVcode == '' || prizeVcode == 'undefined') {
                title_tip('提 示', '信息缺失，无法提交信息！', '我知道了');
            } else {
                sub_message();
            }
        }
    }

    function sub_message() { // 提交注册信息
        var javai = SUBMESSAGE_URL;
        var req = {
            "openid": openid,
            "address": 'address',
            "username": $('.name').val(),
            "idcard": '000000',
            "skukey": skukey,
            "phonenum": $('.tel').val(),
            "grandPrizeType": grandPrizeType,
            "prizeVcode": prizeVcode,
            "captcha": $('.code').val(),
            "longitude": sessionStorage.longitude === undefined ? '' : sessionStorage.longitude, //"经度"
            "latitude": sessionStorage.latitude === undefined ? '' : sessionStorage.latitude //"纬度"
        };
        vge.callJApi(javai, req, function (jo) {
            if (jo.result.code === '0') {
                if (jo.result.businessCode === '0') {
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
                    sessionStorage.username = $('.name').val();
                    sessionStorage.idcard = $('.idcard').val();
                    sessionStorage.phonenum = $('.tel').val();
                    title_tip('提 示', '您的中奖信息我们已经收到，请拨打该页面的联系电话联系我们进行身份核实', '我知道了');
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

    $('.rule,#rule').on('click', function () {
        window.location.href = RULE_HREF;
    });
    $('.secret,#secret').on('click', function () {
        window.location.href = SECRET_HREF;
    });
});