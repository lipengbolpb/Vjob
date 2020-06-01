(function() {
	"use strict";
		
    var reg1=/[0-9a-zA-Z]{11}/,
         reg2=/^1[0-9]{10}/,
         reg3=/[0-9]{4}/;
    var countdowntimer=null,scode='',status=false;
    var batch = document.getElementById("batch");
    var strcode = document.getElementById("strcode"),
    	btn = document.getElementById("btn"),
    	get_yz = document.getElementById("get_yz");
    	
	var args = vge.urlparse(location.href),
	    hbopenid = args.openid,//支付
	    vjifenOpenid=args.vjifenOpenid;//v积分
        unionid = '';
	sessionStorage.openid = openid;
	
    function only_strcode(){
        status=false;
        strcode.addEventListener('input',function (){
            if (reg1.test($('#strcode').val())) {
                $('#btn').css({'background':'#ffdc45','color':'#ea5244'});
                btn.disabled=false;
            } else{
                $('#btn').css({'background':'#fee880','color':'#d78a8d'});
                btn.disabled=true;
            }
        },false);
    }
    
    function need_yzcode () {
        $('.tel_box').css('display','block');
        $('.yz_box').css('display','block');
        status=true;
        document.addEventListener('keyup',function () {
            if (reg1.test($('#strcode').val())&&reg2.test($('#tel').val())&&reg3.test($('#yz_code').val())) {
                $('#btn').css({'background':'#ffdc45','color':'#ea5244'});
               	btn.disabled=false;
            } else{
                $('#btn').css({'background':'#fee880','color':'#d78a8d'});
                btn.disabled=true;
            }
        },false);
    }
    
    
    btn.addEventListener('click', function () {
            scode = $('#strcode').val().trim();
            if (!status) {//不需要验证码
                if(scode.length<11||scode.indexOf(' ')!==-1) {
                    title_tip('提 示','填写的串码有误，请仔细核对您的串码！','我知道了');
                    return;
                } else{
                    var requrl='http://'+vge.h5ost+'/wx/vxuinfo?openid='+openid;
                    vge.ajxget(requrl, 5000, function(r){
                        try{
                            var o = JSON.parse(r);
                            unionid = o.unionid;
                            sessionStorage.unionid=unionid;
                            sendcode();
                        }catch(e){
                            vge.clog('errmsg', [requrl, e]);
                        }
                    },function(err){
                        vge.clog('errmsg', [requrl, e]);
                    });
                }
            } else{//需要验证码
                if(!reg1.test(scode)){
                    title_tip('提 示','请填写正确的瓶盖串码哦！~','我知道了');
                } else if(!reg2.test($('#tel').val())){
                    title_tip('提 示','请填写正确的手机号！~','我知道了');
                } else if (!reg3.test($('#yz_code').val())) {
                    title_tip('提 示','请输入正确的验证码~','我知道了');
                } else{
                    var requrl='http://'+vge.h5ost+'/wx/vxuinfo?openid='+openid;
                    vge.ajxget(requrl, 5000, function(r){
                        try{
                            var o = JSON.parse(r);
                            unionid = o.unionid;
                            sessionStorage.unionid=unionid;
                            sendcode();
                        }catch(e){
                            vge.clog('errmsg', [requrl, e]);
                        }
                    },function(err){
                        vge.clog('errmsg', [requrl, e]);
                    });
                }
            }  
    }, false);
    
    
    
    
    get_yz.addEventListener('click',getYzcode,false); 
    
    function getYzcode(){
        if(!reg1.test($('#strcode').val())){
            title_tip('提 示','请填写正确的瓶盖串码哦！~','我知道了');
        } else if(!reg2.test($('#tel').val())){
            title_tip('提 示','请填写正确的手机号！~','我知道了');
        } else{
            if (get_yz.innerHTML==='获取验证码') {
                getCheckCode(function(){
                   countdown(get_yz, 60);
               });
            }else{
            	get_yz.removeEventListener('click',getYzcode,false);
            }
        }
    }
    
    function getCheckCode(cb) {//获取验证码
        //_hmt.push(['_trackEvent', 'click', '获取验证码', 'strcode']);
        var javai = vge.common + '/vjifenInterface/user/getCaptcha';
        var req = { "projectServerName": "guangxi",
            "phonenum": $('#tel').val(),
            "sendtype": 1//0-一等奖,1-普通(一等奖页面不传，后台默认值，串码页面都传1)
        };
        vge.callJApi(javai, req, function(jo) {
            if (jo.result.code=='0') {
                if( jo.result.businessCode=='0') {
                    //成功，开始倒计时
                    cb();
                } else if(jo.result.businessCode==='2') {//1
                    title_tip('尊敬的用户','您填写的手机号错误，发送验证码失败！','我知道了');
                } else {
                    title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
                }
            } else{//code!='0'
                title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
            }
        });
    }
    
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
                get_yz.addEventListener('click',getYzcode,false);
            countdowntimer=null;
            }else{
            	get_yz.removeEventListener('click',getYzcode,false);
            }
        }, 1000);
    }
	init();
    function init () {
        var javai = vge.common + '/vjifenInterface/sweep/getFailCount';
        var req = { "projectServerName": "guangxi",
            "openid":openid
        };
        vge.callJApi(javai, req, function(jo) {
            if (jo.result.code ==='0') {
                switch(jo.result.businessCode) {
                    case '0':
                        only_strcode ();
                        break;
                    case '1':// 1 - 程序异常,,
                        title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
                        break;
                    case '2':// 2 - 需要验证码
                        need_yzcode();
                        break;
                    case '3':// 3 - 错误超过6次
                        only_strcode();
                        break;
                    default:
                        alert('未知返回码' + jo.result.businessCode + jo.result.msg);
                    }
            } else{//code!='0'
                title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
            }
        });
    }
    
    function sendcode() {
		var javai = vge.common + '/vjifenInterface/sweep/serialCode';
		var req = { "projectServerName": "guangxi",
            "openid":openid,
            "unionid":unionid,
	        "serialcode":scode,
	        "phone":$('#tel').val()===''?'':$('#tel').val(),
	        "verifycode":$('#yz_code').val()===''?'':$('#yz_code').val(),
            "longitude": sessionStorage.longitude===undefined?'':sessionStorage.longitude,//"经度"
            "latitude": sessionStorage.latitude===undefined?'':sessionStorage.latitude //"纬度"
		};
		vge.callJApi(javai, req, function(jo) {
			if (jo.result.code ==='0') {

                var getcash = '/v/gxqp/getcash.html', // 扫码红包普通奖
                    repcash = '/v/gxqp/repcash.html', // 用户再次扫码
                    prize = '/v/gxqp/prize.html',     // 扫码红包一二等奖
                    fail =  'http://'+vge.qpgx_host+'/v/gxqp/fail.html?bizcode=';
              
                if(jo.reply && jo.reply.activityVersion==='2') { // 春节版
                    
                    var currentMoneyUrl=jo.reply.currentMoney;
                    var totalAccountMoneyUrl=jo.reply.totalAccountMoney;
                    var codeContentUrl=encodeURIComponent(jo.reply.codeContentUrl);
                    getcash = vge.site+'/v/gxqp/getcash.html?openid='+openid+'&unionid='+unionid+'&currentMoney='+currentMoneyUrl+'&totalAccountMoney='+totalAccountMoneyUrl+'&codeContentUrl='+codeContentUrl;
                    repcash = vge.site+'/v/gxqp/more.html?openid='+openid+'&unionid='+unionid+'&currentMoney='+currentMoneyUrl+'&totalAccountMoney='+totalAccountMoneyUrl+'&codeContentUrl='+codeContentUrl;
                    if(jo.reply.grandPrizeType === '1') { // 特等奖类别: 1 金元宝  2 银元宝
            	        if(jo.reply.username){
	                        prize = vge.site+'/v/gxqp/prize.html?openid='+openid+'&unionid='+unionid+'&username='+jo.reply.username+'&phonenum='+jo.reply.phonenum+'&idcard='+jo.reply.idcard+'&gpt='+jo.reply.grandPrizeType;	
            	        }else {
            		        prize = vge.site+'/v/gxqp/prize.html?openid='+openid+'&unionid='+unionid+'&skukey='+jo.reply.skukey+'&vqr='+jo.reply.prizeVcode+'&gpt='+jo.reply.grandPrizeType;	
            	        }
                    }else if(jo.reply.grandPrizeType === '2'){
            	        if(jo.reply.username){
            		        prize = vge.site+'/v/gxqp/prize2.html?openid='+openid+'&unionid='+unionid+'&username='+jo.reply.username+'&phonenum='+jo.reply.phonenum+'&idcard='+jo.reply.idcard+'&gpt='+jo.reply.grandPrizeType;
            	        }else {
            		        prize = vge.site+'/v/gxqp/prize2.html?openid='+openid+'&unionid='+unionid+'&skukey='+jo.reply.skukey+'&vqr='+jo.reply.prizeVcode+'&gpt='+jo.reply.grandPrizeType;
            	        }
                    }
                    fail =  'http://'+vge.qpgx_host+'/v/gxqp/fail.html?newyear=1&bizcode=';
                }
				if(jo.reply && jo.reply.activityVersion==='3'){
                	getcash = '/v/gxqp201703/getcash.html', // 扫码红包普通奖
            		repcash = '/v/gxqp201703/repcash.html?bizcode=11', // 用户再次扫码
           			prize = '/v/gxqp201703/prize.html',    // 扫码红包一二等奖
            		fail =  'http://'+vge.qpgx_host+'/v/gxqp201703/fail.html?batchName='+jo.batchName+'&bizcode=';	
                }
                
                switch(jo.result.businessCode) {
                case '0':
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    
                    location.replace(getcash);
                    break;
                case '1':// 1 - 该积分码不存在"
                  	$('.mark').css('display','block');
                  	$('#err').attr('src','/v/gxqp201703/img/err4.png?v=1');
                    break;
                case '2':// 2 - 该积分码已经被使用过
                    $('.mark').css('display','block');
                  	$('#err').attr('src','/v/gxqp201703/img/err7.png');
                    break;
                case '3':// 3 - 积分码已过期
                    $('.mark').css('display','block');
                  	$('#err').attr('src','/v/gxqp201703/img/err3.png?v=11');
                    break;
                case '4':// 4 - 活动未开始
                    $('.mark').css('display','block');
                  	$('#err').attr('src','/v/gxqp201703/img/err2.png');
                  	batch.innerHTML = jo.reply.batchName+'<br />服务热线：4008365591';
                    break;
                case '5':// 5 - 活动已结束
                    $('.mark').css('display','block');
                  	$('#err').attr('src','/v/gxqp201703/img/err3.png?v=11');
                    break;
                case '6':// 6 - 积分码异常(通常为服务器报错)
                    $('.mark').css('display','block');
                  	$('#err').attr('src','/v/gxqp201703/img/err5.png');
                    break;
                case '7':// 7 - 一等奖
                    if(jo.reply!==undefined) {
                        if(jo.reply.username !== undefined) {
                            sessionStorage.username = jo.reply.username;
                            sessionStorage.idcard = jo.reply.idcard;
                            sessionStorage.phonenum = jo.reply.phonenum;
                        }else{              // 未填写过信息
                            sessionStorage.skukey = jo.reply.skukey;
                            sessionStorage.vqr = jo.reply.prizeVcode;
                            sessionStorage.gpt = jo.reply.grandPrizeType;
                        }
                    }else{
                        sessionStorage.username = '信息查询失败 no reply';
                    }
                    location.replace(prize);
                    // location.href = '/v/gxqp/prize.html';
                    break;
                case '8':// 8-需要验证码
                	title_tip('提 示','您需要输入验证码！','我知道了');
                    need_yzcode();
                    break;
                case '9':// 9-验证码不正确
                    title_tip('提 示','您输入的验证码不正确，请重新输入！','我知道了');
                    break;
                case '10': // 10-错误超过6次,请明天再试
                    $('.mark').css('display','block');
                  	$('#err').attr('src','/v/gxqp201703/img/err1.png');
                    only_strcode();
                    break;
                case '11':
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    
                    location.replace(repcash);
                    break;
                case '12':
                    location.replace(fail+jo.result.businessCode);
                    break;
                case '-1':
		        	title_tip('尊敬的用户','亲，扫码人数太多，后台余额不足<br />掌柜正在快马加鞭进行充值。<br />请保存好瓶盖，晚些时候再试~','我知道了');
		        	break;    
                default:
                    alert('未知返回码' + jo.result.businessCode + jo.result.msg);
				}
			} else{//code!='0'
				title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
			}
		});
	}
    $('.mark').on('click',function(){
    	$('.mark').css('display','none');
    });
})();
