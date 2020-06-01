(function(){
	var currentMoney = sessionStorage.currentMoney,
		totalAccountMoney = sessionStorage.totalAccountMoney,
		openid = sessionStorage.openid,
		args = vge.urlparse(location.href),
		bizcode = args.bizcode,
		first = true,
		hbopenid = args.openid;
	
	
	$('#rule').on('click',function(){//隐私说明
		location.href = 'http://mp.weixin.qq.com/s?__biz=MzI5NjQ4MDMyNg==&mid=100000006&idx=1&sn=ccd140506a659b0e2b9d43f841d5d25f&chksm=6c42fa2f5b357339732e51b3efda6b91ebd3065f40b323d578ad8fffa68c8044664a7a6c8175#rd';
	});
	$('#private').on('click',function(){//活动规则
		location.href = 'http://mp.weixin.qq.com/s?__biz=MzI5NjQ4MDMyNg==&mid=100000002&idx=1&sn=f7c8f4e597107e9983d0bf56c6c1e8d7&chksm=6c42fa2b5b35733da6a6d7899487459c31e0d7ec13c4e250ceebd14706fca25e2e54d59a3233#rd';
	});
	if(bizcode=='11'){
		$('#open').css('display','none');
		$('#cash').css('display','block');
		$('#repscan').css('display','block');
		$('#currentMoney').html('¥<span>'+currentMoney+'</span>元');
	}else if(bizcode=='0'){
		$('#open').css('display','block');
		$('#cash').css('display','block');
	}
	$('#open').on('click',function(){//拆红包
		$('#open').fadeOut(function(){
			$('.cash_mark').css('display','block');
			mon_suiji();
		});
	});
	
	
	if(Number(totalAccountMoney)<1){
		$('#tx').val('查看红包余额');
	}else{
		$('#tips_box').css('opacity',0);
	}
	
	function rander(x, y) {
		x = Math.floor(Math.random() * 100);
		y = Math.ceil(Math.random() * 100);
		if (y < 10) {
			y = '0' + y;
		} else if (y.toString().charAt(1) === '0') {
			y = y.toString().charAt(0);
		}
		$('#currentMoney').html('¥<span>'+x+'.'+y+'</span>元');
	}
	function mon_suiji(cb) {
		var n = false,
			x = 0,
			y = 0;
		var timer = setTimeout(function() {
				n = true;
				$('.cash_mark').css('display','none');
			},1000);	
		var timer1 = setInterval(function() {
				if (!n) {
					rander(x, y);
				} else {
					$('#currentMoney').html('¥<span>'+currentMoney+'</span>元');
					clearInterval(timer1);
					clearTimeout(timer);
				}
			},20);
	}
	
	
	$('#tx').on('click',function(){//提现
		if(Number(totalAccountMoney)<1){
			sessionStorage.totalAccountMoney='0.00';
			sessionStorage.gzh = '1';
			window.location.replace('http://'+location.host+'/hbqp20170426/too/mybag');
		}else{
			if(first){
				give_spack();
			}
		}
	});
	
	function give_spack(){
//		title_tip('提 示', '微信提现升级中，您可先扫码，红包会自动累积哦！', '我知道了');
		var javai = vge.hbqp + '/DBTHBQPInterface/gifts/getGiftspack';
		var req = {
			"openid": openid,
			"hbopenid":hbopenid
		};
		vge.callJApi(javai, req,
	        function(jo) {
	            if (jo.result.code == '0') {
		            if (jo.result.businessCode === '0') {
		            	first = false;
		            	window.location.replace('http://'+location.host+'/hbqp20170426/too/mybag');
		            } else if (jo.result.businessCode === '1') { //1
		            	sessionStorage.clear(totalAccountMoney);
			            title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
			        } else if (jo.result.businessCode === '4') { //提现处理中
			        	sessionStorage.clear(totalAccountMoney);
			            title_tip('提 示', '提现处理中，请稍后查看详细记录', '我知道了');
			        } else if (jo.result.businessCode === '-1') { //-1
			        	sessionStorage.clear(totalAccountMoney);
			            title_tip('提 示', '系统升级中...', '我知道了');
			        } else if (jo.result.businessCode === '2') { //-1
			        	sessionStorage.clear(totalAccountMoney);
			        	first = true;
			            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			        } else if (jo.result.businessCode === '3') { //-1
			        	sessionStorage.clear(totalAccountMoney);
			            title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
			        } else {
			        	sessionStorage.clear(totalAccountMoney);
			         	title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
		            	first = true;
			        }
	            } else { //code!='0'
	            	sessionStorage.clear(totalAccountMoney);
		            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
		            first = true;
	            }
	    	});
	}

})();
