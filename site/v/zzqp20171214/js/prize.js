'use strict'

$(document).ready(function () {
    var args = vge.urlparse(location.href),
        bizcode = args.bizcode;
    var reg1 = /^1[0-9]{10}$/, //验证手机号
        reg2 = /^[1-9][0-9xX]{17}$/, //验证身份证号
        reg3 = /^[0-9]{4}$/;
    var openid = sessionStorage.openid === undefined ? '' : sessionStorage.openid,
        unionid = sessionStorage.unionid === undefined ? '' : sessionStorage.unionid,
        username = sessionStorage.username === undefined ? '' : sessionStorage.username,
        idcard = sessionStorage.idcard === undefined ? '' : sessionStorage.idcard,
        phonenum = sessionStorage.phonenum === undefined ? '' : sessionStorage.phonenum,
        sweepCode = sessionStorage.sweepCode === undefined ? '' : sessionStorage.sweepCode, //二维码
        address = sessionStorage.address === undefined ? '' : sessionStorage.address,
        earnTime = sessionStorage.earnTime === undefined ? '' : sessionStorage.earnTime;
    var countdowntimer = null;
    var init = function () {
        switch (bizcode) {
            case '6': //世界杯门票
                $('.icon').css('width', '70%');
                $('.icon').attr('src', '/v/zzqp20171214/img/prize-0.png?v=1');
                $('.content').attr('src', '/v/zzqp20171214/img/prize-content-0.png?v=2');
                $('.notice').attr('src','/v/zzqp20171214/img/prize-notice_dajiang.png?v=2');
                $('.phoneNum').html('13223066458');
                break;
            case '7': //俄罗斯之旅
                $('.icon').css('width', '50%');
                $('.classify').text('2018年俄罗斯旅游大奖一人次');
                $('.icon').attr('src', '/v/zzqp20171214/img/prize-1.png');
                $('.content').attr('src', '/v/zzqp20171214/img/prize-content-1.png');
                $('.notice').attr('src','/v/zzqp20171214/img/prize-notice.png?v=2');
                $('.phoneNum').html('15378785617');
                break;
            case '8': //运动手环
                $('.icon').css('width', '30%');
                $('.classify').text('华为运动手环一个');
                $('.icon').attr('src', '/v/zzqp20171214/img/prize-2.png');
                $('.content').attr('src', '/v/zzqp20171214/img/prize-content-2.png');
                $('.notice').attr('src','/v/zzqp20171214/img/prize-notice.png?v=2');
                $('.phoneNum').html('15378785617');
                break;
            case '9': //足球
                $('.icon').css('width', '35%');
                $('.classify').text('青岛啤酒定制足球一个');
                $('.icon').attr('src', '/v/zzqp20171214/img/prize-3.png');
                $('.content').attr('src', '/v/zzqp20171214/img/prize-content-3.png?v=1');
                $('.notice').attr('src','/v/zzqp20171214/img/prize-notice_football.png?v=2');
                // $('.phoneNum').html('15378785617');
                $('.change-content').html('<p>兑奖说明</p><ul><li>特等奖、一等奖奖项的兑付将根据中奖情况统一安排出行时间，具体时间将另行通知中奖者。逾期未要求兑付或者逾期中出的奖项将不再兑付。二等奖、三等奖中奖者，我们将会采取邮寄的方式将实物奖品邮寄至消费者，请根据提示准确填写您的收货信息。<br>积分奖中奖者根据活动页面提示，直接将积分存入"我的积分"中</li><li>每个拉环内二维码扫码成功只能获得一次奖项。</li><li>本次活动非线上促销，通过任何电子商务平台购得的有奖产品，本公司将不予兑付。</li><li>在河南省及湖北省以外购得产品，本公司将不予兑付。</li></ul>');
                break;
        }
        if (idcard != '' && phonenum != '' && username != '') { //已经填写过信息
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
        }
        $('.ck').on('click', function () {
            $('.change').css('display', 'block');
        });
        $('.close').on('click', function () {
            $('.change').css('display', 'none');
        });
        $('.name,.idcard,.tel,.code,.address').keyup(function () {
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
            if (!$('.name').val() == '' && !$('.name').val().indexOf(' ') !== -1 && reg2.test($('.idcard').val()) && getIdcardValidateCode($('.idcard').val()) && reg1.test($('.tel').val()) && reg3.test($('.code').val())) {
                send();
            }
        });
    }

    var getCheckCode = function (cb) {
        var data = {
            "phonenum": $('.tel').val(),
            "sendtype": '0'
        };
        $.ajax({
            type: "POST",
            url: vge.zzqp + '/DBTHNQPInterface/user/getCaptcha',
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (res, status, xhr) {
                console.log(res);
                if (res.result.code == '0') {
                    if (res.result.businessCode == '0') {
                        cb(); //成功，开始倒计时
                    } else if (res.result.businessCode === '2') {
                        title_tip('尊敬的用户', '您填写的手机号错误，发送验证码失败！', '我知道了');
                    } else { //1 为服务器报错
                        title_tip('提 示', res.result.msg, '我知道了');
                    }
                } else { //code!='0'
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            },
            error: function (res, status, xhr) {
                console.log(res);
            }
        });
    }
    var getYzcode = function () {
        if ($('.name').val() === '' || $('.name').val().indexOf(' ') !== -1) {
            title_tip('提 示', '请输入正确的姓名哦！~', '我知道了');
        } else if ($('.address').val() === '' || $('.address').val().indexOf(' ') !== -1) {
            title_tip('提 示', '请输入正确的地址哦！~', '我知道了');
        } else if (!reg2.test($('.idcard').val()) || !getIdcardValidateCode($('.idcard').val())) {
            title_tip('提 示', '请填写正确的身份证号哦！~', '我知道了');
        } else if (!reg1.test($('.tel').val())) {
            title_tip('提 示', '请填写正确的手机号！~', '我知道了');
        } else {
            if ($('.yz').val() === '获取验证码' || $('.yz').val() === '重新获取') {
                getCheckCode(function () {
                    countdown($('.yz'), 60);
                });
            } else {
                $('.yz').off('click');
            }
        }
    }
    var countdown = function (tag, time) {
        let i = time;
        tag.val(i + '秒');
        countdowntimer = setInterval(function () {
            i--;
            tag.val(i + '秒');
            if (i === 0) {
                tag.val('重新获取');
                i = time;
                clearInterval(countdowntimer); // 清除定时器
                $('.yz').on('click', function () {
                    getYzcode();
                });
                countdowntimer = null;
            }
        }, 1000);
    }
    var send = function () {
        if ($('.name').val() === '' || $('.name').val().indexOf(' ') !== -1) {
            title_tip('提 示', '请输入正确的姓名哦！~', '我知道了');
        } else if ($('.address').val() === '' || $('.address').val().indexOf(' ') !== -1) {
            title_tip('提 示', '请输入正确的地址哦！~', '我知道了');
        } else if (!reg2.test($('.idcard').val()) || !getIdcardValidateCode($('.idcard').val())) {
            title_tip('提 示', '请填写正确的身份证号哦！~', '我知道了');
        } else if (!reg1.test($('.tel').val())) {
            title_tip('提 示', '请填写正确的手机号！~', '我知道了');
        } else {
            sub_message();
        }
    }
    var sub_message = function () {
        var data = {
            "openid": openid,
            "prizeType": bizcode,
            "sweepCode": sweepCode,
            "userName": $('.name').val(),
            "idcard": $('.idcard').val(),
            "phoneNum": $('.tel').val(),
            "address": $('.address').val(),
            "captcha": $('.code').val(),
            "exchangeId": '' //兑换记录主键ID（只有积分抽奖传递）
        };
        $.ajax({
            type: "POST",
            url: vge.zzqp + '/DBTHNQPInterface/myInfo/exchangePrize',
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (res, status, xhr) {
                console.log(res);
                if (res.result.code === '0') {
                    if (res.result.businessCode === '0') {
                        var telNum = '';
                        if(bizcode == '6'){
                            title_tip('提 示', '您的中奖信息我们已经收到，请拨打<br>13223066458联系我们进行身份核实', '我知道了');
                        }else if(bizcode == '9'){
                            title_tip('提 示', '您的中奖信息我们已经收到', '我知道了');
                        }else{
                            title_tip('提 示', '您的中奖信息我们已经收到，请拨打<br>15378785617联系我们进行身份核实', '我知道了');
                        }
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
                        $('.address').attr('readOnly', 'true');
                    } else if (res.result.businessCode == '1') { //1
                        title_tip('提 示', res.result.msg, '我知道了');
                    } else if (res.result.businessCode == '2') { //2
                        title_tip('提 示', '您填写的验证码有误', '我知道了');
                    } else if (res.result.businessCode == '-1') {
                        title_tip('提 示', '系统升级中...', '我知道了');
                    } else if (res.result.businessCode == '4') {
                        title_tip('提 示', '兑奖截止时间已过期', '我知道了');
                    } else {
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    }
                } else { //code!='0'
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            },
            error: function (res, status, xhr) {
                console.log(res);
            }
        });
    }
    var musicStart = function () {
        $('.audio').addClass('running');
        document.getElementById('bgm').play();
    }

    var musicStop = function () {
        $('.audio').removeClass('running');
        document.getElementById('bgm').pause();
    }
    $('.audio').on('click', function () {
        if ($('.audio').hasClass('running')) {
            musicStop();
        } else {
            musicStart();
        }
    });
    $('.rule').on('click', function () {
        document.location.href = 'https://mp.weixin.qq.com/s?__biz=MzIxNzYzOTExOQ==&mid=100000281&idx=1&sn=83fa80fb2c6035459939f5e6237ff547&chksm=17f7f3b920807aaf89718185e0b7db14145a8c5aad2a5f3328038c51de360d57381f7ef289e9#rd';
    });
    $('.secret').on('click', function () {
        document.location.href = 'https://mp.weixin.qq.com/s?__biz=MzIxNzYzOTExOQ==&mid=100000283&idx=1&sn=3f74aa6887f92fb12739734006d4768d&chksm=17f7f3bb20807aadeb6636b1e6d1fbaa7e0c4fa2c75a66b1a6418b65c6d121a0d5e38c39ec37#rd';
    });

    init();
});