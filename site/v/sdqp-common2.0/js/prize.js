(function() {
	'use strict'

	var CHECKCODE_URL = vge.sdqp + '/DBTSDQPInterface/user/getCaptcha';
	var SUBMESSAGE_URL = vge.sdqp + '/DBTSDQPInterface/user/savePrize';
	var RULE_HREF =
		'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503283707&idx=1&sn=74c93bb504b7437bd1a6616d831aa437&chksm=071dda4a306a535c3afc05fa8534c723c28bdbf10695bbf6db509381b61518ed07acaada711e#rd';
	var SECRET_HREF =
		'https://mp.weixin.qq.com/s?__biz=MzA3Mjk3OTY3OA==&mid=503283711&idx=1&sn=e5030c31a17e8beb98e9e430548a4272&chksm=071dda4e306a53584f5eb7dea5102b740fe0ccb09bc6af13b0341170b611f742b25a8dafd764#rd';
	var PHONE_NUM = '4006800899';

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
	var exchangeDate = sessionStorage.exchangeDate === undefined ? '' : sessionStorage.exchangeDate;
	var again = sessionStorage.again === undefined ? '' : sessionStorage.again;
   
	// 活动版本
	var version  = sessionStorage.activityVersion === undefined ? '' : sessionStorage.activityVersion;

	if (exchangeDate != '') {
		var exchangeDateOne = sessionStorage.exchangeDate.split('-');
		exchangeDate = exchangeDateOne[0] + '年' + exchangeDateOne[1] + '月' + exchangeDateOne[2] + '日';
	}
	var args = vge.urlparse(location.href),
		bizcode = args.bizcode;
	$(document).ready(function() {
		if (grandPrizeType == 'p' || grandPrizeType == 'P') { //青啤有一套
			$('.slogan').attr("src", "img/prize2.png?v=1.0.0");
			$('.top .slogan').css('margin', '6rem auto 0');
			$('.beer').attr("src", "img/beer_prize.png");
			$('.explain_sky').css('display', 'none');
			$('.explain').css('display', 'block');
			$('.warning p').html(
				'温馨提示：请尽快拨打<a href="tel:4006800899">400 680 0899</a>核实中奖者身份信息，以下信息须完整、真实填写，否则无法兑奖。<br /> <span class="warnTxt">中奖瓶盖及拉环是唯一兑奖依据，请妥善保管。<br />兑奖时间：工作日下午14:00-17:00</span>'
			);
			$('.alert').css('display', 'block');
			$('.answer').css('display', 'none');
			init();
		} else if (grandPrizeType == 'q' || grandPrizeType == 'Q') { //天空音乐节门票
			if (exchangeDate != '') {
				$('.new_time').html(exchangeDate);
				$('.new_time1').html('兑奖时间：' + exchangeDate + '，11:00-17:00');
			} else {
				$('.new_time1').html('兑奖起止时间:2019年6月1日-2019年6月2日，每天11:00-17:00');
			}
			$('.answer').css('display', 'inline');
			$('.slogan').attr("src", "img/prize1.png");
			$('.top .slogan').css('margin', '6rem auto 0');
			$('.beer').attr("src", "img/beer_prize1.png");
			$('.explain_sky').css('display', 'block');
			$('.explain').css('display', 'none');
			$('.warning').html('<img src="img/prize-tip2.png?v=1.1"  class="warn">')
			$('.alert').css('display', 'none');
			init();
		} else if (grandPrizeType == 'r' || grandPrizeType == 'R') { //张信哲演唱会
			$('.get').addClass('get_vocal');
			$('.ck').val('点击领取');
			$('.slogan').attr("src", "img/vocal.png");
			$('.info .slogan').attr("src", "img/vocal_prize.png");
			$('.explain_ktv').css('display', 'block');
			$('.warning').html('<img src="img/prize-tip3.png?v=1.1"  class="warn">')
			init();
		} else if (grandPrizeType == 's' || grandPrizeType == 'S') { //草莓音乐节门票
			$('.logo').css('display', 'block');
			$('.get').addClass('get_cm');
			$('.ck').val('立即兑奖');
			$('.slogan').attr("src", "img/prize_c.png");
			$('.info .slogan').attr("src", "img/cm_prize.png");
			$('.explain_cm').css('display', 'block');
			$('.warning').html('<img src="img/prize-tip3.png?v=1.1"  class="warn">')
			init();
		} else if (grandPrizeType == 't' || grandPrizeType == 'T') { //电音节门票
			$('.slogan').attr("src", "img/prize3.png");
			$('.top .slogan').css('margin', '6rem auto 0');
			$('.beer').attr("src", "img/beer_prize.png");
			$('.explain_dyj').css('display', 'block');
			$('.explain').css('display', 'none');
			$('.alert').css('display', 'block');
			$('.answer').css('display', 'none');
			init();
		} else if (grandPrizeType == '2') { //黄海足球俱乐部
			$('.newGet').css('display','block');
			$('.newGet img').attr("src", "img/hhzq_prize.jpg");
			$('.slogan').attr("src", "img/prize-zq-slogan.png");
			$('.beer').attr("src", "img/beer_prize1.png");
			$('.explain_hhzq').css('display', 'block');
			$('.explain').css('display', 'none');
			$('.alert').css('display', 'block');
			$('.answer').css('display', 'none');
			$('.warning p').html(
				'温馨提示：请尽快拨打<a href="tel:15588640331">15588640331</a>核实中奖者身份信息，以下信息须完整、真实填写，否则无法兑奖。兑奖当日，中奖者需到活动现场“青岛啤酒官方兑奖处”，提供完整的中奖拉环及中奖电话，作为兑奖依据。'
			).addClass('white_bg');
			init();
		} else if (grandPrizeType == '1') { //凤凰音乐节门票
			$('.newGet').css('display','block');
			$('.newGet img').attr("src", "img/fh_prize.jpg");
			$('.slogan').attr("src", "img/prize-fh-slogan.png");
			$('.beer').attr("src", "img/beer_prize1.png");
			$('.explain_fh').css('display', 'block');
			$('.explain').css('display', 'none');
			$('.alert').css('display', 'block');
			$('.answer').css('display', 'none');
			$('.warning p').html(
				'温馨提示：请尽快拨打<a href="tel:05375797777">0537-5797777</a>或<a href="tel:18561835449">18561835449</a>核实中奖者身份信息，以下信息须完整、真实填写，否则无法兑奖。兑奖当日，中奖者需到活动现场“青岛啤酒官方兑奖处”，提供完整的中奖拉环及中奖电话，作为兑奖依据。'
			).addClass('white_bg');
			init();
		} else if (grandPrizeType == 'V' || grandPrizeType == 'v') { //济南泡泡电音节门票一张
			$('.slogan').attr("src", "img/prize-v.png");
			$('.top .slogan').css('margin', '6rem auto 0');
			$('.beer').attr("src", "img/beer_prize.png");
			$('.explain_pp').css('display', 'block');
			$('.explain').css('display', 'none');
			$('.alert').css('display', 'block');
			$('.answer').css('display', 'none');
			$('.warning p').html(
				'温馨提示：请尽快拨打<a href="tel:4006800899">4006800899</a>核实中奖者身份信息，以下信息须完整、真实填写，否则无法兑奖。兑奖当日，中奖者需到活动现场“青岛啤酒官方兑奖处”，提供完整的中奖拉环及中奖电话，作为兑奖依据。'
			).addClass('white_bg');
			init();
		} else if (grandPrizeType == 'W' || grandPrizeType == 'w') { //烟台MELA电音节门票一张
			$('.slogan').attr("src", "img/prize-w.png");
			$('.top .slogan').css('margin', '6rem auto 0');
			$('.beer').attr("src", "img/beer_prize.png");
			$('.explain_ytjnh').css('display', 'block');
			$('.explain').css('display', 'none');
			$('.alert').css('display', 'block');
			$('.answer').css('display', 'none');
			$('.warning p').html(
				'温馨提示：请尽快拨打<a href="tel:4006800899">4006800899</a>核实中奖者身份信息，以下信息须完整、真实填写，否则无法兑奖。兑奖当日，中奖者需到活动现场“青岛啤酒官方兑奖处”，提供完整的中奖拉环及中奖电话，作为兑奖依据。'
			).addClass('white_bg');
			init();
		} else if (grandPrizeType == 'X' || grandPrizeType == 'x') { //潍坊MELA电音节门票一张
			$('.slogan').attr("src", "img/prize-x.png");
			$('.top .slogan').css('margin', '6rem auto 0');
			$('.beer').attr("src", "img/beer_prize.png");
			$('.explain_wfyyj').css('display', 'block');
			$('.explain').css('display', 'none');
			$('.alert').css('display', 'block');
			$('.answer').css('display', 'none');
			$('.warning p').html(
				'温馨提示：请尽快拨打<a href="tel:4006800899">4006800899</a>核实中奖者身份信息，以下信息须完整、真实填写，否则无法兑奖。兑奖当日，中奖者需到活动现场“青岛啤酒官方兑奖处”，提供完整的中奖拉环及中奖电话，作为兑奖依据。'
			).addClass('white_bg');
			init();
		} else if (grandPrizeType == 'y' || grandPrizeType == 'Y') { //Y等奖青岛白啤6瓶体验券
			$('.get').addClass('get_coupon');
			$('.ck').val('点击领取');
			$('.slogan').attr("src", "img/beerCoupon.png?v=1.0.1");
			$('.info .slogan').attr("src", "img/coupon_prize.png");
			$('.explain_coupon').css('display', 'block');
			$('.tipCoupon').css('display', 'block');
			$('.warning').html('<img src="img/prize-tipCoupon.png?v=1.0.0"  class="warn">')
			init();
		} else if (grandPrizeType == 'z' || grandPrizeType == 'Z') { //鲁能泰山主场中超球票奖
			$('.get').addClass('get_ticket');
			$('.ck').val('点击领取');
			$('.slogan').attr("src", "img/ballTicket.png");
			$('.info .slogan').attr("src", "img/ticket_prize.png");
			$('.explain_ticket').css('display', 'block');
			$('.tipTicket').css('display', 'block');
			$('.warning').html('<img src="img/prize-tipTicket.png"  class="warn">')
			init();
		}  else if (grandPrizeType == 'p01' || grandPrizeType == 'P01') { //黄金冰墩墩
			$('.top .slogan').attr("src", "img/prizeBdd.png");
			$('.top').css({'backgroundImage':'url(img/prizeBg.png)','backgroundRepeat':'no-repeat','backgroundSize': '100%','height': '18.5rem'})
			$('.bddTip').css('display','block');
			$('.top .slogan').css('margin', '4rem auto 0');
			$('.info .slogan').attr("src", "img/infoBdd.png");
			if(version == 3){ // 经典1903
				$('.beer').attr("src", "img/beer1903.png");
				$('.get .beer').css({'width': '1.4rem','right': '0'})
				$('.info .beer').css({'width': '1.4rem','margin-left': '84%'})
			}
			else if(version == 5){ // 纯生8度
				$('.beer').attr("src", "img/beer_prize1.png");
			}
			else if(version == 7){ // 奥古特经典
				$('.beer').attr("src", "img/bear-1.png");
				$('.get .beer').css({'width': '1.4rem','right': '0'})
				$('.info .beer').css({'width': '1.4rem','margin-left': '84%'})
			}else {
			  $('.beer').attr("src", "img/beer_prize.png");
			}
			if(version == 4){ // 白啤10度
				$('.beer').attr("src", "img/qmbp.png");
				$('.get .beer').css({'width': '1.4rem','right': '0'})
				$('.info .beer').css({'width': '1.4rem','margin-left': '84%'})
			}
			$('.explain_bdd').css('display', 'block');
			$('.warning').css('display', 'none');
			$('.alert').css('display', 'block');
			$('.answer').css('display', 'none');
			init();
		} else if (grandPrizeType == 'p02' || grandPrizeType == 'P02') { //邹城市“青岛啤酒大礼包”
			$('.newGet').css('display','block');
			$('.newGet img').attr("src", "img/qp_prize.png");
			$('.slogan').attr("src", "img/prize-qp-slogan.png");
			// $('.beer').attr("src", "img/beer_prize1.png");
			$('.explain_qp').css('display', 'block');
			$('.explain').css('display', 'none');
			$('.alert').css('display', 'block');
			$('.answer').css('display', 'none');
			$('.warning').css('display', 'none');
			init();
		}

		function init() {
			if (bizcode == 15) {
				$('.info').css('display', 'none');
				$('.get,.newGet').css('display', 'none');
				$('.repcash').css('display', 'block');
				$('.earnTime').html(earnTime);
			} else {
				if (again == 'true' || again == true) {
					$('.info').css('display', 'block');
					$('.newGet').css('display','none');
				} else {
					if (idcard != '' && phonenum != '' && username != '') { //已经填写过信息
						$('.get,.newGet').css('display', 'none');
						$('.info').css('display', 'block');
						$('.name').val(username);
						$('.idcard').val(idcard);
						$('.tel').val(phonenum);
						$('.address').val(address);
						$('.name').attr('readOnly', true);
						$('.idcard').attr('readOnly', true);
						$('.tel').attr('readOnly', true);
						$('.address').attr('readOnly', true);
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

		$('.ck,.getBtn').on('click', function() {
			$('.get,.newGet').fadeOut();
			$('.info').fadeIn();
			sessionStorage.again = true;
		});
		// 查看兑奖说明
		$('a.ckbtn').on('click', function() {
			$('div.ckff').css('display', 'block');
		});
		$('a.ckbtn_sky').on('click', function() {
			$('div.ckff_sky').css('display', 'block');
		});
		$('a.ckbtn_vocal').on('click', function() {
			$('div.ckff_vocal').css('display', 'block');
		});
		$('a.ckbtn_cm').on('click', function() {
			$('div.ckff_cm').css('display', 'block');
		});
		$('a.ckbtn_dyj').on('click', function() {
			$('div.ckff_dyj').css('display', 'block');
		});
		$('a.cktel').on('click', function() {
			$('div.cktel').css('display', 'block');
		});
		$('a.ckbtn_fh').on('click', function() {
			$('div.ckff_fh').css('display', 'block');
		});
		$('a.ckbtn_hhzq').on('click', function() {
			$('div.ckff_hhzq').css('display', 'block');
		});
		$('a.ckbtn_pp').on('click', function() {
			$('div.ckff_pp').css('display', 'block');
		});
		$('a.ckbtn_ytjnh').on('click', function() {
			$('div.ckff_ytjnh').css('display', 'block');
		});
		$('a.ckbtn_wfyyj').on('click', function() {
			$('div.ckff_wfyyj').css('display', 'block');
		});
		// 体验券
		$('a.ckbtn_coupon').on('click', function() {
			$('div.ckff_coupon').css('display', 'block');
		});

		// 鲁能泰山主场中超球票
		$('a.ckbtn_ticket').on('click', function() {
			$('div.ckff_ticket').css('display', 'block');
		});

		// 黄金冰墩墩
		$('a.ckbtn_bdd').on('click', function() {
			$('div.ckff_bdd').css('display', 'block');
		});

		// 青岛啤酒礼包
		$('a.ckbtn_qp').on('click', function() {
			$('div.ckff_qp').css('display', 'block');
		});

		//关闭兑奖说明
		$('.closetel').on('click', function() {
			$('div.cktel').css('display', 'none');
		});
		$('.closeff').on('click', function() {
			$('div.change').css('display', 'none');
			$('.answer_box').css('display', 'none');
		});
		$('span.answer').on('click', function() {
			$('.answer_box').css('display', 'block');
		});
		$('.name,.idcard,.tel,.code,.address').keyup(function() {
			if ($(this).val() == '') {
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
				if (jo.result.code == '0') {
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
			if ($('.name').val() === '' || $('.name').val().indexOf(' ') !== -1) {
				title_tip('提 示', '请输入正确的姓名哦！~', '我知道了');
			} else if (!reg1.test($('.tel').val())) {
				title_tip('提 示', '请填写正确的手机号！~', '我知道了');
			} else {
				if ($('.yz').val() === '获取验证码' || $('.yz').val() === '重新获取') {
					$('.yz').unbind();
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
				if (i === 0) {
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
			if ($('.name').val() === '' || $('.name').val().indexOf(' ') !== -1) {
				title_tip('提 示', '请输入正确的姓名哦！~', '我知道了');
			} else if (!reg1.test($('.tel').val())) {
				title_tip('提 示', '请填写正确的手机号！~', '我知道了');
			} else {
				// $('#btn').unbind();
				// setTimeout(function() {
				// 	$('#btn').on('click', function() {
				// 		send();
				// 	})
				// },1000);
				sub_message();
			}
		}

		function sub_message() { // 提交注册信息
			var javai = SUBMESSAGE_URL;
			var req = {
				"openid": openid,
				"unionid": unionid,
				"address": $('.address').val(),
				"username": $('.name').val(),
				"idcard": 'idcard', //$('.idcard').val()
				"skukey": skukey,
				"phonenum": $('.tel').val(),
				"grandPrizeType": grandPrizeType,
				"prizeVcode": prizeVcode,
				"captcha": $('.code').val()
			};
			vge.callJApi(javai, req, function(jo) {
				if (jo.result.code === '0') {
					if (jo.result.businessCode === '0') {
						title_tip('提 示', '您的中奖信息我们已经收到，请尽快拨打兑奖电话联系我们进行身份核实', '我知道了');
						if(grandPrizeType == 'y' || grandPrizeType == 'Y'){ //白啤体验券
							$('.alert').html('温馨提示：请在活动截止前到兑奖单位兑奖');
						}else{
						    $('.alert').html('温馨提示：您的信息已提交成功，请耐心等待主办方与您联系');
						}
						$('#btn').val('提交成功');
						$('#btn').attr('disabled', 'true');
						$('.yz').attr('disabled', 'true');
						$('.code').css('display', 'none');
						$('.yz').css('display', 'none');
						$('.tel').css('border', 'none');
						$('.name').attr('readOnly', 'true');
						$('.idcard').attr('readOnly', 'true');
						$('.tel').attr('readOnly', 'true');
					} else if (jo.result.businessCode == '1') { //1
						title_tip('提 示', '验证码已失效', '我知道了');
					} else if (jo.result.businessCode == '2') { //2
						title_tip('提 示', '您填写的验证码有误', '我知道了');
					} else if (jo.result.businessCode == '-1') {
						title_tip('提 示', '系统升级中...', '我知道了');
					} else if (jo.result.businessCode == '4') {
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
			console.log(RULE_HREF);
			window.location.href = RULE_HREF;
		});
		$('.secret').on('click', function() {
			console.log(SECRET_HREF);
			window.location.href = SECRET_HREF;
		});
	});
})()
