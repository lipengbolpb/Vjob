'use strtic';
(function() {
	ini_wxshare(vge.fjmallappid);
	var timer1 = null,
		le = 0,
		currentPage = 1,
		count = 20,
		w = $(document).width();
	
	var urltimer = null;
	clearInterval(urltimer);
	// urltimer = setInterval(function(){
	// 	if(sessionStorage.url){
	// 		var url = sessionStorage.url;
	// 		sessionStorage.removeItem('url');
	// 		location.replace(url);
	// 	}
	// },1000);
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
	sessionStorage.shopcart = JSON.stringify(cartArr);
	$('.shopcartbtn i').html(cartArr.length);

	$('#content .goods-list,#hot ul').html('');
	sessionStorage.removeItem('jo');

	//接口数据展示
	var jo = {},
		i = 0,
		k = 0,
		reply = {},
		html = '';
	getShopGoods();
	getGoodsPresent();
	getRecommendGoods();

	function getShopGoods() { //获取商品数据
		var javai = vge.fjmall + '/DBTFJQHInterface/vpoints/vpointsShop/getShopGoodsHasVpoints';
		
		var req = {
			"openid": sessionStorage.openid,
			"currentPage": currentPage,
			"count": count,
			"companyKey": sessionStorage.companyKey
		};
		vge.callJApi(javai, req,
			function(jo) {
				$('#mall .loading').remove();
				if(jo.result.code == '0') {
					if(!jo.result.businessCode) {
						// debugger
						if (jo.reply.loveGoods || jo.reply.categoryRecommend || jo.reply.presentGoods) {
							// document.getElementById("mall").addEventListener('scroll',scrollEevnt,false); 
							if(sessionStorage.jo){
								var goodlist = JSON.parse(sessionStorage.jo) || [];
								for(var k=0;k<jo.reply.loveGoods.length;k++){
									goodlist.push(jo.reply.loveGoods[k]);
								}
								sessionStorage.jo = JSON.stringify(goodlist);
							}else{
								sessionStorage.jo = JSON.stringify(jo.reply.loveGoods || []);
							}
							if (!!jo.reply.presentGoods.length) {
								$('#hot-goods-box .look-more').before(createGoodsListHtml(jo.reply.presentGoods, 3));
							} else {
								$('#hot-goods-box').css('display', 'none');
							}
							if (jo.reply.categoryRecommend) {
								var sliderHtml = createAllTypeHtml(jo.reply.categoryRecommend);
								if (Number(sliderHtml) === 0) {
									$('#title-bg').css('display', 'none');
									$('.swiperlider-wrap').css('display', 'none');
									$('.slider.to-look-more').css('display', 'none');
								} else {
									$('.sw-slides').append(sliderHtml);
									if (jo.reply.categoryRecommend.length !== 1) {
										$('.swipslider').swipeslider({
											transitionDuration: 600,
											autoPlayTimeout: 4000,
											prevNextButtons: false,
											sliderHeight: '21rem',
											sliderOffset: 60
										});
									} else {
										$('.swipslider').css('height', '11rem');
									}
									// 监听是否在当前页，并置为已读
									document.addEventListener("visibilitychange", function () {
										if (!document.hidden) { //处于当前页面
											this.location.reload()
										}
									});
									setTimeout(function () { //data-categoryType="${item.categoryType}"
										var listData = jo.reply.categoryRecommend;
										$('.sw-bullet li').each(function (index, item) {
											$(item).attr('data-categoryType', listData[index].categoryType);
										})
									}, 100);
								}
								
							}
							// 将categoryRecommend, presentGoods也存起来
							var jo_type_index = [].concat(jo.reply.presentGoods);
							$.each(jo.reply.categoryRecommend, function (index, item) {
								jo_type_index = jo_type_index.concat(item.goodsList)
							})
							sessionStorage.setItem('jo_type_index', JSON.stringify(jo_type_index))

							if (jo.reply.loveGoods && !!jo.reply.loveGoods.length) {
								$('#might-like').append(createGoodsListHtml(jo.reply.loveGoods));
							} else {
								$('#might-like').css('display', 'none');
							}
							
							// showGoods(jo.reply.loveGoods);
							$('#mall .goods-item').click(checkGoodsDetail)
							$('.hot-look-more').click(function() {
								location.href = 'http://' + location.host + '/v/fjmall/list.html?goodPresentFlag=0';
							})
							$('.to-look-more').click(function () {
								var categoryType = $(this).attr('data-categoryType') || $('.sw-bullet li.active').attr('data-categoryType');
								// location.replace(location.href.split('#')[0] + targetHash);
								location.href = 'http://' + location.host + '/v/fjmall/index.html?categoryType=' + categoryType + '#/type';
							})
	
						}else{
							// $('#mall').append('<p class="end">已经触及我的底线啦~</p>');
						}
						if(currentPage==1){
							$('#jifen .jifen-number').text(transfNum(jo.reply.surplusVpoints === undefined ? 0 : jo.reply.surplusVpoints));
							sessionStorage.surplusVpoints = jo.reply.surplusVpoints === undefined ? 0 : jo.reply.surplusVpoints;
							console.log('缺货提醒', jo.reply.pauseExchangeTips);
							if(jo.reply.pauseExchangeTips != undefined) {
								if(location.href.lastIndexOf('/index') != -1) {
									title_tip('尊敬的用户', jo.reply.pauseExchangeTips, '我知道了');
								}
							}
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

	function getGoodsPresent() { //获取积分好礼
		var javai = vge.fjmall + '/DBTFJQHInterface/vpoints/vpointsShop/getShopGoods';
		var req = {
			"currentPage": 1,
			"count": 50,
			"companyKey": sessionStorage.companyKey,
			"goodPresentFlag": 0 //积分好礼
		};
		vge.callJApi(javai, req,
			function(jo) {
				if(jo.result.code == '0') {
					if(!jo.result.businessCode) {
						jo = jo.reply;
						showGoodsPresent(jo);
						sessionStorage.goodsPresent = JSON.stringify(jo);
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
	
	function showGoodsPresent(jo) {
		le = jo.length > 50 ? 50 : jo.length,
			hothtml = '';
		sessionStorage.hotlist = le;
		for(k = 0; k < le; k++) {
			var picsrc = '';
			if(jo[k].goodsUrl.split(',')[2]) {
				picsrc = jo[k].goodsUrl.split(',')[2];
			} else {
				picsrc = jo[k].goodsUrl.split(',')[1];
			}
			hothtml += `<li goodsid="${jo[k].goodsId}" exchangeType="${jo[k].exchangeType}">
								<span class="price">${transfNum(jo[k].realVpoints)}积分</span>
								<img src="${handleImgUrl(picsrc)}" alt="">
								<p class="goodsname">${jo[k].goodsShortName}</p>
							</li>`;
		}
		if(le == 0) {
			hothtml = '';
			$('#hot .h3-title').css('display', 'none');
		}
		$('#hot ul').css('width', le * 6.55 + 'rem');
		$('#hot>div>ul').append(hothtml);
		k = 0;
		$('#hot>div>ul li').on('click', function(e) { //商品点击
			e.stopPropagation();
			sessionStorage.addgoods = 1;
			sessionStorage.goodsId = $(this).attr('goodsid');
			sessionStorage.exchangeType = $(this).attr('exchangeType');
			sessionStorage.removeItem('cartorder');
			location.href = 'http://'+location.host+'/v/fjmall/goods_details.html';
			sessionStorage.url = location.href;
		});
	}

	// 生成单一类型商品列表html; count 数量限制
	function createGoodsListHtml(goodsList, count) {
		var htmlStr = '<div class="goods-list">'
		$.each(goodsList, function (index, item) {
			if (index >= count) return 
			var imgUrl = handleImgUrl(item.goodsUrl);
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
	// 生成各分类的商品列表
	function createAllTypeHtml(listData) {
		var htmlStr = '';
		$.each(listData, function(index, item) {
			if (!item.goodsList || !item.goodsList.length) return
			htmlStr += `<div class="common-type-box sw-slide">
										<!-- 分类标题 -->
										<p class="list-title">
											<img src="./img/list-title-top.png" alt="" class="decorate">
											<span class = "title-text"> ${item.categoryName}</span>
										</p>`;

				htmlStr += createGoodsListHtml(item.goodsList);
				htmlStr += '</div>'
				// htmlStr += `<div class="to-look-more" data-categoryType="${item.categoryType}">
				// 								<span class="">查看更多</span>
				// 								<span class="text-arrow-right">>></span>
				// 							</div>
				// 						</div>`
		});
		return htmlStr;
	}

	function checkGoodsDetail() {
		sessionStorage.goodsId = $(this).attr('goodsid');
		sessionStorage.addgoods = 1;
		sessionStorage.exchangeType = $(this).attr('exchangeType');
		sessionStorage.removeItem('cartorder');
		location.href = 'http://' + location.host + '/v/fjmall/goods_details.html';
		sessionStorage.url = location.href;
	}

	function showGoods(jo) {
		//数据填充
		var l = jo.length;
		html = '';
		if(l>0){
			for(var i = 0; i < l; i++) {
			html += `<div class="goods-box" goodsid="${jo[i].goodsId}" exchangeType="${jo[i].exchangeType}">
						<img src="${handleImgUrl(jo[i].goodsUrl)}" alt="">
						<p class="goodsname">${jo[i].goodsShortName}</p>
						<p class="price"><i>${transfNum(jo[i].realVpoints)}</i>积分</p>
					</div>`;
			}
		}else{
			html = '';
		}
		$('#content .goods-list').append(html);
		$('#content .goods-list>div').on('click', function() { //商品点击
			sessionStorage.goodsId = $(this).attr('goodsid');
			sessionStorage.addgoods = 1;
			sessionStorage.exchangeType = $(this).attr('exchangeType');
			sessionStorage.removeItem('cartorder');
			location.href = 'http://'+location.host+'/v/fjmall/goods_details.html';
			sessionStorage.url = location.href;
		});
	}

	function rTime(str) {
		var yy = str.split(' ')[0].split('-')[0],
			mm = str.split(' ')[0].split('-')[1] - 1,
			dd = str.split(' ')[0].split('-')[2],
			hh = str.split(' ')[1].split(':')[0],
			mn = str.split(' ')[1].split(':')[1],
			ss = str.split(' ')[1].split(':')[2];
		return new Date(yy, mm, dd, hh, mn, ss);
	}

	// lbtInit();

	function lbtInit() {
		//轮播banner	
		var picUrl = 'img/banner.png?v=1', //picUrl = jo.goodsUrl,
			picArr = [],
			timer = null;
		if(picUrl[picUrl.length - 1] == ',') {
			picUrl = picUrl.substring(0, picUrl.length - 2);
		}
		picArr = picUrl.split(',');
		$('.pic_box,.dot').html('');
		//$('.pic_box').append(`<li><img src="${vge.csqp}/DBTHuNanQPPlatform${picArr[picArr.length-1]}" /></li>`);
		$('.pic_box').append(`<li><img src="${picArr[picArr.length-1]}" /></li>`);
		for(var i = 0; i < picArr.length; i++) {
			//$('.pic_box').append(`<li><img src="${vge.csqp}/DBTHuNanQPPlatform${picArr[i]}" /></li>`);
			$('.pic_box').append(`<li><img src="${picArr[i]}" /></li>`);
			$('.dot').append('<li></li>');
		}
		//$('.pic_box').append(`<li><img src="${vge.csqp}/DBTHuNanQPPlatform${picArr[0]}" /></li>`);
		$('.pic_box').append(`<li><img src="${picArr[0]}" /></li>`);
		$('.dot li').eq(0).addClass('cur');
		if($('.dot li').size() < 2) {
			$('.dot').css('visibility', 'hidden');
		}
		//初始化轮播图
		var newIndex = 1;
		var lbtlength = $('.pic_box li').size();
		$('#banner ul.pic_box').css({
			'transition': 'all 0s linear',
			'margin-left': -w + 'px',
			'width': w * lbtlength + 'px'
		});
		$('#banner ul.pic_box li').css({
			'width': w + 'px'
		});
		if(lbtlength > 3) {
			clearInterval(timer);
			timer = setInterval(function() {
				lbt(newIndex, lbtlength);
			}, 5000);
			touchInit();
		}

		//轮播图生成

		function lbt(idx, length, abs) {
			if(length < 4) {
				return;
			}
			++idx;
			if(idx >= length - 2) {
				$('#banner ul.dot li').eq(0).addClass('cur').siblings().removeClass('cur');
			}
			if(idx >= length) {
				idx = 1;
				$('#banner ul.pic_box').css({
					'transition': 'all 0s linear',
					'margin-left': -w + 'px'
				});
			} else {
				if(abs) {
					$('#banner ul.pic_box').css({
						'transition': 'all 0.3s linear',
						'margin-left': -idx * w + 'px'
					});
				} else {
					$('#banner ul.pic_box').css({
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
					$('#banner ul.pic_box').css({
						'transition': 'all 0s linear',
						'margin-left': -w + 'px'
					});
				} else if(mlf.substring(0, mlf.length - 2) >= 0) {
					newIndex = length - 2;
					$('#banner ul.pic_box').css({
						'transition': 'all 0s linear',
						'margin-left': -w * newIndex + 'px'
					});
				}
			});
			$('#banner ul.dot li').eq(idx - 1).addClass('cur').siblings().removeClass('cur');
		}

		function touchInit() { //轮播图左右滑动切换
			var _x = 0,
				x = 0,
				lf;
			$('#banner ul.pic_box').on('touchstart touchmove touchend', function(e) {
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
						$('#banner ul.pic_box').css({
							'transition': 'all 0s linear',
							'margin-left': lf - (x - _x) + 'px'
						});
						window.flag = false;
						break;
					case 'touchend':
						_x = e.originalEvent.changedTouches[0].pageX;
						clearInterval(timer);
						if(window.flag) {
							console.log('点击');
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
	}

	//昵称头像
	if(sessionStorage.nickname == undefined) {
		ifremeber();
	} else {
		$('#person .nickname').text(sessionStorage.nickname);
		$('#person .headimg').attr('src', sessionStorage.headimg);
	}

	function ifremeber() {
		var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + sessionStorage.openid + '&appid=' + vge.fjmallappid;
		vge.ajxget(requrl, 5000, function(r) {
			try {
				var o = JSON.parse(r);
				console.log('昵称头像', o)
				if(o.subscribe == '0') { //未关注
					sessionStorage.nickname = '游客';
					sessionStorage.headimg = '/v/fjmall/img/headimg.png';
				} else { //已关注用户
					sessionStorage.nickname = o.nickname;
					sessionStorage.headimg = o.headimgurl == '' ? '/v/fjmall/img/headimg.png' : o.headimgurl;
				}
				$('#person .nickname').text(o.nickname);
				$('#person .headimg').attr('src', o.headimgurl == '' ? '/v/fjmall/img/headimg.png' : o.headimgurl);
			} catch(e) {
				vge.clog('errmsg', [requrl, e]);
			}
		}, function(err) {
			vge.clog('errmsg', [requrl, err]);
		});
	}

	//客服
	$('.custom_service').on('click', function() {
		$('#kefu').fadeIn(100);
	})
	$('#kefu .closeKf').on('click', function() {
		$('#kefu').fadeOut(100);
	});

	//上拉加载
	//获取滚动条当前的位置 
	function getScrollTop() {
		var scrollTop = 0;
		if(document.getElementById("mall") && document.getElementById("mall").scrollTop) {
			scrollTop = document.getElementById("mall").scrollTop;
		} 
		return scrollTop;
	}

	//获取当前可视范围的高度 
	function getClientHeight() {
		var clientHeight = 0;
		if(document.getElementById("mall").clientHeight && document.getElementById("mall").clientHeight) {
			clientHeight = Math.min(document.getElementById("mall").clientHeight, document.getElementById("mall").clientHeight);
		} else {
			clientHeight = Math.max(document.getElementById("mall").clientHeight, document.getElementById("mall").clientHeight);
		}
		return clientHeight;
	}

	//获取文档完整的高度 
	function getScrollHeight() {
		return Math.max(document.getElementById("mall").scrollHeight, document.getElementById("mall").scrollHeight);
	}

	//滚动事件触发
//	document.getElementById("mall").addEventListener('scroll',scrollEevnt,false); 
	
	function scrollEevnt(){
	
		if(getScrollTop() + getClientHeight() + 1  >= getScrollHeight()) {
			currentPage++;
			getShopGoods();
			document.getElementById("mall").removeEventListener('scroll',scrollEevnt,false); 
			$('#mall').append('<img src="img/loading.gif" class="loading"/>');
		}
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
})();