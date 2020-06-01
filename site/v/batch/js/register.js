(function() {
	'use strict';
//	ini_wxshare(vge.batchappid);
	
	var args = vge.urlparse(location.href),
		areacfg = '',
		secretKey = args.s,
		ar = '',
		ename = '',
		serverName = args.serverName,
		openid = args.openid;
		
	var get_yz = document.getElementById("get_yz");
	var countdowntimer = null;
	var reg1=/^1[0-9]{10}$/,
		reg2=/^[1-9][0-9xX]{17}$/,
		reg3=/^[0-9]{4}$/;
	
	queryFactory();
	
	function queryFactory() {
		var javai = vge.batch + '/DBTMainEntStats/batchActivate/queryActivateRange.do';
		var req = {
			"openid": openid,
			"secretKey": secretKey,
			"queryFlag": "1"
		};
		$.ajax({
			type: "post",
			url: javai,
			data: req,
			success: function(jo) {
				jo = JSON.parse(jo);
				if(jo.result.code == '0') {
					if(jo.result.businessCode == '0') {
						if(jo.reply.factoryNameGroup.split(',').length==1){
							$('select').append('<option value="' + jo.reply.factoryNameGroup.split(',')[0] + '" selected>' + jo.reply.factoryNameGroup.split(',')[0] + '</option>');
							sessionStorage.area = jo.reply.factoryNameGroup.split(',')[0];
							$('select').attr('disabled','disabled');
							$('#name').val(jo.reply.userName==undefined?'':jo.reply.userName);
							$('#tel').val(jo.reply.phoneNum==undefined?'':jo.reply.phoneNum);
						}else{
							for(var i in jo.reply.factoryNameGroup.split(',')) {
								if(jo.reply.factoryNameGroup.split(',')[i]==jo.reply.factoryName){
									$('select').append('<option value="' + jo.reply.factoryNameGroup.split(',')[i] + '" selected>' + jo.reply.factoryNameGroup.split(',')[i] + '</option>');
									sessionStorage.area = jo.reply.factoryNameGroup.split(',')[i];
									$('#name').val(jo.reply.userName==undefined?'':jo.reply.userName);
									$('#tel').val(jo.reply.phoneNum==undefined?'':jo.reply.phoneNum);
								}else{
									$('select').append('<option value="' + jo.reply.factoryNameGroup.split(',')[i] + '">' + jo.reply.factoryNameGroup.split(',')[i] + '</option>');
								}
							}
						}
						$('select').change(function() {
							$('select option').each(function() {
								if($(this).is(":checked")) {
									sessionStorage.area = $(this).val();
								}
							})

						});
					} else {
						alertTip('尊敬的用户', jo.result.msg, '我知道了');
					}
				} else { //code!='0'
					alertTip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				}
			}
		});

	}

	function countdown(tag, time) {
		var i = time;
		tag.innerHTML = i + '秒';
		countdowntimer = setInterval(function() {
			i--;
			tag.innerHTML = i + '秒';
			if(i === 0) {
				tag.innerHTML = '获取验证码';
				i = 60;
				clearInterval(countdowntimer); // 清除定时器
				get_yz.addEventListener("click", getYzcode, false); //恢复计时器
				countdowntimer = null;
			}
		}, 1000);
	}
	get_yz.addEventListener('click', getYzcode, false);

	function getYzcode() {
		get_yz.removeEventListener('click', getYzcode, false);
		if(!reg1.test($('#tel').val())) {
			alertTip('提 示', '请填写正确的手机号！~', '我知道了');
			get_yz.addEventListener('click', getYzcode, false);
		} else {
			checkPhoneIsRegister();
		}
	}
	
	
	function checkPhoneIsRegister(){
		var javai = vge.batch + '/DBTMainEntStats/batchActivate/checkPhoneIsRegister.do';
		var req = {
			"phoneNum": $('#tel').val(),
			"openid": openid
		};
		$.ajax({
			type:"post",
			url:javai,
			data:req,
			async:true,
			success:function(jo){
				jo = JSON.parse(jo);
				if(jo.result.code == '0') {
					if(jo.result.businessCode == '0') {//发送验证码
						if(get_yz.innerHTML === '获取验证码') {
							getCheckCode(function() {
								countdown(get_yz, 60);
							});
						} else {
							get_yz.removeEventListener('click', getYzcode, false);
						}
					} else {
						alertTip('尊敬的用户', jo.result.msg, '我知道了');
						get_yz.addEventListener('click', getYzcode, false);
					}
				} else { //code!='0'
					get_yz.addEventListener('click', getYzcode, false);
				}
			},
			error:function(data){
				console.log(data);
			}
		});
	}
	
	function getCheckCode(cb) { // 获取手机验证码
		var javai = vge.batch + '/DBTMainEntStats/sysUser/getCaptcha.do';
		var req = {
			"phonenum": $('#tel').val(),
			"sendtype": 1
		};
		$.ajax({
			type:"post",
			url:javai,
			data:req,
			async:true,
			success:function(jo){
				jo = JSON.parse(jo);
				if(jo.result.code == '0') {
					if(jo.result.businessCode == '0') {
						//成功，开始倒计时
						cb();
					} else if(jo.result.businessCode === '2') { //1
						alertTip('尊敬的用户', '您填写的手机号错误，发送验证码失败！', '我知道了');
						get_yz.addEventListener('click', getYzcode, false);
					} else if(jo.result.businessCode === '3') { //1
						alertTip('尊敬的用户', '您填写的手机号已被注册！', '我知道了');
						get_yz.addEventListener('click', getYzcode, false);
					} else {
						alertTip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
						get_yz.addEventListener('click', getYzcode, false);
					}
				} else { //code!='0'
					alertTip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
					get_yz.addEventListener('click', getYzcode, false);
				}
			},
			error:function(data){
				console.log(data);
			}
		});
	}
	
	$('#btn').on('click',dot);
	
	function dot(){
		$('#btn').unbind();
		setTimeout(function(){
			$('#btn').on('click',dot);
		},1000);
		if(sessionStorage.area===''){
			alertTip('尊敬的用户', '请选择所属工厂', '我知道了');
		}else if($('#name').val()===''||$('#name').val().indexOf(' ')!==-1){
			alertTip('尊敬的用户', '请填写正确的姓名', '我知道了');
		}else if(!reg1.test($('#tel').val())){
			alertTip('尊敬的用户', '请填写正确的手机号', '我知道了');
		}else if(!reg3.test($('#yz_code').val())){
			alertTip('尊敬的用户', '请填写正确的验证码', '我知道了');
		}else{
			addActivateUser();
		}
	}
	
	function addActivateUser() {
		var javai = vge.batch + '/DBTMainEntStats/batchActivate/addActivateUser.do';
		var req = {
			"openid": openid,
			"userName": $('#name').val(),
			"phoneNum": $('#tel').val(),
			"captcha": $('#yz_code').val(),
			"factoryName": sessionStorage.area,
			"serverName": serverName
		};
		$.ajax({
			type:"post",
			url:javai,
			async:true,
			data:req,
			success:function(jo){
				jo = JSON.parse(jo);
				if(jo.result.code == '0') {
					if(jo.result.businessCode == '0') {
						alertTip('注册信息', jo.result.msg, '我知道了',close);
					} else if(jo.result.businessCode === '2') { //1
						alertTip('注册信息', jo.result.msg, '我知道了');
					} else if(jo.result.businessCode === '3') { //1
						alertTip('注册信息', jo.result.msg, '我知道了');
					} else {
						alertTip('注册信息', jo.result.msg, '我知道了');
					}
				} else { //code!='0'
					alertTip('注册信息', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				}
			},
			error :function(){
				
			}
		});
	}
	
	function close(){
		wx.closeWindow();
	}
	
})();