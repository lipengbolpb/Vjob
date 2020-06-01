(function(){
	'use strict';
	var openid = sessionStorage.openid === undefined ? '' : sessionStorage.openid,
		username = sessionStorage.username === undefined ? '' : sessionStorage.username,
		idcard = sessionStorage.idcard === undefined ? '' : sessionStorage.idcard,
		phonenum = sessionStorage.phonenum === undefined ? '' : sessionStorage.phonenum,
		address = sessionStorage.address === undefined ? '' : sessionStorage.address,
		prizeVcode = sessionStorage.prizeVcode === undefined ? '' : sessionStorage.prizeVcode, //具体码
		grandPrizeType = sessionStorage.grandPrizeType === undefined ? '' : sessionStorage.grandPrizeType; //特等奖类别
	var args = vge.urlparse(location.href),
		bizcode = args.bizcode;
	
	if(bizcode == 15){
		$('#dj,#tip').css('visibility','hidden');
		$('#tip_1').html('被扫时间:'+sessionStorage.earnTime);
		$('.check').css('display','block');
		$('body').css({'overflow':'hidden','width':'100%','height':'100%'});
		$('html').css({'overflow':'hidden','width':'100%','height':'100%'});
	}
	
	if(sessionStorage.grandPrizeType=='1'){ //金球奖
		$('.prize').attr('src','/v/jlqp-laoshanShouti/img/prize_1.png');
		$('.pic_tip').attr('src','/v/jlqp-laoshanShouti/img/border_1.png?v=2');
		$('.address_box').css('display','block');
	}
	
	var reg1=/^1[0-9]{10}$/,
		reg2=/^[1-9][0-9xX]{17}$/,
		reg3=/^[0-9]{4}$/;
	
	var first = sessionStorage.first === undefined?false:true;
	var get_yz = document.getElementById("get_yz");
	var countdowntimer = null;
	
	
	$('#rule').on('click',function(){
		location.replace("https://mp.weixin.qq.com/s?__biz=MzUxNDg5OTU3Nw==&mid=100000783&idx=1&sn=ca65f43cfca7d5491939aebc27cd37ad&chksm=79bfaf194ec8260f5fedf965fffa15bbd76b2492378510fa4d51a00489220140bc603b953ee2#rd");
	});
	
	$('#private').on('click',function(){
		location.replace("https://mp.weixin.qq.com/s?__biz=MzUxNDg5OTU3Nw==&mid=100000013&idx=1&sn=c13347acba4ea2ed7255cb68b3ad58be&chksm=79bfaa1b4ec8230dfda68ca4f1d7d0579383adab04f1fb731e85ade7880cb78db151ac6ffc96#rd");
	});
	
	// 已经填写过

	if(idcard != '' && phonenum != '' && username != '' && address != '') { //已经填写过信息
		$('#user').val(username);
		$('#id').val(idcard);
		$('#address').val(address);
		$('#tel').val(phonenum);
		$('#user').attr('readonly',true);
		$('#id').attr('readonly',true);
		$('#address').attr('readonly',true);
		$('#tel').attr('readonly',true);
		$('#btn').attr('disabled', true);
		$('#btn').css({'background': 'url(/v/jlqp-laoshanShouti/img/button_success.png) no-repeat center','-webkit-background-size': 'auto 100%'});
		$('.yz_box').css('display','none');
		$('#btn').val('提交成功');
		$('.tip').html('温馨提示：您的信息已提交成功，请耐心等待主办方与您联系');
		first = true;
		return;
	} 


	// if (sessionStorage.username!==''&&sessionStorage.idcard!==''&&sessionStorage.address!==''&&sessionStorage.phonenum!=='') {
	// 	$('#user').val(username);
	// 	$('#id').val(idcard);
	// 	$('#address').val(address);
	// 	$('#tel').val(phonenum);
	// 	alert(username);
	// 	$('#user').attr('readonly',true);
	// 	$('#id').attr('readonly',true);
	// 	$('#address').attr('readonly',true);
	// 	$('#tel').attr('readonly',true);
	// 	$('.yz_box').css('display','none');
	// 	$('#btn').css({'background': 'url(/v/jlqp-laoshanShouti/img/button_success.png) no-repeat center','-webkit-background-size': 'auto 100%'});
	// 	$('.tip').html('温馨提示：您的信息已提交成功，请耐心等待主办方与您联系');
	// 	first = true;
	// 	return;
	// }
	
	 // idcard 验证
	 function getIdcardValidateCode(idds) {
		var weight = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
		  validate = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
		var sum = 0,
		  mod = 0,
		  ymd = [];
		for (var i = 0; i < 17; ++i) {
		  sum += parseInt(idds[i], 10) * weight[i];
		  if (i > 5 && i < 14) ymd.push(idds[i]);
		}
		mod = sum % 11;
		return validate[mod] === idds[17].toUpperCase();
	};
	
	
	get_yz.addEventListener('click',getYzcode,false);

	$('#btn').on('click', function() {
		if(first) return;
		send();
	});
	
	// $('#btn').on('click',dot);
	// function dot(){
	// 	if(first) return;
	// 	if ($('#user').val()===''||$('#user').val().indexOf(' ')!==-1) {
	// 		title_tip('提 示','请输入正确的姓名哦！~','我知道了');
	// 	} else if(!getIdcardValidateCode($('#id').val()) || !reg2.test($('#id').val())) {
	// 		title_tip('提 示', '请填写正确的身份证号！~', '我知道了');
	// 	} else if($('#address').val() === '' || $('#address').val().indexOf(' ') !== -1) {
	// 		title_tip('提 示', '请填写正确的收获地址！~', '我知道了');
	// 	} else if(!reg1.test($('#tel').val())){
	// 		title_tip('提 示','请填写正确的手机号！~','我知道了');
	// 	} else if(!reg3.test($('#yzcode').val())){
	// 		title_tip('提 示','请填写正确的验证码！~','我知道了');
	// 	} else {
	// 		if(sessionStorage.grandPrizeType=='1'){
	// 			$('#btn').unbind();
	// 			setTimeout(function(){
	// 				$('#btn').on('click',dot);
	// 			},1000);
	// 			$('#loading').css('display','block');
	// 			sub_message ();
	// 		}else{
	// 			$('#btn').unbind();
	// 			setTimeout(function(){
	// 				$('#btn').on('click',dot);
	// 			},1000);
	// 			$('#loading').css('display','block');
	// 			sub_message ();
	// 		}
	// 	}
	// }
	
	function getCheckCode(cb) { // 获取手机验证码
		var javai = vge.jlqp + '/DBTJLQPInterface/user/getCaptcha';
		var req = {
			"phonenum":$('#tel').val(),
			"sendtype":"0"
		};
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
						get_yz.addEventListener("click",getYzcode,false);//恢复计时器
						title_tip('尊敬的用户','您填写的手机号错误，发送验证码失败！','我知道了');
					} else{
						get_yz.addEventListener("click",getYzcode,false);//恢复计时器
						title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
					}
				} else{//code!='0'
					get_yz.addEventListener("click",getYzcode,false);//恢复计时器
					title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
				}
			}
		});
	}

	
    function getYzcode(){
        if ($('#user').val()==''||$('#user').val().indexOf(' ')!=-1) {
			title_tip('提 示','请输入正确的姓名哦！~','我知道了');
		} else if($('#id').val() === '' || $('#id').val().indexOf(' ') !== -1 || !getIdcardValidateCode($('#id').val()) ||!reg2.test($('#id').val())) {
			title_tip('提 示', '请填写正确的身份证号！~', '我知道了');
		} else if($('#address').val() === '' || $('#address').val().indexOf(' ') !== -1) {
			title_tip('提 示', '请填写正确的收获地址！~', '我知道了');
		} else if(!reg1.test($('#tel').val())){
			title_tip('提 示','请填写正确的手机号！~','我知道了');
		} else {
			if (get_yz.innerHTML=='获取验证码') {
				get_yz.removeEventListener('click',getYzcode,false);
                getCheckCode(function(){
                   countdown(get_yz, 60);
               	});
            }else{
            	get_yz.removeEventListener('click',getYzcode,false);
            }
		}
    }

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


	function send() {
		if($('#user').val() === '' || $('#user').val().indexOf(' ') !== -1) {
			title_tip('提 示', '请输入正确的姓名哦！~', '我知道了');
		} else if($('#id').val() === '' || $('#id').val().indexOf(' ') !== -1 || !getIdcardValidateCode($('#id').val()) || !reg2.test($('#id').val())) {
			title_tip('提 示', '请填写正确的身份证号！~', '我知道了');
		} else if($('#address').val() === '' || $('#address').val().indexOf(' ') !== -1) {
			title_tip('提 示', '请填写正确的收获地址！~', '我知道了');
		} else if(!reg1.test($('#tel').val())) {
			title_tip('提 示', '请填写正确的手机号！~', '我知道了');
		} else if(!reg3.test($('#yzcode').val())) {
			title_tip('提 示', '请填写正确的验证码！~', '我知道了');
		} else {
			if(openid==''||openid=='undefined'||prizeVcode==''||prizeVcode=='undefined'){
				title_tip('提 示', '信息缺失，无法提交信息！', '我知道了');
			}else{
				sub_message();
			}
		}
	}
    
   	function sub_message () { // 提交信息
   		var javai = vge.jlqp + '/DBTJLQPInterface/user/savePrize';
		var req = {
			"openid":sessionStorage.openid,
			// "idcard":'00000',
			// "idcard":$('#id').val()===''?'00000':$('#id').val(),
			// "address":$('#address').val()===''?'address':$('#address').val(),
			"username":$('#user').val(),
			"idcard":$('#id').val(),
			"address":$('#address').val(),
			"phonenum":$('#tel').val(),
			"captcha":$('#yzcode').val(),
			"grandPrizeType":sessionStorage.grandPrizeType===undefined?'':sessionStorage.grandPrizeType,
			"prizeVcode":sessionStorage.prizeVcode===undefined?'':sessionStorage.prizeVcode
		};
		vge.callJApi(javai, req, function(jo) {
			$('#loading').css('display','none');
			if (jo.result.code==='0') {
	            if( jo.result.businessCode==='0') {
	            		sessionStorage.first='first';
	            		sessionStorage.username = $('#user').val();
						// sessionStorage.idcard = '00000';
						sessionStorage.idcard = $('#id').val();		
	            		sessionStorage.address = $('#address').val();										
	            		sessionStorage.phonenum = $('#tel').val();
	            		$('.tip').html('温馨提示：您的信息已提交成功，请耐心等待主办方与您联系');
						$('#btn').css({'background': 'url(/v/jlqp-laoshanShouti/img/button_success.png) no-repeat center','-webkit-background-size': 'auto 100%'});            		
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
