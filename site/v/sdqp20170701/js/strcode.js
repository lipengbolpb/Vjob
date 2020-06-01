(function(){
    var str_code = document.getElementById("str_code"),
        dom_btn = document.getElementById("btn"),
        mark = document.getElementsByClassName("mark")[0],
        dom_slogan = document.getElementsByClassName("slogan")[0],
        dom_title = document.getElementsByClassName("title")[0],
        dom_notice = document.getElementsByClassName("notice")[0],
        dom_batch = document.getElementsByClassName("batch")[0],
        tel_code = document.getElementById("telcode_box"),
        telcode_box=document.getElementById('telcode'),
        dom_vertion = document.getElementById('vertion'),
        get_yz = document.getElementById('vertion_btn'),
        dom_vertion_code = document.getElementById('vertion_code'),
        dom_strcode = document.querySelector('.strcode');

    $(document).ready(function () {//防止虚拟键盘弹出后页面布局被压缩
　　　　$('body').height($('body')[0].clientHeight);
    });

    var args = vge.urlparse(location.href),
        openid = args.openid,
        unionid = '';
    sessionStorage.openid = openid;
    var reg1=/[0-9a-zA-Z]{12}/,
        reg2=/^1[0-9]{10}/,
        reg3=/[0-9]{4}/;
    var scode='',status=false;

    function only_strcode () {
        tel_code.style.display='none';
        status=false;
        str_code.addEventListener('keyup',function () {
            if (reg1.test(str_code.value)) {
                dom_btn.style.backgroundColor='#fff699';
                dom_btn.style.color = '#c8242b';
            } else{
                dom_btn.style.backgroundColor='#fae689';
                dom_btn.style.color = '#ff7b7b';
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
                dom_btn.style.backgroundColor='#fff699';
                dom_btn.style.color = '#c8242b';
            } else{
                dom_btn.style.backgroundColor='#fae689';
                dom_btn.style.color = '#ff7b7b';
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
                var requrl='http://'+vge.o3host+'/wx3/uinfo2?openid='+openid+'&appid='+vge.sdqpappid;
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
                var requrl='http://'+vge.o3host+'/wx3/uinfo2?openid='+openid+'&appid='+vge.sdqpappid;
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
        var javai = vge.sdqp + '/DBTSDQPInterface/user/getCaptcha';
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
        var javai = vge.sdqp + '/DBTSDQPInterface/sweep/getFailCount';
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
        var javai = vge.sdqp + '/DBTSDQPInterface/sweep/serialCode';
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
                case '0':
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
                    location.replace('http://' + location.host + '/sdqp20170701/txo/getcash?bizcode='+jo.result.businessCode);
                    break;
                case '1':// 1 - 该积分码不存在"
                    dom_slogan.style.display = 'none';
                    mark.style.display='block';
                    dom_title.innerHTML = '这个二维码不存在';
                    dom_notice.innerHTML = '';
                    break;
                case '2':// 2 - 该积分码已经被使用过
                    dom_slogan.style.display = 'none';
                    mark.style.display='block';
                    dom_title.innerHTML = '这个二维码已被扫';
                    dom_notice.innerHTML = '扫码时间：<span style="color:#ffffff">'+jo.reply.earnTime+'</span><br>再扫一瓶试试看';
                    break;
                case '3':// 3 - 积分码已过期
                    dom_slogan.style.display = 'none';
                    mark.style.display='block';
                    dom_title.innerHTML = '这个二维码已过期';
                    dom_notice.innerHTML = '明天再来试试吧';
                    break;
                case '4':// 4 - 活动未开始
                    dom_slogan.style.display = 'none';
                    mark.style.display='block';
                    dom_title.innerHTML = '活动还未开始';
                    dom_notice.innerHTML = '心急喝不了好啤酒，再等等哦';
                    dom_batch.innerHTML = jo.reply.batchName+'<br />服务热线：15311695989'
                    break;
                case '5':// 5 - 活动已结束
                    dom_slogan.style.display = 'none';
                    mark.style.display='block';
                    dom_title.innerHTML = '活动已截止';
                    dom_notice.innerHTML = '好酒不等人，下次早点来哦';
                    break;
                case '6':// 6 - 积分码异常(通常为服务器报错)
                    dom_slogan.style.display = 'none';
                    mark.style.display='block';
                    dom_title.innerHTML = '瓶盖码异常';
                    dom_notice.innerHTML = '';
                    break;
                case '7':              // 大奖
                    sessionStorage.username = jo.reply.username===undefined?'':jo.reply.username;
                    sessionStorage.phonenum = jo.reply.phonenum===undefined?'':jo.reply.phonenum;
                    sessionStorage.idcard = jo.reply.idcard===undefined?'':jo.reply.idcard;
                    sessionStorage.skukey = jo.reply.skukey;
                    sessionStorage.prizeVcode = jo.reply.prizeVcode;
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType===undefined?'':jo.reply.grandPrizeType;
                    location.replace('http://' + location.host + '/v/sdqp20170701/prize.html?bizcode='+jo.result.businessCode);
                    break;
                case '8':// 8-需要验证码
                    title_tip('提 示','请输入验证码！','我知道了');
                    need_yzcode();
                    break;
                case '9':// 9-验证码不正确
                    title_tip('提 示','您输入的验证码不正确，请重新输入！','我知道了');
                    break;
                case '10': // 10-错误超过6次,请明天再试
                    dom_slogan.style.display = 'none';
                    mark.style.display='block';
                    dom_title.innerHTML = '您输入的错误次数太多';
                    dom_notice.innerHTML = '明天再来试试吧';
                    break;
                case '11':
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    sessionStorage.earnTime = jo.reply.earnTime===undefined?'':jo.reply.earnTime;
                    location.replace('http://' + location.host + '/sdqp20170701/txo/getcash?bizcode='+jo.result.businessCode);
                break;
                case '12':              // 可疑用户
					location.replace('http://' + location.host + '/v/sdqp20170701/getMsg.html?bizcode='+jo.result.businessCode);
		            break;    
	        	case '13':              // 黑名单
					location.replace('http://' + location.host + '/v/sdqp20170701/getMsg.html?bizcode='+jo.result.businessCode);
		            break;
                case '14':              // 与12相同
                    location.replace('http://' + location.host + '/v/sdqp20170701/getMsg.html?bizcode='+jo.result.businessCode);
                    break;
                case '15':  //他人重复扫大奖
                    sessionStorage.grandPrizeType = jo.reply.grandPrizeType===undefined?'':jo.reply.grandPrizeType;
                    sessionStorage.earnTime = jo.reply.earnTime===undefined?'':jo.reply.earnTime;//扫码时间
                    location.replace('http://' + location.host + '/v/sdqp20170701/prize.html?bizcode='+jo.result.businessCode);
                    break;         
                case '-1':
                    dom_slogan.style.display = 'none';
                	mark.style.display='block';
                    dom_title.innerHTML = '红包在路上堵车了';
                    dom_notice.innerHTML = '酒香不怕巷子深，稍后再试吧';
                    break;
                default:
                    if(jo.reply){
                        sessionStorage.batchName = jo.reply.batchName===undefined?'':jo.reply.batchName;
                        sessionStorage.earnTime = jo.reply.earnTime===undefined?'':jo.reply.earnTime;
                    }else{
                        sessionStorage.earnTime = '';
                    }   
                    location.replace('http://' + location.host + '/v/sdqp20170701/fail.html?bizcode='+jo.result.businessCode);
                }
            }else{//code!='0'
                title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
            }
        });
    }
    init();//初始化查询输入次数
})();




