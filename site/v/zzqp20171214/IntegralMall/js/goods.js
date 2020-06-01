(function() {

	$('#content').load('class.html #list', function() {
		$('#table .class').addClass('checked').siblings().removeClass('checked');
		goodsListShow(sessionStorage.categoryParent, undefined);
		categoryList();

		function categoryList() { //获取菜单
			var javai = vge.zzqp + '/DBTHNQPInterface/vpointsShop/getAllCategoryType';
			var req = {};
			vge.callJApi(javai, req,
				function(jo) {
					if(jo.result.code == '0') {
						if(!jo.result.businessCode) {
							jo = jo.reply.categoryList;
							categoryListShow(jo);
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

		function categoryListShow(jo) {//显示菜单列表
			var i = 0,
				j = 0,
				html = '';
			for(i = 0; i < jo.length; i++) {
				html += `<div class="list_box ${jo[i].categoryType}" categoryParent='first'>
					<p class="list_1" categoryParent=${jo[i].categoryType}><i class="iconfont ${jo[i].categoryIco}"></i>${jo[i].categoryName}</p>`;
				for(j = 0; j < jo[i].childList.length; j++) {
					html += `<p class="list_2" categoryType=${jo[i].childList[j].categoryType}>${jo[i].childList[j].categoryName}</p>`;
				}
				html += `</div>`;
			}

			$('.menu').append(html);
			$('.list_box').each(function() {
				if($(this).attr('class').indexOf(sessionStorage.classname) !== -1) {
					$(this).addClass('cur');
				}
			})
			$('#list .menu').on('click', '.list_1', function() {
				$('.list_2').removeClass('cur');
				$(this).parent().addClass('cur').siblings().removeClass('cur');
				goodsListShow($(this).attr('categoryParent'));
				var leng = $(this).parent().children().size();
				$(this).parent().css('height', leng * 2.1 + 'rem');
				$('.list_box').each(function() {
					if($(this).attr('class').indexOf('cur') === -1) {
						$(this).css('height', '2.1rem');
					}
				})
			})
			$('#list .menu').on('click', '.list_2', function() {
				$(this).addClass('cur').siblings().removeClass('cur');
				goodsListShow(1, $(this).attr('categoryType'));
			})
		}

		function goodsListShow(a, b) {//根据菜单显示商品
			var htmlGoods = '',
				k = 0,
				goodsList = JSON.parse(sessionStorage.jo);
			if(b != undefined) {//根据二级菜单显示
				for(k = 0; k < goodsList.length; k++) {
					if(goodsList[k].categoryType == b) {
						htmlGoods += `<dl goodsid='${goodsList[k].goodsId}' exchangeType="${goodsList[k].exchangeType}">
								<dt><img src="${vge.zzqpimg}/DBTHNQPPlatform${goodsList[k].goodsUrl.split(',')[0]}" class="goods_pic"/></dt>
								<dd>
									<p class="name">${goodsList[k].goodsName}</p>`;
						if(goodsList[k].goodsRemains==0){
							htmlGoods += `<em goodsDiscount='1' class='activeflag'>已兑完</em>`;
						}else if(new Date()<rTime(goodsList[k].goodsStartTime)){//未开始
							htmlGoods += `<em goodsDiscount='1' class='activeflag'>未开始</em>`;
						}else if(new Date()>rTime(goodsList[k].goodsEndTime)){//已结束
							htmlGoods += `<em goodsDiscount='1' class='activeflag'>已结束</em>`;
						}else{
							htmlGoods += `<em goodsDiscount='${goodsList[k].goodsDiscount}'>${goodsList[k].goodsDiscount/10}折优惠</em>`;
						}
						htmlGoods += `<p class="price">兑换积分：<span>${goodsList[k].realVpoints}</span><del goodsDiscount='${goodsList[k].goodsDiscount}'>${goodsList[k].goodsVpoints}</del></p>
								</dd>
							</dl>`;
					}
				}
			} else {//根据一级菜单显示
				if(a == undefined || a == 'first') { //推荐
					for(k = 0; k < goodsList.length; k++) {
						if(goodsList[k].isCommend==0){
							htmlGoods += `<dl goodsid='${goodsList[k].goodsId}' exchangeType="${goodsList[k].exchangeType}">
								<dt><img src="${vge.zzqpimg}/DBTHNQPPlatform${goodsList[k].goodsUrl.split(',')[0]}" class="goods_pic"/></dt>
								<dd>
									<p class="name">${goodsList[k].goodsName}</p>`;
							if(goodsList[k].goodsRemains==0){
								htmlGoods += `<em goodsDiscount='1' class='activeflag'>已兑完</em>`;
							}else if(new Date()<rTime(goodsList[k].goodsStartTime)){//未开始
								htmlGoods += `<em goodsDiscount='1' class='activeflag'>未开始</em>`;
							}else if(new Date()>rTime(goodsList[k].goodsEndTime)){//已结束
								htmlGoods += `<em goodsDiscount='1' class='activeflag'>已结束</em>`;
							}else{
								htmlGoods += `<em goodsDiscount='${goodsList[k].goodsDiscount}'>${goodsList[k].goodsDiscount/10}折优惠</em>`;
							}
							htmlGoods += `<p class="price">兑换积分：<span>${goodsList[k].realVpoints}</span><del goodsDiscount='${goodsList[k].goodsDiscount}'>${goodsList[k].goodsVpoints}</del></p>
								</dd>
							</dl>`;
						}
					}
				} else {
					for(k = 0; k < goodsList.length; k++) {
						if(goodsList[k].categoryParent == a) { //按照一级品类
							htmlGoods += `<dl goodsid='${goodsList[k].goodsId}' exchangeType="${goodsList[k].exchangeType}">
									<dt><img src="${vge.zzqpimg}/DBTHNQPPlatform${goodsList[k].goodsUrl.split(',')[0]}" class="goods_pic"/></dt>
									<dd>
										<p class="name">${goodsList[k].goodsName}</p>`;
							if(goodsList[k].goodsRemains==0){
								htmlGoods += `<em goodsDiscount='1' class='activeflag'>已兑完</em>`;
							}else if(new Date()<rTime(goodsList[k].goodsStartTime)){//未开始
								htmlGoods += `<em goodsDiscount='1' class='activeflag'>未开始</em>`;
							}else if(new Date()>rTime(goodsList[k].goodsEndTime)){//已结束
								htmlGoods += `<em goodsDiscount='1' class='activeflag'>已结束</em>`;
							}else{
								htmlGoods += `<em goodsDiscount='${goodsList[k].goodsDiscount}'>${goodsList[k].goodsDiscount/10}折优惠</em>`;
							}
							htmlGoods += `<p class="price">兑换积分：<span>${goodsList[k].realVpoints}</span><del goodsDiscount='${goodsList[k].goodsDiscount}'>${goodsList[k].goodsVpoints}</del></p>
									</dd>
								</dl>`;
						}
					}
				}
			}
			htmlGoods = htmlGoods == '' ? '<img src="img/list_err.png" class="err_pic"/>' : htmlGoods;
			$('.goods').html(htmlGoods);
			$('em,del').each(function() {
				if($(this).attr('goodsdiscount') == 100) {
					$(this).css('visibility', 'hidden');
				}
			});
		}
		
		function rTime(str){
			var yy = str.split(' ')[0].split('-')[0],
				mm = str.split(' ')[0].split('-')[1]-1,
				dd = str.split(' ')[0].split('-')[2],
				hh = str.split(' ')[1].split(':')[0],
				mn = str.split(' ')[1].split(':')[1],
				ss = str.split(' ')[1].split(':')[2];
			
			return new Date(yy,mm,dd,hh,mn,ss);
		}
		
		$('#list div.goods').on('click', 'dl', function() {
			sessionStorage.goodsId = $(this).attr('goodsid');
			sessionStorage.exchangeType = $(this).attr('exchangeType');
			location.href = 'details.html';
		});
	});

//	$.ajaxSetup({
//		cache: true
//	});
})();