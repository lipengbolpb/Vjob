(function() {
    "use strict";
    ini_wxshare(vge.hljqpappid);
	var args = vge.urlparse(location.href),
        qr = args.s, openid=args.openid,unionid='';
    var flag = true;

    var i = 0;
    
    var dom_location = document.getElementById('location'),
        dom_fail = document.getElementById('fail');
   
    sessionStorage.clear();
    sessionStorage.openid = openid;
    sessionStorage.qr = qr;

    setTimeout(function() { // 应对定位调用异常
        if (sessionStorage.latitude===undefined) {
//          sweep();
        }
    }, 4000);

    loading('玩命加载中');//获取用户信息  

    // 中秋动画
	var imgList = [
		'http://'+location.host+'/v/sdqp/imgMidAutumn/logo.png',
		'http://'+location.host+'/v/sdqp/imgMidAutumn/moon_1.png',
		'http://'+location.host+'/v/sdqp/imgMidAutumn/moon_2.png',
		'http://'+location.host+'/v/sdqp/imgMidAutumn/moon_3.png',
		'http://'+location.host+'/v/sdqp/imgMidAutumn/person_left.png',
		'http://'+location.host+'/v/sdqp/imgMidAutumn/person_right.png',
		'http://'+location.host+'/v/sdqp/imgMidAutumn/rabbit_1.png',
		'http://'+location.host+'/v/sdqp/imgMidAutumn/rabbit_2.png',
		'http://'+location.host+'/v/sdqp/imgMidAutumn/rabbit_3.png',
		'http://'+location.host+'/v/sdqp/imgMidAutumn/bottom.png',
		'http://'+location.host+'/v/sdqp/imgMidAutumn/product.png',
		'http://'+location.host+'/v/sdqp/imgMidAutumn/bg_b.png',
		'http://'+location.host+'/v/sdqp/imgMidAutumn/bg_t.png'
	];
	function loadImg(i){
		var img = new Image();
		img.src = imgList[i];
		img.onload = function(){
			if(i<imgList.length){
				console.log(imgList[i],img)
				loadImg(++i)
			}
		}
		if(i>=imgList.length){
			console.log(i,'图片加载完成');
			//执行动画
			loaded();
			$('#midAutumn').css('visibility','visible')
			$('.moon_2_box,.moon_3_box,.person_1_box,.person_2_box,.foam_over').addClass('ani');
			$('.foam_over').on('animationend',function(){
				sweep();
				// if (qr.indexOf('MS_') != -1) {
				//     getMS();
				// } else {
				//     sweep();
				// }
			})
		}else{
			console.log(i)
		}
	}

    function locationed(res){
    	// loading('玩命加载中');
        dom_location.style.display = 'none';
        dom_fail.style.display = 'none';
        sessionStorage.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        sessionStorage.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        sessionStorage.speed = res.speed; // 速度，以米/每秒计
        sessionStorage.accuracy = res.accuracy; // 位置精度
        // sweep();
		loadImg(i);
    }

	
    wx.ready(function() {
        loading('玩命加载中');
        wxGetLocation();
    });
    
    function wxGetLocation(){
        wx.getLocation({
            type: 'wgs84',
            cancel:function(res){
                loaded();
                dom_location.style.display = 'block';
                dom_location.addEventListener('click',function(){
			        $('.location').css('display','none');
                    // sweep();
                    loadImg(i);
			    },false);
            },
            success:locationed,//接口调用完成时执行的回调函数，无论成功或失败都会执行。
            fail:function(res){
                loaded();
                dom_fail.style.display = 'block';
                dom_fail.addEventListener('click',function(){
		        	dom_fail.style.display = 'none';
                    // sweep();
                    loadImg(i);
		        },false);
            }
        });
    }
    
    function sweep() {
    	if(flag){
    		flag = false;
    		loading('玩命加载中');//调用接口
        	var japi = vge.hljqp+'/DBTHLJQPInterface/sweep/sweepQrcode';
        	var req = {
            	"openid":openid,
            	"sweepstr":qr,
            	"longitude": sessionStorage.longitude===undefined?'00':sessionStorage.longitude, //"经度"
            	"latitude": sessionStorage.latitude===undefined?'00':sessionStorage.latitude //"纬度"
        	};
        vge.clog('debug', [japi, JSON.stringify(req)]);
        vge.callJApi(japi, req, cb);
    	}
        
    }
    
    function cb(jo) {
    	var now = new Date();
    	console.log("时间:"+now.getTime());
//      loaded();
//         if(!confirm('返回码:'+jo.result.businessCode+' 是否跳转')) {
//             return;
//         }
		if(jo.result.code == '0'){
        	switch (jo.result.businessCode) {
	        case '0':               // 普通奖
				sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
				sessionStorage.currentMoney = jo.reply.currentMoney;
				sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
				location.replace('http://' + location.host + '/hljqp/txo/getcash?bizcode='+jo.result.businessCode);
	            break;
	        case '11':              // 自己重复扫，普通奖
				sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
				sessionStorage.currentMoney = jo.reply.currentMoney;
				sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
				location.replace('http://' + location.host + '/hljqp/txo/repcash?bizcode='+jo.result.businessCode);
	            break;
            case '7':               //一等奖或二等奖
                if(jo.reply.grandPrizeType==0){
                    sessionStorage.address = jo.reply.address===undefined?'':jo.reply.address;
                }
                sessionStorage.username = jo.reply.username===undefined?'':jo.reply.username;
                sessionStorage.idcard = jo.reply.idcard===undefined?'':jo.reply.idcard;
                sessionStorage.phonenum = jo.reply.phonenum===undefined?'':jo.reply.phonenum;
                sessionStorage.skukey = jo.reply.skukey===undefined?'':jo.reply.skukey;
                //中奖具体码
                sessionStorage.prizeVcode = jo.reply.prizeVcode===undefined?'':jo.reply.prizeVcode;
                //特等奖类别
                sessionStorage.grandPrizeType = jo.reply.grandPrizeType===undefined?'':jo.reply.grandPrizeType;
                location.replace('http://' + location.host + '/v/hljqp/prize.html');
                break;
            case '12':              // 可疑用户
                location.replace('http://' + location.host + '/v/hljqp/getMsg.html?bizcode='+jo.result.businessCode);
                break;    
            case '13':              // 黑名单
                location.replace('http://' + location.host + '/v/hljqp/getMsg.html?bizcode='+jo.result.businessCode);
                break;
            case '14':              // 与12相同
                location.replace('http://' + location.host + '/v/hljqp/getMsg.html?bizcode='+jo.result.businessCode);
                break;
            case '15':              //大奖核销
                sessionStorage.earnTime = jo.reply.earnTime===undefined?'':jo.reply.earnTime;//扫码时间
                location.replace('http://' + location.host + '/v/hljqp/repprize.html?bizcode='+jo.result.businessCode);
                break;
	        default:
	        	if(jo.reply){
	        		sessionStorage.batchName = jo.reply.batchName===undefined?'':jo.reply.batchName;
	        		sessionStorage.earnTime = jo.reply.earnTime===undefined?'':jo.reply.earnTime;//扫码时间
	        		sessionStorage.msg = jo.result.msg;
	        	}	
				location.replace('http://' + location.host + '/v/hljqp/fail.html?bizcode='+jo.result.businessCode);
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
