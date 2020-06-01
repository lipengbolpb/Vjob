(function () {
    'use strict';
    var grandPrizeType = sessionStorage.grandPrizeType === undefined ? '' : sessionStorage.grandPrizeType;
    var args = vge.urlparse(location.href),
        bizcode = args.bizcode;
    var replace = 'hbqp20190513';
    var again = sessionStorage.again === undefined ? '' : sessionStorage.again;
    /*if(sessionStorage.again == 'true'){
        $('.index').fadeOut();
        $('.msg_box').fadeIn();
    }else{
         $('.index').fadeIn();
        $('.index').on('click', function () {
            sessionStorage.again = 'true';
            $('.index').fadeOut();
            $('.msg_box').fadeIn();
        });
    }*/

        // s金球 R等奖-青岛啤酒有一套 T等奖-“百年国潮”纪念保温杯
        if (sessionStorage.grandPrizeType == 's' || sessionStorage.grandPrizeType == 'S') {
            $('.prize').attr('src', 'img/prize_1.png?v=4');
            $('.pic_tip').attr('src', 'img/border_4.png?v=4');
            $('.tip').html('温馨提示：以上信息务必填写准确。中奖者需提供完整的中奖瓶盖或拉环，以及个人身份证复印件供我公司或我公司委托的第三放核实确认。信息提交成功后，请耐心等待主办方与您联系。');
            init();
        } else if (sessionStorage.grandPrizeType == 't' || sessionStorage.grandPrizeType == 'T') {
            $('.prize').attr('src', 'img/prize_2.png?v=4');
            $('.pic_tip').attr('src', 'img/border-notel.png?v=4');
            $('.tip').html('温馨提示：如提交兑奖信息后，10个工作日内未收到奖品，<br/>请致电客服电话：0311-66600300');
            init();
        } else if (sessionStorage.grandPrizeType == 'r' || sessionStorage.grandPrizeType == 'R') {
            $('.prize').attr('src', 'img/prize_3.png?v=4');
            $('.pic_tip').attr('src', 'img/border-notel.png?v=4');
            $('.tip').html('温馨提示：如提交兑奖信息后，10个工作日内未收到奖品，<br/>请致电客服电话：0311-66600300');
            init();
        }
        function init() {
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
            }else {
                if (again == 'true') {
                    $('.msg_box').css('display', 'block');
                } else {
                    $('.index').css('display', 'block');
                }
            }
        }
        $('.index').on('click', function () {
            $('.index').fadeOut();
            $('.msg_box').fadeIn();
            sessionStorage.again = true;
        });

        var reg1 = /^1[0-9]{10}$/,
            //reg2 = /^[1-9][0-9xX]{17}$/,
            reg3 = /^[0-9]{4}$/;

        var first = sessionStorage.first === undefined ? false : true;
        var get_yz = document.getElementById("get_yz");
        var countdowntimer = null;

        $('#rule').on('click', function () {
            location.replace("https://mp.weixin.qq.com/s?__biz=MzI5NjQ4MDMyNg==&mid=100000922&idx=1&sn=04d319f707417e531de1fda139f9f680&chksm=6c42ffb35b3576a5f83ee82499982803c2ffd61509af299049cf9833da712ec6a28cfe3bc74b#rd");
        });

        $('#private').on('click', function () {
            location.replace("https://mp.weixin.qq.com/s?__biz=MzI5NjQ4MDMyNg==&mid=100000924&idx=1&sn=7e8df514060190c25fa7eca401c14400&chksm=6c42ffb55b3576a37b1f0f92c579c2e29ba7a45ca574e7d82dab1171c3cfe975f278fe0123f5#rd");
        });

        // 已经填写过
        if (sessionStorage.username != '' && sessionStorage.phonenum != ''&&sessionStorage.isGet!=undefined) {
            $('.msg_box').css('display', 'block');
            $('.index').css('display', 'none');
            $('#user').val(sessionStorage.username);
            $('#tel').val(sessionStorage.phonenum);
            $('#address').val(sessionStorage.address);
            $('#user').attr('readonly', 'readonly');
            $('#tel').attr('readonly', 'readonly');
            $('#address').attr('readonly', 'readonly');
            $('.yz_box').css('display', 'none');
            $('#btn').css({
                'background': 'url(/v/hbqp20190513/img/button_success.png?v=1) no-repeat center',
                '-webkit-background-size': 'auto 100%'
            });
            first = true;
        }else if(sessionStorage.username != '' && sessionStorage.phonenum != ''){
            $('.msg_box').css('display', 'block');
            $('.index').css('display', 'none');
            $('#user').val(sessionStorage.username);
            $('#tel').val(sessionStorage.phonenum);
            $('#address').val(sessionStorage.address);
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
                } else if (!reg1.test($('#tel').val())) {
                    title_tip('提 示', '请填写正确的手机号！~', '我知道了');
                    clickFlag = true;
                } else if (!reg3.test($('#yzcode').val())) {
                    title_tip('提 示', '请填写正确的验证码！~', '我知道了');
                    clickFlag = true;
                } else if ($('#address').val() == '') {
                    title_tip('提 示', '请填写收货地址！~', '我知道了');
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
            } else if (!reg1.test($('#tel').val())) {
                title_tip('提 示', '请填写正确的手机号！~', '我知道了');
            } else if ($('#address').val() == '') {
                title_tip('提 示', '请填写收货地址！~', '我知道了');
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
                "idcard": 'idcard',
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
                        //sessionStorage.idcard = $('#id').val();
                        sessionStorage.phonenum = $('#tel').val();
                        sessionStorage.address = $('#address').val();
                        sessionStorage.isGet = true;
                        $('.tip').html('温馨提示：您的信息已提交成功，请耐心等待主办方与您联系');
                        $('#btn').css({
                            'background': 'url(/v/hbqp20190513/img/button_success.png?v=1) no-repeat center',
                            '-webkit-background-size': 'auto 100%'
                        });
                        title_tip('提 示', '您的信息已提交成功，<br />请耐心等待主办方与您联系', '我知道了');
                        //关注弹框
                        $('.attention_box').fadeIn();
                        $('.msg_box').fadeOut();
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

        $('.my_prize').on('click', function () {
            //location.replace('http://' + location.host + '/v/hbqp20190513/prize.html?bizcode=' + bizcode);
            location.replace('http://' + location.host + '/v/' + replace + '/prizeList.html');
        });
})();