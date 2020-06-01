(function() {
	"use strict";
	// ini_wxshare(vge.terminalappid);
	// // 隐藏微信右上角菜单
	// wx.ready(function() {
	// 	wx.hideOptionMenu();
	// });
	var inform_box = document.getElementById('inform_box'),
		inform_ipts = inform_box.getElementsByTagName('input'),
		dom_btn = document.getElementById('btn'),
		store_close = document.getElementById("store_close"),
		chose_open = document.getElementsByClassName('chose_open')[0],
		chose_store = document.getElementsByClassName('chose_store')[0],
		get_yz = document.getElementById("get_yz"),
		search_shopname = document.getElementById("search_shopname"),
		search_street = document.getElementById("search_street"),
		itpl_onenote = document.getElementById("onenote_tpl").innerHTML;

	var args = vge.urlparse(location.href),
		a = '',
		b = '',
		c = '',
		d = '',
		e = '';

	var caneditor = true,
		storekey = '',
		locationed = false,
		address = '',
		companyList = JSON.parse(sessionStorage.companyList),
		reg1 = /^1[0-9]{10}$/,
		countdowntimer = null,
		imgIndex=0,
		timer = null,
		timer2 = null,
		timeout = null;

	if(sessionStorage.terminalUserType.lastIndexOf('4')!==-1){
		$('.attache').css('display','block');
	}
	if(sessionStorage.terminalUserType.lastIndexOf('2')!==-1){
		$('.waiter').css('display','block');
	}
	if(sessionStorage.terminalUserType.lastIndexOf('1')!==-1){
		$('.boss').css('display','block');
	}
	$('.mark img').each(function(){
		if($(this).css('display')=='block'){
			var picsrc = $('.mark img').eq(imgIndex).attr('src');
			picsrc = picsrc.replace('white','blue');
			$('.mark img').eq(imgIndex).attr('src',picsrc);
			return ;
		}
		imgIndex++
	})
	
	if(sessionStorage.terminalUserType.split('_').length==3){
		$('.mark img').eq(0).css({'float':'left','margin-left':'1rem'});
		$('.mark img').eq(1).css({'float':'left','margin-left':'1rem'});
	}else if(sessionStorage.terminalUserType.split('_').length==4){
		$('.mark img').css({'float':'left','margin-left':'1rem'});
	}
	$('#mon_list').css('height', Number($(document).height()) - Number($('#store_msg').css('top').substring(0, $('#store_msg').css('top').length - 2)) - Number($('#search_box').height()) + 'px');
	$('#mon_list').css('overflow-x', 'hidden');
	$('#store_msg').css('height', Number($(document).height()) - Number($('#store_msg').css('top').substring(0, $('#store_msg').css('top').length - 2)) + 'px');
	console.log($('#store_msg').css('top').substring(0, $('#store_msg').css('top').length - 2));

	//	for(var k = 0;k<companyList.length;k++){
	//		$('select.company').append(`<option companyKey="${companyList[k].companyKey}">${companyList[k].companyName}</option>`);
	//	}
	//	$('select.company').change(function(){
	//		$('select.company option').each(function(){
	//			if($(this).is(":checked")){
	//				sessionStorage.companyKey = $(this).attr('companyKey');
	//			}
	//		})
	//		
	//	});
	$('.boss').on('click', function() {
		clearTimeout(timeout);
		sessionStorage.userType = '1';
		$(this).attr('src', '/v/terminal/img/boss_blue.png');
		$('.waiter').attr('src', '/v/terminal/img/waiter_white.png');
		$('.attache').attr('src', '/v/terminal/img/attache_white.png');
		timeout = setTimeout(function() {
			$('.mark').css('left', '-100%');
			$('.msg_box').css('visibility', 'visible');
		}, 500);
	});

	$('.waiter').on('click', function() {
		clearTimeout(timeout);
		sessionStorage.userType = '2';
		$(this).attr('src', '/v/terminal/img/waiter_blue.png');
		$('.boss').attr('src', '/v/terminal/img/boss_white.png');
		$('.attache').attr('src', '/v/terminal/img/attache_white.png');
		timeout = setTimeout(function() {
			$('.mark').css('left', '-100%');
			$('.msg_box').css('visibility', 'visible');
		}, 500);
	});

	$('.attache').on('click', function() {
		clearTimeout(timeout);
		sessionStorage.userType = '4';
		$(this).attr('src', '/v/terminal/img/attache_blue.png');
		$('.waiter').attr('src', '/v/terminal/img/waiter_white.png');
		$('.boss').attr('src', '/v/terminal/img/boss_white.png');
		timeout = setTimeout(function() {
			$('.mark').css('left', '-100%');
			$('.msg_box').css('visibility', 'visible');
		}, 500);
	});

	$('#inform_box input').on('input', function() { //!sessionStorage.companyKey||企业判断
		if($('#address').val() === '' || $('#store').val() === '' || $('#phoneNum').val() === '' || $('#yz_code').val() === '' || $('#name').val() === '') {
			$('#btn').html('上一步');
		} else {
			$('#btn').html('提交');
		}
	});

	if(sessionStorage.province != '' && sessionStorage.province != 'undefined') { //有定位信息
		$('#address').val(sessionStorage.province + ' ' + sessionStorage.city + ' ' + sessionStorage.county);
	}
	sessionStorage.address = $('#address').val();
	document.getElementsByClassName('click_box')[0].addEventListener('click', function() {
		address = $('#address').val().split(' ')[2];
		if(address != sessionStorage.address && address != undefined) {
			a = $('#address').val().split(' ')[0];
			b = $('#address').val().split(' ')[1];
			c = $('#address').val().split(' ')[2];
		}
	}, false);

	chose_open.addEventListener("click", function() {
		if(caneditor) { //点击编辑
			caneditor = false;
			inform_ipts[2].readOnly = false;
			inform_ipts[3].readOnly = false;
			inform_ipts[4].readOnly = false;
		}
	}, false);
	store_close.addEventListener('click', function() {
		document.getElementsByClassName('chose-store')[0].style.display = 'none';
	}, false);

	chose_store.addEventListener("click", function() {
		if($('#address').val() === '') {
			title_tip('提 示', '请填写正确的地区信息！', '我知道了');
		} else {
			a = $('#address').val().split(' ')[0];
			b = $('#address').val().split(' ')[1];
			c = $('#address').val().split(' ')[2];
			document.getElementsByClassName('chose-store')[0].style.display = 'block';
			search_shopname.focus();
			inform_ipts[2].readOnly = false;
			inform_ipts[3].readOnly = false;
			inform_ipts[4].readOnly = false;
		}
	}, false);

	dom_btn.addEventListener('click', function() { //||!sessionStorage.companyKey  企业选择
		if($('#address').val() === '' || $('#store').val() === '' || $('#name').val() === '' || $('#phoneNum').val() === '' || $('#yz_code').val() === '') {
			$('.mark').css('left', '0');
			$('.msg_box').css('visibility', 'hidden');
		} else {
			$('#btn').html('<img class="loading" src="/v/terminal/img/loading.gif"/>');
			$('#btn').unbind();
			addTerminalUser();
		}
	}, false);

	search_shopname.addEventListener('input', function() {
		console.log(search_shopname.value.length);
		d = search_shopname.value;
		clearTimeout(timer);
		clearTimeout(timer2);
		if(search_street.value.length >= 1||search_shopname.value.length >= 1) {
			store_close.src = '/v/terminal/img/loading.gif';
		} else {
			store_close.src = '/v/terminal/img/close_big.png';
		}
		timer = setTimeout(function() {
			if(search_street.value.length >= 1||search_shopname.value.length >= 1) {
				d = search_shopname.value;
				console.log(d,e);
				queryTerminalList(a, b, c, d, e);
			}
		}, 2000);
	}, false);

	search_street.addEventListener('input', function() {
		console.log(search_street.value.length);
		e = search_shopname.value;
		clearTimeout(timer);
		clearTimeout(timer2);
		if(search_street.value.length >= 1||search_shopname.value.length >= 1) {
			store_close.src = '/v/terminal/img/loading.gif';
		} else {
			store_close.src = '/v/terminal/img/close_big.png';
		}
		timer = setTimeout(function() {
			if(search_street.value.length >= 1||search_shopname.value.length >= 1) {
				e = search_street.value;
				console.log(e);
				queryTerminalList(a, b, c, d,e);
			}
		}, 2000);
	}, false);

	function countdown(tag, time) {
		var i = time;
		tag.innerHTML = i + '秒后重新获取';
		clearInterval(countdowntimer);
		countdowntimer = setInterval(function() {
			i--;
			tag.innerHTML = i + '秒后重新获取';
			if(i <= 1) {
				tag.innerHTML = '获取验证码';
				clearInterval(countdowntimer); // 清除定时器
				get_yz.addEventListener("click", getYzcode, false); //恢复计时器
				countdowntimer = null;
			}
		}, 1000);
	}
	get_yz.addEventListener('click', getYzcode, false);

	function getYzcode() {
		if(!reg1.test($('#phoneNum').val())) {
			title_tip('提 示', '请填写正确的手机号！~', '我知道了');
		} else {
			if(get_yz.innerHTML === '获取验证码') {
				get_yz.removeEventListener('click', getYzcode, false);
				getCheckCode(function() {
					countdown(get_yz, 60);
				});
			} else {
				get_yz.removeEventListener('click', getYzcode, false);
			}
		}
	}

	function getCheckCode(cb) { // 获取手机验证码
		get_yz.addEventListener('click', getYzcode, false);
		var javai = vge.terminal + '/DBTVMTSInterface/user/getCaptcha';
		var req = {
			"phonenum": $('#phoneNum').val(),
			"openid": sessionStorage.openid,
			//			"companyKey": companyList[0].companyKey,
			"sendtype": 2 //上线之后改成2
		};
		vge.callJApi(javai, req, function(jo) {
			if(jo.result.code == '0') {
				if(jo.result.businessCode == '0') {
					cb(); //成功，开始倒计时
				} else if(jo.result.businessCode === '2') { //1
					title_tip('尊敬的用户', '您填写的手机号错误，发送验证码失败！', '我知道了');
				} else if(jo.result.businessCode === '3') {
					title_tip('尊敬的用户', '您填写的手机号已被注册！', '我知道了');
				} else {
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				}
			} else { //code!='0'
				title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			}
		});
	}

	function queryTerminalList(a, b, c, d) { // 终端查询
		var mon_list = document.getElementById("mon_list");
		var javai = vge.terminal + '/DBTVMTSInterface/terminal/queryTerminalList';
		var req = {
			"openid": sessionStorage.openid,
			"province": a,
			"city": b,
			"county": c,
			"terminalName": d,
			"address":e,
			"companyKey": companyList[0].companyKey
		};
		vge.callJApi(javai, req, function(jo) {
			store_close.src = '/v/terminal/img/close_big.png';
			if(jo.result.code === '0') {
				if(jo.result.businessCode === '0') {
					if(jo.reply.searchNum){
						$('#search_tip').html(jo.reply.searchNum+'条搜索结果');
					}else{
						$('#search_tip').html('0条搜索结果');
					}
					var i = 0,
						lst = jo.reply.terminalAry,
						l = lst.length;
					if(l === 0 || lst === undefined) {
						return;
					}
					var params = {},
						hs = [],
						terminalName = '',
						terminalKey = '';
					mon_list.innerHTML = '';
					for(i = 0; i < l; ++i) {
						if(lst[i].agreementStatus == 1) {
							params.terminalName = lst[i].terminalName + '(协议门店)';
						} else {
							params.terminalName = lst[i].terminalName;
						}
						params.terminalKey = lst[i].terminalKey;
						params.agreementStatus = lst[i].agreementStatus;
						params.linkMan = lst[i].linkMan === undefined ? '' : lst[i].linkMan;
						params.terminalAddress = lst[i].address === undefined ? '' : lst[i].address;
						mon_list.innerHTML += vge.renderTpl(itpl_onenote, params);
					}
					if($('#mon_list').children().size() > 0) {
						$('#mon_list li').each(function() {
							if($(this).attr('type') == 1) {
								$(this).css('background', '#ddd');
							}
						});

						$('#mon_list').on('click', 'li', function() {
							if($(this).attr('type') == 1) {
								return false;
							} else {
								sessionStorage.terminalKey = $(this).attr('terminalKey');
								$('#store').val($(this).children('p').html());
								$('.chose-store').fadeOut();
							}
						});
					}
				} else if(jo.result.businessCode === '2') { //无红包记录
					mon_list.innerHTML = '';
					$('#search_tip').html('0条搜索结果');
					$('#mon_list li').unbind();
					return;
				} else { //businessCode:1失败
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				}
			} else { //code!='0'
				title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			}
		});
	}

	function addTerminalUser() { // 注册
		var javai = vge.terminal + '/DBTVMTSInterface/terminal/addTerminalUser';
		var req = {
			"openid": sessionStorage.openid,
			"secretKey": sessionStorage.secretKey,
			"terminalKey": sessionStorage.terminalKey,
			"userType": sessionStorage.userType,
			"companyKey": companyList[0].companyKey,
			"userName": $('#name').val(),
			"phoneNum": $('#phoneNum').val(),
			"captcha": $('#yz_code').val(),
			"longitude": sessionStorage.longitude === undefined ? '00' : sessionStorage.longitude, //"经度"
			"latitude": sessionStorage.latitude === undefined ? '00' : sessionStorage.latitude //"纬度"
		};
		vge.callJApi(javai, req, function(jo) {
			$('#btn').html('提交');
			Alert(jo.result.businessCode, jo.result.msg);
			if(jo.result.code == '0') {
				if(jo.result.businessCode == '0') {
					$('#btn').html('注册成功');
					$("#btn,#get_yz,.chose_store,.chose_open").unbind();
				}
			} else { //code!='0'
				dom_btn.addEventListener('click', function() { //||!sessionStorage.companyKey
					if($('#address').val() === '' || $('#store').val() === '' || $('#name').val() === '' || $('#phoneNum').val() === '' || $('#yz_code').val() === '') {
						$('.mark').css('left', '0');
						$('.msg_box').css('visibility', 'hidden');
					} else {
						$('#btn').html('<img class="loading" src="/v/terminal/img/loading.gif"/>');
						$('#btn').unbind();
						addTerminalUser();
					}
				}, false);
				title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			}
		});
	}

	function Alert(code, msg) {
		if(code == 0) {
			$('.window_res img').attr('src', '/v/terminal/img/success.png');
		} else {
			clearInterval(countdowntimer); // 清除定时器
			countdown(get_yz, 1);
			$('.window_res img').attr('src', '/v/terminal/img/fail_tip.png');
		}
		if(sessionStorage.userType == 2) {
			$('.window_res .tip').text('尊敬的服务员');
		}else if(sessionStorage.userType == 4){
			$('.window_res .tip').text('尊敬的理货专员');
		}
		$('.window_res .tip_msg').text(msg);
		$('#alert').css('display', 'block');
		$('#iknow').on('click', function() {
			if(code == 0) {
				wx.closeWindow();
			} else {
				$('#alert').css('display', 'none');
			}
		});
	}

})();