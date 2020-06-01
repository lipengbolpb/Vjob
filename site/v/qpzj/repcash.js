(function() {
	"use strict";
	var dom_btn=document.getElementById('btn'),
		wrapper=document.getElementById('wrapper'),
		progress=document.getElementById('progress'),
		dom_ping=document.getElementById('ping'),
		btn_box=document.getElementById('btn_box'),
		progress_box=document.getElementById('progress_box'),
		pointer=document.getElementById('pointer'),
		dom_money=document.getElementById('money'),
		dom_message=document.getElementById('message'),
		bag_skip=document.getElementById('bag_skip'),
		bot_fix=document.getElementById('bottom'),
		dom_rule=document.getElementById('rule'),
		dom_private=document.getElementById('private'),
		mask=document.getElementById('mask'),
		tip_one=document.getElementById('tip_one');
	wrapper.style.display='block';
	var first=true;

	var hbopenid = sessionStorage.openid===undefined?'':sessionStorage.openid;
	var args = vge.urlparse(location.href),openid = args.openid;
	var newMoney = Number(sessionStorage.currentMoney===undefined?'':sessionStorage.currentMoney);
	newMoney = newMoney.toFixed(2);
	if(sessionStorage.currentMoney==0){
		document.getElementsByClassName('moneytip')[0].innerHTML = '离红包只差一点点！<br />再扫一罐试试吧';
		document.getElementsByClassName('moneynum')[0].style.display = 'none';
	}else{
		dom_money.innerHTML=newMoney;
	}
    if(sessionStorage.codeContentUrl) dom_message.src=sessionStorage.codeContentUrl;
   	var chu_mon=sessionStorage.totalAccountMoney===undefined?0:sessionStorage.totalAccountMoney;
	$('.time').html('扫码时间：'+sessionStorage.earnTime);
    
	dom_rule.addEventListener('click',function () {
		_hmt.push(['_trackEvent', 'click', '查看活动规则', 'repcash']);
		location.href= 'http://mp.weixin.qq.com/s?__biz=MzI1NTQ5MzA2Mw==&mid=100000003&idx=1&sn=6a7dd1bcae7ec35f8776e6a292a814b1&chksm=6a3457ab5d43debd0242f9296daec0c6019b51a235778c97805836f18e70ae044999cf45eec7#rd';
	},false);
	dom_private.addEventListener('click',function () {
		_hmt.push(['_trackEvent', 'click', '查看活动规则', 'repcash']);
		location.href='http://mp.weixin.qq.com/s?__biz=MzI1NTQ5MzA2Mw==&mid=100000005&idx=1&sn=e3a9e4ec229d970d429759cd14014433&chksm=6a3457ad5d43debbe4c4571cd37fda1682cd4cd5caab71faaf9931430143fb3d414cc39688c4#rd';
	},false);


	if ( parseInt(chu_mon)>=1) {
		dom_btn.addEventListener('click',function () {
			_hmt.push(['_trackEvent', 'click', '点击提现按钮', 'repcash']);
			if(sessionStorage.again=='second'){
				title_tip('提 示','红包已经领取啦！再扫几瓶试试手气','我知道了');
				return;
			}		
			if (first) {
				give_spack ();
				first=false;
			}
		},false);
	}
	mask.addEventListener('click',function () {
		_hmt.push(['_trackEvent', 'click', '知道了去我的', 'repcash']);
		mask.style.display='none';
		ifremeber();
	},false);

	bag_skip.addEventListener('touchstart',function () {
		_hmt.push(['_trackEvent', 'click', '查看红包去我的', 'repcash']);
//		location.href='http://'+location.host+'/qpzj/too/mybag';
		ifremeber();
	},false);

	// var chu_mon=0.97;
	active_prograss();
	function active_prograss () {
		var fix_two=parseFloat(chu_mon).toFixed(2);
		pointer.innerHTML='￥'+chu_mon;
		var folat_mon=parseFloat(fix_two);
		if ( folat_mon/1<1) {
			var int_mon=folat_mon*100;
			progress.style.width=int_mon+'%';
			pointer.style.left=int_mon-8+'%';
		   if (int_mon>=3&&int_mon<97) {
				dom_ping.style.left = int_mon-3+'%';
			} else if (int_mon<3) {
				dom_ping.style.left = '0';
			} else{
				dom_ping.style.left = '94%';
				pointer.style.left = '90%';
			}
		} else{
			pointer.style.cssText='position:absolute; top:0px; left:90%;';
			progress.style.width='100%';
			progress.style.borderRadius='4px';
			progress.style.backgroundColor='#EA554F';
			dom_btn.style.color='#fff';
			dom_btn.innerHTML='立即提现';
			dom_btn.style.fontSize='18px';
			btn_box.style.backgroundColor='#EA554F';
			pointer.style.background='url(/v/qpzj/img/icon_red.png) 59% 42px no-repeat';
			pointer.style.backgroundSize='24%';
			pointer.style.color='#EA554F';
			dom_ping.style.display='none';
			tip_one.innerHTML='您的累计中奖金额大于1元啦，点击下面按钮把钱拿走吧。';
		}
	}

	function give_spack () {
		_hmt.push(['_trackEvent', 'click', '发送提现请求', 'repcash']);
		var javai = vge.common + '/vjifenInterface/gifts/getGiftspack';
		var req = { "projectServerName": "zhejiang",
			"openid":openid,//浙江
			"hbopenid":hbopenid,//v积分
			"unionid":sessionStorage.unionid===undefined?'':sessionStorage.unionid
		};
		vge.callJApi(javai, req, function(jo) {
			if (jo.result.code=='0') {
            if( jo.result.businessCode==='0') {
            		mask.style.display='block';
            		sessionStorage.totalAccountMoney=0;
            		sessionStorage.again='second';
				} else if( jo.result.businessCode==='1'){//1
					title_tip('提 示','您的红包金额不足，再喝几瓶攒够1元发红包！','我知道了');
				} else if( jo.result.businessCode==='2'){//1
					title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
				} else if (jo.result.businessCode === '-2') { //-2
	            	title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
	        	} else if( jo.result.businessCode==='3'){//1
					title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
				} else if( jo.result.businessCode==='-1'){//1
					title_tip('提 示','系统升级中...','我知道了');
				} else if(jo.result.businessCode==='4'){
					title_tip('尊敬的用户', '提现处理中，请稍后查看详细记录!', '我知道了');
				} else if (jo.result.businessCode === '5') { //5
			        title_tip('尊敬的用户', jo.result.msg, '我知道了');
			    }else {
					title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
					first=true;
				}
			} else{//code!='0'
				title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
				first=true;
			}
		});
	}
	
	//game
	$('.game1').on('click',function(){//真心话大冒险
		location.href = 'http://'+location.host+'/v/game/game_1.html';
	});
	$('.game2').on('click',function(){//骰子
		location.href = 'http://'+location.host+'/v/dice/index.html';
	});
	
	function ifremeber() {
	    var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.qpzjappid;
	    vge.ajxget(requrl, 5000, function (r) {
	        try {
	            var o = JSON.parse(r);
	            if (o.subscribe == '0') {//未关注
	                window.location.replace('http://' + location.host + '/v/qpzj/attention.html');
	            } else {//已关注用户
	                window.location.replace('http://' + location.host + '/qpzj/too/mybag');
	            }
	        } catch (e) {
	            vge.clog('errmsg', [requrl, e]);
	        }
	    }, function (err) {
	        vge.clog('errmsg', [requrl, err]);
	    });
	}
})();
