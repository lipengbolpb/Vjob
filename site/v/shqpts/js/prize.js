(function () {
    'use strict'

    var CHECKCODE_URL = vge.shqp + '/DBTSHQPInterface/user/getCaptcha';
    var SUBMESSAGE_URL = vge.shqp + '/DBTSHQPInterface/user/savePrize';
    // 参与方式
    // 'https://mp.weixin.qq.com/s?__biz=MzA3MzEyODkyMw==&mid=502053623&idx=1&sn=8935891ace4369c9e2d20ccc034cc728&chksm=070bd443307c5d55ceff87a641ed48b51bf1befa3d104259013018a30874bd485799bc357178#rd'
    // 活动规则
    var RULE_HREF = 'https://mp.weixin.qq.com/s?__biz=MzA3MzEyODkyMw==&mid=502053621&idx=1&sn=a5f089d327570c991049c5089d3f5aee&chksm=070bd441307c5d57acb5a74ca72f3f6063c58f4f212c172c046be882e872e73837ec3c672e50#rd';
    // 行程说明
    // 冬奥环球之旅行程
    var travelWorld ='https://mp.weixin.qq.com/s?__biz=MzA3MzEyODkyMw==&mid=502053627&idx=1&sn=3bfc6cc7e833e6275fed92604a4d1b89&chksm=070bd44f307c5d59bf51cb7ebfe0e79673d7d51fd2e49ecb779484d3b97d746cb36d1eda807a#rd'
    // 冰雪冬令营
    var winterCamp = 'https://mp.weixin.qq.com/s?__biz=MzA3MzEyODkyMw==&mid=502053629&idx=1&sn=0f8fed1cf61ce46253be5cac6bb1f271&chksm=070bd449307c5d5f1c332e33cd87a975b7742deaf3daf4ebb921afc9da60965ef2280c9ec89c#rd';
    
    var PHONE_NUM = '021-66096684';

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
        address = sessionStorage.address === undefined ? '' : sessionStorage.address,
        earnTime = sessionStorage.earnTime === undefined ? '' : sessionStorage.earnTime,
        prizeVcode = sessionStorage.prizeVcode === undefined ? '' : sessionStorage.prizeVcode, //具体码
        grandPrizeType = sessionStorage.grandPrizeType === undefined ? '' : sessionStorage.grandPrizeType; //特等奖类别
    var countdowntimer = null;
    var again = sessionStorage.again === undefined ? '' : sessionStorage.again;
    var args = vge.urlparse(location.href),
        bizcode = args.bizcode;
    $(document).ready(function () {
        // #Q等奖-冬奥环球之旅壹人次
        if (grandPrizeType == 'Q' || grandPrizeType == 'q') {
            $('.prize-one').attr("src","img/prize1.png");
            $('.prize-bg').attr("src","img/prize-bg1.png");
            init();
        }
        // #R等奖-冬奥冰雪冬令营壹人次
        if (grandPrizeType == 'R' || grandPrizeType == 'r') {
            $('.prize-one').attr("src","img/prize2.png");
            $('.prize-bg').attr("src","img/prize-bg2.png");
            init();
        }
        // 此次没有青啤奖
        // if (grandPrizeType == 'P' || grandPrizeType == 'p') {//青啤有一套
        //     $('.prize-one').attr("src","img/prize3.png");
        //     $('.prize-bg').attr("src","img/prize-bg3.png");
        //     init();
        // }

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
                        $('.address').val(address);
                        $('.tel').val(phonenum);
                        $('.name').attr('readOnly', true);
                        $('.address').attr('readOnly', true);
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
        // $('.ckff').on('click', function () {
        //     $('.change').css('display', 'block');
        // });
        // $('.close').on('click', function () {
        //     $('.change').css('display', 'none');
        // });

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
                // "address": $('.address').val(),
                "address":'address',
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
                        // title_tip('提 示', '您的中奖信息我们已经收到，请拨打<br> ' + PHONE_NUM + '联系我们进行身份核实', '我知道了');
                        $('.success_alert').fadeIn(1);
                        $('.alert').html('温馨提示：您的信息已提交成功，请耐心等待主办方与您联系');
                        $('#btn').val('提交成功');
                        $('#btn').attr('disabled', 'true');
                        $('.yz').attr('disabled', 'true');
                        $('.code').css('display', 'none');
                        $('.yz').css('display', 'none');
                        $('.tel').css('border', 'none');
                        $('.name').attr('readOnly', 'true');
                        $('.address').attr('readOnly', 'true');
                        $('.tel').attr('readOnly', 'true');
                        sessionStorage.username = $('.name').val();
                        // sessionStorage.address = $('.address').val();
                        sessionStorage.phonenum = $('.tel').val();
                        ifremeber();
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
        $('.scheduling').on('click', function () {
            if(grandPrizeType == 'Q' || grandPrizeType == 'q'){
              window.location.href = travelWorld 
            }
            if(grandPrizeType == 'R' || grandPrizeType == 'r'){
              window.location.href = winterCamp
            }
        });

        /* 判断关注 */
		function ifremeber() {
			var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + APPID;
			vge.ajxget(requrl, 5000, function(r) {
				try {
					var o = JSON.parse(r);
                    if (o.subscribe == '0') { //未关注
	            
                    } else { //已关注用户
                        $('.attention').css('display','none');
                    }
				} catch (e) {
					vge.clog('errmsg', [requrl, e]);
				}
			}, function(err) {
				vge.clog('errmsg', [requrl, err]);
			});
		}
    });
})()