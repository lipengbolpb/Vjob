(function () {
    'use strict';
    var SPACK_PORT = vge.csqp + '/DBTHuNanQPInterface/gifts/getGiftspack';
    var APPID = vge.csqpappid;
    var PROJECT = 'csqp-common2.0';
    var RULE_URL = 'https://mp.weixin.qq.com/s?__biz=MzA4MzMxMDgyNA==&mid=300055174&idx=1&sn=e126844a6706e9344870a57d8d4aeb75&chksm=0beebb013c9932170f857bdf943316525ed878e3702ef805f631025bb183ee0a3b28f519585e#rd';
    var EXPLAIN_URL = 'https://mp.weixin.qq.com/s?__biz=MzA4MzMxMDgyNA==&mid=300054527&idx=1&sn=789ca2f60c02c13873fc1485720677a0&chksm=0beeb6783c993f6eb2446e453efe9d91e3702994ac54948635413b95577c5128f6f0d7496f27#rd';
    /* 定义各项参数 */
    var currentMoney = sessionStorage.currentMoney,
        totalAccountMoney = sessionStorage.totalAccountMoney,
        codeContentUrl = sessionStorage.codeContentUrl == 'undefined' ? '' : sessionStorage.codeContentUrl,
        currentVpoints = sessionStorage.currentVpoints == undefined ? 0 : sessionStorage.currentVpoints,
        earnTime = sessionStorage.earnTime,
        openid = sessionStorage.openid,
        args = vge.urlparse(location.href),
        bizcode = args.bizcode,
        hbopenid = args.openid,
        again = sessionStorage.again === undefined ? false : sessionStorage.again,
        rpjf = '',
        tx = true;


    (function () {
        if (Number(currentMoney) == 0) { //中奖金额为0
            if (currentVpoints == 0) {
                rpjf = '';
                $('.jifen').css('display', 'none');
                $('.congratulate').html('离红包只差一点点<br>再扫一罐试试');
                $('.congratulate').css({
                    'margin': '1rem auto 0',
                    'fontSize': '0.9rem'
                });
                $('.prize').css('display', 'none');
            } else {
                $('.prize').css('display', 'none');
                $('.jifen').html('<span>' + currentVpoints + '</span>积分');
                $('.jifen').css('margin', '1rem auto');
                rpjf = '<span class="repjf">' + currentVpoints + '积分</span>';
            }
        } else {
            $('#money').html(currentMoney);
            if (currentVpoints == 0) {
                $('.repjf').css('display', 'none');
                rpjf = '';
            } else {
                $('.jifen').html('+<span>' + currentVpoints + '</span>积分');
                rpjf = '<span class="repjf">' + currentVpoints + '积分</span>';
            }
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
                if (currentVpoints == 0) {
                    if (currentMoney == 0) {
                        $('.earn').html('您已扫过这罐酒<br>并获得0.00元');
                    } else {
                        $('.earn').html('您已扫过这罐酒<br>并获得<span class="earnMoney">¥' + currentMoney + '元</span>' + rpjf);
                    }
                } else {
                    if (currentMoney == 0) {
                        $('.earn').html('您已扫过这罐酒<br>并获得' + rpjf);
                    } else {
                        $('.earn').html('您已扫过这罐酒<br>并获得<span class="earnMoney">¥' + currentMoney + '元</span>和' + rpjf);
                    }
                }
            } else {
                if (currentVpoints == 0) {
                    if (currentMoney == 0) {
                        $('.earn').html('您已于<span class="earnTime">' + earnTime + '</span>扫过这罐酒<br>并获得0.00元');
                    } else {
                        $('.earn').html('您已于<span class="earnTime">' + earnTime + '</span>扫过这罐酒<br>并获得<span class="earnMoney">¥' + currentMoney + '元</span>' + rpjf);
                    }
                } else {
                    if (currentMoney == 0) {
                        $('.earn').html('您已于<span class="earnTime">' + earnTime + '</span>扫过这罐酒<br>并获得' + rpjf);
                    } else {
                        $('.earn').html('您已于<span class="earnTime">' + earnTime + '</span>扫过这罐酒<br>并获得<span class="earnMoney">¥' + currentMoney + '元</span>和' + rpjf);
                    }
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
				setTimeout(function(){
				    // if(Number(sessionStorage.dayScanNum)<2){
					// 	//酒王
					// 	$('#jw_box').fadeIn(10);
					// 	$('#jw_box .jw_content img').eq(0).css({'top':'0','opacity':1});
					// 	$('#jw_box .jw_content img').eq(1).css({'top':'1.2rem','opacity':1});
					// 	$('#jw_box .jw_content img').eq(2).css({'top':'2.35rem','opacity':1});
					// 	$('#jw_box .jw_content img').eq(3).css({'top':'4.75rem','opacity':1});
					// 	$('.jw_person').addClass('move');
					// }
					 // 广告
					if (new Date().getTime() > 1559664000000 && new Date().getTime() < 1560096000000) {
					    // 2019-6-5 0:0:0 -- 2019-6-9 24点
					    $('.active').css('display', 'block');
					    $('.active').on('click', function (event) {
					        $('.active').css('display', 'none');
					        event.stopPropagation();
					    });
					}
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
				},1000);
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
        $('.game1').on('click', function () {
            location.href = 'http://' + location.host + '/v/csqp/game_1.html';
        });
        $('.game2').on('click', function () {
            location.href = 'http://' + location.host + '/v/csqp/game/index.html';
        });
		//酒王
		// $('.jw_btn').on('click',function(){
		// 	$('#jw_box').fadeIn(10);
		// 	$('#jw_box .jw_content img').eq(0).css({'top':'0','opacity':1});
		//     $('#jw_box .jw_content img').eq(1).css({'top':'1.2rem','opacity':1});
		//     $('#jw_box .jw_content img').eq(2).css({'top':'2.35rem','opacity':1});
		//     $('#jw_box .jw_content img').eq(3).css({'top':'4.75rem','opacity':1});
		// 	$('.jw_person').addClass('move');
		// });
		// $('#jw_box .jw_close').on('click',function(){
		// 	$('#jw_box').css('display','none');
		// });
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
                        sessionStorage.totalAccountMoney = 0;
                        tx = false;
                    } else if (jo.result.businessCode === '1') { //1
                        title_tip('提 示', '您的红包金额不足，再喝几罐攒够1元发红包！', '我知道了');
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