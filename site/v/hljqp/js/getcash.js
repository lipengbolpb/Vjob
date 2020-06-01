	var dom_ball1 = document.getElementsByClassName('ball1')[0],
		dom_ball2 = document.getElementsByClassName('ball2')[0],
		dom_ball3 = document.getElementsByClassName('ball3')[0],
		dom_man = document.getElementsByClassName('man')[0],
		dom_mobile = document.getElementsByClassName('yao')[0],
		dom_shake = document.getElementsByClassName('shake')[0],
		dom_getcash = document.getElementsByClassName('getcash')[0],
		dom_alert = document.getElementsByClassName('alert')[0],
		dom_img = document.getElementsByClassName('title')[0],
		dom_tip = document.getElementsByClassName('tip')[0],
		dom_money = document.getElementsByClassName('money')[0],
		dom_btn = document.getElementsByClassName('btn')[0],
		dom_hb = document.getElementsByClassName('hb')[0],
		dom_num = document.getElementsByClassName('num')[0],
		dom_explain = document.getElementsByClassName('explain')[0],
		dom_rule = document.getElementsByClassName('rule')[0],
		dom_notice = document.getElementById('notice');

	var openid = sessionStorage.openid === undefined ? '': sessionStorage.openid,
		args = vge.urlparse(location.href),
		hbopenid = args.openid;

	var currentMoney = sessionStorage.currentMoney === undefined ? '': sessionStorage.currentMoney,
		codeContentUrl = sessionStorage.codeContentUrl === undefined? '':sessionStorage.codeContentUrl,
		totalAccountMoney = sessionStorage.totalAccountMoney === undefined ? '':sessionStorage.totalAccountMoney;

	var flag = true;

	dom_ball1.addEventListener('click',function(){
		_hmt.push(['_trackEvent', 'click', '点击篮球进入', 'getcash']);
		doResult();
	},false);
    dom_man.addEventListener('click',function(){
    	_hmt.push(['_trackEvent', 'click', '点击篮球进入', 'getcash']);
    	doResult();
    },false);

    var first = sessionStorage.first === undefined?true:sessionStorage.first,//摇一摇
    	back = sessionStorage.back === undefined?false:sessionStorage.back;//摇一摇
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
            		_hmt.push(['_trackEvent', 'click', '摇一摇进入', 'getcash']);
	                doResult();
            	}
            }
            last_x = x;
            last_y = y;
            last_z = z;
        }
    }   
    if(back){
    	dom_shake.style.display = 'none';
   		dom_getcash.style.display = 'block';
    	getcash();
    }
    function doResult(time) {//摇一摇回调函数
    	dom_mobile.className = 'mobile';
   		first = false;//只能摇一次
    	$('.ball1').addClass('up');
    	setTimeout(function(){
    		dom_ball1.style.display = 'none';
    		dom_ball2.style.display = 'block';
    		setTimeout(function(){
    			$('.ball2').addClass('blur swing');
    			setTimeout(function(){
    				$('.ball2').removeClass('blur swing');
    				setTimeout(function(){
    					$('.ball2').addClass('blur swing');
    					setTimeout(function(){
    					$('.ball2').removeClass('blur swing');
    					dom_ball2.style.display = 'none';
    					dom_ball3.style.display = 'block';
    						setTimeout(function(){
    							getcash();
    						},800);
    					},700);
    				},500);
    			},700);
    		},500);
    	},200);
   	}

   	function getcash(){//动画执行完的回调函数
   		dom_shake.style.opacity = '0';
   		dom_getcash.style.opacity = '1';
   		dom_img.src = codeContentUrl;//标题图片路径
   		dom_money.innerHTML = currentMoney;
		if(Number(totalAccountMoney) >= 1){
			dom_btn.value = '立即提现';
			flag = true;
			dom_notice.innerHTML = '温馨提示：您的红包累计金额为'+totalAccountMoney+'元，点击上方按钮把钱拿走吧！';
			if(Number(currentMoney) == 0){
   				dom_hb.src = 'http://'+vge.hljqp_host+'/v/hljqp/img/0.png';
   				dom_tip.style.display = 'none';
   				dom_num.style.display = 'none';
			}
		}else if(Number(totalAccountMoney) < 1){
			dom_btn.value = '存入我的零钱包';
			flag = false;
			if(Number(currentMoney) == 0){
				dom_btn.value = '谢谢参与';
   				dom_hb.src = 'http://'+vge.hljqp_host+'/v/hljqp/img/0.png';
   				dom_tip.style.display = 'none';
   				dom_num.style.display = 'none';
			}
		}
		dom_btn.addEventListener('click',function(){
			dom_shake.style.display = 'none';
			if(flag){
				// title_tip('提 示', '微信提现升级中，您可先扫码，红包会自动累积哦', '我知道了');
				_hmt.push(['_trackEvent', 'click', '点击提现', 'getcash']);
				give_spack();
			}else{
				_hmt.push(['_trackEvent', 'click', '查看我的红包', 'getcash']);
				subscribe();
			}
		},false);
   	}

   	function give_spack() {//提现
		var javai = vge.hljqp + '/DBTHLJQPInterface/gifts/getGiftspack';
		var req = {
			"openid": openid,
			"hbopenid":hbopenid
		};
		vge.callJApi(javai, req,
	        function(jo) {
	            if (jo.result.code == '0') {
		            if (jo.result.businessCode === '0') {
		            	dom_getcash.style.display = 'none';
		            	dom_alert.style.display = 'block';
		            	dom_alert.addEventListener('click',function(){
		            		subscribe();
		            	},false);
		            }  else if (jo.result.businessCode === '1') { //1
			            title_tip('提 示', '您的待提余额不足1元，再喝几瓶攒够1元发红包！', '我知道了');
			        } else if (jo.result.businessCode === '2') { //后台金额不足
			            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			        } else if (jo.result.businessCode === '3') { //1
			            title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
			        } else if (jo.result.businessCode === '-1') { //-1
			            title_tip('提 示', '系统升级中...', '我知道了');
			        } else if (jo.result.businessCode === '4'){
			        	title_tip('尊敬的用户', '提现处理中，请稍后查看详细记录!', '我知道了');
			        } else{
			            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			        }
	            } else { //code!='0'
		            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
	            }
	    	});
	}

	function subscribe(){//判断关注
		var requrl='http://'+vge.o3host+'/wx3/uinfo2?openid='+openid+'&appid='+vge.hljqpappid;
		vge.ajxget(requrl, 5000, function(r){
			try{
				var o = JSON.parse(r);
				if(o.subscribe==0) {//未关注
					window.location.replace('http://'+location.host+'/v/hljqp/attention.html');
				}else{//已关注用户
					window.location.replace('http://'+location.host+'/hljqp/too/mybag');
				}
			}catch(e){
				vge.clog('errmsg', [requrl, e]);
			}
		},function(err){
			vge.clog('errmsg', [requrl, err]);
		});
	}

	dom_explain.addEventListener('click',function(){
		_hmt.push(['_trackEvent', 'click', '查看隐私说明', 'getcash']);
		location.href="http://mp.weixin.qq.com/s/3uWS_EuePMNDp50XPqC0qg";
		sessionStorage.first = false;
		sessionStorage.back = true;
	},false);

	dom_rule.addEventListener('click',function(){
		_hmt.push(['_trackEvent', 'click', '查看活动规则', 'getcash']);
		location.href= "http://mp.weixin.qq.com/s/t1EDivvtuxE4hlTjDrcJkg";
		sessionStorage.first = false;
		sessionStorage.back = true;
	},false);