(function() {
	'use strict';
//	ini_wxshare(vge.batchappid);
	
	var args = vge.urlparse(location.href),
		qr = decodeURIComponent(args.qr),
		areacfg = '',
		ar = '',
		ename = '',
		only = true,
		areasign = '',
		codeFlag = args.codeFlag,
		projectServerName='',
		openid = args.openid;
	qr=qr.replace(/(\n|\r)/g,'').trim();
	
	if(codeFlag == 2) {
		if(qr.indexOf('VJ1.TV/') !== -1) { //线上
			areasign = qr.split('/')[qr.split('/').length - 2];
			qr = qr.split('/')[qr.split('/').length - 1];
		} else if(qr.indexOf('vj1.tv/') !== -1) { //线上
			areasign = qr.split('/')[qr.split('/').length - 2];
			qr = qr.split('/')[qr.split('/').length - 1];
		} else if(qr.indexOf('xt.vjifen.com/qr?c=') !== -1) { //测试环境
			areasign = qr.split('xt.vjifen.com/qr?c=')[1].substring(0,2);
			qr = qr.split('v=')[1];
		}
		switch(areasign) {
			case 'I':
				sessionStorage.area = 'jxqp';
				break;
			case 'j':
				sessionStorage.area = 'hljqp';
				break;
			case 'C':
				sessionStorage.area = 'terminal';
				break;
			case 'T':
				sessionStorage.area = 'terminal';
				break;
			case 'c':
				sessionStorage.area = 'terminal';
				break;
			case 's':
				projectServerName = 'sichuan';
				sessionStorage.area = 'scqp';
				break;
			case 'Y':
				sessionStorage.area = 'amqp';
				break;
			case 'p':
				sessionStorage.area = 'TBEB';
				break;
			case 'h':
				sessionStorage.area = 'zzqp';
				break;
			case 'n':
				sessionStorage.area = 'csqp';
				break;
			case 'u':
				projectServerName = 'huanan';
				sessionStorage.area = 'hnqp';
				break;
			case 'W':
				sessionStorage.area = 'qmbp';
				projectServerName = 'qmbaipi';
				break;
			case 'm':
				sessionStorage.area = 'ymqp';
				break;
			case 'z':
				sessionStorage.area = 'qpzj';
				projectServerName = 'zhejiang';
				areacfg = vge.common + '/vjifenInterface';
				break;
			case 'a':
				sessionStorage.area = 'bxqp';
				projectServerName = 'beixiao';
				break;
			case 'y':
				sessionStorage.area = 'amqp';
				break;
			case 'x':
				projectServerName = 'shanxi';
				sessionStorage.area = 'sxqp';
				break;
			case 'X':
				projectServerName = 'shanxi';
				sessionStorage.area = 'sxqp';
				break;
			case 'd':
				sessionStorage.area = 'sdqp';
				break;
			case 'M':
				sessionStorage.area = 'ymqp';
				break;
			case 'G':
				sessionStorage.area = 'xaqp';
				break;
			case 'e':
				sessionStorage.area = 'hbqp';
				break;
			case 'qpzj':
				sessionStorage.area = 'qpzj';
				projectServerName = 'zhejiang';
				areacfg = vge.common + '/vjifenInterface';
				break;
			case 'D':
				sessionStorage.area = 'sdqp';
				break;
			case 'FQ':
				sessionStorage.area = 'fjmall';
				break;
			case 'A':
				sessionStorage.area = 'bxqp';
				projectServerName = 'beixiao';
				break;
			case 'B':
				sessionStorage.area = 'hkqp';
				projectServerName = 'hainan';
				break;
			case 'b':
				sessionStorage.area = 'hkqp';
				break;
			case 'R':
				sessionStorage.area = 'ynqp';
				projectServerName = 'yunnan';
				break;
			case 'i':
				sessionStorage.area = 'jxqp';
				projectServerName = 'jiangxi';
				break;
			case 'g':
				sessionStorage.area = 'xaqp';
				break;
			case 'w':
				sessionStorage.area = 'qmbp';
				projectServerName = 'qmbaipi';
				break;
			case 'o':
				sessionStorage.area = 'sxfj';
				break;
			case 'F':
				projectServerName = 'fujian';
				sessionStorage.area = 'fjqp';
				break;
			case 'f':
				projectServerName = 'fujian';
				sessionStorage.area = 'fjqp';
				break;	
			case 'S':
				projectServerName = 'sichuan';
				sessionStorage.area = 'scqp';
				break;
			case 'P':
				sessionStorage.area = 'TBEB';
				break;
			case 'J':
				sessionStorage.area = 'hljqp';
				break;
			case 'N':
				projectServerName = 'hunan';
				sessionStorage.area = 'csqp';
				break;
			case 'E':
				sessionStorage.area = 'hbqp';
				break;
			case 'U':
				projectServerName = 'huanan';
				sessionStorage.area = 'hnqp';
				break;
			case 'H':
				sessionStorage.area = 'zzqp';
				break;
			case 'l':
				projectServerName = 'guangxi';
				sessionStorage.area = 'qpgx_japi';
				break;
			case 'Q':
				projectServerName = 'chongqing';
				sessionStorage.area = 'cqqp';
				break;
			case 'q':
				projectServerName = 'chongqing';
				sessionStorage.area = 'cqqp';
				break;
			case 'V':
				sessionStorage.area = 'rio';
				break;
			case 'K':
				sessionStorage.area = 'rio';
				break;
			case 'L':
				projectServerName = 'guangxi';
				sessionStorage.area = 'qpgx_japi';
				break;
			case 'JL':
				sessionStorage.area = 'jlqp';	
				break;	
			case 'LN':
				projectServerName = 'liaoning';
				sessionStorage.area = 'lnqp';	
				break;	
			case 'JS':
				sessionStorage.area = 'jsqp';	
				break;
			case 'AH':
				projectServerName = 'anhui';
				sessionStorage.area = 'ahqp';	
				break;
			case 'FZ':
				sessionStorage.area = 'zjfj';	
				break;	
			case 'GS':
				projectServerName = 'gansu';
				sessionStorage.area = 'gsqp';
				break;
			case 'HP':
				projectServerName = 'henanpz';
				sessionStorage.area = 'zzhnqp';
				break;
			case 'LF':
				sessionStorage.area = 'fjlbf';
				break;
			case 'NM':
				projectServerName = 'neimeng';
				sessionStorage.area = 'nmqp';
				break;
			case 'SH':
				sessionStorage.area = 'shqp';
				projectServerName = 'shanghaiqp';
				break;		
			default:
				break;
		}
		dot();
	} else if(codeFlag == 1) {
		areaList();
		$('.msg_box,#btn').css('display', 'block');
	}

	function searchInfo() {
		console.log(qr);
		var javai = areacfg + '/sweep/sweepCodeSearchInfo';
		var req = {
			"projectServerName": projectServerName,
			"openid": openid,
			"sweepstr": qr,
			"codeFlag": codeFlag
		};
		vge.callJApi(javai, req, function(jo) {
			if(jo.result.code == '0') {
				if(jo.result.businessCode == '0') {
					if(jo.reply.startDate){
						if(timeTranslate(jo.reply.startDate)<=new Date()) {//已激活 ||timeTranslate(jo.reply.endDate)>=new Date()
							$('.content').css({'background-image':'url(/v/batch/img/succ.png?v=1)','-webkit-background-size':'6rem auto'});
						} else {
							$('.content').css({'background-image':'url(/v/batch/img/fail.png?v=1)','-webkit-background-size':'6rem auto'});
						}
					}else{
						$('.content').css({'background-image':'url(/v/batch/img/fail.png?v=1)','-webkit-background-size':'6rem auto'});
					}
					$('.content').css('display', 'block');
					$('.msg_box,#btn').css('display', 'none');
					$('.shortName').html(jo.reply.shortName === undefined ? '' : jo.reply.shortName);
					$('.skuName').html(jo.reply.skuName === undefined ? '' : jo.reply.skuName);
					$('.batchDesc').html(jo.reply.batchDesc === undefined ? '' : jo.reply.batchDesc);
					$('.vcodeCounts').html(jo.reply.vcodeCounts === undefined ? '' : strtslt(jo.reply.vcodeCounts));
					$('.activateUserName').html(jo.reply.activateUserName === undefined ? '' : jo.reply.activateUserName);
					$('.activatePhone').html(jo.reply.activatePhone === undefined ? '' : jo.reply.activatePhone);
					$('.activateFactoryName').html(jo.reply.activateFactoryName === undefined ? '' : jo.reply.activateFactoryName);
					$('.activateTime').html(jo.reply.activateTime.substring(0,jo.reply.activateTime.length-2));
				} else if(jo.result.businessCode === '1') { //1
					alertTip('尊敬的用户', jo.result.msg, '我知道了', close);
				} else if(jo.result.businessCode === '2') { //2
					alertTip('尊敬的用户', jo.result.msg, '我知道了', close);
				} else if(jo.result.businessCode === '3') { //3
					alertTip('尊敬的用户', jo.result.msg, '我知道了', close);
				} else {
					alertTip('尊敬的用户', jo.result.msg, '我知道了', close);
				}
			} else { //code!='0'
				alertTip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			}
		});

	}
	
	function close(){
		wx.closeWindow();
	}
	

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
							dot();
						}
						$('select').change(function() {
							$('select option').each(function() {
								if($(this).is(":checked")) {
									sessionStorage.area = $(this).attr('area');
								}
							})

						});
					} else {
						alertTip('尊敬的用户', jo.result.msg, '我知道了',close);
					}
				} else { //code!='0'
					alertTip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了',close);
				}
			}
		});
	}
	$('select').change(function() {
		$('select option').each(function() {
			if($(this).is(":checked")) {
				sessionStorage.area = $(this).attr('area');
			}
		})

	});
	$('#btn').on('click', dot);

	function dot() {
		$('#btn').unbind();
		setTimeout(function() {
			$('#btn').on('click', dot);
		}, 1000);
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
				alertTip('提 示', '二维码信息有误', '我知道了',close);
				return;
				break;
		}
		searchInfo();
	}
	
	
	function strtslt(num) {
		var str = num+'';
		var len = str.length;
		var step = 3;
		var splitor = ",";
		if(len > step) {
			var l1 = len % step,
				l2 = parseInt(len / step),
				arr = [],
				first = str.substr(0, l1);
			if(first != '') {
				arr.push(first);
			};
			for(var i = 0; i < l2; i++) {
				arr.push(str.substr(l1 + i * step, step));
			};
			str = arr.join(splitor);
		};　　
		return str;
	}
	
	function timeTranslate(time){
		var year = time.split('-')[0],
			month = time.split('-')[1]-1,
			day = time.split('-')[2];
		return new Date(year,month,day).getTime();
	}
	
	
})();