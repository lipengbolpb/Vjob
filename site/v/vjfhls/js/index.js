(function() {
	loading('玩命加载中');
	var index = 0,flag = true,
		w = $(document).width();
	
	
	
	var args = vge.urlparse(location.href),
		openid = args.openid,//欢乐送openid;
		provinceOpenid = args.provinceOpenid,
		provinceQrcode = args.provinceQrcode;

	
	subscribe();

	function resload(){
		$(document).ready(function(){
			$('.wenzi_box').css('height', '6.45rem');
			$('.index').on('webkitTransitionEnd', '.wenzi_box', function(e) {
				e.stopPropagation();
				$('.index').on('click', function() {
					$('.open').addClass('rotate');
					setTimeout(function() {
						$('img.page_l').css('display', 'block');
					}, 1350);
				});
			})
			$('.open').on('webkitTransitionEnd', function(e) {
				e.stopPropagation();
				index++;
				$('#teach').fadeIn(100);
				$('.page').css('visibility', 'visible');
				$('#nav li').eq(index).addClass('cur').siblings().removeClass('cur');
				$('.index .page_box').addClass('rotate');
			});
			$('.index').on('webkitTransitionEnd', '.page_box', function(e) {
				$('.index').css('display', 'none');
				e.stopPropagation();
			});
			$('#teach').on('click',function(){
				$(this).fadeOut(300,touchInit);
			});
		});
	}
	
	sweep();
	function sweep() {
        if (flag) {
            flag = false;
            var japi = vge.vjfhls + '/DBTHLSInterface/user/myDrinking';
            var req = {
                "openid": openid,
                "provinceOpenid":provinceOpenid,
				"provinceQrcode":provinceQrcode	
            };
            vge.clog('debug', [japi, JSON.stringify(req)]);
            vge.callJApi(japi, req, cb);
        }
    }
	
	function cb(jo) {
        if (jo.result.code == '0') {
            switch (jo.result.businessCode) {//"businessCode": "状态码,0 - 成功, 1 - 失败, 2-缺少省区openid, 3-无省区关系",
                case '0': 
                	loaded();
                	$('#loadDiv').css('display','block');
                	setTimeout(function(){
                		$('#loadDiv').css('display','none');
                		resload();
                	},2000);
                	if(JSON.parse(jo.reply).scanCounts<=0){
                		$('.inform').attr('src','/v/vjfhls/img/inform_2.png');
                		$('#nomsg').css('display','block');
                	}else{
                		show(JSON.parse(jo.reply));
	                	$('.page').css('visibility','visible');
				        $('.index').css('visibility','visible');
				        $('#nav').css('display','block');
                	}
                    break;
                case '1':  
                	loaded();
                	$('#nomsg').css('display','block');
                	$('.inform').attr('src','/v/vjfhls/img/inform_1.png?v=1');
//              	title_tip('提 示', jo.result.msg, '我知道了');
                    break;
                case '2': 
                	urljump(JSON.parse(jo.reply).provinceQrcode);
                    break;
                case '3':  
                	loaded();
                	$('#nomsg').css('display','block');
                	$('.inform').attr('src','/v/vjfhls/img/inform_1.png?v=1');
                    break;
                default:
            }
        } else if (jo.result.code == '-1') {//code !=0;
            title_tip('尊敬的用户', '系统升级中，请稍后再试！', '我知道了');
        } else {
            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
        }
    }
	function urljump(code){
		switch (code){
			case 'HuNanQP'://
				location.href = 'http://'+location.host+'/csqp/to/vjfhls?s='+openid+'&provinceQrcode='+code;//带上欢乐送的openid
				break;
			case 'beixiao':
				location.href = 'http://'+location.host+'/bxqp/to/vjfhls?s='+openid+'&provinceQrcode='+code;//带上欢乐送的openid
				break;
			case 'BYinMai':
				location.href = 'http://'+location.host+'/amqp/to/vjfhls?s='+openid+'&provinceQrcode='+code;//带上欢乐送的openid
				break;
			case 'qpec':
				location.href = 'http://'+location.host+'/TBEB/to/vjfhls?s='+openid+'&provinceQrcode='+code;//带上欢乐送的openid
				break;
			case 'fujian':
				location.href = 'http://'+location.host+'/fjqp/to/vjfhls?s='+openid+'&provinceQrcode='+code;//带上欢乐送的openid
				break;
			case 'hebei':
				location.href = 'http://'+location.host+'/hbqp/to/vjfhls?s='+openid+'&provinceQrcode='+code;//带上欢乐送的openid
				break;
			case 'heilj':
				location.href = 'http://'+location.host+'/hljqp/to/vjfhls?s='+openid+'&provinceQrcode='+code;//带上欢乐送的openid
				break;
			case 'huanan':
				location.href = 'http://'+location.host+'/hnqp/to/vjfhls?s='+openid+'&provinceQrcode='+code;//带上欢乐送的openid
				break;
			case 'hunan':
				location.href = 'http://'+location.host+'/csqp/to/vjfhls?s='+openid+'&provinceQrcode='+code;//带上欢乐送的openid
				break;
			case 'jiangxi':
				location.href = 'http://'+location.host+'/jxqp/to/vjfhls?s='+openid+'&provinceQrcode='+code;//带上欢乐送的openid
				break;
			case 'qmbaipi':
				location.href = 'http://'+location.host+'/qpbp/to/vjfhls?s='+openid+'&provinceQrcode='+code;//带上欢乐送的openid
				break;	
			case 'sichuan':
				location.href = 'http://'+location.host+'/scqp/to/vjfhls?s='+openid+'&provinceQrcode='+code;//带上欢乐送的openid
				break;	
			case 'shandongagt':
				location.href = 'http://'+location.host+'/sdqp/to/vjfhls?s='+openid+'&provinceQrcode='+code;//带上欢乐送的openid
				break;	
			case 'shanxi':
				location.href = 'http://'+location.host+'/sxqp/to/vjfhls?s='+openid+'&provinceQrcode='+code;//带上欢乐送的openid
				break;	
			case 'xianqp':
				location.href = 'http://'+location.host+'/xaqp/to/vjfhls?s='+openid+'&provinceQrcode='+code;//带上欢乐送的openid
				break;	
			case 'XinYM':
				location.href = 'http://'+location.host+'/ymqp/to/vjfhls?s='+openid+'&provinceQrcode='+code;//带上欢乐送的openid
				break;	
			case 'yunnan':
				location.href = 'http://'+location.host+'/ynqp/to/vjfhls?s='+openid+'&provinceQrcode='+code;//带上欢乐送的openid
				break;	
			case 'henanqp':
				location.href = 'http://'+location.host+'/zzqp/vo/vjfhls?s='+openid+'&provinceQrcode='+code;//带上欢乐送的openid
				break;
			case 'guangxi':
				location.href = 'http://'+location.host+'/v/vjfhls/index.html?openid='+openid+'&provinceQrcode='+code+'&provinceOpenid='+openid;//带上欢乐送的openid
				break;	
			case 'zhejiang':
				location.href = 'http://'+location.host+'/v/vjfhls/index.html?openid='+openid+'&provinceQrcode='+code+'&provinceOpenid='+openid;//带上欢乐送的openid
				break;	
			default:
				break;
		}
	}
	function show(jo){
		console.log(jo);
		$('.page_1 .day').html(jo.scanDays);
		$('.page_2 .year').html(jo.scanDate.split('-')[0]);
		$('.page_2 .month').html(jo.scanDate.split('-')[1]);
		$('.page_2 .day').html(jo.scanDate.split('-')[2]);
		$('.page_2 .beer').html(jo.firstSku);
		if(jo.scanDate.split('-')[1]==3||jo.scanDate.split('-')[1]==4||jo.scanDate.split('-')[1]==5){//春
			$('.page_2 .Season').html('春日');
			$('.page_2 .page_pic').attr('src','/v/vjfhls/img/spring.png');
		}else if(jo.scanDate.split('-')[1]==6||jo.scanDate.split('-')[1]==7||jo.scanDate.split('-')[1]==8){
			$('.page_2 .Season').html('夏日');
			$('.page_2 .page_pic').attr('src','/v/vjfhls/img/summer.png');
		}else if(jo.scanDate.split('-')[1]==9||jo.scanDate.split('-')[1]==10||jo.scanDate.split('-')[1]==11){
			$('.page_2 .Season').html('秋日');
			$('.page_2 .page_pic').attr('src','/v/vjfhls/img/autumn.png');
		}else{
			$('.page_2 .Season').html('冬日');
			$('.page_2 .page_pic').attr('src','/v/vjfhls/img/winter.png');
		}
		if(jo.scanCounts>999){
			$('.page_5 .num').css('font-size','0.65rem');
			$('.page_3 .num').css('font-size','0.75rem');
		}
		$('.page_3 .num').html(jo.scanCounts);
		if(jo.scanMoney>999){
			$('.page_3 .money').css('font-size','0.6rem')
		}
		$('.page_3 .money').html(jo.scanMoney);
		$('.page_3 .max_money').html(jo.maxMoney);
		$('.page_4 .month').html(jo.maxDate.split('-')[1]);
		$('.page_4 .day').html(jo.maxDate.split('-')[2]);
		$('.page_4 .beernum').html(jo.maxDateScan);
		$('.page_5 .num').html(jo.scanCounts);
		$('.page_5 .rank').html(jo.rankString);
		if(jo.rankString=='青铜段位'){
			$('.page_5 .title').html('醉翁之意不在酒，在乎情谊~');
		}else if(jo.rankString=='白银段位'||jo.rankString=='黄金段位'){
			$('.page_5 .title').html('酒量不错，酒胆儿还需修炼~');
		}else if(jo.rankString=='铂金段位'){
			$('.page_5 .title').html('你离酒王仅一步之遥！');
		}else{
			$('.page_5 .title').html('酒王当之无愧！');
		}
	}
	
	$('.page').on('click','#goback',function(){
		location.reload();
	});
	if(args.shareflag==1){
		$('#share').css({'background': 'url(/v/vjfhls/img/button_3.png) no-repeat center','-webkit-background-size':'100%'});
	}else{
		$('#share').css({'background': 'url(/v/vjfhls/img/button_2.png) no-repeat center','-webkit-background-size':'100%'});
	}
	$('.page').on('click','#share',function(){
		if(args.shareflag==1){
			$('.page').css('opacity',0);
			$('#nomsg').css('display','block');
            $('.inform').attr('src','/v/vjfhls/img/inform_1.png?v=1');
            $('.inform').on('click',function(){
				$('#nomsg').css('display','none');
				$('.page').css('opacity',1);
			});
		}else{
			$('#share_box').css('display','block');
			$('#share_box').on('click',function(){
				$(this).css('display','none');			
			});
		}
	});
	
	function subscribe(){//获取关注用户的信息
		var requrl='http://'+vge.o3host+'/wx3/uinfo2?openid='+openid+'&appid='+vge.vjfhlsappid;
		vge.ajxget(requrl, 5000, function(r){
			try{
				var o = JSON.parse(r);
				if(o.subscribe==0) {//未关注
					$('.headimg').attr('src','/v/vjfhls/img/headimg.png');
				}else{//已关注用户
					if(o.headimgurl == ''||o.headimgurl == undefined|| o.headimgurl == '/0'){
						$('.headimg').attr('src','/v/vjfhls/img/headimg.png');
					}else{
						$('.headimg').attr('src',o.headimgurl);
					}
					$('.page_1 .name').html(o.nickname);
				}
				vge.clog('个人信息', JSON.stringify(o));
			}catch(e){
				vge.clog('errmsg', [requrl, e]);
			}
		},function(err){
			vge.clog('errmsg', [requrl, err]);
		});
	}
	
	function touchInit() { //轮播图左右滑动切换
		var _x = 0,
			x = 0,
			lf;
		$('.page').on('touchstart touchmove touchend', function(e) {
			e.stopPropagation();
			switch(e.type) {
				case 'touchstart':
					x = _x = e.originalEvent.targetTouches[0].pageX;
					window.flag = true;
					break;
				case 'touchmove':
					_x = e.originalEvent.targetTouches[0].pageX;
					window.flag = false;
					e.preventDefault();
					break;
				case 'touchend':
					_x = e.originalEvent.changedTouches[0].pageX;
					if(window.flag) {
						console.log('点击');
					} else {
						e.preventDefault();
						if(Math.abs(x - _x) >= w * 0.1) {
							if(x - _x < 0) { //右划
								index -= 1;
								index = index < 1 ? 1 : index;
								console.log('右划', index);
								$('.page_box').eq(index).addClass('roback').removeClass('rotate');
								$('#nav li').eq(index).addClass('cur').siblings().removeClass('cur');
							} else { //左划
								index += 1;
								index = index >= $('#nav li').size() - 1 ? $('#nav li').size() - 1 : index;
								$('#nav li').eq(index).addClass('cur').siblings().removeClass('cur');
								console.log('左划', index);
								$('.page_box').eq(index - 1).addClass('rotate').removeClass('roback');
							}
						} else { //当前

						}
					}
					break;
				default:
					break;
			}

		});
	}
	
	ini_wxshare(vge.vjfhlsappid);
		    // 分享
	var shareimg = 'http://'+location.host+'/v/vjfhls/img/share.jpg',
		shareurl = location.href+'&shareflag=1';
	wx.ready(function(){
		wx.hideMenuItems({
		menuList: [
			'menuItem:share:timeline'] 
		});
		set_wxshare(shareimg,'在酒桌上，撞见自己的江湖','【懂你的酒桌 更懂你】青岛啤酒2017年度酒王战绩',shareurl);
	});
	
	function loading(txt) {
        $('#loadingToast .weui_toast_content').html(txt);
        $('#loadingToast').show();
    }

    function loaded() {
        $('#loadingToast').hide();
    }

    function toast(txt) {
        $('#toast .weui_toast_content').html(txt);
        $('#toast').show();
        setTimeout(function () {
            $('#toast').hide();
        }, 2000);
    }
	
})();