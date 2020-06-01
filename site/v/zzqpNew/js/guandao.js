(function(){
	manifest=[
		{src: "guandao/bg2.png",class: ""},
		{src: "guandao/logo.png",class: ""},
		{src: "guandao/gd_left.png",class: ""},
		{src: "guandao/wheel_left.png",class: ""},
		{src: "guandao/main1.png",class: ""},
		{src: "guandao/main2.png",class: ""},
		{src: "guandao/gd_top.png",class: ""},
		{src: "guandao/gd_left.png",class: ""},
		{src: "guandao/gd_right1.png",class: ""},
		{src: "guandao/gd_right2.png",class: ""},
		{src: "guandao/btn_huanju1.png",class: ""},
		{src: "guandao/btn_huanju2.png",class: ""},
		{src: "guandao/btn_my1.png",class: ""},
		{src: "guandao/btn_my2.png",class: ""},
	]
	document.addEventListener('DOMContentLoaded', function (event) {
		load(manifest, function () {
	    	$("#Loading").hide();
	    })
	})
	var audio2 = document.getElementById("music_2");
	var args = vge.urlparse(location.href),
		bizcode = args.bizcode,
		time = document.getElementById("time");
	
	var headimgurl = sessionStorage.headimgurl === undefined ? '/v/zzqp/img/bg/headimg.png': sessionStorage.headimgurl,
		nickname = sessionStorage.nickname === undefined ? '未知用户': sessionStorage.nickname,
		sweepstr = sessionStorage.sweepstr,
		openid = sessionStorage.openid;
	var Vshake = document.getElementById("shake");
	if(sessionStorage.bizcode){
		bizcode = sessionStorage.bizcode;
    }
    var ticketExchangeTipFlag = sessionStorage.ticketExchangeTipFlag;
    // alert(ticketExchangeTipFlag);
    if(ticketExchangeTipFlag == 1){
        title_tip('尊敬的用户','您有未领取的电影票，请于1月14日前领取，否则视为自行放弃，详见中奖记录。','我知道了');
    }
	function cj(){
		$('#cj').show();
	}
	$('.main,.cj').click(function(){
		cj();
	})
	
	switch (bizcode){
		case '1':
			$('#comTips').css('display','block');
			$('#comTips .tips').html('该二维码不存在');
			break;
		case '0':
			
			break;	
		case '2':
			$('#noprizeTier3').css('display','block');
			break;
		case '11':
			$('#noprizeTier3').css('display','block');
			break;	
		case '15'://一等奖核销
			$('#firstprize').css('display','block');
			$('#time').html(sessionStorage.earnTime);
			$('#firstprize').on('click',function(){
				wx.closeWindow();//未中奖关闭窗口
			});
			break;	
		case '3':
			$('#comTips').css('display','block');
			$('#comTips .tips').html('二维码已过期');
			break;
		case '4':
			$('#comTips').css('display','block');
			$('#comTips .tips').html('活动未开始<br /><span style="font-size:0.2;font-weight:400;">'+sessionStorage.remarks+'<br />服务热线：01085418107<br/>工作时间：9:00-17:00</span>');
			break;	
        case '5':
			$('#comTips .fail').css('display','none');
			$('#comTips .logo2').css('display','none');
			$('#comTips .timeover').css('display','block');
			$('#comTips').css('display','block');
			// $('#comTips .tips').html('活动已结束');
			break;	
		case '-1':
			$('#comTips').css('display','block');
			$('#comTips .tips').html('系统升级中...');
			break;
		default:
       		$('#comTips').css('display','block');
       		$('#comTips .tips').html('呜呜~已经被扫过了~<br>关闭页面，重新去抽奖一次吧。');
			break;	
	}
	$('#comTips .timeover').on('click',function(){
        window.location.href = 'https://mp.weixin.qq.com/s?__biz=MzIxNzYzOTExOQ==&mid=100000281&idx=1&sn=83fa80fb2c6035459939f5e6237ff547&chksm=17f7f3b920807aaf89718185e0b7db14145a8c5aad2a5f3328038c51de360d57381f7ef289e9#rd';
    });
	//点击拉杆开始抽奖
	
	function Vzj(){//摇奖
		_hmt.push(['_trackEvent', '点击抽奖按钮', '抽奖', '抽奖页面']);
		Vshake.removeEventListener("click",Vzj,false);
		audio2.play();
		sessionStorage.bizcode = '2';
		if(bizcode == '0'){
			var javai = vge.zzqp + '/DBTHNQPInterface/sweep/getGiftPacks';//摇一摇接口
			var req = {
				"openid": openid,
				"sweepstr": sweepstr,//码的内容
				"longitude": sessionStorage.longitude===undefined?'00':sessionStorage.longitude, //"经度"
				"latitude": sessionStorage.latitude===undefined?'00':sessionStorage.latitude //维度
			};
			vge.callJApi(javai, req,function(jo) {
				if(jo.result.code == '0'){
					if(jo.result.businessCode=='0'){
						sessionStorage.currentMoney = jo.reply.currentMoney;
			       		sessionStorage.infoKey = jo.reply.infoKey;//猜拳需要
			       		sessionStorage.tableSuffix = jo.reply.tableSuffix;
                        sessionStorage.code = jo.reply.prizeType;
						zj(Number(jo.reply.prizeType));//zj(5),zj(0),zj(4),zj(3),zj(1)->土豪罐，任性罐,傲娇罐,轻松罐,社交罐
						//0现金;  1奥古特;  3电影票;   4pk;   5游轮;
					}
					
				}else{//code!='0'
			        title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
			    }
			});		
		}
	}
		
	Vshake.addEventListener("click",Vzj,false);//摇奖
	
	
	$('._close').on('click',function(){
//		wx.closeWindow();//未中奖关闭窗口
		_hmt.push(['_trackEvent', '点击关闭', '查看我的', '抽奖页面']);
		location.href ='http://'+ location.host +'/zzqpNew/too/myList';
	});
	//zj(5),zj(0),zj(1),zj(3),zj(5)->土豪罐，任性罐,傲娇罐,轻松罐,社交罐
	//0现金;  1奥古特;  3电影票;   4pk;   5游轮;
	
	
	function zj(x){
		 //抽奖按钮点击和罐子掉落声音
		$('.gz1,.gz2,.gm,.hy').show();$('.qd').hide();
		$('.gm img').addClass('kai');
		$('.lg,.letsgo').hide();$('.lg2').show();
		$('.gz_top img,.gz_bot img').addClass('left');
		$('.gz_mid img').addClass('right');
		$('#cj .gz2 img').attr('src','img/guandao2/gz2_'+x+'.png?v=1');
		setTimeout(function(){
			$('.lucky').show();
		},2500);
		setTimeout(function(){
			$('.gm').hide();
			location.href = 'http://'+location.host + '/zzqpNew/txo/result';
		},7000);
	}
	
    //酒王战绩
    $('#jw_icon').css('display','block');
    $('#jw_icon').on('click',function(){
        $('#jiuw_box').fadeIn(1,function(){
            $('#jiuw_box div').css('bottom','0rem');
        });
        $('#jiuw_box .close').on('click',function(){
            $('#jiuw_box div').css('bottom','-11rem');
            $('#jiuw_box').fadeOut(1);
        });
    });
})();
