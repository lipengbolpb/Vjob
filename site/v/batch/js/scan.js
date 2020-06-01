(function() {
    "use strict";
    ini_wxshare(vge.batchappid);
	var args = vge.urlparse(location.href),
        openid=args.openid;
 
    sessionStorage.clear();
    sessionStorage.openid = openid;
	// var vConsole = new VConsole();

    loading('玩命加载中');
    wx.ready(function() {
		// 扫一扫
		loaded();
		scanCode();
	});

	function scanCode() { 
		wx.scanQRCode({ 
		 needResult : 1,  // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
		 scanType : [ "qrCode", "barCode" ],  // 可以指定扫二维码还是一维码，默认二者都有
		 success : function(res) { 
		    console.log(res) 
		    var result = res.resultStr;  // 当needResult 为 1 时，扫码返回的结果
            // 扫码结果格式
			if(sessionStorage.batchList) {
				if(sessionStorage.batchList.indexOf(result) == -1) {
					sessionStorage.batchList = sessionStorage.batchList + result+ ',';
				}
			} else {
				sessionStorage.batchList = result+ ',';
			}
			console.log(sessionStorage.batchList)
			chose_tip('尊敬的用户','扫描成功','去激活',('http://'+location.host+'/v/batch/batch.html?openid='+openid),'继续扫码',undefined,scanCode);
		 }, 
		 fail : function(res) { 
		  console.log(res) 
		  alert(JSON.stringify(res)); 
		  alert('啦啦error');
		 } 
	  }); 
	} 
	
    function loading(txt) {
        // dom_content.innerHTML += $('#tpl_toast').html();
        $('#loadingToast .weui_toast_content').html(txt);
        $('#loadingToast').show();
    }
    function loaded() {
        $('#loadingToast').hide();
    }
    function toast(txt) {
        $('#toast .weui_toast_content').html(txt);
        $('#toast').show();
        setTimeout(function () {
            $('#toast').hide();
        }, 2000);
    }

})();
