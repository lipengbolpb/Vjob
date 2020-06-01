(function(){
	
	window.onload = function(){
		ini_wxshare(vge.fjmallappid);
			    // 分享
		var shareimg = 'http://'+location.host+'/v/fjmall/img/qrcode.png',
			shareurl = 'http://'+location.host+'/v/fjmall/attention.html';
		wx.ready(function(){	
			set_wxshare(shareimg,'关注公众号，积分兑好礼','汾酒青花',shareurl);
		});
	}

	
})();
