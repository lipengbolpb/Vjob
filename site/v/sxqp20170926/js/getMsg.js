(function(){
	var openid = sessionStorage.openid,
		qr = sessionStorage.qr,
		hbopenid = sessionStorage.hbopenid,
		flag = true;
	
	var args = vge.urlparse(location.href),
		tx = args.tx,
		bizcode = args.bizcode;

	
	var get_yz = document.getElementById("get_yz");
	var countdowntimer = null; 
	
	var reg1=/^1[0-9]{10}$/,
		reg2=/^[1-9][0-9xX]{17}$/,
		reg3=/^[0-9]{4}$/;
	
	
	
	if(bizcode==12){//可疑
		document.getElementById('wrap').style.display = 'block';
		document.getElementById("wrap1").style.display = 'none';
	}else if(bizcode==13){//黑名单
		document.getElementById("wrap1").style.display = 'block';
		document.getElementById('wrap').style.display = 'none';
	}else if(bizcode==14){
		document.getElementById('wrap').style.display = 'block';
		document.getElementById("wrap1").style.display = 'none';
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
		var javai = vge.sxqp + '/DBTSXQPInterface/user/getCaptcha';
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
   		var javai = vge.sxqp + '/DBTSXQPInterface/user/updateUserInfoMobile';
		var req = {
			"openid":openid,
			"phonenum":$('#tel').val(),
			"captcha":$('#yz_code').val()
		};
		vge.callJApi(javai, req, function(jo) {
			if (jo.result.code==='0') {
	            if( jo.result.businessCode==='0') {
	            		if(tx=='1'){
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
        	var japi = vge.sxqp+'/DBTSXQPInterface/sweep/sweepQrcode';
        	var req = {
            	"openid":openid,
            	"sweepstr":qr,
            	"longitude": sessionStorage.longitude===undefined?'00':sessionStorage.longitude, //"经度"
            	"latitude": sessionStorage.latitude===undefined?'00':sessionStorage.latitude //"纬度"
        	};
        vge.clog('debug', [japi, JSON.stringify(req)]);
        vge.callJApi(japi, req, cbk);
    	}
    }
    
    
    
    
    function cbk(jo) {
		if(jo.result.code == '0'){
        	switch (jo.result.businessCode) {
	        case '0':               // 普通奖
				sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
				sessionStorage.currentMoney = jo.reply.currentMoney;
				sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
				sessionStorage.weekSignFlag = jo.reply.weekSignFlag;
				sessionStorage.weekSignDays = jo.reply.weekSignDays;
				sessionStorage.weekSignEarnFlag = jo.reply.weekSignEarnFlag;
				sessionStorage.weekSignEarnMoney = jo.reply.weekSignEarnMoney;
				sessionStorage.weekSignLimitDay = jo.reply.weekSignLimitDay;
				sessionStorage.weekSignDiffDay = jo.reply.weekSignDiffDay;
				sessionStorage.weekSignPercent = jo.reply.weekSignPercent;
                sessionStorage.earnTime = jo.reply.earnTime;
				location.replace('http://' + location.host + '/sxqp20170926/txo/getcash?bizcode='+jo.result.businessCode);
	            break;
	        case '11':              // 自己重复扫，普通奖
				sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
				sessionStorage.currentMoney = jo.reply.currentMoney;
				sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                sessionStorage.earnTime = jo.reply.earnTime===undefined?'':jo.reply.earnTime;
				location.replace('http://' + location.host + '/sxqp20170926/txo/repcash?bizcode='+jo.result.businessCode);
	            break;
	        case '12':              // 可疑用户
				location.replace('http://' + location.host + '/v/sxqp20170926/getMsg.html?bizcode='+jo.result.businessCode);
	            break;    
	        case '13':              // 黑名单
				location.replace('http://' + location.host + '/v/sxqp20170926/getMsg.html?bizcode='+jo.result.businessCode);
	            break;
            case '14':              // 与12相同
                location.replace('http://' + location.host + '/v/sxqp20170926/getMsg.html?bizcode='+jo.result.businessCode);
                break;
            case '7':              // 大奖
                sessionStorage.username = jo.reply.username===undefined?'':jo.reply.username;
                sessionStorage.phonenum = jo.reply.phonenum===undefined?'':jo.reply.phonenum;
                sessionStorage.idcard = jo.reply.idcard===undefined?'':jo.reply.idcard;
                sessionStorage.skukey = jo.reply.skukey;
                sessionStorage.prizeVcode = jo.reply.prizeVcode;
                sessionStorage.grandPrizeType = jo.reply.grandPrizeType===undefined?'':jo.reply.grandPrizeType;
                location.replace('http://' + location.host + '/v/sxqp20170926/prize.html?bizcode='+jo.result.businessCode);
                break;
            case '15':  //他人重复扫大奖
                sessionStorage.grandPrizeType = jo.reply.grandPrizeType===undefined?'':jo.reply.grandPrizeType;
                sessionStorage.earnTime = jo.reply.earnTime===undefined?'':jo.reply.earnTime;//扫码时间
                location.replace('http://' + location.host + '/v/sxqp20170926/prize.html?bizcode='+jo.result.businessCode);
                break;    
	        default:
	        	if(jo.reply){
	        		sessionStorage.batchName = jo.reply.batchName===undefined?'':jo.reply.batchName;
                    sessionStorage.earnTime = jo.reply.earnTime===undefined?'':jo.reply.earnTime;
	        	}else{
                    sessionStorage.earnTime = '';
                }	
				location.replace('http://' + location.host + '/v/sxqp20170926/fail.html?bizcode='+jo.result.businessCode);
	        }	
	   	}else if(jo.result.code == '-1'){//code !=0;
	   		title_tip('尊敬的用户','系统升级中，请稍后再试！','我知道了');
	   	}else{
	   		title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
	   	}
	}
    function give_spack() {//提现
		// title_tip('提 示', '微信提现升级中，您可先扫码，红包会自动累积哦！', '我知道了');
		var javai = vge.sxqp + '/DBTSXQPInterface/gifts/getGiftspack';
		var req = {
				"openid": openid,
				"hbopenid":hbopenid
			};
		vge.callJApi(javai, req,
	        function(jo) {
	        	$('#loading').css('display','none');
	            if (jo.result.code == '0') {
		            if (jo.result.businessCode === '0') {
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
			            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			        }
	            } else if(jo.result.code == '-1'){
	            	title_tip('尊敬的用户', '系统升级中...', '我知道了');
	            } else { //code!='0'
		            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
	            }
	   		});
	}
	
	function ifremeber(){
		var requrl='http://'+vge.o3host+'/wx3/uinfo2?openid='+openid+'&appid='+vge.sxqpappid;
		vge.ajxget(requrl, 5000, function(r){
			try{
				var o = JSON.parse(r);
				if(o.subscribe=='0') {//未关注
					window.location.replace('http://'+location.host+'/v/sxqp20170926/attention.html');
				}else{//已关注用户
					window.location.replace('http://'+location.host+'/sxqp20170926/too/mybag');
				}
			}catch(e){
				vge.clog('errmsg', [requrl, e]);
			}
		},function(err){
			vge.clog('errmsg', [requrl, err]);
		});
	}
	$('.tx_mark').on('click',function(){
		$(this).css('display','none');
		ifremeber();
	});
})();
