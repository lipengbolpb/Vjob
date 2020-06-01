'use strict';
(function() {
	var cardList = [],
		finishFlag = true,
		n = 0,
		args = vge.urlparse(location.href),
		hbopenid = args.openid,
		openid = sessionStorage.openid;


	var query_card_api = vge.jsqp + '/DBTJSQPInterface/consumerCard/queryUserCardAccount'; //查询集卡
	var SPACK_PORT = vge.jsqp + '/DBTJSQPInterface/gifts/getGiftspack'; //提现接口
	var exchange_card_api = vge.jsqp + '/DBTJSQPInterface/consumerCard/exchangeCard'; //兑换集卡

	queryCard();



	function showCard(list) {
		for (var i = 4; i >= 0; i--) {
			if (i == 0) {
				cardList.push({
					"type": "cardA",
					"number": list.cardA,
					"pic": 'agt'
				});
				if (list.cardA > 0) {
					$('.bottle_bg').addClass('finish');
					$('.bottle').attr('src', '/v/jsqp-final2019/img/card/bottle-agt.png');
					$('.bottle_box').eq(i).addClass('finish');
					$('.bottle_box').eq(i).find('i').text(list.cardA);
					n++;
				}
			} else if (i == 1) {
				cardList.push({
					"type": "cardB",
					"number": list.cardB,
					"pic": 'bp'
				});
				if (list.cardB > 0) {
					$('.bottle_bg').addClass('finish');
					$('.bottle').attr('src', '/v/jsqp-final2019/img/card/bottle-bp.png');
					$('.bottle_box').eq(i).addClass('finish');
					$('.bottle_box').eq(i).find('i').text(list.cardB);
					n++;
				}
			} else if (i == 2) {
				cardList.push({
					"type": "cardC",
					"number": list.cardC,
					"pic": 'cs'
				});
				if (list.cardC > 0) {
					$('.bottle_bg').addClass('finish');
					$('.bottle').attr('src', '/v/jsqp-final2019/img/card/bottle-cs.png');
					$('.bottle_box').eq(i).addClass('finish');
					$('.bottle_box').eq(i).find('i').text(list.cardC);
					n++;
				}
			} else if (i == 3) {
				cardList.push({
					"type": "cardD",
					"number": list.cardD,
					"pic": 'hydt'
				});
				if (list.cardD > 0) {
					$('.bottle_bg').addClass('finish');
					$('.bottle').attr('src', '/v/jsqp-final2019/img/card/bottle-hydt.png');
					$('.bottle_box').eq(i).addClass('finish');
					$('.bottle_box').eq(i).find('i').text(list.cardD);
					n++;
				}
			} else if (i == 4) {
				cardList.push({
					"type": "cardE",
					"number": list.cardE,
					"pic": 'jd'
				});
				if (list.cardE > 0) {
					$('.bottle_bg').addClass('finish');
					$('.bottle').attr('src', '/v/jsqp-final2019/img/card/bottle-jd.png');
					$('.bottle_box').eq(i).addClass('finish');
					$('.bottle_box').eq(i).find('i').text(list.cardE);
					n++;
				}
			}
		}
		console.log(cardList)
		if (list.noExchangeCount > 0) { //成套
			$('.bottle').attr('src', '/v/jsqp-final2019/img/card/fu.png');
			$('#exchange').addClass('finish');
			$('.card_box .title').html('您已集齐5个福袋，快点击兑换吧');

		} else {
			if (n != 0) {
				$('.card_box .title').html('您已集齐' + n + '个福袋，快去收集剩余福袋吧');
			}
		}

		$('.bottle_box').each(function() { //切换列表小图
			if ($(this).attr('class').indexOf('finish') != -1) {
				var src = $(this).children('img').attr('src').replace('-no', '');
				$(this).children('img').attr('src', src);
			}
			src = null;
		});
		$('.bottle_box.finish').on('click', function() {
			if (list.noExchangeCount > 0) {
				return false;
			}
			var src = $(this).children('img').attr('src').replace('-s', '');
			$('.bottle').attr('src', src);
			src = null;
		});
		$('#exchange.finish').on('click', exchangeCard);
		$('#give_spack').on('click', give_spack)
		$('#alert').on('click', function() {
			$('#alert,#finish').fadeOut(1);
			location.reload();
		});
		$('.back').on('click', function() {
			window.history.go(-1);
		})
	}

	function queryCard() {
		var req = {
			"openid": openid,
			"cardType": 1
		};
		vge.callJApi(query_card_api, req, function(jo) {
			if (jo.result.code == '0') {
				if (jo.result.businessCode == '0') {
					console.log(jo);
					showCard(jo.reply);
				} else { //1 为服务器报错
					title_tip('尊敬的用户', jo.result.msg, '我知道了');
				}
			} else { //code!='0'
				title_tip('尊敬的用户', jo.result.msg, '我知道了');
			}
		});
	}

	function exchangeCard() {
		$('#exchange.finish').unbind();
		setTimeout(function() {
			$('#exchange.finish').on('click', exchangeCard);
		}, 1000);
		var req = {
			"openid": openid,
			"cardType": 1
		};
		vge.callJApi(exchange_card_api, req, function(jo) {
			if (jo.result.code == '0') {
				if (jo.result.businessCode == '0') {
					console.log(jo);
					$('#finish .money').html(jo.reply.earnMoney + '<span>元</span>')
					$('#finish').fadeIn(300);
				} else { //1 为服务器报错
					title_tip('尊敬的用户', jo.result.msg, '我知道了');
				}
			} else { //code!='0'
				title_tip('尊敬的用户', jo.result.msg, '我知道了');
			}
		});
	}

	function give_spack() {
		$('#give_spack').unbind();
		setTimeout(function() {
			$('#give_spack').on('click', give_spack);
		}, 1000);
		var req = {
			"openid": openid,
			"hbopenid": hbopenid
		};
		vge.callJApi(SPACK_PORT, req, function(jo) {
			if (jo.result.code == '0') {
				if (jo.result.businessCode == '0') {
					console.log(jo);
					$('#alert').fadeIn(1);
				} else if (jo.result.businessCode === '1') { //1
					title_tip('提 示', '您的红包金额不足，再喝几支攒够1元发红包！', '我知道了');
				} else if (jo.result.businessCode === '2') { //1
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				} else if (jo.result.businessCode === '4') { //1
					title_tip('提现处理中，请稍后查看详细记录', '我知道了');
				} else if (jo.result.businessCode === '3') { //1
					title_tip('尊敬的用户',
						'<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>',
						'我知道了');
				} else if (jo.result.businessCode === '-1') { //-1
					title_tip('提 示', '系统升级中...', '我知道了');
				} else if (jo.result.businessCode === '-2') { //-1
					title_tip('提 示', '提现操作过于频繁', '我知道了');
				} else if (jo.result.businessCode === '5') { //5
					title_tip('尊敬的用户', jo.result.msg, '我知道了');
				} else {
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				}
			} else { //code!='0'
				title_tip('尊敬的用户', jo.result.msg, '我知道了');
			}
		});
	}



})()
