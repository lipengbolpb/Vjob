var Resloader = (function() {
	var isFunc = function(f) {
		return typeof f === 'function'
	}
	// 构造器函数
	function Resloader(config) {
		this.option = {
			resourceType: 'image', // 资源类型，默认为图片
			baseUrl: window.location.origin, // 基准url
			resources: [], // 资源路径数组
			onStart: null, // 加载开始回调函数，传入参数total
			onProgress: null, // 正在加载回调函数，传入参数currentIndex, total
			onComplete: null // 加载完毕回调函数，传入参数total
		}
		if(config) {
			for(var i in config) {
				this.option[i] = config[i]
			}
		} else {
			alert('参数错误！')
			return
		}
		this.status = 0 // 加载器的状态，0：未启动   1：正在加载   2：加载完毕
		this.total = this.option.resources.length || 0 // 资源总数
		this.currentIndex = 0 // 当前正在加载的资源索引
	}

	Resloader.prototype.start = function() {
		this.status = 1
		var _this = this
		var baseUrl = this.option.baseUrl
		for(var i = 0, l = this.option.resources.length; i < l; i++) {
			var r = this.option.resources[i]
			var url = ''
			if(r.indexOf('http://') === 0 || r.indexOf('https://') === 0) {
				url = r
			} else {
				url = baseUrl + r
			}

			var image = new Image()
			image.onload = function() {
				_this.loaded()
			}
			image.onerror = function() {
				_this.loaded()
			}
			image.src = url
		}
		if(isFunc(this.option.onStart)) {
			this.option.onStart(this.total)
		}
	}

	Resloader.prototype.loaded = function() {
		if(isFunc(this.option.onProgress)) {
			this.option.onProgress(++this.currentIndex, this.total)
		}
		// 加载完毕
		if(this.currentIndex === this.total) {
			if(isFunc(this.option.onComplete)) {
				this.option.onComplete(this.total)
			}
		}
	}

	// 暴露公共方法
	return Resloader
}());
function imgLoad(e) {
	var loader = new Resloader({
		resources: [
			'http://'+location.host+'/v/vjfhls/img2018/0.png',
			'http://'+location.host+'/v/vjfhls/img2018/1.png',
			'http://'+location.host+'/v/vjfhls/img2018/2.png',
			'http://'+location.host+'/v/vjfhls/img2018/3.png',
			'http://'+location.host+'/v/vjfhls/img2018/4.png',
			'http://'+location.host+'/v/vjfhls/img2018/5.png',
			'http://'+location.host+'/v/vjfhls/img2018/6.png',
			'http://'+location.host+'/v/vjfhls/img2018/7.png',
			'http://'+location.host+'/v/vjfhls/img2018/8.png',
			'http://'+location.host+'/v/vjfhls/img2018/9.png',
			'http://'+location.host+'/v/vjfhls/img2018/biaoqing.png',
			'http://'+location.host+'/v/vjfhls/img2018/page_1_bg.png',
			'http://'+location.host+'/v/vjfhls/img2018/page_1_person.png',
			'http://'+location.host+'/v/vjfhls/img2018/page_2_bg.png',
			'http://'+location.host+'/v/vjfhls/img2018/page_2_person_1.png',
			'http://'+location.host+'/v/vjfhls/img2018/page_2_person_2.png',
			'http://'+location.host+'/v/vjfhls/img2018/page_2_person_3.png',
			'http://'+location.host+'/v/vjfhls/img2018/page_3_bg.png',
			'http://'+location.host+'/v/vjfhls/img2018/page_4_bg_b.png',
			'http://'+location.host+'/v/vjfhls/img2018/page_4_bg_s.png',
			'http://'+location.host+'/v/vjfhls/img2018/page_5_bg.png',
			'http://'+location.host+'/v/vjfhls/img2018/page_7_bg.png',
			'http://'+location.host+'/v/vjfhls/img2018/paper.png'
		],
		onStart: function(total) {
			console.log('start:' + total);
		},
		onProgress: function(current, total) {
			console.log(current + '/' + total,(current/total).toFixed(2)*100+'%');
		},
		onComplete: function(total) {
			console.log('imgs load complete');
		}
	})
	loader.start();
}
imgLoad();
