(function(){
	
	var prztype = '',
		isFinish = true,
		openid = sessionStorage.openid,
		signScanCount = 0,//喝酒次数
		scanCount = 0;//达标需要瓶数
	
	queryNum();
	
	function dot(){
		if(signScanCount==scanCount){
			$('#ck_box .tip').text('恭喜您已集齐'+scanCount+'瓶，可随机获得一张福卡');	
			$('.card_box').removeClass('fail');
		}else{
			$('#ck_box .tip').html('再喝'+(scanCount-signScanCount)+'瓶就可以获得一张福卡喽');	
		}
		$('.progress_box .num').html('<span>'+signScanCount+'</span>/'+scanCount);
		$('.progress img').css('width',(signScanCount/scanCount).toFixed(2)*100+'%');
		$('.card_box').on('click',function(){
			if(isFinish&&signScanCount>=scanCount){
				isFinish = !isFinish;
				$('.card_box').addClass('rotate');
				ck();
			}
		})
	}
	
	function queryNum() { // 查询剩余次数
        var javai = vge.lnqp + '/DBTLNQPInterface/consumerCard/findSignCardInfo';
        var req = {
            "openid": openid,
            "cardType":2
        };
        vge.callJApi(javai, req, function (jo) {
			console.log('查询剩余次数',jo);
            if (jo.result.code === '0') {
                if (jo.result.businessCode === '0') {
                    signScanCount = Number(jo.reply.signScanCount);//喝酒次数
                    scanCount = Number(jo.reply.scanCount);//达标所需次数
                    signScanCount=signScanCount>scanCount?scanCount:signScanCount;
                    $('.qd_tip i').text(scanCount);
                    dot();
                } else {
                    title_tip('尊敬的用户', jo.result.msg, '我知道了');
                }
            } else { //code!='0'
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            }
        });
    }
	
	function showcard(prztype){
		if(prztype){
			// A:香聚卡 B:鲜聚卡 C:团聚卡 D:友聚卡 E:欢聚卡
			switch (prztype){
				case 'A':$('.result').attr('src','/v/lnqp-jkMidAut/img/jk-xiangju.png');
					break;
				case 'B':$('.result').attr('src','/v/lnqp-jkMidAut/img/jk-xianju.png');
					break;
				case 'C':$('.result').attr('src','/v/lnqp-jkMidAut/img/jk-tuanju.png');
					break;	
				case 'D':$('.result').attr('src','/v/lnqp-jkMidAut/img/jk-youju.png');
					break;
				case 'E':$('.result').attr('src','/v/lnqp-jkMidAut/img/jk-huanju.png');
					break;		
				default:
					break;
			}
			$('#qd-alert').css('display','block');
			$('.card_box').css('background','none');
		}else{
			$('#ck-alert,.fail').css('display','block');
		}
	}
	
	$('.close').on('click',function(){
		$('#qd-alert,.ck_tip').css('display','none');
		$('.card').css('display','block');
		$('.card').attr('src',$('.result').attr('src'));
	})
	
	function ck() { // 签到抽卡
        var javai = vge.lnqp + '/DBTLNQPInterface/consumerCard/collectCard';
        var req = {
            "openid": openid,
            "cardType":2,
            "bussionType":3
		};
        vge.callJApi(javai, req, function (jo) {
		    console.log('抽卡',jo);
            if (jo.result.code === '0') {
                if (jo.result.businessCode === '0') {
				setTimeout(function(){
					showcard(jo.reply.cardNo);
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
