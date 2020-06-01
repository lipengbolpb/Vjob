(function() {
    "use strict";
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
        }, 3000);
    }

	var args = vge.urlparse(location.href),
		openid = args.openid;
    
    var dom_orders = document.getElementById('orders'),
        btn_more = document.getElementById('more');

    dom_orders.addEventListener('click', function(ev){
        var tt = ev.target, pp = tt.parentNode;
        if(pp.tagName.toLowerCase()==='li'){
            sessionStorage.data = pp.getAttribute('data');
            sessionStorage.openid = openid;
            location.href = '/liby/t/order-detail';
        }
    });

    var have_more = false, currentpage=1, pagecount=40;
	btn_more.addEventListener('click',function () {
		if (have_more) {
			++currentpage;
            list(currentpage, pagecount);
		}
	},false);

    var japi = vge.liby + '/DBTLBInterface/order/queryOrderTotal';
    var data={
        "openid": openid
    };
    vge.callJApi(japi, data, function(obj){
        switch(obj.result.businessCode) {
        case '0':
            document.getElementById('sum').innerHTML = obj.reply.orderTotal;
            break;
        default:
            document.getElementById('sum').innerHTML = 0;
            toast(obj.result.msg);
        }
    },'debug');

    list(currentpage, pagecount);

    var tpl_item = document.getElementById('tpl-li').innerHTML;
    
    function list(page, count) {
        loading('加载...');
        var japi2 = vge.liby + '/DBTLBInterface/order/queryAllOrder';
        var data2={
            "openid": openid,
	        "currentPage": page,
            "count": count
        };
        vge.callJApi(japi2, data2, function(obj){
            loaded();
            switch(obj.result.businessCode) {
            case '0':
                var html=[],lst=obj.reply, li, name='';
                if(lst.length<pagecount){
                    have_more = false;
                    btn_more.innerHTML='已经显示全部';
                }else{
                    have_more = true;
                }
                for(var i=0;i<lst.length;++i){
                    li = lst[i];
                    if(li.skuName.length>18) {
                        name = li.skuName.substr(0,18)+'...';
                    }else{
                        name = li.skuName;
                    }
                    html.push(ejs.render(tpl_item, {
                        data: li.orderKey,
                        code:li.orderNo,
                        count:li.skuNumTotal,
                        name: name,
                        time:li.orderDate
                    }));
                }
                document.getElementById('orders').innerHTML = html.join('');
                break;
            default:
                btn_more.innerHTML='已经显示全部';
                toast(obj.result.msg);
            }
        },'debug');
    }
 
})();
