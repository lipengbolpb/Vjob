(function(){
	window.onload = function(){
		var timer = null,i=0;
		var args = vge.urlparse(location.href),
       		openid=args.openid;
       		
        sessionStorage.hbopenid = openid;
        sessionStorage.bizcode = args.bizcode;
		timer = setInterval(function(){
			i++;
			if(i%2 === 0){
				$('.girl').attr('src','/v/TBEB/images/girl_2.png');
				$('.boy1').css('display','block');
				$('.boy2').css('display','none');
			}else{
				$('.girl').attr('src','/v/TBEB/images/girl_1.png');
				$('.boy1').css('display','none');
				$('.boy2').css('display','block');
			}
		},500);
		
		setTimeout(function(){
			$('.shaking').css('opacity',1);
		},1500);
		
		$('.btn_mark').on('click',function(){
			location.href ='http://'+ location.host + '/v/TBEB/result.html';
		});
	}
	
})();
