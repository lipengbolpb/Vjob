'use strict';
(function() {
	ini_wxshare(vge.fjmallappid);
	var args = vge.urlparse(location.href);
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
		console.log(jo)
		var orderHtml = '';
		$('#order_page .order-list .order_item').remove();
		if(jo.length<1){
			title_tip('尊敬的用户', '您还没有兑换过商品哦~', '我知道了');
			return false;
		}
		for(var i = 0; i < jo.length; i++) {
			if(state == jo[i].expressStatus) {
				orderHtml += `<div class="order_item" exchangeId="${jo[i].exchangeId}">
							<p class="time"><span>${jo[i].exchangeTime.split('.')[0]}</span><span class="state">${jo[i].expressStatus==0?'待发货':jo[i].expressStatus==1?'待收货':jo[i].expressStatus==2?'已完成':''}</span></p>
							<div class="order_msg">
								<div>
									<img src="${vge.fjmallimg}/DBTFJQHPlatform${jo[i].goodsUrl.split(',')[0]}" />
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
									<img src="${vge.fjmallimg}/DBTFJQHPlatform${jo[i].goodsUrl.split(',')[0]}" />
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