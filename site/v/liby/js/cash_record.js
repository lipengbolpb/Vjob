(function () {
	"use strict";
    function loading(txt) {
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

	var all_notes=document.getElementById('all_notes'),
		dom_more=document.getElementById('more');
    
	var args = vge.urlparse(location.href),
		openid = args.openid,
        currentpage=1, next=true;
    
    function records(openid, count, currentpage) {
		var japi = vge.liby + '/DBTLBInterface/extract/index';
		var data = {
            "requestTime": Date.now(),
            "commandType": "presentlist",
            "commandInfo": {
        	    "openid":openid,
			    "currentPage": currentpage,
  			    "count": count
            }
		};
		vge.callJApi(japi, data, function(jo) {
            if( jo.result.businessCode=='0') {
				var i=0, lst=jo.reply.presentlist, l=lst.length;
                if(currentpage===1) {
                    all_notes.innerHTML='';
                }
				if (l===0 || lst === undefined) {
					dom_more.innerHTML='已显示全部';
					next=false;
					return;
				}

				var q=0, params={}, itm, ymd='', oldm='', html=[], stcls='',stxt='',msum=0,str='';
				for(i=0;i<l;++i) {
                    itm = lst[i];
					ymd = itm.extracttime.split('-');
                    // "充值状态  0提交；1失败；2充值中；3成功；4可疑"
                    switch(itm.extractstatus){
                    case '0':
                    case '1':
                        stcls = 'cash_ing';
                        stxt = '进行中';
                        break;
                    case '2':
                        stcls = 'cash_fail';
                        stxt = '提现失败';
                        break;
                    case '3':
                        stcls = 'cash_suc';
                        stxt = '提现成功';
                        break;
                    default:
                        stcls = 'cash_fail';
                        stxt = '提现错误';
                    }
                    msum += parseInt(itm.extractcash);
                    if(oldm === ymd[1]) {
                        html.push('<li><div><p>提现订单：<span>'+itm.vorder+'<span></p>');
                        html.push('<p>'+ymd[1]+'月'+ymd[2]+'日</p></div>');
                        html.push('<div><p>￥'+itm.extractcash+'</p>');
                        html.push('<p class="'+stcls+'">'+stxt+'</p></div></li>');
                    }else{
                        if(html.length>0) {
                            html.push('</ul></li>');
                            str = html.join('');
                            html =[]; // 清空
                            all_notes.innerHTML += str.replace('$sum$', msum+'');
                            msum = 0;
                        }
                        html.push('<li class="month_box"><div class="month_all">');
		                html.push('<p>'+ymd[0]+'年'+ymd[1]+'月</p>');
		                html.push('<p>提现：<span>$sum$</sapn>元</p>');
                        html.push('</div><ul class="month_notes">');

                        html.push('<li><div><p>提现订单：<span>'+itm.vorder+'<span></p>');
                        html.push('<p>'+ymd[1]+'月'+ymd[2]+'日</p></div>');
                        html.push('<div><p>￥'+itm.extractcash+'</p>');
                        html.push('<p class="'+stcls+'">'+stxt+'</p></div></li>');
                    }
                    oldm = ymd[1];
				}

                if(html.length>0) { // 最后一股
                    html.push('</ul></li>');
                    str = html.join('');
                    html =[]; // 清空
                    all_notes.innerHTML += str.replace('$sum$', msum+'');
                    msum = 0;
                }                
                // if(currentpage===1) {
                //     all_notes.innerHTML = html.join('');
                // }else{
                //     all_notes.innerHTML += html.join('');
                // }
                
				if (l<count) {
					dom_more.innerHTML='已显示全部';
					next=false;
				}
			}else if (jo.result.businessCode=='1') {
                all_notes.innerHTML='';
				dom_more.innerHTML='已显示全部';
				toast('没有数据');
				next=false;
			}else{
                all_notes.innerHTML='';
				dom_more.innerHTML='已显示全部';
				next=false;
				toast('查询失败');
			}
        },'debug');
    }
    
    records(openid, 20, currentpage);

	dom_more.addEventListener('click',function () {
		if (next) {
			++currentpage;
			records(openid, 20, currentpage);
		}
	},false);
    
})();
