(function () {
    'use strict'

    var CHECKCODE_URL = vge.common + '/vjifenInterface/user/getCaptcha';
    var SUBMESSAGE_URL = vge.common + '/vjifenInterface/user/savePrize';
    var RULE_HREF = 'https://mp.weixin.qq.com/s?__biz=MzI3OTUzNzEzMQ==&mid=100002278&idx=1&sn=660a96d74a83b26d6adc875e2c0122e3&chksm=6b477d625c30f474ae6b19a2b2c4a05f0b9d085d852bf6c1ecee8fe85522967994029721f4f9#rd';
    var SECRET_HREF = '';
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
        grandPrizeType = sessionStorage.grandPrizeType === undefined ? '' : sessionStorage.grandPrizeType; //特等奖类别
    var countdowntimer = null;
    var again = sessionStorage.again === undefined ? '' : sessionStorage.again;
    var args = vge.urlparse(location.href),
        bizcode = args.bizcode;
    $(document).ready(function () {
        if (grandPrizeType == 'P' || grandPrizeType == 'p' || grandPrizeType == 'Q' || grandPrizeType == 'q'  || grandPrizeType == 'R' || grandPrizeType == 'r' || grandPrizeType == 'S' || grandPrizeType == 's') {
            // P为冬奥环球之旅 Q为青岛之旅  R等奖-冬奥冰雪冬令营 S等奖-青岛啤酒精酿有一套礼盒
            $('.msg').css('opacity','.6');
            init();
        }

        function init() {
            if (grandPrizeType == 'P' || grandPrizeType == 'p') { // P为冬奥环球之旅
                $('.qdTravel').css('display','none');
                $('.qdTravalInfo').css('display','none');
                $('.warning.travelTip').css('display','block');
                $('.prize-one').attr("src","img/prize1.png");
                $('.prize-bg').attr("src","img/prize-bg1.png");
            } else if (grandPrizeType == 'R' || grandPrizeType == 'r') { //R等奖-冬奥冰雪冬令营
                $('.qdTravel').css('display','none');
                $('.qdTravalInfo').css('display','none');
                $('.warning.travelTip').css('display','block');
                $('.prize-one').attr("src","img/prize2.png");
                $('.prize-bg').attr("src","img/prize-bg2.png");
            } else if (grandPrizeType == 'Q' || grandPrizeType == 'q') { //Q为青岛之旅
                $('.normalPrize').css('display','none');
                $('.normalPrizeInfo').css('display','none');
                $('#normalWay').css('display','none');
                $('.warning.travelTip').css('display','block');
                $('.prizeTypeRep').text('青岛之旅1次');
                // get页slogan
                $('.getSlogan').attr('src', 'img/prize-slogan-qingdao.png');
                // info页slogan
                $('.infoSlogan').attr('src', 'img/info-slogan-qingdao.png');
                // 大奖信息
                $('.prizeTypeTitle').text('三等奖');
                $('.contentTitle').text('青岛之旅1次，奖价值3200元（共100个）');
                $('.contentMain').text('中奖率：0.02‰，活动区域：江西省，兑奖截止时间：2020年01月31日。');
            } else if (grandPrizeType == 'S' || grandPrizeType == 's') { //S等奖-青岛啤酒精酿有一套礼盒
                $('.qdTravel').css('display','none');
                $('.qdTravalInfo').css('display','none');
                $('.warning.noTravelTip').css('display','block');
                $('.prize-one').attr("src","img/prize4.png");
                $('.prize-bg').attr("src","img/prize-bg4.png");
            }
            if (bizcode == 15) {
                $('.info').css('display', 'none');
                $('.get').css('display', 'none');
                $('.repcash').css('display', 'block');
                $('.earnTime').html(earnTime);
            } else {
                if (again == 'true' || again == true) {
                    $('.info').css('display', 'block');
                    if (phonenum != '' && username != '') {
                        $('.get').css('display', 'none');
                        $('.info').css('display', 'block');
                        $('.name').val(username);
                        // $('.idcard').val(idcard);
                        $('.tel').val(phonenum);
                        $('.name').attr('readOnly', true);
                        // $('.idcard').attr('readOnly', true);
                        $('.tel').attr('readOnly', true);
                        $('#btn').attr('disabled', 'true');
                        $('.code').css('display', 'none');
                        $('.yz').css('display', 'none');
                        $('#btn').val('提交成功');
                        $('.alert').html('温馨提示：您的信息已提交成功，请耐心等待主办方与您联系');
                    }
                } else {
                    if (phonenum != '' && username != '') { //已经填写过信息
                        $('.get').css('display', 'none');
                        $('.info').css('display', 'block');
                        $('.name').val(username);
                        // $('.idcard').val(idcard);
                        $('.tel').val(phonenum);
                        $('.name').attr('readOnly', true);
                        // $('.idcard').attr('readOnly', true);
                        $('.tel').attr('readOnly', true);
                        $('#btn').attr('disabled', 'true');
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
            // P为冬奥环球之旅 Q为青岛之旅  R等奖-冬奥冰雪冬令营 S等奖-青岛啤酒精酿有一套礼盒
            if(grandPrizeType == 'P' || grandPrizeType == 'p'||grandPrizeType == 'Q' || grandPrizeType == 'q'||grandPrizeType == 'R' || grandPrizeType == 'r'){
                $('.travel').css('display', 'block');
            }
            if(grandPrizeType == 'S' || grandPrizeType == 's'){
                $('.noTravel').css('display', 'block'); 
            }
            // $('.change').css('display', 'block');
        });
        $('.close').on('click', function () {
            if(grandPrizeType == 'P' || grandPrizeType == 'p'||grandPrizeType == 'Q' || grandPrizeType == 'q'||grandPrizeType == 'R' || grandPrizeType == 'r'){
              $('.travel').css('display', 'none');
            }
            if(grandPrizeType == 'S' || grandPrizeType == 's'){
              $('.noTravel').css('display', 'none');
            }
            // $('.change').css('display', 'none');
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
				"projectServerName": "jiangxi",
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
            } else {
                sub_message();
            }
        }

        function sub_message() { // 提交注册信息
            var javai = SUBMESSAGE_URL;
            var req = {
				"projectServerName": "jiangxi",
                "openid": openid,
                "unionid": unionid,
                "address": 'address',
                "username": $('.name').val(),
                "idcard": 'idcard',
                "skukey": skukey,
                "phonenum": $('.tel').val(),
                "grandPrizeType": grandPrizeType,
                "prizeVcode": prizeVcode,
                "captcha": $('.code').val()
            };
            vge.callJApi(javai, req, function (jo) {
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
                        // $('.idcard').attr('readOnly', 'true');
                        $('.tel').attr('readOnly', 'true');
                        sessionStorage.username = $('.name').val();
                        // sessionStorage.idcard = $('.idcard').val();
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
        // $('.scheduling').on('click', function () {
        //     window.location.href = SECRET_HREF;
        // });
    });
})()