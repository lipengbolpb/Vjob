(function () {
    var dom_hand = document.getElementsByClassName('hand')[0],
        dom_handHb = document.getElementsByClassName('hand_hb')[0],
        dom_fireLeftSmall = document.getElementsByClassName('fireLeftSmall')[0],
        dom_fireLeftBig = document.getElementsByClassName('fireLeftBig')[0],
        dom_cai = document.getElementsByClassName('cai')[0],
        dom_left = document.getElementsByClassName('left')[0],
        dom_right = document.getElementsByClassName('right')[0],
        dom_myhb = document.getElementById('myhb'),
        dom_myhb2 = document.getElementById('myhb2'),
        dom_open = document.getElementsByClassName('open')[1],
        dom_repscan = document.getElementsByClassName('repscan')[0],
        dom_money = document.getElementById('money'),
        dom_totmoney = document.getElementById('totmoney'),
        dom_notice = document.getElementById('notice'),
        dom_cashBox = document.getElementsByClassName('cashBox')[0],
        dom_title = document.getElementsByClassName('title')[0],
        dom_balance = document.getElementsByClassName('balance')[0],
        dom_btn = document.getElementById('btn'),
        dom_explain = document.getElementById('explain'),
        dom_rule = document.getElementById('rule');

    var currentMoney = sessionStorage.currentMoney,
        totalAccountMoney = sessionStorage.totalAccountMoney,
        openid = sessionStorage.openid,
        args = vge.urlparse(location.href),
        bizcode = args.bizcode,
        hbopenid = args.openid,
        first = sessionStorage.first === undefined ? true : sessionStorage.first,
        again = sessionStorage.again === undefined ? false : sessionStorage.again;

    if (Number(totalAccountMoney) >= 1) {
        if (first == true) {
            give_spack();
        }
    }

    if (Number(currentMoney) == 0) {
        dom_title.innerHTML = '离红包只差一点点！<br>再扫一罐试试';
        dom_title.style.top = '3rem';
        dom_title.style.lineHeight = '1.5rem';
        dom_balance.style.display = 'none';
    }

    if (bizcode == 11 || again == 'true') {
        events();
        dom_myhb.style.display = 'none';
        dom_cashBox.style.display = 'block';
        dom_cai.style.display = 'none';
        dom_hand.style.display = 'none';
        dom_handHb.style.display = 'none';
        dom_left.style.display = 'none';
        dom_right.style.display = 'none';
        document.getElementById('open').style.backgroundColor = 'rgba(0,0,0,0.2)';
        dom_repscan.style.display = 'block';
    } else {
        setTimeout(function () {
            dom_hand.className = 'hand active';
            setTimeout(function () {
                dom_hand.style.display = 'none';
                dom_myhb.style.display = 'none';
                dom_fireLeftSmall.style.display = 'none';
                dom_fireLeftBig.style.display = 'none';
                dom_handHb.style.display = 'block';
                setTimeout(function () {
                    dom_handHb.className = 'hand_hb route1';
                    setTimeout(function () {
                        dom_handHb.className = 'hand_hb route2';
                        dom_myhb.className = 'hb';
                        setTimeout(function () {
                            dom_handHb.src = '/v/scqp/img/hand.png';
                            dom_myhb.style.display = 'block';
                            setTimeout(function () {
                                dom_cai.style.display = 'none';
                                dom_hand.style.display = 'none';
                                dom_handHb.style.display = 'none';
                                dom_left.style.display = 'none';
                                dom_right.style.display = 'none';
                                dom_myhb.style.display = 'none';
                                dom_myhb2.style.display = 'block';
                                document.getElementById('open').style.backgroundColor = 'rgba(0,0,0,0.2)';
                            }, 1200);
                        }, 150);
                    }, 150);
                }, 100);
            }, 800);
            // }, 1000);
        }, 5200); //加载中秋节广告，火锅动画推后4.2s
    }



    if (Number(totalAccountMoney) >= 1) {
        dom_totmoney.innerHTML = totalAccountMoney;
    } else if (Number(totalAccountMoney) < 1) {
        dom_btn.value = '存入我的零钱包';
        dom_notice.innerHTML = '根据微信平台要求，红包累计大于等于1元后可提现，<br />不足1元的红包我们为您贴心准备了零钱包功能';
    }
    currentMoney = Number(currentMoney).toFixed(2);
    dom_money.innerHTML = currentMoney;

    dom_open.addEventListener('click', function () {
        dom_open.className = 'open kai';
        sessionStorage.again = true;
        setTimeout(function () {
            dom_myhb2.style.display = 'none';
            dom_cashBox.style.display = 'block';
            events();
			// setTimeout(function(){
			// 	if(Number(sessionStorage.dayScanNum)<2){
			// 		//酒王
			// 		$('#jw_box').fadeIn(10);
			// 		$('#jw_box .jw_content img').eq(0).css({'top':'0','opacity':1});
			// 		$('#jw_box .jw_content img').eq(1).css({'top':'1.2rem','opacity':1});
			// 		$('#jw_box .jw_content img').eq(2).css({'top':'2.35rem','opacity':1});
			// 		$('#jw_box .jw_content img').eq(3).css({'top':'4.75rem','opacity':1});
			// 		$('.jw_person').addClass('move');
			// 	}
			// },1300);
        }, 1000);
    }, false);

    //	document.getElementById("active").addEventListener('click',function(){
    //		document.getElementById("active").style.display = 'none';	
    //		events();
    //	},false);

    function events() {
        dom_btn.addEventListener('click', function () {
            var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.scqpappid;
            vge.ajxget(requrl, 5000, function (r) {
                try {
                    var o = JSON.parse(r);
                    if (o.subscribe == 0) { //未关注
                        window.location.replace('http://' + location.host + '/v/scqp/attention.html');
                    } else { //已关注用户
                        window.location.replace('http://' + location.host + '/scqp/too/mybag');
                    }
                } catch (e) {
                    vge.clog('errmsg', [requrl, e]);
                }
            }, function (err) {
                vge.clog('errmsg', [requrl, err]);
            });
        }, false);

        dom_explain.addEventListener('click', function () {
            window.location.href = 'https://mp.weixin.qq.com/s/ALdH9zjDf8kKyecKjW5e1w';
        }, false);
        dom_rule.addEventListener('click', function () { //活动规则
            window.location.href = 'https://mp.weixin.qq.com/s/ZJB1LbtDT4-AD8GN2gezRA';
        }, false);
		//酒王
		// $('.jw_btn').on('click',function(){
		// 	$('#jw_box').fadeIn(10);
		// 	$('#jw_box .jw_content img').eq(0).css({'top':'0','opacity':1});
		//     $('#jw_box .jw_content img').eq(1).css({'top':'1.2rem','opacity':1});
		//     $('#jw_box .jw_content img').eq(2).css({'top':'2.35rem','opacity':1});
		//     $('#jw_box .jw_content img').eq(3).css({'top':'4.75rem','opacity':1});
		// 	$('.jw_person').addClass('move');
		// });
		// $('#jw_box .jw_close').on('click',function(){
		// 	$('#jw_box').css('display','none');
		// });
    }

    function give_spack() {
        var javai = vge.common+ '/vjifenInterface/gifts/getGiftspack';
        var req = { "projectServerName": "sichuan",
            "openid": openid,
            "hbopenid": hbopenid
        };
        vge.callJApi(javai, req,
            function (jo) {
                if (jo.result.code == '0') {
                    if (jo.result.businessCode === '0') {
                        sessionStorage.first = false;
                        sessionStorage.tx = totalAccountMoney;
                    } else if (jo.result.businessCode === '1') { //1
                        sessionStorage.first = false;
                        title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
                    } else if (jo.result.businessCode === '-1') { //-1
                        title_tip('提 示', '系统升级中...', '我知道了');
                    } else if (jo.result.businessCode === '-2') { //-1
                        title_tip('提 示', '提现操作过于频繁', '我知道了');
                    } else if (jo.result.businessCode === '2') { //-1
                        sessionStorage.first = true;
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    } else if (jo.result.businessCode === '3') { //-1
                        title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
                    } else if (jo.result.businessCode === '4') {
                        title_tip('提现处理中，请稍后查看详细记录', '我知道了');
                    } else if (jo.result.businessCode === '5') { //5
                        title_tip('尊敬的用户', jo.result.msg, '我知道了');
                    } else {
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                        sessionStorage.first = true;
                    }
                } else { //code!='0'
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    sessionStorage.first = true;
                }
            });
    }

})();