(function(){
	$('#content').load('person.html #person',function(){
		if(sessionStorage.headUrl!=''&&sessionStorage.headUrl!=='undefined'){
			$('.head').attr('src',sessionStorage.headUrl);
		}
		$('.nickname').html('昵称：'+sessionStorage.nickName);
//		$('#person .telphone a').text(sessionStorage.customerService);
		$('#person .telphone a').text('15378785617');		
		$('#person .telphone a').attr('href','tel:15378785617');//15378785617  河南客服电话
		$('#person .msg i').text(sessionStorage.vpoints);
		$('#person .tel').on('click',function(){
			$('#person .telphone').css('height','2rem');
		});
		$('.details').parent().on('click',function(){
			location.href = 'record.html';
		});
	});
//	$.ajaxSetup({
//	  cache: true
//	});
})();


