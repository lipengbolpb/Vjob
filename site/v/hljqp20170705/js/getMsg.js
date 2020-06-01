(function(){
	var openid = sessionStorage.openid,
		qr = sessionStorage.qr,
		flag = true;
	
	var args = vge.urlparse(location.href),
		bizcode = args.bizcode;

	
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
		var javai = vge.hljqp + '/DBTHLJQPInterface/user/getCaptcha';
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
   		var javai = vge.hljqp + '/DBTHLJQPInterface/user/updateUserInfoMobile';
		var req = {
			"openid":openid,
			"phonenum":$('#tel').val(),
			"captcha":$('#yz_code').val()
		};
		vge.callJApi(javai, req, function(jo) {
			if (jo.result.code==='0') {
	            if( jo.result.businessCode==='0') {
	            		sweep();
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
        	var japi = vge.hljqp+'/DBTHLJQPInterface/sweep/sweepQrcode';
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
    	var now = new Date();
    	console.log("时间:"+now.getTime());
		if(jo.result.code == '0'){
        	switch (jo.result.businessCode) {
	        case '0':               // 普通奖
				sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
				sessionStorage.currentMoney = jo.reply.currentMoney;
				sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
				location.replace('http://' + location.host + '/hljqp20170705/txo/getcash?bizcode='+jo.result.businessCode);
	            break;
	        case '11':              // 自己重复扫，普通奖
				sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
				sessionStorage.currentMoney = jo.reply.currentMoney;
				sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
				location.replace('http://' + location.host + '/hljqp20170705/txo/getcash?bizcode='+jo.result.businessCode);
	            break;
	        case '12':              // 
				location.replace('http://' + location.host + '/v/hljqp20170705/getMsg.html?bizcode='+jo.result.businessCode);
	            break; 
	        case '13':              // 
				location.replace('http://' + location.host + '/v/hljqp20170705/getMsg.html?bizcode='+jo.result.businessCode);
	            break;
	        case '14':              // 
				location.replace('http://' + location.host + '/v/hljqp20170705/getMsg.html?bizcode='+jo.result.businessCode);
	            break;
	        case '15':              // 
				location.replace('http://' + location.host + '/v/hljqp20170705/prize.html?bizcode='+jo.result.businessCode);
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
                location.replace('http://' + location.host + '/v/hljqp20170705/prize.html?bizcode='+jo.result.businessCode);
                break;
	        default:
	        	if(jo.reply){
	        		sessionStorage.batchName = jo.reply.batchName===undefined?'':jo.reply.batchName;
	        	}	
				location.replace('http://' + location.host + '/v/hljqp20170705/fail.html?bizcode='+jo.result.businessCode);
	        }	
	   	}else if(jo.result.code == '-1'){//code !=0;
	   		title_tip('尊敬的用户','系统升级中，请稍后再试！','我知道了');
	   	}else{
	   		title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
	   	}
	}
})();
