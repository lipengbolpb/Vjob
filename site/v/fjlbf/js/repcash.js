(function() {
	var timer = null,
		timer2 = null,
		s = 0;
	var myaudio = document.getElementById("audio");

	var time = 12,
		audioSrc = '',
		poetryList = 4,
		i = 0,
		hei = '',
		hei2 = '';

	var poetryArr = [10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 10, 3, 4, 10],
		poeIndex = Math.floor(Math.random() * 20);

	var openid = sessionStorage.openid === undefined ? '' : sessionStorage.openid,
		args = vge.urlparse(location.href),
		bizcode = args.bizcode,
		currentMoney = sessionStorage.currentMoney === 'undefined' ? '0' : sessionStorage.currentMoney,
		totalAccountMoney = sessionStorage.totalAccountMoney === 'undefined' ? '0' : sessionStorage.totalAccountMoney;

	audioReq(poetryArr[poeIndex] + '');

	if(totalAccountMoney>=1){
		$('#btn').css({
			'background-image': 'url(/v/fjlbf/img/button_6.png)',
			'-webkit-background-size': 'auto 100%;'
		});
		$('p.tip').html(`您已于${sessionStorage.earnTime}扫过这瓶酒，<br />并获得<span>¥${currentMoney}元</span>`);
//		$('p.tip').html(`您的红包累计金额为${totalAccountMoney}元,已经大于1元了,点击上方“立即提现”按钮把钱拿走吧`);
	}else{
		$('p.tip').html(`您已于${sessionStorage.earnTime}扫过这瓶酒，<br />并获得<span>¥${currentMoney}元</span>`);
	}
	
	

	function audioReq(cs) { //音频和文字
		$('img.poetry').attr('src', `/v/fjlbf/img/poetry_${cs}.png`);
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

	/*$('#tx_tip').on('click', function() {
		$('#tx_tip').css('display', 'none');
		$('.content').css('display','block');
		ifremeber();
	});*/
	
	$('#rule').on('click',function(){
		window.location.href = 'https://mp.weixin.qq.com/s?__biz=MzUzODg0MzU4NQ==&mid=100000799&idx=1&sn=ba6795f5e0588fbac0a055a5ff67c705&chksm=7ad0c4b14da74da7707a7ac17bd7dd4a3731270992180077a8ca695ea8243e8d116595dba1f8#rd';
	});
	$('#private').on('click',function(){
		window.location.href = 'https://mp.weixin.qq.com/s?__biz=MzUzODg0MzU4NQ==&mid=100000800&idx=1&sn=651b5b492418f9d79c32e6c193f1f855&chksm=7ad0c48e4da74d98bdc416ad84bbff16a513d1e93039940ea7193f253aedd6b2b80311c214ac#rd';
	});
	
})();