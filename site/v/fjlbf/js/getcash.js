(function() {
	ini_wxshare(vge.fjlbfappid);
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
		bizcode = args.bizcode,
		currentMoney = sessionStorage.currentMoney === 'undefined' ? '0' : sessionStorage.currentMoney,
		totalAccountMoney = sessionStorage.totalAccountMoney === 'undefined' ? '0' : sessionStorage.totalAccountMoney;
	
	bizcode = sessionStorage.bizcode===undefined?bizcode:sessionStorage.bizcode;
	if(bizcode==11){
		location.replace(`http://${location.host}/fjlbf/txo/repcash?bizcode=11`);
	}
	
	$('p.money span').html(currentMoney);
	if(totalAccountMoney < 1) {
		$('#btn').css({
			'background-image': 'url(/v/fjlbf/img/button_2.png)',
			'-webkit-background-size': 'auto 100%;'
		});
	} else {
		$('p.tip').html(`您的红包累计金额为${totalAccountMoney}元,已经大于1元了,点击上方“立即提现”按钮把钱拿走吧`);
	}
	if(bizcode==0){
		if(Number(sessionStorage.dayScanNum)%2==0){
			$('.activeImg').attr('src','/v/fjlbf/img/nCov-2019-2.jpg?v=1')
		}
		$('.active').css('display','flex');
		$('.active .activeClose,.active .closeTip').on('click',function(e){
			e.stopPropagation();
			$('.active').css('display','none');
			audioReq(poetryArr[poeIndex] + '');
		})
		// setTimeout(function(){//千遍万编不好用 非得试试自动关闭?
		// 	$('.active').css('display','none');
		// 	audioReq(poetryArr[poeIndex] + '');
		// },3000)
	}
	// audioReq(poetryArr[poeIndex] + '');

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
			html += `<li><img src="/v/fjlbf/img/poetry_${cs}_${k}.png"/></li>`;
		}
		$('img.poetry').attr('src', `/v/fjlbf/img/poetry_${cs}.png`);
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
				$('#bird').attr('src', '/v/fjlbf/img/bird_1.png');
			} else if(s % 4 === 2) {
				$('#bird').attr('src', '/v/fjlbf/img/bird_2.png');
			}
			if(s % 3 === 0) {
				$('.yy img').attr('src', '/v/fjlbf/img/icon_yy_1.png');
			} else if(s % 3 === 1) {
				$('.yy img').attr('src', '/v/fjlbf/img/icon_yy_2.png');
			} else {
				$('.yy img').attr('src', '/v/fjlbf/img/icon_yy_3.png');
			}
			if(s > (time + 3) * 2.5) {
				myaudio.pause();
				clearInterval(timer);
				$('.yy img').attr('src', '/v/fjlbf/img/icon_yy_3.png');
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
			vge.clog('汾酒老白汾', ['vjf-h5-log',transTime(),openid,'汾酒老白汾',location.href.split('?')[0],'提现','点击去提现']);
			window.location.replace('http://' + location.host + '/fjlbf/txo/mybag');
		}
		
	});
	function transTime(){
    	var now = new Date();
    	var mon = now.getMonth()+1<10?'0'+(now.getMonth()+1):now.getMonth()+1,
    		day = now.getDate()<10?'0'+now.getDate():now.getDate(),
    		h = now.getHours()<10?'0'+now.getHours():now.getHours(),
    		m = now.getMinutes()<10?'0'+now.getMinutes():now.getMinutes(),
    		s = now.getSeconds()<10?'0'+now.getSeconds():now.getSeconds();
    	return now.getFullYear()+'-'+mon+'-'+day+'T'+h+":"+m+':'+s;
    }

	function ifremeber() {
		var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.fjlbfappid;
		vge.ajxget(requrl, 5000, function(r) {
			try {
				var o = JSON.parse(r);
				if(o.subscribe == '0') { //未关注
					window.location.replace('http://' + location.host + '/v/fjlbf/attention.html');
				} else { //已关注用户
					window.location.replace('http://' + location.host + '/fjlbf/txo/mybag');
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
			if(!sessionStorage.loop && Date.parse(new Date())>new Date(2019,11,1).getTime()){
				$('.expire_tip').css('display','flex')
			}
		});
	});
	$('.expire_tip img').on('click',function(){
		$('.expire_tip').css('display','none')
	})
	$('#jump').on('click', function() {
		myaudio.pause();
		clearInterval(timer);
		$('.yy img').attr('src', '/v/fjlbf/img/icon_yy_3.png');
		$('#ani').fadeOut();
		$('#box').fadeIn();
		sessionStorage.bizcode=11;
		if(!sessionStorage.loop && Date.parse(new Date())>new Date(2019,11,1).getTime()){
			$('.expire_tip').css('display','flex')
		}
	});
	$('#loop').on('click',function(){
		sessionStorage.loop = poeIndex;
		sessionStorage.removeItem('bizcode');
		location.reload();
	})
	$('#rule').on('click',function(){
		window.location.href = 'https://mp.weixin.qq.com/s?__biz=MzUzODg0MzU4NQ==&mid=100000799&idx=1&sn=ba6795f5e0588fbac0a055a5ff67c705&chksm=7ad0c4b14da74da7707a7ac17bd7dd4a3731270992180077a8ca695ea8243e8d116595dba1f8#rd';
	});
	$('#private').on('click',function(){
		window.location.href = 'https://mp.weixin.qq.com/s?__biz=MzUzODg0MzU4NQ==&mid=100000800&idx=1&sn=651b5b492418f9d79c32e6c193f1f855&chksm=7ad0c48e4da74d98bdc416ad84bbff16a513d1e93039940ea7193f253aedd6b2b80311c214ac#rd';
	});
})();