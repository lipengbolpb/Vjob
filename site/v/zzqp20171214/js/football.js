(function () {
    "use strict";
    ini_wxshare(vge.zzqpappid);
    var args = vge.urlparse(location.href),
        openid = args.openid;

    sessionStorage.openid = openid;

    window.location.href = 'http://' + location.host + '/v/zzqp20171214/footBall/index.html?openid=' + openid;

})();