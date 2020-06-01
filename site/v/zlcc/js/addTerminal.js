(function(){
	"use strict";
	
	var inform_box=document.getElementById('inform_box'),
		inform_ipts=inform_box.getElementsByTagName('input'),
		store_close = document.getElementById("store_close"),
		chose_open = document.getElementsByClassName('chose_open')[0];
	
	var args = vge.urlparse(location.href),openid=args.openid,a='',b='',c='';
	
	var caneditor=true, storekey='', locationed=false , address = '',reg1=/^1[0-9]{10}$/,countdowntimer=null;
	sessionStorage.address = $('#address').val();
	
	document.getElementsByClassName('click_box')[0].addEventListener('click',function(){
		address = $('#address').val().split(' ')[2];
		if(address!=sessionStorage.address&&address!=undefined){
			a = $('#address').val().split(' ')[0];
			b = $('#address').val().split(' ')[1];
			c = $('#address').val().split(' ')[2];
		}
	},false);
	
	chose_open.addEventListener("click",function () {
		if (caneditor) {//点击编辑
			caneditor=false;
			inform_ipts[1].readOnly=false;
			inform_ipts[2].readOnly=false;
			inform_ipts[3].readOnly=false;
			inform_ipts[4].readOnly=false;
		}
	},false);
	
	
	$("#btn").on('click',function(){
		if($('#address').val()===''){
			title_tip('尊敬的用户','地区信息不能为空！','我知道了');
		}else if($('#store').val()===''){
			title_tip('尊敬的用户','终端名称不能为空！','我知道了');
		} else {
			$('#btn').html('<img class="loading" src="/v/zlcc/img/loading.gif"/>');
			addTerminal(a,b,c);
		}
	});
	
	
	
	function addTerminal(a,b,c) { // 终端注册
		var javai = vge.terminal + '/DBTVMTSInterface/terminal/addTerminal';
		var req = {
			"openid":openid,
			"province":a,
			"city":b,
			"county":c,
			"terminalName":$('#store').val(),
			"phoneNum":$('#phoneNum').val(),
			"linkMan":$('#person').val(),
			"address":$('#s_address').val()
		};
		vge.callJApi(javai, req, function(jo) {
			if (jo.result.code==='0') {
	            if( jo.result.businessCode==='0') {
	            	$("#btn").unbind();
	            	$('#btn').html('注册成功');
	            	$('.chose_open').unbind();
	            	inform_ipts[1].readOnly=true;
					inform_ipts[2].readOnly=true;
					inform_ipts[3].readOnly=true;
					inform_ipts[4].readOnly=true;
	            	title_tip('尊敬的用户','注册成功！','我知道了');
	            } else if(jo.result.businessCode==='1'){//无红包记录
	            	$('#btn').html('提交');
					title_tip('尊敬的用户',jo.result.msg,'我知道了');
				} else if(jo.result.businessCode==='2'){//无红包记录
					$('#btn').html('提交');
					title_tip('尊敬的用户',jo.result.msg,'我知道了');
				} else if(jo.result.businessCode==='3'){//无红包记录
					$('#btn').html('提交');
					title_tip('尊敬的用户',jo.result.msg,'我知道了');
				} else{//businessCode:1失败
					$('#btn').html('提交');
					title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
				}
			} else{//code!='0'
				$('#btn').html('提交');
				title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
			}
		});
	}
	
})();
