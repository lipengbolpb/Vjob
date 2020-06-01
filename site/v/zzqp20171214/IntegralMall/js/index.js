(function() {
	var timer = null,
		curIndex = 1,
		w = $(document).width();
	
	sessionStorage.companyKey = '20171227';
	if(sessionStorage.companyKey){
		$('.chose_mark').css('display','none');
		$('#content').load('index1.html #index', function() {
			callback_loadIndex(curIndex);
		});
	}else{
		$('.chose_mark').css('display','block');
		getAllVpointsShops();
	}
	
	$('#table .index').on('click', function() {
//		location.href = (location.href).split('#')[0]+'#index';
		$(this).addClass('checked').siblings().removeClass('checked');
		$('#content').load('index1.html #index', function() {
			clearInterval(timer);
			curIndex = 1;
			callback_loadIndex(curIndex);
		});
	});

	$('#table .class').on('click', function() {
//		location.href = (location.href).split('#')[0]+'#class';
		$(this).addClass('checked').siblings().removeClass('checked');
		$.getScript('js/class.js');
	});

	$('#table .person').on('click', function() {
//		location.href = (location.href).split('#')[0]+'#person';
		$(this).addClass('checked').siblings().removeClass('checked');
		$.getScript('js/person.js');
	});

	function callback_loadIndex(index) {
		
		var picUrl = 'img/banner_25.png?v=1,img/banner_21.jpg,img/banner_22.jpg',//picUrl = jo.goodsUrl,
			picArr = [];
		if(picUrl[picUrl.length - 1] == ',') {
			picUrl = picUrl.substring(0, picUrl.length - 2);
		}
		picArr = picUrl.split(',');
//		$('.pic_box').append(`<li><img src="${vge.zzqp}/DBTHNQPPlatform${picArr[picArr.length-1]}" /></li>`);
		$('.pic_box').append(`<li><img src="${picArr[picArr.length-1]}" /></li>`);
		for(var i = 0; i < picArr.length; i++) {
//			$('.pic_box').append(`<li><img src="${vge.zzqp}/DBTHNQPPlatform${picArr[i]}" /></li>`);
			$('.pic_box').append(`<li><img src="${picArr[i]}" /></li>`);
			$('.dot').append('<li></li>');
		}
//		$('.pic_box').append(`<li><img src="${vge.zzqp}/DBTHNQPPlatform${picArr[0]}" /></li>`);
		$('.pic_box').append(`<li><img src="${picArr[0]}" /></li>`);
		$('.dot li').eq(0).addClass('cur');
		if($('.dot li').size() < 2) {
			$('.dot').css('visibility', 'hidden');
		}
		//初始化轮播图
		var newIndex = index;
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

		// $('#game_box').on('click','dt,a',function(){
		// 	title_tip('尊敬的用户', '敬请期待！', '我知道了');
        // });
        $('#game_box .game').eq(0).on('click','dt,a',function(){
            // title_tip('尊敬的用户', '敬请期待！', '我知道了');
            window.location.href = 'http://'+location.host+'/zzqp20171214/to/footBall';
        });
        $('#game_box .game').eq(1).on('click','dt,a',function(){
			window.location.href = 'http://' + location.host + '/v/zzqp20171214/game1/index.html';
			// title_tip('尊敬的用户', '敬请期待！', '我知道了');
		});
		
		
		var jo={},
			i = 0,
			j = 0,
			reply = {},
			html = `<p class="title">————大家都在兑————</p>`;
			
		userInfo();
		getShopGoods();
		function getShopGoods() { //获取商品数据
			var javai = vge.zzqp + '/DBTHNQPInterface/vpointsShop/getShopGoods';
			var req = {
				"currentPage":1,
				"count":10,
				"companyKey":sessionStorage.companyKey
			};
			vge.callJApi(javai, req,
				function(jo) {
					if(jo.result.code == '0') {
						if(!jo.result.businessCode){
							jo = jo.reply;
							showGoods(jo);
							sessionStorage.jo = JSON.stringify(jo);
						}else{
							title_tip('尊敬的用户', jo.result.msg, '我知道了');
						}
					} else if(jo.result.code == '-1') {
						title_tip('尊敬的用户', jo.result.msg, '我知道了');
					} else { //code!='0'
						title_tip('尊敬的用户', jo.result.msg, '我知道了');
					}
				});
		}
		
		function userInfo() { //用户积分商城个人信息 
			var javai = vge.zzqp + '/DBTHNQPInterface/vpointsExchange/userVpointsShopInfo';
			var req = {
				"openid":sessionStorage.openid,
				"companyKey":sessionStorage.companyKey
            };
            vge.callJApi(javai, req,
				function(jo) {
					if(jo.result.code == '0') {
						if(!jo.result.businessCode) {
							reply = jo.reply;
							sessionStorage.customerService = reply.phoneNum;
							if((sessionStorage.realName === '' || !sessionStorage.realName)&&reply.recordList[0]) {
								for(var m=0;m<reply.recordList.length;m++){
									if(reply.recordList[m].exchangeType==1&&reply.recordList[m].exchangeStatus==0){
										sessionStorage.realName = reply.recordList[m].realName===undefined?'':reply.recordList[m].realName;
										sessionStorage.address = reply.recordList[m].address===undefined?'':reply.recordList[m].address;
										sessionStorage.phoneNum = reply.recordList[m].phoneNum===undefined?'':reply.recordList[m].phoneNum;
										break;
									}
								}
							}
							sessionStorage.nickName = reply.nickName;
							sessionStorage.headUrl = reply.headUrl;
							sessionStorage.vpoints = reply.vpoints;
							$('#index .msg i').text(reply.vpoints);
						}else{
							title_tip('尊敬的用户', '拉取失败！', '我知道了');
						}
					} else if(jo.result.code == '-1') {
						title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
					} else { //code!='0'
						title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
					}
				});
		}

		
		function showGoods(jo){
			//数据填充
			var l = jo.length>10?10:jo.length;
			for(i = 0; i <l; i++) {
				html += `<dl goodsId="${jo[i].goodsId}" exchangeType="${jo[i].exchangeType}">
						<dt><img src="${vge.zzqpimg}/DBTHNQPPlatform${jo[i].goodsUrl.split(',')[0]}"/></dt>
						<dd>`;
				if(jo[i].goodsRemains==0){
					html += `<div><span class="name">${jo[i].goodsName}</span> <em goodsDiscount='1' class="activeflag">已兑完</em></div>`;
				}else if(new Date()<rTime(jo[i].goodsStartTime)){//未开始
					html += `<div><span class="name">${jo[i].goodsName}</span> <em goodsDiscount='1' class="activeflag">未开始</em></div>`;
				}else if(new Date()>rTime(jo[i].goodsEndTime)){//已结束
					html += `<div><span class="name">${jo[i].goodsName}</span> <em goodsDiscount='1' class="activeflag">已结束</em></div>`;
				}else{
					html += `<div><span class="name">${jo[i].goodsName}</span> <em goodsDiscount='${jo[i].goodsDiscount}'>${jo[i].goodsDiscount/10}折优惠</em></div>`;
				}
				html += `<span>兑换积分：<i>${jo[i].realVpoints}</i></span>
						</dd>
					</dl>`;
			}
			html += '<p class="title" style="clear:both;">————加载完毕————</p>';
			if(l==0){html='';}
			$('#hot').append(html);
			html = `<p class="title">————大家都在兑————</p>`;
			i = 0;
			$('em').each(function() {
				if($(this).attr('goodsdiscount') == 100) {
					$(this).css({'visibility':'hidden','display':'none'});
					$(this).siblings('span').css('width','100%');
				}
			});
			$('#hot dl').on('click', function() { //商品点击
				sessionStorage.goodsId = $(this).attr('goodsid');
				sessionStorage.exchangeType = $(this).attr('exchangeType');
				location.href = `details.html?index=${$(this).index()}&tj=${$(this).attr('exchangetype')}`;
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
		
		$('.details').parent().on('click', function() {
			location.href = 'record.html';
		});
		$('.class_1').on('click', 'li', function() {
			sessionStorage.classname = $(this).attr('class').substring(2);
			sessionStorage.categoryParent = $(this).attr('class').substring(2);
			$.getScript('js/goods.js');
		});
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
								} else {//左划
								}
								lbt(newIndex, lbtlength, 1);
							} else {//当前
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
	
	function getAllVpointsShops() { //获取商城积分数据
		var javai = vge.zzqp + '/DBTHNQPInterface/vpointsShop/getAllVpointsShops';
		var req = {
			"openid":sessionStorage.openid
		};
		vge.callJApi(javai, req,
			function(jo) {
				if(jo.result.code == '0') {
					if(!jo.result.businessCode) {
						getAllVpointsShopsCb(jo.reply);
					}else{
						title_tip('尊敬的用户', '拉取失败！', '我知道了');
					}
				} else if(jo.result.code == '-1') {
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				} else { //code!='0'
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				}
			});
	}
	function getAllVpointsShopsCb(jo){
		var getAllhtml = '';
		if(jo.length<1){
			getAllhtml+='<p class="mark_tip">暂未开通</p>';
		}else{
			for(var n=0;n<jo.length;n++){
				getAllhtml+=`<p class="option" vpoints="${jo[n].surplusVpoints}" companyKey="${jo[n].companyKey}">${jo[n].companyName} <span><i class="iconfont icon-jifen"></i> ${jo[n].surplusVpoints}积分</span></p>`;
			}
			getAllhtml+='<p class="mark_tip">可选择商城已加载完毕</p>';
		}
		$('.chose_box').append(getAllhtml);
		$('.chose_box .option').on('click',function(){
			$('.chose_mark').fadeOut(1);
			sessionStorage.companyKey = $(this).attr('companyKey');
			sessionStorage.vpoints = $(this).attr('vpoints');
			$('#index .msg i').text(sessionStorage.vpoints);
			$('#content').load('index1.html #index', function() {
				callback_loadIndex(curIndex);
			}); //异步，需要写到回调函数当中才能生效
		});
	}
	
})();