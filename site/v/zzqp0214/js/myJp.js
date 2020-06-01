// window.onload = function(){
	manifest=[
		{src: "bg/main_bg2.jpg",class: ""},
		{src: "zj/jp1.png",class: ""},
		{src: "zj/jp2.png",class: ""},
		{src: "zj/jp3.png",class: ""},
		{src: "zj/zj1_2.png",class: ""},
		{src: "zj/lhl.png",class: ""},
	]
	document.addEventListener('DOMContentLoaded', function (event) {
	    load(manifest, function () {
	        $("#Loading").hide();
	    })
	})

	var Vtx = document.querySelector('#Vtx'),//提现按钮
		Vtxclose = document.querySelector('.txclose'),
		Vlq = document.querySelector('#Vlq'),//领取按钮
		Vmoney = document.querySelector('#Vmoney'),//我的红包金额
		Vbottle = document.querySelector('#Vbottle'),//喝了多少瓶
		Vranking = document.querySelector('#Vranking'),//排名值
		Vfybtn = document.querySelector('#Vfybtn'),//查看酒王风云榜按钮
		Vmake = document.querySelector('#Vmake'),//生成我的炫卡按钮
		Vxyname = document.querySelector('#Vxyname'),//用户昵称
		Vhead = document.querySelector('#Vhead'),//用户头像
		Vp = document.querySelector('#Vp'),
		Vp2 = document.querySelector('#Vp2'),//奖牌P标签
		Vlist = document.querySelector('#Vlist'),//奖品ul
		Vfyb = document.querySelector('#Vfyb'),//风云榜ul
		ipt = document.querySelector('#ipt'),//填写用户信息弹出框
		Vtj = document.querySelector('#Vtj'),//用户提交信息按钮
		Vtjname = document.querySelector('#Vtjname'),//用户提交姓名
		Vtjtel = document.querySelector('#Vtjtel'),//用户提交电话
		Vsta1 = document.querySelector('.sta1'),
		Vsta2 = document.querySelector('.sta2'),
		Vback1 = document.querySelector('#Vback1'),
		Vback2 = document.querySelector('#Vback2'),
		huanju1 = document.querySelector('#huanju1'),
		huanju2 = document.querySelector('#huanju2'),
		comTips = document.querySelector('#comTips'),//公用弹窗
		Vfail = document.querySelector('#Vfail'),
		Vtip = document.querySelector('#Vtip'),//弹窗提示语
		Vtjcg = document.querySelector('#Vtjcg'),
		VprizeTier = document.querySelector('#VprizeTier'),
		itpl_onenote = document.getElementById("onenote_tpl").innerHTML,//奖品li
		itpl_twonote = document.getElementById("twonote_tpl").innerHTML;//风云榜li
	var args = vge.urlparse(location.href),
		hbopenid = args.hbopenid,
		openid = args.openid;
	var headimg;
	var nickname;

	if(openid.lastIndexOf('#')!=-1){
		openid = openid.substr(0,openid.length-1);
	}
	if(hbopenid.lastIndexOf('#')!=-1){
		hbopenid = hbopenid.substr(0,hbopenid.length-1);
	}	

	info();
	function info(){
		var javai = vge.zzqp + '/DBTHNQPInterface/user/queryShow';//炫遥卡
		var req = {
			"openid": openid
		};
		vge.callJApi(javai, req,function(jo) {
			if(jo.result.code == '0'){
				if(jo.result.businessCode=='0'){
					headimg = jo.reply.headImgUrl===''?'/v/zzqp0214/img/bg/headimg.png':jo.reply.headImgUrl;
					nickname = jo.reply.nickName===''?'':jo.reply.nickName;
					Vhead.src = headimg;
					Vxyname.innerHTML = '微信ID '+nickname;
				}
			}
		});
	}

	var dom_infoKey;
	var dom_prizeType;
	var reg2=/^1[34578]\d{9}$/,//判断电话
		reg1=/^[\s]*$/;//判断姓名为空

	var gender = sessionStorage.sex === undefined ? '': sessionStorage.sex,
		province = sessionStorage.province === undefined ? '': sessionStorage.province,
		city = sessionStorage.city === undefined ? '': sessionStorage.city,
		county = sessionStorage.county === undefined ? '': sessionStorage.county,
		subscribeStatus = sessionStorage.subscribeStatus === undefined ? '': sessionStorage.subscribeStatus,
		subscribeTime = sessionStorage.subscribeTime === undefined ? '': sessionStorage.subscribeTime,
		totalAccountMoney,counts = 0,first = false;

	

	init();
	//我的接口
	function init(){
		var javai = vge.zzqp + '/DBTHNQPInterface/myInfo/queryMyInfo';
		var req = {
			"openid": openid
		};
		vge.callJApi(javai, req,
		function(jo) {
			if (jo.result.code == '0') {
				if (jo.result.businessCode === '0') {
					Vtx.addEventListener('click',give_spack,false);
					Vmoney.innerHTML = '￥'+jo.reply.subMoney;//用户剩余金额
					totalAccountMoney = jo.reply.subMoney;
					if(parseInt(jo.reply.beerTotalCount)<5){//消费啤酒小于5瓶不显示排名
						Vp.style.display = 'none';
					}else{
						Vp.style.display = 'block';
					}
					if(jo.reply.beerTotalCount == undefined){
						Vbottle.innerHTML = '1';
						Vp.style.display = 'none';
					}else{
						Vbottle.innerHTML = jo.reply.beerTotalCount;//消费啤酒数量
						Vranking.innerHTML = jo.reply.userRanking;//用户排名
					}
					if(jo.reply.userPrizeList.length != 0){
						Vlq.addEventListener('click',getList,false);
						Vlq.style.background = "url(http://"+vge.zzqp_host +"/v/zzqp0214/img/zj/lq.png) no-repeat center/contain";
					}else{
						Vlq.style.background = "url(http://"+vge.zzqp_host +"/v/zzqp0214/img/zj/nlq.jpg) no-repeat center/contain";
					}
					
					function getList(){
						Vlq.removeEventListener('click',getList,false);
						Vlq.addEventListener('click',lqjp,false);
						$('#fyb2').fadeIn();
						var j=0, priceList=jo.reply.userPrizeList;
						var params={},hs=[];
						for (j = 0; j < priceList.length; j++) {
							if(jo.reply.userPrizeList[j].prizeType == '1'){
								params.pricelevel = '二等奖';
								params.pricename = '奥古特啤酒×12';
							}else if(jo.reply.userPrizeList[j].prizeType == '3'){
								params.pricelevel = '三等奖';
								params.pricename = '电影票';
							}else {
								params.pricelevel = '一等奖';
								params.pricename = '歌诗达游轮';
							}
							params.useStatus = priceList[j].useStatus;
							params.infoKey = priceList[j].infoKey;
							params.prizeType = priceList[j].prizeType;
							params.gettime = priceList[j].earnTime;//中奖时间
							Vlist.innerHTML += vge.renderTpl(itpl_onenote, params);
							$('#Vlist').find("li:even").css({'background':'#dfc181','color':'#93672c'});
    						$('#Vlist').find("li:odd").css({'background':'#93672c','color':'#dfc181'});
    					}
    					var Vwlq = Vlist.getElementsByTagName('a');
    					
    					for(var t=0;t<Vwlq.length;t++){
    						if(Vwlq[t].getAttribute('useStatus') == '0'){
    							Vwlq[t].innerHTML = '领取';
    							Vwlq[t].addEventListener('click',function(){
    								_hmt.push(['_trackEvent', 'click', '领取奖品', '我的']);
    								dom_infoKey = this.getAttribute('infoKey');
    								dom_prizeType = this.getAttribute('prizeType');
    								if(dom_prizeType == '3'){
    									concern();//判断关注
    								}else{
    									if(jo.reply.isUserAddressFlag == '0'){
    										ipt.style.display = 'block';
											ipt.style.zIndex = '100000';
    									}else if(jo.reply.isUserAddressFlag != '0'){
    										give_jp();
    									}
    								}
    							},false);
    						}else{
    							Vwlq[t].innerHTML = '已领取';
    							Vwlq[t].style.background = 'none';
    						}

    					}
					}
					
					var l = jo.reply.userPrizeList.length;
					for(var i=0;i<l;i++){//遍历数组userPrize
						if(jo.reply.userPrizeList[i].useStatus == '0' && counts < '3'){//0为未使用，1为已使用
							switch(jo.reply.userPrizeList[i].prizeType){
								case '1'://奥古特二等奖
									createImg(2);
									break;
								case '3'://电影票三等奖
									Vp2.innerHTML = '电影票';
									break;
								case '5'://游轮一等奖
									createImg(1);
									break;
							}
						}
						if(jo.reply.userPrizeList[i].useStatus == '1'){//都已使用或者从未中奖
							first = true;
						}
					}
					if(first||l==0){
						Vlq.removeEventListener('click',lqjp,false);
					}
				} else if (jo.result.businessCode === '1') { //1
					comTips.style.display = 'block';
                	Vfail.style.display = 'block';
					Vtip.innerHTML = '系统开了个小差，请稍后重试！';
				}
			} else { //code!='0'
				comTips.style.display = 'block';
                Vfail.style.display = 'block';
				Vtip.innerHTML = '系统开了个小差，请稍后重试！';
			}
		});
	}
	
	//创建中奖img图片
	function createImg(x){
		var jpimg = document.createElement("img");
　　　　jpimg.src = "/v/zzqp0214/img/zj/jp"+x+".png";
		Vp2.appendChild(jpimg);
		counts++;
	}

	function lqjp(){
		_hmt.push(['_trackEvent', 'click', '奖品列表', '我的']);
		$('#fyb2').fadeIn();
	}
	Vtjname.addEventListener('keyup',function(){
		if(Vtjname.value != null && Vtjname.value != ''){
			Vsta1.className = 'right sta1';
		}else{
			Vsta1.className = 'wrong sta1';
		}
	},false);
	Vtjtel.addEventListener('keyup',function(){
		if(reg2.test(Vtjtel.value)){
			Vsta2.className = 'right sta2';
		}else{
			Vsta2.className = 'wrong sta2';
		}
	},false);
	Vtj.addEventListener('click',function(){
		var nameValue = Vtjname.value.trim();
			if(Vtjname.value == null || Vtjname.value == ''){
                comTips.style.display = 'block';
                Vfail.style.display = 'block';
				Vtip.innerHTML = '请填写正确的姓名哦！';
            } else if(!reg2.test(Vtjtel.value)){
                comTips.style.display = 'block';
                Vfail.style.display = 'block';
				Vtip.innerHTML = '请填写正确的手机号！';
            } else{
            	if(dom_prizeType == '3'){//电影票
    				concern();//判断关注
    			}else{
    				give_jp();
    			}
            }
	},false);

	Vfybtn.addEventListener('click',Vfybshow,false);
	//酒王风云榜
	function Vfybshow(){
		_hmt.push(['_trackEvent', 'click', '排行榜', '我的']);
		Vfybtn.removeEventListener('click',Vfybshow,false);
		Vfybtn.addEventListener('click',function(){
			$('#fyb').fadeIn();
		},false);
		var javai = vge.zzqp + '/DBTHNQPInterface/user/queryRankList';
		var req = {
			"openid":openid
		};
		vge.callJApi(javai, req,
		function(jo) {
			if (jo.result.code == '0'){
				if(jo.result.businessCode === '0'){
					$('#fyb').fadeIn();
					var i=0, lst=jo.reply, l=lst.length;
					var params={},hs=[];
					for (i = 0; i < l; ++i) {
						
						if(i==0){
							params.rank = '冠军&nbsp;&nbsp;第1名';
						}else if(i==1){
							params.rank = '亚军&nbsp;&nbsp;第2名';
						}else if(i==2){
							params.rank = '季军&nbsp;&nbsp;第3名';
						}else if(i>2){
							params.rank = '第'+lst[i].rowNum+'名';
						}
						if(lst[i].rowNum == 1&&i==l-1){
							params.rank = '';
						}
						params.Vname = lst[i].nickName;
						params.num = lst[i].totalScanCounts;
    					params.Vheadurl = lst[i].url;
    					if(lst[i].openid == openid){
							params.Vheadurl = headimg;
							params.Vname = nickname;
						}
						
						Vfyb.innerHTML += vge.renderTpl(itpl_twonote, params);
    				}
    				$('#Vfyb').find("li:even").css('background','#dfc181');
    				$('#Vfyb').find("li:odd").css({'background':'#93672c','color':'#dfc181'});
    				$('#Vfyb').find("li:odd .num").css('color','#dfc181');
        			
				}else {
					comTips.style.display = 'block';
                	Vfail.style.display = 'block';
					Vtip.innerHTML = '系统开了个小差，请稍后重试！';
				}
			}else{
				comTips.style.display = 'block';
                Vfail.style.display = 'block';
				Vtip.innerHTML = '系统开了个小差，请稍后重试！';
			}
		});
	}

	//领取实物奖
	function give_jp(){
		var javai = vge.zzqp + '/DBTHNQPInterface/myInfo/getPrizeInfo';
		var req = {
			"openid": openid,
			"infoKey": dom_infoKey,//奖品主键
			"userName":Vtjname.value,//联系人姓名（用户存在地址时可为null）
			"phoneNum":Vtjtel.value,//联系人手机号（用户存在地址时可为null）
			"prizeType":dom_prizeType//奖品类型 1:实物奖（奥古特）, 3:电影票, 5:游轮"
		};
		
		vge.callJApi(javai, req,
		function(jo) {		
			if (jo.result.code == '0') {
				if (jo.result.businessCode === '0') {//用户信息提交成功
					tj1();
				}else {//提交失败
					tj2();
				}
			} else { //code!='0'
				comTips.style.display = 'block';
                Vfail.style.display = 'block';
				Vtip.innerHTML = '系统开了个小差，请稍后重试！';
			}
		});
	}
	function concern(){//判断关注接口
		var requrl='http://'+vge.o3host+'/wx3/uinfo2?openid='+openid+'&appid='+vge.zzqpappid;
			vge.ajxget(requrl, 5000, function(r){
			try{
				var o = JSON.parse(r);
				if(o.subscribe==0) {//未关注
					window.location.href = 'http://'+vge.zzqp_host +'/v/zzqp0214/guide.html';
				}else{//已关注用户
        	        give_jp();
				}
			}catch(e){
				vge.clog('errmsg', [requrl, e]);
			}
		},function(err){vge.clog('errmsg', [requrl, err]);});
	}
	
	//发红包接口
	function give_spack() {
		_hmt.push(['_trackEvent', 'click', '提现', '我的']);
		Vtx.removeEventListener('click',give_spack,false);
		var javai = vge.zzqp + '/DBTHNQPInterface/gifts/getGiftspack';
		var req = {
			"openid": openid,
			"hbopenid": hbopenid,
			"withdrawMoney":totalAccountMoney
		};
		vge.callJApi(javai, req,
		function(jo) {
			if (jo.result.code == '0') {
				if (jo.result.businessCode === '0') {
					$('.tx1').show();
					Vmoney.innerHTML = '￥0.00';
				}else if(jo.result.businessCode === '-1'){
					comTips.style.display = 'block';
                	Vfail.style.display = 'block';
					Vtip.innerHTML = '系统升级中...';
				}else {
					$('.tx2').show();
				}
			} else { //code!='0'
				comTips.style.display = 'block';
                Vfail.style.display = 'block';
				Vtip.innerHTML = '系统开了个小差，请稍后重试！';
			}
		});
	}

	Vmake.addEventListener('click',function(){
		_hmt.push(['_trackEvent', 'click', '炫耀卡', '我的']);
		window.location.href = 'http://'+vge.zzqp_host +'/v/zzqp0214/show.html?openid='+openid;
	},false);	

function tj1(){
	if(dom_prizeType == '3'){
		VprizeTier.innerHTML = '领取成功！<br>请查看您公众号信息';
	}
	$('#ipt').hide();
	$('#prizeTier').show();
	$('#prizeTier').css('zIndex','100001');
}
function tj2(){
	$('#ipt').hide();
	$('#noprizeTier2').show();
	$('#noprizeTier2').css('zIndex','100001');
}
$('#Vclose').click(function(){
	$('#comTips').hide();
});
Vtxclose.addEventListener('click',function(){
	window.location.reload();
},false);
Vtjcg.addEventListener('click',function(){
	window.location.reload();
},false);
Vback1.addEventListener('click',function(){
	window.location.href = 'http://'+vge.zzqp_host +'/v/zzqp0214/guifei.html?bizcode=11';
},false);
Vback2.addEventListener('click',function(){
	window.location.href = 'http://'+vge.zzqp_host +'/v/zzqp0214/guifei.html?bizcode=11';
},false);
huanju1.addEventListener('click',function(){
	window.location.href = 'http://'+vge.zzqp_host +'/v/zzqp0214/huanju.html';
},false);
huanju2.addEventListener('click',function(){
	window.location.href = 'http://'+vge.zzqp_host +'/v/zzqp0214/huanju.html';
},false);

	//分享
	var shareimg = 'http://'+vge.zzqp_host+'/v/zzqp0214/img/bg/sharefriend2.jpg',
		shareurl = 'http://'+vge.zzqp_host+'/v/zzqp0214/huanju.html?flag=0';
	ini_wxshare(vge.zzqpappid);
	wx.ready(function(){	
		WeixinJSBridge.call('showOptionMenu');//显示右上角菜单		
		set_wxshare(shareimg,'欢聚一把','一起游戏，让我们欢聚一把！',shareurl);
	});


// };
