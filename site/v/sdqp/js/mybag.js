(function(){
	var show = document.getElementById("show"),
		hide = document.getElementById("hide"),
		mybag_bottom = document.querySelector('.mybag_bottom'),
		tx_btn = document.getElementById('tx_btn'),
		dom_alert = document.getElementById('alert'),
		dom_balance = document.getElementById('dom_balance'),
		add_money = document.getElementById('add_money'),
		dom_wxmark = document.getElementById('wxmark'),
		bottle_num = document.getElementById('bottle'),
		dom_more = document.getElementById("more"),
		mon_list = document.getElementById("mon_list"),
		no_list = document.getElementById("no_list"),
		itpl_onenote=document.getElementById('onenote_tpl').innerHTML,
		L = document.documentElement.offsetWidth  || document.body.offsetWidth ;
		
		mybag_bottom.style.left = L+'px';

	var args = vge.urlparse(location.href),
		openid = args.openid,
		hbopenid = args.hbopenid;
	
	if(openid.indexOf('#')!== -1){
		openid = openid.substr(0,openid.length-1);	
	}
	var currentpage=1,
		next=true,
		count=10,
		flag=true,//提现标志
		first=true;
	var h = document.body.clientHeight;
	attentioned();
	
	function attentioned () {
		onepage_note(currentpage);
		function onepage_note(currentpage,cb) {
			var javai = vge.sdqp + '/DBTSDQPInterface/gifts/queryAllGiftsList';
			var req = {
				"openid":openid,
				"hbopenid":hbopenid,
				"currentPage": currentpage,
	    		"count": count
			};
			vge.callJApi(javai, req, function(jo) {
				if (jo.result.code==='0') {
		            if( jo.result.businessCode==='0') { 
		            	if(currentpage ==1){
		            		bottle_num.innerHTML=jo.reply.total;
			            	dom_balance.innerHTML=jo.reply.totalMoney;
			            	add_money.innerHTML=jo.reply.giftsMoney;
			            	if(jo.reply.total>=100&&jo.reply.total<1000){
			            		bottle_num.style.fontSize = '0.8rem';
			            		bottle_num.style.top = '52%';
			            	}else if(jo.reply.total>=1000){
			            		bottle_num.style.fontSize = '0.55rem';
			            		bottle_num.style.top = '55%';
			            	}
			            	if(jo.reply.total>=100&&jo.reply.total<1000&&h<560){
			            		bottle_num.style.top = '53%';
			            	}
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
								params.color='#892a00';
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
								params.color='#892a00';
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
						dom_more.innerHTML = '仅显示近30天的记录';
						dom_more.style.fontSize = '0.6rem';
						dom_more.removeEventListener('click',getm,false);
						if (first) {
							mon_list.style.display='none';
							no_list.style.display='block';
							first=false;
						} else{
							no_list.style.display='none';
							dom_more.style.display='none';
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
		}
	},false);
	
	$('#jw_icon').css('display','block');
	$('#jw_icon').on('click',function(){
		$('#jiuw_box').fadeIn(1,function(){
			$('#jiuw_box div').css('bottom','0rem');
		});
		$('#jiuw_box .close').on('click',function(){
			$('#jiuw_box div').css('bottom','-11rem');
			$('#jiuw_box').fadeOut(1);
		});
	});
	
	function give_spack() {//提现
		var javai = vge.sdqp + '/DBTSDQPInterface/gifts/getGiftspack';
		var req = {
			"openid": openid,
			"hbopenid":hbopenid
		};
		vge.callJApi(javai, req,
	        function(jo) {
	            if (jo.result.code == '0') {
		            if (jo.result.businessCode === '0') {
		            	dom_wxmark.style.display = 'block';
		            	flag = false;
		            } else if (jo.result.businessCode === '1') { //1
			            title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
			        } else if (jo.result.businessCode === '-1') { //-1
			            title_tip('提 示', '系统升级中...', '我知道了');
			        } else if (jo.result.businessCode === '-2') { //-1
			            title_tip('提 示', '提现操作过于频繁', '我知道了');
			        } else if(jo.result.businessCode === '3'){
			            title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
		            	first = true;
			        }else if(jo.result.businessCode === '4'){
			        	title_tip('尊敬的用户', '提现处理中，请稍后查看详细记录!', '我知道了');
			        }else if (jo.result.businessCode === '5') { //5
			            title_tip('尊敬的用户', jo.result.msg, '我知道了');
			        } else {
			        	title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			        }
	            } else { //code!='0'
		            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
		            first = true;
	            }
	    	});
	}
	
	dom_alert.addEventListener("click",function(){
		var requrl='http://'+vge.o3host+'/wx3/uinfo2?openid='+openid+'&appid='+vge.hnqpappid;
		vge.ajxget(requrl, 5000, function(r){
			try{
				var o = JSON.parse(r);
				if(o.subscribe==0) {//未关注
					window.location.replace('http://'+location.host+'/v/sdqp/attention.html');
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
		hide.style.display = 'block';
		document.getElementsByClassName("mybag_top")[0].style.marginLeft = -L + "px";
		mybag_bottom.style.left = 0;
	});
	hide.addEventListener("click",function(){
		hide.style.display = 'none';
		document.getElementsByClassName("mybag_top")[0].style.marginLeft = 0 + "px";
		mybag_bottom.style.left = L+'px';
	});
})();
