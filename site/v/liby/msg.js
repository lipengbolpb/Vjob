(function(){
    "use strict";
    var dom_icon = document.querySelector('.weui_icon_msg'),
        dom_title = document.querySelector('.weui_msg_title'),
        dom_desc = document.querySelector('.weui_msg_desc');

    if(location.search.length===0) {
        document.title='客服电话';
        dom_icon.classList.add('liby-icon-kftel');
        // dom_icon.classList.add('weui_icon_success');
    }else{
        document.title='扫码赚钱';
        switch(location.search.substr(1)) {
        case '1':
            dom_icon.classList.add('liby-scan-errcode');
            dom_title.innerHTML = '噢，您扫描的不是活动二维码';
            dom_desc.innerHTML = '';
            break;
        case '2':
            dom_icon.classList.add('liby-scan-used');
            dom_title.innerHTML = '好遗憾，积分码已被扫过！';
            dom_desc.innerHTML = '';
            break;
        case '3':
        case '5':
            dom_icon.classList.add('liby-scan-gameover');
            dom_title.innerHTML = '噢，不好意思，活动过期了！';
            dom_desc.innerHTML = '';
            break;
        case '4':
            dom_icon.classList.add('liby-scan-nostart');
            dom_title.innerHTML = '噢，不好意思，活动还未开始，<br>等等再来吧！';
            dom_desc.innerHTML = '';
            break;
        case '6':
            dom_icon.classList.add('liby-scan-neterr');
            dom_title.innerHTML = '积分码异常！';
            dom_desc.innerHTML = '';
            break;
        case '7':
            dom_icon.classList.add('liby-scan-neterr');
            dom_title.innerHTML = '噢，网络开了个小差，<br>请稍后再试！';
            dom_desc.innerHTML = '';
            break;
        }
    }
})();
