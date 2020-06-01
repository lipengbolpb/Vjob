(function() {
    "use strict";
    
    var japi = vge.liby + '/DBTLBInterface/order/orderDetail';
    var data={
        "openid": sessionStorage.openid,
	    "orderKey":sessionStorage.data
    };
    vge.callJApi(japi, data, function(obj){
        switch(obj.result.businessCode) {
        case '0':
            var tpl = document.getElementById('tpl-order').innerHTML;
            document.getElementById('order').innerHTML = ejs.render(tpl, obj.reply);
            var lst = obj.reply.skuList, html=[], sum=0;
            tpl = document.getElementById('tpl-li').innerHTML;
            for(var i=0;i<lst.length;++i){
                html.push(ejs.render(tpl, lst[i]));
                sum += parseInt(lst[i].skuNum);
            }
            document.getElementById('sum').innerHTML = sum;
            document.getElementById('box').innerHTML = html.join('');
            break;
        default:
            document.getElementById('sum').innerHTML = 0;
            alert('error:'+obj.result.businessCode+','+obj.result.msg);
        }
    },'debug');

})();
