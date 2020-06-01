(function() {
	'use strict';

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

	var picUrl = jo.goodsUrl, //轮播图图片排序
		picArr = [];
	if(picUrl[picUrl.length - 1] == ',') {
		picUrl = picUrl.substring(0, picUrl.length - 2);
	}
	picArr = picUrl.split(',');
	$('.goods_msg img').attr('src', `${vge.csqpimg}/DBTHuNanQPPlatform${picArr[0]}`);
	$('.goods_msg p').html(jo.goodsName);
	$('.order_msg i').html(jo.realVpoints);

	$('#res_btn').on('click', function() {
		$('#alert,.window_res').css('display', 'none');
		if(sessionStorage.success) {
			sessionStorage.removeItem('success');
			location.replace('http://' + location.host + '/v/csqp/IntegralMall/index.html');
		}
	});

	getAddressByOpenid();

	function getAddressByOpenid() {
		var javai = vge.csqp + '/DBTHuNanQPInterface/vpoints/vpointsAddress/getAddressByOpenid';
		var req = {
			"openid": sessionStorage.openid
		};
		vge.callJApi(javai, req,
			function(jo) {
				if(jo.result.code == '0') {
					if(jo.reply.length < 1) {
						$('.msg_box').fadeIn(100);
					} else {
						sessionStorage.addressList = JSON.stringify(jo.reply);
						sessionStorage.addressId = jo.reply[0].addressId;
						$('#order_box .userinfo .sh_name').html('收货人：' + jo.reply[0].userName);
						$('#order_box .userinfo .sh_tel').html(jo.reply[0].phoneNum);
						$('.addressinfo').html('收货地址：' + jo.reply[0].province + jo.reply[0].city + jo.reply[0].county + jo.reply[0].address);
						var html = '';
						$('.address_list_box').html(''); //清空
						for(var i = 0; i < jo.reply.length; i++) {
							html += `<div class="address_list" addressId="${jo.reply[i].addressId}" index="${i}">
							<div class="radio">
								<p></p>
							</div>
							<div class="addlist">
								<p><span class="sh_name">${jo.reply[i].userName}</span> <span class="sh_tel">${jo.reply[i].phoneNum}</span><em>修改</em></p>
								<p>收货地址：<span class="sh_address">${jo.reply[i].province + jo.reply[i].city + jo.reply[i].county + jo.reply[i].address}</span></p>
							</div>
							<div class="delete">删除</div>
						</div>`;
						}
						$('.address_list_box').append(html);
						$('.address_list').each(function() {
							if($(this).attr('addressId') == sessionStorage.addressId) {
								$(this).addClass('checked');
							}
						});
						$('.address_list').on('touchstart', 'em', function(event) {
							event.stopPropagation();
							var addIndex = Number($(this).parents('.address_list').attr('index'));
							sessionStorage.updateAddress = true;
							sessionStorage.addressId = jo.reply[addIndex].addressId;
							$('#name').val(jo.reply[addIndex].userName);
							$('#tel').val(jo.reply[addIndex].phoneNum);
							$('#address').val(jo.reply[addIndex].province + ',' + jo.reply[addIndex].city + ',' + jo.reply[addIndex].county);
							$('#address2').val(jo.reply[addIndex].address);
							$('.msg_box').fadeIn(200);
						});
						touchInit();
						$('.address_list').on('touchstart', '.delete', function(event) {
							event.stopPropagation();
							var addIndex = Number($(this).parents('.address_list').attr('index'));
							sessionStorage.delAddressId = $(this).parents('.address_list').attr('addressid');
							delAddress(addIndex); //删除
						});

					}
				} else {
					$('.window_res img').attr('src', 'img/fail.png');
					$('.window_res .tip_msg').html(jo.result.code + ':' + jo.result.msg);
					$('#alert,.window_res').css('display', 'block');
				}
			});
	}

	$('#tjdd').on('click', tjdd);

	function tjdd() { //提交订单
		$(this).unbind();
		getFistCategoryType();
		setTimeout(function() {
			$('#tjdd').on('click', tjdd);
		}, 1000);
	}

	$('.addressMsg').on('click', function() { //选择地址
		$('#addressList').fadeIn(200);
	});

	$('.addAddress').on('click', function() { //新增地址
		$('#name').val('');
		$('#tel').val('');
		$('#address').val('');
		$('#address2').val('');
		$('.msg_box').fadeIn(200);
	});

	$('#saveMsg').on('click', aboutAddress);
	
	function aboutAddress() { //保存新地址
		$(this).unbind();
		setTimeout(function(){
			$('#saveMsg').on('click', aboutAddress);
		},1000)
		if($('#name').val() === '' || $('#name').val().indexOf(' ') !== -1) {
			title_tip('提 示', '请输入正确的姓名哦！~', '我知道了');
		} else if(!reg1.test($('#tel').val())) {
			title_tip('提 示', '请填写正确的手机号！~', '我知道了');
		} else if($('#address').val() === '' || $('#address').val().indexOf(' ') !== -1) {
			title_tip('提 示', '请选择正确的 收件地区~', '我知道了');
		} else if($('#address2').val() === '' || $('#address').val().indexOf(' ') !== -1) {
			title_tip('提 示', '请填写正确的收货地址！~', '我知道了');
		} else { //保存信息跳回订单页
			if(sessionStorage.updateAddress) {
				sessionStorage.removeItem('updateAddress');
				updateAddress();
			} else {
				addNewAddress();
			}
		}
	}

	function updateAddress() { //修改地址
		var javai = vge.csqp + '/DBTHuNanQPInterface/vpoints/vpointsAddress/updateAddress';
		var req = {
			"address": $('#address2').val(),
			"city": $('#address').val().split(',')[1],
			"county": $('#address').val().split(',')[2],
			"openid": sessionStorage.openid,
			"addressId": sessionStorage.addressId,
			"phoneNum": $('#tel').val(),
			"province": $('#address').val().split(',')[0],
			"userName": $('#name').val()
		};
		vge.callJApi(javai, req,
			function(jo) {
				if(jo.result.code == '0') {
					$('.msg_box,#addressList').fadeOut(200);
					getAddressByOpenid();
				} else {
					title_tip('提 示', jo.result.code + ':' + jo.result.msg, '我知道了');
				}
			});
	}

	function delAddress(index) { //删除地址
		var javai = vge.csqp + '/DBTHuNanQPInterface/vpoints/vpointsAddress/delAddress';
		var req = {
			"addressId": sessionStorage.delAddressId
		};
		vge.callJApi(javai, req,
			function(jo) {
				if(jo.result.code == '0') {
					$('.address_list_box .address_list').eq(index).remove();
				} else {
					title_tip('提 示', jo.result.code + ':' + jo.result.msg, '我知道了');
				}
			});
	}

	function addNewAddress() { //新增地址
		var javai = vge.csqp + '/DBTHuNanQPInterface/vpoints/vpointsAddress/addNewAddress';
		var req = {
			"address": $('#address2').val(),
			"city": $('#address').val().split(',')[1],
			"county": $('#address').val().split(',')[2],
			"openid": sessionStorage.openid,
			"phoneNum": $('#tel').val(),
			"province": $('#address').val().split(',')[0],
			"userName": $('#name').val()
		};
		vge.callJApi(javai, req,
			function(jo) {
				if(jo.result.code == '0') {
					$('.msg_box,#addressList').fadeOut(200);
					getAddressByOpenid();
				} else {
					title_tip('提 示', jo.result.code + ':' + jo.result.msg, '我知道了');
				}
			});
	}

	function getFistCategoryType() { //商品兑换
		var javai = vge.csqp + '/DBTHuNanQPInterface/vpoints/vpointsExchange/goodsExchange';
		var req = {
			"openid": sessionStorage.openid,
			"companyKey": sessionStorage.companyKey,
			"goodsId": jo.goodsId,
			"addressId": sessionStorage.addressId
		};
		vge.callJApi(javai, req,
			function(jo) {
				if(jo.result.code == '0') {
					if(jo.result.businessCode == '0') { //成功
						$('#btn').val('查看兑换记录');
						sessionStorage.exchange = 'exchang';
						sessionStorage.vpoints = sessionStorage.vpoints - sessionStorage.realVpoints;
						$('.window_res .tip_msg').html('商品兑换成功');
						$('.window_res img').attr('src', 'img/success.png');
						$('#alert,.window_res').css('display', 'block');
						sessionStorage.success = true;
					} else {
						if(jo.result.businessCode == '2') {
							$('.window_res img').attr('src', 'img/success.png');
							$('.window_res .tip_msg').html('已发起兑换，预计10分钟内充值完成！');
							sessionStorage.exchange = 'exchang';
						} else {
							$('.window_res .tip_msg').html(jo.result.businessCode + ':' + jo.result.msg);
							$('.window_res img').attr('src', 'img/fail.png');
						}
						$('#alert,.window_res').css('display', 'block');
					}
				} else {
					$('.window_res img').attr('src', 'img/fail.png');
					$('.window_res .tip_msg').html(jo.result.code + ':' + jo.result.msg);
					$('#alert,.window_res').css('display', 'block');
				}
			});
	}

	function touchInit() {
		var _x = 0,
			x = 0,
			w = $(document).width(),
			lf;
		$('.address_list_box div.address_list').on('touchstart touchmove touchend', function(e) {
			e.preventDefault();
			switch(e.type) {
				case 'touchstart':
					x = _x = e.originalEvent.targetTouches[0].pageX;
					lf = $('.address_list').css('margin-left').substring(0, $('.address_list').css('margin-left').length - 2);
					window.flag = true;
					break;
				case 'touchmove':
					_x = e.originalEvent.targetTouches[0].pageX;
					if(lf - (x - _x) < -w * .2) {
						lf = -w * .2 + (x - _x);
					} else if(lf - (x - _x) > 0) {
						lf = (x - _x);
					} else {
						lf = lf;
					}
					$(this).css('margin-left', lf - (x - _x) + 'px');
					window.flag = false;
					break;
				case 'touchend':
					_x = e.originalEvent.changedTouches[0].pageX;
					if(window.flag) {
						$(this).addClass('checked').siblings().removeClass('checked');
						sessionStorage.addressId = $(this).attr('addressId');
						$('#order_box .userinfo .sh_name').html('收货人：' + $(this).find('.sh_name').html());
						$('#order_box .userinfo .sh_tel').html($(this).find('.sh_tel').html());
						$('.addressinfo').html('收货地址：' + $(this).find('.sh_address').html());
						$('#addressList').fadeOut(200);
					} else {
						if(Math.abs(x - _x) >= w * 0.03) {
							if(x - _x < 0) { //右划
								$(this).css('margin-left', '0');
							} else { //左划
								$(this).css('margin-left', -w*.2+'px');
							}

						} else { //当前
						}
					}
					break;
				default:
					break;
			}

		});

	}

})();