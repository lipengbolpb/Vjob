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
			location.href = 'http://'+location.host+'/v/lnqp-jk/attention.html';
		}else{
			if(surplusCount<1){
				return false;
			}
			$('.card_box').addClass('rotate');
			ck();
		}
	})
	
	function showcard(prztype){
		//卡类型 A:奥古特 B:白啤 C:纯生 D:鸿运当头 E:经典 F:皮尔森 G:小棕金
		switch (prztype){
			case 'C':$('.ck-result').attr('src','/v/lnqp-jk/img/jk-chunsheng.png');
				$('.success .title').html('恭喜您获得1张纯生福卡');
				succ = true;
				break;
			case 'E':$('.ck-result').attr('src','/v/lnqp-jk/img/jk-jingdian.png');
				$('.success .title').html('恭喜您获得1张经典1903福卡');
				succ = true;
				break;
			case 'A':$('.ck-result').attr('src','/v/lnqp-jk/img/jk-aogute.png');
				$('.success .title').html('恭喜您获得1张奥古特福卡');
				succ = true;
				break;	
			case 'D':$('.ck-result').attr('src','/v/lnqp-jk/img/jk-hongyun.png');
				$('.success .title').html('恭喜您获得1张鸿运当头福卡');
				succ = true;
				break;
			case 'F':$('.ck-result').attr('src','/v/lnqp-jk/img/jk-piersen.png');
				$('.success .title').html('恭喜您获得1张皮尔森福卡');
				succ = true;
				break;	
			case 'G':$('.ck-result').attr('src','/v/lnqp-jk/img/jk-zongjin.png');
				$('.success .title').html('恭喜您获得1张棕金福卡');
				succ = true;
				break;
			case 'B':$('.ck-result').attr('src','/v/lnqp-jk/img/jk-baipi.png');
				$('.success .title').html('恭喜您获得1张白啤福卡');
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
                	$('#ck_box .tip').text('您已关注公众号');
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
            "cardType":1
        };
        vge.callJApi(javai, req, function (jo) {
            if (jo.result.code === '0') {
                if (jo.result.businessCode === '0') {
                    surplusCount = jo.reply.surplusCount;//剩余次数
                    $('#ck_box i').text(sessionStorage.collectCountLimit);
                    if(sessionStorage.isAttention=='true'||sessionStorage.isAttention===undefined){
                    	$('.ck_tip').html('点击得福卡（<span class="cknum">'+surplusCount+'</span>）');
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
            "cardType":1,
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
