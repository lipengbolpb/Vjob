function make0(){
	//$('.ai .head').show();
	//$('.cai .head').show();
	//$('.jiu .head').show();
	//$('.mei .head').show();
	//$('.meng .head').show();
	$('.bef').hide();$('.aft').show();
}
function make(x){
	switch(x){
		case 1:{$('#poster3,#poster3 .cai').show();$('.logo4').css('left','.45rem');
			$('.make').click(function(){
				$('.cai .head').show();
				$('.bef').hide();$('.aft').show();
			});
			break;
		}
		case 2:{$('#poster3,#poster3 .meng').show();$('.logo4').css('left','.45rem');
			$('.make').click(function(){
				$('.meng .head').show();
				$('.bef').hide();$('.aft').show();
			});
			break;
		}
		case 3:{$('#poster3,#poster3 .mei').show();$('.logo4').css('left','4.45rem');
			$('.make').click(function(){
				$('.mei .head').show();
				$('.bef').hide();$('.aft').show();
			});
			break;
		}
		case 4:{$('#poster3,#poster3 .ai').show();$('.logo4').css('left','.45rem');
			$('.make').click(function(){
				$('.ai .head').show();
				$('.bef').hide();$('.aft').show();
			});
			break;
		}
		case 5:{$('#poster3,#poster3 .jiu').show();$('.logo4').css('left','.45rem');
			$('.make').click(function(){
				$('.jiu .head').show();
				$('.bef').hide();$('.aft').show();
			});
			break;
		}
	}
}
function back1(){
	$('#poster2,#poster3,.post').hide();
	$('.bef').show();$('.aft').hide();
	$('#poster1 .back2').show();

}
$('.bef .change').click(function(){
	$('#poster3').hide();
	$('#poster3 .post').hide();
})



document.body.ontouchmove = function (e) {
      e.preventDefault();
}