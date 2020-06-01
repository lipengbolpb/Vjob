loading('报表加载中');
var args = vge.urlparse(location.href),
    queryDate = args.queryDate;
sessionStorage.clear();
sessionStorage.queryDate = queryDate;

var requrl = 'http://59.110.53.118:9008/DBTMainEntStats/reportDetail/getFreshData.do?queryDate=' + queryDate;
$.ajax({
    async: true,
    type: "GET",
    url: requrl,
    success: function (jo) {
        loaded();
        sessionStorage.jo = jo;
        window.location.replace('http://' + location.host + '/v/FreshReport/index.html');
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