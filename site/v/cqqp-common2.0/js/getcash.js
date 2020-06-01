(function () {
    'use strict';
    var SPACK_PORT = vge.common + '/vjifenInterface/gifts/getGiftspack';
    var APPID = vge.cqqpappid;
    var PROJECT = 'cqqp-common2.0';
    // var RULE_URL = 'https://mp.weixin.qq.com/s?__biz=MzIxNDE4NTQ4MA==&mid=502752237&idx=1&sn=3a5e4d7ec2be9a8ed9587561400fa04e&chksm=0fa8a08a38df299c6d5043b5ae98fac1df9a50daf0f825364511a0e1b35f39dc3a045c0414b3#rd';
    // var EXPLAIN_URL = 'https://mp.weixin.qq.com/s?__biz=MzIxNDE4NTQ4MA==&mid=502752239&idx=1&sn=3dff1c4a0775767b165bdf5fdbcd0f85&chksm=0fa8a08838df299e78864a508d7d608b507ef2d7345d3f56b423b43adbdf476ddecd9b46bdcc#rd';

    var RULE_URL = 'https://mp.weixin.qq.com/s?__biz=MzIxNDE4NTQ4MA==&mid=502752400&idx=1&sn=47112497705e7d28907bc8fe616ee2b4&chksm=0fa8a7f738df2ee1a07cd6ad73f4c4a7bba6eab5e4523d1c5f07443a3db97e0e1e4bcf739189#rd';
    var EXPLAIN_URL = 'https://mp.weixin.qq.com/s?__biz=MzIxNDE4NTQ4MA==&mid=502752402&idx=1&sn=4516cdc3bf74d6d5ace6ac4ac3c74a9c&chksm=0fa8a7f538df2ee379d66b75db5ee588fe38cfac1eac612702c7f3180259e3e600b6e560fdca#rd';
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
        compensationMoney = sessionStorage.compensationMoney == 'undefined' ? '0' : sessionStorage.compensationMoney;
    

    sessionStorage.adPop = 'true' ; //拆红包前广告展示
    // var dayScanNum = sessionStorage.dayScanNum;

    // 用户当天所有活动扫码次数
	var scanLadderFlag = sessionStorage.scanLadderFlag == undefined ? '' : sessionStorage.scanLadderFlag;
	// 用户当前活动当天扫码次数
	var dayScanNum = sessionStorage.dayScanNum == undefined ? '3' : sessionStorage.dayScanNum;
	// 用户当前活动累计扫码次数
	var userActivityDayScanNum = sessionStorage.userActivityDayScanNum == undefined ? '' : sessionStorage.userActivityDayScanNum;
	
	// 用户扫码捆绑产品数量
	var scanLadderNum = sessionStorage.scanLadderNum == undefined ? '' : sessionStorage.scanLadderNum;

    // 补偿道歉信
    if (compensationMoney != undefined && compensationMoney != 'undefined' && compensationMoney != '0') {
        $('.apologizeClose').on('click', function () {
            $('.apologize').css('display', 'none');
        });
        $('.compensationMoney').text(compensationMoney);
        $('.apologize').css('display', 'block');
    } else {
        $('.apologize').css('display', 'none');
    }

    if (codeContentUrl == 'undefined' || codeContentUrl == '') {
        $('.toast').css('display', 'none');
    } else {
        $('.toast').attr('src', codeContentUrl);
    }

    (function () {
        if (Number(currentMoney) == 0) { //中奖金额为0
            $('.congratulate').html('离红包只差一点点<br>再扫一瓶试试');
            $('.congratulate').css({
                'margin': '1rem auto 0',
                'fontSize': '0.9rem'
            });
            $('.prize').css('display', 'none');
        } else {
			if (sessionStorage.perMantissaPrize) { //逢19开启
				if (JSON.parse(sessionStorage.perMantissaPrize).perMantissaPrizeFlag == 1 && bizcode != 21) { //逢19红包
					$('.fyj').text('大红包');
					// $('.yjrtip').html('本月“要酒日”扫到第' + JSON.parse(sessionStorage.perMantissaPrize).perMantissaNum + '支');
					$('.yjrtip').html('本日扫到重庆第' + JSON.parse(sessionStorage.perMantissaPrize).perMantissaNum + '支');
				} else {
					// $('.congratulate').html('恭喜客官本月“要酒日”<br />扫到第' + JSON.parse(sessionStorage.perMantissaPrize).perMantissaNum +
					// 	'支');
					$('.congratulate').html('恭喜客官本日<br />扫到重庆第' + JSON.parse(sessionStorage.perMantissaPrize).perMantissaNum +
						'支');
					$('.congratulate').css({
						'fontSize': '0.6rem'
					});
				}
			
			}
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


            // alert('scanLadderFlag' + scanLadderFlag)
            // alert('scanLadderNum' + scanLadderNum)
           // scanLadderFlag = 0; //默认关闭
           if (scanLadderFlag == '1') { // userActivityDayScanNum
               switch (scanLadderNum) {
                   case '1':
                       $('.ladder-1').text('健康步步高红包');
                       $('.ladder-2').text('下个红包会更高');
                       $('.ladder-3').text('');
                       break;
                   case '2':
                        $('.ladder-1').text('事业步步高红包');
                        $('.ladder-2').text('下个红包会更高');
                        $('.ladder-3').text('');
                       break;
                   case '3':
                        $('.ladder-1').text('爱情步步高红包');
                        $('.ladder-2').text('下个红包会更高');
                        $('.ladder-3').text('');
                       break;
                   case '4':
                        $('.ladder-1').text('友情步步高红包');
                        $('.ladder-2').text('下个红包会更高');
                        $('.ladder-3').text('');
                       break;
                   case '5':
                        $('.ladder-1').text('财气步步高红包');
                        $('.ladder-2').text('下个红包会更高');
                        $('.ladder-3').text('');
                       break;
                   case '6':
                       $('.ladder-1').text('运气步步高红包');
                       $('.ladder-2').text('下个红包会更高');
                       $('.ladder-3').text('');
                       break;					
                   case '7':
                        $('.ladder-1').text('福气步步高红包');
                        $('.ladder-2').text('');
                        $('.ladder-3').text('');
                       break;
                   default:
                       $('.ladder-1').text('');
                       $('.ladder-2').text('');
                       $('.ladder-3').text('');
                       break;
               }
           } else {
               $('.ladder-1').text('');
               $('.ladder-2').text('');
               $('.ladder-3').text('');
           }
        }
    })();
	
	// 跑马灯动画
	function pmdAnm() {
		var pList = JSON.parse(sessionStorage.perMantissaPrize).perMantissaEarnUser;
		if (pList == undefined || pList.length < 1) {
			return false;
		} else {
			for (var i = 0; i < pList.length; i++) {
				var nickName = pList[i].nickName === undefined ? '...' : pList[i].nickName;
				if (pList[i].earnMoney) {
					$('.pmd').append('<p>恭喜“' + nickName + '”扫到第' + pList[i].prizeScanNum + '支，中得' + pList[i].earnMoney +
						'元大红包</p>');
				} else if (pList[i].prizeName) {
					$('.pmd').append('<p>恭喜“' + nickName + '”扫到第' + pList[i].prizeScanNum + '支，中得“' + pList[i].prizeName +
						'”礼盒一份</p>');
				}
			}
		}
		var pmdw = 0;
		$('.pmd p').each(function() {
			pmdw += $(this).innerWidth();
		});
		$('.pmd').css('width', pmdw + 10 + 'px');
		if ($('.pmd p').size() > 1) {
			$('.pmd').css({
				'transition': 'all linear ' + ($('.pmd p').size() + 1) * 3 + 's',
				'left': -pmdw - 10 + 'px'
			});
			$('.pmd').on('transitionend', function() {
				$('.pmd').css({
					'transition': 'none',
					'left': '0'
				});
				var setTimer = setTimeout(function() {
					$('.pmd').css({
						'transition': 'all linear ' + $('.pmd p').size() * 3 + 's',
						'left': -pmdw - 10 + 'px'
					});
				}, 100)
				setTimer = null;
			});
		} else {
			$('.pmd').css({
				'transition': 'all linear ' + '5s',
				'left': -pmdw + 'px'
			});
			$('.pmd').on('transitionend', function() {
				$('.pmd').css({
					'transition': 'none',
					'left': '100%'
				});
				var setTimer = setTimeout(function() {
					$('.pmd').css({
						'transition': 'all linear ' + '5s',
						'left': -pmdw + 'px'
					});
				}, 100);
				setTimer = null;
			});
		}
    }

    // 2020 5.1 劳动节弹框
    if (new Date().getTime() >= new Date(2020, 3, 30) && new Date().getTime() < new Date(2020, 4, 6) && sessionStorage.dayScanNum < 3  && sessionStorage.skukey == '201609141-003' && sessionStorage.adPop == 'true') { //2020年4月30日-5月5日 每日两次
        setTimeout(function() {
            $('.active').css('display', 'block');
            $('.activeClose').on('click', function (event) {
                event.stopPropagation();
                $('.active').css('display', 'none');
            });
            sessionStorage.adPop = 'false';  // 已经展示广告
        }, 600);
    } else {
        sessionStorage.adPop = 'false'; // 已经展示过广告
    } 
	
    //拆红包
    $('.hbGet,.open').on('touchstart', function () {
        if(sessionStorage.adPop == 'true'){ //没显广告 不可拆红包
            return false;
        }
        $('.open').addClass('kai');
        sessionStorage.again = 'true';
        setTimeout(function () {
            $('.get').fadeOut(600);
            $('.cash').fadeIn(600, function () {
                events();
                // 广告
                if (sessionStorage.perMantissaPrize) { //逢19开启
                    pmdAnm();
                }
                // 春节
                // if (new Date().getTime() > new Date(2020, 0, 15) && new Date().getTime() < new Date(2020, 0, 31) && sessionStorage.dayScanNum < 3) { //2020.1.16~1.30 每日两次
                //     setTimeout(function() {
                //         $('.active').css('display', 'block');
                //         $('.activeClose').on('click', function (event) {
                //             event.stopPropagation();
                //             $('.active').css('display', 'none');
                //         });
                //     }, 800);
                // } 

                // 联通流量链接
                //              $('.ad').css('display', 'block');
                //              $('.adClose').on('click', function (event) {
                //                  $('.ad').css('display', 'none');
                //                  event.stopPropagation();
                //              });
                //              $('.adCover').on('click', function (event) {
                //                  window.location.href = 'https://m.10010.com/queen/qingdaobeer/qdbeer.html';
                //                  event.stopPropagation();
                //              });

                // var now = new Date().getTime();
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
        // $('.game2').on('click', function() {
        //     location.href = 'http://' + location.host + '/v/fjqp/game/index.html';
        // });
    }

    /* 提现 */
    function give_spack() {
        var javai = SPACK_PORT;
        var req = {
			"projectServerName": "chongqing",
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
        if (bizcode == 11 || again == 'true') {
            $('#btn-to-home').css('display', 'none');
            console.log($('#btn-to-home'));
        }
        $('#btn-to-home').click(function () {
            try {
                _hmt.push(['_trackEvent', 'click', '领取红包页', '点击送酒上门按钮-重庆']);
                setTimeout(function () {
                    window.location.href = 'http://h5.eqxiul.com/ls/9JzVydGY';
                }, 10);
            } catch (e) {

            }
        })
    }
})();