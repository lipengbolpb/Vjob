(function(){
	//生成炫耀卡
	var openid = sessionStorage.openid,
		headimg=sessionStorage.headimgurl,
		nickname=sessionStorage.nickname,
		itpl_twonote = document.getElementById("twonote_tpl").innerHTML,//上季度风云榜li
		itpl_onenote = document.getElementById("onenote_tpl").innerHTML;//风云榜li
	
	
	var Vfyb = document.getElementById("Vfyb"),
		fybOld = document.getElementById("fybOld");
	
	
	$('.make').on('click',function(){
		_hmt.push(['_trackEvent', '点击生成我的炫耀卡', '炫耀卡', '风云榜']);
		location.href='http://'+location.host+'/v/zzqpNew/show.html?openid='+openid;
	});
	
	$('#Vhead').attr('src',sessionStorage.headimgurl);//头像
	$('.name').html(sessionStorage.nickname);
	$('#jNum').html(sessionStorage.beerTotalCount);
	if(Number(sessionStorage.beerTotalCount)<5){
		$('.rankEle').css('display','none');
	}
	$('#rank').html(sessionStorage.userRanking);
	
	if(new Date().getTime()>1514736000000){
		Vfyb.innerHTML = '<p style="font-size: .4rem;color: #fff;line-height:  1rem;text-align:  center;">酒王活动已结束</p>';
	}else{
		Vfybshow();
	}
	
	//酒王风云榜
	function Vfybshow(){
		var javai = vge.zzqp + '/DBTHNQPInterface/user/queryRankList';
		var req = {
			"openid":openid
		};
		vge.callJApi(javai, req,
		function(jo) {
			if (jo.result.code == '0'){
				if(jo.result.businessCode === '0'){
					var i=0, lst=jo.reply, l=lst.length;
					var params={},hs=[];
					for (i = 0; i < l; ++i) {
						params.rank = '第'+lst[i].rowNum+'名';
						
						if(i>0||i==20){
							if(lst[i].rowNum==1){
								params.rank = '';
							}
						}
						params.Vname = lst[i].nickName;
						params.num = lst[i].totalScanCounts;
    					params.Vheadurl = lst[i].url;
    					if(lst[i].openid == openid){
							params.Vname = nickname;
						}
						
						Vfyb.innerHTML += vge.renderTpl(itpl_onenote, params);
    				}
    				$('#Vfyb').find("li:even").css({'background':'#009749','color':'#9edc79'});
        			
				}else {
					$('#comTips').css('display','block');
	            	$('#fail').css('display','block');
					$('#tip').html('系统开了个小差，请稍后重试！');
				}
			}else{
				$('#comTips').css('display','block');
            	$('#fail').css('display','block');
				$('#tip').html('系统开了个小差，请稍后重试！');
			}
		});
	}

	
	var showold = document.getElementsByClassName('more2')[0];
	showold.addEventListener('click',Vfyboldshow,false);
	function Vfyboldshow(){
		var timelocal = new Date();
		timelocal = timelocal.getTime();	
		_hmt.push(['_trackEvent', '点击查看上季度', '上期排行', '风云榜']);
		showold.removeEventListener('click',Vfyboldshow,false);
		showold.addEventListener('click',function(){
			$('.sjd').fadeIn();
		},false);
		var javai = vge.zzqp + '/DBTHNQPInterface/user/queryRankList';
		var req = {
			"openid":openid,
			"isHistory":"1"
		};
		vge.callJApi(javai, req,
		function(jo) {
			if (jo.result.code == '0'){
				if(jo.result.businessCode === '0'){
					$('#fyb').fadeIn();
					var i=0, lst=jo.reply, l=lst.length;
					var params={},hs=[];
					for (i = 0; i < l; ++i) {
						if(i==0){
							params.rank = '冠军&nbsp;&nbsp;第1名';
						}else if(i==1){
							params.rank = '亚军&nbsp;&nbsp;第2名';
						}else if(i==2){
							params.rank = '季军&nbsp;&nbsp;第3名';
						}else if(i>2){
							params.rank = '第'+lst[i].rowNum+'名';
						}
						if(i==20){//最后一名写自己
							if(lst[i].rowNum==1){
								params.rank = '';
							}
						}
						
						params.Vname = lst[i].nickName;
						params.num = lst[i].totalScanCounts;
    					params.Vheadurl = lst[i].url;
    					if(lst[i].openid == openid){
							params.Vheadurl = headimg;
							params.Vname = nickname;
						}
						fybOld.innerHTML += vge.renderTpl(itpl_twonote, params);
    				}
    				$('#fybOld').find("li:even").css('background','#93c96f');
    				$('#fybOld').find("li:odd").css('background','#cbff99');
        			
				}else {
					$('#comTips').css('display','block');
                	$('#fail').css('display','block');
					$('#tip').html('系统开了个小差，请稍后重试！');
				}
			}else{
				$('#comTips').css('display','block');
            	$('#fail').css('display','block');
				$('#tip').html('系统开了个小差，请稍后重试！');
			}
		});
	}
	
	
	
	
	function tj1(){
		$('#ipt').hide();
		$('#prizeTier').show();
	}
	function tj2(){
		$('#ipt').hide();
		$('#noprizeTier2').show();
	}
	$('.myjp .p2 img').click(function(){
		$('#ipt').fadeIn()
	})
})();
