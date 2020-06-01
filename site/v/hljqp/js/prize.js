	var reg1=/^1[0-9]{10}$/,//验证手机号
		reg2=/^[1-9][0-9xX]{17}$/,//验证身份证号
		reg3=/^[0-9]{4}$/;

	var countdowntimer = null;

	var openid = sessionStorage.openid === undefined ? '': sessionStorage.openid,
		unionid = sessionStorage.unionid === undefined ? '': sessionStorage.unionid,
		username = sessionStorage.username === undefined ? '': sessionStorage.username,
		idcard = sessionStorage.idcard === undefined ? '': sessionStorage.idcard,
		phonenum = sessionStorage.phonenum === undefined ? '': sessionStorage.phonenum,
		skukey = sessionStorage.skukey === undefined ? '': sessionStorage.skukey,
		address = sessionStorage.address === undefined ? '': sessionStorage.address,
		prizeVcode = sessionStorage.prizeVcode === undefined ? '': sessionStorage.prizeVcode,//具体码
		grandPrizeType = sessionStorage.grandPrizeType === undefined ? '': sessionStorage.grandPrizeType;//特等奖类别

	var dom_input = document.getElementsByTagName('input'),
		dom_name = document.getElementById('name'),
		dom_idcard = document.getElementById('idcard'),
		dom_address = document.getElementById('address'),
		dom_addressBox = document.getElementsByClassName('address')[0],
		dom_bg = document.getElementsByClassName('bg')[0],
		dom_tel = document.getElementById('tel'),
		dom_code = document.getElementsByClassName('code')[0],
		dom_get = document.getElementsByClassName('get')[0],
		dom_notice = document.getElementsByClassName('notice')[0],
		dom_tip = document.getElementsByClassName('tip')[0],
		dom_btn = document.getElementsByClassName('btn')[0],
		dom_yzcode = document.getElementsByClassName('yzcode')[0],
		dom_telBox = document.getElementsByClassName('tel')[0],
		dom_explain = document.getElementsByClassName('explain')[0],
		dom_rule = document.getElementsByClassName('rule')[0];

	if(grandPrizeType == 1){//二等奖
		dom_bg.src = 'http://'+vge.hljqp_host +'/v/hljqp/img/prize2-bg.png';
		dom_tip.src = 'http://'+vge.hljqp_host +'/v/hljqp/img/prize_tip2.png';
		dom_addressBox.style.display = 'none';
	}else{
		dom_bg.src = 'http://'+vge.hljqp_host +'/v/hljqp/img/prize-bg.png';
		dom_tip.src = 'http://'+vge.hljqp_host +'/v/hljqp/img/prize_tip.png';
	}
	if(idcard != '' && phonenum !='' && username !=''){//已经填写过信息
		dom_name.value = username;
		dom_idcard.value = idcard;
		dom_tel.value = phonenum;
		dom_address.value = address;
		dom_name.readOnly = true;
		dom_idcard.readOnly = true;
		dom_tel.readOnly = true;
		dom_address.readOnly = true;
		dom_btn.disabled = true;
		dom_get.disabled = true;
		dom_code.disabled = true;
		dom_yzcode.style.display = 'none';
		dom_btn.value = '提交成功';
	    dom_btn.style.color = '#ea5244';
	    dom_btn.style.backgroundColor = '#ffdc45';
	    dom_telBox.style.borderBottom = '1px solid #b0ac9d';
	    dom_notice.innerHTML = '温馨提示：您的信息已提交成功，请耐心等待主办方与您联系';
	}

	dom_get.addEventListener('click',getYzcode,false);

	function getCheckCode(cb) { // 获取手机验证码
		_hmt.push(['_trackEvent', 'click', '获取验证码', 'prize']);
		var javai = vge.hljqp + '/DBTHLJQPInterface/user/getCaptcha';
		var req = {
			"phonenum":dom_tel.value
		};
		vge.callJApi(javai, req, function(jo) {
			if (jo.result.code=='0') {
	            if( jo.result.businessCode=='0') {
					cb();//成功，开始倒计时
				} else if(jo.result.businessCode==='2') {
					title_tip('尊敬的用户','您填写的手机号错误，发送验证码失败！','我知道了');
				} else{//1 为服务器报错
					title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
				}
			} else{//code!='0'
				title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
			}
		});
	}

	function getYzcode(){
        if (dom_name.value===''||dom_name.value.indexOf(' ')!==-1) {
			title_tip('提 示','请输入正确的姓名哦！~','我知道了');
		} else if(!reg1.test(dom_tel.value)){
			title_tip('提 示','请填写正确的手机号！~','我知道了');
		} else {
			if(grandPrizeType == 0){//一等奖
				if(dom_address.value == ''){
					title_tip('提 示','请填写正确的地址！~','我知道了');
				}else{
					if (dom_get.value==='获取验证码'||dom_get.value==='重新获取') {
            		    getCheckCode(function(){
            		       countdown(dom_get, 60);
            		   	});
            		}else{
            			dom_get.removeEventListener('click',getYzcode,false);
            		}
				}
			}else{//二等奖
				if (dom_get.value==='获取验证码'||dom_get.value==='重新获取') {
            	    getCheckCode(function(){
            	       countdown(dom_get, 60);
            	   	});
            	}else{
            		dom_get.removeEventListener('click',getYzcode,false);
            	}
			}
		}
    }

	function countdown(tag, time){
     	var i = time;
		tag.value = i+'秒';
        countdowntimer = setInterval(function() {
			i--;
			tag.value = i+'秒';
			if (i === 0) {
				tag.value = '重新获取';
				i=time;
				clearInterval(countdowntimer); // 清除定时器
				dom_get.addEventListener("click",getYzcode,false);//恢复点击事件
            	countdowntimer=null;
			}
		}, 1000);
   	}

   	

   	function send(){
   		if (dom_name.value===''||dom_name.value.indexOf(' ')!==-1) {
			title_tip('提 示','请输入正确的姓名哦！~','我知道了');
		} else if(!reg1.test(dom_tel.value)){
			title_tip('提 示','请填写正确的手机号！~','我知道了');
		} else {
			if(grandPrizeType == 0){//一等奖
				if(dom_address.value == ''){
					title_tip('提 示','请填写正确的地址！~','我知道了');
				}else{
					sub_message();
				}
			}else{//二等奖
				sub_message();
			}
		}
   	}

   	function sub_message () { // 提交注册信息
   		_hmt.push(['_trackEvent', 'click', '提交个人信息', 'prize']);
   		var javai = vge.hljqp + '/DBTHLJQPInterface/user/savePrize';
		var req = {
			"openid":openid,
			"unionid":unionid,
			"username":dom_name.value,
			"idcard":'000000',
			"skukey":skukey,
			"phonenum":dom_tel.value,
			"address":dom_address.value = dom_address.value === '' ? '': dom_address.value,
			"grandPrizeType":grandPrizeType,
			"prizeVcode":prizeVcode,
			"captcha":dom_code.value
		};
		vge.callJApi(javai, req, function(jo) {
			if (jo.result.code==='0') {
	            if( jo.result.businessCode==='0') {
	            		dom_notice.innerHTML = '温馨提示：您的信息已提交成功，请耐心等待主办方与您联系';
	            		dom_btn.value = '提交成功';
	            		dom_btn.style.color = '#ea5244';
	            		dom_btn.style.backgroundColor = '#ffdc45';
	            		dom_btn.disabled = true;
	            		dom_get.disabled = true;
	            		dom_yzcode.style.display = 'none';
	            		dom_telBox.style.borderBottom = '1px solid #b0ac9d';
	            		for(var i=0;i<dom_input.length-2;i++){
	            			dom_input[i].readOnly = true;
	            		}
					} else if( jo.result.businessCode=='1'){//1
						title_tip('提 示','验证码已失效','我知道了');
					} else if( jo.result.businessCode=='2'){//2
						title_tip('提 示','您填写的验证码有误','我知道了');
					} else if(jo.result.businessCode=='-1'){
						title_tip('提 示','系统升级中...','我知道了');
					} else if(jo.result.businessCode=='4'){
						title_tip('提 示','兑奖截止时间已过期','我知道了');
					} else {
						title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
					}
			} else{//code!='0'
				title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
			}
		});
   	}

   	for(var i=0;i<dom_input.length-2;i++){
		dom_input[i].addEventListener('input',function(){
			if(grandPrizeType == 0){
				if(!dom_name.value==''&&!dom_address.value==''&&!dom_address.value.indexOf(' ')!==-1&&!dom_name.value.indexOf(' ')!==-1&&reg1.test(dom_tel.value)&&reg3.test(dom_code.value)){
	            	dom_btn.style.color = '#ea5244';
	            	dom_btn.style.backgroundColor = '#ffdc45';
	            	dom_btn.addEventListener('click',send,false);
				}else{
					dom_btn.style.color = '#db938c';
	            	dom_btn.style.backgroundColor = '#ffe782';
	            	dom_btn.removeEventListener('click',send,false);
				}
			}else{
				if(!dom_name.value==''&&!dom_name.value.indexOf(' ')!==-1&&reg1.test(dom_tel.value)&&reg3.test(dom_code.value)){
	            	dom_btn.style.color = '#ea5244';
	            	dom_btn.style.backgroundColor = '#ffdc45';
	            	dom_btn.addEventListener('click',send,false);
				}else{
					dom_btn.style.color = '#db938c';
	            	dom_btn.style.backgroundColor = '#ffe782';
	            	dom_btn.removeEventListener('click',send,false);
				}
			}
		},false);
	}

   	dom_explain.addEventListener('click',function(){
   		_hmt.push(['_trackEvent', 'click', '查看隐私说明', 'prize']);
		location.href="http://mp.weixin.qq.com/s/3uWS_EuePMNDp50XPqC0qg";
	},false);

	dom_rule.addEventListener('click',function(){
		_hmt.push(['_trackEvent', 'click', '查看活动规则', 'prize']);
		location.href= "http://mp.weixin.qq.com/s/t1EDivvtuxE4hlTjDrcJkg";
	},false);