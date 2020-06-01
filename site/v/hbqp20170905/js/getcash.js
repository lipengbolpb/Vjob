(function(){
	
	var timer = null,i=0,tx=false;
	var openid = sessionStorage.openid === undefined ? '': sessionStorage.openid,
		args = vge.urlparse(location.href),
		bizcode = args.bizcode,
		hbopenid = args.openid;
	if(sessionStorage.bizcode){
		bizcode = sessionStorage.bizcode;
	}
	
	$('.money').html('¥<span class="current">'+sessionStorage.currentMoney+'</span>元');
	
	if(sessionStorage.totalAccountMoney<1){
		$('.rabbit_11,.lantern1').css('visibility','visible');
		$('#btn').css({'background':'url(/v/hbqp20170905/img/button_1.png) no-repeat center','-webkit-background-size':'auto 100%'});
	}else{
		$('.rabbit_4,.pic_box').css('visibility','visible');
		$('.tip').css('display','none');
		$('#btn').css({'background':'url(/v/hbqp20170905/img/button_2.png) no-repeat center','-webkit-background-size':'auto 100%'});
	}
	
	$(document).ready(function(){//首页动画
		$('.cash_s').addClass('ready');
		$('.wz_2').delay(500).fadeIn(500,function(){
			$('.wz_1,.wz_2').delay(500).fadeOut(300);
			$('.wz_3').delay(500).fadeIn(500,function(){
				$('.wz_3').delay(1000).fadeOut(200);	
			});
		});
		$('.desk_2').delay(1000).fadeIn(700);
		$('.smoke_1,.smoke_2').animate({'opacity':1},1500,function(){
			$('.smoke_1,.smoke_2').animate({'opacity':0.4},1000);
		});
	});
	
	$('.cash_s').on('animationend',function(){
		$('.cash_s').on('click',function(){
			sessionStorage.bizcode=11;
			if(bizcode==11){
				location.href = 'http://'+location.host+'/v/hbqp20170905/repcash.html?openid='+hbopenid;
				return;
			}
			$('.open').addClass('rotate');
		});
		$('.open').on('transitionend',function(){
			$('.up').fadeOut();
			$('.down').fadeIn(300,function(){
				timer = setInterval(function(){
					i++;
					if(i%5==1){
						$('.pic_box').css('height','.3rem');
					}else if(i%5==2){
						$('.pic_box').css('height','.6rem');
					}else if(i%5==3){
						$('.pic_box').css('height','2rem');
					}else if(i%5==4){
						$('.pic_box').css('height','0rem');
					}else{
						$('.pic_box').css('height','0');
						if(i>25){
							clearInterval(timer);
						}
					}
				},300);
			});
			if(sessionStorage.skukey=='241510936-003'){
				var timer2 = setTimeout(function(){
					$('.active').css('display','block');
				},1800);
				var timer3 = setTimeout(function(){
					$('.active').css('display','none');
					$('#btn').on('click',dot);
				},4800);
				$('#active').on('click',function(){
					$('.active').css('display','none');
					$('#btn').on('click',dot);
					clearTimeout(timer3);
				});
				
			}else{
				$('#btn').on('click',dot);
			}
		});
	});
	
	
	function dot(){
		$('.loading').css('display','block');
		$('#btn').unbind();
		if(sessionStorage.totalAccountMoney<1){
			ifremeber();
		}else{
			if(!tx){
				give_spack();
			}
		}
	}
	$('.tx_tip').on('click',function(){
		$('.alert').css('display','none');
		ifremeber();
	});
	
	$('.pravite').on('click',function(){
		location.href = 'https://mp.weixin.qq.com/s?__biz=MzI5NjQ4MDMyNg==&mid=100000301&idx=1&sn=230d72c6391484a245f563763583df8b&chksm=6c42f9045b35701225d872d30016a73403c8dadb1e38270cf3d998bf3dabd6f37b503f7be0c6#rd';
	});
	$('.rule').on('click',function(){
		location.href = 'https://mp.weixin.qq.com/s?__biz=MzI5NjQ4MDMyNg==&mid=100000293&idx=1&sn=75b1e507eecb664e65ea0e95fee6806f&chksm=6c42f90c5b35701a9370e721a2ee2830e702a7de7c57a7eb092103de77eb6c8807c3476a129f#rd';
	});
	
	function give_spack() {//提现
	    var javai = vge.hbqp + '/DBTHBQPInterface/gifts/getGiftspack';
	    var req = {
	        "openid": openid,
	        "hbopenid": hbopenid
	    };
	    vge.callJApi(javai, req,
	        function (jo) {
	        	$('#btn').on('click',dot);
	        	$('.loading').css('display','none');
	            if (jo.result.code == '0') {
	                if (jo.result.businessCode === '0') {
	                	$('.alert').css('display','block');
	                	sessionStorage.totalAccountMoney=0;
	                	$('#btn').css({'background':'url(/v/hbqp20170905/img/button_1.png) no-repeat center','-webkit-background-size':'auto 100%'});
	                    tx = true;
	                } else if (jo.result.businessCode === '1') { //1
	                    title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
	                } else if (jo.result.businessCode === '2') { //1
	                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
	                } else if (jo.result.businessCode === '4') { //1
	                    title_tip('提现处理中，请稍后查看详细记录', '我知道了');
	                } else if (jo.result.businessCode === '3') { //1
	                    title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
	                } else if (jo.result.businessCode === '-1') { //-1
	                    title_tip('提 示', '系统升级中!', '我知道了');
	                } else if (jo.result.businessCode === '-2') { //-1
	                    title_tip('提 示', '提现操作过于频繁', '我知道了');
	                } else if (jo.result.businessCode === '5') { //-1
	                    title_tip('提 示', jo.result.msg, '我知道了');
	                } else {
	                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
	                }
	            } else if (jo.result.code == '-1') {
	                title_tip('尊敬的用户', '系统升级中...', '我知道了');
	            } else { //code!='0'
	                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
	            }
	        });
	}

	
	
	function ifremeber() {
	    var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.hbqpappid;
	    vge.ajxget(requrl, 5000, function (r) {
	    	$('.loading').css('display','none');
	        try {
	            var o = JSON.parse(r);
	            if (o.subscribe == '0') {//未关注
	            	$('#btn').on('click',dot);
	                window.location.replace('http://' + location.host + '/v/hbqp20170905/attention.html');
	            } else {//已关注用户
	            	$('#btn').on('click',dot);
	                window.location.replace('http://' + location.host + '/hbqp20170905/too/mybag');
	            }
	        } catch (e) {
	            vge.clog('errmsg', [requrl, e]);
	        }
	    }, function (err) {
	        vge.clog('errmsg', [requrl, err]);
	    });
	}
	
})();
