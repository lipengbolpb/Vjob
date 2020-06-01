loading('报表加载中');
var queryDate = getQueryString('queryDate');
var type = getQueryString('type');
var company = getQueryString('company');
// var args = vge.urlparse(location.href),
//     queryDate = args.queryDate,
//     type = args.type,
//     company = args.company;

sessionStorage.clear();
sessionStorage.queryDate = queryDate;
sessionStorage.company = company;
sessionStorage.type = type;

var requrl = 'http://59.110.53.118:9008/DBTMainEntStats/reportDetail/getZDCXData.do?queryDate=' + queryDate + '&type=' + type + '&company=' + company;
$.ajax({
    async: true,
    type: "GET",
    url: requrl,
    success: function (jo) {
        loaded();
        sessionStorage.jo = jo;
        console.log(jo);
        window.location.replace('http://' + location.host + '/v/TerminalReport/index.html');
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

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}