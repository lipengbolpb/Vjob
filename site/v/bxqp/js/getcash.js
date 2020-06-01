'use strict';

var dom_get = document.getElementById('get'),
	dom_cash = document.getElementById('cash'),
	dom_repcash = document.getElementsByClassName('repcash')[0],
	dom_hb = document.getElementsByClassName('hb')[0],
	dom_hb2 = document.getElementsByClassName('hb')[1],
	dom_title = document.getElementsByClassName('title')[0],
	dom_hide = document.getElementsByClassName('hide')[0],
	dom_notice = document.getElementsByClassName('notice')[0],
	dom_loading = document.getElementsByClassName('loading')[0],
	dom_link = document.getElementsByClassName('link')[0],
	dom_rule = document.getElementsByClassName('rule')[0],
	dom_explain = document.getElementsByClassName('explain')[0],
	dom_money= document.getElementById('money'),
	dom_earnTime= document.getElementById('earnTime'),
	dom_btn= document.getElementById('btn'),
	dom_mask= document.getElementById('mask');

var currentMoney = sessionStorage.currentMoney,
	totalAccountMoney = sessionStorage.totalAccountMoney,
	codeContentUrl = sessionStorage.codeContentUrl,
	earnTime = sessionStorage.earnTime,
	openid = sessionStorage.openid,
	args = vge.urlparse(location.href),
	bizcode = args.bizcode,
	hbopenid = args.openid,
	first = sessionStorage.first === undefined?true:sessionStorage.first,
	again = sessionStorage.again === undefined?false:sessionStorage.again;

var flag = true,
	num = 1,
	tx = true;

if(bizcode == '11'||again == 'true'){
	dom_cash.style.display = 'block';
	dom_get.style.display = 'none';
	dom_repcash.style.display = 'block';
	dom_hb2.style.display = 'block';
	dom_btn.style.display = 'block';
	dom_notice.style.display = 'block';
	dom_link.style.display = 'block';
	dom_earnTime.innerHTML = earnTime;
}else if(bizcode == '0'){
	dom_get.style.display = 'block';
}

dom_hb.addEventListener('click',function(){
	dom_cash.style.display = 'block';
	dom_get.style.display = 'none';
	sessionStorage.again = true;
},false);

if(Number(currentMoney)==0){//中奖金额为0
	dom_title.innerHTML = '离红包只差一点点！<br>再扫一瓶试试~';
	dom_hide.style.display = 'none';
}else{
	currentMoney = Number(currentMoney).toFixed(2);
	dom_money.innerHTML = currentMoney;
}

if(Number(totalAccountMoney)>=1){//大于1元可以提现
	dom_notice.innerHTML = '温馨提示：您的红包累计金额为'+totalAccountMoney+'元，点击上方按钮把钱拿走吧！';
	dom_btn.value = '立即提现';
	dom_btn.addEventListener('click',function(){
		if(tx){
			dom_loading.style.display = 'block';
			give_spack();
		}
	},false);
}else{//小于1元不能提现
	dom_btn.value = '存入我的零钱包';
	dom_btn.addEventListener('click',function(){
		ifremeber();//判断关注
	},false);
}

dom_mask.addEventListener('click',function(){
	ifremeber();//判断关注
},false);

function give_spack() {//提现
	var javai = vge.common + '/vjifenInterface/gifts/getGiftspack';
	var req = {
			"openid": openid,
			"hbopenid":hbopenid,
			"projectServerName":"beixiao",
		};
	vge.callJApi(javai, req,
	    function(jo) {
	    	dom_loading.style.display = 'none';
	        if (jo.result.code == '0') {
		        if (jo.result.businessCode === '0') {
		           	dom_mask.style.display = 'block';
		           	dom_title.style.display = 'none';
		           	dom_hide.style.display = 'none';
		           	dom_hb2.style.display = 'none';
		           	dom_btn.style.display = 'none';
		           	dom_notice.style.display = 'none';
		           	dom_link.style.display = 'none';
		           	dom_repcash.style.display = 'none';
		            tx = true;
		        } else if (jo.result.businessCode === '1') { 
			        title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
			        tx = false;
			    } else if (jo.result.businessCode === '2') { 
			        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			        tx = false;
			    } else if (jo.result.businessCode === '4') { 
			        title_tip('提现处理中，请稍后查看详细记录', '我知道了');
			        tx = false;
			    } else if (jo.result.businessCode === '3') { 
			        title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
			        tx = false;
			    } else if (jo.result.businessCode === '-1') { //-1
			        title_tip('提 示', '提现操作过于频繁', '我知道了');
			        tx = false;
			    } else if (jo.result.businessCode === '-2') { //-1
			        title_tip('提 示', '提现操作过于频繁', '我知道了');
			        tx = false;
			    } else if (jo.result.businessCode === '5') { 
			        title_tip('提 示', jo.result.msg, '我知道了');
			        tx = false;
			    } else if (jo.result.businessCode === '-2') { 
			        title_tip('提 示', '提现操作过于频繁', '我知道了');
			        tx = false;
			    } else {
			        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
		            tx = false;
			    }
	        } else if(jo.result.code == '-1'){
	            title_tip('尊敬的用户', '系统升级中...', '我知道了');
		        tx = false;
	        } else { //code!='0'
		        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
		        tx = false;
	        }
	   	});
}

function ifremeber(){
	var requrl='http://'+vge.o3host+'/wx3/uinfo2?openid='+openid+'&appid='+vge.bxqpappid;
	vge.ajxget(requrl, 5000, function(r){
		try{
			var o = JSON.parse(r);
			if(o.subscribe=='0') {//未关注
				dom_mask.style.display = 'none';
				window.location.replace('http://'+location.host+'/v/bxqp/attention.html');
			}else{//已关注用户
				dom_mask.style.display = 'none';
				window.location.replace('http://'+location.host+'/bxqp/too/mybag');
			}
		}catch(e){
			vge.clog('errmsg', [requrl, e]);
		}
	},function(err){
		vge.clog('errmsg', [requrl, err]);
	});
}

dom_rule.addEventListener('click',function(){//活动规则（活动说明）
	window.location.href = 'http://mp.weixin.qq.com/s/s0_hzI5swUuDAZCr2dJA8Q';
},false);

dom_explain.addEventListener('click',function(){//隐私说明
	window.location.href = 'http://mp.weixin.qq.com/s/I7YHxSCNmMqPEmi5olXFmg';
},false);