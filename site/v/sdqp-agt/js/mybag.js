'use strict';
(function() {
	var ONEPAGE_PORT = vge.sdqp + '/DBTSDQPInterface/gifts/queryAllGiftsList';
	var SPACK_PORT = vge.sdqp + '/DBTSDQPInterface/gifts/getGiftspack';
	var PROJECT = 'sdqp-agt';
	var APPID = vge.sdqpappid;

	var mon_list = document.getElementById("mon_list"),
		itpl_onenote = document.getElementById("onenote_tpl").innerHTML;

	var args = vge.urlparse(location.href),
	    openid = '',
		hbopenid = '';
	if (sessionStorage.openid) { //from扫码
		openid = sessionStorage.openid;
		hbopenid = args.openid;
	} else {   // from链接 1菜单链接 2推送链接
		openid = args.openid;
		hbopenid = args.hbopenid;
	}	
	    // openid = args.openid,
	    // hbopenid = args.hbopenid;

	var currentpage = 1,
		next = true,
		count = 10,
		first = true;


	$('.todetails').on('click', function() {
		$('.record').fadeIn(100);
	});
	$('.hide').on('click', function() {
		$('.record').fadeOut(100);
	});

	if (location.href.indexOf('/sdqp-agt/txo/mybag') != -1) { //扫码打开
		if (sessionStorage.totalAccountMoney >= 1) { //扫码打开needAuto==true
			ifremeber(true);
		} else {
			onepage_note(false);
		}
	} else if (location.href.indexOf('/sdqp-common2.0/tto/mybag') != -1) { //推送打开
		// onepage_note(true);
		// prs && agt 都 跳转链接 到common2.0的红包页面去 再判断提现
	} else { //公众号打开
		onepage_note();
	}
   
	$('.btn').on('click',function(){
		ifremeber(false);
	});

	function onepage_note(needAuto, cb) {
		var javai = ONEPAGE_PORT;
		var req = {
			"openid": openid,
			"hbopenid": hbopenid,
			"currentPage": currentpage,
			"count": count
		};
		vge.callJApi(javai, req, function(jo) {
			if (jo.result.code === '0') {
				if (jo.result.businessCode === '0') {
					if (currentpage == 1) {
						if (jo.reply.objList.length < count) {
							$('.more').html('仅显示近30天的记录').css('fontSize','0.6rem');
							$('.more').unbind();
						}
						var dom_total = Number(jo.reply.totalMoney);
						var dom_gifts = Number(jo.reply.giftsMoney);
						dom_total = dom_total.toFixed(2);
						dom_gifts = dom_gifts.toFixed(2);
						$('.total').html(dom_total);
						$('.gifts').html(dom_gifts);
						$('.freeze').html(Number(jo.reply.freezeMoney).toFixed(2));//冻结金额
						$('.totalNum span').html(jo.reply.total);
						if(jo.reply.total>99){
							$('.totalNum span').addClass('toolang');
						}
						sessionStorage.totalAccountMoney = dom_total;

						if (dom_total < 1) {
							$('.mybag .btn').css({'background-image':'url(/v/sdqp-agt/img/button_5.png)'});
							$('.mybag .btn').unbind();
							$('.mybag').css('visibility', 'visible');
							$('.txTips').css('display','block');
						} else {
							if (needAuto) {
								ifremeber(needAuto);
							} else {
								$('.mybag').css('visibility', 'visible'); 
								// 不显示你已提现成功文字
							}
						}
					}
					var i = 0,
						lst = jo.reply.objList,
						l = lst.length;
					if (l === 0 || lst === undefined) {
						$('.more').html('仅显示近30天的记录').css('fontSize','0.6rem');
						$('.more').unbind();
						if (first) {
							mon_list.style.display = 'none';
							first = false;
						} 
						next = false;
						if (cb !== undefined) {
							cb();
						}
						return;
					}
					first = false;
					var params = {},
						hs = [],
						mon_where = '';
					$('.more').css('display','block');
					for (i = 0; i < l; ++i) {
						mon_where = lst[i].giftsName;
						if (mon_where === '扫码中奖') {
							params.monwhere = mon_where;
							params.money = '+' + lst[i].earnMoney;
						} else if (mon_where === '签到红包' || mon_where === '促销红包') {
							params.monwhere = mon_where;
							params.money = '+' + lst[i].earnMoney;
						} else if(mon_where === 'PK比赛'){
							params.monwhere = mon_where;
							if(lst[i].earnMoney<0){
								params.money = '-' + lst[i].earnMoney;
							} else{
								params.money = '+' + lst[i].earnMoney;
							}
						} else {
							if (lst[i].extractStatus == '0') {
								params.monwhere = '提现成功';
								params.money = '-' + lst[i].earnMoney;
							} else if (lst[i].extractStatus == '1') {
								params.monwhere = '提现失败_金额已退还';
								params.money = lst[i].earnMoney;
							} else if (lst[i].extractStatus == '2') {
								params.monwhere = '提现处理中';
								params.money = '-' + lst[i].earnMoney;
							}
						}
						params.gettime = lst[i].earnTime;
						mon_list.innerHTML += vge.renderTpl(itpl_onenote, params);
					}
					if (cb !== undefined) {
						cb();
					}
					if (l < count) {
						$('.more').html('仅显示近30天的记录').css('fontSize','0.6rem');
						$('.more').unbind();
						next = false;
						if (cb !== undefined) {
							cb();
						}
						return;
					}
				} else if (jo.result.businessCode === '2') { //无红包记录
                    $('.btn').unbind();     
					$('.mybag').css('visibility', 'visible');
					$('.txTips').css('display','block');
					$('.mybag .btn').css({'background-image':'url(/v/sdqp-agt/img/button_5.png)'});
					$('.total').html('0.00');
					$('.gifts').html('0.00');
					$('.freeze').html('0.00');//冻结金额
					$('.totalNum span').html(0);
					sessionStorage.totalAccountMoney=0;
					if (first) {
						$('.more').html('仅显示近30天的记录').css('fontSize','0.6rem');
						$('.more').unbind();
						first = false;
					} else {
						$('.more').html('仅显示近30天的记录').css('fontSize','0.6rem');
						$('.more').unbind();
					}
					if (cb !== undefined) {
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

	$('.more').on('click',getm);
	function getm() {
		if (next) {
			++currentpage;
			onepage_note(currentpage);
		}
	}
	// 冻结金额相关提醒
	$('.freezeTip').on('click',function(){
		$('.freezeAlert').css('display','block');
	})
	
	$('.closeTip').on('click',function(){
		$('.freezeAlert').delay(100).fadeOut(1);
	})

	function give_spack(needAuto) { //提现
		var javai = SPACK_PORT;
		var req = {
			"openid": openid,
			"hbopenid": hbopenid
		};
		vge.callJApi(javai, req,
			function(jo) {
				$('.loading').css('display','none');
				if (jo.result.code == '0') {
					if (jo.result.businessCode === '0') { // 提现成功
						$('.mark').css('display','block');
						sessionStorage.totalAccountMoney = 0;
					} else if (jo.result.businessCode === '1') { //1
						title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
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
				} else if (jo.result.code == '-1') {
					title_tip('尊敬的用户', '系统升级中...', '我知道了');
				} else { //code!='0'
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				}
				$('.mybag').css('visibility', 'visible');
				$('.txTips').css('display','block');
				if (needAuto) { //自动提现,结束后查询列表
					onepage_note(!needAuto);
				}
			});
	}
	//  提现完成 点击我知道消失
	$('.mark').on('click',function(){
		$('.mark').css('display','none');
		location.reload();
	});
	/* 判断关注 */
	function ifremeber(needAuto) {
		var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + APPID;
		vge.ajxget(requrl, 5000, function(r) {
			try {
				var o = JSON.parse(r);
				if (o.subscribe == '0') { //未关注
					window.location.replace('http://' + location.host + '/v/' + PROJECT + '/attention.html');
				} else { //已关注用户
					give_spack(needAuto);
				}
			} catch (e) {
				vge.clog('errmsg', [requrl, e]);
			}
		}, function(err) {
			vge.clog('errmsg', [requrl, err]);
		});
	}
})()



// $('.btn').on('click',mytx);
// function mytx() {
// 	if(sessionStorage.totalAccountMoney<1){
// 		title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
// 	}else{
// 		$('.btn').unbind();
// 		setTimeout(function(){
// 			$('.btn').on('click',mytx);
// 		},1000);
// 		$('.loading').css('display','block');
// 		give_spack();
// 	}
// }