(function() {
	"use strict";
	var dom_btn=document.getElementById('btn'),
        str_code=document.getElementById('str_code'),
        telcode_box=document.getElementById('telcode_box'),
        tel_code=document.getElementById('tel_code'),
        yz_box=document.getElementById('yz_box'),
        yz_code=document.getElementById('yz_code'),
        get_yz=document.getElementById('get_yz'),
        dom_mask=document.getElementById('mask'),
        dom_alert=document.getElementById('alert'),
        dom_know=document.getElementById('know'),
		biz_img=document.getElementById('biz_img');
    var args = vge.urlparse(location.href),
	    openid = args.openid,
        unionid = '';
    var reg1=/[0-9a-zA-Z]{11}/,
         reg2=/^1[0-9]{10}/,
         reg3=/[0-9]{4}/;
    var countdowntimer=null,scode='',status=false;

    sessionStorage.openid = openid;

    function only_strcode () {
        telcode_box.style.display='none';
        yz_box.style.display='none';
        status=false;
        str_code.addEventListener('keyup',function () {
            if (reg1.test(str_code.value)) {
                dom_btn.style.background='#EA554F';
                dom_btn.style.color='#fff';
                dom_btn.disabled=false;
            } else{
                dom_btn.style.background='#FFE880';
                dom_btn.style.color='#DFC18F';
                dom_btn.disabled=true;
            }
        },false);
    }
    function need_yzcode () {
        telcode_box.style.display='block';
        yz_box.style.display='block';
        status=true;
        document.addEventListener('keyup',function () {
            if (reg1.test(str_code.value)&&reg2.test(tel_code.value)&&reg3.test(yz_code.value)) {
                dom_btn.style.background='#EA554F';
                dom_btn.style.color='#fff';
                dom_btn.disabled=false;
            } else{
                dom_btn.style.background='#FFE880';
                dom_btn.style.color='#DFC18F';
                dom_btn.disabled=true;
            }
        },false);
    }
    dom_btn.addEventListener('click', function () {
        _hmt.push(['_trackEvent', 'click', '点击提现按钮', 'strcode']);
            scode = str_code.value.trim();
            if (!status) {//不需要验证码
                if(scode.length<11||scode.indexOf(' ')!==-1) {
                    title_tip('提 示','填写的串码有误，请仔细核对您的串码！','我知道了');
                    return;
                } else{
                    var requrl='http://'+vge.o3host+'/wx3/uinfo2?openid='+openid;
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
                    var requrl='http://'+vge.o3host+'/wx3/uinfo2?openid='+openid;
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

    get_yz.addEventListener('click',function () {
        _hmt.push(['_trackEvent', 'click', '获取验证码', 'strcode']);
        if(!reg1.test(str_code.value)){
            title_tip('提 示','请填写正确的瓶盖串码哦！~','我知道了');
        } else if(!reg2.test(tel_code.value)){
            title_tip('提 示','请填写正确的手机号！~','我知道了');
        } else{
            if (get_yz.innerHTML==='获取验证码') {
                getCheckCode(function(){
                   countdown(get_yz, 60);
               });
            }
        }
    },false); 

    function getCheckCode(cb) {
        var javai = vge.common + '/vjifenInterface/user/getCaptcha';
        var req = { "projectServerName": "zhejiang",
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
            countdowntimer=null;
            }else{
            	tag.removeEventListener('click');
            }
        }, 1000);
    }

 /*   var dom_tmp=document.getElementById('main');
    if(args.dev!==undefined) {
        dom_tmp.style.display='block';
    }*/
    function init () {
        var javai = vge.common + '/vjifenInterface/sweep/getFailCount';
        var req = { "projectServerName": "zhejiang",
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
                        biz_img.src='/v/qpzj/img/error.png';
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
		var req = { "projectServerName": "zhejiang",
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
                // alert(jo.result.businessCode +':'+ jo.result.msg);
                switch(jo.result.businessCode) {
                case '0':
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    
                    location.replace('http://' + location.host + '/v/qpzj/getcash.html');
                    break;
                case '1':// 1 - 该积分码不存在"
                    dom_mask.style.display='block';
                    dom_alert.style.display='block';
                    biz_img.src='/v/qpzj/img/error.png';
                    break;
                case '2':// 2 - 该积分码已经被使用过
                    dom_mask.style.display='block';
                    dom_alert.style.display='block';
                    biz_img.src='/v/qpzj/img/used.png';
                    break;
                case '3':// 3 - 积分码已过期
                    dom_mask.style.display='block';
                    dom_alert.style.display='block';
                    biz_img.src='/v/qpzj/img/timeout.png';
                    break;
                case '4':// 4 - 活动未开始
                    dom_mask.style.display='block';
                    dom_alert.style.display='block';
                    biz_img.src='/v/qpzj/img/nostart.png';
                    break;
                case '5':// 5 - 活动已结束
                    dom_mask.style.display='block';
                    dom_alert.style.display='block';
                    biz_img.src='/v/qpzj/img/timeout.png';
                    break;
                case '6':// 6 - 积分码异常(通常为服务器报错)
                    dom_mask.style.display='block';
                    dom_alert.style.display='block';
                    biz_img.src='/v/qpzj/img/busy.png';
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
                        }
                    }else{
                        sessionStorage.username = '信息查询失败 no reply';
                    }
                    location.replace('http://' + location.host + '/v/qpzj/prize.html');
                    // location.href = 'http://' + location.host + '/v/qpzj/prize.html';
                    break;
                case '8':// 8-需要验证码
                    dom_mask.style.display='block';
                    dom_alert.style.display='block';
                    biz_img.src='/v/qpzj/img/error.png';
                    need_yzcode();
                    break;
                case '9':// 9-验证码不正确
                    title_tip('提 示','您输入的验证码不正确，请重新输入！','我知道了');
                    break;
                case '10': // 10-错误超过6次,请明天再试
                    dom_mask.style.display='block';
                    dom_alert.style.display='block';
                    biz_img.src='/v/qpzj/img/toomore.png';
                    only_strcode();
                    break;
                case '11':
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    
                    location.replace('http://' + location.host + '/v/qpzj/repcash.html');
                    break;
                case '12':
			        location.replace('http://' + location.host + '/v/qpzj/fail.html?bizcode=12');
                    break;
                default:
                    alert('未知返回码' + jo.result.businessCode + jo.result.msg);
				}
			} else{//code!='0'
				title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
			}
		});
	}

    dom_know.addEventListener('click',function () {
        dom_mask.style.display='none';
        dom_alert.style.display='none';
    },false);

    init();//初始化查询输入次数
})();
