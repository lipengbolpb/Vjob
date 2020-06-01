window.onload = function(){
	"use strict";
	var Vhuanju = document.querySelector('#Vhuanju'),
		Vmyjp = document.querySelector('#Vmyjp'),
		Vluckycj = document.querySelector('#Vluckycj'),
		VcomTips = document.getElementById("VcomTips"),
		Vfail = document.getElementsByClassName("Vfail")[0],
		VnoprizeTier3 = document.getElementById("VnoprizeTier3"),
		Vtip = document.getElementById("Vtip"),
		Vfail2 = document.getElementsByClassName("Vfail2")[0];
	
	var second = sessionStorage.again === undefined?'':sessionStorage.again;
	var args = vge.urlparse(location.href),
		bizcode = args.bizcode;
		
	if(bizcode.lastIndexOf('#')!==-1){
		bizcode = bizcode.substr(0,bizcode.length-1);
	}
	if(second == 'again'){//摇一摇的后退处理
		bizcode = '11';
	}
	switch(bizcode){
		case '0':               // 
            break;
        case '1':               // 该积分码不存在
			VcomTips.style.display = 'block';
			Vfail.style.display = 'block';
			Vtip.innerHTML = '该二维码不存在';
			Vluckycj.style.display = 'none';
            break;
        case '2':               // 该二维码已经被使用过
			VnoprizeTier3.style.display = 'block';
			Vfail2.style.display = 'block';
			Vluckycj.style.display = 'none';
            break;
        case '3':               // 二维码已过期
			VcomTips.style.display = 'block';
			Vfail.style.display = 'block';
			Vtip.innerHTML = '二维码已过期';
			Vluckycj.style.display = 'none';
            break; 
        case '4':               // 活动未开始
			VcomTips.style.display = 'block';
			Vfail.style.display = 'block';
			Vtip.innerHTML = '活动未开始<br /><span style="font-size:0.2;font-weight:400;">'+sessionStorage.remarks+'<br />服务热线：18800020299</span>';
			Vluckycj.style.display = 'none';
            break;
        case '5':               // 活动已结束
			VcomTips.style.display = 'block';
			Vfail.style.display = 'block';
			Vtip.innerHTML = '活动已结束';
			Vluckycj.style.display = 'none';
            break;  
        case '11':              // 自己重复扫，普通奖
			Vluckycj.style.display = 'none';
            break;
        case '-1':              // 
			VcomTips.style.display = 'block';
			Vfail.style.display = 'block';
			Vtip.innerHTML = '系统升级中...';
			Vluckycj.style.display = 'none';
            break;    
        default:
			VcomTips.style.display = 'block';
			Vfail.style.display = 'block';
			Vtip.innerHTML = '异常码: '+bizcode;
			Vluckycj.style.display = 'none';		
	}
	
	
	ini_wxshare(vge.zzqpappid);
	    // 分享
    var shareimg = 'http://'+vge.zzqp_host+'/v/zzqp/img/bg/sharefriend2.jpg',
    	shareurl = 'http://'+vge.zzqp_host+'/v/zzqp/huanju.html?flag=0';
	wx.ready(function(){	
		WeixinJSBridge.call('showOptionMenu');//显示右上角菜单		
		set_wxshare(shareimg,'欢聚一把','一起游戏，让我们欢聚一把！',shareurl);
	});
    // pushHistory(); //左上角返回监测
    // window.addEventListener("popstate", function(e) { //拆红包后禁止后退到扫码页面
    //     wx.closeWindow();
    // }, false); 
    // function pushHistory() { 
    //     var state = { 
    //         title: "title", 
    //         url: "#"
    //     }; 
    //     window.history.pushState(state, "title", "#"); 
    // } 
	
	
	Vhuanju.addEventListener('click',function(){
		_hmt.push(['_trackEvent', 'click', '去欢聚', '首页']);
		window.location.href = "http://"+vge.zzqp_host+"/v/zzqp/huanju.html";
	},false);

	Vmyjp.addEventListener('click',function(){
		_hmt.push(['_trackEvent', 'click', '去我的', '首页']);
		window.location.href = "http://"+vge.zzqp_host+"/zzqp/too/myJp?flag=0";
	},false);

	Vluckycj.addEventListener('click',function(){
		_hmt.push(['_trackEvent', 'click', '去摇奖', '首页']);
		window.location.href = "http://"+vge.zzqp_host+"/v/zzqp/shake.html";
	},false);
}
	


