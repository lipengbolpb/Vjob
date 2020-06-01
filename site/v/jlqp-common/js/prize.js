(function() {
	'use strict'

	var CHECKCODE_URL = vge.jlqp + '/DBTJLQPInterface/user/getCaptcha';
	var SUBMESSAGE_URL = vge.jlqp + '/DBTJLQPInterface/user/savePrize';
	var RULE_HREF = 'https://mp.weixin.qq.com/s?__biz=MzUxNDg5OTU3Nw==&mid=100000678&idx=1&sn=ff0449525974872d9b6189bf29fd7805&chksm=79bfa8b04ec821a6ebe5f6cb1aaa1f9f6466eb2837fb1edcee2d94db59104ad9c28f7a8bb2ca#rd';
	var SECRET_HREF = 'https://mp.weixin.qq.com/s?__biz=MzUxNDg5OTU3Nw==&mid=100000070&idx=1&sn=d4d0c676e1ea5114668fab93fcc70f1d&chksm=79bfaa504ec82346e9b8a039cfe2c0cb485a7f71f87ea2d638bd04a22a282be417e687927cd8#rd';
	
	if(sessionStorage.activityVersion=='5'){//纯干
		RULE_URL = 'https://mp.weixin.qq.com/s?__biz=MzUxNDg5OTU3Nw==&mid=100001024&idx=1&sn=424173f414b5ec747bb44e933fee3205&chksm=79bfae164ec8270088382ebde702918fc76256eebe9b553ff0e18aad762136959b4fd5d74596#rd';
		SECRET_HREF = 'https://mp.weixin.qq.com/s?__biz=MzUxNDg5OTU3Nw==&mid=100001026&idx=1&sn=53173ae0e27246b031950bdf11778f40&chksm=79bfae144ec82702957751ce4394ae19165f2e79765e8a068d31086fd244d49f86bf34070cfe#rd';
	}
	var dom_get = document.getElementsByClassName('yz')[0];

	var reg1 = /^1[0-9]{10}$/, //验证手机号
		reg2 = /^[1-9][0-9xX]{17}$/,   //验证身份证
		// reg2 = /^[1-9][0-7]\d{4}((19\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(19\d{2}(0[13578]|1[02])31)|(19\d{2}02(0[1-9]|1\d|2[0-8]))|(19([13579][26]|[2468][048]|0[48])0229))\d{3}(\d|X|x)?$/, //验证身份证号
		reg3 = /^[0-9]{4}$/;

	var openid = sessionStorage.openid === undefined ? '' : sessionStorage.openid,
		unionid = sessionStorage.unionid === undefined ? '' : sessionStorage.unionid,
		username = sessionStorage.username === undefined ? '' : sessionStorage.username,
		idcard = sessionStorage.idcard === undefined ? '' : sessionStorage.idcard,
		phonenum = sessionStorage.phonenum === undefined ? '' : sessionStorage.phonenum,
		skukey = sessionStorage.skukey === undefined ? '' : sessionStorage.skukey,
		address = sessionStorage.address === undefined ? '' : sessionStorage.address,
		earnTime = sessionStorage.earnTime === undefined ? '' : sessionStorage.earnTime,
		prizeVcode = sessionStorage.prizeVcode === undefined ? '' : sessionStorage.prizeVcode, //具体码
		grandPrizeType = sessionStorage.grandPrizeType === undefined ? '' : sessionStorage.grandPrizeType; //特等奖类别
	var countdowntimer = null;
	var again = sessionStorage.again === undefined ? '' : sessionStorage.again;
	var args = vge.urlparse(location.href),
		bizcode = args.bizcode;
	
	
	$(document).ready(function() {
		if (grandPrizeType == 'P' || grandPrizeType == 'p') { //金币
            $('.prize-one').attr("src","img/prize-ship-slogan.png");
            $('.prize-bg').attr("src","img/prize-ship-slogan2.png");
			init();
			console.log(bizcode);
		} else if (grandPrizeType == 'Q' || grandPrizeType == 'q') { //尖叫之夜演唱会门票
            $('.prize-one').attr("src","img/prize-vocal-slogan.png");
			$('.prize-bg').attr("src","img/prize-vocal-slogan2.png");
			$('.vocal').css('display','block')
			init();
			console.log(bizcode);
        } else{
		   init();
		}

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

		function init() {
			if(bizcode == 15) {
				$('.info').css('display', 'none');
				$('.get').css('display', 'none');
				$('.repcash').css('display', 'block');
				$('.earnTime').html(earnTime);
			} else {
				if(again == 'true' || again == true) {
					$('.info').css('display', 'block');
				} else {
					if(idcard != '' && phonenum != '' && username != '' && address != '') { //已经填写过信息
						$('.get').css('display', 'none');
						$('.info').css('display', 'block');
						$('.name').val(username);
						$('.idcard').val(idcard);
						$('.address').val(address);
						$('.tel').val(phonenum);
						$('.name').attr('readOnly', true);
						$('.idcard').attr('readOnly', true);
						$('.address').attr('readOnly', true);
						$('.tel').attr('readOnly', true);
						$('#btn').attr('disabled', true);
						$('.code').css('display', 'none');
						$('.yz').css('display', 'none');
						$('#btn').val('提交成功');
						$('.alert').html('温馨提示：您的信息已提交成功，请耐心等待主办方与您联系');
					} else {
						$('.get').css('display', 'block');
					}
				}
			}

		}

		$('.ck').on('click', function() {
			$('.get').fadeOut();
			$('.info').fadeIn();
			if(grandPrizeType == 'P' || grandPrizeType == 'p'){ //金币
		      $('.goldCoin').css('display', 'block');
			}
			if(grandPrizeType == 'Q' || grandPrizeType == 'q'){ //爱奇艺尖叫演唱会门票
			  $('.vocalParty').css('display', 'block');
			}
			sessionStorage.again = true;
		});
		$('.ckff').on('click', function() {
			if(grandPrizeType == 'P' || grandPrizeType == 'p'){ //金币
			   $('.exchangeGold').css('display', 'block');
			}
			if(grandPrizeType == 'Q' || grandPrizeType == 'q'){ //爱奇艺尖叫演唱会门票
			   $('.exchangeVocal').css('display', 'block');
			}
		});
		$('.close').on('click', function() {
			if(grandPrizeType == 'P' || grandPrizeType == 'p'){ //金币
				$('.exchangeGold').css('display', 'none');
			 }
			 if(grandPrizeType == 'Q' || grandPrizeType == 'q'){ //尖叫演唱会门票
				$('.exchangeVocal').css('display', 'none');
			 }
			// $('.change').css('display', 'none');
		});
		$('.name,.idcard,.address,.tel,.code').keyup(function() {
			if($(this).val() == '') {
				$(this).css('backgroundImage', 'url(img/input-icon1.png)');
			} else {
				$(this).css('backgroundImage', 'url(img/input-icon2.png)');
			}
		});

		$('.yz').on('click', function() {
			getYzcode();
		});

		$('#btn').on('click', function() {
			send();
		});

		function getCheckCode(cb) { // 获取手机验证码
			var javai = CHECKCODE_URL;
			var req = {
				"phonenum": $('.tel').val()
			};
			vge.callJApi(javai, req, function(jo) {
				if(jo.result.code == '0') {
					if(jo.result.businessCode == '0') {
						cb(); //成功，开始倒计时
					} else if(jo.result.businessCode === '2') {
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
			if($('.name').val() === '' || $('.name').val().indexOf(' ') !== -1) {
				title_tip('提 示', '请输入正确的姓名哦！~', '我知道了');
			} else if(!getIdcardValidateCode($('.idcard').val()) || !reg2.test($('.idcard').val())) {
				title_tip('提 示', '请填写正确的身份证号！~', '我知道了');
			} else if($('.address').val() === '' || $('.address').val().indexOf(' ') !== -1) {
				title_tip('提 示', '请填写正确的邮寄地址！~', '我知道了');
			} else if(!reg1.test($('.tel').val())) {
				title_tip('提 示', '请填写正确的手机号！~', '我知道了');
			} else {
				if($('.yz').val() === '获取验证码' || $('.yz').val() === '重新获取') {
					$('.yz').off('click');
					getCheckCode(function() {
						countdown(dom_get, 60);
					});
				} else {
					$('.yz').off('click');
				}
			}
		}

		function countdown(tag, time) {
			var i = time;
			tag.value = i + '秒';
			countdowntimer = setInterval(function() {
				i--;
				tag.value = i + '秒';
				if(i === 0) {
					tag.value = '重新获取';
					i = time;
					clearInterval(countdowntimer); // 清除定时器
					$('.yz').on('click', function() {
						getYzcode();
					});
					countdowntimer = null;
				}
			}, 1000);
		}

		function send() {
			if($('.name').val() === '' || $('.name').val().indexOf(' ') !== -1) {
				title_tip('提 示', '请输入正确的姓名哦！~', '我知道了');
			} else if(!getIdcardValidateCode($('.idcard').val()) || !reg2.test($('.idcard').val())) {
				title_tip('提 示', '请填写正确的身份证号！~', '我知道了');
			} else if($('.address').val() === '' || $('.address').val().indexOf(' ') !== -1) {
				title_tip('提 示', '请填写正确的邮寄地址！~', '我知道了');
			} else if(!reg1.test($('.tel').val())) {
				title_tip('提 示', '请填写正确的手机号！~', '我知道了');
			} else if(!reg3.test($('.code').val())) {
				title_tip('提 示', '请填写正确的验证码！~', '我知道了');
			} else {
				if(openid==''||openid=='undefined'||prizeVcode==''||prizeVcode=='undefined'){
	        		title_tip('提 示', '信息缺失，无法提交信息！', '我知道了');
	        	}else{
	        		sub_message();
	        	}
			}
		}

		function sub_message() { // 提交注册信息
			var javai = SUBMESSAGE_URL;
			var req = {
				"openid": openid,
				"unionid": unionid,
				"username": $('.name').val(),
				// "idcard": '00000',
				"idcard": $('.idcard').val(),
				"address": $('.address').val(),
				"skukey": skukey,
				"phonenum": $('.tel').val(),
				"grandPrizeType": grandPrizeType,
				"prizeVcode": prizeVcode,
				"captcha": $('.code').val()
			};
			vge.callJApi(javai, req, function(jo) {
				if(jo.result.code === '0') {
					if(jo.result.businessCode === '0') {
						title_tip('提 示', '您的中奖信息我们已经收到，请拨打<br> 0431-81617656联系我们进行身份核实', '我知道了');
						$('.alert').html('温馨提示：您的信息已提交成功，请耐心等待主办方与您联系');
						$('#btn').val('提交成功');
						$('#btn').attr('disabled', 'true');
						$('.yz').attr('disabled', 'true');
						$('.code').css('display', 'none');
						$('.yz').css('display', 'none');
						$('.tel').css('border', 'none');
						$('.name').attr('readOnly', 'true');
						$('.idcard').attr('readOnly', 'true');
						$('.address').attr('readOnly', 'true');
						$('.tel').attr('readOnly', 'true');
					} else if(jo.result.businessCode == '1') { //1
						title_tip('提 示', '验证码已失效', '我知道了');
					} else if(jo.result.businessCode == '2') { //2
						title_tip('提 示', '您填写的验证码有误', '我知道了');
					} else if(jo.result.businessCode == '-1') {
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

		$('.rule').on('click', function() {
			window.location.href = RULE_HREF;
		});
		$('.secret').on('click', function() {
			window.location.href = SECRET_HREF;
		});
	});
})()