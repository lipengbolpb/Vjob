(function(){
	var sign = document.getElementsByClassName("sign")[0],
		btn_tx = document.getElementsByClassName("tixian")[0],
		mark = document.getElementsByClassName("mark")[0],
		dom_alert = document.getElementById("alert"),
		dom_sum = document.getElementsByClassName("sum")[0],
		toMybag = document.getElementsByClassName("tomybag")[0],
		curM1 = document.getElementsByClassName("curMoney")[0],
		curM2 = document.getElementsByClassName("curMoney")[1],
		dom_prompt = document.getElementById("prompt"),
		hb_title = document.getElementById("hb_title");
		
	var dom_rule = document.getElementById("dom_rule"),
		dom_private = document.getElementById("dom_private");
	var openid = sessionStorage.openid === undefined ? '': sessionStorage.openid,
		args = vge.urlparse(location.href),
		hbopenid = args.openid;
		
	dom_rule.addEventListener('click',function () {//活动规则
		location.href= "https://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502813444&idx=1&sn=de1a4e7434fc15e5f7bfdb65284f0012&chksm=087291da3f0518cc45bd77da201bf96bfd88cab6623861d2f148b61a4f240738987d60b83bfb#rd";
	},false);
	dom_private.addEventListener('click',function () {//隐私说明
		location.href="http://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502813343&idx=1&sn=8b2760f63bc497a7dce4816749a2c57f&chksm=087290413f051957a9ff4e07a82b5a73602ab17be3dd9a39a97839236675d309c6123211dc65#rd";
	},false);
	
	
	$('#jw_icon').css('display','block');
	var	signLoc = 0,
		beerLoc = 0,
		changeM = 0,
		first = true,//提现操作标识
		time = 50000,
	 	currentMoney = sessionStorage.currentMoney === undefined ? '': sessionStorage.currentMoney,
		totalAccountMoney = sessionStorage.totalAccountMoney === undefined ? '':sessionStorage.totalAccountMoney;
	document.getElementById("scan_time").innerHTML = sessionStorage.earnTime;//扫码时间
	curM1.innerHTML = currentMoney;
	curM2.innerHTML = totalAccountMoney;	
	if(Number(totalAccountMoney) >= 1){
		dom_prompt.innerHTML = '您的累计中奖金额大于等于1元啦，点击下面的按钮把钱拿走吧。';
	}
	if(Number(currentMoney) === 0){
		dom_sum.style.display = 'none';
		hb_title.style.display = 'block';
		hb_title.innerHTML = window.zeroText2();
		hb_title.style.fontSize = '0.8rem';
		hb_title.style.lineHeight = '1.2rem';
		hb_title.style.marginTop = '0.5rem';
	}
	var timer = setTimeout(function() {
			var timer3 = setTimeout(function(){
				curM1.innerHTML = currentMoney;
			},1);
			hbMove();
		},1000);
	
	if(totalAccountMoney * 100 === 0){
		btn_tx.style.marginLeft = '0.3rem';
	}else{
		btn_tx.style.marginLeft = '0';
	}
	
	function rander2(x, y) {//随机金钱
		x = Math.floor(Math.random() * 100);
		y = Math.ceil(Math.random() * 100);
		if (y < 10) {
			y = '0' + y;
		} else if (y.toString().charAt(1) === '0') {
			y = y.toString().charAt(0);
		}
		curM1.innerHTML = x + '.' + y;
	}
	function mon_suiji(cb) {
		var n = false,
		    x = 0,
		    y = 0;
		var timer = setTimeout(function() {
				n = true;
				var timer3 = setTimeout(function(){
					curM1.innerHTML = currentMoney;
				},1);
				hbMove();
			},1000);
		var timer1 = setInterval(function() {
			if (!n) {
				rander2(x, y);
			} else {
				curM2.innerHTML = totalAccountMoney;
				clearInterval(timer1);
				clearTimeout(timer);
				curM1.innerHTML = currentMoney;
			}
		},10);
	}
	
	function hbMove(){//添加动画
		if(totalAccountMoney * 100 >=100){
			beerLoc = 100;
		}else if(totalAccountMoney * 100 > 95){
			beerLoc = 95
		}else{
			beerLoc = totalAccountMoney*100;
		}
		btn_tx.style.width = beerLoc + "%";
		signLoc = totalAccountMoney*90 > 83 ? 83: totalAccountMoney*90;
		sign.style.left = signLoc + "%";
		if(beerLoc >= 100){
			var timerBtn = setTimeout(function(){
				btn_tx.disabled = false;
				mark.style.display = 'none';
				btn_tx.value = '立即提现';
				toMybag.value = '查看我的红包';
			},2000);
			if(btn_tx.value === '立即提现'){
				clearTimeout(timerBtn);
			}
		}
//		var timer1 = setTimeout(function(){
//			var timer = setInterval(function(){
//				changeM += 0.01;
//				if(changeM >= totalAccountMoney){
//					clearInterval(timer);
//					clearTimeout(timer1);
//				}
//				curM2.innerHTML = Number(changeM).toFixed(2) ;	
//			},5);
//		},1000);
	}
	
	toMybag.addEventListener("click",function(){//查看红包
		_hmt.push(['_trackEvent', 'click', '查看我的红包', 'repcash']);
		var requrl='http://'+vge.o3host+'/wx3/uinfo2?openid='+openid+'&appid='+vge.hnqpappid;
		vge.ajxget(requrl, 5000, function(r){
			try{
				var o = JSON.parse(r);
				if(o.subscribe==0) {//未关注
					window.location.replace('http://'+location.host+'/v/hnqp/attention.html');
				}else{//已关注用户
					window.location.replace('http://'+location.host+'/hnqp/too/mybag');
				}
			}catch(e){
				vge.clog('errmsg', [requrl, e]);
			}
		},function(err){
			vge.clog('errmsg', [requrl, err]);
		});
	},false);
	btn_tx.addEventListener("click",function(){//立即提现
		_hmt.push(['_trackEvent', 'click', '点击提现按钮', 'repcash']);
		if(first){
			give_spack();
			first = false;
		}
	},false);
	
	//酒王战绩
	$('#jw_icon').on('touchstart',function(){
		$('#jiuw_box').fadeIn(1,function(){
			$('#jiuw_box div').css('bottom','0rem');
		});
		$('#jiuw_box .close').on('touchstart',function(){
			$('#jiuw_box div').css('bottom','-11rem');
			$('#jiuw_box').fadeOut(1);
		});
	});	
		
	dom_alert.addEventListener("click",function(){
		var requrl='http://'+vge.o3host+'/wx3/uinfo2?openid='+openid+'&appid='+vge.hnqpappid;
		vge.ajxget(requrl, 5000, function(r){
			try{
				var o = JSON.parse(r);
				if(o.subscribe==0) {//未关注
					window.location.replace('http://'+location.host+'/v/hnqp/attention.html');
				}else{//已关注用户
					dom_alert.style.display = 'none';
				}
			}catch(e){
				vge.clog('errmsg', [requrl, e]);
			}
		},function(err){
			vge.clog('errmsg', [requrl, err]);
		});
	},false);
	
	function give_spack() {
		_hmt.push(['_trackEvent', 'click', '发送提现请求', 'repcash']);
//		title_tip('提 示', '微信提现功能正在升级，请稍后再试！', '我知道了');
		var javai = vge.common + '/vjifenInterface/gifts/getGiftspack';
		var req = { "projectServerName": "huanan",
			"openid": openid,
			"hbopenid":hbopenid
		};
		vge.callJApi(javai, req,
	        function(jo) {
	            if (jo.result.code == '0') {
		            if (jo.result.businessCode === '0') {
		            	dom_alert.style.display = 'block';
		            } else if (jo.result.businessCode === '1') { //1
			            title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
			        } else if (jo.result.businessCode === '4') { //1
			            title_tip('提 示', '提现处理中，请稍后查看详细记录', '我知道了');
			        } else if (jo.result.businessCode === '-2') { //-2
		            	title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
		        	} else if (jo.result.businessCode === '-1') { //-1
			            title_tip('提 示', '系统升级中...', '我知道了');
			        } else if (jo.result.businessCode === '2') { //-1
			            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			        } else if (jo.result.businessCode === '3') { //-1
			            title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>','我知道了');
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
})();
