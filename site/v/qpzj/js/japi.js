(function(){
    "use strict";
    document.title='css/img/js/html';

    // sessionStorage.clear();

    // var jstags = document.getElementsByTagName('script'),
    //     l=jstags.length,
    //     jspath='';
    // for(var i=0;i<l;++i) {
    //     jspath = jstags[i].src;
    //     console.log(jspath);
    // }
    // console.log(document.currentScript);

    var jspath = document.currentScript.src,
        i = jspath.lastIndexOf('/'),
        htmlpath = jspath.substr(0, i-2); // /js
    console.log(htmlpath);

    var btnimg = document.getElementById('change-img'),
        btncls = document.getElementById('change-class'),
        bg = document.getElementById('container'),
        img = document.getElementById('img');

    btnimg.addEventListener('click', function(ev){
        img.src = htmlpath+'img/diwen.png';
    });
    btncls.addEventListener('click', function(ev){
        bg.className = 'newbg';
    });
    
})();
