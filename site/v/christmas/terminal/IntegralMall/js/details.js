(function() {

	var jo = JSON.parse(sessionStorage.jo),
		html = '';

	var reg1 = /^1[0-9]{10}$/,
		reg2 = /^[1-9][0-9xX]{17}$/,
		reg3 = /^[0-9]{4}$/;
	var caneditor = true;	
	
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
			<p class="title"><span class="name">${jo.goodsName}</span> <em goodsDiscount='${jo.goodsDiscount}'>${jo.goodsDiscount/10}折优惠</em></p>
			<p class="price"><span class="price_1">${jo.realVpoints}</span>积分 <del goodsDiscount='${jo.goodsDiscount}'>${jo.goodsVpoints}</del> <span class="ckj">市场价：¥${jo.goodsMoney}</span></p>
			<p class="date">兑换日期：<span>${jo.goodsStartTime}至${jo.goodsEndTime}</span></p>
			<div class="msg">
				<p class="title_msg">奖品说明</p>
				${jo.goodsContent}
			</div>`;
	$('.content').append(html);
	$('div.msg').find('*').attr('style','');
	var picUrl = jo.goodsUrl,//轮播图图片排序
		picArr = [];
	if(picUrl[picUrl.length - 1] == ',') {
		picUrl = picUrl.substring(0, picUrl.length - 2);
	}
	picArr = picUrl.split(',');
	$('.pic_box').append(`<li><img src="${vge.terminalimg}/DBTVMTSPlatform${picArr[picArr.length-1]}" /></li>`);
	for(var i = 0; i < picArr.length; i++) {
		$('.pic_box').append(`<li><img src="${vge.terminalimg}/DBTVMTSPlatform${picArr[i]}" /></li>`);
		$('.dot').append('<li></li>');
	}
	$('.pic_box').append(`<li><img src="${vge.terminalimg}/DBTVMTSPlatform${picArr[0]}" /></li>`);
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
		if(sessionStorage.exchange){
			location.href = 'record.html';
		}else{
			if(sessionStorage.address !== '' || sessionStorage.realName !== '' || sessionStorage.phoneNum !== '') {
				$('#name').val(sessionStorage.realName);
				$('#address').val(sessionStorage.address);
				$('#chose_address').val(sessionStorage.choseAddress);
				$('#tel').val(sessionStorage.phoneNum);
			}
			if(sessionStorage.vpoints<jo.realVpoints){
				$('.window_res img').attr('src','img/fail.png');
				$('.window_res .tip_msg').text('请您再多攒一些积分再来兑换哟~');
				$('#alert,.window_res').css('display', 'block');
				setTimeout(function() {
					$('#alert,.window_res').css('display', 'none');
				}, 2000);
			}else{
				sessionStorage.realVpoints=jo.realVpoints;
				if(sessionStorage.exchangeType=='2'){
					$('#name,#address,#tel,#chose_address').val('');
					$('#alert .confrim span').html(jo.realVpoints);
					$('#alert,.window_confirm').css('display', 'block');
				}else if(sessionStorage.exchangeType=='3'){
					$('#name,#address,#chose_address').val('');
					$('#name,#address,#chose_address').css('display', 'none');
					$('#btn_msg').css('margin','4.4rem .4rem 1rem');
					$('#alert,.window_msg').css('display', 'block');
				}else{
					$('#alert,.window_msg').css('display', 'block');
				}
			}
		}
	});
	document.getElementById("chose_address").addEventListener("click", function() {//地址选择
		if(caneditor) { //点击编辑
			caneditor = false;
		}
	}, false);
	
	$('#btn_msg').on('click', function() { //提交信息
		if(sessionStorage.exchangeType=='3'){
			if(!reg1.test($('#tel').val())){
				title_tip('提 示', '请填写正确的手机号！~', '我知道了');
			}else{
				$('.window_msg').css('display', 'none');
				$('#alert .confrim span').html(jo.realVpoints);
				$('#alert,.window_confirm').css('display', 'block');
			}
		}else{
			if($('#name').val() === '' || $('#name').val().indexOf(' ') !== -1) {
				title_tip('提 示', '请输入正确的姓名哦！~', '我知道了');
			} else if(!reg1.test($('#tel').val())) {
				title_tip('提 示', '请填写正确的手机号！~', '我知道了');
			} else if($('#address').val() === '' || $('#address').val().indexOf(' ') !== -1) {
				title_tip('提 示', '请填写正确的收货地址！~', '我知道了');
			} else if($('#chose_address').val() === '' || $('#address').val().indexOf(' ') !== -1) {
				title_tip('提 示', '请选择省市区/县！~', '我知道了');
			} else {
				$('.window_msg').css('display', 'none');
				$('#alert .confrim span').html(jo.realVpoints);
				$('#alert,.window_confirm').css('display', 'block');
			}
		}
	});
	$('.a_box').on('click', '.cancel', function() {
		$('#alert,.window_confirm').css('display', 'none');
	});
	$('.a_box .determine').on('click', function() { //确认兑换
		$(this).unbind();
		getFistCategoryType();
	});
	$('#cancel_msg').on('click', function() {
		$('#alert,.window_confirm').css('display', 'none');
	});
	function getFistCategoryType() { //商品兑换
		var javai = vge.terminal + '/DBTVMTSInterface/vpointsExchange/goodsExchange';
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
						sessionStorage.exchange = 'exchang';
						sessionStorage.vpoints = sessionStorage.vpoints-sessionStorage.realVpoints;
						$('.window_confirm').css('display', 'none');
						sessionStorage.realName = $('#name').val();
						sessionStorage.address = $('#address').val();
						sessionStorage.choseAddress = $('#chose_address').val();
						sessionStorage.phoneNum = $('#tel').val();
						$('#alert,.window_res').css('display', 'block');
						setTimeout(function() {
							$('#alert,.window_res').css('display', 'none');
						}, 2000);
						sessionStorage.reload = 'reload';
					}else{
						$('.a_box .determine').on('click', function() { //确认兑换
							$(this).unbind();
							getFistCategoryType();
						});
						if(jo.result.businessCode=='2'){
							$('.window_res .tip_msg').html('已发起兑换，预计10分钟内充值完成！');
							$('#btn').val('查看兑换记录');
							sessionStorage.exchange = 'exchang';
							sessionStorage.reload = 'reload';
						}else{
							$('.window_res .tip_msg').html(jo.result.businessCode +':'+jo.result.msg);
							$('.window_res img').attr('src','img/fail.png');
						}
						$('.window_confirm').css('display', 'none');
						$('#alert,.window_res').css('display', 'block');
						setTimeout(function() {
							$('#alert,.window_res').css('display', 'none');
						}, 2000);
					}
				} else {
					$('.window_confirm').css('display', 'none');
					$('.window_res img').attr('src','img/fail.png');
					$('.window_res .tip_msg').html(jo.result.code +':'+jo.result.msg);
					$('#alert,.window_res').css('display', 'block');
					setTimeout(function() {
						$('#alert,.window_res').css('display', 'none');
					}, 2000);
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