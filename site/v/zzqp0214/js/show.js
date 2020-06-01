//生成炫耀卡
window.onload = function(){
	"use strict";
	var args = vge.urlparse(location.href),
		x = 0,
		Vpercent = document.getElementById("Vpercent"),
		Vhead = document.getElementById("Vhead"),
		Vname = document.getElementsByClassName("Vname")[0],
		Vbeat = document.getElementById("Vbeat");
	var shareurl = location.href+'&flag=0';	
	
	var openid = args.openid,headimgurl='',nickname='',scanNum=0,percent=0,x=0;
	
	var flag =args.flag===undefined?false:true;
	if(flag){
		$('#xyk .tips').css('display','none');
	}
    
	var javai = vge.zzqp + '/DBTHNQPInterface/user/queryShow';//炫遥卡
	var req = {
		"openid": openid
	};
	vge.callJApi(javai, req,function(jo) {
		if(jo.result.code == '0'){
			if(jo.result.businessCode=='0'){
				headimgurl = jo.reply.headImgUrl===''?'/v/zzqp0214/img/bg/headimg.png':jo.reply.headImgUrl;
				Vhead.src = headimgurl;
				nickname = jo.reply.nickName===''?'':jo.reply.nickName;
				Vname.innerHTML =nickname;
				scanNum = Number(jo.reply.scanNum);
				percent = jo.reply.percent;	
				if(scanNum<4){
					x = 1;
				}else if(scanNum>=4&&scanNum<=10){
					x = 2;
				}else if(scanNum>10&&scanNum<=30){
					x = 3;
				}else if(scanNum>30&&scanNum<=50){
					x = 4;
				}else if(scanNum>50&&scanNum<=100){
					x = 5;
				}else{
					x = 6;
				}
				Vpercent.innerHTML = percent;
				if(scanNum<5){
					Vbeat.style.display = 'none';
				}else{
					Vbeat.style.display = 'block';
				}	
			}
			
				
			//x=1,2,3,4,5,6 ->小酌君子，酣畅酒侠，逍遥醉客，孤独酒尊，洪荒酒圣，绝世酒神	
			$('#xyk').show();
			$('.xyk .mycard').attr('src','/v/zzqp0214/img/zj/xyk_'+x+'.png');
			$('.xyk .card').attr('src', '/v/zzqp0214/img/zj/card'+x+'.png');
			if(x==1){
				$('.card').css({'left':'.45rem','top':'2.2rem'})
			}else if(x==2){
				$('.card').css({'left':'.3rem','top':'1.9rem'})
			}else if(x==3){
				$('.card').css({'left':'.2rem','top':'2.1rem'})
			}else if(x==4){
				$('.card').css({'left':'.45rem','top':'2.1rem'})
			}else if(x==5){
				$('.card').css({'left':'.25rem','top':'1.9rem'})
			}else if(x==6){
				$('.card').css({'left':'.25rem','top':'1.9rem'})
			}
		}else{//code!='0'
	        title_tip('尊敬的用户','获取用户信息失败','我知道了');
	    }
	});
	
	

	var shareimg = 'http://'+vge.zzqp_host+'/v/zzqp0214/img/bg/sharefriend.jpg';
	ini_wxshare(vge.zzqpappid);
	wx.ready(function(){	
		WeixinJSBridge.call('showOptionMenu');//显示右上角菜单		
		set_wxshare(shareimg,'我的炫耀卡','快看快看，我的酒场江湖地位！',shareurl);
	});

 //    pushHistory(); //左上角返回监测
	
	// window.addEventListener("popstate", function(e) { //拆红包后禁止后退到扫码页面
 //    	if(flag){
 //    		wx.closeWindow();
 //    	}else{
 //    		window.location.href = 'http://'+vge.zzqp_host+'/zzqp/too/myJp';
 //    	}      
 //    }, false); 
 //    function pushHistory() { 
 //        var state = { 
 //            title: "title", 
 //            url: "#"
 //        }; 
 //        window.history.pushState(state, "title", "#"); 
 //    } 
	
	$('#xyk .tips').on('click',function(){
		_hmt.push(['_trackEvent', 'click', '提示', '炫耀卡']);
		$('#_share').show();
	});
	$('#iknow').on('click',function(){
		_hmt.push(['_trackEvent', 'click', '关闭提示', '炫耀卡']);
		$('#_share').hide();
	});
}
