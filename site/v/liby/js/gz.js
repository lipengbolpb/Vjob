(function() {
    'use strict';
    // /liby/too/gz?hbopenid=oJMqvt12s3EETR1X2hqJPNb10KzI&openid=oY0uauPtNJIN0ky6jusjk4usOyQQ
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
    
    loading('loading');
    $('#record').click(function () {
        location.replace('/liby/t/my_record?bopenid='+openid+'&openid='+hbopenid);
    });

	var args = vge.urlparse(location.href),
        openid=args.openid,
        hbopenid=args.hbopenid;
    
    sessionStorage.clear();
    sessionStorage.openid = openid;

    var japi = vge.liby + '/DBTLBInterface/activity/getStoreStatus';
    var data={
        "openid": openid
    };
    vge.callJApi(japi, data, function(obj){
        loaded();
        switch(obj.result.businessCode) {
        case '0':               // 已注册
            get_redpack();
            break;
        case '1':               // 错误
            toast('错误'+obj.result.msg);
            break;
        case '2':               // 无店铺信息
            location.replace('http://'+location.host+'/liby/t/scan_reg?bopenid='+openid+'&openid='+hbopenid);
            break;
        default:
            toast('error<br>'+obj.result.businessCode+','+obj.result.msg);
        }
    });

    function get_redpack () {
        loading('领取红包');
        var japi2 = vge.liby + '/DBTLBInterface/gifts/getGiftspack';
        var data2={
            "openid": openid,
            "hbopenid":hbopenid
        };
        vge.callJApi(japi2, data2, function(obj){
            loaded();
            switch(obj.result.businessCode) {
            case '0':
                document.getElementById('reg_success').style.display="block";
                break;
            case '1':
                toast('领取失败<br>'+obj.result.msg);
                break;
            default:
                toast('error<br>'+obj.result.businessCode+','+obj.result.msg);
            }
        },'debug');
    }

})();
