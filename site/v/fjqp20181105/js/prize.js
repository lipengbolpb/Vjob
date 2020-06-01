(function () {
    'use strict'

    var CHECKCODE_URL = vge.fjqp + '/DBTFJQPInterface/user/getCaptcha';
    var SUBMESSAGE_URL = vge.fjqp + '/DBTFJQPInterface/user/savePrize';
    var RULE_HREF = 'https://mp.weixin.qq.com/s?__biz=MzIzMTA1NzgzNw==&mid=100000102&idx=1&sn=c9cfb48549e0525e2cf9f30c65cbf20a&chksm=68a8b1a45fdf38b2e19e1e106686549c55544f9b838421d033107a08af2a1f0425b020845fbc#rd';
    var SECRET_HREF = 'https://mp.weixin.qq.com/s?__biz=MzIzMTA1NzgzNw==&mid=100000104&idx=1&sn=4ea18774fc4e02738025cd542ac64bf0&chksm=68a8b1aa5fdf38bcf95842608a0944912fb97f981f7b3bd5b7542e1a35d4cf3bbfaab2809e47#rd';
    var PHONE_NUM = '0592-3663963';

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
            if (grandPrizeType == 'r' || grandPrizeType == 'R') {
                // 青岛之旅
                $('.prize').attr('src', '/v/fjqp20181105/img/prize-1.png');
                $('.infoSlogan').attr('src', '/v/fjqp20181105/img/prize-info-1.png');
                $('.infoSlogan').css('width', '65%');
                $('.repcashSlogan').attr('src', '/v/fjqp20181105/img/prize-info-1.png');
                $('.repcashSlogan').css('width', '65%');
                $('.prizeName').text('畅赢奖');
                $('.prizeType').text('青岛寻源之旅');
                $('.content').html('<p>青岛寻源之旅1名，价值4999元，共6个</p><p>活动区域：福建省<br>活动截止时间：2018年12月31日<br>兑奖截止时间：2019年06月30日</p>');
            } else if (grandPrizeType == '1') {
                // 小米电饭煲
                $('.prize').attr('src', '/v/fjqp20181105/img/prize-2.png');
                $('.infoSlogan').attr('src', '/v/fjqp20181105/img/prize-info-2.png');
                $('.repcashSlogan').attr('src', '/v/fjqp20181105/img/prize-info-2.png');
                $('.prizeName').text('欢聚奖');
                $('.prizeType').text('小米4升IH电饭煲');
                $('.content').html('<p>小米4升IH电饭煲1个，价值599元，共100个</p><p>活动区域：福建省<br>活动截止时间：2018年12月31日<br>兑奖截止时间：2019年06月30日</p>');
            } else if (grandPrizeType == '2') {
                // 青啤有一套
                $('.prize').attr('src', '/v/fjqp20181105/img/prize-3.png');
                $('.infoSlogan').attr('src', '/v/fjqp20181105/img/prize-info-3.png');
                $('.repcashSlogan').attr('src', '/v/fjqp20181105/img/prize-info-3.png');
                $('.repcashSlogan').css('width', '40%');
                $('.prizeName').text('畅饮奖');
                $('.prizeType').text('"青岛啤酒有一套"礼盒');
                $('.content').html('<p>"青岛啤酒有一套"礼盒1个，价值78元，共1888个</p><p>活动区域：福建省<br>活动截止时间：2018年12月31日<br>兑奖截止时间：2019年06月30日</p>');
            }
            if (bizcode == 15) {
                $('.info').css('display', 'none');
                $('.get').css('display', 'none');
                $('.repcash').css('display', 'block');
                $('.earnTime').html(earnTime);
            } else {
                if (again == 'true' || again == true) {
                    $('.info').css('display', 'block');
                } else {
                    if (phonenum != '' && username != '') { //已经填写过信息
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
            // vge.callJApi(javai, req, function (jo) {
            //     if (jo.result.code == '0') {
            //         if (jo.result.businessCode == '0') {
            //             cb(); //成功，开始倒计时
            //         } else if (jo.result.businessCode === '2') {
            //             title_tip('尊敬的用户', '您填写的手机号错误，发送验证码失败！', '我知道了');
            //         } else { //1 为服务器报错
            //             title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            //         }
            //     } else { //code!='0'
            //         title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            //     }
            // });
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