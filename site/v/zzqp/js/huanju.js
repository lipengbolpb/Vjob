window.onload=function(){
	var VcomTips = document.getElementById("VcomTips"),
		Vfail = document.getElementsByClassName("Vfail")[0],
		Vtip = document.getElementById("Vtip");

	document.body.ontouchmove = function (e) {
      e.preventDefault();
	}
	
	document.querySelector('.Vshake').addEventListener("click",function(){
		_hmt.push(['_trackEvent', 'click', '五神海报', '欢聚一把']);
		VcomTips.style.display = 'block';
		Vfail.style.display = 'block';
		Vtip.innerHTML = '本活动正在全速赶来路上，敬请期待！';
	},false);
	
	
	var args = vge.urlparse(location.href);
	var flag =args.flag===undefined?false:true;
	
	var shareimg = 'http://'+vge.zzqp_host+'/v/zzqp/img/bg/sharefriend2.jpg',
		shareurl = 'http://'+vge.zzqp_host+'/v/zzqp/huanju.html?flag=0';
	ini_wxshare(vge.zzqpappid);
	wx.ready(function(){	
		WeixinJSBridge.call('showOptionMenu');//显示右上角菜单		
		set_wxshare(shareimg,'欢聚一把','一起游戏，让我们欢聚一把！',shareurl);
	});

 //    pushHistory(); //左上角返回监测
	
	// window.addEventListener("popstate", function(e) { //拆红包后禁止后退到扫码页面
 //    	if(flag){
 //    		wx.closeWindow();
 //    	}    
 //    }, false); 
 //    function pushHistory() { 
 //        var state = { 
 //            title: "title", 
 //            url: "#"
 //        }; 
 //        window.history.pushState(state, "title", "#"); 
 //    }
}
	 

