var egret;
!
function(e) {
	var t;
	!
	function(t) {
		var i = "egret.BitmapData";
		e.registerClass(HTMLImageElement, i), e.registerClass(HTMLCanvasElement, i), e.registerClass(HTMLVideoElement, i)
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	function t(t) {
		return t.hashCode = t.$hashCode = e.$hashCount++, t
	}
	e.$toBitmapData = t
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		var i = function() {
				function e() {}
				var t = (__define, e);
				t.prototype;
				return e.call = function(e, t) {}, e.addCallback = function(e, t) {}, e
			}();
		t.WebExternalInterface = i, e.registerClass(i, "egret.web.WebExternalInterface", ["egret.ExternalInterface"]), e.ExternalInterface = i
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		var i;
		!
		function(i) {
			function r(e) {
				return window.localStorage.getItem(e)
			}
			function n(t, i) {
				try {
					return window.localStorage.setItem(t, i), !0
				} catch (r) {
					return e.$warn(1047, t, i), !1
				}
			}
			function a(e) {
				window.localStorage.removeItem(e)
			}
			function s() {
				window.localStorage.clear()
			}
			t.getItem = r, t.setItem = n, t.removeItem = a, t.clear = s
		}(i = t.web || (t.web = {}))
	}(t = e.localStorage || (e.localStorage = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		var i = function(i) {
				function r() {
					i.call(this), this.loaded = !1
				}
				__extends(r, i);
				var n = __define,
					a = r,
					s = a.prototype;
				return n(s, "length", function() {
					if (this.originAudio) return this.originAudio.duration;
					throw new Error("sound not loaded!")
				}), s.load = function(t) {
					function i() {
						a(), h.indexOf("firefox") >= 0 && (o.pause(), o.muted = !1), s.loaded = !0, s.dispatchEventWith(e.Event.COMPLETE)
					}
					function n() {
						a(), s.dispatchEventWith(e.IOErrorEvent.IO_ERROR)
					}
					function a() {
						o.removeEventListener("canplaythrough", i), o.removeEventListener("error", n)
					}
					var s = this;
					this.url = t;
					var o = new Audio(t);
					o.addEventListener("canplaythrough", i), o.addEventListener("error", n);
					var h = navigator.userAgent.toLowerCase();
					h.indexOf("firefox") >= 0 && (o.autoplay = !0, o.muted = !0), o.load(), this.originAudio = o, r.$recycle(this.url, o)
				}, s.play = function(i, n) {
					i = +i || 0, n = +n || 0;
					var a = r.$pop(this.url);
					null == a && (a = this.originAudio.cloneNode()), a.autoplay = !0;
					var s = new t.HtmlSoundChannel(a);
					return s.$url = this.url, s.$loops = n, s.$startTime = i, s.$play(), e.sys.$pushSoundChannel(s), s
				}, s.close = function() {
					0 == this.loaded && this.originAudio && (this.originAudio.src = ""), this.originAudio && (this.originAudio = null), r.$clear(this.url)
				}, r.$clear = function(e) {
					var t = r.audios[e];
					t && (t.length = 0)
				}, r.$pop = function(e) {
					var t = r.audios[e];
					return t && t.length > 0 ? t.pop() : null
				}, r.$recycle = function(e, t) {
					var i = r.audios[e];
					null == r.audios[e] && (i = r.audios[e] = []), i.push(t)
				}, r.MUSIC = "music", r.EFFECT = "effect", r.audios = {}, r
			}(e.EventDispatcher);
		t.HtmlSound = i, e.registerClass(i, "egret.web.HtmlSound", ["egret.Sound"])
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		var i = function(i) {
				function r(t) {
					var r = this;
					i.call(this), this.$startTime = 0, this.audio = null, this.isStopped = !1, this.canPlay = function() {
						r.audio.removeEventListener("canplay", r.canPlay);
						try {
							r.audio.currentTime = r.$startTime
						} catch (e) {} finally {
							r.audio.play()
						}
					}, this.onPlayEnd = function() {
						return 1 == r.$loops ? (r.stop(), void r.dispatchEventWith(e.Event.SOUND_COMPLETE)) : (r.$loops > 0 && r.$loops--, void r.$play())
					}, t.addEventListener("ended", this.onPlayEnd), this.audio = t
				}
				__extends(r, i);
				var n = __define,
					a = r,
					s = a.prototype;
				return s.$play = function() {
					if (this.isStopped) return void e.$error(1036);
					try {
						this.audio.currentTime = this.$startTime
					} catch (t) {
						return void this.audio.addEventListener("canplay", this.canPlay)
					}
					this.audio.play()
				}, s.stop = function() {
					if (this.audio) {
						this.isStopped || e.sys.$popSoundChannel(this), this.isStopped = !0;
						var i = this.audio;
						i.pause(), i.removeEventListener("ended", this.onPlayEnd), this.audio = null, t.HtmlSound.$recycle(this.$url, i)
					}
				}, n(s, "volume", function() {
					return this.audio ? this.audio.volume : 1
				}, function(t) {
					return this.isStopped ? void e.$error(1036) : void(this.audio && (this.audio.volume = t))
				}), n(s, "position", function() {
					return this.audio ? this.audio.currentTime : 0
				}), r
			}(e.EventDispatcher);
		t.HtmlSoundChannel = i, e.registerClass(i, "egret.web.HtmlSoundChannel", ["egret.SoundChannel", "egret.IEventDispatcher"])
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		var i = function(i) {
				function r() {
					i.call(this), this.loaded = !1
				}
				__extends(r, i);
				var n = __define,
					a = r,
					s = a.prototype;
				return s.load = function(i) {
					var r = this;
					this.url = i, QZAppExternal.preloadSound(function(t) {
						0 == t.code ? (r.loaded = !0, r.dispatchEventWith(e.Event.COMPLETE)) : r.dispatchEventWith(e.IOErrorEvent.IO_ERROR)
					}, {
						bid: -1,
						url: t.Html5Capatibility._QQRootPath + i,
						refresh: 1
					})
				}, n(s, "length", function() {
					throw new Error("qq sound not supported!")
				}), s.play = function(i, r) {
					i = +i || 0, r = +r || 0;
					var n = new t.QQSoundChannel;
					return n.$url = this.url, n.$loops = r, n.$type = this.type, n.$startTime = i, n.$play(), e.sys.$pushSoundChannel(n), n
				}, s.close = function() {}, r.MUSIC = "music", r.EFFECT = "effect", r
			}(e.EventDispatcher);
		t.QQSound = i, e.registerClass(i, "egret.web.QQSound", ["egret.Sound"])
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		var i = function(t) {
				function i() {
					var i = this;
					t.call(this), this.$startTime = 0, this.isStopped = !1, this.onPlayEnd = function() {
						return 1 == i.$loops ? (i.stop(), void i.dispatchEventWith(e.Event.SOUND_COMPLETE)) : (i.$loops > 0 && i.$loops--, void i.$play())
					}, this._startTime = 0
				}
				__extends(i, t);
				var r = __define,
					n = i,
					a = n.prototype;
				return a.$play = function() {
					if (this.isStopped) return void e.$error(1036);
					var t = this;
					this._startTime = Date.now();
					var i = 0;
					i = t.$loops > 0 ? t.$loops - 1 : -1, this.$type == e.Sound.EFFECT ? QZAppExternal.playLocalSound(function(e) {}, {
						bid: -1,
						url: t.$url,
						loop: i
					}) : QZAppExternal.playLocalBackSound(function(e) {}, {
						bid: -1,
						url: t.$url,
						loop: i
					})
				}, a.stop = function() {
					this.$type == e.Sound.EFFECT ? QZAppExternal.stopSound() : QZAppExternal.stopBackSound(), this.isStopped || e.sys.$popSoundChannel(this), this.isStopped = !0
				}, r(a, "volume", function() {
					return 1
				}, function(t) {
					return this.isStopped ? void e.$error(1036) : void 0
				}), r(a, "position", function() {
					return (Date.now() - this._startTime) / 1e3
				}), i
			}(e.EventDispatcher);
		t.QQSoundChannel = i, e.registerClass(i, "egret.web.QQSoundChannel", ["egret.SoundChannel", "egret.IEventDispatcher"])
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		var i = function() {
				function e() {}
				var t = (__define, e);
				t.prototype;
				return e.decodeAudios = function() {
					if (!(e.decodeArr.length <= 0 || e.isDecoding)) {
						e.isDecoding = !0;
						var t = e.decodeArr.shift();
						e.ctx.decodeAudioData(t.buffer, function(i) {
							t.self.audioBuffer = i, t.success && t.success(), e.isDecoding = !1, e.decodeAudios()
						}, function() {
							alert("sound decode error: " + t.url + "！\nsee http://edn.egret.com/cn/docs/page/156"), t.fail && t.fail(), e.isDecoding = !1, e.decodeAudios()
						})
					}
				}, e.canUseWebAudio = window.AudioContext || window.webkitAudioContext || window.mozAudioContext, e.ctx = e.canUseWebAudio ? new(window.AudioContext || window.webkitAudioContext || window.mozAudioContext) : void 0, e.decodeArr = [], e.isDecoding = !1, e
			}();
		t.WebAudioDecode = i, e.registerClass(i, "egret.web.WebAudioDecode");
		var r = function(r) {
				function n() {
					r.call(this), this.loaded = !1
				}
				__extends(n, r);
				var a = __define,
					s = n,
					o = s.prototype;
				return a(o, "length", function() {
					if (this.audioBuffer) return this.audioBuffer.duration;
					throw new Error("sound not loaded!")
				}), o.load = function(t) {
					function r() {
						a.loaded = !0, a.dispatchEventWith(e.Event.COMPLETE)
					}
					function n() {
						a.dispatchEventWith(e.IOErrorEvent.IO_ERROR)
					}
					var a = this;
					this.url = t;
					var s = new XMLHttpRequest;
					s.open("GET", t, !0), s.responseType = "arraybuffer", s.onload = function() {
						i.decodeArr.push({
							buffer: s.response,
							success: r,
							fail: n,
							self: a,
							url: a.url
						}), i.decodeAudios()
					}, s.send()
				}, o.play = function(i, r) {
					i = +i || 0, r = +r || 0;
					var n = new t.WebAudioSoundChannel;
					return n.$url = this.url, n.$loops = r, n.$audioBuffer = this.audioBuffer, n.$startTime = i, n.$play(), e.sys.$pushSoundChannel(n), n
				}, o.close = function() {}, n.MUSIC = "music", n.EFFECT = "effect", n
			}(e.EventDispatcher);
		t.WebAudioSound = r, e.registerClass(r, "egret.web.WebAudioSound", ["egret.Sound"])
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		var i = function(i) {
				function r() {
					var r = this;
					i.call(this), this.$startTime = 0, this.bufferSource = null, this.context = t.WebAudioDecode.ctx, this.isStopped = !1, this._currentTime = 0, this._volume = 1, this.onPlayEnd = function() {
						return 1 == r.$loops ? (r.stop(), void r.dispatchEventWith(e.Event.SOUND_COMPLETE)) : (r.$loops > 0 && r.$loops--, void r.$play())
					}, this._startTime = 0, this.context.createGain ? this.gain = this.context.createGain() : this.gain = this.context.createGainNode()
				}
				__extends(r, i);
				var n = __define,
					a = r,
					s = a.prototype;
				return s.$play = function() {
					if (this.isStopped) return void e.$error(1036);
					this.bufferSource && (this.bufferSource.onended = null, this.bufferSource = null);
					var t = this.context,
						i = this.gain,
						r = t.createBufferSource();
					this.bufferSource = r, r.buffer = this.$audioBuffer, r.connect(i), i.connect(t.destination), r.onended = this.onPlayEnd, this._startTime = Date.now(), this.gain.gain.value = this._volume, r.start(0, this.$startTime), this._currentTime = 0
				}, s.stop = function() {
					if (this.bufferSource) {
						var t = this.bufferSource;
						t.stop ? t.stop(0) : t.noteOff(0), this.bufferSource.disconnect(), this.bufferSource = null, this.$audioBuffer = null
					}
					this.isStopped || e.sys.$popSoundChannel(this), this.isStopped = !0
				}, n(s, "volume", function() {
					return this._volume
				}, function(t) {
					return this.isStopped ? void e.$error(1036) : (this._volume = t, void(this.gain.gain.value = t))
				}), n(s, "position", function() {
					return this.bufferSource ? (Date.now() - this._startTime) / 1e3 + this.$startTime : 0
				}), r
			}(e.EventDispatcher);
		t.WebAudioSoundChannel = i, e.registerClass(i, "egret.web.WebAudioSoundChannel", ["egret.SoundChannel", "egret.IEventDispatcher"])
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		var i = function(t) {
				function i(i, r) {
					var n = this;
					void 0 === r && (r = !0), t.call(this), this.loaded = !1, this.closed = !1, this.heightSet = 0 / 0, this.widthSet = 0 / 0, this.isPlayed = !1, this.screenChanged = function(t) {
						var i = !! n.video.webkitDisplayingFullscreen;
						i || (n.checkFullScreen(!1), e.Capabilities.isMobile || (n._fullscreen = i))
					}, this._fullscreen = !0, this.onVideoLoaded = function() {
						n.video.removeEventListener("canplay", n.onVideoLoaded);
						var t = n.video;
						n.loaded = !0, n.posterData && (n.posterData.width = n.getPlayWidth(), n.posterData.height = n.getPlayHeight()), t.width = t.videoWidth, t.height = t.videoHeight, n.$invalidateContentBounds(), window.setTimeout(function() {
							n.dispatchEventWith(e.Event.COMPLETE)
						}, 200)
					}, this.$renderNode = new e.sys.BitmapNode, this.src = i, this.once(e.Event.ADDED_TO_STAGE, this.loadPoster, this), i && this.load()
				}
				__extends(i, t);
				var r = __define,
					n = i,
					a = n.prototype;
				return a.load = function(t, i) {
					var r = this;
					if (void 0 === i && (i = !0), t = t || this.src, this.src = t, !this.video || this.video.src != t) {
						var n;
						!this.video || e.Capabilities.isMobile ? (n = document.createElement("video"), this.video = n, n.controls = null) : n = this.video, n.src = t, n.setAttribute("autoplay", "autoplay"), n.setAttribute("webkit-playsinline", "true"), n.addEventListener("canplay", this.onVideoLoaded), n.addEventListener("error", function() {
							return r.onVideoError()
						}), n.addEventListener("ended", function() {
							return r.onVideoEnded()
						}), n.load(), n.play(), n.style.position = "absolute", n.style.top = "0px", n.style.zIndex = "-88888", n.style.left = "0px", n.height = 1, n.width = 1, window.setTimeout(function() {
							return n.pause()
						}, 170)
					}
				}, a.play = function(t, i) {
					var r = this;
					if (void 0 === i && (i = !1), 0 == this.loaded) return this.load(this.src), void this.once(e.Event.COMPLETE, function(e) {
						return r.play(t, i)
					}, this);
					this.isPlayed = !0;
					var n = this.video;
					void 0 != t && (n.currentTime = +t || 0), n.loop = !! i, e.Capabilities.isMobile ? n.style.zIndex = "-88888" : n.style.zIndex = "9999", n.style.position = "absolute", n.style.top = "0px", n.style.left = "0px", n.height = n.videoHeight, n.width = n.videoWidth, "Windows PC" != e.Capabilities.os && "Mac OS" != e.Capabilities.os && window.setTimeout(function() {
						n.width = 0
					}, 1e3), this.checkFullScreen(this._fullscreen)
				}, a.checkFullScreen = function(t) {
					var i = this.video;
					if (t) null == i.parentElement && (i.removeAttribute("webkit-playsinline"), document.body.appendChild(i)), e.stopTick(this.markDirty, this), this.goFullscreen();
					else if (null != i.parentElement && i.parentElement.removeChild(i), i.setAttribute("webkit-playsinline", "true"), this.setFullScreenMonitor(!1), e.startTick(this.markDirty, this), e.Capabilities.isMobile) return this.video.currentTime = 0, void this.onVideoEnded();
					i.play()
				}, a.goFullscreen = function() {
					var t, i = this.video;
					return t = e.web.getPrefixStyleName("requestFullscreen", i), i[t] || (t = e.web.getPrefixStyleName("requestFullScreen", i), i[t]) ? (i.removeAttribute("webkit-playsinline"), i[t](), this.setFullScreenMonitor(!0), !0) : !0
				}, a.setFullScreenMonitor = function(e) {
					var t = this.video;
					e ? (t.addEventListener("mozfullscreenchange", this.screenChanged), t.addEventListener("webkitfullscreenchange", this.screenChanged), t.addEventListener("mozfullscreenerror", this.screenError), t.addEventListener("webkitfullscreenerror", this.screenError)) : (t.removeEventListener("mozfullscreenchange", this.screenChanged), t.removeEventListener("webkitfullscreenchange", this.screenChanged), t.removeEventListener("mozfullscreenerror", this.screenError), t.removeEventListener("webkitfullscreenerror", this.screenError))
				}, a.screenError = function() {
					e.$error(3014)
				}, a.exitFullscreen = function() {
					document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.oCancelFullScreen ? document.oCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen()
				}, a.onVideoEnded = function() {
					this.pause(), this.isPlayed = !1, this.$invalidateContentBounds(), this.dispatchEventWith(e.Event.ENDED)
				}, a.onVideoError = function() {
					this.dispatchEventWith(e.IOErrorEvent.IO_ERROR)
				}, a.close = function() {
					var e = this;
					this.closed = !0, this.video.removeEventListener("canplay", this.onVideoLoaded), this.video.removeEventListener("error", function() {
						return e.onVideoError()
					}), this.video.removeEventListener("ended", function() {
						return e.onVideoEnded()
					}), this.pause(), 0 == this.loaded && this.video && (this.video.src = ""), this.video && this.video.parentElement && (this.video.parentElement.removeChild(this.video), this.video = null), this.loaded = !1
				}, a.pause = function() {
					this.video && this.video.pause(), e.stopTick(this.markDirty, this), this.$invalidate()
				}, r(a, "volume", function() {
					return this.video ? this.video.volume : 1
				}, function(e) {
					this.video && (this.video.volume = e)
				}), r(a, "position", function() {
					return this.video ? this.video.currentTime : 0
				}, function(e) {
					this.video && (this.video.currentTime = e)
				}), r(a, "fullscreen", function() {
					return this._fullscreen
				}, function(t) {
					e.Capabilities.isMobile || (this._fullscreen = !! t, this.video && 0 == this.video.paused && this.checkFullScreen(this._fullscreen))
				}), r(a, "bitmapData", function() {
					return this.video && this.loaded ? (this._bitmapData || (this.video.width = this.video.videoWidth, this.video.height = this.video.videoHeight, this._bitmapData = new e.BitmapData(this.video), this._bitmapData.$deleteSource = !1), this._bitmapData) : null
				}), a.loadPoster = function() {
					var t = this,
						i = this.poster;
					if (i) {
						var r = new e.ImageLoader;
						r.once(e.Event.COMPLETE, function(e) {
							r.data;
							t.posterData = r.data, t.posterData.width = t.getPlayWidth(), t.posterData.height = t.getPlayHeight(), t.$invalidateContentBounds()
						}, this), r.load(i)
					}
				}, a.$measureContentBounds = function(e) {
					var t = this.bitmapData,
						i = this.posterData;
					t ? e.setTo(0, 0, this.getPlayWidth(), this.getPlayHeight()) : i ? e.setTo(0, 0, this.getPlayWidth(), this.getPlayHeight()) : e.setEmpty()
				}, a.getPlayWidth = function() {
					return isNaN(this.widthSet) ? this.bitmapData ? this.bitmapData.width : this.posterData ? this.posterData.width : 0 / 0 : this.widthSet
				}, a.getPlayHeight = function() {
					return isNaN(this.heightSet) ? this.bitmapData ? this.bitmapData.height : this.posterData ? this.posterData.height : 0 / 0 : this.heightSet
				}, a.$render = function() {
					var t = this.$renderNode,
						i = this.bitmapData,
						r = this.posterData,
						n = this.getPlayWidth(),
						a = this.getPlayHeight();
					this.isPlayed && !e.Capabilities.isMobile || !r ? this.isPlayed && i && (t.image = i, t.imageWidth = i.width, t.imageHeight = i.height, e.WebGLUtils.deleteWebGLTexture(i.webGLTexture), i.webGLTexture = null, t.drawImage(0, 0, i.width, i.height, 0, 0, n, a)) : (t.image = r, t.imageWidth = n, t.imageHeight = a, t.drawImage(0, 0, r.width, r.height, 0, 0, n, a))
				}, a.markDirty = function() {
					return this.$invalidate(), !0
				}, a.$setHeight = function(e) {
					return this.heightSet = +e || 0, this.$invalidate(), this.$invalidateContentBounds(), t.prototype.$setHeight.call(this, e)
				}, a.$setWidth = function(e) {
					return this.widthSet = +e || 0, this.$invalidate(), this.$invalidateContentBounds(), t.prototype.$setWidth.call(this, e)
				}, r(a, "paused", function() {
					return this.video ? this.video.paused : !0
				}), r(a, "length", function() {
					if (this.video) return this.video.duration;
					throw new Error("Video not loaded!")
				}), i
			}(e.DisplayObject);
		t.WebVideo = i, e.registerClass(i, "egret.web.WebVideo", ["egret.Video"]), e.Video = i
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		var i = function(t) {
				function i() {
					t.call(this), this._url = "", this._method = ""
				}
				__extends(i, t);
				var r = __define,
					n = i,
					a = n.prototype;
				return r(a, "response", function() {
					if (!this._xhr) return null;
					if (void 0 != this._xhr.response) return this._xhr.response;
					if ("text" == this._responseType) return this._xhr.responseText;
					if ("arraybuffer" == this._responseType && /msie 9.0/i.test(navigator.userAgent)) {
						var e = window;
						return e.convertResponseBodyToText(this._xhr.responseBody)
					}
					return "document" == this._responseType ? this._xhr.responseXML : null
				}), r(a, "responseType", function() {
					return this._responseType
				}, function(e) {
					this._responseType = e
				}), r(a, "withCredentials", function() {
					return this._withCredentials
				}, function(e) {
					this._withCredentials = e
				}), a.getXHR = function() {
					return window.XMLHttpRequest ? new window.XMLHttpRequest : new ActiveXObject("MSXML2.XMLHTTP")
				}, a.open = function(e, t) {
					void 0 === t && (t = "GET"), this._url = e, this._method = t, this._xhr && (this._xhr.abort(), this._xhr = null), this._xhr = this.getXHR(), this._xhr.onreadystatechange = this.onReadyStateChange.bind(this), this._xhr.onprogress = this.updateProgress.bind(this), this._xhr.open(this._method, this._url, !0)
				}, a.send = function(e) {
					if (null != this._responseType && (this._xhr.responseType = this._responseType), null != this._withCredentials && (this._xhr.withCredentials = this._withCredentials), this.headerObj) for (var t in this.headerObj) this._xhr.setRequestHeader(t, this.headerObj[t]);
					this._xhr.send(e)
				}, a.abort = function() {
					this._xhr && this._xhr.abort()
				}, a.getAllResponseHeaders = function() {
					if (!this._xhr) return null;
					var e = this._xhr.getAllResponseHeaders();
					return e ? e : ""
				}, a.setRequestHeader = function(e, t) {
					this.headerObj || (this.headerObj = {}), this.headerObj[e] = t
				}, a.getResponseHeader = function(e) {
					if (!this._xhr) return null;
					var t = this._xhr.getResponseHeader(e);
					return t ? t : ""
				}, a.onReadyStateChange = function() {
					var t = this._xhr;
					if (4 == t.readyState) {
						var i = t.status >= 400 || 0 == t.status,
							r = (this._url, this);
						window.setTimeout(function() {
							i ? r.dispatchEventWith(e.IOErrorEvent.IO_ERROR) : r.dispatchEventWith(e.Event.COMPLETE)
						}, 0)
					}
				}, a.updateProgress = function(t) {
					t.lengthComputable && e.ProgressEvent.dispatchProgressEvent(this, e.ProgressEvent.PROGRESS, t.loaded, t.total)
				}, i
			}(e.EventDispatcher);
		t.WebHttpRequest = i, e.registerClass(i, "egret.web.WebHttpRequest", ["egret.HttpRequest"]), e.HttpRequest = i
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		var i = window.URL || window.webkitURL,
			r = function(r) {
				function n() {
					r.apply(this, arguments), this.data = null, this._crossOrigin = null, this._hasCrossOriginSet = !1, this.currentImage = null, this.request = null
				}
				__extends(n, r);
				var a = __define,
					s = n,
					o = s.prototype;
				return a(o, "crossOrigin", function() {
					return this._crossOrigin
				}, function(e) {
					this._hasCrossOriginSet = !0, this._crossOrigin = e
				}), o.load = function(i) {
					if (t.Html5Capatibility._canUseBlob && 0 != i.indexOf("wxLocalResource:") && 0 != i.indexOf("data:") && 0 != i.indexOf("http:") && 0 != i.indexOf("https:")) {
						var r = this.request;
						r || (r = this.request = new e.web.WebHttpRequest, r.addEventListener(e.Event.COMPLETE, this.onBlobLoaded, this), r.addEventListener(e.IOErrorEvent.IO_ERROR, this.onBlobError, this), r.responseType = "blob"), r.open(i), r.send()
					} else this.loadImage(i)
				}, o.onBlobLoaded = function(e) {
					var t = this.request.response;
					this.loadImage(i.createObjectURL(t))
				}, o.onBlobError = function(e) {
					this.dispatchIOError(this.currentURL)
				}, o.loadImage = function(e) {
					var t = new Image;
					this.data = null, this.currentImage = t, this._hasCrossOriginSet ? this._crossOrigin && (t.crossOrigin = this._crossOrigin) : n.crossOrigin && (t.crossOrigin = n.crossOrigin), t.onload = this.onImageComplete.bind(this), t.onerror = this.onLoadError.bind(this), t.src = e
				}, o.onImageComplete = function(t) {
					var i = this.getImage(t);
					if (i) {
						this.data = new e.BitmapData(i);
						var r = this;
						window.setTimeout(function() {
							r.dispatchEventWith(e.Event.COMPLETE)
						}, 0)
					}
				}, o.onLoadError = function(e) {
					var t = this.getImage(e);
					t && this.dispatchIOError(t.src)
				}, o.dispatchIOError = function(t) {
					var i = this;
					window.setTimeout(function() {
						i.dispatchEventWith(e.IOErrorEvent.IO_ERROR)
					}, 0)
				}, o.getImage = function(t) {
					var r = t.target,
						n = r.src;
					if (0 == n.indexOf("blob:")) try {
						i.revokeObjectURL(r.src)
					} catch (a) {
						e.$warn(1037)
					}
					return r.onerror = null, r.onload = null, this.currentImage !== r ? null : (this.currentImage = null, r)
				}, n.crossOrigin = null, n
			}(e.EventDispatcher);
		t.WebImageLoader = r, e.registerClass(r, "egret.web.WebImageLoader", ["egret.ImageLoader"]), e.ImageLoader = r
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		var i = function(i) {
				function r() {
					i.call(this), this._isNeedShow = !1, this.inputElement = null, this.inputDiv = null, this._gscaleX = 0, this._gscaleY = 0, this._isNeesHide = !1, this.textValue = "", this.colorValue = 16777215, this._styleInfoes = {}
				}
				__extends(r, i);
				var n = (__define, r),
					a = n.prototype;
				return a.$setTextField = function(e) {
					return this.$textfield = e, !0
				}, a.$addToStage = function() {
					this.htmlInput = e.web.$getTextAdapter(this.$textfield)
				}, a._initElement = function() {
					var t = this.$textfield.localToGlobal(0, 0),
						i = t.x,
						r = t.y,
						n = this.htmlInput.$scaleX,
						a = this.htmlInput.$scaleY;
					this.inputDiv.style.left = i * n + "px", this.inputDiv.style.top = r * a + "px", this.$textfield.multiline && this.$textfield.height > this.$textfield.size ? (this.inputDiv.style.top = r * a + "px", this.inputElement.style.top = -this.$textfield.lineSpacing / 2 * a + "px") : (this.inputDiv.style.top = r * a + "px", this.inputElement.style.top = "0px");
					for (var s = this.$textfield, o = 1, h = 1, l = 0; s.parent;) o *= s.scaleX, h *= s.scaleY, l += s.rotation, s = s.parent;
					var u = e.web.getPrefixStyleName("transform");
					this.inputDiv.style[u] = "rotate(" + l + "deg)", this._gscaleX = n * o, this._gscaleY = a * h
				}, a.$show = function() {
					this.htmlInput.isCurrentStageText(this) ? this.inputElement.onblur = null : (this.inputElement = this.htmlInput.getInputElement(this), this.$textfield.multiline ? this.inputElement.type = "text" : this.inputElement.type = this.$textfield.inputType, this.inputDiv = this.htmlInput._inputDIV), this.htmlInput._needShow = !0, this._isNeedShow = !0, this._initElement()
				}, a.onBlurHandler = function() {
					this.htmlInput.clearInputElement(), window.scrollTo(0, 0)
				}, a.executeShow = function() {
					this.inputElement.value = this.$getText(), null == this.inputElement.onblur && (this.inputElement.onblur = this.onBlurHandler.bind(this)), this.$resetStageText(), this.$textfield.maxChars > 0 ? this.inputElement.setAttribute("maxlength", this.$textfield.maxChars) : this.inputElement.removeAttribute("maxlength"), this.inputElement.selectionStart = this.inputElement.value.length, this.inputElement.selectionEnd = this.inputElement.value.length, this.inputElement.focus()
				}, a.$hide = function() {
					this._isNeesHide = !0, this.htmlInput && e.web.Html5Capatibility._System_OS == e.web.SystemOSType.IOS && this.htmlInput.disconnectStageText(this)
				}, a.$getText = function() {
					return this.textValue || (this.textValue = ""), this.textValue
				}, a.$setText = function(e) {
					return this.textValue = e, this.resetText(), !0
				}, a.resetText = function() {
					this.inputElement && (this.inputElement.value = this.textValue)
				}, a.$setColor = function(e) {
					return this.colorValue = e, this.resetColor(), !0
				}, a.resetColor = function() {
					this.inputElement && this.setElementStyle("color", e.toColorString(this.colorValue))
				}, a.$onBlur = function() {
					t.Html5Capatibility._System_OS == t.SystemOSType.WPHONE && e.Event.dispatchEvent(this, "updateText", !1)
				}, a._onInput = function() {
					var i = this;
					if (t.Html5Capatibility._System_OS == t.SystemOSType.WPHONE) {
						var r = this.$textfield.$TextField;
						null == r[35] && null == r[36] ? (i.textValue = i.inputElement.value, e.Event.dispatchEvent(i, "updateText", !1)) : window.setTimeout(function() {
							i.inputElement && i.inputElement.selectionStart && i.inputElement.selectionEnd && i.inputElement.selectionStart == i.inputElement.selectionEnd && (i.textValue = i.inputElement.value, e.Event.dispatchEvent(i, "updateText", !1))
						}, 0)
					} else window.setTimeout(function() {
						i.inputElement && i.inputElement.selectionStart == i.inputElement.selectionEnd && (i.textValue = i.inputElement.value, e.Event.dispatchEvent(i, "updateText", !1))
					}, 0)
				}, a.setAreaHeight = function() {
					var t = this.$textfield;
					if (t.multiline) {
						var i = e.TextFieldUtils.$getTextHeight(t);
						if (t.height <= t.size) this.setElementStyle("height", t.size * this._gscaleY + "px"), this.setElementStyle("padding", "0px"), this.setElementStyle("lineHeight", t.size * this._gscaleY + "px");
						else if (t.height < i) this.setElementStyle("height", t.height * this._gscaleY + "px"), this.setElementStyle("padding", "0px"), this.setElementStyle("lineHeight", (t.size + t.lineSpacing) * this._gscaleY + "px");
						else {
							this.setElementStyle("height", (i + t.lineSpacing) * this._gscaleY + "px");
							var r = (t.height - i) * this._gscaleY,
								n = e.TextFieldUtils.$getValign(t),
								a = r * n,
								s = r - a;
							this.setElementStyle("padding", a + "px 0px " + s + "px 0px"), this.setElementStyle("lineHeight", (t.size + t.lineSpacing) * this._gscaleY + "px")
						}
					}
				}, a._onClickHandler = function(t) {
					this._isNeedShow && (t.stopImmediatePropagation(), this._isNeedShow = !1, this.executeShow(), this.dispatchEvent(new e.Event("focus")))
				}, a._onDisconnect = function() {
					this.inputElement = null, this.dispatchEvent(new e.Event("blur"))
				}, a.setElementStyle = function(e, t) {
					this.inputElement && this._styleInfoes[e] != t && (this.inputElement.style[e] = t)
				}, a.$removeFromStage = function() {
					this.inputElement && this.htmlInput.disconnectStageText(this)
				}, a.$resetStageText = function() {
					if (this.inputElement) {
						var t = this.$textfield;
						this.setElementStyle("fontFamily", t.fontFamily), this.setElementStyle("fontStyle", t.italic ? "italic" : "normal"), this.setElementStyle("fontWeight", t.bold ? "bold" : "normal"), this.setElementStyle("textAlign", t.textAlign), this.setElementStyle("fontSize", t.size * this._gscaleY + "px"), this.setElementStyle("color", e.toColorString(t.textColor));
						var i = void 0;
						if (t.stage ? (i = t.localToGlobal(0, 0).x, i = Math.min(t.width, t.stage.stageWidth - i)) : i = t.width, this.setElementStyle("width", i * this._gscaleX + "px"), this.setElementStyle("verticalAlign", t.verticalAlign), t.multiline) this.setAreaHeight();
						else if (this.setElementStyle("lineHeight", t.size * this._gscaleY + "px"), t.height < t.size) {
							this.setElementStyle("height", t.size * this._gscaleY + "px");
							var r = t.size / 2 * this._gscaleY;
							this.setElementStyle("padding", "0px 0px " + r + "px 0px")
						} else {
							this.setElementStyle("height", t.size * this._gscaleY + "px");
							var n = (t.height - t.size) * this._gscaleY,
								a = e.TextFieldUtils.$getValign(t),
								s = n * a,
								r = n - s;
							r < t.size / 2 * this._gscaleY && (r = t.size / 2 * this._gscaleY), this.setElementStyle("padding", s + "px 0px " + r + "px 0px")
						}
						this.inputDiv.style.clip = "rect(0px " + t.width * this._gscaleX + "px " + t.height * this._gscaleY + "px 0px)", this.inputDiv.style.height = t.height * this._gscaleY + "px", this.inputDiv.style.width = i * this._gscaleX + "px"
					}
				}, r
			}(e.EventDispatcher);
		t.HTML5StageText = i, e.registerClass(i, "egret.web.HTML5StageText", ["egret.StageText"]), e.StageText = i
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		var i = function() {
				function t() {
					this._needShow = !1, this.$scaleX = 1, this.$scaleY = 1
				}
				var i = (__define, t),
					r = i.prototype;
				return r.isInputOn = function() {
					return null != this._stageText
				}, r.isCurrentStageText = function(e) {
					return this._stageText == e
				}, r.initValue = function(e) {
					e.style.position = "absolute", e.style.left = "0px", e.style.top = "0px", e.style.border = "none", e.style.padding = "0"
				}, r.$updateSize = function() {
					if (this.canvas) {
						var t = this.canvas.width,
							i = this.canvas.height,
							r = this.canvas.style.width.split("px")[0],
							n = this.canvas.style.height.split("px")[0];
						this.$scaleX = r / t, this.$scaleY = n / i, this.StageDelegateDiv.style.left = this.canvas.style.left, this.StageDelegateDiv.style.top = this.canvas.style.top;
						var a = e.web.getPrefixStyleName("transform");
						this.StageDelegateDiv.style[a] = this.canvas.style[a], this.StageDelegateDiv.style[e.web.getPrefixStyleName("transformOrigin")] = "0% 0% 0px"
					}
				}, r._initStageDelegateDiv = function(t, i) {
					this.canvas = i;
					var r, n = this;
					r || (r = document.createElement("div"), this.StageDelegateDiv = r, r.id = "StageDelegateDiv", t.appendChild(r), n.initValue(r), n._inputDIV = document.createElement("div"), n.initValue(n._inputDIV), n._inputDIV.style.width = "0px", n._inputDIV.style.height = "0px", n._inputDIV.style.left = "0px", n._inputDIV.style.top = "-100px", n._inputDIV.style[e.web.getPrefixStyleName("transformOrigin")] = "0% 0% 0px", r.appendChild(n._inputDIV), this.canvas.addEventListener("click", function(e) {
						n._needShow ? (n._needShow = !1, n._stageText._onClickHandler(e), n.show()) : n._inputElement && (n.clearInputElement(), n._inputElement.blur(), n._inputElement = null)
					}), n.initInputElement(!0), n.initInputElement(!1))
				}, r.initInputElement = function(e) {
					var t, i = this;
					e ? (t = document.createElement("textarea"), t.style.resize = "none", i._multiElement = t, t.id = "egretTextarea") : (t = document.createElement("input"), i._simpleElement = t, t.id = "egretInput"), t.type = "text", i._inputDIV.appendChild(t), t.setAttribute("tabindex", "-1"), t.style.width = "1px", t.style.height = "12px", i.initValue(t), t.style.outline = "thin", t.style.background = "none", t.style.overflow = "hidden", t.style.wordBreak = "break-all", t.style.opacity = 0, t.oninput = function() {
						i._stageText && i._stageText._onInput()
					}
				}, r.show = function() {
					var t = this,
						i = t._inputElement;
					e.$callAsync(function() {
						i.style.opacity = 1
					}, t)
				}, r.disconnectStageText = function(e) {
					(null == this._stageText || this._stageText == e) && (this.clearInputElement(), this._inputElement && this._inputElement.blur())
				}, r.clearInputElement = function() {
					var e = this;
					if (e._inputElement) {
						e._inputElement.value = "", e._inputElement.onblur = null, e._inputElement.style.width = "1px", e._inputElement.style.height = "12px", e._inputElement.style.left = "0px", e._inputElement.style.top = "0px", e._inputElement.style.opacity = 0;
						var t = void 0;
						t = e._simpleElement == e._inputElement ? e._multiElement : e._simpleElement, t.style.display = "block", e._inputDIV.style.left = "0px", e._inputDIV.style.top = "-100px", e._inputDIV.style.height = "0px", e._inputDIV.style.width = "0px"
					}
					e._stageText && (e._stageText._onDisconnect(), e._stageText = null, this.canvas.userTyping = !1)
				}, r.getInputElement = function(e) {
					var t = this;
					t.clearInputElement(), t._stageText = e, this.canvas.userTyping = !0, t._stageText.$textfield.multiline ? t._inputElement = t._multiElement : t._inputElement = t._simpleElement;
					var i;
					return i = t._simpleElement == t._inputElement ? t._multiElement : t._simpleElement, i.style.display = "none", t._inputElement
				}, t
			}();
		t.HTMLInput = i, e.registerClass(i, "egret.web.HTMLInput")
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(e) {
		function t(e) {
			var t = e.stage ? e.stage.$hashCode : 0,
				i = r[t],
				s = n[t],
				o = a[t];
			return s && o && (delete n[t], delete a[t]), i
		}
		function i(e, t, i, s) {
			e._initStageDelegateDiv(i, s), r[t.$hashCode] = e, n[t.$hashCode] = s, a[t.$hashCode] = i
		}
		var r = {},
			n = {},
			a = {};
		e.$getTextAdapter = t, e.$cacheTextAdapter = i
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		function i(e, t, i, a, s) {
			n || r();
			var o = "";
			return s && (o += "italic "), a && (o += "bold "), o += (i || 12) + "px ", o += t || "Arial", n.font = o, n.measureText(e).width
		}
		function r() {
			n = e.sys.canvasHitTestBuffer.context, n.textAlign = "left", n.textBaseline = "middle"
		}
		var n = null;
		e.sys.measureText = i
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		function i(e, t) {
			var i = document.createElement("canvas");
			isNaN(e) || isNaN(t) || (i.width = e, i.height = t);
			var r = i.getContext("2d");
			if (void 0 === r.imageSmoothingEnabled) {
				for (var n, a = ["webkitImageSmoothingEnabled", "mozImageSmoothingEnabled", "msImageSmoothingEnabled"], s = a.length - 1; s >= 0 && (n = a[s], void 0 === r[n]); s--);
				try {
					Object.defineProperty(r, "imageSmoothingEnabled", {
						get: function() {
							return this[n]
						},
						set: function(e) {
							this[n] = e
						}
					})
				} catch (o) {
					r.imageSmoothingEnabled = r[n]
				}
			}
			return i
		}
		var r, n = function() {
				function e(e, t, r) {
					this.surface = i(e, t), this.context = this.surface.getContext("2d")
				}
				var t = __define,
					n = e,
					a = n.prototype;
				return t(a, "width", function() {
					return this.surface.width
				}), t(a, "height", function() {
					return this.surface.height
				}), a.resize = function(e, t, i) {
					var r = this.surface;
					if (i) {
						var n = !1;
						r.width < e && (r.width = e, n = !0), r.height < t && (r.height = t, n = !0), n || (this.context.globalCompositeOperation = "source-over", this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.globalAlpha = 1)
					} else r.width != e && (r.width = e), r.height != t && (r.height = t);
					this.clear()
				}, a.resizeTo = function(e, t, n, a) {
					r || (r = i());
					var s = (this.context, this.surface),
						o = r,
						h = o.getContext("2d");
					r = s, this.context = h, this.surface = o, o.width = Math.max(e, 257), o.height = Math.max(t, 257), h.setTransform(1, 0, 0, 1, 0, 0), h.drawImage(s, n, a), s.height = 1, s.width = 1
				}, a.setDirtyRegionPolicy = function(e) {}, a.beginClip = function(e, t, i) {
					t = +t || 0, i = +i || 0;
					var r = this.context;
					r.save(), r.beginPath(), r.setTransform(1, 0, 0, 1, t, i);
					for (var n = e.length, a = 0; n > a; a++) {
						var s = e[a];
						r.clearRect(s.minX, s.minY, s.width, s.height), r.rect(s.minX, s.minY, s.width, s.height)
					}
					r.clip()
				}, a.endClip = function() {
					this.context.restore()
				}, a.getPixels = function(e, t, i, r) {
					return void 0 === i && (i = 1), void 0 === r && (r = 1), this.context.getImageData(e, t, i, r).data
				}, a.toDataURL = function(e, t) {
					return this.surface.toDataURL(e, t)
				}, a.clear = function() {
					this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.clearRect(0, 0, this.surface.width, this.surface.height)
				}, a.destroy = function() {
					this.surface.width = this.surface.height = 0
				}, e
			}();
		t.CanvasRenderBuffer = n, e.registerClass(n, "egret.web.CanvasRenderBuffer", ["egret.sys.RenderBuffer"])
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		var i = function(t) {
				function i(i, r) {
					var n = this;
					t.call(this), this.onTouchBegin = function(e) {
						var t = n.getLocation(e);
						n.touch.onTouchBegin(t.x, t.y, e.identifier)
					}, this.onTouchMove = function(e) {
						var t = n.getLocation(e);
						n.touch.onTouchMove(t.x, t.y, e.identifier)
					}, this.onTouchEnd = function(e) {
						var t = n.getLocation(e);
						n.touch.onTouchEnd(t.x, t.y, e.identifier)
					}, this.scaleX = 1, this.scaleY = 1, this.rotation = 0, this.canvas = r, this.touch = new e.sys.TouchHandler(i), this.addListeners()
				}
				__extends(i, t);
				var r = (__define, i),
					n = r.prototype;
				return n.addListeners = function() {
					var t = this;
					window.navigator.msPointerEnabled ? (this.canvas.addEventListener("MSPointerDown", function(e) {
						e.identifier = e.pointerId, t.onTouchBegin(e), t.prevent(e)
					}, !1), this.canvas.addEventListener("MSPointerMove", function(e) {
						e.identifier = e.pointerId, t.onTouchMove(e), t.prevent(e)
					}, !1), this.canvas.addEventListener("MSPointerUp", function(e) {
						e.identifier = e.pointerId, t.onTouchEnd(e), t.prevent(e)
					}, !1)) : (e.Capabilities.$isMobile || this.addMouseListener(), this.addTouchListener())
				}, n.addMouseListener = function() {
					this.canvas.addEventListener("mousedown", this.onTouchBegin), this.canvas.addEventListener("mousemove", this.onTouchMove), this.canvas.addEventListener("mouseup", this.onTouchEnd)
				}, n.addTouchListener = function() {
					var e = this;
					this.canvas.addEventListener("touchstart", function(t) {
						for (var i = t.changedTouches.length, r = 0; i > r; r++) e.onTouchBegin(t.changedTouches[r]);
						e.prevent(t)
					}, !1), this.canvas.addEventListener("touchmove", function(t) {
						for (var i = t.changedTouches.length, r = 0; i > r; r++) e.onTouchMove(t.changedTouches[r]);
						e.prevent(t)
					}, !1), this.canvas.addEventListener("touchend", function(t) {
						for (var i = t.changedTouches.length, r = 0; i > r; r++) e.onTouchEnd(t.changedTouches[r]);
						e.prevent(t)
					}, !1), this.canvas.addEventListener("touchcancel", function(t) {
						for (var i = t.changedTouches.length, r = 0; i > r; r++) e.onTouchEnd(t.changedTouches[r]);
						e.prevent(t)
					}, !1)
				}, n.prevent = function(e) {
					e.stopPropagation(), 1 == e.isScroll || this.canvas.userTyping || e.preventDefault()
				}, n.getLocation = function(t) {
					t.identifier = +t.identifier || 0;
					var i = document.documentElement,
						r = this.canvas.getBoundingClientRect(),
						n = r.left + window.pageXOffset - i.clientLeft,
						a = r.top + window.pageYOffset - i.clientTop,
						s = t.pageX - n,
						o = s,
						h = t.pageY - a,
						l = h;
					return 90 == this.rotation ? (o = h, l = r.width - s) : -90 == this.rotation && (o = r.height - h, l = s), o /= this.scaleX, l /= this.scaleY, e.$TempPoint.setTo(Math.round(o), Math.round(l))
				}, n.updateScaleMode = function(e, t, i) {
					this.scaleX = e, this.scaleY = t, this.rotation = i
				}, n.$updateMaxTouches = function() {
					this.touch.$initMaxTouches()
				}, i
			}(e.HashObject);
		t.WebTouchHandler = i, e.registerClass(i, "egret.web.WebTouchHandler")
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		var i = function(t) {
				function i(e) {
					t.call(this), this.isActivate = !0, this.stage = e, this.registerListener()
				}
				__extends(i, t);
				var r = (__define, i),
					n = r.prototype;
				return n.registerListener = function() {
					var t = this,
						i = function() {
							t.isActivate && (t.isActivate = !1, t.stage.dispatchEvent(new e.Event(e.Event.DEACTIVATE)))
						},
						r = function() {
							t.isActivate || (t.isActivate = !0, t.stage.dispatchEvent(new e.Event(e.Event.ACTIVATE)))
						},
						n = function() {
							document[a] ? i() : r()
						};
					window.addEventListener("focus", r, !1), window.addEventListener("blur", i, !1);
					var a, s;
					"undefined" != typeof document.hidden ? (a = "hidden", s = "visibilitychange") : "undefined" != typeof document.mozHidden ? (a = "mozHidden", s = "mozvisibilitychange") : "undefined" != typeof document.msHidden ? (a = "msHidden", s = "msvisibilitychange") : "undefined" != typeof document.webkitHidden ? (a = "webkitHidden", s = "webkitvisibilitychange") : "undefined" != typeof document.oHidden && (a = "oHidden", s = "ovisibilitychange"), "onpageshow" in window && "onpagehide" in window && (window.addEventListener("pageshow", r, !1), window.addEventListener("pagehide", i, !1)), a && s && document.addEventListener(s, n, !1);
					var o = navigator.userAgent,
						h = /micromessenger/gi.test(o),
						l = /mqq/gi.test(o),
						u = /mobile.*qq/gi.test(o);
					if ((u || h) && (l = !1), l) {
						var c = window.browser || {};
						c.execWebFn = c.execWebFn || {}, c.execWebFn.postX5GamePlayerMessage = function(e) {
							var t = e.type;
							"app_enter_background" == t ? i() : "app_enter_foreground" == t && r()
						}, window.browser = c
					}
				}, i
			}(e.HashObject);
		t.WebHideHandler = i, e.registerClass(i, "egret.web.WebHideHandler")
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		function i(e, t) {
			var i = "";
			if (null != t) i = r(e, t);
			else {
				if (null == o) {
					var n = document.createElement("div").style;
					o = r("transform", n)
				}
				i = o
			}
			return "" == i ? e : i + e.charAt(0).toUpperCase() + e.substring(1, e.length)
		}
		function r(e, t) {
			if (e in t) return "";
			e = e.charAt(0).toUpperCase() + e.substring(1, e.length);
			for (var i = ["webkit", "ms", "Moz", "O"], r = 0; r < i.length; r++) {
				var n = i[r] + e;
				if (n in t) return i[r]
			}
			return ""
		}
		var n = function() {
				function e() {}
				var t = (__define, e);
				t.prototype;
				return e.QQ_AUDIO = 1, e.WEB_AUDIO = 2, e.HTML5_AUDIO = 3, e
			}();
		t.AudioType = n, e.registerClass(n, "egret.web.AudioType");
		var a = function() {
				function e() {}
				var t = (__define, e);
				t.prototype;
				return e.WPHONE = 1, e.IOS = 2, e.ADNROID = 3, e
			}();
		t.SystemOSType = a, e.registerClass(a, "egret.web.SystemOSType");
		var s = function(t) {
				function i() {
					t.call(this)
				}
				__extends(i, t);
				var r = (__define, i);
				r.prototype;
				return i.$init = function() {
					var t = navigator.userAgent.toLowerCase();
					i.ua = t, e.Capabilities.$isMobile = -1 != t.indexOf("mobile") || -1 != t.indexOf("android"), i._canUseBlob = !1;
					var r, s = i._audioType,
						o = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
					if (1 == s || 2 == s || 3 == s ? (r = !1, i.setAudioType(s)) : (r = !0, i.setAudioType(n.HTML5_AUDIO)), t.indexOf("windows phone") >= 0) i._System_OS = a.WPHONE, e.Capabilities.$os = "Windows Phone";
					else if (t.indexOf("android") >= 0) {
						if (e.Capabilities.$os = "Android", i._System_OS = a.ADNROID, o ? i.setAudioType(n.WEB_AUDIO) : i.setAudioType(n.HTML5_AUDIO), window.hasOwnProperty("QZAppExternal") && t.indexOf("qzone") >= 0) {
							i.setAudioType(n.QQ_AUDIO);
							var h = document.getElementsByTagName("base");
							if (h && h.length > 0) i._QQRootPath = h[0].baseURI;
							else {
								var l = window.location.href.indexOf("?"); - 1 == l && (l = window.location.href.length);
								var u = window.location.href.substring(0, l);
								u = u.substring(0, u.lastIndexOf("/")), i._QQRootPath = u + "/"
							}
						}
					} else t.indexOf("iphone") >= 0 || t.indexOf("ipad") >= 0 || t.indexOf("ipod") >= 0 ? (e.Capabilities.$os = "iOS", i._System_OS = a.IOS, i.getIOSVersion() >= 7 && (i._canUseBlob = !0, i.setAudioType(n.WEB_AUDIO))) : -1 != t.indexOf("windows nt") ? e.Capabilities.$os = "Windows PC" : -1 != t.indexOf("mac os") && (e.Capabilities.$os = "Mac OS");
					var c = window.URL || window.webkitURL;
					c || (i._canUseBlob = !1), e.Sound = i._AudioClass
				}, i.setAudioType = function(t) {
					switch (i._audioType = t, t) {
					case n.QQ_AUDIO:
						i._AudioClass = e.web.QQSound;
						break;
					case n.WEB_AUDIO:
						i._AudioClass = e.web.WebAudioSound;
						break;
					case n.HTML5_AUDIO:
						i._AudioClass = e.web.HtmlSound
					}
				}, i.getIOSVersion = function() {
					var e = i.ua.toLowerCase().match(/cpu [^\d]*\d.*like mac os x/)[0];
					return parseInt(e.match(/\d+(_\d)*/)[0]) || 0
				}, i.checkHtml5Support = function() {
					var t = (navigator.language || navigator.browserLanguage).toLowerCase(),
						i = t.split("-");
					i.length > 1 && (i[1] = i[1].toUpperCase()), e.Capabilities.$language = i.join("-")
				}, i._canUseBlob = !1, i._audioType = 0, i._QQRootPath = "", i._System_OS = 0, i.ua = "", i
			}(e.HashObject);
		t.Html5Capatibility = s, e.registerClass(s, "egret.web.Html5Capatibility");
		var o = null;
		t.getPrefixStyleName = i, t.getPrefix = r
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		function i() {
			if (o) for (var e = document.querySelectorAll(".egret-player"), t = e.length, i = 0; t > i; i++) {
				var r = e[i],
					n = r["egret-player"];
				n.updateScreenSize()
			}
		}
		function r(i) {
			if (!o) {
				if (o = !0, i || (i = {}), t.Html5Capatibility._audioType = i.audioType, t.Html5Capatibility.$init(), "webgl" == i.renderMode) {
					var r = i.antialias;
					t.WebGLRenderContext.antialias = !! r
				}
				e.sys.CanvasRenderBuffer = t.CanvasRenderBuffer, n(i.renderMode);
				var s = e.sys.$ticker;
				a(s), i.screenAdapter ? e.sys.screenAdapter = i.screenAdapter : e.sys.screenAdapter || (e.sys.screenAdapter = new e.sys.DefaultScreenAdapter);
				for (var h = document.querySelectorAll(".egret-player"), l = h.length, u = 0; l > u; u++) {
					var c = h[u],
						d = new t.WebPlayer(c, i);
					c["egret-player"] = d, "webgl" == e.Capabilities.$renderMode && (d.stage.dirtyRegionPolicy = e.DirtyRegionPolicy.OFF)
				}
				"webgl" == e.Capabilities.$renderMode && (e.sys.DisplayList.prototype.setDirtyRegionPolicy = function() {})
			}
		}
		function n(i) {
			"webgl" == i && e.WebGLUtils.checkCanUseWebGL() ? (e.sys.RenderBuffer = t.WebGLRenderBuffer, e.sys.systemRenderer = new t.WebGLRenderer, e.sys.canvasRenderer = new e.CanvasRenderer, e.sys.customHitTestBuffer = new t.WebGLRenderBuffer(3, 3), e.sys.canvasHitTestBuffer = new t.CanvasRenderBuffer(3, 3), e.Capabilities.$renderMode = "webgl") : (e.sys.RenderBuffer = t.CanvasRenderBuffer, e.sys.systemRenderer = new e.CanvasRenderer, e.sys.canvasRenderer = e.sys.systemRenderer, e.sys.customHitTestBuffer = new t.CanvasRenderBuffer(3, 3), e.sys.canvasHitTestBuffer = e.sys.customHitTestBuffer, e.Capabilities.$renderMode = "canvas")
		}
		function a(e) {
			function t() {
				e.update(), i.call(window, t)
			}
			var i = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
			i || (i = function(e) {
				return window.setTimeout(e, 1e3 / 60)
			}), i.call(window, t)
		}
		function s() {
			h = 0 / 0, e.updateAllScreens()
		}
		var o = !1;
		window.isNaN = function(e) {
			return e = +e, e !== e
		}, e.runEgret = r, e.updateAllScreens = i;
		var h = 0 / 0;
		window.addEventListener("resize", function() {
			isNaN(h) && (h = window.setTimeout(s, 300))
		})
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var language, egret;
!
function(e) {
	var t;
	!
	function(t) {
		var i = function() {
				function t() {}
				var i = (__define, t);
				i.prototype;
				return t.detect = function() {
					var i = e.Capabilities,
						r = navigator.userAgent.toLowerCase();
					i.$isMobile = -1 != r.indexOf("mobile") || -1 != r.indexOf("android"), i.$isMobile ? r.indexOf("windows") < 0 && (-1 != r.indexOf("iphone") || -1 != r.indexOf("ipad") || -1 != r.indexOf("ipod")) ? i.$os = "iOS" : -1 != r.indexOf("android") && -1 != r.indexOf("linux") ? i.$os = "Android" : -1 != r.indexOf("windows") && (i.$os = "Windows Phone") : -1 != r.indexOf("windows nt") ? i.$os = "Windows PC" : -1 != r.indexOf("mac os") && (i.$os = "Mac OS");
					var n = (navigator.language || navigator.browserLanguage).toLowerCase(),
						a = n.split("-");
					a.length > 1 && (a[1] = a[1].toUpperCase()), i.$language = a.join("-"), t.injectUIntFixOnIE9()
				}, t.injectUIntFixOnIE9 = function() {
					if (/msie 9.0/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)) {
						var e = "<!-- IEBinaryToArray_ByteStr -->\r\n<script type='text/vbscript' language='VBScript'>\r\nFunction IEBinaryToArray_ByteStr(Binary)\r\n   IEBinaryToArray_ByteStr = CStr(Binary)\r\nEnd Function\r\nFunction IEBinaryToArray_ByteStr_Last(Binary)\r\n   Dim lastIndex\r\n   lastIndex = LenB(Binary)\r\n   if lastIndex mod 2 Then\r\n       IEBinaryToArray_ByteStr_Last = Chr( AscB( MidB( Binary, lastIndex, 1 ) ) )\r\n   Else\r\n       IEBinaryToArray_ByteStr_Last = \"\"\r\n   End If\r\nEnd Function\r\n</script>\r\n<!-- convertResponseBodyToText -->\r\n<script>\r\nlet convertResponseBodyToText = function (binary) {\r\n   let byteMapping = {};\r\n   for ( let i = 0; i < 256; i++ ) {\r\n       for ( let j = 0; j < 256; j++ ) {\r\n           byteMapping[ String.fromCharCode( i + j * 256 ) ] =\r\n           String.fromCharCode(i) + String.fromCharCode(j);\r\n       }\r\n   }\r\n   let rawBytes = IEBinaryToArray_ByteStr(binary);\r\n   let lastChr = IEBinaryToArray_ByteStr_Last(binary);\r\n   return rawBytes.replace(/[\\s\\S]/g,                           function( match ) { return byteMapping[match]; }) + lastChr;\r\n};\r\n</script>\r\n";
						document.write(e)
					}
				}, t
			}();
		t.WebCapability = i, e.registerClass(i, "egret.web.WebCapability"), i.detect()
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		var i = function(t) {
				function i(i, r, n, a, s) {
					if (t.call(this), this.showPanle = !0, this.fpsHeight = 0, this.WIDTH = 101, this.HEIGHT = 20, this.bgCanvasColor = "#18304b", this.fpsFrontColor = "#18fefe", this.WIDTH_COST = 33, this.cost1Color = "#18fefe", this.cost2Color = "#ffff00", this.cost3Color = "#ff0000", this.arrFps = [], this.arrCost = [], this.arrLog = [], r || n) {
						"canvas" == e.Capabilities.renderMode ? this.renderMode = "Canvas" : this.renderMode = "WebGL", this.panelX = void 0 === s.x ? 0 : parseInt(s.x), this.panelY = void 0 === s.y ? 0 : parseInt(s.y), this.fontColor = void 0 === s.textColor ? "#ffffff" : s.textColor.replace("0x", "#"), this.fontSize = void 0 === s.size ? 12 : parseInt(s.size), e.Capabilities.isMobile && (this.fontSize -= 2);
						var o = document.createElement("div");
						o.style.position = "absolute", o.style.background = "rgba(0,0,0," + s.bgAlpha + ")", o.style.left = this.panelX + "px", o.style.top = this.panelY + "px", o.style.pointerEvents = "none", document.body.appendChild(o);
						var h = document.createElement("div");
						h.style.color = this.fontColor, h.style.fontSize = this.fontSize + "px", h.style.lineHeight = this.fontSize + "px", h.style.margin = "4px 4px 4px 4px", this.container = h, o.appendChild(h), r && this.addFps(), n && this.addLog()
					}
				}
				__extends(i, t);
				var r = (__define, i),
					n = r.prototype;
				return n.addFps = function() {
					var e = document.createElement("div");
					e.style.display = "inline-block", this.containerFps = e, this.container.appendChild(e);
					var t = document.createElement("div");
					t.style.paddingBottom = "2px", this.fps = t, this.containerFps.appendChild(t), t.innerHTML = "0 FPS " + this.renderMode + "<br/>min0 max0 avg0";
					var i = document.createElement("canvas");
					this.containerFps.appendChild(i), i.width = this.WIDTH, i.height = this.HEIGHT, this.canvasFps = i;
					var r = i.getContext("2d");
					this.contextFps = r, r.fillStyle = this.bgCanvasColor, r.fillRect(0, 0, this.WIDTH, this.HEIGHT);
					var n = document.createElement("div");
					this.divDatas = n, this.containerFps.appendChild(n);
					var a = document.createElement("div");
					a.style["float"] = "left", a.innerHTML = "Draw<br/>Dirty<br/>Cost", n.appendChild(a);
					var s = document.createElement("div");
					s.style.paddingLeft = a.offsetWidth + 20 + "px", n.appendChild(s);
					var o = document.createElement("div");
					this.divDraw = o, o.innerHTML = "0<br/>0<br/>", s.appendChild(o);
					var h = document.createElement("div");
					this.divCost = h, h.innerHTML = '<font  style="color:' + this.cost1Color + '">0<font/> <font  style="color:' + this.cost2Color + '">0<font/> <font  style="color:' + this.cost3Color + '">0<font/>', s.appendChild(h), i = document.createElement("canvas"), this.canvasCost = i, this.containerFps.appendChild(i), i.width = this.WIDTH, i.height = this.HEIGHT, r = i.getContext("2d"), this.contextCost = r, r.fillStyle = this.bgCanvasColor, r.fillRect(0, 0, this.WIDTH, this.HEIGHT), r.fillStyle = "#000000", r.fillRect(this.WIDTH_COST, 0, 1, this.HEIGHT), r.fillRect(2 * this.WIDTH_COST + 1, 0, 1, this.HEIGHT), this.fpsHeight = this.container.offsetHeight
				}, n.addLog = function() {
					var e = document.createElement("div");
					e.style.maxWidth = document.body.clientWidth - 8 - this.panelX + "px", e.style.wordWrap = "break-word", this.log = e, this.container.appendChild(e)
				}, n.update = function(e, t) {
					void 0 === t && (t = !1);
					var i, r, n, a;
					t ? (i = this.arrFps[this.arrFps.length - 1], r = this.arrCost[this.arrCost.length - 1][0], n = this.arrCost[this.arrCost.length - 1][1], a = this.arrCost[this.arrCost.length - 1][2]) : (i = e.fps, r = e.costTicker, n = e.costDirty, a = e.costRender, this.lastNumDraw = e.draw, this.lastNumDirty = e.dirty, this.arrFps.push(i), this.arrCost.push([r, n, a]));
					var s = 0,
						o = this.arrFps.length;
					o > 101 && (o = 101, this.arrFps.shift());
					for (var h = this.arrFps[0], l = this.arrFps[0], u = 0; o > u; u++) {
						var c = this.arrFps[u];
						s += c, h > c ? h = c : c > l && (l = c)
					}
					var d = this.WIDTH,
						f = this.HEIGHT,
						p = this.contextFps;
					p.drawImage(this.canvasFps, 1, 0, d - 1, f, 0, 0, d - 1, f), p.fillStyle = this.bgCanvasColor, p.fillRect(d - 1, 0, 1, f);
					var v = Math.floor(i / 60 * 20);
					1 > v && (v = 1), p.fillStyle = this.fpsFrontColor, p.fillRect(d - 1, 20 - v, 1, v);
					var g = this.WIDTH_COST;
					p = this.contextCost, p.drawImage(this.canvasCost, 1, 0, g - 1, f, 0, 0, g - 1, f), p.drawImage(this.canvasCost, g + 2, 0, g - 1, f, g + 1, 0, g - 1, f), p.drawImage(this.canvasCost, 2 * g + 3, 0, g - 1, f, 2 * g + 2, 0, g - 1, f);
					var m = Math.floor(r / 2);
					1 > m ? m = 1 : m > 20 && (m = 20);
					var x = Math.floor(n / 2);
					1 > x ? x = 1 : x > 20 && (x = 20);
					var w = Math.floor(a / 2);
					1 > w ? w = 1 : w > 20 && (w = 20), p.fillStyle = this.bgCanvasColor, p.fillRect(g - 1, 0, 1, f), p.fillRect(2 * g, 0, 1, f), p.fillRect(3 * g + 1, 0, 1, f), p.fillStyle = this.cost1Color, p.fillRect(g - 1, 20 - m, 1, m), p.fillStyle = this.cost2Color, p.fillRect(2 * g, 20 - x, 1, x), p.fillStyle = this.cost3Color, p.fillRect(3 * g + 1, 20 - w, 1, w);
					var b = Math.floor(s / o),
						y = i + " FPS " + this.renderMode;
					this.showPanle && (y += "<br/>min" + h + " max" + l + " avg" + b, this.divDraw.innerHTML = this.lastNumDraw + "<br/>" + this.lastNumDirty + "%<br/>", this.divCost.innerHTML = '<font  style="color:#18fefe">' + r + '<font/> <font  style="color:#ffff00">' + n + '<font/> <font  style="color:#ff0000">' + a + "<font/>"), this.fps.innerHTML = y
				}, n.updateInfo = function(e) {
					for (this.arrLog.push(e), this.log.innerHTML = this.arrLog.join("<br/>"); document.body.clientHeight < this.log.offsetHeight + this.fpsHeight + this.panelY + 2 * this.fontSize;) this.arrLog.shift(), this.log.innerHTML = this.arrLog.join("<br/>")
				}, i
			}(e.DisplayObject);
		t.WebFps = i, e.registerClass(i, "egret.web.WebFps", ["egret.FPSDisplay"]), e.FPSDisplay = i
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		function i(e) {
			if (window.location) {
				var t = location.search;
				if ("" == t) return "";
				t = t.slice(1);
				for (var i = t.split("&"), r = i.length, n = 0; r > n; n++) {
					var a = i[n],
						s = a.split("=");
					if (s[0] == e) return s[1]
				}
			}
			return ""
		}
		t.getOption = i, e.getOption = i
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		var i = function(i) {
				function r(e, t) {
					i.call(this), this.init(e, t), this.initOrientation()
				}
				__extends(r, i);
				var n = (__define, r),
					a = n.prototype;
				return a.init = function(i, r) {
					var n = this.readOption(i, r),
						a = new e.Stage;
					a.$screen = this, a.$scaleMode = n.scaleMode, a.$orientation = n.orientation, a.$maxTouches = n.maxTouches, a.frameRate = n.frameRate, a.textureScaleFactor = n.textureScaleFactor;
					var s = new e.sys.RenderBuffer(void 0, void 0, !0),
						o = s.surface;
					this.attachCanvas(i, o);
					var h = new t.WebTouchHandler(a, o),
						l = new e.sys.Player(s, a, n.entryClassName),
						u = new e.web.WebHideHandler(a),
						c = new t.HTMLInput;
					l.showPaintRect(n.showPaintRect), (n.showFPS || n.showLog) && l.displayFPS(n.showFPS, n.showLog, n.logFilter, n.fpsStyles), this.playerOption = n, this.container = i, this.canvas = o, this.stage = a, this.player = l, this.webTouchHandler = h, this.webInput = c, this.webHide = u, e.web.$cacheTextAdapter(c, a, i, o), this.updateScreenSize(), this.updateMaxTouches(), l.start()
				}, a.initOrientation = function() {
					var t = this;
					window.addEventListener("orientationchange", function() {
						window.setTimeout(function() {
							e.StageOrientationEvent.dispatchStageOrientationEvent(t.stage, e.StageOrientationEvent.ORIENTATION_CHANGE)
						}, 350)
					})
				}, a.readOption = function(t, i) {
					var r = {};
					r.entryClassName = t.getAttribute("data-entry-class"), r.scaleMode = t.getAttribute("data-scale-mode") || e.StageScaleMode.NO_SCALE, r.frameRate = +t.getAttribute("data-frame-rate") || 30, r.contentWidth = +t.getAttribute("data-content-width") || 480, r.contentHeight = +t.getAttribute("data-content-height") || 800, r.orientation = t.getAttribute("data-orientation") || e.OrientationMode.AUTO, r.maxTouches = +t.getAttribute("data-multi-fingered") || 2, r.textureScaleFactor = +t.getAttribute("texture-scale-factor") || 1, "webgl" == i.renderMode ? r.showPaintRect = !1 : r.showPaintRect = "true" == t.getAttribute("data-show-paint-rect"), r.showFPS = "true" == t.getAttribute("data-show-fps");
					for (var n = t.getAttribute("data-show-fps-style") || "", a = n.split(","), s = {}, o = 0; o < a.length; o++) {
						var h = a[o].split(":");
						s[h[0]] = h[1]
					}
					return r.fpsStyles = s, r.showLog = "true" == t.getAttribute("data-show-log"), r.logFilter = t.getAttribute("data-log-filter"), r
				}, a.attachCanvas = function(e, t) {
					var i = t.style;
					i.cursor = "inherit", i.position = "absolute", i.top = "0", i.bottom = "0", i.left = "0", i.right = "0", e.appendChild(t), i = e.style, i.overflow = "hidden", i.position = "relative", i.webkitTransform = "translateZ(0)"
				}, a.updateScreenSize = function() {
					var t = this.canvas;
					if (!t.userTyping) {
						var i = this.playerOption,
							r = this.container.getBoundingClientRect(),
							n = !1,
							a = this.stage.$orientation;
						a != e.OrientationMode.AUTO && (n = a != e.OrientationMode.PORTRAIT && r.height > r.width || a == e.OrientationMode.PORTRAIT && r.width > r.height);
						var s = n ? r.height : r.width,
							o = n ? r.width : r.height;
						e.Capabilities.$boundingClientWidth = s, e.Capabilities.$boundingClientHeight = o;
						var h = e.sys.screenAdapter.calculateStageSize(this.stage.$scaleMode, s, o, i.contentWidth, i.contentHeight),
							l = h.stageWidth,
							u = h.stageHeight,
							c = h.displayWidth,
							d = h.displayHeight;
						t.width !== l && (t.width = l), t.height !== u && (t.height = u), t.style[e.web.getPrefixStyleName("transformOrigin")] = "0% 0% 0px", t.style.width = c + "px", t.style.height = d + "px";
						var f = 0;
						n ? a == e.OrientationMode.LANDSCAPE ? (f = 90, t.style.top = (r.height - c) / 2 + "px", t.style.left = (r.width + d) / 2 + "px") : (f = -90, t.style.top = (r.height + c) / 2 + "px", t.style.left = (r.width - d) / 2 + "px") : (t.style.top = (r.height - d) / 2 + "px", t.style.left = (r.width - c) / 2 + "px");
						var p = "rotate(" + f + "deg)";
						t.style[e.web.getPrefixStyleName("transform")] = p;
						var v = c / l,
							g = d / u;
						this.webTouchHandler.updateScaleMode(v, g, f), this.webInput.$updateSize(), this.player.updateStageSize(l, u)
					}
				}, a.setContentSize = function(e, t) {
					var i = this.playerOption;
					i.contentWidth = e, i.contentHeight = t, this.updateScreenSize()
				}, a.updateMaxTouches = function() {
					this.webTouchHandler.$updateMaxTouches()
				}, r
			}(e.HashObject);
		t.WebPlayer = i, e.registerClass(i, "egret.web.WebPlayer", ["egret.sys.Screen"])
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		function i(t, i) {
			o || (o = document.createElement("canvas"), h = o.getContext("2d"));
			var r = t.$getTextureWidth(),
				n = t.$getTextureHeight();
			null == i && (i = e.$TempRectangle, i.x = 0, i.y = 0, i.width = r, i.height = n), i.x = Math.min(i.x, r - 1), i.y = Math.min(i.y, n - 1), i.width = Math.min(i.width, r - i.x), i.height = Math.min(i.height, n - i.y);
			var a = i.width,
				s = i.height,
				l = o;
			if (l.style.width = a + "px", l.style.height = s + "px", o.width = a, o.height = s, "webgl" == e.Capabilities.$renderMode) {
				var u = void 0;
				t.$renderBuffer ? u = t : (u = new e.RenderTexture, u.drawToTexture(new e.Bitmap(t)));
				for (var c = u.$renderBuffer.getPixels(i.x, i.y, a, s), d = new ImageData(a, s), f = 0; f < c.length; f++) d.data[f] = c[f];
				return h.putImageData(d, 0, 0), t.$renderBuffer || u.dispose(), l
			}
			var p = t,
				v = Math.round(p._offsetX),
				g = Math.round(p._offsetY),
				m = p._bitmapWidth,
				x = p._bitmapHeight;
			return h.drawImage(p._bitmapData.source, p._bitmapX + i.x / e.$TextureScaleFactor, p._bitmapY + i.y / e.$TextureScaleFactor, m * i.width / r, x * i.height / n, v, g, i.width, i.height), l
		}
		function r(t, r) {
			try {
				var n = i(this, r),
					a = n.toDataURL(t);
				return a
			} catch (s) {
				e.$error(1033)
			}
			return null
		}
		function n(e, t, i) {
			var n = r.call(this, e, i);
			if (null != n) {
				var a = n.replace(/^data:image[^;]*/, "data:image/octet-stream"),
					s = document.createElement("a");
				s.download = t, s.href = a;
				var o = document.createEvent("HTMLEvents");
				o.initEvent("click", !1, !1), s.dispatchEvent(o)
			}
		}
		function a(t, i) {
			return e.$warn(1041, "getPixel32", "getPixels"), this.getPixels(t, i)
		}
		function s(t, r, n, a) {
			void 0 === n && (n = 1), void 0 === a && (a = 1);
			try {
				var s = (i(this), h.getImageData(t, r, n, a).data);
				return s
			} catch (o) {
				e.$error(1039)
			}
		}
		var o, h;
		e.Texture.prototype.toDataURL = r, e.Texture.prototype.saveToFile = n, e.Texture.prototype.getPixel32 = a, e.Texture.prototype.getPixels = s
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		function i(e) {
			for (var t = o.parseFromString(e, "text/xml"), i = t.childNodes.length, n = 0; i > n; n++) {
				var a = t.childNodes[n];
				if (1 == a.nodeType) return r(a, null)
			}
			return null
		}
		function r(e, t) {
			if ("parsererror" == e.localName) throw new Error(e.textContent);
			for (var i = new a(e.localName, t, e.prefix, e.namespaceURI, e.nodeName), n = e.attributes, o = i.attributes, h = n.length, l = 0; h > l; l++) {
				var u = n[l],
					c = u.name;
				0 != c.indexOf("xmlns:") && (o[c] = u.value, i["$" + c] = u.value)
			}
			var d = e.childNodes;
			h = d.length;
			for (var f = i.children, l = 0; h > l; l++) {
				var p = d[l],
					v = p.nodeType,
					g = null;
				if (1 == v) g = r(p, i);
				else if (3 == v) {
					var m = p.textContent.trim();
					m && (g = new s(m, i))
				}
				g && f.push(g)
			}
			return i
		}
		var n = function() {
				function e(e, t) {
					this.nodeType = e, this.parent = t
				}
				var t = (__define, e);
				t.prototype;
				return e
			}();
		t.XMLNode = n, e.registerClass(n, "egret.web.XMLNode");
		var a = function(e) {
				function t(t, i, r, n, a) {
					e.call(this, 1, i), this.attributes = {}, this.children = [], this.localName = t, this.prefix = r, this.namespace = n, this.name = a
				}
				__extends(t, e);
				var i = (__define, t);
				i.prototype;
				return t
			}(n);
		t.XML = a, e.registerClass(a, "egret.web.XML");
		var s = function(e) {
				function t(t, i) {
					e.call(this, 3, i), this.text = t
				}
				__extends(t, e);
				var i = (__define, t);
				i.prototype;
				return t
			}(n);
		t.XMLText = s, e.registerClass(s, "egret.web.XMLText");
		var o = new DOMParser;
		e.XML = {
			parse: i
		}
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		var i = function(t) {
				function i() {
					var i = this;
					t.apply(this, arguments), this.onChange = function(t) {
						var r = new e.OrientationEvent(e.Event.CHANGE);
						r.beta = t.beta, r.gamma = t.gamma, r.alpha = t.alpha, i.dispatchEvent(r)
					}
				}
				__extends(i, t);
				var r = (__define, i),
					n = r.prototype;
				return n.start = function() {
					window.addEventListener("deviceorientation", this.onChange)
				}, n.stop = function() {
					window.removeEventListener("deviceorientation", this.onChange)
				}, i
			}(e.EventDispatcher);
		t.WebDeviceOrientation = i, e.registerClass(i, "egret.web.WebDeviceOrientation", ["egret.DeviceOrientation"])
	}(t = e.web || (e.web = {}))
}(egret || (egret = {})), egret.DeviceOrientation = egret.web.WebDeviceOrientation;
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		var i = function(t) {
				function i(i) {
					var r = this;
					t.call(this), this.onUpdate = function(t) {
						var i = new e.GeolocationEvent(e.Event.CHANGE),
							n = t.coords;
						i.altitude = n.altitude, i.heading = n.heading, i.accuracy = n.accuracy, i.latitude = n.latitude, i.longitude = n.longitude, i.speed = n.speed, i.altitudeAccuracy = n.altitudeAccuracy, r.dispatchEvent(i)
					}, this.onError = function(t) {
						var i = e.GeolocationEvent.UNAVAILABLE;
						t.code == t.PERMISSION_DENIED && (i = e.GeolocationEvent.PERMISSION_DENIED);
						var n = new e.GeolocationEvent(e.IOErrorEvent.IO_ERROR);
						n.errorType = i, n.errorMessage = t.message, r.dispatchEvent(n)
					}, this.geolocation = navigator.geolocation
				}
				__extends(i, t);
				var r = (__define, i),
					n = r.prototype;
				return n.start = function() {
					var t = this.geolocation;
					t ? this.watchId = t.watchPosition(this.onUpdate, this.onError) : this.onError({
						code: 2,
						message: e.sys.tr(3004),
						PERMISSION_DENIED: 1,
						POSITION_UNAVAILABLE: 2
					})
				}, n.stop = function() {
					var e = this.geolocation;
					e.clearWatch(this.watchId)
				}, i
			}(e.EventDispatcher);
		t.WebGeolocation = i, e.registerClass(i, "egret.web.WebGeolocation", ["egret.Geolocation"]), e.Geolocation = e.web.WebGeolocation
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		var i = function(t) {
				function i() {
					var i = this;
					t.apply(this, arguments), this.onChange = function(t) {
						var r = new e.MotionEvent(e.Event.CHANGE),
							n = {
								x: t.acceleration.x,
								y: t.acceleration.y,
								z: t.acceleration.z
							},
							a = {
								x: t.accelerationIncludingGravity.x,
								y: t.accelerationIncludingGravity.y,
								z: t.accelerationIncludingGravity.z
							},
							s = {
								alpha: t.rotationRate.alpha,
								beta: t.rotationRate.beta,
								gamma: t.rotationRate.gamma
							};
						r.acceleration = n, r.accelerationIncludingGravity = a, r.rotationRate = s, i.dispatchEvent(r)
					}
				}
				__extends(i, t);
				var r = (__define, i),
					n = r.prototype;
				return n.start = function() {
					window.addEventListener("devicemotion", this.onChange)
				}, n.stop = function() {
					window.removeEventListener("devicemotion", this.onChange)
				}, i
			}(e.EventDispatcher);
		t.WebMotion = i, e.registerClass(i, "egret.web.WebMotion", ["egret.Motion"]), e.Motion = e.web.WebMotion
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(e) {}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		var i = function() {
				function t(e) {
					this.defaultVertexSrc = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec2 aColor;\nuniform vec2 projectionVector;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nconst vec2 center = vec2(-1.0, 1.0);\nvoid main(void) {\n   gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n   vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n}", this.fragmentSrc = "", this.gl = null, this.program = null, this.uniforms = {
						projectionVector: {
							type: "2f",
							value: {
								x: 0,
								y: 0
							},
							dirty: !0
						}
					}, this.gl = e
				}
				var i = (__define, t),
					r = i.prototype;
				return r.init = function() {
					var t = this.gl,
						i = e.WebGLUtils.compileProgram(t, this.defaultVertexSrc, this.fragmentSrc);
					t.useProgram(i), this.aVertexPosition = t.getAttribLocation(i, "aVertexPosition"), this.aTextureCoord = t.getAttribLocation(i, "aTextureCoord"), this.colorAttribute = t.getAttribLocation(i, "aColor"), -1 === this.colorAttribute && (this.colorAttribute = 2), this.attributes = [this.aVertexPosition, this.aTextureCoord, this.colorAttribute];
					for (var r in this.uniforms) this.uniforms[r].uniformLocation = t.getUniformLocation(i, r);
					this.initUniforms(), this.program = i
				}, r.initUniforms = function() {
					if (this.uniforms) {
						var e, t = this.gl;
						for (var i in this.uniforms) {
							e = this.uniforms[i], e.dirty = !0;
							var r = e.type;
							"mat2" === r || "mat3" === r || "mat4" === r ? (e.glMatrix = !0, e.glValueLength = 1, "mat2" === r ? e.glFunc = t.uniformMatrix2fv : "mat3" === r ? e.glFunc = t.uniformMatrix3fv : "mat4" === r && (e.glFunc = t.uniformMatrix4fv)) : (e.glFunc = t["uniform" + r], "2f" === r || "2i" === r ? e.glValueLength = 2 : "3f" === r || "3i" === r ? e.glValueLength = 3 : "4f" === r || "4i" === r ? e.glValueLength = 4 : e.glValueLength = 1)
						}
					}
				}, r.syncUniforms = function() {
					if (this.uniforms) {
						var e, t = this.gl;
						for (var i in this.uniforms) e = this.uniforms[i], e.dirty && (1 === e.glValueLength ? e.glMatrix === !0 ? e.glFunc.call(t, e.uniformLocation, e.transpose, e.value) : e.glFunc.call(t, e.uniformLocation, e.value) : 2 === e.glValueLength ? e.glFunc.call(t, e.uniformLocation, e.value.x, e.value.y) : 3 === e.glValueLength ? e.glFunc.call(t, e.uniformLocation, e.value.x, e.value.y, e.value.z) : 4 === e.glValueLength && e.glFunc.call(t, e.uniformLocation, e.value.x, e.value.y, e.value.z, e.value.w), e.dirty = !1)
					}
				}, r.setProjection = function(e, t) {
					var i = this.uniforms.projectionVector;
					(i.value.x != e || i.value.y != t) && (i.value.x = e, i.value.y = t, i.dirty = !0)
				}, r.setAttribPointer = function(e) {
					var t = this.gl;
					t.vertexAttribPointer(this.aVertexPosition, 2, t.FLOAT, !1, e, 0), t.vertexAttribPointer(this.aTextureCoord, 2, t.FLOAT, !1, e, 8), t.vertexAttribPointer(this.colorAttribute, 1, t.FLOAT, !1, e, 16)
				}, t
			}();
		t.EgretShader = i, e.registerClass(i, "egret.web.EgretShader")
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		var i = function(e) {
				function t() {
					e.apply(this, arguments), this.fragmentSrc = "precision lowp float;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nuniform sampler2D uSampler;\nvoid main(void) {\ngl_FragColor = texture2D(uSampler, vTextureCoord) * vColor;\n}"
				}
				__extends(t, e);
				var i = (__define, t);
				i.prototype;
				return t
			}(t.EgretShader);
		t.TextureShader = i, e.registerClass(i, "egret.web.TextureShader")
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		var i = function(e) {
				function t() {
					e.apply(this, arguments), this.fragmentSrc = "precision lowp float;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvoid main(void) {\ngl_FragColor = vColor;\n}"
				}
				__extends(t, e);
				var i = (__define, t);
				i.prototype;
				return t
			}(t.EgretShader);
		t.PrimitiveShader = i, e.registerClass(i, "egret.web.PrimitiveShader")
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		var i = function(e) {
				function t() {
					e.apply(this, arguments), this.fragmentSrc = "precision mediump float;uniform vec2 blur;uniform sampler2D uSampler;varying vec2 vTextureCoord;uniform vec2 uTextureSize;void main(){const int sampleRadius = 5;const int samples = sampleRadius * 2 + 1;vec2 blurUv = blur / uTextureSize;vec4 color = vec4(0, 0, 0, 0);vec2 uv = vec2(0.0, 0.0);blurUv /= float(sampleRadius);for (int i = -sampleRadius; i <= sampleRadius; i++) {uv.x = vTextureCoord.x + float(i) * blurUv.x;uv.y = vTextureCoord.y + float(i) * blurUv.y;color += texture2D(uSampler, uv);}color /= float(samples);gl_FragColor = color;}", this.uniforms = {
						projectionVector: {
							type: "2f",
							value: {
								x: 0,
								y: 0
							},
							dirty: !0
						},
						blur: {
							type: "2f",
							value: {
								x: 2,
								y: 2
							},
							dirty: !0
						},
						uTextureSize: {
							type: "2f",
							value: {
								x: 100,
								y: 100
							},
							dirty: !0
						}
					}
				}
				__extends(t, e);
				var i = (__define, t),
					r = i.prototype;
				return r.setBlur = function(e, t) {
					var i = this.uniforms.blur;
					(i.value.x != e || i.value.y != t) && (i.value.x = e, i.value.y = t, i.dirty = !0)
				}, r.setTextureSize = function(e, t) {
					var i = this.uniforms.uTextureSize;
					(e != i.value.x || t != i.value.y) && (i.value.x = e, i.value.y = t, i.dirty = !0)
				}, t
			}(t.TextureShader);
		t.BlurShader = i, e.registerClass(i, "egret.web.BlurShader")
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		var i = function(e) {
				function t() {
					e.apply(this, arguments), this.fragmentSrc = "precision mediump float;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nuniform mat4 matrix;\nuniform vec4 colorAdd;\nuniform sampler2D uSampler;\nvoid main(void) {\nvec4 texColor = texture2D(uSampler, vTextureCoord);\nif(texColor.a > 0.) {texColor = vec4(texColor.rgb / texColor.a, texColor.a);\n}vec4 locColor = clamp(texColor * matrix + colorAdd, 0., 1.);\ngl_FragColor = vColor * vec4(locColor.rgb * locColor.a, locColor.a);\n}", this.uniforms = {
						projectionVector: {
							type: "2f",
							value: {
								x: 0,
								y: 0
							},
							dirty: !0
						},
						matrix: {
							type: "mat4",
							value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
							dirty: !0
						},
						colorAdd: {
							type: "4f",
							value: {
								x: 0,
								y: 0,
								z: 0,
								w: 0
							},
							dirty: !0
						}
					}
				}
				__extends(t, e);
				var i = (__define, t),
					r = i.prototype;
				return r.setMatrix = function(e) {
					var t = this.uniforms.matrix;
					(t.value[0] != e[0] || t.value[0] != e[0] || t.value[1] != e[1] || t.value[2] != e[2] || t.value[3] != e[3] || t.value[4] != e[5] || t.value[5] != e[6] || t.value[6] != e[7] || t.value[7] != e[8] || t.value[8] != e[10] || t.value[9] != e[11] || t.value[10] != e[12] || t.value[11] != e[13] || t.value[12] != e[15] || t.value[13] != e[16] || t.value[14] != e[17] || t.value[15] != e[18]) && (t.value[0] = e[0], t.value[1] = e[1], t.value[2] = e[2], t.value[3] = e[3], t.value[4] = e[5], t.value[5] = e[6], t.value[6] = e[7], t.value[7] = e[8], t.value[8] = e[10], t.value[9] = e[11], t.value[10] = e[12], t.value[11] = e[13], t.value[12] = e[15], t.value[13] = e[16], t.value[14] = e[17], t.value[15] = e[18], t.dirty = !0);
					var i = this.uniforms.colorAdd;
					(i.value.x != e[4] / 255 || i.value.y != e[9] / 255 || i.value.z != e[14] / 255 || i.value.w != e[19] / 255) && (i.value.x = e[4] / 255, i.value.y = e[9] / 255, i.value.z = e[14] / 255, i.value.w = e[19] / 255, i.dirty = !0)
				}, t
			}(t.TextureShader);
		t.ColorTransformShader = i, e.registerClass(i, "egret.web.ColorTransformShader")
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		var i = function(e) {
				function t() {
					e.apply(this, arguments), this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "uniform sampler2D uSampler;", "uniform float distance;", "uniform float angle;", "uniform vec4 color;", "uniform float alpha;", "uniform float blurX;", "uniform float blurY;", "uniform float strength;", "uniform float inner;", "uniform float knockout;", "uniform float hideObject;", "uniform vec2 uTextureSize;vec2 px = vec2(1.0 / uTextureSize.x, 1.0 / uTextureSize.y);", "float random(vec3 scale, float seed)", "{", "return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);", "}", "void main(void) {", "const float linearSamplingTimes = 7.0;", "const float circleSamplingTimes = 12.0;", "vec4 ownColor = texture2D(uSampler, vTextureCoord);", "vec4 curColor;", "float totalAlpha = 0.0;", "float maxTotalAlpha = 0.0;", "float curDistanceX = 0.0;", "float curDistanceY = 0.0;", "float offsetX = distance * cos(angle) * px.x;", "float offsetY = distance * sin(angle) * px.y;", "const float PI = 3.14159265358979323846264;", "float cosAngle;", "float sinAngle;", "float offset = PI * 2.0 / circleSamplingTimes * random(vec3(12.9898, 78.233, 151.7182), 0.0);", "float stepX = blurX * px.x / linearSamplingTimes;", "float stepY = blurY * px.y / linearSamplingTimes;", "for (float a = 0.0; a <= PI * 2.0; a += PI * 2.0 / circleSamplingTimes) {", "cosAngle = cos(a + offset);", "sinAngle = sin(a + offset);", "for (float i = 1.0; i <= linearSamplingTimes; i++) {", "curDistanceX = i * stepX * cosAngle;", "curDistanceY = i * stepY * sinAngle;", "curColor = texture2D(uSampler, vec2(vTextureCoord.x + curDistanceX - offsetX, vTextureCoord.y + curDistanceY + offsetY));", "totalAlpha += (linearSamplingTimes - i) * curColor.a;", "maxTotalAlpha += (linearSamplingTimes - i);", "}", "}", "ownColor.a = max(ownColor.a, 0.0001);", "ownColor.rgb = ownColor.rgb / ownColor.a;", "float outerGlowAlpha = (totalAlpha / maxTotalAlpha) * strength * alpha * (1. - inner) * max(min(hideObject, knockout), 1. - ownColor.a);", "float innerGlowAlpha = ((maxTotalAlpha - totalAlpha) / maxTotalAlpha) * strength * alpha * inner * ownColor.a;", "ownColor.a = max(ownColor.a * knockout * (1. - hideObject), 0.0001);", "vec3 mix1 = mix(ownColor.rgb, color.rgb, innerGlowAlpha / (innerGlowAlpha + ownColor.a));", "vec3 mix2 = mix(mix1, color.rgb, outerGlowAlpha / (innerGlowAlpha + ownColor.a + outerGlowAlpha));", "float resultAlpha = min(ownColor.a + outerGlowAlpha + innerGlowAlpha, 1.);", "gl_FragColor = vec4(mix2 * resultAlpha, resultAlpha);", "}"].join("\n"), this.uniforms = {
						projectionVector: {
							type: "2f",
							value: {
								x: 0,
								y: 0
							},
							dirty: !0
						},
						distance: {
							type: "1f",
							value: 15,
							dirty: !0
						},
						angle: {
							type: "1f",
							value: 1,
							dirty: !0
						},
						color: {
							type: "4f",
							value: {
								x: 1,
								y: 0,
								z: 0,
								w: 0
							},
							dirty: !0
						},
						alpha: {
							type: "1f",
							value: 1,
							dirty: !0
						},
						blurX: {
							type: "1f",
							value: 1,
							dirty: !0
						},
						blurY: {
							type: "1f",
							value: 1,
							dirty: !0
						},
						strength: {
							type: "1f",
							value: 1,
							dirty: !0
						},
						inner: {
							type: "1f",
							value: 1,
							dirty: !0
						},
						knockout: {
							type: "1f",
							value: 1,
							dirty: !0
						},
						hideObject: {
							type: "1f",
							value: 0,
							dirty: !0
						},
						uTextureSize: {
							type: "2f",
							value: {
								x: 100,
								y: 100
							},
							dirty: !0
						}
					}
				}
				__extends(t, e);
				var i = (__define, t),
					r = i.prototype;
				return r.setDistance = function(e) {
					var t = this.uniforms.distance;
					t.value != e && (t.value = e, t.dirty = !0)
				}, r.setAngle = function(e) {
					var t = this.uniforms.angle;
					t.value != e && (t.value = e, t.dirty = !0)
				}, r.setColor = function(e, t, i) {
					var r = this.uniforms.color;
					(r.value.x != e || r.value.y != t || r.value.z != i) && (r.value.x = e, r.value.y = t, r.value.z = i, r.dirty = !0)
				}, r.setAlpha = function(e) {
					var t = this.uniforms.alpha;
					t.value != e && (t.value = e, t.dirty = !0)
				}, r.setBlurX = function(e) {
					var t = this.uniforms.blurX;
					t.value != e && (t.value = e, t.dirty = !0)
				}, r.setBlurY = function(e) {
					var t = this.uniforms.blurY;
					t.value != e && (t.value = e, t.dirty = !0)
				}, r.setStrength = function(e) {
					var t = this.uniforms.strength;
					t.value != e && (t.value = e, t.dirty = !0)
				}, r.setInner = function(e) {
					var t = this.uniforms.inner;
					t.value != e && (t.value = e, t.dirty = !0)
				}, r.setKnockout = function(e) {
					var t = this.uniforms.knockout;
					t.value != e && (t.value = e, t.dirty = !0)
				}, r.setHideObject = function(e) {
					var t = this.uniforms.hideObject;
					t.value != e && (t.value = e, t.dirty = !0)
				}, r.setTextureSize = function(e, t) {
					var i = this.uniforms.uTextureSize;
					(e != i.value.x || t != i.value.y) && (i.value.x = e, i.value.y = t, i.dirty = !0)
				}, t
			}(t.TextureShader);
		t.GlowShader = i, e.registerClass(i, "egret.web.GlowShader")
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		var i = function() {
				function e(e) {
					this.gl = null, this.maxAttibs = 10, this.attribState = [], this.tempAttribState = [], this.currentShader = null, this.defaultShader = null, this.primitiveShader = null, this.colorTransformShader = null, this.blurShader = null, this.glowShader = null;
					for (var t = 0; t < this.maxAttibs; t++) this.attribState[t] = !1;
					this.setContext(e)
				}
				var i = (__define, e),
					r = i.prototype;
				return r.setContext = function(e) {
					this.gl = e, this.primitiveShader = new t.PrimitiveShader(e), this.defaultShader = new t.TextureShader(e), this.colorTransformShader = new t.ColorTransformShader(e), this.glowShader = new t.GlowShader(e), this.blurShader = new t.BlurShader(e), this.primitiveShader.init(), this.defaultShader.init(), this.colorTransformShader.init(), this.blurShader.init(), this.glowShader.init()
				}, r.activateShader = function(e, t) {
					this.currentShader != e && (this.gl.useProgram(e.program), this.setAttribs(e.attributes), e.setAttribPointer(t), this.currentShader = e)
				}, r.setAttribs = function(e) {
					var t, i;
					for (i = this.tempAttribState.length, t = 0; i > t; t++) this.tempAttribState[t] = !1;
					for (i = e.length, t = 0; i > t; t++) {
						var r = e[t];
						this.tempAttribState[r] = !0
					}
					var n = this.gl;
					for (i = this.attribState.length, t = 0; i > t; t++) this.attribState[t] !== this.tempAttribState[t] && (this.attribState[t] = this.tempAttribState[t], this.tempAttribState[t] ? n.enableVertexAttribArray(t) : n.disableVertexAttribArray(t))
				}, e
			}();
		t.WebGLShaderManager = i, e.registerClass(i, "egret.web.WebGLShaderManager")
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		var i = function() {
				function e() {
					this.drawData = [], this.drawDataLen = 0
				}
				var t = (__define, e),
					i = t.prototype;
				return i.pushDrawRect = function() {
					if (0 == this.drawDataLen || 1 != this.drawData[this.drawDataLen - 1].type) {
						var e = this.drawData[this.drawDataLen] || {};
						e.type = 1, e.count = 0, this.drawData[this.drawDataLen] = e, this.drawDataLen++
					}
					this.drawData[this.drawDataLen - 1].count += 2
				}, i.pushDrawTexture = function(e, t, i, r, n) {
					if (void 0 === t && (t = 2), i) {
						var a = this.drawData[this.drawDataLen] || {};
						a.type = 0, a.texture = e, a.filter = i, a.count = t, a.textureWidth = r, a.textureHeight = n, this.drawData[this.drawDataLen] = a, this.drawDataLen++
					} else {
						if (0 == this.drawDataLen || 0 != this.drawData[this.drawDataLen - 1].type || e != this.drawData[this.drawDataLen - 1].texture || this.drawData[this.drawDataLen - 1].filter) {
							var a = this.drawData[this.drawDataLen] || {};
							a.type = 0, a.texture = e, a.count = 0, this.drawData[this.drawDataLen] = a, this.drawDataLen++
						}
						this.drawData[this.drawDataLen - 1].count += t
					}
				}, i.pushPushMask = function(e) {
					void 0 === e && (e = 1);
					var t = this.drawData[this.drawDataLen] || {};
					t.type = 2, t.count = 2 * e, this.drawData[this.drawDataLen] = t, this.drawDataLen++
				}, i.pushPopMask = function(e) {
					void 0 === e && (e = 1);
					var t = this.drawData[this.drawDataLen] || {};
					t.type = 3, t.count = 2 * e, this.drawData[this.drawDataLen] = t, this.drawDataLen++
				}, i.pushSetBlend = function(e) {
					for (var t = this.drawDataLen, i = !1, r = t - 1; r >= 0; r--) {
						var n = this.drawData[r];
						if (n) {
							if ((0 == n.type || 1 == n.type) && (i = !0), !i && 4 == n.type) {
								this.drawData.splice(r, 1), this.drawDataLen--;
								continue
							}
							if (4 == n.type) {
								if (n.value == e) return;
								break
							}
						}
					}
					var a = this.drawData[this.drawDataLen] || {};
					a.type = 4, a.value = e, this.drawData[this.drawDataLen] = a, this.drawDataLen++
				}, i.pushResize = function(e, t, i) {
					var r = this.drawData[this.drawDataLen] || {};
					r.type = 5, r.buffer = e, r.width = t, r.height = i, this.drawData[this.drawDataLen] = r, this.drawDataLen++
				}, i.pushClearColor = function() {
					var e = this.drawData[this.drawDataLen] || {};
					e.type = 6, this.drawData[this.drawDataLen] = e, this.drawDataLen++
				}, i.pushActivateBuffer = function(e) {
					for (var t = this.drawDataLen, i = !1, r = t - 1; r >= 0; r--) {
						var n = this.drawData[r];
						!n || (4 != n.type && 7 != n.type && (i = !0), i || 7 != n.type) || (this.drawData.splice(r, 1), this.drawDataLen--)
					}
					var a = this.drawData[this.drawDataLen] || {};
					a.type = 7, a.buffer = e, a.width = e.rootRenderTarget.width, a.height = e.rootRenderTarget.height, this.drawData[this.drawDataLen] = a, this.drawDataLen++
				}, i.pushEnableScissor = function(e, t, i, r) {
					var n = this.drawData[this.drawDataLen] || {};
					n.type = 8, n.x = e, n.y = t, n.width = i, n.height = r, this.drawData[this.drawDataLen] = n, this.drawDataLen++
				}, i.pushDisableScissor = function() {
					var e = this.drawData[this.drawDataLen] || {};
					e.type = 9, this.drawData[this.drawDataLen] = e, this.drawDataLen++
				}, i.clear = function() {
					for (var e = 0; e < this.drawDataLen; e++) {
						var t = this.drawData[e];
						t.type = 0, t.count = 0, t.texture = null, t.filter = null, t.uv = null, t.value = "", t.buffer = null, t.width = 0, t.height = 0
					}
					this.drawDataLen = 0
				}, e
			}();
		t.WebGLDrawCmdManager = i, e.registerClass(i, "egret.web.WebGLDrawCmdManager")
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		var i = function() {
				function e() {
					this.size = 2e3, this.vertexMaxSize = 4 * this.size, this.indicesMaxSize = 6 * this.size, this.vertSize = 5, this.vertices = null, this.indices = null, this.indicesForMesh = null, this.vertexIndex = 0, this.indexIndex = 0, this.hasMesh = !1;
					var e = this.vertexMaxSize * this.vertSize,
						t = this.indicesMaxSize;
					this.vertices = new Float32Array(e), this.indices = new Uint16Array(t), this.indicesForMesh = new Uint16Array(t);
					for (var i = 0, r = 0; t > i; i += 6, r += 4) this.indices[i + 0] = r + 0, this.indices[i + 1] = r + 1, this.indices[i + 2] = r + 2, this.indices[i + 3] = r + 0, this.indices[i + 4] = r + 2, this.indices[i + 5] = r + 3
				}
				var t = (__define, e),
					i = t.prototype;
				return i.reachMaxSize = function(e, t) {
					return void 0 === e && (e = 4), void 0 === t && (t = 6), this.vertexIndex > this.vertexMaxSize - e || this.indexIndex > this.indicesMaxSize - t
				}, i.getVertices = function() {
					var e = this.vertices.subarray(0, this.vertexIndex * this.vertSize);
					return e
				}, i.getIndices = function() {
					return this.indices
				}, i.getMeshIndices = function() {
					return this.indicesForMesh
				}, i.changeToMeshIndices = function() {
					if (!this.hasMesh) {
						for (var e = 0, t = this.indexIndex; t > e; ++e) this.indicesForMesh[e] = this.indices[e];
						this.hasMesh = !0
					}
				}, i.isMesh = function() {
					return this.hasMesh
				}, i.cacheArrays = function(e, t, i, r, n, a, s, o, h, l, u, c, d, f, p) {
					var v = e,
						g = v.a,
						m = v.b,
						x = v.c,
						w = v.d,
						b = v.tx,
						y = v.ty;
					(0 != s || 0 != o) && v.append(1, 0, 0, 1, s, o), (n / h != 1 || a / l != 1) && v.append(h / n, 0, 0, l / a, 0, 0);
					var T = v.a,
						E = v.b,
						S = v.c,
						C = v.d,
						_ = v.tx,
						R = v.ty;
					if (v.a = g, v.b = m, v.c = x, v.d = w, v.tx = b, v.ty = y, f) {
						var L = this.vertices,
							D = this.vertexIndex * this.vertSize,
							A = 0,
							M = 0,
							$ = 0,
							I = 0,
							B = 0,
							O = 0,
							F = 0;
						for (A = 0, $ = d.length; $ > A; A += 2) M = 5 * A / 2, O = f[A], F = f[A + 1], I = d[A], B = d[A + 1], L[D + M + 0] = T * O + S * F + _, L[D + M + 1] = E * O + C * F + R, L[D + M + 2] = (i + I * n) / u, L[D + M + 3] = (r + B * a) / c, L[D + M + 4] = t;
						if (this.hasMesh) for (var P = 0, W = p.length; W > P; ++P) this.indicesForMesh[this.indexIndex + P] = p[P] + this.vertexIndex;
						this.vertexIndex += d.length / 2, this.indexIndex += p.length
					} else {
						var H = u,
							G = c,
							k = n,
							U = a;
						i /= H, r /= G, n /= H, a /= G;
						var L = this.vertices,
							D = this.vertexIndex * this.vertSize;
						if (L[D++] = _, L[D++] = R, L[D++] = i, L[D++] = r, L[D++] = t, L[D++] = T * k + _, L[D++] = E * k + R, L[D++] = n + i, L[D++] = r, L[D++] = t, L[D++] = T * k + S * U + _, L[D++] = C * U + E * k + R, L[D++] = n + i, L[D++] = a + r, L[D++] = t, L[D++] = S * U + _, L[D++] = C * U + R, L[D++] = i, L[D++] = a + r, L[D++] = t, this.hasMesh) {
							var N = this.indicesForMesh;
							N[this.indexIndex + 0] = 0 + this.vertexIndex, N[this.indexIndex + 1] = 1 + this.vertexIndex, N[this.indexIndex + 2] = 2 + this.vertexIndex, N[this.indexIndex + 3] = 0 + this.vertexIndex, N[this.indexIndex + 4] = 2 + this.vertexIndex, N[this.indexIndex + 5] = 3 + this.vertexIndex
						}
						this.vertexIndex += 4, this.indexIndex += 6
					}
				}, i.clear = function() {
					this.hasMesh = !1, this.vertexIndex = 0, this.indexIndex = 0
				}, e
			}();
		t.WebGLVertexArrayObject = i, e.registerClass(i, "egret.web.WebGLVertexArrayObject")
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		var i = function(e) {
				function t(t, i, r) {
					e.call(this), this.clearColor = [0, 0, 0, 0], this.useFrameBuffer = !0, this.gl = t, this.width = i || 1, this.height = r || 1, this.texture = this.createTexture(), this.frameBuffer = t.createFramebuffer(), t.bindFramebuffer(t.FRAMEBUFFER, this.frameBuffer), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, this.texture, 0), this.stencilBuffer = t.createRenderbuffer(), t.bindRenderbuffer(t.RENDERBUFFER, this.stencilBuffer), t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_STENCIL, this.width, this.height), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_STENCIL_ATTACHMENT, t.RENDERBUFFER, this.stencilBuffer)
				}
				__extends(t, e);
				var i = (__define, t),
					r = i.prototype;
				return r.resize = function(e, t) {
					var i = this.gl;
					i.bindTexture(i.TEXTURE_2D, this.texture), i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, e, t, 0, i.RGBA, i.UNSIGNED_BYTE, null), i.bindFramebuffer(i.FRAMEBUFFER, this.frameBuffer), i.bindRenderbuffer(i.RENDERBUFFER, this.stencilBuffer), i.renderbufferStorage(i.RENDERBUFFER, i.DEPTH_STENCIL, e, t), this.width = e, this.height = t
				}, r.activate = function() {
					var e = this.gl;
					e.bindFramebuffer(e.FRAMEBUFFER, this.getFrameBuffer())
				}, r.getFrameBuffer = function() {
					return this.useFrameBuffer ? this.frameBuffer : null
				}, r.createTexture = function() {
					var e = this.gl,
						t = e.createTexture();
					return e.bindTexture(e.TEXTURE_2D, t), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, this.width, this.height, 0, e.RGBA, e.UNSIGNED_BYTE, null), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), t
				}, r.clear = function(e) {
					var t = this.gl;
					e && this.activate(), t.colorMask(!0, !0, !0, !0), t.clearColor(this.clearColor[0], this.clearColor[1], this.clearColor[2], this.clearColor[3]), t.clear(t.COLOR_BUFFER_BIT)
				}, t
			}(e.HashObject);
		t.WebGLRenderTarget = i, e.registerClass(i, "egret.web.WebGLRenderTarget")
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		function i(e, t) {
			var i = document.createElement("canvas");
			return isNaN(e) || isNaN(t) || (i.width = e, i.height = t), i
		}
		var r = function() {
				function r(e, r) {
					this.glID = null, this.projectionX = 0 / 0, this.projectionY = 0 / 0, this.shaderManager = null, this.contextLost = !1, this.$scissorState = !1, this.vertSize = 5, this.blurFilter = null, this.surface = i(e, r), this.initWebGL(), this.$bufferStack = [];
					var n = this.context;
					this.vertexBuffer = n.createBuffer(), this.indexBuffer = n.createBuffer(), n.bindBuffer(n.ARRAY_BUFFER, this.vertexBuffer), n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, this.indexBuffer), this.drawCmdManager = new t.WebGLDrawCmdManager, this.vao = new t.WebGLVertexArrayObject, this.setGlobalCompositeOperation("source-over")
				}
				var n = (__define, r),
					a = n.prototype;
				return r.getInstance = function(e, t) {
					return this.instance ? this.instance : (this.instance = new r(e, t), this.instance)
				}, a.pushBuffer = function(e) {
					this.$bufferStack.push(e), e != this.currentBuffer && (this.currentBuffer, this.drawCmdManager.pushActivateBuffer(e)), this.currentBuffer = e
				}, a.popBuffer = function() {
					if (!(this.$bufferStack.length <= 1)) {
						var e = this.$bufferStack.pop(),
							t = this.$bufferStack[this.$bufferStack.length - 1];
						e != t && this.drawCmdManager.pushActivateBuffer(t), this.currentBuffer = t
					}
				}, a.activateBuffer = function(e) {
					e.rootRenderTarget.activate(), this.bindIndices || (this.uploadIndicesArray(this.vao.getIndices()), this.bindIndices = !0), e.restoreStencil(), e.restoreScissor(), this.onResize(e.width, e.height)
				}, a.uploadVerticesArray = function(e) {
					var t = this.context;
					t.bufferData(t.ARRAY_BUFFER, e, t.STREAM_DRAW)
				}, a.uploadIndicesArray = function(e) {
					var t = this.context;
					t.bufferData(t.ELEMENT_ARRAY_BUFFER, e, t.STATIC_DRAW)
				}, a.destroy = function() {
					this.surface.width = this.surface.height = 0
				}, a.onResize = function(e, t) {
					e = e || this.surface.width, t = t || this.surface.height, this.projectionX = e / 2, this.projectionY = -t / 2, this.context && this.context.viewport(0, 0, e, t)
				}, a.resize = function(e, t, i) {
					var r = this.surface;
					i ? (r.width < e && (r.width = e), r.height < t && (r.height = t)) : (r.width != e && (r.width = e), r.height != t && (r.height = t)), this.onResize()
				}, a.initWebGL = function() {
					this.onResize(), this.surface.addEventListener("webglcontextlost", this.handleContextLost.bind(this), !1), this.surface.addEventListener("webglcontextrestored", this.handleContextRestored.bind(this), !1), this.getWebGLContext(), this.shaderManager = new t.WebGLShaderManager(this.context)
				}, a.handleContextLost = function() {
					this.contextLost = !0
				}, a.handleContextRestored = function() {
					this.initWebGL(), this.contextLost = !1
				}, a.getWebGLContext = function() {
					for (var t, i = {
						antialias: r.antialias,
						stencil: !0
					}, n = ["webgl", "experimental-webgl"], a = 0; a < n.length; a++) {
						try {
							t = this.surface.getContext(n[a], i)
						} catch (s) {}
						if (t) break
					}
					t || e.$error(1021), this.setContext(t)
				}, a.setContext = function(e) {
					this.context = e, e.id = r.glContextId++, this.glID = e.id, e.disable(e.DEPTH_TEST), e.disable(e.CULL_FACE), e.enable(e.BLEND), e.colorMask(!0, !0, !0, !0), e.activeTexture(e.TEXTURE0)
				}, a.enableStencilTest = function() {
					var e = this.context;
					e.enable(e.STENCIL_TEST)
				}, a.disableStencilTest = function() {
					var e = this.context;
					e.disable(e.STENCIL_TEST)
				}, a.enableScissorTest = function(e) {
					var t = this.context;
					t.enable(t.SCISSOR_TEST), t.scissor(e.x, e.y, e.width, e.height)
				}, a.disableScissorTest = function() {
					var e = this.context;
					e.disable(e.SCISSOR_TEST)
				}, a.getPixels = function(e, t, i, r, n) {
					var a = this.context;
					a.readPixels(e, t, i, r, a.RGBA, a.UNSIGNED_BYTE, n)
				}, a.createTexture = function(e) {
					var t = this.context,
						i = t.createTexture();
					return i ? (i.glContext = t, t.bindTexture(t.TEXTURE_2D, i), t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, e), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), i) : void(this.contextLost = !0)
				}, a.createTextureFromCompressedData = function(e, t, i, r, n) {
					return null
				}, a.updateTexture = function(e, t) {
					var i = this.context;
					i.bindTexture(i.TEXTURE_2D, e), i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, i.RGBA, i.UNSIGNED_BYTE, t)
				}, a.getWebGLTexture = function(e) {
					return e.webGLTexture || ("image" == e.format ? e.webGLTexture = this.createTexture(e.source) : "pvr" == e.format && (e.webGLTexture = this.createTextureFromCompressedData(e.source.pvrtcData, e.width, e.height, e.source.mipmapsCount, e.source.format)), e.$deleteSource && e.webGLTexture && (e.source = null)), e.webGLTexture
				}, a.clearRect = function(e, t, i, r) {
					if (0 != e || 0 != t || i != this.surface.width || r != this.surface.height) {
						var n = this.currentBuffer;
						if (n.$hasScissor) this.setGlobalCompositeOperation("destination-out"), this.drawRect(e, t, i, r), this.setGlobalCompositeOperation("source-over");
						else {
							var a = n.globalMatrix;
							0 == a.b && 0 == a.c ? (e = e * a.a + a.tx, t = t * a.d + a.ty, i *= a.a, r *= a.d, this.enableScissor(e, -t - r + n.height, i, r), this.clear(), this.disableScissor()) : (this.setGlobalCompositeOperation("destination-out"), this.drawRect(e, t, i, r), this.setGlobalCompositeOperation("source-over"))
						}
					} else this.clear()
				}, a.setGlobalCompositeOperation = function(e) {
					this.drawCmdManager.pushSetBlend(e)
				}, a.drawImage = function(e, t, i, r, n, a, s, o, h, l, u) {
					var c = this.currentBuffer;
					if (!this.contextLost && e && c) {
						var d;
						if (e.texture || e.source && e.source.texture) d = e.texture || e.source.texture, c.saveTransform(), c.transform(1, 0, 0, -1, 0, h + 2 * s);
						else {
							if (!e.source && !e.webGLTexture) return;
							d = this.getWebGLTexture(e)
						}
						d && (this.drawTexture(d, t, i, r, n, a, s, o, h, l, u), e.source && e.source.texture && c.restoreTransform())
					}
				}, a.drawMesh = function(e, t, i, r, n, a, s, o, h, l, u, c, d, f, p) {
					var v = this.currentBuffer;
					if (!this.contextLost && e && v) {
						var g;
						if (e.texture || e.source && e.source.texture) g = e.texture || e.source.texture, v.saveTransform(), v.transform(1, 0, 0, -1, 0, h + 2 * s);
						else {
							if (!e.source && !e.webGLTexture) return;
							g = this.getWebGLTexture(e)
						}
						g && this.drawTexture(g, t, i, r, n, a, s, o, h, l, u, c, d, f, p)
					}
				}, a.drawTexture = function(e, t, i, r, n, a, s, o, h, l, u, c, d, f, p) {
					var v = this.currentBuffer;
					if (!this.contextLost && e && v) {
						d && f ? this.vao.reachMaxSize(d.length / 2, f.length) && this.$drawWebGL() : this.vao.reachMaxSize() && this.$drawWebGL(), c && this.vao.changeToMeshIndices();
						var g = v.globalMatrix,
							m = v.globalAlpha,
							x = f ? f.length / 3 : 2;
						this.drawCmdManager.pushDrawTexture(e, x, this.$filter), this.vao.cacheArrays(g, m, t, i, r, n, a, s, o, h, l, u, c, d, f)
					}
				}, a.drawRect = function(e, t, i, r) {
					var n = this.currentBuffer;
					!this.contextLost && n && (this.vao.reachMaxSize() && this.$drawWebGL(), this.drawCmdManager.pushDrawRect(), this.vao.cacheArrays(n.globalMatrix, n.globalAlpha, 0, 0, i, r, e, t, i, r, i, r))
				}, a.pushMask = function(e) {
					var t = this.currentBuffer;
					if (!this.contextLost && t) {
						t.$stencilList.push(e), this.vao.reachMaxSize() && this.$drawWebGL();
						var i = e.length;
						if (i) {
							this.drawCmdManager.pushPushMask(i);
							for (var r = 0; i > r; r++) {
								var n = e[r];
								this.vao.cacheArrays(t.globalMatrix, t.globalAlpha, 0, 0, n.width, n.height, n.minX, n.minY, n.width, n.height, n.width, n.height)
							}
						} else this.drawCmdManager.pushPushMask(), this.vao.cacheArrays(t.globalMatrix, t.globalAlpha, 0, 0, e.width, e.height, e.x, e.y, e.width, e.height, e.width, e.height)
					}
				}, a.popMask = function() {
					var e = this.currentBuffer;
					if (!this.contextLost && e) {
						var t = e.$stencilList.pop();
						this.vao.reachMaxSize() && this.$drawWebGL();
						var i = t.length;
						if (i) {
							this.drawCmdManager.pushPopMask(i);
							for (var r = 0; i > r; r++) {
								var n = t[r];
								this.vao.cacheArrays(e.globalMatrix, e.globalAlpha, 0, 0, n.width, n.height, n.minX, n.minY, n.width, n.height, n.width, n.height)
							}
						} else this.drawCmdManager.pushPopMask(), this.vao.cacheArrays(e.globalMatrix, e.globalAlpha, 0, 0, t.width, t.height, t.x, t.y, t.width, t.height, t.width, t.height)
					}
				}, a.clear = function() {
					this.drawCmdManager.pushClearColor()
				}, a.enableScissor = function(e, t, i, r) {
					var n = this.currentBuffer;
					this.drawCmdManager.pushEnableScissor(e, t, i, r), n.$hasScissor = !0
				}, a.disableScissor = function() {
					var e = this.currentBuffer;
					this.drawCmdManager.pushDisableScissor(), e.$hasScissor = !1
				}, a.$drawWebGL = function() {
					if (0 != this.drawCmdManager.drawDataLen && !this.contextLost) {
						this.uploadVerticesArray(this.vao.getVertices()), this.vao.isMesh() && this.uploadIndicesArray(this.vao.getMeshIndices());
						for (var e = this.drawCmdManager.drawDataLen, t = 0, i = 0; e > i; i++) {
							var r = this.drawCmdManager.drawData[i];
							t = this.drawData(r, t), 7 == r.type && (this.activatedBuffer = r.buffer), (0 == r.type || 1 == r.type || 2 == r.type || 3 == r.type) && this.activatedBuffer && this.activatedBuffer.$computeDrawCall && this.activatedBuffer.$drawCalls++
						}
						this.vao.isMesh() && this.uploadIndicesArray(this.vao.getIndices()), this.drawCmdManager.clear(), this.vao.clear()
					}
				}, a.drawData = function(e, t) {
					if (e) {
						var i;
						switch (e.type) {
						case 0:
							var r = e.filter;
							r ? "colorTransform" == r.type ? (i = this.shaderManager.colorTransformShader, i.setMatrix(r.$matrix)) : "blur" == r.type ? (i = this.shaderManager.blurShader, i.setBlur(r.$blurX, r.$blurY), i.setTextureSize(e.textureWidth, e.textureHeight)) : "glow" == r.type && (i = this.shaderManager.glowShader, i.setDistance(r.$distance || 0), i.setAngle(r.$angle ? r.$angle / 180 * Math.PI : 0), i.setColor(r.$red / 255, r.$green / 255, r.$blue / 255), i.setAlpha(r.$alpha), i.setBlurX(r.$blurX), i.setBlurY(r.$blurY), i.setStrength(r.$strength), i.setInner(r.$inner ? 1 : 0), i.setKnockout(r.$knockout ? 0 : 1), i.setHideObject(r.$hideObject ? 1 : 0), i.setTextureSize(e.textureWidth, e.textureHeight)) : i = this.shaderManager.defaultShader, i.setProjection(this.projectionX, this.projectionY), this.shaderManager.activateShader(i, 4 * this.vertSize), i.syncUniforms(), t += this.drawTextureElements(e, t);
							break;
						case 1:
							i = this.shaderManager.primitiveShader, i.setProjection(this.projectionX, this.projectionY), this.shaderManager.activateShader(i, 4 * this.vertSize), i.syncUniforms(), t += this.drawRectElements(e, t);
							break;
						case 2:
							i = this.shaderManager.primitiveShader, i.setProjection(this.projectionX, this.projectionY), this.shaderManager.activateShader(i, 4 * this.vertSize), i.syncUniforms(), t += this.drawPushMaskElements(e, t);
							break;
						case 3:
							i = this.shaderManager.primitiveShader, i.setProjection(this.projectionX, this.projectionY), this.shaderManager.activateShader(i, 4 * this.vertSize), i.syncUniforms(), t += this.drawPopMaskElements(e, t);
							break;
						case 4:
							this.setBlendMode(e.value);
							break;
						case 5:
							e.buffer.rootRenderTarget.resize(e.width, e.height), this.onResize(e.width, e.height);
							break;
						case 6:
							if (this.activatedBuffer) {
								var n = this.activatedBuffer.rootRenderTarget;
								(0 != n.width || 0 != n.height) && n.clear()
							}
							break;
						case 7:
							this.activateBuffer(e.buffer);
							break;
						case 8:
							var a = this.activatedBuffer;
							a && a.enableScissor(e.x, e.y, e.width, e.height);
							break;
						case 9:
							a = this.activatedBuffer, a && a.disableScissor()
						}
						return t
					}
				}, a.drawTextureElements = function(e, t) {
					var i = this.context;
					i.bindTexture(i.TEXTURE_2D, e.texture);
					var r = 3 * e.count;
					return i.drawElements(i.TRIANGLES, r, i.UNSIGNED_SHORT, 2 * t), r
				}, a.drawRectElements = function(e, t) {
					var i = this.context,
						r = 3 * e.count;
					return i.drawElements(i.TRIANGLES, r, i.UNSIGNED_SHORT, 2 * t), r
				}, a.drawPushMaskElements = function(e, t) {
					var i = this.context,
						r = 3 * e.count,
						n = this.activatedBuffer;
					if (n) {
						0 == n.stencilHandleCount && (n.enableStencil(), i.clear(i.STENCIL_BUFFER_BIT));
						var a = n.stencilHandleCount;
						n.stencilHandleCount++, i.colorMask(!1, !1, !1, !1), i.stencilFunc(i.EQUAL, a, 255), i.stencilOp(i.KEEP, i.KEEP, i.INCR), i.drawElements(i.TRIANGLES, r, i.UNSIGNED_SHORT, 2 * t), i.stencilFunc(i.EQUAL, a + 1, 255), i.colorMask(!0, !0, !0, !0), i.stencilOp(i.KEEP, i.KEEP, i.KEEP)
					}
					return r
				}, a.drawPopMaskElements = function(e, t) {
					var i = this.context,
						r = 3 * e.count,
						n = this.activatedBuffer;
					if (n) if (n.stencilHandleCount--, 0 == n.stencilHandleCount) n.disableStencil();
					else {
						var a = n.stencilHandleCount;
						i.colorMask(!1, !1, !1, !1), i.stencilFunc(i.EQUAL, a + 1, 255), i.stencilOp(i.KEEP, i.KEEP, i.DECR), i.drawElements(i.TRIANGLES, r, i.UNSIGNED_SHORT, 2 * t), i.stencilFunc(i.EQUAL, a, 255), i.colorMask(!0, !0, !0, !0), i.stencilOp(i.KEEP, i.KEEP, i.KEEP)
					}
					return r
				}, a.setBlendMode = function(e) {
					var t = this.context,
						i = r.blendModesForGL[e];
					i && t.blendFunc(i[0], i[1])
				}, a.drawTargetWidthFilters = function(e, i) {
					var r, n = i,
						a = e.length;
					if (a > 1) for (var s = 0; a - 1 > s; s++) {
						var o = e[s],
							h = i.rootRenderTarget.width,
							l = i.rootRenderTarget.height;
						r = t.WebGLRenderBuffer.create(h, l), r.setTransform(1, 0, 0, 1, 0, 0), r.globalAlpha = 1, this.drawToRenderTarget(o, i, r), i != n && t.WebGLRenderBuffer.release(i), i = r
					}
					var u = e[a - 1];
					this.drawToRenderTarget(u, i, this.currentBuffer), i != n && t.WebGLRenderBuffer.release(i)
				}, a.drawToRenderTarget = function(i, r, n) {
					if (!this.contextLost) {
						this.vao.reachMaxSize() && this.$drawWebGL(), this.pushBuffer(n);
						var a, s = r,
							o = r.rootRenderTarget.width,
							h = r.rootRenderTarget.height;
						"blur" == i.type && (this.blurFilter || (this.blurFilter = new e.BlurFilter(2, 2)), 0 != i.blurX && 0 != i.blurY ? (this.blurFilter.blurX = i.blurX, this.blurFilter.blurY = 0, a = t.WebGLRenderBuffer.create(o, h), a.setTransform(1, 0, 0, 1, 0, 0), a.globalAlpha = 1, this.drawToRenderTarget(this.blurFilter, r, a), r != s && t.WebGLRenderBuffer.release(r), r = a, this.blurFilter.blurX = 0, this.blurFilter.blurY = i.blurY) : (this.blurFilter.blurX = i.blurX, this.blurFilter.blurY = i.blurY), i = this.blurFilter), n.saveTransform(), n.transform(1, 0, 0, -1, 0, h), this.vao.cacheArrays(n.globalMatrix, n.globalAlpha, 0, 0, o, h, 0, 0, o, h, o, h), n.restoreTransform();
						var l;
						l = "blur" == i.type ? {
							type: "blur",
							$blurX: i.$blurX,
							$blurY: i.$blurY
						} : i, this.drawCmdManager.pushDrawTexture(r.rootRenderTarget.texture, 2, l, o, h), r != s && t.WebGLRenderBuffer.release(r), this.popBuffer()
					}
				}, r.initBlendMode = function() {
					r.blendModesForGL = {}, r.blendModesForGL["source-over"] = [1, 771], r.blendModesForGL.lighter = [1, 1], r.blendModesForGL["lighter-in"] = [770, 771], r.blendModesForGL["destination-out"] = [0, 771], r.blendModesForGL["destination-in"] = [0, 770]
				}, r.glContextId = 0, r.blendModesForGL = null, r
			}();
		t.WebGLRenderContext = r, e.registerClass(r, "egret.web.WebGLRenderContext"), r.initBlendMode()
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		var i = function(i) {
				function n(r, n, a) {
					if (i.call(this), this.globalAlpha = 1, this.stencilState = !1, this.$stencilList = [], this.stencilHandleCount = 0, this.$scissorState = !1, this.scissorRect = new e.Rectangle, this.$hasScissor = !1, this.dirtyRegionPolicy = !0, this._dirtyRegionPolicy = !0, this.$drawCalls = 0, this.$computeDrawCall = !1, this.globalMatrix = new e.Matrix, this.savedGlobalMatrix = new e.Matrix, this.context = t.WebGLRenderContext.getInstance(r, n), this.rootRenderTarget = new t.WebGLRenderTarget(this.context.context, 3, 3), r && n && this.resize(r, n), this.root = a, this.root) this.context.pushBuffer(this), this.surface = this.context.surface;
					else {
						var s = this.context.activatedBuffer;
						s && s.rootRenderTarget.activate(), this.surface = this.rootRenderTarget
					}
				}
				__extends(n, i);
				var a = __define,
					s = n,
					o = s.prototype;
				return o.enableStencil = function() {
					this.stencilState || (this.context.enableStencilTest(), this.stencilState = !0)
				}, o.disableStencil = function() {
					this.stencilState && (this.context.disableStencilTest(), this.stencilState = !1)
				}, o.restoreStencil = function() {
					this.stencilState ? this.context.enableStencilTest() : this.context.disableStencilTest()
				}, o.enableScissor = function(e, t, i, r) {
					this.$scissorState || (this.$scissorState = !0, this.scissorRect.setTo(e, t, i, r), this.context.enableScissorTest(this.scissorRect))
				}, o.disableScissor = function() {
					this.$scissorState && (this.$scissorState = !1, this.scissorRect.setEmpty(), this.context.disableScissorTest())
				}, o.restoreScissor = function() {
					this.$scissorState ? this.context.enableScissorTest(this.scissorRect) : this.context.disableScissorTest()
				}, a(o, "width", function() {
					return this.rootRenderTarget.width
				}), a(o, "height", function() {
					return this.rootRenderTarget.height
				}), o.resize = function(e, t, i) {
					this.context.pushBuffer(this), e = e || 1, t = t || 1, (e != this.rootRenderTarget.width || t != this.rootRenderTarget.height) && (this.context.drawCmdManager.pushResize(this, e, t), this.rootRenderTarget.width = e, this.rootRenderTarget.height = t), this.root && this.context.resize(e, t, i), this.context.clear(), this.context.popBuffer()
				}, o.resizeTo = function(e, t, i, r) {
					this.context.pushBuffer(this);
					var a = this.rootRenderTarget.width,
						s = this.rootRenderTarget.height,
						o = n.create(a, s);
					this.context.pushBuffer(o), this.context.drawImage(this.rootRenderTarget, 0, 0, a, s, 0, 0, a, s, a, s), this.context.popBuffer(), this.resize(e, t), this.setTransform(1, 0, 0, 1, 0, 0), this.context.drawImage(o.rootRenderTarget, 0, 0, a, s, i, r, a, s, a, s), n.release(o), this.context.popBuffer()
				}, o.setDirtyRegionPolicy = function(e) {
					this.dirtyRegionPolicy = "on" == e
				}, o.beginClip = function(e, t, i) {
					this.context.pushBuffer(this), this.root && (this._dirtyRegionPolicy ? (this.rootRenderTarget.useFrameBuffer = !0, this.rootRenderTarget.activate()) : (this.rootRenderTarget.useFrameBuffer = !1, this.rootRenderTarget.activate(), this.context.clear())), t = +t || 0, i = +i || 0, this.setTransform(1, 0, 0, 1, t, i);
					var r = e.length;
					if (1 == r && 0 == e[0].minX && 0 == e[0].minY && e[0].width == this.rootRenderTarget.width && e[0].height == this.rootRenderTarget.height) return this.maskPushed = !1, this.rootRenderTarget.useFrameBuffer && this.context.clear(), void this.context.popBuffer();
					for (var n = 0; r > n; n++) {
						var a = e[n];
						this.context.clearRect(a.minX, a.minY, a.width, a.height)
					}
					if (r > 0) {
						if (this.$hasScissor || 1 != r) this.scissorEnabled = !1;
						else {
							var a = e[0];
							e = e.slice(1);
							var s = a.minX + t,
								o = a.minY + i,
								h = a.width,
								l = a.height;
							this.context.enableScissor(s, -o - l + this.height, h, l), this.scissorEnabled = !0
						}
						e.length > 0 ? (this.context.pushMask(e), this.maskPushed = !0) : this.maskPushed = !1, this.offsetX = t, this.offsetY = i
					} else this.maskPushed = !1;
					this.context.popBuffer()
				}, o.endClip = function() {
					(this.maskPushed || this.scissorEnabled) && (this.context.pushBuffer(this), this.maskPushed && (this.setTransform(1, 0, 0, 1, this.offsetX, this.offsetY), this.context.popMask()), this.scissorEnabled && this.context.disableScissor(), this.context.popBuffer())
				}, o.getPixels = function(e, t, i, r) {
					void 0 === i && (i = 1), void 0 === r && (r = 1);
					var n = new Uint8Array(4 * i * r),
						a = this.rootRenderTarget.useFrameBuffer;
					this.rootRenderTarget.useFrameBuffer = !0, this.rootRenderTarget.activate(), this.context.getPixels(e, t, i, r, n), this.rootRenderTarget.useFrameBuffer = a, this.rootRenderTarget.activate();
					for (var s = new Uint8Array(4 * i * r), o = 0; r > o; o++) for (var h = 0; i > h; h++) s[4 * (i * (r - o - 1) + h)] = n[4 * (i * o + h)], s[4 * (i * (r - o - 1) + h) + 1] = n[4 * (i * o + h) + 1], s[4 * (i * (r - o - 1) + h) + 2] = n[4 * (i * o + h) + 2], s[4 * (i * (r - o - 1) + h) + 3] = n[4 * (i * o + h) + 3];
					return s
				}, o.toDataURL = function(e, t) {
					return this.context.surface.toDataURL(e, t)
				}, o.destroy = function() {
					this.context.destroy()
				}, o.onRenderFinish = function() {
					this.$drawCalls = 0, this.root && (!this._dirtyRegionPolicy && this.dirtyRegionPolicy && this.drawSurfaceToFrameBuffer(0, 0, this.rootRenderTarget.width, this.rootRenderTarget.height, 0, 0, this.rootRenderTarget.width, this.rootRenderTarget.height, !0), this._dirtyRegionPolicy && this.drawFrameBufferToSurface(0, 0, this.rootRenderTarget.width, this.rootRenderTarget.height, 0, 0, this.rootRenderTarget.width, this.rootRenderTarget.height), this._dirtyRegionPolicy = this.dirtyRegionPolicy)
				}, o.drawFrameBufferToSurface = function(e, t, i, r, n, a, s, o, h) {
					void 0 === h && (h = !1), this.rootRenderTarget.useFrameBuffer = !1, this.rootRenderTarget.activate(), this.context.disableStencilTest(), this.context.disableScissorTest(), this.setTransform(1, 0, 0, 1, 0, 0), this.globalAlpha = 1, this.context.setGlobalCompositeOperation("source-over"), h && this.context.clear(), this.context.drawImage(this.rootRenderTarget, e, t, i, r, n, a, s, o, i, r), this.context.$drawWebGL(), this.rootRenderTarget.useFrameBuffer = !0, this.rootRenderTarget.activate(), this.restoreStencil(), this.restoreScissor()
				}, o.drawSurfaceToFrameBuffer = function(e, t, i, r, n, a, s, o, h) {
					void 0 === h && (h = !1), this.rootRenderTarget.useFrameBuffer = !0, this.rootRenderTarget.activate(), this.context.disableStencilTest(), this.context.disableScissorTest(), this.setTransform(1, 0, 0, 1, 0, 0), this.globalAlpha = 1, this.context.setGlobalCompositeOperation("source-over"), h && this.context.clear(), this.context.drawImage(this.context.surface, e, t, i, r, n, a, s, o, i, r), this.context.$drawWebGL(), this.rootRenderTarget.useFrameBuffer = !1, this.rootRenderTarget.activate(), this.restoreStencil(), this.restoreScissor()
				}, o.clear = function() {
					this.context.clear()
				}, o.setTransform = function(e, t, i, r, n, a) {
					var s = this.globalMatrix;
					s.a = e, s.b = t, s.c = i, s.d = r, s.tx = n, s.ty = a
				}, o.transform = function(e, t, i, r, n, a) {
					var s = this.globalMatrix,
						o = s.a,
						h = s.b,
						l = s.c,
						u = s.d;
					(1 != e || 0 != t || 0 != i || 1 != r) && (s.a = e * o + t * l, s.b = e * h + t * u, s.c = i * o + r * l, s.d = i * h + r * u), s.tx = n * o + a * l + s.tx, s.ty = n * h + a * u + s.ty
				}, o.translate = function(e, t) {
					var i = this.globalMatrix;
					i.tx += e, i.ty += t
				}, o.saveTransform = function() {
					var e = this.globalMatrix,
						t = this.savedGlobalMatrix;
					t.a = e.a, t.b = e.b, t.c = e.c, t.d = e.d, t.tx = e.tx, t.ty = e.ty
				}, o.restoreTransform = function() {
					var e = this.globalMatrix,
						t = this.savedGlobalMatrix;
					e.a = t.a, e.b = t.b, e.c = t.c, e.d = t.d, e.tx = t.tx, e.ty = t.ty
				}, n.create = function(e, t) {
					var i = r.pop();
					if (i) {
						i.resize(e, t);
						var a = i.globalMatrix;
						a.a = 1, a.b = 0, a.c = 0, a.d = 1, a.tx = 0, a.ty = 0
					} else i = new n(e, t), i.$computeDrawCall = !1;
					return i
				}, n.release = function(e) {
					r.push(e)
				}, n
			}(e.HashObject);
		t.WebGLRenderBuffer = i, e.registerClass(i, "egret.web.WebGLRenderBuffer", ["egret.sys.RenderBuffer"]);
		var r = []
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!
function(e) {
	var t;
	!
	function(t) {
		var i = ["source-over", "lighter", "destination-out"],
			r = "source-over",
			n = [],
			a = function() {
				function a() {
					this.nestLevel = 0
				}
				var s = (__define, a),
					o = s.prototype;
				return o.render = function(e, t, i, r, a) {
					this.nestLevel++;
					var s = t,
						o = s.context,
						h = a ? e : null;
					o.pushBuffer(s), this.drawDisplayObject(e, s, r, i, null, null, h), o.$drawWebGL();
					var l = s.$drawCalls;
					if (s.onRenderFinish(), o.popBuffer(), this.nestLevel--, 0 === this.nestLevel) {
						n.length > 6 && (n.length = 6);
						for (var u = n.length, c = 0; u > c; c++) n[c].resize(0, 0)
					}
					return l
				}, o.drawDisplayObject = function(t, i, r, n, a, s, o) {
					var h, l = 0;
					if (a && !o ? (a.isDirty && (l += a.drawToSurface()), h = a.$renderNode) : h = t.$getRenderNode(), h) {
						if (r) {
							var u = h.renderRegion;
							if (s && !s.intersects(u)) h.needRedraw = !1;
							else if (!h.needRedraw) for (var c = r.length, d = 0; c > d; d++) if (u.intersects(r[d])) {
								h.needRedraw = !0;
								break
							}
						} else h.needRedraw = !0;
						if (h.needRedraw) {
							l++;
							var f = void 0,
								p = void 0;
							o ? (f = t.$getConcatenatedAlphaAt(o, t.$getConcatenatedAlpha()), p = e.Matrix.create().copyFrom(t.$getConcatenatedMatrix()), t.$getConcatenatedMatrixAt(o, p), n.$preMultiplyInto(p, p), i.setTransform(p.a, p.b, p.c, p.d, p.tx, p.ty), e.Matrix.release(p)) : (f = h.renderAlpha, p = h.renderMatrix, i.setTransform(p.a, p.b, p.c, p.d, p.tx + n.tx, p.ty + n.ty)), i.globalAlpha = f, this.renderNode(h, i), h.needRedraw = !1
						}
					}
					if (a && !o) return l;
					var v = t.$children;
					if (v) for (var g = v.length, m = 0; g > m; m++) {
						var x = v[m];
						if (!(!x.$visible || x.$alpha <= 0 || x.$maskedObject)) {
							var w = x.$getFilters();
							w && w.length > 0 ? l += this.drawWithFilter(x, i, r, n, s, o) : 0 !== x.$blendMode || x.$mask && (x.$mask.$parentDisplayList || o) ? l += this.drawWithClip(x, i, r, n, s, o) : x.$scrollRect || x.$maskRect ? l += this.drawWithScrollRect(x, i, r, n, s, o) : x.isFPS ? (i.context.$drawWebGL(), i.$computeDrawCall = !1, this.drawDisplayObject(x, i, r, n, x.$displayList, s, o), i.context.$drawWebGL(), i.$computeDrawCall = !0) : l += this.drawDisplayObject(x, i, r, n, x.$displayList, s, o)
						}
					}
					return l
				}, o.drawWithFilter = function(t, a, s, o, h, l) {
					var u, c = 0,
						d = t.$getFilters(),
						f = 0 !== t.$blendMode;
					if (f && (u = i[t.$blendMode], u || (u = r)), 1 == d.length && "colorTransform" == d[0].type && !t.$children) return f && a.context.setGlobalCompositeOperation(u), a.context.$filter = d[0], c += t.$mask && (t.$mask.$parentDisplayList || l) ? this.drawWithClip(t, a, s, o, h, l) : t.$scrollRect || t.$maskRect ? this.drawWithScrollRect(t, a, s, o, h, l) : this.drawDisplayObject(t, a, s, o, t.$displayList, h, l), a.context.$filter = null, f && a.context.setGlobalCompositeOperation(r), c;
					var p = e.Matrix.create();
					p.copyFrom(t.$getConcatenatedMatrix());
					var v;
					v = e.sys.Region.create();
					var g = t.$getOriginalBounds();
					v.updateRegion(g, p);
					var m = this.createRenderBuffer(v.width, v.height);
					m.context.pushBuffer(m), m.setTransform(1, 0, 0, 1, -v.minX, -v.minY);
					var x = e.Matrix.create().setTo(1, 0, 0, 1, -v.minX, -v.minY);
					return c += t.$mask && (t.$mask.$parentDisplayList || l) ? this.drawWithClip(t, m, s, x, v, l) : t.$scrollRect || t.$maskRect ? this.drawWithScrollRect(t, m, s, x, v, l) : this.drawDisplayObject(t, m, s, x, t.$displayList, v, l), e.Matrix.release(x), m.context.popBuffer(), c > 0 && (f && a.context.setGlobalCompositeOperation(u), c++, a.globalAlpha = 1, a.setTransform(1, 0, 0, 1, v.minX + o.tx, v.minY + o.ty), a.context.drawTargetWidthFilters(d, m), f && a.context.setGlobalCompositeOperation(r)), n.push(m), e.sys.Region.release(v), e.Matrix.release(p), c
				}, o.drawWithClip = function(t, a, s, o, h, l) {
					var u, c = 0,
						d = 0 !== t.$blendMode;
					d && (u = i[t.$blendMode], u || (u = r));
					var f = t.$scrollRect ? t.$scrollRect : t.$maskRect,
						p = t.$mask;
					if (p) {
						var v = p.$getRenderNode();
						if (v) {
							var g = v.renderMatrix;
							if (0 == g.a && 0 == g.b || 0 == g.c && 0 == g.d) return c
						}
					}
					var m, x = e.Matrix.create();
					if (x.copyFrom(t.$getConcatenatedMatrix()), t.$parentDisplayList) {
						var w = t.$parentDisplayList.root;
						w !== t.$stage && t.$getConcatenatedMatrixAt(w, x)
					}
					var b;
					if (p) {
						b = p.$getOriginalBounds(), m = e.sys.Region.create();
						var y = e.Matrix.create();
						y.copyFrom(p.$getConcatenatedMatrix()), m.updateRegion(b, y), e.Matrix.release(y)
					}
					var T;
					if (f && (T = e.sys.Region.create(), T.updateRegion(f, x)), T && m ? (T.intersect(m), e.sys.Region.release(m)) : !T && m && (T = m), T) {
						if (T.isEmpty() || h && !h.intersects(T)) return e.sys.Region.release(T), e.Matrix.release(x), c
					} else T = e.sys.Region.create(), b = t.$getOriginalBounds(), T.updateRegion(b, x);
					var E = !1;
					if (s) {
						for (var S = s.length, C = 0; S > C; C++) if (T.intersects(s[C])) {
							E = !0;
							break
						}
					} else E = !0;
					if (!E) return e.sys.Region.release(T), e.Matrix.release(x), c;
					if (p || t.$children && 0 != t.$children.length) {
						var _ = this.createRenderBuffer(T.width, T.height);
						_.context.pushBuffer(_), _.setTransform(1, 0, 0, 1, -T.minX, -T.minY);
						var R = e.Matrix.create().setTo(1, 0, 0, 1, -T.minX, -T.minY);
						if (c += this.drawDisplayObject(t, _, s, R, t.$displayList, T, l), p) {
							var L = this.createRenderBuffer(T.width, T.height);
							L.context.pushBuffer(L), L.setTransform(1, 0, 0, 1, -T.minX, -T.minY), R = e.Matrix.create().setTo(1, 0, 0, 1, -T.minX, -T.minY), c += this.drawDisplayObject(p, L, s, R, p.$displayList, T, l), L.context.popBuffer(), _.context.setGlobalCompositeOperation("destination-in"), _.setTransform(1, 0, 0, -1, 0, L.height), _.globalAlpha = 1;
							var D = L.rootRenderTarget.width,
								A = L.rootRenderTarget.height;
							_.context.drawTexture(L.rootRenderTarget.texture, 0, 0, D, A, 0, 0, D, A, D, A), _.context.setGlobalCompositeOperation("source-over"), n.push(L)
						}
						if (e.Matrix.release(R), _.context.setGlobalCompositeOperation(r), _.context.popBuffer(), c > 0) {
							if (c++, d && a.context.setGlobalCompositeOperation(u), f) {
								var y = x;
								_.setTransform(y.a, y.b, y.c, y.d, y.tx - T.minX, y.ty - T.minY), _.context.pushMask(f)
							}
							a.globalAlpha = 1, a.setTransform(1, 0, 0, -1, T.minX + o.tx, T.minY + o.ty + _.height);
							var M = _.rootRenderTarget.width,
								$ = _.rootRenderTarget.height;
							a.context.drawTexture(_.rootRenderTarget.texture, 0, 0, M, $, 0, 0, M, $, M, $), f && _.context.popMask(), d && a.context.setGlobalCompositeOperation(r)
						}
						return n.push(_), e.sys.Region.release(T), e.Matrix.release(x), c
					}
					if (f) {
						var y = x;
						a.setTransform(y.a, y.b, y.c, y.d, y.tx - T.minX, y.ty - T.minY), a.context.pushMask(f)
					}
					return d && a.context.setGlobalCompositeOperation(u), c += this.drawDisplayObject(t, a, s, o, t.$displayList, h, l), d && a.context.setGlobalCompositeOperation(r), f && a.context.popMask(), e.sys.Region.release(T), e.Matrix.release(x), c
				}, o.drawWithScrollRect = function(t, i, r, n, a, s) {
					var o = 0,
						h = t.$scrollRect ? t.$scrollRect : t.$maskRect;
					if (h.isEmpty()) return o;
					var l = e.Matrix.create();
					if (l.copyFrom(t.$getConcatenatedMatrix()), s) t.$getConcatenatedMatrixAt(s, l);
					else if (t.$parentDisplayList) {
						var u = t.$parentDisplayList.root;
						u !== t.$stage && t.$getConcatenatedMatrixAt(u, l)
					}
					var c = e.sys.Region.create();
					if (c.updateRegion(h, l), c.isEmpty() || a && !a.intersects(c)) return e.sys.Region.release(c), e.Matrix.release(l), o;
					var d = !1;
					if (r) {
						for (var f = r.length, p = 0; f > p; p++) if (c.intersects(r[p])) {
							d = !0;
							break
						}
					} else d = !0;
					if (!d) return e.sys.Region.release(c), e.Matrix.release(l), o;
					i.setTransform(l.a, l.b, l.c, l.d, l.tx + n.tx, l.ty + n.ty);
					var v = i.context,
						g = !1;
					if (i.$hasScissor || 0 != l.b || 0 != l.c) v.pushMask(h);
					else {
						var m = h.x,
							x = h.y,
							w = h.width,
							b = h.height;
						m = m * l.a + l.tx + n.tx, x = x * l.d + l.ty + n.ty, w *= l.a, b *= l.d, v.enableScissor(m, -x - b + i.height, w, b), g = !0
					}
					return o += this.drawDisplayObject(t, i, r, n, t.$displayList, c, s), i.setTransform(l.a, l.b, l.c, l.d, l.tx + n.tx, l.ty + n.ty), g ? v.disableScissor() : v.popMask(), e.sys.Region.release(c), e.Matrix.release(l), o
				}, o.drawNodeToBuffer = function(e, t, i, r) {
					var n = t;
					n.context.pushBuffer(n), n.setTransform(i.a, i.b, i.c, i.d, i.tx, i.ty), this.renderNode(e, t, r), n.context.$drawWebGL(), n.onRenderFinish(), n.context.popBuffer()
				}, o.renderNode = function(e, t, i) {
					switch (e.type) {
					case 1:
						this.renderBitmap(e, t);
						break;
					case 2:
						this.renderText(e, t);
						break;
					case 3:
						this.renderGraphics(e, t, i);
						break;
					case 4:
						this.renderGroup(e, t);
						break;
					case 6:
						t.globalAlpha = e.drawData[0];
						break;
					case 7:
						this.renderMesh(e, t)
					}
				}, o.renderBitmap = function(e, t) {
					var n = e.image;
					if (n) {
						var a = e.drawData,
							s = a.length,
							o = 0,
							h = e.matrix,
							l = e.blendMode,
							u = e.alpha;
						h && (t.saveTransform(), t.transform(h.a, h.b, h.c, h.d, h.tx, h.ty)), l && t.context.setGlobalCompositeOperation(i[l]);
						var c;
						if (u == u && (c = t.globalAlpha, t.globalAlpha *= u), e.filter) {
							for (t.context.$filter = e.filter; s > o;) t.context.drawImage(n, a[o++], a[o++], a[o++], a[o++], a[o++], a[o++], a[o++], a[o++], e.imageWidth, e.imageHeight);
							t.context.$filter = null
						} else for (; s > o;) t.context.drawImage(n, a[o++], a[o++], a[o++], a[o++], a[o++], a[o++], a[o++], a[o++], e.imageWidth, e.imageHeight);
						l && t.context.setGlobalCompositeOperation(r), u == u && (t.globalAlpha = c), h && t.restoreTransform()
					}
				}, o.renderMesh = function(e, t) {
					var i = e.image,
						r = e.drawData,
						n = r.length,
						a = 0,
						s = e.matrix;
					for (s && (t.saveTransform(), t.transform(s.a, s.b, s.c, s.d, s.tx, s.ty)); n > a;) t.context.drawMesh(i, r[a++], r[a++], r[a++], r[a++], r[a++], r[a++], r[a++], r[a++], e.imageWidth, e.imageHeight, e.uvs, e.vertices, e.indices, e.bounds);
					s && t.restoreTransform()
				}, o.renderText = function(i, r) {
					var n = i.width - i.x,
						a = i.height - i.y;
					if (0 != i.drawData.length && (this.canvasRenderBuffer && this.canvasRenderBuffer.context ? i.dirtyRender && this.canvasRenderBuffer.resize(n, a) : (this.canvasRenderer = new e.CanvasRenderer, this.canvasRenderBuffer = new t.CanvasRenderBuffer(n, a)), this.canvasRenderBuffer.context)) {
						if ((i.x || i.y) && (i.dirtyRender && this.canvasRenderBuffer.context.translate(-i.x, -i.y), r.transform(1, 0, 0, 1, i.x, i.y)), i.dirtyRender) {
							var s = this.canvasRenderBuffer.surface;
							this.canvasRenderer.renderText(i, this.canvasRenderBuffer.context);
							var o = i.$texture;
							o ? r.context.updateTexture(o, s) : (o = r.context.createTexture(s), i.$texture = o), i.$textureWidth = s.width, i.$textureHeight = s.height
						}
						var h = i.$textureWidth,
							l = i.$textureHeight;
						r.context.drawTexture(i.$texture, 0, 0, h, l, 0, 0, h, l, h, l), (i.x || i.y) && (i.dirtyRender && this.canvasRenderBuffer.context.translate(i.x, i.y), r.transform(1, 0, 0, 1, -i.x, -i.y)), i.dirtyRender = !1
					}
				}, o.renderGraphics = function(i, r, n) {
					var a = i.width,
						s = i.height;
					if (!(0 >= a || 0 >= s) && a && s && 0 != i.drawData.length && (this.canvasRenderBuffer && this.canvasRenderBuffer.context ? (i.dirtyRender || n) && this.canvasRenderBuffer.resize(a, s) : (this.canvasRenderer = new e.CanvasRenderer, this.canvasRenderBuffer = new t.CanvasRenderBuffer(a, s)), this.canvasRenderBuffer.context)) {
						(i.x || i.y) && ((i.dirtyRender || n) && this.canvasRenderBuffer.context.translate(-i.x, -i.y), r.transform(1, 0, 0, 1, i.x, i.y));
						var o = this.canvasRenderBuffer.surface;
						if (n) {
							this.canvasRenderer.renderGraphics(i, this.canvasRenderBuffer.context, !0), e.WebGLUtils.deleteWebGLTexture(o);
							var h = r.context.getWebGLTexture(o);
							r.context.drawTexture(h, 0, 0, a, s, 0, 0, a, s, o.width, o.height)
						} else {
							if (i.dirtyRender) {
								this.canvasRenderer.renderGraphics(i, this.canvasRenderBuffer.context);
								var h = i.$texture;
								h ? r.context.updateTexture(h, o) : (h = r.context.createTexture(o), i.$texture = h), i.$textureWidth = o.width, i.$textureHeight = o.height
							}
							var l = i.$textureWidth,
								u = i.$textureHeight;
							r.context.drawTexture(i.$texture, 0, 0, l, u, 0, 0, l, u, l, u)
						}(i.x || i.y) && ((i.dirtyRender || n) && this.canvasRenderBuffer.context.translate(i.x, i.y), r.transform(1, 0, 0, 1, -i.x, -i.y)), n || (i.dirtyRender = !1)
					}
				}, o.renderGroup = function(e, t) {
					for (var i = e.drawData, r = i.length, n = 0; r > n; n++) {
						var a = i[n];
						this.renderNode(a, t)
					}
				}, o.createRenderBuffer = function(e, i) {
					var r = n.pop();
					return r ? r.resize(e, i) : (r = new t.WebGLRenderBuffer(e, i), r.$computeDrawCall = !1), r
				}, a
			}();
		t.WebGLRenderer = a, e.registerClass(a, "egret.web.WebGLRenderer", ["egret.sys.SystemRenderer"])
	}(t = e.web || (e.web = {}))
}(egret || (egret = {}));