(function () {
	"use strict";
	var all_notes=document.getElementById('all_notes'),
		my_more=document.getElementById('my_more'),
		s_loading=document.getElementById('s_loading');
	var args = vge.urlparse(location.href),
		openid = args.bopenid,
        hbopenid = args.openid;
	var currentpage=1,next=true;
	var wh=document.body.clientHeight||document.documentElement.clientHeight;

    function getrebatelist(openid,count,currentpage) {
		var japi = vge.liby + '/DBTLBInterface/gifts/queryAllGiftsList';
		var data = {
        	"openid":openid,
			"hbopenid":hbopenid,
			"currentPage": currentpage,
  			"count": count
		};
		vge.callJApi(japi, data, function(jo) {
			s_loading.style.display='none';
			if (jo.result.code=='0') {
                if( jo.result.businessCode=='0') { //  jo.reply.objList!==undefined && jo.reply.objList.length>0
					var i=0, lst=jo.reply.objList, l=lst.length;
					if (l===0 || lst === undefined) {
						my_more.innerHTML='已显示全部';
						next=false;
                        if(currentpage===1) {
                            all_notes.innerHTML='';
                        }
						return;
					}
                    // all_notes.innerHTML = JSON.stringify(jo);

					var q=0, params={}, itm, day, oldd, html=[];
					for(i=0;i<l;++i) {
                        itm = lst[i];
						day = itm.earnTime.substr(0,10);
                        if(oldd === day) {
                            html.push('<li><p>'+itm.skuName.substr(0,15)+'...</p>');
                            html.push('<p><span>'+itm.earnMoney+'</span>元</p></li>');
                        }else{
                            if(html.length>0) {
                                html.push('</ul></li>');
                            }
                            html.push('<li class="onedays"><div class="day_all">');
		                    html.push('<p>'+day+'</p></div>');
		                    // html.push('<p><span>'+daysum+'</span>元</p></div>');
                            html.push('<ul class="day_notes"><li>');
                            html.push('<p>'+itm.skuName.substr(0,15)+'...</p>');
                            html.push('<p><span>'+itm.earnMoney+'</span>元</p></li>');
                        }
                        oldd = day;
					}
                    if(currentpage===1) {
                        all_notes.innerHTML = html.join('');
                    }else{
                        all_notes.innerHTML += html.join('');
                    }
                    
					// if (dom_con.offsetHeight<=(wh-my_more.offsetHeight)) {
					// 	my_more.style.position='fixed';
					// 	my_more.style.bottom='0px';
					// }
                    
					if (l<count) {
						my_more.innerHTML='已显示全部';
						next=false;
						return;
					}
				}else if (jo.result.businessCode=='1') {
					my_more.innerHTML='已显示全部';
					next=false;
					return;
				}else{
					my_more.innerHTML='已显示全部';
					next=false;
					public_tip('用户不存在');
				}
		    }
        },'debug');
    }

    if(sessionStorage.isCash==='true') {
        var japi2 = vge.liby + '/DBTLBInterface/gifts/getGiftspack';
        var data2={
            "openid": openid,
            "hbopenid":hbopenid
        };
        vge.callJApi(japi2, data2, function(obj){
            if(obj.result.businessCode!=='0') {
                public_tip('领取现金红包失败<br>'+obj.result.businessCode+obj.result.msg);
            }
            getrebatelist(openid,20,currentpage);
        },'debug');
    }else{
        getrebatelist(openid,20,currentpage);
    }

	my_more.addEventListener('click',function () {
		if (next) {
			s_loading.style.display='block';
			++currentpage;
			getrebatelist(openid,20,currentpage);
		}
	},false);
})();
