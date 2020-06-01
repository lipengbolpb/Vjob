(function(){
	$('#content').load('person.html #person',function(){
		if(sessionStorage.headUrl!=''&&sessionStorage.headUrl!=='undefined'){
			$('.head').attr('src',sessionStorage.headUrl);
		}
		$('.nickname').html('昵称：'+sessionStorage.nickName);
//		$('#person .telphone a').text(sessionStorage.customerService);
//		$('#person .telphone a').attr('href','tel:'+sessionStorage.customerService);
		$('#person .telphone a').text('0311-66600300');
		$('#person .telphone a').attr('href','tel:'+'0311-66600300');
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


