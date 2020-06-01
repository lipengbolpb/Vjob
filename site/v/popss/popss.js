(function () {
    "use strict";
    ini_wxshare(vge.popssappid);
    var args = vge.urlparse(location.href),
        openid = args.openid,
        unionid = '',
        html = '';

    loading('玩命加载中');
	
	
	ifremeber();

    function getVoucherRecord(unionid) {//查询
       	var japi = vge.popss + '/DBTRioInterface/vpoints/vpointsExchange/getVoucherRecord';
        var req = {
            "unionid": unionid
        };
        vge.clog('debug', [japi, JSON.stringify(req)]);
        vge.callJApi(japi, req, function(jo){
        	console.log('getVoucherRecord',jo)
        	if (jo.result.code == '0') {
        		if(jo.reply.length>0){
        			for(var i in jo.reply){
	        			if(jo.reply[i].exchangeStatus==3&&jo.reply[i].exchangeType==4){//未领取的优惠券
	        				html += '<div class="yhq_box" url="'+jo.reply[i].prizeUrl+'" exid="'+jo.reply[i].exchangeId+'"><img src="http://39.107.203.168:9898/DBTRioPlatform'+jo.reply[i].goodsUrl.split(',')[0]+'"/></div>';
	        			}
	        		}
        		}else{
        			html = '<p>您还没有优惠券哦亲~</p>';
        		}
        		document.getElementById("yhq_box").innerHTML = html;
        		
        		$('.yhq_box').on('click',function(){
        			loading('领取优惠券');
        			console.log($(this).attr('url'),$(this).attr('exid'));
        			voucherSuccess($(this).attr('url'),$(this).attr('exid'));
        		})
        	}else{
        		title_tip('尊敬的用户', jo.result.code, '我知道了');
        	}
        });
    }
    
    function voucherSuccess(url,exchangeId){//领取
    	var japi = vge.popss+'/DBTRioInterface/vpoints/vpointsExchange/voucherSuccess';
        var req = {
            "unionid": unionid,
            "exchangeId":exchangeId
        };
        vge.clog('debug', [japi, JSON.stringify(req)]);
        vge.callJApi(japi, req, function(jo){
        	console.log('voucherSuccess',jo)
        	loaded();
        	if(jo.result.code=='0'&&jo.result.businessCode=='0'){
        		location.href = url;
        	}else{
        		title_tip('尊敬的用户', jo.result.msg, '我知道了');
        	}
        });
    }
	
	function ifremeber() {
        var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.popssappid;
        vge.ajxget(requrl, 5000, function (r) {
            try {
            	loaded();
                var o = JSON.parse(r);
                if (o.subscribe == '0') { //未关注
                    console.log('未关注？')
                } else { //已关注用户
                    console.log('subscribe',o.unionid);
                    unionid = o.unionid;
                    getVoucherRecord(o.unionid);
                }
            } catch (e) {
                vge.clog('errmsg', [requrl, e]);
            }
        }, function (err) {
            vge.clog('errmsg', [requrl, err]);
        });
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