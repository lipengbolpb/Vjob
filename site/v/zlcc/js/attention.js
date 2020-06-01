(function() {
    "use strict";
	var args = vge.urlparse(location.href),
		i = 0,
        openid=args.openid,secretKey=args.secretKey;
    var flag = true;
   
    sessionStorage.clear();
    sessionStorage.openid = openid;
    sessionStorage.secretKey = secretKey;
	loading('身份校验中');//调用接口
	
	
	sweep();
	
    function sweep() {
    	if(flag){
    		flag = false;
    		loading('身份校验中');//调用接口
        	var japi = vge.zlcc+'/DBTZLCCInterface/terminal/validTerminalUser';
        	var req = {
            	"openid":openid,
            	"secretKey":secretKey
        	};
        vge.clog('debug', [japi, JSON.stringify(req),i]);
        vge.callJApi(japi, req, cb);
    	}
        
    }
    
    function cb(jo) {
		if(jo.result.code == '0'){
        	switch (jo.result.businessCode) {

	        case '0':      // 校验成功
				if(jo.reply){
					sessionStorage.province = jo.reply.province;
					sessionStorage.city = jo.reply.city;
					sessionStorage.county = jo.reply.county;
					sessionStorage.terminalKey = jo.reply.terminalKey;
					sessionStorage.terminalName = jo.reply.terminalName;//终端名称
					sessionStorage.phoneNum = jo.reply.phoneNum;
				}
				location.replace('http://' + location.host + '/v/zlcc/store_msg.html?bizcode='+jo.result.businessCode);
	            break;
	        case '1':  
				title_tip('尊敬的用户',jo.result.msg,'我知道了');
				break;
	        case '2':        
	        	title_tip('尊敬的用户',jo.result.msg,'我知道了');
	            break;   
	        case '3':
	        	title_tip('尊敬的用户',jo.result.msg,'我知道了');
	        	break;
	        default:
	        	if(jo.reply){
	        		sessionStorage.batchName = jo.reply.batchName===undefined?'':jo.reply.batchName;
	        	}	
	        }	
	   	}else if(jo.result.code == '-1'){//code !=0;
	   		title_tip('尊敬的用户','系统升级中，请稍后再试！','我知道了');
	   	}else{
	   		title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
	   	}
	}

    function loading(txt) {
        // dom_content.innerHTML += $('#tpl_toast').html();
        $('#loadingToast .weui_toast_content').html(txt);
        $('#loadingToast').show();
    }
    function loaded() {
        $('#loadingToast').hide();
    }
    function toast(txt) {
        $('#toast .weui_toast_content').html(txt);
        $('#toast').show();
        setTimeout(function () {
            $('#toast').hide();
        }, 2000);
    }

})();
