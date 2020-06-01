(function(){
    
	'use strict';
	var args = vge.urlparse(location.href),openid = args.openid,hbopenid=sessionStorage.openid,flag=false;
	var reg1=/^1[0-9]{10}$/,
		reg2=/^[1-9][0-9xX]{17}$/,
		reg3=/^[0-9]{4}$/;
		
	
	
	
	if(sessionStorage.monthPrizeFlag=='1'){//忠实消费者页面
		$('.give_box').css('display','block');
	}
	
	//忠实消费者相关
	$('.give_box').on('click','#close',function(){
		if(sessionStorage.submited){
			$('.give_box').css('display','none');
		}else{
			$('.pic_box').attr('src','/v/qpzj/img/give_box_1.png?v=1');
			$('.give_alert').css('display','block');
			$('.give_alert').on('click','.leave',function(){
				$('.give_box').css('display','none');
			});
			$('.give_alert').on('click','.continue',function(){
				$('.give_alert').css('display','none');
				$('.pic_box').attr('src','/v/qpzj/img/give_box_2.png?v=1');
			});
		}
	});
	$('#btn').on('click',function(){
		if(flag) return;
		if ($('#username').val()===''||$('#username').val().indexOf(' ')!==-1) {
			title_tip('提 示','请输入正确的姓名哦！~','我知道了');
		} else if(!reg1.test($('#telphone').val())){
			title_tip('提 示','请填写正确的手机号！~','我知道了');
		} else if($('#address2').val()===''){
			title_tip('提 示','请填写正确的地址信息！~','我知道了');
		} else {
			//调提交接口
			$('#btn').html('<img src="/v/sxqp/img/loading.gif" class="loading"/>');
			prizeFlag ();
		}
	});
	
	function prizeFlag () {
		_hmt.push(['_trackEvent', 'click', '忠实消费者', 'getcash']);
		var javai = vge.common + '/vjifenInterface/user/saveMonthPrize';
		var req = { "projectServerName": "zhejiang",
			"openid":openid,//浙江
			"hbopenid":hbopenid,//v积分
			"unionid":sessionStorage.unionid===undefined?'':sessionStorage.unionid,
			"username":$('#username').val(),
			"phonenum":$('#telphone').val(),
			"address":$('#address2').val()
		};
		vge.callJApi(javai, req, function(jo) {
			if (jo.result.code=='0') {
                if( jo.result.businessCode==='0') {
                	sessionStorage.submited = 'submited';
                	sessionStorage.removeItem('monthPrizeFlag');
                	$('#btn').html('提交成功');
                	$('#username').attr('readonly','readonly');
                	$('#telphone').attr('readonly','readonly');
                	$('#address2').attr('readonly','readonly');
                	flag = true;
				} else if( jo.result.businessCode==='1'){//1
					$('#btn').html('提交信息');
					flag = false;
					title_tip('提 示',jo.result.msg,'我知道了');
			    } else {
			    	$('#btn').html('提交信息');
			    	flag = false;
					title_tip('尊敬的用户', jo.result.msg, '我知道了');
				}
			} else{//code!='0'
				flag = false;
				$('#btn').html('提交信息');
				title_tip('尊敬的用户',jo.result.msg,'我知道了');
			}
		});
	}
	
	
	
	if(sessionStorage.earnTime!==undefined){
		$('#slogan').attr('src','/v/qpzj/img/geted.png');
		$('#stub').attr('src','/v/qpzj/img/stub.png');
		$('#dj').css('display','none');
		$('#tip').css('display','none');
		$('.mark').css('height','20rem');
		$('#slogan').css('left','2.4rem');
		$('.earnTime').css('display','block');
		$('#time').html(sessionStorage.earnTime);
	}else{
		var grandPrizeType = sessionStorage.grandPrizeType===undefined?'':sessionStorage.grandPrizeType;
		$('#slogan').attr('src','/v/qpzj/img/prize-slogan.png');
		$('#stub').attr('src','/v/qpzj/img/stub.png');
		$('#dj').css('display','block');
		$('.msg_box').css({
			'background':'#209345 url(/v/qpzj/img/prize-top.png) no-repeat left top',
			'width': '100%',
			'-webkit-background-size': '100% auto',
			'position': 'absolute',
			'top': 0,
			'left': 0,
			'z-index': 100,
			'display': 'none'
		});
		window.onload = function(){
			$('.blue-flower,.pink-flower,.green-flower').addClass('scale');
			$('.green').addClass('g');
			$('.blue').addClass('b');
			$('.pink').addClass('p');
		};
	
	
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
			location.href = 'https://mp.weixin.qq.com/s?__biz=MzI1NTQ5MzA2Mw==&mid=100000003&idx=1&sn=6a7dd1bcae7ec35f8776e6a292a814b1&chksm=6a3457ab5d43debd0242f9296daec0c6019b51a235778c97805836f18e70ae044999cf45eec7#rd';
		});
	
		$('#dj').on('click',function(){
			$('.msg_box').fadeIn(300);
			$('body').css('overflow','auto');
			$(this).parent().css('display','none');
		});
		
		$('#explain').on('click',function(){
			location.href = 'https://mp.weixin.qq.com/s?__biz=MzI1NTQ5MzA2Mw==&mid=100000005&idx=1&sn=e3a9e4ec229d970d429759cd14014433&chksm=6a3457ad5d43debbe4c4571cd37fda1682cd4cd5caab71faaf9931430143fb3d414cc39688c4#rd';
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
			var javai = vge.common + '/vjifenInterface/user/getCaptcha';
			var req = { "projectServerName": "zhejiang",
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
   			var javai = vge.common + '/vjifenInterface/user/savePrize';
			var req = { "projectServerName": "zhejiang",
				"openid":openid,
				"hbopenid":sessionStorage.openid===undefined?'':sessionStorage.openid,
				"unionid":sessionStorage.unionid===undefined?'':sessionStorage.unionid,
				"username":$('#user').val(),
				"idcard":$('#id').val(),
				"skukey":sessionStorage.skukey===undefined?'':sessionStorage.skukey,//??
				"phonenum":$('#tel').val(),
				"captcha":$('#yzcode').val(),
				"address":'address',
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
		            		title_tip('提 示','您的中奖信息我们已经收到，请拨打<br> 0571-28227057联系我们进行身份核实','我知道了','',reload);
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
	}
	
	
})();