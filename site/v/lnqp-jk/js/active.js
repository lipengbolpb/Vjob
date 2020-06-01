(function(){
	var openid = sessionStorage.openid;
	queryNum();
	document.getElementsByClassName('qiandao')[0].addEventListener('click',function(){
		location.href = 'http://'+location.host+'/v/lnqp-jk/qd.html';
	},false);
	document.getElementsByClassName('attention')[0].addEventListener('click',function(){
		location.href = 'http://'+location.host+'/v/lnqp-jk/ck.html';
	},false);
	document.getElementsByClassName('liuliang')[0].addEventListener('click',function(){
		location.href = 'https://m.10010.com/queen/qingdaobeer/qdbeer.html';
	},false);
	function queryNum() { // 查询关注和签到
        var javai = vge.lnqp + '/DBTLNQPInterface/consumerCard/findActivityCardInfo';
        var req = {
            "openid": openid,
            "cardType":1
        };
        vge.callJApi(javai, req, function (jo) {
            if (jo.result.code === '0') {
                if (jo.result.businessCode === '0') {
                	$('.qiandao i').text(jo.reply.scanCount===undefined?'0':jo.reply.scanCount);
                	sessionStorage.collectCountLimit = jo.reply.collectCountLimit;
                	$('.attention i').text(jo.reply.collectCountLimit===undefined?'0':jo.reply.collectCountLimit);
                } else {
                    title_tip('尊敬的用户', jo.result.msg, '我知道了');
                }
            } else { //code!='0'
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            }
        });
    }
    
})()
