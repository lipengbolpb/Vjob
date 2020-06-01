(function(){
	'use strict';
	var grandPrizeType = sessionStorage.grandPrizeType===undefined?'':sessionStorage.grandPrizeType;
	
	var args = vge.urlparse(location.href),
		bizcode = args.bizcode;
	
	if(bizcode == 15){
		$('#dj,#tip').css('visibility','hidden');
		$('#tip_1').html('被扫时间:'+sessionStorage.earnTime);
		$('.check').css('display','block');
		$('body').css({'overflow':'hidden','width':'100%','height':'100%'});
		$('html').css({'overflow':'hidden','width':'100%','height':'100%'});
	}
	
	if(sessionStorage.grandPrizeType=='0'){
		$('.prize').attr('src','/v/hljqp20170705/img/prize.png');
		$('.pic_tip').attr('src','/v/hljqp20170705/img/border_1.png?v=2');
		$('.address_box').css('display','block');
	}
	
	var reg1=/^1[0-9]{10}$/,
		reg2=/^[1-9][0-9xX]{17}$/,
		reg3=/^[0-9]{4}$/;
	
	var first = sessionStorage.first === undefined?false:true;
	var get_yz = document.getElementById("get_yz");
	var countdowntimer = null;
	
	
	$('#rule').on('click',function(){
		location.replace("https://mp.weixin.qq.com/s?__biz=MzI1MDYxNzkzOA==&mid=100000023&idx=1&sn=fd26446b0dca5a8adf514b3f1104d12e&chksm=69fec82a5e89413ca9d69b59d146a7ef2d98d6eae16901bc570fe328d00e6d31936e5eb28eae#rd");
	});
	
	$('#private').on('click',function(){
		location.replace("https://mp.weixin.qq.com/s?__biz=MzI1MDYxNzkzOA==&mid=100000020&idx=1&sn=c088601ede82745de557d8badb76fc52&chksm=69fec8295e89413f909598de376958b771f22e2a9e356c3654f9ee393511432a424355125fa2#rd");
	});
	
	// 已经填写过
	if (sessionStorage.username!=''&&sessionStorage.idcard!=''&&sessionStorage.phonenum!='') {
		$('#user').val(sessionStorage.username);
		$('#id').val(sessionStorage.idcard);
		$('#tel').val(sessionStorage.phonenum);
		$('#user').attr('readonly','readonly');
		$('#id').attr('readonly','readonly');
		$('#tel').attr('readonly','readonly');
		$('.yz_box').css('display','none');
		$('#btn').html('提交成功！');
		$('.tip').html('温馨提示：您的信息已提交成功，请耐心等待主办方与您联系');
		first = true;
		return;
	}
	
	get_yz.addEventListener('click',getYzcode,false);
	
	$('#btn').on('click',function(){
		if(first) return;
		if ($('#user').val()===''||$('#user').val().indexOf(' ')!==-1) {
			title_tip('提 示','请输入正确的姓名哦！~','我知道了');
		} else if(!reg1.test($('#tel').val())){
			title_tip('提 示','请填写正确的手机号！~','我知道了');
		} else if(!reg3.test($('#yzcode').val())){
			title_tip('提 示','请填写正确的验证码！~','我知道了');
		} else {
			if(sessionStorage.grandPrizeType=='0'){
				if($('#address').val()==''){
					title_tip('提 示','请填写详细地址！~','我知道了');
				}else{
					sub_message ();
				}
			}else{
				sub_message ();
			}
		}
	});
	
	function countdown(tag, time){
     	var i = time;
		tag.innerHTML = i+'秒';
        countdowntimer = setInterval(function() {
			i--;
			tag.innerHTML = i+'秒';
			if (i <= 0) {
				tag.innerHTML = '获取验证码';
				clearInterval(countdowntimer); // 清除定时器
				get_yz.addEventListener("click",getYzcode,false);//恢复计时器
           		countdowntimer=null;
			}
		}, 1000);
   	}
    
    function getYzcode(){
        if ($('#user').val()==''||$('#user').val().indexOf(' ')!=-1) {
			title_tip('提 示','请输入正确的姓名哦！~','我知道了');
		} else if(!reg1.test($('#tel').val())){
			title_tip('提 示','请填写正确的手机号！~','我知道了');
		} else {
			if (get_yz.innerHTML=='获取验证码') {
                getCheckCode(function(){
                   countdown(get_yz, 60);
               	});
            }else{
            	get_yz.removeEventListener('click',getYzcode,false);
            }
		}
    }
	
	function getCheckCode(cb) { // 获取手机验证码
		var javai = vge.hljqp + '/DBTHLJQPInterface/user/getCaptcha';
		var req = {
			"phonenum":$('#tel').val(),
			"sendtype":"0"
		};
//		vge.callJApi(javai, req, function(jo) {
//			if (jo.result.code=='0') {
//	            if( jo.result.businessCode=='0') {
//					//成功，开始倒计时
//					cb();
//				} else if(jo.result.businessCode==='2') {//1
//					title_tip('尊敬的用户','您填写的手机号错误，发送验证码失败！','我知道了');
//				} else{
//					title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
//				}
//			} else{//code!='0'
//				title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
//			}
//		});
		$.ajax({
			type:"post",
			url:javai,
			async:true,
			data:JSON.stringify(req),
			success:function(jo){
				if (jo.result.code=='0') {
		            if( jo.result.businessCode=='0') {
						//成功，开始倒计时
						cb();
					} else if(jo.result.businessCode==='2') {//1
						title_tip('尊敬的用户','您填写的手机号错误，发送验证码失败！','我知道了');
					} else{
						title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
					}
				} else{//code!='0'
					title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
				}
			}
		});
	}
    
   	function sub_message () { // 提交信息
   		var javai = vge.hljqp + '/DBTHLJQPInterface/user/savePrize';
		var req = {
			"openid":sessionStorage.openid,
			"username":$('#user').val(),
			"idcard":'00000',
			"phonenum":$('#tel').val(),
			"captcha":$('#yzcode').val(),
			"address":$('#address').val()===''?'address':$('#address').val(),
			"grandPrizeType":sessionStorage.grandPrizeType===undefined?'':sessionStorage.grandPrizeType,
			"prizeVcode":sessionStorage.prizeVcode===undefined?'':sessionStorage.prizeVcode
		};
		vge.callJApi(javai, req, function(jo) {
			if (jo.result.code==='0') {
	            if( jo.result.businessCode==='0') {
	            		sessionStorage.first='first';
	            		sessionStorage.username = $('#user').val();
	            		sessionStorage.idcard = '00000';
	            		sessionStorage.phonenum = $('#tel').val();
	            		$('.tip').html('温馨提示：您的信息已提交成功，请耐心等待主办方与您联系');
						$('#btn').html('提交成功！');	            		
	            		title_tip('提 示','您的信息已提交成功，<br />请耐心等待主办方与您联系','我知道了',undefined,reload);
					} else if( jo.result.businessCode=='1'){//1
						title_tip('提 示','验证码已失效','我知道了');
					} else if( jo.result.businessCode=='2'){//2
						title_tip('提 示','您填写的验证码有误','我知道了');
					} else if( jo.result.businessCode=='-1'){//-1
						title_tip('提 示','系统升级中...','我知道了');
					} else if(jo.result.businessCode=='4'){
						title_tip('提 示','兑奖截止时间已过期','我知道了');
					}else{
						title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
					}
			} else{//code!='0'
				title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
			}
		});
   	}
	
	function reload(){
		location.reload();
	}
	
})();
