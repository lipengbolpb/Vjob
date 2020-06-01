$(function(){
		//向左滚动
	if($('.dbt_mkbanner_content').length){
		$('.dbt_mkbanner_content').cycle({ 
			speed:1100,
			fx:'scrollLeft',
			pager:'.dbt_mkbanner_pages',
			timeout : 6000
		});
	}
})