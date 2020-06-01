'use strict'

var CHECKCODE_URL = vge.common + '/vjifenInterface/user/getCaptcha';
var SUBMESSAGE_URL = vge.common + '/vjifenInterface/user/savePrize';
var RULE_HREF = 'https://mp.weixin.qq.com/s?__biz=MzU2NjMyNTAzMw==&mid=100000005&idx=1&sn=0290eb9f3eddf1d7cd0302131a549260&chksm=7caf7b434bd8f255c8e94cd828c4c339208a5e85ebcb8cbc77c31a7d7b8e26fc1c16364f3925#rd';
var SECRET_HREF = 'https://mp.weixin.qq.com/s?__biz=MzIzMTA1NzgzNw==&mid=100000068&idx=1&sn=d40592846894297af0261c314a42a7e9&chksm=68a8b1865fdf389049cb81239ac2f9f72c7bb313c96d39ee4589fdbcc95454791f932857cf23#rd';

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
var again = sessionStorage.againprize === undefined ? '' : sessionStorage.againprize;
var args = vge.urlparse(location.href),
    bizcode = args.bizcode;


$(document).ready(function () {
    if (grandPrizeType == '1') { //华为手机
        $('.get .prize_phone,.info .slogan').attr('src', '/v/qmbp/img/prize_phone.png');
    } else if (grandPrizeType == 'p' || grandPrizeType == 'P') { //跑步机
        $('.info .slogan').css({
            'width': '60%'
        });
        $('.prizetype').attr('src', '/v/qmbp/img/prize-type-1.png');
        $('.info .slogan').attr('src', '/v/qmbp/img/prize-1.png');
        $('.prizeTitle').text('一等奖');
        $('.prizeName').text('小米生态链WalkingPad轻运动走步机一部（共188部）');
        $('.describe').html('活动截止时间： 2019 年12月31日<br>兑奖截止时间： 2020 年10月31日');
    } else if (grandPrizeType == 'q' || grandPrizeType == 'Q') { //小AI同学
        $('.info .slogan').css({
            'width': '28%'
        });
        $('.prizetype').attr('src', '/v/qmbp/img/prize-type-2.png');
        $('.info .slogan').attr('src', '/v/qmbp/img/prize-2.png');
        $('.prizeTitle').text('二等奖');
        $('.prizeName').text('小米AI智能音箱一部（共1888部）');
        $('.describe').html('活动截止时间： 2019 年12月31日<br>兑奖截止时间： 2020 年10月31日');
    } else if (grandPrizeType == 'r' || grandPrizeType == 'R') { //R等奖  美的便携榨汁机壹台 
        $('.info .slogan').css({  //悦享
            'width': '28%'
        });
        $('.prizetype').attr('src', '/v/qmbp/img/prize-type-yuexiang.png');
        $('.info .slogan').attr('src', '/v/qmbp/img/prize-yuexiang.png');  //填写页面的产品
        $('.prizeTitle').text('悦享奖');
        $('.prizeName').text('奖价值199元“美的便携榨汁机”壹台（共1888张）');
        $('.describe').html('活动截止时间：2020年12月31日 <br>兑奖截止时间：2021年10月31日');
    } else if (grandPrizeType == 's' || grandPrizeType == 'S') { // S等奖 双人一间夜精品民宿斟享卡一张 
        $('.info .slogan').css({ //斟享
            'width': '28%'
        });
        $('.prizetype').attr('src', '/v/qmbp/img/prize-type-zhenxiang.png');
        $('.info .slogan').attr('src', '/v/qmbp/img/prize-zhenxiang.png');  //填写页面的产品
        $('.prizeTitle').text('斟享奖');
        $('.prizeName').text('奖价值1288元“双人一间夜精品民宿斟享卡”壹张（共288张）');
        $('.describe').html(' 活动截止时间：2020年12月31日<br>兑奖截止时间：2021年10月31日');
    }else if (grandPrizeType == 't' || grandPrizeType == 'T') { // T等奖 500ml罐装全麦白啤全年1罐/天（共366罐） 
        $('.info .slogan').css({    //尊享
            'width': '28%'
        });
        $('.prizetype').attr('src', '/v/qmbp/img/prize-type-zunxiang.png');
        $('.info .slogan').attr('src', '/v/qmbp/img/prize-zunxiang.png');  //填写页面的产品
        $('.prizeTitle').text('尊享奖');
        $('.prizeName').text('奖价值2700元“全年500ml罐装全麦白啤1罐/天（总计366罐）”尊享礼遇壹席（共188名）');
        $('.describe').html('活动截止时间：2020年12月31日<br>兑奖截止时间：2021年10月31日');
    } else {
        $('.get .prize_phone,.info .slogan').attr('src', 'null');
        $('.prizetype,.info .slogan').attr('src', 'null');
        return;
    }
    init();


    function init() {
        if (bizcode == 15) {
            $('.info').css('display', 'none');
            $('.get').css('display', 'none');
            $('.get-new').css('display', 'none');
            $('.repcash').css('display', 'block');
            $('.earnTime').html(earnTime);
            if (grandPrizeType == 'p' || grandPrizeType == 'P') {
                $('.repcash .slogan').attr('src','/v/qmbp/img/prize-1.png');
                $('.repcash .slogan').css('width','8.5rem');
            } else if (grandPrizeType == 'q' || grandPrizeType == 'Q') {
                $('.repcash .slogan').attr('src','/v/qmbp/img/prize-2.png');
            } else if (grandPrizeType == '1') {
                $('.repcash .slogan').attr('src','/v/qmbp/img/prize_phone.png');
            } else if (grandPrizeType == 'r' || grandPrizeType == 'R') {
                $('.repcash .slogan').attr('src','/v/qmbp/img/prize-yuexiang.png');
            }else if (grandPrizeType == 's' || grandPrizeType == 'S') {
                $('.repcash .slogan').attr('src','/v/qmbp/img/prize-zhenxiang.png');
            }else if (grandPrizeType == 't' || grandPrizeType == 'T') {
                $('.repcash .slogan').attr('src','/v/qmbp/img/prize-zunxiang.png');
            }
        } else {
            if (again == 'true' || again == true) {
                $('.info').css('display', 'block');
                $('.get').css('display', 'none');
                $('.get-new').css('display', 'none');
            } else {
                if (idcard != '' && phonenum != '' && username != '') { //已经填写过信息
                    $('.get').css('display', 'none');
                    $('.get-new').css('display', 'none');
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
                    // 判断奖品type
                    if (grandPrizeType == 'p' || grandPrizeType == 'P') {
                        $('.get-new').css('display', 'block');
                    } else if (grandPrizeType == 'q' || grandPrizeType == 'Q') {
                        $('.get-new').css('display', 'block');
                    } else if (grandPrizeType == '1') {
                        $('.get').css('display', 'block');
                    } else if (grandPrizeType == 'r' || grandPrizeType == 'R') {
                        $('.get-new').css('display', 'block');
                    } else if (grandPrizeType == 's' || grandPrizeType == 'S') {
                        $('.get-new').css('display', 'block');
                    } else if (grandPrizeType == 't' || grandPrizeType == 'T') {
                        $('.get-new').css('display', 'block');
                    }
                }
            }
        }
    }

    $('.ck').on('click', function () {
        $('.get').fadeOut();
        $('.get-new').fadeOut();
        $('.info').fadeIn();
        sessionStorage.againprize = true;
    });
    $('.name,.idcard,.tel,.code').keyup(function () {
        if ($(this).val() == '') {
            $(this).css('backgroundImage', 'url(img/input-icon2.png)');
        } else {
            $(this).css('backgroundImage', 'url(img/input-icon2.png)');
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
            "projectServerName":"qmbaipi",
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
            getCheckCode(function () {
                countdown(dom_get, 60);
            });
            // if ($('.yz').val() === '获取验证码' || $('.yz').val() === '重新获取') {
            //     // $('.yz').off('click');
            //     getCheckCode(function () {
            //         countdown(dom_get, 60);
            //     });
            // }
            // else {
            //     $('.yz').off('click');
            // }
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
            sub_message();
        }
    }

    function sub_message() { // 提交注册信息
        var javai = SUBMESSAGE_URL;
        var req = {
            "projectServerName":"qmbaipi",
            "openid": openid,
            "unionid": unionid,
            "address": 'address',
            "username": $('.name').val(),
            "idcard": '00000',
            "skukey": skukey,
            "phonenum": $('.tel').val(),
            "grandPrizeType": grandPrizeType,
            "prizeVcode": prizeVcode,
            "captcha": $('.code').val()
        };
        vge.callJApi(javai, req, function (jo) {
            if (jo.result.code === '0') {
                if (jo.result.businessCode === '0') {
                    title_tip('提 示', '您的中奖信息我们已经收到，请拨打<br> 0532-81639128联系我们进行身份核实', '我知道了');
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
        //为了判断2020年
        var skuYear = sessionStorage.skuYear == undefined ? '' : sessionStorage.skuYear; 
        if(skuYear == '2020'){ //2020年
            window.location.href = 'https://mp.weixin.qq.com/s?__biz=MzU2NjMyNTAzMw==&mid=100000329&idx=1&sn=d019cbbdd6c76dd65338ad3c2f3ba9e3&chksm=7caf780f4bd8f119525ef7a4b69855ea127a73c6c9db05f062a7f9dcc9a26e14978570efdfd6#rd';
        } else{
            window.location.href = RULE_HREF;
        }
    });
});