(function () {
    var openhb = document.getElementsByClassName("open")[0],
        hbpage = document.getElementsByClassName("openhb")[0],
        sign = document.getElementsByClassName("sign")[0],
        btn_tx = document.getElementsByClassName("tixian")[0],
        mark = document.getElementsByClassName("mark")[0],
        dom_alert = document.getElementById("alert"),
        toMybag = document.getElementsByClassName("tomybag")[0],
        dom_sum = document.getElementsByClassName("sum")[0],
        curM1 = document.getElementsByClassName("curMoney")[0],
        curM2 = document.getElementsByClassName("curMoney")[1],
        dom_prompt = document.getElementById("prompt"),
        hb_title = document.getElementById("hb_title"),
        cover = document.getElementsByClassName("hb_cover")[0];
    var dom_rule = document.getElementById("dom_rule"),
        dom_private = document.getElementById("dom_private");
    var openid = sessionStorage.openid === undefined ? '' : sessionStorage.openid,
        args = vge.urlparse(location.href),
        hbopenid = args.openid;
    sessionStorage.hbopenid = hbopenid;
    var second = sessionStorage.again === undefined ? '' : sessionStorage.again;
    dom_rule.addEventListener('click', function () { //活动规则
        _hmt.push(['_trackEvent', 'click', '查看活动规则', 'getcash']);
        location.href = "https://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502813444&idx=1&sn=de1a4e7434fc15e5f7bfdb65284f0012&chksm=087291da3f0518cc45bd77da201bf96bfd88cab6623861d2f148b61a4f240738987d60b83bfb#rd";
    }, false);
    dom_private.addEventListener('click', function () { //隐私说明
        _hmt.push(['_trackEvent', 'click', '查看隐私说明', 'getcash']);
        location.href = "http://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502813343&idx=1&sn=8b2760f63bc497a7dce4816749a2c57f&chksm=087290413f0519572fcaba5a59a1f76f660bb17be3dd9a39a97839236675d309c6123211dc65#rd";
    }, false);

    var signLoc = 0,
        beerLoc = 0,
        changeM = 0,
        flag = true,
        first = true, //提现操作标识
        time = 50000,
        act = true,
        currentMoney = sessionStorage.currentMoney === undefined ? '' : sessionStorage.currentMoney,
        totalAccountMoney = sessionStorage.totalAccountMoney === undefined ? '' : sessionStorage.totalAccountMoney;
	
	
	//图片切换
	if(new Date().getTime() < 1529683200000) { //6.16-6.22
		$('.active img').attr('src', '/v/hnqp20170520/img/20180616.jpg');
	} else if(new Date().getTime() > 1529683200000 && new Date().getTime() < 1530892800000) { //6.30-7.6
		$('.active img').attr('src', '/v/hnqp20170520/img/20180630.jpg');
	} else if(new Date().getTime() > 1530892800000 && new Date().getTime() < 1531670400000) { //7.13-7.15
		$('.active img').attr('src', '/v/hnqp20170520/img/20180713.jpg');
	} else if(new Date().getTime() > 1531670400000 && new Date().getTime() < 1532707200000) { //7.21-7.27
		$('.active img').attr('src', '/v/hnqp20170520/img/20180721.jpg');
	} else if(new Date().getTime() > 1532707200000 && new Date().getTime() < 1533484800000) { //8.3-8.5
		$('.active img').attr('src', '/v/hnqp20170520/img/20180803.jpg');
	} else { //8.5
		$('.active img').attr('src', '/v/hnqp20170520/img/20180803.jpg');
		act = false;
	}
	
    function rander2(x, y) { //随机金钱
        x = Math.floor(Math.random() * 100);
        y = Math.ceil(Math.random() * 100);
        if (y < 10) {
            y = '0' + y;
        } else if (y.toString().charAt(1) === '0') {
            y = y.toString().charAt(0);
        }
        curM1.innerHTML = x + '.' + y;
    }

    function mon_suiji(cb) {
        var n = false,
            x = 0,
            y = 0;
        var timer = setTimeout(function () {
            n = true;
        }, 1000);
        var timer1 = setInterval(function () {
            if (!n) {
                rander2(x, y);
            } else {
                curM2.innerHTML = totalAccountMoney;
                clearInterval(timer1);
                clearTimeout(timer);
                curM1.innerHTML = currentMoney;
            }
        }, 10);
    }

    function hbMove() { //添加动画
        if (totalAccountMoney * 100 >= 100) {
            beerLoc = 100;
        } else if (totalAccountMoney * 100 > 95) {
            beerLoc = 95
        } else {
            beerLoc = totalAccountMoney * 100;
        }

        btn_tx.style.width = beerLoc + "%";
        signLoc = totalAccountMoney * 90 > 83 ? 83 : totalAccountMoney * 90;
        sign.style.left = signLoc + "%";
        if (beerLoc >= 100) {
            var timerBtn = setTimeout(function () {
                btn_tx.disabled = false;
                mark.style.display = 'none';
                btn_tx.value = '立即提现';
                toMybag.value = '查看我的红包';
            }, 1000);
            if (btn_tx.value === '立即提现') {
                clearTimeout(timerBtn);
            }
        }
        //		mon_suiji();
    }

    var data = { "projectServerName": "huanan",
        "openid": openid,
        "sweepstr": sessionStorage.qr,
        "longitude": sessionStorage.longitude === undefined ? '00' : sessionStorage.longitude, //"经度"
        "latitude": sessionStorage.latitude === undefined ? '00' : sessionStorage.latitude //"纬度"
    };

    //	openhb.addEventListener("click",dot,false);
    $('.open').one('click', dot);

    function dot() { //拆红包
        $('.open').css('display', 'none');
        $('#jw_icon').css('display','block');
        $('.open').unbind('click');
        document.getElementById("loading_box").style.display = 'block';
        //		openhb.removeEventListener("click",dot,false);
        if (sessionStorage.strcode == '1') { //由串码进入
            curM1.innerHTML = currentMoney;
            curM2.innerHTML = totalAccountMoney;
            if (Number(totalAccountMoney) >= 1) {
                dom_prompt.innerHTML = '您的累计中奖金额大于等于1元啦，点击下面的按钮把钱拿走吧。';
            }

            if (Number(currentMoney) === 0) {
                dom_sum.style.display = 'none';
                hb_title.style.display = 'block';
                hb_title.innerHTML = window.zeroText2();
                hb_title.style.fontSize = '0.8rem';
                hb_title.style.lineHeight = '1.2rem';
                hb_title.style.marginTop = '0.5rem';
            }

            if (totalAccountMoney * 100 === 0) {
                btn_tx.style.marginLeft = '0.3rem';
            } else {
                btn_tx.style.marginLeft = '0';
            }
            time = 1100;
            setTimeout(hbMove, time);
            cover.className = 'hb_cover rotate';
            if (second == 'again') { //后退处理
                location.href = 'http://' + vge.hnqp_host + '/v/hnqp/fail.html?bizcode=11';
                return;
            }
            sessionStorage.again = 'again';
            var timer2 = setTimeout(function () {
                hbpage.style.opacity = 0;
                document.getElementsByClassName('getmoney')[0].style.opacity = 1;
            }, 1000);
            document.getElementById("loading_box").style.display = 'none';
        } else {
            $.ajax({
                type: "post",
                url: vge.common + '/vjifenInterface/sweep/sweepQrcode',
                async: true,
                data: JSON.stringify(data),
                success: function (jo) {
                    cb(jo);
                }
            });
        }
    }

    function cb(jo) {
        if (jo.result.code == '0') {
            document.getElementById("loading_box").style.display = 'none';
            if (jo.reply) {
                sessionStorage.earnTime = jo.reply.earnTime;
                currentMoney = jo.reply.currentMoney;
                totalAccountMoney = jo.reply.totalAccountMoney;
                sessionStorage.dayScanNum = jo.reply.dayScanNum;
            }
            curM1.innerHTML = currentMoney;
            curM2.innerHTML = totalAccountMoney;
            if (Number(totalAccountMoney) >= 1) {
                dom_prompt.innerHTML = '您的累计中奖金额大于等于1元啦，点击下面的按钮把钱拿走吧。';
            }

            if (Number(currentMoney) === 0) {
                dom_sum.style.display = 'none';
                hb_title.style.display = 'block';
                hb_title.innerHTML = window.zeroText2();
                hb_title.style.fontSize = '0.8rem';
                hb_title.style.lineHeight = '1.2rem';
                hb_title.style.marginTop = '0.5rem';
            }

            if (totalAccountMoney * 100 === 0) {
                btn_tx.style.marginLeft = '0.3rem';
            } else {
                btn_tx.style.marginLeft = '0';
            }
            switch (jo.result.businessCode) {
                case '0':
                    document.getElementById("loading_box").style.display = 'none'; // 普通奖
                    $('.open').one('click', dot);
                    time = 1100;
                    setTimeout(hbMove, time);
                    cover.className = 'hb_cover rotate';
                    if (second == 'again') { //后退处理
                        location.href = 'http://' + vge.hnqp_host + '/v/hnqp/fail.html?bizcode=11';
                        return;
                    }
                    sessionStorage.again = 'again';
                    var timer2 = setTimeout(function () {
                        hbpage.style.opacity = 0;
                        document.getElementsByClassName('getmoney')[0].style.opacity = 1;
                    }, 1000);
                    //广告页
                    if (act&&sessionStorage.dayScanNum=='1') {
                        setTimeout(function () {
                            document.getElementsByClassName('active')[0].style.display = 'block';
                        }, 2000);
                        document.getElementById("active").addEventListener('click', function () {
                            document.getElementsByClassName('active')[0].style.display = 'none';
                            dom_scroll.addEventListener("click", function () {
                                if (first) {
                                    // title_tip('提 示', '微信提现升级中，您可先扫码，红包会自动累积哦', '我知道了');
                                    give_spack(); //提现
                                    first = false;
                                };
                            });
                            dom_btn.addEventListener('click', function () { //查看我的红包
                                _hmt.push(['_trackEvent', 'click', '查看我的红包', 'getcash']);
                                var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.hnqpappid;
                                vge.ajxget(requrl, 5000, function (r) {
                                    try {
                                        var o = JSON.parse(r);
                                        if (o.subscribe == 0) { //未关注
                                            window.location.replace('http://' + location.host + '/v/gdqp/attention.html');
                                        } else { //已关注用户
                                            window.location.replace('http://' + location.host + '/gdqp/too/mybag');
                                        }
                                    } catch (e) {
                                        vge.clog('errmsg', [requrl, e]);
                                    }
                                }, function (err) {
                                    vge.clog('errmsg', [requrl, err]);
                                });
                            });
                        }, false);
                    }
                    break;
                case '11': // 自己重复扫，普通奖
                    document.getElementById("loading_box").style.display = 'none'; // 普通奖
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    location.replace('http://' + location.host + '/v/hnqp/repcash.html');
                    break;
                case '12': // 可疑
                    location.replace('http://' + location.host + '/v/hnqp/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '13': // 黑名单
                    location.replace('http://' + location.host + '/v/hnqp/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '14': // 指定
                    location.replace('http://' + location.host + '/v/hnqp/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                default:
                    if (jo.reply) {
                        sessionStorage.batchName = jo.reply.batchName === undefined ? '' : jo.reply.batchName;
                    }
                    sessionStorage.msg = jo.result.msg;
                    location.replace('http://' + location.host + '/v/hnqp/fail.html?bizcode=' + jo.result.businessCode);
            }

        } else if (jo.result.code == '-1') {
            title_tip('尊敬的用户', '系统升级中，请稍后再试！', '我知道了');
        } else {
            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
        }
    }


    toMybag.addEventListener("click", function () { //查看红包
        _hmt.push(['_trackEvent', 'click', '查看我的红包', 'getcash']);
        var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.hnqpappid;
        vge.ajxget(requrl, 5000, function (r) {
            try {
                var o = JSON.parse(r);
                if (o.subscribe == 0) { //未关注
                    window.location.replace('http://' + location.host + '/v/hnqp/attention.html');
                } else { //已关注用户
                    window.location.replace('http://' + location.host + '/hnqp/too/mybag');
                }
            } catch (e) {
                vge.clog('errmsg', [requrl, e]);
            }
        }, function (err) {
            vge.clog('errmsg', [requrl, err]);
        });
    }, false);
    btn_tx.addEventListener("click", function () { //立即提现
        _hmt.push(['_trackEvent', 'click', '点击提现按钮', 'getcash']);
        if (first) {
            give_spack();
            first = false;
        }
    }, false);


    dom_alert.addEventListener("click", function () {
        var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.hnqpappid;
        vge.ajxget(requrl, 5000, function (r) {
            try {
                var o = JSON.parse(r);
                if (o.subscribe == 0) { //未关注
                    window.location.replace('http://' + location.host + '/v/hnqp/attention.html');
                } else { //已关注用户
                    dom_alert.style.display = 'none';
                }
            } catch (e) {
                vge.clog('errmsg', [requrl, e]);
            }
        }, function (err) {
            vge.clog('errmsg', [requrl, err]);
        });
    }, false);
	
	//酒王战绩
	$('#jw_icon').on('touchstart',function(){
		$('#jiuw_box').fadeIn(1,function(){
			$('#jiuw_box div').css('bottom','0rem');
		});
		$('#jiuw_box .close').on('touchstart',function(){
			$('#jiuw_box div').css('bottom','-11rem');
			$('#jiuw_box').fadeOut(1);
		});
	});	

    function give_spack() {
        _hmt.push(['_trackEvent', 'click', '发送提现请求', 'getcash']);
        //		title_tip('提 示', '微信提现升级中，您可先扫码，红包会自动累积哦！', '我知道了');
        var javai = vge.common + '/vjifenInterface/gifts/getGiftspack';
        var req = { "projectServerName": "huanan",
            "openid": openid,
            "hbopenid": hbopenid
        };
        vge.callJApi(javai, req,
            function (jo) {
                if (jo.result.code == '0') {
                    if (jo.result.businessCode === '0') {
                        dom_alert.style.display = 'block';
                    } else if (jo.result.businessCode === '1') { //1
                        title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
                    } else if (jo.result.businessCode === '4') { //1
                        title_tip('提 示', '提现处理中，请稍后查看详细记录', '我知道了');
                    } else if (jo.result.businessCode === '-2') { //-2
                        title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
                    } else if (jo.result.businessCode === '-1') { //-1
                        title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
                    } else if (jo.result.businessCode === '3') { //1
                        title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
                    } else if (jo.result.businessCode === '2') { //-1
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    } else if (jo.result.businessCode === '5') { //-1
                        title_tip('提 示', jo.result.msg, '我知道了');
                    } else {
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                        first = true;
                    }
                } else { //code!='0'
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    first = true;
                }
            });
    }
})();