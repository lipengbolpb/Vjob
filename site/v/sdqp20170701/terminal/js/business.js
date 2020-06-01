(function() {
	var args = vge.urlparse(location.href),
		openid = args.openid,
		secretKey = args.secretKey;

	validAgentUser();

	var get_yz = document.getElementById("get_yz");
	var countdowntimer = null;

	var reg1 = /^1[0-9]{10}$/,
		reg2 = /^[1-9][0-9xX]{17}$/,
		reg3 = /^[0-9]{4}$/;

	$('#tj').on('click', dot);
	
	function dot() {
		$('#tj').unbind();
		if($('#tj').val()=='提交成功'){
			return;
		}
		setTimeout(function(){
			$('#tj').on('click', dot);
		},1000);
		if(!reg1.test($('#tel').val())) {
			title_tip('提 示', '请填写正确的手机号！~', '我知道了');
		} else if(!reg3.test($('#yz_code').val())) {
			title_tip('提 示', '请填写正确的验证码！~', '我知道了');
		} else if($('#user').val() == '' || $('#user').val().indexOf(' ') != -1) {
			title_tip('提 示', '请填写正确的用户名！~', '我知道了');
		} else if(sessionStorage.isUserCode=='1'){
			if($('#usercode').val().indexOf(' ')!==-1||$('#usercode').val()==''){
				title_tip('提 示', '请填写正确的业代编号！~', '我知道了');
			}else{
				addAgentUser();
			}
		} else {
			//调提交接口
			addAgentUser();
		}
	}

	function countdown(tag, time) {
		var i = time;
		tag.innerHTML = i + '秒';
		clearInterval(countdowntimer); // 清除定时器
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
		if($('#user').val() == '' || $('#user').val().indexOf(' ') != -1) {
			title_tip('提 示', '请填写正确的用户名！~', '我知道了');
		} else if(!reg1.test($('#tel').val())) {
			title_tip('提 示', '请填写正确的手机号！~', '我知道了');
		} else {
			if(get_yz.innerHTML === '获取验证码') {
				get_yz.removeEventListener('click', getYzcode, false);
				getCheckCode(function() {
					countdown(get_yz, 60);
				});
			}
		}
	}

	function getCheckCode(cb) { // 获取手机验证码
		var javai = vge.terminal + '/DBTVMTSInterface/user/getCaptcha';
		var req = {
			"phonenum": $('#tel').val(),
			"openid":openid,
			"companyKey": sessionStorage.companyKey,
			"sendtype": 2//上线之后改成2
		};
		vge.callJApi(javai, req, function(jo) {
			if(jo.result.code == '0') {
				if(jo.result.businessCode == '0') {
					//成功，开始倒计时
					cb();
				} else if(jo.result.businessCode === '2') { //1
					title_tip('尊敬的用户', '您填写的手机号错误，发送验证码失败！', '我知道了');
					get_yz.addEventListener('click', getYzcode, false);
				} else if(jo.result.businessCode === '3') { //1
					title_tip('尊敬的用户', '您填写的手机号已被注册！', '我知道了');
					get_yz.addEventListener('click', getYzcode, false);
				} else {
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
					get_yz.addEventListener('click', getYzcode, false);
				}
			} else { //code!='0'
				title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				get_yz.addEventListener('click', getYzcode, false);
			}
		});
	}

	function validAgentUser() {
		loading('身份校验中'); //调用接口
		var japi = vge.terminal + '/DBTVMTSInterface/terminal/validAgentUser';//业代
		var req = {
			"openid": openid,
			"secretKey": secretKey
		};
		vge.clog('debug', [japi, JSON.stringify(req)]);
		vge.callJApi(japi, req, cb);
	}

	function cb(jo) {
		loaded();
		if(jo.result.code == '0') {
			switch(jo.result.businessCode) {
				case '0': // 校验成功
					sessionStorage.companyKey = jo.reply.companyKey;
					sessionStorage.isUserCode = jo.reply.isUserCode;
					document.getElementById("wrap").style.display = 'block';
					if(sessionStorage.isUserCode=='1'){
						document.getElementById("usercode_box").style.display='block';
					}
					break;
				case '1':
					title_tip('尊敬的用户', jo.result.msg, '我知道了');
					break;
				case '2':
					title_tip('尊敬的用户', jo.result.msg, '我知道了');
					break;
				case '3':
					title_tip('尊敬的用户', jo.result.msg, '我知道了');
					break;
				default:
					title_tip('尊敬的用户', jo.result.msg, '我知道了');
					break;
			}
		} else if(jo.result.code == '-1') { //code !=0;
			title_tip('尊敬的用户', '系统升级中，请稍后再试！', '我知道了');
		} else {
			title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
		}
	}

	function addAgentUser() {
		var japi = vge.terminal + '/DBTVMTSInterface/terminal/addAgentUser';
		var req = {
			"openid": openid,
			"secretKey": secretKey,
			"userCode":document.getElementById("usercode").value,
			"userName": document.getElementById("user").value,
			"phoneNum": document.getElementById("tel").value,
			"captcha": document.getElementById("yz_code").value
		};
		vge.clog('debug', [japi, JSON.stringify(req)]);
		vge.callJApi(japi, req, cbk);
	}

	function cbk(jo) {
		if(jo.result.code == '0') {
			if(jo.result.businessCode == '0') {
				title_tip('尊敬的用户', '业代注册成功', '我知道了',undefined,close);
				$('#tj').val('提交成功');
			} else {
				title_tip('尊敬的用户', jo.result.msg, '我知道了');
			}
		} else if(jo.result.code == '-1') { //code !=0;
			title_tip('尊敬的用户', '系统升级中，请稍后再试！', '我知道了');
		} else {
			title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
		}
	}
	
	function close(){
		wx.closeWindow();
	}
	function loading(txt) {
		// dom_content.innerHTML += $('#tpl_toast').html();
		$('#loadingToast .weui_toast_content').html(txt);
		$('#loadingToast').show();
	}

	function loaded() {
		$('#loadingToast').hide();
	}

	function toast(txt) {
		$('#toast .weui_toast_content').html(txt);
		$('#toast').show();
		setTimeout(function() {
			$('#toast').hide();
		}, 2000);
	}

})();