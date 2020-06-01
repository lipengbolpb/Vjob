(function () {
    "use strict";
    ini_wxshare(vge.zzqpappid);
	var args = vge.urlparse(location.href),
        nickname = '',
        openid = args.openid;
    $.get('http://' + vge.o3host + '/wx3/uinfo?openid=' + openid, function (r) {
    	debugger;
        loading('玩命加载中'); //获取用户信息
        r = JSON.parse(r);
        nickname = r.nickname === undefined? '未知用户' : r.nickname;
        nickname = encodeURIComponent(nickname);
        location.href = 'http://qdpj.aifengkeji.vip:8088/qdpj/wx/index/index.cs?openId='+openid+'&nickname='+nickname;
    });

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