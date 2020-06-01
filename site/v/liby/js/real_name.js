(function () {
    'use strict';
	var args = vge.urlparse(location.href),
		openid = args.openid;

	var name_tip=document.getElementById('name_tip'),
		reg_success=document.getElementById('reg_success'),
		dom_record=document.getElementById('record'),
		dom_btn=document.getElementById('btn'),
		realname_box=document.getElementById('realname_box'),
        real_ipts=realname_box.getElementsByTagName('input'),
        real_ps=realname_box.getElementsByTagName('p'),
        dom_delete=document.getElementById('delete'),
        real_suc=document.getElementById('real_suc');
    
	name_tip.addEventListener("click",function () {
		reg_success.style.display="block";
	},false);
    
	dom_record.addEventListener("click",function () {
		reg_success.style.display="none";
	},false);

	var reg1 = /^(\w|[\u4E00-\u9FA5])*$/,
        reg2=/^[1-9][0-9xX]{17}/;
    var realusr=false,idcode='',realname='';

    real_ipts[1].addEventListener("keyup",function () {
        idcode=real_ipts[1].value;
        if (idcode!=="") {
            dom_delete.style.display="block";
        } else{
            dom_delete.style.display="none";
        }
    },false);
    
    dom_delete.addEventListener("click",function () {
        real_ipts[1].value="";
        idcode="";
        dom_delete.style.display="none";
    },false);

	dom_btn.addEventListener("click",function () {
        if (!realusr) {
            realname = real_ipts[0].value;
            if (!reg1.test(realname)||realname === "") {
                toptip("请填写正确的真实姓名！",5000);
            } else if (!reg2.test(idcode)||idcode === ""||!getIdcardValidateCode(idcode)) {
                toptip("请填写正确的身份证号！",5000);
            } else{//信息格式正确

		        var japi = vge.liby + '/DBTLBInterface/user/bindrealname',
                    data = {
        	            "openid":openid,
	                    "realname" : realname,
	                    "idcard" : idcode
		            };
		        vge.callJApi(japi, data, function(jo) {
                    if( jo.result.businessCode=='0') {
                        realusr=true;
                        dom_btn.innerHTML="添加银行卡";
                        real_suc.innerHTML="恭喜您实名认证成功";
                        real_ps[0].className="success";
                        real_ps[1].className="success";
                        dom_delete.style.display="none";
                        real_ipts[1].value=idcode.substring(0,4)+"**** **** ****"+idcode.substring(16,18);
			        }else{
				        toptip("认证失败："+jo.result.businessCode+jo.result.msg,5000);
                    }
                },'debug');
                
            }
        } else{//实名认证成功
            sessionStorage.realname = realname;
            location.href = '/liby/t/add_card?openid='+openid;
        }
	});

    
})();
