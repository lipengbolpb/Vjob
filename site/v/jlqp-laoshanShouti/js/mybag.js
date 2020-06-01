(function() {

	'use strict';
	var show = document.getElementById('details'),
		dom_bottom = document.getElementsByClassName("details")[0],
		hide = document.getElementById("hide"),
		bottle_num = document.getElementById("num"),
		dom_balance = document.getElementById("dom_balance"),
		add_money = document.getElementById("add_money"),
		no_list = document.getElementById("no_list"),
		mon_list = document.getElementById("mon_list"),
		dom_more = document.getElementById("more"),
		itpl_onenote = document.getElementById("onenote_tpl").innerHTML;

	var args = vge.urlparse(location.href),
		openid = args.openid,
		hbopenid = args.hbopenid;
	var currentpage = 1,
		next = true,
		count = 10,
		flag = false, //提现标志
		first = true;

	//提现状态
	$('#btn').on('click', function() { //提现
		if(flag) return;
		$('#loading').css('display', 'block');
		give_spack();
	});

	attentioned();

	function attentioned() {
		onepage_note(currentpage);

		function onepage_note(currentpage, cb) {
			var javai = vge.jlqp + '/DBTJLQPInterface/gifts/queryAllGiftsList';
			// alert(javai);
			var req = {
				"openid": openid,
				"hbopenid": hbopenid,
				"currentPage": currentpage,
				"count": count
			};
			vge.callJApi(javai, req, function(jo) {
				if(jo.result.code === '0') {
					if(jo.result.businessCode === '0') {
						if(currentpage == 1) {
							$('.num').html('<span>' + jo.reply.total + '</span>瓶')
							dom_balance.innerHTML = jo.reply.totalMoney;
							add_money.innerHTML = jo.reply.giftsMoney;
						}
						if(Number(jo.reply.totalMoney) < 1) {
							$('#btn').unbind();
							$('#btn').css({
								'background': 'url(/v/jlqp-laoshanShouti/img/button_dis.png?v=1) no-repeat center',
								'-webkit-background-size': 'auto 100%'
							});
							flag = true;
						}
						var i = 0,
							lst = jo.reply.objList,
							l = lst.length;
						if(l === 0 || lst === undefined) {
							if(first) {
								dom_more.innerHTML = '仅显示近30天的记录';
								dom_more.style.fontSize = '0.6rem';
								dom_more.removeEventListener('click', getm, false);
								mon_list.style.display = 'none';
								no_list.style.display = 'block';
								first = false;
							} else {
								no_list.style.display = 'none';
								dom_more.innerHTML = '仅显示近30天的记录';
								dom_more.style.fontSize = '0.6rem';
								dom_more.removeEventListener('click', getm, false);
							}
							next = false;
							if(cb !== undefined) {
								cb();
							}
							return;
						}
						first = false;
						var params = {},
							hs = [],
							mon_where = '';
						no_list.style.display = 'none';
						dom_more.style.display = 'block';
						for(i = 0; i < l; ++i) {
							mon_where = lst[i].giftsName;
							if(mon_where === '扫码中奖') {
								params.monwhere = mon_where;
								params.money = '+' + lst[i].earnMoney + '元';
								params.color = '#ffd529';
							} else {
								if(lst[i].extractStatus == '0') {
									params.monwhere = '提现成功';
									params.money = '-' + lst[i].earnMoney + '元';
								} else if(lst[i].extractStatus == '1') {
									params.monwhere = '提现失败_金额已退还';
									params.money = lst[i].earnMoney + '元';
								} else if(lst[i].extractStatus == '2') {
									params.monwhere = '提现处理中';
									params.money = '-' + lst[i].earnMoney + '元';
								}
								params.color = '#ffffff';
							}
							params.gettime = lst[i].earnTime;
							mon_list.innerHTML += vge.renderTpl(itpl_onenote, params);
						}
						if(cb !== undefined) {
							cb();
						}
						if(l < count) {
							no_list.style.display = 'none';
							dom_more.innerHTML = '仅显示近30天的记录';
							dom_more.style.fontSize = '0.6rem';
							dom_more.removeEventListener('click', getm, false);
							next = false;
							if(cb !== undefined) {
								cb();
							}
							return;
						}
					} else if(jo.result.businessCode === '2') { //无红包记录
						dom_balance.innerHTML = '0.00';
						add_money.innerHTML = '0.00';
						$('#btn').unbind();
						$('#btn').css({
							'background': 'url(/v/jlqp-laoshanShouti/img/button_dis.png?v=1) no-repeat center',
							'-webkit-background-size': 'auto 100%'
						});
						flag = true;
						if(first) {
							dom_more.innerHTML = '仅显示近30天的记录';
							dom_more.style.fontSize = '0.6rem';
							dom_more.removeEventListener('click', getm, false);
							mon_list.style.display = 'none';
							no_list.style.display = 'block';
							first = false;
						} else {
							no_list.style.display = 'none';
							dom_more.innerHTML = '仅显示近30天的记录';
							dom_more.style.fontSize = '0.6rem';
							dom_more.removeEventListener('click', getm, false);
						}
						if(cb !== undefined) {
							cb();
						}
						next = false;
						return;
					} else { //businessCode:1失败
						title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
					}
				} else { //code!='0'
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				}
			});
		}
		dom_more.addEventListener('click', getm, false);

		function getm() {
			if(next) {
				++currentpage;
				onepage_note(currentpage);
			}
		}
	}

	function give_spack() { //提现
		var javai = vge.jlqp + '/DBTJLQPInterface/gifts/getGiftspack';
		var req = {
			"openid": openid,
			"hbopenid": hbopenid
		};
		vge.callJApi(javai, req,
			function(jo) {
				$('#loading').css('display', 'none');
				if(jo.result.code == '0') {
					if(jo.result.businessCode === '0') {
						$('#alert').css('display', 'block');
					} else if(jo.result.businessCode === '1') { //1
						title_tip('提 示', '您的待提余额不足1元，再喝几瓶攒够1元发红包！', '我知道了');
					} else if(jo.result.businessCode === '-2') { //-2
						title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
					} else if(jo.result.businessCode === '2') { //1
						title_tip('提 示', jo.result.msg, '我知道了');
					} else if(jo.result.businessCode === '4') { //1
						title_tip('提 示', '提现处理中，请稍后查看详细记录', '我知道了');
					} else if(jo.result.businessCode === '5') { //5
						title_tip('尊敬的用户', jo.result.msg, '我知道了');
					} else if(jo.result.businessCode === '3') { //3
						title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
					} else if(jo.result.businessCode === '-1') { //-1
						title_tip('提 示', '系统升级中...', '我知道了');
						flag = false;
					} else {
						title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
						flag = false;
					}
				} else if(jo.result.code == '-1') {
					title_tip('尊敬的用户', '系统升级中...', '我知道了');
					flag = false;
				} else { //code!='0'
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
					flag = false;
				}
			});
	}
	$('#alert').on('click', function() {
		location.reload();
	});

	$('#jw_icon').css('display', 'block');
	$('#jw_icon').on('click', function() {
		$('#jiuw_box').fadeIn(1, function() {
			$('#jiuw_box div').css('bottom', '0rem');
		});
		$('#jiuw_box .close').on('click', function() {
			$('#jiuw_box div').css('bottom', '-11rem');
			$('#jiuw_box').fadeOut(1);
		});
	});

	show.addEventListener("click", function() {
		dom_bottom.style.left = '0';
	}, false);
	hide.addEventListener("click", function() {
		dom_bottom.style.left = '-100%';
	}, false);
})();