function toptip (tip,time) {
    bingtoptipid = 'bingtoptip';
    var wrapper = document.getElementById(bingtoptipid), tipimg,tiptalk;

    if(wrapper===null) {

        wrapper=document.createElement('div');
	    tipimg=document.createElement('img');
		tiptalk=document.createElement('p');
		tipclose=document.createElement('span');
    }else{
	    tipimg=wrapper.querySelector('img');
		tiptalk=wrapper.querySelector('p');
		tipclose=wrapper.querySelector('span');
    }
    wrapper.id=bingtoptipid;
    
	wrapper.style.overflow='hidden';
	tiptalk.innerHTML=tip;
	tipimg.src='/v/liby/img/error_log.png';
	wrapper.appendChild(tipimg);
	wrapper.appendChild(tiptalk);
	wrapper.appendChild(tipclose);
	var cssstyle='width:100%; z-index:100; text-align:left; line-height:26px; background:rgba(0,0,0,0.7); color:#fff; font-size:13px; overflow:hidden;';
	if (window.navigator.userAgent.toLowerCase().indexOf('iphone') !== -1) {
			// wrapper.style.cssText=cssstyle+'position:fixed; left:0px; top:0px;';
	// } else{
		// window.onscroll=function () {
			wrapper.style.cssText=cssstyle+' position:absolute; left:0px; top:0px;';
    		// var hh=document.documentElement.scrollTop||document.body.scrollTop;
			// wrapper.style.top=hh+'px';
		// }
	}else{
		wrapper.style.cssText=cssstyle+'position:fixed; left:0px; top:0px;';	
	}

	tipimg.style.cssText='float:left; width:16px; height:16px; margin:5px; margin-top:9px;';
	tiptalk.style.cssText='float:left; line-height:16px; margin:0px; width:82%; margin-top:10px; margin-bottom:10px;';
	tipclose.style.cssText='float: right; width: 14px; height: 14px; margin: 11px 10px 0 0; background: url(/v/liby/img/close_big.png) 0 0 no-repeat; background-size: 100%;'
	document.body.appendChild(wrapper);
	wrapper.style.display = 'block';

	if (time !== undefined) {
		if (window.vjf_tips_t !== undefined) {
			clearTimeout(window.vjf_tips_t);
			window.vjf_tips_t = undefined;
		}
		window.vjf_tips_t = setTimeout(function() {
			wrapper.style.display = 'none';
			clearTimeout(window.vjf_tips_t);
			window.vjf_tips_t = undefined;
		}, time);
	}

	tipclose.addEventListener("click",function () {
		if (window.vjf_tips_t !== undefined) {
			wrapper.style.display = 'none';
			clearTimeout(window.vjf_tips_t);
			window.vjf_tips_t = undefined;
		}
	},false);
}
