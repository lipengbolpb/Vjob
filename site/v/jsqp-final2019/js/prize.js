(function () {
    'use strict'

    var CHECKCODE_URL = vge.jsqp + '/DBTJSQPInterface/user/getCaptcha';
    var SUBMESSAGE_URL = vge.jsqp + '/DBTJSQPInterface/user/savePrize';
	var RULE_HREF = 'https://mp.weixin.qq.com/s?__biz=MzA3ODI1OTQyOQ==&mid=2652777305&idx=2&sn=691dd64eca2fbd82cfbca7e8da81469e&chksm=84affed3b3d877c530f85f36b1ab4260a79f54617126ee79da7b7c1620194ea62b4e3b2002e5&token=1799037996&lang=zh_CN#rd';
	var SECRET_HREF = 'https://mp.weixin.qq.com/s?__biz=MzIzMTA1NzgzNw==&mid=100000100&idx=1&sn=c9bef77777e133b7a02624bf4b4dbf13&chksm=68a8b1a65fdf38b0bd3d667c6d076b489f65b619b91f7664619211efdb3f581581bc3fa7326d#rd';
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
        if (grandPrizeType == 'P' || grandPrizeType == 'p') {//HUAWEI
            $('.prize-one').attr("src","img/prize4.png");
            $('.prize-bg').attr("src","img/prize-bg4.png");
            init();
        } else if (grandPrizeType == '1') {//冬奥冰雪冬令营
            $('.prize-one').attr("src","img/prize2.png");
            $('.prize-bg').attr("src","img/prize-bg2.png");
			$('.travel').css('display','block');
             init();
        } else if (grandPrizeType == '2') {//青啤有一套
            $('.prize-one').attr("src","img/prize3.png?v=1.1");
            $('.prize-bg').attr("src","img/prize-bg3.png?v=1");
             init();
        }
		
		document.getElementsByClassName('lq-btn')[0].addEventListener('click', function () {
		    window.location.href = 'https://m.10010.com/queen/qingdaobeer/qdbeer.html';
		}, false);
		document.getElementsByClassName('xc-btn')[0].addEventListener('click', function () {
		    window.location.href = 'https://contents.ctrip.com/activitysetupapp/mkt/index/qingdao190403?popup=close&allianceid=1048845&sid=1760938&pushcode=nn415';
		}, false);
		
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
						$('.idcard').val(idcard);
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
				ifremeber();
            }
        }

        $('.ck').on('click', function () {
            $('.get').fadeOut();
            $('.info').fadeIn();
            sessionStorage.again = true;
        });
        /*$('.ckff').on('click', function () {
            $('.change').css('display', 'block');
        });
        $('.close').on('click', function () {
            $('.change').css('display', 'none');
        });*/
		$('.travel').on('click',function(){
			$('.travel_box').css('display','block');
		});
		$('.close').on('click',function(){
			$('.travel_box').css('display','none');
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
            } else if ($('.address').val() === '' || $('.address').val().indexOf(' ') !== -1) {
                title_tip('提 示', '请输入正确的收货地址哦！~', '我知道了');
            } else if ($('.address').val() === '' || $('.address').val().indexOf(' ') !== -1) {
                title_tip('提 示', '请输入正确的收货地址哦！~', '我知道了');
            } else if (!reg2.test($('.idcard').val()) || !getIdcardValidateCode($('.idcard').val())) {
                title_tip('提 示', '请输入正确的身份证号码哦！~', '我知道了');
            } else if (!reg1.test($('.tel').val())) {
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
            } else if ($('.address').val() === '' || $('.address').val().indexOf(' ') !== -1) {
                title_tip('提 示', '请输入正确的收货地址哦！~', '我知道了');
            } else if (!reg2.test($('.idcard').val()) || !getIdcardValidateCode($('.idcard').val())) {
                title_tip('提 示', '请输入正确的身份证号码哦！~', '我知道了');
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
                "address": $('.address').val(),
                "username": $('.name').val(),
                "idcard": $('.idcard').val(),
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
                        sessionStorage.address = $('.address').val();
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
        $('.scheduling').on('click', function () {
            window.location.href = SECRET_HREF;
        });
    });
	
	/* 判断关注 */
	function ifremeber() {
	    var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + sessionStorage.openid + '&appid=' + vge.jsqpappid;
	    vge.ajxget(requrl, 5000, function (r) {
	        try {
	            var o = JSON.parse(r);
	            if (o.subscribe == '0') { //未关注
	            
				} else { //已关注用户
					$('.attention').css('display','none');
				}
	        } catch (e) {
	            vge.clog('errmsg', [requrl, e]);
	        }
	    }, function (err) {
	        vge.clog('errmsg', [requrl, err]);
	    });
	}
})()