var RES;
!
function(e) {
	var t = function() {
			function e(e, t, r) {
				this.groupName = "", this.data = null, this._loaded = !1, this.name = e, this.url = t, this.type = r
			}
			var t = __define,
				r = e,
				i = r.prototype;
			return t(i, "loaded", function() {
				return this.data ? this.data.loaded : this._loaded
			}, function(e) {
				this.data && (this.data.loaded = e), this._loaded = e
			}), i.toString = function() {
				return '[ResourceItem name="' + this.name + '" url="' + this.url + '" type="' + this.type + '"]'
			}, e.TYPE_XML = "xml", e.TYPE_IMAGE = "image", e.TYPE_BIN = "bin", e.TYPE_TEXT = "text", e.TYPE_JSON = "json", e.TYPE_SHEET = "sheet", e.TYPE_FONT = "font", e.TYPE_SOUND = "sound", e
		}();
	e.ResourceItem = t, egret.registerClass(t, "RES.ResourceItem")
}(RES || (RES = {}));
var RES;
!
function(e) {
	var t = function() {
			function t() {
				this.keyMap = {}, this.groupDic = {}, e.configInstance = this
			}
			var r = (__define, t),
				i = r.prototype;
			return i.getGroupByName = function(e) {
				var t = new Array;
				if (!this.groupDic[e]) return t;
				for (var r = this.groupDic[e], i = r.length, n = 0; i > n; n++) {
					var s = r[n];
					t.push(this.parseResourceItem(s))
				}
				return t
			}, i.getRawGroupByName = function(e) {
				return this.groupDic[e] ? this.groupDic[e] : []
			}, i.createGroup = function(e, t, r) {
				if (void 0 === r && (r = !1), !r && this.groupDic[e] || !t || 0 == t.length) return !1;
				for (var i = this.groupDic, n = [], s = t.length, a = 0; s > a; a++) {
					var o = t[a],
						u = i[o];
					if (u) for (var l = u.length, c = 0; l > c; c++) {
						var h = u[c]; - 1 == n.indexOf(h) && n.push(h)
					} else {
						var h = this.keyMap[o];
						h ? -1 == n.indexOf(h) && n.push(h) : egret.$warn(3200, o)
					}
				}
				return 0 == n.length ? !1 : (this.groupDic[e] = n, !0)
			}, i.parseConfig = function(e, t) {
				if (e) {
					var r = e.resources;
					if (r) for (var i = r.length, n = 0; i > n; n++) {
						var s = r[n],
							a = s.url;
						a && -1 == a.indexOf("://") && (s.url = t + a), this.addItemToKeyMap(s)
					}
					var o = e.groups;
					if (o) for (var u = o.length, n = 0; u > n; n++) {
						for (var l = o[n], c = [], h = l.keys.split(","), f = h.length, d = 0; f > d; d++) {
							var g = h[d].trim(),
								s = this.keyMap[g];
							s && -1 == c.indexOf(s) && c.push(s)
						}
						this.groupDic[l.name] = c
					}
				}
			}, i.addSubkey = function(e, t) {
				var r = this.keyMap[t];
				r && !this.keyMap[e] && (this.keyMap[e] = r)
			}, i.addItemToKeyMap = function(e) {
				if (this.keyMap[e.name] || (this.keyMap[e.name] = e), e.hasOwnProperty("subkeys")) {
					var t = e.subkeys.split(",");
					e.subkeys = t;
					for (var r = t.length, i = 0; r > i; i++) {
						var n = t[i];
						null == this.keyMap[n] && (this.keyMap[n] = e)
					}
				}
			}, i.getName = function(e) {
				var t = this.keyMap[e];
				return t ? t.name : ""
			}, i.getType = function(e) {
				var t = this.keyMap[e];
				return t ? t.type : ""
			}, i.getRawResourceItem = function(e) {
				return this.keyMap[e]
			}, i.getResourceItem = function(e) {
				var t = this.keyMap[e];
				return t ? this.parseResourceItem(t) : null
			}, i.parseResourceItem = function(t) {
				var r = new e.ResourceItem(t.name, t.url, t.type);
				return r.data = t, r
			}, t
		}();
	e.ResourceConfig = t, egret.registerClass(t, "RES.ResourceConfig")
}(RES || (RES = {}));
var RES;
!
function(e) {
	var t = function(t) {
			function r() {
				t.call(this), this.thread = 2, this.loadingCount = 0, this.callBack = null, this.resInstance = null, this.groupTotalDic = {}, this.numLoadedDic = {}, this.itemListDic = {}, this.groupErrorDic = {}, this.retryTimesDic = {}, this.maxRetryTimes = 3, this.failedList = new Array, this.priorityQueue = {}, this.lazyLoadList = new Array, this.analyzerDic = {}, this.queueIndex = 0
			}
			__extends(r, t);
			var i = (__define, r),
				n = i.prototype;
			return n.isGroupInLoading = function(e) {
				return void 0 !== this.itemListDic[e]
			}, n.loadGroup = function(t, r, i) {
				if (void 0 === i && (i = 0), !this.itemListDic[r] && r) {
					if (!t || 0 == t.length) {
						egret.$warn(3201, r);
						var n = new e.ResourceEvent(e.ResourceEvent.GROUP_LOAD_ERROR);
						return n.groupName = r, void this.dispatchEvent(n)
					}
					this.priorityQueue[i] ? this.priorityQueue[i].push(r) : this.priorityQueue[i] = [r], this.itemListDic[r] = t;
					for (var s = t.length, a = 0; s > a; a++) {
						var o = t[a];
						o.groupName = r
					}
					this.groupTotalDic[r] = t.length, this.numLoadedDic[r] = 0, this.next()
				}
			}, n.loadItem = function(e) {
				this.lazyLoadList.push(e), e.groupName = "", this.next()
			}, n.next = function() {
				for (; this.loadingCount < this.thread;) {
					var e = this.getOneResourceItem();
					if (!e) break;
					if (this.loadingCount++, e.loaded) this.onItemComplete(e);
					else {
						var t = this.resInstance.$getAnalyzerByType(e.type);
						t.loadFile(e, this.onItemComplete, this)
					}
				}
			}, n.getOneResourceItem = function() {
				if (this.failedList.length > 0) return this.failedList.shift();
				var e = Number.NEGATIVE_INFINITY;
				for (var t in this.priorityQueue) e = Math.max(e, t);
				var r = this.priorityQueue[e];
				if (!r || 0 == r.length) return 0 == this.lazyLoadList.length ? null : this.lazyLoadList.pop();
				for (var i, n = r.length, s = 0; n > s && (this.queueIndex >= n && (this.queueIndex = 0), i = this.itemListDic[r[this.queueIndex]], !(i.length > 0)); s++) this.queueIndex++;
				return 0 == i.length ? null : i.shift()
			}, n.onItemComplete = function(t) {
				this.loadingCount--;
				var r = t.groupName;
				if (!t.loaded) {
					var i = this.retryTimesDic[t.name] || 1;
					if (!(i > this.maxRetryTimes)) return this.retryTimesDic[t.name] = i + 1, this.failedList.push(t), void this.next();
					delete this.retryTimesDic[t.name], e.ResourceEvent.dispatchResourceEvent(this.resInstance, e.ResourceEvent.ITEM_LOAD_ERROR, r, t)
				}
				if (r) {
					this.numLoadedDic[r]++;
					var n = this.numLoadedDic[r],
						s = this.groupTotalDic[r];
					if (t.loaded || (this.groupErrorDic[r] = !0), e.ResourceEvent.dispatchResourceEvent(this.resInstance, e.ResourceEvent.GROUP_PROGRESS, r, t, n, s), n == s) {
						var a = this.groupErrorDic[r];
						this.removeGroupName(r), delete this.groupTotalDic[r], delete this.numLoadedDic[r], delete this.itemListDic[r], delete this.groupErrorDic[r], a ? e.ResourceEvent.dispatchResourceEvent(this, e.ResourceEvent.GROUP_LOAD_ERROR, r) : e.ResourceEvent.dispatchResourceEvent(this, e.ResourceEvent.GROUP_COMPLETE, r)
					}
				} else this.callBack.call(this.resInstance, t);
				this.next()
			}, n.removeGroupName = function(e) {
				for (var t in this.priorityQueue) {
					for (var r = this.priorityQueue[t], i = 0, n = !1, s = r.length, a = 0; s > a; a++) {
						var o = r[a];
						if (o == e) {
							r.splice(i, 1), n = !0;
							break
						}
						i++
					}
					if (n) {
						0 == r.length && delete this.priorityQueue[t];
						break
					}
				}
			}, r
		}(egret.EventDispatcher);
	e.ResourceLoader = t, egret.registerClass(t, "RES.ResourceLoader")
}(RES || (RES = {}));
var RES;
!
function(e) {
	var t = function(e) {
			function t(t, r, i) {
				void 0 === r && (r = !1), void 0 === i && (i = !1), e.call(this, t, r, i), this.itemsLoaded = 0, this.itemsTotal = 0, this.groupName = "", this.resItem = null
			}
			__extends(t, e);
			var r = (__define, t);
			r.prototype;
			return t.dispatchResourceEvent = function(e, r, i, n, s, a) {
				void 0 === i && (i = ""), void 0 === n && (n = null), void 0 === s && (s = 0), void 0 === a && (a = 0);
				var o = egret.Event.create(t, r);
				o.groupName = i, o.resItem = n, o.itemsLoaded = s, o.itemsTotal = a;
				var u = e.dispatchEvent(o);
				return egret.Event.release(o), u
			}, t.ITEM_LOAD_ERROR = "itemLoadError", t.CONFIG_COMPLETE = "configComplete", t.CONFIG_LOAD_ERROR = "configLoadError", t.GROUP_PROGRESS = "groupProgress", t.GROUP_COMPLETE = "groupComplete", t.GROUP_LOAD_ERROR = "groupLoadError", t
		}(egret.Event);
	e.ResourceEvent = t, egret.registerClass(t, "RES.ResourceEvent")
}(RES || (RES = {}));
var RES;
!
function(e) {
	var t = function(t) {
			function r() {
				t.call(this), this.resourceConfig = null, this.resourceConfig = e.configInstance
			}
			__extends(r, t);
			var i = (__define, r),
				n = i.prototype;
			return n.addSubkey = function(e, t) {
				this.resourceConfig.addSubkey(e, t)
			}, n.loadFile = function(e, t, r) {}, n.getRes = function(e) {}, n.destroyRes = function(e) {
				return !1
			}, r.getStringPrefix = function(e) {
				if (!e) return "";
				var t = e.indexOf(".");
				return -1 != t ? e.substring(0, t) : ""
			}, r.getStringTail = function(e) {
				if (!e) return "";
				var t = e.indexOf(".");
				return -1 != t ? e.substring(t + 1) : ""
			}, r
		}(egret.HashObject);
	e.AnalyzerBase = t, egret.registerClass(t, "RES.AnalyzerBase")
}(RES || (RES = {}));
var RES;
!
function(e) {
	var t = function(t) {
			function r() {
				t.call(this), this.fileDic = {}, this.resItemDic = [], this._dataFormat = egret.HttpResponseType.ARRAY_BUFFER, this.recycler = []
			}
			__extends(r, t);
			var i = (__define, r),
				n = i.prototype;
			return n.loadFile = function(t, r, i) {
				if (this.fileDic[t.name]) return void r.call(i, t);
				var n = this.getRequest();
				this.resItemDic[n.hashCode] = {
					item: t,
					func: r,
					thisObject: i
				}, n.open(e.$getVirtualUrl(t.url)), n.send()
			}, n.getRequest = function() {
				var e = this.recycler.pop();
				return e || (e = new egret.HttpRequest, e.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this), e.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this)), e.responseType = this._dataFormat, e
			}, n.onLoadFinish = function(e) {
				var t = e.target,
					r = this.resItemDic[t.hashCode];
				delete this.resItemDic[t.hashCode];
				var i = r.item,
					n = r.func;
				i.loaded = e.type == egret.Event.COMPLETE, i.loaded && this.analyzeData(i, t.response), this.recycler.push(t), n.call(r.thisObject, i)
			}, n.analyzeData = function(e, t) {
				var r = e.name;
				this.fileDic[r] || "" != t && !t || (this.fileDic[r] = t)
			}, n.getRes = function(e) {
				return this.fileDic[e]
			}, n.hasRes = function(e) {
				var t = this.getRes(e);
				return null != t
			}, n.destroyRes = function(e) {
				return this.fileDic[e] ? (this.onResourceDestroy(this.fileDic[e]), delete this.fileDic[e], !0) : !1
			}, n.onResourceDestroy = function(e) {}, r
		}(e.AnalyzerBase);
	e.BinAnalyzer = t, egret.registerClass(t, "RES.BinAnalyzer")
}(RES || (RES = {}));
var RES;
!
function(e) {
	var t = function(t) {
			function r() {
				t.call(this), this.fileDic = {}, this.resItemDic = [], this.recycler = []
			}
			__extends(r, t);
			var i = (__define, r),
				n = i.prototype;
			return n.loadFile = function(t, r, i) {
				if (this.fileDic[t.name]) return void r.call(i, t);
				var n = this.getLoader();
				this.resItemDic[n.$hashCode] = {
					item: t,
					func: r,
					thisObject: i
				}, n.load(e.$getVirtualUrl(t.url))
			}, n.getLoader = function() {
				var e = this.recycler.pop();
				return e || (e = new egret.ImageLoader, e.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this), e.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this)), e
			}, n.onLoadFinish = function(e) {
				var t = e.$target,
					r = this.resItemDic[t.$hashCode];
				delete this.resItemDic[t.$hashCode];
				var i = r.item,
					n = r.func;
				if (i.loaded = e.$type == egret.Event.COMPLETE, i.loaded) {
					var s = new egret.Texture;
					s._setBitmapData(t.data), this.analyzeData(i, s)
				}
				this.recycler.push(t), n.call(r.thisObject, i)
			}, n.analyzeData = function(e, t) {
				var r = e.name;
				if (!this.fileDic[r] && t) {
					this.fileDic[r] = t;
					var i = e.data;
					if (i && i.scale9grid) {
						var n = i.scale9grid,
							s = n.split(",");
						t.scale9Grid = new egret.Rectangle(parseInt(s[0]), parseInt(s[1]), parseInt(s[2]), parseInt(s[3]))
					}
				}
			}, n.getRes = function(e) {
				return this.fileDic[e]
			}, n.hasRes = function(e) {
				var t = this.getRes(e);
				return null != t
			}, n.destroyRes = function(e) {
				return this.fileDic[e] ? (this.onResourceDestroy(this.fileDic[e]), delete this.fileDic[e], !0) : !1
			}, n.onResourceDestroy = function(e) {
				e.dispose()
			}, r
		}(e.AnalyzerBase);
	e.ImageAnalyzer = t, egret.registerClass(t, "RES.ImageAnalyzer")
}(RES || (RES = {}));
var RES;
!
function(e) {
	var t = function(e) {
			function t() {
				e.call(this), this._dataFormat = egret.HttpResponseType.TEXT
			}
			__extends(t, e);
			var r = (__define, t);
			r.prototype;
			return t
		}(e.BinAnalyzer);
	e.TextAnalyzer = t, egret.registerClass(t, "RES.TextAnalyzer")
}(RES || (RES = {}));
var RES;
!
function(e) {
	var t = function(e) {
			function t() {
				e.call(this), this._dataFormat = egret.HttpResponseType.TEXT
			}
			__extends(t, e);
			var r = (__define, t),
				i = r.prototype;
			return i.analyzeData = function(e, t) {
				var r = e.name;
				if (!this.fileDic[r] && t) try {
					var i = t;
					this.fileDic[r] = JSON.parse(i)
				} catch (n) {
					egret.$warn(1017, e.url, t)
				}
			}, t
		}(e.BinAnalyzer);
	e.JsonAnalyzer = t, egret.registerClass(t, "RES.JsonAnalyzer")
}(RES || (RES = {}));
var RES;
!
function(e) {
	var t = function(t) {
			function r() {
				t.call(this), this.sheetMap = {}, this.textureMap = {}, this.recyclerIamge = [], this._dataFormat = egret.HttpResponseType.TEXT
			}
			__extends(r, t);
			var i = (__define, r),
				n = i.prototype;
			return n.getRes = function(t) {
				var r = this.fileDic[t];
				if (r || (r = this.textureMap[t]), !r) {
					var i = e.AnalyzerBase.getStringPrefix(t);
					if (r = this.fileDic[i]) {
						var n = e.AnalyzerBase.getStringTail(t);
						r = r.getTexture(n)
					}
				}
				return r
			}, n.onLoadFinish = function(e) {
				var t = e.target,
					r = this.resItemDic[t.$hashCode];
				delete this.resItemDic[t.hashCode];
				var i = r.item,
					n = r.func;
				if (i.loaded = e.type == egret.Event.COMPLETE, i.loaded) if (t instanceof egret.HttpRequest) {
					i.loaded = !1;
					var s = this.analyzeConfig(i, t.response);
					if (s) return this.loadImage(s, r), void this.recycler.push(t)
				} else {
					var a = new egret.Texture;
					a._setBitmapData(t.data), this.analyzeBitmap(i, a)
				}
				t instanceof egret.HttpRequest ? this.recycler.push(t) : this.recyclerIamge.push(t), n.call(r.thisObject, i)
			}, n.analyzeConfig = function(e, t) {
				var r, i = e.name,
					n = "";
				try {
					var s = t;
					r = JSON.parse(s)
				} catch (a) {
					egret.$warn(1017, e.url, t)
				}
				return r && (this.sheetMap[i] = r, n = this.getRelativePath(e.url, r.file)), n
			}, n.analyzeBitmap = function(e, t) {
				var r = e.name;
				if (!this.fileDic[r] && t) {
					var i = this.sheetMap[r];
					delete this.sheetMap[r];
					var n = e.data && e.data.subkeys ? "" : r,
						s = this.parseSpriteSheet(t, i, n);
					this.fileDic[r] = s
				}
			}, n.getRelativePath = function(e, t) {
				e = e.split("\\").join("/");
				var r = e.match(/#.*|\?.*/),
					i = "";
				r && (i = r[0]);
				var n = e.lastIndexOf("/");
				return e = -1 != n ? e.substring(0, n + 1) + t : t, e + i
			}, n.parseSpriteSheet = function(e, t, r) {
				var i = t.frames;
				if (!i) return null;
				var n = new egret.SpriteSheet(e),
					s = this.textureMap;
				for (var a in i) {
					var o = i[a],
						u = n.createTexture(a, o.x, o.y, o.w, o.h, o.offX, o.offY, o.sourceW, o.sourceH);
					if (o.scale9grid) {
						var l = o.scale9grid,
							c = l.split(",");
						u.scale9Grid = new egret.Rectangle(parseInt(c[0]), parseInt(c[1]), parseInt(c[2]), parseInt(c[3]))
					}
					null == s[a] && (s[a] = u, r && this.addSubkey(a, r))
				}
				return n
			}, n.destroyRes = function(e) {
				var t = this.fileDic[e];
				if (t) {
					delete this.fileDic[e];
					var r = void 0;
					for (var i in t._textureMap) null == r && (r = t._textureMap[i], this.onResourceDestroy(r), r = null), delete this.textureMap[i];
					return t.dispose && t.dispose(), !0
				}
				return !1
			}, n.loadImage = function(t, r) {
				var i = this.getImageLoader();
				this.resItemDic[i.hashCode] = r, i.load(e.$getVirtualUrl(t))
			}, n.getImageLoader = function() {
				var e = this.recyclerIamge.pop();
				return e || (e = new egret.ImageLoader, e.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this), e.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this)), e
			}, n.onResourceDestroy = function(e) {
				e && e.dispose()
			}, r
		}(e.BinAnalyzer);
	e.SheetAnalyzer = t, egret.registerClass(t, "RES.SheetAnalyzer")
}(RES || (RES = {}));
var RES;
!
function(e) {
	var t = function(e) {
			function t() {
				e.call(this)
			}
			__extends(t, e);
			var r = (__define, t),
				i = r.prototype;
			return i.analyzeConfig = function(e, t) {
				var r, i = e.name,
					n = "";
				try {
					var s = t;
					r = JSON.parse(s)
				} catch (a) {}
				return r ? n = this.getRelativePath(e.url, r.file) : (r = t, n = this.getTexturePath(e.url, r)), this.sheetMap[i] = r, n
			}, i.analyzeBitmap = function(e, t) {
				var r = e.name;
				if (!this.fileDic[r] && t) {
					var i = this.sheetMap[r];
					delete this.sheetMap[r];
					var n = new egret.BitmapFont(t, i);
					this.fileDic[r] = n
				}
			}, i.getTexturePath = function(e, t) {
				var r = "",
					i = t.split("\n"),
					n = i[2],
					s = n.indexOf('file="');
				return -1 != s && (n = n.substring(s + 6), s = n.indexOf('"'), r = n.substring(0, s)), e = e.split("\\").join("/"), s = e.lastIndexOf("/"), e = -1 != s ? e.substring(0, s + 1) + r : r
			}, i.onResourceDestroy = function(e) {
				e && e.dispose()
			}, t
		}(e.SheetAnalyzer);
	e.FontAnalyzer = t, egret.registerClass(t, "RES.FontAnalyzer")
}(RES || (RES = {}));
var RES;
!
function(e) {
	var t = function(t) {
			function r() {
				t.call(this), this.soundDic = {}, this.resItemDic = []
			}
			__extends(r, t);
			var i = (__define, r),
				n = i.prototype;
			return n.loadFile = function(t, r, i) {
				if (this.soundDic[t.name]) return void r.call(i, t);
				var n = new egret.Sound;
				n.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this), n.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this), this.resItemDic[n.$hashCode] = {
					item: t,
					func: r,
					thisObject: i
				}, n.load(e.$getVirtualUrl(t.url)), t.data && (n.type = t.data.soundType)
			}, n.onLoadFinish = function(e) {
				var t = e.$target;
				t.removeEventListener(egret.Event.COMPLETE, this.onLoadFinish, this), t.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this);
				var r = this.resItemDic[t.$hashCode];
				delete this.resItemDic[t.$hashCode];
				var i = r.item,
					n = r.func;
				i.loaded = e.$type == egret.Event.COMPLETE, i.loaded && this.analyzeData(i, t), n.call(r.thisObject, i)
			}, n.analyzeData = function(e, t) {
				var r = e.name;
				!this.soundDic[r] && t && (this.soundDic[r] = t)
			}, n.getRes = function(e) {
				return this.soundDic[e]
			}, n.hasRes = function(e) {
				return !!this.getRes(e)
			}, n.destroyRes = function(e) {
				return this.soundDic[e] ? (delete this.soundDic[e], !0) : !1
			}, r
		}(e.AnalyzerBase);
	e.SoundAnalyzer = t, egret.registerClass(t, "RES.SoundAnalyzer")
}(RES || (RES = {}));
var RES;
!
function(e) {
	var t = function(e) {
			function t() {
				e.call(this), this._dataFormat = egret.HttpResponseType.TEXT
			}
			__extends(t, e);
			var r = (__define, t),
				i = r.prototype;
			return i.analyzeData = function(e, t) {
				var r = e.name;
				if (!this.fileDic[r] && t) try {
					var i = t,
						n = egret.XML.parse(i);
					this.fileDic[r] = n
				} catch (s) {}
			}, t
		}(e.BinAnalyzer);
	e.XMLAnalyzer = t, egret.registerClass(t, "RES.XMLAnalyzer")
}(RES || (RES = {}));
var RES;
!
function(e) {}(RES || (RES = {}));
var RES;
!
function(e) {
	var t;
	!
	function(t) {
		var r = function(e) {
				function t() {
					e.call(this), this._versionInfo = {}
				}
				__extends(t, e);
				var r = (__define, t),
					i = r.prototype;
				return i.fetchVersion = function(e) {
					e.onSuccess(null)
				}, i.getChangeList = function() {
					return []
				}, i.getVirtualUrl = function(e) {
					return e
				}, t
			}(egret.EventDispatcher);
		t.Html5VersionController = r, egret.registerClass(r, "RES.web.Html5VersionController", ["RES.VersionController", "RES.IVersionController"]), egret.Capabilities.runtimeType == egret.RuntimeType.WEB && (e.VersionController = r)
	}(t = e.web || (e.web = {}))
}(RES || (RES = {}));
var RES;
!
function(e) {
	var t;
	!
	function(t) {
		var r = function() {
				function e() {
					this._versionInfo = {}, this._versionPath = "", this._localFileArr = []
				}
				var t = (__define, e),
					r = t.prototype;
				return r.fetchVersion = function(e) {
					var t = this;
					if (t._versionPath = "all.manifest", t._versionInfo = t.getLocalData(t._versionPath), null == t._versionInfo) return void egret.callLater(function() {
						e.onFail(1, null)
					}, t);
					var r = 0,
						i = function(i) {
							if (i) for (var n = 0; n < i.length; n++) i[n] && "" != i[n] && t._localFileArr.push("resource/" + i[n]);
							r++, 2 == r && e.onSuccess(null)
						};
					t.getList(i, "assets", "resource"), t.getList(i, "update", "resource")
				}, r.getList = function(e, t, r) {
					void 0 === r && (r = "");
					var i = egret.PromiseObject.create();
					i.onSuccessFunc = function(t) {
						e(t)
					}, i.onErrorFunc = function() {
						console.error("list files error")
					}, "assets" == t ? egret_native.Game.listResource(r, i) : egret_native.Game.listUpdate(r, i)
				}, r.getChangeList = function() {
					var e = [],
						t = this._localFileArr;
					for (var r in this._versionInfo) t.indexOf(this.getVirtualUrl(r)) < 0 && e.push({
						url: this.getVirtualUrl(r),
						size: this._versionInfo[r].s
					});
					return e
				}, r.getVirtualUrl = function(e) {
					return this._versionInfo && this._versionInfo[e] ? "resource/" + this._versionInfo[e].v.substring(0, 2) + "/" + this._versionInfo[e].v + "_" + this._versionInfo[e].s + "." + e.substring(e.lastIndexOf(".") + 1) : e
				}, r.getLocalData = function(e) {
					if (egret_native.readUpdateFileSync && egret_native.readResourceFileSync) {
						var t = egret_native.readUpdateFileSync(e);
						if (null != t) return JSON.parse(t);
						if (t = egret_native.readResourceFileSync(e), null != t) return JSON.parse(t)
					}
					return null
				}, e
			}();
		t.NativeVersionController = r, egret.registerClass(r, "RES.native.NativeVersionController", ["RES.VersionController", "RES.IVersionController"]), egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE && (e.VersionController = r)
	}(t = e["native"] || (e["native"] = {}))
}(RES || (RES = {}));
var RES;
!
function(e) {
	function t(e, t) {
		_.registerAnalyzer(e, t)
	}
	function r(e) {
		_.$registerVersionController(e)
	}
	function i() {
		return _.vcs
	}
	function n(e, t, r) {
		void 0 === t && (t = ""), void 0 === r && (r = "json"), _.loadConfig(e, t, r)
	}
	function s(e, t) {
		void 0 === t && (t = 0), _.loadGroup(e, t)
	}
	function a(e) {
		return _.isGroupLoaded(e)
	}
	function o(e) {
		return _.getGroupByName(e)
	}
	function u(e, t, r) {
		return void 0 === r && (r = !1), _.createGroup(e, t, r)
	}
	function l(e) {
		return _.hasRes(e)
	}
	function c(e, t) {
		void 0 === t && (t = ""), _.parseConfig(e, t)
	}
	function h(e) {
		return _.getRes(e)
	}
	function f(e, t, r) {
		_.getResAsync(e, t, r)
	}
	function d(e, t, r, i) {
		void 0 === i && (i = ""), _.getResByUrl(e, t, r, i)
	}
	function g(e, t) {
		return _.destroyRes(e, t)
	}
	function p(e) {
		_.setMaxLoadingThread(e)
	}
	function v(e) {
		_.setMaxRetryTimes(e)
	}
	function y(e, t, r, i, n) {
		void 0 === i && (i = !1), void 0 === n && (n = 0), _.addEventListener(e, t, r, i, n)
	}
	function R(e, t, r, i) {
		void 0 === i && (i = !1), _.removeEventListener(e, t, r, i)
	}
	function E(e) {
		return _.vcs ? _.vcs.getVirtualUrl(e) : e
	}
	e.registerAnalyzer = t, e.registerVersionController = r, e.getVersionController = i, e.loadConfig = n, e.loadGroup = s, e.isGroupLoaded = a, e.getGroupByName = o, e.createGroup = u, e.hasRes = l, e.parseConfig = c, e.getRes = h, e.getResAsync = f, e.getResByUrl = d, e.destroyRes = g, e.setMaxLoadingThread = p, e.setMaxRetryTimes = v, e.addEventListener = y, e.removeEventListener = R, e.$getVirtualUrl = E;
	var m = function(t) {
			function r() {
				t.call(this), this.analyzerDic = {}, this.analyzerClassMap = {}, this.configItemList = [], this.callLaterFlag = !1, this.configComplete = !1, this.loadedGroups = [], this.groupNameList = [], this.asyncDic = {}, this._loadedUrlTypes = {}, this.init()
			}
			__extends(r, t);
			var i = (__define, r),
				n = i.prototype;
			return n.$getAnalyzerByType = function(e) {
				var t = this.analyzerDic[e];
				if (!t) {
					var r = this.analyzerClassMap[e];
					if (!r) return null;
					t = this.analyzerDic[e] = new r
				}
				return t
			}, n.registerAnalyzer = function(e, t) {
				this.analyzerClassMap[e] = t
			}, n.$registerVersionController = function(e) {
				this.vcs = e
			}, n.init = function() {
				this.vcs = new e.VersionController;
				var t = this.analyzerClassMap;
				t[e.ResourceItem.TYPE_BIN] = e.BinAnalyzer, t[e.ResourceItem.TYPE_IMAGE] = e.ImageAnalyzer, t[e.ResourceItem.TYPE_TEXT] = e.TextAnalyzer, t[e.ResourceItem.TYPE_JSON] = e.JsonAnalyzer, t[e.ResourceItem.TYPE_SHEET] = e.SheetAnalyzer, t[e.ResourceItem.TYPE_FONT] = e.FontAnalyzer, t[e.ResourceItem.TYPE_SOUND] = e.SoundAnalyzer, t[e.ResourceItem.TYPE_XML] = e.XMLAnalyzer, this.resConfig = new e.ResourceConfig, this.resLoader = new e.ResourceLoader, this.resLoader.callBack = this.onResourceItemComp, this.resLoader.resInstance = this, this.resLoader.addEventListener(e.ResourceEvent.GROUP_COMPLETE, this.onGroupComp, this), this.resLoader.addEventListener(e.ResourceEvent.GROUP_LOAD_ERROR, this.onGroupError, this)
			}, n.loadConfig = function(e, t, r) {
				void 0 === r && (r = "json");
				var i = {
					url: e,
					resourceRoot: t,
					type: r
				};
				this.configItemList.push(i), this.callLaterFlag || (egret.callLater(this.startLoadConfig, this), this.callLaterFlag = !0)
			}, n.startLoadConfig = function() {
				var t = this;
				this.callLaterFlag = !1;
				var i = this.configItemList;
				this.configItemList = [], this.loadingConfigList = i;
				for (var n = i.length, s = [], a = 0; n > a; a++) {
					var o = i[a],
						u = new e.ResourceItem(o.url, o.url, o.type);
					s.push(u)
				}
				var l = {
					onSuccess: function(e) {
						t.resLoader.loadGroup(s, r.GROUP_CONFIG, Number.MAX_VALUE)
					},
					onFail: function(r, i) {
						e.ResourceEvent.dispatchResourceEvent(t, e.ResourceEvent.CONFIG_LOAD_ERROR)
					}
				};
				this.vcs ? this.vcs.fetchVersion(l) : this.resLoader.loadGroup(s, r.GROUP_CONFIG, Number.MAX_VALUE)
			}, n.isGroupLoaded = function(e) {
				return -1 != this.loadedGroups.indexOf(e)
			}, n.getGroupByName = function(e) {
				return this.resConfig.getGroupByName(e)
			}, n.loadGroup = function(t, r) {
				if (void 0 === r && (r = 0), -1 != this.loadedGroups.indexOf(t)) return void e.ResourceEvent.dispatchResourceEvent(this, e.ResourceEvent.GROUP_COMPLETE, t);
				if (!this.resLoader.isGroupInLoading(t)) if (this.configComplete) {
					var i = this.resConfig.getGroupByName(t);
					this.resLoader.loadGroup(i, t, r)
				} else this.groupNameList.push({
					name: t,
					priority: r
				})
			}, n.createGroup = function(e, t, r) {
				if (void 0 === r && (r = !1), r) {
					var i = this.loadedGroups.indexOf(e); - 1 != i && this.loadedGroups.splice(i, 1)
				}
				return this.resConfig.createGroup(e, t, r)
			}, n.onGroupComp = function(t) {
				if (t.groupName == r.GROUP_CONFIG) {
					for (var i = this.loadingConfigList.length, n = 0; i > n; n++) {
						var s = this.loadingConfigList[n],
							a = this.$getAnalyzerByType(s.type),
							o = a.getRes(s.url);
						a.destroyRes(s.url), this.resConfig.parseConfig(o, s.resourceRoot)
					}
					this.configComplete = !0, this.loadingConfigList = null, e.ResourceEvent.dispatchResourceEvent(this, e.ResourceEvent.CONFIG_COMPLETE), this.loadDelayGroups()
				} else this.loadedGroups.push(t.groupName), this.dispatchEvent(t)
			}, n.loadDelayGroups = function() {
				var e = this.groupNameList;
				this.groupNameList = [];
				for (var t = e.length, r = 0; t > r; r++) {
					var i = e[r];
					this.loadGroup(i.name, i.priority)
				}
			}, n.onGroupError = function(t) {
				t.groupName == r.GROUP_CONFIG ? (this.loadingConfigList = null, e.ResourceEvent.dispatchResourceEvent(this, e.ResourceEvent.CONFIG_LOAD_ERROR)) : this.dispatchEvent(t)
			}, n.hasRes = function(t) {
				var r = this.resConfig.getType(t);
				if ("" == r) {
					var i = e.AnalyzerBase.getStringTail(t);
					if (r = this.resConfig.getType(i), "" == r) return !1
				}
				return !0
			}, n.parseConfig = function(e, t) {
				this.resConfig.parseConfig(e, t), this.configComplete || this.loadingConfigList || (this.configComplete = !0, this.loadDelayGroups())
			}, n.getRes = function(t) {
				var r = this.resConfig.getType(t);
				if ("" == r) {
					var i = e.AnalyzerBase.getStringPrefix(t);
					if (r = this.resConfig.getType(i), "" == r) return null
				}
				var n = this.$getAnalyzerByType(r);
				return n.getRes(t)
			}, n.getResAsync = function(t, r, i) {
				var n = this.resConfig.getType(t),
					s = this.resConfig.getName(t);
				if ("" == n && (s = e.AnalyzerBase.getStringPrefix(t), n = this.resConfig.getType(s), "" == n)) return void egret.$callAsync(r, i);
				var a = this.$getAnalyzerByType(n),
					o = a.getRes(t);
				if (o) return void egret.$callAsync(r, i, o, t);
				var u = {
					key: t,
					compFunc: r,
					thisObject: i
				};
				if (this.asyncDic[s]) this.asyncDic[s].push(u);
				else {
					this.asyncDic[s] = [u];
					var l = this.resConfig.getResourceItem(s);
					this.resLoader.loadItem(l)
				}
			}, n.getResByUrl = function(t, r, i, n) {
				if (void 0 === n && (n = ""), !t) return void egret.$callAsync(r, i);
				n || (n = this.getTypeByUrl(t)), null != this._loadedUrlTypes[t] && this._loadedUrlTypes[t] != n && egret.$warn(3202), this._loadedUrlTypes[t] = n;
				var s = this.$getAnalyzerByType(n),
					a = t,
					o = s.getRes(a);
				if (o) return void egret.$callAsync(r, i, o, t);
				var u = {
					key: a,
					compFunc: r,
					thisObject: i
				};
				if (this.asyncDic[a]) this.asyncDic[a].push(u);
				else {
					this.asyncDic[a] = [u];
					var l = new e.ResourceItem(a, t, n);
					this.resLoader.loadItem(l)
				}
			}, n.getTypeByUrl = function(t) {
				var r = t.substr(t.lastIndexOf(".") + 1);
				r && (r = r.toLowerCase());
				var i;
				switch (r) {
				case e.ResourceItem.TYPE_XML:
				case e.ResourceItem.TYPE_JSON:
				case e.ResourceItem.TYPE_SHEET:
					i = r;
					break;
				case "png":
				case "jpg":
				case "gif":
				case "jpeg":
				case "bmp":
					i = e.ResourceItem.TYPE_IMAGE;
					break;
				case "fnt":
					i = e.ResourceItem.TYPE_FONT;
					break;
				case "txt":
					i = e.ResourceItem.TYPE_TEXT;
					break;
				case "mp3":
				case "ogg":
				case "mpeg":
				case "wav":
				case "m4a":
				case "mp4":
				case "aiff":
				case "wma":
				case "mid":
					i = e.ResourceItem.TYPE_SOUND;
					break;
				default:
					i = e.ResourceItem.TYPE_BIN
				}
				return i
			}, n.onResourceItemComp = function(e) {
				var t = this.asyncDic[e.name];
				delete this.asyncDic[e.name];
				for (var r = this.$getAnalyzerByType(e.type), i = t.length, n = 0; i > n; n++) {
					var s = t[n],
						a = r.getRes(s.key);
					s.compFunc.call(s.thisObject, a, s.key)
				}
			}, n.destroyRes = function(e, t) {
				void 0 === t && (t = !0);
				var r = this.resConfig.getRawGroupByName(e);
				if (r && r.length > 0) {
					var i = this.loadedGroups.indexOf(e); - 1 != i && this.loadedGroups.splice(i, 1);
					for (var n = r.length, s = 0; n > s; s++) {
						var a = r[s];
						if (!t && this.isResInLoadedGroup(a.name));
						else {
							a.loaded = !1;
							var o = this.$getAnalyzerByType(a.type);
							o.destroyRes(a.name), this.removeLoadedGroupsByItemName(a.name)
						}
					}
					return !0
				}
				var u = this.resConfig.getType(e);
				if ("" == u) {
					if (u = this._loadedUrlTypes[e], null == u || "" == u) return !1;
					delete this._loadedUrlTypes[e];
					var l = this.$getAnalyzerByType(u);
					return l.destroyRes(e), !0
				}
				var a = this.resConfig.getRawResourceItem(e);
				a.loaded = !1;
				var o = this.$getAnalyzerByType(u),
					c = o.destroyRes(e);
				return this.removeLoadedGroupsByItemName(a.name), c
			}, n.removeLoadedGroupsByItemName = function(e) {
				for (var t = this.loadedGroups, r = t.length, i = 0; r > i; i++) for (var n = this.resConfig.getRawGroupByName(t[i]), s = n.length, a = 0; s > a; a++) {
					var o = n[a];
					if (o.name == e) {
						t.splice(i, 1), i--, r = t.length;
						break
					}
				}
			}, n.isResInLoadedGroup = function(e) {
				for (var t = this.loadedGroups, r = t.length, i = 0; r > i; i++) for (var n = this.resConfig.getRawGroupByName(t[i]), s = n.length, a = 0; s > a; a++) {
					var o = n[a];
					if (o.name == e) return !0
				}
				return !1
			}, n.setMaxLoadingThread = function(e) {
				1 > e && (e = 1), this.resLoader.thread = e
			}, n.setMaxRetryTimes = function(e) {
				e = Math.max(e, 0), this.resLoader.maxRetryTimes = e
			}, r.GROUP_CONFIG = "RES__CONFIG", r
		}(egret.EventDispatcher);
	egret.registerClass(m, "Resource");
	var _ = new m
}(RES || (RES = {}));
var RES;
!
function(e) {
	var t = function(t) {
			function r() {
				t.call(this), this.sheetMap = {}, this.recyclerIamge = [], this._dataFormat = egret.HttpResponseType.TEXT
			}
			__extends(r, t);
			var i = (__define, r),
				n = i.prototype;
			return n.onLoadFinish = function(e) {
				var t = e.target,
					r = this.resItemDic[t.$hashCode];
				delete this.resItemDic[t.hashCode];
				var i = r.item,
					n = r.func;
				if (i.loaded = e.type == egret.Event.COMPLETE, i.loaded) if (t instanceof egret.HttpRequest) {
					i.loaded = !1;
					var s = this.analyzeConfig(i, t.response);
					if (s) return this.loadImage(s, r), void this.recycler.push(t)
				} else this.analyzeBitmap(i, t.data);
				t instanceof egret.HttpRequest ? this.recycler.push(t) : this.recyclerIamge.push(t), n.call(r.thisObject, i)
			}, n.analyzeConfig = function(e, t) {
				var r, i = e.name,
					n = "";
				try {
					var s = t;
					r = JSON.parse(s)
				} catch (a) {
					egret.$warn(1017, e.url, t)
				}
				if (r) if (this.sheetMap[i] = r, r.file) n = this.getRelativePath(e.url, r.file);
				else {
					var o = e.url.split("?"),
						u = o[0].split("/");
					u[u.length - 1] = u[u.length - 1].split(".")[0] + ".png", n = "";
					for (var l = 0; l < u.length; l++) n += u[l] + (l < u.length - 1 ? "/" : "");
					2 == o.length && (n += o[2])
				}
				return n
			}, n.analyzeBitmap = function(e, t) {
				var r = e.name;
				if (!this.fileDic[r] && t) {
					var i = this.sheetMap[r];
					delete this.sheetMap[r];
					var n = e.data && e.data.subkeys ? "" : r,
						s = this.parseAnimation(t, i, n);
					this.fileDic[r] = s
				}
			}, n.getRelativePath = function(e, t) {
				e = e.split("\\").join("/");
				var r = e.lastIndexOf("/");
				return e = -1 != r ? e.substring(0, r + 1) + t : t
			}, n.parseAnimation = function(e, t, r) {
				for (var i, n = Object.keys(t.mc), s = t.mc[n[0]].frames, a = s.length, o = [], u = 0; a > u; u++) {
					i = t.res[s[u].res];
					var l = new egret.Texture;
					l._bitmapData = e, l.$initData(i.x, i.y, i.w, i.h, s[u].x, s[u].y, s[u].sourceW, s[u].sourceH, e.width, e.height)
				}
				return o
			}, n.destroyRes = function(e) {
				var t = this.fileDic[e];
				return t ? (delete this.fileDic[e], !0) : !1
			}, n.loadImage = function(t, r) {
				var i = this.getImageLoader();
				this.resItemDic[i.hashCode] = r, i.load(e.$getVirtualUrl(t))
			}, n.getImageLoader = function() {
				var e = this.recyclerIamge.pop();
				return e || (e = new egret.ImageLoader, e.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this), e.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this)), e
			}, r
		}(e.BinAnalyzer);
	e.AnimationAnalyzer = t, egret.registerClass(t, "RES.AnimationAnalyzer")
}(RES || (RES = {}));
var egret;
!
function(e) {
	e.$locale_strings = e.$locale_strings || {}, e.$locale_strings.en_US = e.$locale_strings.en_US || {};
	var t = e.$locale_strings.en_US;
	t[3200] = "RES.createGroup() passed in non-existed key value in configuration: {0}", t[3201] = 'RES loaded non-existed or empty resource group:"{0}"', t[3202] = "Do not use the different types of ways to load the same material!", t[3203] = "Can't find the analyzer of the specified file type:{0}。 Please register the specified analyzer in the initialization of the project first,then start the resource loading process。"
}(egret || (egret = {}));
var egret;
!
function(e) {
	e.$locale_strings = e.$locale_strings || {}, e.$locale_strings.zh_CN = e.$locale_strings.zh_CN || {};
	var t = e.$locale_strings.zh_CN;
	t[3200] = "RES.createGroup()传入了配置中不存在的键值: {0}", t[3201] = 'RES加载了不存在或空的资源组:"{0}"', t[3202] = "请不要使用不同的类型方式来加载同一个素材！", t[3203] = "找不到指定文件类型的解析器:{0}。 请先在项目初始化里注册指定文件类型的解析器，再启动资源加载。"
}(egret || (egret = {}));