window.onload = function(){
	var Vtx = document.querySelector('#Vtx'),//提现按钮
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
		Vfybold = document.getElementById("Vfybold"),
		itpl_onenote = document.getElementById("onenote_tpl").innerHTML,//奖品li
		itpl_twonote = document.getElementById("twonote_tpl").innerHTML;//风云榜li
	var args = vge.urlparse(location.href),
		hbopenid = args.hbopenid,
		openid = args.openid;
	var headimg;
	var nickname;
	
	var jwbtn = document.getElementById("jwdj"),
		judu = document.getElementById("jidu"),
		paim = document.getElementById("mingci"),
		jlz = document.getElementById("jlz"),
		Vtjname2 = document.getElementById("Vtjname2"),
		Vtjtel2 = document.getElementById("Vtjtel2"),
		Vtjaddress = document.getElementById("Vtjaddress"),
		Vtjxx = document.getElementById("Vtjxx");
		
	
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
					headimg = jo.reply.headImgUrl===''?'/v/zzqp/img/bg/headimg.png':jo.reply.headImgUrl;
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
		reg3 = /^[\s]/g,//地址判断	
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
						Vlq.style.background = "url(http://"+vge.zzqp_host +"/v/zzqp/img/zj/lq.png) no-repeat center/contain";
					}else{
						Vlq.style.background = "url(http://"+vge.zzqp_host +"/v/zzqp/img/zj/nlq.jpg) no-repeat center/contain";
					}
					var Month = new Date().getMonth()+1,
						Day = new Date().getDate();
					if(jo.reply.quarterPrizeInfoType==0){//预留信息
						$('#tjxxtip1').css('display','none');//排名信息
						$('#tjxxtip2').css('opacity','0');
						$('#tjxxtip').css('display','block');//预留信息
						$('#stopday').html(Month+1+'月1日零时');
						switch(Month){
							case 3:$('#jiduNum').html('一');break;
							case 6:$('#jiduNum').html('二');break;
							case 6:$('#jiduNum').html('三');break;
							case 12:$('#jiduNum').html('四');break;
							default:$('#jiduNum').html('上');
						}
					}else{//领奖排名
						$('#tjxxtip1').css('display','block');
						$('#tjxxtip2').css('opacity','1');
						$('#tjxxtip').css('display','none');				
					}
					
					if(jo.reply.isQuarterPrize ==='0'){//是否显示酒王领奖按钮
						jwbtn.style.display = 'none';
					}else{
						jwbtn.style.opacity = 1;
						judu.innerHTML = jo.reply.quarterPrizeRecord.quarterNum;
						paim.innerHTML = jo.reply.quarterPrizeRecord.quarterRanking;
						if(jo.reply.quarterPrizeRecord.quarterRanking < 2){
							jlz.innerHTML = '酒王金牌一枚';
						}else if(jo.reply.quarterPrizeRecord.quarterRanking<11){
							jlz.innerHTML = '手机一部';
						}else if(jo.reply.quarterPrizeRecord.quarterRanking<1001){
							jlz.innerHTML = '青岛啤酒奥古特一箱';
						}

						jwbtn.addEventListener('click',function(){
							_hmt.push(['_trackEvent', 'click', '酒王按钮', '我的']);
							$('#ipt').css('display','block');
							$('.ipt').css('display','none');$('.iptxx').css('display','block');
						},false);
						if(jo.reply.isQuarterPrize ==='1'){//强制显示填写酒王信息表单
							document.getElementById("jwmark").style.display = 'block';
							document.getElementById("jwmark").addEventListener('click',function(){
								_hmt.push(['_trackEvent', 'click', '酒王按钮', '我的']);
								$('#ipt').css('display','block');
								$('.ipt').css('display','none');$('.iptxx').css('display','block');
								document.getElementById("jwmark").style.display = 'none';
							},false);
						}
						
						if(jo.reply.quarterPrizeRecord.userName){//已提交
							$('#Vtjname2').val(jo.reply.quarterPrizeRecord.userName);
							$('#Vtjtel2').val(jo.reply.quarterPrizeRecord.phoneNum);
							$('#Vtjaddress').val(jo.reply.quarterPrizeRecord.address);
							$('#Vtjxx').html('信息已提交');
							Vtjname2.readOnly = true;
							Vtjtel2.readOnly = true;
							Vtjaddress.readOnly = true;
							Vtjxx.removeEventListener('click',jwxx,false);
						}
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
							$('#Vlist').find("li:even").css('background','#73041e');
    						$('#Vlist').find("li:odd").css('background','#820a1e');
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
											$('.ipt').css('display','block');
											$('.iptxx').css('display','none');
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
									createImg(3);
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
	
	
	
	//酒王奖品接口

	Vtjxx.addEventListener('click',jwxx,false);
	function jwxx(){//酒王信息提交
		_hmt.push(['_trackEvent', 'click', '提交酒王信息', '我的']);
		var nameValue2 = Vtjname2.value.trim();
			if(Vtjname2.value == null || Vtjname2.value == ''){
                comTips.style.display = 'block';
                Vfail.style.display = 'block';
				Vtip.innerHTML = '请填写正确的姓名哦！';
            } else if(!reg2.test(Vtjtel2.value)){
                comTips.style.display = 'block';
                Vfail.style.display = 'block';
				Vtip.innerHTML = '请填写正确的手机号！';
            } else if(Vtjaddress.value == null || Vtjaddress.value == ''){
                comTips.style.display = 'block';
                Vfail.style.display = 'block';
				Vtip.innerHTML = '请填写正确的收货地址！';
            } else{
            	tjxx();
            }
	}
	function tjxx(){//酒王信息提交
		var javai = vge.zzqp + '/DBTHNQPInterface/myInfo/getQuarterPrize';
		var req = {
			"openid":openid,
			"userName":$('#Vtjname2').val(),
			"phoneNum":$('#Vtjtel2').val(),
			"address":$('#Vtjaddress').val()
		};
		vge.callJApi(javai, req,
		function(jo) {
			if (jo.result.code == '0'){
				if(jo.result.businessCode === '0'){
					tj1();
				}else{
					tj2();
				}
			}else{
				comTips.style.display = 'block';
                Vfail.style.display = 'block';
				Vtip.innerHTML = '系统开了个小差，请稍后重试！';
			}
		});
	}
	//创建中奖img图片
	function createImg(x){
		var jpimg = document.createElement("img");
　　　　jpimg.src = "/v/zzqp/img/zj/jp"+x+".png";
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
//	Vfybtn.addEventListener('click',function(){
//		comTips.style.display = 'block';
//      Vfail.style.display = 'block';
//		Vtip.innerHTML = '系统维护中，请稍后';
//	},false);
	
	
	//酒王风云榜
	function Vfybshow(){
		_hmt.push(['_trackEvent', 'click', '排行榜', '我的']);
		Vfybtn.removeEventListener('click',Vfybshow,false);
		Vfybtn.addEventListener('click',function(){
			$('#fyb').fadeIn();
			$('.old').css('display','none');
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
						if(lst[20].rowNum == 1&&i==20){
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
    				$('#Vfyb').find("li:even").css('background','#73041e');
    				$('#Vfyb').find("li:odd").css('background','#820a1e');
        			
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
	//上季度排行
	
	//时间设置
//	var Month = new Date().getMonth()+1,
//		Day = new Date().getDate();
//	if(Month===3||Month===6||Month===9||Month===11&&Day>20){
//		$('#tjxxtip1').css('display','none');//排名信息
//		$('#tjxxtip2').css('opacity','0');
//		$('#tjxxtip').css('display','block');//预留信息
//		$('#stopday').html(Month+1+'月1日零时');
//		switch(Month){
//			case 3:$('#jiduNum').html('一');break;
//			case 6:$('#jiduNum').html('二');break;
//			case 6:$('#jiduNum').html('三');break;
//			case 12:$('#jiduNum').html('四');break;
//			default:$('#jiduNum').html('上');
//		}
//	}else{
//		$('#tjxxtip1').css('display','block');
//		$('#tjxxtip2').css('opacity','1');
//		$('#tjxxtip').css('display','none');
//	}
	
	var showold = document.getElementsByClassName('toold')[0];
	showold.addEventListener('click',Vfyboldshow,false);
	function Vfyboldshow(){
		var timelocal = new Date();
		timelocal = timelocal.getTime();	
//		if(timelocal<1493568000000){//1493568000000 2017.4.1凌晨
//			comTips.style.display = 'block';
//          Vfail.style.display = 'block';
//			Vtip.innerHTML = '当前季度尚未结束<br/>暂无上季度排行';
//			return;
//		}
		_hmt.push(['_trackEvent', 'click', '排行榜', '我的']);
		showold.removeEventListener('click',Vfyboldshow,false);
		showold.addEventListener('click',function(){
			$('.old').fadeIn();
		},false);
		var javai = vge.zzqp + '/DBTHNQPInterface/user/queryRankList';
		var req = {
			"openid":openid,
			"isHistory":"1"
		};
		vge.callJApi(javai, req,
		function(jo) {
			if (jo.result.code == '0'){
				if(jo.result.businessCode === '0'){
					$('.old').fadeIn();
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
						if(lst[20].rowNum == 1&&i==20){
							params.rank = '';
						}
						
						params.Vname = lst[i].nickName;
						params.num = lst[i].totalScanCounts;
    					params.Vheadurl = lst[i].url;
    					if(lst[i].openid == openid){
							params.Vheadurl = headimg;
							params.Vname = nickname;
						}
						
						Vfybold.innerHTML += vge.renderTpl(itpl_twonote, params);
    				}
    				$('#Vfyb').find("li:even").css('background','#73041e');
    				$('#Vfyb').find("li:odd").css('background','#820a1e');
        			
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
					window.location.href = 'http://'+vge.zzqp_host +'/v/zzqp/guide.html';
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
				}else if(jo.result.businessCode === '1'){
					$('.tx2').show();
				}else if(jo.result.businessCode === '2'){
					comTips.style.display = 'block';
                	Vfail.style.display = 'block';
					Vtip.innerHTML = '系统开了个小差';
				}else if(jo.result.businessCode === '3'){
					title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
				}else {
					comTips.style.display = 'block';
                	Vfail.style.display = 'block';
					Vtip.innerHTML = '系统开了个小差';
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
		window.location.href = 'http://'+vge.zzqp_host +'/v/zzqp/show.html?openid='+openid;
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
Vtjcg.addEventListener('click',function(){
	window.location.reload();
},false);
Vback1.addEventListener('click',function(){
	window.location.href = 'http://'+vge.zzqp_host +'/v/zzqp/index.html?bizcode=11';
},false);
Vback2.addEventListener('click',function(){
	window.location.href = 'http://'+vge.zzqp_host +'/v/zzqp/index.html?bizcode=11';
},false);
huanju1.addEventListener('click',function(){
	window.location.href = 'http://'+vge.zzqp_host +'/v/zzqp/huanju.html';
},false);
huanju2.addEventListener('click',function(){
	window.location.href = 'http://'+vge.zzqp_host +'/v/zzqp/huanju.html';
},false);

	//分享
	var shareimg = 'http://'+vge.zzqp_host+'/v/zzqp/img/bg/sharefriend2.jpg',
		shareurl = 'http://'+vge.zzqp_host+'/v/zzqp/huanju.html?flag=0';
	ini_wxshare(vge.zzqpappid);
	wx.ready(function(){	
		WeixinJSBridge.call('showOptionMenu');//显示右上角菜单		
		set_wxshare(shareimg,'欢聚一把','一起游戏，让我们欢聚一把！',shareurl);
	});

};
	