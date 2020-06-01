(function(){
	var show = document.getElementById("show"),
		hide = document.getElementById("hide"),
		H = document.documentElement.clientHeight || document.body.clientHeight,
		dom_balance = document.getElementById("dom_balance"),
		add_money = document.getElementById("add_money"),
		no_list = document.getElementById("no_list"),
		mon_list = document.getElementById("mon_list"),
		itpl_onenote = document.getElementById("onenote_tpl").innerHTML,
		dom_tx = document.getElementById('tx'),
		dom_more = document.getElementById("more"),
		dom_num = document.getElementById('num'),
		dom_pic1 = document.getElementsByClassName('pic1')[0],
		dom_pic2 = document.getElementsByClassName('pic2')[0];
		
	var args = vge.urlparse(location.href),
		openid = args.openid,
		hbopenid = args.hbopenid,
		unionid = sessionStorage.unionid===undefined?'':sessionStorage.unionid;
	
	show.addEventListener('click',function(){
		hide.style.display = 'block';
		show.style.display = 'none';
		document.getElementsByClassName("mybag_top")[0].style.marginTop = -H + "px";
	},false);

	hide.addEventListener("click",function(){
		hide.style.display = 'none';
		show.style.display = 'block';
		document.getElementsByClassName("mybag_top")[0].style.marginTop = 0 + "px";
	});

	var currentpage=1,
		next=true,
		count=10,
		flag=true,
		first=true;

	var bottles = [
		'/v/scqp/img/0.png',
		'/v/scqp/img/1.png',
		'/v/scqp/img/2.png',
		'/v/scqp/img/3.png',
		'/v/scqp/img/4.png',
		'/v/scqp/img/5.png',
		'/v/scqp/img/6.png',
		'/v/scqp/img/7.png',
		'/v/scqp/img/8.png',
		'/v/scqp/img/9.png'
	];	
	
	attentioned();
	
	function attentioned () {
		onepage_note(currentpage);
		function onepage_note(currentpage,cb) {
			var javai = vge.common+ '/vjifenInterface/gifts/queryAllGiftsList';
			var req = { "projectServerName": "sichuan",
				"openid":openid,
				"hbopenid":hbopenid,
				"currentPage": currentpage,
	    		"count": count
			};
			vge.callJApi(javai, req, function(jo) {
				if (jo.result.code==='0') {
		            if( jo.result.businessCode==='0') {
		            	//瓶数对应数字图片效果
		            	//typeof jo.reply.total 是number属性
		            	if(flag){
		            		var botNum = (jo.reply.total).toString();//喝了总瓶数
		            		if(jo.reply.total<10){//一位数
		            			var img = document.createElement('img');
		            			img.src = bottles[Number(botNum[0])];
		            			dom_num.appendChild(img);
		            		}else if(jo.reply.total>=10&&jo.reply.total<100){//两位数
		            			for(var i=0;i<2;i++){
		            				var img = document.createElement('img');
		            				img.src = bottles[Number(botNum[i])];
		            				dom_num.appendChild(img);
		            			}
		            		}else if(jo.reply.total>=100&&jo.reply.total<1000){//三位数
		            			for(var i=0;i<3;i++){
		            				var img = document.createElement('img');
		            				img.src = bottles[Number(botNum[i])];
		            				dom_num.appendChild(img);
		            			}
		            		}else if(jo.reply.total>=1000&&jo.reply.total<10000){//四位数
		            			dom_pic1.style.width = '2.5rem';
		            			dom_pic2.style.width = '5.6rem';
		            			for(var i=0;i<4;i++){
		            				var img = document.createElement('img');
		            				img.src = bottles[Number(botNum[i])];
		            				dom_num.appendChild(img);
		            			}
		            		}
		            		flag = false;
		            	}

		            	if(currentpage==1){
		            		if(jo.reply.objList.length<count){
		            			dom_more.innerHTML = '仅显示近30天的记录';
								dom_more.style.fontSize = '0.6rem';
								dom_more.removeEventListener('click',getm,false);
		            		}
		            		var dom_total = Number(jo.reply.totalMoney);
		            		var dom_gifts = Number(jo.reply.giftsMoney);
		            		dom_total = dom_total.toFixed(2);
		            		dom_gifts = dom_gifts.toFixed(2);
		            		if(sessionStorage.totalAccountMoney){
		            			dom_tx.innerHTML = sessionStorage.tx === undefined?'0.00':sessionStorage.tx;
		            		}else{
		            			dom_tx.innerHTML = '0.00';
		            		}
			            	dom_balance.innerHTML=dom_total;
			            	add_money.innerHTML=dom_gifts;
		            	}
						var i=0, lst=jo.reply.objList, l=lst.length;
						if (l===0 || lst === undefined) {
							dom_more.innerHTML = '仅显示近30天的记录';
							dom_more.style.fontSize = '0.6rem';
							dom_more.removeEventListener('click',getm,false);
							if (first) {
								mon_list.style.display='none';
								no_list.style.display='block';
								first=false;
							} else{
								no_list.style.display='none';
							}
							next=false;
							if (cb!==undefined) {
								cb();
							}
							return;
						}
						first=false;
						var params={},hs=[],mon_where='';
						no_list.style.display='none';
						dom_more.style.display='block';
						for (i = 0; i < l; ++i) {
							mon_where=lst[i].giftsName;
							if (mon_where==='扫码中奖') {
								params.monwhere=mon_where;
								params.money='+'+lst[i].earnMoney;
								params.color='#ea5244';
							} else {
								if(lst[i].extractStatus=='0'){
									params.monwhere='提现成功';
									params.money='-'+lst[i].earnMoney;
								}else if(lst[i].extractStatus=='1'){
									params.monwhere='提现失败_金额已退还';
									params.money=lst[i].earnMoney;
								}else if(lst[i].extractStatus=='2'){
									params.monwhere='提现处理中';
									params.money='-'+lst[i].earnMoney;
								}
								params.color='#000000';
							}
							params.gettime=lst[i].earnTime;
							mon_list.innerHTML += vge.renderTpl(itpl_onenote, params);
						}
						if (cb!==undefined) {
							cb();
						}
						if (l<count) {
							no_list.style.display='none';
							dom_more.innerHTML = '仅显示近30天的记录';
							dom_more.style.fontSize = '0.6rem';
							dom_more.removeEventListener('click',getm,false);
							next=false;
							if (cb!==undefined) {
								cb();
							}
							return;
						}
					} else if(jo.result.businessCode==='2'){//无红包记录
			            dom_balance.innerHTML='0.00';
			            add_money.innerHTML='0.00';
			            dom_tx.innerHTML = '0.00';
			            var img = document.createElement('img');
		            	img.src = '/v/scqp/img/0.png';
		            	dom_num.appendChild(img);
						if (first) {
							dom_more.innerHTML = '仅显示近30天的记录';
							dom_more.style.fontSize = '0.6rem';
							dom_more.removeEventListener('click',getm,false);
							mon_list.style.display='none';
							no_list.style.display='block';
							first=false;
						} else{
							no_list.style.display='none';
							dom_more.innerHTML = '仅显示近30天的记录';
							dom_more.style.fontSize = '0.6rem';
							dom_more.removeEventListener('click',getm,false);
						}
						if (cb!==undefined) {
							cb();
						}
						next=false;
						return;
					}else{//businessCode:1失败
						title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
					}
				} else{//code!='0'
					title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
				}
			});
		}
		dom_more.addEventListener('click',getm,false);
		function getm() {
			if (next) {
				++currentpage;
				onepage_note(currentpage);
			}
		}
	}
	
	
})();
