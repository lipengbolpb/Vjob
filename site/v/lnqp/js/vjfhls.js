(function () {
    "use strict";
    ini_wxshare(vge.csqpappid);
    var args = vge.urlparse(location.href),
        i = 0,
        openid = args.s,
        provinceOpenid = args.openid,
        provinceQrcode = args.provinceQrcode;
        
    loading('玩命加载中');
	
	location.replace('http://'+location.host+'/v/vjfhls/index.html?provinceOpenid='+provinceOpenid+'&openid='+openid+'&provinceQrcode='+provinceQrcode);
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