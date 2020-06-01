	var dom_getcash = document.getElementsByClassName('getcash')[0],
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

	getcash();
   	function getcash(){//动画执行完的回调函数
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
			if(flag){
//				title_tip('提 示', '微信提现升级中，您可先扫码，红包会自动累积哦', '我知道了');
				give_spack();
			}else{
				subscribe();
			}
		},false);
   	}

   	function give_spack() {//提现
   		_hmt.push(['_trackEvent', 'click', '点击提现', 'repcash']);
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
			        } else {
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
		_hmt.push(['_trackEvent', 'click', '查看隐私说明', 'repcash']);
		location.href="http://mp.weixin.qq.com/s/3uWS_EuePMNDp50XPqC0qg";
	},false);

	dom_rule.addEventListener('click',function(){
		_hmt.push(['_trackEvent', 'click', '查看活动规则', 'repcash']);
		location.href= "http://mp.weixin.qq.com/s/t1EDivvtuxE4hlTjDrcJkg";
	},false);