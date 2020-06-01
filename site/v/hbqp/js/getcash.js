(function() {
	'use strict';
	
	var shakeIco = document.querySelector('.shakeIco'),
		dom_mp3 = document.querySelector('#audio')===undefined?null:document.querySelector('#audio'),
		dom_mark = document.querySelector('.mark'),
		dom_hammer = document.getElementById('hammer'),
		dom_hand = document.getElementById('hand'),
		pic = document.getElementById("pig"),
		dom_msg = document.getElementsByClassName('msg')[0],
		hmark = document.getElementsByClassName('hmark')[0],
		pic_box = document.getElementsByClassName('pig_pic')[0],
		pic_box2 = document.getElementsByClassName("pic_box")[0],
		pic_lf = document.getElementsByClassName('pic_lf')[0],
		pic_rgt = document.getElementById("pic_rgt"),
		pic_coin = document.getElementById("gold-coin"),
		dom_rule = document.getElementById("dom_rule"),
		knock = document.getElementById("knock")===undefined?null:document.getElementById("knock"),
		dom_prompt = document.getElementById("prompt"),
		ikonw_btn = document.getElementsByClassName("wxmark")[0],
		curM1 = document.getElementById("currentMoney"),
		curM2 = document.getElementById("totalAccountMoney"),
		hb_title = document.getElementById("title"),
		toMybag = document.getElementsByClassName("tomybag")[0],
		toast = document.getElementById("toast"),
		dom_private = document.getElementById("dom_private"),
		zajinzhu = document.getElementById("zajizhu"),
		shkbtn = document.getElementById("shakebtn"),
		jgys = document.getElementById("ro_light"),
		sign_bg = document.getElementById("sign-bg"),
		sign = document.getElementById("sign"),
		progressNum = document.getElementsByClassName('progress')[0],
		checkday = document.getElementById("checkday"),
		imgDays = document.getElementsByClassName('days')[0],
		cash_bg = document.getElementsByClassName('cash-bg')[0],
		progress = document.getElementById("progress");
		

    var dom_Hb1 = document.querySelector('#iconHb1'),
        dom_Hb2 = document.querySelector('#iconHb2'),
        dom_Hb3 = document.querySelector('#iconHb3'),
        dom_Bi1 = document.querySelector('#iconBi1'),
        dom_Bi2 = document.querySelector('#iconBi2'),
        dom_Bi3 = document.querySelector('#iconBi3'),
        dom_Bi4 = document.querySelector('#iconBi4'),
        dom_Bi5 = document.querySelector('#iconBi5'),
        dom_Bi6 = document.querySelector('#iconBi6'),
        dom_Bi7 = document.querySelector('#iconBi7'),
        dom_Bi8 = document.querySelector('#iconBi8'),
        dom_Bi9 = document.querySelector('#iconBi9'),
        dom_Bi10 = document.querySelector('#iconBi10');

    var openid = sessionStorage.openid === undefined ? '': sessionStorage.openid,
		args = vge.urlparse(location.href),
		hbopenid = args.openid;
	var second = sessionStorage.again === undefined?'':sessionStorage.again;
	
	if(hbopenid.lastIndexOf('#')!== -1){
    	hbopenid = hbopenid.substr(0,hbopenid.length-1);
   }

	var get = sessionStorage.get === undefined?'true':sessionStorage.get,//提现标志
    	shake = sessionStorage.shake === undefined?true:sessionStorage.shake,
    	first = sessionStorage.first === undefined?true:sessionStorage.first;//摇一摇
        
	var currentMoney = sessionStorage.currentMoney === undefined ? '': sessionStorage.currentMoney,
		codeContentUrl = sessionStorage.codeContentUrl === undefined? '/v/hbqp/img/toast.png?v=1.0.5':sessionStorage.codeContentUrl,
		codeContentUrl2 = '/v/hbqp/img/dot-me.png?v=1',
		totalAccountMoney = sessionStorage.totalAccountMoney === undefined ? '':sessionStorage.totalAccountMoney,
		weekSignFlag = sessionStorage.weekSignFlag === 'undefined' ? '0':sessionStorage.weekSignFlag,//是否开户自然周签到，1:开启、0或空:关闭
		weekSignDays = sessionStorage.weekSignDays === 'undefined' ? '':sessionStorage.weekSignDays,//当前周已签到周几集合
		weekSignEarnFlag = sessionStorage.weekSignEarnFlag === 'undefined' ? '0':sessionStorage.weekSignEarnFlag,//周签到红包是否已领取，1:已领取、0未领取  2.领取签到红包
		weekSignEarnMoney = sessionStorage.weekSignEarnMoney === 'undefined' ? '':sessionStorage.weekSignEarnMoney,//周签到红包金额
		weekSignLimitDay = sessionStorage.weekSignLimitDay === 'undefined' ? '':sessionStorage.weekSignLimitDay,//周签到天数限制
		weekSignDiffDay = sessionStorage.weekSignDiffDay === 'undefined' ? '':sessionStorage.weekSignDiffDay,//周签到还差天数
		weekSignPercent = sessionStorage.weekSignPercent === 'undefined' ? '':sessionStorage.weekSignPercent;//周签到完成百分比
	if(Number(totalAccountMoney) >= 10){
		var suij = Math.random()*2;
		if(suij < 1){
			toast.src = '/v/hbqp/img/zajinzhu1.png?v=3';	
		}else{
			toast.src = '/v/hbqp/img/zajinzhu2.png?v=2';
		}
	}else if(Number(totalAccountMoney) >= 1){
		toast.src = codeContentUrl2;	
	}else{
		toast.src = codeContentUrl;
	}
	
	if(weekSignFlag==1){
		sign_bg.style.display = 'block';//签到按钮
		if(weekSignEarnFlag==1){//已领取
			sign_bg.innerHTML = '<img class="receive" src="/v/hbqp/img2/hb1.png"/>';
			cash_bg.innerHTML = '<p class="checkTip">恭喜您获得<br /><span id="weekSignEarnMoney">'+weekSignEarnMoney+'</span>元</p><img src="/v/hbqp/img2/get-cash.png?v=1" class="cash-bg"/><img src="/v/hbqp/img2/zhang.png" class="zhang"/>';
		}
	}
	
	sign_bg.addEventListener('click',function(){
		sign.style.display = 'block';//签到页面
	},false);
	//进度条
	progressNum.innerHTML = weekSignPercent +'%';
	progress.style.width = weekSignPercent * 7.8/100 + 'rem';
	
	sign.addEventListener('click',function(){
		if(weekSignEarnFlag==="2"){
			weekSignEarnFlag = '1';
		}
		sign.style.display = 'none';
		sign_bg.style.display = 'block';//签到按钮
		if(weekSignEarnFlag=='1'){//已领取
			sign_bg.innerHTML = '<img class="receive" src="/v/hbqp/img2/hb1.png"/>';
			cash_bg.innerHTML = '<p class="checkTip">恭喜您获得<br /><span id="weekSignEarnMoney">'+weekSignEarnMoney+'</span>元</p><img src="/v/hbqp/img2/get-cash.png?v=1" class="cash-bg"/><img src="/v/hbqp/img2/zhang.png?v=1" class="zhang"/>';
			document.getElementsByClassName('zhang')[0].style.opacity = 1;
		}
	},false);
	switch (weekSignDiffDay){//签到剩余天数
		case '1':imgDays.src = '/v/hbqp/img2/days1.png';
			break;
		case '2':imgDays.src = '/v/hbqp/img2/days2.png';
			break;
		case '3':imgDays.src = '/v/hbqp/img2/days3.png';
			break;
		case '4':imgDays.src = '/v/hbqp/img2/days4.png';
			break;
		case '5':imgDays.src = '/v/hbqp/img2/days5.png';
			break;
		case '6':imgDays.src = '/v/hbqp/img2/days6.png';
			break;	
		default:
			break;
	}
	
	switch (weekSignLimitDay){//签到天数
		case '1':checkday.innerHTML = '一';
			break;
		case '2':checkday.innerHTML = '二';
			break;
		case '3':checkday.innerHTML = '三';
			break;
		case '4':checkday.innerHTML = '四';
			break;
		case '5':checkday.innerHTML = '五';
			break;
		case '6':checkday.innerHTML = '六';
			break;
		case '7':checkday.innerHTML = '七';
			break;
		default:
			break;
	}
	if(weekSignDays!=''){
		weekSignDays = weekSignDays.split(',').sort();
	}
	if(weekSignDays.length>0){
		for(var i=0;i<weekSignDays[weekSignDays.length-1];i++){//打钩打叉
			document.getElementsByClassName('checks')[i].style.backgroundImage = 'url(/v/hbqp/img2/frok.png)';
		}
	}
	for(var j = 0;j <weekSignDays.length;j++){
		document.getElementsByClassName('checks')[weekSignDays[j]-1].style.backgroundImage = 'url(/v/hbqp/img2/check.png)';
	}
	
	
	
	
	
	dom_rule.addEventListener('click',function () {//活动规则
		_hmt.push(['_trackEvent', 'click', '查看活动规则', 'getcash']);
		location.href= "http://mp.weixin.qq.com/s?__biz=MzI5NjQ4MDMyNg==&mid=100000002&idx=1&sn=f7c8f4e597107e9983d0bf56c6c1e8d7&chksm=6c42fa2b5b35733da6a6d7899487459c31e0d7ec13c4e250ceebd14706fca25e2e54d59a3233#rd";
		sessionStorage.get = get;
		sessionStorage.first = false;
		sessionStorage.shake = false;
		sessionStorage.hammer = dom_hammer.getAttribute('class');
	},false);
	dom_private.addEventListener('click',function () {//隐私说明
		_hmt.push(['_trackEvent', 'click', '查看隐私说明', 'getcash']);
		location.href="http://mp.weixin.qq.com/s?__biz=MzI5NjQ4MDMyNg==&mid=100000006&idx=1&sn=ccd140506a659b0e2b9d43f841d5d25f&chksm=6c42fa2f5b357339732e51b3efda6b91ebd3065f40b323d578ad8fffa68c8044664a7a6c8175#rd";
		sessionStorage.get = get;
		sessionStorage.first = false;
		sessionStorage.shake = false;
		sessionStorage.hammer = dom_hammer.getAttribute('class');
	},false);
	
    dom_hammer.className = sessionStorage.hammer === undefined?'hammer':sessionStorage.hammer;	
    
    if(shake === 'false'){//返回状态
    	doResult(1);
    	if(get === 'false'){
    		ham();
    	}
    }
   	shkbtn.addEventListener('click',function(){
   		_hmt.push(['_trackEvent', 'click', '点击拆红包', 'getcash']);
   		shkbtn.style.display = 'none';
   		if(first===true){
            doResult(2700);
    	}
   	},false);
   	curM1.innerHTML = currentMoney;
	curM2.innerHTML = '¥' + totalAccountMoney;	
	if(Number(totalAccountMoney) >= 1){
		dom_prompt.innerHTML = '您的累计中奖金额大于等于1元啦，点击上面的锤子砸开存钱罐，把钱拿走吧。';
		toMybag.value = '立即提现';
	}else{
		pic.src = '/v/hbqp/img/min-pig.png?v=1';
		zajinzhu.style.display = 'none';
	}
	
	if(totalAccountMoney * 100 === 0 && Number(currentMoney) === 0){
		hmark.style.display = 'none';
	}else{
		
	}

	curM2.innerHTML = '¥' + totalAccountMoney;
	curM1.innerHTML = currentMoney;
	if(Number(currentMoney) === 0){
		hb_title.innerHTML = '抱歉<br />手气不佳';
		dom_hand.parentElement.style.display = 'none';
	}


   	
   	toMybag.addEventListener("click",function(){//查看红包
   		_hmt.push(['_trackEvent', 'click', '查看我的红包', 'getcash']);
		var requrl='http://'+vge.o3host+'/wx3/uinfo2?openid='+openid+'&appid='+vge.hbqpappid;
		vge.ajxget(requrl, 5000, function(r){
			try{
				var o = JSON.parse(r);
				if(o.subscribe==0) {//未关注
					window.location.replace('http://'+location.host+'/v/hbqp/attention.html');
				}else{//已关注用户
					window.location.replace('http://'+location.host+'/hbqp/too/mybag');
				}
			}catch(e){
				vge.clog('errmsg', [requrl, e]);
			}
		},function(err){
			vge.clog('errmsg', [requrl, err]);
		});
	},false);
   	
	// 摇一摇功能  
	init();
    function init() { 
        if (window.DeviceMotionEvent) {// devicemotion事件监听
            window.addEventListener('devicemotion', deviceMotionHandler, false);  
        }  
    }  
    var SHAKE_THRESHOLD = 400;
    var last_update = 0;
    var x, y, z, last_x, last_y, last_z;       
    function deviceMotionHandler(eventData) {        
        var acceleration =eventData.accelerationIncludingGravity;
        var curTime = new Date().getTime();       
        if ((curTime - last_update)> 270) {                
            var diffTime = curTime -last_update;
            last_update = curTime;       
            x = acceleration.x;
            y = acceleration.y;
            z = acceleration.z;       
            var speed = Math.abs(x +y + z - last_x - last_y - last_z) / diffTime * 10000;          
            if(speed > SHAKE_THRESHOLD){
            	if(first===true){
	                doResult(2700);
            	}
            }
            last_x = x;
            last_y = y;
            last_z = z;
          }
    }   
    function doResult(time) {//摇一摇回调函数 
    	_hmt.push(['_trackEvent', 'click', '摇一摇拆红包', 'getcash']); 
    	shkbtn.style.display = 'none';
    	if(shake === true){
      		 if(dom_mp3){
      		 	dom_mp3.setAttribute('src','/v/hbqp/shake.mp3?v=1');
	      		dom_mp3.play();
	      		shake = false;
      		 }
    		shake = false;
    	}    	
     	first = false;//摇一摇次数限制；
        shakeIco.style.opacity = '0';
        if(second=='again'){//后退处理
			location.replace('http://'+vge.hbqp_host+'/v/hbqp/fail.html?bizcode=11');
			return;
		}
        sessionStorage.again = 'again';
        
        
        setTimeout(function(){
        	dom_Hb1.className = 'iconHb1';
        	dom_Hb2.className = 'iconHb2';
        	dom_Hb3.className = 'iconHb3';
        	dom_Bi1.className = 'iconBi1';                         
        	dom_Bi2.className = 'iconBi2';                         
        	dom_Bi3.className = 'iconBi3';                         
        	dom_Bi4.className = 'iconBi4';                         
        	dom_Bi5.className = 'iconBi5';  
        	dom_Bi6.className = 'iconBi6';  
        	dom_Bi7.className = 'iconBi7';  
        	dom_Bi8.className = 'iconBi8';  
        	dom_Bi9.className = 'iconBi9';  
        	dom_Bi10.className = 'iconBi10';
        }, 1)

        var mTimer = setTimeout(function(){
        	//mon_suiji();
        	dom_mark.style.opacity = 1;
        	if(Number(totalAccountMoney) < 1){
				dom_hammer.style.display = 'none';
				jgys.style.background = 'none';
				dom_hand.parentElement.style.display = 'block';
				var timer = setTimeout(function(){
					dom_hand.className = 'hand1';
				},200);
			}else{
				dom_hammer.style.display = 'block';
				dom_hand.parentElement.style.display = 'none';
				zajinzhu.addEventListener("click",ham,false);
			}
			
			var timer2 = setTimeout(function(){
				var total = Number(totalAccountMoney) > 1? 1 * 100: totalAccountMoney*100;
				hmark.style.height = 4.1 * total/100 + 'rem';
			},300);	
			if(weekSignEarnFlag=='2'){//签到完成弹窗
	        	sign.style.display = 'block';
	        	cash_bg.innerHTML = '<p class="checkTip">恭喜您获得<br /><span id="weekSignEarnMoney">'+weekSignEarnMoney+'</span>元</p><img src="/v/hbqp/img2/get-cash.png?v=1" class="cash-bg"/><img src="/v/hbqp/img2/zhang.png" class="zhang"/>';
	        	document.getElementsByClassName('zhang')[0].style.opacity = '0';
	        	
	        }
			
        },time);
   	}
    function ham(){
		if(get === 'true'){
	    	zajinzhu.style.display = 'none';
			if(knock){
				knock.setAttribute('src','/v/hbqp/knock.mp3?v=1');
				knock.play();	
			}			
			give_spack();
			get = 'false';
		}
		jgys.style.cssText += '-webkit-animation-play-state: paused;';
		toMybag.value = '查看我的红包';
		toast.src = codeContentUrl;
		zajinzhu.removeEventListener("click",ham,false);
		dom_hammer.className = 'hammer1';
		setTimeout(function(){
			pic.style.opacity = 0;
			pic_box2.style.display = 'block';
			pic_lf.style.left = '4%';
			pic_rgt.style.left = '55.5%';
			pic_coin.style.opacity = 1;
			dom_msg.style.display = 'none';
			hmark.style.display = 'none';		
		},200);
	}
	window.onload = function(){
		var pic_box = document.getElementsByClassName('pig_pic')[0],
			pic = document.getElementById("pig");
		pic_box.style.height = pic.clientHeight + 'px';//金猪高度
		jgys.style.height = pic.clientHeight + 'px';//金猪高度
	}
	
	function give_spack() {//提现
		_hmt.push(['_trackEvent', 'click', '提现', 'getcash']); 
		var javai = vge.hbqp + '/DBTHBQPInterface/gifts/getGiftspack';
		var req = {
			"openid": openid,
			"hbopenid":hbopenid
		};
		vge.callJApi(javai, req,
	        function(jo) {
	            if (jo.result.code == '0') {
		            if (jo.result.businessCode === '0') {
		            	ikonw_btn.style.display = 'block';
		            } else if (jo.result.businessCode === '1') { //1
			            title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
			        } else if (jo.result.businessCode === '-1') { //-1
			            title_tip('提 示', '系统升级中...', '我知道了');
			        } else if (jo.result.businessCode === '2') { //-1
			        	first = true;
			            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			        } else if (jo.result.businessCode === '3') { //-1
			            title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
			        } else {
			         	title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
		            	first = true;
			        }
	            } else { //code!='0'
		            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
		            first = true;
	            }
	    	});
	}
	
	ikonw_btn.addEventListener("click",function(){
		var requrl='http://'+vge.o3host+'/wx3/uinfo2?openid='+openid+'&appid='+vge.hbqpappid;
		vge.ajxget(requrl, 5000, function(r){
			try{
				var o = JSON.parse(r);
				if(o.subscribe==0) {//未关注
					window.location.replace('http://'+location.host+'/v/hbqp/attention.html');
				}else{//已关注用户
					ikonw_btn.style.display = 'none';
				}
			}catch(e){
				vge.clog('errmsg', [requrl, e]);
			}
		},function(err){
			vge.clog('errmsg', [requrl, err]);
		});
	},false);
	
})();