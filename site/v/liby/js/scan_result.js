(function () {
    'use strict';
    $('#money').html(parseFloat(sessionStorage.currentMoney/100).toFixed(2));
    $('#bag_num').html(sessionStorage.currentMoney);

    if(sessionStorage.isCash==='true') {
    }else{
        $('#btn').html('查看获奖记录');
    }

	var requrl='http://'+vge.o3host+'/wx3/uinfo2?openid='+sessionStorage.openid+'&appid='+vge.libyappid;
	vge.ajxget(requrl, 5000, function(r){
		try{
			var o = JSON.parse(r), jump='';
			if(o.subscribe===0) {//未关注
                jump ='http://mp.weixin.qq.com/s?__biz=MzA5NzExOTU4Nw==&mid=210147405&idx=1&sn=be05a813452b0cb1d52d6c3bd9c28f8a#rd';
				// jump = 'http://'+location.host+'/v/liby/scan_reg.html';
			}else{//已关注用户
                if(sessionStorage.registed==='true') {
				    jump = 'http://'+location.host+'/liby/to2/my_record?bopenid='+sessionStorage.openid;
                }else{
				    // jump = 'http://'+location.host+'/v/liby/scan_reg.html';
				    jump = 'http://'+location.host+'/liby/to2/scan_reg?bopenid='+sessionStorage.openid;
                }
			}
            $('#btn').click(function(ev) {
                location.href = jump;
            });
		}catch(e){
			vge.clog('errmsg', [requrl, e]);
		}
	},function(err){
		vge.clog('errmsg', [requrl, err]);
	});
    
})();
