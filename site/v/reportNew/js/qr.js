    "use strict";
    loading('报表加载中');
    var args = vge.urlparse(location.href),
        itemValue = args.itemValue === undefined ? false : args.itemValue,
        queryDate = args.queryDate,
        openid = args.openid === undefined ? '0' : args.openid;
    sessionStorage.clear();
    sessionStorage.itemValue = itemValue;
    sessionStorage.queryDate = queryDate;
    if (itemValue == false) {
        var requrl = 'http://59.110.53.118:9008/DBTMainEntStats/reportDetail/getReportData.do?queryDate=' + queryDate + '&openid=' + openid;
    } else {
        var requrl = 'http://59.110.53.118:9008/DBTMainEntStats/reportDetail/getReportData.do?itemValue=' + itemValue + '&queryDate=' + queryDate + '&openid=' + openid;
    }

    $.ajax({
        async: false,
        type: "GET",
        // dataType:"json",
        url: requrl,
        success: function (jo) {
            loading('报表加载中');
            sessionStorage.jo = jo;
            window.location.replace('http://w.vjifen.com/v/reportNew/index.html')
        },
        error: function () {
            console.log('总体数据请求接口出错');
        }
    });


    function loading(txt) {
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