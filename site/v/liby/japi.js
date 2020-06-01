(function(){
    "use strict";
    ini_wxshare(vge.libyappid);
    
    var args = vge.urlparse(location.href),
        latitude, longitude, accuracy,
        hbopenid = args.hbopenid,
        openid = args.openid;
    
    // sessionStorage.clear();

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
    
    loading('微信初始化');
    
    var dom_msg = document.getElementById('msg'),
        dom_vericode =document.getElementById('vericode'),
        dom_main = document.getElementById('container');
    // dom_desc = document.querySelector('.weui_msg_desc');

    var nn = document.createElement('p');
    nn.innerHTML = openid +'<br>'+vge.libyappid;
    dom_msg.appendChild(nn);
    if(openid) {
        var url='http://'+vge.o3host+'/wx3/uinfo2?openid='+openid+'&appid='+vge.libyappid;
        loading('获取用户');
        $.get(url, function(ret){
            nn = document.createElement('img');
            nn.src = ret.headimgurl;
            nn.width = '120';
            dom_msg.appendChild(nn);

            var nn = document.createElement('span');
            nn.innerHTML = ret.nickname;
            dom_msg.appendChild(nn);

            loaded();
        });
    }

    wx.ready(function() {
        loading('获取位置');
        // wx.hideOptionMenu();    // 隐藏微信右上角菜单
        var sdimg='http://mmbiz.qpic.cn/mmbiz/SjwE6qCp0ycVbeQ0ibof8AvGwviaI4xiarTugYzFhics3yXftMHiaLY2KmUOyoL7mzwt3NJAraa8XKhia7UtAFvm5GJg/0?wx_fmt=jpeg',
            sdtitle='微信和后台接口JS',
            sdesc='页面JS代码',
            sdlink= location.host + location.pathname;
        set_wxshare(sdimg, sdesc, sdtitle, sdlink);
        wx.getLocation({        // 获取位置信息
            type: 'wgs84',// 默认为wgs84的gps坐标
            complete: function (res) {   //接口调用完成执行回调，无论成功失败
                // console.log(res);
                latitude = res.latitude;  // 纬度，浮点数，范围为90 ~ -90
                longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180
                accuracy = res.accuracy;  // 位置精度
                nn = document.createElement('p');
                nn.innerHTML = [latitude,longitude,accuracy].join(', ');
                dom_msg.appendChild(nn);
                loaded();
            }
        });
    });
    
    $('#wxscan').click(function(){
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success:function(res){
                toast('扫描成功');
                nn = document.createElement('p');
                nn.innerHTML = res.resultStr;
                dom_msg.appendChild(nn);
                sweep(res.resultStr);
            }
        });
    });    

    function sweep(qr) {
        loading('调用扫码接口');
        var japi = vge.liby+'/DBTLBInterface/sweep/sweepQrcode';
        nn = document.createElement('p');
        nn.innerHTML = japi;
        dom_msg.appendChild(nn);
        var req = {
            "openid":openid,
            "sweepstr":qr,
            "longitude": longitude, //"经度"
            "latitude": latitude //"纬度"
        };
        vge.callJApi(japi, req, function(obj){
            loaded();
            switch(obj.result.businessCode) {
            case '0':
                toast('加载成功');
                // 显示到页面
                break;
            case '1':
                toast('加载失败:'+obj.msg);
                break;
            default:
                toast('error:'+obj.result.businessCode+','+obj.msg);
            }
        });
    }
    

    $('#chkcode').click(function(){
        var japi = vge.liby + '/DBTLBInterface/user/getCaptcha';
        var data={
	        "phonenum":"18612252704"
        };
        vge.callJApi(japi, data, function(obj){
            switch(obj.result.businessCode) {
            case '0':
                toast('加载成功');
                // 显示到页面
                break;
            case '1':
                toast('加载失败:'+obj.msg);
                break;
            default:
                toast('error:'+obj.result.businessCode+','+obj.msg);
            }
        });
    });

    $('#location').click(function(){
        var japi = vge.liby + '/DBTLBInterface/activity/getCurrentLocation';
        var data={
	        "longitude":longitude,
	        "latitude":latitude
        };
        vge.callJApi(japi, data, function(obj){
            switch(obj.result.businessCode) {
            case '0':
                toast('加载成功');
                // 显示到页面
                break;
            case '1':
                toast('加载失败:'+obj.msg);
                break;
            default:
                toast('error:'+obj.result.businessCode+','+obj.msg);
            }
        });
    });
    
    $('#activity').click(function(){
        var japi = vge.liby + '/DBTLBInterface/activity/getNewestActivityDetail';
        var data={
	        "activityKey":"活动key"
        };
        vge.callJApi(japi, data, function(obj){
            switch(obj.result.businessCode) {
            case '0':
                toast('加载成功');
                // 显示到页面
                break;
            case '1':
                toast('加载失败:'+obj.msg);
                break;
            default:
                toast('error:'+obj.result.businessCode+','+obj.msg);
            }
        });
    });

    
    $('#drawings').click(function(){ // 提现
        var japi = vge.liby + '/DBTLBInterface/extract/index.do';
        var data={
            "requestTime": Date.now(),
            "commandType": "extract",
            "protocol": "1.0.0",
            "commandInfo": {
                "openid":openid,
				"unionid":"微信unionid",
				"dataid": "数据字典key", // ??
				"timestamp":"时间戳Long",
				"bindkey": "银行主键",
				"token":"算法:md5[key+(md5[timestamp+userkey])]Md5 32位 消息摘要"
            }                   // 是否服务器端实现?
        };
        vge.callJApi(japi, data, function(obj){
            switch(obj.result.businessCode) {
            case '0':
                toast('加载成功');
                // 显示到页面
                break;
            case '1':
                toast('加载失败:'+obj.msg);
          		// 1：用户没登陆/userkey存在错误 
			    // 2：积分不足
			    // 3：未实名认证
			    // 4：未绑定银行卡
			    // 5：当天提现次数达到上限
			    // 6：当月提现金额达到上限
			    // 7: 第三方提现开关状态关闭
			    // 8: 签名验证失败
			    // 9: 华夏银行卡号错误
                // 10:每月最后一天
                // 11:每日22时至次日凌晨2时
                // 12:该用户在黑名单中 
                break;
            default:
                toast('error:'+obj.result.businessCode+','+obj.msg);
            }
        });
    });

    $('#replenish').click(function(){ // 话费兑换
        var japi = vge.liby + '/DBTLBInterface/exchange/exchange.do';
        var ua = navigator.userAgent.toLowerCase();
        var data={
            "requestTime": Date.now(),
            "commandType": "new_recharge",
            // "commandType": 'checkOperators',
            // "commandType": "newapprecharge",
            "protocol": "1.0.0",
            "clientInfo": {
                "platformId": ua.indexOf('iphone')===-1? '200':'100'
            },
            "commandInfo": {
                "openid": openid,
                "currentmobile": "13701075403",
	            "longitude":longitude,
	            "latitude":latitude,
                "precisions": accuracy,
                "dataid": "数据字典中兑换话费金额key"
            }
        };
        vge.callJApi(japi, data, function(obj){
            switch(obj.result.businessCode) {
            case '0':
                toast('加载成功');
                // 显示到页面
                break;
            case '1':
                toast('加载失败:'+obj.msg);
                break;
            default:
                toast('error:'+obj.result.businessCode+','+obj.msg);
            }
        });
    });

    $('#get-gift').click(function(){
        var japi = vge.liby + '/DBTLBInterface/gifts/getGiftspack';
        var data={
	        "openid": openid,
	        "unionid":"unionId"
        };
        vge.callJApi(japi, data, function(obj){
            switch(obj.result.businessCode) {
            case '0':
                toast('加载成功');
                // 显示到页面
                break;
            case '1':
                toast('加载失败:'+obj.msg);
                break;
            default:
                toast('error:'+obj.result.businessCode+','+obj.msg);
            }
        });
    });

    $('#near-reseller').click(function(){
        var japi = vge.liby + '/DBTLBInterface/activity/getNearReseller';
        var data={
	        "openid": openid,
	        "longitude":longitude,
	        "latitude":latitude
        };
        vge.callJApi(japi, data, function(obj){
            switch(obj.result.businessCode) {
            case '0':
                toast('加载成功');
                // 显示到页面
                break;
            case '1':
                toast('加载失败:'+obj.msg);
                break;
            default:
                toast('error:'+obj.result.businessCode+','+obj.msg);
            }
        });
    });

    $('#gift-list').click(function(){
        var japi = vge.liby + '/DBTLBInterface/gifts/queryAllGiftsList';
        var data={
	        "openid": openid,
	        "hbopenid":hbopenid,
	        "currentPage": 1,
  	        "count": 20
        };
        vge.callJApi(japi, data, function(obj){
            switch(obj.result.businessCode) {
            case '0':
                toast('加载成功');
                // 显示到页面
                break;
            case '1':
                toast('加载失败:'+obj.msg);
                break;
            case '2':
                toast('无红包记录'+obj.msg);
                break;
            default:
                toast('error:'+obj.result.businessCode+','+obj.msg);
            }
        });
    });

    $('#mywallet').click(function(){
        var japi = vge.liby + '/DBTLBInterface/gifts/queryMyWallet';
        var data={
	        "openid": openid,
	        "currentPage": 1,
            "count": 20
        };
        vge.callJApi(japi, data, function(obj){
            switch(obj.result.businessCode) {
            case '0':
                toast('加载成功');
                // 显示到页面
                break;
            case '1':
                toast('加载失败:'+obj.msg);
                break;
            default:
                toast('error:'+obj.result.businessCode+','+obj.msg);
            }
        });
    });

    $('#real-name').click(function(){
        var japi = vge.liby + '/DBTLBInterface/appUser/index.do';
        var data={
            "requestTime": "",
            "commandType": "bindrealname",
            "protocol": "1.0.0",
            "commandInfo": {
                "openid": openid,
				"unionid":"微信unionid",
				"realname" : "姓名",
				"idcard" : "身份证号"
            }
        };
        vge.callJApi(japi, data, function(obj){
            switch(obj.result.businessCode) {
            case '0':
                toast('加载成功');
                // 显示到页面
                break;
            case '1':
                toast('加载失败:'+obj.msg);
                break;
            default:
                toast('error:'+obj.result.businessCode+','+obj.msg);
            }
        });
    });

    $('#save-shop-info').click(function(ev){
        var japi = vge.liby + '/DBTLBInterface/activity/saveStoreInfo',
            vericode = dom_vericode.value;
        var data={
	        "operType":'create', // "操作类型 新增=create|编辑=update",
	        "openid": openid,
	        "infoKey":'', // 店铺key 编辑时使用 创建时为空
	        "storeName":"店铺名称",
	        "ownerName":"店主姓名",
	        "phoneNumber":"18612252704",
	        "businessLicenseNo":"营业执照号",
	        "province":"省",
	        "city":"市",
	        "district":"县/区",
	        "address":"详细地址",
	        "longitude":longitude,
	        "latitude":latitude,
	        "veriCode":vericode // 验证码 新增店铺时使用
        };
        vge.callJApi(japi, data, function(obj){
            // 回复报文
            // {
	        //     "result":{
		    //         "code":"状态码,0-成功,1-失败",
		    //         "businessCode":"状态码,0 - 成功,1 - 失败"
		    //         "msg": "错误消息"
		    //     },
	        //     "replyTime": "回复时间，时间戳，当前毫数"
            // }
            switch(obj.result.businessCode) {
            case '0':
                toast('保存成功');
                break;
            case '1':
                toast('保存失败:'+obj.msg);
                break;
            default:
                toast('error:'+obj.result.businessCode+','+obj.msg);
            }
        });
    });

    $('#store-info').click(function(ev){
        var japi = vge.liby + '/DBTLBInterface/activity/getStoreInfo';
        var data = {
	        "openid": openid
        };
        vge.callJApi(japi, data, function(obj){
            switch(obj.result.businessCode) {
            case '0':
                toast('加载成功');
                // 显示到页面
                break;
            case '1':
                toast('加载失败:'+obj.msg);
                break;
            default:
                toast('error:'+obj.result.businessCode+','+obj.msg);
            }            
        });        
    });
    
    // $.get('/busr/welcome?cmd=del&appid='+appid +'&type='+type, function(ret) {
    //     console.log(ret);
    // });

    // $.post('/wx3/sendtplmsg?appid='+sessionStorage.active_app, JSON.stringify(data), function(ret){
    //     if (ret.errcode===0) {
    //         toast('发送成功');
    //     }else{
    //         console.log(ret);
    //         toast('发送出错');
    //     }
    // });
    
})();
