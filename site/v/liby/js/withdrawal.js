(function () {
    'use strict';
    // 隐藏微信右上角菜单
    ini_wxshare(vge.libyappid);
    wx.ready(function() {
        wx.hideOptionMenu();
    });
	var args = vge.urlparse(location.href),
		openid = args.openid,
        realname='',idcard='',valkey='',bkey='',
        status='',
        faqurl= 'http://mp.weixin.qq.com/s?__biz=MzAxOTQ4ODQyMw==&mid=447602826&idx=1&sn=f0ac129c05f3421b91a7db69dd0831d6#rd';
    
	var no_card=document.getElementById('no_card'),
		hav_card=document.getElementById('hav_card'),
		havcard_img=hav_card.getElementsByTagName('img')[0],
		havcard_p=hav_card.getElementsByTagName('p')[0],
		confirm_list=document.getElementById('confirm_list'),
		money_box=document.getElementById('money_box'),
		money_list=document.getElementById('money_list'),
		dom_record=document.getElementById('record'),
		dom_question=document.getElementById('question'),
		chose_band=document.getElementById('chose_band'),
		chose_cancel=document.getElementById('chose_cancel'),
		band_list=document.getElementById('band_list'),
		new_card=document.getElementById('new_card'),
		cash_confirm=document.getElementById('cash_confirm'),
		confirm_cancel=document.getElementById('confirm_cancel'),
		confirm_btn=document.getElementById('confirm_btn'),
		money_code=document.getElementById('money_code'),
		sxf_code=document.getElementById('sxf_code'),
		jf_code=document.getElementById('jf_code'),
		reg_success=document.getElementById('reg_success'),
		dom_know=document.getElementById('know'),
		sum_code=document.getElementById('sum_code');

    init();
    
	no_card.addEventListener("click",function () {
        if(realname && idcard) {
            sessionStorage.realname = realname;
            location.href = '/liby/t/add_card?openid='+openid;
        }else{
            location.href = '/liby/t/real_name?openid='+openid;
        }
	},true);
    
	hav_card.addEventListener("click",function () {
		chose_band.style.display="block";
	},true);
    
	chose_cancel.addEventListener("click",function () {
		chose_band.style.display="none";
	},false);

	band_list.addEventListener("click",function (event) {
		var target=event.target||event.srcElement,
            span = band_list.getElementsByTagName('span');
        for(var i=0;i<span.length;++i) {
            span[i].className = '';
        }
        
		if (target.nodeName=="LI"||target.parentNode.nodeName=="LI") {
			if(target.parentNode.nodeName==='LI') {
				target=target.parentNode;
			}
            bkey = target.getAttribute('data');
			target.getElementsByTagName('span')[0].className='b_chose';
			havcard_p.innerHTML=target.getElementsByTagName('p')[0].innerHTML;
			havcard_img.src=target.getElementsByTagName('img')[0].src;
			chose_band.style.display="none";
		}
	},false);
    
	new_card.addEventListener("click",function () {
        if(realname && idcard) {
            sessionStorage.realname = realname;
            location.href = '/liby/t/add_card?openid='+openid;
        }else{
            location.href = '/liby/t/real_name?openid='+openid;
        }
	},true);
    
	money_list.addEventListener("click",function (event) {
        if(status!=='') {
			// toptip(status, 5000);
		    location.href=faqurl;//常见问题跳转
            return;
        }
		var target=event.target||event.srcElement;

        var moneybtn=money_list.getElementsByTagName('li');
		for (var i = 0; i < moneybtn.length; i++) {
			moneybtn[i].className="";
		};
        
		if (target.parentNode.parentNode.nodeName==='LI'||target.parentNode.nodeName==='LI'||target.nodeName==='LI') {
			if (target.parentNode.parentNode.nodeName==='LI') {
				target=target.parentNode.parentNode;
			} else if(target.parentNode.nodeName==='LI') {
				target=target.parentNode;
			}
			target.className="chose_mon";
			if (no_card.style.display!=="none") {
				toptip("请选择要提现的银行卡！",5000);
				target.className="";
			} else{
                var span = target.getElementsByTagName('span'),
                    cval = target.getAttribute("jifen"),
                    cash = span[0].innerHTML;
                valkey = target.getAttribute("jfkey");
				if (parseInt(sum_code.innerHTML)>=parseInt(cval)) {
					money_code.innerHTML=cash+'.00';
                    var fee = parseFloat((cval-cash*100)/100).toFixed(2);
                    if(fee<=0) fee = '0.00';
					sxf_code.innerHTML=fee;
					jf_code.innerHTML=target.getAttribute("jifen");
					cash_confirm.style.display="block";
				} else{
					toptip("积分不足！",5000);
					target.className="";
				}
			}
		}
	},false);
	confirm_cancel.addEventListener("click",function () {

		// money_lis=money_list.getElementsByTagName('li'),
		// for (var i = 0; i < money_lis.length; i++) {
		// 	money_lis[i].className="";
		// };
        
		cash_confirm.style.display="none";
	},false);
    var commiting=false;
	confirm_btn.addEventListener("click",function () {
        if(!commiting) {
            commiting = true;
            mycash();
        }else{
            // toptip('正在处理', 3000);
        }
	},false);
	dom_know.addEventListener("click",function () {
		// money_lis=money_list.getElementsByTagName('li'),
        // for (var i = 0; i < money_lis.length; i++) {
		// 	money_lis[i].className="";
        // };
        
		reg_success.style.display="none";
		cash_confirm.style.display="none";
	},false);
	dom_record.addEventListener("click",function () {
        location.href = '/liby/t/cash_record?openid='+openid;
	},false);
	dom_question.addEventListener("click",function () {
		location.href=faqurl;//常见问题跳转
	},false);


    function init() {
        band_list.innerHTML='';
		var japi = vge.liby + '/DBTLBInterface/extract/index',
            data = {
                "requestTime": Date.now(),
                "commandType": "initextract",
                "protocol": "1.0.0",
                "commandInfo": {
        	        "openid":openid
                }
		    };
		vge.callJApi(japi, data, function(jo) {
            sum_code.innerHTML = jo.reply.infontegral.totalpoint;
            var ckeys = jo.reply.vpssysdatadicmlist,
                key ='',l=ckeys.length, itm, html=[], vcash;
            for(var i=0;i<l;++i) {
                itm = ckeys[i];
                vcash = itm.datavalue.split(',');
                html.push('<li jifen="'+vcash[1]+'" jfkey="'+itm.dataid+'">');
                html.push('<p><span>'+vcash[0]+'</span>元</p>');
                html.push('<p>需<span>'+vcash[1]+'</span>积分</p></li>');
            }
            realname = jo.reply.basis.realname;
            idcard = jo.reply.basis.idcard;
            money_list.innerHTML = html.join('');
            if( jo.result.businessCode==='0') {
			}else{
                if(jo.result.msg) {
                    status = "注意:"+jo.result.businessCode + jo.result.msg;
                }else{
                    status = '注意：当前不能提现，明天再试';
                }
				toptip(status, 5000);
            }
        },'debug');

		var japi2 = vge.liby + '/DBTLBInterface/banklist/index',
		    data2 = {
                "requestTime": Date.now(),
                "commandType": "banklist",
                "protocol": "1.0.0",
                "commandInfo": {
        	        "openid":openid
                }
		    };
		vge.callJApi(japi2, data2, function(jo) {
            if( jo.result.businessCode==='0') {
                var bklst = jo.reply.banklist, l=bklst.length, bko,
                    html=[],img='gh_logo.png';
                for(var i=0;i<l;++i) {
                    bko = bklst[i];
                    html.push('<li data="'+bko.bindkey+'"><img src="'+bko.banklogo+'"><p>');
                    html.push(bko.bankname + '(' + bko.cardnumber + ')');
                    if(i===0){
                        bkey = bko.bindkey;
                        havcard_img.src = bko.banklogo;
                        havcard_p.innerHTML = bko.bankname + '('+ bko.cardnumber+ ')';
                        html.push('</p><span class="b_chose"></span></li>');
                    }else html.push('</p><span></span></li>');
                }
                band_list.innerHTML = html.join('');
			}else if( jo.result.businessCode==='1') { // 无绑定，添加银行卡
                no_card.style.display = 'block';
                hav_card.style.display = 'none';
            }else{
				toptip("网络异常2:"+jo.result.businessCode, 5000);
            }
        },'debug');
        
    }

    function mycash() {
		var japi = vge.liby + '/DBTLBInterface/extract/index',
            data = {
                "requestTime": Date.now(),
                "commandType": "extract",
                "protocol": "1.0.0",
                "commandInfo": {
        	        "openid":openid,
	                "dataid": valkey,
	                "timestamp":Date.now(),
	                "bindkey": bkey
                }
		    };
		vge.callJApi(japi, data, function(jo) {
            commiting = false;
            if(jo.result.businessCode==='0'){
		        sum_code.innerHTML=parseInt(sum_code.innerHTML)-parseInt(jf_code.innerHTML);
            }
            var msg = jo.result.msg,
                title = '提示',
                content = JSON.stringify(jo.result);
            var tip = document.getElementById('success_tip'),
                pp = tip.getElementsByTagName('p');
            if(msg){
                var i= msg.indexOf('t:'),
                    j= msg.indexOf('c:');
                if(i!==-1 && j!==-1) {
                    title = msg.substr(i+2, j-1-2);
                    content = msg.substr(j+2);
                }
            }
            pp[0].innerHTML = title;
            pp[1].innerHTML = content;
		    reg_success.style.display="block";
			// toptip(title + '<br> '+ content, 5000);
        },'debug');
    }
    
})();
