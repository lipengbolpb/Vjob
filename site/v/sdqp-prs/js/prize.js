(function () {
    'use strict'

    var CHECKCODE_URL = vge.sdqp + '/DBTSDQPInterface/user/getCaptcha';
    var SUBMESSAGE_URL = vge.sdqp + '/DBTSDQPInterface/user/savePrize';
    // https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503283375&idx=1&sn=0180f13ff7173e255c7f6494b6d578a7&chksm=071ddb1e306a52089109a4d23e5b49930828072c36e8048c6d9e1b0eef77247c2f0e8aed8945#rd
    var RULE_HREF = 'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503283705&idx=1&sn=de74877b421a3a0239173fc3f16de1d7&chksm=071dda48306a535e407ba12b14b46641582edc1cd830d3479ff4e8beb2ec69e9bc03bb3a099d#rd';
    // var SECRET_HREF = 'https://mp.weixin.qq.com/s?__biz=MzAxNjMyMDA3NA==&mid=502316018&idx=1&sn=7a6e5c64968fb7b92ab8560b92fc7aa6&chksm=03f288d7348501c1b77b4b9862b8324db7a7e0cf2faa34bd660c20aa53f2675f45c4cf3a8d94#rd';
    // var PHONE_NUM = '15771551903';

    var dom_get = document.getElementsByClassName('yz')[0];

    var reg1 = /^1[0-9]{10}$/, //验证手机号
        reg2 = /^[1-9][0-9xX]{17}$/, //验证身份证号
        reg3 = /^[0-9]{4}$/;

    var openid = sessionStorage.openid === undefined ? '' : sessionStorage.openid,
        unionid = sessionStorage.unionid === undefined ? '' : sessionStorage.unionid,
        username = sessionStorage.username === undefined ? '' : sessionStorage.username,
        //idcard = sessionStorage.idcard === undefined ? '' : sessionStorage.idcard,
        phonenum = sessionStorage.phonenum === undefined ? '' : sessionStorage.phonenum,
        skukey = sessionStorage.skukey === undefined ? '' : sessionStorage.skukey,
        // address = sessionStorage.address === undefined ? '' : sessionStorage.address,
        earnTime = sessionStorage.earnTime === undefined ? '' : sessionStorage.earnTime,
        prizeVcode = sessionStorage.prizeVcode === undefined ? '' : sessionStorage.prizeVcode, //具体码
        grandPrizeType = sessionStorage.grandPrizeType === undefined ? '' : sessionStorage.grandPrizeType, //特等奖类别
        exchangeChannel = sessionStorage.exchangeChannel === undefined ? '' : sessionStorage.exchangeChannel;  // "3扫码中奖、4一码双奖、5逢尾数",
        // prize19 = sessionStorage.perMantissaPrizeFlag === undefined ? '' : sessionStorage.grandPrizeType ; //19日的实物奖*0 否 1 是

    var countdowntimer = null;
    var again = sessionStorage.again === undefined ? '' : sessionStorage.again;
    var args = vge.urlparse(location.href),
        bizcode = args.bizcode;
    $(document).ready(function () {
        if ((grandPrizeType == 'U' || grandPrizeType == 'u') && exchangeChannel !== '5' ) {//冬奥冰雪冬令营壹人次
            $('.prize-one').attr("src","img/prize1.png");
            $('.prize-bg').attr("src","img/prize-bg1.png");
            init();
        } 
        if ((grandPrizeType == 'P' || grandPrizeType == 'p') && exchangeChannel !== '5') {//青岛啤酒有一套
            $('.prize-one').attr("src","img/prize2.png");
            $('.prize-bg').attr("src","img/prize-bg2.png");
            init();
        }
        if ((grandPrizeType == 'P01' || grandPrizeType == 'p01') && exchangeChannel !== '5') {//黄金冰墩墩
            $('.prize-one').attr("src","img/prizeBdd.png");
            $('.prize-bg').attr("src","img/prize-bgBdd.png");
            init();
        }

        if ((grandPrizeType == 'P02' || grandPrizeType == 'p02') && exchangeChannel !== '5') {//济宁市邹城市青岛啤酒大礼包
            $('.prize-one').attr("src","img/prizeQP.png");
            $('.prize-bg').attr("src","img/prize-bgQP.png");
            $('.warning p').text("温馨提示：请尽快拨打18553791903核实中奖者身份信息，以下内容须完整填写信息，否则无法兑奖。");
            init();
        }

        if (exchangeChannel == '5') {//“要酒日”青岛啤酒有一套
            $('.prize-one').attr("src","img/prize19.png?v=1.0.0");
            $('.prize-bg').attr("src","img/prize-bg19.png?v=1.0.0");
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
                } else {
                    if (phonenum != '' && username != '') { //已经填写过信息
                        $('.get').css('display', 'none');
                        $('.info').css('display', 'block');
                        $('.name').val(username);
                        // $('.address').val(address);
                        $('.tel').val(phonenum);
                        $('.name').attr('readOnly', true);
                        // $('.address').attr('readOnly', true);
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
        // 立即兑奖
        $('.ck').on('click', function () {
            $('.get').fadeOut();
            $('.info').fadeIn();
            sessionStorage.again = true;
        });
        // 查看兑奖方法
        $('.ckff').on('click', function () {
            if((grandPrizeType == 'U' || grandPrizeType == 'u') && exchangeChannel != '5'){
               $('.playFree').css('display', 'block');
            }
            if((grandPrizeType == 'P' || grandPrizeType == 'p') && exchangeChannel != '5'){
               $('.drinkFree').css('display', 'block'); 
            }
            if((grandPrizeType == 'P01' || grandPrizeType == 'p01') && exchangeChannel != '5'){
                $('.bdd').css('display', 'block');   // 冰墩墩 兑奖说明
            }
            if((grandPrizeType == 'P02' || grandPrizeType == 'p02') && exchangeChannel != '5'){
                $('.qpGift').css('display', 'block');   // 邹城市的青啤大礼包 兑奖说明
            }
            if(exchangeChannel == '5') {//“要酒日”青岛啤酒有一套
               $('.qp19').css('display', 'block'); 
            }
        });
        // 关闭兑奖方法
        $('.close').on('click', function () {
            if((grandPrizeType == 'U' || grandPrizeType == 'u') && exchangeChannel != '5'){
                $('.playFree').css('display', 'none');
             }
             if((grandPrizeType == 'P' || grandPrizeType == 'p') && exchangeChannel != '5'){
                $('.drinkFree').css('display', 'none');
             }
             if((grandPrizeType == 'P01' || grandPrizeType == 'p01') && exchangeChannel != '5'){
                $('.bdd').css('display', 'none');   // 冰墩墩 兑奖说明
            }
            if((grandPrizeType == 'P02' || grandPrizeType == 'p02') && exchangeChannel != '5'){
                $('.qpGift').css('display', 'none');   // 邹城市的青啤大礼包 兑奖说明
            }
             if (exchangeChannel == '5') {//“要酒日”青岛啤酒有一套
                $('.qp19').css('display', 'none'); 
             }
        });

        $('.yz').on('click', function () {
            getYzcode();
        });

        $('#btn').on('click', function () {
            send();
            // if (!$('.name').val() == '' && !$('.name').val().indexOf(' ') !== -1 && reg1.test($('.tel').val()) && reg3.test($('.code').val())) {
            //     send();
            // }
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
            }
            // else if ($('.address').val() === '' || $('.address').val().indexOf(' ') !== -1) {
            //     title_tip('提 示', '请输入正确的收货地址哦！~', '我知道了');
            // } 
            else if (!reg1.test($('.tel').val())) {
                title_tip('提 示', '请填写正确的手机号！~', '我知道了');
            } else {
                if ($('.yz').val() === '获取验证码' || $('.yz').val() === '重新获取') {
                    $('.yz').unbind();
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
            }
            // else if ($('.address').val() === '' || $('.address').val().indexOf(' ') !== -1) {
            //     title_tip('提 示', '请输入正确的收货地址哦！~', '我知道了');
            // } 
            else if (!reg1.test($('.tel').val())) {
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
                "address": $('.address').val(),
                "idcard": 'idcard',
                "username": $('.name').val(),
                "skukey": skukey,
                "phonenum": $('.tel').val(),
                "grandPrizeType": grandPrizeType,
                "prizeVcode": prizeVcode,
                "captcha": $('.code').val()
            };
            vge.callJApi(javai, req, function (jo) {
                if (jo.result.code === '0') {
                    if (jo.result.businessCode === '0') {
                        title_tip('提 示', '您的中奖信息我们已经收到，请联系<br>我们进行身份核实', '我知道了');
                        $('.alert').html('温馨提示：您的信息已提交成功，请耐心等待主办方与您联系');
                        $('#btn').val('提交成功');
                        $('#btn').attr('disabled', 'true');
                        $('.yz').attr('disabled', 'true');
                        $('.code').css('display', 'none');
                        $('.yz').css('display', 'none');
                        $('.tel').css('border', 'none');
                        $('.name').attr('readOnly', 'true');
                        // $('.address').attr('readOnly', 'true');
                        $('.tel').attr('readOnly', 'true');
                        sessionStorage.username = $('.name').val();
                        // sessionStorage.address = $('.address').val();
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