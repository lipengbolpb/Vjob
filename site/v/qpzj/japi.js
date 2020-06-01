(function(){
    "use strict";
    var args = vge.urlparse(location.href);

    // sessionStorage.clear();

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

    
    loading('x正在加载');
    
    var dom_msg = document.getElementById('msg'),
        dom_main = document.getElementById('container');
    // dom_desc = document.querySelector('.weui_msg_desc');
    dom_msg.innerHTML = 'openid='+args.openid;
    
    $('#wxscan').click(function(){
        wx.scanQRCode({
            success:function(res){
                toast(res.resultStr); // 当needResult 为 1 时，扫码返回的结果
            }
        });
    });
    
    function showmsg(bizbtn, msg){
        dom_msg.innerHTML = msg;
        var next = bizbtn.nextElementSibling;
        if(next) dom_main.insertBefore(dom_msg, next);
        else dom_main.appendChild(dom_msg);
    }

    $('#replenish').click(function(){ // 话费兑换
        var japi = vge.common + '/vjifenInterface/exchange/exchange.do';
        var ua = navigator.userAgent.toLowerCase();
        var data={
            "projectServerName": "zhejiang",
            "requestTime": Date.now(),
            "commandType": "new_recharge",
            "protocol": "1.0.0",
            "clientInfo": {
                "editionId": "1.0.0",
                "softLanguage": "1",
                "platformId": ua.indexOf('iphone')===-1? '200':'100'
            },                  // "100：iso、200：android【不能为空】"
            "commandInfo": {
                "openid": "微信openid",
                "unionid":"微信unionid",
                "currentmobile": "手机号",
                "longitude": "经度",
                "latitude": "纬度",
                "precisions": "精确度",
                "dataid": "数据字典中兑换话费金额key"
            }
        };
        vge.callJApi(japi, data, function(obj){
            
            // "msg": "提示消息，格式为：t:消息标题,c:消息内容"
            var msg = obj.result.msg,
                ti=msg.indexOf('t:'),
                ci=msg.indexOf('c:'), tt='提示',cc='';
            if(msg==='') {
                cc = 'businessCode:'+jo.result.businessCode;
            }else{
                if(ti>=0 && ci>=0) {
                    tt = msg.substring(2,ci-1);
                    cc = msg.substr(ci+2);
                }else{
                    cc = msg;
                }
            }
            var btntxt = '我知道了';
			// title_tip(tt , cc, btntxt);
            toast(cc);
        });
    });

    // 隐藏微信右上角菜单
    wx.ready(function() {
        wx.hideOptionMenu();
        wx.getLocation({
            type: 'wgs84',// 默认为wgs84的gps坐标
            complete: function (res) {   //接口调用完成执行回调，无论成功失败
                // console.log(res);
                var lat = res.latitude;  // 纬度，浮点数，范围为90 ~ -90
                var lng = res.longitude; // 经度，浮点数，范围为180 ~ -180
                var acc = res.accuracy;  // 位置精度
                toast('定位成功：'+[lat,lng,acc].join(', '));
            }
        });
    });
    
    // var requrl='http://'+vge.h5ost+'/wx/vxuinfo?openid='+openid;
    // vge.ajxget(requrl, 5000, function(r){
    //     try{
    //         var o = JSON.parse(r);
    //     }catch(e){
    //         vge.clog('errmsg', [requrl, e]);
    //     }
    // },function(err){
    //     vge.clog('errmsg', [requrl, e]);
    // });

    // $.get('/busr/welcome?cmd=del&appid='+appid +'&type='+type, function(ret) {
    //     console.log(ret);
    // });

    // $.post('/wx3/sendtplmsg?appid='+sessionStorage.active_app, JSON.stringify(data), function(ret){
    //     if (ret.errcode===0) {
    //         toast('发送成功');
    //     }else{
    //         console.log(ret);
    //         toast('发送出错');
    //     }
    // });
    
    loaded();
})();
