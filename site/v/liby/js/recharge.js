(function() {
	"use strict";
    // 隐藏微信右上角菜单
    ini_wxshare(vge.libyappid);
    var latitude, longitude, accuracy;
    wx.ready(function() {
        wx.hideOptionMenu();
        wx.getLocation({        // 获取位置信息
            type: 'wgs84',// 默认为wgs84的gps坐标
            complete: function (res) {   //接口调用完成执行回调，无论成功失败
                // console.log(res);
                latitude = res.latitude;  // 纬度，浮点数，范围为90 ~ -90
                longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180
                accuracy = res.accuracy;  // 位置精度
                locationed = true;
            }
        });
    });
    var uargs = vge.urlparse(location.href), openid = uargs.openid;
    var thirdServerSwitch='';
    
    var bot_fix=document.getElementById('bot_fix'), clientHeight = 0;
    getClientHeight();
    function getClientHeight() {
        if (document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        } else {
            clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        }
    }
    setTimeout(function  () {
        if (clientHeight-28<266) {//屏幕需要滚动
            bot_fix.style.position='absolute';
            bot_fix.style.top=(266-clientHeight)+266+bot_fix.clientHeight+20+'px';
        } else{
            bot_fix.style.position='absolute';
            bot_fix.style.top=clientHeight-bot_fix.clientHeight+'px';
        }
    },100);

	var 
	tel_code=document.getElementById('tel_code'),
	dom_opera=document.getElementById('opera'),
	dom_cancel=document.getElementById('cancel'),
	dom_times=document.getElementById('times'),
	vs_code=document.getElementById('vs_code'),
	chose_mon=document.getElementById('chose_mon'),
	s_tip=document.getElementById('s_tip'),
	dom_mask=document.getElementById('mask'),
	dom_confirm=document.getElementById('confirm'),
	firm_close=document.getElementById('firm_close'),
	dom_btn=document.getElementById('btn'),
	que_tel=document.getElementById('que_tel'),
	que_opera=document.getElementById('que_opera'),
	que_mon=document.getElementById('que_mon'),
	que_fee=document.getElementById('que_fee'),
	que_code=document.getElementById('que_code'),
	note_btn=document.getElementById('note_btn'),
	reg_success=document.getElementById('reg_success'),
	dom_know=document.getElementById('know');

    var sumpoints, once_x=true,money='',telnum='',opera='',fee='',code='',Mobile='',Unicom='',Telecom='', valkey, cz_times=0,vscode='',timer=null,timer2=null,hei=true;
	var reg=/[^0-9]/;

	home();

    note_btn.addEventListener('click', function(ev){
        location.href = '/liby/t/charge_record?openid='+openid;
    });

	dom_cancel.addEventListener('click', function(e) {
		e.stopPropagation();
		fanclass('n_money');
		tel_code.value='';
		telnum='';
		dom_cancel.style.display='none';
		dom_opera.innerHTML='';
	}, false);
	firm_close.addEventListener('click', function(e) {
		e.stopPropagation();
		dom_mask.style.display='none';
		dom_confirm.style.display='none';
		clearTimeout(timer);
		clearInterval(timer2);
		timer2=null;
	}, false);
	function fanclass (classn) {
		for (var i = 0; i < chose_mon.children.length; i++) {
			chose_mon.children[i].className=classn;
		};
	}
	tel_code.addEventListener('focus',function () {
		if (once_x) {
			tel_code.value='';
			telnum='';
			once_x=false;
			fanclass('n_money');
			dom_opera.innerHTML='';
		} else{
			if (tel_code.value.length===11) {
				dom_cancel.style.display='block';
			}
		}
	},false);

	tel_code.addEventListener('keyup',function () {
		if (tel_code.value.length!==0) {
			dom_cancel.style.display='block';
		}
		if (tel_code.value.length===11&&dom_times.innerHTML!==0) {
			telnum=tel_code.value;
			if (telnum.indexOf(' ')===-1&&!reg.test(telnum)) {
				fanclass('c_money');
			}
		}

        if (tel_code.value.length===3) {
			telnum=tel_code.value;
			if (Mobile.indexOf(telnum) !== -1) {
			    dom_opera.innerHTML='中国移动';
			} else if (Unicom.indexOf(telnum) !== -1) {
			    dom_opera.innerHTML='中国联通';
			} else if (Telecom.indexOf(telnum) !== -1) {
			    dom_opera.innerHTML='中国电信';
			}
		}
        
		if (tel_code.value.length===0) {
			fanclass('n_money');
			telnum='';
			dom_cancel.style.display='none';
			dom_opera.innerHTML='';
		}
        /*		if (tel_code.value.length<11) {
		 fanclass('n_money');
		 telnum='';
		 }*/
	},false);
	tel_code.addEventListener('input',function () {
		if (tel_code.value.length<11) {
			fanclass('n_money');
			telnum='';
		}
	},false);
	chose_mon.addEventListener('click',function (e) {
        if ( thirdServerSwitch !== '1') {         // 充值服务关闭或系统维护
            s_tip.innerHTML='充值服务关闭或系统维护';
            return;
        }
		event.stopPropagation();
		var target=event.target||event.srcElement;
		if (target.parentNode.parentNode.nodeName==='LI'||target.parentNode.nodeName==='LI'||target.nodeName==='LI') {
			if (target.parentNode.parentNode.nodeName==='LI') {
				target=target.parentNode.parentNode;
			} else if(target.parentNode.nodeName==='LI') {
				target=target.parentNode;
			}
			if (target.className==='c_money') {
				if (!reg.test(telnum)&&telnum.length===11&&telnum.indexOf(' ')===-1) {
					dom_cancel.style.display='none';
					code=parseInt(target.getElementsByTagName('span')[1].innerHTML);
					if (code>parseInt(vs_code.innerHTML)) {
						toptip('您的积分不足', 5000);
					} else{
						opera=dom_opera.innerHTML;
						fee=target.getAttribute('fee');
						valkey=target.getAttribute('jfkey');
						money=target.getElementsByTagName('span')[0].innerHTML;
						que_tel.innerHTML=telnum;
						que_opera.innerHTML=opera;
						que_mon.innerHTML=money;
						que_fee.innerHTML=fee;
						que_code.innerHTML=formatNumber(code);
						dom_btn.innerHTML='确认充值';
						dom_btn.style.color='#fff';
						dom_btn.disabled=false;
						dom_mask.style.display='block';
						dom_confirm.style.display='block';
					}
				} else{
					toptip('请输入正确的手机号！',5000);
				}
			}
		}
	},false);
    
	dom_btn.addEventListener('click', function(e) {
        // 在没有重新加载页面时， vscode 没有更新
        vscode=parseInt(vs_code.innerHTML)-parseInt(code); // 2016-05-09 19:01:57 zsl
		vs_code.innerHTML=formatNumber(vscode+'');
		dom_times.innerHTML = parseInt(dom_times.innerHTML)-1;
		// reg_success.style.display="block";

		// dom_mask.style.display='none';
		// dom_confirm.style.display='none';
        
        doex();
	},false);
	
	dom_know.addEventListener("click",function () {
		// reg_success.style.display="none";
		// dom_mask.style.display='none';
		// dom_confirm.style.display='none';
        
		location.reload();
	},false);
    
	function formatNumber(num) {//数字转换为三位逗号间隔
	    if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(num)) {
	        return num;
	    }
	    var a = RegExp.$1, b = RegExp.$2, c = RegExp.$3;
	    var re = new RegExp("(\\d)(\\d{3})(,|$)");
	    while (re.test(b))   b = b.replace(re, "$1,$2$3");
	    return a + "" + b + "" + c;
	}

    //主方法
	function home() {
		var javai = vge.liby + '/DBTLBInterface/exchange/exchange';
		var req = {
			"requestTime": Date.now(),
			"commandType": "checkOperators",
			"protocol": "1.0.0",
			"commandInfo": {
				"openid": openid,
				"currentmobile": ''
			}
		};
		vge.callJApi(javai, req, function(jo) {
            var ckeys = jo.reply.vpssysdatadicmlist,
                key ='',l=ckeys.length, itm, html=[], vcash,fee=0.0;
            for(var i=0;i<l;++i) {
                itm = ckeys[i];
                vcash = itm.datavalue.split(',');
                fee=parseFloat((vcash[1]-vcash[0]*100)/100).toFixed(2);
                if(fee<=0) fee = '0.00';
                html.push('<li class="n_money" fee="'+fee+'" jfkey="'+itm.dataid+'">');
                html.push('<p><span>'+vcash[0]+'</span>元</p>');
                html.push('<p>需<span>'+vcash[1]+'</span>积分</p></li>');
            }
            chose_mon.innerHTML = html.join('');
            
			thirdServerSwitch = jo.reply.obj.datavalue;
            if ( thirdServerSwitch !== '1') {         // 第三方充值服务关闭
			}else if (jo.result.businessCode ==='5'){//黑名单用户
			}else if (jo.result.businessCode ==='6'){//系统维护
                thirdServerSwitch = '-1';
			}else if (jo.reply.basis.subrechargecount!==0) {
				cz_times=parseInt(jo.reply.basis.subrechargecount);
			} else{
                toptip('code:'+jo.result.code+' businessCode:'+jo.result.businessCode, 5000);
			}
			Mobile = jo.reply.mobileoperatorList[0].datavalue; // 移动号段
			Unicom = jo.reply.mobileoperatorList[1].datavalue; // 联通号段
			Telecom = jo.reply.mobileoperatorList[2].datavalue; // 电信号段

			//用户信息
			sumpoints = jo.reply.infontegral;
			vs_code.innerHTML = sumpoints.totalpoint;
            dom_times.innerHTML = cz_times;
		});

	}

    function doex(){
        if(!latitude) { latitude='123'; longitude='321'; accuracy='80'; }
		var javai = vge.liby + '/DBTLBInterface/exchange/exchange',
            req = {
			    "requestTime": Date.now(),
			    "commandType": "new_recharge",
			    "clientInfo": {
				    "platformId": vge.platform()
			    },
			    "commandInfo": {
				    "openid": openid,
				    "currentmobile": telnum,
				    "dataid": valkey,
				    "longitude": longitude,
				    "latitude": latitude,
				    "precisions": accuracy
			    }
		    };
        
		//充值成功后清空号码
		// telecode.value = '支持移动、联通、电信';
        var clog=true;          // 注释作用
		vge.callJApi(javai, req, function(jo) {
            // result:{"businessCode":"5","code":"0","msg":"t:充值申请未成功提交,c:请选择其他的充值面额"}
            var tip = document.getElementById('success_tip'),
                pp = tip.querySelectorAll('p'),
                msg = jo.result.msg;
		    reg_success.style.display="block";
            pp[0].innerHTML = '充值提示';
            pp[1].innerHTML = JSON.stringify(jo.result);
            if(msg){
                var i= msg.indexOf('t:'),
                    j= msg.indexOf('c:');
                if(i!==-1 && j!==-1) {
                    pp[0].innerHTML = msg.substr(i+2, j-1-2);
                    pp[1].innerHTML = msg.substr(j+2);
                }
            }
		},clog);
    }
    
})();
