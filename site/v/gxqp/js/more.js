(function(){
	
	var dom_money = document.querySelector('#money');
	var dom_couplet = document.querySelector('#couplet');
	var dom_tittle = document.querySelector('#tittle');
	var dom_btn = document.querySelector('#btn');
	var dom_prompt = document.querySelector('#prompt');
	var dom_rule = document.querySelector('#rule');
	var dom_private = document.querySelector('#private'); 
	var dom_dollor = document.querySelector('#dollor'); 
	var dom_box = document.querySelector('.box');
	var dom_post_left = document.querySelector('.post-left');
	var dom_post_right = document.querySelector('.post-right');
	var dom_leftDown = document.querySelector('.leftDown');
	var dom_rightDown = document.querySelector('.rightDown');


	 function GetQueryString(name){
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null) return  decodeURIComponent(r[2]); 
	     return null;
	 }

	 var openidUrl = GetQueryString('openid');
	 var unionidUrl = GetQueryString('unionid');
	 var currentMoneyUrl = GetQueryString('currentMoney');
	 var totalAccountMoneyUrl = GetQueryString('totalAccountMoney');
	 var codeContentUrl = GetQueryString('codeContentUrl');

	var first = true;
	// 获取用户id
	 var openid = openidUrl ;
	//显示抽中金额
	dom_money.innerHTML = currentMoneyUrl;
	//发送请求，获取图片
	 dom_couplet.src=codeContentUrl;
	//获取当前余额
	var chu_mon = totalAccountMoneyUrl ;

	rander2();
	mon_suiji();
	

	dom_rule.addEventListener('click',function () {
		_hmt.push(['_trackEvent', 'click', '查看活动规则', 'more']);
		location.href= "http://mp.weixin.qq.com/s?__biz=MzI4NjE2MzQ2Mw==&mid=504504030&idx=1&sn=e5414ae24ed0599fac48a25f0b3929e6&chksm=7007a9b6477020a0c7a85e54245a9ce3b89bad844bb5fc22f87bf50af6c6d2e28a19bbb4618f#rd";
	},false);
    
	dom_private.addEventListener('click',function () {
		_hmt.push(['_trackEvent', 'click', '查看隐私说明', 'more']);
		location.href="http://mp.weixin.qq.com/s?__biz=MzI4NjE2MzQ2Mw==&mid=504504035&idx=1&sn=6c0bfc678fc6475080d5cefb074185d2&chksm=7007a98b4770209d26519c9a734e4aef9e22727ada35e8a7795e36439266341651725ca8348b#rd";
	},false);

	//红包金额随机特效
	function rander2(x, y) {
		x = Math.floor(Math.random() * 100);
		y = Math.ceil(Math.random() * 100);
		if (y < 10) {
			y = '0' + y;
		} else if (y.toString().charAt(1) === '0') {
			y = y.toString().charAt(0);
		}
		dom_money.innerHTML = x + '.' + y;
	}
	function mon_suiji(cb) {
		var n = false,
		    x = 0,
		    y = 0;
		var timer = setTimeout(function() {
			n = true;
		},
		                       2000);
		var timer1 = setInterval(function() {
			if (!n) {
				rander2(x, y);
			} else {				
				dom_money.innerHTML = currentMoneyUrl ;
				clearInterval(timer1);
				clearTimeout(timer);
				// cb();
			}
		},
		                         60);
	}
	

	//抽中0元时，显示抱歉手气不佳
	if (currentMoneyUrl == 0) {
		setTimeout(function() {
			dom_tittle.innerHTML = '抱歉，手气不佳';
		},
		           2000);
	}
    
	//不足1元时，点击'存入我的零钱包'
	if (parseInt(chu_mon) < 1) {
		dom_btn.innerHTML = '存入我的零钱包';
		dom_prompt.innerHTML = '温馨提示：根据微信平台要求，红包累计大于等于1元后可自动提现。不足1元的红包我们为您贴心准备了零钱包功能，快点击下方按钮存钱吧~';
	}

	//大于1元时自动提现，点击'查看我的红包'
	if (parseInt(chu_mon) >= 1) {
		if (first) {
			//调取发红包接口
			give_spack();
			first = false; // 防止重复调用接口
		}

		dom_btn.innerHTML = '查看我的红包';
		dom_prompt.innerHTML = '温馨提示：您的红包累计金额为' + chu_mon + '元，已超过1元，已自动提现至您的微信零钱里，请注意留意您的"微信支付"消息吧！';
		
	}

	dom_btn.addEventListener('click', function() {
		_hmt.push(['_trackEvent', 'click', '去我的', 'more']);
		window.location.replace('http://' + vge.qpgx_host + '/qp/mybag?flag=0');
//		var requrl='http://'+vge.qpgx_host+'/wx/uinfo?openid='+openidUrl;
//	    vge.ajxget(requrl, 5000, function(r){
//		    try{
//			    var o = JSON.parse(r);
//			    if(o.subscribe==0) {//未关注
//				    window.location.replace('http://w.vjifen.com/v/gxqp/attention.html');
//			    }else{
//			    	window.location.replace('http://' + vge.qpgx_host + '/qp/mybag?flag=0');
//			    }
//		    }catch(e){
//			    vge.clog('errmsg', [requrl, e]);
//		    }
//	    },function(err){
//		   // vge.clog('errmsg', [requrl, e]);
//	    });
	},false);
	//发红包接口
	function give_spack() {
//		title_tip('提 示', '微信提现升级中，您可先扫码，红包会自动累积哦！', '我知道了');
		var javai = vge.common + '/vjifenInterface/gifts/getGiftspack';
		var req = { "projectServerName": "guangxi",
			"hbopenid": openidUrl,
			"openid": openidUrl,
			// "unionid": sessionStorage.unionid === undefined ? '': sessionStorage.unionid
			"unionid": unionidUrl
		};
		vge.callJApi(javai, req,
	        function(jo) {
	            if (jo.result.code == '0') {
		            if (jo.result.businessCode === '0') {
			             
		            } else if (jo.result.businessCode === '1') { //1
			            title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
		            } else if (jo.result.businessCode === '-1') { //-1
			            title_tip('提 示', '系统升级中...', '我知道了');
			            first = true;
		            } else if (jo.result.businessCode === '3'){
			            title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
		            } else if (jo.result.businessCode === '-2') { //-2
		            	title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
		        	} else if (jo.result.businessCode === '4') { //-1
			            title_tip('提 示', '提现处理中，请稍后查看详细记录', '我知道了');
			            first = true;
		            } else if (jo.result.businessCode === '2') { //1
			            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			        } else if (jo.result.businessCode === '5') { //-1
				        title_tip('提 示', jo.result.msg, '我知道了');
				    } else{
		            	title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
		            }
	            } else { //code!='0'
		            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
		            first = true;
	        	}
        });
	}
})();

