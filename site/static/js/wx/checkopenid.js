(function(){

	var url=window.location.href,
	search=url.substr(url.indexOf('?')+1),
	sar=search.split('&'),openid='',sid='';

	for(var l=sar.length-1; l>=0; --l){
		if(sar[l].substr(0,7)==='openid='){
			openid=sar[l].substr(7);
		}else if(sar[l].substr(0,8)==='sid='){
			sid=sar[l].substr(8);
		}
	}
	if(openid.length<20) {
		window.location.href='/v/err/erro_tip.html';
	}else{
		sessionStorage.setItem('wxopenid',openid);
		sessionStorage.setItem('wxsid',sid);
	}

})();
