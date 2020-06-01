(function(){
	var openid = sessionStorage.vjifenOpenid,//v积分
		qr = sessionStorage.qr,
		flag = true,
		project = 'gxqp201703';
	
	var args = vge.urlparse(location.href),
		bizcode = args.bizcode,
		tx = args.tx;
	
	if(tx){
		if(args.openid){
			openid = args.openid;
			sessionStorage.unionid = args.unionid;
		}
//		document.getElementsByClassName('tip')[0].innerHTML = '恭喜您中得88.88元大奖!<br><br>请提交手机号，并输入验证码。<br>验证成功后奖金将自动提现到您的微信钱包内。';
	}
	
	var get_yz = document.getElementById("get_yz");
	var countdowntimer = null; 
	
	var reg1=/^1[0-9]{10}$/,
		reg2=/^[1-9][0-9xX]{17}$/,
		reg3=/^[0-9]{4}$/;
	
	
	
	if(bizcode==12||bizcode==14){//12可疑  14指定
		document.getElementById('wrap').style.display = 'block';
		document.getElementById("wrap1").style.display = 'none';
	}else if(bizcode==13){//黑名单
		document.getElementById("wrap1").style.display = 'block';
		document.getElementById('wrap').style.display = 'none';
	}
	
	
	$('#tj').on('click',function(){
		if(!reg1.test($('#tel').val())){
			title_tip('提 示','请填写正确的手机号！~','我知道了');
		} else if(!reg3.test($('#yz_code').val())){
			title_tip('提 示','请填写正确的验证码！~','我知道了');
		} else {
			//调提交接口
			sub_message ();
		}
	});
	
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
				get_yz.addEventListener("click",getYzcode,false);//恢复计时器
           		countdowntimer=null;
			}
		}, 1000);
   	}
	get_yz.addEventListener('click',getYzcode,false); 
    
    function getYzcode(){
    	get_yz.removeEventListener('click',getYzcode,false);
        if(!reg1.test($('#tel').val())){
			title_tip('提 示','请填写正确的手机号！~','我知道了');
			get_yz.addEventListener('click',getYzcode,false);
		} else {
			if (get_yz.innerHTML==='获取验证码') {
                getCheckCode(function(){
                   countdown(get_yz, 60);
               });
            }else{
            	get_yz.removeEventListener('click',getYzcode,false);
            }
		}
    }
	
	function getCheckCode(cb) { // 获取手机验证码
		var javai = vge.common+'/vjifenInterface/user/getCaptcha';
		var req = { "projectServerName": "guangxi",
			"phonenum":$('#tel').val(),
			"sendtype":"1"
		};
		vge.callJApi(javai, req, function(jo) {
			if (jo.result.code=='0') {
	            if( jo.result.businessCode=='0') {
					//成功，开始倒计时
					cb();
				} else if(jo.result.businessCode==='2') {//1
					title_tip('尊敬的用户','您填写的手机号错误，发送验证码失败！','我知道了');
					get_yz.addEventListener('click',getYzcode,false);
				} else{
					title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
					get_yz.addEventListener('click',getYzcode,false);
				}
			} else{//code!='0'
				title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
				get_yz.addEventListener('click',getYzcode,false);
			}
		});
	}
    
   	function sub_message () { // 提交信息
   		var javai = vge.common + '/vjifenInterface/user/updateUserInfoMobile';
		var req = { "projectServerName": "guangxi",
			"openid":openid,
			"unionid":sessionStorage.unionid,
			"phonenum":$('#tel').val(),
			"captcha":$('#yz_code').val()
		};
		vge.callJApi(javai, req, function(jo) {
			if (jo.result.code==='0') {
	            if( jo.result.businessCode==='0') {
	            		if(tx){
	            			give_spack();
	            		}else{
	            			sweep();
	            		}
					} else if( jo.result.businessCode=='1'){//1
						title_tip('提 示','系统开了个小差','我知道了');
					} else if( jo.result.businessCode=='2'){//2
						title_tip('提 示','手机号码已存在','我知道了');
					} else if( jo.result.businessCode=='-1'){//-1
						title_tip('提 示','系统升级中...','我知道了');
					} else if( jo.result.businessCode=='3'){//
						title_tip('提 示','手机号验证失败','我知道了');
					} else{
						title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
					}
			} else{//code!='0'
				title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
			}
		});
   	}
	
	
	
	
	
	function sweep() {
        loading('玩命加载中');
        if (first) {
            first = false;
            var japi = vge.common + '/vjifenInterface/sweep/sweepQrcode';
            var req = { "projectServerName": "guangxi",
                "openid": openid,
//              "unionid": unionid,
                "sweepstr": qr,
                "vjifenOpenid":openid,
                "longitude": sessionStorage.longitude === undefined ? '' : sessionStorage.longitude, //"经度"
                "latitude": sessionStorage.latitude === undefined ? '' : sessionStorage.latitude //"纬度"
            };
            vge.callJApi(japi, req, cb);
            vge.clog('调接口次数', [japi, JSON.stringify(req)]);
        } else {
            return;
        }
    }

    function cb(jo) {
        if (jo.result.code == '0') {
            if (jo.reply && jo.reply.activityVersion === '2') { // 春节版
                project = 'gxqp20171214';
            }

            if (jo.reply && jo.reply.activityVersion === '3') { //歌诗达游轮版
         
            }

            if (jo.reply && jo.reply.activityVersion === '4') { //经典版
                project = 'gxqp-common';
            }

            switch (jo.result.businessCode) {
                case '0': // 普通奖
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    sessionStorage.weekSignFlag = jo.reply.weekSignFlag; //是否开户自然周签到，1:开启、0或空:关闭
                    sessionStorage.weekSignDays = jo.reply.weekSignDays; //当前周已签到周几集合
                    sessionStorage.weekSignEarnFlag = jo.reply.weekSignEarnFlag; //周签到红包是否已领取，1:已领取、0未领取
                    sessionStorage.weekSignEarnMoney = jo.reply.weekSignEarnMoney; //周签到红包金额
                    sessionStorage.weekSignLimitDay = jo.reply.weekSignLimitDay; //周签到天数限制
                    sessionStorage.weekSignDiffDay = jo.reply.weekSignDiffDay; //周签到还差天数
                    sessionStorage.weekSignPercent = jo.reply.weekSignPercent; //进度百分比
                    sessionStorage.weekSignPopup = jo.reply.weekSignPopup; //自然周签到弹出提示
                    sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime; //扫码时间
                    location.replace('http://' + location.host + '/' + project + '/txo/getcash?bizcode=' + jo.result.businessCode);
                    break;
                case '11': // 自己重复扫，普通奖
                    sessionStorage.totalAccountMoney = jo.reply.totalAccountMoney;
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.codeContentUrl = jo.reply.codeContentUrl;
                    sessionStorage.earnTime = jo.reply.earnTime;
                    if(jo.reply.activityVersion === '3'){
                    	location.replace('http://' + location.host + '/' + project + '/txo/repcash?bizcode=' + jo.result.businessCode);
                    }eles{
                    	location.replace('http://' + location.host + '/' + project + '/txo/getcash?bizcode=' + jo.result.businessCode);
                    }
                    break;
                case '12': // 可疑
                    location.replace('http://' + location.host + '/v/' + project + '/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '13': // 黑名单
                    location.replace('http://' + location.host + '/v/' + project + '/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '14': // 指定
                    location.replace('http://' + location.host + '/v/' + project + '/getMsg.html?bizcode=' + jo.result.businessCode);
                    break;
                case '15': //大奖核销
                    if (jo.reply) {
                        sessionStorage.earnTime = jo.reply.earnTime;
                        sessionStorage.grandPrizeType = jo.reply.grandPrizeType;
                        sessionStorage.gpt = jo.reply.grandPrizeType;
                    }
                    
                    if (jo.reply.grandPrizeType == '1' || jo.reply.grandPrizeType == '2') { //金银元宝
                        location.replace('http://' + location.host + '/v/gxqp20171214/prize.html?bizcode=' + jo.result.businessCode);
                    } else if (jo.reply.grandPrizeType == '0') { //歌诗达游轮
                        location.replace('http://' + location.host + '/v/gxqp201703/checkPrize.html?bizcode=' + jo.result.businessCode);
                    } else if (jo.reply.grandPrizeType == 'p' || jo.reply.grandPrizeType == 'P') {
                        location.replace('http://' + location.host + '/v/gxqp-common/prize.html?bizcode=' + jo.result.businessCode);
                    }else{
                        title_tip('尊敬的用户', '扫码异常', '我知道了');
                    }
                    
                    break;
                case '7': // 一等奖
                    if (jo.reply !== undefined) {
                        if (jo.reply.username !== undefined) {
                            sessionStorage.username = jo.reply.username;
                            sessionStorage.idcard = jo.reply.idcard;
                            sessionStorage.phonenum = jo.reply.phonenum;
                            sessionStorage.skukey = jo.reply.skukey;
                            sessionStorage.vqr = jo.reply.prizeVcode;
                            sessionStorage.gpt = jo.reply.grandPrizeType;
                            sessionStorage.grandPrizeType = jo.reply.grandPrizeType;
                        } else { // 未填写过信息
                            sessionStorage.skukey = jo.reply.skukey;
                            sessionStorage.vqr = jo.reply.prizeVcode;
                            sessionStorage.gpt = jo.reply.grandPrizeType;
                            sessionStorage.grandPrizeType = jo.reply.grandPrizeType;
                        }
                    } else {
                        sessionStorage.username = '信息查询失败 no reply';
                    }
                    if (jo.reply.grandPrizeType == '1' || jo.reply.grandPrizeType == '2') { //金银元宝
                        location.replace('http://' + location.host + '/v/gxqp20171214/prize.html?bizcode=' + jo.result.businessCode);
                    } else if (jo.reply.grandPrizeType == '0') { //歌诗达游轮
                        location.replace('http://' + location.host + '/v/gxqp201703/prize.html?bizcode=' + jo.result.businessCode);
                    } else if (jo.reply.grandPrizeType == 'p' || jo.reply.grandPrizeType == 'P') {
                        location.replace('http://' + location.host + '/v/gxqp-common/prize.html?bizcode=' + jo.result.businessCode);
                    }else{
                        title_tip('尊敬的用户', '扫码异常', '我知道了');
                    }
                    break;
                case '-1':
                    title_tip('尊敬的用户', '亲，扫码人数太多，后台余额不足<br />掌柜正在快马加鞭进行充值。<br />请保存好瓶盖，晚些时候再试~', '我知道了');
                    break;
                default:
                    if (jo.reply) {
                        sessionStorage.batchName = jo.reply.batchName === undefined ? '' : jo.reply.batchName;
                        sessionStorage.earnTime = jo.reply.earnTime === undefined ? '' : jo.reply.earnTime;
                        sessionStorage.msg = jo.result.msg;
                    } else {
                        sessionStorage.earnTime = '';
                    }
                    location.replace('http://' + location.host + '/v/' + replace + '/fail.html?bizcode=' + jo.result.businessCode);
            }
        } else if (jo.result.code == '-1') { //jo.result.code!=0
            title_tip('尊敬的用户', '系统升级中，请稍后再试！', '我知道了');
        } else {
            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
        }
    }
    
    
    function give_spack () {
		var javai = vge.common + '/vjifenInterface/gifts/getGiftspack';
		var req = { "projectServerName": "guangxi",
			"openid":openid,
			"hbopenid":sessionStorage.hbopenid,
			"unionid":sessionStorage.unionid===undefined?'':sessionStorage.unionid
		};
		vge.callJApi(javai, req, function(jo) {
			if (jo.result.code=='0') {
            	if( jo.result.businessCode==='0') {
            		document.getElementsByClassName('mark')[0].style.display = 'block';
				} else if( jo.result.businessCode==='1'){//1
					title_tip('提 示','您的红包金额不足，再喝几瓶攒够1元发红包！','我知道了');
				} else if( jo.result.businessCode==='4'){//1
					title_tip('提 示','提现处理中，请稍后查看详细记录','我知道了');
				} else if( jo.result.businessCode==='5'){//1
					title_tip('提 示',jo.result.msg,'我知道了');
				} else if( jo.result.businessCode==='-1'){//1
					title_tip('提 示','提现操作过于频繁，请稍后再试！','我知道了');
				} else if (jo.result.businessCode === '-2') { //-2
	            	title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
	        	} else if( jo.result.businessCode==='2'){//1
					title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
				} else if( jo.result.businessCode==='3'){//1
					title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
				} else{
					title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
				}
			} else{//code!='0'
				title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
			}
		});
	}
    
    document.getElementById("alert").addEventListener('click', function() {
		ifremeber();
	});

	function ifremeber() {
		var req = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.gxqpappid;
		vge.ajxget(req, 5000, function(r) {
			try {
				var o = JSON.parse(r);
				if(o.subscribe == '0') { //未关注
					window.location.replace('http://' + location.host + '/v/gxqp20171214/attention.html');
				} else { //已关注用户
					document.getElementsByClassName('mark')[0].style.display = 'none';
					window.location.replace('http://' + location.host + '/gxqp20171214/too/mybag');
				}
			} catch(e) {
				vge.clog('errmsg', [req, e]);
			}
		}, function(err) {
			vge.clog('errmsg', [req, err]);
		});
	}
    
    
    
    
    
})();
