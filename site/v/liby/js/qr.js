(function() {
    'use strict';
    ini_wxshare(vge.libyappid);
    
	var args = vge.urlparse(location.href), qr = args.s, openid=args.openid;
    
    $('#info').html('您扫的码是【'+qr+'】<br>openid: '+openid);
    
    sessionStorage.clear();
    sessionStorage.openid = openid;

    setTimeout(function() { // 应对定位调用异常
        if (sessionStorage.latitude===undefined) {
            sweep();
        }
    }, 5000);

    function locationed(res){
        sessionStorage.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        sessionStorage.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        sessionStorage.speed = res.speed; // 速度，以米/每秒计
        sessionStorage.accuracy = res.accuracy; // 位置精度
        sweep();
    }

    loading('微信初始化');
    wx.ready(function() {
        loading('获取位置信息');
        wx.getLocation({
            type: 'wgs84',
            complete:locationed//接口调用完成时执行的回调函数，无论成功或失败都会执行。
        });
    });
    
    function sweep() {
        loading('调用接口');
        var japi = vge.liby+'/DBTLBInterface/sweep/sweepQrcode';
        var req = {
            "openid":openid,
            "sweepstr":qr,
            "longitude": sessionStorage.longitude===undefined?'00':sessionStorage.longitude, //"经度"
            "latitude": sessionStorage.latitude===undefined?'00':sessionStorage.latitude //"纬度"
        };
        vge.clog('debug ', [japi, JSON.stringify(req)]);
        vge.callJApi(japi, req, cb, 'debug');
    }
    
    function cb(jo) {
        loaded();

        // if(!confirm('返回码:'+jo.result.businessCode+' 是否跳转')) {
        //     return;
        // }
        
        switch (jo.result.businessCode) {
        case '0':               // 普通奖
        case '11':              // 自己重复扫，普通奖
			sessionStorage.currentMoney = jo.reply.currentMoney;
			sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
            sessionStorage.isCash = jo.reply.isCashSend;
            sessionStorage.registed = jo.reply.isRegStore;
			location.replace('http://' + location.host + '/v/liby/scan_result.html');
            break;
        default:
			location.replace('http://' + location.host + '/liby/t/msg?'+jo.result.businessCode);
        }
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
