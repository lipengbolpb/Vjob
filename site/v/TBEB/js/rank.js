(function(){
	
	var itpl_onenote = document.getElementById("onenote_tpl").innerHTML,
		rankList = document.getElementById("rankList"),
		args = vge.urlparse(location.href),
		openid = args.openid,
		hbopenid = args.hbopenid;	
		
	sessionStorage.openid = openid;
	fyb();
	
	function fyb(){
		var javai = vge.tbeb + '/DBTECQPInterface/user/queryTotalRank';
		var req = {
			"openid": openid,
			"hbopenid":hbopenid,
			"currentPage":"0",//页码
			"count":"10",//每页条数
			"isHistory":"0"  //isHistory为1时为查询上个月，不填或为0是查询本月
		};
		vge.callJApi(javai, req,
	        function(jo) {
	            if (jo.result.code == '0') {
		            if (jo.result.businessCode === '0') {
		            	$('.cash').fadeOut(300);
		            	$('.rank').fadeIn(300);
		            	fyb_1 = true;
		            	var fybmsg={},le=jo.reply,j=0;
						for (j = 0; j < le.length; ++j) {
							if (j==0) {
								fybmsg.ranks='冠军';
								fybmsg.ranks_r = '第一名';
								fybmsg.bg='background:url(/v/TBEB/images/rank_1.png) no-repeat left;-webkit-background-size: .4rem auto;';
							} else if(j==1){
								fybmsg.ranks='亚军';
								fybmsg.ranks_r = '第二名';
								fybmsg.bg='background:url(/v/TBEB/images/rank_2.png) no-repeat left;-webkit-background-size: .4rem auto;';
							} else if(j==2){
								fybmsg.ranks='季军';
								fybmsg.ranks_r = '第三名';
								fybmsg.bg='background:url(/v/TBEB/images/rank_3.png) no-repeat left;-webkit-background-size: .4rem auto;';
							}else{
								switch (j){
									case 3:fybmsg.ranks_r = '第四名';
										break;
									case 4:fybmsg.ranks_r = '第五名';
										break;
									case 5:fybmsg.ranks_r = '第六名';
										break;
									case 6:fybmsg.ranks_r = '第七名';
										break;
									case 7:fybmsg.ranks_r = '第八名';
										break;
									case 8:fybmsg.ranks_r = '第九名';
										break;
									case 9:fybmsg.ranks_r = '第十名';
										break;	
									default:fybmsg.ranks_r ='<i>'+le[j].totalScanCounts/1000+'</i>升';
										break;
								}
								fybmsg.ranks='第'+le[j].rowNum+'名';
								fybmsg.bg='background:none;';
							}
							if(le[j].rowNum==0){
									fybmsg.ranks='';
									fybmsg.bg='background:none;';
							}
							fybmsg.nickname=le[j].nickName==undefined?'***':le[j].nickName;
							fybmsg.headurl=le[j].url===''?'/v/zzqp/img/bg/headimg.png':le[j].url;
							fybmsg.ranknum=le[j].totalScanCounts;
							rankList.innerHTML += vge.renderTpl(itpl_onenote, fybmsg);
						}
						if(jo.reply.length>10){
							$('#rank_tip').css('display','block');
						}else{
							$('#rank_tip').css('display','none');
						}
		            } else if (jo.result.businessCode === '1') { //1
			            title_tip('提 示', jo.result.msg, '我知道了');
			        } else {
			            title_tip('尊敬的用户', jo.result.msg, '我知道了');
		            	flag = false;
			        }
	            } else{ //code!='0'
		            title_tip('尊敬的用户',jo.result.msg, '我知道了');
		            flag = false;
	            }
	    	});
	}
	$('.back').on('click',function(){
		location.href = 'http://'+location.host + '/TBEB/too/details';
	});

})();

