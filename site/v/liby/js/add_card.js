(function () {
    'use strict';

	var args = vge.urlparse(location.href),
		openid = args.openid, bankcode='',cardcode='';
    
	var addcard_box=document.getElementById('addcard_box'),
		add_ipts=addcard_box.getElementsByTagName('input'),
		name_tip=document.getElementById('name_tip'),
		chose_btn=document.getElementById('chose_btn'),
		dom_del=document.getElementById('delete'),
		reg_success=document.getElementById('reg_success'),
		card_tip=document.getElementById('card_tip'),
		success_tip=document.getElementById('success_tip'),
		chose_band=document.getElementById('chose_band'),
		band_list=document.getElementById('band_list'),
		dom_btn=document.getElementById('btn'),
		dom_know1=document.getElementById('know1'),
		dom_know2=document.getElementById('know2'),
		chose_cancel=document.getElementById('chose_cancel'),
		band_name=document.getElementById('band_name');

    if(sessionStorage.realname) {
        add_ipts[0].value = sessionStorage.realname;
    }
    init();
    
	name_tip.addEventListener("click",function () {
		reg_success.style.display="block";
		card_tip.style.display="block";
		success_tip.style.display="none";
	},false);
	dom_know1.addEventListener("click",function () {
		reg_success.style.display="none";
	},false);
	chose_btn.addEventListener("click",function () {
		chose_band.style.display="block";
	},false);
	chose_cancel.addEventListener("click",function () {
		chose_band.style.display="none";
	},false);

	band_list.addEventListener("click",function (event) {
		var target=event.target||event.srcElement,
            span = band_list.getElementsByTagName('span');
        for(var i=0;i<span.length;++i) {
            span[i].className='';
        }
        
		if (target.nodeName=="LI") {
            bankcode = target.getAttribute('data');
			target.getElementsByTagName('span')[0].className='b_chose';
			band_name.value=target.getElementsByTagName('p')[0].innerHTML;
			chose_band.style.display="none";
		} else if (target.parentNode.nodeName=="LI") {
            bankcode = target.parentNode.getAttribute('data');
			target.parentNode.getElementsByTagName('span')[0].className='b_chose';
			band_name.value=target.parentNode.getElementsByTagName('p')[0].innerHTML;
			chose_band.style.display="none";
		}        
	},false);

	var reg1 = /^(\w|[\u4E00-\u9FA5])*$/;
	dom_btn.addEventListener("click",function () {
        cardcode = add_ipts[2].value;
		if (!reg1.test(add_ipts[0].value)||add_ipts[0].value === "") {
            toptip("请填写正确的真实姓名！",5000);
        } else if (add_ipts[1].value === "") {
            toptip("请选择开户银行！",5000);
        } else if (cardcode.length<12 || cardcode.length>24) {
			toptip("请填写正确的银行卡号！",5000);
        } else{//信息格式正确
			reg_success.style.display="block";
			card_tip.style.display="none";
            bind();
        }
	},false);
	dom_know2.addEventListener("click",function () {
		location.href="/liby/t/withdrawal?openid="+openid;
	},false);

    function bind() {
		var japi = vge.liby + '/DBTLBInterface/banklist/index',
            data = {
                "requestTime": Date.now(),
                "commandType": "bindbank",
                "protocol": "1.0.0",
                "commandInfo": {
        	        "openid":openid,
                    "bankcode": bankcode,
                    "cardnumber": cardcode
                }
		    };
		vge.callJApi(japi, data, function(jo) {
            if(jo.result.businessCode==='0'){
                success_tip.style.display="block";
            }else{
                var msg = jo.result.msg,
                    title = '提示',
                    content = JSON.stringify(jo.result);
                if(msg){
                    var i= msg.indexOf('t:'),
                        j= msg.indexOf('c:');
                    if(i!==-1 && j!==-1) {
                        title = msg.substr(i+2, j-1-2);
                        content = msg.substr(j+2);
                    }
                }
			    toptip(title + '<br> '+ content, 5000);
            }
        },'debug');
    }

    function init(){
	    var japi2 = vge.liby + '/DBTLBInterface/banklist/index',
		    data2 = {
                "requestTime": Date.now(),
                "commandType": "initbankcode",
                "protocol": "1.0.0",
                "commandInfo": {
        	        "openid":openid
                }
		    };
	    vge.callJApi(japi2, data2, function(jo) {
            if( jo.result.businessCode==='0') {
                // jo.reply.appTips;
                var lst = jo.reply.bankcodelist, l=lst.length, bk, html=[];
                for(var i=0;i<l;++i) {
                    bk = lst[i];
                    html.push('<li data="'+bk.bankcode+'"><img src="'+bk.banklogo+'"><p>');
                    html.push(bk.bankname);
                    html.push('</p><span></span></li>');
                }
                band_list.innerHTML = html.join('');
            }else{                
                var msg = jo.result.msg,
                    title = '提示',
                    content = JSON.stringify(jo.result);
                if(msg){
                    var i= msg.indexOf('t:'),
                        j= msg.indexOf('c:');
                    if(i!==-1 && j!==-1) {
                        title = msg.substr(i+2, j-1-2);
                        content = msg.substr(j+2);
                    }
                }
			    toptip(title + '<br> '+ content, 5000);
            }
        }, 'debug');
    }
    
})();
