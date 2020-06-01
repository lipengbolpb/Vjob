(function(){
	"use strict";
	var mark = document.getElementsByClassName("mark")[0],
	 	dom_btn=document.getElementById('btn'),
        str_code=document.getElementById('str_code'),
        tel_code=document.getElementById('tel_code'),
        yz_box=document.getElementById('yz_box'),
        yz_code=document.getElementById('yz_code'),
        get_yz=document.getElementById('get_yz'),
        dom_alert=document.getElementById('alert'),
        dom_tip = mark.getElementsByTagName("h1")[0],
        telcode_box=document.getElementById("telcode_box"),
        dom_know=document.getElementById('know');

    var args = vge.urlparse(location.href),
	    openid = args.openid,
        unionid = '';
    var reg1=/[0-9a-zA-Z]{12}/,
        reg2=/^1[0-9]{10}/,
        reg3=/[0-9]{4}/;
    var countdowntimer=null,scode='',status=false;

    sessionStorage.openid = openid;

    function only_strcode () {
        status=false;
        str_code.addEventListener('keyup',function () {
            if (reg1.test(str_code.value)) {
                dom_btn.disabled=false;
            } else{
                dom_btn.disabled=true;
            }
        },false);
    }
   function need_yzcode () {
        telcode_box.style.display='block';
        yz_box.style.display='block';
        status=true;
        document.getElementsByTagName('body')[0].onload = window.scrollTo(0,document.body.scrollHeight);//自动滚动到底部
        mark.style.height = document.getElementsByTagName('body')[0].offsetHeight - 0 + 40 + 'px';
        document.addEventListener('keyup',function () {
            if (reg1.test(str_code.value)&&reg2.test(tel_code.value)&&reg3.test(yz_code.value)) {
                dom_btn.disabled=false;
            } else{
                dom_btn.disabled=true;
            }
        },false);
    }
    
    dom_btn.addEventListener('click', function () {
        _hmt.push(['_trackEvent', 'click', '提交串码', 'strcode']);
        scode = str_code.value.trim();
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
            } else if (!reg3.test(yz_code.value)) {
                title_tip('提 示','请输入正确的验证码~','我知道了');
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
		var javai = vge.common + '/vjifenInterface/sweep/serialCode';
		var req = { "projectServerName": "huanan",
            "openid":openid,
            "unionid":unionid,
	        "serialcode":scode,
	        "phone":tel_code.value===''?'':tel_code.value,
	        "verifycode":yz_code.value===''?'':yz_code.value,
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
                    location.replace('http://' + location.host + '/hnqp20170426/txo/getcash?bizcode='+jo.result.businessCode);
                    break;
                case '1':// 1 - 该积分码不存在"
                    mark.style.display='block';
                    dom_tip.innerHTML = '瓶盖码不存在';
                    break;
                case '2':// 2 - 该积分码已经被使用过
                    mark.style.display='block';
                    dom_tip.innerHTML = '瓶盖码已经被使用过啦';
                    break;
                case '3':// 3 - 积分码已过期
                    mark.style.display='block';
                    dom_tip.innerHTML = '瓶盖码已过期';
                    break;
                case '4':// 4 - 活动未开始
                    mark.style.display='block';
                    dom_tip.innerHTML = '活动还没开始哦！';
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
                    dom_tip.innerHTML = '您输入错误次数太多了<br />明天再来试试吧';
                    break;
                case '11':
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    location.replace('http://' + location.host + '/hnqp20170426/txo/getcash?bizcode='+jo.result.businessCode);
                    break;
                case '12':
                    break;
                default:
                    alert('未知返回码' + jo.result.businessCode + jo.result.msg);
				}
			} else{//code!='0'
				title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
			}
		});
	}
    init();//初始化查询输入次数
})();
