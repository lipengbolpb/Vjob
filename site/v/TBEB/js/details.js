(function(){
	var args = vge.urlparse(location.href),
		openid = args.openid,
		hbopenid = args.hbopenid;
	
	if(openid==undefined){
		openid = sessionStorage.openid;
		hbopenid = sessionStorage.hbopenid;
	}
	sessionStorage.openid = openid;
	sessionStorage.hbopenid = hbopenid;
	
	
	var no_list = document.getElementById("no_list"),
		mon_list = document.getElementById("mon_list"),
		dom_more = document.getElementById("more"),
		itpl_onenote = document.getElementById("onenote_tpl").innerHTML;
		
	var currentpage=1,
		next=true,
		count=10,
		flag=false,//提现标志
		first=true;
	
	
	attentioned();
	$('.balance').css('opacity',1);
	$('.cash').css('opacity',1);
	$('#bottleNum').css('opacity',1);
	
	function attentioned () {
		onepage_note(currentpage);
		function onepage_note(currentpage,cb) {
			var javai = vge.tbeb + '/DBTECQPInterface/gifts/queryAllGiftsList';
			// alert(javai);
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
		            		$('.balance').html('<span class="icon">账户余额</span>：<span>'+jo.reply.totalMoney+'</span>元');
		            		$('.cash').html('<span class="icon">已领红包</span>：<span>'+jo.reply.giftsMoney+'</span>元');
		            		$('#bottleNum').html(jo.reply.total+'瓶');
		            	}
		            	if(jo.reply.totalMoney>=1){
//		            		give_spack();
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
							if (mon_where==='扫码中奖') {
								params.monwhere=mon_where;
								params.money='+'+lst[i].earnMoney+'元';
								params.color='#ffd46b';
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
								params.color='#ffffff';
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
						$('.balance').html('<span class="icon">账户余额</span>：<span>0.00</span>元');
	            		$('.cash').html('<span class="icon">已领红包</span>：<span>0.00</span>元');
	            		$('#bottleNum').html(0+'瓶');
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
	
	
	function give_spack() {//提现
		var javai = vge.tbeb + '/DBTECQPInterface/gifts/getGiftspack';
		var req = {
				"openid": openid,
				"hbopenid":hbopenid
			};
		vge.callJApi(javai, req,
	        function(jo) {
	            if (jo.result.code == '0') {
		            if (jo.result.businessCode === '0') {
		            	
		            	tx = true;
		            } else if (jo.result.businessCode === '1') { //1
			            title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
			            tx = false;
			        } else if (jo.result.businessCode === '4') { //1
			            title_tip('提 示', '提现处理中，请稍后查看详细记录', '我知道了');
			            tx = false;
			        } else if (jo.result.businessCode === '-2') { //-2
		            	title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
		        	} else if (jo.result.businessCode === '2') { //1
			            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			            tx = false;
			        } else if (jo.result.businessCode === '3') { //1
			            title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
			            tx = false;
			        } else if (jo.result.businessCode === '-1') { //-1
			            title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
			            tx = false;
			        }else {
			            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
		            	tx = false;
			        }
	            } else if(jo.result.code == '-1'){
	            	title_tip('尊敬的用户', '系统升级中...', '我知道了');
		            tx = false;
	            } else { //code!='0'
		            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
		            tx = false;
	            }
	   		});
	}
	
	$('#details').on('click',function(){
		$('.mybag_bottom').css('top','0');
	});
	$('#toBarrel').on('click',function(){
		location.href = '/v/TBEB/barrel.html?bizcode=666';
	});
	$('#hide').on('click',function(){
		$('.mybag_bottom').css('top','100%');
	});
})();
