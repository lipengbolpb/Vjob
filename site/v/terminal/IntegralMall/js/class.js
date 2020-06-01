(function() {
	$('#content').load('/v/terminal/IntegralMall/class.html #class', function() {
		var jo = [],
			i = 0,
			html = '';
		if(sessionStorage.classList) {
			jo = JSON.parse(sessionStorage.classList);
			for(i = 0; i < jo.length; i++) { //style="background-image:url(${jo[i].categoryImg})"
				html += ` <div class="div${jo[i].categoryType} ${jo[i].categoryIco.split('-')[1]}"><span class="name">${jo[i].categoryName}</span></div>`;
			}

			$('#class').append(html);
			$('#class').on('click', 'div', function() {
				sessionStorage.classname = $(this).attr('class').substring(3);
				sessionStorage.categoryParent = $(this).attr('class').substring(3);
				$.getScript('js/goods.js');
			});
		} else {
			getFistCategoryType();
		}

		function getFistCategoryType() { //获取所有一级品类
			var javai = vge.terminal + '/DBTVMTSInterface/vpointsShop/getFistCategoryType';
			var req = {};
			vge.callJApi(javai, req,
				function(jo) {
					if(jo.result.code == '0') {
						if(!jo.result.businessCode) {
							jo = jo.reply;
							sessionStorage.classList = JSON.stringify(jo);
							for(i = 0; i < jo.length; i++) { //style="background-image:url(${jo[i].categoryImg})"
								html += ` <div class="div${jo[i].categoryType} ${jo[i].categoryIco.split('-')[1]}"><span class="name">${jo[i].categoryName}</span></div>`;
							}

							$('#class').append(html);
							$('#class').on('click', 'div', function() {
								sessionStorage.classname = $(this).attr('class').substring(3);
								sessionStorage.categoryParent = $(this).attr('class').substring(3);
								$.getScript('js/goods.js');
							});
						}
					} else {
						title_tip('尊敬的用户', jo.result.msg, '我知道了');
					}
				});
		}
	});

	//	$.ajaxSetup({
	//		cache: true
	//	});
})();