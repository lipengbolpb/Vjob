(function() {

	var args = vge.urlparse(location.href),
		openid = sessionStorage.openid,
		first = false,
		bizcode = args.bizcode,
		prizeType = sessionStorage.prizeType;
	
	
	if(bizcode==15){
		$('#got .time').html('扫码时间：'+sessionStorage.earnTime);
		$('#got').css('display','block');
		$('#btn').css('visibility','hidden');
	}
	if(prizeType == 5){
		$('.prize_box').css('display','block');
	}else{
		$('.yhq_box').css('display','block');
	}
	var reg1 = /^1[0-9]{10}$/,
		reg2 = /^[1-9][0-9xX]{17}$/,
		reg3 = /^[0-9]{4}$/;

	var get_yz = document.getElementById("get_yz");
	var countdowntimer = null;
	if(sessionStorage.first) {
		first = true;
	}

	$('#btn').on('click', function() {
		$('.prize_box').fadeOut();
		$('.msg_wrap').fadeIn();
	});

//	 已经填写过
	if(sessionStorage.username!=undefined) {
		$('#name').val(sessionStorage.username);
		$('#id').val(sessionStorage.idcard);
		$('#tel').val(sessionStorage.phonenum);
		$('#name').attr('readonly', 'readonly');
		$('#id').attr('readonly', 'readonly');
		$('#tel').attr('readonly', 'readonly');
		$('.yz_box').css('display', 'none');
		$('#tj').html('提交成功！');
		first = true;
		return;
	}
	
	$('#tj').on('click', function() {
		if(first) return;
		if($('#name').val() === '' || $('#name').val().indexOf(' ') !== -1) {
			title_tip('提 示', '请输入正确的姓名哦！~', '我知道了');
		} else if(!reg2.test($('#id').val()) || !getIdcardValidateCode($('#id').val())) {
			title_tip('提 示', '请填写正确的身份证号哦！~', '我知道了');
		} else if(!reg1.test($('#tel').val())) {
			title_tip('提 示', '请填写正确的手机号！~', '我知道了');
		} else if(!reg3.test($('#yz_code').val())) {
			title_tip('提 示', '请填写正确的验证码！~', '我知道了');
		} else {
			//调提交接口
			$(this).html('<img src="/v/terminal/img/loading.gif"/>');
			$('#tj').unbind();
			sub_message();
		}
	});

	$('#lqyhq').on('click',function(){
		$('.yhq_up,span.tip,#lqyhq,.mall').css('display','none');
		$('.yhq_down').css('display','block');
	});

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
		if($('#name').val() === '' || $('#name').val().indexOf(' ') !== -1) {
			title_tip('提 示', '请输入正确的姓名哦！~', '我知道了');
		} else if(!reg2.test($('#id').val()) || !getIdcardValidateCode($('#id').val())) {
			title_tip('提 示', '请填写正确的身份证号哦！~', '我知道了');
		} else if(!reg1.test($('#tel').val())) {
			title_tip('提 示', '请填写正确的手机号！~', '我知道了');
		} else {
			if(get_yz.innerHTML === '获取验证码') {
				getCheckCode(function() {
					countdown(get_yz, 60);
				});
			} else {
				get_yz.removeEventListener('click', getYzcode, false);
			}
		}
	}

	function getCheckCode(cb) { // 获取手机验证码
		var javai = vge.terminal + '/DBTVMTSInterface/user/getCaptcha';
		var req = {
			"phonenum": $('#tel').val(),
			"companyKey": sessionStorage.companyKey,
			"sendtype": 1
		};
		vge.callJApi(javai, req, function(jo) {
			if(jo.result.code == '0') {
				if(jo.result.businessCode == '0') {
					//成功，开始倒计时
					cb();
				} else if(jo.result.businessCode === '2') { //1
					title_tip('尊敬的用户', '您填写的手机号错误，发送验证码失败！', '我知道了');
				} else {
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				}
			} else { //code!='0'
				title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			}
		});
	}

	function sub_message() { // 提交注册信息
		var javai = vge.terminal + '/DBTVMTSInterface/user/savePrize';
		var req = {
			"openid": openid,
			"username": $('#name').val(),
			"idcard": $('#id').val(),
			"skukey": sessionStorage.skukey === undefined ? '' : sessionStorage.skukey, //??
			"phonenum": $('#tel').val(),
			"captcha": $('#yz_code').val(),
			"address": 'address',
			"prizeType": sessionStorage.prizeType === undefined ? '' : sessionStorage.prizeType,
			"prizeVcode": sessionStorage.prizeVcode === undefined ? '' : sessionStorage.prizeVcode
		};
		vge.callJApi(javai, req, function(jo) {
			$('#tj').html('提交');
			$('#tj').on('click', function() {
				if(first) return;
				if($('#name').val() === '' || $('#name').val().indexOf(' ') !== -1) {
					title_tip('提 示', '请输入正确的姓名哦！~', '我知道了');
				} else if(!reg2.test($('#id').val()) || !getIdcardValidateCode($('#id').val())) {
					title_tip('提 示', '请填写正确的身份证号哦！~', '我知道了');
				} else if(!reg1.test($('#tel').val())) {
					title_tip('提 示', '请填写正确的手机号！~', '我知道了');
				} else if(!reg3.test($('#yz_code').val())) {
					title_tip('提 示', '请填写正确的验证码！~', '我知道了');
				} else {
					//调提交接口
					$(this).html('<img src="/v/terminal/img/loading.gif"/>');
					$('#tj').unbind();
					sub_message();
				}
			});
			if(jo.result.code === '0') {
				if(jo.result.businessCode === '0') {
					sessionStorage.first = 'first';
					first = true;
					sessionStorage.username = $('#name').val();
					sessionStorage.idcard = $('#id').val();
					sessionStorage.phonenum = $('#tel').val();
					title_tip('提 示', '您的中奖信息我们已经收到，请拨打<br> 0571-28227057联系我们进行身份核实', '我知道了', '', reload);
				} else if(jo.result.businessCode == '1') { //1
					title_tip('提 示', '验证码已失效', '我知道了');
				} else if(jo.result.businessCode == '2') { //2
					title_tip('提 示', '您填写的验证码有误', '我知道了');
				} else if(jo.result.businessCode == '-1') { //-1
					title_tip('提 示', '系统升级中...', '我知道了');
				} else if(jo.result.businessCode == '4') {
					title_tip('提 示', '兑奖截止时间已过期', '我知道了');
				} else {
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				}
			} else { //code!='0'
				title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			}
		});
	}
	
	if(sessionStorage.isVpointsShop==0){//是否显示积分商城
		$('.mall').css('display','none');
	}
	$('.mall').on('click', function() {
		sessionStorage.removeItem('companyKey');
		location.href = 'http://' + location.host + '/v/terminal/IntegralMall/index.html';
	});
	function reload(){
		location.reload();
	}
	$('.details').on('click', function() {
		location.href = 'http://' + location.host + '/terminal/too/details';
	});
})();