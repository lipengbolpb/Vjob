(function(){
	
	'use strict';
//	ini_wxshare(vge.batchappid);
	
	var args = vge.urlparse(location.href),
		areacfg = '',
		ar = '',
		ename = '',
		currentPage = 1,
		count = 10,
		next = true,
		only = true,
		zero = 0,
		projectServerName='',
		openid = args.openid;
	
	
	areaList();
	function areaList() {
		var javai = vge.batch + '/DBTMainEntStats/batchActivate/queryActivateRange.do';
		var req = {
			"openid": openid,
			"queryFlag":2
		};
		$.ajax({
			type: "post",
			url: javai,
			data: req,
			success: function(jo) {
				jo = JSON.parse(jo);
				if(jo.result.code == '0') {
					if(jo.result.businessCode == '0') {
						$('.title_area').html(jo.reply.userName+' '+jo.reply.phoneNum+' '+jo.reply.factoryName);
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
									projectServerName = 'huanan';
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
									projectServerName = 'sichuan';
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
						if(jo.reply.serverName.split(',').length===1){
							$('select').attr('disabled','disabled');
							$('select option').eq(1).attr('selected','selected');
							sessionStorage.area = $('select option').eq(1).attr('area');
						}
						$('select').change(function() {
							$('select option').each(function() {
								if($(this).is(":checked")) {
									sessionStorage.area = $(this).attr('area');
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
	$('select').change(function() {
		$('select option').each(function() {
			if($(this).is(":checked")) {
				next = true;
				$('#more').html('加载更多');
				$('.batch_box,#more').css('display','none');
				$('.batch_box').html('');
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
				alertTip('提 示', '请选择区域信息！', '我知道了');
				return;
				break;
		}
		if($('#start').val()==' '||$('#end').val()==' '){
			alertTip('提 示', '请选择正确的时间区间！', '我知道了');
		}else{
			currentPage = 1;
			next = true;
			queryList(currentPage,zero);
			$('#more').html('加载更多');
		}
	}
	
	function close(){
		wx.closeWindow();
	}
	
	function queryList(currentPage,zero){
		var javai = areacfg + '/sweep/queryActivateBatchList';
		var req = {
			"projectServerName": projectServerName,
			"openid":openid,
			"beginDate":$('#start').val(),
			"endDate":$('#end').val(),
			"currentPage": currentPage,
		    "count": count
		};
		vge.callJApi(javai, req, function(jo) {
			if(jo.result.code == '0') {
				var strlist = '';
				if(jo.result.businessCode == '0') {
					if(jo.reply.length<10){
						next = false;
					}
					if(jo.reply.length>0){
						$('.batch_box,#more').css('display','block');
					}else{
						alertTip('尊敬的用户', '无激活记录', '我知道了');
					}
					if(zero==0){
						$('.batch_box').html('');
					}
					for(var i=0;i<jo.reply.length;i++){
						strlist = `<dl>
								<dt class="l"><span>${(i+(currentPage-1)*10+1)}</span></dt>
								<dd class="l">
									<p class="code">${jo.reply[i].batchDesc}</p>
									<div class="l">
										<p>${jo.reply[i].skuName}</p>
										<span>码数：${strtslt(jo.reply[i].vcodeCounts)}</span>
									</div>
									<div class="r">
										<p>${jo.reply[i].activateTime.split(' ')[0]}</p>
										<span>${jo.reply[i].activateTime.split(' ')[1].substring(0,jo.reply[i].activateTime.split(' ')[1].length-2)}</span>
									</div>
								</dd>
							</dl>`;
						$('.batch_box').append(strlist);
						$('.tb_a').css('width', $('.batch_box').width() * 0.1);
						$('.tb_b,.tb_d,.tb_e').css('width', $('.batch_box').width() * 0.24);
						$('.tb_c').css('width', $('.batch_box').width() * 0.15);
					}
				} else if(jo.result.businessCode === '2') { //1
					alertTip('尊敬的用户', jo.result.msg, '我知道了',close);
				} else if(jo.result.businessCode === '3') { //1
					alertTip('尊敬的用户', jo.result.msg, '我知道了',close);
				} else {
					alertTip('尊敬的用户', jo.result.msg, '我知道了',close);
				}
			} else { //code!='0'
				alertTip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			}
		});
	}
	
	$('#more').on('click',function(){
		if(next){
			currentPage++;
			queryList(currentPage,1);
		}else{
			$('#more').html('我也是有底线的！');
			return;
		}
	});
	
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
	
})();
