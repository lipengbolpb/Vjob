var currentMoney = sessionStorage.currentMoney,
    totalAccountMoney = sessionStorage.totalAccountMoney,
    earnTime = sessionStorage.earnTime,
    openid = sessionStorage.openid,
    args = vge.urlparse(location.href),
    bizcode = args.bizcode,
    first = true,
    hbopenid = args.openid;
var prizeType = sessionStorage.prizeType,
    activityScanCount = sessionStorage.activityScanCount;
var skukeyList = ['241510936-001', '241510936-003', '241510936-005', '241510936-008', '241510936-010', '241510936-011'];

var flag = 2, //拉链控制
    tx = true, //提现控制
    again = sessionStorage.again === undefined ? false : true; //重复扫控制

var dom_zip = document.getElementsByClassName('zip')[0],
    dom_zipper = document.getElementsByClassName('zipper')[0],
    dom_slogan = document.getElementsByClassName('slogan')[0],
    dom_slogan2 = document.getElementsByClassName('slogan')[1],
    dom_mt = document.getElementsByClassName('mt')[0],
    dom_mb = document.getElementsByClassName('mb')[0],
    dom_cr = document.getElementsByClassName('cr')[0],
    dom_cl = document.getElementsByClassName('cl')[0],
    dom_r1 = document.getElementsByClassName('r1')[0],
    dom_r2 = document.getElementsByClassName('r2')[0],
    dom_bl = document.getElementsByClassName('bl')[0],
    dom_br = document.getElementsByClassName('br')[0],
    dom_mountain = document.getElementsByClassName('mountain')[0],
    dom_hb = document.getElementsByClassName('hb')[0],
    dom_back = document.getElementsByClassName('back')[0],
    dom_cap = document.getElementsByClassName('cap')[0],
    dom_get = document.getElementsByClassName('get')[0],
    dom_cash = document.getElementsByClassName('cash')[0],
    dom_repcash = document.getElementsByClassName('repcash')[0],
    dom_explain = document.getElementsByClassName('explain')[0],
    dom_rule = document.getElementsByClassName('rule')[0],
    dom_mask = document.getElementsByClassName('mask')[0],
    dom_loading = document.getElementsByClassName('loading')[0],
    dom_getmoney = document.getElementsByClassName('getmoney')[0],
    dom_link = document.getElementsByClassName('link')[0],
    dom_top = document.getElementsByClassName('top')[0],
    dom_middle = document.getElementsByClassName('middle')[0],
    dom_bottom = document.getElementsByClassName('bottom')[0],
    dom_alertClose = document.getElementsByClassName('alertClose')[0],
    //  dom_iknow = document.getElementById('iknow'),
    dom_alert = document.getElementById('active'),
    dom_money = document.getElementById('money'),
    dom_getted = document.getElementById('getted'),
    dom_btn = document.getElementById('btn'),
    dom_ck = document.getElementById('ck'),
    dom_earnTime = document.getElementById('earnTime'),
    dom_hundred = document.getElementsByClassName('hundred')[0],
    dom_hundredMoney = document.getElementsByClassName('hundred-money')[0],
    dom_hundredSlogan = document.getElementsByClassName('hundred-slogan')[0],
    dom_hundredBtn = document.getElementsByClassName('hundred-btn')[0];

window.onload = function () {
    var timer1 = setInterval(function () { //拉链动画
        if (flag <= 3) {
            dom_zip.src = 'http://' + location.host + '/v/hbqp20170626/img/zip' + flag + '.png';
            flag++;
        } else {
            dom_zip.style.display = 'none';
            dom_zipper.style.display = 'none';
            clearInterval(timer1);
            cash();
        }
    }, 300);
    initCanvas(); //调取刮刮卡
}

currentMoney = Number(currentMoney).toFixed(2);
dom_money.innerHTML = currentMoney;

dom_back.addEventListener('touchstart', open, false);
dom_cap.addEventListener('touchstart', open, false);
dom_bl.addEventListener('touchstart', open, false);
dom_br.addEventListener('touchstart', open, false);
dom_r1.addEventListener('touchstart', open, false);
dom_r2.addEventListener('touchstart', open, false);

function cash() { //拆红包动画
    dom_r1.className = 'r1 rotate1';
    dom_r2.className = 'r2 rotate2';
    dom_bl.className = 'bl bottleL';
    dom_br.className = 'br bottleR';
}

function open() {
    if (first) {
        first = false;
        dom_alert.style.display = 'block';
        dom_alert.style.opacity = 0;
        sessionStorage.again = true;
        if (prizeType == 'D') {
            if (activityScanCount % 10000 == 0) {
                dom_hundredSlogan.src = '/v/hbqp20171206/img/hundred-3.png';
            } else if (activityScanCount % 1000 == 0) {
                dom_hundredSlogan.src = '/v/hbqp20171206/img/hundred-2.png';
            } else if (activityScanCount % 100 == 0) {
                dom_hundredSlogan.src = '/v/hbqp20171206/img/hundred-1.png';
            }
            document.getElementById('cardCanvas').style.display = 'none';
            dom_hundredMoney.innerHTML = currentMoney;
            dom_hundred.style.display = 'block';
            dom_slogan.className = 'slogan sloganFade';
            dom_cr.className = 'cr crRight';
            dom_cl.className = 'cl crLeft';
            dom_back.className = 'back backFade';
            dom_cap.className = 'cap capFade';
            dom_mountain.className = 'mountain sloganFade';
            dom_hb.className = 'hb hbFade';
            dom_get.className = 'get gethide';
            dom_cash.style.display = 'block';
            dom_cash.className = 'cash cashshow';
            dom_get.addEventListener('webkitAnimationEnd', function () {
                dom_get.style.display = 'block';
                dom_get.style.opacity = 0;
                dom_get.style.zIndex = 1;
            }, false);
            if (sessionStorage.skukey == '241510936-003') {
                setTimeout(function () {
                    dom_alert.style.opacity = 1;
                    var timer6 = setTimeout(function () {
                        dom_get.style.display = 'none';
                        dom_alert.style.display = 'none';
                    }, 3000);
                    dom_alert.addEventListener('touchstart', function () {
                        dom_alert.style.display = 'none';
                        dom_get.style.display = 'none';
                        clearTimeout(timer6);
                    }, false);
                }, 2000);
            } else {
                dom_alert.style.display = 'none';
                dom_get.style.display = 'none';
            }
        } else {
            var per = Math.floor(Math.random() * 9 + 1) / 10, //控制随机区间0.1-0.9
                cur = 0,
                cav = 0,
                com = 0;
            if (skukeyList.indexOf(sessionStorage.skukey) != -1) {
                per = 0.9;
            }
            cur = (currentMoney * per).toFixed(2);
            cav = (currentMoney - cur).toFixed(2);
            if (cur <= 0.1 && cav <= 0.1) {
                cur = currentMoney;
                $('.canvas_money').html('谢谢惠顾');
            } else if (cur <= 0.1 && cav > 0.1) {
                com = cur;
                cur = cav;
                cav = com;
                $('#canvas_money').text(cav);
            } else if (cur > 0.1 && cav <= 0.1) {
                $('#canvas_money').text(cav);
            } else {
                $('#canvas_money').text(cav);
            }
            dom_money.innerHTML = cur;
            $('.totalMoney span').text(currentMoney);
            if(currentMoney==0){
            	$('.getmoney').html('离红包只差一点点~');
            	$('.totalMoney').html('离红包只差一点点~');
            	$('#money_alert .title').css('visibility','hidden');
            }
            dom_slogan.className = 'slogan sloganFade';
            dom_cr.className = 'cr crRight';
            dom_cl.className = 'cl crLeft';
            dom_back.className = 'back backFade';
            dom_cap.className = 'cap capFade';
            dom_mountain.className = 'mountain sloganFade';
            dom_hb.className = 'hb hbFade';
            dom_get.className = 'get gethide';
            dom_cash.style.display = 'block';
            dom_cash.className = 'cash cashshow';
            dom_get.addEventListener('webkitAnimationEnd', function () {
                dom_get.style.display = 'block';
                dom_get.style.opacity = 0;
                dom_get.style.zIndex = 1;
            }, false);
            if (sessionStorage.skukey == '241510936-003') {
                setTimeout(function () {
                    dom_alert.style.opacity = 1;
                    var timer6 = setTimeout(function () {
                        dom_get.style.display = 'none';
                        dom_alert.style.display = 'none';
                    }, 3000);
                    dom_alert.addEventListener('touchstart', function () {
                        dom_alert.style.display = 'none';
                        dom_get.style.display = 'none';
                        clearTimeout(timer6);
                    }, false);
                }, 2000);
            } else {
                dom_alert.style.display = 'none';
                dom_get.style.display = 'none';
            }
        }
    }

}

dom_explain.addEventListener('touchstart', function () {
    location.href = 'http://mp.weixin.qq.com/s?__biz=MzI5NjQ4MDMyNg==&mid=100000006&idx=1&sn=ccd140506a659b0e2b9d43f841d5d25f&chksm=6c42fa2f5b357339732e51b3efda6b91ebd3065f40b323d578ad8fffa68c8044664a7a6c8175#rd';
}, false);
dom_rule.addEventListener('touchstart', function () {
    location.href = 'http://mp.weixin.qq.com/s/zJE8pZ5hico10EgKkHmCdQ';
}, false);


if (Number(totalAccountMoney) >= 1) { //大于1元可以提现
    dom_btn.value = '立即提现';
    dom_ck.value = '立即提现';
    dom_hundredBtn.value = '立即提现';

    dom_btn.addEventListener('touchstart', dot_1, false);

    function dot_1() {
        dom_btn.removeEventListener('touchstart', dot_1, false);
        setTimeout(function () {
            dom_btn.addEventListener('touchstart', dot_1, false);
        }, 1500);
        if (tx) {
            dom_loading.style.display = 'block';
            give_spack();
        }
    }
    dom_ck.addEventListener('touchstart', dot_2, false);

    function dot_2() {
        dom_ck.removeEventListener('touchstart', dot_2, false);
        setTimeout(function () {
            dom_ck.addEventListener('touchstart', dot_2, false);
        }, 1500);
        if (tx) {
            dom_loading.style.display = 'block';
            give_spack();
        }
    }

    dom_hundredBtn.addEventListener('touchstart', dot_3, false);

    function dot_3() {
        dom_hundredBtn.removeEventListener('touchstart', dot_3, false);
        setTimeout(function () {
            dom_hundredBtn.addEventListener('touchstart', dot_3, false);
        }, 1500);
        if (tx) {
            dom_loading.style.display = 'block';
            give_spack();
        }
    }
} else { //小于1元不能提现
    dom_btn.value = '查看红包余额';
    dom_ck.value = '查看红包余额';
    dom_hundredBtn.value = '查看红包余额';
    dom_btn.addEventListener('touchstart', function () {
        $('#btn').unbind();
        sessionStorage.totalAccountMoney = '0.00';
        sessionStorage.gzh = '1';
        ifremeber(); //判断关注
    }, false);
    dom_ck.addEventListener('touchstart', function () {
        sessionStorage.totalAccountMoney = '0.00';
        sessionStorage.gzh = '1';
        ifremeber(); //判断关注
    }, false);
    dom_hundredBtn.addEventListener('touchstart', function () {
        $('.hundred-btn').unbind();
        sessionStorage.totalAccountMoney = '0.00';
        sessionStorage.gzh = '1';
        ifremeber(); //判断关注
    }, false);
}

if (bizcode == '11' || again == true) {
    dom_repcash.style.display = 'block';
    dom_getted.innerHTML = currentMoney;
    if (earnTime != '') {
        earnTime = insert_flg(earnTime, '<br>', 11);
    }
    dom_earnTime.innerHTML = earnTime;
    dom_slogan2.style.display = 'block';
    dom_top.style.display = 'block';
    dom_middle.style.display = 'block';
    dom_bottom.style.display = 'block';
    dom_ck.style.display = 'block';
    dom_btn.style.display = 'block';
} else {
    dom_zipper.style.display = 'block';
    dom_get.style.display = 'block';
    dom_getmoney.style.display = 'block';
    dom_btn.style.display = 'block';
    dom_link.style.display = 'block';
    if (earnTime != '') {
        earnTime = insert_flg(earnTime, '<br>', 11);
    }
    dom_earnTime.innerHTML = earnTime;
}

dom_mask.addEventListener('touchstart', function () {
    ifremeber();
}, false);

// canvas
function initCanvas() {
    var w = document.body.clientWidth * 0.546,
        h = 125;

    // document.querySelector('body').addEventListener('touchstart', function (e) {
    //     var e = e || window.event;
    //     e.preventDefault();
    // });
    var c = document.getElementById('cardCanvas');
    var ctx = c.getContext('2d');
    c.width = w; //画布宽  
    c.height = h; //画布高  
    var img = new Image(); // 创建img元素
    img.src = '/v/hbqp20170626/img/canvas_mask.png'; // 设置图片源地址
    img.onload = function () {
        // 执行drawImage语句
        ctx.drawImage(img, 0, 0, w, h);
    }
    // ctx.globalCompositeOperation = "destination-out"; //新图像和原图像重合部分变透明  
    //移动端  
    c.addEventListener('touchstart', function (e) {
        disabled = false;
        var e = e || window.event;
        var x = e.touches[0].clientX - c.offsetLeft;
        var y = e.touches[0].clientY - c.offsetTop;
        ctx.moveTo(x, y)
        c.addEventListener('touchmove', gmove, false)
    }, false)
    c.addEventListener('touchend', function () {
        clearC();
    }, false)

    //PC端  
    c.addEventListener('mousedown', function (e) {
        var e = e || window.event;
        var x = e.clientX - c.offsetLeft;
        var y = e.clientY - c.offsetTop;
        ctx.moveTo(x, y)
        c.addEventListener('mousemove', gmove, false)
    }, false)
    c.addEventListener('mouseup', function () {
        clearC();
        c.removeEventListener('mousemove', gmove, false)
    }, false)

    function gmove(e) { //刮卡函数  
        if (typeof e.touches != 'undefined') {
            e = e.touches[0];
        }
        var mx = e.clientX - c.offsetLeft;
        var my = e.clientY - c.offsetTop;
        ctx.strokeStyle = "white";
        ctx.lineCap = "round"; //绘制的线结束时为圆形  
        ctx.lineJoin = "round"; //当两条线交汇时创建圆形边角  
        ctx.lineWidth = 30;
        ctx.lineTo(mx, my);
        ctx.stroke();
        ctx.globalCompositeOperation = "destination-out";
    }

    function clearC() { //刮开一定面积执行擦除画布函数  
        var data = ctx.getImageData(0, 0, c.width, c.height).data;
        for (var i = 0, j = 0; i < data.length; i += 4) { //data.length=c.width*c.heigth*4,一个像素块是一个对象RGBA四个值,A范围为0~255  
            if (data[i] && data[i + 1] && data[i + 2] && data[i + 3]) { //存在imageData对象时j加1  PS:该像素区域透明即为不存在该对象  
                j++;
            }
        }
        if (j <= c.width * c.height * 0.7) { //超过canvas面积的60%，就清除画布  
            ctx.clearRect(0, 0, c.width, c.height);
            setTimeout(function () {
                $('#money_alert').css('display', 'block');
            }, 1000);
        }
    }
}


function give_spack() { //提现
    var javai = vge.hbqp + '/DBTHBQPInterface/gifts/getGiftspack';
    var req = {
        "openid": openid,
        "hbopenid": hbopenid
    };
    vge.callJApi(javai, req,
        function (jo) {
            dom_loading.style.display = 'none';
            if (jo.result.code == '0') {
                if (jo.result.businessCode === '0') {
                    sessionStorage.totalAccountMoney = 0;
                    dom_mask.style.display = 'block';
                    if (bizcode == '11' || again == true) {
                        dom_slogan2.style.display = 'none';
                        dom_top.style.display = 'none';
                        dom_middle.style.display = 'none';
                        dom_bottom.style.display = 'none';
                        dom_ck.style.display = 'none';
                    } else {
                        dom_getmoney.style.display = 'none';
                        dom_link.style.display = 'none';
                    }
                    tx = false;
                } else if (jo.result.businessCode === '1') { //1
                    title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
                } else if (jo.result.businessCode === '2') { //1
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                } else if (jo.result.businessCode === '4') { //1
                    title_tip('提现处理中，请稍后查看详细记录', '我知道了');
                } else if (jo.result.businessCode === '3') { //1
                    title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
                } else if (jo.result.businessCode === '-1') { //-1
                    title_tip('提 示', '系统升级中', '我知道了');
                } else if (jo.result.businessCode === '-2') { //-1
                    title_tip('提 示', '提现操作过于频繁', '我知道了');
                } else if (jo.result.businessCode === '5') { //-1
                    title_tip('提 示', jo.result.msg, '我知道了');
                } else {
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            } else if (jo.result.code == '-1') {
                title_tip('尊敬的用户', '系统升级中...', '我知道了');
            } else { //code!='0'
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            }
        });
}

function ifremeber() {
    var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.hbqpappid;
    vge.ajxget(requrl, 5000, function (r) {
        try {
            var o = JSON.parse(r);
            if (o.subscribe == '0') { //未关注
                dom_mask.style.display = 'none';
                window.location.replace('http://' + location.host + '/v/hbqp20170626/attention.html');
            } else { //已关注用户
                dom_mask.style.display = 'none';
                window.location.replace('http://' + location.host + '/hbqp20170626/too/mybag');
            }
        } catch (e) {
            vge.clog('errmsg', [requrl, e]);
        }
    }, function (err) {
        vge.clog('errmsg', [requrl, err]);
    });
}

function insert_flg(str, flg, sn) { //str表示原字符串变量，flg表示要插入的字符串，sn表示要插入的位置
    var newstr = "";
    for (var i = 0; i < str.length; i += sn) {
        var tmp = str.substring(i, i + sn);
        newstr += tmp + flg;
    }
    return newstr;
}