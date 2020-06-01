(function(){
	var currentpage=1,next=true,count=10,j=0,
		no_list = document.getElementById("no_list"),
		mon_list = document.getElementById("mon_list"),
		beerNum = 0,
		dom_more = document.getElementById("more"),
		itpl_onenote = document.getElementById("onenote_tpl").innerHTML,
		args = vge.urlparse(location.href),
		bizcode = args.bizcode===undefined?'1':args.bizcode,
		first=true;
	
	
	attentioned();
	
	function attentioned(){
		onepage_note(currentpage);
		function onepage_note(currentpage,cb){
			var javai = vge.tbeb + '/DBTECQPInterface/gifts/queryAllBeerQuantityList';
			var req = {
					"openid": sessionStorage.openid,
					"currentPage":currentpage,
					"count":count
				};
			vge.callJApi(javai, req,function(jo) {
		        if (jo.result.code == '0') {
		            if (jo.result.businessCode === '0') {
		            	beerNum = jo.reply.totalVpoints===undefined?0:jo.reply.totalVpoints/1000;
		            	$('.beerNum').html(beerNum);
		            	beerHeight();
		            	var i=0, lst=jo.reply.objList, l=lst.length;
						if (l===0 || lst === undefined) {
							if (first) {
								dom_more.innerHTML = '仅显示近30天的记录';
								dom_more.style.fontSize = '0.6rem';
								dom_more.removeEventListener('click',getm,false);
								mon_list.style.display='none';
								no_list.style.display='block';
								first=false;
							} else{
								no_list.style.display='none';
								dom_more.innerHTML = '仅显示近30天的记录';
								dom_more.style.fontSize = '0.6rem';
								dom_more.removeEventListener('click',getm,false);
							}
							next=false;
							if (cb!==undefined) {
								cb();
							}
							return;
						}
						first=false;
						var params={},hs=[],mon_where='';
						no_list.style.display='none';
						dom_more.style.display='block';
						for (i = 0; i < l; ++i) {
							mon_where=lst[i].giftsName;
		//					if (mon_where=='获得酒量') {
		//						params.monwhere=mon_where;
		//						params.barrel='+'+lst[i].earnVpoints;
		//						params.color='#ffd46b';
		//					} else{
		//						params.monwhere='红包提现';
		//						params.money='-'+lst[i].earnMoney+'元';
		//						params.color='#ffffff';
		//						params.imgUrl = 'background-image:url(/v/csqp/img/icon-bag.png);';
		//					}
							params.barrel='+'+lst[i].earnVpoints/1000;
							params.gettime=lst[i].earnTime;
							mon_list.innerHTML += vge.renderTpl(itpl_onenote, params);
						}
						if (cb!==undefined) {
							cb();
						}
						if (l<count) {
							no_list.style.display='none';
							dom_more.innerHTML = '仅显示近30天的记录';
							dom_more.style.fontSize = '0.6rem';
							dom_more.removeEventListener('click',getm,false);
							next=false;
							if (cb!==undefined) {
								cb();
							}
							return;
						}
		            } else if(jo.result.businessCode==='2'){//无红包记录
		            	$('.beerNum').html('0');
		            	beerNum=0;
		            	beerHeight();
						if (first) {
							dom_more.innerHTML = '仅显示近30天的记录';
							dom_more.style.fontSize = '0.6rem';
							dom_more.removeEventListener('click',getm,false);
							mon_list.style.display='none';
							no_list.style.display='block';
							first=false;
						} else{
							no_list.style.display='none';
							dom_more.innerHTML = '仅显示近30天的记录';
							dom_more.style.fontSize = '0.6rem';
							dom_more.removeEventListener('click',getm,false);
						}
						if (cb!==undefined) {
							cb();
						}
						next=false;
						return;
					} else{//businessCode:1失败
						title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
					}
				} else{//code!='0'
					title_tip('尊敬的用户','呜呜，系统开了个小差，请稍后重试！','我知道了');
				}
			});
			dom_more.addEventListener('click',getm,false);
			function getm() {
				if (next) {
					++currentpage;
					onepage_note(currentpage);
				}
			}
		}
	}
	function beerHeight(){
		var height = '';
		if(beerNum<100){
			height = '-5.8rem';
		}else if(beerNum<200){
			height = '-4.8rem';
		}else if(beerNum<400){
			height = '-3.8rem';
		}else if(beerNum<600){
			height = '-2.8rem';
		}else if(beerNum<800){
			height = '-1.8rem';
		}else{
			height = '-.8rem';
		}
		
		$('.myBarrel').fadeIn(100);
		$('.bottle1').addClass('shak');
		timer = setTimeout(function(){
			timer2 = setInterval(function(){
				j++;
				if(j == 1){
					$('.bottle1').css('display','none');
					$('.bottle2').css('display','block');
				}else if(j==2){
					$('.bottle2').css('display','none');
					$('.bottle3').css('display','block');
					$('.beer').delay(100).css({'display':'block','-webkit-transition': 'all .4s','-webkit-animation': 'beerwave 4s infinite linear','bottom':height});
				}else{
					$('.bottle3').css('display','none');
					$('.bottle4').css('visibility','visible');
					$('.bottle4').addClass('rotate');
					clearInterval(timer2);
				}
			},200);
		},2000);
	}
	$('.toDetails').on('click',function(){
		$('.mybag_bottom').css('top','0');
	});
	$('.toRanks').on('click',function(){
		location.href = 'http://'+location.host + '/TBEB/too/rank';
	});
	$('#hide').on('click',function(){
		if(bizcode == '666'){
			window.history.go(-1);
		}else{
			$('.mybag_bottom').css('top','100%');
		}
	});
})();

