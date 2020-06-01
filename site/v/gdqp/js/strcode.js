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
        batch = document.getElementById("batch"), 
        dom_know=document.getElementById('btn_tip');
    
    var dom_strcode = document.querySelector('.strcode');
    
    var args = vge.urlparse(location.href),
        openid = args.openid,
        unionid = '';
    var reg1=/[0-9a-zA-Z]{12}/,
         reg2=/^1[0-9]{10}/,
         reg3=/[0-9]{4}/;
    var countdowntimer=null,scode='',status=false;

    sessionStorage.openid = openid;
	sessionStorage.strcode = '1';
    function only_strcode () {
        tel_code.style.display='none';
        status=false;
        str_code.addEventListener('keyup',function () {
            if (reg1.test(str_code.value)) {
                dom_btn.disabled=false;
                dom_btn.style.color='#009a44';
            } else{
                dom_btn.disabled=true;
                dom_btn.style.color='#cacd1a';
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
        document.addEventListener('input',function () {
            if (reg1.test(str_code.value)&&reg2.test(tel_code.value)) {
                dom_btn.disabled=false;
                dom_btn.style.color='#009a44';
            } else{
                dom_btn.disabled=true;
                dom_btn.style.color='#cacd1a';
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
                var requrl='http://'+vge.o3host+'/wx3/uinfo2?openid='+openid+'&appid='+vge.hnqpappid;
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
            } else{
                var requrl='http://'+vge.o3host+'/wx3/uinfo2?openid='+openid+'&appid='+vge.hnqpappid;
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
                get_yz.removeEventListener('click',getYzcode,false);
            }
        }
    }
    
    function getCheckCode(cb) {//获取验证码
        _hmt.push(['_trackEvent', 'click', '获取验证码', 'strcode']);
        var javai = vge.common + '/vjifenInterface/user/getCaptcha';
        var req = { "projectServerName": "huanan",
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
        countdowntimer = setInterval(function() {
            i--;
            tag.value = i+'秒';
            if (i === 0) {
                tag.value = '获取验证码';
                i=60;
                clearInterval(countdowntimer); // 清除定时器
                countdowntimer=null;
                tag.addEventListener('click',getYzcode,false); 
            }
        }, 1000);
    }

    dom_know.addEventListener("click",function(){
        mark.style.display = 'none';
    });
    
    function init () {
        var javai = vge.common + '/vjifenInterface/sweep/getFailCount';
        var req = { "projectServerName": "huanan",
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
//  	location.replace('http://' + location.host + '/v/hnqp20170520/fail.html?bizcode='+'-1');
        var javai = vge.common + '/vjifenInterface/sweep/serialCode';
        var req = { "projectServerName": "huanan",
            "openid":openid,
            // "unionid":unionid,
            "serialcode":scode,
            "verifycode":dom_vertion_code.value,
            "phone":tel_code.value===''?'':tel_code.value,
            "longitude": sessionStorage.longitude===undefined?'':sessionStorage.longitude,//"经度"
            "latitude": sessionStorage.latitude===undefined?'':sessionStorage.latitude //"纬度"
        };
        vge.callJApi(javai, req, function(jo) {
            if (jo.result.code ==='0') {
            	if(jo.reply){
            		sessionStorage.earnTime = jo.reply.earnTime;
            	}
                    switch(jo.result.businessCode) {
                    case '0':
                    if(jo.reply.activityVersion === "1"){//广东
                            sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                            sessionStorage.currentMoney = jo.reply.currentMoney;
                            sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                            location.replace('http://' + location.host + '/gdqp/txo/getcash?bizcode='+jo.result.businessCode);
                    }else{
                            sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                            sessionStorage.currentMoney = jo.reply.currentMoney;
                            sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                            location.replace('http://' + location.host + '/hnqp/txo/getcash?bizcode='+jo.result.businessCode);
                    }
                    break;
                    case '1':// 1 - 该积分码不存在"
                    mark.style.display='block';
                    dom_tip.innerHTML = '瓶盖码不存在';
                    break;
                    case '2':// 2 - 该积分码已经被使用过
                    mark.style.display='block';
                    dom_tip.innerHTML = '瓶盖码<br />已经使用过啦';
                    break;
                    case '3':// 3 - 积分码已过期
                    mark.style.display='block';
                    dom_tip.innerHTML = '瓶盖码已过期';
                    break;
                    case '4':// 4 - 活动未开始
                    mark.style.display='block';
                    dom_tip.innerHTML = '活动未开始';
                    batch.innerHTML = jo.reply.batchName+'<br />服务热线：17600602920';
                    break;
                    case '5':// 5 - 活动已结束
                    mark.style.display='block';
                    dom_tip.innerHTML = '活动已截止';
                    break;
                    case '6':// 6 - 积分码异常(通常为服务器报错)
                    mark.style.display='block';
                    dom_tip.innerHTML = '瓶盖码异常';
                    break;
                    case '8':// 8-需要验证码
                    mark.style.display='block';
                    dom_tip.innerHTML = '请输入验证码';
                    need_yzcode();
                    break;
                    case '9':// 9-验证码不正确
                    title_tip('提 示','您输入的验证码不正确，请重新输入！','我知道了');
                    break;
                    case '10': // 10-错误超过6次,请明天再试
                    mark.style.display='block';
                    dom_tittle.style.top = '12.5rem';
                    dom_tip.innerHTML = '您输入错误<br />次数太多了<br />明天再来试试吧';
                    break;
                    case '11':
                    if(jo.reply.activityVersion === "1"){//广东
                        sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                        sessionStorage.currentMoney = jo.reply.currentMoney;
                        sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                        if(jo.reply.currentMoney==19.03){
                        	location.replace('http://' + location.host + '/gdqp/txo/1903?bizcode='+jo.result.businessCode);
                        }else{
                        	location.replace('http://' + location.host + '/gdqp/txo/getcash?bizcode='+jo.result.businessCode);
                        }
                    }else{
                        sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                        sessionStorage.currentMoney = jo.reply.currentMoney;
                        sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                        location.replace('http://' + location.host + '/hnqp/txo/repcash?bizcode='+jo.result.businessCode); 
                    }
                    break;
                    case '-1':
                    	title_tip('提 示','系统升级中...','我知道了');
                        break;
                    default:
                        alert('未知返回码' + jo.result.businessCode + jo.result.msg);
                    }  
            }else if(jo.result.code ==='-1'){
            	title_tip('尊敬的用户','系统升级中，请稍后重试！','我知道了');
            }else{//code!='0'
                title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
            }
        });
    }
    init();//初始化查询输入次数

})();




