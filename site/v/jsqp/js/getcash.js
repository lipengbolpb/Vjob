(function () {
    'use strict';
    var SPACK_PORT = vge.jsqp + '/DBTJSQPInterface/gifts/getGiftspack';
    var APPID = vge.jsqpappid;
    var PROJECT = 'jsqp';
    var RULE_URL = 'https://mp.weixin.qq.com/s/MrYi9AwLL_JwA1uC4aGjzA';
    var EXPLAIN_URL = 'https://mp.weixin.qq.com/s?__biz=MzIzMTA1NzgzNw==&mid=100000100&idx=1&sn=c9bef77777e133b7a02624bf4b4dbf13&chksm=68a8b1a65fdf38b0bd3d667c6d076b489f65b619b91f7664619211efdb3f581581bc3fa7326d#rd';
    
    if(sessionStorage.skuType==0){//瓶
    	RULE_URL = 'https://mp.weixin.qq.com/s/N3vfDrp7QI7Tb7h17WE_nA';
    }
    
    /* 定义各项参数 */
    var currentMoney = sessionStorage.currentMoney,
        totalAccountMoney = sessionStorage.totalAccountMoney,
        codeContentUrl = sessionStorage.codeContentUrl == 'undefined' ? '' : sessionStorage.codeContentUrl,
        earnTime = sessionStorage.earnTime,
        openid = sessionStorage.openid,
        args = vge.urlparse(location.href),
        bizcode = args.bizcode,
        hbopenid = args.openid,
        again = sessionStorage.again === undefined ? false : sessionStorage.again,
        tx = true;

    if (codeContentUrl == 'undefined' || codeContentUrl == '') {
        $('.toast').css('display', 'none');
    } else {
        $('.toast').attr('src', codeContentUrl);
    }

    (function () {
        if (Number(currentMoney) == 0) { //中奖金额为0
            if(sessionStorage.skuType=='0'){
        		$('.congratulate').html('离红包只差一点点<br>再扫一瓶试试');
        	}else{
        		$('.congratulate').html('离红包只差一点点<br>再扫一罐试试');
        	}
            $('.congratulate').css({
                'margin': '1rem auto 0',
                'fontSize': '0.9rem'
            });
            $('.prize').css('display', 'none');
        } else {
            $('#money').html(currentMoney);
        }
        if (bizcode == 11 || again == 'true') { //重复扫
            events();
            if (Number(totalAccountMoney) >= 1) {
                $('.notice').html('温馨提示：您的红包累计金额为' + totalAccountMoney + '元，<br>点击上方按钮把钱拿走吧！');
                $('#btn').val('立即提现');
                $('#repbtn').val('立即提现');
            } else {
                $('#btn').val('查看红包余额');
                $('#repbtn').val('查看红包余额');
            }
            $('.repcash').css('display', 'block');
            if (sessionStorage.earnTime == '') {
                if(sessionStorage.skuType=='0'){
            		$('.earn').html('您已扫过这瓶酒<br>并获得<span class="earnMoney">¥' + currentMoney + '元</span>');
            	}else{
            		$('.earn').html('您已扫过这罐酒<br>并获得<span class="earnMoney">¥' + currentMoney + '元</span>');
            	}
            } else {
            	if(sessionStorage.skuType=='0'){
            		$('.earn').html('您已于<span class="earnTime">' + earnTime + '</span>扫过这瓶酒<br>并获得<span class="earnMoney">¥' + currentMoney + '元</span>');
            	}else{
            		$('.earn').html('您已于<span class="earnTime">' + earnTime + '</span>扫过这罐酒<br>并获得<span class="earnMoney">¥' + currentMoney + '元</span>');
            	}
            }
        } else {
            if (Number(totalAccountMoney) >= 1) {
                $('.notice').html('温馨提示：您的红包累计金额为' + totalAccountMoney + '元，<br>点击上方按钮把钱拿走吧！');
                $('#btn').val('立即提现');
                $('#repbtn').val('立即提现');
            } else {
                $('#btn').val('存入我的零钱包');
                $('#repbtn').val('存入我的零钱包');
            }
            $('.get').css('display', 'block');
        }
    })();

    //拆红包
    $('.hbGet,.open').on('touchstart', function () {
        $('.open').addClass('kai');
        sessionStorage.again = 'true';
        setTimeout(function () {
            $('.get').fadeOut(600);
            $('.cash').fadeIn(600, function () {
                events();
                // 广告
                if (new Date().getTime() < new Date(2019,5,10).getTime()) { //6.9 24点
                    $('.active').css('display', 'block');
                    $('.activeClose').on('click', function (event) {
                        $('.active').css('display', 'none');
                        event.stopPropagation();
                    });
                }
               setTimeout(function(){//三秒后可点击
				    // 联通流量链接
				   $('.ad').css('display', 'block');
				   $('.adClose').on('click', function (event) {
				       $('.ad').css('display', 'none');
				       event.stopPropagation();
				   });
				   $('.adCover').on('click', function (event) {
				       window.location.href = 'https://m.10010.com/queen/qingdaobeer/qdbeer.html';
				       event.stopPropagation();
				   });
			   },3000);
            });
        }, 1000);
    });

    function events() {
        //活动规则
        $('.rule').on('touchstart', function () {
            window.location.href = RULE_URL;
        });
        //隐私说明
        $('.explain').on('touchstart', function () {
            window.location.href = EXPLAIN_URL;
        });
        //提现成功后判断关注
        $('.mask').on('touchstart', function () {
            // $('.mask').css('display', 'none');
//          ifremeber();
			sessionStorage.mybag = 'mybag';
            window.location.replace('http://' + location.host + '/' + PROJECT + '/too/mybag');
        });
        $('#btn,#repbtn').on('touchstart', function () {
            if (Number(totalAccountMoney) >= 1) {
                if (tx) {
                    tx = false;
                    $('#loading').css('display', 'block');
                    give_spack();
                }
            } else {
            	sessionStorage.mybag = 'mybag';
            	window.location.replace('http://' + location.host + '/' + PROJECT + '/too/mybag');
//              ifremeber();
            }
        });
        // $('.game1').on('click', function () {
        //     location.href = 'http://' + location.host + '/v/csqp/game_1.html';
        // });
        $('.game2').on('click', function () {
            location.href = 'http://' + location.host + '/v/jsqp/game/index.html';
        });
    }

    /* 提现 */
    function give_spack() {
        var javai = SPACK_PORT;
        var req = {
            "openid": openid,
            "hbopenid": hbopenid
        };
        $.ajax({
            type: "POST",
            url: javai,
            data: JSON.stringify(req),
            dataType: 'json',
            success: function (jo, status, xhr) {
                $('.loading').css('display', 'none');
                if (jo.result.code == '0') {
                    if (jo.result.businessCode === '0') {
                        $('#sign_logo').css('display', 'none');
                        $('#sale_icon').css('display', 'none');
                        $('.mask').css('display', 'block');
                        tx = false;
                    } else if (jo.result.businessCode === '1') { //1
                        if(sessionStorage.skuType=='0'){
                    		title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
                    	}else{
                    		title_tip('提 示', '您的红包金额不足，再喝几罐攒够1元发红包！', '我知道了');
                    	}
                        tx = true;
                    } else if (jo.result.businessCode === '2') { //1
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                        tx = true;
                    } else if (jo.result.businessCode === '4') { //1
                        title_tip('提现处理中，请稍后查看详细记录', '我知道了');
                        tx = true;
                    } else if (jo.result.businessCode === '3') { //1
                        title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
                        tx = true;
                    } else if (jo.result.businessCode === '-1') { //-1
                        title_tip('提 示', '系统升级中...', '我知道了');
                        tx = true;
                    } else if (jo.result.businessCode === '-2') { //-1
                        title_tip('提 示', '提现操作过于频繁', '我知道了');
                        tx = true;
                    } else if (jo.result.businessCode === '5') { //5
                        title_tip('尊敬的用户', jo.result.msg, '我知道了');
                        tx = true;
                    } else {
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                        tx = true;
                    }
                } else if (jo.result.code == '-1') {
                    title_tip('尊敬的用户', '系统升级中...', '我知道了');
                    tx = true;
                } else { //code!='0'
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    tx = true;
                }
            },
            error: function (res, status, xhr) {
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            }
        });
    }

    /* 判断关注 */
    function ifremeber() {
        var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + APPID;
        vge.ajxget(requrl, 5000, function (r) {
            try {
                var o = JSON.parse(r);
                if (o.subscribe == '0') { //未关注
                    window.location.replace('http://' + location.host + '/v/' + PROJECT + '/attention.html');
                } else { //已关注用户
                    window.location.replace('http://' + location.host + '/' + PROJECT + '/too/mybag');
                }
            } catch (e) {
                vge.clog('errmsg', [requrl, e]);
            }
        }, function (err) {
            vge.clog('errmsg', [requrl, err]);
        });
    }
})();