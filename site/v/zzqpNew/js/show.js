//生成炫耀卡
(function(){
	var args = vge.urlparse(location.href),
		x = 0,
		Vpercent = document.getElementById("Vpercent"),
		Vhead = document.getElementById("Vhead"),
		Vname = document.getElementsByClassName("Vname")[0],
		Vbeat = document.getElementById("Vbeat");
	var shareurl = location.href+'&flag=0';	
	
	var openid = args.openid,headimgurl='',nickname='',scanNum=0,percent=0;
	
    
	var javai = vge.zzqp + '/DBTHNQPInterface/user/queryShow';//炫遥卡
	var req = {
		"openid": openid
	};
	vge.callJApi(javai, req,function(jo) {
		if(jo.result.code == '0'){
			if(jo.result.businessCode=='0'){
				headimgurl = jo.reply.headImgUrl===''?'/v/zzqp/img/bg/headimg.png':jo.reply.headImgUrl;
				Vhead.src = headimgurl;
				nickname = jo.reply.nickName===''?'':jo.reply.nickName;
				Vname.innerHTML = nickname;
				scanNum = Number(jo.reply.scanNum);
				percent = jo.reply.percent;	
				if(scanNum<=4){
					x = 1;
				}else if(scanNum<=10){
					x = 2;
				}else if(scanNum<=30){
					x = 3;
				}else if(scanNum<=50){
					x = 4;
				}else if(scanNum<=100){
					x = 5;
				}else{
					x = 6;
				}
				if(percent=='.0%'){
					Vbeat.style.display = 'none';
				}
				Vpercent.innerHTML = percent;
				if(scanNum<5){
					Vbeat.style.display = 'none';
				}else{
					Vbeat.style.display = 'block';
				}	
			}
			
				
			//x=1,2,3,4,5,6 ->小酌君子，酣畅酒侠，逍遥醉客，孤独酒尊，洪荒酒圣，绝世酒神	
			$('.xyk .mycard').attr('src','img/zj/xyk_'+x+'.png?v=1');
			$('.xyk .card').attr('src', 'img/zj/card'+x+'.png?v=1');
			if(x==1){
				$('.card').css({'left':'.4rem','top':'2.1rem'});
			}else if(x==2){
				$('.card').css({'left':'.1rem','top':'2.2rem','width':'4.24rem'});
			}else if(x==3){
				$('.card').css({'left':'.15rem','top':'2.25rem','width':'4.14rem'});
			}else if(x==4){
				$('.card').css({'left':'.1rem','top':'2.25rem','width':'4.21rem'});
			}else if(x==5){
				$('.card').css({'left':'.15rem','top':'2.25rem','width':'4.13rem'});
			}else if(x==6){
				$('.card').css({'left':'.1rem','top':'2.25rem','width':'4.27rem'});
			}
		}else{//code!='0'
	        title_tip('尊敬的用户','获取用户信息失败','我知道了');
	    }
	});
	
	

	var shareimg = 'http://'+vge.zzqp_host+'/v/zzqpNew/img/bg/beer5.png';
	ini_wxshare(vge.zzqpappid);
	wx.ready(function(){	
		WeixinJSBridge.call('showOptionMenu');//显示右上角菜单		
		set_wxshare(shareimg,'我的炫耀卡','快看快看，我的酒场江湖地位！',shareurl);
	});
	
	
	
	function tj1(){
		$('#ipt').hide();
		$('#prizeTier').show();
	}
	function tj2(){
		$('#ipt').hide();
		$('#noprizeTier2').show();
	}
	$('.myjp .p2 img').click(function(){
		$('#ipt').fadeIn();
	});

	$('#xyk .tips').click(function(){
		_hmt.push(['_trackEvent', '点击分享按钮', '炫耀卡', '炫耀卡']);
		$('#_share').show();
	});
})();

