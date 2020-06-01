(function() {
	'use strict';
	
	var args = vge.urlparse(location.href),
		openid = args.openid,
		hbopenid = args.hbopenid;
	
	var current = 0;
	
	$('.question_box').css('display', 'block');

	quesList();
	
	
	function quesList() {
		var javai = vge.terminal + '/DBTVMTSInterface/questionnaire/queryQuestionnaire'; //获取题目
		var req = {
			"openid": openid,
			"questionnaireType": 2 //1酒王  2提现
		};
		vge.callJApi(javai, req, function(jo) {
			if(jo.result.code == '0') {
				if(jo.result.businessCode == '0') {
					showQues(jo.reply.questionList);
				} else if(jo.result.businessCode=='5'){
					location.href = 'http://'+location.host+'/terminal/too/details';
				} else {
					title_tip('尊敬的用户', jo.result.msg, '我知道了');
				}
			} else { //code!='0'
				title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			}
		});
	}
	
	function showQues(questionLists) {
		var questionList = questionLists;
		var w = document.documentElement.clientWidth;
		$('#max').html(questionList.length);
		$('#current').html('1');
		$('#questionnaire').css({'width':w*questionList.length+'px','-webkit-transition': 'all .5s linear'});
		for(var i = 0; i < questionList.length; i++) {
			if(questionList[i].opType == '2') {
				$('#questionnaire').append('<div class="textbox _box" infoKey=' + questionList[i].infoKey + '><p class="title"><b>' + (i + 1) + '.</b><span>（简答）' + questionList[i].title + '</span></p><textarea placeholder="答：" maxlength="500"></textarea></div>');
			} else {
				var options = questionList[i].options.split('@#');
				if(questionList[i].opType == '1') {
					var html = '<div class="check_box _box" infoKey=' + questionList[i].infoKey + '><p class="title"><b>' + (i + 1) + '.</b><span>（多选）' + questionList[i].title + '</span></p>'
					for(var j = 0; j < options.length; j++) {
						html += '<p class="answer"><label><i></i><em></em><input type="checkbox" name="radio2" id="" value="radio" /><span>' + options[j] + '</span></label></p>';
					}
					html += '</div>';
				} else {
					var html = '<div class="radio_box _box" infoKey=' + questionList[i].infoKey + '><p class="title"><b>' + (i + 1) + '.</b><span>（单选）' + questionList[i].title + '</span></p>'
					for(var j = 0; j < options.length; j++) {
						html += '<p class="answer"><label><i></i><em></em><input type="radio" name=' + i + ' id="" value="radio" /><span>' + options[j] + '</span></label></p>';
					}
					html += '</div>';
				}
				$('#questionnaire').append(html);
				$('#questionnaire ._box').css('width',w+'px');
			}
		}
		$('#qus_btn').css('display','block');
		var ans = [];
		$('label').on('mousedown', function() {
			if($(this).parents('._box').attr('class').indexOf('check_box') != -1) {
				if($(this).children('input').prop('checked') == false) {
					$(this).children('i').css('background-image', 'url(/v/terminal/img/check.png)');
				} else {
					$(this).children('i').css('background-image', 'none');
				}
			} else {
				$(this).parents('._box').find('i').css('background-image', 'none');
				$(this).children('i').css('background-image', 'url(/v/terminal/img/check.png)');
			}
		});
		$('#qus_btn').on('click', function(){
			console.log(current>=questionList.length,current,questionList.length);
			if(current>=questionList.length){
				return;
			}else{
				dot(current);
			}
		});

		function dot() {
			$('#current').html(current+1);
			$('#qus_btn').unbind();
			if($('._box').size() > 0){
				if($('._box').eq(current).attr('class').indexOf('radio_box')!=-1){
					$('._box').eq(current).find('i').each(function() {
						if($(this).css('background-image') != 'none') {
							ans.push($(this).parents('._box').attr('infoKey') + '@#' + $(this).siblings('span').html());
						}
					});
				}else if($('._box').eq(current).attr('class').indexOf('check_box')!=-1){
					$('._box').eq(current).each(function() {
						var answ = '';
						$(this).find('i').each(function() {
							if($(this).css('background-image') != 'none') {
								answ += ('@#' + $(this).siblings('span').html());
							}
						});
						if(answ != '') {
							ans.push($(this).attr('infoKey') + answ);
						}
					});
				}
			}
			if(ans.length < current+1){
				title_tip('尊敬的用户', '答案不能为空！', '我知道了', undefined, dott);
			} else {
				current++;
				console.log(ans,current);
				if(current>=questionList.length){//最后一题答完
					ques();
				}else{
					$('#questionnaire').css('margin-left',-w*current+'px');
					$('#current').html(current+1);
					$('#qus_btn').on('click', function(){
						if(current>=questionList.length){
							return;
						}else{
							dot();
						}
					});
				}
			}
		}

		function dott() {
			$('#qus_btn').on('click', function(){
				if(current>=questionList.length){
					return;
				}else{
					dot();
				}
			});
		}

		function ques() {
			var javai = vge.terminal + '/DBTVMTSInterface/questionnaire/saveQuestionnaire'; //提交
			var req = {
				"openid": openid,
				"answer": ans
			};
			vge.callJApi(javai, req, function(jo) {
				if(jo.result.code == '0') {
					if(jo.result.businessCode == '0') {
						title_tip('尊敬的用户', '感谢作答，提交成功！', '我知道了', undefined, give_spack);
					} else {
						$('#qus_btn').css('display','none');
						$('#qus_btn').on('click', function(){
							if(current>=questionList.length){
								return;
							}else{
								dot();
							}
						});
						title_tip('尊敬的用户', jo.result.msg, '我知道了');
					}
				} else { //code!='0'
					$('#qus_btn').on('click', function(){
						if(current>=questionList.length){
							return;
						}else{
							dot();
						}
					});
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				}
			});
		}
	}


	function close() {
		$('.question_box').css('display', 'none');
		location.href = 'http://'+location.host+'/terminal/too/details';
	}
	
	function give_spack() { //提现
		var javai = vge.terminal + '/DBTVMTSInterface/gifts/getGiftspack';
		var req = {
			"openid": openid,
			"hbopenid": hbopenid,
			"questionnaireType":2
		};
		vge.callJApi(javai, req,
			function(jo) {
				if(jo.result.code == '0') {
					if(jo.result.businessCode === '0') {
						title_tip('提 示', '提现成功！', '我知道了', undefined, close);
					} else if(jo.result.businessCode === '1') { //1
						title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
					} else if(jo.result.businessCode === '4') { //1
						title_tip('提 示', '提现处理中，请稍后查看详细记录', '我知道了');
					} else if(jo.result.businessCode === '-2') { //-2
						title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
					} else if(jo.result.businessCode === '2') { //1
						title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
					} else if(jo.result.businessCode === '3') { //1
						title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
					} else if(jo.result.businessCode === '-1') { //-1
						title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
					} else if(jo.result.businessCode === '5') {
						title_tip('提 示', jo.result.msg, '我知道了');
					} else {
						title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
					}
				} else if(jo.result.code == '-1') {
					title_tip('尊敬的用户', '系统升级中...', '我知道了');
				} else { //code!='0'
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				}
			});
	}
	
})();