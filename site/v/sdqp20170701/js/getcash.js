'use strict';

var dom_bag = document.getElementsByClassName('mybag')[0],
	dom_hb = document.getElementsByClassName('hb')[0],
	dom_cash = document.getElementById('cash'),
	dom_get = document.getElementById('get'),
	dom_repcash = document.getElementById('repcash'),
	dom_mask = document.getElementById('mask'),
	dom_title = document.getElementsByClassName('title')[0],
	dom_getMoney = document.getElementsByClassName('getMoney')[0],
	dom_notice = document.getElementsByClassName('notice')[0],
	dom_btn = document.getElementById('btn'),
	dom_money = document.getElementById('money'),
	dom_repbtn = document.getElementById('repbtn'),
	dom_earnTime = document.getElementById('earnTime'),
	dom_repmoney = document.getElementById('repmoney'),
	dom_rule = document.getElementsByClassName('rule')[0],
	dom_explain = document.getElementsByClassName('explain')[0],
	dom_rep = document.getElementsByClassName('rep')[0],
	dom_once = document.getElementsByClassName('once')[0],
	dom_notice2 = document.getElementsByClassName('notice')[1],
	dom_open = document.getElementsByClassName('open')[0],
	dom_loading = document.getElementsByClassName('loading')[0];

var currentMoney = sessionStorage.currentMoney,
	totalAccountMoney = sessionStorage.totalAccountMoney,
	codeContentUrl = sessionStorage.codeContentUrl,
	openid = sessionStorage.openid,
	args = vge.urlparse(location.href),
	bizcode = args.bizcode,
	hbopenid = args.openid,
	earnTime = sessionStorage.earnTime === undefined ? '' : sessionStorage.earnTime,
	first = sessionStorage.first === undefined ? true : sessionStorage.first,
	again = sessionStorage.again === undefined ? 'false' : sessionStorage.again;

var flag = true,
	num = 1,
	tx = true;

var first = true,
	act = false,
	needAlert = false,
	timer3 = null,
	timer2 = null; //needAlert 弹窗开关 act活动那个推广开关

var weekSignFlag = sessionStorage.weekSignFlag === 'undefined' ? '0' : sessionStorage.weekSignFlag, //是否开户自然周签到，1:开启、0或空:关闭
	weekSignDays = sessionStorage.weekSignDays === 'undefined' ? '' : sessionStorage.weekSignDays, //当前周已签到周几集合
	weekSignEarnFlag = sessionStorage.weekSignEarnFlag === 'undefined' ? '0' : sessionStorage.weekSignEarnFlag, //周签到红包是否已领取，1:已领取、0未领取  2领取签到红包
	weekSignEarnMoney = sessionStorage.weekSignEarnMoney === 'undefined' ? '' : sessionStorage.weekSignEarnMoney, //周签到红包金额
	weekSignLimitDay = sessionStorage.weekSignLimitDay === 'undefined' ? '' : sessionStorage.weekSignLimitDay, //周签到天数限制
	weekSignDiffDay = sessionStorage.weekSignDiffDay === 'undefined' ? '' : sessionStorage.weekSignDiffDay, //周签到还差天数
	weekSignPopup = sessionStorage.weekSignPopup === 'undefined' ? '' : sessionStorage.weekSignPopup, //自然周签到弹出提示，1:弹出提示、0或空:不弹出"
	weekSignPercent = sessionStorage.weekSignPercent === 'undefined' ? '' : sessionStorage.weekSignPercent; //周签到完成百分比

if((weekSignPopup == 1 && weekSignEarnFlag != 1) || act == true) {
	needAlert = true;
}

if(bizcode == '11' || again == 'true') {
	dom_repcash.style.display = 'block';
	dom_earnTime.innerHTML = earnTime;
	dom_repmoney.innerHTML = currentMoney;
	dom_mask.style.display = 'none';
	active();
} else {
	dom_cash.style.display = 'block';
	dom_get.style.display = 'block';
	window.onload = function() {
		animate();
	}
	dom_money.innerHTML = currentMoney;
}

//动画
function animate() {
	dom_hb.className = 'hb hbmv';
	setTimeout(function() {
		dom_bag.className = 'mybag bagmv';
	}, 1500);
}

dom_bag.addEventListener('click', open, false);

function open() {
	dom_open.className = 'open rotate';
	setTimeout(function() {
		cb();
	}, 1000);
	sessionStorage.again = true;
}

function cb() {
	dom_cash.style.opacity = '0';
	dom_get.style.opacity = '1';
	setTimeout(function() {
		dom_cash.style.display = 'none';
		if(weekSignFlag == 1) { //签到开启
			timer3 = setTimeout(function() {
				$('.sign_logo').css('display', 'block'); //签到按钮
				if(weekSignEarnFlag == 1) { //已领取
					$('.sign_title').attr('src', '/v/qpzj/img2/sign_title_2.png');
					$('.sign_logo').css({
						'background': 'url(/v/qpzj/img2/sign_ed.png) no-repeat right',
						'-webkit-background-size': ' auto 100%'
					});
				} else {
					$('.light').css('visibility', 'visible');
					$('#weekSignEarnMoney').css('display', 'none');
					$('.sign_tip').html('本周签到达' + weekSignLimitDay + '天，可额外获得红包1个！');
					$('.sign_cash').css({
						'background': 'url(/v/qpzj/img2/sign_cash.png) no-repeat bottom',
						'-webkit-background-size': '100% auto'
					});
				}
				$('.sign_logo').on('click', function() {
//					_hmt.push(['_trackEvent', 'click', '查看签到红包', 'getcash']);
					$('#sign,.content').css('display', 'block');
				});
				$('.sign_alert').on('click', function() { //签到天数提醒
					$(this).css('display', 'none');
					$('.content').css('display', 'block');
				});
				$('.close').on('click', function() {
					$('#sign').css('display', 'none');
				});
			}, 700);
		}
		if(needAlert) { //需要弹窗推广
			timer2 = setTimeout(function() {
				active();
				if(weekSignPopup == 1 && weekSignEarnFlag != 1) { //每天首次 且未领取签到红包就会弹出提示
					if(weekSignEarnFlag == 2) {
						$('#sign,.getSignCash').css('display', 'block');
						$('.getSignCash').on('click', function() {
							weekSignEarnFlag = '1';
							$('#sign,.light,.getSignCash').css('display', 'none');
							$('.content').css('display', 'block');
							$('.sign_title').attr('src', '/v/qpzj/img2/sign_title_2.png');
							$('.sign_logo').css({
								'background': 'url(/v/qpzj/img2/sign_ed.png) no-repeat right',
								'-webkit-background-size': ' auto 100%'
							});
							$('.sign_tip,#weekSignEarnMoney').css('display', 'block');
							$('.sign_cash').css({
								'background': 'url(/v/qpzj/img2/sign_cash_open.png) no-repeat bottom',
								'-webkit-background-size': '100% auto'
							});
						});
					} else {
						$('#sign,.sign_alert').css('display', 'block');
					}
				} else { //活动推送（手动）
					// document.getElementById('alert').style.display = 'block';
					// document.getElementsByClassName('qrClose')[0].addEventListener('click',function(){
					// 	document.getElementById('alert').style.display = 'none';
					// },false);
				}
			}, 500);
		} else {
			active();
		}
	}, 1000);
}

if(bizcode == 0) {
	//进度条
	$('.progress').html((weekSignLimitDay - weekSignDiffDay) + '/' + weekSignLimitDay);
	$('#progress2').css('width', weekSignPercent * 7.8 / 100 + 'rem');
	$('.days').html(weekSignLimitDay - weekSignDiffDay + '天');
	$('#weekSignEarnMoney').html(weekSignEarnMoney + '元');
	$('.weekSignEarnMoney').html('<span>' + weekSignEarnMoney + '</span>元');

	if(weekSignDays != '') {
		weekSignDays = weekSignDays.split(',').sort();
	}
	var weeks = new Date();
		weeks = (weeks.getDay()+6)%7;
	for(var i=0;i<weeks;i++){//打钩打叉
		document.getElementsByClassName('checks')[i].style.backgroundImage = 'url(/v/sdqp20170701/img2/frok.png)';
	}
//	if(weekSignDays.length > 0) {
//		for(var i = 0; i < weekSignDays[weekSignDays.length - 1]; i++) { //打叉
//			document.getElementsByClassName('checks')[i].style.backgroundImage = 'url(/v/sdqp20170701/img2/frok.png)';
//		}
//	}
	for(var j = 0; j < weekSignDays.length; j++) { //打√
		document.getElementsByClassName('checks')[weekSignDays[j] - 1].style.backgroundImage = 'url(/v/sdqp20170701/img2/check.png)';
	}

}

if(Number(currentMoney) == 0) { //中奖金额为0
	dom_getMoney.style.display = 'none';
	dom_title.innerHTML = '离红包只差一点点！<br>再扫一瓶试试';
	dom_title.style.marginTop = '4rem';
}

if(Number(totalAccountMoney) >= 1) { //大于1元可以提现
	dom_notice.innerHTML = '温馨提示：您的红包累计金额为' + totalAccountMoney + '元，<br>点击上方按钮把钱拿走吧！'
	dom_btn.value = '立即提现';
	dom_repbtn.value = '立即提现';
} else { //小于1元不能提现
	dom_btn.value = '存入我的零钱包';
	dom_repbtn.value = '查看红包余额';
}

function active() {
	if(Number(totalAccountMoney) >= 1) { //大于1元可以提现
		dom_btn.addEventListener('click', function() {
			if(tx) {
				dom_loading.style.display = 'block';
				give_spack();
			}
		}, false);
		dom_repbtn.addEventListener('click', function() {
			if(tx) {
				dom_loading.style.display = 'block';
				give_spack();
			}
		}, false);
	} else { //小于1元不能提现
		dom_btn.addEventListener('click', function() {
			ifremeber(); //判断关注
		}, false);
		dom_repbtn.addEventListener('click', function() {
			ifremeber(); //判断关注
		}, false);
	}
	dom_mask.addEventListener('click', function() {
		ifremeber(); //判断关注
	}, false);
	dom_rule.addEventListener('click', function() {
		window.location.href = 'http://mp.weixin.qq.com/s/U8HDZJw2g2AzfIlAGsU0MA';
	}, false);

	dom_explain.addEventListener('click', function() {
		window.location.href = 'http://mp.weixin.qq.com/s/Dqk1uKbXl4M977XCFhYu0g';
	}, false);
}

function give_spack() { //提现
	var javai = vge.sdqp + '/DBTSDQPInterface/gifts/getGiftspack';
	var req = {
		"openid": openid,
		"hbopenid": hbopenid
	};
	vge.callJApi(javai, req,
		function(jo) {
			dom_loading.style.display = 'none';
			if(jo.result.code == '0') {
				if(jo.result.businessCode === '0') {
					dom_mask.style.display = 'block';
					sessionStorage.txflag = true;
					dom_btn.value = '存入我的零钱包';
					tx = true;
				} else if(jo.result.businessCode === '1') { //1
					title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
					tx = false;
				} else if(jo.result.businessCode === '2') { //1
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
					tx = false;
				} else if(jo.result.businessCode === '4') { //1
					title_tip('提现处理中，请稍后查看详细记录', '我知道了');
					tx = false;
				} else if(jo.result.businessCode === '3') { //1
					title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
					tx = false;
				} else if(jo.result.businessCode === '-1') { //-1
					title_tip('提 示', '提现操作过于频繁，请稍后重试！', '我知道了');
					tx = false;
				} else if(jo.result.businessCode === '-2') { //-1
					title_tip('提 示', '提现操作过于频繁，请稍后重试！', '我知道了');
					tx = false;
				} else if(jo.result.businessCode === '5') { //5
					title_tip('尊敬的用户', jo.result.msg, '我知道了');
				} else {
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
					tx = false;
				}
			} else if(jo.result.code == '-1') {
				title_tip('尊敬的用户', '系统升级中...', '我知道了');
				tx = false;
			} else { //code!='0'
				title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				tx = false;
			}
		});
}

function ifremeber() {
	var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.sdqpappid;
	vge.ajxget(requrl, 5000, function(r) {
		try {
			var o = JSON.parse(r);
			if(o.subscribe == '0') { //未关注
				dom_mask.style.display = 'none';
				window.location.replace('http://' + location.host + '/v/sdqp20170701/attention.html');
			} else { //已关注用户
				dom_mask.style.display = 'none';
				window.location.replace('http://' + location.host + '/sdqp20170701/too/mybag');
			}
		} catch(e) {
			vge.clog('errmsg', [requrl, e]);
		}
	}, function(err) {
		vge.clog('errmsg', [requrl, err]);
	});
}