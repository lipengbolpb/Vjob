function __extends(t, e) {
	function i() {
		this.constructor = t
	}
	for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
	i.prototype = e.prototype, t.prototype = new i
}
var egret;
!
function(t) {
	function e() {
		return ""
	}
	function i(t) {
		throw new Error("#" + t)
	}
	function n() {}
	function r() {}
	function s() {}
	t.getString = e, t.$error = i, t.$warn = n, t.$markReadOnly = r, t.$markCannotUse = s
}(egret || (egret = {}));
var egret;
!
function(t) {
	function e(t, e, i) {
		var n = t.prototype;
		n.__class__ = e;
		var r = [e];
		i && (r = r.concat(i));
		var s = n.__types__;
		if (n.__types__) for (var a = s.length, o = 0; a > o; o++) {
			var h = s[o]; - 1 == r.indexOf(h) && r.push(h)
		}
		n.__types__ = r
	}
	t.registerClass = e
}(egret || (egret = {}));
var __define = this.__define ||
function(t, e, i, n) {
	Object.defineProperty(t, e, {
		configurable: !0,
		enumerable: !0,
		get: i,
		set: n
	})
}, egret;
!
function(t) {
	t.$hashCount = 1;
	var e = function() {
			function e() {
				this.$hashCode = t.$hashCount++
			}
			var i = __define,
				n = e,
				r = n.prototype;
			return i(r, "hashCode", function() {
				return this.$hashCode
			}), e
		}();
	t.HashObject = e, t.registerClass(e, "egret.HashObject", ["egret.IHashObject"])
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = [],
		i = function(i) {
			function n(t) {
				void 0 === t && (t = null), i.call(this), this.$EventDispatcher = {
					0: t ? t : this,
					1: {},
					2: {},
					3: 0
				}
			}
			__extends(n, i);
			var r = n,
				s = r.prototype;
			return s.$getEventMap = function(t) {
				var e = this.$EventDispatcher,
					i = t ? e[2] : e[1];
				return i
			}, s.addEventListener = function(t, e, i, n, r) {
				this.$addListener(t, e, i, n, r)
			}, s.once = function(t, e, i, n, r) {
				this.$addListener(t, e, i, n, r, !0)
			}, s.$addListener = function(t, e, i, n, r, s) {
				var a = this.$EventDispatcher,
					o = n ? a[2] : a[1],
					h = o[t];
				h ? 0 !== a[3] && (o[t] = h = h.concat()) : h = o[t] = [], this.$insertEventBin(h, t, e, i, n, r, s)
			}, s.$insertEventBin = function(t, e, i, n, r, s, a) {
				s = 0 | +s;
				for (var o = -1, h = t.length, l = 0; h > l; l++) {
					var u = t[l];
					if (u.listener == i && u.thisObject == n && u.target == this) return !1; - 1 == o && u.priority < s && (o = l)
				}
				var c = {
					type: e,
					listener: i,
					thisObject: n,
					priority: s,
					target: this,
					useCapture: r,
					dispatchOnce: !! a
				};
				return -1 !== o ? t.splice(o, 0, c) : t.push(c), !0
			}, s.removeEventListener = function(t, e, i, n) {
				var r = this.$EventDispatcher,
					s = n ? r[2] : r[1],
					a = s[t];
				a && (0 !== r[3] && (s[t] = a = a.concat()), this.$removeEventBin(a, e, i), 0 == a.length && (s[t] = null))
			}, s.$removeEventBin = function(t, e, i) {
				for (var n = t.length, r = 0; n > r; r++) {
					var s = t[r];
					if (s.listener == e && s.thisObject == i && s.target == this) return t.splice(r, 1), !0
				}
				return !1
			}, s.hasEventListener = function(t) {
				var e = this.$EventDispatcher;
				return !(!e[1][t] && !e[2][t])
			}, s.willTrigger = function(t) {
				return this.hasEventListener(t)
			}, s.dispatchEvent = function(t) {
				return t.$currentTarget = this.$EventDispatcher[0], t.$setTarget(t.$currentTarget), this.$notifyListener(t, !1)
			}, s.$notifyListener = function(t, i) {
				var n = this.$EventDispatcher,
					r = i ? n[2] : n[1],
					s = r[t.$type];
				if (!s) return !0;
				var a = s.length;
				if (0 == a) return !0;
				var o = e;
				n[3]++;
				for (var h = 0; a > h; h++) {
					var l = s[h];
					if (l.listener.call(l.thisObject, t), l.dispatchOnce && o.push(l), t.$isPropagationImmediateStopped) break
				}
				for (n[3]--; o.length;) {
					var l = o.pop();
					l.target.removeEventListener(l.type, l.listener, l.thisObject, l.useCapture)
				}
				return !t.$isDefaultPrevented
			}, s.dispatchEventWith = function(e, i, n, r) {
				if (i || this.hasEventListener(e)) {
					var s = t.Event.create(t.Event, e, i, r);
					s.data = n;
					var a = this.dispatchEvent(s);
					return t.Event.release(s), a
				}
				return !0
			}, n
		}(t.HashObject);
	t.EventDispatcher = i, t.registerClass(i, "egret.EventDispatcher", ["egret.IEventDispatcher"])
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = [],
		i = function(i) {
			function n(t, e, n, r) {
				void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === n && (n = 0), void 0 === r && (r = 0), i.call(this), this.x = t, this.y = e, this.width = n, this.height = r
			}
			__extends(n, i);
			var r = __define,
				s = n,
				a = s.prototype;
			return n.release = function(t) {
				t && e.push(t)
			}, n.create = function() {
				var t = e.pop();
				return t || (t = new n), t
			}, r(a, "right", function() {
				return this.x + this.width
			}, function(t) {
				this.width = t - this.x
			}), r(a, "bottom", function() {
				return this.y + this.height
			}, function(t) {
				this.height = t - this.y
			}), r(a, "left", function() {
				return this.x
			}, function(t) {
				this.width += this.x - t, this.x = t
			}), r(a, "top", function() {
				return this.y
			}, function(t) {
				this.height += this.y - t, this.y = t
			}), r(a, "topLeft", function() {
				return new t.Point(this.left, this.top)
			}, function(t) {
				this.top = t.y, this.left = t.x
			}), r(a, "bottomRight", function() {
				return new t.Point(this.right, this.bottom)
			}, function(t) {
				this.bottom = t.y, this.right = t.x
			}), a.copyFrom = function(t) {
				return this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height, this
			}, a.setTo = function(t, e, i, n) {
				return this.x = t, this.y = e, this.width = i, this.height = n, this
			}, a.contains = function(t, e) {
				return this.x <= t && this.x + this.width >= t && this.y <= e && this.y + this.height >= e
			}, a.intersection = function(t) {
				return this.clone().$intersectInPlace(t)
			}, a.inflate = function(t, e) {
				this.x -= t, this.width += 2 * t, this.y -= e, this.height += 2 * e
			}, a.$intersectInPlace = function(t) {
				var e = this.x,
					i = this.y,
					n = t.x,
					r = t.y,
					s = Math.max(e, n),
					a = Math.min(e + this.width, n + t.width);
				if (a >= s) {
					var o = Math.max(i, r),
						h = Math.min(i + this.height, r + t.height);
					if (h >= o) return this.setTo(s, o, a - s, h - o), this
				}
				return this.setEmpty(), this
			}, a.intersects = function(t) {
				return Math.max(this.x, t.x) <= Math.min(this.right, t.right) && Math.max(this.y, t.y) <= Math.min(this.bottom, t.bottom)
			}, a.isEmpty = function() {
				return this.width <= 0 || this.height <= 0
			}, a.setEmpty = function() {
				this.x = 0, this.y = 0, this.width = 0, this.height = 0
			}, a.clone = function() {
				return new n(this.x, this.y, this.width, this.height)
			}, a.containsPoint = function(t) {
				return this.x < t.x && this.x + this.width > t.x && this.y < t.y && this.y + this.height > t.y ? !0 : !1
			}, a.containsRect = function(t) {
				var e = t.x + t.width,
					i = t.y + t.height,
					n = this.x + this.width,
					r = this.y + this.height;
				return t.x >= this.x && t.x < n && t.y >= this.y && t.y < r && e > this.x && n >= e && i > this.y && r >= i
			}, a.equals = function(t) {
				return this === t ? !0 : this.x === t.x && this.y === t.y && this.width === t.width && this.height === t.height
			}, a.inflatePoint = function(t) {
				this.inflate(t.x, t.y)
			}, a.offset = function(t, e) {
				this.x += t, this.y += e
			}, a.offsetPoint = function(t) {
				this.offset(t.x, t.y)
			}, a.toString = function() {
				return "(x=" + this.x + ", y=" + this.y + ", width=" + this.width + ", height=" + this.height + ")"
			}, a.union = function(t) {
				var e = this.clone();
				if (t.isEmpty()) return e;
				if (e.isEmpty()) return e.copyFrom(t), e;
				var i = Math.min(e.x, t.x),
					n = Math.min(e.y, t.y);
				return e.setTo(i, n, Math.max(e.right, t.right) - i, Math.max(e.bottom, t.bottom) - n), e
			}, a.$getBaseWidth = function(t) {
				var e = Math.abs(Math.cos(t)),
					i = Math.abs(Math.sin(t));
				return e * this.width + i * this.height
			}, a.$getBaseHeight = function(t) {
				var e = Math.abs(Math.cos(t)),
					i = Math.abs(Math.sin(t));
				return i * this.width + e * this.height
			}, n
		}(t.HashObject);
	t.Rectangle = i, t.registerClass(i, "egret.Rectangle"), t.$TempRectangle = new i
}(egret || (egret = {}));
var egret;
!
function(t) {
	function e(t) {
		return t %= 360, t > 180 ? t -= 360 : -180 > t && (t += 360), t
	}
	var i = function(i) {
			function n() {
				i.call(this), this.$children = null, this.$parent = null, this.$stage = null, this.$nestLevel = 0, this.$visible = !0, this.$displayList = null, this.$alpha = 1, this.$touchEnabled = n.defaultTouchEnabled, this.$scrollRect = null, this.$blendMode = 0, this.$maskedObject = null, this.$mask = null, this.$maskRect = null, this.$parentDisplayList = null, this.$renderNode = null, this.$displayFlags = 2032, this.$DisplayObject = {
					0: 1,
					1: 1,
					2: 0,
					3: 0,
					4: 0,
					5: "",
					6: new t.Matrix,
					7: new t.Matrix,
					8: new t.Matrix,
					9: new t.Rectangle,
					10: new t.Rectangle,
					11: !1,
					12: 0,
					13: 0,
					14: 0 / 0,
					15: 0 / 0,
					16: 0,
					17: 0,
					18: 0,
					19: null,
					20: null
				}
			}
			__extends(n, i);
			var r = __define,
				s = n,
				a = s.prototype;
			return a.$setFlags = function(t) {
				this.$displayFlags |= t
			}, a.$removeFlags = function(t) {
				this.$displayFlags &= ~t
			}, a.$removeFlagsUp = function(t) {
				if (this.$hasAnyFlags(t)) {
					this.$removeFlags(t);
					var e = this.$parent;
					e && e.$removeFlagsUp(t)
				}
			}, a.$hasFlags = function(t) {
				return (this.$displayFlags & t) == t
			}, a.$propagateFlagsUp = function(t) {
				if (!this.$hasFlags(t)) {
					this.$setFlags(t);
					var e = this.$parent;
					e && e.$propagateFlagsUp(t)
				}
			}, a.$propagateFlagsDown = function(t) {
				this.$setFlags(t)
			}, a.$hasAnyFlags = function(t) {
				return !!(this.$displayFlags & t)
			}, a.$invalidateMatrix = function() {
				this.$setFlags(8), this.$invalidatePosition()
			}, a.$invalidatePosition = function() {
				var t = this;
				t.$invalidateTransform(), t.$propagateFlagsDown(48), t.$parent && t.$parent.$propagateFlagsUp(4)
			}, r(a, "name", function() {
				return this.$DisplayObject[5]
			}, function(t) {
				this.$DisplayObject[5] = t
			}), r(a, "parent", function() {
				return this.$parent
			}), a.$setParent = function(t) {
				return this.$parent == t ? !1 : (this.$parent = t, !0)
			}, a.$onAddToStage = function(e, i) {
				this.$stage = e, this.$nestLevel = i, this.$hasAddToStage = !0, t.Sprite.$EVENT_ADD_TO_STAGE_LIST.push(this)
			}, a.$onRemoveFromStage = function() {
				this.$nestLevel = 0, t.Sprite.$EVENT_REMOVE_FROM_STAGE_LIST.push(this)
			}, r(a, "stage", function() {
				return this.$stage
			}), r(a, "matrix", function() {
				return this.$getMatrix().clone()
			}, function(t) {
				this.$setMatrix(t)
			}), a.$getMatrix = function() {
				var t = this.$DisplayObject;
				return this.$hasFlags(8) && (t[6].$updateScaleAndRotation(t[0], t[1], t[2], t[3]), this.$removeFlags(8)), t[6]
			}, a.$setMatrix = function(t, i) {
				void 0 === i && (i = !0);
				var n = this,
					r = n.$DisplayObject,
					s = r[6];
				return s.equals(t) ? !1 : (s.copyFrom(t), i && (r[0] = s.$getScaleX(), r[1] = s.$getScaleY(), r[2] = t.$getSkewX(), r[3] = t.$getSkewY(), r[16] = e(180 * r[2] / Math.PI), r[17] = e(180 * r[3] / Math.PI), r[4] = e(180 * r[3] / Math.PI)), n.$removeFlags(8), n.$invalidatePosition(), !0)
			}, a.$getConcatenatedMatrix = function() {
				var e = this.$DisplayObject[7];
				if (this.$hasFlags(16)) {
					this.$parent ? this.$parent.$getConcatenatedMatrix().$preMultiplyInto(this.$getMatrix(), e) : e.copyFrom(this.$getMatrix());
					var i = this.$DisplayObject,
						n = i[12],
						r = i[13],
						s = this.$scrollRect;
					s ? e.$preMultiplyInto(t.$TempMatrix.setTo(1, 0, 0, 1, -s.x - n, -s.y - r), e) : (0 != n || 0 != r) && e.$preMultiplyInto(t.$TempMatrix.setTo(1, 0, 0, 1, -n, -r), e), this.$displayList && (this.$displayList.$renderNode.moved = !0), this.$renderNode && (this.$renderNode.moved = !0), this.$removeFlags(16)
				}
				return e
			}, a.$getInvertedConcatenatedMatrix = function() {
				var t = this.$DisplayObject;
				return this.$hasFlags(32) && (this.$getConcatenatedMatrix().$invertInto(t[8]), this.$removeFlags(32)), t[8]
			}, r(a, "x", function() {
				return this.$getX()
			}, function(t) {
				this.$setX(t)
			}), a.$getX = function() {
				return this.$DisplayObject[6].tx
			}, a.$setX = function(t) {
				t = +t || 0;
				var e = this.$DisplayObject[6];
				return t == e.tx ? !1 : (e.tx = t, this.$invalidatePosition(), !0)
			}, r(a, "y", function() {
				return this.$getY()
			}, function(t) {
				this.$setY(t)
			}), a.$getY = function() {
				return this.$DisplayObject[6].ty
			}, a.$setY = function(t) {
				t = +t || 0;
				var e = this.$DisplayObject[6];
				return t == e.ty ? !1 : (e.ty = t, this.$invalidatePosition(), !0)
			}, r(a, "scaleX", function() {
				return this.$getScaleX()
			}, function(t) {
				this.$setScaleX(t)
			}), a.$getScaleX = function() {
				return this.$DisplayObject[0]
			}, a.$setScaleX = function(t) {
				t = +t || 0;
				var e = this.$DisplayObject;
				return t == e[0] ? !1 : (e[0] = t, this.$invalidateMatrix(), !0)
			}, r(a, "scaleY", function() {
				return this.$getScaleY()
			}, function(t) {
				this.$setScaleY(t)
			}), a.$getScaleY = function() {
				return this.$DisplayObject[1]
			}, a.$setScaleY = function(t) {
				return t = +t || 0, t == this.$DisplayObject[1] ? !1 : (this.$DisplayObject[1] = t, this.$invalidateMatrix(), !0)
			}, r(a, "rotation", function() {
				return this.$getRotation()
			}, function(t) {
				this.$setRotation(t)
			}), a.$getRotation = function() {
				return this.$DisplayObject[4]
			}, a.$setRotation = function(t) {
				t = +t || 0, t = e(t);
				var i = this.$DisplayObject;
				if (t == i[4]) return !1;
				var n = t - i[4],
					r = n / 180 * Math.PI;
				return i[2] += r, i[3] += r, i[4] = t, this.$invalidateMatrix(), !0
			}, r(a, "skewX", function() {
				return this.$DisplayObject[16]
			}, function(t) {
				this.$setSkewX(t)
			}), a.$setSkewX = function(t) {
				t = +t || 0;
				var i = this.$DisplayObject;
				return t == i[16] ? !1 : (i[16] = t, t = e(t), t = t / 180 * Math.PI, i[2] = t, this.$invalidateMatrix(), !0)
			}, r(a, "skewY", function() {
				return this.$DisplayObject[17]
			}, function(t) {
				this.$setSkewY(t)
			}), a.$setSkewY = function(t) {
				t = +t || 0;
				var i = this.$DisplayObject;
				return t == i[17] ? !1 : (i[17] = t, t = e(t), t = t / 180 * Math.PI, i[3] = t, this.$invalidateMatrix(), !0)
			}, r(a, "width", function() {
				return this.$getWidth()
			}, function(t) {
				this.$setWidth(t)
			}), a.$getWidth = function() {
				return isNaN(this.$getExplicitWidth()) ? this.$getOriginalBounds().width : this.$getExplicitWidth()
			}, a.$getExplicitWidth = function() {
				return this.$DisplayObject[14]
			}, a.$setWidth = function(t) {
				return this.$DisplayObject[14] = isNaN(t) ? 0 / 0 : t, t = +t, 0 > t ? !1 : (this.$invalidateMatrix(), !0)
			}, r(a, "height", function() {
				return this.$getHeight()
			}, function(t) {
				this.$setHeight(t)
			}), a.$getHeight = function() {
				return isNaN(this.$getExplicitHeight()) ? this.$getOriginalBounds().height : this.$getExplicitHeight()
			}, a.$getExplicitHeight = function() {
				return this.$DisplayObject[15]
			}, a.$setHeight = function(t) {
				return this.$DisplayObject[15] = isNaN(t) ? 0 / 0 : t, t = +t, 0 > t ? !1 : (this.$invalidateMatrix(), !0)
			}, r(a, "measuredWidth", function() {
				return this.$getOriginalBounds().width
			}), r(a, "measuredHeight", function() {
				return this.$getOriginalBounds().height
			}), r(a, "anchorOffsetX", function() {
				return this.$DisplayObject[12]
			}, function(t) {
				this.$setAnchorOffsetX(t)
			}), a.$getAnchorOffsetX = function() {
				return this.$DisplayObject[12]
			}, a.$setAnchorOffsetX = function(t) {
				return t = +t || 0, t == this.$DisplayObject[12] ? !1 : (this.$DisplayObject[12] = t, this.$invalidatePosition(), !0)
			}, r(a, "anchorOffsetY", function() {
				return this.$DisplayObject[13]
			}, function(t) {
				this.$setAnchorOffsetY(t)
			}), a.$getAnchorOffsetY = function() {
				return this.$DisplayObject[13]
			}, a.$setAnchorOffsetY = function(t) {
				return t = +t || 0, t == this.$DisplayObject[13] ? !1 : (this.$DisplayObject[13] = t, this.$invalidatePosition(), !0)
			}, r(a, "visible", function() {
				return this.$visible
			}, function(t) {
				this.$setVisible(t)
			}), a.$setVisible = function(t) {
				return t = !! t, t == this.$visible ? !1 : (this.$visible = t, this.$propagateFlagsDown(1024), this.$invalidateTransform(), !0)
			}, a.$getConcatenatedVisible = function() {
				var t = this.$DisplayObject;
				if (this.$hasFlags(1024)) {
					if (this.$parent) {
						var e = this.$parent.$getConcatenatedVisible();
						t[19] = e && this.$visible
					} else t[19] = this.$visible;
					this.$removeFlags(1024)
				}
				return t[19]
			}, r(a, "cacheAsBitmap", function() {
				return this.$DisplayObject[11]
			}, function(t) {
				t = !! t, this.$DisplayObject[11] = t, this.$setHasDisplayList(t)
			}), a.$setHasDisplayList = function(e) {
				var i = !! this.$displayList;
				if (i != e) if (e) {
					var n = t.sys.DisplayList.create(this);
					n && (this.$displayList = n, this.$parentDisplayList && this.$parentDisplayList.markDirty(n), this.$cacheAsBitmapChanged())
				} else this.$displayList = null, this.$cacheAsBitmapChanged()
			}, a.$cacheAsBitmapChanged = function() {
				var t = this.$displayList || this.$parentDisplayList;
				this.$renderNode && t && t.markDirty(this), this.$propagateFlagsDown(48)
			}, r(a, "alpha", function() {
				return this.$alpha
			}, function(t) {
				this.$setAlpha(t)
			}), a.$setAlpha = function(t) {
				return t = +t || 0, t == this.$alpha ? !1 : (this.$alpha = t, this.$propagateFlagsDown(64), this.$invalidate(), !0)
			}, a.$getConcatenatedAlpha = function() {
				var t = this.$DisplayObject;
				if (this.$hasFlags(64)) {
					if (this.$parent) {
						var e = this.$parent.$getConcatenatedAlpha();
						t[18] = e * this.$alpha
					} else t[18] = this.$alpha;
					this.$removeFlags(64)
				}
				return t[18]
			}, r(a, "touchEnabled", function() {
				return this.$getTouchEnabled()
			}, function(t) {
				this.$setTouchEnabled(t)
			}), a.$getTouchEnabled = function() {
				return this.$touchEnabled
			}, a.$setTouchEnabled = function(t) {
				return this.$touchEnabled == t ? !1 : (this.$touchEnabled = t, !0)
			}, r(a, "scrollRect", function() {
				return this.$scrollRect
			}, function(t) {
				this.$setScrollRect(t)
			}), a.$setScrollRect = function(e) {
				return e || this.$scrollRect ? (e ? (this.$scrollRect || (this.$scrollRect = new t.Rectangle), this.$scrollRect.copyFrom(e)) : this.$scrollRect = null, this.$invalidatePosition(), !0) : !1
			}, r(a, "blendMode", function() {
				return t.sys.numberToBlendMode(this.$blendMode)
			}, function(e) {
				var i = t.sys.blendModeToNumber(e);
				i != this.$blendMode && (this.$blendMode = i, this.$invalidateTransform())
			}), r(a, "mask", function() {
				return this.$mask ? this.$mask : this.$maskRect
			}, function(t) {
				if (t !== this) {
					if (t) if (t instanceof n) {
						if (t == this.$mask) return;
						t.$maskedObject && (t.$maskedObject.mask = null), t.$maskedObject = this, t.$invalidateTransform(), this.$mask = t, this.$maskRect = null
					} else this.$setMaskRect(t), this.$mask && (this.$mask.$maskedObject = null, this.$mask.$invalidateTransform()), this.$mask = null;
					else this.$mask && (this.$mask.$maskedObject = null, this.$mask.$invalidateTransform()), this.$mask = null, this.$maskRect = null;
					this.$invalidateTransform()
				}
			}), a.$setMaskRect = function(e) {
				return e || this.$maskRect ? (e ? (this.$maskRect || (this.$maskRect = new t.Rectangle), this.$maskRect.copyFrom(e)) : this.$maskRect = null, this.$invalidatePosition(), !0) : !1
			}, r(a, "filters", function() {
				return this.$DisplayObject[20]
			}, function(t) {
				var e = this.$DisplayObject[20];
				if (!e && !t) return void(this.$DisplayObject[20] = t);
				if (this.$invalidateContentBounds(), this.$invalidate(!0), e && e.length) for (var i = e.length, n = 0; i > n; n++) e[n].$removeTarget(this);
				if (this.$DisplayObject[20] = t, t && t.length) for (var r = t.length, n = 0; r > n; n++) t[n].$addTarget(this)
			}), a.$getFilters = function() {
				return this.$DisplayObject[20]
			}, a.getTransformedBounds = function(t, e) {
				return t = t || this, this.$getTransformedBounds(t, e)
			}, a.getBounds = function(t, e) {
				if (void 0 === e && (e = !0), t = this.$getTransformedBounds(this, t), e) {
					var i = this.$DisplayObject;
					(0 != i[12] || 0 != i[13]) && (t.x -= i[12], t.y -= i[13])
				}
				return t
			}, a.$getTransformedBounds = function(e, i) {
				var n = this.$getOriginalBounds();
				if (i || (i = new t.Rectangle), i.copyFrom(n), e == this || i.isEmpty()) return i;
				var r;
				if (e) {
					r = t.$TempMatrix;
					var s = e.$getInvertedConcatenatedMatrix();
					s.$preMultiplyInto(this.$getConcatenatedMatrix(), r)
				} else r = this.$getConcatenatedMatrix();
				return r.$transformBounds(i), i
			}, a.globalToLocal = function(t, e, i) {
				void 0 === t && (t = 0), void 0 === e && (e = 0);
				var n = this.$getInvertedConcatenatedMatrix();
				return n.transformPoint(t, e, i)
			}, a.localToGlobal = function(t, e, i) {
				void 0 === t && (t = 0), void 0 === e && (e = 0);
				var n = this.$getConcatenatedMatrix();
				return n.transformPoint(t, e, i)
			}, a.$invalidateContentBounds = function() {
				this.$invalidate(), this.$setFlags(2), this.$propagateFlagsUp(4)
			}, a.$getOriginalBounds = function() {
				var t = this.$DisplayObject[9];
				if (this.$hasFlags(4)) {
					t.copyFrom(this.$getContentBounds()), this.$measureChildBounds(t), this.$removeFlags(4), this.$displayList && (this.$displayList.$renderNode.moved = !0);
					var e = this.$measureFiltersOffset();
					e && (t.x += e.minX, t.y += e.minY, t.width += e.maxX, t.height += e.maxY)
				}
				return t
			}, a.$measureChildBounds = function(t) {}, a.$getContentBounds = function() {
				var t = this.$DisplayObject[10];
				return this.$hasFlags(2) && (this.$measureContentBounds(t), this.$renderNode && (this.$renderNode.moved = !0), this.$removeFlags(2)), t
			}, a.$measureContentBounds = function(t) {}, a.$invalidate = function(t) {
				if (this.$renderNode && !this.$hasFlags(384)) {
					this.$setFlags(384);
					var e = this.$displayList ? this.$displayList : this.$parentDisplayList;
					e && e.markDirty(this)
				}
			}, a.$invalidateTransform = function() {
				var t = this;
				if (!t.$hasFlags(512)) {
					t.$setFlags(512);
					var e = t.$displayList;
					(e || t.$renderNode) && t.$parentDisplayList && t.$parentDisplayList.markDirty(e || t)
				}
			}, a.$getRenderNode = function() {
				var t = this.$renderNode;
				return t ? (128 & this.$displayFlags && (t.cleanBeforeRender(), this.$render(), this.$removeFlags(128), t = this.$renderNode), t) : null
			}, a.$update = function(e, i) {
				var n = this;
				n.$removeFlagsUp(768);
				var r = n.$renderNode;
				r.renderAlpha = n.$getConcatenatedAlpha();
				var s = n.$getConcatenatedMatrix();
				if (e == t.DirtyRegionPolicy.OFF) {
					var a = n.$displayList || n.$parentDisplayList;
					if (!a) return !1;
					var o = r.renderMatrix;
					o.copyFrom(s);
					var h = a.root;
					h !== n.$stage && n.$getConcatenatedMatrixAt(h, o)
				} else {
					var l = i || n.$getContentBounds();
					r.renderVisible = n.$getConcatenatedVisible();
					var a = n.$displayList || n.$parentDisplayList,
						u = r.renderRegion;
					if (!a) return u.setTo(0, 0, 0, 0), r.moved = !1, !1;
					if (!r.moved) return !1;
					r.moved = !1;
					var o = r.renderMatrix;
					o.copyFrom(s);
					var h = a.root;
					h !== n.$stage && n.$getConcatenatedMatrixAt(h, o), u.updateRegion(l, o);
					var c = n.$measureFiltersOffset();
					c && (u.minX += c.minX, u.minY += c.minY, u.maxX += c.maxX, u.maxY += c.maxY, u.updateArea())
				}
				return !0
			}, a.$measureFiltersOffset = function() {
				var e = this.$DisplayObject[20];
				if (e && e.length) {
					for (var i = e.length, n = 0, r = 0, s = 0, a = 0, o = 0; i > o; o++) {
						var h = e[o];
						if ("blur" == h.type) {
							var l = h.blurX,
								u = h.blurY;
							n -= l, r -= u, s += 2 * l, a += 2 * u
						} else if ("glow" == h.type) {
							var l = h.blurX,
								u = h.blurY;
							n -= l, r -= u, s += 2 * l, a += 2 * u;
							var c = h.distance || 0,
								d = h.angle || 0,
								f = 0,
								g = 0;
							0 != c && (f = Math.ceil(c * t.NumberUtils.cos(d)), g = Math.ceil(c * t.NumberUtils.sin(d)), f > 0 ? s += f : 0 > f && (n += f, s -= f), g > 0 ? a += g : 0 > g && (r += g, a -= g))
						}
					}
					return {
						minX: n,
						minY: r,
						maxX: s,
						maxY: a
					}
				}
				return null
			}, a.$getConcatenatedMatrixAt = function(e, i) {
				var n = e.$getInvertedConcatenatedMatrix();
				if (0 === n.a || 0 === n.d) {
					var r = this,
						s = e.$nestLevel;
					for (i.identity(); r.$nestLevel > s;) {
						var a = r.$scrollRect;
						a && i.concat(t.$TempMatrix.setTo(1, 0, 0, 1, -a.x, -a.y)), i.concat(r.$getMatrix()), r = r.$parent
					}
				} else n.$preMultiplyInto(i, i)
			}, a.$getConcatenatedAlphaAt = function(t, e) {
				var i = t.$getConcatenatedAlpha();
				if (0 === i) {
					e = 1;
					for (var n = this, r = t.$nestLevel; n.$nestLevel > r;) e *= n.$alpha, n = n.$parent
				} else e /= i;
				return e
			}, a.$render = function() {}, a.$hitTest = function(t, e) {
				var i = this.$DisplayObject;
				if (!this.$renderNode || !this.$visible || 0 == i[0] || 0 == i[1]) return null;
				var n = this.$getInvertedConcatenatedMatrix();
				if (0 == n.a && 0 == n.b && 0 == n.c && 0 == n.d) return null;
				var r = this.$getContentBounds(),
					s = n.a * t + n.c * e + n.tx,
					a = n.b * t + n.d * e + n.ty;
				if (r.contains(s, a)) {
					if (!this.$children) {
						var o = this.$scrollRect ? this.$scrollRect : this.$maskRect;
						if (o && !o.contains(s, a)) return null;
						if (this.$mask && !this.$mask.$hitTest(t, e)) return null
					}
					return this
				}
				return null
			}, a.hitTestPoint = function(e, i, n) {
				if (n) {
					var r = this.$getInvertedConcatenatedMatrix(),
						s = r.a * e + r.c * i + r.tx,
						a = r.b * e + r.d * i + r.ty,
						o = void 0,
						h = this.$displayList;
					if (h) {
						var l = h.renderBuffer;
						try {
							o = l.getPixels(s - h.offsetX, a - h.offsetY)
						} catch (u) {
							throw new Error(t.sys.tr(1039))
						}
					} else {
						var l = t.sys.customHitTestBuffer;
						l.resize(3, 3);
						var c = t.Matrix.create();
						c.identity(), c.translate(1 - s, 1 - a), t.sys.systemRenderer.render(this, l, c, null, !0), t.Matrix.release(c);
						try {
							o = l.getPixels(1, 1)
						} catch (u) {
							throw new Error(t.sys.tr(1039))
						}
					}
					return 0 === o[3] ? !1 : !0
				}
				var d = this.$DisplayObject;
				if (0 == d[0] || 0 == d[1]) return !1;
				var r = this.$getInvertedConcatenatedMatrix(),
					f = this.getBounds(null, !1),
					s = r.a * e + r.c * i + r.tx,
					a = r.b * e + r.d * i + r.ty;
				if (f.contains(s, a)) {
					var g = this.$scrollRect ? this.$scrollRect : this.$maskRect;
					return g && !g.contains(s, a) ? !1 : !0
				}
				return !1
			}, a.$addListener = function(e, r, s, a, o, h) {
				i.prototype.$addListener.call(this, e, r, s, a, o, h);
				var l = e == t.Event.ENTER_FRAME;
				if (l || e == t.Event.RENDER) {
					var u = l ? n.$enterFrameCallBackList : n.$renderCallBackList; - 1 == u.indexOf(this) && u.push(this)
				}
			}, a.removeEventListener = function(e, r, s, a) {
				i.prototype.removeEventListener.call(this, e, r, s, a);
				var o = e == t.Event.ENTER_FRAME;
				if ((o || e == t.Event.RENDER) && !this.hasEventListener(e)) {
					var h = o ? n.$enterFrameCallBackList : n.$renderCallBackList,
						l = h.indexOf(this); - 1 !== l && h.splice(l, 1)
				}
			}, a.dispatchEvent = function(t) {
				if (!t.$bubbles) return i.prototype.dispatchEvent.call(this, t);
				var e = this.$getPropagationList(this),
					n = .5 * e.length;
				return t.$setTarget(this), this.$dispatchPropagationEvent(t, e, n), !t.$isDefaultPrevented
			}, a.$getPropagationList = function(t) {
				for (var e = []; t;) e.push(t), t = t.$parent;
				var i = e.concat();
				return i.reverse(), e = i.concat(e)
			}, a.$dispatchPropagationEvent = function(t, e, i) {
				for (var n = e.length, r = i - 1, s = 0; n > s; s++) {
					var a = e[s];
					if (t.$currentTarget = a, r > s ? t.$eventPhase = 1 : s == i || s == r ? t.$eventPhase = 2 : t.$eventPhase = 3, a.$notifyListener(t, i > s), t.$isPropagationStopped || t.$isPropagationImmediateStopped) return
				}
			}, a.willTrigger = function(t) {
				for (var e = this; e;) {
					if (e.hasEventListener(t)) return !0;
					e = e.$parent
				}
				return !1
			}, n.defaultTouchEnabled = !1, n.boundsForUpdate = new t.Rectangle, n.$enterFrameCallBackList = [], n.$renderCallBackList = [], n
		}(t.EventDispatcher);
	t.DisplayObject = i, t.registerClass(i, "egret.DisplayObject", ["egret.sys.Renderable"])
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(e) {
			function i(n) {
				e.call(this), this.$scale9Grid = null, this.$fillMode = "scale", this._pixelHitTest = !1, this.$renderNode = new t.sys.BitmapNode, this.$Bitmap = {
					0: null,
					1: null,
					2: 0,
					3: 0,
					4: 0,
					5: 0,
					6: 0,
					7: 0,
					8: 0,
					9: 0,
					10: i.defaultSmoothing,
					11: 0 / 0,
					12: 0 / 0
				}, this.$setBitmapData(n)
			}
			__extends(i, e);
			var n = __define,
				r = i,
				s = r.prototype;
			return s.$onAddToStage = function(i, n) {
				e.prototype.$onAddToStage.call(this, i, n);
				var r = this.$Bitmap[0];
				r && t.BitmapData.$addDisplayObject(this, r)
			}, s.$onRemoveFromStage = function() {
				e.prototype.$onRemoveFromStage.call(this);
				var i = this.$Bitmap[0];
				i && t.BitmapData.$removeDisplayObject(this, i)
			}, n(s, "bitmapData", function() {
				var e = this.$Bitmap[0];
				return e instanceof t.Texture ? null : e
			}, function(t) {
				this.$setBitmapData(t)
			}), n(s, "texture", function() {
				var e = this.$Bitmap[0];
				return e instanceof t.Texture ? e : null
			}, function(t) {
				this.$setBitmapData(t)
			}), s.$setBitmapData = function(e) {
				var i = this.$Bitmap,
					n = i[0];
				if (e == n) return !1;
				if (i[0] = e, !e) return n && t.BitmapData.$removeDisplayObject(this, n), this.setImageData(null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0), this.$invalidateContentBounds(), !0;
				if (this.$refreshImageData(), this.$stage) {
					if (n) {
						var r = void 0;
						r = n._bitmapData && n._bitmapData.hashCode ? n._bitmapData.hashCode : n.hashCode;
						var s = void 0;
						if (s = e._bitmapData && e._bitmapData.hashCode ? e._bitmapData.hashCode : e.hashCode, r == s) return this.$invalidateContentBounds(), !0;
						t.BitmapData.$removeDisplayObject(this, n)
					}
					t.BitmapData.$addDisplayObject(this, e)
				}
				return this.$invalidateContentBounds(), !0
			}, s.$refreshImageData = function() {
				var e = this.$Bitmap,
					i = e[0];
				if (i) if (i instanceof t.Texture) {
					var n = i;
					this.setImageData(n._bitmapData, n._bitmapX, n._bitmapY, n._bitmapWidth, n._bitmapHeight, n._offsetX, n._offsetY, n.$getTextureWidth(), n.$getTextureHeight(), n._sourceWidth, n._sourceHeight)
				} else {
					var r = i.width,
						s = i.height;
					this.setImageData(i, 0, 0, r, s, 0, 0, r, s, r, s)
				}
			}, s.setImageData = function(t, e, i, n, r, s, a, o, h, l, u) {
				var c = this.$Bitmap;
				c[1] = t, c[2] = e, c[3] = i, c[4] = n, c[5] = r, c[6] = s, c[7] = a, c[8] = o, c[9] = h, c[13] = l, c[14] = u
			}, n(s, "scale9Grid", function() {
				return this.$scale9Grid
			}, function(t) {
				this.$scale9Grid = t, this.$invalidateContentBounds()
			}), n(s, "fillMode", function() {
				return this.$fillMode
			}, function(t) {
				this.$setFillMode(t)
			}), s.$setFillMode = function(t) {
				return t == this.$fillMode ? !1 : (this.$fillMode = t, !0)
			}, n(s, "smoothing", function() {
				var t = this.$Bitmap;
				return t[10]
			}, function(t) {
				t = !! t;
				var e = this.$Bitmap;
				t != e[10] && (e[10] = t, this.$invalidate())
			}), s.$setWidth = function(t) {
				var e = this.$Bitmap;
				return 0 > t || t == e[11] ? !1 : (e[11] = t, this.$invalidateContentBounds(), !0)
			}, s.$setHeight = function(t) {
				var e = this.$Bitmap;
				return 0 > t || t == e[12] ? !1 : (e[12] = t, this.$invalidateContentBounds(), !0)
			}, s.$getWidth = function() {
				var t = this.$Bitmap;
				return isNaN(t[11]) ? this.$getContentBounds().width : t[11]
			}, s.$getHeight = function() {
				var t = this.$Bitmap;
				return isNaN(t[12]) ? this.$getContentBounds().height : t[12]
			}, s.$measureContentBounds = function(t) {
				var e = this.$Bitmap;
				if (e[1]) {
					var i = this.$Bitmap,
						n = isNaN(i[11]) ? i[8] : i[11],
						r = isNaN(i[12]) ? i[9] : i[12];
					t.setTo(0, 0, n, r)
				} else {
					var n = isNaN(e[11]) ? 0 : e[11],
						r = isNaN(e[12]) ? 0 : e[12];
					t.setTo(0, 0, n, r)
				}
			}, s.$render = function() {
				var e = this.$Bitmap;
				if (e[1]) {
					var i = isNaN(e[11]) ? e[8] : e[11],
						n = isNaN(e[12]) ? e[9] : e[12];
					t.sys.BitmapNode.$updateTextureData(this.$renderNode, e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], i, n, e[13], e[14], this.scale9Grid || e[0].scale9Grid, this.fillMode, e[10])
				}
			}, n(s, "pixelHitTest", function() {
				return this._pixelHitTest
			}, function(t) {
				this._pixelHitTest = !! t
			}), s.$hitTest = function(t, i) {
				var n = e.prototype.$hitTest.call(this, t, i);
				return n && this._pixelHitTest && (n = this.hitTestPixel(t, i)), n
			}, s.hitTestPixel = function(e, i) {
				var n, r = this.$getInvertedConcatenatedMatrix(),
					s = r.a * e + r.c * i + r.tx,
					a = r.b * e + r.d * i + r.ty,
					o = this.$displayList;
				if (o) {
					var h = o.renderBuffer;
					try {
						n = h.getPixels(s - o.offsetX, a - o.offsetY)
					} catch (l) {
						throw console.log(this.$Bitmap[0]), new Error(t.sys.tr(1039))
					}
				} else {
					var h = t.sys.customHitTestBuffer;
					h.resize(3, 3);
					var u = this.$getRenderNode(),
						c = t.Matrix.create();
					c.identity(), c.translate(1 - s, 1 - a), t.sys.systemRenderer.drawNodeToBuffer(u, h, c, !0), t.Matrix.release(c);
					try {
						n = h.getPixels(1, 1)
					} catch (l) {
						throw console.log(this.$Bitmap[0]), new Error(t.sys.tr(1039))
					}
				}
				return 0 === n[3] ? null : this
			}, i.$drawImage = function(e, i, n, r, s, a, o, h, l, u, c, d, f, g, p, v, $) {
				console.warn("deprecated method : Bitmap.$drawImage,use egret.sys.BitmapNode.$drawImage instead of it"), t.sys.BitmapNode.$updateTextureData(e, i, n, r, s, a, o, h, l, u, c, d, f, g, p, v, $)
			}, i.defaultSmoothing = !0, i
		}(t.DisplayObject);
	t.Bitmap = e, t.registerClass(e, "egret.Bitmap")
}(egret || (egret = {}));
var egret;
!
function(t) {
	function e() {
		var t = Object.create(null);
		return t.__v8__ = void 0, delete t.__v8__, t
	}
	t.createMap = e
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(e) {
			function i(t) {
				e.call(this), this.format = "image", this.$deleteSource = !0, this.source = t, this.width = t.width, this.height = t.height
			}
			__extends(i, e);
			var n = i,
				r = n.prototype;
			return r.$dispose = function() {
				t.Capabilities.runtimeType == t.RuntimeType.WEB && "webgl" == t.Capabilities.renderMode && this.webGLTexture && (t.WebGLUtils.deleteWebGLTexture(this.webGLTexture), this.webGLTexture = null), this.source && this.source.dispose && this.source.dispose(), this.source = null, i.$dispose(this)
			}, i.$addDisplayObject = function(t, e) {
				var n;
				if (n = e._bitmapData && e._bitmapData.hashCode ? e._bitmapData.hashCode : e.hashCode) {
					if (!i._displayList[n]) return void(i._displayList[n] = [t]);
					var r = i._displayList[n];
					r.indexOf(t) < 0 && r.push(t)
				}
			}, i.$removeDisplayObject = function(t, e) {
				var n;
				if (n = e._bitmapData && e._bitmapData.hashCode ? e._bitmapData.hashCode : e.hashCode, n && i._displayList[n]) {
					var r = i._displayList[n],
						s = r.indexOf(t);
					s >= 0 && r.splice(s)
				}
			}, i.$invalidate = function(e) {
				var n;
				if (n = e._bitmapData && e._bitmapData.hashCode ? e._bitmapData.hashCode : e.hashCode, n && i._displayList[n]) for (var r = i._displayList[n], s = 0; s < r.length; s++) r[s] instanceof t.Bitmap && r[s].$refreshImageData(), r[s].$invalidateContentBounds()
			}, i.$dispose = function(e) {
				var n;
				if (n = e._bitmapData && e._bitmapData.hashCode ? e._bitmapData.hashCode : e.hashCode, n && i._displayList[n]) {
					for (var r = i._displayList[n], s = 0; s < r.length; s++) r[s] instanceof t.Bitmap && (r[s].$Bitmap[1] = null), r[s].$invalidateContentBounds();
					delete i._displayList[n]
				}
			}, i._displayList = t.createMap(), i
		}(t.HashObject);
	t.BitmapData = e, t.registerClass(e, "egret.BitmapData")
}(egret || (egret = {}));
var egret;
!
function(t) {
	t.BitmapFillMode = {
		REPEAT: "repeat",
		SCALE: "scale",
		CLIP: "clip"
	}
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function() {
			function t() {}
			var e = t;
			e.prototype;
			return t.NORMAL = "normal", t.ADD = "add", t.ERASE = "erase", t
		}();
	t.BlendMode = e, t.registerClass(e, "egret.BlendMode")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e;
	!
	function(t) {
		function e(t) {
			var e = r[t];
			return void 0 === e ? 0 : e
		}
		function i(t) {
			var e = n[t];
			return void 0 === e ? "normal" : e
		}
		for (var n = ["normal", "add", "erase"], r = {}, s = n.length, a = 0; s > a; a++) {
			var o = n[a];
			r[o] = a
		}
		t.blendModeToNumber = e, t.numberToBlendMode = i
	}(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!
function(t) {
	t.CapsStyle = {
		NONE: "none",
		ROUND: "round",
		SQUARE: "square"
	}
}(egret || (egret = {}));
var egret;
!
function(t) {
	t.DirtyRegionPolicy = {
		OFF: "off",
		ON: "on"
	}
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(e) {
			function i() {
				e.call(this), this.$touchChildren = !0, this.$children = []
			}
			__extends(i, e);
			var n = __define,
				r = i,
				s = r.prototype;
			return s.$propagateFlagsDown = function(t) {
				if (!this.$hasFlags(t)) {
					this.$setFlags(t);
					for (var e = this.$children, i = e.length, n = 0; i > n; n++) e[n].$propagateFlagsDown(t)
				}
			}, n(s, "numChildren", function() {
				return this.$children.length
			}), s.addChild = function(t) {
				var e = this.$children.length;
				return t.$parent == this && e--, this.$doAddChild(t, e)
			}, s.addChildAt = function(t, e) {
				return e = 0 | +e, (0 > e || e >= this.$children.length) && (e = this.$children.length, t.$parent == this && e--), this.$doAddChild(t, e)
			}, s.$doAddChild = function(e, n, r) {
				void 0 === r && (r = !0);
				var s = e.$parent;
				if (s == this) return this.doSetChildIndex(e, n), e;
				s && s.removeChild(e), this.$children.splice(n, 0, e), e.$setParent(this);
				var a = this.$stage;
				if (a && e.$onAddToStage(a, this.$nestLevel + 1), r && e.dispatchEventWith(t.Event.ADDED, !0), a) for (var o = i.$EVENT_ADD_TO_STAGE_LIST; o.length;) {
					var h = o.shift();
					h.$stage && r && h.dispatchEventWith(t.Event.ADDED_TO_STAGE)
				}
				var l = this.$displayList || this.$parentDisplayList;
				return this.assignParentDisplayList(e, l, l), e.$propagateFlagsDown(1648), this.$propagateFlagsUp(4), this.$childAdded(e, n), e
			}, s.contains = function(t) {
				for (; t;) {
					if (t == this) return !0;
					t = t.$parent
				}
				return !1
			}, s.getChildAt = function(t) {
				return t = 0 | +t, t >= 0 && t < this.$children.length ? this.$children[t] : null
			}, s.getChildIndex = function(t) {
				return this.$children.indexOf(t)
			}, s.getChildByName = function(t) {
				for (var e, i = this.$children, n = i.length, r = 0; n > r; r++) if (e = i[r], e.name == t) return e;
				return null
			}, s.removeChild = function(t) {
				var e = this.$children.indexOf(t);
				return e >= 0 ? this.$doRemoveChild(e) : null
			}, s.removeChildAt = function(t) {
				return t = 0 | +t, t >= 0 && t < this.$children.length ? this.$doRemoveChild(t) : null
			}, s.$doRemoveChild = function(e, n) {
				void 0 === n && (n = !0), e = 0 | +e;
				var r = this.$children,
					s = r[e];
				if (this.$childRemoved(s, e), n && s.dispatchEventWith(t.Event.REMOVED, !0), this.$stage) {
					s.$onRemoveFromStage();
					for (var a = i.$EVENT_REMOVE_FROM_STAGE_LIST; a.length > 0;) {
						var o = a.shift();
						n && o.$hasAddToStage && (o.$hasAddToStage = !1, o.dispatchEventWith(t.Event.REMOVED_FROM_STAGE)), o.$hasAddToStage = !1, o.$stage = null
					}
				}
				var h = this.$displayList || this.$parentDisplayList;
				this.assignParentDisplayList(s, h, null), s.$propagateFlagsDown(1648), s.$setParent(null);
				var l = r.indexOf(s);
				return -1 != l && r.splice(l, 1), this.$propagateFlagsUp(4), s
			}, s.setChildIndex = function(t, e) {
				e = 0 | +e, (0 > e || e >= this.$children.length) && (e = this.$children.length - 1), this.doSetChildIndex(t, e)
			}, s.doSetChildIndex = function(t, e) {
				var i = this.$children.indexOf(t);
				i != e && (this.$childRemoved(t, i), this.$children.splice(i, 1), this.$children.splice(e, 0, t), this.$childAdded(t, e), t.$invalidateTransform(), this.$propagateFlagsUp(4))
			}, s.swapChildrenAt = function(t, e) {
				t = 0 | +t, e = 0 | +e, t >= 0 && t < this.$children.length && e >= 0 && e < this.$children.length && this.doSwapChildrenAt(t, e)
			}, s.swapChildren = function(t, e) {
				var i = this.$children.indexOf(t),
					n = this.$children.indexOf(e); - 1 == i || -1 == n || this.doSwapChildrenAt(i, n)
			}, s.doSwapChildrenAt = function(t, e) {
				if (t > e) {
					var i = e;
					e = t, t = i
				} else if (t == e) return;
				var n = this.$children,
					r = n[t],
					s = n[e];
				this.$childRemoved(r, t), this.$childRemoved(s, e), n[t] = s, n[e] = r, this.$childAdded(s, t), this.$childAdded(r, e), r.$invalidateTransform(), s.$invalidateTransform(), this.$propagateFlagsUp(4)
			}, s.removeChildren = function() {
				for (var t = this.$children, e = t.length - 1; e >= 0; e--) this.$doRemoveChild(e)
			}, s.$childAdded = function(t, e) {}, s.$childRemoved = function(t, e) {}, s.$onAddToStage = function(t, i) {
				e.prototype.$onAddToStage.call(this, t, i);
				var n = this.$children,
					r = n.length;
				i++;
				for (var s = 0; r > s; s++) {
					var a = this.$children[s];
					a.$onAddToStage(t, i)
				}
			}, s.$onRemoveFromStage = function() {
				e.prototype.$onRemoveFromStage.call(this);
				for (var t = this.$children, i = t.length, n = 0; i > n; n++) {
					var r = t[n];
					r.$onRemoveFromStage()
				}
			}, s.$measureChildBounds = function(e) {
				var i = this.$children,
					n = i.length;
				if (0 != n) {
					for (var r = 0, s = 0, a = 0, o = 0, h = !1, l = -1; n > l; l++) {
						var u = -1 == l ? e : i[l].$getTransformedBounds(this, t.$TempRectangle);
						u.isEmpty() || (h ? (r = Math.min(r, u.x), s = Math.max(s, u.x + u.width), a = Math.min(a, u.y), o = Math.max(o, u.y + u.height)) : (h = !0, r = u.x, s = r + u.width, a = u.y, o = a + u.height))
					}
					e.setTo(r, a, s - r, o - a)
				}
			}, n(s, "touchChildren", function() {
				return this.$getTouchChildren()
			}, function(t) {
				this.$setTouchChildren( !! t)
			}), s.$getTouchChildren = function() {
				return this.$touchChildren
			}, s.$setTouchChildren = function(t) {
				return this.$touchChildren == t ? !1 : (this.$touchChildren = t, !0)
			}, s.$invalidate = function(t) {
				if (e.prototype.$invalidate.call(this, t), t) {
					var i = this.$displayList || this.$parentDisplayList,
						n = this.$children;
					if (n) for (var r = n.length - 1; r >= 0; r--) this.markChildDirty(n[r], i)
				}
			}, s.$invalidateTransform = function() {
				this.markChildDirty(this, this.$parentDisplayList)
			}, s.markChildDirty = function(t, e) {
				if (!t.$hasFlags(512)) {
					t.$setFlags(512);
					var i = t.$displayList;
					if ((i || t.$renderNode) && e && e.markDirty(i || t), !i) {
						var n = t.$children;
						if (n) for (var r = n.length - 1; r >= 0; r--) this.markChildDirty(n[r], e)
					}
				}
			}, s.$cacheAsBitmapChanged = function() {
				e.prototype.$cacheAsBitmapChanged.call(this);
				for (var t = this.$displayList || this.$parentDisplayList, i = this.$children, n = i.length - 1; n >= 0; n--) this.assignParentDisplayList(i[n], t, t)
			}, s.assignParentDisplayList = function(t, e, i) {
				t.$parentDisplayList = i, t.$setFlags(512);
				var n = t.$displayList;
				if ((t.$renderNode || n) && e && e.markDirty(n || t), !n) {
					var r = t.$children;
					if (r) for (var s = r.length - 1; s >= 0; s--) this.assignParentDisplayList(r[s], e, i)
				}
			}, s.$hitTest = function(t, i) {
				if (!this.$visible) return null;
				var n = this.$getInvertedConcatenatedMatrix(),
					r = n.a * t + n.c * i + n.tx,
					s = n.b * t + n.d * i + n.ty,
					a = this.$scrollRect ? this.$scrollRect : this.$maskRect;
				if (a && !a.contains(r, s)) return null;
				if (this.$mask && !this.$mask.$hitTest(t, i)) return null;
				for (var o = this.$children, h = !1, l = null, u = o.length - 1; u >= 0; u--) {
					var c = o[u];
					if (!c.$maskedObject && (l = c.$hitTest(t, i))) {
						if (h = !0, l.$touchEnabled) break;
						l = null
					}
				}
				return l ? this.$touchChildren ? l : this : h ? this : e.prototype.$hitTest.call(this, t, i)
			}, s.$setAlpha = function(t) {
				return t = +t || 0, t == this.$alpha ? !1 : (this.$alpha = t, this.$propagateFlagsDown(64), this.$invalidate(), this.$invalidateAllChildren(), !0)
			}, s.$invalidateAllChildren = function() {
				var t = this.$children;
				if (t) for (var e = t.length - 1; e >= 0; e--) {
					var i = t[e];
					i.$invalidate(), i.$children && i.$invalidateAllChildren()
				}
			}, i.$EVENT_ADD_TO_STAGE_LIST = [], i.$EVENT_REMOVE_FROM_STAGE_LIST = [], i
		}(t.DisplayObject);
	t.DisplayObjectContainer = e, t.registerClass(e, "egret.DisplayObjectContainer")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function() {
			function t() {}
			var e = t;
			e.prototype;
			return t.LINEAR = "linear", t.RADIAL = "radial", t
		}();
	t.GradientType = e, t.registerClass(e, "egret.GradientType")
}(egret || (egret = {}));
var egret;
!
function(t) {
	function e(t) {
		return t %= 2 * Math.PI, 0 > t && (t += 2 * Math.PI), t
	}
	var i = function(i) {
			function n() {
				i.call(this), this.lastX = 0, this.lastY = 0, this.fillPath = null, this.strokePath = null, this.topLeftStrokeWidth = 0, this.bottomRightStrokeWidth = 0, this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -(1 / 0), this.maxY = -(1 / 0), this.includeLastPosition = !0, this.$renderNode = new t.sys.GraphicsNode
			}
			__extends(n, i);
			var r = n,
				s = r.prototype;
			return s.$setTarget = function(t) {
				this.targetDisplay && (this.targetDisplay.$renderNode = null), t.$renderNode = this.$renderNode, this.targetDisplay = t
			}, s.setStrokeWidth = function(t) {
				switch (t) {
				case 1:
					this.topLeftStrokeWidth = 0, this.bottomRightStrokeWidth = 1;
					break;
				case 3:
					this.topLeftStrokeWidth = 1, this.bottomRightStrokeWidth = 2;
					break;
				default:
					var e = 0 | Math.ceil(.5 * t);
					this.topLeftStrokeWidth = e, this.bottomRightStrokeWidth = e
				}
			}, s.beginFill = function(t, e) {
				void 0 === e && (e = 1), t = +t || 0, e = +e || 0, this.fillPath = this.$renderNode.beginFill(t, e, this.strokePath), this.$renderNode.drawData.length > 1 && this.fillPath.moveTo(this.lastX, this.lastY)
			}, s.beginGradientFill = function(t, e, i, n, r) {
				void 0 === r && (r = null), this.fillPath = this.$renderNode.beginGradientFill(t, e, i, n, r, this.strokePath), this.$renderNode.drawData.length > 1 && this.fillPath.moveTo(this.lastX, this.lastY)
			}, s.endFill = function() {
				this.fillPath = null
			}, s.lineStyle = function(t, e, i, n, r, s, a, o) {
				void 0 === t && (t = 0 / 0), void 0 === e && (e = 0), void 0 === i && (i = 1), void 0 === n && (n = !1), void 0 === r && (r = "normal"), void 0 === s && (s = null), void 0 === a && (a = null), void 0 === o && (o = 3), t = +t || 0, 0 >= t ? (this.strokePath = null, this.setStrokeWidth(0)) : (e = +e || 0, i = +i || 0, o = +o || 0, this.setStrokeWidth(t), this.strokePath = this.$renderNode.lineStyle(t, e, i, s, a, o), this.$renderNode.drawData.length > 1 && this.strokePath.moveTo(this.lastX, this.lastY))
			}, s.drawRect = function(t, e, i, n) {
				t = +t || 0, e = +e || 0, i = +i || 0, n = +n || 0;
				var r = this.fillPath,
					s = this.strokePath;
				r && r.drawRect(t, e, i, n), s && s.drawRect(t, e, i, n), this.extendBoundsByPoint(t + i, e + n), this.updatePosition(t, e), this.$renderNode.dirtyRender = !0
			}, s.drawRoundRect = function(t, e, i, n, r, s) {
				t = +t || 0, e = +e || 0, i = +i || 0, n = +n || 0, r = +r || 0, s = +s || 0;
				var a = this.fillPath,
					o = this.strokePath;
				a && a.drawRoundRect(t, e, i, n, r, s), o && o.drawRoundRect(t, e, i, n, r, s);
				var h = .5 * r | 0,
					l = s ? .5 * s | 0 : h,
					u = t + i,
					c = e + n,
					d = c - l;
				this.extendBoundsByPoint(t, e), this.extendBoundsByPoint(u, c), this.updatePosition(u, d), this.$renderNode.dirtyRender = !0
			}, s.drawCircle = function(t, e, i) {
				t = +t || 0, e = +e || 0, i = +i || 0;
				var n = this.fillPath,
					r = this.strokePath;
				n && n.drawCircle(t, e, i), r && r.drawCircle(t, e, i), this.extendBoundsByPoint(t - i, e - i), this.extendBoundsByPoint(t + i, e + i), this.updatePosition(t + i, e), this.$renderNode.dirtyRender = !0
			}, s.drawEllipse = function(t, e, i, n) {
				t = +t || 0, e = +e || 0, i = +i || 0, n = +n || 0;
				var r = this.fillPath,
					s = this.strokePath;
				r && r.drawEllipse(t, e, i, n), s && s.drawEllipse(t, e, i, n), this.extendBoundsByPoint(t, e), this.extendBoundsByPoint(t + i, e + n), this.updatePosition(t + i, e + .5 * n), this.$renderNode.dirtyRender = !0
			}, s.moveTo = function(t, e) {
				t = +t || 0, e = +e || 0;
				var i = this.fillPath,
					n = this.strokePath;
				i && i.moveTo(t, e), n && n.moveTo(t, e), this.includeLastPosition = !1, this.lastX = t, this.lastY = e, this.$renderNode.dirtyRender = !0
			}, s.lineTo = function(t, e) {
				t = +t || 0, e = +e || 0;
				var i = this.fillPath,
					n = this.strokePath;
				i && i.lineTo(t, e), n && n.lineTo(t, e), this.updatePosition(t, e), this.$renderNode.dirtyRender = !0
			}, s.curveTo = function(t, e, i, n) {
				t = +t || 0, e = +e || 0, i = +i || 0, n = +n || 0;
				var r = this.fillPath,
					s = this.strokePath;
				r && r.curveTo(t, e, i, n), s && s.curveTo(t, e, i, n), this.extendBoundsByPoint(t, e), this.extendBoundsByPoint(i, n), this.updatePosition(i, n), this.$renderNode.dirtyRender = !0
			}, s.cubicCurveTo = function(t, e, i, n, r, s) {
				t = +t || 0, e = +e || 0, i = +i || 0, n = +n || 0, r = +r || 0, s = +s || 0;
				var a = this.fillPath,
					o = this.strokePath;
				a && a.cubicCurveTo(t, e, i, n, r, s), o && o.cubicCurveTo(t, e, i, n, r, s), this.extendBoundsByPoint(t, e), this.extendBoundsByPoint(i, n), this.extendBoundsByPoint(r, s), this.updatePosition(r, s), this.$renderNode.dirtyRender = !0
			}, s.drawArc = function(t, i, n, r, s, a) {
				if (!(0 > n || r === s)) {
					t = +t || 0, i = +i || 0, n = +n || 0, r = +r || 0, s = +s || 0, a = !! a, r = e(r), s = e(s);
					var o = this.fillPath,
						h = this.strokePath;
					o && (o.$lastX = this.lastX, o.$lastY = this.lastY, o.drawArc(t, i, n, r, s, a)), h && (h.$lastX = this.lastX, h.$lastY = this.lastY, h.drawArc(t, i, n, r, s, a)), a ? this.arcBounds(t, i, n, s, r) : this.arcBounds(t, i, n, r, s);
					var l = t + Math.cos(s) * n,
						u = i + Math.sin(s) * n;
					this.updatePosition(l, u), this.$renderNode.dirtyRender = !0
				}
			}, s.arcBounds = function(t, e, i, n, r) {
				var s = Math.PI;
				if (Math.abs(n - r) < .01) return this.extendBoundsByPoint(t - i, e - i), void this.extendBoundsByPoint(t + i, e + i);
				n > r && (r += 2 * s);
				for (var a = Math.cos(n) * i, o = Math.cos(r) * i, h = Math.min(a, o), l = Math.max(a, o), u = Math.sin(n) * i, c = Math.sin(r) * i, d = Math.min(u, c), f = Math.max(u, c), g = n / (.5 * s), p = r / (.5 * s), v = Math.ceil(g); p >= v; v++) switch (v % 4) {
				case 0:
					l = i;
					break;
				case 1:
					f = i;
					break;
				case 2:
					h = -i;
					break;
				case 3:
					d = -i
				}
				h = Math.floor(h), d = Math.floor(d), l = Math.ceil(l), f = Math.ceil(f), this.extendBoundsByPoint(h + t, d + e), this.extendBoundsByPoint(l + t, f + e)
			}, s.clear = function() {
				this.$renderNode.clear(), this.updatePosition(0, 0), this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -(1 / 0), this.maxY = -(1 / 0)
			}, s.extendBoundsByPoint = function(t, e) {
				this.extendBoundsByX(t), this.extendBoundsByY(e)
			}, s.extendBoundsByX = function(t) {
				this.minX = Math.min(this.minX, t - this.topLeftStrokeWidth), this.maxX = Math.max(this.maxX, t + this.bottomRightStrokeWidth), this.updateNodeBounds()
			}, s.extendBoundsByY = function(t) {
				this.minY = Math.min(this.minY, t - this.topLeftStrokeWidth), this.maxY = Math.max(this.maxY, t + this.bottomRightStrokeWidth), this.updateNodeBounds()
			}, s.updateNodeBounds = function() {
				var t = this.$renderNode;
				t.x = this.minX, t.y = this.minY, t.width = Math.ceil(this.maxX - this.minX), t.height = Math.ceil(this.maxY - this.minY)
			}, s.updatePosition = function(t, e) {
				this.includeLastPosition || (this.extendBoundsByPoint(this.lastX, this.lastY), this.includeLastPosition = !0), this.lastX = t, this.lastY = e, this.extendBoundsByPoint(t, e), this.targetDisplay.$invalidateContentBounds()
			}, s.$measureContentBounds = function(t) {
				this.minX === 1 / 0 ? t.setEmpty() : t.setTo(this.minX, this.minY, this.maxX - this.minX, this.maxY - this.minY)
			}, s.$hitTest = function(e, i) {
				var n = this.targetDisplay,
					r = n.$getInvertedConcatenatedMatrix(),
					s = r.a * e + r.c * i + r.tx,
					a = r.b * e + r.d * i + r.ty,
					o = t.sys.canvasHitTestBuffer;
				o.resize(3, 3);
				var h = this.$renderNode,
					l = t.Matrix.create();
				l.identity(), l.translate(1 - s, 1 - a), t.sys.canvasRenderer.drawNodeToBuffer(h, o, l, !0), t.Matrix.release(l);
				try {
					var u = o.getPixels(1, 1);
					if (0 === u[3]) return null
				} catch (c) {
					throw new Error(t.sys.tr(1039))
				}
				return n
			}, s.$onRemoveFromStage = function() {
				this.$renderNode && this.$renderNode.clean()
			}, n
		}(t.HashObject);
	t.Graphics = i, t.registerClass(i, "egret.Graphics")
}(egret || (egret = {}));
var egret;
!
function(t) {
	t.JointStyle = {
		BEVEL: "bevel",
		MITER: "miter",
		ROUND: "round"
	}
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(e) {
			function i(i) {
				e.call(this, i), this._verticesDirty = !0, this._bounds = new t.Rectangle, this.$renderNode = new t.sys.MeshNode
			}
			__extends(i, e);
			var n = i,
				r = n.prototype;
			return r.$render = function() {
				var e = this.$Bitmap,
					i = e[1];
				if (i) {
					var n = (t.$TextureScaleFactor, this.$renderNode);
					n.smoothing = e[10], n.image = i, n.imageWidth = e[13], n.imageHeight = e[14];
					var r = isNaN(e[11]) ? e[8] : e[11],
						s = isNaN(e[12]) ? e[9] : e[12],
						a = r / e[8],
						o = s / e[9],
						h = e[4],
						l = e[5];
					n.drawMesh(e[2], e[3], h, l, e[6] * a, e[7] * o, a * h, o * l)
				}
			}, r.$updateVertices = function() {
				this._verticesDirty = !0, this.$invalidateContentBounds()
			}, r.$measureContentBounds = function(t) {
				if (this._verticesDirty) {
					this._verticesDirty = !1;
					var e = this.$renderNode,
						i = e.vertices;
					if (i.length) {
						this._bounds.setTo(Number.MAX_VALUE, Number.MAX_VALUE, Number.MIN_VALUE, Number.MIN_VALUE);
						for (var n = 0, r = i.length; r > n; n += 2) {
							var s = i[n],
								a = i[n + 1];
							this._bounds.x > s && (this._bounds.x = s), this._bounds.width < s && (this._bounds.width = s), this._bounds.y > a && (this._bounds.y = a), this._bounds.height < a && (this._bounds.height = a)
						}
						this._bounds.width -= this._bounds.x, this._bounds.height -= this._bounds.y
					} else this._bounds.setTo(0, 0, 0, 0);
					e.bounds.copyFrom(this._bounds)
				}
				t.copyFrom(this._bounds)
			}, i
		}(t.Bitmap);
	t.Mesh = e, t.registerClass(e, "egret.Mesh")
}(egret || (egret = {}));
var egret;
!
function(t) {
	t.OrientationMode = {
		AUTO: "auto",
		PORTRAIT: "portrait",
		LANDSCAPE: "landscape",
		LANDSCAPE_FLIPPED: "landscapeFlipped"
	}
}(egret || (egret = {}));
var egret;
!
function(t) {
	t.$TextureScaleFactor = 1;
	var e = function(e) {
			function i() {
				e.call(this), this._bitmapX = 0, this._bitmapY = 0, this._bitmapWidth = 0, this._bitmapHeight = 0, this._offsetX = 0, this._offsetY = 0, this._textureWidth = 0, this._textureHeight = 0, this._sourceWidth = 0, this._sourceHeight = 0, this._bitmapData = null
			}
			__extends(i, e);
			var n = __define,
				r = i,
				s = r.prototype;
			return n(s, "textureWidth", function() {
				return this.$getTextureWidth()
			}), s.$getTextureWidth = function() {
				return this._textureWidth
			}, n(s, "textureHeight", function() {
				return this.$getTextureHeight()
			}), s.$getTextureHeight = function() {
				return this._textureHeight
			}, s.$getScaleBitmapWidth = function() {
				return this._bitmapWidth * t.$TextureScaleFactor
			}, s.$getScaleBitmapHeight = function() {
				return this._bitmapHeight * t.$TextureScaleFactor
			}, n(s, "bitmapData", function() {
				return this._bitmapData
			}, function(t) {
				this._setBitmapData(t)
			}), s._setBitmapData = function(e) {
				this._bitmapData = e;
				var i = t.$TextureScaleFactor,
					n = e.width * i,
					r = e.height * i;
				this.$initData(0, 0, n, r, 0, 0, n, r, e.width, e.height)
			}, s.$initData = function(e, i, n, r, s, a, o, h, l, u) {
				var c = t.$TextureScaleFactor;
				this._bitmapX = e / c, this._bitmapY = i / c, this._bitmapWidth = n / c, this._bitmapHeight = r / c, this._offsetX = s, this._offsetY = a, this._textureWidth = o, this._textureHeight = h, this._sourceWidth = l, this._sourceHeight = u, t.BitmapData.$invalidate(this)
			}, s.getPixel32 = function(t, e) {
				throw new Error
			}, s.getPixels = function(t, e, i, n) {
				throw void 0 === i && (i = 1), void 0 === n && (n = 1), new Error
			}, s.toDataURL = function(t, e) {
				throw new Error
			}, s.saveToFile = function(t, e, i) {
				throw new Error
			}, s.dispose = function() {
				this._bitmapData && (this._bitmapData.$dispose(), this._bitmapData = null)
			}, i
		}(t.HashObject);
	t.Texture = e, t.registerClass(e, "egret.Texture")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(e) {
			function i() {
				e.call(this), this.$renderBuffer = new t.sys.RenderBuffer;
				var i = new t.BitmapData(this.$renderBuffer.surface);
				i.$deleteSource = !1, this._setBitmapData(i)
			}
			__extends(i, e);
			var n = i,
				r = n.prototype;
			return r.drawToTexture = function(e, i, n) {
				if (void 0 === n && (n = 1), i && (0 == i.width || 0 == i.height)) return !1;
				var r = i || e.$getOriginalBounds();
				if (0 == r.width || 0 == r.height) return !1;
				n /= t.$TextureScaleFactor;
				var s = (r.x + r.width) * n,
					a = (r.y + r.height) * n;
				i && (s = r.width * n, a = r.height * n);
				var o = this.$renderBuffer;
				if (!o) return !1;
				o.resize(s, a), this._bitmapData.width = s, this._bitmapData.height = a;
				var h = t.Matrix.create();
				return h.identity(), i && h.translate(-i.x, -i.y), h.scale(n, n), t.sys.systemRenderer.render(e, o, h, null, !0), t.Matrix.release(h), this.$initData(0, 0, s, a, 0, 0, s, a, s, a), !0
			}, r.getPixel32 = function(e, i) {
				var n;
				if (this.$renderBuffer) {
					var r = t.$TextureScaleFactor;
					e = Math.round(e / r), i = Math.round(i / r), n = this.$renderBuffer.getPixels(e, i, 1, 1)
				}
				return n
			}, r.dispose = function() {
				e.prototype.dispose.call(this), this.$renderBuffer = null
			}, i
		}(t.Texture);
	t.RenderTexture = e, t.registerClass(e, "egret.RenderTexture")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(e) {
			function i() {
				e.call(this), this.$graphics = new t.Graphics, this.$graphics.$setTarget(this)
			}
			__extends(i, e);
			var n = __define,
				r = i,
				s = r.prototype;
			return n(s, "graphics", function() {
				return this.$graphics
			}), s.$measureContentBounds = function(t) {
				this.$graphics.$measureContentBounds(t)
			}, s.$hitTest = function(t, i) {
				var n = e.prototype.$hitTest.call(this, t, i);
				return n == this && (n = this.$graphics.$hitTest(t, i)), n
			}, s.$onRemoveFromStage = function() {
				e.prototype.$onRemoveFromStage.call(this), this.$graphics && this.$graphics.$onRemoveFromStage()
			}, i
		}(t.DisplayObject);
	t.Shape = e, t.registerClass(e, "egret.Shape")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(e) {
			function i() {
				e.call(this), this.$graphics = new t.Graphics, this.$graphics.$setTarget(this)
			}
			__extends(i, e);
			var n = __define,
				r = i,
				s = r.prototype;
			return n(s, "graphics", function() {
				return this.$graphics
			}), s.$hitTest = function(e, i) {
				if (!this.$visible) return null;
				var n = this.$getInvertedConcatenatedMatrix(),
					r = n.a * e + n.c * i + n.tx,
					s = n.b * e + n.d * i + n.ty,
					a = this.$scrollRect ? this.$scrollRect : this.$maskRect;
				if (a && !a.contains(r, s)) return null;
				if (this.$mask && !this.$mask.$hitTest(e, i)) return null;
				for (var o = this.$children, h = !1, l = null, u = o.length - 1; u >= 0; u--) {
					var c = o[u];
					if (!c.$maskedObject && (l = c.$hitTest(e, i))) {
						if (h = !0, l.$touchEnabled) break;
						l = null
					}
				}
				return l ? this.$touchChildren ? l : this : h ? this : (l = t.DisplayObject.prototype.$hitTest.call(this, e, i), l && (l = this.$graphics.$hitTest(e, i)), l)
			}, s.$measureContentBounds = function(t) {
				this.$graphics.$measureContentBounds(t)
			}, s.$onRemoveFromStage = function() {
				e.prototype.$onRemoveFromStage.call(this), this.$graphics && this.$graphics.$onRemoveFromStage()
			}, i
		}(t.DisplayObjectContainer);
	t.Sprite = e, t.registerClass(e, "egret.Sprite")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(e) {
			function i(i) {
				e.call(this), this._bitmapX = 0, this._bitmapY = 0, this._textureMap = t.createMap(), this.$texture = i, this._bitmapX = i._bitmapX - i._offsetX, this._bitmapY = i._bitmapY - i._offsetY
			}
			__extends(i, e);
			var n = i,
				r = n.prototype;
			return r.getTexture = function(t) {
				return this._textureMap[t]
			}, r.createTexture = function(e, i, n, r, s, a, o, h, l) {
				void 0 === a && (a = 0), void 0 === o && (o = 0), void 0 === h && (h = a + r), void 0 === l && (l = o + s);
				var u = new t.Texture;
				return u._bitmapData = this.$texture._bitmapData, u.$initData(this._bitmapX + i, this._bitmapY + n, r, s, a, o, h, l, this.$texture._sourceWidth, this.$texture._sourceHeight), this._textureMap[e] = u, u
			}, r.dispose = function() {
				this.$texture && this.$texture.dispose()
			}, i
		}(t.HashObject);
	t.SpriteSheet = e, t.registerClass(e, "egret.SpriteSheet")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(e) {
			function i() {
				e.call(this), this.$stageWidth = 0, this.$stageHeight = 0, this.$scaleMode = t.StageScaleMode.SHOW_ALL, this.$orientation = t.OrientationMode.AUTO, this.$maxTouches = 99, this.$dirtyRegionPolicy = t.DirtyRegionPolicy.ON, this.$stage = this, this.$nestLevel = 1
			}
			__extends(i, e);
			var n = __define,
				r = i,
				s = r.prototype;
			return n(s, "frameRate", function() {
				return t.sys.$ticker.$frameRate
			}, function(e) {
				t.sys.$ticker.$setFrameRate(e)
			}), n(s, "stageWidth", function() {
				return this.$stageWidth
			}), n(s, "stageHeight", function() {
				return this.$stageHeight
			}), s.invalidate = function() {
				t.sys.$invalidateRenderFlag = !0
			}, s.registerImplementation = function(e, i) {
				t.registerImplementation(e, i)
			}, s.getImplementation = function(e) {
				return t.getImplementation(e)
			}, n(s, "scaleMode", function() {
				return this.$scaleMode
			}, function(t) {
				this.$scaleMode != t && (this.$scaleMode = t, this.$screen.updateScreenSize())
			}), n(s, "orientation", function() {
				return this.$orientation
			}, function(t) {
				this.$orientation != t && (this.$orientation = t, this.$screen.updateScreenSize())
			}), n(s, "textureScaleFactor", function() {
				return t.$TextureScaleFactor
			}, function(e) {
				t.$TextureScaleFactor = e
			}), n(s, "maxTouches", function() {
				return this.$maxTouches
			}, function(t) {
				this.$maxTouches != t && (this.$maxTouches = t, this.$screen.updateMaxTouches())
			}), n(s, "dirtyRegionPolicy", function() {
				return this.$dirtyRegionPolicy
			}, function(t) {
				this.$dirtyRegionPolicy != t && (this.$dirtyRegionPolicy = t, this.$displayList.setDirtyRegionPolicy(t))
			}), s.setContentSize = function(t, e) {
				this.$screen.setContentSize(t, e)
			}, i
		}(t.DisplayObjectContainer);
	t.Stage = e, t.registerClass(e, "egret.Stage")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(t) {
			function e(e, i, n, r) {
				t.call(this), this.$eventPhase = 2, this.$currentTarget = null, this.$target = null, this.$isDefaultPrevented = !1, this.$isPropagationStopped = !1, this.$isPropagationImmediateStopped = !1, this.$type = e, this.$bubbles = !! i, this.$cancelable = !! n, this.data = r
			}
			__extends(e, t);
			var i = __define,
				n = e,
				r = n.prototype;
			return i(r, "type", function() {
				return this.$type
			}), i(r, "bubbles", function() {
				return this.$bubbles
			}), i(r, "cancelable", function() {
				return this.$cancelable
			}), i(r, "eventPhase", function() {
				return this.$eventPhase
			}), i(r, "currentTarget", function() {
				return this.$currentTarget
			}), i(r, "target", function() {
				return this.$target
			}), r.$setTarget = function(t) {
				return this.$target = t, !0
			}, r.isDefaultPrevented = function() {
				return this.$isDefaultPrevented
			}, r.preventDefault = function() {
				this.$cancelable && (this.$isDefaultPrevented = !0)
			}, r.stopPropagation = function() {
				this.$bubbles && (this.$isPropagationStopped = !0)
			}, r.stopImmediatePropagation = function() {
				this.$bubbles && (this.$isPropagationImmediateStopped = !0)
			}, r.clean = function() {
				this.data = this.$currentTarget = null, this.$setTarget(null)
			}, e.dispatchEvent = function(t, i, n, r) {
				void 0 === n && (n = !1);
				var s = e.create(e, i, n),
					a = e._getPropertyData(e);
				void 0 != r && (a.data = r);
				var o = t.dispatchEvent(s);
				return e.release(s), o
			}, e._getPropertyData = function(t) {
				var e = t._props;
				return e || (e = t._props = {}), e
			}, e.create = function(t, e, i, n) {
				var r = t.eventPool;
				if (r || (r = t.eventPool = []), r.length) {
					var s = r.pop();
					return s.$type = e, s.$bubbles = !! i, s.$cancelable = !! n, s.$isDefaultPrevented = !1, s.$isPropagationStopped = !1, s.$isPropagationImmediateStopped = !1, s.$eventPhase = 2, s
				}
				return new t(e, i, n)
			}, e.release = function(t) {
				t.clean();
				var e = Object.getPrototypeOf(t).constructor;
				e.eventPool.push(t)
			}, e.ADDED_TO_STAGE = "addedToStage", e.REMOVED_FROM_STAGE = "removedFromStage", e.ADDED = "added", e.REMOVED = "removed", e.ENTER_FRAME = "enterFrame", e.RENDER = "render", e.RESIZE = "resize", e.CHANGE = "change", e.CHANGING = "changing", e.COMPLETE = "complete", e.LOOP_COMPLETE = "loopComplete", e.FOCUS_IN = "focusIn", e.FOCUS_OUT = "focusOut", e.ENDED = "ended", e.ACTIVATE = "activate", e.DEACTIVATE = "deactivate", e.CLOSE = "close", e.CONNECT = "connect", e.LEAVE_STAGE = "leaveStage", e.SOUND_COMPLETE = "soundComplete", e
		}(t.HashObject);
	t.Event = e, t.registerClass(e, "egret.Event")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(t) {
			function e(e, i, n) {
				void 0 === i && (i = !1), void 0 === n && (n = !1), t.call(this, e, i, n)
			}
			__extends(e, t);
			var i = e;
			i.prototype;
			return e.FOCUS_IN = "focusIn", e.FOCUS_OUT = "focusOut", e
		}(t.Event);
	t.FocusEvent = e, t.registerClass(e, "egret.FocusEvent")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(t) {
			function e() {
				t.apply(this, arguments)
			}
			__extends(e, t);
			var i = e;
			i.prototype;
			return e.PERMISSION_DENIED = "permissionDenied", e.UNAVAILABLE = "unavailable", e
		}(t.Event);
	t.GeolocationEvent = e, t.registerClass(e, "egret.GeolocationEvent")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(e) {
			function i(t, i, n) {
				void 0 === i && (i = !1), void 0 === n && (n = !1), e.call(this, t, i, n), this._status = 0
			}
			__extends(i, e);
			var n = __define,
				r = i,
				s = r.prototype;
			return n(s, "status", function() {
				return this._status
			}), i.dispatchHTTPStatusEvent = function(e, n) {
				var r = t.Event.create(i, i.HTTP_STATUS);
				r._status = n;
				var s = e.dispatchEvent(r);
				return t.Event.release(r), s
			}, i.HTTP_STATUS = "httpStatus", i
		}(t.Event);
	t.HTTPStatusEvent = e, t.registerClass(e, "egret.HTTPStatusEvent")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(e) {
			function i(t, i, n) {
				void 0 === i && (i = !1), void 0 === n && (n = !1), e.call(this, t, i, n)
			}
			__extends(i, e);
			var n = i;
			n.prototype;
			return i.dispatchIOErrorEvent = function(e) {
				var n = t.Event.create(i, i.IO_ERROR),
					r = e.dispatchEvent(n);
				return t.Event.release(n), r
			}, i.IO_ERROR = "ioError", i
		}(t.Event);
	t.IOErrorEvent = e, t.registerClass(e, "egret.IOErrorEvent")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(t) {
			function e() {
				t.apply(this, arguments)
			}
			__extends(e, t);
			var i = e;
			i.prototype;
			return e
		}(t.Event);
	t.MotionEvent = e, t.registerClass(e, "egret.MotionEvent")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(t) {
			function e() {
				t.apply(this, arguments)
			}
			__extends(e, t);
			var i = e;
			i.prototype;
			return e
		}(t.Event);
	t.OrientationEvent = e, t.registerClass(e, "egret.OrientationEvent")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(e) {
			function i(t, i, n, r, s) {
				void 0 === i && (i = !1), void 0 === n && (n = !1), void 0 === r && (r = 0), void 0 === s && (s = 0), e.call(this, t, i, n), this.bytesLoaded = 0, this.bytesTotal = 0, this.bytesLoaded = r, this.bytesTotal = s
			}
			__extends(i, e);
			var n = i;
			n.prototype;
			return i.dispatchProgressEvent = function(e, n, r, s) {
				void 0 === r && (r = 0), void 0 === s && (s = 0);
				var a = t.Event.create(i, n);
				a.bytesLoaded = r, a.bytesTotal = s;
				var o = e.dispatchEvent(a);
				return t.Event.release(a), o
			}, i.PROGRESS = "progress", i.SOCKET_DATA = "socketData", i
		}(t.Event);
	t.ProgressEvent = e, t.registerClass(e, "egret.ProgressEvent")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(e) {
			function i(t, i, n) {
				void 0 === i && (i = !1), void 0 === n && (n = !1), e.call(this, t, i, n)
			}
			__extends(i, e);
			var n = i;
			n.prototype;
			return i.dispatchStageOrientationEvent = function(e, n) {
				var r = t.Event.create(i, n),
					s = e.dispatchEvent(r);
				return t.Event.release(r), s
			}, i.ORIENTATION_CHANGE = "orientationChange", i
		}(t.Event);
	t.StageOrientationEvent = e, t.registerClass(e, "egret.StageOrientationEvent")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(e) {
			function i(t, i, n, r) {
				void 0 === i && (i = !1), void 0 === n && (n = !1), void 0 === r && (r = ""), e.call(this, t, i, n), this.text = r
			}
			__extends(i, e);
			var n = i;
			n.prototype;
			return i.dispatchTextEvent = function(e, n, r) {
				var s = t.Event.create(i, n);
				s.text = r;
				var a = e.dispatchEvent(s);
				return t.Event.release(s), a
			}, i.LINK = "link", i
		}(t.Event);
	t.TextEvent = e, t.registerClass(e, "egret.TextEvent")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(e) {
			function i(t, i, n) {
				e.call(this, t, i, n)
			}
			__extends(i, e);
			var n = i,
				r = n.prototype;
			return r.updateAfterEvent = function() {
				t.sys.$requestRenderingFlag = !0
			}, i.dispatchTimerEvent = function(e, n, r, s) {
				var a = t.Event.create(i, n, r, s),
					o = e.dispatchEvent(a);
				return t.Event.release(a), o
			}, i.TIMER = "timer", i.TIMER_COMPLETE = "timerComplete", i
		}(t.Event);
	t.TimerEvent = e, t.registerClass(e, "egret.TimerEvent")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = [],
		i = Math.PI / 180,
		n = function(n) {
			function r(t, e) {
				void 0 === t && (t = 0), void 0 === e && (e = 0), n.call(this), this.x = t, this.y = e
			}
			__extends(r, n);
			var s = __define,
				a = r,
				o = a.prototype;
			return r.release = function(t) {
				t && e.push(t)
			}, r.create = function(t, i) {
				var n = e.pop();
				return n || (n = new r), n.setTo(t, i)
			}, s(o, "length", function() {
				return Math.sqrt(this.x * this.x + this.y * this.y)
			}), o.setTo = function(t, e) {
				return this.x = t, this.y = e, this
			}, o.clone = function() {
				return new r(this.x, this.y)
			}, o.equals = function(t) {
				return this.x == t.x && this.y == t.y
			}, r.distance = function(t, e) {
				return Math.sqrt((t.x - e.x) * (t.x - e.x) + (t.y - e.y) * (t.y - e.y))
			}, o.copyFrom = function(t) {
				this.x = t.x, this.y = t.y
			}, o.add = function(t) {
				return new r(this.x + t.x, this.y + t.y)
			}, r.interpolate = function(t, e, i) {
				var n = 1 - i;
				return new r(t.x * i + e.x * n, t.y * i + e.y * n)
			}, o.normalize = function(t) {
				if (0 != this.x || 0 != this.y) {
					var e = t / this.length;
					this.x *= e, this.y *= e
				}
			}, o.offset = function(t, e) {
				this.x += t, this.y += e
			}, r.polar = function(e, n) {
				return new r(e * t.NumberUtils.cos(n / i), e * t.NumberUtils.sin(n / i))
			}, o.subtract = function(t) {
				return new r(this.x - t.x, this.y - t.y)
			}, o.toString = function() {
				return "(x=" + this.x + ", y=" + this.y + ")"
			}, r
		}(t.HashObject);
	t.Point = n, t.registerClass(n, "egret.Point"), t.$TempPoint = new n
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = new t.Point,
		i = function(i) {
			function n(t, e, n, r, s, a) {
				i.call(this, t, e, n), this.targetChanged = !0, this.touchDown = !1, this.$initTo(r, s, a)
			}
			__extends(n, i);
			var r = __define,
				s = n,
				a = s.prototype;
			return a.$initTo = function(t, e, i) {
				this.touchPointID = +i || 0, this.$stageX = +t || 0, this.$stageY = +e || 0
			}, r(a, "stageX", function() {
				return this.$stageX
			}), r(a, "stageY", function() {
				return this.$stageY
			}), r(a, "localX", function() {
				return this.targetChanged && this.getLocalXY(), this._localX
			}), r(a, "localY", function() {
				return this.targetChanged && this.getLocalXY(), this._localY
			}), a.getLocalXY = function() {
				this.targetChanged = !1;
				var t = this.$target.$getInvertedConcatenatedMatrix();
				t.transformPoint(this.$stageX, this.$stageY, e), this._localX = e.x, this._localY = e.y
			}, a.$setTarget = function(t) {
				return this.$target = t, this.targetChanged = !! t, !0
			}, a.updateAfterEvent = function() {
				t.sys.$requestRenderingFlag = !0
			}, n.dispatchTouchEvent = function(e, i, r, s, a, o, h, l) {
				if (void 0 === l && (l = !1), !r && !e.hasEventListener(i)) return !0;
				var u = t.Event.create(n, i, r, s);
				u.$initTo(a, o, h), u.touchDown = l;
				var c = e.dispatchEvent(u);
				return t.Event.release(u), c
			}, n.TOUCH_MOVE = "touchMove", n.TOUCH_BEGIN = "touchBegin", n.TOUCH_END = "touchEnd", n.TOUCH_CANCEL = "touchcancel", n.TOUCH_TAP = "touchTap", n.TOUCH_RELEASE_OUTSIDE = "touchReleaseOutside", n.TOUCH_ROLL_OUT = "touchRollOut", n.TOUCH_ROLL_OVER = "touchRollOver", n
		}(t.Event);
	t.TouchEvent = i, t.registerClass(i, "egret.TouchEvent")
}(egret || (egret = {}));
var egret;
!
function(t) {}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(t) {
			function e() {
				t.apply(this, arguments), this.type = null, this.$targets = []
			}
			__extends(e, t);
			var i = e,
				n = i.prototype;
			return n.$addTarget = function(t) {
				for (var e = this.$targets.length, i = 0; e > i; i++) if (this.$targets[i].$hashCode == t.$hashCode) return;
				this.$targets.push(t)
			}, n.$removeTarget = function(t) {
				for (var e = this.$targets.length, i = 0; e > i; i++) if (this.$targets[i].$hashCode == t.$hashCode) return void this.$targets.splice(i, 1)
			}, n.invalidate = function() {
				for (var t = this.$targets.length, e = 0; t > e; e++) this.$targets[e].$invalidateContentBounds()
			}, n.$toJson = function() {
				return ""
			}, e
		}(t.HashObject);
	t.Filter = e, t.registerClass(e, "egret.Filter")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(t) {
			function e(e, i, n) {
				void 0 === e && (e = 4), void 0 === i && (i = 4), void 0 === n && (n = 1), t.call(this), this.type = "blur", this.$blurX = e, this.$blurY = i, this.$quality = n
			}
			__extends(e, t);
			var i = __define,
				n = e,
				r = n.prototype;
			return i(r, "blurX", function() {
				return this.$blurX
			}, function(t) {
				this.$blurX != t && (this.$blurX = t, this.invalidate())
			}), i(r, "blurY", function() {
				return this.$blurY
			}, function(t) {
				this.$blurY != t && (this.$blurY = t, this.invalidate())
			}), r.$toJson = function() {
				return '{"blurX": ' + this.$blurX + ', "blurY": ' + this.$blurY + ', "quality": 1}'
			}, e
		}(t.Filter);
	t.BlurFilter = e, t.registerClass(e, "egret.BlurFilter")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(t) {
			function e(e) {
				void 0 === e && (e = null), t.call(this), this.$matrix = [], this.matrix2 = [], this.type = "colorTransform", this.setMatrix(e)
			}
			__extends(e, t);
			var i = __define,
				n = e,
				r = n.prototype;
			return i(r, "matrix", function() {
				for (var t = 0; 20 > t; t++) this.matrix2[t] = this.$matrix[t];
				return this.matrix2
			}, function(t) {
				this.setMatrix(t), this.invalidate()
			}), r.setMatrix = function(t) {
				if (t) for (var e = 0; 20 > e; e++) this.$matrix[e] = t[e];
				else for (var e = 0; 20 > e; e++) this.$matrix[e] = 0 == e || 6 == e || 12 == e || 18 == e ? 1 : 0
			}, r.$toJson = function() {
				return '{"matrix": [' + this.$matrix.toString() + "]}"
			}, e
		}(t.Filter);
	t.ColorMatrixFilter = e, t.registerClass(e, "egret.ColorMatrixFilter")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(t) {
			function e(e, i, n, r, s, a, o, h) {
				void 0 === e && (e = 16711680), void 0 === i && (i = 1), void 0 === n && (n = 6), void 0 === r && (r = 6), void 0 === s && (s = 2), void 0 === a && (a = 1), void 0 === o && (o = !1), void 0 === h && (h = !1), t.call(this), this.type = "glow", this.$color = e, this.$blue = 255 & e, this.$green = (65280 & e) >> 8, this.$red = e >> 16, this.$alpha = i, this.$blurX = n, this.$blurY = r, this.$strength = s, this.$quality = a, this.$inner = o, this.$knockout = h
			}
			__extends(e, t);
			var i = __define,
				n = e,
				r = n.prototype;
			return i(r, "color", function() {
				return this.$color
			}, function(t) {
				this.$color != t && (this.$color = t, this.$blue = 255 & t, this.$green = (65280 & t) >> 8, this.$red = t >> 16, this.invalidate())
			}), i(r, "alpha", function() {
				return this.$alpha
			}, function(t) {
				this.$alpha != t && (this.$alpha = t, this.invalidate())
			}), i(r, "blurX", function() {
				return this.$blurX
			}, function(t) {
				this.$blurX != t && (this.$blurX = t, this.invalidate())
			}), i(r, "blurY", function() {
				return this.$blurY
			}, function(t) {
				this.$blurY != t && (this.$blurY = t, this.invalidate())
			}), i(r, "strength", function() {
				return this.$strength
			}, function(t) {
				this.$strength != t && (this.$strength = t, this.invalidate())
			}), i(r, "quality", function() {
				return this.$quality
			}, function(t) {
				this.$quality != t && (this.$quality = t, this.invalidate())
			}), i(r, "inner", function() {
				return this.$inner
			}, function(t) {
				this.$inner != t && (this.$inner = t, this.invalidate())
			}), i(r, "knockout", function() {
				return this.$knockout
			}, function(t) {
				this.$knockout != t && (this.$knockout = t, this.invalidate())
			}), r.$toJson = function() {
				return '{"color": ' + this.$color + ', "red": ' + this.$red + ', "green": ' + this.$green + ', "blue": ' + this.$blue + ', "alpha": ' + this.$alpha + ', "blurX": ' + this.$blurX + ', "blurY": ' + this.blurY + ', "strength": ' + this.$strength + ', "quality": ' + this.$quality + ', "inner": ' + this.$inner + ', "knockout": ' + this.$knockout + "}"
			}, e
		}(t.Filter);
	t.GlowFilter = e, t.registerClass(e, "egret.GlowFilter")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(t) {
			function e(e, i, n, r, s, a, o, h, l, u, c) {
				void 0 === e && (e = 4), void 0 === i && (i = 45), void 0 === n && (n = 0), void 0 === r && (r = 1), void 0 === s && (s = 4), void 0 === a && (a = 4), void 0 === o && (o = 1), void 0 === h && (h = 1), void 0 === l && (l = !1), void 0 === u && (u = !1), void 0 === c && (c = !1), t.call(this, n, r, s, a, o, h, l, u), this.$distance = e, this.$angle = i, this.$hideObject = c
			}
			__extends(e, t);
			var i = __define,
				n = e,
				r = n.prototype;
			return i(r, "distance", function() {
				return this.$distance
			}, function(t) {
				this.$distance != t && (this.$distance = t, this.invalidate())
			}), i(r, "angle", function() {
				return this.$angle
			}, function(t) {
				this.$angle != t && (this.$angle = t, this.invalidate())
			}), i(r, "hideObject", function() {
				return this.$hideObject
			}, function(t) {
				this.$hideObject != t && (this.$hideObject = t, this.invalidate())
			}), r.$toJson = function() {
				return '{"distance": ' + this.$distance + ', "angle": ' + this.$angle + ', "color": ' + this.$color + ', "red": ' + this.$red + ', "green": ' + this.$green + ', "blue": ' + this.$blue + ', "alpha": ' + this.$alpha + ', "blurX": ' + this.$blurX + ', "blurY": ' + this.blurY + ', "strength": ' + this.$strength + ', "quality": ' + this.$quality + ', "inner": ' + this.$inner + ', "knockout": ' + this.$knockout + ', "hideObject": ' + this.$hideObject + "}"
			}, e
		}(t.GlowFilter);
	t.DropShadowFilter = e, t.registerClass(e, "egret.DropShadowFilter")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = Math.PI,
		i = 2 * e,
		n = e / 180,
		r = [],
		s = function(s) {
			function a(t, e, i, n, r, a) {
				void 0 === t && (t = 1), void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === n && (n = 1), void 0 === r && (r = 0), void 0 === a && (a = 0), s.call(this), this.a = t, this.b = e, this.c = i, this.d = n, this.tx = r, this.ty = a
			}
			__extends(a, s);
			var o = a,
				h = o.prototype;
			return a.release = function(t) {
				t && r.push(t)
			}, a.create = function() {
				var t = r.pop();
				return t || (t = new a), t
			}, h.clone = function() {
				return new a(this.a, this.b, this.c, this.d, this.tx, this.ty)
			}, h.concat = function(t) {
				var e = this.a * t.a,
					i = 0,
					n = 0,
					r = this.d * t.d,
					s = this.tx * t.a + t.tx,
					a = this.ty * t.d + t.ty;
				(0 !== this.b || 0 !== this.c || 0 !== t.b || 0 !== t.c) && (e += this.b * t.c, r += this.c * t.b, i += this.a * t.b + this.b * t.d, n += this.c * t.a + this.d * t.c, s += this.ty * t.c, a += this.tx * t.b), this.a = e, this.b = i, this.c = n, this.d = r, this.tx = s, this.ty = a
			}, h.copyFrom = function(t) {
				return this.a = t.a, this.b = t.b, this.c = t.c, this.d = t.d, this.tx = t.tx, this.ty = t.ty, this
			}, h.identity = function() {
				this.a = this.d = 1, this.b = this.c = this.tx = this.ty = 0
			}, h.invert = function() {
				this.$invertInto(this)
			}, h.$invertInto = function(t) {
				var e = this.a,
					i = this.b,
					n = this.c,
					r = this.d,
					s = this.tx,
					a = this.ty;
				if (0 == i && 0 == n) return t.b = t.c = 0, void(0 == e || 0 == r ? t.a = t.d = t.tx = t.ty = 0 : (e = t.a = 1 / e, r = t.d = 1 / r, t.tx = -e * s, t.ty = -r * a));
				var o = e * r - i * n;
				if (0 == o) return void t.identity();
				o = 1 / o;
				var h = t.a = r * o;
				i = t.b = -i * o, n = t.c = -n * o, r = t.d = e * o, t.tx = -(h * s + n * a), t.ty = -(i * s + r * a)
			}, h.rotate = function(e) {
				if (e = +e, 0 !== e) {
					e /= n;
					var i = t.NumberUtils.cos(e),
						r = t.NumberUtils.sin(e),
						s = this.a,
						a = this.b,
						o = this.c,
						h = this.d,
						l = this.tx,
						u = this.ty;
					this.a = s * i - a * r, this.b = s * r + a * i, this.c = o * i - h * r, this.d = o * r + h * i, this.tx = l * i - u * r, this.ty = l * r + u * i
				}
			}, h.scale = function(t, e) {
				1 !== t && (this.a *= t, this.c *= t, this.tx *= t), 1 !== e && (this.b *= e, this.d *= e, this.ty *= e)
			}, h.setTo = function(t, e, i, n, r, s) {
				return this.a = t, this.b = e, this.c = i, this.d = n, this.tx = r, this.ty = s, this
			}, h.transformPoint = function(e, i, n) {
				var r = this.a * e + this.c * i + this.tx,
					s = this.b * e + this.d * i + this.ty;
				return n ? (n.setTo(r, s), n) : new t.Point(r, s)
			}, h.translate = function(t, e) {
				this.tx += t, this.ty += e
			}, h.equals = function(t) {
				return this.a == t.a && this.b == t.b && this.c == t.c && this.d == t.d && this.tx == t.tx && this.ty == t.ty
			}, h.prepend = function(t, e, i, n, r, s) {
				var a = this.tx;
				if (1 != t || 0 != e || 0 != i || 1 != n) {
					var o = this.a,
						h = this.c;
					this.a = o * t + this.b * i, this.b = o * e + this.b * n, this.c = h * t + this.d * i, this.d = h * e + this.d * n
				}
				return this.tx = a * t + this.ty * i + r, this.ty = a * e + this.ty * n + s, this
			}, h.append = function(t, e, i, n, r, s) {
				var a = this.a,
					o = this.b,
					h = this.c,
					l = this.d;
				return (1 != t || 0 != e || 0 != i || 1 != n) && (this.a = t * a + e * h, this.b = t * o + e * l, this.c = i * a + n * h, this.d = i * o + n * l), this.tx = r * a + s * h + this.tx, this.ty = r * o + s * l + this.ty, this
			}, h.deltaTransformPoint = function(e) {
				var i = this,
					n = i.a * e.x + i.c * e.y,
					r = i.b * e.x + i.d * e.y;
				return new t.Point(n, r)
			}, h.toString = function() {
				return "(a=" + this.a + ", b=" + this.b + ", c=" + this.c + ", d=" + this.d + ", tx=" + this.tx + ", ty=" + this.ty + ")"
			}, h.createBox = function(e, i, r, s, a) {
				void 0 === r && (r = 0), void 0 === s && (s = 0), void 0 === a && (a = 0);
				var o = this;
				if (0 !== r) {
					r /= n;
					var h = t.NumberUtils.cos(r),
						l = t.NumberUtils.sin(r);
					o.a = h * e, o.b = l * i, o.c = -l * e, o.d = h * i
				} else o.a = e, o.b = 0, o.c = 0, o.d = i;
				o.tx = s, o.ty = a
			}, h.createGradientBox = function(t, e, i, n, r) {
				void 0 === i && (i = 0), void 0 === n && (n = 0), void 0 === r && (r = 0), this.createBox(t / 1638.4, e / 1638.4, i, n + t / 2, r + e / 2)
			}, h.$transformBounds = function(t) {
				var e = this.a,
					i = this.b,
					n = this.c,
					r = this.d,
					s = this.tx,
					a = this.ty,
					o = t.x,
					h = t.y,
					l = o + t.width,
					u = h + t.height,
					c = e * o + n * h + s,
					d = i * o + r * h + a,
					f = e * l + n * h + s,
					g = i * l + r * h + a,
					p = e * l + n * u + s,
					v = i * l + r * u + a,
					$ = e * o + n * u + s,
					m = i * o + r * u + a,
					y = 0;
				c > f && (y = c, c = f, f = y), p > $ && (y = p, p = $, $ = y), t.x = Math.floor(p > c ? c : p), t.width = Math.ceil((f > $ ? f : $) - t.x), d > g && (y = d, d = g, g = y), v > m && (y = v, v = m, m = y), t.y = Math.floor(v > d ? d : v), t.height = Math.ceil((g > m ? g : m) - t.y)
			}, h.getDeterminant = function() {
				return this.a * this.d - this.b * this.c
			}, h.$getScaleX = function() {
				var t = this;
				if (1 == t.a && 0 == t.b) return 1;
				var e = Math.sqrt(t.a * t.a + t.b * t.b);
				return this.getDeterminant() < 0 ? -e : e
			}, h.$getScaleY = function() {
				var t = this;
				if (0 == t.c && 1 == t.d) return 1;
				var e = Math.sqrt(t.c * t.c + t.d * t.d);
				return this.getDeterminant() < 0 ? -e : e
			}, h.$getSkewX = function() {
				return Math.atan2(this.d, this.c) - e / 2
			}, h.$getSkewY = function() {
				return Math.atan2(this.b, this.a)
			}, h.$updateScaleAndRotation = function(e, r, s, a) {
				if (!(0 != s && s != i || 0 != a && a != i)) return this.a = e, this.b = this.c = 0, void(this.d = r);
				s /= n, a /= n;
				var o = t.NumberUtils.cos(s),
					h = t.NumberUtils.sin(s);
				s == a ? (this.a = o * e, this.b = h * e) : (this.a = t.NumberUtils.cos(a) * e, this.b = t.NumberUtils.sin(a) * e), this.c = -h * r, this.d = o * r
			}, h.$preMultiplyInto = function(t, e) {
				var i = t.a * this.a,
					n = 0,
					r = 0,
					s = t.d * this.d,
					a = t.tx * this.a + this.tx,
					o = t.ty * this.d + this.ty;
				(0 !== t.b || 0 !== t.c || 0 !== this.b || 0 !== this.c) && (i += t.b * this.c, s += t.c * this.b, n += t.a * this.b + t.b * this.d, r += t.c * this.a + t.d * this.c, a += t.ty * this.c, o += t.tx * this.b), e.a = i, e.b = n, e.c = r, e.d = s, e.tx = a, e.ty = o
			}, a
		}(t.HashObject);
	t.Matrix = s, t.registerClass(s, "egret.Matrix"), t.$TempMatrix = new s
}(egret || (egret = {}));
var egret;
!
function(t) {
	t.$locale_strings = t.$locale_strings || {}, t.$locale_strings.en_US = t.$locale_strings.en_US || {};
	var e = t.$locale_strings.en_US;
	e[1001] = "Could not find Egret entry class: {0}。", e[1002] = "Egret entry class '{0}' must inherit from egret.DisplayObject.", e[1003] = "Parameter {0} must be non-null.", e[1004] = "An object cannot be added as a child to one of it's children (or children's children, etc.).", e[1005] = "An object cannot be added as a child of itself.", e[1006] = "The supplied DisplayObject must be a child of the caller.", e[1007] = "An index specified for a parameter was out of range.", e[1008] = "Instantiate singleton error，singleton class {0} can not create multiple instances.", e[1009] = 'the Class {0} cannot use the property "{1}"', e[1010] = 'the property "{1}" of the Class "{0}" is readonly', e[1011] = "Stream Error. URL: {0}", e[1012] = "The type of parameter {0} must be Class.", e[1013] = "Variable assignment is NaN, please see the code!", e[1014] = 'the constant "{1}" of the Class "{0}" is read-only', e[1015] = "xml not found!", e[1016] = "{0}has been obsoleted", e[1017] = "The format of JSON file is incorrect: {0}\ndata: {1}", e[1018] = "the scale9Grid is not correct", e[1019] = "Network ab:{0}", e[1020] = "Cannot initialize Shader", e[1021] = "Current browser does not support webgl", e[1022] = "{0} ArgumentError", e[1023] = "This method is not available in the ScrollView!", e[1025] = "end of the file", e[1026] = "! EncodingError The code point {0} could not be encoded.", e[1027] = "DecodingError", e[1028] = ". called injection is not configured rule: {0}, please specify configuration during its initial years of injection rule, and then call the corresponding single case.", e[1029] = "Function.prototype.bind - what is trying to be bound is not callable", e[1033] = "Photos can not be used across domains toDataURL to convert base64", e[1034] = 'Music file decoding failed: "{0}", please use the standard conversion tool reconversion under mp3.', e[1035] = "Native does not support this feature!", e[1036] = "Sound has stopped, please recall Sound.play () to play the sound!", e[1037] = "Non-load the correct blob!", e[1038] = "XML format error!", e[1039] = "Cross domains pictures can not get pixel information!", e[1040] = "hitTestPoint can not detect crossOrigin images! Please check if the display object has crossOrigin elements.", e[1041] = "{0} is deprecated, please use {1} replace", e[1042] = "The parameters passed in the region needs is an integer in drawToTexture method. Otherwise, some browsers will draw abnormal.", e[1043] = "Compile errors in {0}, the attribute name: {1}, the attribute value: {2}.", e[1044] = "The current version of the Runtime does not support video playback, please use the latest version", e[1045] = "The resource url is not found", e[1046] = "BitmapText no corresponding characters: {0}, please check the configuration file", e[1047] = "egret.localStorage.setItem save failed,key={0}&value={1}", e[1048] = "Video loading failed", e[1049] = "In the absence of sound is not allowed to play after loading", e[3e3] = "Theme configuration file failed to load: {0}", e[3001] = "Cannot find the skin name which is configured in Theme: {0}", e[3002] = 'Index:"{0}" is out of the collection element index range', e[3003] = "Cannot be available in this component. If this component is container, please continue to use", e[3004] = "addChild(){0}addElement() replace", e[3005] = "addChildAt(){0}addElementAt() replace", e[3006] = "removeChild(){0}removeElement() replace", e[3007] = "removeChildAt(){0}removeElementAt() replace", e[3008] = "setChildIndex(){0}setElementIndex() replace", e[3009] = "swapChildren(){0}swapElements() replace", e[3010] = "swapChildrenAt(){0}swapElementsAt() replace", e[3011] = 'Index:"{0}" is out of the visual element index range', e[3012] = "This method is not available in Scroller component!", e[3013] = "UIStage is GUI root container, and only one such instant is in the display list！", e[3014] = "set fullscreen error", e[3100] = "Current browser does not support WebSocket", e[3101] = "Please connect Socket firstly", e[3102] = "Please set the type of binary type", e[4e3] = "An Bone cannot be added as a child to itself or one of its children (or children's children, etc.)", e[4001] = "Abstract class can not be instantiated!", e[4002] = "Unnamed data!", e[4003] = "Nonsupport version!"
}(egret || (egret = {}));
var egret;
!
function(t) {
	t.$locale_strings = t.$locale_strings || {}, t.$language = "en_US"
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e;
	!
	function(e) {
		function i(e) {
			for (var i = [], n = 1; n < arguments.length; n++) i[n - 1] = arguments[n];
			var r = t.$locale_strings[t.$language][e];
			if (!r) return "{" + e + "}";
			for (var s = i.length, a = 0; s > a; a++) r = r.replace("{" + a + "}", i[a]);
			return r
		}
		e.tr = i
	}(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!
function(t) {
	t.$locale_strings = t.$locale_strings || {}, t.$locale_strings.zh_CN = t.$locale_strings.zh_CN || {};
	var e = t.$locale_strings.zh_CN;
	e[1001] = "找不到Egret入口类: {0}。", e[1002] = "Egret入口类 {0} 必须继承自egret.DisplayObject。", e[1003] = "参数 {0} 不能为 null。", e[1004] = "无法将对象添加为它的一个子对象（或子对象的子对象等）的子对象。", e[1005] = "不能将对象添加为其自身的子对象。", e[1006] = "提供的 DisplayObject 必须是调用者的子级。", e[1007] = "为参数指定的索引不在范围内。", e[1008] = "实例化单例出错，不允许实例化多个 {0} 对象。", e[1009] = "类 {0} 不可以使用属性 {1}", e[1010] = "类 {0} 属性 {1} 是只读的", e[1011] = "流错误。URL: {0}", e[1012] = "参数 {0} 的类型必须为 Class。", e[1013] = "变量赋值为NaN，请查看代码！", e[1014] = "类 {0} 常量 {1} 是只读的", e[1015] = "xml not found!", e[1016] = "{0}已经废弃", e[1017] = "JSON文件格式不正确: {0}\ndata: {1}", e[1018] = "9宫格设置错误", e[1019] = "网络异常:{0}", e[1020] = "无法初始化着色器", e[1021] = "当前浏览器不支持webgl", e[1022] = "{0} ArgumentError", e[1023] = "此方法在ScrollView内不可用!", e[1025] = "遇到文件尾", e[1026] = "EncodingError! The code point {0} could not be encoded.", e[1027] = "DecodingError", e[1028] = "调用了未配置的注入规则:{0}。 请先在项目初始化里配置指定的注入规则，再调用对应单例。", e[1029] = "Function.prototype.bind - what is trying to be bound is not callable", e[1033] = "跨域图片不可以使用toDataURL来转换成base64", e[1034] = '音乐文件解码失败："{0}"，请使用标准的转换工具重新转换下mp3。', e[1035] = "Native 下暂未实现此功能！", e[1036] = "声音已停止，请重新调用 Sound.play() 来播放声音！", e[1037] = "非正确的blob加载！", e[1038] = "XML 格式错误!", e[1039] = "跨域图片不能获取像素信息!", e[1040] = "hitTestPoint 不能对跨域图片进行检测! 请检查该显示对象内是否含有跨域元素", e[1041] = "{0} 已废弃,请使用 {1} 代替", e[1042] = "drawToTexture方法传入的区域各个参数需要为整数,否则某些浏览器绘制会出现异常", e[1043] = "{0} 中存在编译错误，属性名 : {1}，属性值 : {2}", e[1044] = "当前的 runtime 版本不支持视频播放,请使用最新的版本", e[1045] = "没有设置要加载的资源地址", e[1046] = "BitmapText 找不到对应字符:{0}，请检查配置文件", e[1047] = "egret.localStorage.setItem保存失败,key={0}&value={1}", e[1048] = "视频加载失败", e[1049] = "声音在没有加载完之前不允许播放", e[3e3] = "主题配置文件加载失败: {0}", e[3001] = "找不到主题中所配置的皮肤类名: {0}", e[3002] = '索引:"{0}"超出集合元素索引范围', e[3003] = "在此组件中不可用，若此组件为容器类，请使用", e[3004] = "addChild(){0}addElement()代替", e[3005] = "addChildAt(){0}addElementAt()代替", e[3006] = "removeChild(){0}removeElement()代替", e[3007] = "removeChildAt(){0}removeElementAt()代替", e[3008] = "setChildIndex(){0}setElementIndex()代替", e[3009] = "swapChildren(){0}swapElements()代替", e[3010] = "swapChildrenAt(){0}swapElementsAt()代替", e[3011] = '索引:"{0}"超出可视元素索引范围', e[3012] = "此方法在Scroller组件内不可用!", e[3013] = "UIStage是GUI根容器，只能有一个此实例在显示列表中！", e[3014] = "设置全屏模式失败", e[3100] = "当前浏览器不支持WebSocket", e[3101] = "请先连接WebSocket", e[3102] = "请先设置type为二进制类型", e[4e3] = "An Bone cannot be added as a child to itself or one of its children (or children's children, etc.)", e[4001] = "Abstract class can not be instantiated!", e[4002] = "Unnamed data!", e[4003] = "Nonsupport version!"
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e;
	!
	function(t) {}(e = t.localStorage || (t.localStorage = {}))
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e;
	!
	function(t) {
		function e(t) {
			n.indexOf(t) < 0 && n.push(t)
		}
		function i(t) {
			var e = n.indexOf(t);
			return e >= 0 ? (n.splice(e, 1), !0) : !1
		}
		var n = [];
		t.$pushSoundChannel = e, t.$popSoundChannel = i
	}(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!
function(t) {}(egret || (egret = {}));
var egret;
!
function(t) {}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function() {
			function e() {
				this.onSuccessFunc = null, this.onSuccessThisObject = null, this.onErrorFunc = null, this.onErrorThisObject = null, this.downloadingSizeFunc = null, this.downloadingSizeThisObject = null, this.onResponseHeaderFunc = null, this.onResponseHeaderThisObject = null
			}
			var i = e,
				n = i.prototype;
			return e.create = function() {
				return e.promiseObjectList.length ? e.promiseObjectList.pop() : new t.PromiseObject
			}, n.onSuccess = function() {
				for (var t = [], e = 0; e < arguments.length; e++) t[e - 0] = arguments[e];
				this.onSuccessFunc && this.onSuccessFunc.apply(this.onSuccessThisObject, t), this.destroy()
			}, n.onError = function() {
				for (var t = [], e = 0; e < arguments.length; e++) t[e - 0] = arguments[e];
				this.onErrorFunc && this.onErrorFunc.apply(this.onErrorThisObject, t), this.destroy()
			}, n.downloadingSize = function() {
				for (var t = [], e = 0; e < arguments.length; e++) t[e - 0] = arguments[e];
				this.downloadingSizeFunc && this.downloadingSizeFunc.apply(this.downloadingSizeThisObject, t)
			}, n.onResponseHeader = function() {
				for (var t = [], e = 0; e < arguments.length; e++) t[e - 0] = arguments[e];
				this.onResponseHeaderFunc && this.onResponseHeaderFunc.apply(this.onResponseHeaderThisObject, t)
			}, n.destroy = function() {
				this.onSuccessFunc = void 0, this.onSuccessThisObject = void 0, this.onErrorFunc = void 0, this.onErrorThisObject = void 0, this.downloadingSizeFunc = void 0, this.downloadingSizeThisObject = void 0, this.onResponseHeaderFunc = void 0, this.onResponseHeaderThisObject = void 0, e.promiseObjectList.push(this)
			}, e.promiseObjectList = [], e
		}();
	t.PromiseObject = e, t.registerClass(e, "egret.PromiseObject")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function() {
			function t() {}
			var e = t;
			e.prototype;
			return t.GET = "GET", t.POST = "POST", t
		}();
	t.HttpMethod = e, t.registerClass(e, "egret.HttpMethod")
}(egret || (egret = {}));
var egret;
!
function(t) {}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function() {
			function t() {}
			var e = t;
			e.prototype;
			return t.TEXT = "text", t.ARRAY_BUFFER = "arraybuffer", t
		}();
	t.HttpResponseType = e, t.registerClass(e, "egret.HttpResponseType")
}(egret || (egret = {}));
var egret;
!
function(t) {}(egret || (egret = {}));
var egret;
!
function(t) {
	var e;
	!
	function(e) {
		function i(t, e) {
			var i = t.minX < e.minX ? t.minX : e.minX,
				n = t.minY < e.minY ? t.minY : e.minY,
				r = t.maxX > e.maxX ? t.maxX : e.maxX,
				s = t.maxY > e.maxY ? t.maxY : e.maxY;
			return (r - i) * (s - n)
		}
		var n = function() {
				function n(e) {
					this.dirtyList = [], this.hasClipRect = !1, this.clipWidth = 0, this.clipHeight = 0, this.clipArea = 0, this.clipRectChanged = !1, this.$dirtyRegionPolicy = t.DirtyRegionPolicy.ON, this.root = e
				}
				var r = n,
					s = r.prototype;
				return s.setClipRect = function(t, e) {
					this.hasClipRect = !0, this.clipRectChanged = !0, this.clipWidth = Math.ceil(t), this.clipHeight = Math.ceil(e), this.clipArea = this.clipWidth * this.clipHeight
				}, s.addRegion = function(i) {
					var n = i.minX,
						r = i.minY,
						s = i.maxX,
						a = i.maxY;
					if (this.hasClipRect && (0 > n && (n = 0), 0 > r && (r = 0), s > this.clipWidth && (s = this.clipWidth), a > this.clipHeight && (a = this.clipHeight)), n >= s || r >= a) return !1;
					if (this.clipRectChanged) return !0;
					var o = this.dirtyList,
						h = e.Region.create();
					return o.push(h.setTo(n, r, s, a)), this.$dirtyRegionPolicy != t.DirtyRegionPolicy.OFF && this.mergeDirtyList(o), !0
				}, s.clear = function() {
					for (var t = this.dirtyList, i = t.length, n = 0; i > n; n++) e.Region.release(t[n]);
					t.length = 0
				}, s.getDirtyRegions = function() {
					var i = this.dirtyList;
					if (this.$dirtyRegionPolicy == t.DirtyRegionPolicy.OFF || t.Capabilities.runtimeType == t.RuntimeType.NATIVE && !t["native"].$supportCanvas) {
						this.clipRectChanged = !0, this.clear();
						var n = e.Region.create();
						if (this.hasClipRect) i.push(n.setTo(0, 0, this.clipWidth, this.clipHeight));
						else {
							var r = this.root.$getOriginalBounds();
							i.push(n.setTo(r.x, r.y, r.width, r.height))
						}
					} else if (this.clipRectChanged) {
						this.clipRectChanged = !1, this.clear();
						var n = e.Region.create();
						i.push(n.setTo(0, 0, this.clipWidth, this.clipHeight))
					} else for (; this.mergeDirtyList(i););
					var s = this.dirtyList.length;
					if (s > 0) for (var a = 0; s > a; a++) this.dirtyList[a].intValues();
					return this.dirtyList
				}, s.mergeDirtyList = function(t) {
					var n = t.length;
					if (2 > n) return !1;
					for (var r = this.hasClipRect, s = n > 3 ? Number.POSITIVE_INFINITY : 0, a = 0, o = 0, h = 0, l = 0; n - 1 > l; l++) {
						var u = t[l];
						r && (h += u.area);
						for (var c = l + 1; n > c; c++) {
							var d = t[c],
								f = i(u, d) - u.area - d.area;
							s > f && (a = l, o = c, s = f)
						}
					}
					if (r && h / this.clipArea > .95 && (this.clipRectChanged = !0), a != o) {
						var g = t[o];
						return t[a].union(g), e.Region.release(g), t.splice(o, 1), !0
					}
					return !1
				}, s.setDirtyRegionPolicy = function(t) {
					this.$dirtyRegionPolicy = t
				}, n
			}();
		e.DirtyRegion = n, t.registerClass(n, "egret.sys.DirtyRegion")
	}(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e;
	!
	function(e) {
		var i = function(i) {
				function n(n) {
					i.call(this), this.isStage = !1, this.$renderNode = new e.BitmapNode, this.renderBuffer = null, this.offsetX = 0, this.offsetY = 0, this.offsetMatrix = new t.Matrix, this.isDirty = !1, this.needUpdateRegions = !1, this.dirtyNodeList = [], this.dirtyList = null, this.sizeChanged = !1, this.$dirtyRegionPolicy = t.DirtyRegionPolicy.ON, this.root = n, this.dirtyRegion = new e.DirtyRegion(n), this.isStage = n instanceof t.Stage, this.dirtyNodes = t.createMap()
				}
				__extends(n, i);
				var r = n,
					s = r.prototype;
				return n.create = function(i) {
					var n = new t.sys.DisplayList(i);
					try {
						var r = new e.RenderBuffer;
						n.renderBuffer = r
					} catch (s) {
						return null
					}
					return n.root = i, n
				}, s.$getRenderNode = function() {
					return this.$renderNode
				}, s.$update = function(e) {
					var i = this.root;
					if (null == i) return !1;
					i.$removeFlagsUp(768);
					var n = this.$renderNode,
						r = i.$getConcatenatedMatrix();
					if (e == t.DirtyRegionPolicy.OFF) {
						var s = i.$parentDisplayList;
						if (this.needUpdateRegions && this.updateDirtyRegions(), !s) return !1;
						var a = n.renderMatrix;
						a.copyFrom(r);
						var o = s.root;
						o !== i.$stage && i.$getConcatenatedMatrixAt(o, a)
					} else {
						var h = i.$getOriginalBounds(),
							s = i.$parentDisplayList,
							l = n.renderRegion;
						if (this.needUpdateRegions && this.updateDirtyRegions(), !s) return l.setTo(0, 0, 0, 0), n.moved = !1, !1;
						if (!n.moved) return !1;
						n.moved = !1;
						var a = n.renderMatrix;
						a.copyFrom(r);
						var o = s.root;
						o !== i.$stage && i.$getConcatenatedMatrixAt(o, a), l.updateRegion(h, a)
					}
					return !0
				}, s.setClipRect = function(t, e) {
					this.dirtyRegion.setClipRect(t, e), this.renderBuffer.resize(t, e)
				}, s.markDirty = function(t) {
					var e = t.$hashCode;
					if (!this.dirtyNodes[e] && (this.dirtyNodes[e] = !0, this.dirtyNodeList.push(t), !this.needUpdateRegions)) {
						this.needUpdateRegions = !0, this.isDirty = !0;
						var i = this.root.$parentDisplayList;
						i && i.markDirty(this)
					}
				}, s.updateDirtyRegions = function() {
					var e = this.dirtyNodeList;
					this.dirtyNodeList = [], this.dirtyNodes = t.createMap(), this.needUpdateRegions = !1;
					for (var i = this.dirtyRegion, n = e.length, r = 0; n > r; r++) {
						var s = e[r],
							a = s.$getRenderNode();
						if (a) if (a.needRedraw = !1, this.isStage) {
							a.renderAlpha > 0 && a.renderVisible && i.addRegion(a.renderRegion) && (a.needRedraw = !0);
							var o = s.$update(this.$dirtyRegionPolicy);
							a.renderAlpha > 0 && a.renderVisible && (o || !a.needRedraw) && i.addRegion(a.renderRegion) && (a.needRedraw = !0)
						} else {
							i.addRegion(a.renderRegion) && (a.needRedraw = !0);
							var o = s.$update(this.$dirtyRegionPolicy);
							(o || !a.needRedraw) && i.addRegion(a.renderRegion) && (a.needRedraw = !0)
						}
					}
					return this.dirtyList = i.getDirtyRegions(), this.dirtyList
				}, s.drawToSurface = function() {
					var i = 0,
						n = this.dirtyList;
					if (n && n.length > 0) {
						this.isStage || this.changeSurfaceSize();
						var r = this.renderBuffer;
						if (r.beginClip(this.dirtyList, this.offsetX, this.offsetY), n = this.$dirtyRegionPolicy == t.DirtyRegionPolicy.OFF ? null : this.dirtyList, i = e.systemRenderer.render(this.root, r, this.offsetMatrix, n), r.endClip(), !this.isStage) {
							var s = r.surface,
								a = this.$renderNode;
							a.drawData.length = 0;
							var o = s.width,
								h = s.height;
							this.bitmapData ? (this.bitmapData.source = s, this.bitmapData.width = o, this.bitmapData.height = h) : this.bitmapData = new t.BitmapData(s), a.image = this.bitmapData, a.imageWidth = o, a.imageHeight = h, a.drawImage(0, 0, o, h, -this.offsetX, -this.offsetY, o, h)
						}
					}
					return this.dirtyList = null, this.dirtyRegion.clear(), this.isDirty = !1, i
				}, s.changeSurfaceSize = function() {
					var t = (this.root, this.offsetX),
						e = this.offsetY,
						i = this.root.$getOriginalBounds();
					this.offsetX = -i.x, this.offsetY = -i.y, this.offsetMatrix.setTo(1, 0, 0, 1, this.offsetX, this.offsetY);
					var n = this.renderBuffer,
						r = Math.max(257, i.width),
						s = Math.max(257, i.height);
					(this.offsetX != t || this.offsetY != e || n.surface.width != r || n.surface.height != s) && (this.sizeChanged ? n.resizeTo(r, s, this.offsetX - t, this.offsetY - e) : (this.sizeChanged = !0, n.resize(r, s)))
				}, s.setDirtyRegionPolicy = function(t) {
					this.$dirtyRegionPolicy = t, this.dirtyRegion.setDirtyRegionPolicy(t), this.renderBuffer.setDirtyRegionPolicy(t)
				}, n
			}(t.HashObject);
		e.DisplayList = i, t.registerClass(i, "egret.sys.DisplayList", ["egret.sys.Renderable"])
	}(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!
function(t) {}(egret || (egret = {}));
var egret;
!
function(t) {}(egret || (egret = {}));
var egret;
!
function(t) {
	var e;
	!
	function(e) {
		function i(i, n, r, s) {
			if (n && (t.log = function() {
				for (var t = arguments.length, i = "", n = 0; t > n; n++) i += arguments[n] + " ";
				e.$logToFPS(i), console.log.apply(console, a(arguments))
			}), l = s ? {} : s, n = !! n, this.showFPS = !! i, this.showLog = n, !this.fps) {
				var o = void 0 === s.x ? 0 : s.x,
					c = void 0 === s.y ? 0 : s.y;
				h = this.fps = new FPS(this.stage, i, n, r, s), h.x = o, h.y = c;
				for (var d = u.length, f = 0; d > f; f++) h.updateInfo(u[f]);
				u = null
			}
		}
		function n(t) {
			t = !! t, this._showPaintRect != t && (this._showPaintRect = t, t ? (this.stageDisplayList || (this.stageDisplayList = e.DisplayList.create(this.stage)), this.stage.$displayList = this.stageDisplayList) : this.stage.$displayList = this.screenDisplayList)
		}
		function r(t) {
			for (var e = t.length, i = [], n = 0; e > n; n++) {
				var r = t[n];
				i[n] = [r.minX, r.minY, r.width, r.height], r.width -= 1, r.height -= 1
			}
			var s = this.paintList;
			s.push(i), s.length > 1 && s.shift();
			var a = this.screenDisplayList.renderBuffer,
				o = a.context;
			o.setTransform(1, 0, 0, 1, 0, 0), o.clearRect(0, 0, a.surface.width, a.surface.height), o.drawImage(this.stageDisplayList.renderBuffer.surface, 0, 0), e = s.length;
			for (var n = 0; e > n; n++) {
				i = s[n];
				for (var h = i.length - 1; h >= 0; h--) {
					var l = i[h];
					this.drawDirtyRect(l[0], l[1], l[2], l[3], o)
				}
			}
			o.save(), o.beginPath(), e = t.length;
			for (var n = 0; e > n; n++) {
				var r = t[n];
				o.clearRect(r.minX, r.minY, r.width, r.height), o.rect(r.minX, r.minY, r.width, r.height)
			}
			o.clip(), o.drawImage(this.stageDisplayList.renderBuffer.surface, 0, 0), o.restore()
		}
		function s(t, e, i, n, r) {
			r.strokeStyle = "rgb(255,0,0)", r.lineWidth = 5, r.strokeRect(t - .5, e - .5, i, n)
		}
		function a(t) {
			for (var e = [], i = 0; i < t.length; i++) e.push(t[i]);
			return e
		}
		var o = function(a) {
				function o(t, e, o) {
					a.call(this), this.isPlaying = !1, this.entryClassName = o, this.stage = e, this.screenDisplayList = this.createDisplayList(e, t), this.showFPS = !1, this.showLog = !1, this._showPaintRect = !1, this.stageDisplayList = null, this.paintList = [], this.displayFPS = i, this.showPaintRect = n, this.drawPaintRect = r, this.drawDirtyRect = s
				}
				__extends(o, a);
				var h = o,
					l = h.prototype;
				return l.createDisplayList = function(t, i) {
					var n = new e.DisplayList(t);
					return n.renderBuffer = i, t.$displayList = n, n
				}, l.start = function() {
					!this.isPlaying && this.stage && (e.$TempStage = e.$TempStage || this.stage, this.isPlaying = !0, this.root || this.initialize(), e.$ticker.$addPlayer(this))
				}, l.initialize = function() {
					var e;
					if (this.entryClassName && (e = t.getDefinitionByName(this.entryClassName)), e) {
						var i = new e;
						this.root = i, i instanceof t.DisplayObject && this.stage.addChild(i)
					}
				}, l.stop = function() {
					this.pause(), this.stage = null
				}, l.pause = function() {
					this.isPlaying && (this.isPlaying = !1, e.$ticker.$removePlayer(this))
				}, l.$render = function(e, i) {
					(this.showFPS || this.showLog) && this.stage.addChild(this.fps);
					var n = this.stage,
						r = t.getTimer(),
						s = n.$displayList.updateDirtyRegions(),
						a = t.getTimer();
					s = s.concat();
					var o = n.$displayList.drawToSurface();
					this._showPaintRect && this.drawPaintRect(s);
					var h = t.getTimer();
					if (e && this.showFPS) {
						var l = 0;
						if (o > 0) {
							for (var u = s.length, c = 0, d = 0; u > d; d++) c += s[d].area;
							l = Math.ceil(1e3 * c / (n.stageWidth * n.stageHeight)) / 10
						}
						this.fps.update(o, l, a - r, h - a, i)
					}
				}, l.updateStageSize = function(e, i) {
					var n = this.stage;
					n.$stageWidth = e, n.$stageHeight = i, this.screenDisplayList.setClipRect(e, i), this.stageDisplayList && this.stageDisplayList.setClipRect(e, i), n.dispatchEventWith(t.Event.RESIZE), n.$invalidate(!0)
				}, o
			}(t.HashObject);
		e.Player = o, t.registerClass(o, "egret.sys.Player");
		var h, l, u = [];
		e.$logToFPS = function(t) {
			return h ? void h.updateInfo(t) : void u.push(t)
		}, FPS = function(i) {
			function n(e, n, r, s, a) {
				i.call(this), this.isFPS = !0, this.infoLines = [], this.totalTime = 0, this.totalTick = 0, this.lastTime = 0, this.drawCalls = 0, this.dirtyRatio = 0, this.costDirty = 0, this.costRender = 0, this.costTicker = 0, this._stage = e, this.showFPS = n, this.showLog = r, this.logFilter = s, this.touchChildren = !1, this.touchEnabled = !1, this.styles = a, this.fpsDisplay = new t.FPSDisplay(e, n, r, s, a), this.addChild(this.fpsDisplay);
				var o;
				try {
					o = s ? new RegExp(s) : null
				} catch (h) {
					t.log(h)
				}
				this.filter = function(t) {
					return o ? o.test(t) : !s || 0 == t.indexOf(s)
				}
			}
			return __extends(n, i), n.prototype.update = function(i, n, r, s, a) {
				var o = t.getTimer();
				if (this.totalTime += o - this.lastTime, this.lastTime = o, this.totalTick++, this.drawCalls += i, this.dirtyRatio += n, this.costDirty += r, this.costRender += s, this.costTicker += a, this.totalTime >= 1e3) {
					var h = Math.min(Math.ceil(1e3 * this.totalTick / this.totalTime), e.$ticker.$frameRate),
						l = Math.round(this.drawCalls / this.totalTick),
						u = Math.round(this.dirtyRatio / this.totalTick),
						c = Math.round(this.costDirty / this.totalTick),
						d = Math.round(this.costRender / this.totalTick),
						f = Math.round(this.costTicker / this.totalTick);
					this.fpsDisplay.update({
						fps: h,
						draw: l,
						dirty: u,
						costTicker: f,
						costDirty: c,
						costRender: d
					}), this.totalTick = 0, this.totalTime = this.totalTime % 1e3, this.drawCalls = 0, this.dirtyRatio = 0, this.costDirty = 0, this.costRender = 0, this.costTicker = 0
				}
			}, n.prototype.updateInfo = function(t) {
				t && this.showLog && this.filter(t) && this.fpsDisplay.updateInfo(t)
			}, n
		}(t.Sprite), t.warn = function() {
			console.warn.apply(console, a(arguments))
		}, t.error = function() {
			console.error.apply(console, a(arguments))
		}, t.assert = function() {
			console.assert.apply(console, a(arguments))
		}, t.log = function() {
			console.log.apply(console, a(arguments))
		}
	}(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e;
	!
	function(e) {
		var i = [],
			n = function() {
				function t() {
					this.minX = 0, this.minY = 0, this.maxX = 0, this.maxY = 0, this.width = 0, this.height = 0, this.area = 0, this.moved = !1
				}
				var e = t,
					n = e.prototype;
				return t.release = function(t) {
					i.push(t)
				}, t.create = function() {
					var e = i.pop();
					return e || (e = new t), e
				}, n.setTo = function(t, e, i, n) {
					return this.minX = t, this.minY = e, this.maxX = i, this.maxY = n, this.updateArea(), this
				}, n.intValues = function() {
					this.minX = Math.floor(this.minX), this.minY = Math.floor(this.minY), this.maxX = Math.ceil(this.maxX), this.maxY = Math.ceil(this.maxY), this.updateArea()
				}, n.updateArea = function() {
					this.width = this.maxX - this.minX, this.height = this.maxY - this.minY, this.area = this.width * this.height
				}, n.union = function(t) {
					this.minX > t.minX && (this.minX = t.minX), this.minY > t.minY && (this.minY = t.minY), this.maxX < t.maxX && (this.maxX = t.maxX), this.maxY < t.maxY && (this.maxY = t.maxY), this.updateArea()
				}, n.intersect = function(t) {
					return this.minX < t.minX && (this.minX = t.minX), this.maxX > t.maxX && (this.maxX = t.maxX), this.minX >= this.maxX ? void this.setEmpty() : (this.minY < t.minY && (this.minY = t.minY), this.maxY > t.maxY && (this.maxY = t.maxY), this.minY >= this.maxY ? void this.setEmpty() : void this.updateArea())
				}, n.setEmpty = function() {
					this.minX = 0, this.minY = 0, this.maxX = 0, this.maxY = 0, this.width = 0, this.height = 0, this.area = 0
				}, n.isEmpty = function() {
					return this.width <= 0 || this.height <= 0
				}, n.intersects = function(t) {
					if (this.isEmpty()) return !1;
					var e = this.minX > t.minX ? this.minX : t.minX,
						i = this.maxX < t.maxX ? this.maxX : t.maxX;
					return e > i ? !1 : (e = this.minY > t.minY ? this.minY : t.minY, i = this.maxY < t.maxY ? this.maxY : t.maxY, i >= e)
				}, n.updateRegion = function(t, e) {
					if (0 == t.width || 0 == t.height) return void this.setEmpty();
					var i, n, r, s, a = e,
						o = a.a,
						h = a.b,
						l = a.c,
						u = a.d,
						c = a.tx,
						d = a.ty,
						f = t.x,
						g = t.y,
						p = f + t.width,
						v = g + t.height;
					if (1 == o && 0 == h && 0 == l && 1 == u) i = f + c - 1, n = g + d - 1, r = p + c + 1, s = v + d + 1;
					else {
						var $ = o * f + l * g + c,
							m = h * f + u * g + d,
							y = o * p + l * g + c,
							T = h * p + u * g + d,
							x = o * p + l * v + c,
							b = h * p + u * v + d,
							_ = o * f + l * v + c,
							E = h * f + u * v + d,
							C = 0;
						$ > y && (C = $, $ = y, y = C), x > _ && (C = x, x = _, _ = C), i = (x > $ ? $ : x) - 1, r = (y > _ ? y : _) + 1, m > T && (C = m, m = T, T = C), b > E && (C = b, b = E, E = C), n = (b > m ? m : b) - 1, s = (T > E ? T : E) + 1
					}
					this.minX = i, this.minY = n, this.maxX = r, this.maxY = s, this.width = r - i, this.height = s - n, this.area = this.width * this.height
				}, t
			}();
		e.Region = n, t.registerClass(n, "egret.sys.Region")
	}(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e;
	!
	function(t) {}(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e;
	!
	function(e) {
		var i = function(e) {
				function i() {
					e.call(this)
				}
				__extends(i, e);
				var n = i,
					r = n.prototype;
				return r.calculateStageSize = function(e, i, n, r, s) {
					var a = i,
						o = n,
						h = r,
						l = s,
						u = i / h || 0,
						c = n / l || 0;
					switch (e) {
					case t.StageScaleMode.EXACT_FIT:
						break;
					case t.StageScaleMode.FIXED_HEIGHT:
						h = Math.round(i / c);
						break;
					case t.StageScaleMode.FIXED_WIDTH:
						l = Math.round(n / u);
						break;
					case t.StageScaleMode.NO_BORDER:
						u > c ? o = Math.round(l * u) : a = Math.round(h * c);
						break;
					case t.StageScaleMode.SHOW_ALL:
						u > c ? a = Math.round(h * c) : o = Math.round(l * u);
						break;
					case t.StageScaleMode.FIXED_NARROW:
						u > c ? h = Math.round(i / c) : l = Math.round(n / u);
						break;
					case t.StageScaleMode.FIXED_WIDE:
						u > c ? l = Math.round(n / u) : h = Math.round(i / c);
						break;
					default:
						h = i, l = n
					}
					return a % 2 != 0 && (a += 1), o % 2 != 0 && (o += 1), {
						stageWidth: h,
						stageHeight: l,
						displayWidth: a,
						displayHeight: o
					}
				}, i
			}(t.HashObject);
		e.DefaultScreenAdapter = i, t.registerClass(i, "egret.sys.DefaultScreenAdapter", ["egret.sys.IScreenAdapter"])
	}(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function() {
			function t() {}
			var e = t;
			e.prototype;
			return t.NO_SCALE = "noScale", t.SHOW_ALL = "showAll", t.NO_BORDER = "noBorder", t.EXACT_FIT = "exactFit", t.FIXED_WIDTH = "fixedWidth", t.FIXED_HEIGHT = "fixedHeight", t.FIXED_NARROW = "fixedNarrow", t.FIXED_WIDE = "fixedWide", t
		}();
	t.StageScaleMode = e, t.registerClass(e, "egret.StageScaleMode")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e;
	!
	function(t) {}(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e;
	!
	function(e) {
		e.$START_TIME = 0, e.$invalidateRenderFlag = !1, e.$requestRenderingFlag = !1;
		var i = function() {
				function i() {
					this.playerList = [], this.callBackList = [], this.thisObjectList = [], this.$frameRate = 30, this.lastTimeStamp = 0, this.costEnterFrame = 0, e.$START_TIME = Date.now(), this.frameDeltaTime = 1e3 / this.$frameRate, this.lastCount = this.frameInterval = Math.round(6e4 / this.$frameRate)
				}
				var n = i,
					r = n.prototype;
				return r.$addPlayer = function(t) {
					-1 == this.playerList.indexOf(t) && (this.playerList = this.playerList.concat(), this.playerList.push(t))
				}, r.$removePlayer = function(t) {
					var e = this.playerList.indexOf(t);
					if (-1 !== e) {
						this.playerList = this.playerList.concat(), this.playerList.splice(e, 1)
					}
				}, r.$startTick = function(t, e) {
					var i = this.getTickIndex(t, e); - 1 == i && (this.concatTick(), this.callBackList.push(t), this.thisObjectList.push(e))
				}, r.$stopTick = function(t, e) {
					var i = this.getTickIndex(t, e); - 1 != i && (this.concatTick(), this.callBackList.splice(i, 1), this.thisObjectList.splice(i, 1))
				}, r.getTickIndex = function(t, e) {
					for (var i = this.callBackList, n = this.thisObjectList, r = i.length - 1; r >= 0; r--) if (i[r] == t && n[r] == e) return r;
					return -1
				}, r.concatTick = function() {
					this.callBackList = this.callBackList.concat(), this.thisObjectList = this.thisObjectList.concat()
				}, r.$setFrameRate = function(e) {
					return e = +e || 0, 0 >= e ? !1 : this.$frameRate == e ? !1 : (this.$frameRate = e, e > 60 && (e = 60), t.Capabilities.runtimeType == t.RuntimeType.NATIVE && (egret_native.setFrameRate(e), e = 60), this.frameDeltaTime = 1e3 / e, this.lastCount = this.frameInterval = Math.round(6e4 / e), !0)
				}, r.update = function() {
					var i = t.getTimer(),
						n = this.callBackList,
						r = this.thisObjectList,
						s = n.length,
						a = e.$requestRenderingFlag,
						o = t.getTimer();
					this.callLaterAsyncs();
					for (var h = 0; s > h; h++) n[h].call(r[h], o) && (a = !0);
					var l = t.getTimer(),
						u = o - this.lastTimeStamp;
					if (this.lastTimeStamp = o, u >= this.frameDeltaTime) this.lastCount = this.frameInterval;
					else {
						if (this.lastCount -= 1e3, this.lastCount > 0) return void(a && this.render(!1, this.costEnterFrame + l - i));
						this.lastCount += this.frameInterval
					}
					this.render(!0, this.costEnterFrame + l - i);
					var c = t.getTimer();
					this.broadcastEnterFrame();
					var d = t.getTimer();
					this.costEnterFrame = d - c
				}, r.render = function(t, i) {
					var n = this.playerList,
						r = n.length;
					if (0 != r) {
						this.callLaters(), e.$invalidateRenderFlag && (this.broadcastRender(), e.$invalidateRenderFlag = !1);
						for (var s = 0; r > s; s++) n[s].$render(t, i);
						e.$requestRenderingFlag = !1
					}
				}, r.broadcastEnterFrame = function() {
					var e = t.DisplayObject.$enterFrameCallBackList,
						i = e.length;
					if (0 != i) {
						e = e.concat();
						for (var n = 0; i > n; n++) e[n].dispatchEventWith(t.Event.ENTER_FRAME)
					}
				}, r.broadcastRender = function() {
					var e = t.DisplayObject.$renderCallBackList,
						i = e.length;
					if (0 != i) {
						e = e.concat();
						for (var n = 0; i > n; n++) e[n].dispatchEventWith(t.Event.RENDER)
					}
				}, r.callLaters = function() {
					var e, i, n;
					if (t.$callLaterFunctionList.length > 0 && (e = t.$callLaterFunctionList, t.$callLaterFunctionList = [], i = t.$callLaterThisList, t.$callLaterThisList = [], n = t.$callLaterArgsList, t.$callLaterArgsList = []), e) for (var r = e.length, s = 0; r > s; s++) {
						var a = e[s];
						null != a && a.apply(i[s], n[s])
					}
				}, r.callLaterAsyncs = function() {
					if (t.$callAsyncFunctionList.length > 0) {
						var e = t.$callAsyncFunctionList,
							i = t.$callAsyncThisList,
							n = t.$callAsyncArgsList;
						t.$callAsyncFunctionList = [], t.$callAsyncThisList = [], t.$callAsyncArgsList = [];
						for (var r = 0; r < e.length; r++) {
							var s = e[r];
							null != s && s.apply(i[r], n[r])
						}
					}
				}, i
			}();
		e.SystemTicker = i, t.registerClass(i, "egret.sys.SystemTicker"), e.$ticker = new e.SystemTicker
	}(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e;
	!
	function(e) {
		var i = function(e) {
				function i(t) {
					e.call(this), this.maxTouches = 0, this.useTouchesCount = 0, this.touchDownTarget = {}, this.lastTouchX = -1, this.lastTouchY = -1, this.stage = t
				}
				__extends(i, e);
				var n = i,
					r = n.prototype;
				return r.$initMaxTouches = function() {
					this.maxTouches = this.stage.$maxTouches
				}, r.onTouchBegin = function(e, i, n) {
					if (!(this.useTouchesCount >= this.maxTouches)) {
						this.lastTouchX = e, this.lastTouchY = i;
						var r = this.findTarget(e, i);
						null == this.touchDownTarget[n] && (this.touchDownTarget[n] = r, this.useTouchesCount++), t.TouchEvent.dispatchTouchEvent(r, t.TouchEvent.TOUCH_BEGIN, !0, !0, e, i, n, !0)
					}
				}, r.onTouchMove = function(e, i, n) {
					if (null != this.touchDownTarget[n] && (this.lastTouchX != e || this.lastTouchY != i)) {
						this.lastTouchX = e, this.lastTouchY = i;
						var r = this.findTarget(e, i);
						t.TouchEvent.dispatchTouchEvent(r, t.TouchEvent.TOUCH_MOVE, !0, !0, e, i, n, !0)
					}
				}, r.onTouchEnd = function(e, i, n) {
					if (null != this.touchDownTarget[n]) {
						var r = this.findTarget(e, i),
							s = this.touchDownTarget[n];
						delete this.touchDownTarget[n], this.useTouchesCount--, t.TouchEvent.dispatchTouchEvent(r, t.TouchEvent.TOUCH_END, !0, !0, e, i, n, !1), s == r ? t.TouchEvent.dispatchTouchEvent(r, t.TouchEvent.TOUCH_TAP, !0, !0, e, i, n, !1) : t.TouchEvent.dispatchTouchEvent(s, t.TouchEvent.TOUCH_RELEASE_OUTSIDE, !0, !0, e, i, n, !1)
					}
				}, r.findTarget = function(t, e) {
					var i = this.stage.$hitTest(t, e);
					return i || (i = this.stage), i
				}, i
			}(t.HashObject);
		e.TouchHandler = i, t.registerClass(i, "egret.sys.TouchHandler")
	}(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e;
	!
	function(e) {
		var i = function() {
				function i() {
					this.type = 0, this.needRedraw = !1, this.renderAlpha = 1, this.renderVisible = !0, this.renderMatrix = new t.Matrix, this.renderRegion = new e.Region, this.moved = !1, this.drawData = [], this.renderCount = 0
				}
				var n = i,
					r = n.prototype;
				return r.cleanBeforeRender = function() {
					this.drawData.length = 0, this.renderCount = 0
				}, r.$getRenderCount = function() {
					return this.renderCount
				}, i
			}();
		e.RenderNode = i, t.registerClass(i, "egret.sys.RenderNode")
	}(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e;
	!
	function(e) {
		var i = function(e) {
				function i() {
					e.call(this), this.image = null, this.smoothing = !0, this.blendMode = null, this.alpha = 0 / 0, this.filter = null, this.type = 1
				}
				__extends(i, e);
				var n = i,
					r = n.prototype;
				return r.drawImage = function(t, e, i, n, r, s, a, o) {
					this.drawData.push(t, e, i, n, r, s, a, o), this.renderCount++
				}, r.cleanBeforeRender = function() {
					e.prototype.cleanBeforeRender.call(this), this.image = null, this.matrix = null, this.blendMode = null, this.alpha = 0 / 0, this.filter = null
				}, i.$updateTextureData = function(e, n, r, s, a, o, h, l, u, c, d, f, g, p, v, $, m) {
					if (n) {
						var y = t.$TextureScaleFactor;
						if (e.smoothing = m, e.image = n, e.imageWidth = g, e.imageHeight = p, v) i.$updateTextureDataWithScale9Grid(e, v, r, s, a, o, h, l, u, c, d, f);
						else if ($ == t.BitmapFillMode.SCALE) {
							var T = d / u * y,
								x = f / c * y;
							e.drawImage(r, s, a, o, T * h, x * l, T * a, x * o)
						} else if ($ == t.BitmapFillMode.CLIP) {
							var b = Math.min(u, d),
								_ = Math.min(c, f),
								E = a * y,
								C = o * y;
							i.drawClipImage(e, y, r, s, E, C, h, l, b, _)
						} else for (var E = a * y, C = o * y, F = 0; d > F; F += u) for (var w = 0; f > w; w += c) {
							var b = Math.min(d - F, u),
								_ = Math.min(f - w, c);
							i.drawClipImage(e, y, r, s, E, C, h, l, b, _, F, w)
						}
					}
				}, i.$updateTextureDataWithScale9Grid = function(e, i, n, r, s, a, o, h, l, u, c, d) {
					var f = s,
						g = a;
					c -= l - s * t.$TextureScaleFactor, d -= u - a * t.$TextureScaleFactor;
					var p = i.x - o,
						v = i.y - h,
						$ = p / t.$TextureScaleFactor,
						m = v / t.$TextureScaleFactor,
						y = i.width / t.$TextureScaleFactor,
						T = i.height / t.$TextureScaleFactor;
					0 == T && (T = 1, m >= g && m--), 0 == y && (y = 1, $ >= f && $--);
					var x = n,
						b = x + $,
						_ = b + y,
						E = f - $ - y,
						C = r,
						F = C + m,
						w = F + T,
						R = g - m - T,
						S = E * t.$TextureScaleFactor,
						D = R * t.$TextureScaleFactor;
					if (($ + E) * t.$TextureScaleFactor > c || (m + R) * t.$TextureScaleFactor > d) return void e.drawImage(n, r, s, a, o, h, c, d);
					var O = o,
						L = O + p,
						M = O + (c - S),
						A = c - p - S,
						N = h,
						I = N + v,
						B = N + d - D,
						P = d - v - D;
					m > 0 && ($ > 0 && e.drawImage(x, C, $, m, O, N, p, v), y > 0 && e.drawImage(b, C, y, m, L, N, A, v), E > 0 && e.drawImage(_, C, E, m, M, N, S, v)), T > 0 && ($ > 0 && e.drawImage(x, F, $, T, O, I, p, P), y > 0 && e.drawImage(b, F, y, T, L, I, A, P), E > 0 && e.drawImage(_, F, E, T, M, I, S, P)), R > 0 && ($ > 0 && e.drawImage(x, w, $, R, O, B, p, D), y > 0 && e.drawImage(b, w, y, R, L, B, A, D), E > 0 && e.drawImage(_, w, E, R, M, B, S, D))
				}, i.drawClipImage = function(t, e, i, n, r, s, a, o, h, l, u, c) {
					void 0 === u && (u = 0), void 0 === c && (c = 0);
					var d = a + r - h;
					d > 0 && (r -= d), d = o + s - l, d > 0 && (s -= d), t.drawImage(i, n, r / e, s / e, u + a, c + o, r, s)
				}, i
			}(e.RenderNode);
		e.BitmapNode = i, t.registerClass(i, "egret.sys.BitmapNode")
	}(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e;
	!
	function(e) {
		var i = ["none", "round", "square"],
			n = ["bevel", "miter", "round"],
			r = function(r) {
				function s() {
					r.call(this), this.dirtyRender = !0, this.type = 3
				}
				__extends(s, r);
				var a = s,
					o = a.prototype;
				return o.beginFill = function(t, i, n) {
					void 0 === i && (i = 1);
					var r = new e.FillPath;
					if (r.fillColor = t, r.fillAlpha = i, n) {
						var s = this.drawData.lastIndexOf(n);
						this.drawData.splice(s, 0, r)
					} else this.drawData.push(r);
					return r
				}, o.beginGradientFill = function(i, n, r, s, a, o) {
					var h = new t.Matrix;
					a ? (h.a = 819.2 * a.a, h.b = 819.2 * a.b, h.c = 819.2 * a.c, h.d = 819.2 * a.d, h.tx = a.tx, h.ty = a.ty) : (h.a = 100, h.d = 100);
					var l = new e.GradientFillPath;
					if (l.gradientType = i, l.colors = n, l.alphas = r, l.ratios = s, l.matrix = h, o) {
						var u = this.drawData.lastIndexOf(o);
						this.drawData.splice(u, 0, l)
					} else this.drawData.push(l);
					return l
				}, o.lineStyle = function(r, s, a, o, h, l) {
					void 0 === a && (a = 1), void 0 === l && (l = 3), -1 == i.indexOf(o) && (o = "round"), -1 == n.indexOf(h) && (h = "round");
					var u = new e.StrokePath;
					return u.lineWidth = r, u.lineColor = s, u.lineAlpha = a, u.caps = o || t.CapsStyle.ROUND, u.joints = h, u.miterLimit = l, this.drawData.push(u), u
				}, o.clear = function() {
					this.drawData.length = 0, this.dirtyRender = !0
				}, o.cleanBeforeRender = function() {}, o.clean = function() {
					this.$texture && (t.WebGLUtils.deleteWebGLTexture(this.$texture), this.$texture = null, this.dirtyRender = !0)
				}, s
			}(e.RenderNode);
		e.GraphicsNode = r, t.registerClass(r, "egret.sys.GraphicsNode")
	}(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e;
	!
	function(e) {
		var i = function(t) {
				function e() {
					t.call(this), this.type = 4
				}
				__extends(e, t);
				var i = e,
					n = i.prototype;
				return n.addNode = function(t) {
					this.drawData.push(t)
				}, n.cleanBeforeRender = function() {
					for (var t = this.drawData, e = t.length - 1; e >= 0; e--) t[e].cleanBeforeRender()
				}, n.$getRenderCount = function() {
					for (var t = 0, e = this.drawData, i = e.length - 1; i >= 0; i--) t += e[i].$getRenderCount();
					return t
				}, e
			}(e.RenderNode);
		e.GroupNode = i, t.registerClass(i, "egret.sys.GroupNode")
	}(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e;
	!
	function(e) {
		var i = function(e) {
				function i() {
					e.call(this), this.image = null, this.smoothing = !0, this.bounds = new t.Rectangle, this.type = 7, this.vertices = [], this.uvs = [], this.indices = []
				}
				__extends(i, e);
				var n = i,
					r = n.prototype;
				return r.drawMesh = function(t, e, i, n, r, s, a, o) {
					this.drawData.push(t, e, i, n, r, s, a, o), this.renderCount++
				}, r.cleanBeforeRender = function() {
					e.prototype.cleanBeforeRender.call(this), this.image = null, this.matrix = null
				}, i
			}(e.RenderNode);
		e.MeshNode = i, t.registerClass(i, "egret.sys.MeshNode")
	}(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e;
	!
	function(e) {
		var i = function(t) {
				function e() {
					t.call(this), this.type = 6
				}
				__extends(e, t);
				var i = e,
					n = i.prototype;
				return n.setAlpha = function(t) {
					0 != this.drawData.length && (this.drawData.length = 0), this.drawData.push(t), this.renderCount++
				}, e
			}(e.RenderNode);
		e.SetAlphaNode = i, t.registerClass(i, "egret.sys.SetAlphaNode")
	}(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e;
	!
	function(e) {
		var i = function(e) {
				function i() {
					e.call(this), this.textColor = 16777215, this.strokeColor = 0, this.size = 30, this.stroke = 0, this.bold = !1, this.italic = !1, this.fontFamily = "Arial", this.dirtyRender = !0, this.type = 2
				}
				__extends(i, e);
				var n = i,
					r = n.prototype;
				return r.drawText = function(t, e, i, n) {
					this.drawData.push(t, e, i, n), this.renderCount++, this.dirtyRender = !0
				}, r.cleanBeforeRender = function() {
					e.prototype.cleanBeforeRender.call(this)
				}, r.clean = function() {
					this.$texture && (t.WebGLUtils.deleteWebGLTexture(this.$texture), this.$texture = null, this.dirtyRender = !0)
				}, i
			}(e.RenderNode);
		e.TextNode = i, t.registerClass(i, "egret.sys.TextNode")
	}(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e;
	!
	function(e) {
		var i = function() {
				function t() {
					this.type = 0, this.$commands = [], this.$data = [], this.commandPosition = 0, this.dataPosition = 0, this.$lastX = 0, this.$lastY = 0
				}
				var e = t,
					i = e.prototype;
				return i.moveTo = function(t, e) {
					this.$commands[this.commandPosition++] = 1;
					var i = this.dataPosition;
					this.$data[i++] = t, this.$data[i++] = e, this.dataPosition = i
				}, i.lineTo = function(t, e) {
					this.$commands[this.commandPosition++] = 2;
					var i = this.dataPosition;
					this.$data[i++] = t, this.$data[i++] = e, this.dataPosition = i
				}, i.curveTo = function(t, e, i, n) {
					this.$commands[this.commandPosition++] = 3;
					var r = this.dataPosition;
					this.$data[r++] = t, this.$data[r++] = e, this.$data[r++] = i, this.$data[r++] = n, this.dataPosition = r
				}, i.cubicCurveTo = function(t, e, i, n, r, s) {
					this.$commands[this.commandPosition++] = 4;
					var a = this.dataPosition;
					this.$data[a++] = t, this.$data[a++] = e, this.$data[a++] = i, this.$data[a++] = n, this.$data[a++] = r, this.$data[a++] = s, this.dataPosition = a
				}, i.drawRect = function(t, e, i, n) {
					var r = t + i,
						s = e + n;
					this.moveTo(t, e), this.lineTo(r, e), this.lineTo(r, s), this.lineTo(t, s), this.lineTo(t, e)
				}, i.drawRoundRect = function(t, e, i, n, r, s) {
					var a = .5 * r | 0,
						o = s ? .5 * s | 0 : a;
					if (!a || !o) return void this.drawRect(t, e, i, n);
					var h = .5 * i,
						l = .5 * n;
					if (a > h && (a = h), o > l && (o = l), h === a && l === o) return void(a === o ? this.drawCircle(t + a, e + o, a) : this.drawEllipse(t, e, 2 * a, 2 * o));
					var u = t + i,
						c = e + n,
						d = t + a,
						f = u - a,
						g = e + o,
						p = c - o;
					this.moveTo(u, p), this.curveTo(u, c, f, c), this.lineTo(d, c), this.curveTo(t, c, t, p), this.lineTo(t, g), this.curveTo(t, e, d, e), this.lineTo(f, e), this.curveTo(u, e, u, g), this.lineTo(u, p)
				}, i.drawCircle = function(t, e, i) {
					this.arcToBezier(t, e, i, i, 0, 2 * Math.PI)
				}, i.drawEllipse = function(t, e, i, n) {
					var r = .5 * i,
						s = .5 * n;
					t += r, e += s, this.arcToBezier(t, e, r, s, 0, 2 * Math.PI)
				}, i.drawArc = function(t, e, i, n, r, s) {
					s ? r >= n && (r -= 2 * Math.PI) : n >= r && (r += 2 * Math.PI), this.arcToBezier(t, e, i, i, n, r, s)
				}, i.arcToBezier = function(t, e, i, n, r, s, a) {
					var o = .5 * Math.PI,
						h = r,
						l = h;
					a ? (l += -o - h % o, s > l && (l = s)) : (l += o - h % o, l > s && (l = s));
					var u = t + Math.cos(h) * i,
						c = e + Math.sin(h) * n;
					(this.$lastX != u || this.$lastY != c) && this.moveTo(u, c);
					for (var d = Math.cos(h), f = Math.sin(h), g = 0; 4 > g; g++) {
						var p = l - h,
							v = 4 * Math.tan(p / 4) / 3,
							$ = u - f * v * i,
							m = c + d * v * n;
						d = Math.cos(l), f = Math.sin(l), u = t + d * i, c = e + f * n;
						var y = u + f * v * i,
							T = c - d * v * n;
						if (this.cubicCurveTo($, m, y, T, u, c), l === s) break;
						h = l, a ? (l = h - o, s > l && (l = s)) : (l = h + o, l > s && (l = s))
					}
				}, t
			}();
		e.Path2D = i, t.registerClass(i, "egret.sys.Path2D")
	}(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e;
	!
	function(e) {
		var i = function(t) {
				function e() {
					t.call(this), this.type = 1
				}
				__extends(e, t);
				var i = e;
				i.prototype;
				return e
			}(e.Path2D);
		e.FillPath = i, t.registerClass(i, "egret.sys.FillPath")
	}(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e;
	!
	function(e) {
		var i = function(t) {
				function e() {
					t.call(this), this.type = 2
				}
				__extends(e, t);
				var i = e;
				i.prototype;
				return e
			}(e.Path2D);
		e.GradientFillPath = i, t.registerClass(i, "egret.sys.GradientFillPath")
	}(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e;
	!
	function(e) {
		var i = function(t) {
				function e() {
					t.call(this), this.type = 3
				}
				__extends(e, t);
				var i = e;
				i.prototype;
				return e
			}(e.Path2D);
		e.StrokePath = i, t.registerClass(i, "egret.sys.StrokePath")
	}(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!
function(t) {
	function e(t, e) {
		var i = null == e.italic ? t.italic : e.italic,
			n = null == e.bold ? t.bold : e.bold,
			r = null == e.size ? t.size : e.size,
			s = e.fontFamily || t.fontFamily,
			a = i ? "italic " : "normal ";
		return a += n ? "bold " : "normal ", a += r + "px " + s
	}
	function i(t, e) {
		var i = t >> 16,
			n = t >> 8 & 255,
			r = 255 & t;
		return "rgba(" + i + "," + n + "," + r + "," + e + ")"
	}
	function n(e, n, r, s, a, o) {
		var h;
		h = n == t.GradientType.LINEAR ? e.createLinearGradient(-1, 0, 1, 0) : e.createRadialGradient(0, 0, 0, 0, 0, 1);
		for (var l = r.length, u = 0; l > u; u++) h.addColorStop(a[u] / 255, i(r[u], s[u]));
		return h
	}
	function r(t, e, i, n) {
		for (var r = n[0], s = n[1], a = n[2], o = n[3], h = n[4], l = n[5], u = n[6], c = n[7], d = n[8], f = n[9], g = n[10], p = n[11], v = n[12], $ = n[13], m = n[14], y = n[15], T = n[16], x = n[17], b = n[18], _ = n[19], E = 0, C = e * i * 4; C > E; E += 4) {
			var F = t[E + 0],
				w = t[E + 1],
				R = t[E + 2],
				S = t[E + 3];
			t[E + 0] = r * F + s * w + a * R + o * S + h, t[E + 1] = l * F + u * w + c * R + d * S + f, t[E + 2] = g * F + p * w + v * R + $ * S + m, t[E + 3] = y * F + T * w + x * R + b * S + _
		}
	}
	function s(t, e, i, n, r) {
		a(t, e, i, n), o(t, e, i, r)
	}
	function a(t, e, i, n) {
		for (var r = new Uint8ClampedArray(4 * e), s = 4 * e, a = 2 * n + 1, o = 0; i > o; o++) {
			for (var h = o * s, l = 0, u = 0, c = 0, d = 0, f = 0, g = 0, p = 4 * -n, v = 4 * n + 4; v > p; p += 4) {
				var $ = h + p;
				h > $ || $ >= h + s || (f = t[$ + 3], l += t[$ + 0] * f, u += t[$ + 1] * f, c += t[$ + 2] * f, d += f)
			}
			for (var p = h, v = h + s, m = 0, y = p - 4 * n, T = p + 4 * (n + 1); v > p; p += 4, m += 4, T += 4, y += 4) r[m + 0] = l / d, r[m + 1] = u / d, r[m + 2] = c / d, r[m + 3] = d / a, f = t[T + 3], g = t[y + 3], f || 0 == f ? g || 0 == g ? (l += t[T + 0] * f - t[y + 0] * g, u += t[T + 1] * f - t[y + 1] * g, c += t[T + 2] * f - t[y + 2] * g, d += f - g) : (l += t[T + 0] * f, u += t[T + 1] * f, c += t[T + 2] * f, d += f) : (g || 0 == g) && (l += -t[y + 0] * g, u += -t[y + 1] * g, c += -t[y + 2] * g, d += -g);
			t.set(r, h)
		}
	}
	function o(t, e, i, n) {
		for (var r = new Uint8ClampedArray(4 * i), s = 4 * e, a = 2 * n + 1, o = 0; e > o; o++) {
			for (var h = 4 * o, l = 0, u = 0, c = 0, d = 0, f = 0, g = 0, p = -n * s, v = n * s + s; v > p; p += s) {
				var $ = h + p;
				h > $ || $ >= h + i * s || (f = t[$ + 3], l += t[$ + 0] * f, u += t[$ + 1] * f, c += t[$ + 2] * f, d += f)
			}
			for (var p = h, v = h + i * s, m = 0, y = h - n * s, T = h + (n + 1) * s; v > p; p += s, m += 4, T += s, y += s) r[m + 0] = l / d, r[m + 1] = u / d, r[m + 2] = c / d, r[m + 3] = d / a, f = t[T + 3], g = t[y + 3], f || 0 == f ? g || 0 == g ? (l += t[T + 0] * f - t[y + 0] * g, u += t[T + 1] * f - t[y + 1] * g, c += t[T + 2] * f - t[y + 2] * g, d += f - g) : (l += t[T + 0] * f, u += t[T + 1] * f, c += t[T + 2] * f, d += f) : (g || 0 == g) && (l += -t[y + 0] * g, u += -t[y + 1] * g, c += -t[y + 2] * g, d += -g);
			for (var x = 4 * o, v = x + i * s, b = 0; v > x; x += s, b += 4) t[x + 0] = r[b + 0], t[x + 1] = r[b + 1], t[x + 2] = r[b + 2], t[x + 3] = r[b + 3]
		}
	}
	function h(t, e, i, n, r, a, o, h, f) {
		var g = l(t, n);
		u(g, e, i, o, h), s(g, e, i, r, a), c(g, f), d(g, t), t.set(g)
	}
	function l(t, e) {
		e || (e = [0, 0, 0, 0]);
		for (var i = new Uint8ClampedArray(t), n = 0, r = i.length; r > n; n += 4) {
			var s = i[n + 3];
			i[n + 0] = e[0] * s, i[n + 1] = e[1] * s, i[n + 2] = e[2] * s
		}
		return i
	}
	function u(t, e, i, n, r) {
		for (var s = Math.sin(n) * r | 0, a = Math.cos(n) * r | 0, o = new Int32Array(t.buffer), h = new Int32Array(o.length), l = 0; i > l; l++) {
			var u = l + s;
			if (!(0 > u || u > i)) for (var c = 0; e > c; c++) {
				var d = c + a;
				0 > d || d > e || (h[u * e + d] = o[l * e + c])
			}
		}
		o.set(h)
	}
	function c(t, e) {
		for (var i = 0, n = t.length; n > i; i += 4) t[i + 3] *= e
	}
	function d(t, e) {
		for (var i = 0, n = t.length; n > i; i += 4) {
			var r = t[i + 0],
				s = t[i + 1],
				a = t[i + 2],
				o = t[i + 3] / 255,
				h = e[i + 0],
				l = e[i + 1],
				u = e[i + 2],
				c = e[i + 3] / 255;
			t[i + 0] = h + r * (1 - c), t[i + 1] = l + s * (1 - c), t[i + 2] = u + a * (1 - c), t[i + 3] = 255 * (c + o * (1 - c))
		}
	}
	function f(t, e, i) {
		return t * (1 - i) + e * i
	}
	function g(t, e, i, n, r, s, a, o, h, l, u, c) {
		for (var d, g, p = new Uint8ClampedArray(t), v = n[3], $ = 0, m = 0, y = o * Math.cos(a), T = o * Math.sin(a), x = 7, b = 12, _ = 3.141592653589793, E = r / x, C = s / x, F = 0; e > F; F++) for (var w = 0; i > w; w++) {
			for (var R = 0, S = w * e * 4 + 4 * F, D = 0, O = 0, L = t[S + 0] / 255, M = t[S + 1] / 255, A = t[S + 2] / 255, N = t[S + 3] / 255, I = 0; 2 * _ >= I; I += 2 * _ / b) {
				d = Math.cos(I + R), g = Math.sin(I + R);
				for (var B = 0; x > B; B++) {
					$ = B * E * d, m = B * C * g;
					var P = Math.round(F + $ - y),
						k = Math.round(w + m - T),
						U = 0;
					if (P >= e || 0 > P || 0 > k || k >= i) U = 0;
					else {
						var X = k * e * 4 + 4 * P;
						U = t[X + 3] / 255
					}
					D += (x - B) * U, O += x - B
				}
			}
			N = Math.max(N, 1e-4);
			var Y = D / O * h * v * (1 - l) * Math.max(Math.min(c, u), 1 - N),
				H = (O - D) / O * h * v * l * N;
			N = Math.max(N * u * (1 - c), 1e-4);
			var j = H / (H + N),
				W = f(L, n[0], j),
				G = f(M, n[1], j),
				V = f(A, n[2], j),
				z = Y / (H + N + Y),
				Z = f(W, n[0], z),
				q = f(G, n[1], z),
				J = f(V, n[2], z),
				K = Math.min(N + Y + H, 1);
			p[S + 0] = 255 * Z, p[S + 1] = 255 * q, p[S + 2] = 255 * J, p[S + 3] = 255 * K
		}
		t.set(p)
	}
	var p = ["source-over", "lighter", "destination-out"],
		v = "source-over",
		$ = "#000000",
		m = {
			none: "butt",
			square: "square",
			round: "round"
		},
		y = [],
		T = function() {
			function a() {
				this.nestLevel = 0, this.renderingMask = !1
			}
			var o = a,
				l = o.prototype;
			return l.render = function(t, e, i, n, r) {
				this.nestLevel++;
				var s = e.context,
					a = r ? t : null,
					o = this.drawDisplayObject(t, s, n, i, null, null, a);
				if (this.nestLevel--, 0 === this.nestLevel) {
					y.length > 6 && (y.length = 6);
					for (var h = y.length, l = 0; h > l; l++) y[l].resize(0, 0)
				}
				return o
			}, l.drawDisplayObject = function(e, i, n, r, s, a, o) {
				var h, l = 0;
				if (s && !o ? (s.isDirty && (l += s.drawToSurface()), h = s.$renderNode) : h = e.$getRenderNode(), h) {
					if (n) {
						var u = h.renderRegion;
						if (a && !a.intersects(u)) h.needRedraw = !1;
						else if (!h.needRedraw) for (var c = n.length, d = 0; c > d; d++) if (u.intersects(n[d])) {
							h.needRedraw = !0;
							break
						}
					} else h.needRedraw = !0;
					if (h.needRedraw) {
						var f = void 0,
							g = void 0;
						o ? (f = e.$getConcatenatedAlphaAt(o, e.$getConcatenatedAlpha()), g = t.Matrix.create().copyFrom(e.$getConcatenatedMatrix()), e.$getConcatenatedMatrixAt(o, g), r.$preMultiplyInto(g, g), i.setTransform(g.a, g.b, g.c, g.d, g.tx, g.ty), t.Matrix.release(g)) : (f = h.renderAlpha, g = h.renderMatrix, i.setTransform(g.a, g.b, g.c, g.d, g.tx + r.tx, g.ty + r.ty)), i.globalAlpha = f, l += this.renderNode(h, i), h.needRedraw = !1
					}
				}
				if (s && !o) return l;
				var p = e.$children;
				if (p) for (var v = p.length, $ = 0; v > $; $++) {
					var m = p[$];
					if (!(!m.$visible || m.$alpha <= 0 || m.$maskedObject)) {
						var y = m.$getFilters();
						y && y.length > 0 ? l += this.drawWithFilter(m, i, n, r, a, o) : 0 !== m.$blendMode || m.$mask && (m.$mask.$parentDisplayList || o) ? l += this.drawWithClip(m, i, n, r, a, o) : m.$scrollRect || m.$maskRect ? l += this.drawWithScrollRect(m, i, n, r, a, o) : m.isFPS ? this.drawDisplayObject(m, i, n, r, m.$displayList, a, o) : l += this.drawDisplayObject(m, i, n, r, m.$displayList, a, o)
					}
				}
				return l
			}, l.drawWithFilter = function(e, i, n, a, o, l) {
				if (t.Capabilities.runtimeType == t.RuntimeType.NATIVE) {
					var u, c = 0,
						d = e.$getFilters(),
						f = 0 !== e.$blendMode;
					if (f && (u = p[e.$blendMode], u || (u = v)), 1 == d.length && "colorTransform" == d[0].type && !e.$children) return f && (i.globalCompositeOperation = u), i.setGlobalShader(d[0]), c += e.$mask && (e.$mask.$parentDisplayList || l) ? this.drawWithClip(e, i, n, a, o, l) : e.$scrollRect || e.$maskRect ? this.drawWithScrollRect(e, i, n, a, o, l) : this.drawDisplayObject(e, i, n, a, e.$displayList, o, l), i.setGlobalShader(null), f && (i.globalCompositeOperation = v), c;
					var $ = t.Matrix.create();
					$.copyFrom(e.$getConcatenatedMatrix());
					var m;
					m = t.sys.Region.create();
					var T = e.$getOriginalBounds();
					m.updateRegion(T, $);
					var x = this.createRenderBuffer(m.width, m.height);
					x.context.setTransform(1, 0, 0, 1, -m.minX, -m.minY);
					var b = t.Matrix.create().setTo(1, 0, 0, 1, -m.minX, -m.minY);
					return c += e.$mask && (e.$mask.$parentDisplayList || l) ? this.drawWithClip(e, x.context, n, b, m, l) : e.$scrollRect || e.$maskRect ? this.drawWithScrollRect(e, x.context, n, b, m, l) : this.drawDisplayObject(e, x.context, n, b, e.$displayList, m, l), t.Matrix.release(b), c > 0 && (f && (i.globalCompositeOperation = u), c++, i.globalAlpha = 1, i.setTransform(1, 0, 0, 1, m.minX + a.tx, m.minY + a.ty), i.setGlobalShader(d[0]), i.drawImage(x.surface, 0, 0, x.width, x.height, 0, 0, x.width, x.height), i.setGlobalShader(null), f && (i.globalCompositeOperation = v)), y.push(x), t.sys.Region.release(m), t.Matrix.release($), c
				}
				var _, E = 0,
					C = e.$getFilters(),
					F = C.length,
					w = 0 !== e.$blendMode;
				w && (_ = p[e.$blendMode], _ || (_ = v));
				var R = t.Matrix.create();
				R.copyFrom(e.$getConcatenatedMatrix());
				var S;
				S = t.sys.Region.create();
				var D = e.$getOriginalBounds();
				S.updateRegion(D, R);
				var O = this.createRenderBuffer(S.width, S.height),
					L = O.context;
				L.setTransform(1, 0, 0, 1, -S.minX, -S.minY);
				var M = t.Matrix.create().setTo(1, 0, 0, 1, -S.minX, -S.minY);
				if (E += e.$mask && (e.$mask.$parentDisplayList || l) ? this.drawWithClip(e, L, n, M, S, l) : e.$scrollRect || e.$maskRect ? this.drawWithScrollRect(e, L, n, M, S, l) : this.drawDisplayObject(e, L, n, M, e.$displayList, S, l), t.Matrix.release(M), E > 0) {
					w && (i.globalCompositeOperation = _), E++, i.globalAlpha = 1, i.setTransform(1, 0, 0, 1, S.minX + a.tx, S.minY + a.ty);
					for (var A = L.getImageData(0, 0, O.surface.width, O.surface.height), N = 0; F > N; N++) {
						var I = C[N];
						if ("colorTransform" == I.type) r(A.data, O.surface.width, O.surface.height, I.$matrix);
						else if ("blur" == I.type) s(A.data, O.surface.width, O.surface.height, I.$blurX, I.$blurY);
						else if ("glow" == I.type) {
							var B = I.$red,
								P = I.$green,
								k = I.$blue,
								U = I.$alpha;
							I.$inner || I.$knockout || I.$hideObject ? g(A.data, O.surface.width, O.surface.height, [B / 255, P / 255, k / 255, U], I.$blurX, I.$blurY, I.$angle ? I.$angle / 180 * Math.PI : 0, I.$distance || 0, I.$strength, I.$inner ? 1 : 0, I.$knockout ? 0 : 1, I.$hideObject ? 1 : 0) : h(A.data, O.surface.width, O.surface.height, [B / 255, P / 255, k / 255, U / 255], I.$blurX, I.$blurY, I.$angle ? I.$angle / 180 * Math.PI : 0, I.$distance || 0, I.$strength)
						}
					}
					L.putImageData(A, 0, 0), i.drawImage(O.surface, 0, 0), w && (i.globalCompositeOperation = v)
				}
				return y.push(O), t.sys.Region.release(S), t.Matrix.release(R), E
			}, l.drawWithClip = function(e, i, n, r, s, a) {
				var o, h = 0,
					l = 0 !== e.$blendMode;
				l && (o = p[e.$blendMode], o || (o = v));
				var u, c = e.$scrollRect ? e.$scrollRect : e.$maskRect,
					d = e.$mask;
				if (d && (u = d.$getRenderNode())) {
					var f = u.renderMatrix;
					if (0 == f.a && 0 == f.b || 0 == f.c && 0 == f.d) return h
				}
				var g, $ = t.Matrix.create();
				if ($.copyFrom(e.$getConcatenatedMatrix()), e.$parentDisplayList) {
					var m = e.$parentDisplayList.root;
					m !== e.$stage && e.$getConcatenatedMatrixAt(m, $)
				}
				var T;
				if (d) {
					T = d.$getOriginalBounds(), g = t.sys.Region.create();
					var x = t.Matrix.create();
					x.copyFrom(d.$getConcatenatedMatrix()), g.updateRegion(T, x), t.Matrix.release(x)
				}
				var b;
				if (c && (b = t.sys.Region.create(), b.updateRegion(c, $)), b && g ? (b.intersect(g), t.sys.Region.release(g)) : !b && g && (b = g), b) {
					if (b.isEmpty() || s && !s.intersects(b)) return t.sys.Region.release(b), t.Matrix.release($), h
				} else b = t.sys.Region.create(), T = e.$getOriginalBounds(), b.updateRegion(T, $);
				var _ = !1;
				if (n) {
					for (var E = n.length, C = 0; E > C; C++) if (b.intersects(n[C])) {
						_ = !0;
						break
					}
				} else _ = !0;
				if (!_) return t.sys.Region.release(b), t.Matrix.release($), h;
				if (!(d || e.$children && 0 != e.$children.length)) {
					if (c) {
						var x = $;
						i.save(), i.setTransform(x.a, x.b, x.c, x.d, x.tx - b.minX, x.ty - b.minY), i.beginPath(), i.rect(c.x, c.y, c.width, c.height), i.clip()
					}
					return l && (i.globalCompositeOperation = o), h += this.drawDisplayObject(e, i, n, r, e.$displayList, s, a), l && (i.globalCompositeOperation = v), c && i.restore(), h
				}
				if (d && t.Capabilities.$runtimeType == t.RuntimeType.WEB && (!d.$children || 0 == d.$children.length) && u && 3 == u.type && 1 == u.drawData.length && 1 == u.drawData[0].type && 1 == u.drawData[0].fillAlpha) {
					this.renderingMask = !0, i.save();
					var F = this.drawDisplayObject(d, i, n, r, d.$displayList, s, a);
					if (this.renderingMask = !1, c) {
						var x = $;
						i.setTransform(x.a, x.b, x.c, x.d, x.tx - b.minX, x.ty - b.minY), i.beginPath(), i.rect(c.x, c.y, c.width, c.height), i.clip()
					}
					return F += this.drawDisplayObject(e, i, n, r, e.$displayList, s, a), i.restore(), F
				}
				var w = this.createRenderBuffer(b.width, b.height),
					R = w.context;
				if (!R) return h += this.drawDisplayObject(e, i, n, r, e.$displayList, s, a), t.sys.Region.release(b), t.Matrix.release($), h;
				R.setTransform(1, 0, 0, 1, -b.minX, -b.minY);
				var S = t.Matrix.create().setTo(1, 0, 0, 1, -b.minX, -b.minY);
				if (h += this.drawDisplayObject(e, R, n, S, e.$displayList, b, a), d) if (t.Capabilities.$runtimeType == t.RuntimeType.WEB && u && 1 == u.$getRenderCount() || d.$displayList) R.globalCompositeOperation = "destination-in", h += this.drawDisplayObject(d, R, n, S, d.$displayList, b, a);
				else {
					var D = this.createRenderBuffer(b.width, b.height),
						O = D.context;
					if (!O) return h += this.drawDisplayObject(e, i, n, r, e.$displayList, s, a), y.push(w), t.sys.Region.release(b), t.Matrix.release($), h;
					O.setTransform(1, 0, 0, 1, -b.minX, -b.minY), S = t.Matrix.create().setTo(1, 0, 0, 1, -b.minX, -b.minY), h += this.drawDisplayObject(d, O, n, S, d.$displayList, b, a), R.globalCompositeOperation = "destination-in", R.setTransform(1, 0, 0, 1, 0, 0), R.globalAlpha = 1, R.drawImage(D.surface, 0, 0), y.push(D)
				}
				if (t.Matrix.release(S), h > 0) {
					if (h++, l && (i.globalCompositeOperation = o), c) {
						var x = $;
						i.save(), i.setTransform(x.a, x.b, x.c, x.d, x.tx - b.minX, x.ty - b.minY), i.beginPath(), i.rect(c.x, c.y, c.width, c.height), i.clip()
					}
					i.globalAlpha = 1, i.setTransform(1, 0, 0, 1, b.minX + r.tx, b.minY + r.ty), i.drawImage(w.surface, 0, 0), c && i.restore(), l && (i.globalCompositeOperation = v)
				}
				return y.push(w), t.sys.Region.release(b), t.Matrix.release($), h
			}, l.drawWithScrollRect = function(e, i, n, r, s, a) {
				var o = 0,
					h = e.$scrollRect ? e.$scrollRect : e.$maskRect;
				if (h.isEmpty()) return o;
				var l = t.Matrix.create();
				if (l.copyFrom(e.$getConcatenatedMatrix()), a) e.$getConcatenatedMatrixAt(a, l);
				else if (e.$parentDisplayList) {
					var u = e.$parentDisplayList.root;
					u !== e.$stage && e.$getConcatenatedMatrixAt(u, l)
				}
				var c = t.sys.Region.create();
				if (c.updateRegion(h, l), c.isEmpty() || s && !s.intersects(c)) return t.sys.Region.release(c), t.Matrix.release(l), o;
				var d = !1;
				if (n) {
					for (var f = n.length, g = 0; f > g; g++) if (c.intersects(n[g])) {
						d = !0;
						break
					}
				} else d = !0;
				return d ? (i.save(), i.setTransform(l.a, l.b, l.c, l.d, l.tx + r.tx, l.ty + r.ty), i.beginPath(), i.rect(h.x, h.y, h.width, h.height), i.clip(), o += this.drawDisplayObject(e, i, n, r, e.$displayList, c, a), i.restore(), t.sys.Region.release(c), t.Matrix.release(l), o) : (t.sys.Region.release(c), t.Matrix.release(l), o)
			}, l.drawNodeToBuffer = function(t, e, i, n) {
				var r = e.context;
				r.setTransform(i.a, i.b, i.c, i.d, i.tx, i.ty), this.renderNode(t, r, n)
			}, l.renderNode = function(t, e, i) {
				var n = 0;
				switch (t.type) {
				case 1:
					n = this.renderBitmap(t, e);
					break;
				case 2:
					n = 1, this.renderText(t, e);
					break;
				case 3:
					n = 1, this.renderGraphics(t, e, i);
					break;
				case 4:
					n = this.renderGroup(t, e);
					break;
				case 6:
					e.globalAlpha = t.drawData[0];
					break;
				case 7:
					n = this.renderMesh(t, e)
				}
				return n
			}, l.renderMesh = function(e, i) {
				if (t.Capabilities.runtimeType != t.RuntimeType.NATIVE) return 0;
				var n = e.image,
					r = e.drawData,
					s = r.length,
					a = 0,
					o = e.matrix;
				for (o && (i.saveTransform(), i.transform(o.a, o.b, o.c, o.d, o.tx, o.ty)); s > a;) i.drawMesh(n.source, r[a++], r[a++], r[a++], r[a++], r[a++], r[a++], r[a++], r[a++], e.imageWidth, e.imageHeight, e.uvs, e.vertices, e.indices, e.bounds);
				return o && i.restoreTransform(), 1
			}, l.renderBitmap = function(e, i) {
				var n = e.image;
				if (!n || !n.source) return 0;
				i.$imageSmoothingEnabled != e.smoothing && (i.imageSmoothingEnabled = e.smoothing, i.$imageSmoothingEnabled = e.smoothing);
				var s = e.drawData,
					a = s.length,
					o = 0,
					h = e.matrix,
					l = e.blendMode,
					u = e.alpha,
					c = !1;
				h && (i.saveTransform ? i.saveTransform() : i.save(), c = !0, i.transform(h.a, h.b, h.c, h.d, h.tx, h.ty)), l && (i.globalCompositeOperation = p[l]);
				var d;
				u == u && (d = i.globalAlpha, i.globalAlpha *= u);
				var f = 0,
					g = e.filter;
				if (g && 8 == a) if (t.Capabilities.runtimeType == t.RuntimeType.NATIVE) {
					for (egret_native.Graphics.setGlobalShader(g); a > o;) f++, i.drawImage(n.source, s[o++], s[o++], s[o++], s[o++], s[o++], s[o++], s[o++], s[o++]);
					egret_native.Graphics.setGlobalShader(null)
				} else {
					var $ = this.createRenderBuffer(s[6], s[7]),
						m = $.context;
					f++, m.drawImage(n.source, s[0], s[1], s[2], s[3], 0, 0, s[6], s[7]), f++;
					var T = m.getImageData(0, 0, $.surface.width, $.surface.height);
					r(T.data, $.surface.width, $.surface.height, g.$matrix), m.putImageData(T, 0, 0), i.drawImage($.surface, 0, 0, s[6], s[7], s[4], s[5], s[6], s[7]), y.push($)
				} else for (; a > o;) f++, i.drawImage(n.source, s[o++], s[o++], s[o++], s[o++], s[o++], s[o++], s[o++], s[o++]);
				return c ? i.restoreTransform ? (i.restoreTransform(), l && (i.globalCompositeOperation = v), u == u && (i.globalAlpha = d)) : i.restore() : (l && (i.globalCompositeOperation = v), u == u && (i.globalAlpha = d)), f
			}, l.renderText = function(i, n) {
				n.textAlign = "left", n.textBaseline = "middle", n.lineJoin = "round";
				for (var r = i.drawData, s = r.length, a = 0; s > a;) {
					var o = r[a++],
						h = r[a++],
						l = r[a++],
						u = r[a++];
					n.font = e(i, u);
					var c = null == u.textColor ? i.textColor : u.textColor,
						d = null == u.strokeColor ? i.strokeColor : u.strokeColor,
						f = null == u.stroke ? i.stroke : u.stroke;
					n.fillStyle = t.toColorString(c), n.strokeStyle = t.toColorString(d), f && (n.lineWidth = 2 * f, n.strokeText(l, o, h)), n.fillText(l, o, h)
				}
			}, l.renderGraphics = function(t, e, r) {
				var s = t.drawData,
					a = s.length;
				r = !! r;
				for (var o = 0; a > o; o++) {
					var h = s[o];
					switch (h.type) {
					case 1:
						var l = h;
						e.fillStyle = r ? $ : i(l.fillColor, l.fillAlpha), this.renderPath(h, e), this.renderingMask ? e.clip() : e.fill();
						break;
					case 2:
						var u = h;
						e.fillStyle = r ? $ : n(e, u.gradientType, u.colors, u.alphas, u.ratios, u.matrix), e.save();
						var c = u.matrix;
						this.renderPath(h, e), e.transform(c.a, c.b, c.c, c.d, c.tx, c.ty), e.fill(), e.restore();
						break;
					case 3:
						var d = h,
							f = d.lineWidth;
						e.lineWidth = f, e.strokeStyle = r ? $ : i(d.lineColor, d.lineAlpha), e.lineCap = m[d.caps], e.lineJoin = d.joints, e.miterLimit = d.miterLimit;
						var g = 1 === f || 3 === f;
						g && e.translate(.5, .5), this.renderPath(h, e), e.stroke(), g && e.translate(-.5, -.5)
					}
				}
			}, l.renderPath = function(t, e) {
				e.beginPath();
				for (var i = t.$data, n = t.$commands, r = n.length, s = 0, a = 0; r > a; a++) {
					var o = n[a];
					switch (o) {
					case 4:
						e.bezierCurveTo(i[s++], i[s++], i[s++], i[s++], i[s++], i[s++]);
						break;
					case 3:
						e.quadraticCurveTo(i[s++], i[s++], i[s++], i[s++]);
						break;
					case 2:
						e.lineTo(i[s++], i[s++]);
						break;
					case 1:
						e.moveTo(i[s++], i[s++])
					}
				}
			}, l.renderGroup = function(t, e) {
				for (var i = 0, n = t.drawData, r = n.length, s = 0; r > s; s++) {
					var a = n[s];
					i += this.renderNode(a, e)
				}
				return i
			}, l.createRenderBuffer = function(e, i) {
				var n = y.pop();
				return n ? n.resize(e, i, !0) : n = new t.sys.CanvasRenderBuffer(e, i), n
			}, a
		}();
	t.CanvasRenderer = T, t.registerClass(T, "egret.CanvasRenderer", ["egret.sys.SystemRenderer"])
}(egret || (egret = {}));
var egret;
!
function(t) {
	t.DeviceOrientation = null
}(egret || (egret = {}));
var egret;
!
function(t) {}(egret || (egret = {}));
var egret;
!
function(t) {}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function() {
			function t() {}
			var e = t;
			e.prototype;
			return t.WEB = "web", t.NATIVE = "native", t
		}();
	t.RuntimeType = e, t.registerClass(e, "egret.RuntimeType");
	var i = function() {
			function t() {}
			var e = __define,
				i = t;
			i.prototype;
			return e(t, "language", function() {
				return t.$language
			}), e(t, "isMobile", function() {
				return t.$isMobile
			}), e(t, "os", function() {
				return t.$os
			}), e(t, "runtimeType", function() {
				return t.$runtimeType
			}), e(t, "supportVersion", function() {
				return t.$supportVersion
			}), e(t, "engineVersion", function() {
				return "3.2.4"
			}), t.$setNativeCapabilities = function(e) {
				var i = e.split("-");
				if (i.length <= 4) {
					var n = i[0];
					switch (n) {
					case "android":
						n = "Android";
						break;
					case "ios":
						n = "iOS"
					}
					t.$os = n;
					var r = i[2].substring(1, i[2].length);
					t.$supportVersion = r
				}
			}, e(t, "renderMode", function() {
				return t.$renderMode
			}), e(t, "boundingClientWidth", function() {
				return t.$boundingClientWidth
			}), e(t, "boundingClientHeight", function() {
				return t.$boundingClientHeight
			}), t.$language = "zh-CN", t.$os = "Unknown", t.$runtimeType = "Unknown", t.$supportVersion = "Unknown", t.$renderMode = "Unknown", t.$boundingClientWidth = 0, t.$boundingClientHeight = 0, t
		}();
	t.Capabilities = i, t.registerClass(i, "egret.Capabilities")
}(egret || (egret = {}));
var testDeviceType = function() {
		if (!this.navigator) return !0;
		var t = navigator.userAgent.toLowerCase();
		return -1 != t.indexOf("mobile") || -1 != t.indexOf("android")
	},
	testRuntimeType = function() {
		return this.navigator ? !0 : !1
	};
egret.Capabilities.$isMobile = testDeviceType(), egret.Capabilities.$runtimeType = testRuntimeType() ? egret.RuntimeType.WEB : egret.RuntimeType.NATIVE;
var egret;
!
function(t) {
	function e() {}
	function i(t, e) {
		r[t] = e
	}
	function n(t) {
		return r[t]
	}
	t.getI = e;
	var r = {};
	t.registerImplementation = i, t.getImplementation = n
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(t) {
			function e(e, i) {
				t.call(this, e), this.firstCharHeight = 0, "string" == typeof i ? this.charList = this.parseConfig(i) : i && i.hasOwnProperty("frames") ? this.charList = i.frames : this.charList = {}
			}
			__extends(e, t);
			var i = e,
				n = i.prototype;
			return n.getTexture = function(t) {
				var e = this._textureMap[t];
				if (!e) {
					var i = this.charList[t];
					if (!i) return null;
					e = this.createTexture(t, i.x, i.y, i.w, i.h, i.offX, i.offY, i.sourceW, i.sourceH), this._textureMap[t] = e
				}
				return e
			}, n.getConfig = function(t, e) {
				return this.charList[t] ? this.charList[t][e] : 0
			}, n._getFirstCharHeight = function() {
				if (0 == this.firstCharHeight) for (var t in this.charList) {
					var e = this.charList[t];
					if (e) {
						var i = e.sourceH;
						if (void 0 === i) {
							var n = e.h;
							void 0 === n && (n = 0);
							var r = e.offY;
							void 0 === r && (r = 0), i = n + r
						}
						if (0 >= i) continue;
						this.firstCharHeight = i;
						break
					}
				}
				return this.firstCharHeight
			}, n.parseConfig = function(t) {
				t = t.split("\r\n").join("\n");
				for (var e = t.split("\n"), i = this.getConfigByKey(e[3], "count"), n = {}, r = 4; 4 + i > r; r++) {
					var s = e[r],
						a = String.fromCharCode(this.getConfigByKey(s, "id")),
						o = {};
					n[a] = o, o.x = this.getConfigByKey(s, "x"), o.y = this.getConfigByKey(s, "y"), o.w = this.getConfigByKey(s, "width"), o.h = this.getConfigByKey(s, "height"), o.offX = this.getConfigByKey(s, "xoffset"), o.offY = this.getConfigByKey(s, "yoffset"), o.xadvance = this.getConfigByKey(s, "xadvance")
				}
				return n
			}, n.getConfigByKey = function(t, e) {
				for (var i = t.split(" "), n = 0, r = i.length; r > n; n++) {
					var s = i[n];
					if (e == s.substring(0, e.length)) {
						var a = s.substring(e.length + 1);
						return parseInt(a)
					}
				}
				return 0
			}, e
		}(t.SpriteSheet);
	t.BitmapFont = e, t.registerClass(e, "egret.BitmapFont")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(e) {
			function i() {
				e.call(this), this.$textOffsetX = 0, this.$textOffsetY = 0, this.$textStartX = 0, this.$textStartY = 0, this.$lineHeights = [], this.$renderNode = new t.sys.BitmapNode, this.$BitmapText = {
					0: 0 / 0,
					1: 0 / 0,
					2: "",
					3: 0,
					4: 0,
					5: null,
					6: !1,
					7: !1,
					8: !1,
					9: !1,
					10: "left",
					11: "top",
					12: t.Bitmap.defaultSmoothing
				}
			}
			__extends(i, e);
			var n = __define,
				r = i,
				s = r.prototype;
			return n(s, "smoothing", function() {
				var t = this.$BitmapText;
				return t[12]
			}, function(t) {
				t = !! t;
				var e = this.$BitmapText;
				t != e[12] && (e[12] = t, this.$invalidate())
			}), n(s, "text", function() {
				return this.$BitmapText[2]
			}, function(t) {
				this.$setText(t)
			}), s.$setText = function(t) {
				null == t && (t = ""), t = String(t);
				var e = this.$BitmapText;
				return t == e[2] ? !1 : (e[2] = t, this.$invalidateContentBounds(), !0)
			}, s.$getWidth = function() {
				var t = this.$BitmapText[0];
				return isNaN(t) ? this.$getContentBounds().width : t
			}, s.$setWidth = function(t) {
				var e = this.$BitmapText;
				return 0 > t || t == e[0] ? !1 : (e[0] = t, this.$invalidateContentBounds(), !0)
			}, s.$invalidateContentBounds = function() {
				e.prototype.$invalidateContentBounds.call(this), this.$BitmapText[7] = !0
			}, s.$getHeight = function() {
				var t = this.$BitmapText[1];
				return isNaN(t) ? this.$getContentBounds().height : t
			}, s.$setHeight = function(t) {
				var e = this.$BitmapText;
				return 0 > t || t == e[1] ? !1 : (e[1] = t, this.$invalidateContentBounds(), !0)
			}, n(s, "font", function() {
				return this.$BitmapText[5]
			}, function(t) {
				this.$setFont(t)
			}), s.$setFont = function(t) {
				var e = this.$BitmapText;
				return e[5] == t ? !1 : (e[5] = t, this.$BitmapText[6] = !0, this.$invalidateContentBounds(), !0)
			}, n(s, "lineSpacing", function() {
				return this.$BitmapText[3]
			}, function(t) {
				this.$setLineSpacing(t)
			}), s.$setLineSpacing = function(t) {
				t = +t || 0;
				var e = this.$BitmapText;
				return e[3] == t ? !1 : (e[3] = t, this.$invalidateContentBounds(), !0)
			}, n(s, "letterSpacing", function() {
				return this.$BitmapText[4]
			}, function(t) {
				this.$setLetterSpacing(t)
			}), s.$setLetterSpacing = function(t) {
				t = +t || 0;
				var e = this.$BitmapText;
				return e[4] == t ? !1 : (e[4] = t, this.$invalidateContentBounds(), !0)
			}, n(s, "textAlign", function() {
				return this.$BitmapText[10]
			}, function(t) {
				this.$setTextAlign(t)
			}), s.$setTextAlign = function(t) {
				var e = this.$BitmapText;
				return e[10] == t ? !1 : (e[10] = t, this.$invalidateContentBounds(), !0)
			}, n(s, "verticalAlign", function() {
				return this.$BitmapText[11]
			}, function(t) {
				this.$setVerticalAlign(t)
			}), s.$setVerticalAlign = function(t) {
				var e = this.$BitmapText;
				return e[11] == t ? !1 : (e[11] = t, this.$invalidateContentBounds(), !0)
			}, s.$render = function() {
				var e = this.$BitmapText,
					n = this.$getTextLines(),
					r = n.length;
				if (0 != r) {
					var s = this.$textLinesWidth,
						a = e[5],
						o = this.$renderNode;
					a.$texture && (o.image = a.$texture._bitmapData), o.smoothing = e[12];
					for (var h = a._getFirstCharHeight(), l = Math.ceil(h * i.EMPTY_FACTOR), u = !isNaN(e[1]), c = e[8], d = e[0], f = e[1], g = e[10], p = this.$textOffsetY + this.$textStartY, v = this.$lineHeights, $ = 0; r > $; $++) {
						var m = v[$];
						if (u && $ > 0 && p + m > f) break;
						var y = n[$],
							T = y.length,
							x = this.$textOffsetX;
						if (g != t.HorizontalAlign.LEFT) {
							var b = d > c ? d : c;
							g == t.HorizontalAlign.RIGHT ? x += b - s[$] : g == t.HorizontalAlign.CENTER && (x += Math.floor((b - s[$]) / 2))
						}
						for (var _ = 0; T > _; _++) {
							var E = y.charAt(_),
								C = a.getTexture(E);
							if (C) {
								var F = C._bitmapWidth,
									w = C._bitmapHeight;
								o.imageWidth = C._sourceWidth, o.imageHeight = C._sourceHeight, o.drawImage(C._bitmapX, C._bitmapY, F, w, x + C._offsetX, p + C._offsetY, C.$getScaleBitmapWidth(), C.$getScaleBitmapHeight()), x += (a.getConfig(E, "xadvance") || C.$getTextureWidth()) + e[4]
							} else " " == E ? x += l : t.$warn(1046, E)
						}
						p += m + e[3]
					}
				}
			}, s.$measureContentBounds = function(t) {
				var e = this.$getTextLines();
				0 == e.length ? t.setEmpty() : t.setTo(this.$textOffsetX + this.$textStartX, this.$textOffsetY + this.$textStartY, this.$BitmapText[8] - this.$textOffsetX, this.$BitmapText[9] - this.$textOffsetY)
			}, n(s, "textWidth", function() {
				return this.$getTextLines(), this.$BitmapText[8]
			}), n(s, "textHeight", function() {
				return this.$getTextLines(), this.$BitmapText[9]
			}), s.$getTextLines = function() {
				function e(t) {
					return y && r.length > 0 && g > y ? !1 : (g += l + c, o || h || (u -= d), r.push(t), a.push(l), s.push(u), f = Math.max(u, f), !0)
				}
				var n = this.$BitmapText;
				if (!n[7]) return this.textLines;
				var r = [];
				this.textLines = r;
				var s = [];
				this.$textLinesWidth = s, n[7] = !1;
				var a = [];
				if (this.$lineHeights = a, !n[2] || !n[5]) return r;
				for (var o, h, l, u, c = n[3], d = n[4], f = 0, g = 0, p = 0, v = 0, $ = !isNaN(n[0]), m = n[0], y = n[1], T = n[5], x = T._getFirstCharHeight(), b = Math.ceil(x * i.EMPTY_FACTOR), _ = n[2], E = _.split(/(?:\r\n|\r|\n)/), C = E.length, F = !0, w = 0; C > w; w++) {
					var R = E[w],
						S = R.length;
					l = 0, u = 0, o = !0, h = !1;
					for (var D = 0; S > D; D++) {
						o || (u += d);
						var O = R.charAt(D),
							L = void 0,
							M = void 0,
							A = 0,
							N = 0,
							I = T.getTexture(O);
						if (I) L = I.$getTextureWidth(), M = I.$getTextureHeight(), A = I._offsetX, N = I._offsetY;
						else {
							if (" " != O) {
								t.$warn(1046, O), o && (o = !1);
								continue
							}
							L = b, M = x
						}
						if (o && (o = !1, p = Math.min(A, p)), F && (F = !1, v = Math.min(N, v)), $ && D > 0 && u + L > m) {
							if (!e(R.substring(0, D))) break;
							R = R.substring(D), S = R.length, D = 0, u = D == S - 1 ? L : T.getConfig(O, "xadvance") || L, l = M
						} else u += D == S - 1 ? L : T.getConfig(O, "xadvance") || L, l = Math.max(M, l)
					}
					if (y && w > 0 && g > y) break;
					if (h = !0, !e(R)) break
				}
				g -= c, n[8] = f, n[9] = g, this.$textOffsetX = p, this.$textOffsetY = v, this.$textStartX = 0, this.$textStartY = 0;
				var B;
				return m > f && (B = n[10], B == t.HorizontalAlign.RIGHT ? this.$textStartX = m - f : B == t.HorizontalAlign.CENTER && (this.$textStartX = Math.floor((m - f) / 2))), y > g && (B = n[11], B == t.VerticalAlign.BOTTOM ? this.$textStartY = y - g : B == t.VerticalAlign.MIDDLE && (this.$textStartY = Math.floor((y - g) / 2))), r
			}, i.EMPTY_FACTOR = .33, i
		}(t.DisplayObject);
	t.BitmapText = e, t.registerClass(e, "egret.BitmapText")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function() {
			function t() {}
			var e = t;
			e.prototype;
			return t.LEFT = "left", t.RIGHT = "right", t.CENTER = "center", t.JUSTIFY = "justify", t.CONTENT_JUSTIFY = "contentJustify", t
		}();
	t.HorizontalAlign = e, t.registerClass(e, "egret.HorizontalAlign")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function() {
			function e() {
				this.replaceArr = [], this.resutlArr = [], this.initReplaceArr()
			}
			var i = e,
				n = i.prototype;
			return n.initReplaceArr = function() {
				this.replaceArr = [], this.replaceArr.push([/&lt;/g, "<"]), this.replaceArr.push([/&gt;/g, ">"]), this.replaceArr.push([/&amp;/g, "&"]), this.replaceArr.push([/&quot;/g, '"']), this.replaceArr.push([/&apos;/g, "'"])
			}, n.replaceSpecial = function(t) {
				for (var e = 0; e < this.replaceArr.length; e++) {
					var i = this.replaceArr[e][0],
						n = this.replaceArr[e][1];
					t = t.replace(i, n)
				}
				return t
			}, n.parser = function(e) {
				this.stackArray = [], this.resutlArr = [];
				for (var i = 0, n = e.length; n > i;) {
					var r = e.indexOf("<", i);
					if (0 > r) this.addToResultArr(e.substring(i)), i = n;
					else {
						this.addToResultArr(e.substring(i, r));
						var s = e.indexOf(">", r); - 1 == s ? (t.$error(1038), s = r) : "/" == e.charAt(r + 1) ? this.stackArray.pop() : this.addToArray(e.substring(r + 1, s)), i = s + 1
					}
				}
				return this.resutlArr
			}, n.addToResultArr = function(t) {
				"" != t && (t = this.replaceSpecial(t), this.stackArray.length > 0 ? this.resutlArr.push({
					text: t,
					style: this.stackArray[this.stackArray.length - 1]
				}) : this.resutlArr.push({
					text: t
				}))
			}, n.changeStringToObject = function(t) {
				t = t.trim();
				var e = {},
					i = [];
				if ("i" == t.charAt(0) || "b" == t.charAt(0) || "u" == t.charAt(0)) this.addProperty(e, t, "true");
				else if (i = t.match(/^(font|a)\s/)) {
					t = t.substring(i[0].length).trim();
					for (var n = 0, r = void 0; r = t.match(this.getHeadReg());) {
						var s = r[0],
							a = "";
						if (t = t.substring(s.length).trim(), '"' == t.charAt(0)) {
							var o = t.indexOf('"', 1);
							a = t.substring(1, o), o += 1
						} else if ("'" == t.charAt(0)) {
							var h = t.indexOf("'", 1);
							a = t.substring(1, h), h += 1
						} else a = t.match(/(\S)+/)[0], n = a.length;
						this.addProperty(e, s.substring(0, s.length - 1).trim(), a.trim()), t = t.substring(n).trim()
					}
				}
				return e
			}, n.getHeadReg = function() {
				return /^(color|textcolor|strokecolor|stroke|b|bold|i|italic|u|size|fontfamily|href|target)(\s)*=/
			}, n.addProperty = function(t, e, i) {
				switch (e.toLowerCase()) {
				case "color":
				case "textcolor":
					i = i.replace(/#/, "0x"), t.textColor = parseInt(i);
					break;
				case "strokecolor":
					i = i.replace(/#/, "0x"), t.strokeColor = parseInt(i);
					break;
				case "stroke":
					t.stroke = parseInt(i);
					break;
				case "b":
				case "bold":
					t.bold = "true" == i;
					break;
				case "u":
					t.underline = "true" == i;
					break;
				case "i":
				case "italic":
					t.italic = "true" == i;
					break;
				case "size":
					t.size = parseInt(i);
					break;
				case "fontfamily":
					t.fontFamily = i;
					break;
				case "href":
					t.href = this.replaceSpecial(i);
					break;
				case "target":
					t.target = this.replaceSpecial(i)
				}
			}, n.addToArray = function(t) {
				var e = this.changeStringToObject(t);
				if (0 == this.stackArray.length) this.stackArray.push(e);
				else {
					var i = this.stackArray[this.stackArray.length - 1];
					for (var n in i) null == e[n] && (e[n] = i[n]);
					this.stackArray.push(e)
				}
			}, e
		}();
	t.HtmlTextParser = e, t.registerClass(e, "egret.HtmlTextParser")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function(e) {
			function i() {
				e.call(this), this.stageTextAdded = !1, this._text = null, this._isFocus = !1
			}
			__extends(i, e);
			var n = i,
				r = n.prototype;
			return r.init = function(e) {
				this._text = e, this.stageText = new t.StageText, this.stageText.$setTextField(this._text)
			}, r._addStageText = function() {
				this.stageTextAdded || (this._text.$inputEnabled || (this._text.$touchEnabled = !0), this.tempStage = this._text.stage, this.stageText.$addToStage(), this.stageText.addEventListener("updateText", this.updateTextHandler, this), this._text.addEventListener(t.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this), this.stageText.addEventListener("blur", this.blurHandler, this), this.stageText.addEventListener("focus", this.focusHandler, this), this.stageTextAdded = !0)
			}, r._removeStageText = function() {
				this.stageTextAdded && (this._text.$inputEnabled || (this._text.$touchEnabled = !1), this.stageText.$removeFromStage(), this.stageText.removeEventListener("updateText", this.updateTextHandler, this), this._text.removeEventListener(t.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this), this.tempStage.removeEventListener(t.TouchEvent.TOUCH_BEGIN, this.onStageDownHandler, this), this.stageText.removeEventListener("blur", this.blurHandler, this), this.stageText.removeEventListener("focus", this.focusHandler, this), this.stageTextAdded = !1)
			}, r._getText = function() {
				return this.stageText.$getText()
			}, r._setText = function(t) {
				this.stageText.$setText(t)
			}, r._setColor = function(t) {
				this.stageText.$setColor(t)
			}, r.focusHandler = function(e) {
				this._isFocus || (this._isFocus = !0, e.showing || (this._text.$isTyping = !0), this._text.$invalidateContentBounds(), this._text.dispatchEvent(new t.FocusEvent(t.FocusEvent.FOCUS_IN, !0)))
			}, r.blurHandler = function(e) {
				this._isFocus && (this._isFocus = !1, this.tempStage.removeEventListener(t.TouchEvent.TOUCH_BEGIN, this.onStageDownHandler, this), this._text.$isTyping = !1, this._text.$invalidateContentBounds(), this.stageText.$onBlur(), this._text.dispatchEvent(new t.FocusEvent(t.FocusEvent.FOCUS_OUT, !0)))
			}, r.onMouseDownHandler = function(t) {
				t.stopPropagation(), this.$onFocus()
			}, r.$onFocus = function() {
				this._text.visible && (this._isFocus || (this.tempStage.addEventListener(t.TouchEvent.TOUCH_BEGIN, this.onStageDownHandler, this), this.stageText.$show()))
			}, r.onStageDownHandler = function(t) {
				this.stageText.$hide()
			}, r.updateTextHandler = function(e) {
				var i, n, r = this._text.$TextField,
					s = this.stageText.$getText(),
					a = !1;
				null != r[35] && (i = new RegExp("[" + r[35] + "]", "g"), n = s.match(i), s = n ? n.join("") : "", a = !0), null != r[36] && (i = new RegExp("[^" + r[36] + "]", "g"), n = s.match(i), s = n ? n.join("") : "", a = !0), a && this.stageText.$getText() != s && this.stageText.$setText(s), this.resetText(), this._text.dispatchEvent(new t.Event(t.Event.CHANGE, !0))
			}, r.resetText = function() {
				this._text.$setBaseText(this.stageText.$getText())
			}, r._hideInput = function() {
				this.stageText.$removeFromStage()
			}, r.updateInput = function() {
				!this._text.$visible && this.stageText && this._hideInput()
			}, r._updateProperties = function() {
				if (this._isFocus) return this.stageText.$resetStageText(), void this.updateInput();
				var t = this._text.$stage;
				if (null == t);
				else for (var e = this._text, i = e.$visible;;) {
					if (!i) break;
					if (e = e.parent, e == t) break;
					i = e.$visible
				}
				this.stageText.$setText(this._text.$TextField[13]), this.stageText.$resetStageText(), this.updateInput()
			}, i
		}(t.HashObject);
	t.InputController = e, t.registerClass(e, "egret.InputController")
}(egret || (egret = {}));
var egret;
!
function(t) {}(egret || (egret = {}));
var egret;
!
function(t) {
	function e(e, i, r) {
		r = r || {};
		var s = null == r.italic ? i[16] : r.italic,
			a = null == r.bold ? i[15] : r.bold,
			o = null == r.size ? i[0] : r.size,
			h = r.fontFamily || i[8] || n.default_fontFamily;
		return t.sys.measureText(e, h, o, a, s)
	}
	var i = new RegExp("(?=[\¿-\῿\Ⰰ-\퟿]|\\b|\\s)(?![。，！、》…）)}”】\\.\\,\\!\\?\\]\\:])"),
		n = function(n) {
			function r() {
				n.call(this), this.$inputEnabled = !1, this.inputUtils = null, this.graphicsNode = null, this.isFlow = !1, this.textArr = [], this.linesArr = [], this.$isTyping = !1;
				var e = new t.sys.TextNode;
				e.fontFamily = r.default_fontFamily, this.textNode = e, this.$renderNode = e, this.$TextField = {
					0: r.default_size,
					1: 0,
					2: r.default_textColor,
					3: 0 / 0,
					4: 0 / 0,
					5: 0,
					6: 0,
					7: 0,
					8: r.default_fontFamily,
					9: "left",
					10: "top",
					11: "#ffffff",
					12: "",
					13: "",
					14: [],
					15: !1,
					16: !1,
					17: !0,
					18: !1,
					19: !1,
					20: !1,
					21: 0,
					22: 0,
					23: 0,
					24: t.TextFieldType.DYNAMIC,
					25: 0,
					26: "#000000",
					27: 0,
					28: -1,
					29: 0,
					30: !1,
					31: !1,
					32: 0,
					33: !1,
					34: 16777215,
					35: null,
					36: null,
					37: t.TextFieldInputType.TEXT
				}
			}
			__extends(r, n);
			var s = __define,
				a = r,
				o = a.prototype;
			return o.isInput = function() {
				return this.$TextField[24] == t.TextFieldType.INPUT
			}, o.$setTouchEnabled = function(t) {
				var e = n.prototype.$setTouchEnabled.call(this, t);
				return this.isInput() && (this.$inputEnabled = !0), e
			}, s(o, "fontFamily", function() {
				return this.$TextField[8]
			}, function(t) {
				this.$setFontFamily(t)
			}), o.$setFontFamily = function(t) {
				var e = this.$TextField;
				return e[8] == t ? !1 : (e[8] = t, this.invalidateFontString(), !0)
			}, s(o, "size", function() {
				return this.$TextField[0]
			}, function(t) {
				this.$setSize(t)
			}), o.$setSize = function(t) {
				t = +t || 0;
				var e = this.$TextField;
				return e[0] == t ? !1 : (e[0] = t, this.invalidateFontString(), !0)
			}, s(o, "bold", function() {
				return this.$TextField[15]
			}, function(t) {
				this.$setBold(t)
			}), o.$setBold = function(t) {
				t = !! t;
				var e = this.$TextField;
				return t == e[15] ? !1 : (e[15] = t, this.invalidateFontString(), !0)
			}, s(o, "italic", function() {
				return this.$TextField[16]
			}, function(t) {
				this.$setItalic(t)
			}), o.$setItalic = function(t) {
				t = !! t;
				var e = this.$TextField;
				return t == e[16] ? !1 : (e[16] = t, this.invalidateFontString(), !0)
			}, o.invalidateFontString = function() {
				this.$TextField[17] = !0, this.$invalidateTextField()
			}, s(o, "textAlign", function() {
				return this.$TextField[9]
			}, function(t) {
				this.$setTextAlign(t)
			}), o.$setTextAlign = function(t) {
				var e = this.$TextField;
				return e[9] == t ? !1 : (e[9] = t, this.$invalidateTextField(), !0)
			}, s(o, "verticalAlign", function() {
				return this.$TextField[10]
			}, function(t) {
				this.$setVerticalAlign(t)
			}), o.$setVerticalAlign = function(t) {
				var e = this.$TextField;
				return e[10] == t ? !1 : (e[10] = t, this.$invalidateTextField(), !0)
			}, s(o, "lineSpacing", function() {
				return this.$TextField[1]
			}, function(t) {
				this.$setLineSpacing(t)
			}), o.$setLineSpacing = function(t) {
				t = +t || 0;
				var e = this.$TextField;
				return e[1] == t ? !1 : (e[1] = t, this.$invalidateTextField(), !0)
			}, s(o, "textColor", function() {
				return this.$TextField[2]
			}, function(t) {
				this.$setTextColor(t)
			}), o.$setTextColor = function(t) {
				t = 0 | +t;
				var e = this.$TextField;
				return e[2] == t ? !1 : (e[2] = t, this.inputUtils && this.inputUtils._setColor(this.$TextField[2]), this.$invalidate(), !0)
			}, s(o, "wordWrap", function() {
				return this.$TextField[19]
			}, function(t) {
				t = !! t;
				var e = this.$TextField;
				t != e[19] && (e[20] || (e[19] = t, this.$invalidateTextField()))
			}), s(o, "type", function() {
				return this.$TextField[24]
			}, function(t) {
				this.$setType(t)
			}), o.$setType = function(e) {
				var i = this.$TextField;
				return i[24] != e ? (i[24] = e, e == t.TextFieldType.INPUT ? (isNaN(i[3]) && this.$setWidth(100), isNaN(i[4]) && this.$setHeight(30), this.$setTouchEnabled(!0), null == this.inputUtils && (this.inputUtils = new t.InputController), this.inputUtils.init(this), this.$invalidateTextField(), this.$stage && this.inputUtils._addStageText()) : (this.inputUtils && (this.inputUtils._removeStageText(), this.inputUtils = null), this.$setTouchEnabled(!1)), !0) : !1
			}, s(o, "inputType", function() {
				return this.$TextField[37]
			}, function(t) {
				this.$TextField[37] = t
			}), s(o, "text", function() {
				return this.$getText()
			}, function(t) {
				this.$setText(t)
			}), o.$getText = function() {
				return this.$TextField[24] == t.TextFieldType.INPUT ? this.inputUtils._getText() : this.$TextField[13]
			}, o.$setBaseText = function(t) {
				null == t && (t = ""), t = t.toString(), this.isFlow = !1;
				var e = this.$TextField;
				if (e[13] != t) {
					this.$invalidateTextField(), e[13] = t;
					var i = "";
					return i = e[20] ? this.changeToPassText(t) : t, this.setMiddleStyle([{
						text: i
					}]), !0
				}
				return !1
			}, o.$setText = function(t) {
				null == t && (t = "");
				var e = this.$setBaseText(t);
				return this.inputUtils && this.inputUtils._setText(this.$TextField[13]), e
			}, s(o, "displayAsPassword", function() {
				return this.$TextField[20]
			}, function(t) {
				this.$setDisplayAsPassword(t)
			}), o.$setDisplayAsPassword = function(t) {
				var e = this.$TextField;
				if (e[20] != t) {
					e[20] = t, this.$invalidateTextField();
					var i = "";
					return i = t ? this.changeToPassText(e[13]) : e[13], this.setMiddleStyle([{
						text: i
					}]), !0
				}
				return !1
			}, s(o, "strokeColor", function() {
				return this.$TextField[25]
			}, function(t) {
				t = +t || 0, this.$setStrokeColor(t)
			}), o.$setStrokeColor = function(e) {
				var i = this.$TextField;
				return i[25] != e ? (this.$invalidateTextField(), i[25] = e, i[26] = t.toColorString(e), !0) : !1
			}, s(o, "stroke", function() {
				return this.$TextField[27]
			}, function(t) {
				this.$setStroke(t)
			}), o.$setStroke = function(t) {
				return this.$TextField[27] != t ? (this.$invalidateTextField(), this.$TextField[27] = t, !0) : !1
			}, s(o, "maxChars", function() {
				return this.$TextField[21]
			}, function(t) {
				this.$setMaxChars(t)
			}), o.$setMaxChars = function(t) {
				return this.$TextField[21] != t ? (this.$TextField[21] = t, !0) : !1
			}, s(o, "scrollV", function() {
				return Math.min(Math.max(this.$TextField[28], 1), this.maxScrollV)
			}, function(t) {
				this.$TextField[28] = Math.max(t, 1), this.$invalidateTextField()
			}), s(o, "maxScrollV", function() {
				return this.$getLinesArr(), Math.max(this.$TextField[29] - t.TextFieldUtils.$getScrollNum(this) + 1, 1)
			}), s(o, "selectionBeginIndex", function() {
				return 0
			}), s(o, "selectionEndIndex", function() {
				return 0
			}), s(o, "caretIndex", function() {
				return 0
			}), o.$setSelection = function(t, e) {
				return !1
			}, o.$getLineHeight = function() {
				return this.$TextField[1] + this.$TextField[0]
			}, s(o, "numLines", function() {
				return this.$getLinesArr(), this.$TextField[29]
			}), s(o, "multiline", function() {
				return this.$TextField[30]
			}, function(t) {
				this.$setMultiline(t)
			}), o.$setMultiline = function(t) {
				return this.$TextField[30] = t, this.$invalidateTextField(), !0
			}, s(o, "restrict", function() {
				var t = this.$TextField,
					e = null;
				return null != t[35] && (e = t[35]), null != t[36] && (null == e && (e = ""), e += "^" + t[36]), e
			}, function(t) {
				var e = this.$TextField;
				if (null == t) e[35] = null, e[36] = null;
				else {
					for (var i = -1; i < t.length && (i = t.indexOf("^", i), 0 != i) && i > 0 && "\\" == t.charAt(i - 1);) i++;
					0 == i ? (e[35] = null, e[36] = t.substring(i + 1)) : i > 0 ? (e[35] = t.substring(0, i), e[36] = t.substring(i + 1)) : (e[35] = t, e[36] = null)
				}
			}), o.$setWidth = function(t) {
				var e = this.$TextField;
				if (isNaN(t)) {
					if (isNaN(e[3])) return !1;
					e[3] = 0 / 0
				} else {
					if (e[3] == t) return !1;
					e[3] = t
				}
				return t = +t, 0 > t ? !1 : (this.$invalidateTextField(), !0)
			}, o.$setHeight = function(t) {
				var e = this.$TextField;
				if (isNaN(t)) {
					if (isNaN(e[4])) return !1;
					e[4] = 0 / 0
				} else {
					if (e[4] == t) return !1;
					e[4] = t
				}
				return t = +t, 0 > t ? !1 : (this.$invalidateTextField(), !0)
			}, o.$getWidth = function() {
				var t = this.$TextField;
				return isNaN(t[3]) ? this.$getContentBounds().width : t[3]
			}, o.$getHeight = function() {
				var t = this.$TextField;
				return isNaN(t[4]) ? this.$getContentBounds().height : t[4]
			}, s(o, "border", function() {
				return this.$TextField[31]
			}, function(t) {
				this.$TextField[31] = !! t, this.$invalidate()
			}), s(o, "borderColor", function() {
				return this.$TextField[32]
			}, function(t) {
				this.$TextField[32] = +t || 0, this.$invalidate()
			}), s(o, "background", function() {
				return this.$TextField[33]
			}, function(t) {
				this.$TextField[33] = t, this.$invalidate()
			}), s(o, "backgroundColor", function() {
				return this.$TextField[34]
			}, function(t) {
				this.$TextField[34] = t, this.$invalidate()
			}), o.fillBackground = function(e) {
				var i = this.graphicsNode;
				i && i.clear();
				var n = this.$TextField;
				if (n[33] || n[31] || e && e.length > 0) {
					if (!i) {
						i = this.graphicsNode = new t.sys.GraphicsNode;
						var r = new t.sys.GroupNode;
						r.addNode(i), r.addNode(this.textNode), this.$renderNode = r
					}
					var s = void 0,
						a = void 0;
					if (n[33] && (s = i.beginFill(n[34]), s.drawRect(0, 0, this.$getWidth(), this.$getHeight())), n[31] && (a = i.lineStyle(1, n[32]), a.drawRect(0, 0, this.$getWidth() - 1, this.$getHeight() - 1)), e && e.length > 0) for (var o = n[2], h = -1, l = e.length, u = 0; l > u; u += 4) {
						var c = e[u],
							d = e[u + 1],
							f = e[u + 2],
							g = e[u + 3] || o;
						(0 > h || h != g) && (h = g, a = i.lineStyle(2, g, 1, t.CapsStyle.NONE)), a.moveTo(c, d), a.lineTo(c + f, d)
					}
				}
				if (i) {
					var p = this.$getRenderBounds();
					i.x = p.x, i.y = p.y, i.width = p.width, i.height = p.height, t.Rectangle.release(p)
				}
			}, o.setFocus = function() {
				this.type == t.TextFieldType.INPUT && this.$stage && this.inputUtils.$onFocus()
			}, o.$onRemoveFromStage = function() {
				n.prototype.$onRemoveFromStage.call(this), this.removeEvent(), this.$TextField[24] == t.TextFieldType.INPUT && this.inputUtils._removeStageText(), this.textNode && this.textNode.clean()
			}, o.$onAddToStage = function(e, i) {
				n.prototype.$onAddToStage.call(this, e, i), this.addEvent(), this.$TextField[24] == t.TextFieldType.INPUT && this.inputUtils._addStageText()
			}, o.$invalidateTextField = function() {
				this.$invalidateContentBounds(), this.$TextField[18] = !0
			}, o.$update = function(e, i) {
				var r = this.$getRenderBounds(),
					s = n.prototype.$update.call(this, e, r);
				return t.Rectangle.release(r), s
			}, o.$getRenderBounds = function() {
				var e = this.$getContentBounds(),
					i = t.Rectangle.create();
				i.copyFrom(e), this.$TextField[31] && (i.width += 2, i.height += 2);
				var n = 2 * this.$TextField[27];
				return n > 0 && (i.width += 2 * n, i.height += 2 * n), i.x -= n + 2, i.y -= n + 2, i.width = Math.ceil(i.width) + 4, i.height = Math.ceil(i.height) + 4, i
			}, o.$measureContentBounds = function(e) {
				this.$getLinesArr();
				var i = isNaN(this.$TextField[3]) ? this.$TextField[5] : this.$TextField[3],
					n = isNaN(this.$TextField[4]) ? t.TextFieldUtils.$getTextHeight(this) : this.$TextField[4];
				e.setTo(0, 0, i, n)
			}, o.$render = function() {
				if (this.$TextField[24] == t.TextFieldType.INPUT) {
					if ((this.$hasAnyFlags(2032) || this.$hasAnyFlags(1648)) && this.inputUtils._updateProperties(), this.$isTyping) return void this.fillBackground()
				} else if (0 == this.$TextField[3]) return;
				var e = this.drawText();
				this.fillBackground(e);
				var i = this.$getRenderBounds(),
					n = this.textNode;
				n.x = i.x, n.y = i.y, n.width = Math.ceil(i.width), n.height = Math.ceil(i.height), t.Rectangle.release(i)
			}, s(o, "textFlow", function() {
				return this.textArr
			}, function(t) {
				this.isFlow = !0;
				var e = "";
				null == t && (t = []);
				for (var i = 0; i < t.length; i++) {
					var n = t[i];
					e += n.text
				}
				this.$TextField[20] ? this.$setBaseText(e) : (this.$TextField[13] = e, this.setMiddleStyle(t))
			}), o.changeToPassText = function(t) {
				if (this.$TextField[20]) {
					for (var e = "", i = 0, n = t.length; n > i; i++) switch (t.charAt(i)) {
					case "\n":
						e += "\n";
						break;
					case "\r":
						break;
					default:
						e += "*"
					}
					return e
				}
				return t
			}, o.setMiddleStyle = function(t) {
				this.$TextField[18] = !0, this.textArr = t, this.$invalidateTextField()
			}, s(o, "textWidth", function() {
				return this.$getLinesArr(), this.$TextField[5]
			}), s(o, "textHeight", function() {
				return this.$getLinesArr(), t.TextFieldUtils.$getTextHeight(this)
			}), o.appendText = function(t) {
				this.appendElement({
					text: t
				})
			}, o.appendElement = function(t) {
				var e = this.$TextField[13] + t.text;
				this.$TextField[20] ? this.$setBaseText(e) : (this.$TextField[13] = e, this.textArr.push(t), this.setMiddleStyle(this.textArr))
			}, o.$getLinesArr = function() {
				var n = this.$TextField;
				if (!n[18]) return this.linesArr;
				n[18] = !1;
				var r = this.textArr;
				this.linesArr.length = 0, n[6] = 0, n[5] = 0;
				var s = n[3];
				if (!isNaN(s) && 0 == s) return n[29] = 0, [{
					width: 0,
					height: 0,
					charNum: 0,
					elements: [],
					hasNextLine: !1
				}];
				for (var a, o = this.linesArr, h = 0, l = 0, u = 0, c = 0, d = 0, f = r.length; f > d; d++) {
					var g = r[d];
					if (g.text) {
						g.style = g.style || {};
						for (var p = g.text.toString(), v = p.split(/(?:\r\n|\r|\n)/), $ = 0, m = v.length; m > $; $++) {
							null == o[c] && (a = {
								width: 0,
								height: 0,
								elements: [],
								charNum: 0,
								hasNextLine: !1
							}, o[c] = a, h = 0, u = 0, l = 0), u = n[24] == t.TextFieldType.INPUT ? n[0] : Math.max(u, g.style.size || n[0]);
							var y = !0;
							if ("" == v[$]) $ == m - 1 && (y = !1);
							else {
								var T = e(v[$], n, g.style);
								if (isNaN(s)) h += T, l += v[$].length, a.elements.push({
									width: T,
									text: v[$],
									style: g.style
								}), $ == m - 1 && (y = !1);
								else if (s >= h + T) a.elements.push({
									width: T,
									text: v[$],
									style: g.style
								}), h += T, l += v[$].length, $ == m - 1 && (y = !1);
								else {
									var x = 0,
										b = 0,
										_ = v[$],
										E = void 0;
									E = n[19] ? _.split(i) : _.match(/./g);
									for (var C = E.length, F = 0; C > x; x++) {
										var w = E[x].length,
											R = !1;
										if (1 == w && C - 1 > x) {
											var S = E[x].charCodeAt(0),
												D = E[x + 1].charCodeAt(0);
											if (S >= 55296 && 56319 >= S && 56320 == (64512 & D)) {
												var O = E[x] + E[x + 1];
												w = 2, R = !0, T = e(O, n, g.style)
											} else T = e(E[x], n, g.style)
										} else T = e(E[x], n, g.style);
										if (0 != h && h + T > s && h + x != 0) break;
										if (b + T > s) for (var L = E[x].match(/./g), M = 0, A = L.length; A > M; M++) {
											var w = L[M].length,
												N = !1;
											if (1 == w && A - 1 > M) {
												var S = L[M].charCodeAt(0),
													D = L[M + 1].charCodeAt(0);
												if (S >= 55296 && 56319 >= S && 56320 == (64512 & D)) {
													var O = L[M] + L[M + 1];
													w = 2, N = !0, T = e(O, n, g.style)
												} else T = e(L[M], n, g.style)
											} else T = e(L[M], n, g.style);
											if (M > 0 && h + T > s) break;
											F += w, b += T, h += T, l += F, N && M++
										} else F += w, b += T, h += T, l += F;
										R && x++
									}
									if (x > 0) {
										a.elements.push({
											width: b,
											text: _.substring(0, F),
											style: g.style
										});
										var I = _.substring(F),
											B = void 0,
											P = I.length;
										for (B = 0; P > B && " " == I.charAt(B); B++);
										v[$] = I.substring(B)
									}
									"" != v[$] && ($--, y = !1)
								}
							}
							y && (l++, a.hasNextLine = !0), $ < v.length - 1 && (a.width = h, a.height = u, a.charNum = l, n[5] = Math.max(n[5], h), n[6] += u, c++)
						}
						d == r.length - 1 && a && (a.width = h, a.height = u, a.charNum = l, n[5] = Math.max(n[5], h), n[6] += u)
					} else a && (a.width = h, a.height = u, a.charNum = l, n[5] = Math.max(n[5], h), n[6] += u)
				}
				return n[29] = o.length, o
			}, o.drawText = function() {
				var e = this.textNode,
					i = this.$TextField;
				e.bold = i[15], e.fontFamily = i[8] || r.default_fontFamily, e.italic = i[16], e.size = i[0], e.stroke = i[27], e.strokeColor = i[25], e.textColor = i[2];
				var n = this.$getLinesArr();
				if (0 == i[5]) return [];
				var s = isNaN(i[3]) ? i[5] : i[3],
					a = t.TextFieldUtils.$getTextHeight(this),
					o = 0,
					h = t.TextFieldUtils.$getStartLine(this),
					l = i[4];
				if (!isNaN(l) && l > a) {
					var u = t.TextFieldUtils.$getValign(this);
					o += u * (l - a)
				}
				o = Math.round(o);
				for (var c = t.TextFieldUtils.$getHalign(this), d = 0, f = [], g = h, p = i[29]; p > g; g++) {
					var v = n[g],
						$ = v.height;
					if (o += $ / 2, g != h) {
						if (i[24] == t.TextFieldType.INPUT && !i[30]) break;
						if (!isNaN(l) && o > l) break
					}
					d = Math.round((s - v.width) * c);
					for (var m = 0, y = v.elements.length; y > m; m++) {
						var T = v.elements[m],
							x = T.style.size || i[0];
						e.drawText(d, o + ($ - x) / 2, T.text, T.style), T.style.underline && f.push(d, o + $ / 2, T.width, T.style.textColor), d += T.width
					}
					o += $ / 2 + i[1]
				}
				return f
			}, o.addEvent = function() {
				this.addEventListener(t.TouchEvent.TOUCH_TAP, this.onTapHandler, this)
			}, o.removeEvent = function() {
				this.removeEventListener(t.TouchEvent.TOUCH_TAP, this.onTapHandler, this)
			}, o.onTapHandler = function(e) {
				if (this.$TextField[24] != t.TextFieldType.INPUT) {
					var i = t.TextFieldUtils.$getTextElement(this, e.localX, e.localY);
					if (null != i) {
						var n = i.style;
						if (n && n.href) if (n.href.match(/^event:/)) {
							var r = n.href.match(/^event:/)[0];
							t.TextEvent.dispatchTextEvent(this, t.TextEvent.LINK, n.href.substring(r.length))
						} else open(n.href, n.target || "_blank")
					}
				}
			}, r.default_fontFamily = "Arial", r.default_size = 30, r.default_textColor = 16777215, r
		}(t.DisplayObject);
	t.TextField = n, t.registerClass(n, "egret.TextField")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function() {
			function t() {}
			var e = t;
			e.prototype;
			return t.TEXT = "text", t.TEL = "tel", t.PASSWORD = "password", t
		}();
	t.TextFieldInputType = e, t.registerClass(e, "egret.TextFieldInputType")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function() {
			function t() {}
			var e = t;
			e.prototype;
			return t.DYNAMIC = "dynamic", t.INPUT = "input", t
		}();
	t.TextFieldType = e, t.registerClass(e, "egret.TextFieldType")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function() {
			function e() {}
			var i = e;
			i.prototype;
			return e.$getStartLine = function(t) {
				var i = t.$TextField,
					n = e.$getTextHeight(t),
					r = 0,
					s = i[4];
				return isNaN(s) || (s > n || n > s && (r = Math.max(i[28] - 1, 0), r = Math.min(i[29] - 1, r)), i[30] || (r = Math.max(i[28] - 1, 0), i[29] > 0 && (r = Math.min(i[29] - 1, r)))), r
			}, e.$getHalign = function(e) {
				var i = e.$getLinesArr(),
					n = 0;
				return e.$TextField[9] == t.HorizontalAlign.CENTER ? n = .5 : e.$TextField[9] == t.HorizontalAlign.RIGHT && (n = 1), e.$TextField[24] == t.TextFieldType.INPUT && !e.$TextField[30] && i.length > 1 && (n = 0), n
			}, e.$getTextHeight = function(e) {
				var i = t.TextFieldType.INPUT != e.$TextField[24] || e.$TextField[30] ? e.$TextField[6] + (e.$TextField[29] - 1) * e.$TextField[1] : e.$TextField[0];
				return i
			}, e.$getValign = function(i) {
				var n = e.$getTextHeight(i),
					r = i.$TextField[4];
				if (!isNaN(r) && r > n) {
					var s = 0;
					return i.$TextField[10] == t.VerticalAlign.MIDDLE ? s = .5 : i.$TextField[10] == t.VerticalAlign.BOTTOM && (s = 1), s
				}
				return 0
			}, e.$getTextElement = function(t, i, n) {
				var r = e.$getHit(t, i, n),
					s = t.$getLinesArr();
				return r && s[r.lineIndex] && s[r.lineIndex].elements[r.textElementIndex] ? s[r.lineIndex].elements[r.textElementIndex] : null
			}, e.$getHit = function(t, i, n) {
				var r = t.$getLinesArr();
				if (0 == t.$TextField[3]) return null;
				var s = 0,
					a = e.$getTextHeight(t),
					o = 0,
					h = t.$TextField[4];
				if (!isNaN(h) && h > a) {
					var l = e.$getValign(t);
					o = l * (h - a), 0 != o && (n -= o)
				}
				for (var u = e.$getStartLine(t), c = 0, d = u; d < r.length; d++) {
					var f = r[d];
					if (c + f.height >= n) {
						n > c && (s = d + 1);
						break
					}
					if (c += f.height, c + t.$TextField[1] > n) return null;
					c += t.$TextField[1]
				}
				if (0 == s) return null;
				var g = r[s - 1],
					p = t.$TextField[3];
				isNaN(p) && (p = t.textWidth);
				var v = e.$getHalign(t);
				i -= v * (p - g.width);
				for (var $ = 0, d = 0; d < g.elements.length; d++) {
					var m = g.elements[d];
					if ($ + m.width <= i) $ += m.width;
					else if (i > $) return {
						lineIndex: s - 1,
						textElementIndex: d
					}
				}
				return null
			}, e.$getScrollNum = function(t) {
				var e = 1;
				if (t.$TextField[30]) {
					var i = t.height,
						n = t.size,
						r = t.lineSpacing;
					e = Math.floor(i / (n + r));
					var s = i - (n + r) * e;
					s > n / 2 && e++
				}
				return e
			}, e
		}();
	t.TextFieldUtils = e, t.registerClass(e, "egret.TextFieldUtils")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e;
	!
	function(t) {}(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function() {
			function t() {}
			var e = t;
			e.prototype;
			return t.TOP = "top", t.BOTTOM = "bottom", t.MIDDLE = "middle", t.JUSTIFY = "justify", t.CONTENT_JUSTIFY = "contentJustify", t
		}();
	t.VerticalAlign = e, t.registerClass(e, "egret.VerticalAlign")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function() {
			function t() {}
			var e = t;
			e.prototype;
			return t.LITTLE_ENDIAN = "littleEndian", t.BIG_ENDIAN = "bigEndian", t
		}();
	t.Endian = e, t.registerClass(e, "egret.Endian");
	var i = function() {
			function i(t) {
				this.BUFFER_EXT_SIZE = 0, this.EOF_byte = -1, this.EOF_code_point = -1, this._setArrayBuffer(t || new ArrayBuffer(this.BUFFER_EXT_SIZE)), this.endian = e.BIG_ENDIAN
			}
			var n = __define,
				r = i,
				s = r.prototype;
			return s._setArrayBuffer = function(t) {
				this.write_position = t.byteLength, this.data = new DataView(t), this._position = 0
			}, s.setArrayBuffer = function(t) {}, n(s, "buffer", function() {
				return this.data.buffer
			}, function(t) {
				this.data = new DataView(t)
			}), n(s, "dataView", function() {
				return this.data
			}, function(t) {
				this.data = t, this.write_position = t.byteLength
			}), n(s, "bufferOffset", function() {
				return this.data.byteOffset
			}), n(s, "position", function() {
				return this._position
			}, function(t) {
				this._position = t, this.write_position = t > this.write_position ? t : this.write_position
			}), n(s, "length", function() {
				return this.write_position
			}, function(t) {
				this.write_position = t;
				var e = new Uint8Array(new ArrayBuffer(t)),
					i = this.data.buffer.byteLength;
				i > t && (this._position = t);
				var n = Math.min(i, t);
				e.set(new Uint8Array(this.data.buffer, 0, n)), this.buffer = e.buffer
			}), n(s, "bytesAvailable", function() {
				return this.data.byteLength - this._position
			}), s.clear = function() {
				this._setArrayBuffer(new ArrayBuffer(this.BUFFER_EXT_SIZE))
			}, s.readBoolean = function() {
				return this.validate(i.SIZE_OF_BOOLEAN) ? 0 != this.data.getUint8(this.position++) : null
			}, s.readByte = function() {
				return this.validate(i.SIZE_OF_INT8) ? this.data.getInt8(this.position++) : null
			}, s.readBytes = function(t, e, n) {
				if (void 0 === e && (e = 0), void 0 === n && (n = 0), 0 == n) n = this.bytesAvailable;
				else if (!this.validate(n)) return null;
				t ? t.validateBuffer(e + n) : t = new i(new ArrayBuffer(e + n));
				for (var r = 0; n > r; r++) t.data.setUint8(r + e, this.data.getUint8(this.position++))
			}, s.readDouble = function() {
				if (!this.validate(i.SIZE_OF_FLOAT64)) return null;
				var t = this.data.getFloat64(this.position, this.endian == e.LITTLE_ENDIAN);
				return this.position += i.SIZE_OF_FLOAT64, t
			}, s.readFloat = function() {
				if (!this.validate(i.SIZE_OF_FLOAT32)) return null;
				var t = this.data.getFloat32(this.position, this.endian == e.LITTLE_ENDIAN);
				return this.position += i.SIZE_OF_FLOAT32, t
			}, s.readInt = function() {
				if (!this.validate(i.SIZE_OF_INT32)) return null;
				var t = this.data.getInt32(this.position, this.endian == e.LITTLE_ENDIAN);
				return this.position += i.SIZE_OF_INT32, t
			}, s.readShort = function() {
				if (!this.validate(i.SIZE_OF_INT16)) return null;
				var t = this.data.getInt16(this.position, this.endian == e.LITTLE_ENDIAN);
				return this.position += i.SIZE_OF_INT16, t
			}, s.readUnsignedByte = function() {
				return this.validate(i.SIZE_OF_UINT8) ? this.data.getUint8(this.position++) : null
			}, s.readUnsignedInt = function() {
				if (!this.validate(i.SIZE_OF_UINT32)) return null;
				var t = this.data.getUint32(this.position, this.endian == e.LITTLE_ENDIAN);
				return this.position += i.SIZE_OF_UINT32, t
			}, s.readUnsignedShort = function() {
				if (!this.validate(i.SIZE_OF_UINT16)) return null;
				var t = this.data.getUint16(this.position, this.endian == e.LITTLE_ENDIAN);
				return this.position += i.SIZE_OF_UINT16, t
			}, s.readUTF = function() {
				if (!this.validate(i.SIZE_OF_UINT16)) return null;
				var t = this.data.getUint16(this.position, this.endian == e.LITTLE_ENDIAN);
				return this.position += i.SIZE_OF_UINT16, t > 0 ? this.readUTFBytes(t) : ""
			}, s.readUTFBytes = function(t) {
				if (!this.validate(t)) return null;
				var e = new Uint8Array(this.buffer, this.bufferOffset + this.position, t);
				return this.position += t, this.decodeUTF8(e)
			}, s.writeBoolean = function(t) {
				this.validateBuffer(i.SIZE_OF_BOOLEAN), this.data.setUint8(this.position++, t ? 1 : 0)
			}, s.writeByte = function(t) {
				this.validateBuffer(i.SIZE_OF_INT8), this.data.setInt8(this.position++, t)
			}, s.writeBytes = function(t, e, i) {
				void 0 === e && (e = 0), void 0 === i && (i = 0);
				var n;
				if (!(0 > e) && !(0 > i) && (n = 0 == i ? t.length - e : Math.min(t.length - e, i), n > 0)) {
					this.validateBuffer(n);
					for (var r = new DataView(t.buffer), s = n, a = 4; s > a; s -= a) this.data.setUint32(this._position, r.getUint32(e)), this.position += a, e += a;
					for (; s > 0; s--) this.data.setUint8(this.position++, r.getUint8(e++))
				}
			}, s.writeDouble = function(t) {
				this.validateBuffer(i.SIZE_OF_FLOAT64), this.data.setFloat64(this.position, t, this.endian == e.LITTLE_ENDIAN), this.position += i.SIZE_OF_FLOAT64
			}, s.writeFloat = function(t) {
				this.validateBuffer(i.SIZE_OF_FLOAT32), this.data.setFloat32(this.position, t, this.endian == e.LITTLE_ENDIAN), this.position += i.SIZE_OF_FLOAT32
			}, s.writeInt = function(t) {
				this.validateBuffer(i.SIZE_OF_INT32), this.data.setInt32(this.position, t, this.endian == e.LITTLE_ENDIAN), this.position += i.SIZE_OF_INT32
			}, s.writeShort = function(t) {
				this.validateBuffer(i.SIZE_OF_INT16), this.data.setInt16(this.position, t, this.endian == e.LITTLE_ENDIAN), this.position += i.SIZE_OF_INT16
			}, s.writeUnsignedInt = function(t) {
				this.validateBuffer(i.SIZE_OF_UINT32), this.data.setUint32(this.position, t, this.endian == e.LITTLE_ENDIAN), this.position += i.SIZE_OF_UINT32
			}, s.writeUnsignedShort = function(t) {
				this.validateBuffer(i.SIZE_OF_UINT16), this.data.setUint16(this.position, t, this.endian == e.LITTLE_ENDIAN), this.position += i.SIZE_OF_UINT16
			}, s.writeUTF = function(t) {
				var n = this.encodeUTF8(t),
					r = n.length;
				this.validateBuffer(i.SIZE_OF_UINT16 + r), this.data.setUint16(this.position, r, this.endian == e.LITTLE_ENDIAN), this.position += i.SIZE_OF_UINT16, this._writeUint8Array(n, !1)
			}, s.writeUTFBytes = function(t) {
				this._writeUint8Array(this.encodeUTF8(t))
			}, s.toString = function() {
				return "[ByteArray] length:" + this.length + ", bytesAvailable:" + this.bytesAvailable
			}, s._writeUint8Array = function(t, e) {
				void 0 === e && (e = !0), e && this.validateBuffer(this.position + t.length);
				for (var i = 0; i < t.length; i++) this.data.setUint8(this.position++, t[i])
			}, s.validate = function(e) {
				return this.data.byteLength > 0 && this._position + e <= this.data.byteLength ? !0 : void t.$error(1025)
			}, s.validateBuffer = function(t, e) {
				if (void 0 === e && (e = !1), this.write_position = t > this.write_position ? t : this.write_position, t += this._position, this.data.byteLength < t || e) {
					var i = new Uint8Array(new ArrayBuffer(t + this.BUFFER_EXT_SIZE)),
						n = Math.min(this.data.buffer.byteLength, t + this.BUFFER_EXT_SIZE);
					i.set(new Uint8Array(this.data.buffer, 0, n)), this.buffer = i.buffer
				}
			}, s.encodeUTF8 = function(t) {
				for (var e = 0, i = this.stringToCodePoints(t), n = []; i.length > e;) {
					var r = i[e++];
					if (this.inRange(r, 55296, 57343)) this.encoderError(r);
					else if (this.inRange(r, 0, 127)) n.push(r);
					else {
						var s = void 0,
							a = void 0;
						for (this.inRange(r, 128, 2047) ? (s = 1, a = 192) : this.inRange(r, 2048, 65535) ? (s = 2, a = 224) : this.inRange(r, 65536, 1114111) && (s = 3, a = 240), n.push(this.div(r, Math.pow(64, s)) + a); s > 0;) {
							var o = this.div(r, Math.pow(64, s - 1));
							n.push(128 + o % 64), s -= 1
						}
					}
				}
				return new Uint8Array(n)
			}, s.decodeUTF8 = function(t) {
				for (var e, i = !1, n = 0, r = "", s = 0, a = 0, o = 0, h = 0; t.length > n;) {
					var l = t[n++];
					if (l == this.EOF_byte) e = 0 != a ? this.decoderError(i) : this.EOF_code_point;
					else if (0 == a) this.inRange(l, 0, 127) ? e = l : (this.inRange(l, 194, 223) ? (a = 1, h = 128, s = l - 192) : this.inRange(l, 224, 239) ? (a = 2, h = 2048, s = l - 224) : this.inRange(l, 240, 244) ? (a = 3, h = 65536, s = l - 240) : this.decoderError(i), s *= Math.pow(64, a), e = null);
					else if (this.inRange(l, 128, 191)) if (o += 1, s += (l - 128) * Math.pow(64, a - o), o !== a) e = null;
					else {
						var u = s,
							c = h;
						s = 0, a = 0, o = 0, h = 0, e = this.inRange(u, c, 1114111) && !this.inRange(u, 55296, 57343) ? u : this.decoderError(i, l)
					} else s = 0, a = 0, o = 0, h = 0, n--, e = this.decoderError(i, l);
					null !== e && e !== this.EOF_code_point && (65535 >= e ? e > 0 && (r += String.fromCharCode(e)) : (e -= 65536, r += String.fromCharCode(55296 + (e >> 10 & 1023)), r += String.fromCharCode(56320 + (1023 & e))))
				}
				return r
			}, s.encoderError = function(e) {
				t.$error(1026, e)
			}, s.decoderError = function(e, i) {
				return e && t.$error(1027), i || 65533
			}, s.inRange = function(t, e, i) {
				return t >= e && i >= t
			}, s.div = function(t, e) {
				return Math.floor(t / e)
			}, s.stringToCodePoints = function(t) {
				for (var e = [], i = 0, n = t.length; i < t.length;) {
					var r = t.charCodeAt(i);
					if (this.inRange(r, 55296, 57343)) if (this.inRange(r, 56320, 57343)) e.push(65533);
					else if (i == n - 1) e.push(65533);
					else {
						var s = t.charCodeAt(i + 1);
						if (this.inRange(s, 56320, 57343)) {
							var a = 1023 & r,
								o = 1023 & s;
							i += 1, e.push(65536 + (a << 10) + o)
						} else e.push(65533)
					} else e.push(r);
					i += 1
				}
				return e
			}, i.SIZE_OF_BOOLEAN = 1, i.SIZE_OF_INT8 = 1, i.SIZE_OF_INT16 = 2, i.SIZE_OF_INT32 = 4, i.SIZE_OF_UINT8 = 1, i.SIZE_OF_UINT16 = 2, i.SIZE_OF_UINT32 = 4, i.SIZE_OF_FLOAT32 = 4, i.SIZE_OF_FLOAT64 = 8, i
		}();
	t.ByteArray = i, t.registerClass(i, "egret.ByteArray")
}(egret || (egret = {}));
var egret;
!
function(t) {
	function e(e, i) {
		t.useFontMapping = !0, t.fontMapping[e] = i
	}
	t.fontMapping = {}, t.useFontMapping = !1, t.registerFontMapping = e
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function() {
			function t() {}
			var e = __define,
				i = t;
			i.prototype;
			return e(t, "logLevel", void 0, function(t) {}), t.ALL = "all", t.DEBUG = "debug", t.INFO = "info", t.WARN = "warn", t.ERROR = "error", t.OFF = "off", t
		}();
	t.Logger = e, t.registerClass(e, "egret.Logger")
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function() {
			function t() {}
			var e = t;
			e.prototype;
			return t.isNumber = function(t) {
				return "number" == typeof t && !isNaN(t)
			}, t.sin = function(e) {
				var i = Math.floor(e),
					n = i + 1,
					r = t.sinInt(i);
				if (i == e) return r;
				var s = t.sinInt(n);
				return (e - i) * s + (n - e) * r
			}, t.sinInt = function(t) {
				return t %= 360, 0 > t && (t += 360), egret_sin_map[t]
			}, t.cos = function(e) {
				var i = Math.floor(e),
					n = i + 1,
					r = t.cosInt(i);
				if (i == e) return r;
				var s = t.cosInt(n);
				return (e - i) * s + (n - e) * r
			}, t.cosInt = function(t) {
				return t %= 360, 0 > t && (t += 360), egret_cos_map[t]
			}, t
		}();
	t.NumberUtils = e, t.registerClass(e, "egret.NumberUtils")
}(egret || (egret = {}));
for (var egret_sin_map = {}, egret_cos_map = {}, DEG_TO_RAD = Math.PI / 180, NumberUtils_i = 0; 360 > NumberUtils_i; NumberUtils_i++) egret_sin_map[NumberUtils_i] = Math.sin(NumberUtils_i * DEG_TO_RAD), egret_cos_map[NumberUtils_i] = Math.cos(NumberUtils_i * DEG_TO_RAD);
egret_sin_map[90] = 1, egret_cos_map[90] = 0, egret_sin_map[180] = 0, egret_cos_map[180] = -1, egret_sin_map[270] = -1, egret_cos_map[270] = 0, Function.prototype.bind || (Function.prototype.bind = function(t) {
	"function" != typeof this && egret.$error(1029);
	var e = Array.prototype.slice.call(arguments, 1),
		i = this,
		n = function() {},
		r = function() {
			return i.apply(this instanceof n && t ? this : t, e.concat(Array.prototype.slice.call(arguments)))
		};
	return n.prototype = this.prototype, r.prototype = new n, r
});
var egret;
!
function(t) {
	var e = function(e) {
			function i(t, i) {
				void 0 === i && (i = 0), e.call(this), this._delay = 0, this._currentCount = 0, this._running = !1, this.updateInterval = 1e3, this.lastCount = 1e3, this.lastTimeStamp = 0, this.delay = t, this.repeatCount = 0 | +i
			}
			__extends(i, e);
			var n = __define,
				r = i,
				s = r.prototype;
			return n(s, "delay", function() {
				return this._delay
			}, function(t) {
				1 > t && (t = 1), this._delay != t && (this._delay = t, this.lastCount = this.updateInterval = Math.round(60 * t))
			}), n(s, "currentCount", function() {
				return this._currentCount
			}), n(s, "running", function() {
				return this._running
			}), s.reset = function() {
				this.stop(), this._currentCount = 0
			}, s.start = function() {
				this._running || (this.lastCount = this.updateInterval, this.lastTimeStamp = t.getTimer(), t.sys.$ticker.$startTick(this.$update, this), this._running = !0)
			}, s.stop = function() {
				this._running && (t.stopTick(this.$update, this), this._running = !1)
			}, s.$update = function(e) {
				var i = e - this.lastTimeStamp;
				if (i >= this._delay) this.lastCount = this.updateInterval;
				else {
					if (this.lastCount -= 1e3, this.lastCount > 0) return !1;
					this.lastCount += this.updateInterval
				}
				this.lastTimeStamp = e, this._currentCount++;
				var n = this.repeatCount > 0 && this._currentCount >= this.repeatCount;
				return t.TimerEvent.dispatchTimerEvent(this, t.TimerEvent.TIMER), n && (this.stop(), t.TimerEvent.dispatchTimerEvent(this, t.TimerEvent.TIMER_COMPLETE)), !1
			}, i
		}(t.EventDispatcher);
	t.Timer = e, t.registerClass(e, "egret.Timer")
}(egret || (egret = {}));
var egret;
!
function(t) {}(egret || (egret = {}));
var egret;
!
function(t) {
	function e(e, i) {
		for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
		t.$callLaterFunctionList.push(e), t.$callLaterThisList.push(i), t.$callLaterArgsList.push(n)
	}
	function i(e, i) {
		for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
		t.$callAsyncFunctionList.push(e), t.$callAsyncThisList.push(i), t.$callAsyncArgsList.push(n)
	}
	t.$callLaterFunctionList = [], t.$callLaterThisList = [], t.$callLaterArgsList = [], t.callLater = e, t.$callAsyncFunctionList = [], t.$callAsyncThisList = [], t.$callAsyncArgsList = [], t.$callAsync = i
}(egret || (egret = {}));
var egret;
!
function(t) {
	function e(t, e, i) {
		for (var n = [], r = 3; r < arguments.length; r++) n[r - 3] = arguments[r];
		var s, a = t.prototype;
		t.hasOwnProperty("__sets__") || Object.defineProperty(t, "__sets__", {
			value: {}
		}), s = t.__sets__;
		var o = s[i];
		if (o) return o.apply(e, n);
		var h = Object.getPrototypeOf(a);
		if (null != h) {
			for (; !h.hasOwnProperty(i);) if (h = Object.getPrototypeOf(h), null == h) return;
			o = Object.getOwnPropertyDescriptor(h, i).set, s[i] = o, o.apply(e, n)
		}
	}
	function i(t, e, i) {
		var n, r = t.prototype;
		t.hasOwnProperty("__gets__") || Object.defineProperty(t, "__gets__", {
			value: {}
		}), n = t.__gets__;
		var s = n[i];
		if (s) return s.call(e);
		var a = Object.getPrototypeOf(r);
		if (null != a) {
			for (; !a.hasOwnProperty(i);) if (a = Object.getPrototypeOf(a), null == a) return;
			return s = Object.getOwnPropertyDescriptor(a, i).get, n[i] = s, s.call(e)
		}
	}
	t.superSetter = e, t.superGetter = i
}(egret || (egret = {}));
var egret;
!
function(t) {
	function e(t) {
		if (!t) return null;
		var e = i[t];
		if (e) return e;
		var n = t.split("."),
			r = n.length;
		e = __global;
		for (var s = 0; r > s; s++) {
			var a = n[s];
			if (e = e[a], !e) return null
		}
		return i[t] = e, e
	}
	var i = {};
	t.getDefinitionByName = e
}(egret || (egret = {}));
var __global = this.__global || this,
	egret;
!
function(t) {}(egret || (egret = {}));
var egret;
!
function(t) {
	function e(t) {
		var e = typeof t;
		if (!t || "object" != e && !t.prototype) return e;
		var i = t.prototype ? t.prototype : Object.getPrototypeOf(t);
		if (i.hasOwnProperty("__class__")) return i.__class__;
		var n = i.constructor.toString().trim(),
			r = n.indexOf("("),
			s = n.substring(9, r);
		return Object.defineProperty(i, "__class__", {
			value: s,
			enumerable: !1,
			writable: !0
		}), s
	}
	t.getQualifiedClassName = e
}(egret || (egret = {}));
var egret;
!
function(t) {
	function e(e) {
		if (!e || "object" != typeof e && !e.prototype) return null;
		var i = e.prototype ? e.prototype : Object.getPrototypeOf(e),
			n = Object.getPrototypeOf(i);
		if (!n) return null;
		var r = t.getQualifiedClassName(n.constructor);
		return r ? r : null
	}
	t.getQualifiedSuperclassName = e
}(egret || (egret = {}));
var egret;
!
function(t) {
	function e() {
		return Date.now() - t.sys.$START_TIME
	}
	t.getTimer = e
}(egret || (egret = {}));
var egret;
!
function(t) {
	function e(e) {
		var i = t.getDefinitionByName(e);
		return i ? !0 : !1
	}
	t.hasDefinition = e
}(egret || (egret = {}));
var egret;
!
function(t) {
	function e(t, e) {
		if (!t || "object" != typeof t) return !1;
		var i = Object.getPrototypeOf(t),
			n = i ? i.__types__ : null;
		return n ? -1 !== n.indexOf(e) : !1
	}
	t.is = e
}(egret || (egret = {}));
var egret;
!
function(t) {
	function e(e, i) {
		t.sys.$ticker.$startTick(e, i)
	}
	t.startTick = e
}(egret || (egret = {}));
var egret;
!
function(t) {
	function e(e, i) {
		t.sys.$ticker.$stopTick(e, i)
	}
	t.stopTick = e
}(egret || (egret = {}));
var egret;
!
function(t) {
	function e(t) {
		0 > t && (t = 0), t > 16777215 && (t = 16777215);
		for (var e = t.toString(16).toUpperCase(); e.length > 6;) e = e.slice(1, e.length);
		for (; e.length < 6;) e = "0" + e;
		return "#" + e
	}
	t.toColorString = e
}(egret || (egret = {}));
var egret;
!
function(t) {
	var e = function() {
			function e() {}
			var i = e;
			i.prototype;
			return e.compileProgram = function(i, n, r) {
				var s = e.compileFragmentShader(i, r),
					a = e.compileVertexShader(i, n),
					o = i.createProgram();
				return i.attachShader(o, a), i.attachShader(o, s), i.linkProgram(o), i.getProgramParameter(o, i.LINK_STATUS) || t.$warn(1020), o
			}, e.compileFragmentShader = function(t, i) {
				return e._compileShader(t, i, t.FRAGMENT_SHADER)
			}, e.compileVertexShader = function(t, i) {
				return e._compileShader(t, i, t.VERTEX_SHADER)
			}, e._compileShader = function(t, e, i) {
				var n = t.createShader(i);
				return t.shaderSource(n, e), t.compileShader(n), t.getShaderParameter(n, t.COMPILE_STATUS) ? n : null
			}, e.checkCanUseWebGL = function() {
				if (void 0 == e.canUseWebGL) try {
					var t = document.createElement("canvas");
					e.canUseWebGL = !(!window.WebGLRenderingContext || !t.getContext("webgl") && !t.getContext("experimental-webgl"))
				} catch (i) {
					e.canUseWebGL = !1
				}
				return e.canUseWebGL
			}, e.deleteWebGLTexture = function(t) {
				if (t) {
					var e = t.glContext;
					e && e.deleteTexture(t)
				}
			}, e
		}();
	t.WebGLUtils = e, t.registerClass(e, "egret.WebGLUtils")
}(egret || (egret = {}));