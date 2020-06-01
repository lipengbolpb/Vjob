(function() {
	//获取页面元素
	var dom_packets = document.querySelector('.packets'),
		dom_text = document.querySelector('#text'),
		dom_doller1 = document.querySelector('#doller1'),
		dom_doller2 = document.querySelector('#doller2'),
		dom_prompt = document.querySelector('.prompt'),
		dom_scroll = document.querySelector('#scroll'),
		dom_sign = document.querySelector('.sign'),
		dom_btn = document.querySelector('#btn'),
		dom_left = document.querySelector('#left'),
		dom_right = document.querySelector('#right'),
		dom_mark = document.querySelector('#mark'),
		dom_money = document.querySelector('#money'),
		dom_wxmark = document.querySelector('.wxmark');
	
	var month = new Date().getMonth(),day=new Date().getDate();
	
	var beerLoc = 0,
		signLoc = 0,
		changeM = 0,
		flag = true,
		first = true;
	var args = vge.urlparse(location.href),
        bizcode = args.bizcode,
        hbopenid = args.openid;
		// hbopenid = args.hbopenid;
	var openid = sessionStorage.openid===undefined?'':sessionStorage.openid;
	var currentMoney=sessionStorage.currentMoney===undefined?'':sessionStorage.currentMoney;
   	var chu_mon=sessionStorage.totalAccountMoney===undefined?0:sessionStorage.totalAccountMoney;
	var second = sessionStorage.again === undefined?'':sessionStorage.again; 	
	
	document.getElementById("scan_time").innerHTML = sessionStorage.earnTime;
	
	if (bizcode==='11') {
		document.getElementById("repscan").style.display = 'block';
	} 
	$('#doller1').html(currentMoney);
	dom_scroll.addEventListener("click",function(){
		if(first){
			give_spack();//提现
		};
	});
	dom_btn.addEventListener('click',function(){//查看我的红包
		_hmt.push(['_trackEvent', 'click', '查看我的红包', 'getcash']);
		var requrl='http://'+vge.o3host+'/wx3/uinfo2?openid='+openid+'&appid='+vge.hnqpappid;
			vge.ajxget(requrl, 5000, function(r){
			try{
				var o = JSON.parse(r);
				if(o.subscribe==0) {//未关注
					window.location.replace('http://'+location.host+'/v/gdqp/attention.html');
				}else{//已关注用户
        	        window.location.replace('http://'+location.host+'/gdqp/too/mybag');
				}
			}catch(e){
				vge.clog('errmsg', [requrl, e]);
			}
		},function(err){vge.clog('errmsg', [requrl, err]);});
	});
	
	var timer = setTimeout(function() {
		hbMove();
	},1000);
	if (parseInt(chu_mon) < 1) {
		dom_btn.innerHTML = '存入我的零钱包';
	}
	if (parseInt(chu_mon) >= 1) {
		dom_btn.innerHTML = '查看我的红包';
	}




	// 活动规则和隐私说明事件
	dom_left.addEventListener('click',function () {//活动规则
		_hmt.push(['_trackEvent', 'click', '查看活动规则', 'getcash']);
		location.href= "https://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502813444&idx=1&sn=de1a4e7434fc15e5f7bfdb65284f0012&chksm=087291da3f0518cc45bd77da201bf96bfd88dd3ab0b32aa68983d8924f240738987d60b83bfb#rd";	},false);
	dom_right.addEventListener('click',function () {//隐私说明
		_hmt.push(['_trackEvent', 'click', '查看隐私说明', 'getcash']);
		location.href="http://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502813351&idx=1&sn=ffe8b0e5c615e4b1b230e9a920dac728&chksm=087290793f05196feadb4ab48d9867b62ef7f2198ce01b7fc8e2bd97f93077fc4f902998e312#rd";
	},false);

	dom_wxmark.addEventListener("click",function(){//我知道了
			var requrl='http://'+vge.o3host+'/wx3/uinfo2?openid='+openid+'&appid='+vge.hnqpappid;
			vge.ajxget(requrl, 5000, function(r){
			try{
				var o = JSON.parse(r);
				if(o.subscribe==0) {//未关注
					window.location.replace('http://'+location.host+'/v/gdqp/attention.html');
				}else{//已关注用户
        	        dom_wxmark.style.display = 'none';//显示遮罩层
				}
			}catch(e){
				vge.clog('errmsg', [requrl, e]);
			}
		},function(err){vge.clog('errmsg', [requrl, err]);});
	});

	
	function hbMove(){//进度条动画
		dom_doller2.innerHTML = chu_mon ;
		beerLoc = chu_mon*100 > 100?100:chu_mon*100;
		signLoc = chu_mon*90 > 83 ? 83: chu_mon*90;
		for(var i=0;i<beerLoc+1;i++){
			dom_scroll.style.width = i+"%";
		}
		for(var j=0;j<signLoc+1;j++){
			dom_sign.style.left = j + "%";
		}
		if(chu_mon >= 1){
			setTimeout(function(){
				dom_scroll.disabled = false;
				dom_mark.style.display = 'none';
				dom_scroll.value='立即提现';
			},1500)
		}		
	}
	
	//发红包接口
	function give_spack() {
		_hmt.push(['_trackEvent', 'click', '点击提现按钮', 'getcash']);
		var javai = vge.common + '/vjifenInterface/gifts/getGiftspack';
		var req = { "projectServerName": "huanan",
			"openid": openid,
			"hbopenid": hbopenid
		};
		vge.callJApi(javai, req,
		function(jo) {
			if (jo.result.code == '0') {
				if (jo.result.businessCode === '0') {
					dom_wxmark.style.display = 'block';//显示遮罩层
					first = false;
				} else if (jo.result.businessCode === '1') { //1
					title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
				} else if (jo.result.businessCode === '-2') { //-2
	            	title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
	        	} else if (jo.result.businessCode === '-1') { //-1
					title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
				} else if (jo.result.businessCode === '2') { //-1
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				} else if (jo.result.businessCode === '3') { //-1
					title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
				} else if (jo.result.businessCode === '4'){
					title_tip('尊敬的用户', '提现处理中，请稍后查看详细记录!', '我知道了');
				} else if (jo.result.businessCode === '5') { //-1
				    title_tip('提 示', jo.result.msg, '我知道了');
				}else {
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
					// first = true;
				}
			} else { //code!='0'
				title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				// first = true;
			}
		});
	}
})()