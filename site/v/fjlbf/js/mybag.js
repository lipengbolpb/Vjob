(function(){
	
	'use strict';
	var no_list = document.getElementById("no_list"),
		mon_list = document.getElementById("mon_list"),
		dom_more = document.getElementById("more"),
		itpl_onenote = document.getElementById("onenote_tpl").innerHTML;
		
	var args = vge.urlparse(location.href),
		openid = '',
		hbopenid = '';

	if(sessionStorage.openid){
		openid = sessionStorage.openid;
		hbopenid = args.openid;
	}else{
		openid = args.openid;
		hbopenid = args.hbopenid;
	}
		
			
	var currentpage=1,
		next=true,
		count=10,
		first=true;
	
	//提现状态
	
	attentioned();
	function attentioned () {
		onepage_note(currentpage);
		function onepage_note(currentpage,cb) {
			var javai = vge.fjlbf + '/DBTFJLBInterface/gifts/queryAllGiftsList';
			var req = {
				"openid":openid,
				"hbopenid":hbopenid,
				"currentPage": currentpage,
	    		"count": count
			};
			vge.callJApi(javai, req, function(jo) {
				if (jo.result.code==='0') {
		            if( jo.result.businessCode==='0') {
		            	if(currentpage==1){
		            		$('span.num').html(`<i>${jo.reply.total}</i>瓶`);
		            		$('.totalMoney').html(Number(jo.reply.totalMoney).toFixed(2));
		            		$('.giftsMoney').html(Number(jo.reply.giftsMoney).toFixed(2));
							sessionStorage.totalMoney = jo.reply.totalMoney;
							if(jo.reply.totalMoney<1){
								$('#btn').css({'background-image':'url(/v/fjlbf/img/button_5.png)','-webkit-background-size': 'auto 100%'});
							}else{
								$('#btn').on('click',dot);
							}
		            	}
						var i=0, lst=jo.reply.objList, l=lst.length;
						if (l===0 || lst === undefined) {
							if (first) {
								dom_more.innerHTML = '仅显示近30天的记录';
								dom_more.style.fontSize = '0.6rem';
								dom_more.removeEventListener('click',getm,false);
								mon_list.style.display='none';
								no_list.style.display='block';
								first=false;
							} else{
								no_list.style.display='none';
								dom_more.innerHTML = '仅显示近30天的记录';
								dom_more.style.fontSize = '0.6rem';
								dom_more.removeEventListener('click',getm,false);
							}
							next=false;
							if (cb!==undefined) {
								cb();
							}
							return;
						}
						first=false;
						var params={},hs=[],mon_where='';
						no_list.style.display='none';
						dom_more.style.display='block';
						for (i = 0; i < l; ++i) {
							mon_where=lst[i].giftsName;
							if (mon_where==='扫码中奖'||mon_where==='签到红包') {
								params.monwhere=mon_where;
								params.money='+'+lst[i].earnMoney+'元';
								params.color='#910d08';
							} else{
								if(lst[i].extractStatus=='0'){
									params.monwhere='提现成功';
									params.money='-'+lst[i].earnMoney+'元';
								}else if(lst[i].extractStatus=='1'){
									params.monwhere='提现失败_金额已退还';
									params.money=lst[i].earnMoney+'元';
								}else if(lst[i].extractStatus=='2'){
									params.monwhere='提现处理中';
									params.money='-'+lst[i].earnMoney+'元';
								}
								params.color='#434544';
							}
							params.gettime=lst[i].earnTime;
							mon_list.innerHTML += vge.renderTpl(itpl_onenote, params);
						}
						if (cb!==undefined) {
							cb();
						}
						if (l<count) {
							no_list.style.display='none';
							dom_more.innerHTML = '仅显示近30天的记录';
							dom_more.style.fontSize = '0.6rem';
							dom_more.removeEventListener('click',getm,false);
							next=false;
							if (cb!==undefined) {
								cb();
							}
							return;
						}
					} else if(jo.result.businessCode==='2'){//无红包记录
						$('span.num').html(`<i>0</i>瓶`);
	            		$('.totalMoney').html('0.00');
	            		$('.giftsMoney').html('0.00');
		            	$('#btn').css({'background-image':'url(/v/fjlbf/img/button_5.png)','-webkit-background-size': 'auto 100%'});
						if (first) {
//							dom_more.style.display='none';
							dom_more.innerHTML = '仅显示近30天的记录';
							dom_more.style.fontSize = '0.6rem';
							dom_more.removeEventListener('click',getm,false);
							mon_list.style.display='none';
							no_list.style.display='block';
							first=false;
						} else{
							no_list.style.display='none';
							dom_more.innerHTML = '仅显示近30天的记录';
							dom_more.style.fontSize = '0.6rem';
							dom_more.removeEventListener('click',getm,false);
						}
						if (cb!==undefined) {
							cb();
						}
						next=false;
						return;
					} else{//businessCode:1失败
						title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
					}
				} else{//code!='0'
					title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
				}
			});
		}
		dom_more.addEventListener('click',getm,false);
		function getm() {
			if (next) {
				++currentpage;
				onepage_note(currentpage);
			}
		}
	}
	
	function dot(){//提现
		$('#btn').unbind();
		$('#btn').html('<img src="/v/fjlbf/img/loading.gif"/>');
		$('#btn').css({'background-image':'none','-webkit-background-size': 'auto 100%'});
		setTimeout(function(){
			$('#btn').on('click',dot);
		},1000);
		vge.clog('汾酒老白汾', ['vjf-h5-log',transTime(),openid,'汾酒老白汾',location.href.split('?')[0],'提现','点击提现']);
		give_spack();
	}
	
	function transTime(){
		var now = new Date();
		var mon = now.getMonth()+1<10?'0'+(now.getMonth()+1):now.getMonth()+1,
			day = now.getDate()<10?'0'+now.getDate():now.getDate(),
			h = now.getHours()<10?'0'+now.getHours():now.getHours(),
			m = now.getMinutes()<10?'0'+now.getMinutes():now.getMinutes(),
			s = now.getSeconds()<10?'0'+now.getSeconds():now.getSeconds();
		return now.getFullYear()+'-'+mon+'-'+day+'T'+h+":"+m+':'+s;
	}
	
	function ifremeber() {
		var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.fjlbfappid;
		vge.ajxget(requrl, 5000, function(r) {
			try {
				var o = JSON.parse(r);
				if(o.subscribe == '0') { //未关注
					window.location.replace('http://' + location.host + '/v/fjlbf/attention.html');
				}else{
					$('#tx_tip').css('display', 'none');
					$('.content').css('display','block');
					location.reload();
				}
			} catch(e) {
				vge.clog('errmsg', [requrl, e]);
			}
		}, function(err) {
			vge.clog('errmsg', [requrl, err]);
		});
	}

	function give_spack() {//提现
		// title_tip('提 示', '微信提现升级中，您可先扫码，红包会自动累积哦！', '我知道了');
		var javai = vge.fjlbf + '/DBTFJLBInterface/gifts/getGiftspack';
		var req = {
			"openid": openid,
			"hbopenid":hbopenid
		};
		vge.callJApi(javai, req,
	        function(jo) {
	        	$('#btn').html('');
	        	$('#btn').css({'background-image':'url(/v/fjlbf/img/button_1.png)','-webkit-background-size': 'auto 100%'});
	            if (jo.result.code == '0') {
		            if (jo.result.businessCode === '0') {
		            	$('#btn').css({'background-image':'url(/v/fjlbf/img/button_1.png)','-webkit-background-size': 'auto 100%'});
		            	$('#tx_tip').css('display','block');
						$('.content').css('display','none');
		            } else if (jo.result.businessCode === '1') { //1
			            title_tip('提 示', '您的待提余额不足1元，再喝几瓶攒够1元发红包！', '我知道了');
			        } else if (jo.result.businessCode === '4') { //1
			            title_tip('提 示', '提现处理中，请稍后查看详细记录', '我知道了');
			        } else if (jo.result.businessCode === '-2') { //-2
		            	title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
		        	} else if (jo.result.businessCode === '2') { //1
			            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			        } else if (jo.result.businessCode === '3') { //1
			            title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
			        } else if (jo.result.businessCode === '-1') { //-1
			            title_tip('提 示', '系统升级中...', '我知道了');
			        } else {
			            title_tip('尊敬的用户', jo.result.msg, '我知道了');
			        }
	            } else if (jo.result.code == '-1') {
	            	title_tip('尊敬的用户', '系统升级中...', '我知道了');
	            } else{ //code!='0'
		            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
	            }
	    	});
	}
	
	$('a.details').on('click',function(){
		$('div.details').css('top','0');
	});
	$('#hide').on('click',function(){
		$('div.details').css('top','100%');
	});
	
	$('#tx_tip').on('click',function(){
		ifremeber();
	});
	
})();
