'use strict';
(function() {
	ini_wxshare(vge.fjmallappid);
	var args = vge.urlparse(location.href);
	var onBtnMove = false;
	if(args.orderState){
		sessionStorage.orderState = args.orderState;
	}else if(sessionStorage.orderState){
		sessionStorage.orderState = sessionStorage.orderState;
	}else{
		sessionStorage.orderState = "send";
	}
	if(args.openid){
		sessionStorage.openid = args.openid;
	}
	if(sessionStorage.recommendGoods===undefined){
		getRecommendGoods();
	}
	
	// 返回首页按钮就拖拽功能
	$('.to-home-btn').click(function() {
		location.href = 'http://' + location.host + '/v/fjmall/index.html#/index';
	});
	$('.to-home-btn').on('touchstart', function (e) {
		var pointerData;
		onBtnMove = true;
		if (e.originalEvent.touches) {
			pointerData = e.originalEvent.touches[0];
		} else {
			pointerData = e;
		}
		var positionDiv = $(this).offset();
		var distenceX = pointerData.pageX - positionDiv.left;
		var distenceY = pointerData.pageY - positionDiv.top;
		$('#all-wrap').on('touchmove', function (e) {
			e.preventDefault();
			e.stopPropagation();
			var pointerData = e.originalEvent.touches[0];
			var x = pointerData.pageX - distenceX;
			var y = pointerData.pageY - distenceY;
			if (x < 0) {
				x = 0;
			} else if (x > $(document).width() - $('.to-home-btn').outerWidth(true)) {
				x = $(document).width() - $('.to-home-btn').outerWidth(true);
			}

			if (y < 0) {
				y = 0;
			} else if (y > $(document).height() - $('.to-home-btn').outerHeight(true)) {
				y = $(document).height() - $('.to-home-btn').outerHeight(true);
			}

			$('.to-home-btn').css({
				'left': x + 'px',
				'top': y + 'px'
			});
		});
		$('#all-wrap').on('touchend', function () {
			onBtnMove = false;
			$('#all-wrap').off('touchmove');
			// $('.scroll_box').off('touchmove');
		});
	});
	$('.scroll_box').on('touchmove', function (e) {
		if(onBtnMove) {
				e.preventDefault();
		}
	})
	// $('body').on('touchmove', function(e) {
	// 	e.preventDefault();
	// });

	$('.order_page_nav p').each(function(){
		if($(this).attr('state')==sessionStorage.orderState){
			return $(this).addClass('cur').siblings().removeClass('cur');
		}
	});
	console.log('orderState',sessionStorage.orderState)
	if(sessionStorage.orderState){
		if(sessionStorage.orderState=='send'){
			getOrderList(0);
		}else if(sessionStorage.orderState=='receive'){
			getOrderList(1);
		}else if(sessionStorage.orderState=='finish'){
			getOrderList(2);
		}else if(sessionStorage.orderState=='all'){
			getOrderList(4);
		}
		sessionStorage.removeItem('orderState');
	}else{
		getOrderList();
	}
	//订单
	function getOrderList(state) { //获取兑换记录
		var javai = vge.fjmall + '/DBTFJQHInterface/vpoints/vpointsExchange/getExchangeRecord';
		var req = {
			"openid": sessionStorage.openid,
			"currentPage": 1,
			"count": 20,
			"companyKey": sessionStorage.companyKey,
			"expressStatus": 4 //物流状态：0未发货、1已发货、2已完成、3、已撤单/null全部
		};
		vge.callJApi(javai, req,
			function(jo) {
				if(jo.result.code == '0') {
					if(!jo.result.businessCode) {
						jo = jo.reply;
						if(state){
							showOrderList(jo, state);
						}else{
							showOrderList(jo, 0);
						}
						sessionStorage.orderlist = JSON.stringify(jo);
						if (jo && !jo.length) {
							title_tip('尊敬的用户', '您还没有兑换过商品哦~', '我知道了');
						}
					} else {
						if(jo.result.businessCode==300001){
							title_tip('尊敬的用户', '您还没有兑换过商品哦~', '我知道了');
						}else{
							title_tip('尊敬的用户', jo.result.msg, '我知道了');
						}
						
					}
				} else if(jo.result.code == '-1') {
					title_tip('尊敬的用户', jo.result.msg, '我知道了');
				} else { //code!='0'
					title_tip('尊敬的用户', jo.result.msg, '我知道了');
				}
			});
	}

	function showOrderList(jo, state) {
		// console.log(jo)
		$('.no-order-tip').css('display', 'none');
		var orderHtml = '';
		$('#order_page .order-list .order_item').remove();
		if(jo.length<1){
			// title_tip('尊敬的用户', '您还没有兑换过商品哦~', '我知道了');
			$('.no-order-tip').css('display', 'block');
			return false;
		}
		for(var i = 0; i < jo.length; i++) {
			var imgUrl = ''
			try {
				if (jo[i].goodsUrl.indexOf('http') !== -1) {
					imgUrl = jo[i].goodsUrl
				} else {
					imgUrl = `http://img.vjifen.com:8000/images/vma/${jo[i].goodsUrl.split(',')[0]}`
				}
			} catch (e) {
				// console.log('商品图片解析错误');
			}
			if(state == jo[i].expressStatus) {
				orderHtml += `<div class="order_item" exchangeId="${jo[i].exchangeId}">
							<p class="time"><span>${jo[i].exchangeTime.split('.')[0]}</span><span class="state">${jo[i].expressStatus==0?'待发货':jo[i].expressStatus==1?'待收货':jo[i].expressStatus==2?'已完成':''}</span></p>
							<div class="order_msg">
								<div>
									<img src="${imgUrl}" />
								</div>
								<div>
									<p class="goodsname">${jo[i].goodsName}</p>
									<p class="price">积分：<span>${transfNum(jo[i].exchangeVpoints)}</span></p>
									<p class="btn" style="display:${jo[i].expressStatus==1?'block':'none'}" exchangeId="${jo[i].exchangeId}">确认收货</p>
								</div>
								<div>
									<p>×${jo[i].exchangeNum}</p>
								</div>
							</div>
						</div>`;
			} else if(state == 4) {
				orderHtml += `<div class="order_item" exchangeId="${jo[i].exchangeId}">
							<p class="time"><span>${jo[i].exchangeTime.split('.')[0]}</span><span class="state">${jo[i].expressStatus==0?'待发货':jo[i].expressStatus==1?'待收货':jo[i].expressStatus==2?'已完成':jo[i].expressStatus==3?'已撤单':''}</span></p>
							<div class="order_msg">
								<div>
									<img src="${imgUrl}" />
								</div>
								<div>
									<p class="goodsname">${jo[i].goodsName}</p>
									<p class="price">积分：<span>${transfNum(jo[i].exchangeVpoints)}</span></p>
									<p class="btn" style="display:${jo[i].expressStatus==1?'block':'none'}" exchangeId="${jo[i].exchangeId}">确认收货</p>
								</div>
								<div>
									<p>×${jo[i].exchangeNum}</p>
								</div>
							</div>
						</div>`;
			}

		}
		if (Number(orderHtml) === 0) $('.no-order-tip').css('display', 'block');
		$('#order_page .order-list').append(orderHtml);
		$('.btn').on('click',function(e){
			e.stopPropagation();
			$('.btn').unbind();
			sessionStorage.exchangeId = $(this).attr('exchangeId');
			expressSign();
		})
		$('.order_item').on('click',function(e){
			e.stopPropagation();
			sessionStorage.exchangeId = $(this).attr('exchangeId');
			location.href = 'order_details.html';
		})
		
	}

	$('.order_page_nav p').on('click', function() {
		$(this).addClass('cur').siblings().removeClass('cur');
		if($(this).attr('state') == 'all') {
			showOrderList(JSON.parse(sessionStorage.orderlist), 4);
		} else if($(this).attr('state') == 'send') {
			showOrderList(JSON.parse(sessionStorage.orderlist), 0);
		} else if($(this).attr('state') == 'receive') {
			showOrderList(JSON.parse(sessionStorage.orderlist), 1);
		} else if($(this).attr('state') == 'finish') {
			showOrderList(JSON.parse(sessionStorage.orderlist), 2);
		}
	})
	
	
	function expressSign(){
		var javai = vge.fjmall + '/DBTFJQHInterface/vpoints/vpointsExchange/expressSign';
		var req = {
			"openid": sessionStorage.openid,
			"exchangeId": sessionStorage.exchangeId
		};
		vge.callJApi(javai, req,
			function(jo) {
				$('.btn').on('click',function(){
					$('.btn').unbind();
					sessionStorage.exchangeId = $(this).attr('exchangeId');
					expressSign();
				})
				if(jo.result.code == '0') {
					if(jo.result.businessCode==0) {
						getOrderList(2);
						$('.order_page_nav p').each(function(){
							if($(this).attr('state')=='finish'){
								return $(this).addClass('cur').siblings().removeClass('cur');
							}
						});
						title_tip('尊敬的用户', jo.result.msg, '我知道了');
					} else {
						title_tip('尊敬的用户', jo.result.msg, '我知道了');
					}
				} else if(jo.result.code == '-1') {
					title_tip('尊敬的用户', jo.result.msg, '我知道了');
				} else { //code!='0'
					title_tip('尊敬的用户', jo.result.msg, '我知道了');
				}
			});
	}
	function reload(){
		location.reload();
	}
	function getRecommendGoods() { //获取推荐
		var javai = vge.fjmall + '/DBTFJQHInterface/vpoints/vpointsShop/getShopGoods';
		var req = {
			"currentPage": 1,
			"count": 50,
			"companyKey": sessionStorage.companyKey,
			"isCommend": 0 //推荐
		};
		vge.callJApi(javai, req,
			function(jo) {
				if(jo.result.code == '0') {
					if(!jo.result.businessCode) {
						jo = jo.reply;
						sessionStorage.recommendGoods = JSON.stringify(jo);
					} else {
						title_tip('尊敬的用户', jo.result.msg, '我知道了');
					}
				} else if(jo.result.code == '-1') {
					title_tip('尊敬的用户', jo.result.msg, '我知道了');
				} else { //code!='0'
					title_tip('尊敬的用户', jo.result.msg, '我知道了');
				}
			});
	}
	if(sessionStorage.jo===undefined){
		getShopGoods();
	}
	
	function getShopGoods() { //获取商品数据
		var javai = vge.fjmall + '/DBTFJQHInterface/vpoints/vpointsShop/getShopGoodsHasVpoints';
		var req = {
			"openid": sessionStorage.openid,
			"currentPage": 1,
			"count": 70,
			"companyKey": sessionStorage.companyKey
		};
		vge.callJApi(javai, req,
			function(jo) {
				$('#mall .loading').remove();
				if(jo.result.code == '0') {
					if(!jo.result.businessCode) {
						if(jo.reply.goodsAry.length>0){
							sessionStorage.jo = JSON.stringify(jo.reply.goodsAry);
						}else{
							title_tip('尊敬的用户', jo.result.msg, '我知道了');
						}
					} else {
						title_tip('尊敬的用户', jo.result.msg, '我知道了');
					}
				} else if(jo.result.code == '-1') {
					title_tip('尊敬的用户', jo.result.msg, '我知道了');
				} else { //code!='0'
					title_tip('尊敬的用户', jo.result.msg, '我知道了');
				}
			});
	}
	
	function transfNum(num) {
		if(num < 1000) {
			return num;
		} else {
			var str = num + '',
				reg = /\*/g;
			var arr = '',
				Int = '',
				Float = '',
				resStr1 = [],
				resStr2 = [];
			if(str.indexOf(".") !== -1) {
				arr = str.split(".");
				Int = arr[0].split('');
				Float = arr[1].split('');
			} else {
				Int = str.split('');
			}
			Int = Int.reverse();
			for(var i = 0; i < Int.length; i++) {
				resStr1.push(Int[i]);
				if(i % 3 === 2) {
					resStr1.push(',');
				}
			}
			resStr1 = resStr1.reverse().join('*');
			resStr1 = resStr1.replace(reg, '');
			if(resStr1[0] == ',') {
				resStr1 = resStr1.substr(1, resStr1.length);
			}
			for(var j = 0; j < Float.length; j++) {
				resStr2.push(Float[j]);
				if(j % 3 === 2) {
					resStr2.push(',');
				}
			}
			resStr2 = resStr2.join('*');
			resStr2 = resStr2.replace(reg, '');
			if(resStr2[resStr2.length - 1] == ',') {
				resStr2 = resStr2.substr(0, resStr2.length - 1);
			}
			if(Float.length < 1) {
				return resStr1;
			} else {
				return resStr1 + '.' + resStr2;
			}
		}
	}

})()