window.onload = function(){
	ini_wxshare(vge.zzqpappid);
		    // 分享
	var shareimg = 'http://'+vge.zzqp_host+'/v/zzqp/img/bg/sharefriend2.jpg',
		shareurl = 'http://'+vge.zzqp_host+'/v/zzqp/huanju.html?flag=0';
	wx.ready(function(){	
		WeixinJSBridge.call('showOptionMenu');//显示右上角菜单		
		set_wxshare(shareimg,'欢聚一把','一起游戏，让我们欢聚一把！',shareurl);
	});
}
