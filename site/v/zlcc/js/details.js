(function(){
	
	'use strict';
	var no_list = document.getElementById("no_list"),
		mon_list = document.getElementById("mon_list"),
		dom_more = document.getElementById("more"),
		itpl_onenote = document.getElementById("onenote_tpl").innerHTML;
		
	var args = vge.urlparse(location.href),
		openid = args.openid,
		hbopenid = args.hbopenid;	
	var currentpage=1,
		next=true,
		count=10,
		flag=false,
		first=true;
	
	if(sessionStorage.bizcode==='0'){
		$('.dot').css('display','inline-block');
	}
	
	var dtime = new Date(),month = dtime.getMonth()+1;
	$('p.time').html(dtime.getFullYear()+'年'+month+'月')
	
	function attentioned () {
		if(flag) return;
		onepage_note(currentpage);
		function onepage_note(currentpage,cb) {
			var javai = vge.zlcc + '/DBTZLCCInterface/gifts/queryAllGiftsList';
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
		            		$('#num').html('累计扫码 '+jo.reply.total+'瓶');
			            	$('#money').html('累计提现¥'+jo.reply.giftsMoney+'元');
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
								if(lst[i].skuDesc===undefined){
									params.monwhere='扫码';
								}else{
									params.monwhere='扫码-'+lst[i].skuDesc;
								}
								params.money='+'+lst[i].earnMoney+'元';
								params.imgUrl = 'background-image:url(/v/zlcc/img/icon_scan.png);';
							} else{
								if(lst[i].extractStatus=='0'){
									params.monwhere='提现金额'+lst[i].earnMoney+'元';
									params.money='-'+lst[i].earnMoney+'元';
									params.imgUrl = 'background-image:url(/v/zlcc/img/icon_tx.png);';
								}else if(lst[i].extractStatus=='1'){
									params.monwhere='提现失败_金额已退还';
									params.money=lst[i].earnMoney+'元';
									params.imgUrl = 'background-image:url(/v/zlcc/img/icon_fail.png);';
								}else if(lst[i].extractStatus=='2'){
									params.monwhere='提现处理中';
									params.money='-'+lst[i].earnMoney+'元';
									params.imgUrl = 'background-image:url(/v/zlcc/img/icon_fail.png);';
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
	
	getMsg();
	function getMsg() {
    	var japi = vge.zlcc+'/DBTZLCCInterface/user/queryUserInfo';
    	var req = {
        	"openid":openid,
    	};
        vge.callJApi(japi, req, function(jo) {
        	if(jo.result.code =='0'){
        		if(jo.result.businessCode==='0'){
        			if(sessionStorage.headimgurl===undefined){
        				$('#headurl').attr('src',jo.reply.headImgUrl===undefined?'/v/zzqp/img/bg/headimg.png?v=1':jo.reply.headImgUrl);
        			}else{
        				$('#headurl').attr('src',sessionStorage.headimgurl);
        			}
        			$('#phoneNum').val(jo.reply.phoneNumber);
        			if(jo.reply.terminalInfo){
        				$('#address').val(jo.reply.terminalInfo.province+jo.reply.terminalInfo.city+jo.reply.terminalInfo.county);
        				$('#store').val(jo.reply.terminalInfo.terminalName);
        				$('#time').val(jo.reply.terminalInfo.createTime);
        				sessionStorage.store = jo.reply.terminalInfo.terminalName === undefined?'':jo.reply.terminalInfo.terminalName;
        			}
        		}else if(jo.result.businessCode==='1'){
        			title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
        		}else if(jo.result.businessCode==='2'){
        			title_tip('尊敬的用户','用户不存在','我知道了');
        		}else{
        			title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
        		}
        	}else if(jo.result.code ==='1'){
        		title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
        	}else{
        		title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
        	}
        });
    }
	
	
	
	$('p.details').on('click',function(){
		attentioned();
		$('.cash_list').css('left','0');
		$('.dot').css('display','none');
		flag = true;
		sessionStorage.bizcode=11;
	});
	$('.back').on('click',function(){
		$('.cash_list').css('left','100%');
	});
	$('.person').on('click',function(){
		if(sessionStorage.store==undefined||sessionStorage.store==''){
			title_tip('尊敬的用户','您尚未完成服务员注册认证！','我知道了');
			return;
		}else{
			$('#details').css('left','0');
		}
	});
	$('#back').on('click',function(){
		$('#details').css('left','100%');
	});
	
})();
