(function(){
	var openid = sessionStorage.openid,
		qr = sessionStorage.qr,
		hbopenid = sessionStorage.hbopenid,
		flag = true;
	
	var args = vge.urlparse(location.href),
		bizcode = args.bizcode,
		tx = args.tx;

	
	var get_yz = document.getElementById("get_yz");
	var countdowntimer = null; 
	
	var reg1=/^1[0-9]{10}$/,
		reg2=/^[1-9][0-9xX]{17}$/,
		reg3=/^[0-9]{4}$/;
	
	
	
	if(bizcode==12||bizcode==14){//12可疑  14指定
		document.getElementById('wrap').style.display = 'block';
		document.getElementById("wrap1").style.display = 'none';
	}else if(bizcode==13){//黑名单
		document.getElementById("wrap1").style.display = 'block';
		document.getElementById('wrap').style.display = 'none';
	}
	
	
	$('#tj').on('click',function(){
		if(!reg1.test($('#tel').val())){
			title_tip('提 示','请填写正确的手机号！~','我知道了');
		} else if(!reg3.test($('#yz_code').val())){
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
			if (i <= 0) {
				tag.innerHTML = '获取验证码';
				clearInterval(countdowntimer); // 清除定时器
				get_yz.addEventListener("click",getYzcode,false);//恢复计时器
           		countdowntimer=null;
			}
		}, 1000);
   	}
	get_yz.addEventListener('click',getYzcode,false); 
    
    function getYzcode(){
    	get_yz.removeEventListener('click',getYzcode,false);
        if(!reg1.test($('#tel').val())){
			title_tip('提 示','请填写正确的手机号！~','我知道了');
			get_yz.addEventListener('click',getYzcode,false);
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
		var javai = vge.fjqp + '/DBTFJQPInterface/user/getCaptcha';
		var req = {
			"phonenum":$('#tel').val(),
			"sendtype":"1"
		};
		vge.callJApi(javai, req, function(jo) {
			if (jo.result.code=='0') {
	            if( jo.result.businessCode=='0') {
					//成功，开始倒计时
					cb();
				} else if(jo.result.businessCode==='2') {//1
					title_tip('尊敬的用户','您填写的手机号错误，发送验证码失败！','我知道了');
					get_yz.addEventListener('click',getYzcode,false);
				} else{
					title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
					get_yz.addEventListener('click',getYzcode,false);
				}
			} else{//code!='0'
				title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
				get_yz.addEventListener('click',getYzcode,false);
			}
		});
	}
    
   	function sub_message () { // 提交信息
   		var javai = vge.fjqp + '/DBTFJQPInterface/user/updateUserInfoMobile';
		var req = {
			"openid":openid,
			"phonenum":$('#tel').val(),
			"captcha":$('#yz_code').val()
		};
		vge.callJApi(javai, req, function(jo) {
			if (jo.result.code==='0') {
	            if( jo.result.businessCode==='0') {
	            		if(tx==1){
							give_spack();	            			
	            		}else{
	            			sweep();
	            		}
					} else if( jo.result.businessCode=='1'){//1
						title_tip('提 示','系统开了个小差','我知道了');
					} else if( jo.result.businessCode=='2'){//2
						title_tip('提 示','手机号码已存在','我知道了');
					} else if( jo.result.businessCode=='-1'){//-1
						title_tip('提 示','系统升级中...','我知道了');
					} else if( jo.result.businessCode=='3'){//
						title_tip('提 示','手机号验证失败','我知道了');
					} else{
						title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
					}
			} else{//code!='0'
				title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
			}
		});
   	}
	
	
	
	
	
	function sweep() {
    	if(flag){
    		flag = false;
        	var japi = vge.fjqp+'/DBTFJQPInterface/sweep/sweepQrcode';
        	var req = {
            	"openid":openid,
            	"sweepstr":qr,
            	"longitude": sessionStorage.longitude===undefined?'00':sessionStorage.longitude, //"经度"
            	"latitude": sessionStorage.latitude===undefined?'00':sessionStorage.latitude //"纬度"
        	};
        vge.clog('debug', [japi, JSON.stringify(req)]);
        vge.callJApi(japi, req, cb);
    	}
        
    }
    
    function cb(jo) {
		if(jo.result.code == '0'){
        	switch (jo.result.businessCode) {
	        case '0':               // 普通奖
				sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
				sessionStorage.currentMoney = jo.reply.currentMoney;
				sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
				sessionStorage.weekSignFlag = jo.reply.weekSignFlag;//是否开户自然周签到，1:开启、0或空:关闭
				sessionStorage.weekSignDays = jo.reply.weekSignDays;//当前周已签到周几集合
				sessionStorage.weekSignEarnFlag = jo.reply.weekSignEarnFlag;//周签到红包是否已领取，1:已领取、0未领取
				sessionStorage.weekSignEarnMoney = jo.reply.weekSignEarnMoney;//周签到红包金额
				sessionStorage.weekSignLimitDay = jo.reply.weekSignLimitDay;//周签到天数限制
				sessionStorage.weekSignDiffDay = jo.reply.weekSignDiffDay;//周签到还差天数
				sessionStorage.weekSignPercent = jo.reply.weekSignPercent;//进度百分比
				sessionStorage.weekSignPopup = jo.reply.weekSignPopup;//自然周签到弹出提示
				sessionStorage.earnTime = jo.reply.earnTime===undefined?'':jo.reply.earnTime;//扫码时间				
				location.replace('http://' + location.host + '/fjqp/txo/getcash?bizcode='+jo.result.businessCode);
	            break;
	        case '11':              // 自己重复扫，普通奖
				sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
				sessionStorage.currentMoney = jo.reply.currentMoney;
				sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
				sessionStorage.earnTime = jo.reply.earnTime;
				location.replace('http://' + location.host + '/fjqp/txo/getcash?bizcode='+jo.result.businessCode);
	            break;
	        case '12':              // 
				location.replace('http://' + location.host + '/v/fjqp/getMsg.html?bizcode='+jo.result.businessCode);
	            break; 
	        case '13':              // 
				location.replace('http://' + location.host + '/v/fjqp/getMsg.html?bizcode='+jo.result.businessCode);
	            break;
	        case '14':              // 
				location.replace('http://' + location.host + '/v/fjqp/getMsg.html?bizcode='+jo.result.businessCode);
	            break;
	        case '15':              // 
				location.replace('http://' + location.host + '/v/fjqp/prize.html?bizcode='+jo.result.businessCode);
	            break;    
            case '7':               //一等奖或二等奖
                if(jo.reply.grandPrizeType==0){
                    sessionStorage.address = jo.reply.address===undefined?'':jo.reply.address;
                }
                sessionStorage.username = jo.reply.username===undefined?'':jo.reply.username;
                sessionStorage.idcard = jo.reply.idcard===undefined?'':jo.reply.idcard;
                sessionStorage.phonenum = jo.reply.phonenum===undefined?'':jo.reply.phonenum;
                sessionStorage.skukey = jo.reply.skukey===undefined?'':jo.reply.skukey;
                //中奖具体码
                sessionStorage.prizeVcode = jo.reply.prizeVcode===undefined?'':jo.reply.prizeVcode;
                //特等奖类别
                sessionStorage.grandPrizeType = jo.reply.grandPrizeType===undefined?'':jo.reply.grandPrizeType;
                location.replace('http://' + location.host + '/v/fjqp/prize.html?bizcode='+jo.result.businessCode);
                break;
	        default:
	        	if(jo.reply){
	        		sessionStorage.batchName = jo.reply.batchName===undefined?'':jo.reply.batchName;
	        	}	
				location.replace('http://' + location.host + '/v/fjqp/fail.html?bizcode='+jo.result.businessCode);
	        }	
	   	}else if(jo.result.code == '-1'){//code !=0;
	   		title_tip('尊敬的用户','系统升级中，请稍后再试！','我知道了');
	   	}else{
	   		title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
	   	}
	}
    
    
    function give_spack() {//提现
		var javai = vge.fjqp + '/DBTFJQPInterface/gifts/getGiftspack';
		var req = {
			"openid": openid,
			"hbopenid":hbopenid
		};
		vge.callJApi(javai, req,
	        function(jo) {
//	        	$('#btn').html(sessionStorage.btn);
	            if (jo.result.code == '0') {
		            if (jo.result.businessCode === '0') {
		            	$('#alert').css('display','block');
		            	$('#btn').html('存入我的零钱包');
		            }  else if (jo.result.businessCode === '1') { //1
			            title_tip('提 示', '您的待提余额不足1元，再喝几瓶攒够1元发红包！', '我知道了');
			        } else if (jo.result.businessCode === '2') { //后台金额不足
			            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			        } else if (jo.result.businessCode === '-2') { //-2
		            	title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
		        	} else if (jo.result.businessCode === '5') { //超限
			            title_tip('尊敬的用户', jo.result.msg, '我知道了');
			        } else if (jo.result.businessCode === '3') { //1
			            title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
			        } else if (jo.result.businessCode === '-1') { //-1
			            title_tip('尊敬的用户', '提现操作过于频繁，请稍后再试！', '我知道了');
			        } else {
			            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			        }
	            } else { //code!='0'
		            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
	            }
	    	});
	}

	$('#close').on('click',function(){
		$('#alert').css('display','none');
		subscribe();
	});
	function subscribe(){//判断关注
		var requrl='http://'+vge.o3host+'/wx3/uinfo2?openid='+openid+'&appid='+vge.fjqpappid;
		vge.ajxget(requrl, 5000, function(r){
			try{
				var o = JSON.parse(r);
				if(o.subscribe==0) {//未关注
					window.location.replace('http://'+location.host+'/v/fjqp/attention.html');
				}else{//已关注用户
					window.location.replace('http://'+location.host+'/fjqp/too/mybag');
				}
			}catch(e){
				vge.clog('errmsg', [requrl, e]);
			}
		},function(err){
			vge.clog('errmsg', [requrl, err]);
		});
	}
    
    
    
})();
