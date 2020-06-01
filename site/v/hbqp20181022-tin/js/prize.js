(function () {
    'use strict';
    var grandPrizeType = sessionStorage.grandPrizeType === undefined ? '' : sessionStorage.grandPrizeType;

    var args = vge.urlparse(location.href),
        bizcode = args.bizcode;

    if (bizcode == 15) {
        $('#dj,#tip').css('visibility', 'hidden');
        $('#tip_1').html('被扫时间:' + sessionStorage.earnTime);
        $('.check').css('display', 'block');
        $('body').css({
            'overflow': 'hidden',
            'width': '100%',
            'height': '100%'
        });
        $('html').css({
            'overflow': 'hidden',
            'width': '100%',
            'height': '100%'
        });
    }

    // s足球 r金球
    if (sessionStorage.grandPrizeType == 'r' || sessionStorage.grandPrizeType == 'R') {
        $('.prize').attr('src', '/v/hbqp20181022/img/prize_1.png?v=4');
        $('.pic_tip').attr('src', '/v/hbqp20181022/img/border.png?v=4');
        $('.address_box').css('display', 'block');
    } else if (sessionStorage.grandPrizeType == 's' || sessionStorage.grandPrizeType == 'S') {
        $('.prize').attr('src', '/v/hbqp20181022/img/prize_2.png?v=4');
        $('.pic_tip').attr('src', '/v/hbqp20181022/img/border.png?v=4');
        $('.address_box').css('display', 'block');
    }

    var reg1 = /^1[0-9]{10}$/,
        reg2 = /^[1-9][0-9xX]{17}$/,
        reg3 = /^[0-9]{4}$/;

    var first = sessionStorage.first === undefined ? false : true;
    var get_yz = document.getElementById("get_yz");
    var countdowntimer = null;

    $('#rule').on('click', function () {
        location.replace("https://mp.weixin.qq.com/s?__biz=MzI5NjQ4MDMyNg==&mid=100000692&idx=1&sn=367d1708c25f5f5009fdf7b0cb03a002&chksm=6c42f89d5b35718b35ed6e7370eaedffad4597d0717e70878ada28c34e6637a844005aa11c3c#rd");
    });

    $('#private').on('click', function () {
        location.replace("https://mp.weixin.qq.com/s?__biz=MzI5NjQ4MDMyNg==&mid=100000689&idx=1&sn=69d3a1ae649f59ea7f5ad66a592055e4&chksm=6c42f8985b35718e073d8931de9a434cd3090c7b2dcd066fed41626f309fe06fb9ca8ccfb6f0#rd");
    });

    // 已经填写过
    if (sessionStorage.username != '' && sessionStorage.idcard != '' && sessionStorage.phonenum != '') {
        $('#user').val(sessionStorage.username);
        $('#id').val(sessionStorage.idcard);
        $('#tel').val(sessionStorage.phonenum);
        $('#address').val(sessionStorage.address);
        $('#user').attr('readonly', 'readonly');
        $('#id').attr('readonly', 'readonly');
        $('#tel').attr('readonly', 'readonly');
        $('#address').attr('readonly', 'readonly');
        $('.yz_box').css('display', 'none');
        $('#btn').css({
            'background': 'url(/v/hbqp20181022/img/button_success.png?v=1) no-repeat center',
            '-webkit-background-size': 'auto 100%'
        });
        $('.tip').html('温馨提示：您的信息已提交成功，请耐心等待主办方与您联系');
        first = true;
        return;
    }

    get_yz.addEventListener('click', getYzcode, false);

    var clickFlag = true;
    $('#btn').on('click', dot);

    function dot() {
        if (first) return;
        if (clickFlag) {
            clickFlag = false;
            if ($('#user').val() === '' || $('#user').val().indexOf(' ') !== -1) {
                title_tip('提 示', '请输入正确的姓名哦！~', '我知道了');
                clickFlag = true;
            } else if (!reg2.test($('#id').val()) || !getIdcardValidateCode($('#id').val())) {
                title_tip('提 示', '请填写正确的身份证号！~', '我知道了');
                clickFlag = true;
            } else if (!reg1.test($('#tel').val())) {
                title_tip('提 示', '请填写正确的手机号！~', '我知道了');
                clickFlag = true;
            } else if (!reg3.test($('#yzcode').val())) {
                title_tip('提 示', '请填写正确的验证码！~', '我知道了');
                clickFlag = true;
            } else if ($('#address').val() == '') {
                title_tip('提 示', '请填写邮寄地址！~', '我知道了');
                clickFlag = true;
            } else {
                clickFlag = false;
                $('#loading').css('display', 'block');
                sub_message();
            }
        }
    }

    function countdown(tag, time) {
        var i = time;
        tag.innerHTML = i + '秒';
        countdowntimer = setInterval(function () {
            i--;
            tag.innerHTML = i + '秒';
            if (i <= 0) {
                tag.innerHTML = '获取验证码';
                clearInterval(countdowntimer); // 清除定时器
                get_yz.addEventListener("click", getYzcode, false); //恢复计时器
                countdowntimer = null;
            }
        }, 1000);
    }

    function getYzcode() {
        if ($('#user').val() == '' || $('#user').val().indexOf(' ') != -1) {
            title_tip('提 示', '请输入正确的姓名哦！~', '我知道了');
        } else if (!reg2.test($('#id').val()) || !getIdcardValidateCode($('#id').val())) {
            title_tip('提 示', '请填写正确的身份证号！~', '我知道了');
        } else if (!reg1.test($('#tel').val())) {
            title_tip('提 示', '请填写正确的手机号！~', '我知道了');
        } else if ($('#address').val() == '') {
            title_tip('提 示', '请填写邮寄地址！~', '我知道了');
        } else {
            if (get_yz.innerHTML == '获取验证码') {
                getCheckCode(function () {
                    countdown(get_yz, 60);
                });
            } else {
                get_yz.removeEventListener('click', getYzcode, false);
            }
        }
    }

    function getCheckCode(cb) { // 获取手机验证码
        var javai = vge.hbqp + '/DBTHBQPInterface/user/getCaptcha';
        var req = {
            "phonenum": $('#tel').val(),
            "sendtype": "0"
        };
        $.ajax({
            type: "post",
            url: javai,
            async: true,
            data: JSON.stringify(req),
            success: function (jo) {
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
            }
        });
    }

    function sub_message() { // 提交信息
        var javai = vge.hbqp + '/DBTHBQPInterface/user/savePrize';
        var req = {
            "openid": sessionStorage.openid,
            "username": $('#user').val(),
            "idcard": $('#id').val(),
            "phonenum": $('#tel').val(),
            "captcha": $('#yzcode').val(),
            "address": $('#address').val() === '' ? 'address' : $('#address').val(),
            "grandPrizeType": sessionStorage.grandPrizeType === undefined ? '' : sessionStorage.grandPrizeType,
            "prizeVcode": sessionStorage.prizeVcode === undefined ? '' : sessionStorage.prizeVcode
        };
        vge.callJApi(javai, req, function (jo) {
            $('#loading').css('display', 'none');
            if (jo.result.code === '0') {
                if (jo.result.businessCode === '0') {
                    clickFlag = false;
                    sessionStorage.first = 'first';
                    sessionStorage.username = $('#user').val();
                    sessionStorage.idcard = $('#id').val();
                    sessionStorage.phonenum = $('#tel').val();
                    sessionStorage.address = $('#address').val();
                    $('.tip').html('温馨提示：您的信息已提交成功，请耐心等待主办方与您联系');
                    $('#btn').css({
                        'background': 'url(/v/hbqp20181022/img/button_success.png?v=1) no-repeat center',
                        '-webkit-background-size': 'auto 100%'
                    });
                    title_tip('提 示', '您的信息已提交成功，<br />请耐心等待主办方与您联系', '我知道了', undefined, reload);
                } else if (jo.result.businessCode == '1') { //1
                    title_tip('提 示', '验证码已失效', '我知道了');
                    clickFlag = true;
                } else if (jo.result.businessCode == '2') { //2
                    title_tip('提 示', '您填写的验证码有误', '我知道了');
                    clickFlag = true;
                } else if (jo.result.businessCode == '-1') { //-1
                    title_tip('提 示', '系统升级中...', '我知道了');
                    clickFlag = true;
                } else if (jo.result.businessCode == '4') {
                    title_tip('提 示', '兑奖截止时间已过期', '我知道了');
                    clickFlag = true;
                } else {
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    clickFlag = true;
                }
            } else { //code!='0'
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                clickFlag = true;
            }
        });
    }

    function reload() {
        location.reload();
    }

})();