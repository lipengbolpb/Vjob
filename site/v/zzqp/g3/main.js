var GameData = function() {
		function e() {}
		var t = __define,
			a = e,
			r = a.prototype;
		return t(e, "instance", function() {
			return this._instance || (this._instance = new e), this._instance
		}), e.initData = function() {
			e.stageW = egret.MainContext.instance.stage.stageWidth, e.stageH = egret.MainContext.instance.stage.stageHeight, e.gridWidth = e.mapWidth / e.gridColumn * e.gridScale, e.gridHeight = .96 * e.gridWidth, e.mapHeight = e.gridHeight
		}, r.seedSet = function(t) {
			e.seedPer = t
		}, e.levelBackgroundImageName = "bg_jpg", e.roleImage1 = "0_png", e.roleImage2 = "1_png", e.roleImage3 = "2_png", e.stageW = 0, e.stageH = 0, e.roleCompWidth = 332, e.roleCompHeight = 319, e.roleCompPosX = 140, e.roleCompPosY = 20, e.roleList = [1, 2, 3], e.mapWidth = 570, e.mapHeight = 318, e.gridRow = 1, e.gridColumn = 3, e.gridWidth = 0, e.gridHeight = 0, e.gridScale = .9, e.comMorraRand = Math.floor(100 * Math.random() + 1), e
	}();
egret.registerClass(GameData, "GameData");
var RoleLogic = function(e) {
		function t() {
			e.apply(this, arguments)
		}
		__extends(t, e);
		var a = __define,
			r = t,
			i = r.prototype;
		return a(t, "instance", function() {
			return this._instance || (this._instance = new t), this._instance
		}), i.initGame = function() {
			GameData.initData(), this.addChild(GameBackGround.instance), window.gInitialize()
		}, i.startGame = function() {
			for (var e = 0; e < GameData.gridRow; e++) for (var t = 0; t < GameData.gridColumn; t++) {
				var a = GameData.gridWidth * t,
					r = GameData.gridHeight * e;
				GameData.rolebackground = new RoleBackGround(a, r, t), this.addChild(GameData.rolebackground)
			}
			GameData.rolevaryground = new RoleVaryGround, this.addChild(GameData.rolevaryground)
		}, t.randomRole = function() {
			return GameData.roleList[Math.round(Math.random() * (GameData.roleList.length - 1))]
		}, t
	}(egret.DisplayObjectContainer);
egret.registerClass(RoleLogic, "RoleLogic");
var Main = function(e) {
		function t() {
			e.call(this), this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
		}
		__extends(t, e);
		var a = (__define, t),
			r = a.prototype;
		return r.onAddToStage = function(e) {
			RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this), RES.loadConfig("resource/default.res.json", "resource/")
		}, r.onConfigComplete = function(e) {
			RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this), RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this), RES.loadGroup("preload")
		}, r.onResourceLoadComplete = function(e) {
			this.addChild(RoleLogic.instance), RoleLogic.instance.initGame()
		}, t
	}(egret.DisplayObjectContainer);
egret.registerClass(Main, "Main");
var GameBackGround = function(e) {
		function t() {
			e.call(this), this.init()
		}
		__extends(t, e);
		var a = __define,
			r = t,
			i = r.prototype;
		return a(t, "instance", function() {
			return this._instance || (this._instance = new t), this._instance
		}), i.init = function() {
			this.cacheAsBitmap = !1, this.removeChildren(), this.createBackGroundImage(), this.createRoleContainer(), this.cacheAsBitmap = !0
		}, i.createBackGroundImage = function() {
			this.bgImage || (this.bgImage = new egret.Bitmap), this.bgImage.texture = RES.getRes(GameData.levelBackgroundImageName), this.bgImage.width = GameData.stageW, this.bgImage.height = GameData.stageH, this.bgImage.x = 0, this.bgImage.y = 0, this.addChild(this.bgImage)
		}, i.createTimerBg = function() {
			this.scoreboardImage = new egret.Bitmap, this.scoreboardImage.texture = RES.getRes("GameTips_png"), this.scoreboardImage.width = 407, this.scoreboardImage.height = 59, this.scoreboardImage.x = 116.5, this.scoreboardImage.y = 730, this.addChild(this.scoreboardImage)
		}, i.createRoleContainer = function() {
			GameData.roleContainer = new egret.DisplayObjectContainer, GameData.roleContainer.width = GameData.stageW - 60, GameData.roleContainer.height = GameData.roleContainer.width / 3 * 1.08, GameData.roleContainer.x = 85, GameData.roleContainer.y = 824, this.addChild(GameData.roleContainer)
		}, t
	}(egret.DisplayObjectContainer);
egret.registerClass(GameBackGround, "GameBackGround");
var RoleBackGround = function(e) {
		function t(t, a, r) {
			e.call(this), this.init(t, a, r)
		}
		__extends(t, e);
		var a = (__define, t),
			r = a.prototype;
		return r.init = function(e, t, a) {
			this.roleImage || (this.roleImage = new egret.Bitmap), this.roleImage.texture = RES.getRes(a + "_png"), this.roleImage.width = GameData.gridWidth, this.roleImage.height = GameData.gridHeight, this.roleImage.x = e, this.roleImage.y = t, this.roleImage.name = String(a), this.roleImage.touchEnabled = !0, this.roleImage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this, !0), GameData.roleContainer.addChild(this.roleImage)
		}, r.roleTouchEnabled = function(e, t) {
			for (var a = 0; a < e.$parent.$children.length; a++) e.$parent.$children[a].touchEnabled = t
		}, r.roleEffect = function(e, t, a, r) {
			e.scaleX = e.scaleY = r, egret.Tween.get(e).to({
				x: t,
				y: a
			}, 600, egret.Ease.sineIn)
		}, r.morraPerSet = function(e, t) {
			GameData.comMorraRand > GameData.seedPer ? GameData.comMorraNo = e : GameData.comMorraNo = t
		}, r.onTouch = function(e) {
			var t = e.$currentTarget;
			switch (this.roleTouchEnabled(t, !1), GameData.rolevaryground.play(), this.roleEffect(t, 100, -366, 2), Number(t.name)) {
			case 0:
				this.morraPerSet(2, 1);
				break;
			case 1:
				this.morraPerSet(0, 2);
				break;
			case 2:
				this.morraPerSet(1, 0)
			}
			GameData.rolevaryground.role.gotoAndPlay(1, 2);
			var a = 1;
			GameData.rolevaryground.role.addEventListener(egret.Event.COMPLETE, function(e) {
				if (GameData.rolevaryground.role.gotoAndStop(GameData.comMorraNo + 1), a) {
					if (a = 0, GameData.comMorraNo == Number(t.name));
					else {
						var r = Number(t.name) - GameData.comMorraNo;
						r > 0 ? 1 == r ? GameData.isBeat = 2 : GameData.isBeat = 1 : (r = -1 * r, 1 == r ? GameData.isBeat = 1 : GameData.isBeat = 2), setTimeout(window.gOver, 1e3, GameData.isBeat), setTimeout(function() {
							for (var e = 0; e < t.$parent.$children.length; e++) t.$parent.$children[e].touchEnabled = !0
						}, 4e3, 1e3)
					}
					setTimeout(function() {
						t.scaleX = t.scaleY = 1, egret.Tween.get(t).to({
							x: GameData.gridWidth * Number(t.name),
							y: 0
						}, 600, egret.Ease.sineIn)
					}, 3e3, 1e3)
				}
			}, this)
		}, t
	}(egret.Sprite);
egret.registerClass(RoleBackGround, "RoleBackGround");
var RoleCompGround = function(e) {
		function t(t, a, r) {
			e.call(this), this.init(t, a, r)
		}
		__extends(t, e);
		var a = (__define, t),
			r = a.prototype;
		return r.init = function(e, t, a) {
			this.roleCompImage || (this.roleCompImage = new egret.Bitmap), this.roleCompImage.texture = RES.getRes(a + "_png"), this.roleCompImage.width = GameData.roleCompWidth, this.roleCompImage.height = GameData.roleCompHeight, this.roleCompImage.x = e, this.roleCompImage.y = t, this.roleCompImage.rotation = 180, this.addChild(this.roleCompImage)
		}, t
	}(egret.Sprite);
egret.registerClass(RoleCompGround, "RoleCompGround");
var RoleVaryGround = function(e) {
		function t() {
			e.call(this), this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
		}
		__extends(t, e);
		var a = (__define, t),
			r = a.prototype;
		return r.onAddToStage = function(e) {
			this.load(this.initMovieClip), this.loadSound()
		}, r.initMovieClip = function() {
			var e = new egret.MovieClipDataFactory(this._mcData, this._mcTexture);
			this.role = new egret.MovieClip(e.generateMovieClipData("counterchange")), this.addChild(this.role), this.role.x = GameData.roleCompPosX, this.role.y = GameData.roleCompPosY;
			this.role.addEventListener(egret.Event.LOOP_COMPLETE, function(e) {}, this), this.role.addEventListener(egret.MovieClipEvent.FRAME_LABEL, function(e) {}, this)
		}, r.load = function(e) {
			var t = 0,
				a = this,
				r = function() {
					t++, 2 == t && e.call(a)
				},
				i = new egret.URLLoader;
			i.addEventListener(egret.Event.COMPLETE, function(e) {
				var t = e.currentTarget;
				this._mcTexture = t.data, r()
			}, this), i.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
			var n = new egret.URLRequest("resource/fingers.png");
			i.load(n);
			var i = new egret.URLLoader;
			i.addEventListener(egret.Event.COMPLETE, function(e) {
				var t = e.currentTarget;
				this._mcData = JSON.parse(t.data), r()
			}, this), i.dataFormat = egret.URLLoaderDataFormat.TEXT;
			var n = new egret.URLRequest("resource/fingers.json");
			i.load(n)
		}, r.loadSound = function() {
			var e = this._sound = new egret.Sound;
			e.addEventListener(egret.Event.COMPLETE, function(e) {}, this), e.load("resource/click.mp3")
		}, r.play = function() {
			this._sound.play(0, 1)
		}, t
	}(egret.Sprite);
egret.registerClass(RoleVaryGround, "RoleVaryGround");