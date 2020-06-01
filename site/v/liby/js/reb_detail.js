(function(){
    "use strict";
    ini_wxshare(vge.libyappid);
    var args = vge.urlparse(location.href),
        latitude, longitude, accuracy,
        openid = args.openid;

    var japi = vge.liby + '/DBTLBInterface/activity/getStoreStatus';
    var data={
        "openid": openid
    };
    vge.callJApi(japi, data, function(obj){
        switch(obj.result.businessCode) {
        case '0':               // 已注册
            break;
        case '1':               // 错误
            break;
        case '2':               // 无店铺信息
            location.replace('/liby/to2/scan_reg?reg=1&bopenid='+openid);
            break;
        default:
            toptip('error<br>'+obj.result.businessCode+','+obj.result.msg, 5000);
        }
    });
    
    wx.ready(function() {//获取位置
        wx.getLocation({        // 获取位置信息
            type: 'wgs84',// 默认为wgs84的gps坐标
            complete: function (res) {   //接口调用完成执行回调，无论成功失败
                // console.log(res);
                latitude = res.latitude;  // 纬度，浮点数，范围为90 ~ -90
                longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180
                accuracy = res.accuracy;  // 位置精度
                nearby_store();
            }
        });
    });

    var rebox = document.getElementById('re_box'),
        gdsum = document.getElementById('gdsum'),
        commit = document.getElementById('commit');
    var goodscnt=0, orders={};
    
    // rebox.addEventListener('click', function(ev){
    rebox.addEventListener('touchstart', function(ev){
        var tt = ev.target, sb;
        if(tt.className ==='minus') {
            sb = tt.nextElementSibling;
            if(sb.innerHTML < 1){
                return;
            }
            sb.innerHTML = sb.innerHTML -1;
            gdsum.innerHTML = --goodscnt;
            if(sb.innerHTML==0) delete orders[tt.parentNode.getAttribute('sku')];
            else orders[tt.parentNode.getAttribute('sku')] = sb.innerHTML;
        }else if(tt.className ==='plus'){
            sb = tt.previousElementSibling;
            sb.innerHTML = 1 + parseInt(sb.innerHTML);
            gdsum.innerHTML = ++goodscnt;
            orders[tt.parentNode.getAttribute('sku')] = sb.innerHTML;
        }else{
        }
    });

    var commiting=false;
    commit.addEventListener('click', function(ev){
        var lst=[];
        for(var k in orders) {
            lst.push({skuKey:k, skuNum:orders[k]});
        }
        if(lst.length===0){
            toptip('没有选择商品', 5000);
            return;
        }
        if(!commiting) {
            commiting = true;
            order(lst);
        }
    });

    skulist(1, 30);
    function skulist(page, num) {
        var japi = vge.liby + '/DBTLBInterface/skuinfo/queryAllSku';
        var data={
	        "openid":openid,
	        "currentPage": page,
            "count": num
        };
        vge.callJApi(japi, data, function(obj){
            var html=[];
            switch(obj.result.businessCode) {
            case '0':
                var lst = obj.reply, it;
                for(var i=0;i<lst.length;++i) {
                    it = lst[i];
                    html.push('<div class="li"><div class="re_img"><img src="');
                    html.push(it.logoPath + '"/></div>');
                    html.push('<div class="re_info"><p class="font0">');
                    html.push(it.skuName + '</p>');
                    html.push('<div class="plusminus" sku="'+it.skuKey+'"><b class="minus">-</b> <span>0</span> <b class="plus">+</b></div></div></div>');
                }
                break;
            case '2':  // 无数据
                html.push('<div class="li">没有活动商品</div>');
                break;
            default:
                html.push('<div class="li">查询活动商品异常，稍后再试</div>');
                toptip('error:'+obj.businessCode+','+obj.msg,5000);
            }
            rebox.innerHTML = html.join('');
        });
    }

    function order(lst) {
        var japi = vge.liby + '/DBTLBInterface/order/addOrder';
        var data={
	        'openid':openid,
            'skuList':lst
        };
        vge.callJApi(japi, data, function(obj){
            switch(obj.result.businessCode) {
            case '0':
                toptip('订单提交成功',5000);
                break;
            case '3':  // 未注册店铺
                break;
            default:
                toptip('error:'+obj.businessCode+','+obj.msg,5000);
            }
            var counts = rebox.querySelectorAll('.plusminus span');
            for(var n=0;n<counts.length;++n){
                counts[n].innerHTML = '0';
            }
            orders={};
            gdsum.innerHTML = '0';
            commiting = false;
        },'debug');
    }
    
    // init()；
    // function init (){
    //     var japi = vge.liby + '/DBTLBInterface/activity/getNewestActivityDetail';
    //     var data={
	   //      activityKey:activityKey
    //     };
    //     vge.callJApi(japi, data, function(obj){
    //         switch(obj.businessCode) {
    //         case '0':
    //             $("#reb_money").html(obj.replay.rebateMoney);
    //             $("#reb_time").html(obj.replay.rebateTime);
    //             $("#reb_goods").html(obj.replay.rebateGoods);
    //             $("#reb_area").html(obj.replay.rebateArea);
    //             $(",top_banner").attr("src",obj.replay.rebateDetailImage);
    //             break;
    //         case '1':
    //             toptip('加载失败:'+obj.msg,5000);
    //             break;
    //         default:
    //             toptip('error:'+obj.businessCode+','+obj.msg,5000);
    //         }
    //     });
    // }
    
    function nearby_store (){
        var japi = vge.liby + '/DBTLBInterface/activity/getNearReseller';
        var data={
	        "openid": openid,
	        "longitude":longitude,
	        "latitude":latitude
        };
        vge.callJApi(japi, data, function(obj){
            switch(obj.result.businessCode) {
            case '0':
                if (obj.reply.length===0) {
                	toptip("您附近没有经销商！",5000);
                } else{
                	toptip('您附近有'+obj.reply.length+'家经销商',5000);
                	var hs='',tel='',telview='';
                	for (var i = 0; i < obj.reply.length; ++i) {
                		tel=obj.reply[i].phoneNumber;
                		telview=tel.substring(0,3)+' '+tel.substring(3,7)+' '+tel.substring(7,11);
                		hs+='<li><div><p>'+obj.reply[i].resellerName+'</p><p><span>'+obj.reply[i].address+'</span><br><span>'+telview+'</span><span>'+obj.reply[i].userName+'</span></p></div><div><p></p><p>'+obj.reply[i].region+'m</p></div></li>';
                	};
                	$(".nearby_box").html(hs);
                }
                break;
            case '1':
                toptip('加载失败:'+obj.msg,5000);
                break;
            default:
                toptip('error:'+obj.businessCode+','+obj.msg,5000);
            }
        },'debug');
    }
})();
