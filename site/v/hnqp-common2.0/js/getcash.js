(function () {
    'use strict';
    var SPACK_PORT = vge.common + '/vjifenInterface/gifts/getGiftspack';
    var APPID = vge.hnqpappid;
    var PROJECT = 'hnqp-common2.0';
    var RULE_URL = 'https://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502815554&idx=1&sn=59ba6f9e032ffdeab60b144b20ffee30&chksm=0872999c3f05108afe36d7f1a2b97cf8a84198c9f7ea802b34a10cffc20328857547bbbe14b0#rd';
    var EXPLAIN_URL = 'https://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502815556&idx=1&sn=c00610884233a5d03d7d093d8a722d43&chksm=0872999a3f05108ce75171d07f9832fa03d93ab5a5d55a682196f7d7af92eff566ca1428e9ed#rd';
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
        tx = true,
        STRCODE = sessionStorage.STRCODE === undefined ? '' : sessionStorage.STRCODE;
    init();
	
    function init() {
        if (Number(currentMoney) == 0) { //中奖金额为0
            $('.congratulate').html('离红包只差一点点<br>再扫一瓶试试');
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
        }
    }
	
    //拆红包
    $('.hbGet,.open').on('touchstart', function () {
        $('.hbGet,.open').unbind('click');
        sessionStorage.again = 'true';
        if (STRCODE == 'true') { //从输入串码进入，模拟拆红包
            init();
            $('.open').addClass('kai');
            setTimeout(function () {
                $('.get').fadeOut(600);
                $('.cash').fadeIn(600, function () {
                    events();
                    sign();
                    sale();
                    // 广告
                    if(new Date().getTime() > 1556640000000 && new Date().getTime() < 1556985600000){
						$('.active').css('display', 'block');
						$('.active').on('click', function (event) {
						    $('.active').css('display', 'none');
						    event.stopPropagation();
						});
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
					 //酒王
					// $('#jw_box').fadeIn(10);
					// $('#jw_box .jw_content img').eq(0).css({'top':'0','opacity':1});
					// $('#jw_box .jw_content img').eq(1).css({'top':'1.2rem','opacity':1});
					// $('#jw_box .jw_content img').eq(2).css({'top':'2.35rem','opacity':1});
					// $('#jw_box .jw_content img').eq(3).css({'top':'4.75rem','opacity':1});
					// $('.jw_person').addClass('move');
                });
            }, 1000);
        } else {
            $('#loading').css('display', 'block');
            var req = { "projectServerName": "huanan",
                "openid": openid,
                "sweepstr": sessionStorage.qr,
                "longitude": sessionStorage.longitude === undefined ? '00' : sessionStorage.longitude, //"经度"
                "latitude": sessionStorage.latitude === undefined ? '00' : sessionStorage.latitude //"纬度"
            };
            $.ajax({
                type: "POST",
                url: vge.common + '/vjifenInterface/sweep/sweepQrcode',
                data: JSON.stringify(req),
                dataType: 'json',
                async: true,
                success: function (res, status, xhr) {
                    $('#loading').css('display', 'none');
                    if (res.result.code == '0') {
                        var replace = PROJECT;
                        switch (res.result.businessCode) {
                            case '0': // 普通奖
                                currentMoney = res.reply.currentMoney;
                                totalAccountMoney = res.reply.totalAccountMoney;
                                earnTime = res.reply.earnTime;
                                sessionStorage.totalAccountMoney = res.reply.totalAccountMoney;
                                sessionStorage.currentMoney = res.reply.currentMoney;
                                sessionStorage.earnTime = res.reply.earnTime === undefined ? '' : res.reply.earnTime;
                                //新签到
                                sessionStorage.weekSignFlag = res.reply.weekSignFlag; //用户是否开启自然周签到，1:开启、0或空:关闭
                                sessionStorage.weekSignPopup = res.reply.weekSignPopup; //自然周签到弹出提示，1:弹出提示、0或空:不弹出
                                sessionStorage.setItem('signCogAry', JSON.stringify(res.reply.signCogAry));
                                //捆绑
                                sessionStorage.promotionFlag = res.reply.promotionFlag; //用户是否开启自然周签到，1:开启、0或空:关闭
                                sessionStorage.promotionPopup = res.reply.promotionPopup; //自然周签到弹出提示，1:弹出提示、0或空:不弹出
								sessionStorage.dayScanNum = res.reply.dayScanNum;
                                sessionStorage.setItem('promotionCogAry', JSON.stringify(res.reply.promotionCogAry));
                                init();
                                $('.open').addClass('kai');
                                setTimeout(function () {
                                    $('.get').fadeOut(600);
                                    $('.cash').fadeIn(600, function () {
                                        events();
                                        sign();
                                        sale();
                                        // 广告
										if(new Date().getTime() > 1556640000000 && new Date().getTime() < 1556985600000){
											$('.active').css('display', 'block');
											$('.active').on('click', function (event) {
											    $('.active').css('display', 'none');
											    event.stopPropagation();
											});
										}
                                        // 联通流量链接
          //                               $('.ad').css('display', 'block');
          //                               $('.adClose').on('click', function (event) {
          //                                   $('.ad').css('display', 'none');
          //                                   event.stopPropagation();
          //                               });
          //                               $('.adCover').on('click', function (event) {
          //                                   window.location.href = 'https://m.10010.com/queen/qingdaobeer/qdbeer.html';
          //                                   event.stopPropagation();
          //                               });
										// if(Number(sessionStorage.dayScanNum)<2){
										// 	 //酒王
										// 	$('#jw_box').fadeIn(10);
										// 	$('#jw_box .jw_content img').eq(0).css({'top':'0','opacity':1});
										// 	$('#jw_box .jw_content img').eq(1).css({'top':'1.2rem','opacity':1});
										// 	$('#jw_box .jw_content img').eq(2).css({'top':'2.35rem','opacity':1});
										// 	$('#jw_box .jw_content img').eq(3).css({'top':'4.75rem','opacity':1});
										// 	$('.jw_person').addClass('move');
										// }
                                    });
                                }, 1000);
                                break;
                            case '7': // 大奖
                                sessionStorage.username = res.reply.username === undefined ? '' : res.reply.username;
                                sessionStorage.phonenum = res.reply.phonenum === undefined ? '' : res.reply.phonenum;
                                sessionStorage.idcard = res.reply.idcard === undefined ? '' : res.reply.idcard;
                                sessionStorage.skukey = res.reply.skukey;
                                sessionStorage.prizeVcode = res.reply.prizeVcode;
                                sessionStorage.grandPrizeType = res.reply.grandPrizeType === undefined ? '' : res.reply.grandPrizeType;
                                if (res.reply.grandPrizeType == 'p' || res.reply.grandPrizeType == 'P') {
                                    location.replace('http://' + location.host + '/v/' + replace + '/prize.html?bizcode=' + res.result.businessCode);
                                } else {
                                    title_tip('尊敬的用户', '扫码异常', '我知道了');
                                }
                                break;
                            case '15': //他人重复扫大奖
                                sessionStorage.grandPrizeType = res.reply.grandPrizeType === undefined ? '' : res.reply.grandPrizeType;
                                sessionStorage.earnTime = res.reply.earnTime === undefined ? '' : res.reply.earnTime; //扫码时间
                                location.replace('http://' + location.host + '/v/' + replace + '/prize.html?bizcode=' + res.result.businessCode);
                                break;
                            case '11': // 自己重复扫，普通奖
                                sessionStorage.totalAccountMoney = res.reply.totalAccountMoney;
                                sessionStorage.currentMoney = res.reply.currentMoney;
                                sessionStorage.codeContentUrl = res.reply.codeContentUrl;
                                sessionStorage.earnTime = res.reply.earnTime === undefined ? '' : res.reply.earnTime;
                                location.replace('http://' + location.host + '/' + replace + '/txo/getcash?bizcode=' + res.result.businessCode);
                                break;
                            case '12': // 可疑
                                location.replace('http://' + location.host + '/v/' + replace + '/getMsg.html?bizcode=' + res.result.businessCode);
                                break;
                            case '13': // 黑名单
                                location.replace('http://' + location.host + '/v/' + replace + '/getMsg.html?bizcode=' + res.result.businessCode);
                                break;
                            case '14': // 指定
                                location.replace('http://' + location.host + '/v/' + replace + '/getMsg.html?bizcode=' + res.result.businessCode);
                                break;
                            default:
                                if (res.reply) {
                                    sessionStorage.batchName = res.reply.batchName === undefined ? '' : res.reply.batchName;
                                    sessionStorage.earnTime = res.reply.earnTime === undefined ? '' : res.reply.earnTime;
                                    sessionStorage.msg = res.result.msg;
                                } else {
                                    sessionStorage.earnTime = '';
                                }
                                location.replace('http://' + location.host + '/v/' + replace + '/fail.html?bizcode=' + res.result.businessCode);
                        }
                    } else if (res.result.code == '-1') { //code!='0'
                        title_tip('尊敬的用户', '系统升级中...', '我知道了');
                    } else {
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    }
                },
                error: function (res, status, xhr) {
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            });
        }
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
		$('.icon_game').on('click',function(){
			location.href = 'http://w.vjifen.com/v/dice/index.html?province=hn_4';
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
        // $('.game2').on('click', function () {
        //     location.href = 'http://' + location.host + '/v/fjqp/game/index.html';
        // });
		// //酒王
		// $('.jw_btn').on('click',function(){
		// 	$('#jw_box').fadeIn(10);
		// 	$('#jw_box .jw_content img').eq(0).css({'top':'0','opacity':1});
		//     $('#jw_box .jw_content img').eq(1).css({'top':'1.2rem','opacity':1});
		//     $('#jw_box .jw_content img').eq(2).css({'top':'2.35rem','opacity':1});
		//     $('#jw_box .jw_content img').eq(3).css({'top':'4.75rem','opacity':1});
		// 	$('.jw_person').addClass('move');
		// });
		// $('#jw_box .jw_close').on('click',function(){
  //           event.stopPropagation();
		// 	$('#jw_box').css('display','none');
		// });
    }

    /* 提现 */
    function give_spack() {
        var javai = SPACK_PORT;
        var req = { "projectServerName": "huanan",
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
})();


/* 新版签到 */
function sign() { //混合签到功能
    var openid = sessionStorage.openid;
    var APPID = vge.hnqpappid;
    var PROJECT = 'hnqp-common2.0';
    var imgUrl = '/v/hnqp-common2.0/';
    var _host = vge.hnqpimg + '/DBTHuaNQPplatform';
    var iconFlag = true;
    var weekSignFlag = sessionStorage.weekSignFlag == 'undefined' ? '0' : sessionStorage.weekSignFlag;
    var weekSignPopup = sessionStorage.weekSignPopup == 'undefined' ? '0' : sessionStorage.weekSignPopup;
    var signCogAry = JSON.parse(sessionStorage.getItem('signCogAry'));

    var tpl_1 = '<div class="swiper">' +
        '<p class="signTotal" style="display:{{display}};">本次活动，红包总计{{total}}个，先到先得</p>' +
        '<img src="/v/hnqp-common2.0/img/sign/hb.png" class="signHb" style="display: block;">' +
        '</div>';
    var tpl_2 = '<div class="swiper">' +
        '<p class="signTotal" style="display:{{display}};">本次活动，红包总计{{total}}个，先到先得</p>' +
        '<div class="more" style="display: block;">' +
        '<p>恭喜你获得</p>' +
        '<span>¥</span>' +
        '<span>{{money}}</span>' +
        '<span>元</span>' +
        '</div>' +
        '</div>';
    var tpl_3 = '<div class="swiper">' +
        '<div class="less">' +
        '<p>恭喜你获得</p>' +
        '<span>¥</span>' +
        '<span>{{money}}</span>' +
        '<span>元</span>' +
        '<input type="button" value="存入零钱包" class="signBtn">' +
        '</div>' +
        '</div>';
    //1个sku模板
    var tpl_4 = '<div class="skuList">' +
        '<div class="detailsLeft">' +
        '<span>{{name}}</span>' +
        '<img src="{{skuLogo}}">' +
        '<span>×{{type}}</span>' +
        '</div>' +
        '<div class="detailsRight">' +
        '<input type="button" value="差{{diff}}">' +
        '</div>' +
        '</div>';
    //多个sku模板
    var tpl_5 = '<div class="skuLine">' +
        '<span class="line"></span>' +
        '<span class="txt">{{logic}}</span>' +
        '<span class="line"></span>' +
        '</div>' +
        '<div class="skuList">' +
        '<div class="detailsLeft">' +
        '<span>{{name}}</span>' +
        '<img src="{{skuLogo}}">' +
        '<span>×{{type}}</span>' +
        '</div>' +
        '<div class="detailsRight">' +
        '<input type="button" value="差{{diff}}">' +
        '</div>' +
        '</div>';
    //混合模式
    var tpl_6 = '<div class="skuList">' +
        '<div class="detailsLeft">' +
        '<img src="/v/' + PROJECT + '/img/sign/title_left.png" class="signTitleLeft">' +
        '<span class="signNum">{{num}}</span>' +
        '<img src="/v/' + PROJECT + '/img/sign/title_right.png" class="signTitleRight">' +
        '</div>' +
        '<div class="detailsRight">' +
        '<input type="button" value="差{{diff}}">' +
        '</div>' +
        '</div>' +
        '<p class="signNotice">喝指定产品得红包，参与产品详见活动说明</p>';
    if (weekSignFlag === '1') { //开启签到功能，则显示开关按钮
        $('#sign_logo').css('display', 'block');
        for (var i = 0; i < signCogAry.length; i++) {
            //默认图标为已领取，只要有一个活动是[未达标,扫码中]，则替换为领取红包的图标
            if (signCogAry[i].signEarnFlag == '0') {
                //未达标
                $('#sign_logo').css('background-image', 'url("' + imgUrl + 'img/sign/sign_logo.png?v=1")');
                iconFlag = false;
            } else if (signCogAry[i].signEarnFlag == '2') {
                //本次扫码中了签到红包
                $('#sign_logo').css('background-image', 'url("' + imgUrl + 'img/sign/sign_logo.png?v=1")');
                iconFlag = false;
            }
        }
        if (weekSignPopup === '1') { //自动弹出
            setTimeout(function () {
                $('.sign').css('display', 'block');
                var H = document.getElementsByClassName('slider')[0].offsetHeight; //0
                $('.signMask').css('height', H + 'px');
            }, 500);
        } else { //不自动弹出
            $('.sign').css('display', 'none');
        }
        $('#sign_logo').on('click', function () {
            $('.sign').css('display', 'block');
            var H = document.getElementsByClassName('slider')[0].offsetHeight; //0
            $('.signMask').css('height', H + 'px');
        });
        $('.signClose').on('click', function (event) {
            if (iconFlag) {
                $('#sign_logo').css('background-image', 'url("' + imgUrl + 'img/sign/sign_logo_2.png?v=1")');
            } else {
                $('#sign_logo').css('background-image', 'url("' + imgUrl + 'img/sign/sign_logo.png?v=1")');
            }
            $('.sign').css('display', 'none');
            event.stopPropagation();
        });
        //生成子元素，建立dom结构
        for (var i = 0; i < signCogAry.length; i++) {
            var tpl = '';
            var tpl_sku = '';
            if (signCogAry[i].signEarnFlag == '0') { //未达成
                if (signCogAry[i].prizeUpperLimit == '0' || signCogAry[i].prizeUpperLimit == 'undefined' || signCogAry[i].prizeUpperLimit == '' || signCogAry[i].prizeUpperLimit == undefined) {
                    tpl = tpl_1.replace('{{display}}', 'none');
                } else {
                    tpl = tpl_1.replace('{{total}}', signCogAry[i].prizeUpperLimit)
                        .replace('{{display}}', 'block');
                }
            } else if (signCogAry[i].signEarnFlag == '1') {
                if (signCogAry[i].prizeUpperLimit == '0' || signCogAry[i].prizeUpperLimit == 'undefined' || signCogAry[i].prizeUpperLimit == '' || signCogAry[i].prizeUpperLimit == undefined) {
                    tpl = tpl_2.replace('{{money}}', signCogAry[i].signEarnMoney)
                        .replace('{{display}}', 'none');
                } else {
                    tpl = tpl_2.replace('{{money}}', signCogAry[i].signEarnMoney)
                        .replace('{{total}}', signCogAry[i].prizeUpperLimit)
                        .replace('{{display}}', 'block');
                }
            } else if (signCogAry[i].signEarnFlag == '2') {
                tpl = tpl_3.replace('{{money}}', signCogAry[i].signEarnMoney);
            }
            var createSlider = $('<div class="slider slider_' + i + '"></div>');
            if (signCogAry[i].skuRelationType == '2') { //混合模式
                tpl_sku = tpl_6
                    .replace('{{num}}', signCogAry[i].signinSkuCogLst[0].signType === '0' ? signCogAry[i].signinSkuCogLst[0].signNum + '天' : signCogAry[i].signinSkuCogLst[0].signNum + '次')
                    .replace('{{diff}}', signCogAry[i].signinSkuCogLst[0].signType === '0' ? signCogAry[i].signinSkuCogLst[0].surplusSignNum + '天' : signCogAry[i].signinSkuCogLst[0].surplusSignNum + '次');
            } else {
                if (signCogAry[i].signinSkuCogLst.length == 1) {
                    tpl_sku = tpl_4
                        .replace('{{name}}', signCogAry[i].signinSkuCogLst[0].skuName)
                        .replace('{{skuLogo}}', _host + signCogAry[i].signinSkuCogLst[0].skuLogo)
                        .replace('{{type}}', signCogAry[i].signinSkuCogLst[0].signType === '0' ? signCogAry[i].signinSkuCogLst[0].signNum + '天' : signCogAry[i].signinSkuCogLst[0].signNum + '次')
                        .replace('{{diff}}', signCogAry[i].signinSkuCogLst[0].signType === '0' ? signCogAry[i].signinSkuCogLst[0].surplusSignNum + '天' : signCogAry[i].signinSkuCogLst[0].surplusSignNum + '次');
                } else {
                    tpl_sku = tpl_4
                        .replace('{{name}}', signCogAry[i].signinSkuCogLst[0].skuName)
                        .replace('{{skuLogo}}', _host + signCogAry[i].signinSkuCogLst[0].skuLogo)
                        .replace('{{type}}', signCogAry[i].signinSkuCogLst[0].signType === '0' ? signCogAry[i].signinSkuCogLst[0].signNum + '天' : signCogAry[i].signinSkuCogLst[0].signNum + '次')
                        .replace('{{diff}}', signCogAry[i].signinSkuCogLst[0].signType === '0' ? signCogAry[i].signinSkuCogLst[0].surplusSignNum + '天' : signCogAry[i].signinSkuCogLst[0].surplusSignNum + '次');
                    for (var j = 1; j < signCogAry[i].signinSkuCogLst.length; j++) {
                        tpl_sku += tpl_5
                            .replace('{{name}}', signCogAry[i].signinSkuCogLst[j].skuName)
                            .replace('{{skuLogo}}', _host + signCogAry[i].signinSkuCogLst[j].skuLogo)
                            .replace('{{type}}', signCogAry[i].signinSkuCogLst[j].signType === '0' ? signCogAry[i].signinSkuCogLst[j].signNum + '天' : signCogAry[i].signinSkuCogLst[j].signNum + '次')
                            .replace('{{diff}}', signCogAry[i].signinSkuCogLst[j].signType === '0' ? signCogAry[i].signinSkuCogLst[j].surplusSignNum + '天' : signCogAry[i].signinSkuCogLst[j].surplusSignNum + '次')
                            .replace('{{logic}}', signCogAry[i].skuRelationType === '0' ? '且' : '或');
                    }
                }
            }
            createSlider.append(tpl_sku);
            $('.signMiddle').append(tpl);
            $('.mainBottom').append(createSlider);
        }
        //设置父元素和子元素的宽度
        $('.signMiddle').css('width', signCogAry.length * 100 + '%');
        $('.swiper').css('width', 100 / signCogAry.length + '%');
        //默认是否显示前进按钮
        if (signCogAry.length >= 2) {
            $('.signRight').css('display', 'block');
        }
        //默认底部sku列表
        $('.slider_0').css('display', 'block');
        //默认进度条
        $('.inner').css('width', signCogAry[0].signPercent);
        $('.progressTitle').css('left', (Number(signCogAry[0].signPercent.replace('%', '')) - 10) + '%');
        $('.progressTitle p').text(signCogAry[0].signPercent);
        //默认是否显示遮罩层
        if (signCogAry[0].activityFinish == '1') { //已截止
            $('.signMask').find('img').attr('src', '/v/' + PROJECT + '/img/sign/mask_over.png?v=1');
            $('.signMask').css('display', 'block');
        } else { //进行中
            $('.signMask').find('img').attr('src', '/v/' + PROJECT + '/img/sign/mask.png?v=1');
            if (signCogAry[0].signEarnFlag == '0') { //未达成
                $('.signMask').css('display', 'none');
            } else if (signCogAry[0].signEarnFlag == '1') {
                $('.signMask').css('display', 'block');
            } else if (signCogAry[0].signEarnFlag == '2') {
                $('.signMask').css('display', 'block');
            }
        }
        //默认本周还是本月签到
        if (signCogAry[0].periodType == '0') { //周
            $('.bgTop').attr('src', imgUrl + 'img/sign/bg_top.png');
        } else if (signCogAry[0].periodType == '1') { //月
            $('.bgTop').attr('src', imgUrl + 'img/sign/bg_top_2.png');
        }
        //默认的活动说明内容
        sessionStorage.rule = signCogAry[0].activityDesc;
        //轮播
        var start = 0;
        var index = 0;
        $('.signRight').on('click', function () {
            index++;
            //轮播
            var S = (start - index) * 100 + '%';
            $('.signMiddle').css('marginLeft', S);
            //是否显示前进按钮
            if (index == signCogAry.length - 1) {
                $('.signRight').css('display', 'none');
                $('.signLeft').css('display', 'block');
            } else {
                $('.signLeft').css('display', 'block');
                $('.signRight').css('display', 'block');
            }
            slide(index);
        });
        $('.signLeft').on('click', function () {
            index--;
            //轮播
            var S = (start - index) * 100 + '%';
            $('.signMiddle').css('marginLeft', S);
            //是否显示后退按钮
            if (index == 0) {
                $('.signLeft').css('display', 'none');
                $('.signRight').css('display', 'block');
            } else {
                $('.signLeft').css('display', 'block');
                $('.signRight').css('display', 'block');
            }
            slide(index);
        });

        function slide(index) {
            $('.slider').css('display', 'none');
            $('.slider').eq(index).css('display', 'block');
            //进度条切换
            $('.inner').css('width', signCogAry[index].signPercent);
            $('.progressTitle').css('left', (Number(signCogAry[index].signPercent.replace('%', '')) - 10) + '%');
            $('.progressTitle p').text(signCogAry[index].signPercent);
            //重置遮罩层高度
            var H = document.getElementsByClassName('slider_' + index)[0].offsetHeight; //0
            $('.signMask').css('height', H + 'px');
            if (signCogAry[index].activityFinish == '1') { //已截止
                $('.signMask').find('img').attr('src', '/v/' + PROJECT + '/img/sign/mask_over.png?v=1');
                $('.signMask').css('display', 'block');
            } else if (signCogAry[index].activityFinish == '0') { //进行中
                $('.signMask').find('img').attr('src', '/v/' + PROJECT + '/img/sign/mask.png?v=1');
                if (signCogAry[index].signEarnFlag == '0') { //未达成
                    $('.signMask').css('display', 'none');
                } else if (signCogAry[index].signEarnFlag == '1') {
                    $('.signMask').css('display', 'block');
                } else if (signCogAry[index].signEarnFlag == '2') {
                    $('.signMask').css('display', 'block');
                }
            }
            //周签到or月签到
            if (signCogAry[index].periodType == '0') { //周
                $('.bgTop').attr('src', imgUrl + 'img/sign/bg_top.png');
            } else if (signCogAry[index].periodType == '1') { //月
                $('.bgTop').attr('src', imgUrl + 'img/sign/bg_top_2.png');
            }
            sessionStorage.rule = signCogAry[index].activityDesc;
        }

        //绑定存入我的零钱包事件
        if ($('.signBtn').length > 0) {
            $('.signBtn').on('click', function () {
                ifremeber();
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
            });
        }
        //查看活动规则
        $('.signCk').on('click', function () {
            $('#signContent').html(sessionStorage.rule);
            $('.signRule').css('display', 'block');
        });
        $('#signBack').on('click', function () {
            $('#signContent').html('');
            $('.signRule').css('display', 'none');
        });
    } else if (weekSignFlag === '' || weekSignFlag === '0') { //关闭签到功能，则不显示开关按钮
        $('#sign_logo').css('display', 'none');
    }
}

/* 捆绑促销 */
function sale() {
    var args = vge.urlparse(location.href),
        bizcode = args.bizcode,
        again = sessionStorage.again;

    var promotionFlag = sessionStorage.promotionFlag == 'undefined' ? '0' : sessionStorage.promotionFlag, //是否开启1:开启、0或空:关闭
        promotionPopup = sessionStorage.promotionPopup == 'undefined' ? '0' : sessionStorage.promotionPopup, //1:弹出提示、0或空:不弹出
        promotionCogAry = JSON.parse(sessionStorage.getItem('promotionCogAry')); //活动列表
    var PROJECT = 'hnqp-common2.0';
    var imgUrl = '/v/hnqp-common2.0/';
    var _host = vge.hnqpimg + '/DBTHuaNQPplatform';
    //是否显示捆绑促销按钮
    if (promotionFlag == '1') { //1为开启
        if (bizcode == 11) {
            $('.sale').css('display', 'none');
        } else {
            $('#sale_icon').css('display', 'block');
            //是否自动弹出
            if (promotionPopup === '1') { //1为自动弹出
                $('.sale').css('display', 'block');
            } else {
                $('.sale').css('display', 'none');
            }
        }
        //生成页面结构
        //且
        var tpl1 = '<div class="saleAlsoList">' +
            '<p class="saleAlsoListTitle">{{skuName}}</p>' +
            '<img src="{{img}}" class="saleBeer">' +
            '<div class="saleProgress">' +
            '<div class="saleInner" style="width:{{width}};">' +
            '<div class="saleNum">' +
            '<p>{{signNum}}</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<p class="saleAlsoListNum">{{total}}{{type}}</p>' +
            '</div>';
        //或（A）
        var tpl2 =
            '<div class="saleOrA">' +
            '<div class="saleOrAList">' +
            '<p class="saleOrAListTitle">{{skuName}}</p>' +
            '<img src="{{img}}" class="saleBeer">' +
            '<div class="saleProgress">' +
            '<div class="saleInner" style="width:{{width}};">' +
            '<div class="saleNum">' +
            '<p>{{signNum}}</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<p class="saleOrListNum">{{total}}{{type}}</p>' +
            '</div>' +
            '<img src="/v/' + PROJECT + '/img/sale/A.png" class="saleIconA">' +
            '</div>' +
            '<img src="/v/' + PROJECT + '/img/sale/add.png" class="saleAdd">';
        //或（B）
        var tpl3 =
            '<div class="saleOrBList">' +
            '<p class="saleOrBListTitle">{{skuName}}</p>' +
            '<img src="{{img}}" class="saleBeer">' +
            '<div class="saleProgress">' +
            '<div class="saleInner" style="width:{{width}};">' +
            '<div class="saleNum">' +
            '<p>{{signNum}}</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<p class="saleOrListNum">{{total}}{{type}}</p>' +
            '</div>' +
            '<img src="/v/' + PROJECT + '/img/sale/or.png" class="saleSplit">';
        var tpl4 =
            '<div class="saleOrBList">' +
            '<p class="saleOrBListTitle">{{skuName}}</p>' +
            '<img src="{{img}}" class="saleBeer">' +
            '<div class="saleProgress">' +
            '<div class="saleInner" style="width:{{width}};">' +
            '<div class="saleNum">' +
            '<p>{{signNum}}</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<p class="saleOrListNum">{{total}}{{type}}</p>' +
            '</div>';
        //混合（A）
        var tpl5 =
            '<div class="saleMixA">' +
            '<div class="saleMixAList">' +
            '<p class="saleMixAListTitle">{{skuName}}</p>' +
            '<img src="{{img}}" class="saleBeer">' +
            '<div class="saleProgress">' +
            '<div class="saleInner" style="width:{{width}};">' +
            '<div class="saleNum">' +
            '<p>{{signNum}}</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<p class="saleMixListNum">{{total}}{{type}}</p>' +
            '</div>' +
            '<img src="/v/' + PROJECT + '/img/sale/A.png" class="saleIconA">' +
            '</div>' +
            '<img src="/v/' + PROJECT + '/img/sale/add.png" class="saleAdd">';
        //混合（B）进度条
        var tpl6 =
            '<div class="saleMixBTitle">' +
            '<p>进度</p>' +
            '<div class="saleProgress">' +
            '<div class="saleInner" style="width:{{width}};">' +
            '<div class="saleNum">' +
            '<p>{{signNum}}</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<p class="saleMixListNum">{{total}}{{type}}</p>' +
            '</div>' +
            '<img src="/v/' + PROJECT + '/img/sale/B.png" class="saleIconB">';
        //混合（B）
        var tpl7 =
            '<div class="saleMixBList">' +
            '<p>{{skuName}}</p>' +
            '<img src="{{img}}" class="saleMixBeer">' +
            '</div>';
        for (var i = 0; i < promotionCogAry.length; i++) {
            var tpl = '';
            if (promotionCogAry[i].skuRelationType === '0') { //且
                var create = $('<div class="saleAlso" key="0"></div>');
                if (promotionCogAry[i].earnFlag === '0') { //未完成
                    create.attr('flag', '0');
                    create.attr('money', '0');
                } else if (promotionCogAry[i].earnFlag === '1') { //已领取
                    create.attr('flag', '1');
                    create.attr('money', promotionCogAry[i].earnMoney);
                } else if (promotionCogAry[i].earnFlag === '2') { //领取红包
                    create.attr('flag', '2');
                    create.attr('money', promotionCogAry[i].earnMoney);
                }
                if (promotionCogAry[i].activityFinish === '1') { //活动已结束
                    create.attr('activityFinish', '1');
                } else if (promotionCogAry[i].activityFinish === '0') { //正常
                    create.attr('activityFinish', '0');
                }
                create.attr('periodType', promotionCogAry[i].periodType);
                create.attr('prizeUpperLimit', promotionCogAry[i].prizeUpperLimit);
                if (promotionCogAry[i].skuRelationPeriod === '1') { //上期
                    create.attr('skuRelationPeriod', '1');
                } else if (promotionCogAry[i].skuRelationPeriod === '0') { //本期
                    create.attr('skuRelationPeriod', '0');
                }
                var l = promotionCogAry[i].signinSkuCogLst.length;
                if (l > 0) {
                    var skuName = promotionCogAry[i].promotionSkuCog.skuName,
                        total = promotionCogAry[i].promotionSkuCog.signNum,
                        signNum = parseFloat(promotionCogAry[i].promotionSkuCog.signNum) - parseFloat(promotionCogAry[i].promotionSkuCog.surplusSignNum),
                        width = parseFloat(signNum) / parseFloat(total) * 100 + '%',
                        beer = _host + promotionCogAry[i].promotionSkuCog.skuLogo;
                    tpl = tpl1.replace('{{skuName}}', skuName)
                        .replace('{{signNum}}', signNum)
                        .replace('{{total}}', total)
                        .replace('{{width}}', width)
                        .replace('{{img}}', beer);
                    if (promotionCogAry[i].promotionSkuCog.signType === '0') { //天??
                        tpl = tpl.replace('{{type}}', '天');
                    } else if (promotionCogAry[i].promotionSkuCog.signType === '1') { //瓶??
                        tpl = tpl.replace('{{type}}', '瓶');
                    }
                    create.append(tpl);
                    for (var k = 0; k < l; k++) {
                        var skuName = promotionCogAry[i].signinSkuCogLst[k].skuName,
                            total = promotionCogAry[i].signinSkuCogLst[k].signNum,
                            signNum = parseFloat(promotionCogAry[i].signinSkuCogLst[k].signNum) - parseFloat(promotionCogAry[i].signinSkuCogLst[k].surplusSignNum),
                            width = parseFloat(signNum) / parseFloat(total) * 100 + '%',
                            beer = _host + promotionCogAry[i].signinSkuCogLst[k].skuLogo;
                        tpl = tpl1.replace('{{skuName}}', skuName)
                            .replace('{{signNum}}', signNum)
                            .replace('{{total}}', total)
                            .replace('{{width}}', width)
                            .replace('{{img}}', beer);
                        if (promotionCogAry[i].signinSkuCogLst[k].signType === '0') { //天??
                            tpl = tpl.replace('{{type}}', '天');
                        } else if (promotionCogAry[i].signinSkuCogLst[k].signType === '1') { //瓶??
                            tpl = tpl.replace('{{type}}', '瓶');
                        }
                        create.append(tpl);
                    }
                    var img = $('<img src="/v/' + PROJECT + '/img/sale/over.png" class="saleOver">');
                    create.append(img);
                } else {
                    var skuName = promotionCogAry[i].promotionSkuCog.skuName,
                        total = promotionCogAry[i].promotionSkuCog.signNum,
                        signNum = parseFloat(promotionCogAry[i].promotionSkuCog.signNum) - parseFloat(promotionCogAry[i].promotionSkuCog.surplusSignNum),
                        width = parseFloat(signNum) / parseFloat(total) * 100 + '%',
                        beer = _host + promotionCogAry[i].promotionSkuCog.skuLogo;
                    tpl = tpl1.replace('{{skuName}}', skuName)
                        .replace('{{signNum}}', signNum)
                        .replace('{{total}}', total)
                        .replace('{{width}}', width)
                        .replace('{{img}}', beer);
                    if (promotionCogAry[i].promotionSkuCog.signType === '0') { //天??
                        tpl = tpl.replace('{{type}}', '天');
                    } else if (promotionCogAry[i].promotionSkuCog.signType === '1') { //瓶??
                        tpl = tpl.replace('{{type}}', '瓶');
                    }
                    create.append(tpl);
                    var img = $('<img src="/v/' + PROJECT + '/img/sale/over.png" class="saleOver">');
                    create.append(img);
                }
                $('.saleContent').append(create);
            } else if (promotionCogAry[i].skuRelationType === '1') { //或
                var create = $('<div class="saleOr" key="1"></div>');
                if (promotionCogAry[i].earnFlag === '0') { //未完成
                    create.attr('flag', '0');
                    create.attr('money', '0');
                } else if (promotionCogAry[i].earnFlag === '1') { //已领取
                    create.attr('flag', '1');
                    create.attr('money', promotionCogAry[i].earnMoney);
                } else if (promotionCogAry[i].earnFlag === '2') { //领取红包
                    create.attr('flag', '2');
                    create.attr('money', promotionCogAry[i].earnMoney);
                }
                if (promotionCogAry[i].activityFinish === '1') { //活动已结束
                    create.attr('activityFinish', '1');
                } else if (promotionCogAry[i].activityFinish === '0') { //正常
                    create.attr('activityFinish', '0');
                }
                if (promotionCogAry[i].skuRelationPeriod === '1') { //上期
                    create.attr('skuRelationPeriod', '1');
                } else if (promotionCogAry[i].skuRelationPeriod === '0') { //本期
                    create.attr('skuRelationPeriod', '0');
                }
                create.attr('periodType', promotionCogAry[i].periodType);
                create.attr('prizeUpperLimit', promotionCogAry[i].prizeUpperLimit);
                var l = promotionCogAry[i].signinSkuCogLst.length;
                if (l > 0) {
                    //1.添加A部分
                    var skuName = promotionCogAry[i].promotionSkuCog.skuName,
                        total = promotionCogAry[i].promotionSkuCog.signNum,
                        signNum = parseFloat(promotionCogAry[i].promotionSkuCog.signNum) - parseFloat(promotionCogAry[i].promotionSkuCog.surplusSignNum),
                        width = parseFloat(signNum) / parseFloat(total) * 100 + '%',
                        beer = _host + promotionCogAry[i].promotionSkuCog.skuLogo;
                    tpl = tpl2.replace('{{skuName}}', skuName)
                        .replace('{{signNum}}', signNum)
                        .replace('{{total}}', total)
                        .replace('{{width}}', width)
                        .replace('{{img}}', beer);
                    if (promotionCogAry[i].promotionSkuCog.signType === '0') { //天??
                        tpl = tpl.replace('{{type}}', '天');
                    } else if (promotionCogAry[i].promotionSkuCog.signType === '1') { //瓶??
                        tpl = tpl.replace('{{type}}', '瓶');
                    }
                    create.append(tpl);
                    //2.添加B部分
                    var createB = $('<div class="saleOrB"></div>');
                    var l = promotionCogAry[i].signinSkuCogLst.length;
                    for (var k = 0; k < l; k++) {
                        var skuName = promotionCogAry[i].signinSkuCogLst[k].skuName,
                            total = promotionCogAry[i].signinSkuCogLst[k].signNum,
                            signNum = parseFloat(promotionCogAry[i].signinSkuCogLst[k].signNum) - parseFloat(promotionCogAry[i].signinSkuCogLst[k].surplusSignNum),
                            width = parseFloat(signNum) / parseFloat(total) * 100 + '%',
                            beer = _host + promotionCogAry[i].signinSkuCogLst[k].skuLogo;
                        if (k === l - 1) { //最后一项
                            tpl = tpl4.replace('{{skuName}}', skuName)
                                .replace('{{signNum}}', signNum)
                                .replace('{{total}}', total)
                                .replace('{{width}}', width)
                                .replace('{{img}}', beer);
                            if (promotionCogAry[i].signinSkuCogLst[k].signType === '0') { //天??
                                tpl = tpl.replace('{{type}}', '天');
                            } else if (promotionCogAry[i].signinSkuCogLst[k].signType === '1') { //瓶??
                                tpl = tpl.replace('{{type}}', '瓶');
                            }
                        } else {
                            tpl = tpl3.replace('{{skuName}}', skuName)
                                .replace('{{signNum}}', signNum)
                                .replace('{{total}}', total)
                                .replace('{{width}}', width)
                                .replace('{{img}}', beer);
                            if (promotionCogAry[i].signinSkuCogLst[k].signType === '0') { //天??
                                tpl = tpl.replace('{{type}}', '天');
                            } else if (promotionCogAry[i].signinSkuCogLst[k].signType === '1') { //瓶??
                                tpl = tpl.replace('{{type}}', '瓶');
                            }
                        }
                        createB.append(tpl);
                    }
                    createB.append('<img src="/v/' + PROJECT + '/img/sale/B.png" class="saleIconB">');
                    create.append(createB);
                    create.append('<img src="/v/' + PROJECT + '/img/sale/over.png" class="saleOver" style="top:30%">');
                } else {
                    var skuName = promotionCogAry[i].promotionSkuCog.skuName,
                        total = promotionCogAry[i].promotionSkuCog.signNum,
                        signNum = parseFloat(promotionCogAry[i].promotionSkuCog.signNum) - parseFloat(promotionCogAry[i].promotionSkuCog.surplusSignNum),
                        width = parseFloat(signNum) / parseFloat(total) * 100 + '%',
                        beer = _host + promotionCogAry[i].promotionSkuCog.skuLogo;
                    tpl = tpl1.replace('{{skuName}}', skuName)
                        .replace('{{signNum}}', signNum)
                        .replace('{{total}}', total)
                        .replace('{{width}}', width)
                        .replace('{{img}}', beer);
                    if (promotionCogAry[i].promotionSkuCog.signType === '0') { //天??
                        tpl = tpl.replace('{{type}}', '天');
                    } else if (promotionCogAry[i].promotionSkuCog.signType === '1') { //瓶??
                        tpl = tpl.replace('{{type}}', '瓶');
                    }
                    create.append(tpl);
                    var img = $('<img src="/v/' + PROJECT + '/img/sale/over.png" class="saleOver">');
                    create.append(img);
                    create.removeClass('saleOr');
                    create.addClass('saleAlso');
                }
                $('.saleContent').append(create);
            } else if (promotionCogAry[i].skuRelationType === '2') { //混合
                var create = $('<div class="saleMix" key="2"></div>');
                if (promotionCogAry[i].earnFlag === '0') { //未完成
                    create.attr('flag', '0');
                    create.attr('money', '0');
                } else if (promotionCogAry[i].earnFlag === '1') { //已领取
                    create.attr('flag', '1');
                    create.attr('money', promotionCogAry[i].earnMoney);
                } else if (promotionCogAry[i].earnFlag === '2') { //领取红包
                    create.attr('flag', '2');
                    create.attr('money', promotionCogAry[i].earnMoney);
                }
                if (promotionCogAry[i].activityFinish === '1') { //活动已结束
                    create.attr('activityFinish', '1');
                } else if (promotionCogAry[i].activityFinish === '0') { //正常
                    create.attr('activityFinish', '0');
                }
                if (promotionCogAry[i].skuRelationPeriod === '1') { //上期
                    create.attr('skuRelationPeriod', '1');
                } else if (promotionCogAry[i].skuRelationPeriod === '0') { //本期
                    create.attr('skuRelationPeriod', '0');
                }
                create.attr('periodType', promotionCogAry[i].periodType);
                create.attr('prizeUpperLimit', promotionCogAry[i].prizeUpperLimit);
                var l = promotionCogAry[i].signinSkuCogLst.length;
                if (l > 0) {
                    //1.添加A部分
                    var skuName = promotionCogAry[i].promotionSkuCog.skuName,
                        total = promotionCogAry[i].promotionSkuCog.signNum,
                        signNum = parseFloat(promotionCogAry[i].promotionSkuCog.signNum) - parseFloat(promotionCogAry[i].promotionSkuCog.surplusSignNum),
                        width = parseFloat(signNum) / parseFloat(total) * 100 + '%',
                        beer = _host + promotionCogAry[i].promotionSkuCog.skuLogo;
                    tpl = tpl5.replace('{{skuName}}', skuName)
                        .replace('{{signNum}}', signNum)
                        .replace('{{total}}', total)
                        .replace('{{width}}', width)
                        .replace('{{img}}', beer);
                    if (promotionCogAry[i].promotionSkuCog.signType === '0') { //天??
                        tpl = tpl.replace('{{type}}', '天');
                    } else if (promotionCogAry[i].promotionSkuCog.signType === '1') { //瓶??
                        tpl = tpl.replace('{{type}}', '瓶');
                    }
                    create.append(tpl);
                    //2.添加B部分进度条
                    if (promotionCogAry[i].signinSkuCogLst.length > 0) {
                        var createB = $('<div class="saleMixB"></div>');
                        var skuName = promotionCogAry[i].signinSkuCogLst[0].skuName,
                            total = promotionCogAry[i].signinSkuCogLst[0].signNum,
                            signNum = parseFloat(promotionCogAry[i].signinSkuCogLst[0].signNum) - parseFloat(promotionCogAry[i].signinSkuCogLst[0].surplusSignNum),
                            width = parseFloat(signNum) / parseFloat(total) * 100 + '%';
                        tpl = tpl6.replace('{{signNum}}', signNum)
                            .replace('{{total}}', total)
                            .replace('{{width}}', width);
                        if (promotionCogAry[i].signinSkuCogLst.length > 0) {
                            if (promotionCogAry[i].signinSkuCogLst[0].signType === '0') { //天??
                                tpl = tpl.replace('{{type}}', '天');
                            } else if (promotionCogAry[i].signinSkuCogLst[0].signType === '1') { //瓶??
                                tpl = tpl.replace('{{type}}', '瓶');
                            }
                        }
                        createB.append(tpl);
                    }
                    //3.添加B部分
                    var l = promotionCogAry[i].signinSkuCogLst.length;
                    for (var k = 0; k < l; k++) {
                        var skuName = promotionCogAry[i].signinSkuCogLst[k].skuName,
                            beer = _host + promotionCogAry[i].signinSkuCogLst[k].skuLogo;
                        tpl = tpl7.replace('{{skuName}}', skuName).replace('{{img}}', beer);
                        createB.append(tpl);
                    }
                    create.append(createB);
                    create.append('<img src="/v/' + PROJECT + '/img/sale/over.png" class="saleOver" style="top:30%">');
                } else {
                    var skuName = promotionCogAry[i].promotionSkuCog.skuName,
                        total = promotionCogAry[i].promotionSkuCog.signNum,
                        signNum = parseFloat(promotionCogAry[i].promotionSkuCog.signNum) - parseFloat(promotionCogAry[i].promotionSkuCog.surplusSignNum),
                        width = parseFloat(signNum) / parseFloat(total) * 100 + '%',
                        beer = _host + promotionCogAry[i].promotionSkuCog.skuLogo;
                    tpl = tpl1.replace('{{skuName}}', skuName)
                        .replace('{{signNum}}', signNum)
                        .replace('{{total}}', total)
                        .replace('{{width}}', width)
                        .replace('{{img}}', beer);
                    if (promotionCogAry[i].promotionSkuCog.signType === '0') { //天??
                        tpl = tpl.replace('{{type}}', '天');
                    } else if (promotionCogAry[i].promotionSkuCog.signType === '1') { //瓶??
                        tpl = tpl.replace('{{type}}', '瓶');
                    }
                    create.append(tpl);
                    var img = $('<img src="/v/' + PROJECT + '/img/sale/over.png" class="saleOver">');
                    create.append(img);
                    create.removeClass('saleOr');
                    create.addClass('saleAlso');
                }
                $('.saleContent').append(create);
            }
        }

        var key = '';
        var flag = '';
        var money = '';
        var type = '';
        var activityFinish = '';
        var skuRelationPeriod = '';
        var prizeUpperLimit = '';
        //默认是否显示按钮
        if ($('.saleContent').children().length > 1) {
            $('.saleNext').addClass('show');
        }
        //默认sku列表
        $('.saleContent').children().eq(0).css('display', 'block');
        key = $('.saleContent').children().eq(0).attr('key');
        flag = $('.saleContent').children().eq(0).attr('flag');
        money = $('.saleContent').children().eq(0).attr('money');
        type = $('.saleContent').children().eq(0).attr('periodType');
        activityFinish = $('.saleContent').children().eq(0).attr('activityFinish');
        skuRelationPeriod = $('.saleContent').children().eq(0).attr('skuRelationPeriod');
        prizeUpperLimit = $('.saleContent').children().eq(0).attr('prizeUpperLimit');
        init(type, key, flag, money, 0, activityFinish, skuRelationPeriod, prizeUpperLimit);
        // 默认活动说明
        sessionStorage.saleRule = promotionCogAry[0].activityDesc;
        //轮播
        var index = 0;
        $('.saleNext').on('click', function () {
            index++;
            //是否显示前进按钮
            if (index == $('.saleContent').children().length - 1) {
                $('.saleNext').removeClass('show');
                $('.salePrev').addClass('show');
            } else {
                $('.saleNext').addClass('show');
                $('.salePrev').addClass('show');
            }
            slide(index);
            key = $('.saleContent').children().eq(index).attr('key');
            flag = $('.saleContent').children().eq(index).attr('flag');
            money = $('.saleContent').children().eq(index).attr('money');
            type = $('.saleContent').children().eq(index).attr('periodType');
            activityFinish = $('.saleContent').children().eq(index).attr('activityFinish');
            skuRelationPeriod = $('.saleContent').children().eq(index).attr('skuRelationPeriod');
            prizeUpperLimit = $('.saleContent').children().eq(index).attr('prizeUpperLimit');
            init(type, key, flag, money, index, activityFinish, skuRelationPeriod, prizeUpperLimit);
        });
        $('.salePrev').on('click', function () {
            index--;
            //是否显示前进按钮
            if (index == 0) {
                $('.salePrev').removeClass('show');
                $('.saleNext').addClass('show');
            } else {
                $('.saleNext').addClass('show');
                $('.salePrev').addClass('show');
            }
            slide(index);
            key = $('.saleContent').children().eq(index).attr('key');
            flag = $('.saleContent').children().eq(index).attr('flag');
            money = $('.saleContent').children().eq(index).attr('money');
            type = $('.saleContent').children().eq(index).attr('periodType');
            activityFinish = $('.saleContent').children().eq(index).attr('activityFinish');
            skuRelationPeriod = $('.saleContent').children().eq(index).attr('skuRelationPeriod');
            prizeUpperLimit = $('.saleContent').children().eq(index).attr('prizeUpperLimit');
            init(type, key, flag, money, index, activityFinish, skuRelationPeriod, prizeUpperLimit);
        });

        function slide(index) {
            $('.saleContent').children().css('display', 'none');
            $('.saleContent').children().eq(index).css('display', 'block');
            sessionStorage.saleRule = promotionCogAry[index].activityDesc;
        }

        function init(type, key, flag, money, index, activityFinish, skuRelationPeriod, prizeUpperLimit) {
            if (flag === '1' || flag === '2') {
                $('.saleNoticeTop').html('恭喜你额外获得');
                $('.saleNoticeTop').css({
                    'color': '#de0800',
                    'fontSize': '0.65rem'
                });
                $('#saleMoney').text(money);
                $('.saleNoticeBottom').css('display', 'block');
                $('.saleContent').children().eq(index).find('.saleOver').attr('src', '/v/' + PROJECT + '/img/sale/over.png');
                $('.saleContent').children().eq(index).find('.saleOver').css('display', 'block');
            } else if (flag === '0') {
                if (key === '0') { //且
                    $('.saleNoticeTop').css({
                        'color': '#5a2d0c',
                        'fontSize': '0.75rem'
                    });
                    $('.saleNoticeTop').html('完成进度即送红包');
                    $('.saleNoticeBottom').css('display', 'none');
                } else if (key === '1') { //或
                    if (skuRelationPeriod === '1') { //上期
                        $('.saleNoticeTop').html('完成进度即送红包');
                    } else {
                        $('.saleNoticeTop').html('A+<span style="color:#de0800;">B(任意一款)</span> 搭配着喝~');
                    }
                    $('.saleNoticeTop').css({
                        'color': '#5a2d0c',
                        'fontSize': '0.75rem'
                    });
                    $('.saleNoticeBottom').css('display', 'none');
                } else if (key === '2') { //混合
                    if (skuRelationPeriod === '1') { //上期
                        $('.saleNoticeTop').html('完成进度即送红包');
                    } else {
                        $('.saleNoticeTop').html('A+<span style="color:#de0800;">B(随意选)</span> 搭配着喝~');
                    }
                    $('.saleNoticeTop').css({
                        'color': '#5a2d0c',
                        'fontSize': '0.75rem'
                    });
                    $('.saleNoticeBottom').css('display', 'none');
                }
            }
            if (type === '0') { //周
                $('.saleType').val('本周进度');
            } else if (type === '1') { //月
                $('.saleType').val('本月进度');
            } else if (type === '2') { //天
                $('.saleType').val('当天进度');
            }
            if (activityFinish === '1') { //活动已结束
                $('.saleContent').children().eq(index).find('.saleOver').attr('src', '/v/' + PROJECT + '/img/sale/over_2.png');
                $('.saleContent').children().eq(index).find('.saleOver').css('display', 'block');
            }
            if (prizeUpperLimit === '' || prizeUpperLimit === '0' || prizeUpperLimit === 'undefined' || prizeUpperLimit === undefined) { //无上限
                $('.saleNoticeOver1').css('display', 'none');
                $('.saleNoticeOver2').css('display', 'none');
            } else {
                $('.saleNoticeOver1').css('display', 'none');
                $('.saleNoticeOver2').css('display', 'none');
                if (flag === '0' || activityFinish === '1') {
                    if (skuRelationPeriod === '1') { //上期
                        $('.saleNoticeOver2Num').html(prizeUpperLimit);
                        $('.saleNoticeOver2').css('display', 'block');
                        $('.saleNoticeOver1').css('display', 'none');
                    } else if (skuRelationPeriod === '0') { //本期
                        $('.saleNoticeOver1Num').html(prizeUpperLimit);
                        $('.saleNoticeOver1').css('display', 'block');
                        $('.saleNoticeOver2').css('display', 'none');
                    }
                }
            }
        }
        //添加事件
        $('#sale_icon').on('click', function (event) {
            $('.sale').css('display', 'block');
            event.stopPropagation();
        });
        $('.saleClose').on('click', function (event) {
            $('.sale').css('display', 'none');
            event.stopPropagation();
        });
        //查看活动规则
        $('.saleRule').on('click', function () {
            $('#signContent').html(sessionStorage.saleRule);
            $('.signRule').css('display', 'block');
        });
        $('#signBack').on('click', function () {
            $('#signContent').html('');
            $('.signRule').css('display', 'none');
        });
    } else {
        $('#sale_icon').css('display', 'none');
    }
}