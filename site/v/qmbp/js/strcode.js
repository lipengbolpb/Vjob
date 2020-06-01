(function(){
    window.onload = function(){
        var H = document.body.clientHeight;
        document.body.style.backgroundSize = "100%"+H;
    }

    var str_code = document.getElementById("str_code"),
        dom_btn = document.getElementById("btn"),
        mark = document.getElementsByClassName("fail_tip")[0],
        tel_code = document.getElementById("telcode"),
        telcode_box=document.getElementById('telcode_box'),
        dom_vertion = document.getElementById('yz_box'),
        get_yz = document.getElementById('get_yz'),
        pic_tip = document.getElementsByClassName('pic_tip')[0],
        dom_vertion_code = document.getElementById('yz_code'),
        time = document.getElementsByClassName('title')[0];
    
    var args = vge.urlparse(location.href),
        openid = args.openid,bizcode = '',
        unionid = '';
    
    //为了判断2020年
    var skuYear = sessionStorage.skuYear == undefined ? '' : sessionStorage.skuYear; 
    if(skuYear == '2020'){ //2020年 slogan
		$('.slogan').attr('src','/v/qmbp/img/slogan2020.png');
    }
    sessionStorage.openid = openid;
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
                dom_btn.disabled=false;
                dom_btn.style.color='#cd0712';
                dom_btn.style.backgroundColor='#ffd732';
            } else{
                dom_btn.disabled=true;
                dom_btn.style.color='#ffffff';
            }
        },false);
    }
	
	
    function need_yzcode () {
        dom_btn.style.marginBottom = '1rem';
        telcode_box.style.display='block';
        dom_vertion.style.display='block';
        document.getElementsByTagName('body')[0].onload = window.scrollTo(0,document.body.scrollHeight);//自动滚动到底部
        status=true;
        document.addEventListener('keyup',function () {
            if (reg1.test(str_code.value)&&reg2.test(tel_code.value)&&reg3.test(dom_vertion_code.value)) {
                dom_btn.disabled=false;
                dom_btn.style.color='#cd0712';
                dom_btn.style.backgroundColor='#ffd732';
            } else{
                dom_btn.disabled=true;
                dom_btn.style.color='#ffffff';
            }
        },false);
    }
    
    dom_btn.addEventListener('click', function () {
        scode = str_code.value.trim();
        sessionStorage.qr = scode;
        if (!status) {//不需要验证码
            if(scode.length<12||scode.indexOf(' ')!==-1) {
                title_tip('提 示','填写的串码有误，请仔细核对您的串码！','我知道了');
                return;
            } else{
                var requrl='http://'+vge.o3host+'/wx3/uinfo2?openid='+openid+'&appid='+vge.qmbpappid;
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
            } else if(!reg2.test(tel_code.value)){
                title_tip('提 示','请填写正确的手机号！~','我知道了');
            }else if (!reg3.test(dom_vertion_code.value)) {
                title_tip('提 示','请输入正确的验证码~','我知道了');
            } else{
                var requrl='http://'+vge.o3host+'/wx3/uinfo2?openid='+openid+'&appid='+vge.qmbpappid;
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
        var javai = vge.common + '/vjifenInterface/user/getCaptcha';
        var req = {
            "projectServerName":"qmbaipi",
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
        var javai = vge.common + '/vjifenInterface/sweep/getFailCount';
        var req = {
            "projectServerName":"qmbaipi",
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
        var req = {
            "projectServerName":"qmbaipi",
            "openid":openid,
            // "unionid":unionid,
            "serialcode":scode,
            "verifycode":dom_vertion_code.value===''?'':dom_vertion_code.value,
            "phone":tel_code.value===''?'':tel_code.value,
            "longitude": sessionStorage.longitude===undefined?'':sessionStorage.longitude,//"经度"
            "latitude": sessionStorage.latitude===undefined?'':sessionStorage.latitude //"纬度"
        };
        vge.callJApi(javai, req, function(jo) {
            if(jo.result.code == '0'){
	            if(jo.reply){
	        		sessionStorage.batchName = jo.reply.batchName===undefined?'':jo.reply.batchName;
	        		sessionStorage.earnTime = jo.reply.earnTime === undefined?'':jo.reply.earnTime;
	        	}	
        	switch (jo.result.businessCode) {
	        case '0':               // 普通奖
				sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney==undefined?'0':jo.reply.totalAccountMoney;
				sessionStorage.currentMoney = jo.reply.currentMoney==undefined?'0':jo.reply.currentMoney;
				sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                sessionStorage.earnTime = jo.reply.earnTime===undefined?'':jo.reply.earnTime;
				location.replace('http://' + location.host + '/qmbp/txo/getcash?bizcode='+jo.result.businessCode);
	            break;
	        case '11':              // 自己重复扫，普通奖
				sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney==undefined?'0':jo.reply.totalAccountMoney;
				sessionStorage.currentMoney = jo.reply.currentMoney==undefined?'0':jo.reply.currentMoney;
				sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                sessionStorage.earnTime = jo.reply.earnTime===undefined?'':jo.reply.earnTime;
				location.replace('http://' + location.host + '/qmbp/txo/getcash?bizcode='+jo.result.businessCode);
	            break;
	        case '12':              // 可疑用户
				location.replace('http://' + location.host + '/v/qmbp/getMsg.html?bizcode='+jo.result.businessCode);
	            break;    
	        case '13':              // 黑名单
				location.replace('http://' + location.host + '/v/qmbp/getMsg.html?bizcode='+jo.result.businessCode);
	            break;
            case '14':              // 与12相同
                location.replace('http://' + location.host + '/v/qmbp/getMsg.html?bizcode='+jo.result.businessCode);
                break;
            case '7':              // 大奖
                sessionStorage.username = jo.reply.username===undefined?'':jo.reply.username;
                sessionStorage.phonenum = jo.reply.phonenum===undefined?'':jo.reply.phonenum;
                sessionStorage.idcard = jo.reply.idcard===undefined?'':jo.reply.idcard;
                sessionStorage.skukey = jo.reply.skukey;
                sessionStorage.prizeVcode = jo.reply.prizeVcode;
                sessionStorage.grandPrizeType = jo.reply.grandPrizeType===undefined?'':jo.reply.grandPrizeType;
                location.replace('http://' + location.host + '/v/qmbp/prize.html?bizcode='+jo.result.businessCode);
                break;
            case '15':  //他人重复扫大奖
                sessionStorage.grandPrizeType = jo.reply.grandPrizeType===undefined?'':jo.reply.grandPrizeType;
                sessionStorage.earnTime = jo.reply.earnTime===undefined?'':jo.reply.earnTime;//扫码时间
                location.replace('http://' + location.host + '/v/qmbp/prize.html?bizcode='+jo.result.businessCode);
                break;
	        case '-1':              // 升级中
	        	mark.style.display = 'block';
	        	$('.slogan').css('display','none');
	        	pic_tip.src = '/v/qmbp/img/fail_tip_-1.png?v=1';
	        	time.innerHTML = '稍安勿躁，敬请关注';
	            break; 
	        case '1':      // 不存在
	        	mark.style.display = 'block';
	        	$('.slogan').css('display','none');
	        	pic_tip.src = '/v/qmbp/img/fail_tip_3.png?v=1.1';
	        	time.innerHTML = '再扫一瓶试试看';
	            break; 
	        case '2':              // 被扫过
				if(jo.reply){
					mark.style.display = 'block';
					$('.slogan').css('display','none');
					pic_tip.src = '/v/qmbp/img/fail_tip_2.png?v=1';
					document.getElementById('time').innerHTML = sessionStorage.earnTime;
				}else{
					title_tip('尊敬的用户','您的操作太频繁了，稍后再试~','我知道了');
				}
	        	break;
	        case '3':              // 过期
				mark.style.display = 'block';
				$('.slogan').css('display','none');
				time.innerHTML = '明天再来试试吧';
	        	pic_tip.src = '/v/qmbp/img/fail_tip_3.png?v=1';
	            break; 
	        case '4':              // 未开始
				mark.style.display = 'block';
				$('.slogan').css('display','none');
	        	pic_tip.src = '/v/qmbp/img/fail_tip_4.png?v=1';
	        	time.innerHTML = '心急喝不了好啤酒，再等等哦<br />'+sessionStorage.batchName+'<br />服务热线：15311695989';
	            break;
	        case '5':              // 已截止
				mark.style.display = 'block';
				$('.slogan').css('display','none');
				time.innerHTML = '好酒不等人，下次来早点哦';
	        	pic_tip.src = '/v/qmbp/img/fail_tip_5.png?v=1';
	            break;
	        case '6':              // 指定
				mark.style.display = 'block';
				$('.slogan').css('display','none');
				time.innerHTML = '稍等片刻，畅享欢聚时刻';
	        	pic_tip.src = '/v/qmbp/img/fail_tip_6.png?v=1';
	            break;  
	        case '8':              // 需要验证码
				need_yzcode();
	            break;
	        case '9':              // 验证码错误
				title_tip('尊敬的用户','验证码错误！~','我知道了');
	            break;
	        case '10':              // 错误超过6次,请明天再试
				title_tip('尊敬的用户','错误次数太多啦，明天再来试试吧~','我知道了');
	            break;    
	        default:
				bizcode=jo.result.businessCode===''?'x':jo.result.businessCode;
            	alert('出错了，请稍后再试！'+bizcode);
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




