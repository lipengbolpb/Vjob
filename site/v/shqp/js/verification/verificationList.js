'use strict';
(function(){
	var API_findCheckUser = vge.common + '/vjifenInterface/checkUser/queryCheckPrizeList';//查询兑奖列表
	var args = vge.urlparse(location.href),
		openid = args.openid,
		count = 20,
		currentPage = 1;
	
	queryCheckPrizeList();
	
	
	$('.back').on('click',function(){
		$('#details_box').css('display','none');
	});
	
	function queryCheckPrizeList(){
		var javai = API_findCheckUser;
		var req = {
			"projectServerName": "shanghaiqp",
			"openid":openid,
			"currentPage": currentPage,
			"count":count
		};
		vge.callJApi(javai,req,function(jo){
			if(jo.result.code=='0'){
				if(jo.result.businessCode=='0'){
					if(currentPage==1){
						$('.userName').html(jo.reply.userName);
						$('.checkPrizeCount').html(jo.reply.checkPrizeCount);
						sessionStorage.checkPrizeList = JSON.stringify(jo.reply.checkPrizeList);
					}
					if(jo.reply.checkPrizeList.length>1&&currentPage>1){
						sessionStorage.checkPrizeList = JSON.stringify(JSON.parse(sessionStorage.checkPrizeList).concat(jo.reply.checkPrizeList));
					}
					showList(jo.reply.checkPrizeList);
				}else{
					title_tip('尊敬的用户', jo.result.msg, '我知道了');
				}
			}else{
				title_tip('尊敬的用户', jo.result.msg, '我知道了');
			}
		});
	}
	function showList(list){
		var html = '';
		for(var i=0; i<list.length;i++){
			html += '<div class="prize">';
			html += '<div><img src="'+list[i].prizeImg+'" class="prizeImg"></div>';
			html += '<div class="prizeMsg">';
			html += '<p class="prizeName">'+list[i].prizeName+'</p>';
			html += '<p class="earnTime">中奖时间：'+list[i].earnTime.split(' ')[0]+'</p>';
			html += '<p class="endTime">兑奖截止：'+list[i].expireTime.split(' ')[0]+'</p>';
			html += '</div><p class="details" infoKey='+list[i].infoKey+'>查看详情</p></div>';
		}
		$('.verificationList').append(html);
		if(list.length<count){
			$('.more').html('没有更多记录了');
			$('.more').unbind();
		}else{
			$('.more').on('click',function(){
				currentPage++;
				queryCheckPrizeList();
			})
		}
		cb();
	}
	function cb(){
		var checkPrizeList = JSON.parse(sessionStorage.checkPrizeList);
		$('.details').on('click',function(){
			for(var i=0;i<checkPrizeList.length;i++){
				if($(this).attr('infoKey')==checkPrizeList[i].infoKey){
					$("#details_box .title").attr('src', checkPrizeList[i].prizeImg);
					$('#details_box').css('display','block');
					$('#qrcode').val(checkPrizeList[i].prizeVcode);
					$('#prizeName').val(checkPrizeList[i].prizeName);
					$('#earnTime').val(checkPrizeList[i].earnTime.split(' ')[0]);
					$('#endTime').val(checkPrizeList[i].expireTime.split(' ')[0]);
					$('#contact').val(checkPrizeList[i].userName);
					$('#tel').val(checkPrizeList[i].phoneNum);
					$('#verificationPerson').val(checkPrizeList[i].checkUserName);
					$('#verificationTime').val(checkPrizeList[i].checkTime.split('.0')[0]);
					$('#verificationRemark').val(checkPrizeList[i].checkRemarks==undefined?'':checkPrizeList[i].checkRemarks);
				}
			}
		});
	}
})()