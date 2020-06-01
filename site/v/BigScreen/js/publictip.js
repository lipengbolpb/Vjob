function public_tip (msg,cb) {
   var bingtoptipid = 'bingtoptip';
	var mask = document.getElementById(bingtoptipid), wrapper, tiptit, tiptalk, tipbtn;

	if (mask===null) {
		mask=document.createElement('div');
		wrapper=document.createElement('div');
		tiptit=document.createElement('p');
		tiptalk=document.createElement('p');
		tipbtn=document.createElement('p');
	} else{
		wrapper=document.getElementById('wrapperid');
		tiptit=document.getElementById('tiptitid');
		tiptalk=document.getElementById('tiptalkid');
		tipbtn=document.getElementById('tipbtnid');
	}
	
	mask.id=bingtoptipid;
	wrapper.id='wrapperid';
	tiptit.id='tiptitid';
	tiptalk.id='tiptalkid';
	tipbtn.id='tipbtnid';
	tiptit.innerHTML='提&nbsp;示';
	tiptalk.innerHTML=msg;
	tipbtn.innerHTML='我知道了';
	wrapper.appendChild(tiptit);
	wrapper.appendChild(tiptalk);
	wrapper.appendChild(tipbtn);

	mask.style.cssText='width:100%; height:100%; position:fixed; left:0px; top:0px; background:#000; opacity: 0.6; filter: alpha(opacity=60); z-index:1000;';
	wrapper.style.cssText='width:76%; position: fixed; left:12%; top:24%; background:#fff; padding-top:20px; text-align:center; border-radius:5px; z-index:1100; height:154px;';
	tiptit.style.cssText='font-size:14px; line-height:24px; color:#5C554E;';
	tiptalk.style.cssText='padding:20px 8% 20px; font-size:16px; line-height:24px; height:48px;';
	tipbtn.style.cssText='border-top:1px solid #EDEDED; font-size:16px; line-height:40px; color:#5C9EE6;';

	document.body.appendChild(mask);
	document.body.appendChild(wrapper);
	mask.style.display='block';
	wrapper.style.display='block';

	tipbtn.addEventListener('click',function () {
		mask.style.display='none';
		wrapper.style.display='none';
		if (cb!== undefined) {
			cb();
		}
	},false);
}
function title_tip (tit,con,btn,jump,cb) {
	var mask_pubid='mask_pub';
	var mask_pub=document.getElementById(mask_pubid);
	if (mask_pub===null) {
		mask_pub=document.createElement('div');
		alert_pub=document.createElement('div');
	} else{
		alert_pub=document.getElementById('alert_pub');
	}
	mask_pub.id='mask_pub';
	alert_pub.id='alert_pub';
	document.body.appendChild(mask_pub);
	document.body.appendChild(alert_pub);
	alert_pub.innerHTML='<p id="tip_tit_pub">验证码填写有误</p><br><p id="tip_con_pub">请填写正确的验证码</p><br><div id="tip_btn_pub">我知道了</div>';

	var tip_tit_pub=document.getElementById('tip_tit_pub'),
		tip_con_pub=document.getElementById('tip_con_pub'),
		tip_btn_pub=document.getElementById('tip_btn_pub');

	tip_tit_pub.innerHTML=tit;
	tip_con_pub.innerHTML=con;
	tip_btn_pub.innerHTML=btn;
	mask_pub.style.cssText='width:100%; height:100%; position:fixed; left:0px; top:0px; background:#000; opacity: 0.6; filter: alpha(opacity=60); z-index:1000; display: none;';
	alert_pub.style.cssText='width: 20%; background: #fff; border-radius: 6px; text-align: center; position: fixed; top: 40%; left: 40%; z-index: 1100; display: none; padding-bottom: 0';
	tip_tit_pub.style.cssText='padding-top: 20px; padding-bottom: 20px; color: #4A4A4A; font-size: 16px;';
	tip_con_pub.style.cssText='font-size: 14px; line-height: 20px; color: #4D4C4D;';
	tip_btn_pub.style.cssText='border-top: 1px solid #F3F3F3; color: #569BE5; line-height: 40px; margin-top: 25px; font-size: 16px;';

	mask_pub.style.display='block';
	alert_pub.style.display='block';
	if (btn===undefined||btn==='') {
		tip_btn_pub.style.display='none';
		alert_pub.style.paddingBottom='30px';
	} else{
		tip_btn_pub.addEventListener('click',function () {
			if (jump===undefined||jump==='') {
				alert_pub.style.display='none';
				mask_pub.style.display='none';
			} else {
				location.replace(jump);
			} 
			if (cb!== undefined) {
				cb();
				alert_pub.style.display='none';
				mask_pub.style.display='none';
			}
		},false);
	}
}
function chose_tip (tit,con,btn_left,url_left,btn_rgh,url_rgh,cb) {
	var mask_pubid='mask_pub';
	var mask_pub=document.getElementById(mask_pubid);
	if (mask_pub===null) {
		mask_pub=document.createElement('div');
		alert_pub=document.createElement('div');
	} else{
		alert_pub=document.getElementById('alert_pub');
	}
	mask_pub.id='mask_pub';
	alert_pub.id='alert_pub';
	document.body.appendChild(mask_pub);
	document.body.appendChild(alert_pub);
	alert_pub.innerHTML='<p id="chose_tiptit">验证码填写有误</p><br><p id="chose_tipcon">请填写正确的验证码</p><br><div id="chose_tipbtn"><p id="chose_btnleft">取消</p><p id="chose_btnrgh">确认</p></div>';

	var chose_tiptit=document.getElementById('chose_tiptit'),
		chose_tipcon=document.getElementById('chose_tipcon'),
		chose_tipbtn=document.getElementById('chose_tipbtn'),
		chose_btnleft=document.getElementById('chose_btnleft'),
		chose_btnrgh=document.getElementById('chose_btnrgh');

	chose_tiptit.innerHTML=tit;
	chose_tipcon.innerHTML=con;
	chose_btnleft.innerHTML=btn_left;
	chose_btnrgh.innerHTML=btn_rgh;
	mask_pub.style.cssText='width:100%; height:100%; position:fixed; left:0px; top:0px; background:#000; opacity: 0.6; filter: alpha(opacity=60); z-index:1000; display: none;';
	alert_pub.style.cssText='width: 86%; background: #fff; border-radius: 6px; text-align: center; position: fixed; top: 26%; left: 7%; z-index: 1100; display: none;';
	chose_tiptit.style.cssText='padding-top: 20px; padding-bottom: 20px; color: #4A4A4A; font-size: 16px;';
	chose_tipcon.style.cssText='font-size: 14px; line-height: 20px; color: #4D4C4D; padding: 0 8%;';
	chose_tipbtn.style.cssText='border-top: 1px solid #F3F3F3; color: #569BE5; line-height: 40px; margin-top: 25px; font-size: 16px; overflow: hidden;';
	chose_btnleft.style.cssText='width: 49.5%; border-right: 1px solid #F3F3F3; float: left;';
	chose_btnrgh.style.cssText='width: 49.5%; float: left;';

	mask_pub.style.display='block';
	alert_pub.style.display='block';
	chose_btnleft.addEventListener('click',function () {
		if (url_left===undefined||url_left==='') {
			alert_pub.style.display='none';
			mask_pub.style.display='none';
			if (cb!== undefined) {
				cb(false);
			}
		} else {
			location.replace(url_left);
		} 
	},false);
	chose_btnrgh.addEventListener('click',function () {
		if (url_rgh===undefined||url_rgh==='') {
			alert_pub.style.display='none';
			mask_pub.style.display='none';
			if (cb!== undefined) {
				cb(true);
			}
		} else {
			location.replace(url_rgh);
		} 
			
	},false);
}