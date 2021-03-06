(function(){
	var show = document.getElementById("show"),
		hide = document.getElementById("hide"),
		H = document.documentElement.clientHeight || document.body.clientHeight,
		bottle_num = document.getElementById("bottle_num"),
		dom_balance = document.getElementById("dom_balance"),
		add_money = document.getElementById("add_money"),
		no_list = document.getElementById("no_list"),
		mon_list = document.getElementById("mon_list"),
		itpl_onenote = document.getElementById("onenote_tpl").innerHTML,
		tx_btn = document.getElementById("tx_btn"),
		dom_tx = document.getElementById('tx'),
		btn_box = document.getElementById("btn_box"),
		dom_more = document.getElementById("more");
		
	var args = vge.urlparse(location.href),
		openid = args.openid,
		hbopenid = args.hbopenid,
		unionid = sessionStorage.unionid===undefined?'':sessionStorage.unionid;
	
	if(sessionStorage.gzh){//扫码进入
		tx_btn.style.display = 'none';
		show.style.float = 'none';
		show.style.width = '90%';
		show.addEventListener("click",function(){
			_hmt.push(['_trackEvent', 'click', '查看记录列表', 'mybag']);
			var requrl='http://'+vge.o3host+'/wx3/uinfo2?openid='+openid+'&appid='+vge.hbqpappid;
			vge.ajxget(requrl, 5000, function(r){
				try{
					var o = JSON.parse(r);
					if(o.subscribe==0) {//未关注
						_hmt.push(['_trackEvent', 'click', '去关注', 'mybag']);
						window.location.replace('http://'+location.host+'/v/hbqp20170426/attention.html');
					}else{//已关注用户
						_hmt.push(['_trackEvent', 'click', '已关注', 'mybag']);
						btn_box.style.display = 'none';
						hide.style.display = 'block';
						document.getElementsByClassName("mybag_top")[0].style.marginTop = -H + "px";
					}
				}catch(e){
					vge.clog('errmsg', [requrl, e]);
				}
			},function(err){
				vge.clog('errmsg', [requrl, err]);
			});
		},false);
	}else{//公众号进入
		show.addEventListener('click',function(){
			btn_box.style.display = 'none';
			hide.style.display = 'block';
			document.getElementsByClassName("mybag_top")[0].style.marginTop = -H + "px";
		},false);
	}
	var currentpage=1,
		next=true,
		count=10,
		flag=true,//提现标志
		first=true;

	var tx = 0;
		
	attentioned();
	
	function attentioned () {
		onepage_note(currentpage);
		function onepage_note(currentpage,cb) {
			var javai = vge.hbqp + '/DBTHBQPInterface/gifts/queryAllGiftsList';
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
		            		var dom_total = Number(jo.reply.totalMoney);
		            		var dom_gifts = Number(jo.reply.giftsMoney);
		            		dom_total = dom_total.toFixed(2);
		            		dom_gifts = dom_gifts.toFixed(2);
		            		if(sessionStorage.totalAccountMoney){
		            			dom_tx.innerHTML = sessionStorage.totalAccountMoney;
		            		}else{
		            			dom_tx.innerHTML = '0.00';
		            		}
		            		bottle_num.innerHTML=jo.reply.total;
			            	dom_balance.innerHTML=dom_total;
			            	add_money.innerHTML=dom_gifts;
			            	tx = jo.reply.totalMoney;
		            	}
						var i=0, lst=jo.reply.objList, l=lst.length;
						if (l===0 || lst === undefined) {
							dom_more.innerHTML = '仅显示近30天的记录';
							dom_more.style.fontSize = '0.6rem';
							dom_more.removeEventListener('click',getm,false);
							if (first) {
								mon_list.style.display='none';
								no_list.style.display='block';
								first=false;
							} else{
								no_list.style.display='none';
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
								params.money='+'+lst[i].earnMoney;
								params.color='#ffffff';
							} else if(mon_where==='签到红包'){
								params.monwhere=mon_where;
								params.money='+'+lst[i].earnMoney;
								params.color='#ffffff';
							} else {
								params.color='#ffffff';
								if(lst[i].extractStatus=='0'){
									params.monwhere='提现成功';
									params.money='-'+lst[i].earnMoney;
								}else if(lst[i].extractStatus=='1'){
									params.monwhere='提现失败_金额已退还';
									params.money=lst[i].earnMoney;
								}else if(lst[i].extractStatus=='2'){
									params.monwhere='提现处理中';
									params.money='-'+lst[i].earnMoney;
								}
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
						bottle_num.innerHTML='0';
			            dom_balance.innerHTML='0.00';
			            add_money.innerHTML='0.00';
			            dom_tx.innerHTML = '0.00';
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
	
	tx_btn.addEventListener('click',function(){
		if(flag){
			give_spack();
			flag = false;
		}
	},false);
	
	function give_spack() {//提现
		_hmt.push(['_trackEvent', 'click', '提现', 'mybag']);
//		title_tip('提 示', '微信提现升级中，您可先扫码，红包会自动累积哦！', '我知道了');
		var javai = vge.hbqp + '/DBTHBQPInterface/gifts/getGiftspack';
		var req = {
			"openid": openid,
			"hbopenid":hbopenid
		};
		vge.callJApi(javai, req,
	        function(jo) {
	            if (jo.result.code == '0') {
		            if (jo.result.businessCode === '0') {
		            	sessionStorage.totalAccountMoney = tx;
		            	window.location.reload();
		            } else if (jo.result.businessCode === '1') { //1
			            title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
			        } else if (jo.result.businessCode === '4') { //4
			            title_tip('提 示', '提现处理中，请稍后查看详细记录', '我知道了');
			        } else if (jo.result.businessCode === '-1') { //-1
			            title_tip('提 示', '系统升级中...', '我知道了');
			        } else if (jo.result.businessCode === '2') { //-1
			        	first = true;
			            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			        } else if (jo.result.businessCode === '3') { //-1
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
	
	
	hide.addEventListener("click",function(){
		hide.style.display = 'none';
		btn_box.style.display = 'block';
		document.getElementsByClassName("mybag_top")[0].style.marginTop = 0 + "px";
	});
})();
