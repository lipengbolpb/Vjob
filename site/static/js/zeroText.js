(function(e) {
	var app = e;
	app.zeroText = function() {
		var ttList = ['春风十里<br />不如再来一杯', 
			'我喜欢春花秋月冬雪夏阳<br />和每天的你', 
			'七荤八素三朋四友<br />最爱故事就啤酒', 
			'唯心上人与杯中酒<br />不可辜负', 
			'少年时以酒会友<br />而如今酒即是友', 
			'您的幸运正在积累中'],
			a = 0;
		a = Math.floor(Math.random()*ttList.length);
		
		return ttList[a];
	}
	
	app.zeroText2 = function(){
		var ttList2 = ['春风十里<br />不如再来一杯', 
				'你的“啤”气,我最懂<br />定让你“满溢”',
				'跨过十座城，百条河<br />只为跟你碰杯',
				'我喜欢春花秋月<br />冬雪夏阳和每天的你',
				'七荤八素三朋四友<br />最爱故事就啤酒',
				'愿你被世界温柔以待<br />愿每次干杯都有回响',
				'好久没回家<br />有空记得给爸妈去通电话',
				'走遍天下，尝尽山珍<br />最香醇莫过兄弟手中酒',
				'唯心上人与杯中酒<br />不可辜负',
				'少年时以酒会友<br />而如今酒即是友',
				'曾经说走就走<br />而今早已散尽天涯',
				'我以为拥有了所有<br />时间却对我嘿嘿一笑',
			],
			b = 0;
		b = Math.floor(Math.random()*ttList2.length);
		
		return ttList2[b];	
	}
	
	app.zeroText3 = function(){
		var ttList3 = ['有时也会想李白跟我<br />斗啤酒谁更厉害', 
				'天下英雄出我辈<br />不胜人生一场醉',
				'这年头，<br />谁还没点“啤”气？<br />干了它！',
				'知否知否<br />应是故事就啤酒',
				'一骑红尘妃子笑<br />无人知是啤酒来',
				'一口啤酒 回味香与苦<br />就像多年走过的路',
				'当你老了会不会也希望<br />儿女多打电话给你',
				'余生好长<br />你好难忘',
				'如何给对不起加俩字<br />显得更悲伤？<br />对三，要不起',
			],
			c = 0;
		c = Math.floor(Math.random()*ttList3.length);
		
		return ttList3[c];	
	}
	
})(window);
