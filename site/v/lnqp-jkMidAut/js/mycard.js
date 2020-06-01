(function(){
	
	var isFinish = 0,cardList = [],
		openid = sessionStorage.openid,
		hbopenid = sessionStorage.hbopenid;
	
	var sendData = {
		"openid": openid,
        "cardType":2
	}
	$.ajax({//同步获取卡
		type:"post",
		url:vge.lnqp + '/DBTLNQPInterface/consumerCard/queryUserCardAccount',
		async:false,
		data:JSON.stringify(sendData),
		success:function(jo){
			if (jo.result.code === '0') {
                if (jo.result.businessCode === '0') {
					console.log(jo);
					//卡类型 A:香聚卡 B:鲜聚卡 C:团聚卡 D:友聚卡 E:欢聚卡
                    cardList = [
                    	{type:'xiangju',num:jo.reply.cardA},
                    	{type:'xianju',num:jo.reply.cardB},
                    	{type:'tuanju',num:jo.reply.cardC},
                    	{type:'youju',num:jo.reply.cardD},
						{type:'huanju',num:jo.reply.cardE},
					];
					console.log(cardList);
					isFinish = jo.reply.noExchangeCount;
                } else {
                    title_tip('提 示', jo.result.msg, '我知道了');
                }
            } else { //code!='0'
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            }
		}
	});
	if(cardList[0].num>0){
		$('li.xiangju img').attr('src','/v/lnqp-jkMidAut/img/jk-s-xiangju.png');
		$('li.xiangju i').css('display','block');
		$('li.xiangju i').text(cardList[0].num);
		$('li.xiangju img').on('click',function(){
			$('#pic_box img').attr('src','/v/lnqp-jkMidAut/img/jk-xiangju.png')
		})
	}
	if(cardList[1].num>0){
		$('li.xianju img').attr('src','/v/lnqp-jkMidAut/img/jk-s-xianju.png');
		$('li.xianju i').css('display','block');
		$('li.xianju i').text(cardList[1].num);
		$('li.xianju img').on('click',function(){
			$('#pic_box img').attr('src','/v/lnqp-jkMidAut/img/jk-xianju.png')
		})
	}
	if(cardList[2].num>0){
		$('li.tuanju img').attr('src','/v/lnqp-jkMidAut/img/jk-s-tuanju.png');
		$('li.tuanju i').css('display','block');
		$('li.tuanju i').text(cardList[2].num);
		$('li.tuanju img').on('click',function(){
			$('#pic_box img').attr('src','/v/lnqp-jkMidAut/img/jk-tuanju.png')
		})
	}
	if(cardList[3].num>0){
		$('li.youju img').attr('src','/v/lnqp-jkMidAut/img/jk-s-youju.png');
		$('li.youju i').css('display','block');
		$('li.youju i').text(cardList[3].num);
		$('li.youju img').on('click',function(){
			$('#pic_box img').attr('src','/v/lnqp-jkMidAut/img/jk-youju.png')
		})
	}
	if(cardList[4].num>0){
		$('li.huanju img').attr('src','/v/lnqp-jkMidAut/img/jk-s-huanju.png');
		$('li.huanju i').css('display','block');
		$('li.huanju i').text(cardList[4].num);
		$('li.huanju img').on('click',function(){
			$('#pic_box img').attr('src','/v/lnqp-jkMidAut/img/jk-huanju.png')
		})
	}
	if(isFinish>0){//完成
		$('#exchange').removeClass('ex');
		$('#exchange').on('click',function(){
			exchange();
		});
		$('#pic_box img').attr('src','/v/lnqp-jkMidAut/img/jk-finish.png');
	}else{
		for(var j=0;j<cardList.length;j++){
			if(cardList[j].num>0){
				$('#pic_box img').attr('src',$('li').eq(j).children('img').attr('src').replace('-s',''));
				return false;
			}
		}
	}
	
	
	function exchange() { // 兑换
        var javai = vge.lnqp + '/DBTLNQPInterface/consumerCard/exchangeCard';
        var req = {
            "openid": openid,
            "cardType":2
        };
        vge.callJApi(javai, req, function (jo) {
            if (jo.result.code === '0') {
                if (jo.result.businessCode === '0') {
                    if(isFinish>1){
                    	$('#finishMore').css('display','block');
                    	//跳转
						$('#continue').one('click',function(){
							$('#finishMore').css('display','none');
							location.reload();
						});
						$('#totx').one('click',function(){
							$('#finishMore').css('display','none');
							location.href = 'http://'+location.host+'/v/lnqp-jkMidAut/mybag.html';
						});
                    }else{
                    	$('#card_box').css('display','none');
						$('#finish').css('display','block');
						$('#finish .money span').text(jo.reply.earnMoney);
						$('#tx').on('click',function(){
							$(this).unbind();
							give_spack();
						});
                    }
                } else {
                    title_tip('尊敬的用户', jo.result.msg, '我知道了');
                }
            } else { //code!='0'
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            }
        });
    }
	
	
	function give_spack() { //提现
		var javai = vge.lnqp + '/DBTLNQPInterface/gifts/getGiftspack';
		var req = {
			"openid": openid,
			"hbopenid": hbopenid
		};
		vge.callJApi(javai, req,
			function(jo) {
				$('#tx').on('click',function(){
					$(this).unbind();
					give_spack();
				});
				if(jo.result.code == '0') {
					if(jo.result.businessCode === '0') {
						ifremeber();
					} else if(jo.result.businessCode === '1') { //1
						title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元可提现！', '我知道了');
					} else if(jo.result.businessCode === '2') { //1
						title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
					} else if(jo.result.businessCode === '4') { //1
						title_tip('提现处理中，请稍后查看详细记录', '我知道了');
					} else if(jo.result.businessCode === '3') { //1
						title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
					} else if(jo.result.businessCode === '-1') { //-1
						title_tip('提 示', '系统升级中...', '我知道了');
					} else if(jo.result.businessCode === '-2') { //-1
						title_tip('提 示', '提现操作过于频繁', '我知道了');
					} else if(jo.result.businessCode === '5') { //5
						title_tip('尊敬的用户', jo.result.msg, '我知道了');
					} else {
						title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
					}
				} else if(jo.result.code == '-1') {
					title_tip('尊敬的用户', '系统升级中...', '我知道了');
				} else { //code!='0'
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				}
			});
	}

	/* 判断关注 */
	function ifremeber() {
		var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.lnqpappid;
		vge.ajxget(requrl, 5000, function(r) {
			try {
				var o = JSON.parse(r);
				if(o.subscribe == '0') { //未关注
					$('#tx-alert').css('display','block');
					$('#tx-alert img').attr('src','/v/lnqp-jkMidAut/img/notattention.png');
					$('#tx-alert img').one('click',function(){
						$('#tx-alert').css('display','none')
						location.href='http://'+location.host+'/v/lnqp-jkMidAut/attention.html';
					})
				} else { //已关注用户
					$('#tx-alert').css('display','block');
					$('#tx-alert img').attr('src','/v/lnqp-jkMidAut/img/attention.png');
					$('#tx-alert img').one('click',function(){
						location.reload();
					})
				}
			} catch(e) {
				vge.clog('errmsg', [requrl, e]);
			}
		}, function(err) {
			vge.clog('errmsg', [requrl, err]);
		});
	}
	
})()
