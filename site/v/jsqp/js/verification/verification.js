'use strict';
(function(){
	var API_checkPrize = vge.jsqp + '/DBTJSQPInterface/checkUser/checkPrize';
	var openid = sessionStorage.openid;
	
	//显示信息
	$('.title').attr('src',sessionStorage.prizeImg);
	$('#qrcode').val(sessionStorage.prizeVcode);
	$('#prizeName').val(sessionStorage.prizeName);
	$('#earnTime').val(sessionStorage.earnTime.split(' ')[0]);
	$('#endTime').val(sessionStorage.expireTime.split(' ')[0]);
	$('#contact').val(sessionStorage.userName=='undefined'?'':sessionStorage.userName);
	$('#tel').val(sessionStorage.phoneNum=='undefined'?'':sessionStorage.phoneNum);
	$('#checkUserName').val(sessionStorage.checkUserName=='undefined'?'':sessionStorage.checkUserName);
	$('#checkTime').val(sessionStorage.checkTime=='undefined'?'':sessionStorage.checkTime.split('.0')[0]);
	$('#verificationRemark').val(sessionStorage.checkRemarks=='undefined'?'':sessionStorage.checkRemarks);
	
	if(sessionStorage.checkStatus=='1'){//已兑奖
		$('.tip').css('display','none');
		$('#verification').css('display','none');
		$('#verificationRemark').attr('readonly','readonly');
		$('#verificationRemark').attr('placeholder','');
		$('.sign').css('display','block');
	}else{
		$('.checkUserName,.checkTime').css('display','none');
		if(sessionStorage.userName!='undefined'&&sessionStorage.phoneNum!='undefined'){//已填 可兑奖
			$('.tip,.checkUserName,.checkTime').css('display','none');
			$('#verification').on('click',dot);
		}else{
			$('#verificationRemark').attr('readonly','readonly');
			$('#verificationRemark').attr('placeholder','');
			$('#verification').addClass('dis');
		}
	} 
	function dot(){
		$('#verification').unbind();
		setTimeout(function(){
			$('#verification').on('click',dot);
		},1000);
		checkPrize();
	}
	
	$('.alertBtn').on('click',function(e){
		e.stopPropagation();
		$('.alert').css('display','none');
		$('#verification').unbind();
	})
	
	function checkPrize(){
		var javai = API_checkPrize;
		var req = {
			"openid":openid,
			"checkRemarks":$('#verificationRemark').val(),
			"prizeInfoKey":sessionStorage.infoKey
		};
		vge.callJApi(javai,req,function(jo){
			if(jo.result.code=='0'){
				if(jo.result.businessCode=='0'){
					$('.alert').css('display','block');
					$('#verificationRemark').attr('readonly','readonly');
					$('#verification').html('已兑奖');
				}else{
					title_tip('尊敬的用户', jo.result.businessCode+':'+jo.result.msg, '我知道了');
				}
			}else{
				title_tip('尊敬的用户', jo.result.businessCode+':'+jo.result.msg, '我知道了');
			}
		});
	}
	
})()