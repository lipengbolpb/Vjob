(function(){
	var show = document.getElementById("show"),
		H = document.documentElement.clientHeight || document.body.clientHeight;
		hide = document.getElementById("hide");
	var	list_show=document.getElementById('list_show'),
		mon_list=document.getElementById('mon_list'),
		dom_more=document.getElementById('more'),	
		no_list=document.getElementById('no_list'),
		bottle_num=document.getElementById('bottle_num'),
		add_money=document.getElementById('add_money'),
		dom_balance=document.getElementById('balance'),
		tx_btn = document.getElementById("tx_btn"),
		dom_mask = document.getElementById('wxmark'),
		itpl_onenote=document.getElementById('onenote_tpl').innerHTML;

	show.addEventListener("click",function(){
		_hmt.push(['_trackEvent', 'click', '查看红包列表', 'mybag']);
		document.getElementsByClassName("mybag_top")[0].style.marginTop = -H + "px";
		this.style.display = 'none';
		tx_btn.style.display='none';
		hide.style.display = 'block';
	});
	hide.addEventListener("click",function(){
		document.getElementsByClassName("mybag_top")[0].style.marginTop = 0 + "px";
		this.style.display = 'none';
		tx_btn.style.display='block';
		show.style.display = 'block';
	});

	var args = vge.urlparse(location.href),
		openid = args.openid,
		hbopenid = args.hbopenid,
		unionid = sessionStorage.unionid===undefined?'':sessionStorage.unionid;
		// openid = sessionStorage.openid === undefined?'':sessionStorage.openid;
	var currentpage=1,next=true,count=10,first=true,flag=true;

	//截取openid，去除#
	if(location.href.indexOf('#') != -1){
		openid = openid.substr(0,openid.length-1);
	}
	
   	attentioned();
	function attentioned () {
		// alert('hbopenid:'+hbopenid+',openid:'+openid,'currentpage:'+currentpage,'count:'+count);
		onepage_note(currentpage);
		function onepage_note(currentpage,cb) {
			var javai = vge.common + '/vjifenInterface/gifts/queryAllGiftsList';//华南红包列表接口
			var req = { "projectServerName": "huanan",
				"openid":openid,
				"hbopenid":hbopenid,//"广东青啤openid"
				"currentPage": currentpage,
	    		"count": count
			};
			vge.callJApi(javai, req, function(jo) {
				if (jo.result.code==='0') {
		            if( jo.result.businessCode==='0') { //  jo.reply.objList!==undefined && jo.reply.objList.length>0
		            	if(currentpage==1){
		            		bottle_num.innerHTML=jo.reply.total;
			            	dom_balance.innerHTML=jo.reply.totalMoney;
			            	add_money.innerHTML=jo.reply.giftsMoney;
		            	}
						var i=0, lst=jo.reply.objList, l=lst.length;
						if (l===0 || lst === undefined) {
							dom_more.innerHTML = '仅显示近30天的记录';
							dom_more.style.fontSize = '0.6rem';
							dom_more.removeEventListener('click',getm,false);
							if (first) {
								mon_list.style.display='none';//红包列表
								no_list.style.display='block';//'您还没有红包记录'的提示信息
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
								params.color='#038f42';
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
								params.color='#ec5345';
							}
							params.gettime=lst[i].earnTime;
							mon_list.innerHTML += vge.renderTpl(itpl_onenote, params);
						}
						if (cb!==undefined) {
							cb();
						}
						if (l<count || l=== parseInt(jo.reply.total)) {
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
		function getm() {//加载更多
			_hmt.push(['_trackEvent', 'click', '点击加载更多', 'mybag']);
			if (next) {
				++currentpage;
				onepage_note(currentpage);
			}
		}

		tx_btn.addEventListener('click',function () {
			_hmt.push(['_trackEvent', 'click', '点击提现按钮', 'mybag']);
				if (flag) {
					// title_tip('提 示', '微信提现升级中，您可先扫码，红包会自动累积哦', '我知道了');
					//调取发红包接口
					give_spack ();	
				}
		},false);

		dom_mask.addEventListener('click',function () {
			dom_mask.style.display='none';
			window.location.replace(location.href);
		},false);
		function give_spack() {
		_hmt.push(['_trackEvent', 'click', '发送提现请求', 'mybag']);
		var javai = vge.common + '/vjifenInterface/gifts/getGiftspack';
		var req = { "projectServerName": "huanan",
			"openid":openid,
			"hbopenid":hbopenid
		};
		vge.callJApi(javai, req,
		function(jo) {
			if (jo.result.code == '0') {
				if (jo.result.businessCode === '0') {
					dom_mask.style.display='block';
					flag=false;
				} else if (jo.result.businessCode === '1') { //1
					title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
				} else if (jo.result.businessCode === '-1') { //-1
					title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
				} else if (jo.result.businessCode === '-2') { //-2
	            	title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
	        	} else if (jo.result.businessCode === '2') { //-1
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				} else if (jo.result.businessCode === '3') { //-1
					title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
				} else if (jo.result.businessCode === '4'){
					title_tip('尊敬的用户', '提现处理中，请稍后查看详细记录!', '我知道了');
				} else if (jo.result.businessCode === '5') { //-1
				    title_tip('提 示', jo.result.msg, '我知道了');
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


		
	}

})();
