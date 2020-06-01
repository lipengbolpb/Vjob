'use strict';
(function(){
	
	var APPID = vge.sdqpappid;
	var PROJECT = 'sdqp-agt';
	var RULE_URL =
		'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503283203&idx=1&sn=a7d25ac9e37a51fb30c88cf677c1093b&chksm=071ddbb2306a52a47722849f0f9fd103603a2be296fc1b87203abde06dfd1c0b6b9437fc3f60#rd';
	/* 定义各项参数 */
	var currentMoney = sessionStorage.currentMoney,
		totalAccountMoney = sessionStorage.totalAccountMoney,
		codeContentUrl = sessionStorage.codeContentUrl == 'undefined' ? '' : sessionStorage.codeContentUrl,
		earnTime = sessionStorage.earnTime,
		openid = sessionStorage.openid,
		args = vge.urlparse(location.href),
		bizcode = args.bizcode,
		bizcode = sessionStorage.bizcode === undefined ? bizcode : sessionStorage.bizcode;
	var timer = null;
	// 首页动画
	$(document).ready(function(){
		if(bizcode==0){
			$('#get,#cash').css('visibility','visible');
			$('.light').addClass('ani');
			timer = setTimeout(function(){
				$('.index').fadeOut(300);
				$('.goldMedal_box').css('top','0');
				$('.goldMedal_box .goldMedal').css({'width':'15.3rem','top':'-0.4rem','left':'0'});
				$('.slogan').addClass('fly');
				sessionStorage.bizcode='11';
			},2000);
			$('#get .goldMedal,#get .slogan,.light').on('click',function(){
				clearTimeout(timer);
				$('.index').fadeOut(300);
				$('.goldMedal_box').css('top','0');
				$('.goldMedal_box .goldMedal').css({'width':'15.3rem','top':'-0.4rem','left':'0'});
				$('.slogan').addClass('fly');
				sessionStorage.bizcode='11';
			});
			$('.slogan').on('animationend',function(){
				$('#get').fadeOut(1);
				$('#cash .goldMedal').addClass('ani');
				$('#cash .goldMedal_cash').addClass('ani');
			});
			$('#cash .goldMedal_cash').on('animationend',function(){
				$('.hide').css('opacity',1);
				$('.money_vis').css('height','5rem');
				if(new Date().getTime()<new Date(2019,5,10).getTime()&&Number(sessionStorage.dayScanNum)<3){
					setTimeout(function(){
						$('.active').css('display','block');
						$('.activeClose').on('click',function(e){
							e.stopPropagation();
							$('.active').css('display','none');
						});
					},1000);
				};

				// 2s弹出酒王之旅
				// setTimeout(function () {
				// 	$(".travelMask").fadeIn(1000);
				// 	$(".wineTravel").fadeIn(1000);
				// }, 900);
				
				// 2s弹出城市酒王排行
				setTimeout(function () {
					$('div.alert_jw').css('display','block');
				}, 900);
				//淘彩蛋
				if(Date.parse(new Date())<Date.parse(new Date(2020,0,10))){//十号之前
					setTimeout(function(){
						$('.taocd').fadeIn(1);
					},2000);
					$('.close_cd').on('click',function(){
						$('.taocd').fadeOut(1);
					})
					$('.caidan').on('click',function(){
						var clipboard = new ClipboardJS('.caidan');
						clipboard.on('success', function(e) {
						    console.log(e);
							title_tip('提 示', '复制口令成功！', '我知道了');
						});
						clipboard.on('error', function(e) {
						    console.log(e);
						});
					});
				}
				
			});
			// if(totalAccountMoney<1){
			// 	$('.tip').html('红包累计大于等于1元后可提现<br />不足1元的红包将存入零钱包');
			// }else{
			// 	$('.tip').html('您的红包余额为'+totalAccountMoney+'元，<br />点击上方按钮去提现吧');
			// }
		}else{//重复扫码
			//先取消金牌动画
			$('#cash').css('visibility','visible');
			$('.hide').css({'transition':'none','opacity':1});
			$('.money_vis').css({'transition':'none','height':'5rem'});
			$('#cash .goldMedal').css({'transform':'rotateY(180deg)','opacity':0});
			$('#cash .goldMedal_cash').css({'transform':'rotateY(0deg)','opacity':1});
			$('.title').html('');
			$('.money').html('<span>您已扫过</span>');
			$('.money span').css({'fontSize':'1.5rem','lineHeight':'4rem'});
			$('.tip').html('您已于'+sessionStorage.earnTime+'扫过这瓶酒<br />并获得'+currentMoney+'元');
		}
		
	});
	if(currentMoney==0){
		$('.title').html('您不在活动区域内<br />仅限山东省哦~').css('marginTop','1rem');
	}else{
		$('.money').html('<span>'+currentMoney+'</span>元');
	}
	// $('.totalMoney').text('您的账户余额' + totalAccountMoney + '元');

	if(totalAccountMoney<1){
		$('.hide.btn').css({'background-image':'url(/v/sdqp-agt/img/button_2.png?v=1)'});
	}
	$('.btn').on('click',btnClick);
	
	//关闭城市酒王排行酒王弹窗
	$('div.alert_jw p').on('click',function(){
		$('div.alert_jw').css('display','none');
		$('.icon_jw').css('visibility','visible');
	});
	$('.icon_jw').on('click',function(){
		$('div.alert_jw').css('display','block');
		$('.icon_jw').css('visibility','hidden');
	});

   // 酒王之旅
	// $('.closeToast').on('click',function(){
	// 	$(".travelMask").fadeOut(600);
	// 	$(".wineTravel").fadeOut(600);
	// });
	// $('.traEntry').on('click',function(){
	// 	$(".travelMask").fadeIn(600);
	// 	$(".wineTravel").fadeIn(600);
	// })
	
	// $('.travelBtn').on('click', function() {
	// 	window.location.href = 'http://' + location.host + '/v/sdqp/load.html?openid='+ openid;
	// });
	
	function btnClick(){
		$('.btn').unbind();
		setTimeout(function(){
			$('.btn').on('click',btnClick);
		},1000);
		if(totalAccountMoney<1){   // too
			window.location.replace('http://' + location.host + '/' + PROJECT + '/txo/mybag');
		}else{
			ifremeber();
		}
	}
	$('.rule').on('click',function(){
		location.href = RULE_URL;
	})
	
	/* 判断关注 */
	function ifremeber() {
		var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + APPID;
		vge.ajxget(requrl, 5000, function(r) {
			try {
				var o = JSON.parse(r);
				if (o.subscribe == '0'||o.subscribe==undefined) { //未关注
					window.location.replace('http://' + location.host + '/v/' + PROJECT + '/attention.html');
				} else { //已关注用户  too  appid && appid2支付openid
					window.location.replace('http://' + location.host + '/' + PROJECT + '/txo/mybag');
				}
			} catch (e) {
				vge.clog('errmsg', [requrl, e]);
			}
		}, function(err) {
			vge.clog('errmsg', [requrl, err]);
		});
	}
	
})()