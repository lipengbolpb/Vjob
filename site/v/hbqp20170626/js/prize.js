'use strict';

	var reg1=/^1[0-9]{10}$/,//验证手机号
		reg2=/^[1-9][0-9xX]{17}$/,//验证身份证号
		reg3=/^[0-9]{4}$/;

	var args = vge.urlparse(location.href),
		bizcode = args.bizcode;

	var countdowntimer = null;//定时器

	var openid = sessionStorage.openid === undefined ? '': sessionStorage.openid,
		unionid = sessionStorage.unionid === undefined ? '': sessionStorage.unionid,
		username = sessionStorage.username === undefined ? '': sessionStorage.username,
		phonenum = sessionStorage.phonenum === undefined ? '': sessionStorage.phonenum,
		skukey = sessionStorage.skukey === undefined ? '': sessionStorage.skukey,
		idcard = sessionStorage.idcard === undefined ? '': sessionStorage.idcard,
		prizeVcode = sessionStorage.prizeVcode === undefined ? '': sessionStorage.prizeVcode,//具体码
		grandPrizeType = sessionStorage.grandPrizeType === undefined ? '': sessionStorage.grandPrizeType,//特等奖类别
		earnTime = sessionStorage.earnTime === undefined ? '': sessionStorage.earnTime;//大奖核对时间

	var dom_cash = document.getElementById('cash'),
		dom_info = document.getElementById('info'),
		dom_getted = document.getElementById('getted'),
		dom_earntime = document.getElementById('earntime'),
		dom_getbtn = document.getElementById('getbtn'),
		dom_name = document.getElementById('name'),
		dom_card = document.getElementById('card'),
		dom_tel = document.getElementById('tel'),
		dom_code = document.getElementById('code'),
		dom_getcode = document.getElementById('getcode'),
		dom_btn = document.getElementById('btn'),
		dom_msg = document.getElementsByClassName('msg')[0],
		dom_point = document.getElementsByClassName('point')[0],
		dom_mask = document.getElementsByClassName('mask')[0],
		dom_close = document.getElementsByClassName('close')[0],
		dom_ck = document.getElementsByClassName('ck')[0],
		dom_rule =document.getElementById('rule'),
		dom_explain = document.getElementById('explain');

	if(bizcode == '15'){//大奖核销
		dom_getted.style.display = 'block';
		dom_earntime.innerHTML = earnTime;
	}else if(bizcode == '7'){
		dom_cash.style.display = 'block';
	}

	if(phonenum !='' && username !=''){//已经填写过信息
		dom_cash.style.display = 'none';
		dom_info.style.display = 'block';
		dom_name.value = username;
		dom_tel.value = phonenum;
		dom_card.value = idcard;
		dom_name.readOnly = true;
		dom_tel.readOnly = true;
		dom_card.readOnly = true;
		dom_btn.disabled = true;
		dom_getcode.disabled = true;
		dom_code.disabled = true;
		dom_code.style.display = 'none';
		dom_getcode.style.display = 'none';
		dom_msg.style.height = '185px';
		dom_btn.value = '提交成功';
	    dom_point.innerHTML = '温馨提示：您的信息已提交成功，请耐心等待主办方与您联系';
	}

	dom_getbtn.addEventListener('click',function(){
		dom_cash.style.display = 'none';
		dom_info.style.display = 'block';
	},false);

	dom_btn.addEventListener('click',send,false);
	
	dom_getcode.addEventListener('click',getYzcode,false);

	function getYzcode(){
        if (dom_name.value===''||dom_name.value.indexOf(' ')!==-1) {
			title_tip('提 示','请输入正确的姓名哦！~','我知道了');
		} else if(!reg1.test(dom_tel.value)){
			title_tip('提 示','请填写正确的手机号！~','我知道了');
		} else {
			if (dom_getcode.value==='获取验证码'||dom_getcode.value==='重新获取') {
                getCheckCode(function(){
                   countdown(dom_getcode, 60);
               	});
            }else{
            	dom_getcode.removeEventListener('click',getYzcode,false);
            }
    	}
    }

	function getCheckCode(cb) { // 获取手机验证码
		var javai = vge.hbqp + '/DBTHBQPInterface/user/getCaptcha';
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
				dom_getcode.addEventListener("click",getYzcode,false);//恢复点击事件
            	countdowntimer=null;
			}
		}, 1000);
   	}

   	function send(){
   		if (dom_name.value===''||dom_name.value.indexOf(' ')!==-1) {
			title_tip('提 示','请输入正确的姓名哦！~','我知道了');
		} else if(!reg1.test(dom_tel.value)){
			title_tip('提 示','请填写正确的手机号！~','我知道了');
		}  else {
			sub_message();
		}
   	}

   	function sub_message () { // 提交注册信息
   		var javai = vge.hbqp + '/DBTHBQPInterface/user/savePrize';
		var req = {
			"openid":openid,
			"unionid":unionid,
			"username":dom_name.value,
			"skukey":skukey,
			"address":'address',
			"phonenum":dom_tel.value,
			"idcard":'000000',
			"grandPrizeType":grandPrizeType,
			"prizeVcode":prizeVcode,
			"captcha":dom_code.value
		};
		vge.callJApi(javai, req, function(jo) {
			if (jo.result.code==='0') {
	            if( jo.result.businessCode==='0') {
	            	sessionStorage.phonenum = dom_tel.value;
	            	sessionStorage.username = dom_name.value;
	            	sessionStorage.idcard = dom_card.value = dom_card.value === '' ? '': dom_card.value;
	            	window.location.reload();
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

   	dom_explain.addEventListener('click',function(){
		location.href = 'http://mp.weixin.qq.com/s?__biz=MzI5NjQ4MDMyNg==&mid=100000006&idx=1&sn=ccd140506a659b0e2b9d43f841d5d25f&chksm=6c42fa2f5b357339732e51b3efda6b91ebd3065f40b323d578ad8fffa68c8044664a7a6c8175#rd';
	},false);
	dom_rule.addEventListener('click',function(){
		location.href = 'http://mp.weixin.qq.com/s/zJE8pZ5hico10EgKkHmCdQ';
	},false);

	dom_ck.addEventListener('click',function(){
		dom_mask.style.display = 'block';
	},false);

	dom_close.addEventListener('click',function(){
		dom_mask.style.display = 'none';
	},false);