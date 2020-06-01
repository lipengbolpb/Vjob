(function(){
	
	'use strict';
	var show = document.getElementById('details'),
		dom_bottom = document.getElementsByClassName("bottom")[0],
		hide = document.getElementById("hide"),
		bottle_num = document.getElementsByClassName("num")[0],
		dom_balance = document.getElementById("dom_balance"),
		add_money = document.getElementById("add_money"),
		no_list = document.getElementById("no_list"),
		mon_list = document.getElementById("mon_list"),
		rankList = document.getElementById("rankList"),
		rankListOld = document.getElementById("rankListOld"),
		dom_more = document.getElementById("more"),
		jwbtn = document.getElementById("jwbtn"),
		toold = document.getElementById("old"),
		itpl_onenote = document.getElementById("onenote_tpl").innerHTML,
		itpl_onenote_2 = document.getElementById("onenote_tpl_2").innerHTML,
		itpl_onenote_3 = document.getElementById("onenote_tpl_3").innerHTML;
		
	var args = vge.urlparse(location.href),
		openid = args.openid,
		hbopenid = args.hbopenid;	
	var currentpage=1,
		next=true,
		count=10,
		flag=false,//提现标志
		fyb_1 = false,fyb_2=false,
		first=true;
	
	var hh = document.getElementsByTagName('body')[0].clientHeight,ww = document.getElementsByTagName('body')[0].clientWidth;
	if(hh==519&&ww==360){
		$('.msg').css({'-webkit-transform':' scaleY(.9)','margin': '-2rem auto 0'});
		$('.rankMsg').css({'-webkit-transform':' scaleY(.9)','margin': '-2rem auto 0'});
		$('.slogan').css({'width':'10rem','margin':'1.5rem auto 0'});
		$('.slogan_2').css('top','-.5rem');
	}
	var h = document.getElementsByClassName('balance')[0].clientHeight + 'px';
	
	$('.balance,.sent').css('line-height', h);
	var reg1=/^1[0-9]{10}$/,
		reg2=/^[1-9][0-9xX]{17}$/,
		reg3=/^[0-9]{4}$/;
	
	//提现状态
	$('#tx').on('click',function(){//提现
		_hmt.push(['_trackEvent', 'click', '拆红包', '我的红包']);
		if(flag) return;
//		$('#btn').html('<img src="/v/hljqp20170705/img/loading.gif"/>');
		if(sessionStorage.totalMoney<88.8){
			give_spack();
		}else{
			sessionStorage.hbopenid = hbopenid;
			sessionStorage.openid = openid;
			location.href = 'http://'+location.host+'/v/fjqp/getMsg.html?bizcode=12&tx=1';
		}
	});
	
	attentioned();
	
	function attentioned () {
		onepage_note(currentpage);
		function onepage_note(currentpage,cb) {
			var javai = vge.fjqp + '/DBTFJQPInterface/gifts/queryAllGiftsList';
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
		            		$('.num').html('<span>'+jo.reply.total+'</span>瓶')
			            	dom_balance.innerHTML=jo.reply.totalMoney;
			            	add_money.innerHTML=jo.reply.giftsMoney;
			            	sessionStorage.totalMoney=jo.reply.totalMoney;
		            	}
						if(Number(jo.reply.totalMoney)<1){
							$('#tx').css({'background':'#d0d0d0','color':'#8c8c8c'});
//							$('#tip').html('温馨提示：根据微信平台要求<br />红包累计大于等于1元可提现');
							flag = true;
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
								params.color='#fff699';
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
	jwbtn.addEventListener('click',fyb,false);
	$('#back').on('click',function(){
		$('.cash').fadeIn(300);
    	$('.rank').fadeOut(300);
	});
	$('#back2').on('click',function(){
    	$('#old,#back').css('display','inline-block');
		$('#back2,#rankListOld').css('display','none');
        $('#rankList').css('display','block');
        $('.rank_tip').html('以下榜单显示月度前3名，实时更新。');
        if(sessionStorage.rank_tip){
        	$('#rank_tip').css('display','none');
        }else{
        	$('#rank_tip').css('display','block');
        }
	});
	
	function fyb(){
		_hmt.push(['_trackEvent', 'click', '查看排行榜', '我的红包']);
		if(fyb_1){
			$('.cash').fadeOut(300);
        	$('.rank').fadeIn(300);
        	$('#rankList').css('display','block');
    		$('#rankListOld,.tjxx,#tj').css('display','none');
    		$('.rank_title').attr('src','/v/fjqp/img/jw_tip.png');
    		$('.rank_tip').html('以下榜单显示月度前3名，实时更新。');
        	return;
		}
		jwbtn.removeEventListener('click',fyb,false);
		var javai = vge.fjqp + '/DBTFJQPInterface/user/queryMonthRank';
		var req = {
			"openid": openid,
			"hbopenid":hbopenid,
			"currentPage":"0",//页码
			"count":"3",//每页条数
			"isHistory":"0"  //isHistory为1时为查询上个月，不填或为0是查询本月
		};
		vge.callJApi(javai, req,
	        function(jo) {
	        	jwbtn.addEventListener('click',fyb,false);
	            if (jo.result.code == '0') {
		            if (jo.result.businessCode === '0') {
		            	$('.cash').fadeOut(300);
		            	$('.rank').fadeIn(300);
		            	fyb_1 = true;
		            	var fybmsg={},le=jo.reply,j=0;
						for (j = 0; j < le.length; ++j) {
							if (j==0) {
								fybmsg.ranks='冠军&nbsp;&nbsp;第1名';
								fybmsg.bg='background:url(/v/fjqp/img/rank_1.png) no-repeat left;-webkit-background-size: .4rem auto;';
							} else if(j==1){
								fybmsg.ranks='亚军&nbsp;&nbsp;第2名';
								fybmsg.bg='background:url(/v/fjqp/img/rank_2.png) no-repeat left;-webkit-background-size: .4rem auto;';
								fybmsg.color='#fff699';
							} else if(j==2){
								fybmsg.ranks='季军&nbsp;&nbsp;第3名';
								fybmsg.bg='background:url(/v/fjqp/img/rank_3.png) no-repeat left;-webkit-background-size: .4rem auto;';
							}else{
								fybmsg.ranks='第'+le[j].rowNum+'名';
								fybmsg.bg='background:none;';
							}
							if(le[j].rowNum==0){
									fybmsg.ranks='';
									fybmsg.bg='background:none;';
							}
							fybmsg.nickname=le[j].nickName===''?'***':le[j].nickName;
							fybmsg.headurl=le[j].url===''?'/v/zzqp/img/bg/headimg.png':le[j].url;
							fybmsg.ranknum=le[j].totalScanCounts;
							rankList.innerHTML += vge.renderTpl(itpl_onenote_2, fybmsg);
						}
						if(jo.reply[jo.reply.length-1].rowNum>3||jo.reply[jo.reply.length-1].rowNum==0){
							$('#rank_tip').css('display','block');
							$('#rank_tip span').html(jo.reply[0].totalScanCounts-jo.reply[jo.reply.length-1].totalScanCounts);
						}else{
							$('#rank_tip').css('display','none');
							sessionStorage.rank_tip = 'none';
						}
		            } else if (jo.result.businessCode === '1') { //1
			            title_tip('提 示', jo.result.msg, '我知道了');
			        } else {
			            title_tip('尊敬的用户', jo.result.msg, '我知道了');
		            	flag = false;
			        }
	            } else{ //code!='0'
		            title_tip('尊敬的用户',jo.result.msg, '我知道了');
		            flag = false;
	            }
	    	});
	}
	
	var now = new Date(),year=now.getFullYear(),month = now.getMonth();
	if(month==0){
		year = year -1;
		month = 12;
	}
	toold.addEventListener('click',fybold,false);
	function fybold(){
		_hmt.push(['_trackEvent', 'click', '查看上月排行榜', '我的红包']);
		if(fyb_2){
			$('.rank_tip').html('以下榜单显示'+year+'年'+month+'月排名前3名');
        	$('#old,#back,#rank_tip,#rankList').css('display','none');
        	$('#back2,#rankListOld').css('display','block');
        	return;
		}
		toold.removeEventListener('click',fybold,false);
		var javai = vge.fjqp + '/DBTFJQPInterface/user/queryMonthRank';
		var req = {
			"openid": openid,
			"hbopenid":hbopenid,
			"currentPage":"0",//页码
			"count":"3",//每页条数
			"isHistory":"1"  //isHistory为1时为查询上个月，不填或为0是查询本月
		};
		vge.callJApi(javai, req,
	        function(jo) {
	        	toold.addEventListener('click',fybold,false);
	            if (jo.result.code == '0') {
		            if (jo.result.businessCode === '0') {
		            	$('.rank_tip').html('以下榜单显示'+year+'年'+month+'月排名前3名');
		            	$('#old,#back,#rank_tip,#rankList').css('display','none');
		            	$('#back2,#rankListOld').css('display','block');
		            	fyb_2 = true;
		            	var fybmsg={},le=jo.reply,j=0;
						for (j = 0; j < le.length; ++j) {
							if (j==0) {
								fybmsg.ranks='冠军&nbsp;&nbsp;第1名';
								fybmsg.bg='background:url(/v/fjqp/img/rank_1.png) no-repeat left;-webkit-background-size: .4rem auto;';
							} else if(j==1){
								fybmsg.ranks='亚军&nbsp;&nbsp;第2名';
								fybmsg.bg='background:url(/v/fjqp/img/rank_2.png) no-repeat left;-webkit-background-size: .4rem auto;';
								fybmsg.color='#fff699';
							} else if(j==2){
								fybmsg.ranks='季军&nbsp;&nbsp;第3名';
								fybmsg.bg='background:url(/v/fjqp/img/rank_3.png) no-repeat left;-webkit-background-size: .4rem auto;';
							}else{
								fybmsg.ranks='第'+le[j].rowNum+'名';
								fybmsg.bg='background:none;';
							}
							if(le[j].rowNum==0){
								fybmsg.ranks='';
								fybmsg.bg='background:none;';
							}
							if(le[j].showPrizeFlag&&le[j].showPrizeFlag==1&&j<3||le[j].showPrizeFlag==2){//在前三名中且有标志才显示领奖按钮
								fybmsg.vis = 'inline';
								fybmsg.dis = 'none';
								if(le[j].showPrizeFlag==2){
									fybmsg.html = '已提交';
									fybmsg.disable = '2';
								}else{
									fybmsg.html = '领取大奖';
									fybmsg.disable = '1';
								}
							}else{
								fybmsg.vis = 'none';
								fybmsg.dis = 'block';
							}
							fybmsg.nickname=le[j].nickName===''?'***':le[j].nickName;
							fybmsg.headurl=le[j].url===''?'/v/zzqp/img/bg/headimg.png':le[j].url;
							fybmsg.ranknum=le[j].totalScanCounts;
							rankListOld.innerHTML += vge.renderTpl(itpl_onenote_3, fybmsg);
						}
						$('.lqdj').on('click',lqjp);
		            } else if (jo.result.businessCode === '1') { //1
			            title_tip('提 示', jo.result.msg, '我知道了');
			        } else {
			            title_tip('尊敬的用户', jo.result.msg, '我知道了');
		            	flag = false;
			        }
	            } else{ //code!='0'
		            title_tip('尊敬的用户',jo.result.msg, '我知道了');
		            flag = false;
	            }
	    	});
	}
	function lqjp(){
		_hmt.push(['_trackEvent', 'click', '点击领取大奖', '我的红包']);
		if($(this).attr('dis')=='2') return;
		$('#rankListOld,#back2,.slogan').css('display','none');
		$('.tjxx,#tj,.slogan_2').css('display','block');
		$('.rank_tip').html('咨询电话：0592-3663932');
		$('.rank_title').attr('src','/v/fjqp/img/jw_title_2.png');
		$('.tj_mark').css('display','block');
		$('#lj_tip').on('click',function(){
			$('.tj_mark').css('display','none');
		});
		$('#lj_tip').html('亲，您获得了'+year+'年'+month+'月的酒王排行大奖，奖品为<span>价值1500元青岛啤酒拉杆箱1个</span>，请于'+(month+1)+'月15日前提交信息，逾期视为自动放弃<br /><br />赶快填写信息吧~')
		$('#tj').on('click',function(){
			if ($('#name').val()===''||$('#name').val().indexOf(' ')!==-1) {
				title_tip('提 示','请输入正确的姓名哦！~','我知道了');
			} else if(!reg1.test($('#tel').val())){
				title_tip('提 示','请填写正确的手机号！~','我知道了');
			} else if($('#address').val()===''||$('#address').val().indexOf(' ')!==-1){
				title_tip('提 示','请填写正确的收货地址！~','我知道了');
			} else {
				getGift();
			}
		});
	}
	
	function getGift(){
		var javai = vge.fjqp + '/DBTFJQPInterface/user/getMonthRankPrize';
		var req = {
			"openid": openid,
			"hbopenid":hbopenid,
			"userName":$('#name').val(),
			"phoneNum":$('#tel').val(),
			"address":$('#address').val()
		};
		vge.callJApi(javai, req,
	        function(jo) {
//	        	$('#btn').html('立即提现');
	            if (jo.result.code == '0') {
		            if (jo.result.businessCode === '0') {
						title_tip('提 示', '信息提交成功！', '我知道了',undefined,ikonw);
		            } else if (jo.result.businessCode === '1') { //1
			            title_tip('提 示', '信息提交失败！', '我知道了');
			        } else if (jo.result.businessCode === '2') { //1
			            title_tip('提 示', jo.result.msg, '我知道了');
			        } else if (jo.result.businessCode === '3') { //-1
			            title_tip('提 示', jo.result.msg, '我知道了');
			            flag = false;
			        } else {
			            title_tip('尊敬的用户', jo.result.msg, '我知道了');
		            	flag = false;
			        }
	            } else if (jo.result.code == '-1') {
	            	title_tip('尊敬的用户', '系统升级中...', '我知道了');
		            flag = false;
	            } else{ //code!='0'
		            title_tip('尊敬的用户', jo.result.msg, '我知道了');
		            flag = false;
	            }
	    	});
	}
	
	function ikonw(){
		$('#name,#tel,#address').attr('readonly','readonly');
		$('.lqdj').html('已提交').unbind();
		$('#tj').unbind().val('返回');
		$('#tj').on('click',function(){
			$('#rankListOld,#back2,.slogan').css('display','block');
			$('.tjxx,#tj,.slogan_2').css('display','none');
			$('.rank_tip').html('以下榜单显示'+year+'年'+month+'月排名前3名');
			$('.rank_title').attr('src','/v/fjqp/img/jw_tip.png');
		});
	}
	
	function give_spack() {//提现
		var javai = vge.fjqp + '/DBTFJQPInterface/gifts/getGiftspack';
		var req = {
			"openid": openid,
			"hbopenid":hbopenid
		};
		vge.callJApi(javai, req,
	        function(jo) {
//	        	$('#btn').html('立即提现');
	            if (jo.result.code == '0') {
		            if (jo.result.businessCode === '0') {
		            	$('#alert').css('display','block');
		            	flag = true;
		            } else if (jo.result.businessCode === '1') { //1
			            title_tip('提 示', '您的待提余额不足1元，再喝几瓶攒够1元发红包！', '我知道了');
			        } else if (jo.result.businessCode === '2') { //1
			            title_tip('提 示', jo.result.msg, '我知道了');
			        } else if (jo.result.businessCode === '4') { //1
			            title_tip('提 示', '提现处理中，请稍后查看详细记录', '我知道了');
			        } else if (jo.result.businessCode === '5') { //5
			            title_tip('尊敬的用户', jo.result.msg, '我知道了');
			        } else if (jo.result.businessCode === '-2') { //-2
		            	title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
		        	} else if (jo.result.businessCode === '3') { //3
			            title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
			        } else if (jo.result.businessCode === '-1') { //-1
			            title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
			            flag = false;
			        } else {
			            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
		            	flag = false;
			        }
	            } else if (jo.result.code == '-1') {
	            	title_tip('尊敬的用户', '系统升级中...', '我知道了');
		            flag = false;
	            } else{ //code!='0'
		            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
		            flag = false;
	            }
	    	});
	}
	$('#close').on('click',function(){
		location.reload();
	});
	
	show.addEventListener("click",function(){
		dom_bottom.style.top = '0';
	},false);
	hide.addEventListener("click",function(){
		dom_bottom.style.top = '100%';
	},false);
})();
