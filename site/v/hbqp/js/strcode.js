(function(){
    var str_code = document.getElementById("str_code"),
        dom_btn = document.getElementById("btn"),
        tip_btn = document.getElementById("btn_tip"),
        mark = document.getElementsByClassName("mark")[0],
        tel_code = document.getElementById("telcode_box"),
        telcode_box=document.getElementById('telcode'),
        dom_tip = mark.getElementsByTagName("p")[0],
        dom_tittle = mark.getElementsByTagName('title')[0],
        dom_vertion = document.getElementById('vertion'),
        get_yz = document.getElementById('vertion_btn'),
        dom_vertion_code = document.getElementById('vertion_code'),
        dom_know=document.getElementById('btn_tip');
    
    var dom_strcode = document.querySelector('.strcode');
    
    var args = vge.urlparse(location.href),
        openid = args.openid,
        unionid = '';
    sessionStorage.openid = openid;
    var reg1=/[0-9a-zA-Z]{12}/,
         reg2=/^1[0-9]{10}/,
         reg3=/[0-9]{4}/;
    var scode='',status=false;

    sessionStorage.openid = openid;

    function only_strcode () {
        tel_code.style.display='none';
        status=false;
        str_code.addEventListener('keyup',function () {
            if (reg1.test(str_code.value)) {
                dom_btn.disabled=false;
                dom_btn.style.color='#ea5244';
            } else{
                dom_btn.disabled=true;
                dom_btn.style.color='#ffffff';
            }
        },false);
    }

    function need_yzcode () {
        dom_btn.style.marginBottom = '1rem';
        telcode_box.style.display='block';
        tel_code.style.display='block';
        dom_vertion.style.display='block';
        document.getElementsByTagName('body')[0].onload = window.scrollTo(0,document.body.scrollHeight);//自动滚动到底部
        status=true;
        document.addEventListener('keyup',function () {
            if (reg1.test(str_code.value)&&reg2.test(tel_code.value)&&reg3.test(dom_vertion_code.value)) {
                dom_btn.disabled=false;
                dom_btn.style.color='#ea5244';
            } else{
                dom_btn.disabled=true;
                dom_btn.style.color='#ffffff';
            }
        },false);
    }
    
    dom_btn.addEventListener('click', function () {
        _hmt.push(['_trackEvent', 'click', '提交串码', 'strcode']);
        scode = str_code.value.trim();
        sessionStorage.qr = scode;
        if (!status) {//不需要验证码
            if(scode.length<12||scode.indexOf(' ')!==-1) {
                title_tip('提 示','填写的串码有误，请仔细核对您的串码！','我知道了');
                return;
            } else{
                var requrl='http://'+vge.o3host+'/wx3/uinfo2?openid='+openid+'&appid='+vge.hbqpappid;
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
            }else if (!reg3.test(vertion_code.value)) {
                title_tip('提 示','请输入正确的验证码~','我知道了');
            } else{
                var requrl='http://'+vge.o3host+'/wx3/uinfo2?openid='+openid+'&appid='+vge.hbqpappid;
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
        _hmt.push(['_trackEvent', 'click', '获取验证码', 'strcode']);
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
        var javai = vge.hbqp + '/DBTHBQPInterface/user/getCaptcha';
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

    dom_know.addEventListener("click",function(){
        mark.style.display = 'none';
    });
    
    function init () {
        var javai = vge.hbqp + '/DBTHBQPInterface/sweep/getFailCount';
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

    function sendcode() {
        var javai = vge.hbqp + '/DBTHBQPInterface/sweep/serialCode';
        var req = {
            "openid":openid,
            // "unionid":unionid,
            "serialcode":scode,
            "verifycode":dom_vertion_code.value===''?'':dom_vertion_code.value,
            "phone":tel_code.value===''?'':tel_code.value,
            "longitude": sessionStorage.longitude===undefined?'':sessionStorage.longitude,//"经度"
            "latitude": sessionStorage.latitude===undefined?'':sessionStorage.latitude //"纬度"
        };
        vge.callJApi(javai, req, function(jo) {
            if (jo.result.code ==='0') {
                switch(jo.result.businessCode) {
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
				location.replace('http://' + location.host + '/hbqp20170426/txo/getcash?bizcode='+jo.result.businessCode);
	            break;
	        case '11':              // 自己重复扫，普通奖
				sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
				sessionStorage.currentMoney = jo.reply.currentMoney;
				sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
				location.replace('http://' + location.host + '/hbqp20170426/txo/getcash?bizcode='+jo.result.businessCode);
	            break;
	        case '12':              // 可疑用户
				location.replace('http://' + location.host + '/v/hbqp/getMsg.html?bizcode='+jo.result.businessCode);
	            break;    
	        case '13':              // 黑名单
				location.replace('http://' + location.host + '/v/hbqp/getMsg.html?bizcode='+jo.result.businessCode);
	            break;    
	        default:
	        	if(jo.reply){
	        		sessionStorage.batchName = jo.reply.batchName===undefined?'':jo.reply.batchName;
	        	}	
				location.replace('http://' + location.host + '/v/hbqp20170426/fail.html?bizcode='+jo.result.businessCode);
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




