(function() {

	var openid = sessionStorage.openid,
		hbopenid = sessionStorage.hbopenid;

	var currentPageJk = 1,
		currentPage = 1,
		count = 10,
		next = true,
		next_jk = true,
		itpl_onenote = document.getElementById("onenote_tpl").innerHTML,
		itpl_onenote_jk = document.getElementById("onenote_tpl_jk").innerHTML;

	$('#jk-list').css('height', $('body').height() - $('#title').height() - $('.ad').height() - $('.more').height() -10 + 'px');
	$('.list').css('height', $('body').height() - $('#title').height() - $('.tx').height() - $('.ad').height() - $('.more').height() -10 + 'px');

	$('#record-hb').on('click', function() {
		$(this).addClass('cur').siblings().removeClass('cur');
		$("#jk-list").css('display', 'none');
		$('#hb-list').css('display', 'block');
	});

	$('#record-jk').on('click', function() {
		$(this).addClass('cur').siblings().removeClass('cur');
		$("#jk-list").css('display', 'block');
		$('#hb-list').css('display', 'none');
	});
	
	attentioned();
	attentionedJk();
	
	function attentioned() {
		onepage_note(currentPage);

		function onepage_note(currentpage, cb) {
			var javai = vge.lnqp + '/DBTLNQPInterface/gifts/queryAllGiftsList';
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
							if(jo.reply.objList.length < count) {
								$('.hb-more').css('display', 'block');
//								document.getElementsByClassName("hb-more")[0].removeEventListener('click', scrollEevnt, false);
							}else{
								$('.hb-more').css('display', 'block');
								$('.hb-more').html('点击加载更多');
							}
							var dom_total = Number(jo.reply.totalMoney);
							dom_total = dom_total.toFixed(2);
							$('.tx>p>span').html(dom_total + '<i>元</i>');
							$('.tx').on('click', function() {
								if(dom_total >= 1) {
									give_spack();
								}else{
									title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
								}
							})
						}
						var i = 0,
							lst = jo.reply.objList,
							l = lst.length;
						if(l === 0 || lst === undefined) {
							$('.hb-more').css('display', 'block');
							$('.hb-more').html('仅显示近30天的记录');
//							document.getElementsByClassName("hb-more")[0].removeEventListener('click', scrollEevnt, false);
							next = false;
							if(cb !== undefined) {
								cb();
							}
							return;
						}
						var params = {},
							hs = [],
							mon_where = '';
						$('.hb-more').css('display', 'block');
//						document.getElementsByClassName("hb-more")[0].removeEventListener('click', scrollEevnt, false);
						for(i = 0; i < l; ++i) {
							// alert(lst[l-1]);
							mon_where = lst[i].giftsName;
							if(mon_where === '扫码中奖') {
								params.monwhere = mon_where;
								params.money = '+' + lst[i].earnMoney;
							} else if(mon_where === '签到红包') {
								params.monwhere = mon_where;
								params.money = '+' + lst[i].earnMoney;
							} else if(mon_where === '集卡红包'){
								params.monwhere = mon_where;
								params.money = '+' + lst[i].earnMoney;
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
							}
							params.gettime = lst[i].earnTime.split('.')[0];
							$('#list').append(vge.renderTpl(itpl_onenote, params));
							//                          mon_list.innerHTML += vge.renderTpl(itpl_onenote, params);
						}
						if(cb !== undefined) {
							cb();
						}
						if(l < count) {
							$('.hb-more').css('display', 'block');
							$('.hb-more').html('仅显示近30天的记录');
//							document.getElementsByClassName("hb-more")[0].removeEventListener('click', scrollEevnt, false);
							next = false;
							if(cb !== undefined) {
								cb();
							}
							return;
						}
					} else if(jo.result.businessCode === '2') { //无红包记录
						$('.tx>p>span').html('0.00<i>元</i>');
						$('.hb-more').css('display', 'block');
						$('.hb-more').html('您还没有红包记录哦~');
//						document.getElementsByClassName("hb-more")[0].removeEventListener('click', scrollEevnt, false);
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
		document.getElementsByClassName("hb-more")[0].addEventListener('click', scrollEevnt, false);
		function scrollEevnt() {
			if(next) {
				++currentPage;
				onepage_note(currentPage);
			}
		}
	}
	
	function attentionedJk() {
		onepage_note_jk(currentPageJk);

		function onepage_note_jk(currentpage, cb) {
			var javai = vge.lnqp + '/DBTLNQPInterface/consumerCardRecord/queryCardRecodeList';
			var req = {
				"openid": openid,
				"cardType": 2,
				"currentPage": currentpage,
				"count": count
			};
			vge.callJApi(javai, req, function(jo) {
				if(jo.result.code === '0') {
					if(jo.result.businessCode === '0') {
						var i = 0,
							lst = jo.reply,
							l = lst.length;
						if(l === 0 || lst === undefined) {
							$('.jk-more').css('display', 'block');
							$('.jk-more').html('仅显示近30天的记录');
//							document.getElementsByClassName("jk-more")[0].removeEventListener('click', scrollEevntJk, false);
							next_jk = false;
							if(cb !== undefined) {
								cb();
							}
							return;
						}
						var params = {},
							hs = [],
							cardChannel = '',
							cardName = '';
//						document.getElementsByClassName("jk-more")[0].removeEventListener('click', scrollEevntJk, false);
						for(i = 0; i < l; ++i) {
							if(lst[i].cardChannel==1){//1扫码，2关注，3签到，4兑换
								params.money = '+1' ;
								cardChannel = '扫码抽卡';
							}else if(lst[i].cardChannel==2){
								params.money = '+1' ;
								cardChannel = '关注抽卡';
							}else if(lst[i].cardChannel==3){
								params.money = '+1' ;
								cardChannel = '签到抽卡';
							}else if(lst[i].cardChannel==4){
								params.money = '-1' ;
								cardChannel = '兑换';
							}
							params.cardName = lst[i].cardName+'-'+cardChannel;
							params.gettime = lst[i].createTime.split('.')[0];
							$('#jk-list').append(vge.renderTpl(itpl_onenote_jk, params));
						}
						if(cb !== undefined) {
							cb();
						}
						if(l < count) {
							$('.jk-more').css('display', 'block');
							$('.jk-more').html('仅显示近30天的记录');
//							document.getElementsByClassName("jk-more")[0].removeEventListener('click', scrollEevntJk, false);
							next_jk = false;
							if(cb !== undefined) {
								cb();
							}
							return;
						}else{
							$('.jk-more').css('display', 'block');
							$('.jk-more').html('点击加载更多');
						}
					} else if(jo.result.businessCode === '2') { //无红包记录
						$('.jk-more').css('display', 'block');
						$('.jk-more').html('您还没有集卡记录哦~');
//						document.getElementsByClassName("jk-more")[0].removeEventListener('click', scrollEevntJk, false);
						if(cb !== undefined) {
							cb();
						}
						next_jk = false;
						return;
					} else { //businessCode:1失败
						title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
					}
				} else { //code!='0'
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				}
			});
		}
		function scrollEevntJk() {
			if(next_jk) {
				++currentPageJk;
				onepage_note_jk(currentPageJk);
			}
		}
		document.getElementsByClassName("jk-more")[0].addEventListener('click', scrollEevntJk, false);
	}

	
	function give_spack() { //提现
		var javai = vge.lnqp + '/DBTLNQPInterface/gifts/getGiftspack';
		var req = {
			"openid": openid,
			"hbopenid": hbopenid
		};
		vge.callJApi(javai, req,
			function(jo) {
				if(jo.result.code == '0') {
					if(jo.result.businessCode === '0') {
						ifremeber();
					} else if(jo.result.businessCode === '1') { //1
						title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元可提现！', '我知道了');
					} else if(jo.result.businessCode === '2') { //1
						title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
					} else if(jo.result.businessCode === '4') { //1
						title_tip('提现处理中，请稍后查看详细记录', '我知道了');
					} else if(jo.result.businessCode === '3') { //1
						title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
					} else if(jo.result.businessCode === '-1') { //-1
						title_tip('提 示', '系统升级中...', '我知道了');
					} else if(jo.result.businessCode === '-2') { //-1
						title_tip('提 示', '提现操作过于频繁', '我知道了');
					} else if(jo.result.businessCode === '5') { //5
						title_tip('尊敬的用户', jo.result.msg, '我知道了');
					} else {
						title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
					}
				} else if(jo.result.code == '-1') {
					title_tip('尊敬的用户', '系统升级中...', '我知道了');
				} else { //code!='0'
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
					
				}
			});
	}

	/* 判断关注 */
	function ifremeber() {
		var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.lnqpappid;
		vge.ajxget(requrl, 5000, function(r) {
			try {
				var o = JSON.parse(r);
				if(o.subscribe == '0') { //未关注
					$('#tx-alert').css('display','block');
					$('#tx-alert img').attr('src','/v/lnqp-jkMidAut/img/notattention.png');
					$('#tx-alert img').one('click',function(){
						$('#tx-alert').css('display','none')
						location.href='http://'+location.host+'/v/lnqp-jkMidAut/attention.html';
					})
				} else { //已关注用户
					$('#tx-alert').css('display','block');
					$('#tx-alert img').attr('src','/v/lnqp-jkMidAut/img/attention.png');
					$('#tx-alert img').one('click',function(){
						location.reload();
					})
				}
			} catch(e) {
				vge.clog('errmsg', [requrl, e]);
			}
		}, function(err) {
			vge.clog('errmsg', [requrl, err]);
		});
	}

})()