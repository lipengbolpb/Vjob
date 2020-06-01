(function () {
    'use strict';

    var reg1 = /^1[0-9]{10}$/,
        reg2 = /^[1-9][0-9xX]{17}$/,
        reg3 = /^[0-9]{4}$/;


    $('#private').on('click', function () {
        location.href = 'http://mp.weixin.qq.com/s/aPZAyVDA-sd0BBuleQhR8w';
    });

    $('#rule').on('click', function () {
        location.href = 'http://mp.weixin.qq.com/s/sixtZCCrUHhHuqgh9PrvnQ';
    });

    // 已经填写过
    if (sessionStorage.username !== undefined && sessionStorage.phonenum !== undefined) {
        $('#name').val(sessionStorage.username);
        $('#idcard').val(sessionStorage.idcard);
        $('#tel').val(sessionStorage.phonenum);
        $('#name').attr('readonly', 'readonly');
        $('#id').attr('readonly', 'readonly');
        $('#tel').attr('readonly', 'readonly');
        $('#btn').css('display', 'none');
        $('.tip2').html('温馨提示：您的信息已提交成功，请耐心等待主办方与您联系');
        return;
    }

    $('#btn').on('click', function () {
        if ($('#name').val() === '' || $('#name').val().indexOf(' ') !== -1) {
            title_tip('提 示', '请输入正确的姓名哦！~', '我知道了');
        } else if (!reg1.test($('#tel').val())) {
            title_tip('提 示', '请填写正确的手机号！~', '我知道了');
        } else {
            //调提交接口
            sub_message();
        }
    });


    function sub_message() { // 提交注册信息
        var javai = vge.common + '/vjifenInterface/user/savePrize';
        var req = { "projectServerName": "guangxi",
            "openid": sessionStorage.vjifenOpenid === undefined ? '' : sessionStorage.vjifenOpenid,
            "username": $('#name').val(),
            "idcard": '000000',
            "skukey": sessionStorage.skukey === undefined ? '' : sessionStorage.skukey, //??
            "phonenum": $('#tel').val(),
            //			"captcha":$('#yz_code').val(),//不需要验证码
            "address": 'address',
            "grandPrizeType": sessionStorage.gpt === undefined ? '' : sessionStorage.gpt,
            "prizeVcode": sessionStorage.vqr === undefined ? '' : sessionStorage.vqr,
            "longitude": sessionStorage.longitude === undefined ? '' : sessionStorage.longitude, //"经度"
            "latitude": sessionStorage.latitude === undefined ? '' : sessionStorage.latitude //"纬度"
        };
        vge.callJApi(javai, req, function (jo) {
            if (jo.result.code === '0') {
                if (jo.result.businessCode === '0') {
                    sessionStorage.username = $('#name').val();
                    sessionStorage.idcard = $('#idcard').val();
                    sessionStorage.phonenum = $('#tel').val();
                    $('.tip').html('温馨提示：您的信息已提交成功，请耐心等待主办方与您联系');
                    title_tip('提 示', '您的中奖信息我们已经收到，请拨打<br> 0771-3806691联系我们进行身份核实', '我知道了', '', reload);
                } else if (jo.result.businessCode == '1') { //1
                    title_tip('提 示', '验证码已失效', '我知道了');
                } else if (jo.result.businessCode == '2') { //2
                    title_tip('提 示', '您填写的验证码有误', '我知道了');
                } else if (jo.result.businessCode == '-1') { //-1
                    title_tip('提 示', '系统升级中...', '我知道了');
                } else {
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            } else { //code!='0'
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            }
        });
    }

    function reload() {
        location.reload();
    }


})();