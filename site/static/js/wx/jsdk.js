// 初始化 微信JS-SDK
(function(){
    "use strict";
	// var wxjsapi=[
	// 	'onMenuShareTimeline',
	// 	'onMenuShareAppMessage',
	// 	'hideMenuItems',
	// 	'closeWindow',
	// 	'showMenuItems',
	// 	'scanQRCode',
	// 	'chooseImage',
	// 	'previewImage',
	// 	'getLocation',
	// 	'uploadImage',
	// 	'downloadImage',
	// 	'startRecord',
	// 	'playVoice',
	// 	'stopRecord',
	// 	'translateVoice',
	// 	'onVoiceRecordEnd',
	// 	'uploadVoice'
	// ];
	var wxjsapi=[
		'onMenuShareTimeline',
		'onMenuShareAppMessage',
		'hideMenuItems',
		'closeWindow',
		'showMenuItems',
		'getLocation',
                'scanQRCode',
		'playVoice',
		'translateVoice'
	];

    function init(appid) {
	    // 从服务器获取 signature
	    var xhr = new XMLHttpRequest();
	    xhr.open('GET', 'http://'+vge.o3host+'/wx3/vxsign?appid='+appid, false); // 同步,因为后面要调用其他sdk的函数
	    xhr.send(null);
        try{
            // console.log(xhr.responseText);
		    var o = JSON.parse(xhr.responseText);
            if(o.url === location.href) {
		        o.debug = false;
		        o.jsApiList = wxjsapi;
		        wx.config(o);
            }else{
                // alert(o.url); // 回退时，URL是上一个页面的
            }
            
            // wx.error(function (res) {
			//     alert(res.errMsg);
		    // });
            
	    }catch(e){
		    // alert(e);
	    }
        
	    // xhr.open('GET', 'http://'+location.host+'/wx/vxsign'); // 异步
	    // xhr.send(null);
		// xhr.onreadystatechange = function() {
		// 	if (xhr.readyState === 4 && xhr.status === 200) {
        //         try{
		//             var o = JSON.parse(xhr.responseText);
		//             o.debug = false;
		//             o.jsApiList = wxjsapi;
		//             wx.config(o);
		//             wx.error(function (res) {
		// 	            alert(res.errMsg);
		//             });
	    //         }catch(e){
		//             alert(e);
	    //         }
        //     }
        // };
        
    }

    function shareFriend(share_img, share_desc, share_title, share_url, callback) {
		//微信分享的数据
		var shareData = {
			title: share_title,
			desc: share_desc,
			link: share_url,
			imgUrl: share_img,
			success: function(res) {
                if(callback !== undefined) callback();
			}
		};
        
        wx.ready(function() {
		    wx.onMenuShareAppMessage(shareData);
		    wx.onMenuShareTimeline(shareData);
        });
	}

    window.set_wxshare = shareFriend;
    window.ini_wxshare = init;
})();
