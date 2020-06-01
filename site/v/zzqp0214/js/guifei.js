  manifest=[
    {src: "guifei/zha1.png",class: ""},
    {src: "guifei/zha2.png",class: ""},
    {src: "guifei/bg1.jpg",class: ""},
    {src: "guifei/bg2.jpg",class: ""},
    {src: "guifei/dia1.png",class: ""},
    {src: "guifei/dia2.png",class: ""},
    {src: "guifei/dia3.png",class: ""},
    {src: "guifei/happy1.png",class: ""},
    {src: "guifei/happy2.png",class: ""},
    {src: "guifei/hand1.png",class: ""},
    {src: "guifei/hand2.png",class: ""},
    {src: "guifei/btn1.png",class: ""},
    {src: "guifei/btn2.png",class: ""},
    {src: "guifei/btn3.png",class: ""},
  ]
	document.addEventListener('DOMContentLoaded', function (event) {
	        load(manifest, function () {
	            $("#Loading").hide();
	            ready1();
	        })
	    })

	function ready1(){
		$('#dialogue').show();
		setTimeout(function(){
			$('.dia1').show();
		},1000);
		setTimeout(function(){
			$('.dia2').show();
		},2500);
		setTimeout(function(){
			$('.sad1').show();$('.hand').show();
		},3500);
		setTimeout(function(){
			$('.dia1,.dia2').hide();$('.dia3').show();
		},5000);
		setTimeout(function(){
			$('.happy2').show();$('.hand').removeClass('hand2');
		},6000);
		setTimeout(function(){
			$('.menu').show();
		},7800);
	}
	function ani1(){
		$('.lottery').show();
		setTimeout(function(){
			$('.jp').show();
		},2000);
	}
	function zj1(){
		$('.zj1').show();
	}
	function zj2(){
		$('.zj2').show();
	}
	function zj3(){
		$('.zj3').show();
	}
	function zj4(){
		$('.zj4').show();
		setTimeout(function(){$('.pp1_1').hide()},1200);
		setTimeout(function(){$('.pp3_1').hide();$('.pp3_2').show();},1700);
		setTimeout(function(){$('.pp3_2').hide()},2000);
	}
	function zj5(){
		$('.zj5').show();
	}

	var Vhuanju = document.querySelector('#Vhuanju'),
		Vmyjp = document.querySelector('#Vmyjp'),
		Vluckycj = document.querySelector('#Vluckycj'),
		VcomTips = document.getElementById("comTips"),
		Vfail = document.getElementsByClassName("Vfail")[0],
		VnoprizeTier3 = document.getElementById("VnoprizeTier3"),
		Vtip = document.getElementById("Vtip"),
		Vfail2 = document.getElementsByClassName("Vfail2")[0];
	
	var second = sessionStorage.again === undefined?'':sessionStorage.again;
	var args = vge.urlparse(location.href),
		bizcode = args.bizcode;
		
	if(bizcode.lastIndexOf('#')!==-1){
		bizcode = bizcode.substr(0,bizcode.length-1);
	}
	if(second == 'again'){//摇一摇的后退处理
		bizcode = '11';
	}
	switch(bizcode){
		case '0':               // 
            break;
        case '1':               // 该积分码不存在
        	setTimeout(function(){
        		VcomTips.style.display = 'block';
				Vfail.style.display = 'block';
				Vtip.innerHTML = '该二维码不存在';
				Vmyjp.style.display = 'none';
        	},8000)
            break;
        case '2':               // 该二维码已经被使用过
        	setTimeout(function(){
        		VnoprizeTier3.style.display = 'block';
				Vfail2.style.display = 'block';
				Vmyjp.style.display = 'none';
        	},8000)
            break;
        case '3':               // 二维码已过期
        	setTimeout(function(){
				VcomTips.style.display = 'block';
				Vfail.style.display = 'block';
				Vtip.innerHTML = '二维码已过期';
				Vmyjp.style.display = 'none';
			},8000)
            break; 
        case '4':               // 活动未开始
        	setTimeout(function(){
				VcomTips.style.display = 'block';
				Vfail.style.display = 'block';
				Vtip.innerHTML = '活动未开始<br /><span style="font-size:0.2;font-weight:400;">'+sessionStorage.remarks+'</span>';
				Vmyjp.style.display = 'none';
			},8000)
            break;
        case '5':               // 活动已结束
        	setTimeout(function(){
				VcomTips.style.display = 'block';
				Vfail.style.display = 'block';
				Vtip.innerHTML = '活动已结束';
				Vmyjp.style.display = 'none';
			},8000)
            break;  
        case '11':              // 自己重复扫，普通奖
			Vmyjp.style.display = 'none';
            break;
        case '-1':              // 
        	setTimeout(function(){
				VcomTips.style.display = 'block';
				Vfail.style.display = 'block';
				Vtip.innerHTML = '系统升级中...';
				Vmyjp.style.display = 'none';
			},8000)
            break;    
        default:
        	setTimeout(function(){
				VcomTips.style.display = 'block';
				Vfail.style.display = 'block';
				Vtip.innerHTML = '异常码: '+bizcode;
				Vmyjp.style.display = 'none';	
			},8000)
	}
	
	
	ini_wxshare(vge.zzqpappid);
	    // 分享
    var shareimg = 'http://'+vge.zzqp_host+'/v/zzqp0214/img/bg/sharefriend2.jpg',
    	shareurl = 'http://'+vge.zzqp_host+'/v/zzqp0214/huanju.html?flag=0';
	wx.ready(function(){	
		WeixinJSBridge.call('showOptionMenu');//显示右上角菜单		
		set_wxshare(shareimg,'欢聚一把','一起游戏，让我们欢聚一把！',shareurl);
	});
	
	Vhuanju.addEventListener('click',function(){
		_hmt.push(['_trackEvent', 'click', '去欢聚', '首页']);
		window.location.href = "http://"+vge.zzqp_host+"/v/zzqp0214/huanju.html";
	},false);

	Vmyjp.addEventListener('click',function(){
		_hmt.push(['_trackEvent', 'click', '去抽奖', '首页']);
		ani1();
	},false);

	Vluckycj.addEventListener('click',function(){
		_hmt.push(['_trackEvent', 'click', '去我的', '首页']);
		window.location.href = "http://"+vge.zzqp_host+"/zzqp0214/too/myJp?flag=0";
	},false);

	var Vshake = document.querySelector('.shake'),
		Vpk = document.querySelector('.pk'),
		Vhb = document.querySelector('.hb'),
		Vlook = document.querySelectorAll('.look');
	var second = sessionStorage.again === undefined?'':sessionStorage.again;
	
	var headimgurl = sessionStorage.headimgurl === undefined ? '': sessionStorage.headimgurl,
		nickname = sessionStorage.nickname === undefined ? '': sessionStorage.nickname,
		sweepstr = sessionStorage.sweepstr,
		openid = sessionStorage.openid;

	Vpk.addEventListener("click",function(){
		_hmt.push(['_trackEvent', 'click', '去猜拳', '摇一摇']);
		window.location.replace("http://"+vge.zzqp_host+"/v/zzqp0214/g3/index.html");
	},false);
	for(var j = 0;j<Vlook.length;j++){
		Vlook[j].addEventListener('click',function(){
			_hmt.push(['_trackEvent', 'click', '查看我的', '摇一摇']);
			window.location.replace("http://"+vge.zzqp_host+"/zzqp0214/too/myJp?flag=0");
		},false);
	}
	Vshake.addEventListener("click",Vzj,false);
	function Vzj(){//摇一摇成功的回调函数
		if(second=='again'){//后退处理
			document.getElementById("comTips").style.display = 'block';
			$('._close1').on('click',function(){
				location.href = 'http://'+vge.zzqp_host+'/v/zzqp0214/index.html?bizcode=11';
			});
			return;
		}
		
		_hmt.push(['_trackEvent', 'shake', '摇奖', '摇一摇']);
		sessionStorage.again = 'again';
		console.log('调接口');
		first = false;
		Vshake.removeEventListener("click",Vzj,false);
		var javai = vge.zzqp + '/DBTHNQPInterface/sweep/getGiftPacks';//摇一摇接口
		var req = {
			"openid": openid,
			"sweepstr": sweepstr,//码的内容
			"longitude": sessionStorage.longitude===undefined?'00':sessionStorage.longitude, //"经度"
			"latitude": sessionStorage.latitude===undefined?'00':sessionStorage.latitude //维度
		};
		vge.callJApi(javai, req,function(jo) {
			if(jo.result.code == '0'){
				if(jo.result.businessCode=='0'){
					switch (jo.reply.prizeType) {
			       	case '0'://现金红包
			       		if(Number(jo.reply.currentMoney)>=1000){
			       			Vhb.style.fontSize = '0.35rem';
			       		}
			       		Vhb.innerHTML = jo.reply.currentMoney/100 + '元';
						zj2();//财神
			       	    break;
			       	case '1'://奥古特              
						zj4();//酒神
			       	    break;
			       	case '3'://电影票              
						zj3();//美神
			       	    break;
			       	case '5'://游轮              
						zj1();//爱神
			       	    break;
			       	case '4':
			       		sessionStorage.currentMoney = jo.reply.currentMoney;
			       		sessionStorage.infoKey = jo.reply.infoKey;
			       		sessionStorage.tableSuffix = jo.reply.tableSuffix;
						zj5();//萌神
						break;
			    	}
				}else{
					VcomTips.style.display = 'block';
					Vfail.style.display = 'block';
					Vtip.innerHTML = '呜呜，系统开了个小差，请稍后重试！';
				}
				
			}else{//code!='0'
		        VcomTips.style.display = 'block';
				Vfail.style.display = 'block';
				Vtip.innerHTML = '呜呜，系统开了个小差，请稍后重试！';
		    }
		});
	}
	
	//canvas烟雾
	var canvas, stage, exportRoot;
	
	function init2() {
		canvas = document.getElementById("canvas");
	images = images||{};
	
	var loader = new createjs.LoadQueue(false);
	loader.addEventListener("fileload", handleFileLoad);
	loader.addEventListener("complete", handleComplete);
		loader.loadManifest(lib.properties.manifest);
	}
	
	function handleFileLoad(evt) {
		if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
	}
	
	function handleComplete(evt) {
		exportRoot = new lib.无标题3();
	
		stage = new createjs.Stage(canvas);
		stage.addChild(exportRoot);
		stage.update();
	
		createjs.Ticker.setFPS(lib.properties.fps);
		createjs.Ticker.addEventListener("tick", stage);
	}
	
	//分享
	var shareimg = 'http://'+vge.zzqp_host+'/v/zzqp0214/img/bg/sharefriend2.jpg',
		shareurl = 'http://'+vge.zzqp_host+'/v/zzqp0214/huanju.html?flag=0';
	ini_wxshare(vge.zzqpappid);
	wx.ready(function(){	
		WeixinJSBridge.call('showOptionMenu');//显示右上角菜单		
		set_wxshare(shareimg,'欢聚一把','一起游戏，让我们欢聚一把！',shareurl);
	});