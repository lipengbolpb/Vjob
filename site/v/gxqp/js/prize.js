(function() {
	"use strict";
	
	var dom_rule=document.getElementById('rule'),
		dom_private=document.getElementById('private'),
		dom_btn=document.getElementById("submit");
	var my_name=document.getElementById("name"),
		id_code=document.getElementById("idcard"),
		title_tips=document.getElementById("title_tips"),
		tel_code=document.getElementById("phonenum");	
	var yz_btn=document.getElementById("getCheckCode"); 	
	var openid = getQueryString('openid')===null?'':getQueryString('openid');
	var msgUrl = location.href;
	var reg1=/^1[0-9]{10}$/,
		reg2=/^[1-9][0-9xX]{17}$/,
		reg3=/^[0-9]{4}$/;
	var countdowntimer=null;
	var vqr = getQueryString('vqr')===null?'':getQueryString('vqr');

    
	dom_rule.addEventListener('click',function () {
		_hmt.push(['_trackEvent', 'click', '查看活动规则', 'prize']);
		location.href= "http://mp.weixin.qq.com/s?__biz=MzI4NjE2MzQ2Mw==&mid=504504030&idx=1&sn=e5414ae24ed0599fac48a25f0b3929e6&chksm=7007a9b6477020a0c7a85e54245a9ce3b89bad844bb5fc22f87bf50af6c6d2e28a19bbb4618f#rd";
	},false);
	dom_private.addEventListener('click',function () {
		_hmt.push(['_trackEvent', 'click', '查看隐私说明', 'prize']);
		location.href="http://mp.weixin.qq.com/s?__biz=MzI4NjE2MzQ2Mw==&mid=504504035&idx=1&sn=6c0bfc678fc6475080d5cefb074185d2&chksm=7007a98b4770209d26519c9a734e4aef9e22727ada35e8a7795e36439266341651725ca8348b#rd";
	},false);
 	
 	
 	
 	
 	function locationed(res){
        sessionStorage.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        sessionStorage.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        sessionStorage.speed = res.speed; // 速度，以米/每秒计
        sessionStorage.accuracy = res.accuracy; // 位置精度
    }
 	
 	wx.ready(function() {//获取地理位置
        wx.getLocation({
            type: 'wgs84',
            complete:locationed//接口调用完成时执行的回调函数，无论成功或失败都会执行。
        });
    });

 	
    // 已经填写过
	if (getQueryString('username')!==null&&getQueryString('idcard')!==null&&getQueryString('phonenum')!==null) {
		my_name.value=decodeURIComponent(getQueryString('username'));
		id_code.value=getQueryString('idcard');
		tel_code.value=getQueryString('phonenum');
		title_tips.src='img/prize-tips2.png';
		my_name.readOnly=true;
		id_code.readOnly=true;
		tel_code.readOnly=true;
		dom_btn.parentElement.style.display='none';
		tel_code.parentElement.style['margin-bottom']='10%';
		return;
	}
    
	dom_btn.addEventListener('click',function () {
		_hmt.push(['_trackEvent', 'click', '点击提交按钮', 'prize']);
		if (my_name.value===''||my_name.value.indexOf(' ')!==-1) {
			title_tip('提 示','请输入正确的姓名哦！~','我知道了');
		}else if(!reg1.test(tel_code.value)){
			title_tip('提 示','请填写正确的手机号！~','我知道了');
		} else{
			//调提交接口
			sub_message ();
		}
	},false);


    function getCheckCode(cb) { // 获取手机验证码
		var javai = vge.common + '/vjifenInterface/user/getCaptcha';
		var req = { "projectServerName": "guangxi",
			"phonenum":tel_code.value
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

	//解析url
	function getQueryString(name){
	    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	    var r = window.location.search.substr(1).match(reg);
	    if(r!==null){
	     	return  decodeURIComponent(r[2]);
	    } else{
		    return null;     	
	    }
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
				yz_btn.addEventListener("click",dom_btnClick,false);//恢复计时器
            countdowntimer=null;
			}
		}, 1000);
   	}


    
   	function sub_message () { // 提交注册信息
   		var javai = vge.common + '/vjifenInterface/user/savePrize';
		var req = { "projectServerName": "guangxi",
			"openid":openid,
			"unionid":getQueryString('unionid')===null?'':getQueryString('unionid'),
			"username":my_name.value,
			"idcard":'000000',
			"skukey":getQueryString('skukey')===null?'':getQueryString('skukey'),//??
			"phonenum":tel_code.value,
//			"captcha":yz_code.value,
			"address":'address',
			"grandPrizeType":getQueryString('gpt')===null?0:getQueryString('gpt'),
			"prizeVcode":getQueryString('vqr')===null?'':getQueryString('vqr'),//?
			"longtitude":sessionStorage.longtitude===undefined?'00':sessionStorage.longtitude,
			"latitude":sessionStorage.latitude===undefined?'00':sessionStorage.latitude
		};
		vge.callJApi(javai, req, function(jo) {
			if (jo.result.code==='0') {
	            if( jo.result.businessCode==='0') {
	            		title_tip('提 示','您的中奖信息我们已经收到，请拨打<br> 400-680-0899联系我们进行身份核实','我知道了',undefined,reload);
					} else if( jo.result.businessCode=='1'){//1
						title_tip('提 示','验证码已失效','我知道了');
					} else if( jo.result.businessCode=='2'){//2
						title_tip('提 示','您填写的验证码有误','我知道了');
					} else{
						title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
					}
			} else{//code!='0'
				title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
			}
		});
   	}

	function reload(){
		location.replace(msgUrl.substr(0,msgUrl.indexOf('skukey')-1)+'&username='+encodeURIComponent(my_name.value)+'&phonenum='+tel_code.value+'&idcard='+id_code.value);
	}
    


    
})();
