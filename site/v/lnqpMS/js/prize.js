(function(){
	var prizeType =sessionStorage.prizeType;
	var rotate = 900;
	switch (prizeType){
		case 'M01'://购物车
			rotate = 1080;
			$('.prize').attr('src','/v/lnqpMS/img/prize_1.png?v=2');
			break;
		case 'M02'://经典一提
			rotate = 1020;
			$('.prize').attr('src','/v/lnqpMS/img/prize_2.png?v=2');
			break;
		case 'M03'://经典一瓶
			rotate = 840;
			$('.prize').attr('src','/v/lnqpMS/img/prize_3.png?v=2');
			break;
		case 'M04'://开瓶器
			rotate = 780;
			$('.prize').attr('src','/v/lnqpMS/img/prize_4.png?v=2');
			break;	
		case 'M05'://流量
			rotate = 960;
			$('.prize').attr('src','/v/lnqpMS/img/prize_ll.png?v=2');
			$('.btn').css('display','block');
			$('.btn').on('click',function(){
				location.replace('https://m.10010.com/queen/qingdaobeer/qdbeer.html');
			});
			break;	
		case 'M06':
			rotate = 900;
			$('.prize').css('display','none');
			$('.result_box').css('background-image','url(/v/lnqpMS/img/prize_fail_bg.png)');
			$('.title').html('继续努力呦~').css('lineHeight','7.8rem');
			break;					
		default:
			rotate = 900;
			$('.prize').css('display','none');
			$('.result_box').css('background-image','url(/v/lnqpMS/img/prize_fail_bg.png)');
			$('.title').html('继续努力呦~').css('lineHeight','7.8rem');
			break;
	}
	$('.pointer').on('click',function(){
		$('.disc').css('transform','rotate('+rotate+'deg)');
	});
	$('.disc').on('transitionend',function(){
		$('.pointer').unbind();
		$('.alert').css('display','block');
	});
	$('.time').html('中奖时间：'+sessionStorage.earnTime);
})()