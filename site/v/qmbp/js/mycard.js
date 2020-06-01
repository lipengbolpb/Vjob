(function(){
	var dom_get = document.getElementById('get_yz');

	var isFinish = 0,cardList = [];
		// openid = sessionStorage.openid,
		// hbopenid = sessionStorage.hbopenid;
	
	var args = vge.urlparse(location.href),
	    openid = args.openid,
		hbopenid = args.hbopenid;
	
	var reg1 = /^1[0-9]{10}$/, //验证手机号
		reg2 = /^[0-9]{4}$/,
		countdowntimer = null;
	
	var sendData = {
		"projectServerName":"qmbaipi",
		"openid": openid,
        "cardType":1
	}
	$('.rule').click(function(){
		window.location.href = 'https://mp.weixin.qq.com/s?__biz=MzU2NjMyNTAzMw==&mid=100000331&idx=1&sn=688532486249615f882d134ec31733ba&chksm=7caf780d4bd8f11b2a30d44def7449c9f41bffcdf661b4c78be31b981f5abf72c8d74f938ea4#rd'
	})
	$.ajax({//同步获取卡
		type:"post",
		url:vge.common + '/vjifenInterface/consumerCard/queryUserCardAccount',
		async:false,
		data:JSON.stringify(sendData),
		success:function(jo){
			if (jo.result.code === '0') {
                if (jo.result.businessCode === '0') {
                	//卡类型 A:镇 B:斟 C:观 D:闻 E:摇 F:饮 G:品
                    cardList = [
                    	{type:'zhen',num:jo.reply.cardA},
                    	{type:'zhuo',num:jo.reply.cardB},
                    	{type:'guan',num:jo.reply.cardC},
                    	{type:'wen',num:jo.reply.cardD},
						{type:'yao',num:jo.reply.cardE},
						{type:'yin',num:jo.reply.cardF},
						{type:'pin',num:jo.reply.cardG},
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
		$('li.zhen img').attr('src','/v/qmbp/img/jk/getSzhen.png');
		$('li.zhen i').css('display','block');
		$('li.zhen i').text(cardList[0].num);
		$('li.zhen img').on('click',function(){
			$('#pic_box img').attr('src','/v/qmbp/img/jk/bigzhen.png')
		})
	}
	if(cardList[1].num>0){
		$('li.zhuo img').attr('src','/v/qmbp/img/jk/getSzhuo.png');
		$('li.zhuo i').css('display','block');
		$('li.zhuo i').text(cardList[1].num);
		$('li.zhuo img').on('click',function(){
			$('#pic_box img').attr('src','/v/qmbp/img/jk/bigzhuo.png')
		})
	}
	if(cardList[2].num>0){
		$('li.guan img').attr('src','/v/qmbp/img/jk/getSguan.png');
		$('li.guan i').css('display','block');
		$('li.guan i').text(cardList[2].num);
		$('li.guan img').on('click',function(){
			$('#pic_box img').attr('src','/v/qmbp/img/jk/bigguan.png')
		})
	}
	if(cardList[3].num>0){
		$('li.wen img').attr('src','/v/qmbp/img/jk/getSwen.png');
		$('li.wen i').css('display','block');
		$('li.wen i').text(cardList[3].num);
		$('li.wen img').on('click',function(){
			$('#pic_box img').attr('src','/v/qmbp/img/jk/bigwen.png')
		})
	}
	if(cardList[4].num>0){
		$('li.yao img').attr('src','/v/qmbp/img/jk/getSyao.png');
		$('li.yao i').css('display','block');
		$('li.yao i').text(cardList[4].num);
		$('li.yao img').on('click',function(){
			$('#pic_box img').attr('src','/v/qmbp/img/jk/bigyao.png')
		})
	}
	if(cardList[5].num>0){
		$('li.yin img').attr('src','/v/qmbp/img/jk/getSyin.png?v=1.0.0');
		$('li.yin i').css('display','block');
		$('li.yin i').text(cardList[5].num);
		$('li.yin img').on('click',function(){
			$('#pic_box img').attr('src','/v/qmbp/img/jk/bigyin.png')
		})
	}
	if(cardList[6].num>0){
		$('li.pin img').attr('src','/v/qmbp/img/jk/getSpin.png?v=1.0.0');
		$('li.pin i').css('display','block');
		$('li.pin i').text(cardList[6].num);
		$('li.pin img').on('click',function(){
			$('#pic_box img').attr('src','/v/qmbp/img/jk/bigpin.png')
		})
	}
	if(isFinish>0){//完成 isFinish 总共集齐的套数
		$('#exchange').removeClass('ex');
		$('#exchange').on('click',function(){
			exchange();
		});
		$('#pic_box img').attr('src','/v/qmbp/img/jk/finish.png');
	}else{
		for(var j=0;j<cardList.length;j++){
			if(cardList[j].num>0){ //点击切换成大图查看
				$('#pic_box img').attr('src',$('li').eq(j).children('img').attr('src').replace('getS','big')); 
				return false;
			}
		}
	}
	
	
	function exchange() { // 兑换
        var javai = vge.common + '/vjifenInterface/consumerCard/exchangeCard';
        var req = {
			"projectServerName":"qmbaipi",
            "openid": openid,
            "cardType":1
        };
        vge.callJApi(javai, req, function (jo) {
			// vge.clog('全麦白啤兑换结果', [JSON.stringify(jo)]);
            if (jo.result.code === '0') {
				if (jo.result.businessCode === '0') {  //兑换成功
					if(jo.reply.prizeInfoKey){ // 有大奖主键
						sessionStorage.exchangePrizeKey = jo.reply.prizeInfoKey;
					}
					// 0 现金红包 1 积分红包 2 现金+积分  【5-7&&P-Z】大奖
					if(jo.reply.prizeType == '0'){ // 0 现金红包
						$('#card_box').css('display','none');
						$('#finish').css('display','block');

						$('.cashBox').css('display','block');
						$('#finish .money span').text(jo.reply.earnMoney);
						$('#tx').on('click',function(){
							$(this).unbind();
							give_spack();
						});
					} else if(jo.reply.prizeType == 'R' || jo.reply.prizeType == 'r'){ // R等奖 美的便携榨汁机壹台
						$('#card_box').css('display','none');
						$('#finish').css('display','block');

						$('.prizeBox').css('display','block');
						$('.prizeImg').attr('src','/v/qmbp/img/jk/jkPrize-yuexiang.png');
					} else if(jo.reply.prizeType == 'S' || jo.reply.prizeType == 's'){ // S等奖 双人一间夜精品民宿斟享卡一张
						$('#card_box').css('display','none');
						$('#finish').css('display','block');

						$('.prizeBox').css('display','block');
						$('.prizeImg').attr('src','/v/qmbp/img/jk/jkPrize-zhenxiang.png');
					} else if(jo.reply.prizeType == 'T' || jo.reply.prizeType == 't'){ // T等奖 500ml罐装全麦白啤全年1罐/天（共366罐）
						$('#card_box').css('display','none');
						$('#finish').css('display','block');

						$('.prizeBox').css('display','block');
						$('.prizeImg').attr('src','/v/qmbp/img/jk/jkPrize-zunxiang.png');
					} else {
						title_tip('尊敬的用户', '什么也没兑换到o(╥﹏╥)o', '我知道了');
					}
                } else { //其他的没投入兑奖
                    title_tip('尊敬的用户', jo.result.msg, '我知道了');
                }
            } else { //code!='0'
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            }
        });
    }
	
	//领取实物大奖
    $('#getAward').on('click',function(){
		$('.alertMsg').css('display','block')
	})

	$('.prize_close').on('click', function(e) {
		e.stopPropagation();
		$('.alertMsg').css('display', 'none');
	})
	
	$('#get_yz').on('click', function() {
		getYzcode();
	});

	function getYzcode() {
		if ($('#contact').val() === '' || $('#contact').val().indexOf(' ') !== -1) {
            title_tip('提 示', '请输入正确的姓名哦！~', '我知道了');
        } else if (!reg1.test($('#tel').val())) {
			title_tip('提 示', '请填写正确的手机号！~', '我知道了');
		} else {
			getCheckCode(function() {
				countdown(dom_get, 60);
			});
		}
	}
	function getCheckCode(cb) { // 获取手机验证码
		var javai = vge.common + '/vjifenInterface/user/getCaptcha';
		var req = {
			"projectServerName":"qmbaipi",
			"phonenum": $('#tel').val()
		};
		vge.callJApi(javai, req, function(jo) {
			if (jo.result.code == '0') {
				if (jo.result.businessCode == '0') {
					cb();//成功，开始倒计时
				} else if (jo.result.businessCode === '2') {
					title_tip('尊敬的用户', '您填写的手机号错误，发送验证码失败！', '我知道了');
				} else { //1 为服务器报错
					title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
				}
			} else { //code!='0'
				title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
			}
		});
	}

	function countdown(tag, time) {
		var i = time;
		tag.innerHTML = i + '秒后获取';
		countdowntimer = setInterval(function() {
			i--;
			tag.innerHTML = i + '秒后获取';
			if (i === 0) {
				tag.innerHTML = '重新获取';
				i = time;
				clearInterval(countdowntimer); // 清除定时器
				countdowntimer = null;
			}
		}, 1000);
	}

	$('.tj').on('click', prizeTj);
	
	function prizeTj() {
		if ($('#contact').val() == '' || $('#contact').val() == ' ') {
			title_tip('提 示', '请填写正确的姓名！~', '我知道了');
		} else if (!reg1.test($('#tel').val())) {
			title_tip('提 示', '请填写正确的手机号！~', '我知道了');
		} else if (!reg2.test($('#yz_code').val())) {
			title_tip('提 示', '请填写正确的验证码！~', '我知道了');
		} else {
			$('.tj').unbind();
			setTimeout(function() {
				$('.tj').on('click', prizeTj);
			}, 1000);
			sub_message();
		}
	}
	// 领奖
	function sub_message() {
		var javai = vge.common + '/vjifenInterface/user/savePrize'
		var req = {
			"projectServerName":"qmbaipi",
			"openid": openid,
			"username": $('#contact').val(),
			"idcard": "idcard",
			"phonenum": $('#tel').val(),
			"address": "address",
			// "prizeVcode": sessionStorage.prizeVcode,
			"prizeInfoKey": sessionStorage.exchangePrizeKey,
			"captcha": $('#yz_code').val()
		};
		vge.callJApi(javai, req, function(jo) {
			if (jo.result.code == '0') {
				if (jo.result.businessCode == '0') {
					title_tip('尊敬的用户', '领取成功！', '我知道了');
					// $('.yz_box,.tj_box .tj').css('display', 'none');
					window.location.replace('http://' + location.host + '/qmbp/too/mybag');
				} else {
					title_tip('尊敬的用户', jo.result.msg, '我知道了');
				}
			} else {
				title_tip('尊敬的用户', jo.result.msg, '我知道了');
			}
		})
	}

	function give_spack() { //提现
		var javai = vge.common + '/vjifenInterface/gifts/getGiftspack';
		var req = {
			"projectServerName":"qmbaipi",
			"openid": openid,
			"hbopenid": hbopenid
		};
		vge.callJApi(javai, req,
			function(jo) {
				$('#tx').on('click',function(){
					$(this).unbind();
					give_spack();
				});
				vge.clog('全麦白啤兑卡提现', [JSON.stringify(jo)]);
				if(jo.result.code == '0') {
					if(jo.result.businessCode === '0') {
						$('#tx-alert').css('display','block'); //提现成功弹框
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
    $('#tx-alert img').one('click',function(){
		ifremeber(); 
	})
	/* 判断关注 */
	function ifremeber() {
		var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.qmbpappid;
		vge.ajxget(requrl, 5000, function(r) {
			try {
				var o = JSON.parse(r);
				if(o.subscribe == '0') { //未关注
					window.location.replace('http://' + location.host + '/v/qmbp/attention.html');
				} else { //已关注用户
					window.location.replace('http://' + location.host + '/qmbp/too/mybag');
				}
			} catch(e) {
				vge.clog('errmsg', [requrl, e]);
			}
		}, function(err) {
			vge.clog('errmsg', [requrl, err]);
		});
	}
	
})()
