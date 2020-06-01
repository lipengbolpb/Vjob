(function(){
	var prztype = sessionStorage.cardNo,
		args=vge.urlparse(location.href),
		bizcode=args.bizcode;
	var hbopenid = '',
		isGzh=false;
	if(args.hbopenid){//从公众号进入
		hbopenid = args.hbopenid;
		sessionStorage.openid = args.openid;
		isGzh = true;
	}else{
		hbopenid = args.openid;
	}
		
	sessionStorage.hbopenid=hbopenid;
	
	if(isGzh){
		$("#card_box,.currentMoney").css('display','none');
		$('.fromgzh').css('display','block');
		$('#qpActive').on('click',function(){
			location.href = 'http://'+location.host+'/v/lnqp-jkMidAut/active.html';
		});
		$('#mycard').on('click',function(){
			location.href = 'http://'+location.host+'/v/lnqp-jkMidAut/mycard.html';
		});
		$('#center').on('click',function(){
			location.href = 'http://'+location.host+'/v/lnqp-jkMidAut/mybag.html';
		});
		$('#rule').on('click',function(){
			location.href = 'https://mp.weixin.qq.com/s?__biz=MzA3MTA2MjM3Mw==&mid=503562094&idx=1&sn=2daf4aed112aec46e34d9226daa1610c&chksm=04c4596433b3d0721ef4a7b60fa3e266b3f9266e347802f659dc887d92d239e6850de422f425#rd';
		})
	}else{
		$("#card_box,.currentMoney").css('visibility','visible');
	}
	
	if(bizcode==0){
		if(isGzh){
			return false;
		}else{
			if(sessionStorage.active===undefined){
				$('#active').css('display','block');
				$('#active img').one('click',function(){
					$('#active').css('display','none');
				});
			}
			sessionStorage.active = true;
			$('#card_box').one('click',function(){
				sessionStorage.again=true;
				$('#card_box').addClass('rotate');
				setTimeout(function(){
					$('#card_box img').fadeOut(1,function(){
						showcard();
					});
				},250)
			})
		}
		if(sessionStorage.again){
			showcard();
		}
	}else{//重复扫不显示卡片和金额
		if(isGzh){
			return false;
		}else{
			$("#card_box,.currentMoney").css('display','none');
			if(sessionStorage.again===undefined){
				$('#content').css('display','block');
			}
			$('.fromgzh').css('display','block');
			if(sessionStorage.earnTime){
				$('.fali_tip span').html(sessionStorage.earnTime.split('.')[0]);
			}
			$('.icon-close').on('click',function(){
				sessionStorage.again = true;
				$('#content').css('display','none');
			})
		}
		
	}
	
	$('.currentMoney i').html(sessionStorage.currentMoney);
	$('.currentMoney').on('click',function(){
		location.href = 'http://'+location.host+'/v/lnqp-jkMidAut/mybag.html';
	});
	// $('.wave').on('click',function(){
	// 	location.href = 'http://'+location.host+'/v/lnqp-jkMidAut/mybag.html';
	// });
	
	function showcard(){
		if(isGzh){
			return false;
		}
		//卡类型 A:香聚卡 B:鲜聚卡 C:团聚卡 D:友聚卡 E:欢聚卡
		switch (prztype){
			case 'A':$('#card_box img').attr('src','/v/lnqp-jkMidAut/img/xiangju.png');
					$('#card_box img').attr('class','xiangju');
					$('#card_box img').delay(500).fadeIn(300);
				break;
			case 'B':$('#card_box img').attr('src','/v/lnqp-jkMidAut/img/xianju.png');
					$('#card_box img').attr('class','xianju');
					$('#card_box img').delay(500).fadeIn(300);
				break;
			case 'C':$('#card_box img').attr('src','/v/lnqp-jkMidAut/img/tuanju.png');
					$('#card_box img').attr('class','tuanju');
					$('#card_box img').delay(500).fadeIn(300);
				break;	
			case 'D':$('#card_box img').attr('src','/v/lnqp-jkMidAut/img/youju.png');
					$('#card_box img').attr('class','youju');
					$('#card_box img').delay(500).fadeIn(300);
				break;
			case 'E':$('#card_box img').attr('src','/v/lnqp-jkMidAut/img/huanju.png');
					$('#card_box img').attr('class','huanju');
					$('#card_box img').delay(500).fadeIn(300);
				break;
			default:$('#card_box img').attr('src','/v/lnqp-jkMidAut/img/ck-fail.png');
					$('#card_box img').attr('class','zj');
					// $('#card_box img').css('height','11.5rem');
					$('#card_box img').delay(500).fadeIn(300);
				break;
		}
	}
	
	$('#qpActive').on('click',function(){
		location.href = 'http://'+location.host+'/v/lnqp-jkMidAut/active.html';
	});
	$('#mycard').on('click',function(){
		location.href = 'http://'+location.host+'/v/lnqp-jkMidAut/mycard.html';
	});
	$('#center').on('click',function(){
		location.href = 'http://'+location.host+'/v/lnqp-jkMidAut/mybag.html';
	});
	$('#rule').on('click',function(){
		location.href = 'https://mp.weixin.qq.com/s?__biz=MzA3MTA2MjM3Mw==&mid=503562094&idx=1&sn=2daf4aed112aec46e34d9226daa1610c&chksm=04c4596433b3d0721ef4a7b60fa3e266b3f9266e347802f659dc887d92d239e6850de422f425#rd';
	})
})()
