'use strict';

var dom_cash = document.getElementById('cash'),
    dom_get = document.getElementById('get'),
    dom_bag = document.getElementsByClassName('bag')[0],
    dom_title = document.getElementsByClassName('title')[0],
    dom_h1 = document.getElementsByTagName('h1')[0],
    dom_money = document.getElementById('money'),
    dom_notice = document.getElementsByClassName('notice')[0],
    dom_open = document.getElementsByClassName('open')[0],
    dom_btn = document.getElementById('btn'),
    dom_mask = document.getElementById('mask'),
    dom_loading = document.getElementById('loading'),
    dom_rule = document.getElementsByClassName('rule')[0],
    dom_explain = document.getElementsByClassName('explain')[0];

var currentMoney = sessionStorage.currentMoney,
    totalAccountMoney = sessionStorage.totalAccountMoney,
    codeContentUrl = sessionStorage.codeContentUrl,
    earnTime = sessionStorage.earnTime,
    openid = sessionStorage.openid,
    args = vge.urlparse(location.href),
    bizcode = args.bizcode,
    hbopenid = args.openid,
    first = sessionStorage.first === undefined ? true : sessionStorage.first,
    again = sessionStorage.again === undefined ? false : sessionStorage.again;

var flag = true,
    num = 1,
    tx = true;

dom_bag.addEventListener('click', function () {
    dom_open.className = 'open ani';
    setTimeout(function () {
        dom_cash.style.display = 'none';
        dom_get.style.display = 'block';
    }, 1000);
    sessionStorage.again = true;
	setTimeout(function(){
		document.getElementsByClassName('active')[0].style.display='block';
		document.getElementsByClassName('activeClose')[0].addEventListener('click',function(){
			document.getElementsByClassName('active')[0].style.display='none';
		},false);
		document.getElementsByClassName('activImg')[0].addEventListener('click',function(){
			document.getElementsByClassName('active')[0].style.display='none';
		},false);
		events();
	},2000);
}, false);

if (Number(currentMoney) == 0) { //中奖金额为0
    dom_title.innerHTML = '离红包只差一点点！<br>再扫一瓶试试~';
    dom_title.style.left = '31%';
    dom_title.style.top = '5.8rem';
    dom_h1.style.display = 'none';
} else {
    currentMoney = Number(currentMoney).toFixed(2);
    dom_money.innerHTML = currentMoney;
}

if (Number(totalAccountMoney) >= 1) { //大于1元可以提现
    dom_notice.innerHTML = '温馨提示：您的红包累计金额为' + totalAccountMoney + '元，<br>点击上方按钮把钱拿走吧！';
    dom_btn.value = '去提现';
} else { //小于1元不能提现
    dom_notice.innerHTML = '根据微信平台要求,红包累计大于等于1元后可提现,<br>不足1元的红包我们为您贴心准备了零钱包功能';
    dom_btn.value = '存入我的零钱包';
}

if (bizcode == '11' || again == 'true') {
    dom_get.style.display = 'block';
    dom_title.innerHTML = '您已扫过';
    dom_title.style.fontSize = '1.2rem';
    dom_title.style.fontWeight = 'bold';
    dom_title.style.left = '36%';
    dom_title.style.top = '5rem';
    dom_h1.style.display = 'block';
    dom_h1.innerHTML = '每罐只限扫码一次';
    dom_h1.style.fontSize = '0.75rem';
    dom_h1.style.left = '33%';
    dom_h1.style.top = '7rem';
    dom_notice.innerHTML = '您已于<span style="font-size: 0.6rem;color: #fff699;">' + earnTime + '</span>扫过这瓶酒<br>并获得&nbsp;<span style="font-size: 0.8rem;color: #font-size: 0.6rem;color: #fff699;font-weight: bold;">¥' + currentMoney + '元</span>';
	events();
} else if (bizcode == '0') {
    dom_cash.style.display = 'block';
}

dom_mask.addEventListener('click', function () {
    ifremeber(); //判断关注
}, false);

// function give_spack() { //提现
//     var javai = vge.common + '/vjifenInterface/gifts/getGiftspack';
//     var req = {
//         "openid": openid,
//         "hbopenid": hbopenid,
//         "projectServerName":"gansu",
//     };
//     vge.callJApi(javai, req,
//         function (jo) {
//             dom_loading.style.display = 'none';
//             if (jo.result.code == '0') {
//                 if (jo.result.businessCode === '0') {
//                     dom_mask.style.display = 'block';
//                     tx = true;
//                 } else if (jo.result.businessCode === '1') {
//                     title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
//                     tx = false;
//                 } else if (jo.result.businessCode === '2') {
//                     title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
//                     tx = false;
//                 } else if (jo.result.businessCode === '4') {
//                     title_tip('提现处理中，请稍后查看详细记录', '我知道了');
//                     tx = false;
//                 } else if (jo.result.businessCode === '3') {
//                     title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
//                     tx = false;
//                 } else if (jo.result.businessCode === '-1') { //-1
//                     title_tip('提 示', '提现操作过于频繁', '我知道了');
//                     tx = false;
//                 } else if (jo.result.businessCode === '-2') { //-1
//                     title_tip('提 示', '提现操作过于频繁', '我知道了');
//                     tx = false;
//                 } else if (jo.result.businessCode === '5') {
//                     title_tip('提 示', jo.result.msg, '我知道了');
//                     tx = false;
//                 } else if (jo.result.businessCode === '-2') {
//                     title_tip('提 示', '提现操作过于频繁', '我知道了');
//                     tx = false;
//                 } else {
//                     title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
//                     tx = false;
//                 }
//             } else if (jo.result.code == '-1') {
//                 title_tip('尊敬的用户', '系统升级中...', '我知道了');
//                 tx = false;
//             } else { //code!='0'
//                 title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
//                 tx = false;
//             }
//         });
// }

function ifremeber() {
    var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.gsqpappid;
    vge.ajxget(requrl, 5000, function (r) {
        try {
            var o = JSON.parse(r);
            if (o.subscribe == '0') { //未关注
                window.location.replace('http://' + location.host + '/v/gsqp/attention.html');
            } else { //已关注用户
                window.location.replace('http://' + location.host + '/gsqp/too/mybag');
            }
        } catch (e) {
            vge.clog('errmsg', [requrl, e]);
        }
    }, function (err) {
        vge.clog('errmsg', [requrl, err]);
    });
}

function events(){
	if (Number(totalAccountMoney) >= 1) { //大于1元可以提现
	    dom_btn.addEventListener('click', function () {
	        window.location.replace('http://' + location.host + '/gsqp/too/mybag');
	    }, false);
	} else { //小于1元不能提现
	    dom_btn.addEventListener('click', function () {
	        ifremeber(); //判断关注
	    }, false);
	}
	dom_rule.addEventListener('click', function () { //活动规则（活动说明）
	    window.location.href = 'https://mp.weixin.qq.com/s?__biz=MzAxMTgyMjMxNQ==&mid=100000502&idx=1&sn=9b3b07b12b7f1ae45fca1ed7e4c1fb74&chksm=1bba77722ccdfe64b1f479c2ef1ab0ae45b65189db89ed19be0978a5694f9d887e75f949a77b#rd';
	}, false);
	
	dom_explain.addEventListener('click', function () { //隐私说明
	    window.location.href = 'https://mp.weixin.qq.com/s?__biz=MzAxMTgyMjMxNQ==&mid=100000504&idx=1&sn=11138aa089bfc6da73cdea1813dacfd7&chksm=1bba777c2ccdfe6a8294c00ec57269accb99b3fe119e60516e504f69209e926cd095438114e9#rd';
	}, false);
}

//game
// document.getElementsByClassName('game1')[0].addEventListener('click', function () {
//     location.href = 'http://' + location.host + '/v/game/game_1.html';
// }, false);
// document.getElementsByClassName('game2')[0].addEventListener('click', function () {
//     location.href = 'http://' + location.host + '/v/dice/index.html';
// }, false);