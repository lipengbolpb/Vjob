(function(){
	
	var succ = true,
		surplusCount = 0,
		prztype = '',
		openid = sessionStorage.openid;
		
	ifremeber();	
	queryNum();	
	$('.card_box').on('click',function(){
		if(sessionStorage.isAttention===undefined){
			return false;
		}else if(sessionStorage.isAttention==='false'){
			location.href = 'http://'+location.host+'/v/lnqp-jkMidAut/attention.html';
		}else{
			if(surplusCount<1){
				return false;
			}
			$('.card_box').addClass('rotate');
			ck();
		}
	})
	
	function showcard(prztype){
		//卡类型 A:香聚卡 B:鲜聚卡 C:团聚卡 D:友聚卡 E:欢聚卡
		switch (prztype){
			case 'A':$('.ck-result').attr('src','/v/lnqp-jkMidAut/img/jk-xiangju.png');
				$('.success .title').html('恭喜您获得1张香聚卡');
				succ = true;
				break;
			case 'B':$('.ck-result').attr('src','/v/lnqp-jkMidAut/img/jk-xianju.png');
				$('.success .title').html('恭喜您获得1张鲜聚卡');
				succ = true;
				break;
			case 'C':$('.ck-result').attr('src','/v/lnqp-jkMidAut/img/jk-tuanju.png');
				$('.success .title').html('恭喜您获得1张团聚卡');
				succ = true;
				break;	
			case 'D':$('.ck-result').attr('src','/v/lnqp-jkMidAut/img/jk-youju.png');
				$('.success .title').html('恭喜您获得1张友聚卡');
				succ = true;
				break;
			case 'E':$('.ck-result').attr('src','/v/lnqp-jkMidAut/img/jk-huanju.png');
				$('.success .title').html('恭喜您获得1张欢聚卡');
				succ = true;
				break;	
			default:
				succ = false;
				break;
		}
		surplusCount--;
		surplusCount==surplusCount<0?0:surplusCount;
		$('.cknum').text(surplusCount);
		if(succ){
			$('#ck-alert,.fail').css('display','none');
			$('#ck-alert,.success').css('display','block');
		}else{
			$('#ck-alert,.success').css('display','none');
			$('#ck-alert,.fail').css('display','block');
		}
	}
	
	$('.icon-close,.fail').on('click',function(){
		$('#ck-alert,.success,.fail').css('display','none');
	})
	
	/* 判断关注 */
    function ifremeber() {
        var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.lnqpappid;
        vge.ajxget(requrl, 5000, function (r) {
            try {
                var o = JSON.parse(r);
                if (o.subscribe == '0') { //未关注
                	$('.ck_tip').html('去关注');
                	$('#ck_box .tip').text('您未关注公众号');
                	sessionStorage.isAttention = false;
				} else { //已关注用户
					setTimeout(function(){
						if(surplusCount  == 0 ){
							$('.card_box').css({
								'background':'url(img/qiandao-fail.png) no-repeat center',
								'background-size':'100% 100%'
							});
							$('.ck_tip').html('点击抽卡');
							$('.title').html('每人每天有<i>'+sessionStorage.collectCountLimit+'</i>次抽卡机会，快去试试，好运在等您哟');
							$('#ck_box .tip').html('您今天的抽奖机会已经用完了<br/>明天再来吧');							
						}else{
							$('.ck_tip').html('点击抽卡（<span class="cknum">'+surplusCount+'</span>）');
							$('#ck_box .tip').text('您已关注公众号');
						}
					},250)
                	sessionStorage.isAttention = true;
                }
            } catch (e) {
                vge.clog('errmsg', [requrl, e]);
            }
        }, function (err) {
            vge.clog('errmsg', [requrl, err]);
        });
    }
    
    function queryNum() { // 查询剩余次数
        var javai = vge.lnqp + '/DBTLNQPInterface/consumerCard/findAttentionCardInfo';
        var req = {
            "openid": openid,
            "cardType":2
        };
        vge.callJApi(javai, req, function (jo) {
            if (jo.result.code === '0') {
                if (jo.result.businessCode === '0') {
                    surplusCount = jo.reply.surplusCount;//剩余次数
					$('#ck_box i').text(sessionStorage.collectCountLimit);
					// ||sessionStorage.isAttention===undefined
                    if(sessionStorage.isAttention=='true'){
						setTimeout(function(){
							if(surplusCount  == 0 ){
								$('.card_box').css({
									'background':'url(img/qiandao-fail.png) no-repeat center',
									'background-size':'100% 100%'
								});
								$('.ck_tip').html('点击抽卡');
								$('.title').html('每人每天有<i>'+sessionStorage.collectCountLimit+'</i>次抽卡机会，快去试试，好运在等您哟');
								$('#ck_box .tip').html('您今天的抽奖机会已经用完了<br/>明天再来吧');							
							}else{
								$('.ck_tip').html('点击抽卡（<span class="cknum">'+surplusCount+'</span>）');
							}
						},250)
                    }else{
						$('.ck_tip').html('去关注');
						$('#ck_box .tip').text('您未关注公众号');
						sessionStorage.isAttention = false;
					}
                } else {
                    title_tip('尊敬的用户', jo.result.msg, '我知道了');
                }
            } else { //code!='0'
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            }
        });
    }
    
    function ck() { // 抽卡
        var javai = vge.lnqp + '/DBTLNQPInterface/consumerCard/collectCard';
        var req = {
            "openid": openid,
            "cardType":2,
            "bussionType":2
        };
        vge.callJApi(javai, req, function (jo) {
            if (jo.result.code === '0') {
                if (jo.result.businessCode === '0') {
				setTimeout(function(){
					prztype = jo.reply.cardNo;
					showcard(prztype);
					$('.card_box').removeClass('rotate');
				},1000)
                } else {
                    title_tip('尊敬的用户', jo.result.msg, '我知道了');
                }
            } else { //code!='0'
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            }
        });
    }
    
})()
