(function(){
	'use strict';
	// alert(document.body.clientHeight);
	// alert(document.body.clientWidth);
	var show = document.getElementById("show"),
	    hide = document.getElementById("hide"),
	    H = document.documentElement.clientHeight || document.body.clientHeight,
	    dom_balance = document.getElementById("dom_balance"),
	    add_money = document.getElementById("add_money"),
	    add_coupon = document.getElementById("add_coupon"),
	    no_list = document.getElementById("no_list"),
	    mon_list = document.getElementById("mon_list"),
	    itpl_onenote = document.getElementById("onenote_tpl").innerHTML,
	    dom_more = document.getElementById("more"),
	    dom_couponMore = document.getElementById("couponMore"),
	    dom_num = document.getElementById('num'),
	    dom_btn = document.getElementById('btn'),
		dom_mask = document.getElementById('mask'),
		dom_get = document.getElementById('get_yz'),
	    dom_loading = document.getElementsByClassName('loading')[0];
	
	var args = vge.urlparse(location.href),
	    openid = args.openid,
		hbopenid = args.hbopenid;

	var reg1 = /^1[0-9]{10}$/, //验证手机号
		reg2 = /^[0-9]{4}$/,
		countdowntimer = null;
		
	var currentPageJk = 1,
		next_jk = true,

		currentPagePrize = 1,
		next_prize = true,

		itpl_onenote_jk = document.getElementById("onenote_tpl_jk").innerHTML;
	
	var currentpage = 1,
	    currentPageCoupon = 1,
	    next = true,
	    nextCoupon = true,
	    count = 10,
	    flag = true,
	    first = true,
	    tx = true,
		k = 0;
	
	var cardList = [];
	
	show.addEventListener('click', function () {
	    // hide.style.display = 'block';
	    // show.style.display = 'none';
	    document.getElementsByClassName("mybag_top")[0].style.marginTop = -H + "px";
	}, false);
	
	hide.addEventListener("click", function () {
	    // hide.style.display = 'none';
	    // show.style.display = 'block';
	    document.getElementsByClassName("mybag_top")[0].style.marginTop = 0 + "px";
	});
	
	attentioned();
	attentionedJk();
	queryPrizeList();
	
	
	function attentioned() {
	    onepage_note(currentpage);
	
	    function onepage_note(currentpage, cb) {
	        var javai = vge.common + '/vjifenInterface/gifts/queryAllGiftsList';
	        var req = {
				"projectServerName":"qmbaipi",
	            "openid": openid,
	            "hbopenid": hbopenid,
	            "currentPage": currentpage,
	            "count": count
	        };
	        vge.callJApi(javai, req, function (jo) {
	            if (jo.result.code === '0') {
	                if (jo.result.businessCode === '0') {
	                    if (currentpage == 1) {
	                        if (jo.reply.objList.length < count) {
	                            dom_more.innerHTML = '仅显示近30天的记录';
	                            dom_more.style.fontSize = '0.6rem';
	                            dom_more.removeEventListener('click', getm, false);
	                        }
	                        var dom_total = Number(jo.reply.totalMoney);
	                        var dom_gifts = Number(jo.reply.giftsMoney);
	                        var dom_coupon = Number(jo.reply.totalTicketNum);
	                        if (dom_total >= 1) {
	                            dom_btn.addEventListener('click', mytx, false);
	                        } else {
	                            dom_btn.style.backgroundColor = '#c0c0c0';
	                        }
	                        dom_total = dom_total.toFixed(2);
	                        dom_gifts = dom_gifts.toFixed(2);
	                        dom_coupon = dom_coupon.toFixed(2);
	                        dom_balance.innerHTML = dom_total;
	                        add_money.innerHTML = dom_gifts;
	                        add_coupon.innerHTML = parseFloat(dom_coupon);
	                        dom_num.innerHTML = jo.reply.total;
	                    }
	                    var i = 0,
	                        lst = jo.reply.objList,
	                        l = lst.length;
	                    if (l === 0 || lst === undefined) {
	                        dom_more.innerHTML = '仅显示近30天的记录';
	                        dom_more.style.fontSize = '0.6rem';
	                        dom_more.removeEventListener('click', getm, false);
	                        if (first) {
	                            mon_list.style.display = 'none';
	                            // no_list.style.display = 'block';
	                            first = false;
	                        } else {
	                            no_list.style.display = 'none';
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
	                    no_list.style.display = 'none';
	                    dom_more.style.display = 'block';
	                    for (i = 0; i < l; ++i) {
	                        mon_where = lst[i].giftsName;
	                        if (mon_where === '扫码中奖') {
	                            params.monwhere = mon_where;
	                            params.money = '+' + lst[i].earnMoney;
	                            params.color = '#cf3c35';
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
	                            params.color = '#000000';
	                        }
	                        params.gettime = lst[i].earnTime;
	                        mon_list.innerHTML += vge.renderTpl(itpl_onenote, params);
	                    }
	                    if (cb !== undefined) {
	                        cb();
	                    }
	                    if (l < count) {
	                        no_list.style.display = 'none';
	                        dom_more.innerHTML = '仅显示近30天的记录';
	                        dom_more.style.fontSize = '0.6rem';
	                        dom_more.removeEventListener('click', getm, false);
	                        next = false;
	                        if (cb !== undefined) {
	                            cb();
	                        }
	                        return;
	                    }
	                } else if (jo.result.businessCode === '2') { //无红包记录
	                    dom_btn.removeEventListener('click', mytx, false);
	                    dom_btn.style.backgroundColor = '#d3d3d3';
	                    dom_btn.style.color = '#ffffff';
	                    dom_balance.innerHTML = '0.00';
	                    add_money.innerHTML = '0.00';
	                    dom_num.innerHTML = '0';
	                    if (first) {
	                        dom_more.innerHTML = '仅显示近30天的记录';
	                        dom_more.style.fontSize = '0.6rem';
	                        dom_more.removeEventListener('click', getm, false);
	                        mon_list.style.display = 'none';
	                        // no_list.style.display = 'block';
	                        first = false;
	                    } else {
	                        no_list.style.display = 'none';
	                        dom_more.innerHTML = '仅显示近30天的记录';
	                        dom_more.style.fontSize = '0.6rem';
	                        dom_more.removeEventListener('click', getm, false);
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
	    dom_more.addEventListener('click', getm, false);
	
	    function getm() {
	        if (next) {
	            ++currentpage;
	            onepage_note(currentpage);
	        }
	    }
	}

	function attentionedJk() {
		onepage_note_jk(currentPageJk);

		function onepage_note_jk(currentPageJk, cb) {
			var javai = vge.common + '/vjifenInterface/consumerCardRecord/queryCardRecodeList';
			var req = {
				"projectServerName":"qmbaipi",
				"openid": openid,
				"cardType": 1,
				"currentPage": currentPageJk,
				"count": count
			};
			vge.callJApi(javai, req, function(jo) {
				if(jo.result.code === '0') {
					if(jo.result.businessCode === '0') {
						var i = 0,
							lst = jo.reply,
							l = lst.length;
						if(l === 0 || lst === undefined) {
							$('#jkMore').css({'fontSize':'.6rem'});
							$('#jkMore').html('仅显示近30天的记录');
//							document.getElementsByClassName("jkMore")[0].removeEventListener('click', scrollEevntJk, false);
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
//						document.getElementsByClassName("jkMore")[0].removeEventListener('click', scrollEevntJk, false);
						for(i = 0; i < l; ++i) {
							if(lst[i].cardChannel==1){//1扫码，2关注，3签到，4兑换
								params.money = '+1' ;
								cardChannel = '扫码抽卡';
								params.color = '#cf3c35';
							}else if(lst[i].cardChannel==2){
								params.money = '+1' ;
								cardChannel = '关注抽卡';
								params.color = '#cf3c35';
							}else if(lst[i].cardChannel==3){
								params.money = '+1' ;
								cardChannel = '签到抽卡';
								params.color = '#cf3c35';
							}else if(lst[i].cardChannel==4){
								params.money = '-1' ;
								cardChannel = '兑换';
								params.color = '#000000';
							}
							params.cardName = lst[i].cardName+'-'+cardChannel;
							params.gettime = lst[i].createTime.split('.')[0];
							$('#jk_list').append(vge.renderTpl(itpl_onenote_jk, params));  //填充页面
						}
						if(cb !== undefined) {
							cb();
						}
						if(l < count) {
							$('#jkMore').css({'fontSize':'.6rem'});
							$('#jkMore').html('仅显示近30天的记录');
//							document.getElementsByClassName("jkMore")[0].removeEventListener('click', scrollEevntJk, false);
							next_jk = false;
							if(cb !== undefined) {
								cb();
							}
							return;
						}
						// else{
						// 	$('#jkMore').css('display', 'block');
						// 	$('#jkMore').html('点击加载更多');
						// }
					} else if(jo.result.businessCode === '2') { //无红包记录
						$('#jkMore').css({'display': 'block','fontSize':'.6rem'});
						$('#jkMore').html('您还没有集卡记录哦~');
//						document.getElementsByClassName("jkMore")[0].removeEventListener('click', scrollEevntJk, false);
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
		document.getElementById("jkMore").addEventListener('click', scrollEevntJk, false);
	}
    // 大奖记录
	function queryPrizeList() {
		var javai = vge.common + '/vjifenInterface/gifts/queryPrizeList';
		var req = {
			"projectServerName":"qmbaipi",
			"openid": openid,
			"currentPage": currentPagePrize,
			"count": count,
			"hbopenid": hbopenid
		};
		vge.callJApi(javai, req, function(jo) {
			loaded();
			if (jo.result.code == '0') {
				if (jo.result.businessCode == '0') {
					if (currentPagePrize == 1) {
						sessionStorage.prizeRecordAry = JSON.stringify(jo.reply.prizeRecordAry);
					}
					if (jo.reply.prizeRecordAry.length > 1 && currentPagePrize > 1) {
						sessionStorage.prizeRecordAry = JSON.stringify(JSON.parse(sessionStorage.prizeRecordAry).concat(jo.reply.prizeRecordAry));
					}
					showPrizeList(jo.reply.prizeRecordAry);
				} else {
					title_tip('尊敬的用户', jo.result.msg, '我知道了');
				}
			} else {
				title_tip('尊敬的用户', jo.result.msg, '我知道了');
			}
		})
	}

	function showPrizeList(list) {
		var html = '',
			classname = '',
			str = '',
			target = '';
		if (list.length < count) {
			next_prize = false;
			$('#prizeMore').css({'fontSize':'.6rem'});
			$('#prizeMore').html('仅显示近30天的记录');
		}
		if ((list.length == 0 || list.length == undefined) && currentPagePrize == 1) {
			// $('.list_prize').html('<div class="no_list">您还没有大奖记录哦~</div>')
			$('#prizeMore').html('<div class="no_list">您还没有大奖记录哦~</div>')
		}
		for (var i = 0; i < list.length; i++) {
			if (list[i].useStatus == 0) {
				classname = '';
				target = '领取';
			} else {
				classname = 'get';
				target = '查看';
			}
			html += '<div class="prize">';
			html += '<div><img src="' + list[i].prizeImg + '" class="prizeImg"></div>';
			html += '<div class="prizeMsg">';
			html += '<p class="przieName">' + list[i].prizeName + '</p>';
			html += '<p class="earnTime">中奖时间：' + list[i].earnTime + '</p>';
			var exchangeDate = list[i].exchangeDate;
			if(exchangeDate){
				str = '<p class="endTime">兑奖日期：'+list[i].exchangeDate.split(' ')[0]+'</p>';
			}else{
				str = '<p class="endTime">兑奖截止：'+list[i].expireTime.split(' ')[0]+'</p>';
			}
			html += str;
			html += '</div><p class="details ' + classname + '" infoKey=' + list[i].infoKey + '>' + target + '</p></div>';
		}
		$('.list_prize').append(html);
		watchPrizeDetail()
		// 滚动事件触发
		// $('.list_prize').on('scroll', function(e) {
		// 	e.stopPropagation();
		// 	scrollEevnt();
		// });
		// clickCb();
	}

	function watchPrizeDetail(){
		$('.details').on('click', function() {
			// e.stopPropagation();
			var prizeList = JSON.parse(sessionStorage.prizeRecordAry);
			console.log(prizeList)
			for (var i = 0; i < prizeList.length; i++) {
				if ($(this).attr('infoKey') == prizeList[i].infoKey) {
					$('.alertMsg').css('display', 'block');
					if(prizeList[i].prizeVcode){
						$('.qrcode').css('display','flex');
						$('#qrcode').val(prizeList[i].prizeVcode);
					} else {
						$('.qrcode').css('display','none');
					}
					$('#prizeName').val(prizeList[i].prizeName);
					$('#earnTime').val(prizeList[i].earnTime);
					var exchangeDate = prizeList[i].exchangeDate;
					if(exchangeDate){
						$('.endTime>span').html('兑奖日期：')
						$('#endTime').val(prizeList[i].exchangeDate.split(' ')[0]);
					}else{
						$('.endTime>span').html('兑奖截止：')
						$('#endTime').val(prizeList[i].expireTime.split(' ')[0]);
					}
					sessionStorage.infoKey = prizeList[i].infoKey;
					sessionStorage.prizeVcode = prizeList[i].prizeVcode;
					if (prizeList[i].useStatus == 1) {
						$('.yz_box,.tj_box .tj').css('display', 'none');
						$('.tj_box .tip').css('display', 'block');
						$('#contact,#tel').attr('readonly', 'readonly');
						$('#contact').val(prizeList[i].userName);
						$('#tel').val(prizeList[i].phoneNum);
					} else {
						$('#contact,#tel,#yz_code').removeAttr('readonly');
						$('#yz_code').val('');
						$('.tj_box .tip').css('display', 'none');
						$('.tj_box .tj').css('display', 'block');
						$('.yz_box').css('display', 'flex');
					}
					break;
				}
			}
		})
	}


	$('.prize_close').on('click', function(e) {
		e.stopPropagation();
		$('.alertMsg').css('display', 'none');
	})
	
	$('#get_yz').on('click', function() {
		getYzcode();
	});

	$('.tj').on('click', prizeTj);
	
	function prizeTj() {
		if ($('#contact').val() == '' || $('#contact').val() == ' ') {
			title_tip('提 示', '请填写正确的姓名！~', '我知道了');
		} else if (!reg1.test($('#tel').val())) {
			title_tip('提 示', '请填写正确的手机号！~', '我知道了');
		} else if (!reg2.test($('#yz_code').val())) {
			title_tip('提 示', '请填写正确的验证码！~', '我知道了');
		} else {
			$('.tj').unbind();
			setTimeout(function() {
				$('.tj').on('click', prizeTj);
			}, 1000);
			sub_message();
		}
	}
	
	function getCheckCode(cb) { // 获取手机验证码
		var javai = vge.common + '/vjifenInterface/user/getCaptcha';
		var req = {
			"projectServerName":"qmbaipi",
			"phonenum": $('#tel').val()
		};
		vge.callJApi(javai, req, function(jo) {
			if (jo.result.code == '0') {
				if (jo.result.businessCode == '0') {
					cb(); //成功，开始倒计时
				} else if (jo.result.businessCode === '2') {
					title_tip('尊敬的用户', '您填写的手机号错误，发送验证码失败！', '我知道了');
				} else { //1 为服务器报错
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				}
			} else { //code!='0'
				title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			}
		});
	}

	function getYzcode() {
		if ($('#contact').val() === '' || $('#contact').val().indexOf(' ') !== -1) {
            title_tip('提 示', '请输入正确的姓名哦！~', '我知道了');
        } else if (!reg1.test($('#tel').val())) {
			title_tip('提 示', '请填写正确的手机号！~', '我知道了');
		} else {
			getCheckCode(function() {
				countdown(dom_get, 60);
			});
			// if ($('#get_yz').text() === '获取验证码' || $('#get_yz').text() === '重新获取') {
			// 	$('#get_yz').unbind();
			// 	getCheckCode(function() {
			// 		countdown(dom_get, 60);
			// 	});
			// } else {
			// 	$('#get_yz').off('click');
			// }
		}
	}

	function countdown(tag, time) {
		var i = time;
		tag.innerHTML = i + '秒后获取';
		countdowntimer = setInterval(function() {
			i--;
			tag.innerHTML = i + '秒后获取';
			if (i === 0) {
				tag.innerHTML = '重新获取';
				i = time;
				clearInterval(countdowntimer); // 清除定时器
				// $('#get_yz').on('click', function() {
				// 	getYzcode();
				// });
				countdowntimer = null;
			}
		}, 1000);
	}

	// 领奖
	function sub_message() {
		var javai = vge.common + '/vjifenInterface/user/savePrize'
		var req = {
			"projectServerName":"qmbaipi",
			"openid": openid,
			"username": $('#contact').val(),
			"idcard": "idcard",
			"phonenum": $('#tel').val(),
			"address": "address",
			"prizeVcode": sessionStorage.prizeVcode,
			"prizeInfoKey": sessionStorage.infoKey,
			"captcha": $('#yz_code').val()
		};
		vge.callJApi(javai, req, function(jo) {
			if (jo.result.code == '0') {
				if (jo.result.businessCode == '0') {
					title_tip('尊敬的用户', '领取成功！', '我知道了');
					$('.yz_box,.tj_box .tj').css('display', 'none');
					$('.tj_box .tip').css('display', 'block');
					currentPagePrize = 1;
					$('.list_prize').empty(); //清空重新来一遍
					queryPrizeList();
				} else {
					title_tip('尊敬的用户', jo.result.msg, '我知道了');
				}
			} else {
				title_tip('尊敬的用户', jo.result.msg, '我知道了');
			}
		})
	}
	
	

	// 二维码生成
	var qrcode = new QRCode("qrcodepage", {
        width:128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.M
    }),
    dom_qrbtn = document.getElementById('showcode'),
    canvas = document.getElementById('qrcodepage').childNodes[0];

    dom_qrbtn.addEventListener('click', function(ev) {
        qrcode.clear();
        var level = QRCode.CorrectLevel.M,
            size = 128;
        qrcode._htOption.correctLevel = level;
        qrcode._htOption.width = size;
        qrcode._htOption.height = size;
        canvas.width = size;
        canvas.height = size;
        qrcode.makeCode('HTTP://VJ1.TV/W/'+$('#qrcode').val());
        $('.qrcode_box').css('display','block');
    });
    $('.closeQrcode').on('click',function(){
        $('.qrcode_box').css('display','none');
	});
	

	// // 生成二维码
	// var qrcode = new QRCode(document.getElementById("ticketQr"), {
	// 	width : 110,
	// 	height : 110
	// });
	// var url = 'http://www.baidu.com'   // gotoUrl
	// qrcode.makeCode(url.replace("invitation","main"))
	
	function mytx() {
	    if (tx) {
	        tx = false;
	        dom_loading.style.display = 'block';
	        give_spack();
	    }
	}
	
	dom_mask.addEventListener('click', function () {
	    ifremeber();
	}, false);
	
	function give_spack() { //提现
	    var javai = vge.common + '/vjifenInterface/gifts/getGiftspack';
	    var req = {
			"projectServerName":"qmbaipi",
	        "openid": openid,
	        "hbopenid": hbopenid
	    };
	    vge.callJApi(javai, req,
	        function (jo) {
	            dom_loading.style.display = 'none';
	            if (jo.result.code == '0') {
	                if (jo.result.businessCode === '0') {
	                    dom_mask.style.display = 'block';
	                    tx = false;
	                } else if (jo.result.businessCode === '1') { //1
	                    title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
	                    tx = true;
	                } else if (jo.result.businessCode === '2') { //1
	                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
	                    tx = true;
	                } else if (jo.result.businessCode === '4') { //1
	                    title_tip('提现处理中，请稍后查看详细记录', '我知道了');
	                    tx = true;
	                } else if (jo.result.businessCode === '3') { //1
	                    title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
	                    tx = true;
	                } else if (jo.result.businessCode === '-1') { //-1
	                    title_tip('提 示', '系统升级中...', '我知道了');
	                    tx = true;
	                } else if (jo.result.businessCode === '-2') { //-1
	                    title_tip('提 示', '提现操作过于频繁', '我知道了');
	                    tx = true;
	                } else if (jo.result.businessCode === '5') { //5
	                    title_tip('尊敬的用户', jo.result.msg, '我知道了');
	                    tx = true;
	                } else {
	                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
	                    tx = true;
	                }
	            } else if (jo.result.code == '-1') {
	                title_tip('尊敬的用户', '系统升级中...', '我知道了');
	                tx = true;
	            } else { //code!='0'
	                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
	                tx = true;
	            }
	        });
	}
	$('#mon_list,#more').show();
	console.log('cccc')
	// 切换到红包记录
	$('.leftBtn').on('click', function () {
	    // 按钮样式切换
	    $('.btns span').removeClass('btnActive');
	    $('.leftSpan').addClass('btnActive');
	    $('#mon_list,#more').show();
		$('#coupon_list,#couponMore').hide();
	    $('#prize_list,#prizeMore').hide();
	    $('#jk_list,#jkMore').hide();
	});
	// 切换到优惠券
	$('.rightBtn').on('click', function () {
	    // 按钮样式切换
	    $('.btns span').removeClass('btnActive');
	    $('.rightSpan').addClass('btnActive');
		$('#coupon_list,#couponMore').show();
	    $('#mon_list,#more').hide();
		$('#prize_list,#prizeMore').hide();
	    $('#jk_list,#jkMore').hide();
	});

	// 切换到奖品
	$('.prizeBtn').on('click', function () {
	    // 按钮样式切换
	    $('.btns span').removeClass('btnActive');
		$('.centerL-Span').addClass('btnActive');
		$('#prize_list,#prizeMore').show();
		$('#mon_list,#more').hide();
	    $('#jk_list,#jkMore').hide();
		$('#coupon_list,#couponMore').hide();
	});

	// 切换到集卡
	$('.jkBtn').on('click', function () {
	    // 按钮样式切换
		$('.btns span').removeClass('btnActive');
		$('.centerR-Span').addClass('btnActive');
		$('#jk_list,#jkMore').show();
		$('#mon_list,#more').hide();
		$('#prize_list,#prizeMore').hide();
		$('#coupon_list,#couponMore').hide();
	});
	
	var tpl = '<li class="coupon_li" index=[index]>' +
	    '<p class="coupon_left">' +
	    '<span class="coupon_title">[couponType]<span>[couponName]</span></span>' +
	    '<span class="coupon_main" style="display:[display];">优惠券码：<span class="coupon_code">[couponCode]</span></span>' +
	    '<span class="coupon_earn">领取日期：[couponEarnTime]</span>' +
	    '</p>' +
	    '<p class="coupon_right">' +
	    '<span class="coupon_icon">￥</span>' +
	    '<span class="coupon_money">[couponMoney]</span>' +
	    '<span class="coupon_use" tickType="[tickType]" gotoUrl="[gotoUrl]">立即使用</span>' +
	    '</p>' +
	    '</li>';
	getCouponList();
	// 请求优惠券列表
	function getCouponList() {
	    couponOnepage_note(currentPageCoupon);
	
	    function couponOnepage_note(currentPageCoupon, cb) {
	        var javai = vge.common + '/vjifenInterface/ticketUserRecord/queryTicketUserRecordList';;
	        var req = {
				"projectServerName":"qmbaipi",
	            "openid": openid,
	            "currentPage": currentPageCoupon,
	            "count": count
	        };
	        $.ajax({
	            type: "POST",
	            url: javai,
	            data: JSON.stringify(req),
	            dataType: 'json',
	            success: function (jo, status, xhr) {
	                if (jo.result.code == '0') {
	                    if (jo.result.businessCode === '0') {
							var list = jo.reply;
							console.log(list);
							cardList = list;
							console.log(cardList)
	                        if (currentPageCoupon == 1) {
	                            if (list.length < count) {
	                                dom_couponMore.innerHTML = '仅显示近30天的记录';
	                                dom_couponMore.style.fontSize = '0.6rem';
	                                dom_couponMore.removeEventListener('click', getmCoupon, false);
	                            }
	                        }
	                        if (list.length === 0 || list === undefined) {
	                            dom_couponMore.innerHTML = '仅显示近30天的记录';
	                            dom_couponMore.style.fontSize = '0.6rem';
	                            dom_couponMore.removeEventListener('click', getmCoupon, false);
	                        }
	                        console.log(list.length)
	                        // list.length = 1;
	                        for (k = 0 ; k < list.length; k++) {
	                            console.log(list[k].ticketCode) //循环的是新的啊
	                            if (list[k].ticketType == '1') { //券码
	                                var dom_li = tpl.replace('[couponType]', list[k].categoryName)
	                                    .replace('[couponName]', '（' + list[k].ticketName + '）')
	                                    .replace('[couponCode]', list[k].ticketCode)
	                                    .replace('[couponEarnTime]', list[k].earnTime)
	                                    .replace('[couponExpiratioTime]', list[k].expiratioTime)
	                                    .replace('[couponMoney]', parseFloat(list[k].ticketMoney))
	                                    .replace('[display]', 'block')
	                                    .replace('[tickType]', list[k].ticketType)
	                                    .replace('[gotoUrl]', list[k].ticketCode)
	                                    .replace('[index]', k);
	                                $('#coupon_list').append(dom_li);
	                            } else if (list[k].ticketType == '0') { //链接
	                                var dom_li = tpl.replace('[couponType]', list[k].categoryName)
	                                    .replace('[couponName]', '（' + list[k].ticketName + '）')
	                                    .replace('[couponCode]', list[k].ticketCode)
	                                    .replace('[couponEarnTime]', list[k].earnTime)
	                                    .replace('[couponExpiratioTime]', list[k].expiratioTime)
	                                    .replace('[couponMoney]', parseFloat(list[k].ticketMoney))
	                                    .replace('[display]', 'none')
	                                    .replace('[tickType]', list[k].ticketType)
	                                    .replace('[gotoUrl]', list[k].ticketCode)
	                                    .replace('[index]', k);
	                                $('#coupon_list').append(dom_li);
								} else if (list[k].ticketType == '3') { //青啤官方商城优惠券  状态不判断
	                                var dom_li = tpl.replace('[couponType]', list[k].categoryName)
	                                    .replace('[couponName]', '（' + list[k].ticketName + '）')
	                                    .replace('[couponCode]', list[k].ticketCode)
	                                    .replace('[couponEarnTime]', list[k].earnTime)
	                                    .replace('[couponExpiratioTime]', list[k].expiratioTime)
	                                    .replace('[couponMoney]', parseFloat(list[k].ticketMoney))
	                                    .replace('[display]', 'none')
	                                    .replace('[tickType]', list[k].ticketType)
	                                    .replace('[gotoUrl]', list[k].ticketCode)
										.replace('[index]', k);
									console.log('aa')
									$('#coupon_list').append(dom_li);							
								}
	                            // console.log(document.getElementsByClassName('coupon_use')[k])
	                            // document.getElementsByClassName('coupon_use')[k].addEventListener('click',function(){
								// 	console.log(k)
								// 	var index = $(this).parent('.coupon_right').parent('li').index();
	                            //     var couponCode = $(this).parent('.coupon_right').prev().children('.coupon_main').children('.coupon_code').html();
	                            //     var tickType = $(this).attr('tickType');
	                            //     if (tickType == '1') { // 券码
	                            //         copy(couponCode, index, function () {
	                            //             title_tip('提示', '复制成功，点击确定去领取', '确定', '', gotoCoupon);
	                            //         })
	                            //     } else if (tickType == '0') {  // 链接
	                            //         var gotoUrl = $(this).attr('gotoUrl');
	                            //         window.location.href = gotoUrl;
								// 	} else if (tickType == '3') {  // 青啤官方优惠券
								// 		var ticketMoney = $(this).prev('.coupon_money').html();
								// 		var categoryName = '青啤官方商城优惠券';
								// 		var ticketName = $(this).parent('.coupon_right').prev().children('.coupon_title').children('span').html();
                                //         console.log($(this))
                                //         console.log('kkkkkkkkk')
								// 		// var ticketMoney = $(this).attr('couponMoney');  //优惠券面额
								// 		// var ticketName = $(this).attr('couponName');    //优惠券名称
								// 		// var categoryName = $(this).attr('couponType');  //优惠券类型名称 【官方商场优惠券】
								
								// 		$('.ticketBox .couponMoney').html(ticketMoney); // 面额20
								// 		$('.ticketBox .couponName').html(categoryName); // 官方商城优惠券
								// 		$('.ticketBox .proText').html(ticketName);  // 白啤11度

								// 		var gotoUrl = $(this).attr('gotoUrl');
								// 		// window.location.href = gotoUrl;
								// 		// A.contains(B)    
                                        
								// 		var obj = document.getElementById("ticketQr");
								// 		var qrimg = obj.childNodes;
								// 		// var B = obj.getElementsByTagName("img");
								// 		console.log(qrimg)
                                //         if(qrimg.length > 0){
								// 			var len = qrimg.length;
								// 			for(var i = 0; i < len; i++) {
								// 				qrimg[i].parentNode.removeChild(qrimg[i]);
								// 			}
								// 		}
										
								// 		// if(B.length <= 0) {
								// 			// 生成二维码
								// 			var url = gotoUrl
								// 			console.log(url);
								// 			new QRCode(document.getElementById("QRCodeNone"), {
								// 				text: url,
								// 				width : 110,
								// 				height : 110,
								// 				colorDark : "#000000",   
								// 				colorLight : "#ffffff",   
								// 				correctLevel : QRCode.CorrectLevel.H  
								// 			});
								// 			// var url = gotoUrl  // 'http://www.baidu.com' 
								// 			// qrcode.makeCode(url.replace("invitation","main"))

								// 			var canvas=document.getElementsByTagName('canvas')[0];
								// 			var img = convertCanvasToImage(canvas);
								// 			// console.log(img)
								// 			$('#ticketQr').append(img);// 添加DOM
								// 			//从 canvas 提取图片 image  
								// 			function convertCanvasToImage(canvas) {  
								// 				//新建Image对象
								// 				var image = new Image();  
								// 				// canvas.toDataURL 返回的是一串Base64编码的URL
								// 				image.src = canvas.toDataURL("image/png");  
								// 				console.log(image.src)
								// 				return image;  
								// 			}     
								// 		// }

								// 		$('#ticketQr').show();
								// 		$('.ticketToast').show(); // 显示优惠券

								// 		var cavs = document.getElementById("QRCodeNone");
								// 		var cavsIt = cavs.getElementsByTagName("canvas");
								// 		var cavsImg = cavs.getElementsByTagName("img");
								// 		if(cavsIt.length > 0 ){
								// 			var lencavIt = cavsIt.length;
								// 			for(var i = 0; i < lencavIt; i++) {
								// 				cavsIt[i].parentNode.removeChild(cavsIt[i]);
								// 			}
								// 		}
								// 		if(cavsImg.length > 0 ){
								// 			var lencavImg = cavsImg.length;
								// 			for(var i = 0; i < lencavImg; i++) {
								// 				cavsImg[i].parentNode.removeChild(cavsImg[i]);
								// 			}
								// 		}
										
	                            //     }
	                            // },false);
	                        }
							k = k + currentPageCoupon; //Emmm......啥意思
							// console.log(k)


	                        // if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
	                        //     $('.coupon_use').on('touchstart', function () {
	                        //         var index = $(this).parent('.coupon_right').parent('li').index();
	                        //         var couponCode = $(this).parent('.coupon_right').prev().children('.coupon_main').children('.coupon_code').html();
	                        //         var tickType = $(this).attr('tickType');
	                        //         if (tickType == '1') {
	                        //             copy(couponCode, index, function () {
	                        //                 title_tip('提示', '复制成功，点击确定去领取', '确定', '', gotoCoupon);
	                        //             })
	                        //         } else if (tickType == '0') {
	                        //             var gotoUrl = $(this).attr('gotoUrl');
	                        //             window.location.href = gotoUrl;
	                        //         }
	                        //     });
	                        // } else {
	                        //     $('.coupon_use').on('click', function () {
	                        //         // console.log($(this).parent('.coupon_right').parent('li').index());
	                        //         var index = $(this).parent('.coupon_right').parent('li').index();
	                        //         var couponCode = $(this).parent('.coupon_right').prev().children('.coupon_main').children('.coupon_code').html();
	                        //         var tickType = $(this).attr('tickType');
	                        //         // console.log(tickType);
	                        //         // console.log(tickType == '1');
	                        //         if (tickType == '1') {
	                        //             copy(couponCode, index, function () {
	                        //                 title_tip('提示', '复制成功，点击确定去领取', '确定', '', gotoCoupon);
	                        //             })
	                        //         } else if (tickType == '0') {
	                        //             var gotoUrl = $(this).attr('gotoUrl');
	                        //             window.location.href = gotoUrl;
	                        //         }
	                        //     });
	                        // }
	
	                        if (list.length < count) {
	                            // $('#no_CouponList').css('display', 'none');
	                            dom_couponMore.innerHTML = '仅显示近30天的记录';
	                            dom_couponMore.style.fontSize = '0.6rem';
	                            dom_couponMore.removeEventListener('click', getmCoupon, false);
	                            nextCoupon = false;
	                            return;
	                        }
	
	                    } else if (jo.result.businessCode === '1') {
	                        title_tip('尊敬的用户', '参数不完整', '我知道了');
	                    } else if (jo.result.businessCode === '2') {
	                        title_tip('尊敬的用户', '用户异常', '我知道了');
	                    } else {
	                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
	                    }
	                } else if (jo.result.code == '-1') {
	                    title_tip('尊敬的用户', '系统升级中...', '我知道了');
	                } else { //code!='0'
	                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
	                }
	            },
	            error: function (res, status, xhr) {
	                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
	            }
	        });
	    }
	    dom_couponMore.addEventListener('click', getmCoupon, false);
	
	    function getmCoupon() {
	        if (nextCoupon) {
	            ++currentPageCoupon;
	            couponOnepage_note(currentPageCoupon);
	        }
	    }
	}
	
	// 优惠券列表点击
	$("#coupon_list").on("click",".coupon_use",function(e){
		// console.log("on 点击一次");
		// console.log(cardList)
		// console.log(e.target.className)
		if(e.target.className == 'coupon_use'){     
			console.log($(this))
			var index = $(this).parent('.coupon_right').parent('li').index();
			var couponCode = $(this).parent('.coupon_right').prev().children('.coupon_main').children('.coupon_code').html();
			var tickType = $(this).attr('tickType');
			if (tickType == '1') { // 券码
				copy(couponCode, index, function () {
					title_tip('提示', '复制成功，点击确定去领取', '确定', '', gotoCoupon);
				})
			} else if (tickType == '0') {  // 链接
				var gotoUrl = $(this).attr('gotoUrl');
				window.location.href = gotoUrl;
			} else if (tickType == '3') {  // 青啤官方优惠券
				var ticketMoney = $(this).prev('.coupon_money').html();
				var categoryName = '青啤官方商城优惠券';
				var ticketName = $(this).parent('.coupon_right').prev().children('.coupon_title').children('span').html();
				
				// var ticketMoney = $(this).attr('couponMoney');  //优惠券面额
				// var ticketName = $(this).attr('couponName');    //优惠券名称
				// var categoryName = $(this).attr('couponType');  //优惠券类型名称 【官方商场优惠券】
		
				$('.ticketBox .couponMoney').html(ticketMoney); // 面额20
				$('.ticketBox .couponName').html(categoryName); // 官方商城优惠券
				$('.ticketBox .proText').html(ticketName);  // 白啤11度

				var gotoUrl = $(this).attr('gotoUrl');
				// window.location.href = gotoUrl;
				// A.contains(B)    
				
				var obj = document.getElementById("ticketQr");
				var qrimg = obj.childNodes;
				// var B = obj.getElementsByTagName("img");
				console.log(qrimg)
				if(qrimg.length > 0){
					var len = qrimg.length;
					for(var i = 0; i < len; i++) {
						qrimg[i].parentNode.removeChild(qrimg[i]);
					}
				}
				
				// if(B.length <= 0) {
					// 生成二维码
					var url = gotoUrl
					console.log(url);
					new QRCode(document.getElementById("QRCodeNone"), {
						text: url,
						width : 128,
						height : 128,
						colorDark : "#000000",   
						colorLight : "#ffffff",   
						correctLevel : QRCode.CorrectLevel.M  
					});
					// var url = gotoUrl  // 'http://www.baidu.com' 
					// qrcode.makeCode(url.replace("invitation","main"))

					var canvas=document.getElementsByTagName('canvas')[0];
					var img = convertCanvasToImage(canvas);
					// console.log(img)
					$('#ticketQr').append(img);// 添加DOM
					//从 canvas 提取图片 image  
					function convertCanvasToImage(canvas) {  
						//新建Image对象
						var image = new Image();  
						// canvas.toDataURL 返回的是一串Base64编码的URL
						image.src = canvas.toDataURL("image/png");  
						console.log(image.src)
						return image;  
					}     
				// }

				$('#ticketQr').show();
				$('.ticketToast').show(); // 显示优惠券

				var cavs = document.getElementById("QRCodeNone");
				var cavsIt = cavs.getElementsByTagName("canvas");
				var cavsImg = cavs.getElementsByTagName("img");
				if(cavsIt.length > 0 ){
					var lencavIt = cavsIt.length;
					for(var i = 0; i < lencavIt; i++) {
						cavsIt[i].parentNode.removeChild(cavsIt[i]);
					}
				}
				if(cavsImg.length > 0 ){
					var lencavImg = cavsImg.length;
					for(var i = 0; i < lencavImg; i++) {
						cavsImg[i].parentNode.removeChild(cavsImg[i]);
					}
				}
				
			} 		
		}     
	});
	
	// 关闭青啤电商优惠券
	$('.ticketClose').on('click', function(e) {
		e.stopPropagation();
		$('.ticketToast').css('display', 'none');
	})
	

	
	function copy(text, index, callback) {
	    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) { //ios
	        console.log('ios系统');
	        var copyDOM = document.querySelectorAll('.coupon_code')[index]; //要复制文字的节点 
	        console.log(copyDOM.innerHTML);
	        var range = document.createRange();
	        // 选中需要复制的节点  
	        range.selectNode(copyDOM);
	        // 执行选中元素  
	        window.getSelection().addRange(range);
	        // 执行 copy 操作  
	        var successful = document.execCommand('copy');
	        console.log(successful);
	        // alert(successful);
	        try {
	            var msg = successful ? 'successful' : 'unsuccessful';
	            console.log('copy is ' + msg);
	        } catch (err) {
	            console.log('Oops, unable to copy');
	        }
	        // 移除选中的元素  
	        window.getSelection().removeAllRanges();
	    } else {
	        console.log('andiro系统');
	        // 安卓复制的方法
	        var tag = document.createElement('input');
	        tag.setAttribute('id', 'cp_hgz_input');
	        tag.value = text;
	        document.getElementsByTagName('body')[0].appendChild(tag);
	        document.getElementById('cp_hgz_input').select();
	        document.execCommand('copy');
	        document.getElementById('cp_hgz_input').remove();
	    }
	    if (callback) {
	        callback()
	    }
	}
	
	function gotoCoupon() {
	    window.location.href = 'https://wqs.jd.com/promote/2015/exchangecoupons/index.html';
	}
	
	function loading() {
	    $('.loading').show();
	}
	
	function loaded() {
	    $('.loading').hide();
	}
	function ifremeber() {
		// flag为false代表券码的判断关注
		var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.qmbpappid;
		vge.ajxget(requrl, 5000, function (r) {
			try {
				var o = JSON.parse(r);
				if (o.subscribe == '0') { //未关注
					window.location.replace('http://' + location.host + '/v/qmbp/attention.html');
				} else { //已关注用户
					dom_mask.style.display = 'none';
					window.location.reload();
				}
			} catch (e) {
				vge.clog('errmsg', [requrl, e]);
			}
		}, function (err) {
			vge.clog('errmsg', [requrl, err]);
		});
	}
	
})()