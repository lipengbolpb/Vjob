(function(){
	var progressNum = document.getElementsByClassName('progress')[0],
		checkday = document.getElementById("checkday"),
		imgDays = document.getElementsByClassName('days')[0],
		cash_bg = document.getElementsByClassName('cash-bg')[0],
		progress = document.getElementById("progress");
		
	var args = vge.urlparse(location.href),
		weekSignFlag='',weekSignDays='',weekSignEarnFlag='',weekSignLimitDay='',weekSignDiffDay='',weekSignPercent='',weekSignEarnMoney=0,
		openid = args.openid;	
		
		
		
	
	var javai = vge.hbqp + '/DBTHBQPInterface/user/weekSign';
	var req = {
		"openid": openid,
	};
	vge.callJApi(javai, req, function(jo) {
        if (jo.result.code == '0') {
            if (jo.result.businessCode == '0') {
            	weekSignFlag =  jo.reply.weekSignFlag;
            	weekSignDays =  jo.reply.weekSignDays+'';
            	weekSignEarnFlag =  jo.reply.weekSignEarnFlag;
            	weekSignLimitDay =  jo.reply.weekSignLimitDay;
            	weekSignDiffDay =  jo.reply.weekSignDiffDay;
            	weekSignPercent =  jo.reply.weekSignPercent;
            	weekSignEarnMoney = jo.reply.weekSignEarnMoney;
            	cb();
            } else if (jo.result.businessCode === '1') { //1
	            title_tip('提 示', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
	        } else if (jo.result.businessCode === '-1') { //-1
	            title_tip('提 示', '系统升级中...', '我知道了');
	        } else if (jo.result.businessCode === '2') { //-1
	        	first = true;
	            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
	        } else if (jo.result.businessCode === '3') { //-1
	            title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
	        } else {
	         	title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            	first = true;
	        }
        } else { //code!='0'
            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            first = true;
        }
    });
	
	
	function cb(){
		if(weekSignEarnFlag=='1'){
			cash_bg.innerHTML = '<p class="checkTip">恭喜您获得<br /><span id="weekSignEarnMoney">'+weekSignEarnMoney+'</span>元</p><img src="/v/hbqp/img2/getcash1.png" class="cash-bg"/>';
		}
		if(weekSignFlag!='1'){
			title_tip('提 示', '本周自然周签到红包尚未开启，敬请期待!', '我知道了');
		}
		
		//进度条
		progressNum.innerHTML = weekSignPercent +'%';
		progress.style.width = weekSignPercent * 7.8/100 + 'rem';
		
		switch (weekSignDiffDay){//签到剩余天数
			case '1':imgDays.src = '/v/hbqp/img2/days1.png';
				break;
			case '2':imgDays.src = '/v/hbqp/img2/days2.png';
				break;
			case '3':imgDays.src = '/v/hbqp/img2/days3.png';
				break;
			case '4':imgDays.src = '/v/hbqp/img2/days4.png';
				break;
			case '5':imgDays.src = '/v/hbqp/img2/days5.png';
				break;
			case '6':imgDays.src = '/v/hbqp/img2/days6.png';
				break;	
			default:
				break;
		}
		
		switch (weekSignLimitDay){//签到天数
			case '1':checkday.innerHTML = '一';
				break;
			case '2':checkday.innerHTML = '二';
				break;
			case '3':checkday.innerHTML = '三';
				break;
			case '4':checkday.innerHTML = '四';
				break;
			case '5':checkday.innerHTML = '五';
				break;
			case '6':checkday.innerHTML = '六';
				break;
			case '7':checkday.innerHTML = '七';
				break;
			default:
				break;
		}
		if(weekSignDays!=''){
			weekSignDays = weekSignDays.split(',').sort();
		}
		var weeks = new Date();
		weeks = (weeks.getDay()+6)%7;
		if(weekSignDays.length>0){
			for(var i=0;i<weeks;i++){//打钩打叉
				document.getElementsByClassName('checks')[i].style.backgroundImage = 'url(/v/hbqp/img2/frok.png)';
			}
		}
		for(var j =0;j <weekSignDays.length;j++){
			document.getElementsByClassName('checks')[weekSignDays[j]-1].style.backgroundImage = 'url(/v/hbqp/img2/check.png)';
		}
	}

})();
