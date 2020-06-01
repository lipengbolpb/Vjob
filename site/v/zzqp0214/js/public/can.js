//圆角矩形
	CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
	    var min_size = Math.min(w, h);
	    if (r > min_size / 2) r = min_size / 2;
	    // 开始绘制
	    this.beginPath();
	    this.moveTo(x + r, y);
	    this.arcTo(x + w, y, x + w, y + h, r);
	    this.arcTo(x + w, y + h, x, y + h, r);
	    this.arcTo(x, y + h, x, y, r);
	    this.arcTo(x, y, x + w, y, r);
	    this.closePath();
	    return this;
	}
	
	var canvas = $('#canvas').get(0);
	var scale = winW/canvas.width;
	
	function drawImg(popImg){
		var context =canvas.getContext('2d');
		context.clearRect(0,0,canvas.width,canvas.height);
		//底色
		context.fillStyle = 'rgb(220, 221, 221)';
		context.fillRect(0,0,canvas.width,canvas.height);

		//大图
		var x = 3;
		var y = 3;
		var viewWidth = canvas.width-2*x;
		var viewHeight = viewWidth*popImg.height/popImg.width;
		context.drawImage(popImg,0,0,popImg.width,popImg.height,x,y,viewWidth,viewHeight);
//		var part1Heihgt = y*2+viewHeight;
//		context.fillStyle = 'rgb(255, 255, 255)';
//		context.fillRect(0,part1Heihgt,canvas.width,canvas.height-part1Heihgt);
		//标题文字
//		context.font="bold 1.1rem GJJZhiYi-M12S5258d52605c54";
//		context.textAlign="left";
//		context.fillStyle ="#00512C";
//		context.fillText("我的超生活宣言：",10,viewHeight+30);
		//用户文字
//		context.font="bold 1rem microsoft yahei";
//		context.textAlign="left";
//		context.fillStyle ="#00512C";	
			
//		if (window.sessionStorage.editThiVal == null || window.sessionStorage.editThiVal == "" || window.sessionStorage.editThiVal == "undefined") {
//			window.sessionStorage.editThiVal="生活既要健康又美味，好吃健康尽在Today！";
//			}
//			context.fillText(window.sessionStorage.editThiVal,10,viewHeight+60);		
		//生成图片
		var url = canvas.toDataURL('image/jpeg',1);
		//$('#imgTarget').get(0).src=url;
		$("#imgTarget").attr("src", url);
		$("#imgTarget").load(function() {
			$('.imgloading').hide();
		}); 
}