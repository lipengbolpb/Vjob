'use strict';
(function() {
	ini_wxshare(vge.fjmallappid);
	var reg1 = /^1[0-9]{10}$/,
		reg2 = /^[1-9][0-9xX]{17}$/,
		reg3 = /^[0-9]{4}$/;
	getAddressByOpenid();
	var args = vge.urlparse(location.href),
		index = args.index;

	function getAddressByOpenid() {
		var javai = vge.fjmall + '/DBTFJQHInterface/vpoints/vpointsAddress/getAddressByOpenid';
		var req = {
			"openid": sessionStorage.openid
		};
		vge.callJApi(javai, req,
			function(jo) {
				if(jo.result.code == '0') {
					if(!jo.result.businessCode) {
						if(jo.reply.length < 1) {
							$('#addaddress').fadeIn(10,function(){
								$('#addaddress #user').attr('autofocus','autofocus');
								$('#addaddress #user').focus();
							});
						} else {
							sessionStorage.addressList = JSON.stringify(jo.reply);
							sessionStorage.addressId = jo.reply[0].addressId;
							$('#order_box .userinfo .sh_name').html('收货人：' + jo.reply[0].userName);
							$('#order_box .userinfo .sh_tel').html(jo.reply[0].phoneNum);
							$('.addressinfo').html('收货地址：' + jo.reply[0].province + jo.reply[0].city + jo.reply[0].county + jo.reply[0].address);
							var html = '';
							$('#address_list').html(''); //清空
							for(var i = 0; i < jo.reply.length; i++) {
								html += `<div class="address_item"  addressId="${jo.reply[i].addressId}">
								<div class="operate_box">
									<div>
										<p class="select" addressId="${jo.reply[i].addressId}">选择</p>
									</div>
									<div>
										<p class="change" index="${i}">编辑</p>
										<p class="delete" index="${i}">删除</p>
									</div>
								</div>
								<div class="address_msg">
									<p><span>${jo.reply[i].userName}</span> <span>${jo.reply[i].phoneNum}</span></p>
									<p class="address">${jo.reply[i].province+jo.reply[i].city+jo.reply[i].county+jo.reply[i].address}</p>
								</div>
							</div>`;
							}
							$('#address_list').append(html);
							$('#address_list .address_item').each(function() {
								if($(this).attr('addressId') == sessionStorage.addressId) {
									$(this).addClass('cur');
								}
							});
//							if(index == 1){
//								$('#address_list .address_item .select').css('visibility', 'hidden');
//							}
							$('#address_list .address_item').on('click', function(e) {
								e.stopPropagation();
								$(this).addClass('cur').siblings().removeClass('cur');
								sessionStorage.addressId = $(this).attr('addressId');
								if(index == 1) {
									return false;
								} else {
									sessionStorage.getAddress = true;
									setTimeout(function() {
										location.href = 'http://'+location.host+'/v/fjmall/goods_details.html';
									}, 100)
								}

							});

							$('#address_list .change').on('click', function(e) { //修改
								e.stopPropagation();
								var addIndex = Number($(this).attr('index'));
								sessionStorage.updateAddress = true;
								sessionStorage.addressId = jo.reply[addIndex].addressId;
								$('#user').val(jo.reply[addIndex].userName);
								$('#phone').val(jo.reply[addIndex].phoneNum);
								$('#area').val(jo.reply[addIndex].province + '-' + jo.reply[addIndex].city + '-' + jo.reply[addIndex].county);
								$('#address').val(jo.reply[addIndex].address);
								$('#addaddress').fadeIn(200,function(){
									$('#addaddress #user').attr('autofocus','autofocus');
									$('#addaddress #user').focus();
								});
								
							});
							$('#address_list .delete').on('click', function(e) {
								e.stopPropagation();
								var addIndex = Number($(this).attr('index'));
								sessionStorage.delAddressId = $(this).parents('.address_item').attr('addressid');
								delAddress(addIndex); //删除
							});
						}
					} else {
						if(jo.result.businessCode == 300001) {
//							title_tip('提 示', , '我知道了');
						} else {
							title_tip('提 示', jo.result.businessCode + ':' + jo.result.msg, '我知道了');
						}
					}

				} else {
					title_tip('提 示', jo.result.code + ':' + jo.result.msg, '我知道了');
				}
			});
	}

	$('.addressMsg').on('click', function(e) { //选择地址
		$('#addressList').fadeIn(200);
		e.stopPropagation();
	});

	$('#add').on('click', function(e) { //新增地址
		e.stopPropagation();
		$('#user').val('');
		$('#phone').val('');
		$('#area').val('');
		$('#address').val('');
		$('#addaddress').fadeIn(100,function(){
			$('#addaddress #user').attr('autofocus','autofocus');
			$('#addaddress #user').focus();
		});
		
	});

	$('#save').on('click', aboutAddress);

	function aboutAddress(e) { //保存新地址
		e.stopPropagation();
		$(this).unbind();
		setTimeout(function() {
			$('#save').on('click', aboutAddress);
		}, 1000)
		if($('#user').val() === '' || $('#user').val().indexOf(' ') !== -1) {
			title_tip('提 示', '请输入正确的姓名哦！~', '我知道了');
		} else if(!reg1.test($('#phone').val())) {
			title_tip('提 示', '请填写正确的手机号！~', '我知道了');
		} else if($('#area').val() === '' || $('#area').val().indexOf(' ') !== -1) {
			title_tip('提 示', '请选择正确的所在地区~', '我知道了');
		} else if($('#address').val().replace(/\s/g,'') === '' || $('#address').val().replace(/\s/g,'').indexOf(' ') !== -1) {
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
		var javai = vge.fjmall + '/DBTFJQHInterface/vpoints/vpointsAddress/updateAddress';
		var req = {
			"address": $('#address').val().replace(/\s/g,''),
			"city": $('#area').val().split('-')[1],
			"county": $('#area').val().split('-')[2]==undefined?$('#area').val().split('-')[1]:$('#area').val().split('-')[2],
			"openid": sessionStorage.openid,
			"addressId": sessionStorage.addressId,
			"phoneNum": $('#phone').val(),
			"province": $('#area').val().split('-')[0],
			"userName": $('#user').val()
		};
		vge.callJApi(javai, req,
			function(jo) {
				if(jo.result.code == '0'&&!jo.result.businessCode) {
					$('#addaddress').fadeOut(200);
					getAddressByOpenid();
				} else {
					title_tip('提 示', jo.result.businessCode + ':' + jo.result.msg, '我知道了');
				}
			});
	}

	function delAddress(index) { //删除地址
		var javai = vge.fjmall + '/DBTFJQHInterface/vpoints/vpointsAddress/delAddress';
		var req = {
			"addressId": sessionStorage.delAddressId
		};
		vge.callJApi(javai, req,
			function(jo) {
				if(jo.result.code == '0'&&!jo.result.businessCode) {
					sessionStorage.removeItem('addressId');
					$('#address_list .address_item').eq(index).remove();
				} else {
					title_tip('提 示', jo.result.businessCode + ':' + jo.result.msg, '我知道了');
				}
			});
	}

	function addNewAddress() { //新增地址
		var javai = vge.fjmall + '/DBTFJQHInterface/vpoints/vpointsAddress/addNewAddress';
		var req = {
			"address": $('#address').val().replace(/\s/g,''),
			"city": $('#area').val().split('-')[1],
			"county": $('#area').val().split('-')[2]==undefined?$('#area').val().split('-')[1]:$('#area').val().split('-')[2],
			"openid": sessionStorage.openid,
			"phoneNum": $('#phone').val(),
			"province": $('#area').val().split('-')[0],
			"userName": $('#user').val()
		};
		vge.callJApi(javai, req,
			function(jo) {
				if(jo.result.code == '0'&&!jo.result.businessCode) {
					$('#addaddress').fadeOut(200);
					getAddressByOpenid();
				} else {
					title_tip('提 示', jo.result.businessCode + ':' + jo.result.msg, '我知道了');
				}
			});
	}
})()