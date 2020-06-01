(function(){
	var timer = null,i=0,tx=false;
	var openid = sessionStorage.openid === undefined ? '': sessionStorage.openid,
		args = vge.urlparse(location.href),
		bizcode = args.bizcode,
		hbopenid = args.openid;
	
	$('.time').html('您已于<span class="date">'+sessionStorage.earnTime+'</span><br />扫过这瓶酒，并获得<span class="current">'+sessionStorage.currentMoney+'元</span>');
	if(sessionStorage.totalAccountMoney<1){
		$('.rabbit_2,.cash_s').css('visibility','visible');
		$('#btn').css({'background':'url(/v/ymqp20170918/img/button_7.png) no-repeat center','-webkit-background-size':'auto 100%'});
	}else{
		$('.tip').css('display','none');
		$('.rabbit_4,.pic_box').css('visibility','visible');
		$('#btn').css({'background':'url(/v/ymqp20170918/img/button_2.png) no-repeat center','-webkit-background-size':'auto 100%'});
	}
	
	$('#btn').on('click',dot);
	
	function dot(){
		$('.loading').css('display','block');
		$('#btn').unbind();
		if(sessionStorage.totalAccountMoney<1){
			ifremeber();
		}else{
			if(!tx){
				if(new Date().getTime()<new Date(2019,6,1).getTime()){
					give_spack();
				}else{
					title_tip('提 示', '活动已截止！', '我知道了');
				}
			}
		}
	}
	$('.tx_tip').on('click',function(){
		$('.alert').css('display','none');
		ifremeber();
	});
    
    //广告页面
    setTimeout(function () {
        document.getElementById('ad').style.display = 'block';
        document.getElementById('ad').addEventListener('click', function () {
            document.getElementById('ad').style.display = 'none';
        }, false);
    }, 1500);
    
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
	
	$('.pravite').on('click',function(){
		location.href = 'https://mp.weixin.qq.com/s?__biz=MzU4NTA3MDkzMA==&mid=100000153&idx=1&sn=8e9b941bc3828f37c51d3dfb681b05b7&chksm=7d9161a44ae6e8b2db6bda90f221b40dcd484e42ab4033eb201bc73d226d896bcda035dc0927#rd';
	});
	$('.rule').on('click',function(){
		location.href = 'https://mp.weixin.qq.com/s?__biz=MzU4NTA3MDkzMA==&mid=100000151&idx=1&sn=9f1f49db55bbbff8250e43cbee7de198&chksm=7d9161aa4ae6e8bc337578a2d670589009a7759a2bb62c7d5ca577d7eed5a8303a7951ed477a#rd';
	});
	
	function give_spack() {//提现
	    var javai = vge.ymqp + '/DBTXYMQPInterface/gifts/getGiftspack';
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
	                	$('#btn').css({'background':'url(/v/ymqp20170918/img/button_1.png) no-repeat center','-webkit-background-size':'auto 100%'});
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
	                    title_tip('提 示', '系统升级中！', '我知道了');
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
	    var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.ymqpappid;
	    vge.ajxget(requrl, 5000, function (r) {
	    	$('#btn').on('click',dot);
	    	$('.loading').css('display','none');
	        try {
	            var o = JSON.parse(r);
	            if (o.subscribe == '0') {//未关注
	                window.location.replace('http://' + location.host + '/v/ymqp20170918/attention.html');
	            } else {//已关注用户
	                window.location.replace('http://' + location.host + '/ymqp20170918/too/mybag');
	            }
	        } catch (e) {
	            vge.clog('errmsg', [requrl, e]);
	        }
	    }, function (err) {
	        vge.clog('errmsg', [requrl, err]);
	    });
	}
    
    document.getElementsByClassName('game')[0].addEventListener('click',function(){
        location.href = 'http://'+location.host+'/v/ymqp/game/index.html';
    },false);
})();
