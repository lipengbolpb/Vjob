(function() {
	$(document).ready(function() {
		$('.mid_moon_lingth,.mid_moon_cloud,.mid_cloud_l,.mid_cloud_r,#mid_title_box_t,#mid_title_box_b').addClass('mid_ani');
	});

	var midhwb = document.documentElement.clientHeight / document.documentElement.clientWidth;
	if(midhwb < 1.4) { //矮屏幕手机
		$('div.ele_moon_box,div.ele_bottom_box').css('-webkit-transform', 'scaleY(.9)');
	} else if(midhwb > 2) {
		$('div.ele_moon_box,div.ele_bottom_box').css('-webkit-transform', 'scaleY(1.1)');
	} else if(midhwb < 1.43) {
		$('div.ele_moon_box,div.ele_bottom_box').css('-webkit-transform', 'scaleY(.95)');
	}
})();