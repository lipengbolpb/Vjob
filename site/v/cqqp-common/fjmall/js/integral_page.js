'use strict';
(function() {
	ini_wxshare(vge.fjmallappid);
	var orderHtml = '',
		currentPage = 1,
		count = 20,
		integralHtml = '';
		
		$('.integral_list,.exchange_list').html('');

	$('.integral_nav p').on('click', function() {
		$(this).addClass('cur').siblings().removeClass('cur');
		if($(this).attr('content')=='integral'){
			$('.integral_list').css('display','block');
			$('.exchange_list').css('display','none');
		}else{
			$('.exchange_list').css('display','block');
			$('.integral_list').css('display','none');
		}
	})

	queryAllGiftsList(currentPage)

	function queryAllGiftsList(currentPage) { //获取兑换记录
		var javai = vge.fjmall + '/DBTFJQHInterface/gifts/queryAllBeerQuantityList';
		var req = {
			"openid": sessionStorage.openid,
			"currentPage": currentPage,
			"count": count
		};
		vge.callJApi(javai, req,
			function(jo) {
				if(jo.result.code == '0') {
					if(jo.result.businessCode == '0') {
						if(currentPage==1){
							$('.total_get span').html(transfNum(jo.reply.accountVpoints));
							$('.total_pay span').html(transfNum(jo.reply.exchangeVpoints));
						}
						var le = jo.reply.objList.length;
						if(le>0){
							integralHtml = '';
							$('.integral_list #getmore').remove();
							for(var j=0;j<le;j++){
								integralHtml += `<li>
									<div>
										<p>${jo.reply.objList[j].giftsName}</p>
										<span>${jo.reply.objList[j].earnTime.split('.')[0]}</span>
									</div>
									<div>
										<p>+${transfNum(jo.reply.objList[j].earnVpoints)}<span>积分</span></p>
									</div>
								</li>`;
							}
							integralHtml += '<p id="getmore">加载更多</p>';
							$('.integral_list').append(integralHtml);
							if(le<count){
								$('#getmore').html('仅显示近30天的记录');
							}else{
								$('#getmore').one('click',function(){
									currentPage++;
									queryAllGiftsList(currentPage);
								});
							}
							
						}else{
							integralHtml = '<p id="getmore">仅显示近30天的记录</p>';
							$('.integral_list').append(integralHtml);
						}
						
					} else {
						if(jo.result.businessCode==2){
							title_tip('尊敬的用户', '您还没有积分记录哦~', '我知道了');
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

	getOrderList();
	//兑换记录
	function getOrderList(state) { //获取兑换记录
		var javai = vge.fjmall + '/DBTFJQHInterface/vpoints/vpointsExchange/getExchangeRecord';
		var req = {
			"openid": sessionStorage.openid,
			"currentPage": 1,
			"count": 50,
			"companyKey": sessionStorage.companyKey,
			"expressStatus": 3 //物流状态：0未发货、1已发货、2已完成、3/null全部
		};
		vge.callJApi(javai, req,
			function(jo) {
				if(jo.result.code == '0') {
					if(!jo.result.businessCode) {
						jo = jo.reply;
						orderHtml = '';
						for(var i = 0; i < jo.length; i++) {
							orderHtml += `<li>
						<div>
							<div>
								<p>商品兑换</p>
							</div>
							<div>
								<p>订单号：${jo[i].exchangeId}</p>
								<span>时间：${jo[i].exchangeTime.split('.')[0]}</span>
							</div>
						</div>
						<div>
							<p>-${transfNum(jo[i].exchangeVpoints)}<span>积分</span></p>
						</div>
					</li>`;
						}
						$('.exchange_list').append(orderHtml);
					} else {
						if(jo.result.businessCode==300001){
							title_tip('尊敬的用户', '您还没有积分记录哦~', '我知道了');
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