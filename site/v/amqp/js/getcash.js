'use strict';

/* 获取dom元素 */
var dom_bag = document.getElementsByClassName('bag')[0],
    dom_open = document.getElementsByClassName('open')[0],
    dom_mask = document.getElementById('mask'),
    dom_get = document.getElementById('get'),
    dom_cash = document.getElementById('cash'),
    dom_mask = document.getElementById('mask'),
    dom_btn = document.getElementById('btn'),
    dom_title = document.getElementById('title'),
    dom_money = document.getElementById('money'),
    dom_notice = document.getElementsByClassName('notice')[0],
    dom_word = document.getElementsByClassName('word')[0],
    dom_rule = document.getElementsByClassName('rule')[0],
    dom_loading = document.getElementsByClassName('loading')[0];

/* 定义各项参数 */
var currentMoney = sessionStorage.currentMoney,
    totalAccountMoney = sessionStorage.totalAccountMoney,
    codeContentUrl = sessionStorage.codeContentUrl,
    openid = sessionStorage.openid,
    args = vge.urlparse(location.href),
    bizcode = args.bizcode,
    hbopenid = args.openid,
    getTime = new Date().getTime(),
    first = sessionStorage.first === undefined ? true : sessionStorage.first,
    again = sessionStorage.again === undefined ? false : sessionStorage.again;
var flag = true,
    num = 1,
    tx = true;
document.getElementsByClassName('game2')[0].addEventListener('click', function () {
    window.location.href = 'http://' + location.host + '/v/amqp/game/index.html';
}, false);
/* 添加事件 */
//拆红包
dom_bag.addEventListener('click', open, false);
//活动规则
dom_rule.addEventListener('click', function () {
    window.location.href = 'https://mp.weixin.qq.com/s?__biz=MzUzNTE4MjI3Ng==&mid=100000102&idx=1&sn=7e6cdc10d385142e5340fcbb7343ce9f&chksm=7a882fcd4dffa6dbdb34513ce54a599a0906d956f1a3d1f66928865e5af91b5a8714d7dfce04&scene=18#rd';
}, false);
//判断关注
dom_mask.addEventListener('click', function () {
    ifremeber();
}, false);

/* 红包打开动画 */
function open() {
    dom_open.classList.add('active');
    sessionStorage.again = 'true';
    setTimeout(function () {
        dom_cash.style.display = 'none';
        dom_get.style.display = 'block';
        //广告页面
		setTimeout(function () {
			document.getElementById('ad').style.display = 'block';
            document.getElementById('ad').addEventListener('click', function () {
                document.getElementById('ad').style.display = 'none';
            }, false);
// 			if(Number(sessionStorage.dayScanNum)<2){
// 				//酒王
// 				$('#jw_box').fadeIn(10);
// 				$('#jw_box .jw_content img').eq(0).css({'top':'0','opacity':1});
// 				$('#jw_box .jw_content img').eq(1).css({'top':'1.2rem','opacity':1});
// 				$('#jw_box .jw_content img').eq(2).css({'top':'2.35rem','opacity':1});
// 				$('#jw_box .jw_content img').eq(3).css({'top':'4.75rem','opacity':1});
// 				$('.jw_person').addClass('move');
// 				//酒王
// 				$('.jw_btn').on('click',function(){
// 					$('#jw_box').fadeIn(10);
// 					$('#jw_box .jw_content img').eq(0).css({'top':'0','opacity':1});
// 				    $('#jw_box .jw_content img').eq(1).css({'top':'1.2rem','opacity':1});
// 				    $('#jw_box .jw_content img').eq(2).css({'top':'2.35rem','opacity':1});
// 				    $('#jw_box .jw_content img').eq(3).css({'top':'4.75rem','opacity':1});
// 					$('.jw_person').addClass('move');
// 				});
// 				$('#jw_box .jw_close').on('click',function(){
// 					$('#jw_box').css('display','none');
// 				});
// 			}
			
		}, 1500);
    }, 1000);
}

init();
/* 页面显示 */
function init() {
    dom_money.innerHTML = currentMoney;
    if (bizcode == 11 || again == 'true') { //重复扫
        dom_cash.style.display = 'none';
        dom_get.style.display = 'block';
        dom_word.innerHTML = '您已扫过';
        dom_word.style.fontSize = '1.5rem';
        dom_word.style.fontWeight = 'bold';
        dom_title.style.color = '#000000';
        dom_title.style.fontSize = '0.6rem';
        dom_title.style.top = '5.5rem';
        if (sessionStorage.earnTime == '') {
            dom_title.innerHTML = '获得金额<span style="color:#cf3c35;font-size:0.6rem;">¥</span><span style="color:#cf3c35;font-size:0.6rem;">' + currentMoney + '</span><span style="color:#cf3c35;font-size:0.6rem">元</span>';
        } else {
            dom_title.innerHTML = '扫码时间:' + sessionStorage.earnTime + '<br>获得金额<span style="color:#cf3c35;font-size:0.6rem;">¥</span><span style="color:#cf3c35;font-size:0.6rem;">' + currentMoney + '</span><span style="color:#cf3c35;font-size:0.6rem">元</span>';
        }
        //广告页面
        // setTimeout(function() {
        //     document.getElementById('ad').style.display = 'block';
        //     document.getElementById('ad').addEventListener('click',function(){
        //         document.getElementById('ad').style.display = 'none';
        //     },false);
        // }, 1500);
		//酒王
// 		$('.jw_btn').on('click',function(){
// 			$('#jw_box').fadeIn(10);
// 			$('#jw_box .jw_content img').eq(0).css({'top':'0','opacity':1});
// 		    $('#jw_box .jw_content img').eq(1).css({'top':'1.2rem','opacity':1});
// 		    $('#jw_box .jw_content img').eq(2).css({'top':'2.35rem','opacity':1});
// 		    $('#jw_box .jw_content img').eq(3).css({'top':'4.75rem','opacity':1});
// 			$('.jw_person').addClass('move');
// 		});
// 		$('#jw_box .jw_close').on('click',function(){
// 			$('#jw_box').css('display','none');
// 		});
    } else {
        dom_cash.style.display = 'block';
        dom_get.style.display = 'none';
    }

    if (Number(currentMoney) == 0) { //中奖金额为0
        dom_word.innerHTML = '离红包只差一点点<br>再扫一瓶试试';
        dom_word.style.fontSize = '0.8rem';
        dom_word.style.fontWeight = 'normal';
        dom_title.style.display = 'none';
    }

    if (Number(totalAccountMoney) >= 1) { //可以提现
        dom_btn.value = '立即提现';
        dom_notice.innerHTML = '温馨提示：您的红包累计金额为' + totalAccountMoney + '元，<br>点击上方按钮把钱拿走吧！'
        dom_btn.addEventListener('click', function () {
            if (tx) {
                tx = false;
                dom_loading.style.display = 'block';
				if(new Date().getTime()<new Date(2019,6,1).getTime()){
					give_spack();
				}else{
					title_tip('提 示', '活动已截止！', '我知道了');
				}
                
            }
        }, false);
    } else {
        dom_btn.value = '存入我的零钱包';
        dom_btn.addEventListener('click', function () {
            ifremeber(); //判断关注
        }, false);
    }
}

/* 提现 */
function give_spack() {
    var javai = vge.amqp + '/DBTBYMQPInterface/gifts/getGiftspack';
    var req = {
        "openid": openid,
        "hbopenid": hbopenid
    };
    vge.callJApi(javai, req,
        function (jo) {
            dom_loading.style.display = 'none';
            if (jo.result.code == '0') {
                if (jo.result.businessCode === '0') {
                    dom_mask.style.display = 'block';
                    tx = false;
                } else if (jo.result.businessCode === '1') { //1
                    title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
                    tx = true;
                } else if (jo.result.businessCode === '2') { //1
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    tx = true;
                } else if (jo.result.businessCode === '4') { //1
                    title_tip('提现处理中，请稍后查看详细记录', '我知道了');
                    tx = true;
                } else if (jo.result.businessCode === '3') { //1
                    title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
                    tx = true;
                } else if (jo.result.businessCode === '-1') { //-1
                    title_tip('提 示', '系统升级中...', '我知道了');
                    tx = true;
                } else if (jo.result.businessCode === '-2') { //-1
                    title_tip('提 示', '提现操作过于频繁', '我知道了');
                    tx = true;
                } else if (jo.result.businessCode === '5') { //5
                    title_tip('尊敬的用户', jo.result.msg, '我知道了');
                    tx = true;
                } else {
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    tx = true;
                }
            } else if (jo.result.code == '-1') {
                title_tip('尊敬的用户', '系统升级中...', '我知道了');
                tx = true;
            } else { //code!='0'
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                tx = true;
            }
        });
}

/* 判断关注 */
function ifremeber() {
    var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.amqpappid;
    vge.ajxget(requrl, 5000, function (r) {
        try {
            var o = JSON.parse(r);
            if (o.subscribe == '0') { //未关注
                // dom_mask.style.display = 'none';
                window.location.replace('http://' + location.host + '/v/amqp/attention.html');
            } else { //已关注用户
                // dom_mask.style.display = 'none';
                window.location.replace('http://' + location.host + '/amqp/too/mybag');
            }
        } catch (e) {
            vge.clog('errmsg', [requrl, e]);
        }
    }, function (err) {
        vge.clog('errmsg', [requrl, err]);
    });
}