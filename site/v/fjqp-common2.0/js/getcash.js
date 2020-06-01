(function () {
    'use strict';
    var SPACK_PORT = vge.fjqp + '/DBTFJQPInterface/gifts/getGiftspack';
    var APPID = vge.fjqpappid;
    var PROJECT = 'fjqp-common2.0';
    var RULE_URL = 'https://mp.weixin.qq.com/s?__biz=MzIzMTA1NzgzNw==&mid=100000098&idx=1&sn=d086803a970cae6b686cbe5df0ada5df&chksm=68a8b1a05fdf38b6d7f6b18e31463f39439bcccda7251b34fab0204ce2109c3c2780eda37cf2#rd';
    var EXPLAIN_URL = 'https://mp.weixin.qq.com/s?__biz=MzIzMTA1NzgzNw==&mid=100000100&idx=1&sn=c9bef77777e133b7a02624bf4b4dbf13&chksm=68a8b1a65fdf38b0bd3d667c6d076b489f65b619b91f7664619211efdb3f581581bc3fa7326d#rd';
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

    //	if(bizcode==0){
    //  	$('#midAutumn_box').load('/v/midAutumn/midAutumn.html', function() {//加载中秋动画
    //			$('#mid_title_box_b').on('animationend',function(){
    //				setTimeout(function(){
    //					$('#midAutumn_box').fadeOut(300);
    //				},1000)
    //			});
    //		});
    //  }else{
    //  	$('#midAutumn_box').fadeOut(1);
    //  }
    //2020.2.29~4.1  经典10度500*12罐啤【2019】产品换slogan

    if(new Date().getTime()>new Date(2020,1,28).getTime() && new Date().getTime()<new Date(2020,3,1).getTime() && sessionStorage.skukey=="241510936-012"){ 
        document.getElementsByClassName('slogan')[0].src= '/v/fjqp-common2.0/img/slogan3-31.png';
        document.getElementsByClassName('slogan')[0].style.width = "88%";
    }else {
        document.getElementsByClassName('slogan')[0].src= '/v/fjqp-common2.0/img/slogan.png?v=2';
        document.getElementsByClassName('slogan')[0].style.width = "70%";
    }
    // $('.slogan').attr('src','img/slogan3-31.png');
    // document.getElementsByClassName('slogan')[0].src= 'img/slogan3-31.png';
	
	sessionStorage.isAdAlert = 'true';
	
    if (codeContentUrl == 'undefined' || codeContentUrl == '') {
        $('.toast').css('display', 'none');
    } else {
        // if (codeContentUrl.lastIndexOf('6.png') != -1 || codeContentUrl.lastIndexOf('9.png') != -1) {
        //     $('.toast').css({
        //         'height': '3rem',
        //         'top': '13rem'
        //     });
        // }
        $('.toast').attr('src', codeContentUrl);
    }
	
    (function () {
        if (Number(currentMoney) == 0) { //中奖金额为0
            $('.congratulate').html(window.zeroText3());
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
                $('.earn').html('您已扫过这瓶酒<br>并获得<span class="earnMoney">¥' + currentMoney + '元</span>');
            } else {
                $('.earn').html('您已于<span class="earnTime">' + earnTime + '</span>扫过这瓶酒<br>并获得<span class="earnMoney">¥' + currentMoney + '元</span>');
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
			// 抵抗疫情
   //          if(new Date().getTime()>new Date(2020,1,4).getTime() && new Date().getTime()<new Date(2020,1,20).getTime() && sessionStorage.dayScanNum<3 ){//2020.2.4~2.11 每日两次
			// 	setTimeout(function(){
			// 		$('.active').css('display','flex');
			// 		$('.active .activeClose').on('click',function(e){
			// 			e.stopPropagation();
			// 			$('.active').css('display','none');
			// 		})
			// 		sessionStorage.isAdAlert = 'false';
			// 	},800);
			// }else{
			// 	sessionStorage.isAdAlert = 'false';
   //          }  
        }
    })();
    
    // 2020 5.1劳动节弹框
    if(new Date().getTime()>new Date(2020,3,29).getTime() && new Date().getTime()<new Date(2020,4,6).getTime() && sessionStorage.dayScanNum<3 && sessionStorage.skukey == '241510936-012' && sessionStorage.isAdAlert == 'true' ){//2020/04/30~2020/5/5 每日两次
        setTimeout(function(){
            $('.active').css('display','flex');
            $('.active .activeClose').on('click',function(e){
                e.stopPropagation();
                $('.active').css('display','none');
            })
            sessionStorage.isAdAlert = 'false';
        },800);
    }else{
        sessionStorage.isAdAlert = 'false';
    }  
    //拆红包
    $('.hbGet,.open').on('touchstart', function () {
		if(sessionStorage.isAdAlert=='true'){
			return false;
		}
        $('.open').addClass('kai');
        sessionStorage.again = 'true';
        setTimeout(function () {
            $('.get').fadeOut(600);
            $('.cash').fadeIn(600, function () {
				if(sessionStorage.scanLadderFlag=='1'&&sessionStorage.spuDayScanNum<6){//5.1-5.4
					switch (sessionStorage.spuDayScanNum){
						case '1':
							$('.ladder').css('background-image','url(/v/fjqp-common2.0/img/ladder_1.png)');
							$('.ladder_1').html('下一罐红包会更高');
							// $('.ladder_2').html('下一罐红包会更高');
							break;
						case '2':
							$('.ladder').css('background-image','url(/v/fjqp-common2.0/img/ladder_2.png)');
							$('.ladder_1').html('下一罐红包会更高');
							// $('.ladder_2').html('下一罐红包会更高');
							break;
						case '3':
							$('.ladder').css('background-image','url(/v/fjqp-common2.0/img/ladder_3.png)');
							$('.ladder_1').html('下一罐红包会更高');
							// $('.ladder_2').html('下一罐红包会更高');
							break;
						case '4':
							$('.ladder').css('background-image','url(/v/fjqp-common2.0/img/ladder_4.png)');
							$('.ladder_1').html('下一罐红包会更高');
							// $('.ladder_2').html('下一罐红包会更高');
							break;
						case '5':
							$('.ladder').css('background-image','url(/v/fjqp-common2.0/img/ladder_5.png)');
							$('.ladder_1').html('青啤虽好莫贪杯');
							$('.ladder_2').html('让我们明日再战');
							break;				
						default:
							$('.ladder').css('background-image','url(/v/fjqp-common2.0/img/ladder_5.png)');
							$('.ladder_1').html('青啤虽好莫贪杯');
							$('.ladder_2').html('让我们明日再战');
							break;
					}
					if(sessionStorage.skukey=='241510936-012'){
						setTimeout(function(){
							events();
							// 广告
							if(new Date().getTime()<new Date(2020,1,21).getTime()){
								$('.ladder_box').css('display','block');
								$('.ladder').on('click',function(e){
									e.stopPropagation();
									$('.ladder_box').css('display','none');
								})
							}
							// ladderAni();
						},1000);
						function ladderAni(){
							var timer = setTimeout(function(){
								ladderAni();
								timer = null;
								$('.ladder_light').toggle();
							},200);
						}
						if(new Date().getTime()>new Date(2020,1,21).getTime() && new Date().getTime()<new Date(2020,4,1).getTime() && sessionStorage.dayScanNum<3 &&sessionStorage.skukey=="241510936-012"){//2020.2.4~2.11 每日两次
							if(new Date().getTime()>new Date(2020,3,1).getTime()){
								$('.activeImg').attr('src','/v/fjqp-common2.0/img/20200331.jpg?v=1');
							}
							setTimeout(function(){
								$('.active').css('display','flex');
								$('.active .activeClose').on('click',function(e){
									e.stopPropagation();
									$('.active').css('display','none');
								})
							},2500);
						}  
					}else{
						events();
					}
					
				}else{
					events();
					if(new Date().getTime()>new Date(2020,1,21).getTime() && new Date().getTime()<new Date(2020,4,1).getTime() && sessionStorage.dayScanNum<3 &&sessionStorage.skukey=="241510936-012"){//2020.2.4~2.11 每日两次
						if(new Date().getTime()>new Date(2020,3,1).getTime() && new Date().getTime()<new Date(2020,4,1).getTime()){
							$('.activeImg').attr('src','/v/fjqp-common2.0/img/20200331.jpg?v=1');
						}
						setTimeout(function(){
							$('.active').css('display','flex');
							$('.active .activeClose').on('click',function(e){
								e.stopPropagation();
								$('.active').css('display','none');
							})
						},1500);
					}  
				}
				
				
                // 联通流量链接
                // $('.ad').css('display', 'block');
                // $('.adClose').on('click', function (event) {
                //     $('.ad').css('display', 'none');
                //     event.stopPropagation();
                // });
                // $('.adCover').on('click', function (event) {
                //     window.location.href = 'https://m.10010.com/queen/qingdaobeer/qdbeer.html';
                //     event.stopPropagation();
                // });
				
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
            ifremeber();
        });
        $('#btn,#repbtn').on('touchstart', function () {
            if (Number(totalAccountMoney) >= 1) {
                if (tx) {
                    tx = false;
                    $('#loading').css('display', 'block');
                    give_spack();
                }
            } else {
                ifremeber();
            }
        });
        // $('.game1').on('click', function () {
        //     location.href = 'http://' + location.host + '/v/csqp/game_1.html';
        // });
        $('.game2').on('click', function () {
            location.href = 'http://' + location.host + '/v/fjqp/game/index.html';
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
                        title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
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

    // 送酒上门按钮
    addNewBtn();
    function addNewBtn() {
        $('#btn-to-home').click(function() {
            try {
                _hmt.push(['_trackEvent', 'click', '领取红包页', '点击送酒上门按钮-福建']);
                setTimeout(function() {
                    window.location.href = 'https://mp.weixin.qq.com/s/zd_3_mfObarhmBizOZUXkw';
                },10);
            } catch(e) {

            }
        })
    }
})();