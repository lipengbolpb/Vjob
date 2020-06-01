(function(){
    var str_code = document.getElementById("str_code"),
        tel_code = document.getElementById("telcode"),
        telcode_box=document.getElementById('telcode_box'),
        dom_vertion = document.getElementById('yz_box'),
        get_yz = document.getElementById('get_yz'),
        btn = document.getElementById("btn"),
        dom_vertion_code = document.getElementById('yz_code');
    
    
    var args = vge.urlparse(location.href),
        openid = args.openid,bizcode = '',
        unionid = '';
    
    sessionStorage.openid = openid;
    sessionStorage.strcode = '1';
    var reg1=/[0-9a-zA-Z]{12}/,
        reg2=/^1[0-9]{10}/,
        reg3=/[0-9]{4}/;
    var scode='',status=false;

    sessionStorage.openid = openid;

    function only_strcode () {
        telcode_box.style.display='none';
        dom_vertion.style.display = 'none';
        status=false;
        str_code.addEventListener('keyup',function () {
            if (reg1.test(str_code.value)) {
				$('#btn').css({'background':'url(/v/hnqp20170915/img/button_3.png) no-repeat center','-webkit-background-size':'auto 100%'});
				btn.addEventListener('click',dot,false);
            } else{
            	btn.removeEventListener('click',dot,false);
                $('#btn').css({'background':'url(/v/hnqp20170915/img/button_4.png) no-repeat center','-webkit-background-size':'auto 100%'});
            }
        },false);
    }
	
    function need_yzcode () {
        telcode_box.style.display='block';
        dom_vertion.style.display='block';
        document.getElementsByTagName('body')[0].onload = window.scrollTo(0,document.body.scrollHeight);//自动滚动到底部
        status=true;
        document.addEventListener('keyup',function () {
            if (reg1.test(str_code.value)&&reg2.test(tel_code.value)&&reg3.test(dom_vertion_code.value)) {
            	btn.addEventListener('click',dot,false);
                $('#btn').css({'background':'url(/v/hnqp20170915/img/button_3.png) no-repeat center','-webkit-background-size':'auto 100%'});
            } else{
            	btn.removeEventListener('click',dot,false);
                $('#btn').css({'background':'url(/v/hnqp20170915/img/button_4.png) no-repeat center','-webkit-background-size':'auto 100%'});
            }
        },false);
    }
    function btnShow(){
    	$('#btn').css('display','block');
    }
    function dot() {
    	btn.removeEventListener('click',dot,false);
    	$('#btn').css('display','none');
        scode = str_code.value.trim();
        sessionStorage.qr = scode;
        if (!status) {//不需要验证码
            if(scode.length<12||scode.indexOf(' ')!==-1) {
                title_tip('提 示','填写的串码有误，请仔细核对您的串码！','我知道了',undefined,btnShow);
                return;
            } else{
                sendcode();
            }
        } else{//需要验证码
            if(!reg1.test(scode)){
                title_tip('提 示','请填写正确的瓶盖串码哦！~','我知道了',undefined,btnShow);
            } else if(!reg2.test(tel_code.value)){
                title_tip('提 示','请填写正确的手机号！~','我知道了',undefined,btnShow);
            }else if (!reg3.test(dom_vertion_code.value)) {
                title_tip('提 示','请输入正确的验证码~','我知道了',undefined,btnShow);
            } else{
                sendcode();
            }
        }  
    }

    get_yz.addEventListener('click',getYzcode,false); 

    function getYzcode(){
        if(!reg1.test(str_code.value)){
            title_tip('提 示','请填写正确的瓶盖串码哦！~','我知道了');
        } else if(!reg2.test(tel_code.value)){
            title_tip('提 示','请填写正确的手机号！~','我知道了');
        } else{
            if (get_yz.value==='获取验证码') {
                getCheckCode(function(){
                   countdown(get_yz, 60);
                });
            }else{
                get_yz.removeEventListener('click',getYzcode,false);
            }
        }
    }
    
    function getCheckCode(cb) {//获取验证码
        var javai = vge.hnqp + '/DBTHuaNQPInterface/user/getCaptcha';
        var req = {
            "phonenum": tel_code.value,
            "sendtype": 1//0-一等奖,1-普通(一等奖页面不传，后台默认值，串码页面都传1)
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
    function countdown(tag, time){
        var i = time;
        tag.value = i+'秒';
        var countdowntimer = setInterval(function() {
            i--;
            tag.value = i+'秒';
            if (i < 1) {
                tag.value = '获取验证码';
                i=60;
                clearInterval(countdowntimer); // 清除定时器
                get_yz.addEventListener('click',getYzcode,false);
                countdowntimer=null;
            }else{
                get_yz.removeEventListener('click',getYzcode,false);
            }
        }, 1000);
    }

    
    function init () {
        var javai = vge.hnqp + '/DBTHuaNQPInterface/sweep/getFailCount';
        var req = {
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

	$('.tip_box').on('click',function(){
		$('.fail_tip').css('display','none');
		$('#batch,.time').css('display','none');
	});

    function sendcode() {
        var javai = vge.hnqp + '/DBTHuaNQPInterface/sweep/serialCode';
        var req = {
            "openid":openid,
            "serialcode":scode,
            "verifycode":dom_vertion_code.value===''?'':dom_vertion_code.value,
            "phone":tel_code.value===''?'':tel_code.value,
            "longitude": sessionStorage.longitude===undefined?'':sessionStorage.longitude,//"经度"
            "latitude": sessionStorage.latitude===undefined?'':sessionStorage.latitude //"纬度"
        };
        vge.callJApi(javai, req, function(jo) {
        	$('#btn').css('display','block');
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
				sessionStorage.activityVersion = jo.reply.activityVersion;//1.广东    2.海南    3.海南罐装
				location.replace('http://' + location.host + '/hnqp20170915/txo/getcash?bizcode='+jo.result.businessCode);
	            break;
	        case '11':              // 自己重复扫，普通奖
				sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
				sessionStorage.currentMoney = jo.reply.currentMoney;
				sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
				sessionStorage.earnTime = jo.reply.earnTime;
				location.replace('http://' + location.host + '/hnqp20170915/txo/repcash?bizcode='+jo.result.businessCode);
	            break;
	        case '12':              // 可疑用户
				location.replace('http://' + location.host + '/v/hnqp20170915/getMsg.html?bizcode='+jo.result.businessCode);
	            break;    
	        case '13':              // 黑名单
				location.replace('http://' + location.host + '/v/hnqp20170915/getMsg.html?bizcode='+jo.result.businessCode);
	            break;  
	        case '14':              // 指定
				location.replace('http://' + location.host + '/v/hnqp20170915/getMsg.html?bizcode='+jo.result.businessCode);
	            break;   
	        case '-1':              // 升级中
	        	$('.fail_tip').css('display','block');
	        	$('.fail_msg').attr('src','/v/hnqp20170915/img/fail_tip_-1.png?v=1');
	            break; 
	        case '1':              // 不存在
				title_tip('尊敬的用户','这个二维码不存在！~','我知道了');
	            break; 
	        case '2':              // 被扫过
				$('.fail_tip').css('display','block');
        		$('.fail_msg').attr('src','/v/hnqp20170915/img/fail_tip_2.png');
        		$('.time').css('display','block');
        		if(jo.reply.earnTime){
        			$('.time').html('扫码时间：<span>'+jo.reply.earnTime+'</span>');
        		}
	        	break;
	        case '3':              // 过期
				$('.fail_tip').css('display','block');
	        	$('.fail_msg').attr('src','/v/hnqp20170915/img/fail_tip_3.png');
	            break; 
	        case '17':              // 过期
				$('.fail_tip').css('display','block');
	        	$('.fail_msg').attr('src','/v/hnqp20170915/img/fail_tip_3.png');
	            break;    
	        case '4':              // 未开始
				$('.fail_tip').css('display','block');
	        	$('.fail_msg').attr('src','/v/hnqp20170915/img/fail_tip_4.png');
	        	$('#batch').css('display','block');
	        	$('#batch').html(jo.reply.batchName+'<br />服务热线：18769150817');
	            break;
	        case '5':              // 已截止
				$('.fail_tip').css('display','block');
	        	$('.fail_msg').attr('src','/v/hnqp20170915/img/fail_tip_5.png?v=1');
	            break;
	        case '6':              // 指定
				$('.fail_tip').css('display','block');
	        	$('.fail_msg').attr('src','/v/hnqp20170915/img/fail_tip_6.png');
	            break;  
	        case '8':              // 需要验证码
				need_yzcode();
	            break;
	        case '9':              // 验证码错误
				title_tip('尊敬的用户','验证码错误！~','我知道了');
	            break;
	        case '18':              // 验证码错误
				title_tip('尊敬的用户','此码未被使用<br />活动批次：'+jo.reply.batchName,'我知道了');
	            break;    
	        case '10':              // 错误超过6次,请明天再试
				$('.fail_tip').css('display','block');
	        	$('.fail_msg').attr('src','/v/hnqp20170915/img/fail_tip_many.png');
	            break;    
	        default:
				title_tip('尊敬的用户', jo.result.businessCode+':'+jo.result.msg, '我知道了');
				break;
	        }	
	   	}else if(jo.result.code == '-1'){//code !=0;
	   		title_tip('尊敬的用户','系统升级中，请稍后再试！','我知道了');
	   	}else{
	   		title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
	   	}
	   });
    }
    init();//初始化查询输入次数
})();




