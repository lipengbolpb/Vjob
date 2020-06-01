    "use strict";
    loading('报表加载中');
    var args = vge.urlparse(location.href),
        itemValue = args.itemValue,
        queryDate = args.queryDate;
    sessionStorage.itemValue = itemValue;
    sessionStorage.queryDate = queryDate;
    var requrl='http://59.110.53.118:9008/DBTMainEntStats/reportDetail/getReportData.do?itemValue='+itemValue+'&queryDate='+queryDate;
    vge.ajxget(requrl,5000, function(jo){
        loading('报表加载中');
        sessionStorage.jo = jo;
        // setTimeout(function(){
            window.location.replace('http://w.vjifen.com/v/report/index.html')
        // },200);
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

