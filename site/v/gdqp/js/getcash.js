(function () {
    //获取页面元素
    var dom_getcash = document.querySelector('.getcash'),
        dom_headUp = document.querySelector('.headUp'),
        dom_headDown = document.querySelector('.headDown'),
        dom_open = document.querySelector('.open'),
        dom_packets = document.querySelector('.packets'),
        dom_text = document.querySelector('#text'),
        dom_doller1 = document.querySelector('#doller1'),
        dom_doller2 = document.querySelector('#doller2'),
        dom_prompt = document.querySelector('.prompt'),
        dom_scroll = document.querySelector('#scroll'),
        dom_sign = document.querySelector('.sign'),
        dom_btn = document.querySelector('#btn'),
        dom_left = document.querySelector('#left'),
        dom_right = document.querySelector('#right'),
        dom_mark = document.querySelector('#mark'),
        dom_money = document.querySelector('#money'),
        dom_wxmark = document.querySelector('.wxmark');

    var month = new Date().getMonth(),
        day = new Date().getDate();

    var beerLoc = 0,
        signLoc = 0,
        changeM = 0,
        flag = true,
        first = true;
    var args = vge.urlparse(location.href),
        bizcode = args.bizcode,
        hbopenid = args.openid;
    var openid = sessionStorage.openid === undefined ? '' : sessionStorage.openid;
    var currentMoney = sessionStorage.currentMoney === undefined ? '' : sessionStorage.currentMoney;
    var chu_mon = sessionStorage.totalAccountMoney === undefined ? 0 : sessionStorage.totalAccountMoney;
    var second = sessionStorage.again === undefined ? '' : sessionStorage.again;

    document.getElementById("scan_time").innerHTML = sessionStorage.earnTime;


	
	$('.icon_game').on('click',function(){
		location.href = 'http://w.vjifen.com/v/dice/index.html?province=hn_1';
	});
    if (bizcode === '0') { //第一次扫码
        dom_getcash.style.display = 'block';
        dom_packets.style.display = 'none';
        document.getElementById("repscan").style.display = 'none';
    } else {
        dom_scroll.addEventListener("click", function () {
            if (first) {
                give_spack(); //提现
                first = false;
            };
        });

        dom_doller1.innerHTML = currentMoney;
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
        dom_getcash.style.display = 'none';
        dom_packets.style.display = 'block';
        document.getElementById("repscan").style.display = 'block';
        $('#btn-to-home').css('display', 'none');
        var timer = setTimeout(function () {
            hbMove();
        }, 1000);
        if (currentMoney == 0) {
            dom_text.innerHTML = window.zeroText();
            dom_money.style.display = 'none';
            dom_text.style.fontSize = '0.7rem';
            dom_text.style.marginTop = '2.8rem';
            dom_text.style.lineHeight = '1.2rem';
        }
        if (parseInt(chu_mon) < 1) {
            dom_btn.innerHTML = '存入我的零钱包';
            dom_prompt.innerHTML = '温馨提示：根据微信平台要求，红包累计大于等于1元后可提现。不足1元的红包我们为您贴心准备了零钱包功能，快点击下方按钮存钱吧~';
        }
        if (parseInt(chu_mon) >= 1) {
            dom_btn.innerHTML = '查看我的红包';
            dom_prompt.innerHTML = '温馨提示：您的红包累计金额为' + chu_mon + '元，点击下面按钮把钱拿走吧！';
        }
    }

    var data = { "projectServerName": "huanan",
        "openid": openid,
        "sweepstr": sessionStorage.qr,
        "longitude": sessionStorage.longitude === undefined ? '00' : sessionStorage.longitude, //"经度"
        "latitude": sessionStorage.latitude === undefined ? '00' : sessionStorage.latitude //"纬度"
    };

    $('.open').one('click', dot);

    function dot() {
        $('.open').css('display', 'none');
        $('.open').unbind('click');
        document.getElementById("loading_box").style.display = 'block';
        if (sessionStorage.strcode == '1') { //串码进入
            currentMoney = sessionStorage.currentMoney;
            chu_mon = sessionStorage.totalAccountMoney;
            dom_headDown.className = 'headDown headDownAnm';
            if (second == 'again') { //后退处理
                location.href = 'http://' + vge.hnqp_host + '/v/gdqp/fail.html?bizcode=11';
                return;
            }
            sessionStorage.again = 'again';
            if (currentMoney == 19.03) { //1903
                location.replace('http://' + location.host + '/gdqp/txo/1903?bizcode=' + bizcode);
            } else {
                var timer3 = setTimeout(function () {
                    dom_getcash.style.display = 'none';
                    dom_packets.style.display = 'block';
                    //				mon_suiji();
                    var timer2 = setTimeout(function () {
                        hbMove();
                    }, 1000);
                    dom_doller1.innerHTML = currentMoney;
                    if (currentMoney == 0) {
                        dom_text.innerHTML = window.zeroText();
                        dom_money.style.display = 'none';
                        dom_text.style.fontSize = '0.7rem';
                        dom_text.style.marginTop = '2.8rem';
                        dom_text.style.lineHeight = '1.2rem';
                    }
                    if (parseInt(chu_mon) < 1) {
                        dom_btn.innerHTML = '存入我的零钱包';
                        dom_prompt.innerHTML = '温馨提示：根据微信平台要求，红包累计大于等于1元后可提现。不足1元的红包我们为您贴心准备了零钱包功能，快点击下方按钮存钱吧~';
                    }
                    if (parseInt(chu_mon) >= 1) {
                        dom_btn.innerHTML = '查看我的红包';
                        dom_prompt.innerHTML = '温馨提示：您的红包累计金额为' + chu_mon + '元，点击下面按钮把钱拿走吧！';
                    }
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
                }, 1200);
                document.getElementById("loading_box").style.display = 'none';
            }
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
                chu_mon = jo.reply.totalAccountMoney;
            }
            dom_doller1.innerHTML = currentMoney;
            switch (jo.result.businessCode) {
                case '0': // 普通奖
                    $('.open').one('click', dot);
                    document.getElementById("loading_box").style.display = 'none';
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    if (second == 'again') { //后退处理
                        location.href = 'http://' + vge.hnqp_host + '/v/gdqp/fail.html?bizcode=11';
                        return;
                    }
                    dom_headDown.className = 'headDown headDownAnm';
                    sessionStorage.again = 'again';
                    if (sessionStorage.currentMoney == 19.03) { //1903
                        location.replace('http://' + location.host + '/gdqp/txo/1903?bizcode=' + jo.result.businessCode);
                    }
                    var timer4 = setTimeout(function () {
                        dom_getcash.style.display = 'none';
                        dom_packets.style.display = 'block';
                        //					mon_suiji();
                        var timer6 = setTimeout(function () {
                            hbMove();
                        }, 1000);
                        dom_doller1.innerHTML = currentMoney;
                        if (currentMoney == 0) {
                            dom_text.innerHTML = window.zeroText();
                            dom_money.style.display = 'none';
                            dom_text.style.fontSize = '0.7rem';
                            dom_text.style.marginTop = '2.8rem';
                            dom_text.style.lineHeight = '1.2rem';
                        }
                        if (parseInt(chu_mon) < 1) {
                            dom_btn.innerHTML = '存入我的零钱包';
                            dom_prompt.innerHTML = '温馨提示：根据微信平台要求，红包累计大于等于1元后可提现。不足1元的红包我们为您贴心准备了零钱包功能，快点击下方按钮存钱吧~';
                        }
                        if (parseInt(chu_mon) >= 1) {
                            dom_btn.innerHTML = '查看我的红包';
                            dom_prompt.innerHTML = '温馨提示：您的红包累计金额为' + chu_mon + '元，点击下面按钮把钱拿走吧！';
                        }
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
                        //广告页
                        if (new Date().getTime() > 1556640000000 && new Date().getTime() < 1556985600000) {
                            setTimeout(function () {
                                document.getElementsByClassName('active')[0].style.display = 'block';
                            }, 2000);
                            document.getElementsByClassName("active")[0].addEventListener('click', function () {
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
                    }, 1200);
                    break;
                case '11':
                    document.getElementById("loading_box").style.display = 'none';
                    if (sessionStorage.currentMoney == 19.03) { //1903
                        location.replace('http://' + location.host + '/gdqp/txo/1903?bizcode=' + jo.result.businessCode);
                    } else {
                        location.replace('http://' + location.host + '/gdqp/txo/getcash?bizcode=' + jo.result.businessCode);
                    }
                    break;
                case '12': // 可疑
                    location.replace('http://' + location.host + '/v/gdqp/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '13': // 黑名单
                    location.replace('http://' + location.host + '/v/gdqp/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '14': // 指定
                    location.replace('http://' + location.host + '/v/gdqp/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                default:
                    if (jo.reply) {
                        sessionStorage.batchName = jo.reply.batchName === undefined ? '' : jo.reply.batchName;
                    }
                    sessionStorage.msg = jo.result.msg;
                    location.replace('http://' + location.host + '/v/gdqp/fail.html?bizcode=' + jo.result.businessCode);
            }

        } else if (jo.result.code == '-1') {
            title_tip('尊敬的用户', '系统升级中，请稍后再试！', '我知道了');
        } else if (jo.result.code == '1') {
            title_tip('尊敬的用户', jo.result.msg, '我知道了');
        } else {
            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
        }
    }


    // 活动规则和隐私说明事件
    dom_left.addEventListener('click', function () { //活动规则
        _hmt.push(['_trackEvent', 'click', '查看活动规则', 'getcash']);
        location.href = "https://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502813444&idx=1&sn=de1a4e7434fc15e5f7bfdb65284f0012&chksm=087291da3f0518cc45bd77da201bf96bfd88dd3ab0b32aa68983d8924f240738987d60b83bfb#rd";
    }, false);
    dom_right.addEventListener('click', function () { //隐私说明
        _hmt.push(['_trackEvent', 'click', '查看隐私说明', 'getcash']);
        location.href = "http://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502813351&idx=1&sn=ffe8b0e5c615e4b1b230e9a920dac728&chksm=087290793f05196feadb4ab48d9867b62ef7f2198ce01b7fc8e2bd97f93077fc4f902998e312#rd";
    }, false);

    dom_wxmark.addEventListener("click", function () { //我知道了
        var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.hnqpappid;
        vge.ajxget(requrl, 5000, function (r) {
            try {
                var o = JSON.parse(r);
                if (o.subscribe == 0) { //未关注
                    window.location.replace('http://' + location.host + '/v/gdqp/attention.html');
                } else { //已关注用户
                    dom_wxmark.style.display = 'none'; //显示遮罩层
                }
            } catch (e) {
                vge.clog('errmsg', [requrl, e]);
            }
        }, function (err) {
            vge.clog('errmsg', [requrl, err]);
        });
    });


    //红包金额随机特效
    function rander(x, y) {
        x = Math.floor(Math.random() * 100);
        y = Math.ceil(Math.random() * 100);
        if (y < 10) {
            y = '0' + y;
        } else if (y.toString().charAt(1) === '0') {
            y = y.toString().charAt(0);
        }
        dom_doller1.innerHTML = x + '.' + y;
    }

    function mon_suiji(cb) {
        var n = false,
            x = 0,
            y = 0;
        //		var timer = setTimeout(function() {
        //			n = true;
        //			hbMove();
        //		},1500);
        var timer1 = setInterval(function () {
                if (!n) {
                    rander(x, y);
                } else {
                    dom_doller1.innerHTML = currentMoney;
                    clearInterval(timer1);
                    //				clearTimeout(timer);
                    // cb();
                }
            },
            20);
    }

    function hbMove() { //进度条动画
        dom_doller2.innerHTML = chu_mon;
        beerLoc = chu_mon * 100 > 100 ? 100 : chu_mon * 100;
        signLoc = chu_mon * 90 > 83 ? 83 : chu_mon * 90;
        for (var i = 0; i < beerLoc + 1; i++) {
            dom_scroll.style.width = i + "%";
        }
        for (var j = 0; j < signLoc + 1; j++) {
            dom_sign.style.left = j + "%";
        }
        if (chu_mon >= 1) {
            setTimeout(function () {
                dom_scroll.disabled = false;
                dom_mark.style.display = 'none';
                dom_scroll.value = '立即提现';
            }, 1500)
        }
    }

    //发红包接口
    function give_spack() {
        _hmt.push(['_trackEvent', 'click', '点击提现按钮', 'getcash']);
        var javai = vge.common + '/vjifenInterface/gifts/getGiftspack';
        var req = { "projectServerName": "huanan",
            "openid": openid,
            "hbopenid": hbopenid
        };
        vge.callJApi(javai, req,
            function (jo) {
                if (jo.result.code == '0') {
                    if (jo.result.businessCode === '0') {
                        dom_wxmark.style.display = 'block'; //显示遮罩层
                    } else if (jo.result.businessCode === '1') { //1
                        title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
                    } else if (jo.result.businessCode === '-2') { //-2
                        title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
                    } else if (jo.result.businessCode === '-1') { //-1
                        title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
                    } else if (jo.result.businessCode === '2') { //-1
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    } else if (jo.result.businessCode === '3') { //-1
                        title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
                    } else if (jo.result.businessCode === '4') {
                        title_tip('尊敬的用户', '提现处理中，请稍后查看详细记录!', '我知道了');
                    } else if (jo.result.businessCode === '5') { //-1
                        title_tip('提 示', jo.result.msg, '我知道了');
                    } else {
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                        // first = true;
                    }
                } else { //code!='0'
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    // first = true;
                }
            });
    }


     // 送酒上门按钮
    addNewBtn();

    function addNewBtn() {
        // if (bizcode == 11 || again == 'true') {
        //     $('#btn-to-home').css('display', 'none');
        //     console.log($('#btn-to-home'));
        // }
        $('#btn-to-home').click(function () {
            try {
                setTimeout(function () {
                    window.location.href = 'https://a.scene.divh5.net/ls/2Pj5EJw5';
                }, 10);
                _hmt.push(['_trackEvent', 'click', '领取红包页', '点击送酒上门按钮-华南']);
            } catch (e) {

            }
        })
    }
})()