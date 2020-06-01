(function(){
	'use strict';
	var args = vge.urlparse(location.href),
		openid = sessionStorage.openid,
		hbopenid = args.openid;
	
	var taoEasterEgg = sessionStorage.taoEasterEgg ==  undefined ? '' : sessionStorage.taoEasterEgg;  //返回的淘口令
    var taoMemberOrderFlag = sessionStorage.taoMemberOrderFlag  ==  undefined ? '' : sessionStorage.taoMemberOrderFlag; //入会 or 淘彩蛋 弹框
	
    // 展示淘口令
    function showtkl(){
        if(taoEasterEgg && taoEasterEgg != 'undefined' && taoEasterEgg != '' && taoEasterEgg != 'null'){ // if有618口令
            $('#tkl618').val(taoEasterEgg); // 赋值淘口令
            if(taoMemberOrderFlag == '1'){ // 1入会口令  0否
                $('.caidan618').attr("src","/v/nmqp/img/20200618/618Toast.png");
			}
			
			$('.taocd618').css('display', 'block');

            // setTimeout(function(){
            //     $('.taocd618').css('display', 'block');
            // },1000);
            $('.close_cd618').on('click',function(){
                $('.taocd618').css('display', 'none');
            })
            $('.copy_cd618').on('click',function(){
                var clipboard = new ClipboardJS('.copy_cd618');
                clipboard.on('success', function(e) {
                    console.log(e);
                    $('.taocd618').css('display', 'none');
                    setTimeout(function() {
                        toast('复制口令成功')
                    },100);
                });
                clipboard.on('error', function(e) {
                    console.log(e);
                });
            });
        }
    }
    function toast(txt) {
        $('#toast .weui_toast_content').html(txt);
        $('#toast').show();
        setTimeout(function () {
            $('#toast').hide();
        }, 2000);
    }
	
	setTimeout(()=>{
		showtkl();  //展示淘口令
	},1500)

	$('.money').html(sessionStorage.currentMoney+'元');
	$('#time').html(sessionStorage.earnTime);
	if(sessionStorage.totalAccountMoney>=1){
		$('#btn').css({'background':'url(/v/ynqp/img/button_2.png) no-repeat center','-webkit-background-size':'auto 100%'});
		$('.tip').html('您的红包累计金额已达<span id="total">'+sessionStorage.totalAccountMoney+'</span>元啦<br />点击“立即提现”把钱拿走吧');
	}
	
	if(sessionStorage.currentMoney<1){
		$('.sc').attr('src','/v/ynqp/img/sc_1.png');
	}else{
		$('.sc').attr('src','/v/ynqp/img/sc_2.png');
	}
	

	
	
	$('#btn').on('click',dot);
	function dot(){
		$('#btn').unbind();
		$('.loading').css('display','block');
		if(sessionStorage.totalAccountMoney<1){
			ifremeber();
		}else{
			ifremeber_give_spack();
		}
	}
	function give_spack() {//提现
		// title_tip('提 示', '微信提现升级中，您可先扫码，红包会自动累积哦！', '我知道了');
		var javai = vge.common + '/vjifenInterface/gifts/getGiftspack';
		var req = { "projectServerName": "yunnan",
				"openid": openid,
				"hbopenid":hbopenid
			};
		vge.callJApi(javai, req,
	        function(jo) {
	        	$('#btn').on('click',dot);
	        	$('.loading').css('display','none');
	            if (jo.result.code == '0') {
		            if (jo.result.businessCode === '0') {
		            	sessionStorage.totalAccountMoney=0;
		            	$('#btn').css({'background':'url(/v/ynqp/img/button_1.png) no-repeat center','-webkit-background-size':'auto 100%'});
		            	$('.tx_mark').css('display','block');
		            } else if (jo.result.businessCode === '1') { //1
			            title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
			        } else if (jo.result.businessCode === '2') { //1
			            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			        } else if (jo.result.businessCode === '-2') { //-2
		            	title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
		        	} else if (jo.result.businessCode === '4') { //1
			            title_tip('提现处理中，请稍后查看详细记录', '我知道了');
			        } else if (jo.result.businessCode === '3') { //1
			            title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
			        } else if (jo.result.businessCode === '-1') { //-1
			            title_tip('提 示', '系统升级中...', '我知道了');
			        }else {
			            title_tip('尊敬的用户', jo.result.msg, '我知道了');
			        }
	            } else if(jo.result.code == '-1'){
	            	title_tip('尊敬的用户', '系统升级中...', '我知道了');
	            } else { //code!='0'
		            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
	            }
	   		});
	}
	
	$('.tx_mark').on('click',function(){
		$('.tx_mark').css('display','none');
		ifremeber();
	});
	
	function ifremeber(){
		var requrl='http://'+vge.o3host+'/wx3/uinfo2?openid='+openid+'&appid='+vge.ynqpappid;
		vge.ajxget(requrl, 5000, function(r){
			$('#btn').on('click',dot);
			$('.loading').css('display','none');
			try{
				var o = JSON.parse(r);
				if(o.subscribe=='0') {//未关注
					window.location.replace('http://'+location.host+'/v/ynqp/attention.html');
				}else{//已关注用户
					window.location.replace('http://'+location.host+'/ynqp/too/mybag');
				}
			}catch(e){
				vge.clog('errmsg', [requrl, e]);
			}
		},function(err){
			vge.clog('errmsg', [requrl, err]);
		});
    }
    
    function ifremeber_give_spack(){
        var requrl='http://'+vge.o3host+'/wx3/uinfo2?openid='+openid+'&appid='+vge.ynqpappid;
		vge.ajxget(requrl, 5000, function(r){
			$('#btn').on('click',dot);
			$('.loading').css('display','none');
			try{
				var o = JSON.parse(r);
				if(o.subscribe=='0') {//未关注
					window.location.replace('http://'+location.host+'/v/ynqp/attention.html');
				}else{//已关注用户
					give_spack();
				}
			}catch(e){
				vge.clog('errmsg', [requrl, e]);
			}
		},function(err){
			vge.clog('errmsg', [requrl, err]);
		});
    }

	$('.rule').on('click',function(){
		location.href = 'https://mp.weixin.qq.com/s?__biz=MzUzNzE3MTcwOQ==&mid=100000007&idx=1&sn=79228fa6ebfaeec5e5827784235d4128&chksm=7aea42954d9dcb8309a4743a212c0b36f6d8adbf893d103652dcf4a652d7312a99d67a63f16d#rd';
	});
	$('.explain').on('click',function(){
		location.href = 'https://mp.weixin.qq.com/s?__biz=MzUzNzE3MTcwOQ==&mid=100000009&idx=1&sn=febe56f77365834ae29e3140d73dafb8&chksm=7aea429b4d9dcb8daba5b96e285c50f8e8595a293885642fdc3edd4f2c4934f1d9b00ed9f2ca#rd';
	});
})();
