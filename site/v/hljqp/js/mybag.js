	var show = document.getElementById("show"),
		hide = document.getElementById("hide"),
		H = document.documentElement.clientHeight || document.body.clientHeight,
		itpl_onenote = document.getElementById("onenote_tpl").innerHTML,
		dom_bottle = document.getElementById('bottle'),
		dom_add = document.getElementById('add_money'),
		dom_total = document.getElementById('total_money'),
		no_list = document.getElementById('no_list'),
		dom_more = document.getElementById('more'),
		mon_list = document.getElementById('mon_list'),
		dom_btn = document.getElementsByClassName('btn')[0],
		dom_wxmark = document.getElementsByClassName('wxmark')[0],
		dom_mybagtop = document.getElementsByClassName('mybag_top')[0];

	var args = vge.urlparse(location.href),
		hbopenid = args.hbopenid,
		openid = args.openid;

	var currentpage=1,
		next=true,
		count=10,
		flag=true,//提现标志
		first=true;
	
	attentioned();
	
	function attentioned () {
		onepage_note(currentpage);
		function onepage_note(currentpage,cb) {
			var javai = vge.hljqp + '/DBTHLJQPInterface/gifts/queryAllGiftsList';
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
		            		dom_bottle.innerHTML=jo.reply.total;//喝了瓶数
		            		dom_add.innerHTML = jo.reply.totalMoney;//剩余金额
		            		dom_total.innerHTML = jo.reply.giftsMoney;//已领红包
							sessionStorage.totalMoney = jo.reply.totalMoney;
							if(jo.reply.total.length>3){//位数大于3位  字号2rem
								document.getElementById("num").style.fontSize = '2rem';
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
							if (mon_where==='扫码中奖') {
								params.monwhere='扫码中奖';
								params.money='+'+lst[i].earnMoney;
								params.color='#ea5244';
							} else{
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
								params.color='#000000';
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
						dom_bottle.innerHTML='0';//喝了瓶数
		            	dom_add.innerHTML = '0.00';//剩余金额
		            	dom_total.innerHTML = '0.00';//已领红包
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
		function getm(){
			if (next) {
				++currentpage;
				onepage_note(currentpage);
			}
		}
	}

	dom_btn.addEventListener('click',function(){
		_hmt.push(['_trackEvent', 'click', '点击提现', 'mybag']);
		if(flag){
			// title_tip('提 示', '微信提现升级中，您可先扫码，红包会自动累积哦', '我知道了');
			give_spack();
			flag = false;
		}
	},false);

	function give_spack() {//提现
		var javai = vge.hljqp + '/DBTHLJQPInterface/gifts/getGiftspack';
		var req = {
			"openid": openid,
			"hbopenid":hbopenid
		};
		vge.callJApi(javai, req,
	        function(jo) {
	            if (jo.result.code == '0') {
		            if (jo.result.businessCode === '0') {
		            	dom_wxmark.style.display = 'block';
		            }  else if (jo.result.businessCode === '1') { //1
			            title_tip('提 示', '您的待提余额不足1元，再喝几瓶攒够1元发红包！', '我知道了');
			        } else if (jo.result.businessCode === '2') { //后台金额不足
			            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			        } else if (jo.result.businessCode === '3') { //1
			            title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
			        } else if (jo.result.businessCode === '-1') { //-1
			            title_tip('提 示', '系统升级中...', '我知道了');
			        } else if (jo.result.businessCode === '4'){
			        	title_tip('尊敬的用户', '提现处理中，请稍后查看详细记录!', '我知道了');
			        } else {
			            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			        }
	            } else { //code!='0'
		            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
		            first = true;
	            }
	    	});
	}

	dom_wxmark.addEventListener("click",function(){
		var requrl='http://'+vge.o3host+'/wx3/uinfo2?openid='+openid+'&appid='+vge.hbqpappid;
		vge.ajxget(requrl, 5000, function(r){
			try{
				var o = JSON.parse(r);
				if(o.subscribe==0) {//未关注
					window.location.replace('http://'+location.host+'/v/hljqp/attention.html');
				}else{//已关注用户
					dom_wxmark.style.display = 'none';
					window.location.replace(location.href);
				}
			}catch(e){
				vge.clog('errmsg', [requrl, e]);
			}
		},function(err){
			vge.clog('errmsg', [requrl, err]);
		});
	},false);

	show.addEventListener("click",function(){
		_hmt.push(['_trackEvent', 'click', '查看红包列表', 'mybag']);
		// hide.style.display = 'block';
		dom_mybagtop.style.marginTop = -H + "px";
	});
	hide.addEventListener("click",function(){
		// hide.style.display = 'none';
		dom_mybagtop.style.marginTop = 0 + "px";
	});