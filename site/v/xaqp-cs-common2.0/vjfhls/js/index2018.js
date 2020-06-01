(function() {

	var h = $('body').height() - $('#index .input').height();
	$('#list').css('height', h + 'px');

	var args = vge.urlparse(location.href),
		openid = args.openid, //欢乐送openid;
		provinceOpenid = args.provinceOpenid,
		sweepflag = true,
		click = true,
		provinceQrcode = args.provinceQrcode;

	var i = 0,
		timer = null,
		htmlList = [],
		htmlListA = [],
		htmlListB = [];
	//预设参数
	var nickname = '游客',
		headimg = '/v/vjfhls/img2018/headimg.png',
		level = 'd',
		wenhou = '小年快乐！',
		now = new Date().getTime();
	if(now > 1548691200000 && now < 1549209600000){//除夕前小年后
		wenhou = '新春快乐！';
	}else if(now > 1549209600000 && now < 1549296000000){
		wenhou = '除夕快乐！';
	}else{
		wenhou = '新春快乐！';
	}

	function show(jo) {
		subscribe();
		//对话框文案A
		$('#index').css('display', 'block');
		htmlListA = [
			'<li class="left"><img src="/v/vjfhls/img2018/logo.png" class="head"/><div class="content_box"><p class="content">Hey ' + nickname + ' 在吗？</p></div></li>',
			'<li class="right"><img src="' + headimg + '" class="head"/><div class="content_box"><p class="content">在啊</p></div></li>',
			'<li class="left"><img src="/v/vjfhls/img2018/logo.png" class="head"/><div class="content_box"><p class="content">'+wenhou+'你知道吗 缘来我们已经相识' + jo.scanDays + '天了</p></div></li>',
			'<li class="right"><img src="' + headimg + '" class="head"/><div class="content_box"><p class="content">哇~ 真的吗！</p></div></li>',
			'<li class="left"><img src="/v/vjfhls/img2018/logo.png" class="head"/><div class="content_box"><p class="content">当然！而且 ' + jo.maxCounty + ' 是我们相遇最多的地方</p></div></li>',
			'<li class="right"><img src="' + headimg + '" class="head"/><div class="content_box"><p class="content"><img src="/v/vjfhls/img2018/biaoqing.png" class="biaoqing"/></p></div></li>',
			'<li class="left"><img src="/v/vjfhls/img2018/logo.png" class="head"/><div class="content_box"><p class="content">哈哈，有没有很意外，想不想看看18年我们一起走过的路？</p></div></li>',
			'<li class="right"><img src="' + headimg + '" class="head"/><div class="content_box"><p class="content">好啊！</p></div></li>',
			'<li class="left"><img src="/v/vjfhls/img2018/logo.png" class="head"/><img src="/v/vjfhls/img2018/video.png" class="video"/></li>'
		];
		//对话框文案B
		htmlListB = [
			'<li class="left"><img src="/v/vjfhls/img2018/logo.png" class="head"/><div class="content_box"><p class="content">Hey ' + nickname + ' 在吗？</p></div></li>',
			'<li class="right"><img src="' + headimg + '" class="head"/><div class="content_box"><p class="content">在</p></div></li>',
			'<li class="left"><img src="/v/vjfhls/img2018/logo.png" class="head"/><div class="content_box"><p class="content">'+wenhou+'你知道吗 缘来我们已经相识' + jo.scanDays + '天了</p></div></li>',
			'<li class="left"><img src="/v/vjfhls/img2018/logo.png" class="head"/><div class="content_box"><p class="content">而且' + jo.maxCounty + '是我们相遇最多的地方</p></div></li>',
			'<li class="right"><img src="' + headimg + '" class="head"/><div class="content_box"><p class="content">真的？看来我们相当有缘！</p></div></li>',
			'<li class="left"><img src="/v/vjfhls/img2018/logo.png" class="head"/><div class="content_box"><p class="content"><img src="/v/vjfhls/img2018/biaoqing_2.png?v=2" class="biaoqing"/></p></div></li>',
			'<li class="left"><img src="/v/vjfhls/img2018/logo.png" class="head"/><div class="content_box"><p class="content">想不想看看这段时间我们的过往</p></div></li>',
			'<li class="right"><img src="' + headimg + '" class="head"/><div class="content_box"><p class="content">好啊！</p></div></li>',
			'<li class="left"><img src="/v/vjfhls/img2018/logo.png" class="head"/><img src="/v/vjfhls/img2018/video.png" class="video"/></li>'
		];

		timer = setInterval(function() { //对话框动效执行
			if(jo.scanDays > 30) {
				htmlList = htmlListA;
			} else {
				htmlList = htmlListB;
			}
			if(i < htmlList.length) {
				appendList(htmlList[i]);
				if(i==htmlList.length-1){
					$('#index .video').one('click', function() { //可提前点击
						videoRun();
						click = false;
					});
				}
			} else if(i >= htmlList.length+1){
				clearInterval(timer);
				$('#index .video').unbind();
				if(click) {
					videoRun();
				}
			}
			i++;
		}, 1500);

		function appendList(html) { //对话框动效
			$('#list').append(html);
			document.getElementById("list").scrollTop = document.getElementById("list").scrollHeight;
		}

		//	videoRun();
		function videoRun() {
			$('#index').fadeOut(100);
			$('#page_1').fadeIn(1000, page_1);
			$('#page_1 .sku_box').text(jo.firstSku);
			$('#page_1 .mon_box').text(Number(jo.scanDate.split('-')[1]));
			$('#page_1 .day_box').text(Number(jo.scanDate.split('-')[2]));
			$('#page_1 .num_box').text(Number(jo.nightScan));
			if(Number(jo.nightScan) < 1) {
				$('#page_1 .content').css('background-image', 'url(/v/vjfhls/img2018/page_1_content_2.png?v=2)');
				$('#page_1 .num_box').css('display', 'none');
			}
		}

		function page_1() {
			$('#page_1 .star img').addClass('light');
			$('#page_1 div.content').css({
				'top': '8.6rem',
				'opacity': '1'
			});
			$('#page_1').delay(6000).fadeOut(500, function() {
				$('#page_2').fadeIn(1000, page_2);
			});
			if(['奥古特500罐', '青岛纯生罐', '青岛纯生500罐', '汉斯纯生瓶', '全麦白啤500瓶'].indexOf(jo.firstSku) != -1) {
				level = 'g';
			}
			if(['经典500罐', '经典(1903)500瓶', '经典500瓶', '经典500罐8度', '经典330罐', '经典330高升罐', '精制绿罐', '青岛2000瓶', '淡爽300罐', '青岛干啤500瓶'].indexOf(jo.firstSku) != -1) {
				level = 'z';
			}
			if(level == 'g') { //高档
				$('#page_2 .person').attr('src', '/v/vjfhls/img2018/page_2_person_3.png');
				$('#page_2 .content').css('background-image', 'url(/v/vjfhls/img2018/page_2_content_3.png?v=2)');
			} else if(level == 'z') { //中档
				$('#page_2 .person').attr('src', '/v/vjfhls/img2018/page_2_person_2.png');
				$('#page_2 .content').css('background-image', 'url(/v/vjfhls/img2018/page_2_content_2.png?v=2)');
			}
			$('#page_2 .sku_box').text(jo.firstSku);
		}

		function page_2() {
			$('#page_2 .moon').addClass('rise');
			$('#page_2 .tvlight').addClass('tvbuling');
			$('#page_2').delay(7000).fadeOut(500, function() {
				$('#page_3').fadeIn(1000, page_3);
			});
			$('#page_3 .mon_box').text(Number(jo.maxDate.split('-')[1]));
			$('#page_3 .day_box').text(Number(jo.maxDate.split('-')[2]));
			$('#page_3 .num_box').text(Number(jo.scanCounts));
			$('#page_3 .max_num_box').text(Number(jo.maxDateScan));
			if(jo.maxDateScan < 5) {
				$('#page_3 .evaluation').text('你果然是头发一边分，喝酒最认真的人');
			} else if(jo.maxDateScan < 15) {
				$('#page_3 .evaluation').text('我们青春献给小酒桌');
			} else {
				$('#page_3 .evaluation').text('你还真的是中国境内喝不醉！');
			}
		}

		function page_3() {
			$('#page_3 div.content').css({
				'top': '1.1rem',
				'opacity': '1'
			});
			$('#page_3 .hand').css('bottom', '0');
			$('#page_3').delay(5000).fadeOut(500, function() {
				if(Number(jo.maxMoney) < 8) {//大小红包
					$('#page_4_s').fadeIn(1000, page_4_s);
				} else {
					$('#page_4_b').fadeIn(1000, page_4_b);
				}

			});
			$('#page_4_s .money_box,#page_4_b .money_box').text(jo.scanMoney);
			$('#page_4_s .maxmoney_box,#page_4_b .maxmoney_box').text(jo.maxMoney);
		}

		function page_4_b() {
			$('#page_4_b div.content').css({
				'margin': '1rem auto 0',
				'opacity': '1'
			});
			$('#page_4_b').delay(5000).fadeOut(500, function() {
				$('#page_5').fadeIn(1000, page_5);
			})
			if(jo.scanCounts < 5) { //金马影帝
				$('#page_5 .title,#page_6 .title,#page_7 .title').attr('src', '/v/vjfhls/img2018/jmyd.png')
			} else if(jo.scanCounts < 15) { //酒桌秀才
				$('#page_5 .title,#page_6 .title,#page_7 .title').attr('src', '/v/vjfhls/img2018/jzxc.png')
			} else  if(jo.scanCounts < 100) { //锦鲤翻身
				$('#page_5 .title,#page_6 .title,#page_7 .title').attr('src', '/v/vjfhls/img2018/jlfs.png')
			} else{
				$('#page_5 .title,#page_6 .title,#page_7 .title').attr('src', '/v/vjfhls/img2018/jzx.png')
			}
		}

		function page_4_s() {
			$('#page_4_s .cash_3').addClass('wave');
			$('#page_4_s div.content').css({
				'top': '1rem',
				'opacity': '1'
			});
			$('#page_4_s').delay(6000).fadeOut(500, function() {
				$('#page_5').fadeIn(1000, page_5);
			});
			if(jo.scanCounts < 5) { //金马影帝
				$('#page_5 .title,#page_6 .title,#page_7 .title').attr('src', '/v/vjfhls/img2018/jmyd.png')
			} else if(jo.scanCounts < 15) { //酒桌秀才
				$('#page_5 .title,#page_6 .title,#page_7 .title').attr('src', '/v/vjfhls/img2018/jzxc.png')
			} else if(jo.scanCounts < 100)  { //锦鲤翻身
				$('#page_5 .title,#page_6 .title,#page_7 .title').attr('src', '/v/vjfhls/img2018/jlfs.png')
			}else{
				$('#page_5 .title,#page_6 .title,#page_7 .title').attr('src', '/v/vjfhls/img2018/jzx.png')
			}
		}

		function page_5() {
			$('#page_5 .check_box').on('click', 'img', function() {
				$(this).addClass('checked').siblings().removeClass('checked');
				sessionStorage.flagsrc = $(this).attr('src');
				if($(this).width() / $(this).height() > 4) {
					$('#page_6 img.flag,#page_7 img.flag').css('height', '1.5rem');
				} else {
					$('#page_6 img.flag,#page_7 img.flag').css('height', '1.9rem');
				}
			});
			$('#page_6 .num_box,#page_7 .num_box').text(jo.scanCounts);
			$('#page_6 .money_box,#page_7 .money_box').text(jo.scanMoney);
			$('#page_6 .sku_box,#page_7 .sku_box').text(jo.loveSku);
			$('#page_5 .next').on('click', function() {
				if(sessionStorage.flagsrc) {
					$('#page_6 img.flag,#page_7 img.flag').attr('src', sessionStorage.flagsrc.replace('xz-', 'sc-'));
				}
				$('#page_5').fadeOut(300);
				$('#page_6').fadeIn(300, page_6);
			})
		}

		function page_6() {
			$('.repscan').on('click', function() {
				sessionStorage.removeItem('flagsrc');
				location.reload();
			});
			$('.save').on('click', function(event) { //canvas
				$('.btn_box').css('display', 'none');
				$('#page_7').css('display', 'block');
				event.preventDefault();
				html2canvas(document.getElementById('page_7')).then(function(canvas) {
					console.log(canvas);
					canvas.id = "mycanvas";
					var dataUrl = canvas.toDataURL();
					document.getElementById("canvas").src = dataUrl;
					$('#page_7').css('display', 'none');
					$('#canvas,.savePic').css('display', 'block');
				});
			});
		}
	}

	function subscribe() { //获取关注用户的信息
		var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.vjfhlsappid;
		$.ajax({
			type: "get",
			url: requrl,
			async: false,
			success: function(r) {
				var o = r;
				if(o.subscribe == 0) { //未关注
					headimg = '/v/vjfhls/img/headimg.png';
				} else { //已关注用户
					if(o.headimgurl == '' || o.headimgurl == undefined || o.headimgurl == '/0') {
						headimg = '/v/vjfhls/img/headimg.png';
					} else {
						headimg = o.headimgurl;
					}
					nickname = o.nickname;
				}
				//				$('#page_6 .sc-head,#page_7 .sc-head').attr('src',headimg);
			},
			fail: function() {
				headimg = '/v/vjfhls/img/headimg.png';
				nickname = '游客';
				//				$('#page_6 .sc-head,#page_7 .sc-head').attr('src',headimg);
			}
		});
	}

	sweep();

	function sweep() {
		if(sweepflag) {
			sweepflag = false;
			var japi = vge.vjfhls + '/DBTHLSInterface/user/myDrinking';
			var req = {
				"openid": openid,
				"provinceOpenid": provinceOpenid,
				"provinceQrcode": provinceQrcode
			};
			vge.clog('debug', [japi, JSON.stringify(req)]);
			vge.callJApi(japi, req, cb);
		}
	}

	function cb(jo) {
		if(jo.result.code == '0') {
			switch(jo.result.businessCode) { //"businessCode": "状态码,0 - 成功, 1 - 失败, 2-缺少省区openid, 3-无省区关系",
				case '0':
					loaded();
					if(jo.reply){
						urljump(JSON.parse(jo.reply).provinceQrcode, 0);
						if(JSON.parse(jo.reply).scanCounts <= 0 ||JSON.parse(jo.reply).scanCounts===undefined) {
							$('#page_8 span').text(sessionStorage.province===undefined?'河北':sessionStorage.province);
							$('#page_8').css('display', 'block');
						} else {
							show(JSON.parse(jo.reply));
						}
					}else{
						$('#page_8 span').text(sessionStorage.province===undefined?'河北':sessionStorage.province);
						$('#page_8').css('display', 'block');
					}
					
					break;
				case '1':
					loaded();
					$('#page_8 span').text(sessionStorage.province===undefined?'河北':sessionStorage.province);
					$('#page_8').css('display', 'block');
					//              	title_tip('提 示', jo.result.msg, '我知道了');
					break;
				case '2':
					urljump(JSON.parse(jo.reply).provinceQrcode, 2);
					break;
				case '3':
					loaded();
					break;
				default:
			}
		} else if(jo.result.code == '-1') { //code !=0;
			title_tip('尊敬的用户', '系统升级中，请稍后再试！', '我知道了');
		} else {
			title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
		}
	}

	function urljump(code, bscode) {
		sessionStorage.qrcode = 'http://' + location.host + '/v/vjfhls/img2018/' + code + '.png';
		$('.qrcode img').attr('src', sessionStorage.qrcode);
		switch(code) {
			case 'beixiao':
				sessionStorage.province = '北京';
				break;
			case 'BYinMai':
				sessionStorage.province = '澳麦';
				break;
			case 'qpec':
				sessionStorage.province = '电商';
				break;
			case 'fujian':
				sessionStorage.province = '福建';
				break;
			case 'hebei':
				sessionStorage.province = '河北';
				break;
			case 'heilj':
				sessionStorage.province = '黑龙江';
				break;
			case 'huanan':
				sessionStorage.province = '华南';
				break;
			case 'hunan':
				sessionStorage.province = '湖南';
				break;
			case 'jiangxi':
				sessionStorage.province = '江西';
				break;
			case 'qmbaipi':
				sessionStorage.province = '全麦白啤';
				break;
			case 'sichuan':
				sessionStorage.province = '四川';
				break;
			case 'shandongagt':
				sessionStorage.province = '山东';
				break;
			case 'shanxi':
				sessionStorage.province = '山西';
				break;
			case 'xianqp':
				sessionStorage.province = '陕西';
				break;
			case 'XinYM':
				sessionStorage.province = '新银麦';
				break;
			case 'yunnan':
				sessionStorage.province = '云南';
				break;
			case 'henanqp':
				sessionStorage.province = '华中';
				break;
			case 'guangxi':
				sessionStorage.province = '广西';
				break;
			case 'zhejiang':
				sessionStorage.province = '浙江';
				break;
			case 'hainan':
				sessionStorage.province = '海南';
				break;
			case 'jilin':
				sessionStorage.province = '吉林';
				break;
			case 'liaoning':
				sessionStorage.province = '辽宁';
				break;
			case 'chongqing':
				sessionStorage.province = '重庆';
				break;
			default:
				sessionStorage.province = '火星';
				break;
		}
		if(bscode == 0) {
			return false;
		}
		switch(code) {
			case 'beixiao':
				location.href = 'http://' + location.host + '/bxqp/to/vjfhls?s=' + openid + '&provinceQrcode=' + code; //带上欢乐送的openid
				break;
			case 'BYinMai':
				location.href = 'http://' + location.host + '/amqp/to/vjfhls?s=' + openid + '&provinceQrcode=' + code; //带上欢乐送的openid
				break;
			case 'qpec':
				location.href = 'http://' + location.host + '/TBEB/to/vjfhls?s=' + openid + '&provinceQrcode=' + code; //带上欢乐送的openid
				break;
			case 'fujian':
				location.href = 'http://' + location.host + '/fjqp/to/vjfhls?s=' + openid + '&provinceQrcode=' + code; //带上欢乐送的openid
				break;
			case 'hebei':
				location.href = 'http://' + location.host + '/hbqp/to/vjfhls?s=' + openid + '&provinceQrcode=' + code; //带上欢乐送的openid
				break;
			case 'heilj':
				location.href = 'http://' + location.host + '/hljqp/to/vjfhls?s=' + openid + '&provinceQrcode=' + code; //带上欢乐送的openid
				break;
			case 'huanan':
				location.href = 'http://' + location.host + '/hnqp/to/vjfhls?s=' + openid + '&provinceQrcode=' + code; //带上欢乐送的openid
				break;
			case 'hunan':
				location.href = 'http://' + location.host + '/csqp/to/vjfhls?s=' + openid + '&provinceQrcode=' + code; //带上欢乐送的openid
				break;
			case 'jiangxi':
				location.href = 'http://' + location.host + '/jxqp/to/vjfhls?s=' + openid + '&provinceQrcode=' + code; //带上欢乐送的openid
				break;
			case 'qmbaipi':
				location.href = 'http://' + location.host + '/qmbp/to/vjfhls?s=' + openid + '&provinceQrcode=' + code; //带上欢乐送的openid
				break;
			case 'sichuan':
				location.href = 'http://' + location.host + '/scqp/to/vjfhls?s=' + openid + '&provinceQrcode=' + code; //带上欢乐送的openid
				break;
			case 'shandongagt':
				location.href = 'http://' + location.host + '/sdqp/to/vjfhls?s=' + openid + '&provinceQrcode=' + code; //带上欢乐送的openid
				break;
			case 'shanxi':
				location.href = 'http://' + location.host + '/sxqp/to/vjfhls?s=' + openid + '&provinceQrcode=' + code; //带上欢乐送的openid
				break;
			case 'xianqp':
				location.href = 'http://' + location.host + '/xaqp-common/to/vjfhls?s=' + openid + '&provinceQrcode=' + code; //带上欢乐送的openid
				break;
			case 'XinYM':
				location.href = 'http://' + location.host + '/ymqp/to/vjfhls?s=' + openid + '&provinceQrcode=' + code; //带上欢乐送的openid
				break;
			case 'yunnan':
				location.href = 'http://' + location.host + '/ynqp/to/vjfhls?s=' + openid + '&provinceQrcode=' + code; //带上欢乐送的openid
				break;
			case 'henanqp':
				location.href = 'http://' + location.host + '/zzqp/vo/vjfhls?s=' + openid + '&provinceQrcode=' + code; //带上欢乐送的openid
				break;
			case 'guangxi':
				location.href = 'http://' + location.host + '/gxqp/to/vjfhls?s=' + openid + '&provinceQrcode=' + code; //带上欢乐送的openid
				break;
			case 'zhejiang':
				location.href = 'http://' + location.host + '/qpzj/to/vjfhls?s=' + openid + '&provinceQrcode=' + code; //带上欢乐送的openid
				break;
			case 'hainan':
				location.href = 'http://' + location.host + '/hkqp/to/vjfhls?s=' + openid + '&provinceQrcode=' + code; //带上欢乐送的openid
				break;
			case 'jilin':
				location.href = 'http://' + location.host + '/jlqp-common/to/vjfhls?s=' + openid + '&provinceQrcode=' + code; //带上欢乐送的openid
				break;
			case 'liaoning':
				location.href = 'http://' + location.host + '/lnqp/to/vjfhls?s=' + openid + '&provinceQrcode=' + code; //带上欢乐送的openid
				break;
			case 'chongqing':
				location.href = 'http://' + location.host + '/cqqp-common/to/vjfhls?s=' + openid + '&provinceQrcode=' + code; //带上欢乐送的openid
				break;	
			default:
				break;
		}
	}

	ini_wxshare(vge.vjfhlsappid);
	// 分享
	var shareimg = 'http://' + location.host + '/v/vjfhls/img2018/logo.png',
		shareurl = location.href + '&shareflag=1';
	wx.ready(function() {
		wx.hideMenuItems({
			menuList: [
				'menuItem:share:timeline'
			]
		});
		set_wxshare(shareimg, '手中有酒，说走就走', '青岛啤酒2018年度酒王之旅', shareurl);
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
		setTimeout(function() {
			$('#toast').hide();
		}, 2000);
	}

	function numtransform(num) {
		var num = Number(num) + '';
		return num.split('');
	}

})()