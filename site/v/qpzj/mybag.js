(function() {
	"use strict";
	var dom_btn1=document.getElementById('btn1'),
		 dom_btn2=document.getElementById('btn2'),
		 dom_btn3=document.getElementById('btn3'),
		 btn_box=document.getElementById('btn_box'),
		 bgbanner=document.getElementById('bgbanner'),
		 list_show=document.getElementById('list_show'),
		 mon_list=document.getElementById('mon_list'),
		 dom_more=document.getElementById('more'),
		 no_list=document.getElementById('no_list'),
		 bottle_num=document.getElementById('bottle_num'),
		 add_money=document.getElementById('add_money'),
		 dom_balance=document.getElementById('balance'),
		 dom_mask=document.getElementById('mask'),
		 dom_inner=document.getElementById('inner'),
		 dom_outer=document.getElementById('outer'),
		 itpl_onenote=document.getElementById('onenote_tpl').innerHTML;
	var args = vge.urlparse(location.href),
		openid = args.openid,
		hbopenid = args.hbopenid,
		unionid = sessionStorage.unionid===undefined?'':sessionStorage.unionid;
	var currentpage=1,next=true,count=10,first=true,scrollhei=0,step=0,stepmax=20,timer1=null,timer2=null,once=true;

	//判断是否为关注用户
	var requrl='http://'+vge.o3host+'/wx3/uinfo2?openid='+openid+'&appid='+vge.qpzjappid;
	vge.ajxget(requrl, 5000, function(r){
		try{
			var o = JSON.parse(r);
			if(o.subscribe==0) {//未关注
				_hmt.push(['_trackEvent', 'click', '去引导关注', 'mybag']);
				// window.location.href = 'http://mp.weixin.qq.com/s?__biz=MzI4NjE2MzQ2Mw==&mid=504503815&idx=1&sn=f0d882a34d7a200444b8ac3b76683b7e#rd';
				window.location.replace('http://'+location.host+'/v/qpzj/attention.html');
			}else{//已关注用户
                dom_outer.style.display='block';
				if (unionid==='') {
					unionid=o.unionid;
				}
				attentioned();
			}
		}catch(e){
			vge.clog('errmsg', [requrl, e]);
		}
	},function(err){
		vge.clog('errmsg', [requrl, err]);
	});

	function attentioned () {
		bgbanner.style.height=document.body.offsetHeight+'px';
		// alert('hbopenid:'+hbopenid+',openid:'+openid);
		dom_btn1.addEventListener('click',function () {
			_hmt.push(['_trackEvent', 'click', '查看红包列表', 'mybag']);
			clearInterval(timer1);
			clearInterval(timer2);
			btn_box.style.display='none';
			list_show.style.display='block';
			scrollhei=bgbanner.offsetHeight;
			step=0;
			var start=0,
				end=scrollhei;
			var change=end/20;
			timer1=setInterval(function (){
				step++;
				if (step>stepmax) {
					step=0;
					clearInterval(timer1);
					// bgbanner.style.display='none';
					scrollhei=0;
					heichange();
					return;
				};
				start+=change;
				dom_inner.scrollTop=start;
			},15);
		},false);
		dom_btn2.addEventListener('click',function () {
			_hmt.push(['_trackEvent', 'click', '收起红包列表', 'mybag']);
			clearInterval(timer1);
			clearInterval(timer2);
			scrollhei=dom_inner.scrollTop;
			// bgbanner.style.display='block';
			step=0;
			var start=scrollhei;
			var change=-start/20;
			timer2=setInterval(function (){
				step++;
				if (step>stepmax) {
					step=0;
					clearInterval(timer2);
					list_show.style.display='none';
					btn_box.style.display='block';
					dom_outer.style.height='100%';
					dom_inner.style.height='100%';
					return;
				};
				start+=change;
				dom_inner.scrollTop=start;
			},15);
		},false);

		onepage_note(currentpage);
		function onepage_note(currentpage,cb) {
			var javai = vge.common + '/vjifenInterface/gifts/queryAllGiftsList';
			// alert(javai);
			var req = { "projectServerName": "zhejiang",
				"openid":openid,//"v积分"
				"hbopenid":hbopenid,//"v积分"
				"unionid":unionid,
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
							if (first) {
								dom_more.innerHTML = '仅显示近30天的记录';
								dom_more.style.fontSize = '18px';
								dom_more.removeEventListener('click',getm,false);
								mon_list.style.display='none';
								no_list.style.display='block';
								first=false;
							} else{
								no_list.style.display='none';
								dom_more.innerHTML = '仅显示近30天的记录';
								dom_more.style.fontSize = '18px';
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
						if (l<count) {
							no_list.style.display='none';
							dom_more.innerHTML = '仅显示近30天的记录';
							dom_more.style.fontSize = '18px';
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
							dom_more.style.fontSize = '18px';
							dom_more.removeEventListener('click',getm,false);
							mon_list.style.display='none';
							no_list.style.display='block';
							first=false;
						} else{
							no_list.style.display='none';
							dom_more.innerHTML = '仅显示近30天的记录';
							dom_more.style.fontSize = '18px';
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
			_hmt.push(['_trackEvent', 'click', '加载更多', 'mybag']);
			if (next) {
				++currentpage;
				onepage_note(currentpage, heichange);
			}
		}
		dom_btn3.addEventListener('click',function () {
			_hmt.push(['_trackEvent', 'click', '点击提现按钮', 'mybag']);
			if (parseInt(dom_balance.innerHTML)>=1) {
				dom_mask.style.display='block';
				if (once) {
					// title_tip('提 示','微信提现升级中，您可先扫码，红包会自动累积哦','我知道了');
					//调取发红包接口
					give_spack ();
					once=false;
				}
			} else{
				title_tip('提 示','您的红包金额不足，再喝几瓶攒够1元发红包！','我知道了');
			}
		},false);
		dom_mask.addEventListener('click',function () {
			dom_mask.style.display='none';
		},false);
		function give_spack () {
			_hmt.push(['_trackEvent', 'click', '发送提现请求', 'mybag']);
			var javai =  vge.common + '/vjifenInterface/gifts/getGiftspack';
			var req = { "projectServerName": "zhejiang",
				"openid":openid,//浙江
				"hbopenid":hbopenid,//v积分
				"unionid":unionid
			};
			vge.callJApi(javai, req, function(jo) {
				if (jo.result.code=='0') {
	            if( jo.result.businessCode==='0') {
	            		mon_list.innerHTML='';
	            		dom_more.style.display='none';
	            		no_list.style.display='none';
						onepage_note(currentpage);//提现后再调用列表接口加载列表
					} else if( jo.result.businessCode==='1'){//1
						title_tip('提 示','您的红包金额不足，再喝几瓶攒够1元发红包！','我知道了');
					} else if( jo.result.businessCode==='2'){//1
						title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
					} else if (jo.result.businessCode === '-2') { //-2
		            	title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
		        	} else if( jo.result.businessCode==='3'){//1
						title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
					} else if( jo.result.businessCode==='-1'){//1
						title_tip('尊敬的用户','系统升级中...','我知道了');
					} else if (jo.result.businessCode === '5') { //5
			            title_tip('尊敬的用户', jo.result.msg, '我知道了');
			        } else{
						title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
						once=true;
					}
				} else{//code!='0'
					title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
					once=true;
				}
			});
		}

		function heichange () {
			dom_outer.style.height=list_show.offsetHeight+dom_more.offsetHeight+'px';
			dom_inner.style.height=list_show.offsetHeight+dom_more.offsetHeight+'px';
			if (dom_more.offsetHeight===0) {
				dom_outer.style.height=list_show.offsetHeight+50+'px';
				dom_inner.style.height=list_show.offsetHeight+50+'px';
			}
		}
	}
})();
