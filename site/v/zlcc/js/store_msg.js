(function(){
	"use strict";
	
	var inform_box=document.getElementById('inform_box'),
		inform_ipts=inform_box.getElementsByTagName('input'),
		dom_btn=document.getElementById('btn'),
		store_close = document.getElementById("store_close"),
		chose_open = document.getElementsByClassName('chose_open')[0],
		chose_store = document.getElementsByClassName('chose_store')[0],
		get_yz = document.getElementById("get_yz"),
		search = document.getElementById("search"),
		itpl_onenote = document.getElementById("onenote_tpl").innerHTML;
		
	var caneditor=true, storekey='', locationed=false , address = '',reg1=/^1[0-9]{10}$/,countdowntimer=null,timer=null;
	var a='',b='',c='',d='';
	sessionStorage.address = $('#address').val();
	
	document.getElementsByClassName('click_box')[0].addEventListener('click',function(){
		address = $('#address').val().split(' ')[2];
		if(address!=sessionStorage.address&&address!=undefined){
			a = $('#address').val().split(' ')[0];
			b = $('#address').val().split(' ')[1];
			c = $('#address').val().split(' ')[2];
			sessionStorage.address = c;
		}
	},false);
	
	if(sessionStorage.province!=undefined){//已填写
		$('#btn').html('信息已提交');
		$('#phoneNum').val(sessionStorage.phoneNum);
		$('#address').val(sessionStorage.province+' '+ sessionStorage.city+' '+sessionStorage.county);
		$('#store').val(sessionStorage.terminalName);
		$('#yz_box').css('display','none');
		$(".chose_open").unbind();
	}else{
		chose_open.addEventListener("click",function () {
			if(caneditor){
				caneditor=false;
			}
		},false);
		store_close.addEventListener('click',function(){
			document.getElementsByClassName('chose-store')[0].style.display = 'none';
		},false);
		
		chose_store.addEventListener("click",function () {
			if($('#address').val()===''){
				title_tip('提 示','区域信息不能为空！','我知道了');
			}else{
				document.getElementsByClassName('chose-store')[0].style.display = 'block';
				inform_ipts[2].readOnly=false;
				inform_ipts[3].readOnly=false;
				inform_ipts[4].readOnly=false;
			}
		},false);
		
		dom_btn.addEventListener('click',function(){
			if($('#address').val()===''){
				title_tip('提 示','区域信息不能为空！','我知道了');
			}else if($('#store').val()===''){
				title_tip('提 示','门店信息不能为空！','我知道了');
			}else if($('#phoneNum').val()===''){
				title_tip('提 示','手机号不能为空！','我知道了');
			}else if($('#yz_code').val()===''){
				title_tip('提 示','验证码不能为空！','我知道了');
			}else{
				$('#btn').html('<img class="loading" src="/v/zlcc/img/loading.gif"/>');
				addTerminalUser();
			}
		},false);
	}
	
	search.addEventListener('input',function(){
		console.log(search.value.length);
		clearTimeout(timer);
		if(search.value.length>1){
			store_close.src = '/v/zlcc/img/loading.gif';
		}else{
			store_close.src = '/v/zlcc/img/close_big.png';
		}
		timer = setTimeout(function(){
			if(search.value.length>1){
				d = search.value;
				console.log(d);
				queryTerminalList(a,b,c,d);
			}
		},2000);
	},false);
	
	function countdown(tag, time){
     	var i = time;
		tag.value = i+'秒后重新获取';
        countdowntimer = setInterval(function() {
			i--;
			tag.value = i+'秒后重新获取';
			if (i <= 1) {
				tag.value = '获取验证码';
				clearInterval(countdowntimer); // 清除定时器
				get_yz.addEventListener("click",getYzcode,false);//恢复计时器
           		countdowntimer=null;
			}
		}, 1000);
   	}
	get_yz.addEventListener('click',getYzcode,false); 
    
    function getYzcode(){
        if(!reg1.test($('#phoneNum').val())){
			title_tip('提 示','请填写正确的手机号！~','我知道了');
		} else {
			if (get_yz.value==='获取验证码') {
                getCheckCode(function(){
                   countdown(get_yz, 60);
               });
            }else{
            	get_yz.removeEventListener('click',getYzcode,false);
            }
		}
    }
	
	function getCheckCode(cb) { // 获取手机验证码
		var javai = vge.zlcc + '/DBTZLCCInterface/user/getCaptcha';
		var req = {
			"phonenum":$('#phoneNum').val(),
			"sendtype":1
		};
		vge.callJApi(javai, req, function(jo) {
			if (jo.result.code=='0') {
	            if( jo.result.businessCode=='0') {
					cb();//成功，开始倒计时
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
	
	function queryTerminalList(a,b,c,d) { // 终端查询
		var mon_list = document.getElementById("mon_list");
		var javai = vge.zlcc + '/DBTZLCCInterface/terminal/queryTerminalList';
		var req = {
			"openid":sessionStorage.openid,
			"province":a,
			"city":b,
			"county":c,
			"terminalName":d
		};
		vge.callJApi(javai, req, function(jo) {
			store_close.src = '/v/zlcc/img/close_big.png';
			if (jo.result.code==='0') {
	            if( jo.result.businessCode==='0') {
					var i=0, lst=jo.reply, l=lst.length;
					if (l===0 || lst === undefined) {
						return;
					}
					var params={},hs=[],terminalName='',terminalKey='';
					mon_list.innerHTML = '';
					for (i = 0; i < l; ++i) {
						params.terminalKey = lst[i].terminalKey;
						params.terminalName=lst[i].terminalName;
						mon_list.innerHTML += vge.renderTpl(itpl_onenote, params);
					}
					if($('#mon_list').children().size()>0){
						$('#mon_list').on('touchstart','li',function(){
							sessionStorage.terminalKey = $(this).attr('terminalKey');
							$('#store').val($(this).html());
							$('.chose-store').fadeOut();
						});
					}
				} else if(jo.result.businessCode==='2'){//无红包记录
					mon_list.innerHTML = '<li>当前区域下暂无相应门店信息</li>';
					$('#mon_list li').unbind();
					return;
				} else{//businessCode:1失败
					title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
				}
			} else{//code!='0'
				title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
			}
		});
	}
	
	
	
	function addTerminalUser() { // 注册
		var javai = vge.zlcc + '/DBTZLCCInterface/terminal/addTerminalUser';
		var req = {
			"openid":sessionStorage.openid,
			"secretKey":sessionStorage.secretKey,
			"terminalKey":sessionStorage.terminalKey,
			"phoneNum":$('#phoneNum').val(),
			"captcha":$('#yz_code').val()
		};
		vge.callJApi(javai, req, function(jo) {
			if (jo.result.code=='0') {
	            if( jo.result.businessCode=='0') {
	            	$('#btn').html('注册成功');
	            	$(".chose_open").unbind();$(".chose_store").unbind();$("#get_yz").unbind();$("#btn").unbind();
	            	title_tip('尊敬的用户','注册成功','我知道了',undefined,close);
				} else if(jo.result.businessCode==='1') {//1
					$('#btn').html('提交');
					title_tip('尊敬的用户','系统开了个小差！','我知道了');
				} else if(jo.result.businessCode==='2') {//2
					$('#btn').html('提交');
					title_tip('尊敬的用户','密钥校验失败','我知道了');
				} else if(jo.result.businessCode==='3') {//3
					$('#btn').html('提交');
					title_tip('尊敬的用户','关注二维码已失效','我知道了');
				} else if(jo.result.businessCode==='4') {//4
					$('#btn').html('提交');
					title_tip('尊敬的用户','验证码错误','我知道了');
				} else if(jo.result.businessCode==='5') {//5
					$('#btn').html('提交');
					title_tip('尊敬的用户','终端无效','我知道了');
				} else{
					$('#btn').html('提交');
					title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
				}
			} else{//code!='0'
				$('#btn').html('提交');
				title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
			}
		});
	}
	function close(){
		wx.ready(function(){
			wx.closeWindow();
		});
	}
	
})();
