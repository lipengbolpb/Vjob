(function(){
	
	var timer = null,i = 0,tx = false,flag = false,timer1 = null,active=false,act=false,needAlert=false;//needAlert 弹窗开关 act活动那个推广开关
	var openid = sessionStorage.openid === undefined ? '': sessionStorage.openid,
		args = vge.urlparse(location.href),
		bizcode = args.bizcode,
		hbopenid = args.openid;
	if(sessionStorage.bizcode){
		bizcode = sessionStorage.bizcode;
	}
	//签到相关
	var	weekSignFlag = sessionStorage.weekSignFlag === 'undefined' ? '0':sessionStorage.weekSignFlag,//是否开户自然周签到，1:开启、0或空:关闭
		weekSignDays = sessionStorage.weekSignDays === 'undefined' ? '':sessionStorage.weekSignDays,//当前周已签到周几集合
		weekSignEarnFlag = sessionStorage.weekSignEarnFlag === 'undefined' ? '0':sessionStorage.weekSignEarnFlag,//周签到红包是否已领取，1:已领取、0未领取  2领取签到红包
		weekSignEarnMoney = sessionStorage.weekSignEarnMoney === 'undefined' ? '':sessionStorage.weekSignEarnMoney,//周签到红包金额
		weekSignLimitDay = sessionStorage.weekSignLimitDay === 'undefined' ? '':sessionStorage.weekSignLimitDay,//周签到天数限制
		weekSignDiffDay = sessionStorage.weekSignDiffDay === 'undefined' ? '':sessionStorage.weekSignDiffDay,//周签到还差天数
		weekSignPopup = sessionStorage.weekSignPopup === 'undefined' ? '':sessionStorage.weekSignPopup,//自然周签到弹出提示，1:弹出提示、0或空:不弹出"
		weekSignPercent = sessionStorage.weekSignPercent === 'undefined' ? '':sessionStorage.weekSignPercent;//周签到完成百分比
	
	if((weekSignPopup==1&&weekSignEarnFlag!=1)||act==true){
		needAlert = true;
	}
	
	
	$('.money').html('¥<span class="current">'+sessionStorage.currentMoney+'</span>元');
	
	if(sessionStorage.totalAccountMoney<1){
		$('.rabbit_11,.lantern1').css('visibility','visible');
		$('#btn').css({'background':'url(/v/sxqp20170926/img/button_1.png) no-repeat center','-webkit-background-size':'auto 100%'});
	}else{
		$('.rabbit_4,.pic_box').css('visibility','visible');
		$('.tip').css('display','none');
		$('#btn').css({'background':'url(/v/sxqp20170926/img/button_2.png) no-repeat center','-webkit-background-size':'auto 100%'});
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
				location.href = 'http://'+location.host+'/v/sxqp20170926/repcash.html?openid='+hbopenid;
				return;
			}
			$('.open').addClass('rotate');
		});
		$('.open').on('transitionend',function(){
			$('.up').fadeOut();
			if(weekSignFlag==1){//签到开启
				$('.sign_logo').css('display','block');//签到按钮
				if(weekSignEarnFlag==1){//已领取
					$('.sign_title').attr('src','/v/sxqp/img2/sign_title_2.png');
					$('.sign_logo').css({'background': 'url(/v/sxqp/img2/sign_ed.png) no-repeat right','-webkit-background-size':' auto 100%'});
				}else{
					$('.light').css('visibility','visible');
					$('.sign_tip,#weekSignEarnMoney').css('display','none');
					$('.sign_cash').css({'background': 'url(/v/sxqp/img2/sign_cash.png) no-repeat bottom','-webkit-background-size': '100% auto'});
				}
				$('.sign_logo').on('click',function(){
					$('#sign,.content').css('display','block');
				});
				$('.sign_alert').on('click',function(){//签到天数提醒
					$(this).css('display','none');
					$('.content').css('display','block');
				});
				$('.close').on('click',function(){
					$('#sign').css('display','none');
				});
			}
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
			if(needAlert){//需要弹窗推广
				timer1 = setTimeout(function(){
					$('#btn').on('click',dot);
					active = true;
					if(weekSignPopup==1&&weekSignEarnFlag!=1){//每天首次 且未领取签到红包就会弹出提示
						if(weekSignEarnFlag==2){
							$('#sign,.getSignCash').css('display','block');
							$('.getSignCash').on('click',function(){
								weekSignEarnFlag='1';
								$('#sign,.light,.getSignCash').css('display','none');
								$('.content').css('display','block');
								$('.sign_title').attr('src','/v/sxqp/img2/sign_title_2.png');
								$('.sign_logo').css({'background': 'url(/v/sxqp/img2/sign_ed.png) no-repeat right','-webkit-background-size':' auto 100%'});
								$('.sign_tip,#weekSignEarnMoney').css('display','block');
								$('.sign_cash').css({'background': 'url(/v/sxqp/img2/sign_cash_open.png) no-repeat bottom','-webkit-background-size': '100% auto'});
							});
						}else{
							$('#sign,.sign_alert').css('display','block');
						}
					}else{//活动推送（手动）
						$('.alert,.active,.content').css('display','block');
					}
				},1500);
			}else{
				$('#btn').on('click',dot);
			}
		});
	});
	
	if(bizcode==0){
		//进度条
		$('.progress').html((weekSignLimitDay-weekSignDiffDay)+'/'+weekSignLimitDay);
		$('#progress').css('width',weekSignPercent * 7.8/100 + 'rem');
		$('.days').html(weekSignLimitDay-weekSignDiffDay+'天');
		$('#weekSignEarnMoney').html(weekSignEarnMoney+'元');
		$('.weekSignEarnMoney').html('<span>'+weekSignEarnMoney+'</span>元');
		
		
		if(weekSignDays!=''){
			weekSignDays = weekSignDays.split(',').sort();
		}
		if(weekSignDays.length>0){
			for(var i=0;i<weekSignDays[weekSignDays.length-1];i++){//打叉
				document.getElementsByClassName('checks')[i].style.backgroundImage = 'url(/v/sxqp/img2/frok.png)';
			}
		}
		for(var j = 0;j <weekSignDays.length;j++){//打√
			document.getElementsByClassName('checks')[weekSignDays[j]-1].style.backgroundImage = 'url(/v/sxqp/img2/check.png)';
		}
	
	}
	
	
	function dot(){
		$('.loading').css('display','block');
		$('#btn').unbind();
		if(sessionStorage.totalAccountMoney<1){
			ifremeber();
		}else{
			if(!tx){
				if(Number(sessionStorage.totalAccountMoney)>=88.88){
					sessionStorage.hbopenid=hbopenid;
					location.href = 'http://'+location.host+'/v/sxqp20170926/getMsg.html?bizcode=12&tx=1';				
				}else{
					give_spack();
				}
			}
		}
	}
	$('.alert').on('click',function(event){
		event.stopPropagation();
		$('.tx_mark,.active,.alert').fadeOut();
		if(active){
		}else{
			ifremeber();
		}
	});
	
	
	$('.rule').on('click',function(){
		location.href = 'https://mp.weixin.qq.com/s?__biz=MzIwNTg2Mzc4OA==&mid=100000029&idx=1&sn=3b43ec60b77aa3bcba2d1f5569c1218c&chksm=172b2f1e205ca608958bc5426239ffa6fffaaa4bef34167c3ff9902dff05452d6fb43988aa41#rd';
	});
	
	function give_spack() {//提现
	    var javai = vge.sxqp + '/DBTSXQPInterface/gifts/getGiftspack';
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
	                	$('.alert,.tx_mark').css('display','block');
	                	sessionStorage.totalAccountMoney=0;
	                	$('#btn').css({'background':'url(/v/sxqp20170926/img/button_1.png) no-repeat center','-webkit-background-size':'auto 100%'});
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
	    var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.sxqpappid;
	    vge.ajxget(requrl, 5000, function (r) {
	    	$('.loading').css('display','none');
	        try {
	            var o = JSON.parse(r);
	            if (o.subscribe == '0') {//未关注
	            	$('#btn').on('click',dot);
	                window.location.replace('http://' + location.host + '/v/sxqp20170926/attention.html');
	            } else {//已关注用户
	            	$('#btn').on('click',dot);
	                window.location.replace('http://' + location.host + '/sxqp20170926/too/mybag');
	            }
	        } catch (e) {
	            vge.clog('errmsg', [requrl, e]);
	        }
	    }, function (err) {
	        vge.clog('errmsg', [requrl, err]);
	    });
	}
	
})();
