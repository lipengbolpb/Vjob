(function(){
	
	var timer = null,i=0,tx=false;
	var openid = sessionStorage.openid === undefined ? '': sessionStorage.openid,
		args = vge.urlparse(location.href),
		bizcode = args.bizcode,
		hbopenid = args.openid;
	var second = sessionStorage.again === undefined?'':sessionStorage.again,activityVersion=sessionStorage.activityVersion; 		
	if(sessionStorage.bizcode){
		bizcode = sessionStorage.bizcode;
	}
	
	var month = new Date().getMonth(),day=new Date().getDate();
	
	function showMoney(){
		$('.money').html('¥<span class="current">'+sessionStorage.currentMoney+'</span>元');
		
		if(Number(sessionStorage.totalAccountMoney)<1){
			$('.rabbit_11,.lantern1').css('visibility','visible');
			$('#btn').css({'background':'url(/v/hnqp20170915/img/button_1.png) no-repeat center','-webkit-background-size':'auto 100%'});
		}else{
			$('.rabbit_4,.pic_box').css('visibility','visible');
			$('.tip').css('display','none');
			$('#btn').css({'background':'url(/v/hnqp20170915/img/button_2.png) no-repeat center','-webkit-background-size':'auto 100%'});
		}
	}
	
	$(document).ready(function(){//首页动画
		$('.cash_s').addClass('ready');
	});
	
	$('.cash_s').on('animationend',function(){
		$('.cash_s').on('click',dott);
	});
	
	function dott(){//拆红包
		$('.cash_s').unbind();
		if(sessionStorage.strcode=='1'){
			openCash();
			showMoney();
			$('.cash_s').on('click',dott);
		}else{
			if(bizcode==11){
				location.href = 'http://'+location.host+'/v/hnqp20170915/repcash.html?openid='+hbopenid;
				$('.cash_s').on('click',dott);
				return;
			}else{
				$('.loading').css('display','block');
				var data = {
					"openid":openid,
		            "sweepstr":sessionStorage.qr,
		            "longitude": sessionStorage.longitude===undefined?'00':sessionStorage.longitude, //"经度"
		            "latitude": sessionStorage.latitude===undefined?'00':sessionStorage.latitude //"纬度"
				};
				
				$.ajax({
					type:"post",
					url:vge.hnqp+'/DBTHuaNQPInterface/sweep/sweepQrcode',
					async:true,
					data:JSON.stringify(data),
					success:function(jo){
						cb(jo);
					}
				});
			}
		}
		sessionStorage.bizcode=11;
	}
	
	function cb(jo) {
		$('.loading').css('display','none');
		$('.cash_s').on('click',dott);
		if(jo.result.code == '0'){
			if(jo.reply){
				sessionStorage.earnTime = jo.reply.earnTime;
				sessionStorage.currentMoney = jo.reply.currentMoney;
				sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
				activityVersion = jo.reply.activityVersion;//1.广东    2.海南    3.海南罐装
			}
	        switch (jo.result.businessCode) {
	        case '0':
		        showMoney();
		        openCash();
				if(second=='again'){//后退处理
					location.href = 'http://'+vge.hnqp_host+'/v/hnqp/fail.html?bizcode=11';
					return;
				}
				sessionStorage.again = 'again';
	            break;
	        case '11':              // 自己重复扫，普通奖
				sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
				sessionStorage.currentMoney = jo.reply.currentMoney;
				sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
				location.replace('http://'+location.host+'/v/hnqp20170915/repcash.html?openid='+hbopenid);
	            break;
	        case '12':              // 可疑
				location.replace('http://' + location.host + '/v/hnqp20170915/getMsg.html?bizcode='+jo.result.businessCode);
	            break;    
	        case '13':              // 黑名单
				location.replace('http://' + location.host + '/v/hnqp20170915/getMsg.html?bizcode='+jo.result.businessCode);
	            break; 
	        case '14':              // 指定
				location.replace('http://' + location.host + '/v/hnqp20170915/getMsg.html?bizcode='+jo.result.businessCode);
	            break;    
	        default:
	        	if(jo.reply){
		        	sessionStorage.batchName = jo.reply.batchName===undefined?'':jo.reply.batchName;
		        	sessionStorage.earnTime = jo.reply.earnTime;
	        	}
	        	sessionStorage.msg = jo.result.msg;
				location.replace('http://' + location.host + '/v/hnqp20170915/fail.html?bizcode='+jo.result.businessCode);
	        }	
	        
	    }else if(jo.result.code == '-1'){
	    	title_tip('尊敬的用户','系统升级中，请稍后再试！','我知道了');
	    }else{
	    	title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
	    }
	}
	
	function openCash(){//拆红包动作
		$('.up').css('display','none');
		$('.down').fadeIn(300,function(){
			timer = setInterval(function(){
				i++;
				if(i%5==1){
					$('.pic_box').css('height','.3rem');
				}else if(i%5==2){
					$('.pic_box').css('height','.6rem');
				}else if(i%5==3){
					$('.pic_box').css('height','2rem');
				}else if(i%5==4){
					$('.pic_box').css('height','0rem');
				}else{
					$('.pic_box').css('height','0');
					if(i>25){
						clearInterval(timer);
					}
				}
			},300);
		});
		
		if(activityVersion==1){//广东
			if(month==9&&day>4){
				$('#btn').on('click',dot);
			}else{
				var timer1 = setTimeout(function(){
					$('.active').attr('src','/v/hnqp20170915/img/active_1.png');
					$('.active').css('display','block');
				},2000);
				$('img.active').on('click',function(){
					$('.active').css('display','none');
					$('#btn').on('click',dot);
				});
			}
		}else if(activityVersion==3){//海南罐装
			if(month==9&&day>8){
				$('#btn').on('click',dot);
			}else{
				var timer1 = setTimeout(function(){
					$('.active').attr('src','/v/hnqp20170915/img/active_2.png');
					$('.active').css('display','block');
				},2000);
				$('img.active').on('click',function(){
					$('.active').css('display','none');
					$('#btn').on('click',dot);
				});
			}
		}else{
			$('#btn').on('click',dot);
		}
	}
	
	function dot(){//提现
		$('.loading').css('display','block');
		$('#btn').unbind();
		if(sessionStorage.totalAccountMoney<1){
			ifremeber();
		}else{
			if(!tx){
				give_spack();
			}
		}
	}
	$('.tx_tip').on('click',function(){
		$('.alert').css('display','none');
		ifremeber();
	});
	
	$('.pravite').on('click',function(){
		location.href="http://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502813343&idx=1&sn=8b2760f63bc497a7dce4816749a2c57f&chksm=087290413f051957a9ff4e07a82b5a73602ab17be3dd9a39a97839236675d309c6123211dc65#rd";
	});
	$('.rule').on('click',function(){
		location.href= "http://mp.weixin.qq.com/s?__biz=MzA5MTMwNTkwNQ==&mid=502813345&idx=1&sn=bb4b8be523b184f365639f9d06efbd68&chksm=0872907f3f051969379c552dd379497e8ece252c3fadd290cddbb7996d64be36c80d2ea845eb#rd";
	});
	
	function give_spack() {//提现
	    var javai = vge.hnqp + '/DBTHuaNQPInterface/gifts/getGiftspack';
	    var req = {
	        "openid": openid,
	        "hbopenid": hbopenid
	    };
	    vge.callJApi(javai, req,
	        function (jo) {
	        	$('#btn').on('click',dot);
	        	$('.loading').css('display','none');
	            if (jo.result.code == '0') {
	                if (jo.result.businessCode === '0') {
	                	$('.alert').css('display','block');
	                	sessionStorage.totalAccountMoney=0;
	                	$('#btn').css({'background':'url(/v/hnqp20170915/img/button_1.png) no-repeat center','-webkit-background-size':'auto 100%'});
	                    tx = true;
	                } else if (jo.result.businessCode === '1') { //1
	                    title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
	                } else if (jo.result.businessCode === '2') { //1
	                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
	                } else if (jo.result.businessCode === '4') { //1
	                    title_tip('提现处理中，请稍后查看详细记录', '我知道了');
	                } else if (jo.result.businessCode === '3') { //1
	                    title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
	                } else if (jo.result.businessCode === '-1') { //-1
	                    title_tip('提 示', '系统升级中!', '我知道了');
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
	    var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.hnqpappid;
	    vge.ajxget(requrl, 5000, function (r) {
	    	$('.loading').css('display','none');
	        try {
	            var o = JSON.parse(r);
	            if (o.subscribe == '0') {//未关注
	            	$('#btn').on('click',dot);
	                window.location.replace('http://' + location.host + '/v/hnqp20170915/attention.html');
	            } else {//已关注用户
	            	$('#btn').on('click',dot);
	                window.location.replace('http://' + location.host + '/hnqp20170915/too/mybag');
	            }
	        } catch (e) {
	            vge.clog('errmsg', [requrl, e]);
	        }
	    }, function (err) {
	        vge.clog('errmsg', [requrl, err]);
	    });
	}
	
})();
