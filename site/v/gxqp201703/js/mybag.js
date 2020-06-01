(function() {
	"use strict";
	var show = document.getElementById("show"),
		hide = document.getElementById("hide"),
		H = document.documentElement.clientHeight || document.body.clientHeight,
		bottle_num = document.getElementById("bottle_num"),
		dom_balance = document.getElementById("balance"),
		add_money = document.getElementById("add_money"),
		no_list = document.getElementById("no_list"),
		mon_list = document.getElementById("mon_list"),
		itpl_onenote = document.getElementById("onenote_tpl").innerHTML,
		tx_btn = document.getElementById("tx_btn"),
		btn_box = document.getElementById("btn_box"),
		wxmark = document.getElementById("wxmark"),
		dom_more = document.getElementById("more");

	var args = vge.urlparse(location.href),
		openid = args.openid, //v积分
		hbopenid = args.hbopenid, //支付
		flag = args.flag,
		unionid = args.unionid;

	var currentpage = 1,
		next = true,
		count = 10,
		first = true,
		get = true;


	wxmark.addEventListener("click", function() {
		wxmark.style.display = 'none';
	}, false);

	attentioned();

	function attentioned() {
		onepage_note(currentpage);

		function onepage_note(currentpage, cb) {
			var javai = vge.common + '/vjifenInterface/gifts/queryAllGiftsList';
			var req = { "projectServerName": "guangxi",
				"openid": openid, //"v积分openid"
				"hbopenid": hbopenid,
				"unionid": unionid,
				"currentPage": currentpage,
				"count": count
			};
			vge.callJApi(javai, req, function(jo) {
				if(jo.result.code === '0') {
					if(jo.result.businessCode === '0') {
						if(currentpage == 1) {
							bottle_num.innerHTML = jo.reply.total;
							dom_balance.innerHTML = jo.reply.totalMoney;
							add_money.innerHTML = jo.reply.giftsMoney;
							sessionStorage.totalMoney = jo.reply.totalMoney;
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
								params.money = '+' + lst[i].earnMoney;
								params.color = '#fff227';
							} else {
								if(lst[i].extractStatus == '0') {
									params.monwhere = '提现成功';
									params.money = '-' + lst[i].earnMoney;
								} else if(lst[i].extractStatus == '1') {
									params.monwhere = '提现失败_金额已退还';
									params.money = lst[i].earnMoney;
								} else if(lst[i].extractStatus == '2') {
									params.monwhere = '提现处理中';
									params.money = '-' + lst[i].earnMoney;
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
		tx_btn.addEventListener('click', function() {
			if(get) {
				give_spack();
				//				if(Number(sessionStorage.totalMoney)<88888.88){
				//					give_spack();
				//					get = false;	
				//				}else{
//									sessionStorage.hbopenid = hbopenid;
				//					location.href = 'http://m.vjifen.com/v/gxqp201703/getMsg.html?bizcode=12&tx=1&openid='+openid+'&unionid='+unionid;
				//				}
			}
		}, false);
	}

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

	function give_spack() {
		//		title_tip('提 示', '微信提现升级中，您可先扫码，红包会自动累积哦！', '我知道了');
		var javai = vge.common + '/vjifenInterface/gifts/getGiftspack';
		var req = { "projectServerName": "guangxi",
			"openid": openid,
			"hbopenid": hbopenid,
			"unionid": unionid
		};
		vge.callJApi(javai, req, function(jo) {
			if(jo.result.code == '0') {
				if(jo.result.businessCode === '0') {
					wxmark.style.display = 'block';
				} else if(jo.result.businessCode === '1') { //1
					title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
				} else if(jo.result.businessCode === '-1') { //1
					title_tip('提 示', '系统升级中...', '我知道了');
				} else if(jo.result.businessCode === '-2') { //-2
					title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
				} else if(jo.result.businessCode === '5') { //1
					title_tip('提 示', jo.result.msg, '我知道了');
				} else if(jo.result.businessCode === '4') { //4
					title_tip('提 示', '提现处理中，请稍后查看详细记录', '我知道了');
				} else if(jo.result.businessCode === '2') { //1
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				} else if(jo.result.businessCode === '3') { //1
					title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
				} else {
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
					first = true;
				}
			} else { //code!='0'
				title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				first = true;
			}
		});
	}

	show.addEventListener("click", function() {
		btn_box.style.display = 'none';
		hide.style.display = 'block';
		document.getElementsByClassName("mybag_top")[0].style.marginTop = -H + "px";
	});
	hide.addEventListener("click", function() {
		hide.style.display = 'none';
		btn_box.style.display = 'block';
		document.getElementsByClassName("mybag_top")[0].style.marginTop = 0 + "px";
	});
})();