var egret;
!
function(e) {
	var t;
	!
	function(t) {
		var n = function(t) {
				function n() {
					t.call(this)
				}
				__extends(n, t);
				var r = (__define, n),
					a = r.prototype;
				return a.proceed = function(t) {
					function n(e) {
						t.dispatchEvent(e)
					}
					function r(e) {
						o(), t.dispatchEvent(e)
					}
					function a() {
						switch (o(), t.dataFormat) {
						case e.URLLoaderDataFormat.VARIABLES:
							t.data = new e.URLVariables(d.response);
							break;
						default:
							t.data = d.response
						}
						window.setTimeout(function() {
							e.Event.dispatchEvent(t, e.Event.COMPLETE)
						}, 0)
					}
					function o() {
						d.removeEventListener(e.Event.COMPLETE, a, i), d.removeEventListener(e.IOErrorEvent.IO_ERROR, r, i), d.removeEventListener(e.ProgressEvent.PROGRESS, n, i)
					}
					var i = this;
					if (t.dataFormat == e.URLLoaderDataFormat.TEXTURE) return void this.loadTexture(t);
					if (t.dataFormat == e.URLLoaderDataFormat.SOUND) return void this.loadSound(t);
					var s = t._request,
						E = i.getVirtualUrl(e.$getUrl(s)),
						d = new e.HttpRequest;
					if (d.addEventListener(e.Event.COMPLETE, a, this), d.addEventListener(e.IOErrorEvent.IO_ERROR, r, this), d.addEventListener(e.ProgressEvent.PROGRESS, n, this), d.open(E, s.method), d.responseType = this.getResponseType(t.dataFormat), s.method != e.URLRequestMethod.GET && s.data) if (s.data instanceof e.URLVariables) {
						d.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
						var v = s.data;
						d.send(v.toString())
					} else d.setRequestHeader("Content-Type", "multipart/form-data"), d.send(s.data);
					else d.send()
				}, a.getResponseType = function(t) {
					switch (t) {
					case e.URLLoaderDataFormat.TEXT:
					case e.URLLoaderDataFormat.VARIABLES:
						return e.URLLoaderDataFormat.TEXT;
					case e.URLLoaderDataFormat.BINARY:
						return "arraybuffer";
					default:
						return t
					}
				}, a.loadSound = function(t) {
					function n(e) {
						t.dispatchEvent(e)
					}
					function r(e) {
						o(), t.dispatchEvent(e)
					}
					function a(n) {
						o(), t.data = E, window.setTimeout(function() {
							t.dispatchEventWith(e.Event.COMPLETE)
						}, 0)
					}
					function o() {
						E.removeEventListener(e.Event.COMPLETE, a, i), E.removeEventListener(e.IOErrorEvent.IO_ERROR, r, i), E.removeEventListener(e.ProgressEvent.PROGRESS, n, i)
					}
					var i = this,
						s = this.getVirtualUrl(t._request.url),
						E = new e.Sound;
					E.addEventListener(e.Event.COMPLETE, a, i), E.addEventListener(e.IOErrorEvent.IO_ERROR, r, i), E.addEventListener(e.ProgressEvent.PROGRESS, n, i), E.load(s)
				}, a.loadTexture = function(t) {
					function n(e) {
						t.dispatchEvent(e)
					}
					function r(e) {
						o(), t.dispatchEvent(e)
					}
					function a(n) {
						o();
						var r = E.data;
						r.source.setAttribute("bitmapSrc", s);
						var a = new e.Texture;
						a._setBitmapData(r), t.data = a, window.setTimeout(function() {
							t.dispatchEventWith(e.Event.COMPLETE)
						}, i)
					}
					function o() {
						E.removeEventListener(e.Event.COMPLETE, a, i), E.removeEventListener(e.IOErrorEvent.IO_ERROR, r, i), E.removeEventListener(e.ProgressEvent.PROGRESS, n, i)
					}
					var i = this,
						s = this.getVirtualUrl(t._request.url),
						E = new e.ImageLoader;
					E.addEventListener(e.Event.COMPLETE, a, i), E.addEventListener(e.IOErrorEvent.IO_ERROR, r, i), E.addEventListener(e.ProgressEvent.PROGRESS, n, i), E.load(s)
				}, a.getChangeList = function() {
					return []
				}, a.getVirtualUrl = function(e) {
					return e
				}, n.getNetContext = function() {
					return null == n._instance && (n._instance = new n), n._instance
				}, n
			}(e.HashObject);
		t.HTML5NetContext = n, e.registerClass(n, "egret.web.HTML5NetContext", ["egret.NetContext"]), e.NetContext = n
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));