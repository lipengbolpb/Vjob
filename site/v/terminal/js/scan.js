(function() {
    "use strict";
    ini_wxshare(vge.terminalappid);
	var args = vge.urlparse(location.href),
        qr = args.s, openid=args.openid;
    var flag = true,flag2=true;
   	var dom_location = document.getElementsByClassName('location')[0],
        dom_fail = document.getElementsByClassName('location_fail')[0];
    sessionStorage.clear();
    sessionStorage.openid = openid;
    sessionStorage.qr = qr;
	

    loading('玩命加载中');
    function locationed(res){
    	dom_location.style.display = 'none';
    	dom_fail.style.display = 'none';
        loading('玩命加载中');
        _hmt.push(['_trackEvent', 'click', '允许抓取-终端促销', '扫码']);
        sessionStorage.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        sessionStorage.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        sessionStorage.speed = res.speed; // 速度，以米/每秒计
        sessionStorage.accuracy = res.accuracy; // 位置精度
        queryUserIdentity();
    }
    wx.ready(function() {
		// check();
		wxGetLocation();
		// 扫一扫
		scanCode();
	});
	// 检查api使用的权限
	// 扫一扫可
	// function check(){
	// 	wx.checkJsApi({
	// 		jsApiList: ['chooseImage','scanQRCode'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
	// 		success: function(res) {
	// 			alert(JSON.stringify(res));
	// 		// 以键值对的形式返回，可用的api值true，不可用为false
	// 		// 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
	// 		}
	// 	  });
	// }
    // $('#scan').click(function(){
	// 	scanCode();
	// })
	function scanCode() { 
		wx.scanQRCode({ 
		 needResult : 1,  // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
		 scanType : [ "qrCode", "barCode" ],  // 可以指定扫二维码还是一维码，默认二者都有
		 success : function(res) { 
		    console.log(res) 
			// alert(JSON.stringify(res));  
			// alert('lalalalal');
		    var result = res.resultStr;  // 当needResult 为 1 时，扫码返回的结果
            // 扫码结果格式
		    let qr_code = result;
			let project = '';
			if(qr_code.indexOf('VJ1.TV')!=-1) { //线上终端促销
				project = qr_code.split('/')[qr_code.split('/').length-2];
				qr_code = qr_code.split('/')[qr_code.split('/').length-1];
			} else if(qr_code.indexOf('vj1.tv')!=-1) { //线上
				project = qr_code.split('/')[qr_code.split('/').length-2];
				qr_code = qr_code.split('/')[qr_code.split('/').length-1];
			} else if(qr_code.indexOf('xt.vjifen.com')!=-1) { //测试
				project = qr_code.split('&v=')[0];
				project = project[project.length-1];
				qr_code = qr_code.split('&v=')[1];
			} else {
				project = '';
				qr_code = 'AAAAAAAAAAAA';
			}
			let latitude = sessionStorage.latitude===undefined?'00':sessionStorage.latitude ;//"纬度"
			let longitude = sessionStorage.longitude===undefined?'00':sessionStorage.longitude;//"经度"
			sweep(openid,qr_code,latitude,longitude,project);
			// latitude=null;longitude=null;project=null;qr_code=null;
		 }, 
		 fail : function(res) { 
		  console.log(res) 
		  alert(JSON.stringify(res)); 
		  alert('啦啦error');
		 } 
	  }); 
	} 

	function sweep(openid,qrcode,la,lo,project){
		// loading('玩命加载中');//调用接口
		var japi = vge.terminal + '/DBTVMTSInterface/sweep/sweepQrcode';
		var data = {
			"openid": openid,
			"sweepstr": qrcode,
			"showType":"1",
			"latitude" : la,
			"longitude" : lo,
			"projectFlag":project
		};
		$.ajax({
			type:"POST",
			dataType:'json',//数据类型
			url:japi,
			data:JSON.stringify(data),
			success:function(result){
				// alert('success');
                chose_tip('尊敬的用户','扫描成功','我知道了',undefined,'继续扫码',undefined,close);
			},
			error:function(result){
				// alert(result);
				alert('fail');
			}
		})		
	}

	function close(flag){
		if(flag == false){
		   wx.closeWindow();
		}else if(flag == true){
		   scanCode();
		}
	}
	
    function wxGetLocation(){
        wx.getLocation({
            type: 'wgs84',
            cancel:function(res){
            	loaded();
                dom_location.style.display = 'block';
                _hmt.push(['_trackEvent', 'click', '拒绝抓取-终端促销', '扫码']);
                dom_location.addEventListener('click',function(){
                	dom_location.style.display = 'none';
                	dom_fail.style.display = 'none';
                	queryUserIdentity();
                },false);
            },
            success:locationed,//接口调用完成时执行的回调函数，无论成功或失败都会执行。
            fail:function(res){
            	loaded();
                _hmt.push(['_trackEvent', 'click', '抓取失败-终端促销', '扫码']);
                dom_location.style.display = 'none';
                dom_fail.style.display = 'block';
                dom_fail.addEventListener('click',function(){
			    	dom_location.style.display = 'none';
			    	dom_fail.style.display = 'none';
			    	wx.closeWindow();
			    },false);
            }
        });
    }
    
    function queryUserIdentity() {
    	if(flag2){
    		flag2 = false;
    		loading('玩命加载中');//调用接口
        	var japi = vge.terminal+'/DBTVMTSInterface/user/queryUserIdentity';
        	var req = {
            	"openid":openid,
            	"isQueryActivity":1,
				"qrcode":qr
        	};
        vge.clog('debug', [japi, JSON.stringify(req)]);
        vge.callJApi(japi, req, function(jo){
        	loaded();
			vge.clog('debug', [japi, JSON.stringify(jo)]);
        	if(jo.result.code=='0'){
				if(jo.reply.iszj&&jo.reply.iszj==1){
					if(jo.reply.skuKey=='201712002-002'){
						sessionStorage.noMall = true;
						sweep();
					}else{
						location.replace('http://' + location.host + '/v/terminal/guide_zj.html?bizcode='+jo.result.businessCode);
					}
				}else{
					if(jo.result.businessCode=='6'||jo.result.businessCode=='7'||jo.result.businessCode=='9'){
						location.replace('http://' + location.host + '/v/terminal/guide_2.html?bizcode='+jo.result.businessCode);
					}else if(jo.result.businessCode=='4'||jo.result.businessCode=='5'||jo.result.businessCode=='8'){
						sessionStorage.brandIntroduceUrl = jo.reply.brandIntroduceUrl;
						location.replace('http://' + location.host + '/v/terminal/active.html?bizcode='+jo.result.businessCode);
					}else{
						title_tip('尊敬的用户',jo.result.msg,'我知道了');
					}
				}
        	}else{
        		title_tip('尊敬的用户',jo.result.msg,'我知道了');
        	}
        });
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
