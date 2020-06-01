$(function() {
	var $btn = $('.playbtn');
	var playnum = 3; //初始次数，由后台传入
	var isture = 0;
	var clickfunc = function() {
		var data = [1, 2, 3, 4, 5, 6];
		//data为随机出来的结果，根据概率后的结果
		data = data[Math.floor(Math.random() * data.length)];
		switch(data) {
		case 1:
			rotateFunc(1, 30, '好遗憾','天啦噜，居然啥也没有抽中<br>快去洗洗手，再试一次吧！','/v/liby/img/noprize.png','我知道了');
			break;
		case 2:
			rotateFunc(2, 90, '恭喜您','哇，人品大爆发，抽中二等奖<br>在中奖记录中可以查看我的奖品','/v/liby/img/getprize.png','确认');
			break;
		case 3:
			rotateFunc(3, 150, '恭喜您','哇，人品大爆发，抽中三等奖<br>在中奖记录中可以查看我的奖品','/v/liby/img/getprize.png','确认');
			break;
		case 4:
			rotateFunc(4, 210, '好遗憾','天啦噜，居然啥也没有抽中<br>快去洗洗手，再试一次吧！','/v/liby/img/noprize.png','我知道了');
			break;
		case 5:
			rotateFunc(5, 270, '恭喜您','哇，人品大爆发，抽中特别奖<br>在中奖记录中可以查看我的奖品','/v/liby/img/getprize.png','确认');
			break;
		case 6:
			rotateFunc(6, 330, '恭喜您','哇，人品大爆发，抽中一等奖<br>在中奖记录中可以查看我的奖品','/v/liby/img/getprize.png','确认');
			break;
		}
	};
    
	$btn.click(function() {
		if(isture) return; // 如果在执行就退出
		isture = true; // 标志为 在执行
		//先判断是否登录,未登录则执行下面的函数
		if(1 == 2) {
			playnum=0;
			// alert("请先登录");
			resultTip("网络异常","亲，您的网络信号貌似断开了<br>重新连接再试试吧！","/v/liby/img/neterror.png","好的，我知道了");
			isture = false;
		} else { //登录了就执行下面
			if(playnum <= 0) { //当抽奖次数为0的时候执行
				resultTip("并没有","亲，您还没有足够的积分<br>赚够了积分再来拿大奖吧！","/v/liby/img/noenough.png","查看如何赚取积分",function () {
					//跳转如何赚取积分页
					location.href="http://www.baidu.com";
				});
				$('.playnum').html(0);
				isture = false;
			} else { //还有次数就执行
				playnum = playnum - 1; //执行转盘了则次数减1
				if(playnum <= 0) {
					playnum = 0;
				}
				clickfunc();
			}
		}
	});
    
	var rotateFunc = function(awards, angle, tit, con, imgsrc, btn) {
		isture = true;
		$btn.stopRotate();
		$btn.rotate({
			angle: 0,
			duration: 4000, //旋转时间
			animateTo: angle + 1440, //让它根据得出来的结果加上1440度旋转
			callback: function() {
				isture = false; // 标志为 执行完毕
				resultTip(tit, con, imgsrc, btn);
			}
		});
	};
	var x=true;
	var timer=setInterval(function () {
		if (x) {
			$(".g-lottery-img").css({"background":" url(/v/liby/img/bling1.png) center center no-repeat","backgroundSize": "98%"});
			x=false;
		} else{
			$(".g-lottery-img").css({"background":" url(/v/liby/img/bling2.png) center center no-repeat","backgroundSize": "98%"});
			x=true;
		}
	},500);
	function resultTip (tit, con, imgsrc, btn,cb) {
		$(".result_mask").show();
		$(".result_tit").html(tit);
		$(".result_con").html(con);
		$(".result_btn").html(btn);
		$(".result_img").attr("src",imgsrc);
		$(".result_btn").click(function () {
			$(".result_mask").hide();
			if (cb!==undefined) {
				cb();
			}
		});
	}
	$(".prize_record").click(function () {
		location.href="win_record.html";
	});
});
