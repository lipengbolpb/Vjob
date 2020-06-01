(function() {
	'use strict'

	var CHECKCODE_URL = vge.fjqp + '/DBTFJQPInterface/user/getCaptcha';
	var SUBMESSAGE_URL = vge.fjqp + '/DBTFJQPInterface/user/savePrize';
	var RULE_HREF = 'https://mp.weixin.qq.com/s?__biz=MzIzMTA1NzgzNw==&mid=100000072&idx=1&sn=24e25e5f7ac53a6359152e871cedf69f&chksm=68a8b18a5fdf389c4f52354813015e516965f54389145b17fb889292e6afe9561a0ffea4de78#rd';
	var SECRET_HREF = 'https://mp.weixin.qq.com/s?__biz=MzIzMTA1NzgzNw==&mid=100000074&idx=1&sn=c10dfc97b73983329f2620a388f19359&chksm=68a8b1885fdf389ea3fbf63ea6888f2f46655b860f1edeb59c9a6ec7dfe0be1b8660192791fe#rd';

	var dom_get = document.getElementsByClassName('yz')[0];

	var reg1 = /^1[0-9]{10}$/, //验证手机号
		reg2 = /^[1-9][0-9xX]{17}$/, //验证身份证号
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
	var again = sessionStorage.againprize === undefined ? '' : sessionStorage.againprize;
	var args = vge.urlparse(location.href),
		djqr = false, //强制显示兑奖说明
		bizcode = args.bizcode;

	if(grandPrizeType == 'p' || grandPrizeType == 'P') { //俄罗斯之旅
		$('.repcash .slogan').attr('src', '/v/fjqp-gaosheng/img/prize-ship-slogan2.png');
		$('.top .slogan').attr('src', '/v/fjqp-gaosheng/img/prize-ship-slogan.png');
		$('.ck').css('margin', '2em auto 0');
		$('.idcard').css('display', 'block');
		$('.repcash .slogan,.info .slogan').css('height', '3rem');
		$('.get .slogan').css('margin', '1rem auto');
	} else if(grandPrizeType == '1') { //小米电饭煲
		$('.top .slogan').attr('src', '/v/fjqp-gaosheng/img/prize-ship-slogan3.png');
		$('.prize_box').css('display', 'block');
		$('.prize_box p').html('小米4升IH电饭煲');
		$('.prize_box img,.info .slogan,.repcash .slogan').attr('src', '/v/fjqp-gaosheng/img/prize-ship-dianfanbao.png');
		$('.title p').html('欢聚奖');
		$('.content').html(`<p>小米4升IH电饭煲1个(价值599元，共188个)</p>
                <p>活动区域：福建省
                    <br>活动截止时间：2018年09月30日
                    <br>兑奖截止时间：2019年09月29日</p>`);
		$('.warning p').html('温馨提示：请尽快拨打0592-3663963核实中奖者身份信息，以下信息须完整填写信息，否则无法兑奖。');
		$('.address').css('display', 'block');
		$('.change ul').html(`<li>小米电饭煲中奖者请拨打兑奖咨询电话：0592-3663963咨询兑奖事宜。逾期未要求兑付或逾期中出的奖项将不再兑付。</li>
                    <li>小米电饭煲中奖者需提供完整的中奖拉环及中奖空罐，以及本人身份证复印件供我公司或我公司委托的第三方核实确认，待有奖拉环真实性及中奖者身份信息确认后即可安排兑付奖品。</li>
                    <li>本次活动仅在福建省举行，在该管辖区范围外购得的有奖产品，本公司将不予兑付。</li>
                    <li>本次活动非线上促销，通过任何电子商务平台购得的有奖产品，本公司将不予兑付。</li>
                    <li>注意事项：若遇不可抗力因素，本公司有权取消此活动；中奖者在兑奖过程中发生的任何费用，支出及奖品个人所得税由中奖者自行承担；奖品以实物为准，奖品图片仅供参考，我公司承诺所提供的奖品均为合格品；本次活动奖品不可兑换现金或作价销售。二维码因光线、网络、系统扫描摄像头等原因，可能存在个别扫码不成功情况，敬请谅解；活动详见扫码后网页活动告知。</li>`);
	} else if(grandPrizeType == '2') { //青啤有一套
		$('.top .slogan').attr('src', '/v/fjqp-gaosheng/img/prize-ship-slogan3.png');
		$('.prize_box').css('display', 'block');
		$('.prize_box p').html('青岛啤酒有一套礼盒装');
		$('.prize_box img,.info .slogan,.repcash .slogan').attr('src', '/v/fjqp-gaosheng/img/prize-ship-youyitao.png');
		$('.title p').html('欢聚奖');
		$('.content').html(`<p>青岛啤酒有一套礼盒1个(价值78元，共1888个)</p>
                <p>活动区域：福建省
                    <br>活动截止时间：2018年09月30日
                    <br>兑奖截止时间：2019年09月29日</p>`);
		$('.warning p').html('温馨提示：请尽快拨打0592-3663963核实中奖者身份信息，以下信息须完整填写信息，否则无法兑奖。');
		$('.address').css('display', 'block');
		$('.change ul').html(`<li>青岛啤酒有一套中奖者请拨打兑奖咨询电话：0592-3663963咨询兑奖事宜。逾期未要求兑付或逾期中出的奖项将不再兑付。</li>
                    <li>青岛啤酒有一套中奖者需提供完整的中奖拉环及中奖空罐，以及本人身份证复印件供我公司或我公司委托的第三方核实确认，待有奖拉环真实性及中奖者身份信息确认后即可安排兑付奖品。</li>
                    <li>本次活动仅在福建省举行，在该管辖区范围外购得的有奖产品，本公司将不予兑付。</li>
                    <li>本次活动非线上促销，通过任何电子商务平台购得的有奖产品，本公司将不予兑付。</li>
                    <li>注意事项：若遇不可抗力因素，本公司有权取消此活动；中奖者在兑奖过程中发生的任何费用，支出及奖品个人所得税由中奖者自行承担；奖品以实物为准，奖品图片仅供参考，我公司承诺所提供的奖品均为合格品；本次活动奖品不可兑换现金或作价销售。二维码因光线、网络、系统扫描摄像头等原因，可能存在个别扫码不成功情况，敬请谅解；活动详见扫码后网页活动告知。</li>`);
	}

	$(document).ready(function() {
		init();

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
					if((idcard != '' || address != '') && phonenum != '' && username != '') { //已经填写过信息
						$('.get').css('display', 'none');
						$('.info').css('display', 'block');
						$('.name').val(username);
						$('.idcard').val(idcard);
						$('.tel').val(phonenum);
						$('.address').val(address);
						$('.name').attr('readOnly', true);
						$('.idcard').attr('readOnly', true);
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
			sessionStorage.againprize = true;
		});
		$('.ckff').on('click', function() {
			$('.change').css('display', 'block');
		});
		$('.close').on('click', function() {
			$('.change').css('display', 'none');
			if(djqr) {
				sub_message();
			}
		});
		$('.name,.idcard,.tel,.code,.address').keyup(function() {
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
			} else if((!reg2.test($('.idcard').val()) || !getIdcardValidateCode($('.idcard').val())) && (grandPrizeType == 'p' || grandPrizeType == 'P')) {
				title_tip('提 示', '请填写正确的身份证号哦！~', '我知道了');
			} else if(($('.address').val() === '' || $('.address').val().indexOf(' ') !== -1) && (grandPrizeType == '6' || grandPrizeType == '7')) {
				title_tip('提 示', '请填写正确的收货地址！~', '我知道了');
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
			} else if((!reg2.test($('.idcard').val()) || !getIdcardValidateCode($('.idcard').val())) && (grandPrizeType == 'p' || grandPrizeType == 'P')) {
				title_tip('提 示', '请填写正确的身份证号哦！~', '我知道了');
			} else if(!reg1.test($('.tel').val())) {
				title_tip('提 示', '请填写正确的手机号！~', '我知道了');
			} else if(!reg3.test($('.code').val())) {
				title_tip('提 示', '请填写正确的验证码！~', '我知道了');
			} else if(($('.address').val() === '' || $('.address').val().indexOf(' ') !== -1) && (grandPrizeType == '6' || grandPrizeType == '7')) {
				title_tip('提 示', '请填写正确的收货地址！~', '我知道了');
			} else {
				//      	$('.change').css('display', 'block');
				//      	djqr = true;
				if(openid == '' || openid == 'undefined' || prizeVcode == '' || prizeVcode == 'undefined') {
					title_tip('提 示', '信息缺失，无法提交信息！', '我知道了');
				} else {
					sub_message();
				}
			}
		}

		function sub_message() { // 提交注册信息
			var javai = SUBMESSAGE_URL;
			var req = {
				"openid": openid,
				"unionid": unionid,
				"address": $('.address').val() === '' ? 'address' : $('.address').val(),
				"username": $('.name').val(),
				"idcard": $('.idcard').val()===''?'IDCARD':$('.idcard').val(),
				"skukey": skukey,
				"phonenum": $('.tel').val(),
				"grandPrizeType": grandPrizeType,
				"prizeVcode": prizeVcode,
				"captcha": $('.code').val()
			};
			vge.callJApi(javai, req, function(jo) {
				vge.clog('返回信息', [JSON.stringify(jo)]);
				if(jo.result.code === '0') {
					if(jo.result.businessCode === '0') {
						title_tip('提 示', '您的中奖信息我们已经收到，请拨打中奖页面上的联系电话联系我们进行身份核实', '我知道了');
						$('.alert').html('温馨提示：您的信息已提交成功，请耐心等待主办方与您联系');
						$('#btn').val('提交成功');
						$('#btn').attr('disabled', 'true');
						$('.yz').attr('disabled', 'true');
						$('.code').css('display', 'none');
						$('.yz').css('display', 'none');
						$('.tel').css('border', 'none');
						$('.name').attr('readOnly', 'true');
						$('.idcard').attr('readOnly', 'true');
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
})();