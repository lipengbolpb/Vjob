window.onload=function(){
	'use strict'
	var Vname = document.querySelectorAll('.Vname'),
		Vhead = document.querySelectorAll('.Vhead'),
		Vshake = document.querySelector('.shake'),
		Vpk = document.querySelector('.pk'),
		Vhb = document.querySelector('.hb'),
		Vlook = document.querySelectorAll('.look');
	var second = sessionStorage.again === undefined?'':sessionStorage.again;
	
	init();
	var headimgurl = sessionStorage.headimgurl === undefined ? '/v/zzqp/img/bg/headimg.png': sessionStorage.headimgurl,
		nickname = sessionStorage.nickname === undefined ? '未知用户': sessionStorage.nickname,
		sweepstr = sessionStorage.sweepstr,
		openid = sessionStorage.openid;
	
	vge.clog('获取用户信息', [nickname,headimgurl]);
	for(var i = 0;i<Vname.length;i++){
		Vname[i].innerHTML = nickname;
		Vhead[i].firstChild.src = headimgurl;
	}
	Vpk.addEventListener("click",function(){
		_hmt.push(['_trackEvent', 'click', '去猜拳', '摇一摇']);
		window.location.href = "http://"+vge.zzqp_host+"/v/zzqp/g3/index.html";
	},false);
	for(var j = 0;j<Vlook.length;j++){
		Vlook[j].addEventListener('click',function(){
			_hmt.push(['_trackEvent', 'click', '查看我的', '摇一摇']);
			window.location.replace("http://"+vge.zzqp_host+"/zzqp/too/myJp?flag=0");
		},false);
	}
	//摇一摇代码
	var SHAKE_THRESHOLD = 2000;
	var last_update = 0,first = true;
	var x = 0,
		y = 0,
		z = 0,
		last_x = 0,
		last_y = 0,
		last_z = 0;
	function init() {
		if (window.DeviceMotionEvent) {
			window.addEventListener('devicemotion', deviceMotionHandler, false);
		} else {
			alert('not support mobile event');
		}
	}
	function deviceMotionHandler(eventData) {
		var acceleration = eventData.accelerationIncludingGravity;
		var curTime = new Date().getTime();
		if ((curTime - last_update) > 30) {
			var diffTime = curTime - last_update;
			last_update = curTime;
			x = acceleration.x;
			y = acceleration.y;
			z = acceleration.z;
			var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
			if (speed > SHAKE_THRESHOLD) {
				if(first){
					_hmt.push(['_trackEvent', 'shake', '手摇', '摇一摇']);
					Vzj();
				}
			}
			last_x = x;
			last_y = y;
			last_z = z;
		}
	}
	
	function Vzj(){//摇一摇成功的回调函数
		if(second=='again'){//后退处理
			document.getElementById("comTips").style.display = 'block';
			$('._close1').on('click',function(){
				location.href = 'http://'+vge.zzqp_host+'/v/zzqp/index.html?bizcode=11';
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
						zj1(4);//财神
			       	    break;
			       	case '1'://奥古特              
						zj1(2);//酒神
			       	    break;
			       	case '3'://电影票              
						zj1(3);//美神
			       	    break;
			       	case '5'://游轮              
						zj1(1);//爱神
			       	    break;
			       	case '4':
			       		sessionStorage.currentMoney = jo.reply.currentMoney;
			       		sessionStorage.infoKey = jo.reply.infoKey;
			       		sessionStorage.tableSuffix = jo.reply.tableSuffix;
						zj5();//萌神
						break;
			    	}
				}
				
			}else{//code!='0'
		        title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
		    }
		});
	}
	
	Vshake.addEventListener("click",Vzj,false);
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
	
	//中奖弹窗
	function zj1(x){
		// $('#animation .q2').attr('src','/v/zzqp/img/yaoqian/q2_1.png?v=1');
		document.querySelector('.q2').setAttribute('src','/v/zzqp/img/yaoqian/q2_'+x+'.png?v=1');
		document.getElementsByClassName('jp1')[0].src = '/v/zzqp/img/zj/zj'+x+'_1.png?v=1';
		document.getElementsByClassName('jp2')[0].src = '/v/zzqp/img/zj/zj'+x+'_2.png?v=1';
		document.getElementsByClassName('jp3')[0].src = '/v/zzqp/img/zj/zj'+x+'_3.png?v=1';
		ani();music2();
		setTimeout(function(){musicBlow();},1500);
		setTimeout(function(){document.querySelector('.cai').style.display = 'block';},4500);
	}
	function zj5(){
		ani();music2();
		setTimeout(function(){musicBlow();},1500);
		setTimeout(function(){document.querySelector('.meng').style.display = 'block';},4500);
	}

	function ani(){
		// $('#animation').show();gif2();
		document.querySelector('#animation').style.display = 'block';gif2();
	}
	function gif2(){
		setTimeout(function(){
			//$('.gif2').show();
			document.querySelector('#canvas').style.display = 'block';init2();
			// $('#canvas').show();init2();
		},3800);
		setTimeout(function(){
			// $('#canvas').hide()
			document.querySelector('#canvas').style.display = 'none';
		},5000)
	}
	function music2(){
		document.getElementById("music2").play();
	}
	function musicBlow(){
		document.getElementById("musicBlow").play();
	}
	
	//分享
	var shareimg = 'http://'+vge.zzqp_host+'/v/zzqp/img/bg/sharefriend2.jpg',
		shareurl = 'http://'+vge.zzqp_host+'/v/zzqp/huanju.html?flag=0';
	ini_wxshare(vge.zzqpappid);
	wx.ready(function(){	
		WeixinJSBridge.call('showOptionMenu');//显示右上角菜单		
		set_wxshare(shareimg,'欢聚一把','一起游戏，让我们欢聚一把！',shareurl);
	});

 //    pushHistory(); //左上角返回监测

	// window.addEventListener("popstate", function(e) { //拆红包后禁止后退到扫码页面
 //    	window.location.href='http://'+vge.zzqp_host+'/v/zzqp/index.html?bizcode=11';
 //    }, false); 
 //    function pushHistory() { 
 //        var state = { 
 //            title: "title", 
 //            url: "#"
 //        }; 
 //        window.history.pushState(state, "title", "#"); 
 //    }
}