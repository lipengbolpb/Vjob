var egret;
!
function(t) {
	var e = function(t) {
			function e(e, i, r) {
				t.call(this), this._name = e, this._frame = 0 | i, r && (this._end = 0 | r)
			}
			__extends(e, t);
			var i = __define,
				r = e,
				s = r.prototype;
			return i(s, "name", function() {
				return this._name
			}), i(s, "frame", function() {
				return this._frame
			}), i(s, "end", function() {
				return this._end
			}), s.clone = function() {
				return new e(this._name, this._frame, this._end)
			}, e
		}(t.EventDispatcher);
	t.FrameLabel = e, t.registerClass(e, "egret.FrameLabel")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(e) {
			function i(i) {
				e.call(this), this.$bitmapData = null, this.offsetPoint = t.Point.create(0, 0), this.$movieClipData = null, this.frames = null, this.$totalFrames = 0, this.frameLabels = null, this.$frameLabelStart = 0, this.$frameLabelEnd = 0, this.frameEvents = null, this.frameIntervalTime = 0, this.$eventPool = null, this.$isPlaying = !1, this.isStopped = !0, this.playTimes = 0, this.$currentFrameNum = 0, this.$nextFrameNum = 0, this.displayedKeyFrameNum = 0, this.passedTime = 0, this.$frameRate = 0 / 0, this.lastTime = 0, this.$smoothing = t.Bitmap.defaultSmoothing, this.$renderNode = new t.sys.BitmapNode, this.setMovieClipData(i)
			}
			__extends(i, e);
			var r = __define,
				s = i,
				n = s.prototype;
			return r(n, "smoothing", function() {
				return this.$smoothing
			}, function(t) {
				t = !! t, t != this.$smoothing && (this.$smoothing = t, this.$invalidate())
			}), n.$init = function() {
				this.$reset();
				var t = this.$movieClipData;
				t && t.$isDataValid() && (this.frames = t.frames, this.$totalFrames = t.numFrames, this.frameLabels = t.labels, this.frameEvents = t.events, this.$frameRate != this.$frameRate && (this.$frameRate = t.frameRate), this.frameIntervalTime = 1e3 / this.$frameRate, this._initFrame())
			}, n.$reset = function() {
				this.frames = null, this.playTimes = 0, this.$isPlaying = !1, this.setIsStopped(!0), this.$currentFrameNum = 0, this.$nextFrameNum = 1, this.displayedKeyFrameNum = 0, this.passedTime = 0, this.$eventPool = []
			}, n._initFrame = function() {
				this.$movieClipData.$isTextureValid() && (this.advanceFrame(), this.constructFrame())
			}, n.$render = function() {
				var e = this.$bitmapData;
				if (e) {
					var i = Math.round(this.offsetPoint.x),
						r = Math.round(this.offsetPoint.y),
						s = e._bitmapWidth,
						n = e._bitmapHeight,
						o = e.$getTextureWidth(),
						a = e.$getTextureHeight(),
						h = Math.round(e.$getScaleBitmapWidth()),
						l = Math.round(e.$getScaleBitmapHeight()),
						c = e._sourceWidth,
						u = e._sourceHeight;
					t.sys.BitmapNode.$updateTextureData(this.$renderNode, e._bitmapData, e._bitmapX, e._bitmapY, s, n, i, r, o, a, h, l, c, u, null, t.BitmapFillMode.SCALE, this.$smoothing)
				}
			}, n.$measureContentBounds = function(t) {
				var e = this.$bitmapData;
				if (e) {
					var i = this.offsetPoint.x,
						r = this.offsetPoint.y,
						s = e.$getTextureWidth(),
						n = e.$getTextureHeight();
					t.setTo(i, r, s, n)
				} else t.setEmpty()
			}, n.$onAddToStage = function(t, i) {
				e.prototype.$onAddToStage.call(this, t, i), this.$isPlaying && this.$totalFrames > 1 && this.setIsStopped(!1)
			}, n.$onRemoveFromStage = function() {
				e.prototype.$onRemoveFromStage.call(this), this.setIsStopped(!0)
			}, n.getFrameLabelByName = function(t, e) {
				void 0 === e && (e = !1), e && (t = t.toLowerCase());
				var i = this.frameLabels;
				if (i) for (var r = null, s = 0; s < i.length; s++) if (r = i[s], e ? r.name.toLowerCase() == t : r.name == t) return r;
				return null
			}, n.getFrameStartEnd = function(t) {
				var e = this.frameLabels;
				if (e) for (var i = null, r = 0; r < e.length; r++) if (i = e[r], t == i.name) {
					this.$frameLabelStart = i.frame, this.$frameLabelEnd = i.end;
					break
				}
			}, n.getFrameLabelByFrame = function(t) {
				var e = this.frameLabels;
				if (e) for (var i = null, r = 0; r < e.length; r++) if (i = e[r], i.frame == t) return i;
				return null
			}, n.getFrameLabelForFrame = function(t) {
				var e = null,
					i = null,
					r = this.frameLabels;
				if (r) for (var s = 0; s < r.length; s++) {
					if (i = r[s], i.frame > t) return e;
					e = i
				}
				return e
			}, n.play = function(t) {
				void 0 === t && (t = 0), this.$isPlaying = !0, this.setPlayTimes(t), this.$totalFrames > 1 && this.$stage && this.setIsStopped(!1)
			}, n.stop = function() {
				this.$isPlaying = !1, this.setIsStopped(!0)
			}, n.prevFrame = function() {
				this.gotoAndStop(this.$currentFrameNum - 1)
			}, n.nextFrame = function() {
				this.gotoAndStop(this.$currentFrameNum + 1)
			}, n.gotoAndPlay = function(e, i) {
				void 0 === i && (i = 0), (0 == arguments.length || arguments.length > 2) && t.$error(1022, "MovieClip.gotoAndPlay()"), "string" == typeof e ? this.getFrameStartEnd(e) : (this.$frameLabelStart = 0, this.$frameLabelEnd = 0), this.play(i), this.gotoFrame(e)
			}, n.gotoAndStop = function(e) {
				1 != arguments.length && t.$error(1022, "MovieClip.gotoAndStop()"), this.stop(), this.gotoFrame(e)
			}, n.gotoFrame = function(e) {
				var i;
				"string" == typeof e ? i = this.getFrameLabelByName(e).frame : (i = parseInt(e + "", 10), i != e && t.$error(1022, "Frame Label Not Found")), 1 > i ? i = 1 : i > this.$totalFrames && (i = this.$totalFrames), i != this.$nextFrameNum && (this.$nextFrameNum = i, this.advanceFrame(), this.constructFrame(), this.handlePendingEvent())
			}, n.advanceTime = function(e) {
				var i = this,
					r = e - i.lastTime;
				i.lastTime = e;
				var s = i.frameIntervalTime,
					n = i.passedTime + r;
				i.passedTime = n % s;
				var o = n / s;
				if (1 > o) return !1;
				for (var a; o >= 1;) {
					if (o--, i.$nextFrameNum++, a = this.frameEvents[i.$nextFrameNum], a && "" != a && t.MovieClipEvent.dispatchMovieClipEvent(i, t.MovieClipEvent.FRAME_LABEL, a), i.$nextFrameNum > i.$totalFrames || i.$frameLabelStart > 0 && i.$nextFrameNum > i.$frameLabelEnd) if (-1 == i.playTimes) i.$eventPool.push(t.Event.LOOP_COMPLETE), i.$nextFrameNum = 1;
					else {
						if (i.playTimes--, !(i.playTimes > 0)) {
							i.$nextFrameNum = i.$totalFrames, i.$eventPool.push(t.Event.COMPLETE), i.stop();
							break
						}
						i.$eventPool.push(t.Event.LOOP_COMPLETE), i.$nextFrameNum = 1
					}
					i.$currentFrameNum == i.$frameLabelEnd && (i.$nextFrameNum = i.$frameLabelStart), i.advanceFrame()
				}
				return i.constructFrame(), i.handlePendingEvent(), !1
			}, n.advanceFrame = function() {
				this.$currentFrameNum = this.$nextFrameNum
			}, n.constructFrame = function() {
				var t = this.$currentFrameNum;
				this.displayedKeyFrameNum != t && (this.$bitmapData = this.$movieClipData.getTextureByFrame(t), this.$movieClipData.$getOffsetByFrame(t, this.offsetPoint), this.$invalidateContentBounds(), this.displayedKeyFrameNum = t)
			}, n.$renderFrame = function() {
				this.$bitmapData = this.$movieClipData.getTextureByFrame(this.$currentFrameNum), this.$invalidateContentBounds()
			}, n.handlePendingEvent = function() {
				if (0 != this.$eventPool.length) {
					this.$eventPool.reverse();
					for (var e = this.$eventPool, i = e.length, r = !1, s = !1, n = 0; i > n; n++) {
						var o = e.pop();
						o == t.Event.LOOP_COMPLETE ? s = !0 : o == t.Event.COMPLETE ? r = !0 : this.dispatchEventWith(o)
					}
					s && this.dispatchEventWith(t.Event.LOOP_COMPLETE), r && this.dispatchEventWith(t.Event.COMPLETE)
				}
			}, r(n, "totalFrames", function() {
				return this.$totalFrames
			}), r(n, "currentFrame", function() {
				return this.$currentFrameNum
			}), r(n, "currentFrameLabel", function() {
				var t = this.getFrameLabelByFrame(this.$currentFrameNum);
				return t && t.name
			}), r(n, "currentLabel", function() {
				var t = this.getFrameLabelForFrame(this.$currentFrameNum);
				return t ? t.name : null
			}), r(n, "frameRate", function() {
				return this.$frameRate
			}, function(t) {
				t != this.$frameRate && (this.$frameRate = t, this.frameIntervalTime = 1e3 / this.$frameRate)
			}), r(n, "isPlaying", function() {
				return this.$isPlaying
			}), r(n, "movieClipData", function() {
				return this.$movieClipData
			}, function(t) {
				this.setMovieClipData(t)
			}), n.setMovieClipData = function(t) {
				this.$movieClipData != t && (this.$movieClipData = t, this.$init())
			}, n.setPlayTimes = function(t) {
				(0 > t || t >= 1) && (this.playTimes = 0 > t ? -1 : Math.floor(t))
			}, n.setIsStopped = function(e) {
				this.isStopped != e && (this.isStopped = e, e ? (this.playTimes = 0, t.sys.$ticker.$stopTick(this.advanceTime, this)) : (this.playTimes = 0 == this.playTimes ? 1 : this.playTimes, this.lastTime = t.getTimer(), t.sys.$ticker.$startTick(this.advanceTime, this)))
			}, i
		}(t.DisplayObject);
	t.MovieClip = e, t.registerClass(e, "egret.MovieClip")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(e) {
			function i() {
				e.call(this), this.$mcData = null, this.numFrames = 1, this.frames = [], this.labels = null, this.events = [], this.frameRate = 0, this.textureData = null, this.spriteSheet = null
			}
			__extends(i, e);
			var r = __define,
				s = i,
				n = s.prototype;
			return n.$init = function(t, e, i) {
				this.textureData = e, this.spriteSheet = i, this.setMCData(t)
			}, n.getKeyFrameData = function(t) {
				var e = this.frames[t - 1];
				return e.frame && (e = this.frames[e.frame - 1]), e
			}, n.getTextureByFrame = function(t) {
				var e = this.getKeyFrameData(t);
				if (e.res) {
					var i = this.getTextureByResName(e.res);
					return i
				}
				return null
			}, n.$getOffsetByFrame = function(t, e) {
				var i = this.getKeyFrameData(t);
				i.res && e.setTo(0 | i.x, 0 | i.y)
			}, n.getTextureByResName = function(t) {
				if (null == this.spriteSheet) return null;
				var e = this.spriteSheet.getTexture(t);
				if (!e) {
					var i = this.textureData[t];
					e = this.spriteSheet.createTexture(t, i.x, i.y, i.w, i.h)
				}
				return e
			}, n.$isDataValid = function() {
				return this.frames.length > 0
			}, n.$isTextureValid = function() {
				return null != this.textureData && null != this.spriteSheet
			}, n.$fillMCData = function(t) {
				this.frameRate = t.frameRate || 24, this.fillFramesData(t.frames), this.fillFrameLabelsData(t.labels), this.fillFrameEventsData(t.events)
			}, n.fillFramesData = function(t) {
				for (var e, i = this.frames, r = t ? t.length : 0, s = 0; r > s; s++) {
					var n = t[s];
					if (i.push(n), n.duration) {
						var o = parseInt(n.duration);
						if (o > 1) {
							e = i.length;
							for (var a = 1; o > a; a++) i.push({
								frame: e
							})
						}
					}
				}
				this.numFrames = i.length
			}, n.fillFrameLabelsData = function(e) {
				if (e) {
					var i = e.length;
					if (i > 0) {
						this.labels = [];
						for (var r = 0; i > r; r++) {
							var s = e[r];
							this.labels.push(new t.FrameLabel(s.name, s.frame, s.end))
						}
					}
				}
			}, n.fillFrameEventsData = function(t) {
				if (t) {
					var e = t.length;
					if (e > 0) {
						this.events = [];
						for (var i = 0; e > i; i++) {
							var r = t[i];
							this.events[r.frame] = r.name
						}
					}
				}
			}, r(n, "mcData", function() {
				return this.$mcData
			}, function(t) {
				this.setMCData(t)
			}), n.setMCData = function(t) {
				this.$mcData != t && (this.$mcData = t, t && this.$fillMCData(t))
			}, i
		}(t.HashObject);
	t.MovieClipData = e, t.registerClass(e, "egret.MovieClipData")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(e) {
			function i(t, i) {
				e.call(this), this.enableCache = !0, this.$mcDataCache = {}, this.$mcDataSet = t, this.setTexture(i)
			}
			__extends(i, e);
			var r = __define,
				s = i,
				n = s.prototype;
			return n.clearCache = function() {
				this.$mcDataCache = {}
			}, n.generateMovieClipData = function(e) {
				if (void 0 === e && (e = ""), "" == e && this.$mcDataSet) for (e in this.$mcDataSet.mc) break;
				if ("" == e) return null;
				var i = this.findFromCache(e, this.$mcDataCache);
				return i || (i = new t.MovieClipData, this.fillData(e, i, this.$mcDataCache)), i
			}, n.findFromCache = function(t, e) {
				return this.enableCache && e[t] ? e[t] : null
			}, n.fillData = function(t, e, i) {
				if (this.$mcDataSet) {
					var r = this.$mcDataSet.mc[t];
					r && (e.$init(r, this.$mcDataSet.res, this.$spriteSheet), this.enableCache && (i[t] = e))
				}
			}, r(n, "mcDataSet", function() {
				return this.$mcDataSet
			}, function(t) {
				this.$mcDataSet = t
			}), r(n, "texture", void 0, function(t) {
				this.setTexture(t)
			}), r(n, "spriteSheet", function() {
				return this.$spriteSheet
			}), n.setTexture = function(e) {
				this.$spriteSheet = e ? new t.SpriteSheet(e) : null
			}, i
		}(t.EventDispatcher);
	t.MovieClipDataFactory = e, t.registerClass(e, "egret.MovieClipDataFactory")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(e) {
			function i(t, i, r, s) {
				void 0 === i && (i = !1), void 0 === r && (r = !1), void 0 === s && (s = null), e.call(this, t, i, r), this.frameLabel = null, this.frameLabel = s
			}
			__extends(i, e);
			var r = (__define, i);
			r.prototype;
			return i.dispatchMovieClipEvent = function(e, r, s) {
				void 0 === s && (s = null);
				var n = t.Event.create(i, r);
				n.frameLabel = s;
				var o = e.dispatchEvent(n);
				return t.Event.release(n), o
			}, i.FRAME_LABEL = "frame_label", i
		}(t.Event);
	t.MovieClipEvent = e, t.registerClass(e, "egret.MovieClipEvent")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function() {
			function e() {
				t.$error(1014)
			}
			var i = (__define, e);
			i.prototype;
			return e.get = function(t) {
				return -1 > t && (t = -1), t > 1 && (t = 1), function(e) {
					return 0 == t ? e : 0 > t ? e * (e * -t + 1 + t) : e * ((2 - e) * t + (1 - t))
				}
			}, e.getPowOut = function(t) {
				return function(e) {
					return 1 - Math.pow(1 - e, t)
				}
			}, e.quintOut = e.getPowOut(5), e.quartOut = e.getPowOut(4), e
		}();
	t.ScrollEase = e, t.registerClass(e, "egret.ScrollEase");
	var i = function(e) {
			function i(t, i, r) {
				e.call(this), this._target = null, this._useTicks = !1, this.ignoreGlobalPause = !1, this.loop = !1, this.pluginData = null, this._steps = null, this._actions = null, this.paused = !1, this.duration = 0, this._prevPos = -1, this.position = null, this._prevPosition = 0, this._stepPosition = 0, this.passive = !1, this.initialize(t, i, r)
			}
			__extends(i, e);
			var r = (__define, i),
				s = r.prototype;
			return i.get = function(t, e, r, s) {
				return void 0 === e && (e = null), void 0 === r && (r = null), void 0 === s && (s = !1), s && i.removeTweens(t), new i(t, e, r)
			}, i.removeTweens = function(t) {
				if (t.tween_count) {
					for (var e = i._tweens, r = e.length - 1; r >= 0; r--) e[r]._target == t && (e[r].paused = !0, e.splice(r, 1));
					t.tween_count = 0
				}
			}, i.tick = function(t, e) {
				void 0 === e && (e = !1);
				var r = t - i._lastTime;
				i._lastTime = t;
				for (var s = i._tweens.concat(), n = s.length - 1; n >= 0; n--) {
					var o = s[n];
					e && !o.ignoreGlobalPause || o.paused || o.tick(o._useTicks ? 1 : r)
				}
				return !1
			}, i._register = function(e, r) {
				var s = e._target,
					n = i._tweens;
				if (r) s && (s.tween_count = s.tween_count > 0 ? s.tween_count + 1 : 1), n.push(e), i._inited || (i._lastTime = t.getTimer(), t.sys.$ticker.$startTick(i.tick, null), i._inited = !0);
				else {
					s && s.tween_count--;
					for (var o = n.length; o--;) if (n[o] == e) return void n.splice(o, 1)
				}
			}, s.initialize = function(t, e, r) {
				this._target = t, e && (this._useTicks = e.useTicks, this.ignoreGlobalPause = e.ignoreGlobalPause, this.loop = e.loop, e.onChange && this.addEventListener("change", e.onChange, e.onChangeObj), e.override && i.removeTweens(t)), this.pluginData = r || {}, this._curQueueProps = {}, this._initQueueProps = {}, this._steps = [], this._actions = [], e && e.paused ? this.paused = !0 : i._register(this, !0), e && null != e.position && this.setPosition(e.position)
			}, s.setPosition = function(t, e) {
				void 0 === e && (e = 1), 0 > t && (t = 0);
				var i = t,
					r = !1;
				if (i >= this.duration && (this.loop ? i %= this.duration : (i = this.duration, r = !0)), i == this._prevPos) return r;
				var s = this._prevPos;
				if (this.position = this._prevPos = i, this._prevPosition = t, this._target) if (r) this._updateTargetProps(null, 1);
				else if (this._steps.length > 0) {
					var n = void 0,
						o = this._steps.length;
					for (n = 0; o > n && !(this._steps[n].t > i); n++);
					var a = this._steps[n - 1];
					this._updateTargetProps(a, (this._stepPosition = i - a.t) / a.d)
				}
				return r && this.setPaused(!0), 0 != e && this._actions.length > 0 && (this._useTicks ? this._runActions(i, i) : 1 == e && s > i ? (s != this.duration && this._runActions(s, this.duration), this._runActions(0, i, !0)) : this._runActions(s, i)), this.dispatchEventWith("change"), r
			}, s._runActions = function(t, e, i) {
				void 0 === i && (i = !1);
				var r = t,
					s = e,
					n = -1,
					o = this._actions.length,
					a = 1;
				for (t > e && (r = e, s = t, n = o, o = a = -1);
				(n += a) != o;) {
					var h = this._actions[n],
						l = h.t;
					(l == s || l > r && s > l || i && l == t) && h.f.apply(h.o, h.p)
				}
			}, s._updateTargetProps = function(t, e) {
				var r, s, n, o, a, h;
				if (t || 1 != e) {
					if (this.passive = !! t.v, this.passive) return;
					t.e && (e = t.e(e, 0, 1, 1)), r = t.p0, s = t.p1
				} else this.passive = !1, r = s = this._curQueueProps;
				for (var l in this._initQueueProps) {
					null == (o = r[l]) && (r[l] = o = this._initQueueProps[l]), null == (a = s[l]) && (s[l] = a = o), n = o == a || 0 == e || 1 == e || "number" != typeof o ? 1 == e ? a : o : o + (a - o) * e;
					var c = !1;
					if (h = i._plugins[l]) for (var u = 0, _ = h.length; _ > u; u++) {
						var p = h[u].tween(this, l, n, r, s, e, !! t && r == s, !t);
						p == i.IGNORE ? c = !0 : n = p
					}
					c || (this._target[l] = n)
				}
			}, s.setPaused = function(t) {
				return this.paused = t, i._register(this, !t), this
			}, s._cloneProps = function(t) {
				var e = {};
				for (var i in t) e[i] = t[i];
				return e
			}, s._addStep = function(t) {
				return t.d > 0 && (this._steps.push(t), t.t = this.duration, this.duration += t.d), this
			}, s._appendQueueProps = function(t) {
				var e, r, s, n, o;
				for (var a in t) if (void 0 === this._initQueueProps[a]) {
					if (r = this._target[a], e = i._plugins[a]) for (s = 0, n = e.length; n > s; s++) r = e[s].init(this, a, r);
					this._initQueueProps[a] = this._curQueueProps[a] = void 0 === r ? null : r
				} else r = this._curQueueProps[a];
				for (var a in t) {
					if (r = this._curQueueProps[a], e = i._plugins[a]) for (o = o || {}, s = 0, n = e.length; n > s; s++) e[s].step && e[s].step(this, a, r, t[a], o);
					this._curQueueProps[a] = t[a]
				}
				return o && this._appendQueueProps(o), this._curQueueProps
			}, s._addAction = function(t) {
				return t.t = this.duration, this._actions.push(t), this
			}, s.to = function(t, e, i) {
				return void 0 === i && (i = void 0), (isNaN(e) || 0 > e) && (e = 0), this._addStep({
					d: e || 0,
					p0: this._cloneProps(this._curQueueProps),
					e: i,
					p1: this._cloneProps(this._appendQueueProps(t))
				})
			}, s.call = function(t, e, i) {
				return void 0 === e && (e = void 0), void 0 === i && (i = void 0), this._addAction({
					f: t,
					p: i ? i : [],
					o: e ? e : this._target
				})
			}, s.tick = function(t) {
				this.paused || this.setPosition(this._prevPosition + t)
			}, i._tweens = [], i.IGNORE = {}, i._plugins = {}, i._inited = !1, i._lastTime = 0, i
		}(t.EventDispatcher);
	t.ScrollTween = i, t.registerClass(i, "egret.ScrollTween")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(e) {
			function i(i) {
				void 0 === i && (i = null), e.call(this), this.scrollBeginThreshold = 10, this.scrollSpeed = 1, this._content = null, this.delayTouchBeginEvent = null, this.touchBeginTimer = null, this.touchEnabled = !0, this._ScrV_Props_ = new t.ScrollViewProperties, i && this.setContent(i)
			}
			__extends(i, e);
			var r = __define,
				s = i,
				n = s.prototype;
			return r(n, "bounces", function() {
				return this._ScrV_Props_._bounces
			}, function(t) {
				this._ScrV_Props_._bounces = !! t
			}), n.setContent = function(t) {
				this._content !== t && (this.removeContent(), t && (this._content = t, e.prototype.addChild.call(this, t), this._addEvents()))
			}, n.removeContent = function() {
				this._content && (this._removeEvents(), e.prototype.removeChildAt.call(this, 0)), this._content = null
			}, r(n, "verticalScrollPolicy", function() {
				return this._ScrV_Props_._verticalScrollPolicy
			}, function(t) {
				t != this._ScrV_Props_._verticalScrollPolicy && (this._ScrV_Props_._verticalScrollPolicy = t)
			}), r(n, "horizontalScrollPolicy", function() {
				return this._ScrV_Props_._horizontalScrollPolicy
			}, function(t) {
				t != this._ScrV_Props_._horizontalScrollPolicy && (this._ScrV_Props_._horizontalScrollPolicy = t)
			}), r(n, "scrollLeft", function() {
				return this._ScrV_Props_._scrollLeft
			}, function(t) {
				t != this._ScrV_Props_._scrollLeft && (this._ScrV_Props_._scrollLeft = t, this._validatePosition(!1, !0), this._updateContentPosition())
			}), r(n, "scrollTop", function() {
				return this._ScrV_Props_._scrollTop
			}, function(t) {
				t != this._ScrV_Props_._scrollTop && (this._ScrV_Props_._scrollTop = t, this._validatePosition(!0, !1), this._updateContentPosition())
			}), n.setScrollPosition = function(t, e, i) {
				if (void 0 === i && (i = !1), (!i || 0 != t || 0 != e) && (i || this._ScrV_Props_._scrollTop != t || this._ScrV_Props_._scrollLeft != e)) {
					var r = this._ScrV_Props_._scrollTop,
						s = this._ScrV_Props_._scrollLeft;
					if (i) {
						var n = this.getMaxScrollLeft(),
							o = this.getMaxScrollTop();
						(0 >= r || r >= o) && (t /= 2), (0 >= s || s >= n) && (e /= 2);
						var a = r + t,
							h = s + e,
							l = this._ScrV_Props_._bounces;
						l || ((0 >= a || a >= o) && (a = Math.max(0, Math.min(a, o))), (0 >= h || h >= n) && (h = Math.max(0, Math.min(h, n)))), this._ScrV_Props_._scrollTop = a, this._ScrV_Props_._scrollLeft = h
					} else this._ScrV_Props_._scrollTop = t, this._ScrV_Props_._scrollLeft = e;
					this._validatePosition(!0, !0), this._updateContentPosition()
				}
			}, n._validatePosition = function(t, e) {
				if (void 0 === t && (t = !1), void 0 === e && (e = !1), t) {
					var i = this.height,
						r = this._getContentHeight();
					this._ScrV_Props_._scrollTop = Math.max(this._ScrV_Props_._scrollTop, (0 - i) / 2), this._ScrV_Props_._scrollTop = Math.min(this._ScrV_Props_._scrollTop, r > i ? r - i / 2 : i / 2)
				}
				if (e) {
					var s = this.width,
						n = this._getContentWidth();
					this._ScrV_Props_._scrollLeft = Math.max(this._ScrV_Props_._scrollLeft, (0 - s) / 2), this._ScrV_Props_._scrollLeft = Math.min(this._ScrV_Props_._scrollLeft, n > s ? n - s / 2 : s / 2)
				}
			}, n.$setWidth = function(t) {
				if (this.$getExplicitWidth() == t) return !1;
				var i = e.prototype.$setWidth.call(this, t);
				return this._updateContentPosition(), i
			}, n.$setHeight = function(t) {
				if (this.$getExplicitHeight() == t) return !1;
				e.prototype.$setHeight.call(this, t);
				return this._updateContentPosition(), !0
			}, n._updateContentPosition = function() {
				var e = this.height,
					i = this.width;
				this.scrollRect = new t.Rectangle(Math.round(this._ScrV_Props_._scrollLeft), Math.round(this._ScrV_Props_._scrollTop), i, e), this.dispatchEvent(new t.Event(t.Event.CHANGE))
			}, n._checkScrollPolicy = function() {
				var t = this._ScrV_Props_._horizontalScrollPolicy,
					e = this.__checkScrollPolicy(t, this._getContentWidth(), this.width);
				this._ScrV_Props_._hCanScroll = e;
				var i = this._ScrV_Props_._verticalScrollPolicy,
					r = this.__checkScrollPolicy(i, this._getContentHeight(), this.height);
				return this._ScrV_Props_._vCanScroll = r, e || r
			}, n.__checkScrollPolicy = function(t, e, i) {
				return "on" == t ? !0 : "off" == t ? !1 : e > i
			}, n._addEvents = function() {
				this.addEventListener(t.TouchEvent.TOUCH_BEGIN, this._onTouchBegin, this), this.addEventListener(t.TouchEvent.TOUCH_BEGIN, this._onTouchBeginCapture, this, !0), this.addEventListener(t.TouchEvent.TOUCH_END, this._onTouchEndCapture, this, !0)
			}, n._removeEvents = function() {
				this.removeEventListener(t.TouchEvent.TOUCH_BEGIN, this._onTouchBegin, this), this.removeEventListener(t.TouchEvent.TOUCH_BEGIN, this._onTouchBeginCapture, this, !0), this.removeEventListener(t.TouchEvent.TOUCH_END, this._onTouchEndCapture, this, !0)
			}, n._onTouchBegin = function(e) {
				if (!e.$isDefaultPrevented) {
					var i = this._checkScrollPolicy();
					i && (this._ScrV_Props_._touchStartPosition.x = e.stageX, this._ScrV_Props_._touchStartPosition.y = e.stageY, (this._ScrV_Props_._isHTweenPlaying || this._ScrV_Props_._isVTweenPlaying) && this._onScrollFinished(), this._tempStage = this.stage, this._tempStage.addEventListener(t.TouchEvent.TOUCH_MOVE, this._onTouchMove, this), this._tempStage.addEventListener(t.TouchEvent.TOUCH_END, this._onTouchEnd, this), this._tempStage.addEventListener(t.TouchEvent.LEAVE_STAGE, this._onTouchEnd, this), this.addEventListener(t.Event.ENTER_FRAME, this._onEnterFrame, this), this._logTouchEvent(e), e.preventDefault())
				}
			}, n._onTouchBeginCapture = function(e) {
				var i = this._checkScrollPolicy();
				if (i) {
					for (var r = e.target; r != this;) {
						if ("_checkScrollPolicy" in r && (i = r._checkScrollPolicy())) return;
						r = r.parent
					}
					e.stopPropagation();
					var s = this.cloneTouchEvent(e);
					this.delayTouchBeginEvent = s, this.touchBeginTimer || (this.touchBeginTimer = new t.Timer(100, 1), this.touchBeginTimer.addEventListener(t.TimerEvent.TIMER_COMPLETE, this._onTouchBeginTimer, this)), this.touchBeginTimer.start(), this._onTouchBegin(e)
				}
			}, n._onTouchEndCapture = function(e) {
				var i = this;
				if (this.delayTouchBeginEvent) {
					this._onTouchBeginTimer(), e.stopPropagation();
					var r = this.cloneTouchEvent(e);
					t.callLater(function() {
						i.stage && i.dispatchPropagationEvent(r)
					}, this)
				}
			}, n._onTouchBeginTimer = function() {
				this.touchBeginTimer.stop();
				var t = this.delayTouchBeginEvent;
				this.delayTouchBeginEvent = null, this.stage && this.dispatchPropagationEvent(t)
			}, n.dispatchPropagationEvent = function(e) {
				for (var i = e.$target, r = this.$getPropagationList(i), s = r.length, n = .5 * r.length, o = -1, a = 0; s > a; a++) if (r[a] === this._content) {
					o = a;
					break
				}
				r.splice(0, o + 1), n -= o + 1, this.$dispatchPropagationEvent(e, r, n), t.Event.release(e)
			}, n._onTouchMove = function(t) {
				if (this._ScrV_Props_._lastTouchPosition.x != t.stageX || this._ScrV_Props_._lastTouchPosition.y != t.stageY) {
					if (!this._ScrV_Props_._scrollStarted) {
						var e = t.stageX - this._ScrV_Props_._touchStartPosition.x,
							i = t.stageY - this._ScrV_Props_._touchStartPosition.y,
							r = Math.sqrt(e * e + i * i);
						if (r < this.scrollBeginThreshold) return void this._logTouchEvent(t)
					}
					this._ScrV_Props_._scrollStarted = !0, this.delayTouchBeginEvent && (this.delayTouchBeginEvent = null, this.touchBeginTimer.stop()), this.touchChildren = !1;
					var s = this._getPointChange(t);
					this.setScrollPosition(s.y, s.x, !0), this._calcVelocitys(t), this._logTouchEvent(t)
				}
			}, n._onTouchEnd = function(e) {
				this.touchChildren = !0, this._ScrV_Props_._scrollStarted = !1, this._tempStage.removeEventListener(t.TouchEvent.TOUCH_MOVE, this._onTouchMove, this), this._tempStage.removeEventListener(t.TouchEvent.TOUCH_END, this._onTouchEnd, this), this._tempStage.removeEventListener(t.TouchEvent.LEAVE_STAGE, this._onTouchEnd, this), this.removeEventListener(t.Event.ENTER_FRAME, this._onEnterFrame, this), this._moveAfterTouchEnd()
			}, n._onEnterFrame = function(e) {
				var i = t.getTimer();
				i - this._ScrV_Props_._lastTouchTime > 100 && i - this._ScrV_Props_._lastTouchTime < 300 && this._calcVelocitys(this._ScrV_Props_._lastTouchEvent)
			}, n._logTouchEvent = function(e) {
				this._ScrV_Props_._lastTouchPosition.x = e.stageX, this._ScrV_Props_._lastTouchPosition.y = e.stageY, this._ScrV_Props_._lastTouchEvent = this.cloneTouchEvent(e), this._ScrV_Props_._lastTouchTime = t.getTimer()
			}, n._getPointChange = function(t) {
				return {
					x: this._ScrV_Props_._hCanScroll === !1 ? 0 : this._ScrV_Props_._lastTouchPosition.x - t.stageX,
					y: this._ScrV_Props_._vCanScroll === !1 ? 0 : this._ScrV_Props_._lastTouchPosition.y - t.stageY
				}
			}, n._calcVelocitys = function(e) {
				var i = t.getTimer();
				if (0 == this._ScrV_Props_._lastTouchTime) return void(this._ScrV_Props_._lastTouchTime = i);
				var r = this._getPointChange(e),
					s = i - this._ScrV_Props_._lastTouchTime;
				r.x /= s, r.y /= s, this._ScrV_Props_._velocitys.push(r), this._ScrV_Props_._velocitys.length > 5 && this._ScrV_Props_._velocitys.shift(), this._ScrV_Props_._lastTouchPosition.x = e.stageX, this._ScrV_Props_._lastTouchPosition.y = e.stageY
			}, n._getContentWidth = function() {
				return this._content.$getExplicitWidth() || this._content.width
			}, n._getContentHeight = function() {
				return this._content.$getExplicitHeight() || this._content.height
			}, n.getMaxScrollLeft = function() {
				var t = this._getContentWidth() - this.width;
				return Math.max(0, t)
			}, n.getMaxScrollTop = function() {
				var t = this._getContentHeight() - this.height;
				return Math.max(0, t)
			}, n._moveAfterTouchEnd = function() {
				if (0 != this._ScrV_Props_._velocitys.length) {
					for (var t = {
						x: 0,
						y: 0
					}, e = 0, r = 0; r < this._ScrV_Props_._velocitys.length; r++) {
						var s = this._ScrV_Props_._velocitys[r],
							n = i.weight[r];
						t.x += s.x * n, t.y += s.y * n, e += n
					}
					this._ScrV_Props_._velocitys.length = 0, this.scrollSpeed <= 0 && (this.scrollSpeed = 1);
					var o = t.x / e * this.scrollSpeed,
						a = t.y / e * this.scrollSpeed,
						h = Math.abs(o),
						l = Math.abs(a),
						c = this.getMaxScrollLeft(),
						u = this.getMaxScrollTop(),
						_ = h > .02 ? this.getAnimationDatas(o, this._ScrV_Props_._scrollLeft, c) : {
							position: this._ScrV_Props_._scrollLeft,
							duration: 1
						},
						p = l > .02 ? this.getAnimationDatas(a, this._ScrV_Props_._scrollTop, u) : {
							position: this._ScrV_Props_._scrollTop,
							duration: 1
						};
					this.setScrollLeft(_.position, _.duration), this.setScrollTop(p.position, p.duration)
				}
			}, n.onTweenFinished = function(t) {
				t == this._ScrV_Props_._vScrollTween && (this._ScrV_Props_._isVTweenPlaying = !1), t == this._ScrV_Props_._hScrollTween && (this._ScrV_Props_._isHTweenPlaying = !1), 0 == this._ScrV_Props_._isHTweenPlaying && 0 == this._ScrV_Props_._isVTweenPlaying && this._onScrollFinished()
			}, n._onScrollStarted = function() {}, n._onScrollFinished = function() {
				t.ScrollTween.removeTweens(this), this._ScrV_Props_._hScrollTween = null, this._ScrV_Props_._vScrollTween = null, this._ScrV_Props_._isHTweenPlaying = !1, this._ScrV_Props_._isVTweenPlaying = !1, this.dispatchEvent(new t.Event(t.Event.COMPLETE))
			}, n.setScrollTop = function(e, i) {
				void 0 === i && (i = 0);
				var r = Math.min(this.getMaxScrollTop(), Math.max(e, 0));
				if (0 == i) return void(this.scrollTop = r);
				0 == this._ScrV_Props_._bounces && (e = r);
				var s = t.ScrollTween.get(this).to({
					scrollTop: e
				}, i, t.ScrollEase.quartOut);
				r != e && s.to({
					scrollTop: r
				}, 300, t.ScrollEase.quintOut), this._ScrV_Props_._isVTweenPlaying = !0, this._ScrV_Props_._vScrollTween = s, s.call(this.onTweenFinished, this, [s]), this._ScrV_Props_._isHTweenPlaying || this._onScrollStarted()
			}, n.setScrollLeft = function(e, i) {
				void 0 === i && (i = 0);
				var r = Math.min(this.getMaxScrollLeft(), Math.max(e, 0));
				if (0 == i) return void(this.scrollLeft = r);
				0 == this._ScrV_Props_._bounces && (e = r);
				var s = t.ScrollTween.get(this).to({
					scrollLeft: e
				}, i, t.ScrollEase.quartOut);
				r != e && s.to({
					scrollLeft: r
				}, 300, t.ScrollEase.quintOut), this._ScrV_Props_._isHTweenPlaying = !0, this._ScrV_Props_._hScrollTween = s, s.call(this.onTweenFinished, this, [s]), this._ScrV_Props_._isVTweenPlaying || this._onScrollStarted()
			}, n.getAnimationDatas = function(t, e, i) {
				var r = Math.abs(t),
					s = .95,
					n = 0,
					o = .998,
					a = .02,
					h = e + 500 * t;
				if (0 > h || h > i) for (h = e; Math.abs(t) != 1 / 0 && Math.abs(t) > a;) h += t, t *= 0 > h || h > i ? o * s : o, n++;
				else n = 500 * -Math.log(a / r);
				var l = {
					position: Math.min(i + 50, Math.max(h, -50)),
					duration: n
				};
				return l
			}, n.cloneTouchEvent = function(e) {
				var i = new t.TouchEvent(e.type, e.bubbles, e.cancelable);
				return i.touchPointID = e.touchPointID, i.$stageX = e.stageX, i.$stageY = e.stageY, i.touchDown = e.touchDown, i.$isDefaultPrevented = !1, i.$target = e.target, i
			}, n.throwNotSupportedError = function() {
				t.$error(1023)
			}, n.addChild = function(t) {
				return this.throwNotSupportedError(), null
			}, n.addChildAt = function(t, e) {
				return this.throwNotSupportedError(), null
			}, n.removeChild = function(t) {
				return this.throwNotSupportedError(), null
			}, n.removeChildAt = function(t) {
				return this.throwNotSupportedError(), null
			}, n.setChildIndex = function(t, e) {
				this.throwNotSupportedError()
			}, n.swapChildren = function(t, e) {
				this.throwNotSupportedError()
			}, n.swapChildrenAt = function(t, e) {
				this.throwNotSupportedError()
			}, i.weight = [1, 1.33, 1.66, 2, 2.33], i
		}(t.DisplayObjectContainer);
	t.ScrollView = e, t.registerClass(e, "egret.ScrollView")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function() {
			function e() {
				this._verticalScrollPolicy = "auto", this._horizontalScrollPolicy = "auto", this._scrollLeft = 0, this._scrollTop = 0, this._hCanScroll = !1, this._vCanScroll = !1, this._lastTouchPosition = new t.Point(0, 0), this._touchStartPosition = new t.Point(0, 0), this._scrollStarted = !1, this._lastTouchTime = 0, this._lastTouchEvent = null, this._velocitys = [], this._isHTweenPlaying = !1, this._isVTweenPlaying = !1, this._hScrollTween = null, this._vScrollTween = null, this._bounces = !0
			}
			var i = (__define, e);
			i.prototype;
			return e
		}();
	t.ScrollViewProperties = e, t.registerClass(e, "egret.ScrollViewProperties")
}(egret || (egret = {}));
var egret;
!
function(t) {
	function e(e) {
		var i = e.url;
		return -1 == i.indexOf("?") && e.method == t.URLRequestMethod.GET && e.data && e.data instanceof t.URLVariables && (i = i + "?" + e.data.toString()), i
	}
	t.$getUrl = e
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(e) {
			function i(i) {
				void 0 === i && (i = null), e.call(this), this.dataFormat = t.URLLoaderDataFormat.TEXT, this.data = null, this._request = null, this._status = -1, i && this.load(i)
			}
			__extends(i, e);
			var r = (__define, i),
				s = r.prototype;
			return s.load = function(e) {
				this._request = e, this.data = null, t.NetContext.getNetContext().proceed(this)
			}, s.__recycle = function() {
				this._request = null, this.data = null
			}, i
		}(t.EventDispatcher);
	t.URLLoader = e, t.registerClass(e, "egret.URLLoader")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function() {
			function t() {}
			var e = (__define, t);
			e.prototype;
			return t.BINARY = "binary", t.TEXT = "text", t.VARIABLES = "variables", t.TEXTURE = "texture", t.SOUND = "sound", t
		}();
	t.URLLoaderDataFormat = e, t.registerClass(e, "egret.URLLoaderDataFormat")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(e) {
			function i(i) {
				void 0 === i && (i = null), e.call(this), this.data = null, this.method = t.URLRequestMethod.GET, this.url = "", this.requestHeaders = [], this.url = i
			}
			__extends(i, e);
			var r = (__define, i);
			r.prototype;
			return i
		}(t.HashObject);
	t.URLRequest = e, t.registerClass(e, "egret.URLRequest")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function() {
			function t(t, e) {
				this.name = "", this.value = "", this.name = t, this.value = e
			}
			var e = (__define, t);
			e.prototype;
			return t
		}();
	t.URLRequestHeader = e, t.registerClass(e, "egret.URLRequestHeader")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function() {
			function t() {}
			var e = (__define, t);
			e.prototype;
			return t.GET = "get", t.POST = "post", t
		}();
	t.URLRequestMethod = e, t.registerClass(e, "egret.URLRequestMethod")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(t) {
			function e(e) {
				void 0 === e && (e = null), t.call(this), this.variables = null, null !== e && this.decode(e)
			}
			__extends(e, t);
			var i = (__define, e),
				r = i.prototype;
			return r.decode = function(t) {
				this.variables || (this.variables = {}), t = t.split("+").join(" ");
				for (var e, i = /[?&]?([^=]+)=([^&]*)/g; e = i.exec(t);) {
					var r = decodeURIComponent(e[1]),
						s = decodeURIComponent(e[2]);
					if (r in this.variables != 0) {
						var n = this.variables[r];
						n instanceof Array ? n.push(s) : this.variables[r] = [n, s]
					} else this.variables[r] = s
				}
			}, r.toString = function() {
				if (!this.variables) return "";
				var t = this.variables,
					e = [];
				for (var i in t) e.push(this.encodeValue(i, t[i]));
				return e.join("&")
			}, r.encodeValue = function(t, e) {
				return e instanceof Array ? this.encodeArray(t, e) : encodeURIComponent(t) + "=" + encodeURIComponent(e)
			}, r.encodeArray = function(t, e) {
				return t ? 0 == e.length ? encodeURIComponent(t) + "=" : e.map(function(e) {
					return encodeURIComponent(t) + "=" + encodeURIComponent(e)
				}).join("&") : ""
			}, e
		}(t.HashObject);
	t.URLVariables = e, t.registerClass(e, "egret.URLVariables")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(e) {
			function i() {
				e.call(this), this._timeScale = 1, this._paused = !1, this._callIndex = -1, this._lastTime = 0, this.callBackList = [], null != i.instance, t.sys.$ticker.$startTick(this.update, this), this._lastTime = t.getTimer()
			}
			__extends(i, e);
			var r = (__define, i),
				s = r.prototype;
			return s.update = function(t) {
				var e = t - this._lastTime;
				if (this._lastTime = t, this._paused) return !1;
				var i = e * this._timeScale;
				for (this._callList = this.callBackList.concat(), this._callIndex = 0; this._callIndex < this._callList.length; this._callIndex++) {
					var r = this._callList[this._callIndex];
					r.listener.call(r.thisObject, i)
				}
				return this._callIndex = -1, this._callList = null, !1
			}, s.register = function(t, e, i) {
				void 0 === i && (i = 0), this.$insertEventBin(this.callBackList, "", t, e, !1, i, !1)
			}, s.unregister = function(t, e) {
				this.$removeEventBin(this.callBackList, t, e)
			}, s.setTimeScale = function(t) {
				this._timeScale = t
			}, s.getTimeScale = function() {
				return this._timeScale
			}, s.pause = function() {
				this._paused = !0
			}, s.resume = function() {
				this._paused = !1
			}, i.getInstance = function() {
				return null == i.instance && (i.instance = new i), i.instance
			}, i
		}(t.EventDispatcher);
	t.Ticker = e, t.registerClass(e, "egret.Ticker")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(e) {
			function i() {
				e.call(this)
			}
			__extends(i, e);
			var r = __define,
				s = i,
				n = s.prototype;
			return r(n, "stage", function() {
				return t.sys.$TempStage
			}), r(i, "runtimeType", function() {
				return t.$warn(1041, "egret.MainContext.runtimeType", "egret.Capabilities.runtimeType"), i._runtimeType
			}), n.run = function() {}, r(i, "instance", function() {
				return null == i._instance && (i._instance = new i), i._instance
			}), i.deviceType = null, i.DEVICE_PC = "web", i.DEVICE_MOBILE = "native", i.RUNTIME_HTML5 = "runtimeHtml5", i.RUNTIME_NATIVE = "runtimeNative", i
		}(t.EventDispatcher);
	t.MainContext = e, t.registerClass(e, "egret.MainContext")
}(egret || (egret = {}));
var testDeviceType1 = function() {
		if (!this.navigator) return !0;
		var t = navigator.userAgent.toLowerCase();
		return -1 != t.indexOf("mobile") || -1 != t.indexOf("android")
	},
	testRuntimeType1 = function() {
		return this.navigator ? !0 : !1
	};
egret.MainContext.deviceType = testDeviceType1() ? egret.MainContext.DEVICE_MOBILE : egret.MainContext.DEVICE_PC, egret.MainContext._runtimeType = testRuntimeType1() ? egret.MainContext.RUNTIME_HTML5 : egret.MainContext.RUNTIME_NATIVE, delete testDeviceType1, delete testRuntimeType1;
var egret;
!
function(t) {
	var e = function(e) {
			function i(t) {
				void 0 === t && (t = 300), e.call(this), this.objectPool = [], this._length = 0, 1 > t && (t = 1), this.autoDisposeTime = t, this.frameCount = 0
			}
			__extends(i, e);
			var r = __define,
				s = i,
				n = s.prototype;
			return i.$init = function() {
				t.sys.$ticker.$startTick(i.onUpdate, i)
			}, i.onUpdate = function(t) {
				for (var e = i._callBackList, r = e.length - 1; r >= 0; r--) e[r].$checkFrame();
				return !1
			}, n.$checkFrame = function() {
				this.frameCount--, this.frameCount <= 0 && this.dispose()
			}, r(n, "length", function() {
				return this._length
			}), n.push = function(t) {
				var e = this.objectPool; - 1 == e.indexOf(t) && (e.push(t), t.__recycle && t.__recycle(), this._length++, 0 == this.frameCount && (this.frameCount = this.autoDisposeTime, i._callBackList.push(this)))
			}, n.pop = function() {
				return 0 == this._length ? null : (this._length--, this.objectPool.pop())
			}, n.dispose = function() {
				this._length > 0 && (this.objectPool = [], this._length = 0), this.frameCount = 0;
				var t = i._callBackList,
					e = t.indexOf(this); - 1 != e && t.splice(e, 1)
			}, i._callBackList = [], i
		}(t.HashObject);
	t.Recycler = e, t.registerClass(e, "egret.Recycler"), e.$init()
}(egret || (egret = {}));
var egret;
!
function(t) {
	function e(e, i, h) {
		for (var l = [], c = 3; c < arguments.length; c++) l[c - 3] = arguments[c];
		var u = {
			listener: e,
			thisObject: i,
			delay: h,
			originDelay: h,
			params: l
		};
		return o++, 1 == o && (a = t.getTimer(), t.sys.$ticker.$startTick(r, null)), n++, s[n] = u, n
	}
	function i(e) {
		s[e] && (o--, delete s[e], 0 == o && t.sys.$ticker.$stopTick(r, null))
	}
	function r(t) {
		var e = t - a;
		a = t;
		for (var i in s) {
			var r = s[i];
			r.delay -= e, r.delay <= 0 && (r.delay = r.originDelay, r.listener.apply(r.thisObject, r.params))
		}
		return !1
	}
	var s = {},
		n = 0,
		o = 0,
		a = 0;
	t.setInterval = e, t.clearInterval = i
}(egret || (egret = {}));
var egret;
!
function(t) {
	function e(e, i, h) {
		for (var l = [], c = 3; c < arguments.length; c++) l[c - 3] = arguments[c];
		var u = {
			listener: e,
			thisObject: i,
			delay: h,
			params: l
		};
		return o++, 1 == o && t.sys.$ticker && (a = t.getTimer(), t.sys.$ticker.$startTick(r, null)), n++, s[n] = u, n
	}
	function i(e) {
		s[e] && (o--, delete s[e], 0 == o && t.sys.$ticker && t.sys.$ticker.$stopTick(r, null))
	}
	function r(t) {
		var e = t - a;
		a = t;
		for (var r in s) {
			var n = r,
				o = s[n];
			o.delay -= e, o.delay <= 0 && (o.listener.apply(o.thisObject, o.params), i(n))
		}
		return !1
	}
	var s = {},
		n = 0,
		o = 0,
		a = 0;
	t.setTimeout = e, t.clearTimeout = i
}(egret || (egret = {}));