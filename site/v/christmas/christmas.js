function includeLinkStyle(url) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}

function includeHtml() {
    // var div = document.createElement('div');
    // div.classList.add('christmas');
    var div = document.getElementsByClassName('christmas')[0];
    div.innerHTML = '<img src="/v/christmas/img/bg.png" class="christmasBg">' +
        '<img src="/v/christmas/img/line_1.png" class="line_1">' +
        '<img src="/v/christmas/img/line_2.png" class="line_2">' +
        '<img src="/v/christmas/img/star_1.png" class="star_1">' +
        '<img src="/v/christmas/img/star_2.png" class="star_2">' +
        '<img src="/v/christmas/img/logo.png" class="christmasLogo">' +
        '<img src="/v/christmas/img/bling.png" class="christmasBling">' +
        '<img src="/v/christmas/img/music.png" class="christmasMusic">' +
        // '<img src="/v/christmas/img/close.png?v=1" class="christmasClose">' +
        '<div class="christmasSlogan">' +
        '<img src="/v/christmas/img/slogan.png">' +
        '</div>';
    var first = document.body.firstChild; //得到页面的第一个元素 
    document.body.insertBefore(div, first);
    setTimeout(function () {
        document.getElementsByClassName('christmas')[0].classList.add('christmasFade');
        setTimeout(function () {
            document.getElementsByClassName('christmas')[0].style.display = 'none';
        }, 600);
    }, 3000);
    document.getElementsByClassName('christmas')[0].addEventListener('click', function () {
        document.getElementsByClassName('christmas')[0].classList.add('christmasFade');
        setTimeout(function () {
            document.getElementsByClassName('christmas')[0].style.display = 'none';
        }, 600);
    }, false)
}

function init() {
    var args = vge.urlparse(location.href),
        bizcode = args.bizcode,
        again = sessionStorage.again;
    if (bizcode == 11 || again == 'true' || again == 'again') {
        document.getElementsByClassName('christmas')[0].style.display = 'none';
        return false;
    } else {
        includeLinkStyle("/v/christmas/css/christmas.css?v=3");
        includeHtml();
    }
}
if (new Date().getTime() > 1544371200000) {
    // 12.10以后
    init();
} else {
    document.getElementsByClassName('christmas')[0].style.display = 'none';
}