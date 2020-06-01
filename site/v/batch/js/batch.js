(function() {
//	ini_wxshare(vge.batchappid);

	var args = vge.urlparse(location.href),
		areacfg = '',
		needvc = false,
		only = true,
		batchDesc = args.s,
		batchList = '',
		ar = '',
		ename = '',
		batchArr = '',
		projectServerName='',
		openid = args.openid;
		
	// var vConsole = new VConsole();	
	var get_yz = document.getElementById("get_yz");
	var countdowntimer = null;

	var reg1 = /^1[0-9]{10}$/,
		reg2 = /^[1-9][0-9xX]{17}$/,
		reg3 = /^[0-9]{4}$/;

	areaList();

	getBatch();

	function areaList() {
		var javai = vge.batch + '/DBTMainEntStats/batchActivate/queryActivateRange.do';
		var req = {
			"openid": openid,
			"queryFlag": 2
		};
		$.ajax({
			type: "post",
			url: javai,
			data: req,
			success: function(jo) {
				jo = JSON.parse(jo);
				if(jo.result.code == '0') {
					if(jo.result.businessCode == '0') {
						for(var i in jo.reply.serverName.split(',')) {
							switch(jo.reply.serverName.split(',')[i]) {
								case 'XinYM':
									ar = 'ymqp';
									ename = '新银麦';
									$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									break;
								case 'shanxi':
									ar = 'sxqp';
									ename = '山西';
									$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									break;
								case 'shandongagt':
									ar = 'sdqp';
									ename = '山东';
									$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									break;
								case 'beixiao':
									ar = 'bxqp';
									ename = '北销';
									$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									break;
								case 'BYinMai':
									ar = 'amqp';
									ename = '澳麦';
									$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									break;
								case 'hebei':
									ar = 'hbqp';
									ename = '河北';
									$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									break;
								case 'qpec':
									ar = 'TBEB';
									ename = '青啤电商';
									$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									break;
								case 'fujian':
									ar = 'fjqp';
									ename = '福建';
									$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									break;
								case 'qmbaipi':
									ar = 'qmbp';
									ename = '全麦白啤';
									$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									break;
								case 'zhejiang':
									ar = 'qpzj';
									ename = '浙江';
									$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									break;
								case 'hainan':
									ar = 'hkqp';
									ename = '海南';
									$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									break;
								case 'heilj':
									ar = 'hljqp';
									ename = '黑龙江';
									$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									break;
								case 'huanan':
									ar = 'hnqp';
									ename = '华南';
									$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									break;
								case 'hunan':
									ar = 'csqp';
									ename = '湖南';
									$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									break;
								case 'jiangxi':
									ar = 'jxqp';
									ename = '江西';
									$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									break;
								case 'xianqp':
									ar = 'xaqp';
									ename = '陕西';
									$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									break;
								case 'sichuan':
									ar = 'scqp';
									ename = '四川';
									$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									break;
								case 'yunnan':
									ar = 'ynqp';
									ename = '云南';
									$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									break;
								case 'vmts':
									ar = 'terminal';
									ename = '终端促销';
									$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									break;
								case 'rio':
									ar = 'rio';
									ename = '锐澳';
									$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									break;
								case 'guangxi':
									ar = 'qpgx_japi';
									ename = '广西';
									$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									break;	
								case 'qinghuafj':
									ar = 'fjmall';
									ename = '青花汾酒';
									$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									break;	
								case 'chongqing':
									ar = 'cqqp';
									ename = '重庆';
									$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									break;
								case 'henan':
									ar = 'zzqp';
									ename = '华中';
									$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									break;	
								case 'jilin':
									ar = 'jlqp';
									ename = '吉林';
									$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									break;	
								case 'liaoning':
									ar = 'lnqp';
									ename = '辽宁';
									$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									break;	
								case 'jiangsu':
									ar = 'jsqp';
									ename = '江苏';
									$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									break;
								case 'anhui':
									ar = 'ahqp';
									ename = '安徽';
									$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									break;
								case 'shanxifjzj':
									ar = 'zjfj';
									ename = '汾酒浙江';
									$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									break;	
								case 'gansu':
									ar = 'gsqp';
									ename = '甘肃';
									$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									break;
								case 'henanpz':
									ar = 'zzhnqp';
									ename = '河南瓶装';
									$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									break;	
								case 'laobaifj':
									ar = 'fjlbf';
									ename = '汾酒老白汾';
									$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									break;
								case 'neimeng':
									ar = 'nmqp';
									ename = '蒙东';
									$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									break;
								case 'shanghaiqp':
									ar = 'shqp';
									ename = '上海青啤';
									$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									break;								
								default:
									if(jo.reply.serverName.split(',')[i].indexOf('vmts')!==-1&&only==true){
										only = false;
										ar = 'terminal';
										ename = '终端促销';
										$('select').append('<option value="" area=' + ar + '>' + ename + '</option>');
									}
									break;
							}
						}
						if(jo.reply.serverName.split(',').length === 1) {
							$('select').attr('disabled', 'disabled');
							$('select option').eq(1).attr('selected', 'selected');
							sessionStorage.area = $('select option').eq(1).attr('area');
							needyz();
						}
						if(jo.reply.phoneNum){
							$('#tel').val(jo.reply.phoneNum);
							$('#tel').attr('readonly','readonly');
						}
						$('select').change(function() {
							$('select option').each(function() {
								if($(this).is(":checked")) {
									sessionStorage.area = $(this).attr('area');
									needyz();
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

	function getBatch() {
		if(sessionStorage.batchList){
			cb(sessionStorage.batchList);
		}else{
			var requrl = 'http://' + vge.o3host + '/wx3/getbatch?openid=' + openid;
			vge.ajxget(requrl, 5000, cb, function(err) {
				vge.clog('errmsg', [requrl, err]);
			});
		}
		
	}
	
	function cb(r) {
		console.log(r)
		try {
			batchArr = r.substring(0, r.length - 1).replace(/(\n|\r)/g,'').trim();
			batchList = '';
			r = r.split(',');
			for(var i in r) {
				if(r[i] != '') {
					batchList += `<li>${r[i].replace(/(\n|\r)/g,'').trim()}</li>`;
				}
			}
			$('#batchLength').html(r.length - 1);
			$('ul').append(batchList);
			if(batchList == '') {
				$('ul,.tip2').css('display', 'none');
			} else {
				setTimeout(function() {
					$('#tj').on('click', dot);
				}, 500);
			}
			$('#cancel').on('click', function() {
				if(batchList == '') {
					alertTip('提示', '没有需要删除的批次', '我知道了', reload);
				} else {
					delBatch();
				}
			});
		} catch(e) {
			vge.clog('errmsg', [requrl, e]);
		}
	}
	
	function delBatch(tt) {
		sessionStorage.removeItem('batchList');
		$.get('http://' + vge.o3host + '/wx3/delbatch?openid=' + openid, function(r) {
			if(!tt) {
				alertTip('提示', '批次清除成功，立即重新扫描批次', '我知道了', reload);
			}
		});
	}

	function needyz() {
		areaChose();
		var javai = areacfg + '/sweep/checkVerificationCode';
		var req = {
			"projectServerName": projectServerName,
			"openid": openid,
		};
		vge.callJApi(javai, req, function(jo) {
			if(jo.result.code == '0') {
				if(jo.result.businessCode == '0') { //不需要验证码
					$('#yz_box,#tel_box').css('display', 'none');
					$('#yz_code').val('');
					needvc = false;
				} else if(jo.result.businessCode === '2') { //1
					$('#yz_box,#tel_box').css('display', 'block');
					needvc = true;
					alertTip('尊敬的用户', jo.result.msg, '我知道了');
				} else if(jo.result.businessCode === '3') { //3需要验证码
					$('#yz_box,#tel_box').css('display', 'block');
					needvc = true;
				} else {
					needvc = false;
					alertTip('尊敬的用户', jo.result.msg, '我知道了');
				}
			} else { //code!='0'
				alertTip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				get_yz.addEventListener('click', getYzcode, false);
			}
		});
	}

	function dot() {
		$('#tj').unbind();
		setTimeout(function() {
			$('#tj').on('click', dot);
		}, 1000);
		areaChose();
		if(needvc) {
			if(!reg1.test($('#tel').val())) {
				alertTip('提 示', '请填写正确的手机号！~', '我知道了');
			} else if(!reg3.test($('#yz_code').val())) {
				alertTip('提 示', '请填写正确的验证码！~', '我知道了');
			} else {
				//				$('#tj').html('<img class="loading" src="/v/terminal/img/loading.gif"/>');
				$(this).unbind();
				addAgentUser();
			}
		} else {
			//			$('#tj').html('<img class="loading" src="/v/terminal/img/loading.gif"/>');
			$(this).unbind();
			addAgentUser();
		}
	}

	function areaChose() {
		switch(sessionStorage.area) {
			case 'hbqp':
				areacfg = vge.hbqp + '/DBTHBQPInterface';
				break;
			case 'sxqp':
				projectServerName = 'shanxi';
				areacfg = vge.common + '/vjifenInterface';
				break;
			case 'ymqp':
				areacfg = vge.ymqp + '/DBTXYMQPInterface';
				break;
			case 'amqp':
				areacfg = vge.amqp + '/DBTBYMQPInterface';
				break;
			case 'bxqp':
				projectServerName = 'beixiao';
				areacfg = vge.common + '/vjifenInterface';
				break;
			case 'sdqp':
				areacfg = vge.sdqp + '/DBTSDQPInterface';
				break;
			case 'TBEB':
				areacfg = vge.tbeb + '/DBTECQPInterface';
				break;
			case 'terminal':
				areacfg = vge.terminal + '/DBTVMTSInterface';
				break;
			case 'qmbp':
				projectServerName = 'qmbaipi';
				areacfg = vge.common + '/vjifenInterface';
				break;
			case 'csqp':
				projectServerName = 'hunan';
				areacfg = vge.common + '/vjifenInterface';
				break;
			case 'fjqp':
				projectServerName = 'fujian';
				areacfg = vge.common + '/vjifenInterface';
				break;
			case 'hnqp':
				projectServerName = 'huanan';
				areacfg = vge.common + '/vjifenInterface';
				break;
			case 'hkqp':
				projectServerName = 'hainan';
				areacfg = vge.common + '/vjifenInterface';
				break;
			case 'hljqp':
				areacfg = vge.hljqp + '/DBTHLJQPInterface';
				break;
			case 'jxqp':
				projectServerName = 'jiangxi';
				areacfg = vge.common + '/vjifenInterface';
				break;
			case 'qpzj':
				projectServerName = 'zhejiang';
				areacfg = vge.common + '/vjifenInterface';
				break;
			case 'fjmall':
				areacfg = vge.fjmall + '/DBTFJQHInterface';
				break;
			case 'scqp':
				projectServerName = 'sichuan';
				areacfg = vge.common + '/vjifenInterface';
				break;
			case 'xaqp':
				areacfg = vge.xaqp + '/DBTXIANQPInterface';
				break;
			case 'ynqp':
				projectServerName = 'yunnan';
				areacfg = vge.common + '/vjifenInterface';
				break;
			case 'zzqp':
				areacfg = vge.zzqp + '/DBTHNQPInterface';
				break;
			case 'rio':
				areacfg = vge.rio + '/DBTRioInterface';
				break;
			case 'qpgx_japi':
				projectServerName = 'guangxi';
				areacfg = vge.common + '/vjifenInterface';
				break;
			case 'cqqp':
				projectServerName = 'chongqing';
				areacfg = vge.common + '/vjifenInterface';
				break;	
			case 'jlqp':
				areacfg = vge.jlqp + '/DBTJLQPInterface';
				break;
			case 'lnqp':
				projectServerName = 'liaoning';
				areacfg = vge.common + '/vjifenInterface';
				break;		
			case 'jsqp':
				areacfg = vge.jsqp + '/DBTJSQPInterface';
				break;	
			case 'ahqp':
				projectServerName = 'anhui';
				areacfg = vge.common + '/vjifenInterface';
				break;	
			case 'zjfj':
				areacfg = vge.zjfj + '/DBTSXFJZJInterface';
				break;	
			case 'gsqp':
				projectServerName = 'gansu';
				areacfg = vge.common + '/vjifenInterface';
				break;					
			case 'zzhnqp':
				projectServerName = 'henanpz';
				areacfg = vge.common + '/vjifenInterface';
				break;
			case 'fjlbf':
				areacfg = vge.fjlbf + '/DBTFJLBInterface';
				break;	
			case 'nmqp':
				projectServerName = 'neimeng';
				areacfg = vge.common + '/vjifenInterface';
				break;	
			case 'shqp':
				projectServerName = 'shanghaiqp';
				areacfg = vge.common + '/vjifenInterface';
				break;	
			default:
				alertTip('提 示', '请选择区域信息！', '我知道了');
				return;
				break;
		}
	}

	function locationed(res) {
		loaded();
		sessionStorage.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
		sessionStorage.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
		sessionStorage.speed = res.speed; // 速度，以米/每秒计
		sessionStorage.accuracy = res.accuracy; // 位置精度
	}
	wx.ready(function() {
		loading('玩命加载中');
//		wx.hideOptionMenu();
		wxGetLocation();
	});

	function wxGetLocation() {
		wx.getLocation({
			type: 'wgs84',
			success: locationed,
			cancel: function(res) {
				alertTip('提 示', '请打开地理位置授权！', '我知道了', locationed);
			},
			fail: function(res) {
				alertTip('提 示', '请打开地理位置授权！', '我知道了', locationed);
			}
		});
	}

	function countdown(tag, time) {
		var i = time;
		tag.innerHTML = i + '秒';
		countdowntimer = setInterval(function() {
			i--;
			tag.innerHTML = i + '秒';
			if(i <= 0) {
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
		var javai = areacfg + '/user/getCaptcha';
		var req = {
			"projectServerName": projectServerName,
			"phonenum": $('#tel').val(),
			"openid": openid,
			"sendtype": 1
		};
		vge.callJApi(javai, req, function(jo) {
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
		});
	}

	function addAgentUser() {
		var japi = areacfg + '/sweep/activateBatch';
		console.log(japi);
		var req = {
			"projectServerName": projectServerName,
			"openid": openid,
			"batchDesc": batchArr,
			"phone": document.getElementById("tel").value,
			"verifycode": document.getElementById("yz_code").value,
			"longitude": sessionStorage.longitude === undefined ? '00' : sessionStorage.longitude, //"经度"
			"latitude": sessionStorage.latitude === undefined ? '00' : sessionStorage.latitude //"纬度"
		};
		vge.clog('debug', [japi, JSON.stringify(req)]);
		vge.callJApi(japi, req, cbk);
	}

	function cbk(jo) {
		//		$('#tj').html('激活');
		if(jo.result.code == '0') {
			//"businessCode":"状态码:0-成功, 1-失败(服务器异常), 2-批次不存在, 3-批次已开始或结束不能激活，4-需要验证码, 5-验证码不正确"
			if(jo.result.businessCode == '0') {
				alertTip('尊敬的用户', jo.result.msg, '我知道了', reload);
				delBatch(jo.result.businessCode);
				$('#tj').unbind();
			} else if(jo.result.businessCode == '4') {
				needvc = true;
				$('#tel_box,#yz_box').css('display', 'block');
				//				alertTip('尊敬的用户', '请输入验证码', '我知道了');
			} else if(jo.result.businessCode == '1') {
				needvc = true;
				$('#tel_box,#yz_box').css('display', 'block');
				delBatch(jo.result.businessCode);
				alertTip('尊敬的用户', jo.result.msg, '我知道了', reload);
			} else if(jo.result.businessCode == '3') {
				needvc = true;
				$('#tel_box,#yz_box').css('display', 'block');
				delBatch(jo.result.businessCode);
				alertTip('尊敬的用户', jo.result.msg, '我知道了', reload);
			} else if(jo.result.businessCode == '2') {
				needvc = true;
				delBatch(jo.result.businessCode);
				$('#tel_box,#yz_box').css('display', 'block');
				alertTip('尊敬的用户', jo.result.msg, '我知道了', reload);
			} else {
				alertTip('尊敬的用户', jo.result.msg, '我知道了');
			}
		} else if(jo.result.code == '-1') { //code !=0;
			alertTip('尊敬的用户', '系统升级中，请稍后再试！', '我知道了');
		} else {
			alertTip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
		}
	}

	function reload() {
		wx.closeWindow();
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
		setTimeout(function() {
			$('#toast').hide();
		}, 2000);
	}

})();