(function() {

	var jo = JSON.parse(sessionStorage.jo),
		html = '';

	var reg1 = /^1[0-9]{10}$/,
		reg2 = /^[1-9][0-9xX]{17}$/,
		reg3 = /^[0-9]{4}$/;
	
	sessionStorage.removeItem('exchange');
	$.each(jo, function() {
		if(this.goodsId == sessionStorage.goodsId) {
			jo = this;
		}
		return jo;
	});

	html = `<div class="banner">
				<ul class="pic_box">
				</ul>
				<ul class="dot">
				</ul>
			</div>
			<p class="title"><span class="name">${jo.goodsName}</span> <em goodsDiscount='${jo.goodsDiscount}'>${jo.goodsDiscount/10}折优惠</em></p>`;
	if(jo.realPay==0){
		html += `<p class="price"><span class="price_1">${jo.realVpoints}</span>积分  <del goodsDiscount='${jo.goodsDiscount}'>${jo.goodsVpoints}</del> <span class="ckj">市场价：¥${jo.goodsMoney}</span></p>`;
	}else{
		html += `<p class="price"><span class="price_1">${jo.realVpoints}</span>积分 <span class="pay_money"><em>+</em><i>${jo.realPay}</i>元</span> <del goodsDiscount='${jo.goodsDiscount}'>${jo.goodsVpoints}</del> <span class="ckj">市场价：¥${jo.goodsMoney}</span></p>`;
	}
					
	html += `<p class="date">兑换日期：<span>${jo.goodsStartTime}至${jo.goodsEndTime}</span></p>
		<div class="msg">
			${jo.goodsContent}
		</div>`;
	$('.content').append(html);
	$('div.msg').find('*').attr('style','');
	$('div.msg').find('b').attr('style',"font-weight: 400 !important;");
	var picUrl = jo.goodsUrl,//轮播图图片排序
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
	$('em,del').each(function() {
		if($(this).attr('goodsdiscount') == '100') {
			$(this).css('visibility', 'hidden');
		}
	});
	$('#btn').on('click', function() { //兑换商品
		if(sessionStorage.reload){
			sessionStorage.removeItem('reload');
			location.replace('http://'+location.host+'/v/csqp/IntegralMall/record.html');
		}else{
			if(sessionStorage.vpoints<jo.realVpoints){
				$('.window_res img').attr('src','img/fail.png');
				$('.window_res .tip_msg').text('请您再多攒一些积分再来兑换哟~');
				$('#alert,.window_res').css('display', 'block');
			}else{
				sessionStorage.realVpoints=jo.realVpoints;
				if(sessionStorage.exchangeType=='2'){//电子券
					$('#alert .confrim span').html(jo.realVpoints);
					$('#alert,.window_confirm').css('display', 'block');
				}else if(sessionStorage.exchangeType=='3'){//话费
					$('#alert .confrim span').html(jo.realVpoints);
	//				$('#alert,.window_confirm').css('display', 'block');
					$('#alert,.window_msg').css('display', 'block');
				}else{
					$('#alert .confrim span').html(jo.realVpoints);
					$('#alert,.window_confirm').css('display', 'block');
				}
			}
		}
		
	});
	$('#res_btn').on('click',function(){
		$('#alert,.window_res').css('display', 'none');
		if(sessionStorage.vpoints<jo.realVpoints){
			location.replace('http://'+location.host+'/v/csqp/IntegralMall/index.html');
		}
	});
	
	$('#btn_msg').on('click', function() { //提交信息
		if(sessionStorage.exchangeType=='3'){
			if(!reg1.test($('#tel').val())){
				title_tip('提 示', '请填写正确的手机号！~', '我知道了');
			}else{
				$('.window_msg').css('display', 'none');
				$('#alert .confrim').html('确定使用'+jo.realVpoints+'积分对手机号<br />'+$('#tel').val()+'进行充值？');
				$('#alert,.window_confirm').css('display', 'block');
			}
		}
	});
	$('.a_box').on('click', '.cancel', function() {
		$('#alert,.window_confirm').css('display', 'none');
	});
	$('.a_box .determine').on('click', dotgetfist);
	function dotgetfist() { //确认兑换
		$(this).unbind();
		setTimeout(function(){
			$('.a_box .determine').on('click', dotgetfist);
		},1000);
		$('#alert,.window_confirm').css('display', 'none');
		if(sessionStorage.exchangeType=='3'){
			getFistCategoryType();
		}else if(sessionStorage.exchangeType=='2'){
			getFistCategoryType();
		}else{
			location.replace('http://'+location.host+'/v/csqp/IntegralMall/order.html');
		}
		
	}
	$('#cancel_msg').on('click', function() {
		$('#alert,.window_confirm').css('display', 'none');
	});
	function getFistCategoryType() { //商品兑换
		var javai = vge.csqp + '/DBTHuNanQPInterface/vpoints/vpointsExchange/goodsExchange';
		var req = {
			"openid":sessionStorage.openid,
			"companyKey":sessionStorage.companyKey,
			"goodsId": jo.goodsId,
			"realName": $('#name').val(),
			"address": $('#chose_address').val()+' '+$('#address').val(),
			"phoneNum": $('#tel').val()
		};
		vge.callJApi(javai, req,
			function(jo) {
				if(jo.result.code == '0') {
					if(jo.result.businessCode == '0') { //成功
						$('#btn').val('查看兑换记录');
						sessionStorage.vpoints = sessionStorage.vpoints-sessionStorage.realVpoints;
						$('.window_confirm').css('display', 'none');
						sessionStorage.realName = $('#name').val();
						sessionStorage.address = $('#address').val();
						sessionStorage.choseAddress = $('#chose_address').val();
						sessionStorage.phoneNum = $('#tel').val();
						$('#alert,.window_res').css('display', 'block');
						sessionStorage.reload = 'reload';
					}else{
						if(jo.result.businessCode=='2'){
							$('.window_res .tip_msg').html('已发起兑换，预计10分钟内充值完成！');
							$('#btn').val('查看兑换记录');
							sessionStorage.reload = 'reload';
						}else{
							$('.window_res .tip_msg').html(jo.result.businessCode +':'+jo.result.msg);
							$('.window_res img').attr('src','img/fail.png');
						}
						$('.window_confirm').css('display', 'none');
						$('#alert,.window_res').css('display', 'block');
					}
				} else {
					$('.window_confirm').css('display', 'none');
					$('.window_res img').attr('src','img/fail.png');
					$('.window_res .tip_msg').html(jo.result.code +':'+jo.result.msg);
					$('#alert,.window_res').css('display', 'block');
				}
			});
	}

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
})();