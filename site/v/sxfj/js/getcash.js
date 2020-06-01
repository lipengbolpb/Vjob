(function() {
	ini_wxshare(vge.sxfjappid);
	var timer = null,
		timer2 = null,
		repflag=true,//音频监听标志
		s = 0;
	var myaudio = document.getElementById("audio");

	var time = 12,//音频时长
		audioSrc = '',
		poetryList = 4,//词条条数
		i = 0,
		hei = '',//词条最大长度
		hei2 = '';//印章高度
	

	var poetryArr = [10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 8, 3, 4, 10],
		poeIndex = Math.floor(Math.random() * 20);

	poeIndex = sessionStorage.loop === undefined?poeIndex:Number(sessionStorage.loop);
	var openid = sessionStorage.openid === undefined ? '' : sessionStorage.openid,
		args = vge.urlparse(location.href),
		hbopenid = args.openid,
		bizcode = args.bizcode,
		currentMoney = sessionStorage.currentMoney === undefined ? '' : sessionStorage.currentMoney,
		totalAccountMoney = sessionStorage.totalAccountMoney === undefined ? '' : sessionStorage.totalAccountMoney;
	
	bizcode = sessionStorage.bizcode===undefined?bizcode:sessionStorage.bizcode;
	if(bizcode==11){
		location.replace(`http://${location.host}/sxfj/txo/repcash?bizcode=11`);
	}
	
	if(Number(currentMoney)==0){
		$('p.money').html('<span>您离红包只差一点点~</span>');
		$('p.money').css('font-size','1rem');
	}else{
		$('p.money span').html(currentMoney);
	}
	
	if(totalAccountMoney < 1) {
		$('#btn').css({
			'background-image': 'url(/v/sxfj/img/button_2.png)',
			'-webkit-background-size': 'auto 100%;'
		});
	} else {
		$('p.tip').html(`您的红包累计金额为${totalAccountMoney}元,已经大于1元了,点击上方“立即提现”按钮把钱拿走吧`);
	}
	audioReq(poetryArr[poeIndex] + '');

	function audioReq(cs) { //音频和文字
		audioSrc = `http://img.vjifen.com:8000/images/fenjiu/poetry_${cs}.mp3`;
		switch(cs) {
			case '1':
				time = 12;
				hei = '9.4rem';
				hei2 = '8.65rem';
				break;
			case '2':
				time = 15;
				hei = '6.85rem';
				hei2 = '7.55rem';
				break;
			case '3':
				time = 10;
				hei = '4.2rem';
				hei2 = '5.35rem';
				break;
			case '4':
				time = 11;
				hei = '9.4rem';
				hei2 = '5.75rem';
				break;
			case '5':
				time = 8;
				poetryList = 2;
				hei = '7.25rem';
				hei2 = '8.4rem';
				break;
			case '6':
				time = 11;
				poetryList = 3;
				hei = '7.8rem';
				hei2 = '8.4rem';
				break;
			case '7':
				time = 11;
				hei = '5.3rem';
				hei2 = '5.25rem';
				break;
			case '8':
				time = 11;
				poetryList = 2;
				hei = '7.3rem';
				hei2 = '8.45rem';
				break;
			case '9':
				time = 9;
				hei = '5.3rem';
				hei2 = '5.9rem';
				break;
			case '10':
				time = 10;
				hei = '8.5rem';
				hei2 = '5.9rem';
				break;
			default:
				time = 12;
				hei = '9.4rem';
				hei2 = '8.65rem';
				cs = 1;
				audioSrc = `http://img.vjifen.com:8000/images/fenjiu/poetry_1.mp3`;
				break;
		}
		var html = '';

		for(var k = 1; k < poetryList + 1; k++) {
			html += `<li><img src="/v/sxfj/img/poetry_${cs}_${k}.png"/></li>`;
		}
		$('img.poetry').attr('src', `/v/sxfj/img/poetry_${cs}.png`);
		$('div.yy span').html(time + '秒');
		$('.poetry_box').append(html);
		wx.ready(function() {
			document.getElementById('audio').setAttribute('src', audioSrc);
			document.getElementById('audio').load();
			document.getElementById('audio').play();
			myaudio.addEventListener("timeupdate", timeupdate, false);

			function timeupdate() {
				if(myaudio.currentTime !== 0&&repflag) {
					repflag = false;
					myaudio.removeEventListener("timeupdate", timeupdate, false);
					poetryAni(poetryList, Math.floor(time / poetryList * 1000), hei);
					aniload();
					timer2 = setTimeout(function() {
						$('img.jiu').css('top', hei2);
						$('img.jiu').fadeIn(400, function() {
							$('.cash_b').css({
								'visibility': 'visible',
								'-webkit-animation': 'cashrotate 1s linear both'
							});
						});
						clearTimeout(timer2);
					}, (time - 0.5) * 1000);
					return;
				}
			}
			
	    });

	}

	function poetryAni(list, duration, h) {
		if(i < list) {
			$('.poetry_box li').eq(i).animate({
				'height': h,
				'opacity': 1
			}, duration, 'linear', function() {
				poetryAni(list, duration, hei);
			});
		} else {
			return;
		}
		++i;
	}

	function aniload() {
		clearInterval(timer);
		timer = setInterval(function() {
			if(s % 4 === 0) {
				$('#bird').attr('src', '/v/sxfj/img/bird_1.png');
			} else if(s % 4 === 2) {
				$('#bird').attr('src', '/v/sxfj/img/bird_2.png');
			}
			if(s % 3 === 0) {
				$('.yy img').attr('src', '/v/sxfj/img/icon_yy_1.png');
			} else if(s % 3 === 1) {
				$('.yy img').attr('src', '/v/sxfj/img/icon_yy_2.png');
			} else {
				$('.yy img').attr('src', '/v/sxfj/img/icon_yy_3.png');
			}
			if(s > (time + 3) * 2.5) {
				myaudio.pause();
				clearInterval(timer);
				$('.yy img').attr('src', '/v/sxfj/img/icon_yy_3.png');
				$('#ani').fadeOut();
				$('#box').fadeIn();
			}
			s++;
		}, 400);
		$('#bird').animate({
			'left': '-35%',
			'top': '6rem'
		}, 5000, 'linear');
	}

	$('#btn').on('click', function() {
		if(totalAccountMoney < 1) {
			ifremeber();
		} else {
			$('#btn').unbind();
			$('#btn').css({
				'background-image': 'none',
				'-webkit-background-size': 'auto 100%;'
			});
			$('#btn').html('<img src="/v/sxfj/img/loading.gif"/>');
			give_spack();
		}
	});

	function give_spack() { //提现
		var javai = vge.sxfj + '/DBTSXFJInterface/gifts/getGiftspack';
		var req = {
			"openid": openid,
			"hbopenid": hbopenid
		};
		vge.callJApi(javai, req,
			function(jo) {
				$('#btn').css({
					'background-image': 'url(/v/sxfj/img/button_1.png)',
					'-webkit-background-size': 'auto 100%;'
				});
				$('#btn').html('');
				$('#btn').on('click', function() {
					if(totalAccountMoney < 1) {
						ifremeber();
					} else {
						$('#btn').unbind();
						$('#btn').css({
							'background-image': 'none',
							'-webkit-background-size': 'auto 100%;'
						});
						$('#btn').html('<img src="/v/sxfj/img/loading.gif"/>');
						give_spack();
					}
				});
				if(jo.result.code == '0') {
					if(jo.result.businessCode === '0') {
						$('#btn').css({
							'background-image': 'url(/v/sxfj/img/button_2.png)',
							'-webkit-background-size': 'auto 100%;'
						});
						$('#tx_tip').css('display','block');
						$('.content').css('display','none');
						sessionStorage.totalAccountMoney = 0;
					} else if(jo.result.businessCode === '1') { //1
						title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
					} else if(jo.result.businessCode === '2') { //1
						title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
					} else if(jo.result.businessCode === '4') { //1
						title_tip('提现处理中，请稍后查看详细记录', '我知道了');
					} else if(jo.result.businessCode === '-2') { //-2
						title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
					} else if(jo.result.businessCode === '3') { //1
						title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
					} else if(jo.result.businessCode === '-1') { //-1
						title_tip('提 示', '系统升级中...', '我知道了');
					} else {
						title_tip('尊敬的用户', jo.result.msg, '我知道了');
					}
				} else if(jo.result.code == '-1') {
					title_tip('尊敬的用户', '系统升级中...', '我知道了');
				} else { //code!='0'
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				}
			});
	}

	function ifremeber() {
		var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.sxfjappid;
		vge.ajxget(requrl, 5000, function(r) {
			try {
				var o = JSON.parse(r);
				if(o.subscribe == '0') { //未关注
					window.location.replace('http://' + location.host + '/v/sxfj/attention.html');
				} else { //已关注用户
					window.location.replace('http://' + location.host + '/sxfj/too/mybag');
				}
			} catch(e) {
				vge.clog('errmsg', [requrl, e]);
			}
		}, function(err) {
			vge.clog('errmsg', [requrl, err]);
		});
	}

	$('#tx_tip').on('click', function() {
		$('#tx_tip').css('display','none');
		$('.content').css('display','block');
		ifremeber();
	});

	$('.cash_b').on('animationstart', function() {
		$('#ani').delay(500).fadeOut(1000);
		$('#box').delay(500).fadeIn(1000,function(){
			sessionStorage.bizcode=11;
		});
	});
	$('#jump').on('click', function() {
		myaudio.pause();
		clearInterval(timer);
		$('.yy img').attr('src', '/v/sxfj/img/icon_yy_3.png');
		$('#ani').fadeOut();
		$('#box').fadeIn();
		sessionStorage.bizcode=11;
	});
	$('#loop').on('click',function(){
		sessionStorage.loop = poeIndex;
		sessionStorage.removeItem('bizcode');
		location.reload();
	})
	$('#rule').on('click',function(){
		location.href = 'https://mp.weixin.qq.com/s?__biz=MzA3NzQzNzEwMw==&mid=510134002&idx=1&sn=ed9c5bfefa62b38973c92ed525fe3394&chksm=04cea73233b92e24f2b669c3b30712d5d495f621bfe5a73cce19a3a63a5504be32595fae1ca5#rd';
	});
	$('#private').on('click',function(){
		location.href = 'https://mp.weixin.qq.com/s?__biz=MzA3NzQzNzEwMw==&mid=510134001&idx=1&sn=fdceb4d68cd701942ffc3dd14916af4c&chksm=04cea73133b92e27ce6c210a2d6d0f0d9163261832ce9d05036d42181e9f5b2576cbc4494e22#rd';
	});
})();