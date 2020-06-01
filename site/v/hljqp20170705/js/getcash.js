(function(){
	'use strict';
	var timer = null,i = 0,tx = false,flag = false;
	var openid = sessionStorage.openid === undefined ? '': sessionStorage.openid,
		args = vge.urlparse(location.href),
		dom_btn = document.getElementById("btn"),
		hbopenid = args.openid,
		bizcode = args.bizcode,
		currentMoney = sessionStorage.currentMoney === undefined ? '': sessionStorage.currentMoney,
		totalAccountMoney = sessionStorage.totalAccountMoney === undefined ? '':sessionStorage.totalAccountMoney;
	
	
	// if(bizcode==0){
    // 	$('#midAutumn_box').load('/v/midAutumn/midAutumn.html', function() {//加载中秋动画
	// 		$('#mid_title_box_b').on('animationend',function(){
	// 			setTimeout(function(){
	// 				$('#midAutumn_box').fadeOut(300);
	// 			},1000)
	// 		});
	// 	});
    // }else{
    // 	$('#midAutumn_box').fadeOut(1);
    // }
	if(bizcode == '11'){
		$('.repscan').css('display','block');
	}
	
	if(sessionStorage.bizcode){
		bizcode = sessionStorage.bizcode;
	}
	
	if(sessionStorage.tx){
		tx=true;
	} 
	
	$('.money').html('¥<span>'+currentMoney+'</span>元');
	
	if(bizcode==='0'){
		$('.getcash').css('display','block');
	}else if(bizcode==='11'){
		$('#jw_icon').css('display','block');
		$('.repcash').css('display','block');
	}
	$('.getcash').on('click',function(){
		$('.getcash').fadeOut();
		$('.repcash').fadeIn();
		$('#jw_icon').css('display','block');
		sessionStorage.bizcode=11;
	});
	
	if(totalAccountMoney < 1){
		$('#btn').html('存入我的零钱包');
		if(currentMoney==0){
			$('#btn').html('谢谢参与');
		}
	}else{
		$('#btn').html('立即提现');
		$('#tip').html('您的红包累计金额为'+totalAccountMoney +'元，点击上方“立即提现”按钮把钱拿走吧')
	}
	
	dom_btn.addEventListener('click',dot,false);
	
	function dot(){
		$('#btn').html('<img src="/v/hljqp20170705/img/loading.gif"/>');
		dom_btn.removeEventListener('click',dot,false);
		if(totalAccountMoney < 1){
			subscribe();
		}else{
			give_spack();
		}
	}
	
	if(currentMoney==0){
		$('.cash_bg').css('background-image','url(/v/hljqp20170705/img/0.png)');
		$('p.title,.money').css('display','none');
	}
	sessionStorage.btn = $('#btn').html();
	$(document).ready(function(){
		$('.cash,.cloud_1,.cloud_2').addClass('ani');
		$('.man_2').delay(410).fadeIn(1,function(){
			$('.woman').delay(230).fadeIn(1,function(){
				$('.man_1').delay(230).fadeIn(1);
			})
		})
	});
	
	
	function give_spack() {//提现
		if(tx) {
			title_tip('提 示', '您的待提余额不足1元，再喝几瓶攒够1元发红包！', '我知道了');
			$('#btn').html('存入我的零钱包');
			return;
		}
		var javai = vge.hljqp + '/DBTHLJQPInterface/gifts/getGiftspack';
		var req = {
			"openid": openid,
			"hbopenid":hbopenid
		};
		vge.callJApi(javai, req,
	        function(jo) {
	        	$('#btn').html(sessionStorage.btn);
	            if (jo.result.code == '0') {
		            if (jo.result.businessCode === '0') {
		            	tx = true;
		            	sessionStorage.tx = true;
		            	$('#alert').css('display','block');
		            	$('#btn').html('存入我的零钱包');
		            }  else if (jo.result.businessCode === '1') { //1
		            	dom_btn.addEventListener('click',dot,false);
			            title_tip('提 示', '您的待提余额不足1元，再喝几瓶攒够1元发红包！', '我知道了');
			        } else if (jo.result.businessCode === '2') { //后台金额不足
			        	dom_btn.addEventListener('click',dot,false);
			            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			        } else if (jo.result.businessCode === '-2') { //-2
			        	dom_btn.addEventListener('click',dot,false);
		            	title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
		        	} else if (jo.result.businessCode === '5') { //超限
		        		dom_btn.addEventListener('click',dot,false);
			            title_tip('尊敬的用户', jo.result.msg, '我知道了');
			        } else if (jo.result.businessCode === '3') { //1
			        	dom_btn.addEventListener('click',dot,false);
			            title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
			        } else if (jo.result.businessCode === '-1') { //-1
			        	title_tip('提 示', '系统升级中...', '我知道了');
						dom_btn.addEventListener('click',dot,false);
			        } else {
			        	dom_btn.addEventListener('click',dot,false);
			            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			        }
	            } else { //code!='0'
	           		dom_btn.addEventListener('click',dot,false);
		            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
	            }
	    	});
	}

	$('#alert').on('click',function(){
		$('#alert').css('display','block');
		subscribe();
	});
	function subscribe(){//判断关注
		tx = true;
		var requrl='http://'+vge.o3host+'/wx3/uinfo2?openid='+openid+'&appid='+vge.hljqpappid;
		vge.ajxget(requrl, 5000, function(r){
			try{
				var o = JSON.parse(r);
				$('#btn').html(sessionStorage.btn);
				dom_btn.addEventListener('click',dot,false);
				if(o.subscribe==0) {//未关注
					window.location.replace('http://'+location.host+'/v/hljqp20170705/attention.html');
				}else{//已关注用户
					window.location.replace('http://'+location.host+'/hljqp20170705/too/mybag');
				}
			}catch(e){
				vge.clog('errmsg', [requrl, e]);
			}
		},function(err){
			vge.clog('errmsg', [requrl, err]);
		});
	}
	
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
	
	$('.rule').on('click',function(){
		location.href= "https://mp.weixin.qq.com/s?__biz=MzI1MDYxNzkzOA==&mid=100000023&idx=1&sn=fd26446b0dca5a8adf514b3f1104d12e&chksm=69fec82a5e89413ca9d69b59d146a7ef2d98d6eae16901bc570fe328d00e6d31936e5eb28eae#rd";
	});
	$('.pravite').on('click',function(){
		location.href="https://mp.weixin.qq.com/s?__biz=MzI1MDYxNzkzOA==&mid=100000020&idx=1&sn=c088601ede82745de557d8badb76fc52&chksm=69fec8295e89413f909598de376958b771f22e2a9e356c3654f9ee393511432a424355125fa2#rd";
	});
})();
