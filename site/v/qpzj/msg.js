(function(){
    "use strict";
    var dom_icon = document.querySelector('.weui_icon_msg'),
        dom_title = document.querySelector('.weui_msg_title'),
        dom_desc = document.querySelector('.weui_msg_desc');

    if(location.search.length===0) {
        dom_icon.classList.add('weui_icon_success');
    }else{
        switch(location.search.substr(1)) {
        case 'scan-err':
            dom_icon.classList.add('liby-icon-scan-err');
            dom_title.innerHTML = '噢，您扫描的不是活动二维码';
            dom_desc.innerHTML = '';
            break;
        }
    }
})();
