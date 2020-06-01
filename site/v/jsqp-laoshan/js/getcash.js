(function(){
	'use strict';
	var timer = null,i = 0,tx = false,flag = false;
	var openid = sessionStorage.openid === undefined ? '': sessionStorage.openid,
		args = vge.urlparse(location.href),
		dom_btn = document.getElementById("btn"),
		hbopenid = args.openid,
		bizcode = sessionStorage.bizcode===undefined?args.bizcode:sessionStorage.bizcode,
		currentMoney = sessionStorage.currentMoney === undefined ? '': sessionStorage.currentMoney,
		totalAccountMoney = sessionStorage.totalAccountMoney === undefined ? '':sessionStorage.totalAccountMoney;
	
	
	if(bizcode==='0'){
		$('.index').css('display','block');
		$('.cash').css('display','none');
		$('.money').html('¥<span>'+currentMoney+'</span>元');
	}else if(bizcode==='11'){
		// $('#jw_icon').css('display','block');
		$('.index').css('display','none');
		$('.cash').css('display','block');
		$('.money').html('<span>您已扫过</span>');
		$('.tip').html(sessionStorage.earnTime+'<br /><span>扫码并获得</span>'+currentMoney+'元')
	}
	
	$('.index').on('click',function(){
		$('.index').fadeOut();
		$('.cash').fadeIn();
		// $('#jw_icon').css('display','block');
		sessionStorage.bizcode=11;
	});
	
	if(totalAccountMoney < 1){
		$('#btn').css({'background': 'url(/v/jsqp-laoshan/img/button_tobag.png?v=1) no-repeat center','-webkit-background-size': 'auto 100%'});
		if(currentMoney==0){
			$('#btn').css({'background': 'url(/v/jsqp-laoshan/img/button_look.png?v=1) no-repeat center','-webkit-background-size': 'auto 100%'});
			$('.money').html('<span>谢谢参与</span>');
		}
		if(bizcode==='11'){
			$('#btn').css({'background': 'url(/v/jsqp-laoshan/img/button_look.png?v=1) no-repeat center','-webkit-background-size': 'auto 100%'});
		}
	}else{
		$('#btn').css({'background': 'url(/v/jsqp-laoshan/img/button_tx.png?v=1) no-repeat center','-webkit-background-size': 'auto 100%'});
		$('#tip').html('您的红包累计金额为'+totalAccountMoney +'元，点击上方“立即提现”按钮把钱拿走吧')
	}
	
	dom_btn.addEventListener('click',dot,false);
	
	function dot(){
		dom_btn.removeEventListener('click',dot,false);
		setTimeout(function(){
			dom_btn.addEventListener('click',dot,false);
		},1000);
		if(sessionStorage.totalAccountMoney < 1){
//			subscribe();
			sessionStorage.mybag = 'mybag';
			window.location.replace('http://'+location.host+'/jsqp-laoshan/too/mybag');
		}else{
			$('#loading').css('display','block');
			give_spack();
		}
	}
	
	
	function give_spack() {//提现
		var javai = vge.jsqp + '/DBTJSQPInterface/gifts/getGiftspack';
		var req = {
			"openid": openid,
			"hbopenid":hbopenid
		};
		vge.callJApi(javai, req,
	        function(jo) {
	        	$('#loading').css('display','none');
	            if (jo.result.code == '0') {
		            if (jo.result.businessCode === '0') {
		            	$('#alert').css('display','block');
		            	sessionStorage.totalAccountMoney = '0';
		            	$('#btn').css({'background': 'url(/v/jsqp-laoshan/img/button_look.png?v=1) no-repeat center','-webkit-background-size': 'auto 100%'});
		            }  else if (jo.result.businessCode === '1') { //1
			            title_tip('提 示', '您的待提余额不足1元，再喝几瓶攒够1元发红包！', '我知道了');
			        } else if (jo.result.businessCode === '2') { //后台金额不足
			            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			        } else if (jo.result.businessCode === '-2') { //-2
		            	title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
		        	} else if (jo.result.businessCode === '5') { //超限
			            title_tip('尊敬的用户', jo.result.msg, '我知道了');
			        } else if (jo.result.businessCode === '3') { //1
			            title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
			        } else if (jo.result.businessCode === '-1') { //-1
			        	title_tip('提 示', '系统升级中...', '我知道了');
			        } else {
			            title_tip('尊敬的用户', jo.result.msg, '我知道了');
			        }
	            } else { //code!='0'
		            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
	            }
	    	});
	}

	$('#alert').on('click',function(){
		$('#alert').css('display','none');
//		subscribe();
		sessionStorage.mybag = 'mybag';
		window.location.replace('http://'+location.host+'/jsqp-laoshan/too/mybag');
	});
	function subscribe(){//判断关注
		var requrl='http://'+vge.o3host+'/wx3/uinfo2?openid='+openid+'&appid='+vge.jsqpappid;
		vge.ajxget(requrl, 5000, function(r){
			try{
				var o = JSON.parse(r);
				if(o.subscribe==0) {//未关注
					window.location.replace('http://'+location.host+'/v/jsqp-laoshan/attention.html');
				}else{//已关注用户
					window.location.replace('http://'+location.host+'/jsqp-laoshan/too/mybag');
				}
			}catch(e){
				vge.clog('errmsg', [requrl, e]);
			}
		},function(err){
			vge.clog('errmsg', [requrl, err]);
		});
	}
	//酒王战绩
	// $('#jw_icon').on('touchstart',function(){
	// 	$('#jiuw_box').fadeIn(1,function(){
	// 		$('#jiuw_box div').css('bottom','0rem');
	// 	});
	// 	$('#jiuw_box .close').on('touchstart',function(){
	// 		$('#jiuw_box div').css('bottom','-11rem');
	// 		$('#jiuw_box').fadeOut(1);
	// 	});
	// });
	
	
	$('.rule').on('click',function(){
		location.href= "https://mp.weixin.qq.com/s/MEe299-y-yN7HLtHIj6h7Q";
	});
	$('.pravite').on('click',function(){
		location.href="https://mp.weixin.qq.com/s?__biz=MzUxNDg5OTU3Nw==&mid=100000013&idx=1&sn=c13347acba4ea2ed7255cb68b3ad58be&chksm=79bfaa1b4ec8230dfda68ca4f1d7d0579383adab04f1fb731e85ade7880cb78db151ac6ffc96#rd";
	});
})();
