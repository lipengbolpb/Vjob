(function(){
	'use strict';
	var API_findCheckUser = vge.common + '/vjifenInterface/checkUser/findCheckUser';
	var API_modifyCheckUser = vge.common + '/vjifenInterface/checkUser/modifyCheckUser';
	var API_getCaptcha = vge.common + '/vjifenInterface/user/getCaptcha';
	var args = vge.urlparse(location.href),
		openid = args.openid,
		flag = true,
		isRevise = false;
	var dom_get = document.getElementById("get_yz");	
	var countdowntimer = null;	
	var reg1 = /^1[0-9]{10}$/, //验证手机号
	    reg2 = /^[0-9]{4}$/;	
	
	queryMsg();
	
	$('.register').on('click',function(){
		if(!flag){
			return false;
		}
		if(isRevise==true){
			if($('#area').val()==sessionStorage.area&&$('#name').val()==sessionStorage.name&&$('#tel').val()==sessionStorage.tel&&$('#address').val()==sessionStorage.address){
				return title_tip('尊敬的用户', '无可修改信息', '我知道了');
			}
		}
		if($('#area').val()==''){
			return title_tip('尊敬的用户', '请选择地区~', '我知道了');
		}else if($('#address').val().replace(/\s+/g,"")==''){
			return title_tip('尊敬的用户', '请输入正确的详细地址~', '我知道了');
		}else if($('#name').val().replace(/\s+/g,"")==''){
			return title_tip('尊敬的用户', '请输入正确的姓名~', '我知道了');
		}else if(!reg1.test($('#tel').val())){
			return title_tip('尊敬的用户', '请输入正确的手机号~', '我知道了');
		}else if(!reg2.test($('#yz_code').val())){
			return title_tip('尊敬的用户', '请输入正确的验证码~', '我知道了');
		}else{
			loading('注册中');
			flag = false;
			register();
		}
	});
	
	
	$('.alertBtn').on('click',function(){
		$('.alert').css('display','none');
	})
	
	// $('input').on('focus',function(){
	// 	if(isRevise){
	// 		$('.yz_box').css('display','flex');
	// 	}
	// 	
	// });
	$('#get_yz').on('click', function () {
		if(!flag){
			return false;
		}
	    getYzcode();
	});
	function getCheckCode(cb) { // 获取手机验证码
	    var javai = API_getCaptcha;
	    var req = {
			"projectServerName":"qmbaipi",
	        "phonenum": $('#tel').val(),
			"sendtype":1
	    };
	    vge.callJApi(javai, req, function (jo) {
	        if (jo.result.code == '0') {
				loaded();
	            if (jo.result.businessCode == '0') {
	                cb(); //成功，开始倒计时
	            } else if (jo.result.businessCode === '2') {
	                title_tip('尊敬的用户', '您填写的手机号错误，发送验证码失败！', '我知道了');
	            } else { //1 为服务器报错
	                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
	            }
	        } else { //code!='0'
	            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
	        }
	    });
	}
	
	function getYzcode() {
	    if (!reg1.test($('#tel').val())) {
	        title_tip('提 示', '请填写正确的手机号！~', '我知道了');
	    } else {
	        if ($('#get_yz').text() === '获取验证码' || $('#get_yz').text() === '重新获取') {
	            $('#get_yz').unbind();
				loading('获取中');
				getCheckCode(function () {
	                countdown(dom_get, 60);
	            });
	        } else {
	            $('#get_yz').off('click');
	        }
	    }
	}
	
	function countdown(tag, time) {
	    var i = time;
	    tag.innerHTML = i + '秒后获取';
	    countdowntimer = setInterval(function () {
	        i--;
	        tag.innerHTML = i + '秒后获取';
	        if (i === 0) {
	            tag.innerHTML = '重新获取';
	            i = time;
	            clearInterval(countdowntimer); // 清除定时器
	            $('#get_yz').on('click', function () {
	                getYzcode();
	            });
	            countdowntimer = null;
	        }
	    }, 1000);
	}
	
	function queryMsg() { //查询
		var javai = API_findCheckUser;
		var req = {
			"projectServerName":"qmbaipi",
			"openid": openid
		};
		vge.callJApi(javai, req,
			function(jo) {
				if (jo.result.code == '0') {
					if (jo.result.businessCode === '0') {
						$('#area').val(jo.reply.province+'-'+jo.reply.city+'-'+jo.reply.county).css('textAlign','left');
						$('#address').val(jo.reply.address);
						$('#name').val(jo.reply.userName);
						$('#tel').val(jo.reply.phoneNum);
						sessionStorage.area = jo.reply.province+'-'+jo.reply.city+'-'+jo.reply.county;
						sessionStorage.address = jo.reply.address;
						sessionStorage.tel = jo.reply.phoneNum;
						sessionStorage.name = jo.reply.userName;
						$('.register').text('修改信息');
						if(jo.reply.userStatus==1){
							$('.tip').html('身份状态：启用');
						}else{
							$('.tip').html('身份状态：停用');
						}
						// $('.yz_box').css('display','none');
						isRevise = true;
					} else {
						title_tip('尊敬的用户', jo.result.businessCode+':'+jo.result.msg, '我知道了');
					}
				} else if (jo.result.code == '-1') {
					title_tip('尊敬的用户', '系统升级中...', '我知道了');
				} else { //code!='0'
					title_tip('尊敬的用户', jo.result.code+':'+jo.result.msg, '我知道了');
				}
			});
	}
	
	function register() { //注册
		var javai = API_modifyCheckUser;
		var req = {
			"projectServerName":"qmbaipi",
			"openid":openid,
			"userName":$('#name').val().replace(/\s+/g,""),
			"phoneNum":$('#tel').val().replace(/\s+/g,""),
			"captcha":$('#yz_code').val().replace(/\s+/g,""),
			"province":$('#area').val().split('-')[0],
			"city":$('#area').val().split('-')[1],
			"county":$('#area').val().split('-')[2]==undefined?$('#area').val().split('-')[1]:$('#area').val().split('-')[2],
			"address":$('#address').val().replace(/\s+/g,"")
		};
		vge.callJApi(javai, req,
			function(jo) {
				flag = true;
				loaded();
				if (jo.result.code == '0') {
					if (jo.result.businessCode === '0') {
						flag = false;
						if(isRevise){
							$('.register').text('修改成功');
						}else{
							$('.register').text('注册成功');
						}
						$('.alert').css('display','block');
					} else {
						title_tip('尊敬的用户', jo.result.businessCode+':'+jo.result.msg, '我知道了');
					}
				} else if (jo.result.code == '-1') {
					title_tip('尊敬的用户', '系统升级中...', '我知道了');
				} else { //code!='0'
					title_tip('尊敬的用户', jo.result.code+':'+jo.result.msg, '我知道了');
				}
			});
	}
	
	
	function loading(txt) {
	    $('#loadingToast .weui_toast_content').html(txt);
	    $('#loadingToast').show();
	}
	
	function loaded() {
	    $('#loadingToast').hide();
	}
	
	function toast(txt) {
	    $('#toast .weui_toast_content').html(txt);
	    $('#toast').show();
	    setTimeout(function () {
	        $('#toast').hide();
	    }, 2000);
	}
})()