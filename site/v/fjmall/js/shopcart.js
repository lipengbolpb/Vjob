'use strtic';
(function(){
	var recommendGoods = JSON.parse(sessionStorage.recommendGoods),
		schtml = '',
		rchtml = '',
		num = 0,
		sumnum = 0,
		isSelectedAll = true,
		isDelete = true,
		cartorder = [],
		cartidlist = [],
		randomlist = [];
	
	var urltimer = null;
	clearInterval(urltimer);
	sessionStorage.removeItem('url');
	urltimer = setInterval(function(){
		if(sessionStorage.url){
			var url = sessionStorage.url;
			sessionStorage.removeItem('url');
			location.replace(url);
		}
	},1000);
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
	var shopcart = cookieUtil.getCookie("car") ? JSON.parse(cookieUtil.getCookie("car")) : [];
	sessionStorage.shopcart = JSON.stringify(shopcart);
	for(var i = 0;i<shopcart.length;i++){//购物车商品id
		cartidlist+=shopcart[i].g_id;
		if(i<shopcart.length-1){
			cartidlist+=',';
		}
	}

	if (shopcart.length) {
		getShopCart();
	} else {
		$('.edit').css('display', 'none');
		$('.no-goods-wrap').css('display', 'block')
	}
	console.log('shopcart', shopcart);
	
			
	
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
	function getShopCart() { //获取积分好礼
		var javai = vge.fjmall + '/DBTFJQHInterface/vpoints/vpointsShop/getShopGoodsByIds';
		var req = {
			"goodsIds": cartidlist
		};
		vge.callJApi(javai, req,
			function(jo) {
				if(jo.result.code == '0') {
					if(!jo.result.businessCode) {
						jo = jo.reply;
						showShopCart(jo);
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
	
	function showShopCart(jo){
		var l = jo.length;
		schtml = '';
		if(l>0){
			for(var i = 0; i < l; i++) {
				if(jo[i].shopCartStatus==0){
					num++;
				}
				schtml += `<div class="order_msg ${jo[i].shopCartStatus==0?'fff':'eee'}" goodsid="${jo[i].goodsId}" style="background:${jo[i].shopCartStatus==0?'#fff':'#fff'}" index="${i}">
						<div class="selectshopcart" shopcartstatus=${jo[i].shopCartStatus}>
							<i class="${jo[i].shopCartStatus==0?'selected':''}"></i>
							<div class="carpic-box">
								<p class="carpic-mark"  style="display:${jo[i].shopCartStatus==0?'none':'block'}">${jo[i].shopCartStatus==1?'暂停兑换':jo[i].shopCartStatus==2?'无货':'默认状态'}</p>
								<img src="${handleImgUrl(jo[i].goodsUrl)}" />
							</div>
						</div>
						<div>
							<p class="goodsname">${jo[i].goodsShortName}</p>
							<div>
								<p class="price" price="${jo[i].realVpoints}">积分:<span>${transfNum(jo[i].realVpoints)}</span></p>
								<div class="numcon">
									<p class="reduce" shopcartstatus=${jo[i].shopCartStatus} index="${i}">-</p>
									<input type="text" name="" class="addgoods" value="${shopcart[i].num}" readonly/>
									<p class="add" shopcartstatus=${jo[i].shopCartStatus} index="${i}">+</p>
								</div>
							</div>
						</div>
					</div>`;
			}
		}else{
			schtml = '';
		}
		$('#shopcart_page .spcartlist').append(schtml);
		$('.settle-accounts .settle span').html(num);
		$('.shopcartbtn i').html(l);
		calculator();
		$('#shopcart_page .spcartlist .order_msg').on('click',function(e){
			if($(this).attr('class').indexOf('eee')!=-1){
				return false;
			}
			sessionStorage.goodsId = $(this).attr('goodsid');
			sessionStorage.url = location.href;
			location.href = 'http://'+location.host+'/v/fjmall/goods_details.html';
		});
		
		$('#shopcart_page .spcartlist .selectshopcart').on('click',function(e){//选择商品
			e.stopPropagation();
			if(!isDelete){
				$(this).children('i').toggleClass('selected');
				isSelectedAll = true;
				$('.selectshopcart').children('i').each(function(){
					if($(this).attr('class')!='selected'){//未全选
						isSelectedAll = false;
						return false;
					}
				});
			}else{
				if($(this).attr('shopCartStatus')!=0){
					return false;
				}
				$(this).children('i').toggleClass('selected');
				isSelectedAll = true;
				$('.selectshopcart').children('i').each(function(){
					if($(this).attr('class')!='selected'&&$(this).parent().attr('shopcartstatus')==0){//未全选
						isSelectedAll = false;
						return false;
					}
				});
			}
			if(isSelectedAll){
				$('.selectall').toggleClass('isSelected');
				selectAll(isSelectedAll);
			}else{
				$('.selectall').removeClass('isSelected');
				calculator();
			}
		});
		$('#shopcart_page .spcartlist .reduce').on('click',function(e){//减
			e.stopPropagation();
			var _this = this;
			if($(this).attr('shopCartStatus')!=0){
				return false;
			}
			var val = Number($(this).siblings('input').val());
			val--;
			if(val<1){
				// tit,con,btn_left,url_left,btn_rgh,url_rgh,cb
				chose_tip('提示','是否删除商品？','取消',undefined,'确认',undefined,function(e){
					if(e){
						shopcart.splice($('#shopcart_page .spcartlist .reduce').index(_this),1);
						sessionStorage.shopcart = JSON.stringify(shopcart);
						cookieUtil.setCookie("car", JSON.stringify(shopcart),365);
						$(_this).parents('.order_msg').remove();
						num=0;
						$('.selectshopcart').each(function(){
							if($(this).attr('shopcartstatus')==0){
								num++;
								$(this).children('i').addClass('selected');
							}
						});
						$('.settle-accounts .settle span').html(num);
						$('.shopcartbtn i').html($('.shopcartbtn i').html()-1);
					}else{
						val =1;
						$(_this).siblings('input').val(val);
					}
				})
			}else{
				shopcart[$('#shopcart_page .spcartlist .reduce').index(this)].num = val;
				// console.log($('#shopcart_page .spcartlist .reduce').index(this));//当前下标
				sessionStorage.shopcart = JSON.stringify(shopcart);
				cookieUtil.setCookie("car", JSON.stringify(shopcart),365);
			}
			$(this).siblings('input').val(val);
			calculator();
		});
		$('#shopcart_page .spcartlist .add').on('click',function(e){//加
			e.stopPropagation();
			if($(this).attr('shopCartStatus')!=0){
				return false;
			}
			var val = Number($(this).siblings('input').val());
			val++;
			$(this).siblings('input').val(val);
			shopcart[$('#shopcart_page .spcartlist .add').index(this)].num = val;
			sessionStorage.shopcart = JSON.stringify(shopcart);
			cookieUtil.setCookie("car", JSON.stringify(shopcart),365);
			calculator();
		});
	}
// 	function deleteItem(item){
// 		var idx = -1;
// 		for (var i = 0; i < shopcart.length; i++) {
// 			if(shopcart[i].g_id==item){
// 				idx = i;
// 				break ;
// 			}
// 		}
// 		if(idx!=-1){
// 			shopcart.splice(idx,1);
// 		}
// 	}
	
	function showRecommend(jo){
		var le = jo.length;
		rchtml = '';
		if(le<5){
			if(le<1){
				$('.rec-title').css('display','none');
			}else{
				$('.rec-title').css('display','block');
			}
			rchtml = createGoodsListHtml(jo);
		}else{
			// 将所有推荐随机排序然后截取前四个
			var neededData = jo.sort(function(a, b) {
				return Math.random() - 0.5;
			}).slice(0,4)
			
			rchtml = createGoodsListHtml(neededData);
		}
		$('.recommend .rec-list').html('');
		$('.recommend .rec-list').append(rchtml);
		$('#shopcart_page .goods-item').click(checkGoodsDetail)
	}
	
	//编辑购物车
	$('.edit').on('click',function(){
		if(isDelete){//删除状态
			$('.settle').css('display','none');
			$('.delete').css('display','block');
			$('.edit').html('完成');
			$('#heji').css('display', 'none');
			// $('.order_msg.eee').css('background','#fff');
		}else{
			$('.settle').css('display','block');
			$('.delete').css('display','none');
			$('.edit').html('编辑');
			$('#heji').css('display', '');
			// // $('.order_msg.eee').css('background','#eee');
		}
		isSelectedAll = false;
		$('.selectshopcart').children(i).removeClass('selected');
		$('.selectall').removeClass('isSelected');
		$('.settle-accounts i').html(0);
		$('.settle-accounts .settle span').html(0);
		isDelete = !isDelete;
	});
	$('.delete').on('click',function(e){
		e.stopPropagation();
		deletecart(true);
		isSelectedAll = false;
		$('.selectall').removeClass('isSelected');
		$('.settle-accounts i').html(0);

		if ($('.order_msg').length === 0) {
			$('.edit').css('display', 'none');
			$('.no-goods-wrap').css('display', 'block')
		}
	})
	
	function deletecart(confirm){
		$('.selectshopcart').children(i).each(function(){
			if($(this).attr('class')=='selected'){
				$(this).parents('.order_msg ').remove();//假删除
			}
		});
		$('.shopcartbtn i').html($('.order_msg ').size());
		shopcart = [];
		$('.order_msg ').each(function(){
			var cartGoods = {
				g_id:$(this).attr('goodsid'),
				num:$(this).find('input').val()
			};
			shopcart.push(cartGoods);
		});
		sessionStorage.shopcart = JSON.stringify(shopcart);
		if(confirm){//真删除
			cookieUtil.setCookie("car", JSON.stringify(shopcart),365);
		}
	}
	
	$('.selectall_box').on('click',function(e){//全选
		e.stopPropagation();
		$('.selectall').toggleClass('isSelected');
		isSelectedAll = !isSelectedAll;
		selectAll(isSelectedAll);
	})
	
	function selectAll(){
		num=0;
		if(isSelectedAll){
			$('.selectshopcart').each(function(){
				if(isDelete){
					if($(this).attr('shopcartstatus')==0){
						num++;
						$(this).children('i').addClass('selected');
					}
				}else{
					$(this).children('i').addClass('selected');
				}
			});
		}else{
			$('.selectshopcart').children(i).removeClass('selected');
			$('.settle-accounts i').html(0);
		}
		$('.settle-accounts .settle span').html(num);
		calculator();
	}
	
	function calculator(){//计算总价
		sumnum = 0;
		$('.order_msg').each(function(){
			if($(this).find('i').attr('class')&&$(this).find('i').attr('class')=='selected'){
				sumnum += (Number($(this).find('input').val())*Number($(this).find('.price').attr('price')));
			}
		});
		$('.settle-accounts i').html(transfNum(sumnum));
		calculatorNum();
	}
	// 计算数量
	function calculatorNum() {
		var selectNumber = 0;
		$('.selectshopcart').children('i').each(function () {
			if ($(this).hasClass('selected')) {
				selectNumber++;
			}
		});
		$('.settle-accounts .settle span').html(selectNumber);
	}
$('#point-tip .close-img').click(function () {
	$('#point-tip').css('display', 'none');
});
	// 下单
	$('.settle').on('click',function(e){
		e.stopPropagation();
		if(Number($('.settle-accounts .settle span').html())==0){
			return title_tip('尊敬的用户', '您还未选择商品哦~', '我知道了');
		}else if(sumnum>Number(sessionStorage.surplusVpoints)){
			// return title_tip('尊敬的用户', '积分不足！', '我知道了');
			return $('#point-tip').css('display', 'block');
		}else{
			$('.order_msg.fff').find('i').each(function(){
				if($(this).attr('class')=='selected'){
					var cartorderitem = {
						goodsId:$(this).parents('.order_msg').attr('goodsid'),
						exchangeNum:$(this).parents('.order_msg').find('input').val(),
						realVpoints:$(this).parents('.order_msg').find('.price').attr('price'),
						pic:$(this).parents('.order_msg').find('img').attr('src'),
						goodsShortName:$(this).parents('.order_msg').find('.goodsname').html()
					};
					cartorder.unshift(cartorderitem);
				}
			})
			sessionStorage.removeItem('goodsId');
			sessionStorage.cartorder = JSON.stringify(cartorder);
			deletecart();//先修改sessionStorage
			sessionStorage.url = location.href;
			location.href = 'http://'+location.host+'/v/fjmall/goods_details.html';
		}
	})
	
	// 生成单一类型商品列表html; count 数量限制
	function createGoodsListHtml(goodsList, count) {
		var htmlStr = '<div class="goods-list">'
		$.each(goodsList, function (index, item) {
			if (index >= count) return
			var imgUrl = ''
			try {
				if (item.goodsUrl.indexOf('http') !== -1) {
					imgUrl = item.goodsUrl
				} else {
					imgUrl = `http://img.vjifen.com:8000/images/vma/${item.goodsUrl.split(',')[0]}`
				}
			} catch (e) {
				// console.log('商品图片解析错误');
			}
			htmlStr += `<div class="goods-item"  goodsid="${item.goodsId}" exchangeType="${item.exchangeType}">
										<div class="goods-block">
											<img src="${imgUrl}" alt="" class="goods-img">
										</div>
										<div class="goods-name">${item.goodsShortName}</div>
										<div class="jifen-price">
											<span class="price-num">${transfNum(item.realVpoints)}</span>
											<span>积分</span>
										</div>
									</div>`;
		});
		htmlStr += '</div>'
		return htmlStr
	}
	function checkGoodsDetail() {
		sessionStorage.goodsId = $(this).attr('goodsid');
		sessionStorage.addgoods = 1;
		sessionStorage.exchangeType = $(this).attr('exchangeType');
		sessionStorage.removeItem('cartorder');
		location.href = 'http://' + location.host + '/v/fjmall/goods_details.html';
		sessionStorage.url = location.href;
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
	
	
	function handleImgUrl(originImgUrl, imgIndex) {
		var imgUrl = ''
		imgIndex = imgIndex || 0
		try {
			if (originImgUrl.indexOf('http') !== -1) {
				imgUrl = originImgUrl
			} else {
				var imgs = originImgUrl.split(',')
				imgUrl = `http://img.vjifen.com:8000/images/vma/${imgs[imgIndex] || imgs[0]}`
			}
		} catch (e) {
			// console.log('商品图片解析错误');
		}
		return imgUrl
	}
	
})()