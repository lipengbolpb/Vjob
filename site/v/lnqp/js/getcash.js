(function () {
    'use strict';
    var SPACK_PORT = vge.lnqp + '/DBTLNQPInterface/gifts/getGiftspack';
    var APPID = vge.lnqpappid;
    var PROJECT = 'lnqp';
    var RULE_URL = 'https://mp.weixin.qq.com/s?__biz=MzA3MTA2MjM3Mw==&mid=503561262&idx=1&sn=c9c0c99d83b8c3a17b6f26e2cab2081f&chksm=04c45a2433b3d332bf8407c4484d29f84469534302437b372f1feb38f21f5f87371b1f8d4077#rd';
    var EXPLAIN_URL = 'https://mp.weixin.qq.com/s?__biz=MzA3MTA2MjM3Mw==&mid=503561265&idx=1&sn=efbb3c01840b14272311dadcc7dfb02c&chksm=04c45a3b33b3d32dd931d774c505e5595c4b293a63be8eba808b1f7b5ddcba8ebbd551a41788#rd';

    /* 定义各项参数 */
    var currentMoney = sessionStorage.currentMoney,
        totalAccountMoney = sessionStorage.totalAccountMoney,
        codeContentUrl = sessionStorage.codeContentUrl,
        earnTime = sessionStorage.earnTime,
        openid = sessionStorage.openid,
        args = vge.urlparse(location.href),
        bizcode = args.bizcode,
        hbopenid = args.openid,
        disabled = true,
        first = sessionStorage.first === undefined ? true : sessionStorage.first,
		bizcode = sessionStorage.bizcode === undefined ? bizcode : sessionStorage.bizcode,
        activityVersion = sessionStorage.activityVersion === undefined ? '' : sessionStorage.activityVersion,
        tx = true,
        act = false,
        needAlert = false,
        skuType = sessionStorage.skuType === '0' ? '瓶' : '罐';

    $('.only').html('每' + skuType + '仅限扫码一次');
    $('.skutype').html(skuType);

    // if (new Date().getTime()<new Date(2019,6,20).getTime()) {//7.19 24点下线
	// 	// if(sessionStorage.city=='锦州市'){
	// 	// 	$('.activImg').attr('src','/v/lnqp/img/20190612_1.jpg?v=1');
	// 	// }
    //     $('.active').css('display', 'block');
    //     $('.activeClose').on('click', function (e) {
	// 		e.stopPropagation();
    //         $('.active').fadeOut();
    //     })
    // }

    if (new Date().getTime()<new Date(2019,7,20).getTime()) {//8.19 24点下线
        $('.active').css('display', 'block');
        $('.activeClose').on('click', function (e) {
			e.stopPropagation();
            $('.active').fadeOut();
        })
    }
   
   // 跑马灯动画
   function pmdAnm() {
	if(sessionStorage.perMantissaPrize==undefined){
		return false;
	}
   	var pList = JSON.parse(sessionStorage.perMantissaPrize).perMantissaEarnUser;
   	if (pList == undefined || pList.length < 1) {
   		return false;
   	} else {
   		for (var i = 0; i < pList.length; i++) {
   			var nickName = pList[i].nickName === undefined ? '...' : pList[i].nickName;
   			if (pList[i].earnMoney) {
   				$('.pmd').append('<p>恭喜“' + nickName + '”扫到第' + pList[i].prizeScanNum + '支，中得“要酒日”' + pList[i].earnMoney +
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

    ! function () { //页面初始化
        if (Number(currentMoney) == 0) { //中奖金额为0
            $('.congratulate').html('离红包只差一点点<br>再扫一' + skuType + '试试');
            $('.congratulate').css({
                'margin': '2rem auto 0',
                'fontSize': '1rem'
            });
            $('.prize').css('display', 'none');
        } else {
			if (sessionStorage.perMantissaPrize) { //逢19开启
				if (JSON.parse(sessionStorage.perMantissaPrize).perMantissaPrizeFlag == 1 && bizcode != 21) { //逢19红包
					$('.fyj').text('“要酒日”大红包');
					//$('.yjrtip').html('本月“要酒日”扫到第' + JSON.parse(sessionStorage.perMantissaPrize).perMantissaNum + '支');
				} else {//取消瓶数显示 20190716
					// $('.congratulate').html('恭喜客官本月“要酒日”<br />扫到第' + JSON.parse(sessionStorage.perMantissaPrize).perMantissaNum +
					// 	'支');
					// $('.congratulate').css({
					// 	'fontSize': '0.6rem'
					// });
				}
			
			}
			$('#money').html(currentMoney);
        }

        if (bizcode == 11) { //重复扫
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
                $('.earn').html('您已扫过这' + skuType + '酒<br>并获得<span class="earnMoney">¥' + currentMoney + '元</span>');
            } else {
                $('.earn').html('您已于<span class="earnTime">' + earnTime + '</span>扫过这' + skuType + '酒<br>并获得<span class="earnMoney">¥' + currentMoney + '元</span>');
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
    }();
	function transTime(){
		var now = new Date();
		var mon = now.getMonth()+1<10?'0'+(now.getMonth()+1):now.getMonth()+1,
			day = now.getDate()<10?'0'+now.getDate():now.getDate(),
			h = now.getHours()<10?'0'+now.getHours():now.getHours(),
			m = now.getMinutes()<10?'0'+now.getMinutes():now.getMinutes(),
			s = now.getSeconds()<10?'0'+now.getSeconds():now.getSeconds();
		return now.getFullYear()+'-'+mon+'-'+day+'T'+h+":"+m+':'+s;
	}
    //拆红包
    $('.hbGet,.open').on('touchstart', function () {
		vge.clog('辽宁扫码', ['vjf-h5-log',transTime(),openid,'辽宁青啤',location.href.split('?')[0],'拆红包','拆红包']);
        $('.open').addClass('kai');
        sessionStorage.bizcode = 11;
        setTimeout(function () {
            $('.get').fadeOut(600);
            $('.cash').fadeIn(600, function () {
				// pmdAnm();  //取消跑马灯 20190716
                if (bizcode == 21) {
                	setTimeout(function() {
                		$('.getPrize').css('display', 'block');
                		if (sessionStorage.grandPrizeType == 'p' || sessionStorage.grandPrizeType == 'P') {//青啤有一套
                            $('.getPrize .slogan').attr("src","/v/lnqp/img/prize-ship-slogan.png");
                            $('.getPrize .beer').attr("src","/v/lnqp/img/beer.png");
                        } 
                		$('.getPrize .ck').on('click', function() {
                			sessionStorage.again = true;
                			location.replace('http://' + location.host + '/v/lnqp/prize.html?bizcode=' + bizcode)
                		})
                		events();
                	}, 1000);
                } else {
                	events();
                }
            });
            // 联通流量弹出页
			// setTimeout(function(){
			// 	 // 联通流量链接
			// 	$('.liantong').css('display', 'block');
			// 	$('.adClose').on('click', function (event) {
			// 	    $('.liantong').css('display', 'none');
			// 	    event.stopPropagation();
			// 	});
			// 	$('.adCover').on('click', function (event) {
			// 	    window.location.href = 'https://m.10010.com/queen/qingdaobeer/qdbeer.html';
			// 	    event.stopPropagation();
			// 	});
			// },5000);
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
            ifremeber();
        });
        $('#btn,#repbtn').on('touchstart', function () {
            if (Number(totalAccountMoney) >= 1) {
				vge.clog('辽宁扫码', ['vjf-h5-log',transTime(),openid,'辽宁青啤',location.href.split('?')[0],'去提现','大于1元']);	
                if (tx) {
                    tx = false;
                    $('#loading').css('display', 'block');
                    give_spack();
                }
            } else {
				vge.clog('辽宁扫码', ['vjf-h5-log',transTime(),openid,'辽宁青啤',location.href.split('?')[0],'去提现','小于1元']);
                ifremeber();
            }
        });
    }

    /* 提现 */
    function give_spack() {
        var javai = SPACK_PORT;
        var req = {
            "openid": openid,
            "hbopenid": hbopenid
        };
        vge.callJApi(javai, req,
            function (jo) {
                $('.loading').css('display', 'none');
                if (jo.result.code == '0') {
                    if (jo.result.businessCode === '0') {
                        $('.mask').css('display', 'block');
                        tx = false;
                    } else if (jo.result.businessCode === '1') { //1
                        title_tip('提 示', '您的红包金额不足，再喝几' + skuType + '攒够1元发红包！', '我知道了');
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