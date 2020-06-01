(function(){
	var btn = document.getElementsByClassName('make')[0],
		btna = document.getElementsByClassName('a'),
		btnp = document.getElementsByClassName('p'),
		img=document.getElementsByClassName("head");
	function make0(){
		$('.bef').hide();$('.aft').show();
	}
	function make(x){
		switch(x){
			case 1:{
				$('#poster3,#poster3 .cai').show();
				$('.logo4').css('left','.45rem');
				$('.make').click(function(){
					$('#drag').css({'display':'block','opacity':'1'});
					 
					$('.cai .head').show();
					$('.cai .head').attr('id','Vhead');
					$('.bef').hide();
					$('.aft').show();
				});
				break;
			}
			case 2:{
				$('#poster3,#poster3 .meng').show();
				$('.logo4').css('left','.45rem');
				$('.make').click(function(){
					$('#drag').css({'display':'block','opacity':'1'});
					 
					$('.meng .head').show();
					$('.meng .head').attr('id','Vhead');
					$('.bef').hide();
					$('.aft').show();
				});
				break;
			}
			case 3:{
				$('#poster3,#poster3 .mei').show();
				$('.logo4').css('left','4.45rem');
				$('.make').click(function(){
					$('#drag').css({'display':'block','opacity':'1'});
					 
					$('.mei .head').show();
					$('.mei .head').attr('id','Vhead');
					$('.bef').hide();
					$('.aft').show();
				});
				break;
			}
			case 4:{
				$('#poster3,#poster3 .ai').show();
				$('.logo4').css('left','.45rem');
				$('.make').click(function(){
					$('#drag').css({'display':'block','opacity':'1'});
					$('.ai .head').show();
					$('.ai .head').attr('id','Vhead');
					$('.bef').hide();
					$('.aft').show();
				});
				break;
			}
			case 5:{
				$('#poster3,#poster3 .jiu').show();
				$('.logo4').css('left','.45rem');
				$('.make').click(function(){
					$('#drag').css({'display':'block','opacity':'1'});
					$('.jiu .head').show();
					$('.jiu .head').attr('id','Vhead');
					$('.bef').hide();
					$('.aft').show();
				});
				break;
			}
		}
	}
	
	
	for(var j = 0; j < btna.length; j++){
		btna[j].index = j;
		btna[j].addEventListener('click',function(){
			make(this.index-0+1);
		},false);
		btnp[j].addEventListener('click',function(){
			make(this.index-0+1);
		},false);
	}
	
	function back1(){
		$('#poster2,#poster3,.post').hide();
		$('.bef').show();$('.aft').hide();
		$('#poster1 .back2').show();
		$('#drag').css('display','none');
	
	}

	$('.bef .change').click(function(){
		$('#poster3').hide();
		$('#poster3 .post').hide();
	});
	
	document.querySelector('.back').addEventListener('click',back1,false);
	
	document.body.ontouchmove = function (e) {
	      e.preventDefault();
	};
	var localIds = '';
	ini_wxshare(vge.zzqpappid);
	var shareimg = 'http://'+vge.zzqp_host+'/v/zzqp/img/bg/sharefriend.jpg',
		shareurl = 'http://'+vge.zzqp_host+'/v/zzqp/huanju.html?flag=0';
	wx.ready(function(){    
	    btn.addEventListener('click',function(){
	    	WeixinJSBridge.call('showOptionMenu');//显示右上角菜单		
			set_wxshare(shareimg,'五神海报','快看快看，我的五神海报！',location.href);
	        wx.chooseImage({
	            count: 1, // 默认9
	            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
	            sourceType: ['camera','album'], // 可以指定来源是相册还是相机，默认二者都有
	            success: function (res) {
	                localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
		            for(var i = 0;i < img.length; i++){		            	
		            	img[i].src = localIds;
		            }
	            }
	        });
	    },false);
	});
	
	
    $('#closeTip').click(function(){
		$('#drag').css('opacity','0');
		$('#closeTip').css('display','none');$('.back').css('display','none');
		$('body,html').css({'width':'100%','height':'100%'});
		alert('辛苦一下，收到截屏保存美好记忆！');
//      html2canvas($('body'),{  
//	        allowTaint: false,  
//	        taintTest: true,  
//	        onrendered: function(canvas) {
//	            canvas.id = "mycanvas";  
//	            var dataUrl = canvas.toDataURL();  
//	            console.log(dataUrl);
//				document.body.innerHTML = '<img src="'+dataUrl+'"/><p style="color: white;font-size: 0.2rem;position: absolute;right: 22%;bottom: 5%;">长按保存到手机</p>';    
//	        }  
//		});
	});
	
	
	$(function () {
        var $targetObj = $('#drag');
        //初始化设置
        cat.touchjs.init($targetObj, function (left, top, scale, rotate) {
            $targetObj.css({
                left: left,
                top: top,
                '-webkit-transform': 'scale(' + scale + ') rotate(' + rotate + 'deg)'
            });
        });
        cat.touchjs.scale($targetObj, function (scale) {
           	//$('#drag').text(scale);
            var Vscale = $('#drag').css('-webkit-transform');
			$('#Vhead').css('-webkit-transform',Vscale);
        });
        //初始化旋转手势（不需要就注释掉）
        cat.touchjs.rotate($targetObj, function (rotate) {
          //  $('#drag').text(rotate);
            var Vscale1 = $('#drag').css('-webkit-transform');
			$('#Vhead').css('-webkit-transform',Vscale1);
        });
    });
	
	drag('drag');
		
	function drag(obj,parentNode){
	    var obj = document.getElementById(obj);
	    if(arguments.length == 1){
	        var parentNode = window.self;  
	        var pWidth = parentNode.innerWidth,pHeight = parentNode.innerHeight;   
	    }else{
	        var parentNode = document.getElementById(parentNode);
	        var pWidth = parentNode.clientWidth,pHeight = parentNode.clientHeight;
	    }
	    obj.addEventListener('touchstart',function(event){
	        //当只有一个手指时              .
	        if(event.touches.length == 1){
	            //禁止浏览器默认事
	            event.preventDefault();
	        }
	        var touch = event.targetTouches[0];
	        var disX = touch.clientX - obj.offsetLeft,disY = touch.clientY - obj.offsetTop;
	        var oWidth = obj.offsetWidth,oHeight = obj.offsetHeight;
	 
	        obj.addEventListener('touchmove',function(event){
	            var touch = event.targetTouches[0];
	            obj.style.left = touch.clientX - disX  + 'px';
	            obj.style.top = touch.clientY - disY + 'px';
	            //左
	            if(obj.offsetLeft <=0){
	                obj.style.left = 0;
	            }
	            //右
	            if(obj.offsetLeft >= pWidth -oWidth){
	                obj.style.left =  pWidth - oWidth + 'px';  
	            }
	            //上
	            if(obj.offsetTop <= 0){
	                obj.style.top = 0; 
	            }
	            //下
	            if(obj.offsetTop >= pHeight - oHeight){
	                obj.style.top =  pHeight - oHeight + 'px'; 
	            }   
	            var L = $('#drag').css('left');
		        var T = $('#drag').css('top');
		        $('#Vhead').css({'left':L,'top':T});
	        });
	        obj.addEventListener('touchend',function(event){
	           // obj.removeEventListener('touchmove');
	          //  obj.removeEventListener('touchend');
	        });
	    });
	}
	
	
	
	
	
})();
