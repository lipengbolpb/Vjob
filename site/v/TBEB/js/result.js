(function(){
	var timer = null,timer2=null,timer2 = null,picNum = 0;
	var args = vge.urlparse(location.href),
		openid = sessionStorage.openid,
		hbopenid = sessionStorage.hbopenid;
	if(args.openid){
		hbopenid = args.openid;
	}
	if(args.bizcode=='11'){
		sessionStorage.bizcode = '11';
	}
	if(sessionStorage.again){
		sessionStorage.bizcode = sessionStorage.again;
	}
	picNum = parseInt(Math.random()*12 + 1);

	var totalAccountMoney = sessionStorage.totalAccountMoney===undefined?undefined:sessionStorage.totalAccountMoney,
		currentMoney = sessionStorage.currentMoney===undefined?undefined:sessionStorage.currentMoney,
		currentVpoints = sessionStorage.currentVpoints/1000;
	$('.money').html('<span>'+currentMoney+'</span>元');
	$('.Num').html('+ <i>'+currentVpoints+'L</i>玩啤酒量');
	
	
	
	if(sessionStorage.bizcode == '11'){
		picNum = 13;//重复扫码;
		if(currentMoney>0){
			$('#toBarrel').css('visibility','hidden');
			$('.cash_page').css('display','block');
			if(totalAccountMoney>=1){
				give_spack();
			}
			$('img.cash_3').attr('src','/v/TBEB/images/cash_4.png');
			$('div.cash_3').fadeIn(20,function(){//重复img.cash_3.src = 'images/cash_4.png';
				$('#toBag').on('click',function(){
					ifremeber(1);
				});
			});
		}
	}
	sessionStorage.again = 11;
	function loadCash(){//红包动画
		$('.cash_page').css('display','block');
		$('div.cash_1').addClass('jump');
		$('div.cash_1').on('animationend',function(){
			$('.look_1').delay(100).fadeOut(0);
			$('.look_2').delay(100).fadeIn(0);
			$('.look_2').delay(400).fadeOut(0);
			$('.look_3').delay(500).fadeIn(0);
			$('div.cash_1').delay(1000).fadeOut(0);
			$('div.cash_2').delay(1000).fadeIn(0);
			$('.cash_hand').delay(1000).css('-webkit-animation','hands .8s .5s linear  both');
		});	
	}
	$('.cash_hand').on('animationend',function(){
		$('div.cash_2').delay(200).fadeOut(10);
		$('div.cash_3').delay(200).fadeIn(20,function(){//重复img.cash_3.src = 'images/cash_4.png';
			if(totalAccountMoney>=1){
				give_spack();
			}
			$('#toBag').on('click',function(){
				ifremeber(1);
			});
		});
	});
	if(currentMoney>0&&sessionStorage.bizcode !== '11'){//有红包而且新码
		$('#toBarrel').css('opacity',0);
		var timer = setTimeout(loadCash,3000);
	}else{
		$('#toBarrel').on('click',function(){
			ifremeber(2);
		});
	}
	$('a.rule').on('click',function(){
		location.href = 'https://mp.weixin.qq.com/s?__biz=MzIwOTc4MzIwMA==&mid=100000343&idx=1&sn=9444142cdea64a0b9351e6be673eee76&chksm=176fd29820185b8e7fb61ac20bcc93803629a342dd554ae01db916ffc43ed3aba32f32bb58e0#rd';
	});
	$('.private').on('click',function(){
		location.href = 'http://mp.weixin.qq.com/s/JuVUynim_eIBgMvpk7hXTA';
	});
	
	//<!--4-6-7-12固定图片--><!--1--2--3-5-8-9--10-11--底部文字-->
	switch(picNum){
		case 1:$('.jf_1').css('display','block');timer2 = setInterval(togglePic(['top_pic_1']),1000);break;
		case 2:$('.jf_2').css('display','block');timer2 = setInterval(togglePic(['top_pic_2','anim_pic_2']),500);break;
		case 3:$('.jf_3').css('display','block');timer2 = setInterval(togglePic(['top_pic_3']),700);break;
		case 4:$('.jf_13').css('display','block');$('.gd_pic').attr('src','/v/TBEB/images/jifen_'+picNum+'.png');break;
		case 5:$('.jf_5').css('display','block');timer2 = setInterval(togglePic(['top_pic_5']),500);break;
		case 6:$('.jf_13').css('display','block');$('.gd_pic').attr('src','/v/TBEB/images/jifen_'+picNum+'.png');break;
		case 7:$('.jf_13').css('display','block');$('.gd_pic').attr('src','/v/TBEB/images/jifen_'+picNum+'.png');break;
		case 8:$('.jf_8').css('display','block');timer2 = setInterval(togglePic(['top_pic_8']),800);break;
		case 9:$('.jf_9').css('display','block');timer2 = setInterval(togglePic(['top_pic_9']),800);break;
		case 10:$('.jf_10').css('display','block');timer2 = setInterval(togglePic(['top_pic_10']),1000);break;
		case 11:$('.jf_11').css('display','block');timer2 = setInterval(togglePic(['anim_pic_11']),1000);break;
		case 12:$('.jf_13').css('display','block');$('.gd_pic').attr('src','/v/TBEB/images/jifen_'+picNum+'.png');break;
		case 13:$('.jf_13').css('display','block');$('.gd_pic').attr('src','/v/TBEB/images/jifen_'+picNum+'.png');break;
		default :$('.jf_4').css('display','block');break;
	}
	
	function togglePic(args){//切换图片
		return function(){
			var pic = {},picUrl = {};
			for(var i = 0;i<args.length;i++){
				pic[i] = document.getElementsByClassName(args[i])[0];
				picUrl[i] = pic[i].src;
				if(picUrl[i].indexOf('1')>0){
					picUrl[i] = picUrl[i].replace('1','2');
					if(args[i]=='top_pic_8'){
						pic[i].style.width = '3.53rem';
					}
					if(args[i]=='anim_pic_2'||args[i]=='anim_pic_11'){
						pic[i].style.width = '3.6rem';
					}
					if(args[i]=='top_pic_9'||args[i]=='top_pic_3'){
						pic[i].style.width = '9rem';
						pic[i].style.top = '3rem';
					}
				}else if(picUrl[i].indexOf('2')>0){
					picUrl[i] = picUrl[i].replace('2','1');
					if(args[i]=='top_pic_8'){
						pic[i].style.width = '3.75rem';
					}
					if(args[i]=='anim_pic_2'||args[i]=='anim_pic_11'){
						pic[i].style.width = '3.45rem';
					}
					if(args[i]=='top_pic_9'||args[i]=='top_pic_3'){
						pic[i].style.width = '8rem';
						pic[i].style.top = '3.5rem';
					}
				}
				pic[i].src = picUrl[i];
			}
		}
		pic = picUrl = i = null;
	}
	
	function give_spack() {//提现
		var javai = vge.tbeb + '/DBTECQPInterface/gifts/getGiftspack';
		var req = {
				"openid": openid,
				"hbopenid":hbopenid
			};
		vge.callJApi(javai, req,
	        function(jo) {
	            if (jo.result.code == '0') {
		            if (jo.result.businessCode === '0') {
		            	$('.tx_tip').css('display','block');
		            	$('.tip').html('老铁，手气挺不错啊！红包累计金额为'+totalAccountMoney+'元，已自动提现至您的微信零钱包里，请留意“微信支付”消息~');
		            	tx = true;
		            } else if (jo.result.businessCode === '1') { //1
			            title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
			            tx = false;
			        } else if (jo.result.businessCode === '4') { //1
			            title_tip('提 示', '提现处理中，请稍后查看详细记录', '我知道了');
			            tx = false;
			        } else if (jo.result.businessCode === '-2') { //-2
		            	title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
		        	} else if (jo.result.businessCode === '2') { //1
			            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			            tx = false;
			        } else if (jo.result.businessCode === '3') { //1
			            title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
			            tx = false;
			        } else if (jo.result.businessCode === '-1') { //-1
			            title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
			            tx = false;
			        }else {
			            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
		            	tx = false;
			        }
	            } else if(jo.result.code == '-1'){
	            	title_tip('尊敬的用户', '系统升级中...', '我知道了');
		            tx = false;
	            } else { //code!='0'
		            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
		            tx = false;
	            }
	   		});
	}
	
	function ifremeber(a){
		var requrl='http://'+vge.o3host+'/wx3/uinfo2?openid='+openid+'&appid='+vge.tbebappid;
		vge.ajxget(requrl, 5000, function(r){
			try{
				var o = JSON.parse(r);
				if(o.subscribe=='0') {//未关注
					window.location.replace('http://'+location.host+'/v/TBEB/attention.html');
				}else{//已关注用户
					if(a==1){
						window.location.replace('http://'+location.host+'/TBEB/too/details');
					}else{
						location.href ='http://'+location.host + '/v/TBEB/barrel.html';
					}
				}
			}catch(e){
				vge.clog('errmsg', [requrl, e]);
			}
		},function(err){
			vge.clog('errmsg', [requrl, err]);
		});
	}
	
})();
