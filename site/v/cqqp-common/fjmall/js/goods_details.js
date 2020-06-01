'use strict';
(function() {
	ini_wxshare(vge.fjmallappid);
	var goodsHtml = '',
		jo = JSON.parse(sessionStorage.jo),
		recommendGoods = JSON.parse(sessionStorage.recommendGoods),
		rchtml = '',
		goods_details = null,
		sumnum = 0,
		cartorder = [],
		randomlist = [];
	if(sessionStorage.goodsId){//单个商品
		$('#btn_box').css('display','flex');
		showDetails();
	}else if(sessionStorage.cartorder){//购物车
		showCartOrder();
	}else{
		$('#btn_box').css('display','flex');
		showDetails();
	}	
		
	if(recommendGoods.length>4){//生成随机的推荐商品
		getrandom(recommendGoods.length);
		function getrandom(le){
			var randNum = Math.floor(Math.random()*le);
			if(randomlist.length<4){
				if(randomlist.indexOf(randNum)==-1){
					randomlist.push(randNum);
				}
				getrandom(recommendGoods.length);
			}else{
				return randomlist;
			}
		}
	}
	showRecommend(recommendGoods);

	//cookie Util
	var cookieUtil = {
		//添加cookie
		setCookie: function(name, value, expires) {
			var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value) + ";path=/";
			if (expires) {
				var exp = new Date();
				exp.setTime(exp.getTime() + expires*24*60*60*1000);
				cookieText += "; expires=" + exp.toGMTString();
			}
			document.cookie = cookieText;
		},
		//获取cookie
		getCookie: function(name) {
			var cookieText = decodeURIComponent(document.cookie);
			var cookieArr = cookieText.split("; ");
			for (var i = 0; i < cookieArr.length; i++) {
				var arr = cookieArr[i].split("=");
				if (arr[0] == name) {
					return arr[1];
				}
			}
			return null;
		},
		//删除cookie
		unsetCookie: function(name) {
			document.cookie = encodeURIComponent(name) + "=; expires=" + new Date(0);
		}
	};

	var cartArr = cookieUtil.getCookie("car") ? JSON.parse(cookieUtil.getCookie("car")) : [];
	
	function showDetails(){//展示单个商品
		for (var i = 0; i < jo.length; i++) {
			if (jo[i].goodsId == sessionStorage.goodsId) {
				sessionStorage.goods_details = JSON.stringify(jo[i]);
				sessionStorage.pauseExchangeFlag = jo[i].pauseExchangeFlag;
				sessionStorage.pauseExchangeTips = jo[i].pauseExchangeTips;
				goods_details = JSON.parse(sessionStorage.goods_details);
				goodsHtml =
					`<img src="${vge.fjmallimg}/DBTFJQHPlatform${jo[i].goodsUrl.split(',')[1]}" class="goods"/>
				<div class="goods_msg">
					<p class="goodsname">${jo[i].goodsName}</p>
					<div>
						<p class="price">积分：<span>${transfNum(jo[i].realVpoints)}</span></p>
						<p class="scprice">市场价值：${jo[i].goodsMoney}元</p>
					</div>
					<div class="num">
						<p>数量 <span>库存${jo[i].goodsRemains}件</span></p>
						<div>
							<p class="reduce1">-</p>
							<input type="text" name="" class="addgoods1" id="" value="1" readonly/>
							<p class="add1">+</p>
						</div>
					</div>
					<div class="tip">
						<div>
							<p>正品行货</p>
							<p>不支持退货</p>
						</div>
						<p class="senddate">${jo[i].expressTips}</p>
					</div>
				</div>
				<div class="goods_info">
					<p>商品介绍<br /><span>INFOMATION</span><br /><span>____</span></p>
					<div>${jo[i].goodsContent}</div>				
				</div>`;
				$('#goods_details').append(goodsHtml);
				$('#goods_details .goods_info div').find('*').attr('style', '');
				//加减数量
				if (sessionStorage.addgoods) {
					$('.addgoods1').val(sessionStorage.addgoods - 0);
				}
				$('.add1').on('click', function() {
					if ($('.addgoods1').val() - 0 + 1 > goods_details.goodsRemains) {
						title_tip('尊敬的用户', '大于库存！', '我知道了');
					} else if (($('.addgoods1').val() - 0 + 1) * goods_details.realVpoints > sessionStorage.surplusVpoints) {
						title_tip('尊敬的用户', '积分不足！', '我知道了');
					} else {
						$('.addgoods1').val($('.addgoods1').val() - 0 + 1);
						sessionStorage.addgoods = $('.addgoods1').val();
					}
				})
		
				$('.reduce1').on('click', function() {
					if (($('.addgoods1').val() - 1) < 1) {
						$('.addgoods1').val($('.addgoods1').val());
					} else {
						$('.addgoods1').val($('.addgoods1').val() - 1);
					}
					sessionStorage.addgoods = $('.addgoods1').val();
				})
		
				break;
			}
		}
		//加减数量
		$('.add').on('click', function() {
			if ($('.addgoods1').val() - 0 + 1 > goods_details.goodsRemains) {
				title_tip('尊敬的用户', '大于库存！', '我知道了');
			} else if (($('.addgoods').val() - 0 + 1) * goods_details.realVpoints > sessionStorage.surplusVpoints) {
				title_tip('尊敬的用户', '积分不足！', '我知道了');
			} else {
				$('.addgoods').val($('.addgoods').val() - 0 + 1);
				sessionStorage.addgoods = $('.addgoods').val();
				// $('#order .price span').text(transfNum(goods_details.realVpoints * sessionStorage.addgoods));
				$('#save_box>p>span').html(transfNum(goods_details.realVpoints*(sessionStorage.addgoods==undefined?1:sessionStorage.addgoods)));
			}
		
		})
		
		
		$('.reduce').on('click', function() {
			if (($('.addgoods').val() - 1) < 1) {
				$('.addgoods').val('1');
			} else {
				$('.addgoods').val($('.addgoods').val() - 1);
			}
			sessionStorage.addgoods = $('.addgoods').val();
			// $('#order .price span').text(transfNum(goods_details.realVpoints * sessionStorage.addgoods));
			$('#save_box>p>span').html(transfNum(goods_details.realVpoints*(sessionStorage.addgoods==undefined?1:sessionStorage.addgoods)));
		})
		
	}
	if (sessionStorage.getAddress) {
		getAddressById();
		sessionStorage.removeItem('getAddress');
	}
	$('#toexchange').on('click', function() {
		if (sessionStorage.pauseExchangeFlag == '0') {
			title_tip('尊敬的用户', sessionStorage.pauseExchangeTips, '我知道了');
			return false;
		}
		if (goods_details.realVpoints * sessionStorage.addgoods > sessionStorage.surplusVpoints) {
			title_tip('尊敬的用户', '积分不足', '我知道了');
		} else if (sessionStorage.addgoods > goods_details.goodsRemains) {
			title_tip('尊敬的用户', '库存不足', '我知道了');
		} else {
			if (sessionStorage.addressId) {
				getAddressById();
			} else {
				getAddressByOpenid();
			}
		}
	});

	$('#addcart').on('click', function() {
		if($(this).html()=='查看购物车'){
			return location.href = 'http://'+location.host+'/v/fjmall/index.html#/shopcart';
		}
		if(cartArr.length>9){
			return title_tip('尊敬的用户', '购物车商品品类已达上限', '我知道了');
		}
		for (var ci = 0; ci < cartArr.length; ci++) {
			if (cartArr[ci].g_id == sessionStorage.goodsId) {
				//已经存在该商品，商品数量+1
				cartArr[ci].num+=Number(sessionStorage.addgoods);
				break; //立即结束遍历
			}
		}
		if (ci == cartArr.length) {
			var cartGoods = {
				"g_id": sessionStorage.goodsId,
				"num":Number(sessionStorage.addgoods)
			}
			cartArr.unshift(cartGoods);
		}
		//把更新后的数组序列化为JSON字符串，保存到cookie中
		//保存cookie
		cookieUtil.setCookie("car", JSON.stringify(cartArr),365);
		$(this).html('查看购物车');
		return title_tip('尊敬的用户', '购物车添加成功！', '我知道了');
	})
	

	function showCartOrder(){//展示购物车订单
		cartorder=JSON.parse(sessionStorage.cartorder);
		var carthtml = '';
		for(var i = 0;i<cartorder.length;i++){
			carthtml += `<div class="order_msg" goodsid="${cartorder[i].goodsId}" index="${i}">
					<div>
						<img src="${cartorder[i].pic}">
					</div>
					<div>
						<p class="goodsname">${cartorder[i].goodsShortName}</p>
						<div>
							<p class="price" price="${cartorder[i].realVpoints}">积分：<span>${transfNum(cartorder[i].realVpoints)}</span></p>
							<div class="numcon">
								<p class="reduce" index="${i}">-</p>
								<input type="text" name="" class="addgoods" value="${cartorder[i].exchangeNum}" readonly="">
								<p class="add" index="${i}">+</p>
							</div>
						</div>
					</div>
				</div>`;
		}
		$('#order .order-list').html('');
		$('#order .order-list').append(carthtml);
		$('#order').css('display','block');
		calculator();
		if (sessionStorage.addressId) {//获取地址
			getAddressById();
		} else {
			getAddressByOpenid();
		}
		$('#order .order-list .reduce').on('click',function(e){//减
			e.stopPropagation();
			var val = Number($(this).siblings('input').val());
			var _this = this;
			val--;
			if(val<1){
				chose_tip('提示','是否删除商品？','取消',undefined,'确认',undefined,function(e){
					if(e){
						cartorder.splice($('#order .order-list .reduce').index(_this),1);
						sessionStorage.cartorder = JSON.stringify(cartorder);
						$(_this).parents('.order_msg').remove();
					}else{
						val =1;
						$(_this).siblings('input').val(val);
					}
				})
			}else{
				cartorder[$('#order .order-list .reduce').index(this)].exchangeNum = val;
				sessionStorage.cartorder = JSON.stringify(cartorder);
			}
			$(this).siblings('input').val(val);
			calculator();
		});
		$('#order .order-list .add').on('click',function(e){//加
			e.stopPropagation();
			var val = Number($(this).siblings('input').val());
			val++;
			$(this).siblings('input').val(val);
			cartorder[$('#order .order-list .add').index(this)].exchangeNum = val;
			sessionStorage.cartorder = JSON.stringify(cartorder);
			calculator();
		});
	}
	
	function calculator(){//计算总价
		sumnum = 0;
		$('.order_msg').each(function(){
			sumnum += (Number($(this).find('input').val())*Number($(this).find('.price').attr('price')));
		});
		$('#save_box span').html(transfNum(sumnum));
		if(sumnum>Number(sessionStorage.surplusVpoints)){
			return title_tip('尊敬的用户', '积分不足！', '我知道了');
		}
	}
	
	function getAddressById() {
		var javai = vge.fjmall + '/DBTFJQHInterface/vpoints/vpointsAddress/getAddressById';
		var req = {
			"addressId": sessionStorage.addressId
		};
		vge.callJApi(javai, req,
			function(jo) {
				if (jo.result.code == '0') {
					if (jo.reply) {
						sessionStorage.realName = jo.reply.userName;
						sessionStorage.phoneNum = jo.reply.phoneNum;
						sessionStorage.address = jo.reply.province + jo.reply.city + jo.reply.county + jo.reply.address;
						if (jo.reply.length < 1) {
							$('.address_msg').html('<p style="padding:.5rem 0;">请选择收货地址</p>');
							$('.address_msg').css('background-image',
								'url(/v/fjmall/img/icon-noaddress.png),url(/v/fjmall/img/icon-right.png)')
						} else {
							$('.address_msg').html(
								`<p>${jo.reply.userName} <span>${jo.reply.phoneNum}</span></p>
						<p>${jo.reply.province+jo.reply.city+jo.reply.county+jo.reply.address}</p>`
							);
							$('#order').fadeIn(100);
							if(sessionStorage.goodsId){//单个订单
								$('#order .addgoods').val(sessionStorage.addgoods);
								$('#order img').attr('src', `${vge.fjmallimg}/DBTFJQHPlatform${goods_details.goodsUrl.split(',')[0]}`);
								$('#order .goodsname').text(goods_details.goodsName);
								// $('#order .price span').text(transfNum(goods_details.realVpoints * sessionStorage.addgoods));
								$('#save_box>p>span').html(transfNum(goods_details.realVpoints*sessionStorage.addgoods));
							}
						}
					} else {
						title_tip('尊敬的用户', jo.result.msg, '我知道了');
					}

				} else {
					title_tip('尊敬的用户', jo.result.msg, '我知道了');
				}
			});
	}

	function getAddressByOpenid() {
		var javai = vge.fjmall + '/DBTFJQHInterface/vpoints/vpointsAddress/getAddressByOpenid';
		var req = {
			"openid": sessionStorage.openid
		};
		vge.callJApi(javai, req,
			function(jo) {
				if (jo.result.code == '0') {
					if (jo.reply.length < 1) {
						$('.address_msg').html('<p style="padding:.5rem 0;">请选择收货地址</p>');
						$('.address_msg').css('background-image',
							'url(/v/fjmall/img/icon-noaddress.png),url(/v/fjmall/img/icon-right.png)')
					} else {
						sessionStorage.addressId = jo.reply[0].addressId;
						sessionStorage.realName = jo.reply[0].userName;
						sessionStorage.phoneNum = jo.reply[0].phoneNum;
						sessionStorage.address = jo.reply[0].province + jo.reply[0].city + jo.reply[0].county + jo.reply[0].address;
						$('.address_msg').html(
							`<p>${jo.reply[0].userName} <span>${jo.reply[0].phoneNum}</span></p>
					<p>${jo.reply[0].province+jo.reply[0].city+jo.reply[0].county+jo.reply[0].address}</p>`
						);
					}
					$('#order').fadeIn(100);
					if(sessionStorage.goodsId){//单个订单
						$('#order .addgoods').val(sessionStorage.addgoods);
						$('#order img').attr('src', `${vge.fjmallimg}/DBTFJQHPlatform${goods_details.goodsUrl.split(',')[0]}`);
						$('#order .goodsname').text(goods_details.goodsName);
						// $('#order .price span').text(transfNum(goods_details.realVpoints * sessionStorage.addgoods));
						$('#order .price span').text(transfNum(goods_details.realVpoints));
						$('#save_box>p>span').html(transfNum(goods_details.realVpoints*(sessionStorage.addgoods==undefined?1:sessionStorage.addgoods)));
					}
				} else {
					title_tip('尊敬的用户', jo.result.msg, '我知道了');
				}
			});
	}


	$('#exchange').on('click', function(e) { //兑换商品
		e.stopPropagation();
		if(sessionStorage.goodsId){//单件商品
			sessionStorage.realVpoints = jo.realVpoints;
			if (goods_details.realVpoints * sessionStorage.addgoods > sessionStorage.surplusVpoints) {
				title_tip('尊敬的用户', '积分不足', '我知道了');
			} else if (sessionStorage.addgoods > goods_details.goodsRemains) {
				title_tip('尊敬的用户', '库存不足', '我知道了');
			} else {
				loading('兑换中');
				goodsExchange();
			}
		}else if(sessionStorage.cartorder){
			if(sumnum>sessionStorage.surplusVpoints){
				return title_tip('尊敬的用户', '积分不足！', '我知道了');
			}else{
				loading('兑换中');
				goodsExchangeForCart();
			}
		}
	});
	
	$('#cancel').on('click',function(e){
		e.stopPropagation();
		if(sessionStorage.cartorder){
			sessionStorage.removeItem('cartorder');
			location.href = 'http://'+location.host+'/v/fjmall/index.html#/shopcart';
		}else if(sessionStorage.goodsId){
			$('#order').css('display','none');
		}
	})

	function goodsExchange() { //单个商品兑换
		var javai = vge.fjmall + '/DBTFJQHInterface/vpoints/vpointsExchange/goodsExchange';
		var req = {
			"openid": sessionStorage.openid,
			"companyKey": sessionStorage.companyKey,
			"goodsId": sessionStorage.goodsId,
			"realVpoints":goods_details.realVpoints,
			"realName": sessionStorage.realName,
			"address": sessionStorage.address,
			"phoneNum": sessionStorage.phoneNum,
			"exchangeNum": sessionStorage.addgoods,
			"addressId": sessionStorage.addressId
		};
		vge.callJApi(javai, req,
			function(jo) {
				loaded();
				if (jo.result.code == '0') {
					if (jo.result.businessCode == '0') { //成功
						sessionStorage.surplusVpoints = sessionStorage.surplusVpoints - (goods_details.realVpoints * sessionStorage.addgoods);
						showRecommend(recommendGoods);
						$('#alert').fadeIn(100);
					} else {
						if (jo.result.businessCode == '2') {
							title_tip('尊敬的用户', '已发起兑换，预计10分钟内充值完成！', '我知道了');
							// $('#exchange').text('查看兑换记录');
						} else {
							title_tip('尊敬的用户', jo.result.businessCode + ':' + jo.result.msg, '我知道了');
						}
					}
				} else {
					title_tip('尊敬的用户', jo.result.businessCode + ':' + jo.result.msg, '我知道了');
				}
			});
	}
	function goodsExchangeForCart() { //多个商品兑换
		var javai = vge.fjmall + '/DBTFJQHInterface/vpoints/vpointsExchange/goodsExchangeForCart';
		var req = {
			"openid": sessionStorage.openid,
			"companyKey": sessionStorage.companyKey,
			"shopCartList": cartorder,
			"realName": sessionStorage.realName,
			"address": sessionStorage.address,
			"phoneNum": sessionStorage.phoneNum,
			"exchangeNum": sessionStorage.addgoods,
			"addressId": sessionStorage.addressId
		};
		vge.callJApi(javai, req,
			function(jo) {
				loaded();
				if (jo.result.code == '0') {
					if (jo.result.businessCode == '0') { //成功
						sessionStorage.surplusVpoints = sessionStorage.surplusVpoints - sumnum;
						showRecommend(recommendGoods);
						cookieUtil.setCookie("car", sessionStorage.shopcart,365);//删除购物车中的已兑换商品
						$('#alert').fadeIn(100);
					} else {
						if (jo.result.businessCode == '2') {
							title_tip('尊敬的用户', '已发起兑换，预计10分钟内充值完成！', '我知道了');
							// $('#exchange').text('查看兑换记录');
						} else {
							title_tip('尊敬的用户', jo.result.businessCode + ':' + jo.result.msg, '我知道了');
						}
					}
				} else {
					title_tip('尊敬的用户', jo.result.businessCode + ':' + jo.result.msg, '我知道了');
				}
			});
	}
	
	$('.address_msg').on('click', function() { //新增地址
		location.href = 'address.html';
	});
	$('.confrim').on('click', function() { //订单管理
		sessionStorage.orderState = 'send';
		location.href = 'order.html';
	});
	
	function showRecommend(jo){
		var le = jo.length;
		rchtml = '';
		if(le<5){
			if(le<1){
				$('.rec-title').css('display','none');
			}else{
				$('.rec-title').css('display','block');
			}
			for(var i = 0;i<le;i++){
				rchtml += `<div class="goods-box" goodsid="${jo[i].goodsId}" exchangetype="1">
							<img src="${vge.fjmallimg}/DBTFJQHPlatform${jo[i].goodsUrl.split(',')[0]}" alt="">
							<p class="goodsname">${jo[i].goodsShortName}</p>
							<p class="price"><i>${transfNum(jo[i].realVpoints)}</i>积分</p>
						</div>`;
			}
		}else{
			for(var i = 0;i<le;i++){
				if(i==randomlist[0]||i==randomlist[1]||i==randomlist[2]||i==randomlist[3]){
					rchtml += `<div class="goods-box" goodsid="${jo[i].goodsId}" exchangetype="1">
								<img src="${vge.fjmallimg}/DBTFJQHPlatform${jo[i].goodsUrl.split(',')[0]}" alt="">
								<p class="goodsname">${jo[i].goodsShortName}</p>
								<p class="price"><i>${transfNum(jo[i].realVpoints)}</i>积分</p>
							</div>`;
				}
			}
		}
		$('.recommend .rec-list').html('');
		$('.recommend .rec-list').append(rchtml);
		$('.recommend .rec-list>div').on('click', function() { //商品点击
			sessionStorage.goodsId = $(this).attr('goodsid');
			sessionStorage.addgoods = 1;
			sessionStorage.exchangeType = $(this).attr('exchangeType');
			sessionStorage.removeItem('cartorder');
			location.href = `http://{location.host}/v/fjmall/goods_details.html?tj=${$(this).attr('exchangetype')}`;
		});
	}
	
	
	function transfNum(num) {
		if (num < 1000) {
			return num;
		} else {
			var str = num + '',
				reg = /\*/g;
			var arr = '',
				Int = '',
				Float = '',
				resStr1 = [],
				resStr2 = [];
			if (str.indexOf(".") !== -1) {
				arr = str.split(".");
				Int = arr[0].split('');
				Float = arr[1].split('');
			} else {
				Int = str.split('');
			}
			Int = Int.reverse();
			for (var i = 0; i < Int.length; i++) {
				resStr1.push(Int[i]);
				if (i % 3 === 2) {
					resStr1.push(',');
				}
			}
			resStr1 = resStr1.reverse().join('*');
			resStr1 = resStr1.replace(reg, '');
			if (resStr1[0] == ',') {
				resStr1 = resStr1.substr(1, resStr1.length);
			}
			for (var j = 0; j < Float.length; j++) {
				resStr2.push(Float[j]);
				if (j % 3 === 2) {
					resStr2.push(',');
				}
			}
			resStr2 = resStr2.join('*');
			resStr2 = resStr2.replace(reg, '');
			if (resStr2[resStr2.length - 1] == ',') {
				resStr2 = resStr2.substr(0, resStr2.length - 1);
			}
			if (Float.length < 1) {
				return resStr1;
			} else {
				return resStr1 + '.' + resStr2;
			}
		}
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
		setTimeout(function() {
			$('#toast').hide();
		}, 2000);
	}
	

})()

