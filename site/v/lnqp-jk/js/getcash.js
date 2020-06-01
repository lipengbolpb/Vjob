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
			location.href = 'http://'+location.host+'/v/lnqp-jk/active.html';
		});
		$('#mycard').on('click',function(){
			location.href = 'http://'+location.host+'/v/lnqp-jk/mycard.html';
		});
		$('#center').on('click',function(){
			location.href = 'http://'+location.host+'/v/lnqp-jk/mybag.html';
		});
		$('#rule').on('click',function(){
			location.href = 'https://mp.weixin.qq.com/s?__biz=MzA3MTA2MjM3Mw==&mid=503561548&idx=1&sn=fbc774dc15f7487aec74b67589a0a89a&chksm=04c45b4633b3d2505072c4b0d3837871e84ccb3757209cd2f4ac3b53b902bf2bcc0914031262#rd';
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
	$('.wave').on('click',function(){
		location.href = 'http://'+location.host+'/v/lnqp-jk/mybag.html';
	});
	
	function showcard(){
		if(isGzh){
			return false;
		}
		//卡类型 A:奥古特 B:白啤 C:纯生 D:鸿运当头 E:经典 F:皮尔森 G:小棕金
		switch (prztype){
			case 'A':$('#card_box img').attr('src','/v/lnqp-jk/img/aogute.png');
					$('#card_box img').attr('class','agt');
					$('#card_box img').delay(500).fadeIn(300);
				break;
			case 'B':$('#card_box img').attr('src','/v/lnqp-jk/img/baipi.png');
					$('#card_box img').attr('class','bp');
					$('#card_box img').delay(500).fadeIn(300);
				break;
			case 'C':$('#card_box img').attr('src','/v/lnqp-jk/img/chunsheng.png');
					$('#card_box img').attr('class','cs');
					$('#card_box img').delay(500).fadeIn(300);
				break;	
			case 'D':$('#card_box img').attr('src','/v/lnqp-jk/img/hongyun.png');
					$('#card_box img').attr('class','hydt');
					$('#card_box img').delay(500).fadeIn(300);
				break;
			case 'E':$('#card_box img').attr('src','/v/lnqp-jk/img/jingdian.png');
					$('#card_box img').attr('class','jd');
					$('#card_box img').delay(500).fadeIn(300);
				break;
			case 'F':$('#card_box img').attr('src','/v/lnqp-jk/img/piersen.png');
					$('#card_box img').attr('class','prs');
					$('#card_box img').delay(500).fadeIn(300);
				break;	
			case 'G':$('#card_box img').attr('src','/v/lnqp-jk/img/zongjin.png');
					$('#card_box img').attr('class','zj');
					$('#card_box img').delay(500).fadeIn(300);
				break;
			default:$('#card_box img').attr('src','/v/lnqp-jk/img/ck-fail.png');
					$('#card_box img').attr('class','zj');
					$('#card_box img').css('height','11.5rem');
					$('#card_box img').delay(500).fadeIn(300);
				break;
		}
	}
	
	$('#qpActive').on('click',function(){
		location.href = 'http://'+location.host+'/v/lnqp-jk/active.html';
	});
	$('#mycard').on('click',function(){
		location.href = 'http://'+location.host+'/v/lnqp-jk/mycard.html';
	});
	$('#center').on('click',function(){
		location.href = 'http://'+location.host+'/v/lnqp-jk/mybag.html';
	});
	$('#rule').on('click',function(){
		location.href = 'https://mp.weixin.qq.com/s?__biz=MzA3MTA2MjM3Mw==&mid=503561548&idx=1&sn=fbc774dc15f7487aec74b67589a0a89a&chksm=04c45b4633b3d2505072c4b0d3837871e84ccb3757209cd2f4ac3b53b902bf2bcc0914031262#rd';
	})
})()
