(function() {
	var recordList = [],
		i = 0,
		currentPage = 1,
		count = 10,
		html = '';

	sessionStorage.removeItem('recordList');
	sessionStorage.removeItem('exchangeId');
	userInfo(currentPage);
	function userInfo(currentPage) { //获取商品数据
		var javai = vge.csqp + '/DBTHuNanQPInterface/vpoints/vpointsExchange/getExchangeRecord';
		var req = {
			"openid": sessionStorage.openid,
			"companyKey": sessionStorage.companyKey,
			"currentPage": currentPage,
			"count": 10
		};
		vge.callJApi(javai, req,
			function(jo) {
				if(jo.result.code == '0') {
					if(!jo.result.businessCode) {
						recordList = jo.reply;
						if(sessionStorage.recordList) {
							sessionStorage.recordList = JSON.stringify(JSON.parse(sessionStorage.recordList).concat(recordList));
						} else {
							sessionStorage.recordList = JSON.stringify(recordList);
						}
						recordShow(recordList);
					} else {
						title_tip('尊敬的用户', '拉取失败！', '我知道了');
					}
				} else if(jo.result.code == '-1') {
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				} else { //code!='0'
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				}
			});
	}

	function recordShow(recordList) {
		if(recordList.length < 1) {
			if(currentPage < 2) {
				$('#content').html('');
				html = '<img src="img/err.png" class="err"/>';
			} else {
				$('#content>p').remove();
				html = '<p>已经触及我的底线啦！~</p>';
			}
		} else {
			html = '';
			for(i = 0; i < recordList.length; i++) {
				if(recordList[i].exchangeType == '2'){
					recordList[i].exchangeMsg='兑换成功';
				}
				html += `<div class="list" exchangeId="${recordList[i].exchangeId}">
					<div class="date_box"><p>兑换时间：${recordList[i].exchangeTime}</p><span>${recordList[i].exchangeMsg}</span></div>
					<div class="goodsmsg">
						<img src="${vge.csqpimg}/DBTHuNanQPPlatform${recordList[i].goodsUrl.split(',')[0]}"/>
						<p class="exchangeid">订单号：${recordList[i].exchangeId}</p>
						<p class="name"><span>${recordList[i].goodsName}</span> <span><em>${recordList[i].exchangeVpoints}</em>积分</span></p>
					</div>
				</div>`;
			}
		}
		$('#content').append(html);
	}

	//获取滚动条当前的位置 
	function getScrollTop() {
		var scrollTop = 0;
		if(document.documentElement && document.documentElement.scrollTop) {
			scrollTop = document.getElementById('content').scrollTop;
		} else if(document.body) {
			scrollTop = document.getElementById('content').scrollTop;
		}
		return scrollTop;
	}

	//获取当前可视范围的高度 
	function getClientHeight() {
		var clientHeight = 0;
		if(document.body.clientHeight && document.documentElement.clientHeight) {
			clientHeight = Math.min(document.getElementById('content').clientHeight, document.getElementById('content').clientHeight);
		} else {
			clientHeight = Math.max(document.getElementById('content').clientHeight, document.getElementById('content').clientHeight);
		}
		return clientHeight;
	}

	//获取文档完整的高度 
	function getScrollHeight() {
		return Math.max(document.getElementById('content').scrollHeight, document.getElementById('content').scrollHeight);
	}

	//滚动事件触发
	document.getElementById('content').onscroll = function() {
		console.log(sessionStorage.exchangeId)
		if(sessionStorage.exchangeId){
			return false;
		}
		if(getScrollTop() + getClientHeight() == getScrollHeight()) {
			console.log('到底了');
			currentPage++
			userInfo(currentPage);
		}
	}
	$('#content').on('click', '.list', function() {
		sessionStorage.exchangeId = $(this).attr('exchangeId');
		$('#content').load('person.html #details', function() {
			var record = '',
				recordList = JSON.parse(sessionStorage.recordList),
				cur = 0,
				j = 0;
			for(j = 0; j < recordList.length; j++) {
				if(recordList[j].exchangeId == sessionStorage.exchangeId) {
					cur = j;
					record += `<div class="banner">
									<ul class="pic_box">
									</ul>
									<ul class="dot">
									</ul>
								</div>
								<p class="title"><span class="name">${recordList[j].goodsName}</span></p>
								<p class="price"><span class="price_1"><i>${recordList[j].exchangeVpoints}</i>积分</span><span class="price_2">市场价：¥${recordList[j].goodsMoney}</span></p>
								`;
					if(recordList[j].exchangeType == '2') {
						record += `
								<div class="record">
									<p class="re_address">兑换券码：<span>${recordList[j].exchangeMsg}</span></p>
									<p class="re_date">兑换日期：<span>${recordList[j].exchangeTime}</span></p>
									<p class="re_num">订单编号：<span>${recordList[j].exchangeId}</span></p>
								</div>`;
					} else if(recordList[j].exchangeType == '3') {
						record += `
								<div class="record">
									<p class="re_address">手机号：<span>${recordList[j].phoneNum}</span></p>
									<p class="re_date">兑换日期：<span>${recordList[j].exchangeTime}</span></p>
									<p class="re_num">订单编号：<span>${recordList[j].exchangeId}</span></p>
								</div>`;
					} else {
						record += `
								<div class="record">
									<p class="re_date">兑换日期：<span>${recordList[j].exchangeTime}</span></p>
									<p class="re_num">订单编号：<span>${recordList[j].exchangeId}</span></p>
									<p class="re_name">收货人：<span>${recordList[j].realName}</span></p>
									<p class="re_tel">收货电话：<span>${recordList[j].phoneNum}</span></p>
									<p class="re_address">收货地址：<span>${recordList[j].address}</span></p>
								</div>`;
					}
					record += `<div class="msg">
									${recordList[j].goodsContent}
								</div>`;
				}
			}
			$('#details').append(record);
			$('#content').append('<div class="btn_box"><input type="button" name="" id="btn" value="联系客服"/></div>');
			$('div.msg').find('*').attr('style', '');
			$('div.msg').find('b').attr('style', "font-weight: 400 !important;");
			record = '';
			var picUrl = recordList[cur].goodsUrl,
				picArr = [];
			if(picUrl[picUrl.length - 1] == ',') {
				picUrl = picUrl.substring(0, picUrl.length - 2);
			}
			picArr = picUrl.split(',');
			$('.pic_box').append(`<li><img src="${vge.csqpimg}/DBTHuNanQPPlatform${picArr[picArr.length-1]}" /></li>`);
			for(var i = 0; i < picArr.length; i++) {
				$('.pic_box').append(`<li><img src="${vge.csqpimg}/DBTHuNanQPPlatform${picArr[i]}" /></li>`);
				$('.dot').append('<li></li>');
			}
			$('.pic_box').append(`<li><img src="${vge.csqpimg}/DBTHuNanQPPlatform${picArr[0]}" /></li>`);
			$('.dot li').eq(0).addClass('cur');
			if($('.dot li').size() < 2) {
				$('.dot').css('visibility', 'hidden');
			}
			$('#btn').on('click', function() {
				$('#alert,.window_res').css('display', 'block');
			});
			$('#res_btn').on('click', function() {
				$('#alert,.window_res').css('display', 'none');
				location.replace('http://' + location.host + '/v/csqp/IntegralMall/index.html');
			});
			$('#goback').on('click', function() {
				location.reload();
			});
			//轮播图相关
			var newIndex = 1,
				w = $(document).width(),
				timer = null;
			var lbtlength = $('.pic_box li').size();
			$('.banner ul.pic_box').css({
				'transition': 'all 0s linear',
				'margin-left': -w + 'px',
				'width': w * lbtlength + 'px'
			});
			$('.banner ul.pic_box li').css({
				'width': w + 'px'
			});

			if(lbtlength > 3) {
				clearInterval(timer);
				timer = setInterval(function() {
					lbt(newIndex, lbtlength);
				}, 5000);
				touchInit();
			}

			function lbt(idx, length, abs) {
				if(length < 4) {
					return;
				}
				++idx;
				if(idx >= length - 2) {
					$('.banner ul.dot li').eq(0).addClass('cur').siblings().removeClass('cur');
				}
				if(idx >= length) {
					idx = 1;
					$('.banner ul.pic_box').css({
						'transition': 'all 0s linear',
						'margin-left': -w + 'px'
					});
				} else {
					if(abs) {
						$('.banner ul.pic_box').css({
							'transition': 'all 0.3s linear',
							'margin-left': -idx * w + 'px'
						});
					} else {
						$('.banner ul.pic_box').css({
							'transition': 'all 0.8s linear',
							'margin-left': -idx * w + 'px'
						});
					}
				}
				newIndex = idx;
				$('.pic_box').on('transitionend', function() {
					var mlf = $('.pic_box').css('margin-left');
					if(mlf.substring(0, mlf.length - 2) <= -(length - 1) * w) {
						newIndex = 1;
						$('.banner ul.pic_box').css({
							'transition': 'all 0s linear',
							'margin-left': -w + 'px'
						});
					} else if(mlf.substring(0, mlf.length - 2) >= 0) {
						newIndex = length - 2;
						$('.banner ul.pic_box').css({
							'transition': 'all 0s linear',
							'margin-left': -w * newIndex + 'px'
						});
					}
				});
				$('.banner ul.dot li').eq(idx - 1).addClass('cur').siblings().removeClass('cur');
			}

			function touchInit() {
				var _x = 0,
					x = 0,
					lf;
				$('.banner ul.pic_box').on('touchstart touchmove touchend', function(e) {
					clearTimeout(timer);
					e.preventDefault();
					switch(e.type) {
						case 'touchstart':
							x = _x = e.originalEvent.targetTouches[0].pageX;
							lf = $('.pic_box').css('margin-left').substring(0, $('.pic_box').css('margin-left').length - 2);
							window.flag = true;
							break;
						case 'touchmove':
							_x = e.originalEvent.targetTouches[0].pageX;
							if(lf - (x - _x) < -w * lbtlength) {
								lf = -w * lbtlength + (x - _x);
							} else if(lf - (x - _x) > 0) {
								lf = (x - _x);
							} else {
								lf = lf;
							}
							$('.banner ul.pic_box').css({
								'transition': 'all 0s linear',
								'margin-left': lf - (x - _x) + 'px'
							});
							window.flag = false;
							break;
						case 'touchend':
							_x = e.originalEvent.changedTouches[0].pageX;
							clearInterval(timer);
							if(window.flag) {
								console.log('点击');
							} else {
								if(Math.abs(x - _x) >= w * 0.2) {
									if(x - _x < 0) { //右划
										newIndex -= 2;
									} else { //左划
									}
									lbt(newIndex, lbtlength, 1);
								} else { //当前
									newIndex = newIndex - 1;
									lbt(newIndex, lbtlength, 1);
								}
							}
							timer = setInterval(function() {
								lbt(newIndex, lbtlength);
							}, 5000);
							break;
						default:
							break;
					}

				});

			}

		});
	});
})();