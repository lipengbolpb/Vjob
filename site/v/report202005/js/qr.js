    "use strict";
    loading('报表加载中');
    var args = vge.urlparse(location.href),
    // 这个版本默认走有itemValue的条件
        itemValue = args.itemValue === undefined ? true : args.itemValue,
        queryDate = args.queryDate,
        openid = args.openid === undefined ? '0' : args.openid;

    var type = args.type;
    var company = args.company;
    var indexData = {
        t_jo: null,
        s_jo: null,
    }
    sessionStorage.clear();
    sessionStorage.itemValue = itemValue;
    sessionStorage.queryDate = queryDate;
    sessionStorage.type = type;
    sessionStorage.company = company;
    var s_requrl = 'http://59.110.53.118:9008/DBTMainEntStats/reportDetail/getZDSXData.do?type=1'+'&queryDate=' + queryDate + '&openid=' + openid + '&companyKey=' + company;
    
    
    $.ajax({
        async: false,
        type: "GET",
        // dataType:"json",
        url: s_requrl,
        success: function (jo) {
            loading('报表加载中');
            sessionStorage.s_jo = jo;

            indexData.s_jo = true
            isDataReady()
        },
        error: function () {
            console.log('总体数据请求接口出错');
        }
    });

    var t_requrl = 'http://59.110.53.118:9008/DBTMainEntStats/reportDetail/getZDSXData.do?type=2&queryDate=' + queryDate + '&openid=' + openid + '&companyKey=' + company;
    $.ajax({
        async: true,
        type: "GET",
        url: t_requrl,
        success: function (jo) {
            loaded();
            sessionStorage.t_jo = jo;
            indexData.t_jo = true
            isDataReady()
        },
        error: function () {
            title_tip('提 示', '系统开了个小差，请稍后重试！', '我知道了');
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

    function isDataReady() {
        if (indexData.s_jo && indexData.t_jo) {
            window.location.replace('./index.html');
            // window.location.href = './index.html'
        }
    }