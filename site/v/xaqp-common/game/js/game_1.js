(function(){
	var i=0,c=0,d=0,e=0,timer=null,data = [],txt = '';
	sessionStorage.keys = 0;
	var myAudio = document.getElementById("audio");
	data = [
		'和你左手边的人<br />喝交杯酒',
		'你的初吻年龄',
		'给你手机里从上往下<br />的第5个异性打电话<br />说喜欢他',
		'你的初恋是几岁',
		'蹲在凳子上作便秘状',
		'你吃过自己的鼻涕么',
		'找最高的一位异性<br />互亲嘴角',
		'妻子和妈掉到水里<br />只能救一个你救哪一个',
		'自罚一杯',
		'最奢侈的一次消费<br />是什么',
		'找左手边第二位异性<br />隔纸巾亲嘴3秒',
		'你吻过几个人',
		'用舌头舔肘部',
		'学生妹、女超人、<br />肚兜、女警、护士、<br />旗袍、蕾丝选一个',
		'坐在一位异性大腿上<br />坚持10秒',
		'和异性最深入的接触<br />是什么',
		'和全场身高最高的人<br />喝一杯',
		'你通常用哪只指头<br />挖鼻子',
		'深情的吻墙10秒',
		'巧克力味的粑粑和<br />粑粑味儿的巧克力<br />吃哪个',
		'左手拉右耳<br />右手拉左耳<br />原地转3圈',
		'避孕的方法你知道哪些',
		'找右手边第一位异性<br />靠在墙上撑在上面<br />脸对脸做五下俯卧撑',
		'做过春梦吗',
		'模仿喝一杯烈酒一样<br />喝完一杯啤酒',
		'讲出从小到大做过<br />最丢人的事情',
		'背一位异性绕场一周',
		'如果早上醒来<br />发现自己变性别了<br />你的第一反应是什么',
		'与一位异性十指相扣<br />对视10秒',
		'最后一次尿床是在多大',
		'找右手边第二位女性<br />公主抱5秒钟',
		'走错过男女厕所么',
		'全场干一杯',
		'对自己身体哪个部位<br />最满意',
		'站在凳子上用屁股<br />写一个西藏的藏字',
		'只有三条内裤<br />洗了没干，脏了没洗，<br />不穿,你选择哪个',
		'刚才扫码中<br />最高金额的人<br />在群里发一个红包',
		'拉粑粑手纸捅破了<br />怎么办',
		'对着左手边的第一位<br />异性的耳根敏感部位<br />哈气持续5秒',
		'今天穿的<br />什么颜色的内裤',
		'身材最圆润的人<br />和左手边的人<br />喝一杯',
		'你女票开玩笑坐你脸上<br />放屁不小心崩出一些<br />固体,你怎么办',
		'刚才扫码中<br />最低金额的人<br />唱一首情歌',
		'朋友和男/女朋友<br />那个重要',
		'滴一滴牛奶在嘴角<br />表情销魂<br />然后自拍发朋友圈',
		'假如你在拥挤的电梯<br />里放了一个响屁<br />你会怎样',
		'找一位异性<br />亲吻他/她的额头3下',
		'众目睽睽之下<br />裤子拉链忘拉了<br />怎么办',
		'哥哥你走西口<br />先亲桌上的妹子一口',
		'你的初吻年龄',
		'找在场的一位异性喝一杯',
		'你的初恋是几岁',
		'围着桌子跑一圈<br />大喊<br />我再也不尿床啦',
		'你吃过自己的鼻涕么',
		'自罚三杯',
		'妻子和妈掉到水里<br />只能救一个你救哪一个',
		'带领全桌人合唱《黄土高坡》',
		'最奢侈的一次消费<br />是什么',
		'闻你右手边<br />第一个男性的屁股<br />大喊：好香啊',
		'你吻过几个人',
		'唱《青藏高原》最后一句',
		'和异性最深入的接触<br />是什么',
		'高唱一曲信天游<br />《羊肚子手巾三道道蓝》',
		'你通常用哪只指头<br />挖鼻子',
		'指定本桌<br />最帅的小伙吹瓶',
		'巧克力味的粑粑和<br />粑粑味儿的巧克力<br />吃哪个',
		'和一位戴眼镜的人<br />喝一杯交杯酒',
		'避孕的方法你知道哪些',
		'做一个大家<br />都满意的鬼脸',
		'做过春梦吗',
		'现场任何人均可要求你<br />连干三杯酒',
		'讲出从小到大做过<br />最丢人的事情',
		'用一个成语形容<br />你右手边人的长相',
		'如果早上醒来<br />发现自己变性别了<br />你的第一反应是什么',
		'背对着大家<br />一边扭屁股一边喊<br />洗刷刷洗刷刷',
		'最后一次尿床是在多大',
		'找一位异性<br />单膝下跪表白<br />我要娶/嫁你',
		'走错过男女厕所么',
		'与左手第三位朋友<br />勾着脖子合个交杯酒',
		'对自己身体哪个部位<br />最满意',
		'吃下朋友给你<br />夹的任何菜',
		'只有三条内裤<br />洗了没干，脏了没洗，<br />不穿,你选择哪个',
		'选一个男生<br />一边捶他的胸一边喊<br />你好讨厌哦',
		'拉粑粑手纸捅破了<br />怎么办',
		'做自己最性感<br />最妩媚的表情或动作',
		'今天穿的<br />什么颜色的内裤',
		'抓着门喊<br />“放我出去！”',
		'朋友和男/女朋友<br />那个重要',
		'抱起一位女性<br />女生要用双腿夹住自己',
		'假如你在拥挤的电梯<br />里放了一个响屁<br />你会怎样',
		'摸自己胸说<br />“唉太小了”',
		'众目睽睽之下<br />裤子拉链忘拉了<br />怎么办',
		'左手拉右耳<br />右手拉左耳<br />从桌子底下过',
		'你女票开玩笑坐你脸上<br />放屁不小心崩出一些<br />固体,你怎么办',
		'大声唱儿歌<br />两只小蜜蜂'
		
	];
	
	
	$('#translate').on('click',dot);
	function dot(){
		_hmt.push(['_trackEvent', 'click', '點擊開始', 'game']);
		$('#translate').unbind();
		var a = Math.floor(Math.random()*8+1)*45;//随机转动角度
		var b = Math.floor(Math.random()*data.length);//随机词条
		if(b==sessionStorage.b){
			b +=1;
			b = b >(data.length-1)?0:b;
			sessionStorage.removeItem('b');
		}
		sessionStorage.b = b;
		if(myAudio.paused){
			myAudio.play();
		}else{
			myAudio.src = '/v/game/8378.mp3?v=2';
			myAudio.play();	
		}
		game(a,b);
	}
	function game(a,b){
		d += 1440;//圆盘
		e += (a + 360);//酒瓶
		$('.pan').css('-webkit-transform','rotate('+d+'deg)');
		$('.bottle').css('-webkit-transform','rotate('+(e+10)+'deg)');
		timer = setTimeout(function(){
			if((a/45+Number(sessionStorage.keys))%2==0){
				sessionStorage.keys = 0;
				if(b%2==1){
					txt = data[b];
				}else{
					b = b+1>(data.length-1)?(data.length-1):b+1;
					txt = data[b];
				}
				$('.content').css({'background-image':'url(img/zxh.png)','background-position':'center'});
			}else{
				if(b%2==0){
					txt = data[b];
				}else{
					b = b+1>(data.length-1)?0:b+1;
					txt = data[b];
				}
				sessionStorage.keys = 1;
				$('.content').css({'background-image':'url(img/dmx.png)','background-position':''});
			}
			$('.tip').html(txt);
			clearTimeout(timer);
		},2300);
		$('.alert').delay(2300).fadeIn(1);
	}
	$('#again').on('click',function(){
		$('.alert').fadeOut(100);
		$('#translate').on('click',dot);
	});
	
	
	var timer2 = setInterval(function(){
		i++;
		if(i%2==0){
			$('.light').css('opacity',0);
		}else{
			$('.light').css('opacity',1);
		}
	},500);
})();
