var info = {
	URL_POST: vge.hbqp + '/DBTHBQPInterface/vpoints/seckill/sweepQrcode',
	openid: sessionStorage.openid
}
var luck = {
	index: 0, //当前转动到哪个位置，起点位置
	count: 0, //总共有多少个位置
	timer: 0, //setTimeout的ID，用clearTimeout清除
	speed: 20, //初始转动速度
	times: 0, //转动次数
	cycle: 50, //转动基本次数：即至少需要转动多少次再进入抽奖环节
	prize: -1, //中奖位置
	init: function(id) {
		if ($("#" + id).find(".border").length > 0) {
			$luck = $("#" + id);
			$units = $luck.find(".border");
			this.obj = $luck;
			this.count = $units.length;
			$luck.find(".border-" + this.index).addClass("active"); //初始化，第index个为起点
		};
	},
	roll: function() {
		var index = this.index;
		var count = this.count;
		var luck = this.obj;
		$(luck).find(".border-" + index).removeClass("active");
		index += 1;
		if (index > count - 1) {
			index = 0;
		};
		$(luck).find(".border-" + index).addClass("active");
		this.index = index;
		return false;
	},
	stop: function(index) {
		this.prize = index;
		return false;
	}
};

var click = true;
window.onload = function() {
	luck.init('luck');
	document.getElementsByClassName('btn')[0].addEventListener('click', clickEv, false);
	function clickEv() {
		document.getElementsByClassName('btn')[0].removeEventListener('click', clickEv);
		loading('');
		luck.speed = 100;
		$('.result').attr('src', '');
		var data = {
			"openid": info.openid,
			"sweepstr": sessionStorage.qr,
			"longitude": sessionStorage.longitude, //经度
			"latitude": sessionStorage.latitude //纬度
		};
		$.ajax({
			type: "POST",
			url: info.URL_POST,
			data: JSON.stringify(data),
			dataType: 'json',
			success: function(res, status, xhr) {
				console.log(res);
				loaded();
				if (res.result.code == '0') {
					if (res.result.businessCode == '0') {
						var end = null;
						var imgEnd = null;
						sessionStorage.exchangeId = res.reply.exchangeId; //兑换记录主键
						//M01 喝两瓶青岛啤酒赠送1瓶 
						//M02 青岛啤酒2瓶 
						//M03 足球 
						//M04 青岛啤酒1903/2 
						//M05 青岛啤酒鲜啤1L 
						//M06 打火机 
						//M07 青岛啤酒纯生2瓶 
						//M08 开瓶器 
						//M09 青岛啤酒白啤2瓶
						switch (res.reply.prizeType) {
							case 'M01': //喝两瓶青岛啤酒赠送1瓶
								if (parseInt(10 * Math.random()) <= 4) {
									end = 0;
									imgEnd = 1;
								} else {
									end = 5;
									imgEnd = 10;
								}
								$('.line1').html('恭喜你抽中<span id="prize">喝两瓶青岛啤酒赠送1瓶</span>');
								break;
							case 'M02': //青岛啤酒2瓶
								end = 1;
								imgEnd = 2;
								$('.line1').html('恭喜你抽中<span id="prize">青岛啤酒2瓶</span>');
								break;
							case 'M03': //足球
								end = 3;
								imgEnd = 3;
								$('.line1').html('恭喜你抽中<span id="prize">足球</span>');
								break;
							case 'M04': //青岛啤酒1903/2 
								end = 2;
								imgEnd = 4;
								$('.line1').html('恭喜你抽中<span id="prize">青岛啤酒1903 2瓶</span>');
								break;
							case 'M05': //青岛啤酒鲜啤1L 
								end = 9;
								imgEnd = 5;
								$('.line1').html('恭喜你抽中<span id="prize">青岛啤酒鲜啤1L</span>');
								break;
							case 'M06': //打火机
								end = 8;
								imgEnd = 6;
								$('.line1').html('恭喜你抽中<span id="prize">打火机</span>');
								break;
							case 'M07': //青岛啤酒纯生2瓶
								end = 6;
								imgEnd = 7;
								$('.line1').html('恭喜你抽中<span id="prize">青岛啤酒纯生2瓶</span>');
								break;
							case 'M08': //开瓶器
								end = 7;
								imgEnd = 8;
								$('.line1').html('恭喜你抽中<span id="prize">开瓶器</span>');
								break;
							case 'M09': //青岛啤酒白啤2瓶
								end = 4;
								imgEnd = 9;
								$('.line1').html('恭喜你抽中<span id="prize">青岛啤酒白啤2瓶</span>');
								break;
							default:
								if (parseInt(10 * Math.random()) <= 4) {
									end = 0;
									imgEnd = 1;
								} else {
									end = 5;
									imgEnd = 10;
								}
								$('.line1').html('恭喜你抽中<span id="prize">喝两瓶青岛啤酒赠送1瓶</span>');
						}
						roll();

						function roll() {
							$('.window').css('display', 'none');
							if (end == 100) {
								return title_tip('尊敬的用户', res.result.msg, '我知道了');
							}
							luck.times += 1;
							luck.roll();
							if (luck.times > luck.cycle + 10 && luck.prize == luck.index) {
								clearTimeout(luck.timer);
								luck.prize = -1;
								luck.times = 0;
								$('.result').attr('src', '/v/hbqpMS/img/_0' + imgEnd + '.png?v=3');
								setTimeout(function() {
									$('.alert').css({
										"display": "flex",
										"display": "-webkit-flex"
									});
								}, 500);
							} else {
								if (luck.times < luck.cycle) {
									luck.speed -= 10;
								} else if (luck.times == luck.cycle) {
									// var index = Math.random() * (luck.count) | 0;
									luck.prize = end; //最终中奖位置
								} else {
									if (luck.times > luck.cycle + 10 && ((luck.prize == 0 && luck.index == 7) || luck.prize == luck.index +
											1)) {
										luck.speed += 110;
									} else {
										luck.speed += 20;
									}
								}
								if (luck.speed < 40) {
									luck.speed = 40;
								};
								luck.timer = setTimeout(roll, luck.speed);
							}
							return false;
						}
					} else if (res.result.businessCode == '620001') {
						title_tip('尊敬的用户', '本期活动奖品已经抢完了……下次记得早点哦~', '我知道了');
					} else if (res.result.businessCode == '620003') {
						title_tip('尊敬的用户', '哎呀呀~您优雅的错过了所有奖品', '我知道了');
					} else {
						title_tip('尊敬的用户', res.result.msg, '我知道了');
					}
				} else {
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				}
			},
			error: function(res, status, xhr) {
				console.log(res);
			}
		});
		return false;
	}
	
	function loading(txt) {
	    $('#loadingToast .weui_toast_content').html(txt);
	    $('#loadingToast').show();
	}
	
	function loaded() {
	    $('#loadingToast').hide();
	}
	
	function toast(txt) {
	    $('#toast .weui_toast_content').html(txt);
	    $('#toast').show();
	    setTimeout(function () {
	        $('#toast').hide();
	    }, 2000);
	}
};
