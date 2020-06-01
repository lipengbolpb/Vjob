(function(){
	// pushHistory(); //左上角返回监测
 //    window.addEventListener("popstate", function(e) { //拆红包后禁止后退到扫码页面
	//     window.location.href = 'http://'+vge.zzqp_host+'/v/zzqp/index.html?bizcode=11';
 //    }, false); 
 //    function pushHistory() { 
 //        var state = { 
 //            title: "title", 
 //            url: "#"
 //        }; 
 //        window.history.pushState(state, "title", "#"); 
 //    } 
    ini_wxshare(vge.zzqpappid);
    var shareimg = 'http://'+vge.zzqp_host+'/v/zzqp/img/bg/sharefriend2.jpg',
    	shareurl = 'http://'+vge.zzqp_host+'/v/zzqp/huanju.html?flag=0';
	wx.ready(function(){	
		WeixinJSBridge.call('showOptionMenu');//显示右上角菜单		
		set_wxshare(shareimg,'欢聚一把','一起游戏，让我们欢聚一把！',shareurl);
	});
})();
