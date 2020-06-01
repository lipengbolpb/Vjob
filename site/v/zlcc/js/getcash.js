(function(){
	'use strict';
	var args = vge.urlparse(location.href),openid = sessionStorage.openid,
		hbopenid = args.openid;
	
	$('.money').html('¥'+sessionStorage.currentMoney);
	$('.time').html('扫码时间：'+sessionStorage.earnTime);
	
	
	
	$('#btn').on('click',function(){
		location.replace('http://'+location.host + '/zlcc/too/details');
	});
	if(Number(sessionStorage.totalAccountMoney)>=1){
		give_spack();
	}
	
	function give_spack() {//提现
		// title_tip('提 示', '微信提现升级中，您可先扫码，红包会自动累积哦！', '我知道了');
		var javai = vge.zlcc + '/DBTZLCCInterface/gifts/getGiftspack';
		var req = {
			"openid": openid,
			"hbopenid":hbopenid
		};
		vge.callJApi(javai, req,
	        function(jo) {
	            if (jo.result.code == '0') {
		            if (jo.result.businessCode === '0') {
		            	sessionStorage.totalAccountMoney=0;
		            	$('#alert').css('display','block');
		            } else if (jo.result.businessCode === '1') { //1
			            title_tip('提 示', '您的待提余额不足1元，再喝几瓶攒够1元发红包！', '我知道了');
			        } else if (jo.result.businessCode === '4') { //4
			            title_tip('提 示', '提现处理中，请稍后查看详细记录', '我知道了');
			        } else if (jo.result.businessCode === '2') { //2
			            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			        } else if (jo.result.businessCode === '5') { //5
			            title_tip('尊敬的用户', jo.result.msg, '我知道了');
			        } else if (jo.result.businessCode === '3') { //3
			            title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
			        } else if (jo.result.businessCode === '-1') { //-1
			            title_tip('提 示', '系统升级中...', '我知道了');
			        } else {
			            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			        }
	            } else if (jo.result.code == '-1') {
	            	title_tip('尊敬的用户', '系统升级中...', '我知道了');
	            } else{ //code!='0'
		            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
	            }
	    	});
	}
	$('#alert').on('click',function(){
		$('#alert').css('display','none');
		location.replace('http://'+location.host + '/zlcc/too/details');
	});
	
	
//	function details(){
//		location.replace('http://'+location.host + '/zlcc/too/details');
//	}
})();
