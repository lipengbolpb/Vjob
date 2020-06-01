(function(){
	'use strict';
	var grandPrizeType = sessionStorage.grandPrizeType===undefined?'':sessionStorage.grandPrizeType;
	
	var args = vge.urlparse(location.href),
		bizcode = args.bizcode;
	
	if(bizcode == 15){//他人重复扫大奖
		$('#dj,#tip').css('visibility','hidden');
		$('#tip_1').html('被扫时间:'+sessionStorage.earnTime);
		$('.check').css('display','block');
	}else{
        setTimeout(function() {
            $('.content').fadeIn(300);
        }, 2000);
    }
	
	if(grandPrizeType == 0){//游轮
		// $('#slogan').attr('src','img/prize-slogan.png');
		// $('#stub').attr('src','img/stub.png');
		// $('.msg_box').css({
		// 	'background':'#209345 url(img/prize-top.png) no-repeat left top',
		// 	'width': '100%',
		// 	'-webkit-background-size': '100% auto',
		// 	'position': 'absolute',
		// 	'top': 0,
		// 	'left': 0,
		// 	'z-index': 100,
		// 	'display': 'none'
		// });
		// window.onload = function(){
		// 	$('.blue-flower,.pink-flower,.green-flower').addClass('scale');
		// 	$('.green').addClass('g');
		// 	$('.blue').addClass('b');
		// 	$('.pink').addClass('p');
		// };
	}
	if(grandPrizeType == 1){//音乐节
		// $('#slogan').attr('src','img/music-slogan.png');
		// $('#stub').attr('src','img/ticket.png');
		// $('#slogan').css({
		// 	'width':'8rem',
		// 	'left':'4rem'
		// });
		// $('#stub').css({
		// 	'width':'10rem',
		// 	'left':'54%',
		// 	'top':'7.2rem'
		// });
		// $('.msg_box').css({
		// 	'background':'#209345 url(img/ticket-top.png?v=1) no-repeat left top',
		// 	'width': '100%',
		// 	'-webkit-background-size': '100% auto',
		// 	'position': 'absolute',
		// 	'top': 0,
		// 	'left': 0,
		// 	'z-index': 100,
		// 	'display': 'none'
		// });
		// $('#look').css('display','none');
	}
	
	var reg1=/^1[0-9]{10}$/,
		reg2=/^[1-9][0-9xX]{17}$/,
		reg3=/^[0-9]{4}$/;
	
	var first = sessionStorage.first === undefined?false:true;
	var get_yz = document.getElementById("get_yz");
	var countdowntimer = null;
	$('#look').on('click',function(){
		_hmt.push(['_trackEvent', 'click', '查看活动说明', 'prize']);
		$('.shuoming2').fadeIn(300);
	});
	$('#shuoming2').on('click',function(){
		$('.shuoming2').css('display','none');
	});
	
	$('#guize').on('click',function(){
		location.href = 'http://mp.weixin.qq.com/s?__biz=MzA4MzMxMDgyNA==&mid=300053986&idx=1&sn=934df2f728a6476cfb1edd3584eed15b&chksm=0beeb4653c993d73685abfce6e47c25a816f744feda6cb077fba19cc331d78f482394889549e&mpshare=1&scene=1&srcid=0217trs6JTefHN9mZNjPZC3D#rd';
	});
	
	$('#dj').on('click',function(){
		$('.msg_box').fadeIn(300);
		$('body').css('overflow','auto');
		$(this).parent().css('display','none');
	});
	
	$('#explain').on('click',function(){
        // $('#active').fadeIn(300);
        location.href = 'https://mp.weixin.qq.com/s?__biz=MzA4MzMxMDgyNA==&mid=300053990&idx=1&sn=fa94ebad2e5d4f0945e1bcb048903ad8&chksm=0beeb4613c993d771adc7e78cd7b95158f4c9b728430bbd7f14fba620f72553434715e3b68b8&scene=18#rd';
	});
	
	$('#close').on('click',function(){
		$('#active').css('display','none');
	});
	
	// 已经填写过
	if (sessionStorage.username!==''&&sessionStorage.idcard!==''&&sessionStorage.phonenum!=='') {
		$('#user').val(sessionStorage.username);
		$('#id').val(sessionStorage.idcard);
		$('#tel').val(sessionStorage.phonenum);
		$('#user').attr('readonly','readonly');
		$('#id').attr('readonly','readonly');
		$('#tel').attr('readonly','readonly');
		$('.yz_box').css('display','none');$('#tj').val('提交成功！');
		$('.tip').html('温馨提示：您的信息已提交成功，请耐心等待主办方与您联系');
		first = true;
		return;
	}
	
	$('#tj').on('click',function(){
		if(first) return;
		if ($('#user').val()===''||$('#user').val().indexOf(' ')!==-1) {
			title_tip('提 示','请输入正确的姓名哦！~','我知道了');
		} else if(!reg2.test($('#id').val())||!getIdcardValidateCode($('#id').val())){
			title_tip('提 示','请填写正确的身份证号哦！~','我知道了');
		} else if(!reg1.test($('#tel').val())){
			title_tip('提 示','请填写正确的手机号！~','我知道了');
		} else if(!reg3.test($('#yzcode').val())){
			title_tip('提 示','请填写正确的验证码！~','我知道了');
		} else {
			//调提交接口
			sub_message ();
		}
	});
	
	function countdown(tag, time){
     	var i = time;
		tag.innerHTML = i+'秒';
        countdowntimer = setInterval(function() {
			i--;
			tag.innerHTML = i+'秒';
			if (i === 0) {
				tag.innerHTML = '获取验证码';
				i=60;
				clearInterval(countdowntimer); // 清除定时器
				get_yz.addEventListener("click",getYzcode,false);//恢复计时器
           		countdowntimer=null;
			}
		}, 1000);
   	}
	get_yz.addEventListener('click',getYzcode,false); 
    
    function getYzcode(){
        if ($('#user').val()===''||$('#user').val().indexOf(' ')!==-1) {
			title_tip('提 示','请输入正确的姓名哦！~','我知道了');
		} else if(!reg2.test($('#id').val())||!getIdcardValidateCode($('#id').val())){
			title_tip('提 示','请填写正确的身份证号哦！~','我知道了');
		} else if(!reg1.test($('#tel').val())){
			title_tip('提 示','请填写正确的手机号！~','我知道了');
		} else {
			if (get_yz.innerHTML==='获取验证码') {
                getCheckCode(function(){
                   countdown(get_yz, 60);
               });
            }else{
            	get_yz.removeEventListener('click',getYzcode,false);
            }
		}
    }
	
	function getCheckCode(cb) { // 获取手机验证码
		var javai = vge.csqp + '/DBTHuNanQPInterface/user/getCaptcha';
		var req = {
			"phonenum":$('#tel').val()
		};
		vge.callJApi(javai, req, function(jo) {
			if (jo.result.code=='0') {
	            if( jo.result.businessCode=='0') {
					//成功，开始倒计时
					cb();
				} else if(jo.result.businessCode==='2') {//1
					title_tip('尊敬的用户','您填写的手机号错误，发送验证码失败！','我知道了');
				} else{
					title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
				}
			} else{//code!='0'
				title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
			}
		});
	}
    
   	function sub_message () { // 提交注册信息
   		var javai = vge.csqp + '/DBTHuNanQPInterface/user/savePrize';
		var req = {
			"openid":sessionStorage.openid===undefined?'':sessionStorage.openid,
			"username":$('#user').val(),
			"idcard":$('#id').val(),
			"address":'address',
//			"skukey":sessionStorage.skukey===undefined?'':sessionStorage.skukey,//??
			"phonenum":$('#tel').val(),
			"captcha":$('#yzcode').val(),
			"grandPrizeType":sessionStorage.grandPrizeType===undefined?'':sessionStorage.grandPrizeType,
			"prizeVcode":sessionStorage.prizeVcode===undefined?'':sessionStorage.prizeVcode
		};
		vge.callJApi(javai, req, function(jo) {
			if (jo.result.code==='0') {
	            if( jo.result.businessCode==='0') {
	            		sessionStorage.first='first';
	            		sessionStorage.username = $('#user').val();
	            		sessionStorage.idcard = $('#id').val();
	            		sessionStorage.phonenum = $('#tel').val();
	            		$('.tip').html('温馨提示：您的信息已提交成功，请耐心等待主办方与您联系');
	            		title_tip('提 示','您的中奖信息我们已经收到，请拨打<br> 17607319500联系我们进行身份核实','我知道了','',reload);
					} else if( jo.result.businessCode=='1'){//1
						title_tip('提 示','验证码已失效','我知道了');
					} else if( jo.result.businessCode=='2'){//2
						title_tip('提 示','您填写的验证码有误','我知道了');
					} else if( jo.result.businessCode=='-1'){//-1
						title_tip('提 示','系统升级中...','我知道了');
					} else if(jo.result.businessCode=='4'){
						title_tip('提 示','兑奖截止时间已过期','我知道了');
					}else{
						title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
					}
			} else{//code!='0'
				title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
			}
		});
   	}
	
	function reload(){
		location.reload();
	}
	
	
})();
