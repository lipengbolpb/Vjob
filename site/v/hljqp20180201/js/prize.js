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

    if (sessionStorage.grandPrizeType == '0' || sessionStorage.grandPrizeType == '2') {
        $('.prize').attr('src', '/v/hljqp20180201/img/prize_1.png');
        $('.pic_tip').attr('src', '/v/hljqp20180201/img/border_1.png?v=2');
        $('.address_box').css('display', 'block');
        $('.tip2').css('display','block');
    } else {
        $('.prize').attr('src', '/v/hljqp20180201/img/prize_2.png');
        $('.pic_tip').attr('src', '/v/hljqp20180201/img/border_2.png?v=2');
    }

    var reg1 = /^1[0-9]{10}$/,
        reg2 = /^[1-9][0-9xX]{17}$/,
        reg3 = /^[0-9]{4}$/;

    var first = sessionStorage.first === undefined ? false : true;
    var get_yz = document.getElementById("get_yz");
    var countdowntimer = null;


    $('#rule').on('click', function () {
        location.replace("https://mp.weixin.qq.com/s?__biz=MzI1MDYxNzkzOA==&mid=100000026&idx=1&sn=3750b1f10de916463a7f2f9e2b71281d&chksm=69fec8275e8941317e528dbf12c2e3d01998cd6ee0e1609b299d43246e92a581452567d62c83#rd");
    });

    $('#private').on('click', function () {
        location.replace("https://mp.weixin.qq.com/s?__biz=MzI1MDYxNzkzOA==&mid=100000028&idx=1&sn=834a317270f055acd163abe61657e43a&chksm=69fec8215e894137eb8ba1e568541d4a3af27feeb60930553dae95fbc07d3bf02b55da23970a#rd");
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
        $('.yz_box').css('display', 'none');
        $('#btn').css({
            'background': 'url(/v/hljqp20180201/img/button_success.png?v=1) no-repeat center',
            '-webkit-background-size': 'auto 100%'
        });
        $('.tip').html('温馨提示：您的信息已提交成功，请耐心等待主办方与您联系');
        first = true;
        return;
    }

    get_yz.addEventListener('click', getYzcode, false);

    $('#btn').on('click', dot);

    function dot() {
        if (first) return;
        if ($('#user').val() === '' || $('#user').val().indexOf(' ') !== -1) {
            title_tip('提 示', '请输入正确的姓名哦！~', '我知道了');
        } else if (!reg1.test($('#tel').val())) {
            title_tip('提 示', '请填写正确的手机号！~', '我知道了');
        } else if (!reg3.test($('#yzcode').val())) {
            title_tip('提 示', '请填写正确的验证码！~', '我知道了');
        } else {
            if (sessionStorage.grandPrizeType == '0' || sessionStorage.grandPrizeType == '2') {
                if ($('#address').val() == '') {
                    title_tip('提 示', '请填写详细地址！~', '我知道了');
                } else {
                    $('#btn').unbind();
                    setTimeout(function () {
                        $('#btn').on('click', dot);
                    }, 1000);
                    $('#loading').css('display', 'block');
                    sub_message();
                }
            } else {
                $('#btn').unbind();
                setTimeout(function () {
                    $('#btn').on('click', dot);
                }, 1000);
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
        } else if (!reg1.test($('#tel').val())) {
            title_tip('提 示', '请填写正确的手机号！~', '我知道了');
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
        var javai = vge.hljqp + '/DBTHLJQPInterface/user/getCaptcha';
        var req = {
            "phonenum": $('#tel').val(),
            "sendtype": "0"
        };
        //		vge.callJApi(javai, req, function(jo) {
        //			if (jo.result.code=='0') {
        //	            if( jo.result.businessCode=='0') {
        //					//成功，开始倒计时
        //					cb();
        //				} else if(jo.result.businessCode==='2') {//1
        //					title_tip('尊敬的用户','您填写的手机号错误，发送验证码失败！','我知道了');
        //				} else{
        //					title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
        //				}
        //			} else{//code!='0'
        //				title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
        //			}
        //		});
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
        var javai = vge.hljqp + '/DBTHLJQPInterface/user/savePrize';
        var req = {
            "openid": sessionStorage.openid,
            "username": $('#user').val(),
            "idcard": '00000',
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
                    sessionStorage.first = 'first';
                    sessionStorage.username = $('#user').val();
                    sessionStorage.idcard = '00000';
                    sessionStorage.phonenum = $('#tel').val();
                    sessionStorage.address = $('#address').val();
                    $('.tip').html('温馨提示：您的信息已提交成功，请耐心等待主办方与您联系');
                    $('#btn').css({
                        'background': 'url(/v/hljqp20180201/img/button_success.png?v=1) no-repeat center',
                        '-webkit-background-size': 'auto 100%'
                    });
                    title_tip('提 示', '您的信息已提交成功，<br />请耐心等待主办方与您联系', '我知道了', undefined, reload);
                } else if (jo.result.businessCode == '1') { //1
                    title_tip('提 示', '验证码已失效', '我知道了');
                } else if (jo.result.businessCode == '2') { //2
                    title_tip('提 示', '您填写的验证码有误', '我知道了');
                } else if (jo.result.businessCode == '-1') { //-1
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

    function reload() {
        location.reload();
    }

})();