var egret;
!
function(t) {
	var e = function() {
			function e() {
				t.$error(1014)
			}
			var n = (__define, e);
			n.prototype;
			return e.get = function(t) {
				return -1 > t && (t = -1), t > 1 && (t = 1), function(e) {
					return 0 == t ? e : 0 > t ? e * (e * -t + 1 + t) : e * ((2 - e) * t + (1 - t))
				}
			}, e.getPowIn = function(t) {
				return function(e) {
					return Math.pow(e, t)
				}
			}, e.getPowOut = function(t) {
				return function(e) {
					return 1 - Math.pow(1 - e, t)
				}
			}, e.getPowInOut = function(t) {
				return function(e) {
					return (e *= 2) < 1 ? .5 * Math.pow(e, t) : 1 - .5 * Math.abs(Math.pow(2 - e, t))
				}
			}, e.sineIn = function(t) {
				return 1 - Math.cos(t * Math.PI / 2)
			}, e.sineOut = function(t) {
				return Math.sin(t * Math.PI / 2)
			}, e.sineInOut = function(t) {
				return -.5 * (Math.cos(Math.PI * t) - 1)
			}, e.getBackIn = function(t) {
				return function(e) {
					return e * e * ((t + 1) * e - t)
				}
			}, e.getBackOut = function(t) {
				return function(e) {
					return --e * e * ((t + 1) * e + t) + 1
				}
			}, e.getBackInOut = function(t) {
				return t *= 1.525, function(e) {
					return (e *= 2) < 1 ? .5 * (e * e * ((t + 1) * e - t)) : .5 * ((e -= 2) * e * ((t + 1) * e + t) + 2)
				}
			}, e.circIn = function(t) {
				return -(Math.sqrt(1 - t * t) - 1)
			}, e.circOut = function(t) {
				return Math.sqrt(1 - --t * t)
			}, e.circInOut = function(t) {
				return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
			}, e.bounceIn = function(t) {
				return 1 - e.bounceOut(1 - t)
			}, e.bounceOut = function(t) {
				return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
			}, e.bounceInOut = function(t) {
				return .5 > t ? .5 * e.bounceIn(2 * t) : .5 * e.bounceOut(2 * t - 1) + .5
			}, e.getElasticIn = function(t, e) {
				var n = 2 * Math.PI;
				return function(i) {
					if (0 == i || 1 == i) return i;
					var s = e / n * Math.asin(1 / t);
					return -(t * Math.pow(2, 10 * (i -= 1)) * Math.sin((i - s) * n / e))
				}
			}, e.getElasticOut = function(t, e) {
				var n = 2 * Math.PI;
				return function(i) {
					if (0 == i || 1 == i) return i;
					var s = e / n * Math.asin(1 / t);
					return t * Math.pow(2, -10 * i) * Math.sin((i - s) * n / e) + 1
				}
			}, e.getElasticInOut = function(t, e) {
				var n = 2 * Math.PI;
				return function(i) {
					var s = e / n * Math.asin(1 / t);
					return (i *= 2) < 1 ? -.5 * (t * Math.pow(2, 10 * (i -= 1)) * Math.sin((i - s) * n / e)) : t * Math.pow(2, -10 * (i -= 1)) * Math.sin((i - s) * n / e) * .5 + 1
				}
			}, e.quadIn = e.getPowIn(2), e.quadOut = e.getPowOut(2), e.quadInOut = e.getPowInOut(2), e.cubicIn = e.getPowIn(3), e.cubicOut = e.getPowOut(3), e.cubicInOut = e.getPowInOut(3), e.quartIn = e.getPowIn(4), e.quartOut = e.getPowOut(4), e.quartInOut = e.getPowInOut(4), e.quintIn = e.getPowIn(5), e.quintOut = e.getPowOut(5), e.quintInOut = e.getPowInOut(5), e.backIn = e.getBackIn(1.7), e.backOut = e.getBackOut(1.7), e.backInOut = e.getBackInOut(1.7), e.elasticIn = e.getElasticIn(1, .3), e.elasticOut = e.getElasticOut(1, .3), e.elasticInOut = e.getElasticInOut(1, .3 * 1.5), e
		}();
	t.Ease = e, t.registerClass(e, "egret.Ease")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(e) {
			function n(t, n, i) {
				e.call(this), this._target = null, this._useTicks = !1, this.ignoreGlobalPause = !1, this.loop = !1, this.pluginData = null, this._steps = null, this.paused = !1, this.duration = 0, this._prevPos = -1, this.position = null, this._prevPosition = 0, this._stepPosition = 0, this.passive = !1, this.initialize(t, n, i)
			}
			__extends(n, e);
			var i = (__define, n),
				s = i.prototype;
			return n.get = function(t, e, i, s) {
				return void 0 === e && (e = null), void 0 === i && (i = null), void 0 === s && (s = !1), s && n.removeTweens(t), new n(t, e, i)
			}, n.removeTweens = function(t) {
				if (t.tween_count) {
					for (var e = n._tweens, i = e.length - 1; i >= 0; i--) e[i]._target == t && (e[i].paused = !0, e.splice(i, 1));
					t.tween_count = 0
				}
			}, n.pauseTweens = function(e) {
				if (e.tween_count) for (var n = t.Tween._tweens, i = n.length - 1; i >= 0; i--) n[i]._target == e && (n[i].paused = !0)
			}, n.resumeTweens = function(e) {
				if (e.tween_count) for (var n = t.Tween._tweens, i = n.length - 1; i >= 0; i--) n[i]._target == e && (n[i].paused = !1)
			}, n.tick = function(t, e) {
				void 0 === e && (e = !1);
				var i = t - n._lastTime;
				n._lastTime = t;
				for (var s = n._tweens.concat(), r = s.length - 1; r >= 0; r--) {
					var u = s[r];
					e && !u.ignoreGlobalPause || u.paused || u.$tick(u._useTicks ? 1 : i)
				}
				return !1
			}, n._register = function(e, i) {
				var s = e._target,
					r = n._tweens;
				if (i) s && (s.tween_count = s.tween_count > 0 ? s.tween_count + 1 : 1), r.push(e), n._inited || (n._lastTime = t.getTimer(), t.sys.$ticker.$startTick(n.tick, null), n._inited = !0);
				else {
					s && s.tween_count--;
					for (var u = r.length; u--;) if (r[u] == e) return void r.splice(u, 1)
				}
			}, n.removeAllTweens = function() {
				for (var t = n._tweens, e = 0, i = t.length; i > e; e++) {
					var s = t[e];
					s.paused = !0, s._target.tweenjs_count = 0
				}
				t.length = 0
			}, s.initialize = function(t, e, i) {
				this._target = t, e && (this._useTicks = e.useTicks, this.ignoreGlobalPause = e.ignoreGlobalPause, this.loop = e.loop, e.onChange && this.addEventListener("change", e.onChange, e.onChangeObj), e.override && n.removeTweens(t)), this.pluginData = i || {}, this._curQueueProps = {}, this._initQueueProps = {}, this._steps = [], e && e.paused ? this.paused = !0 : n._register(this, !0), e && null != e.position && this.setPosition(e.position, n.NONE)
			}, s.setPosition = function(t, e) {
				void 0 === e && (e = 1), 0 > t && (t = 0);
				var n = t,
					i = !1;
				if (n >= this.duration && (this.loop ? n %= this.duration : (n = this.duration, i = !0)), n == this._prevPos) return i;
				i && this.setPaused(!0);
				var s = this._prevPos;
				if (this.position = this._prevPos = n, this._prevPosition = t, this._target && this._steps.length > 0) {
					for (var r = this._steps.length, u = -1, o = 0; r > o && !("step" == this._steps[o].type && (u = o, this._steps[o].t <= n && this._steps[o].t + this._steps[o].d >= n)); o++);
					for (var o = 0; r > o; o++) if ("action" == this._steps[o].type) 0 != e && (this._useTicks ? this._runAction(this._steps[o], n, n) : 1 == e && s > n ? (s != this.duration && this._runAction(this._steps[o], s, this.duration), this._runAction(this._steps[o], 0, n, !0)) : this._runAction(this._steps[o], s, n));
					else if ("step" == this._steps[o].type && u == o) {
						var a = this._steps[u];
						this._updateTargetProps(a, Math.min((this._stepPosition = n - a.t) / a.d, 1))
					}
				}
				return this.dispatchEventWith("change"), i
			}, s._runAction = function(t, e, n, i) {
				void 0 === i && (i = !1);
				var s = e,
					r = n;
				e > n && (s = n, r = e);
				var u = t.t;
				(u == r || u > s && r > u || i && u == e) && t.f.apply(t.o, t.p)
			}, s._updateTargetProps = function(t, e) {
				var i, s, r, u, o, a;
				if (t || 1 != e) {
					if (this.passive = !! t.v, this.passive) return;
					t.e && (e = t.e(e, 0, 1, 1)), i = t.p0, s = t.p1
				} else this.passive = !1, i = s = this._curQueueProps;
				for (var h in this._initQueueProps) {
					null == (u = i[h]) && (i[h] = u = this._initQueueProps[h]), null == (o = s[h]) && (s[h] = o = u), r = u == o || 0 == e || 1 == e || "number" != typeof u ? 1 == e ? o : u : u + (o - u) * e;
					var p = !1;
					if (a = n._plugins[h]) for (var c = 0, _ = a.length; _ > c; c++) {
						var f = a[c].tween(this, h, r, i, s, e, !! t && i == s, !t);
						f == n.IGNORE ? p = !0 : r = f
					}
					p || (this._target[h] = r)
				}
			}, s.setPaused = function(t) {
				return this.paused = t, n._register(this, !t), this
			}, s._cloneProps = function(t) {
				var e = {};
				for (var n in t) e[n] = t[n];
				return e
			}, s._addStep = function(t) {
				return t.d > 0 && (t.type = "step", this._steps.push(t), t.t = this.duration, this.duration += t.d), this
			}, s._appendQueueProps = function(t) {
				var e, i, s, r, u;
				for (var o in t) if (void 0 === this._initQueueProps[o]) {
					if (i = this._target[o], e = n._plugins[o]) for (s = 0, r = e.length; r > s; s++) i = e[s].init(this, o, i);
					this._initQueueProps[o] = this._curQueueProps[o] = void 0 === i ? null : i
				} else i = this._curQueueProps[o];
				for (var o in t) {
					if (i = this._curQueueProps[o], e = n._plugins[o]) for (u = u || {}, s = 0, r = e.length; r > s; s++) e[s].step && e[s].step(this, o, i, t[o], u);
					this._curQueueProps[o] = t[o]
				}
				return u && this._appendQueueProps(u), this._curQueueProps
			}, s._addAction = function(t) {
				return t.t = this.duration, t.type = "action", this._steps.push(t), this
			}, s._set = function(t, e) {
				for (var n in t) e[n] = t[n]
			}, s.wait = function(t, e) {
				if (null == t || 0 >= t) return this;
				var n = this._cloneProps(this._curQueueProps);
				return this._addStep({
					d: t,
					p0: n,
					p1: n,
					v: e
				})
			}, s.to = function(t, e, n) {
				return void 0 === n && (n = void 0), (isNaN(e) || 0 > e) && (e = 0), this._addStep({
					d: e || 0,
					p0: this._cloneProps(this._curQueueProps),
					e: n,
					p1: this._cloneProps(this._appendQueueProps(t))
				}), this.set(t)
			}, s.call = function(t, e, n) {
				return void 0 === e && (e = void 0), void 0 === n && (n = void 0), this._addAction({
					f: t,
					p: n ? n : [],
					o: e ? e : this._target
				})
			}, s.set = function(t, e) {
				return void 0 === e && (e = null), this._appendQueueProps(t), this._addAction({
					f: this._set,
					o: this,
					p: [t, e ? e : this._target]
				})
			}, s.play = function(t) {
				return t || (t = this), this.call(t.setPaused, t, [!1])
			}, s.pause = function(t) {
				return t || (t = this), this.call(t.setPaused, t, [!0])
			}, s.$tick = function(t) {
				this.paused || this.setPosition(this._prevPosition + t)
			}, n.NONE = 0, n.LOOP = 1, n.REVERSE = 2, n._tweens = [], n.IGNORE = {}, n._plugins = {}, n._inited = !1, n._lastTime = 0, n
		}(t.EventDispatcher);
	t.Tween = e, t.registerClass(e, "egret.Tween")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e;
	!
	function(e) {
		function n(e) {
			if ("function" == typeof e) return e;
			var n = t.Ease[e];
			return "function" == typeof n ? n : null
		}
		function i(t, e, n, i) {
			var s = t.prototype;
			s.__meta__ = s.__meta__ || {}, s.__meta__[e] = n, i && (s.__defaultProperty__ = e)
		}
		var s = function(t) {
				function e() {
					t.apply(this, arguments), this.name = ""
				}
				__extends(e, t);
				var n = (__define, e);
				n.prototype;
				return e
			}(t.EventDispatcher);
		e.BasePath = s, t.registerClass(s, "egret.tween.BasePath");
		var r = function(t) {
				function e() {
					t.apply(this, arguments), this.props = void 0, this.duration = 500, this.ease = void 0
				}
				__extends(e, t);
				var n = (__define, e);
				n.prototype;
				return e
			}(s);
		e.To = r, t.registerClass(r, "egret.tween.To");
		var u = function(t) {
				function e() {
					t.apply(this, arguments), this.duration = 500, this.passive = void 0
				}
				__extends(e, t);
				var n = (__define, e);
				n.prototype;
				return e
			}(s);
		e.Wait = u, t.registerClass(u, "egret.tween.Wait");
		var o = function(t) {
				function e() {
					t.apply(this, arguments), this.props = void 0
				}
				__extends(e, t);
				var n = (__define, e);
				n.prototype;
				return e
			}(s);
		e.Set = o, t.registerClass(o, "egret.tween.Set");
		var a = function(t) {
				function e() {
					t.apply(this, arguments), this.delta = 0
				}
				__extends(e, t);
				var n = (__define, e);
				n.prototype;
				return e
			}(s);
		e.Tick = a, t.registerClass(a, "egret.tween.Tick");
		var h = function(e) {
				function i() {
					e.call(this)
				}
				__extends(i, e);
				var s = __define,
					h = i,
					p = h.prototype;
				return s(p, "props", function() {
					return this._props
				}, function(t) {
					this._props = t
				}), s(p, "target", function() {
					return this._target
				}, function(t) {
					this._target = t
				}), s(p, "paths", function() {
					return this._paths
				}, function(t) {
					this._paths = t || []
				}), p.play = function() {
					this.tween ? this.tween.setPaused(!1) : this.createTween()
				}, p.pause = function() {
					this.tween && this.tween.setPaused(!0)
				}, p.createTween = function() {
					this.tween = t.Tween.get(this._target, this._props), this._paths && this.applyPaths()
				}, p.applyPaths = function() {
					for (var t = 0; t < this._paths.length; t++) {
						var e = this._paths[t];
						this.applyPath(e)
					}
				}, p.applyPath = function(t) {
					var e = this;
					t instanceof r ? this.tween.to(t.props, t.duration, n(t.ease)) : t instanceof u ? this.tween.wait(t.duration, t.passive) : t instanceof o ? this.tween.set(t.props) : t instanceof a && this.tween.$tick(t.delta), this.tween.call(function() {
						return e.pathComplete(t)
					})
				}, p.pathComplete = function(t) {
					t.dispatchEventWith("complete"), this.dispatchEventWith("pathComplete", !1, t);
					var e = this._paths.indexOf(t);
					e >= 0 && e === this._paths.length - 1 && this.dispatchEventWith("complete")
				}, i
			}(t.EventDispatcher);
		e.TweenItem = h, t.registerClass(h, "egret.tween.TweenItem"), i(h, "paths", "Array", !0);
		var p = function(t) {
				function e() {
					t.call(this), this.completeCount = 0
				}
				__extends(e, t);
				var n = __define,
					i = e,
					s = i.prototype;
				return n(s, "items", function() {
					return this._items
				}, function(t) {
					this.completeCount = 0, this.registerEvent(!1), this._items = t, this.registerEvent(!0)
				}), s.registerEvent = function(t) {
					var e = this;
					this._items && this._items.forEach(function(n) {
						t ? n.addEventListener("complete", e.itemComplete, e) : n.removeEventListener("complete", e.itemComplete, e)
					})
				}, s.play = function() {
					if (this._items) for (var t = 0; t < this._items.length; t++) {
						var e = this._items[t];
						e.play()
					}
				}, s.pause = function() {
					if (this._items) for (var t = 0; t < this._items.length; t++) {
						var e = this._items[t];
						e.pause()
					}
				}, s.itemComplete = function(t) {
					var e = t.currentTarget;
					this.completeCount++, this.dispatchEventWith("itemComplete", !1, e), this.completeCount === this.items.length && (this.dispatchEventWith("complete"), this.completeCount = 0)
				}, e
			}(t.EventDispatcher);
		e.TweenGroup = p, t.registerClass(p, "egret.tween.TweenGroup"), i(p, "items", "Array", !0)
	}(e = t.tween || (t.tween = {}))
}(egret || (egret = {}));