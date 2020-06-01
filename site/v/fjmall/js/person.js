'use strtic';
(function() {
	ini_wxshare(vge.fjmallappid);

var cookieUtil = {
	//添加cookie
	setCookie: function (name, value, expires) {
		var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value) + ";path=/";
		if (expires) {
			var exp = new Date();
			exp.setTime(exp.getTime() + expires * 24 * 60 * 60 * 1000);
			cookieText += "; expires=" + exp.toGMTString();
		}
		document.cookie = cookieText;
	},
	//获取cookie
	getCookie: function (name) {
		var cookieText = decodeURIComponent(document.cookie);
		var cookieArr = cookieText.split("; ");
		for (var i = 0; i < cookieArr.length; i++) {
			var arr = cookieArr[i].split("=");
			if (arr[0] == name) {
				return arr[1];
			}
		}
		return null;
	},
	//删除cookie
	unsetCookie: function (name) {
		document.cookie = encodeURIComponent(name) + "=; expires=" + new Date(0);
	}
};
var cartArr = cookieUtil.getCookie("car") ? JSON.parse(cookieUtil.getCookie("car")) : [];
sessionStorage.shopcart = JSON.stringify(cartArr);
$('.shopcartbtn i').html(cartArr.length);
	//昵称头像
	if(sessionStorage.nickname == undefined) {
		ifremeber();
	} else {
		$('#person .nickname').text(sessionStorage.nickname);
		$('#person .headimg').attr('src', sessionStorage.headimg);
	}

	function ifremeber() {
		var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + sessionStorage.openid + '&appid=' + vge.fjmallappid;
		vge.ajxget(requrl, 5000, function(r) {
			try {
				var o = JSON.parse(r);
				console.log('昵称头像', o)
				if(o.subscribe == '0') { //未关注
					sessionStorage.nickname = '游客';
					sessionStorage.headimg = '/v/fjmall/img/headimg.png';
				} else { //已关注用户
					sessionStorage.nickname = o.nickname;
					sessionStorage.headimg = o.headimgurl == '' ? '/v/fjmall/img/headimg.png' : o.headimgurl;
				}
				$('#person .nickname').text(o.nickname);
				$('#person .headimg').attr('src', o.headimgurl == '' ? '/v/fjmall/img/headimg.png' : o.headimgurl);
			} catch(e) {
				vge.clog('errmsg', [requrl, e]);
			}
		}, function(err) {
			vge.clog('errmsg', [requrl, err]);
		});
	}

	//客服
	$('.custom_service').on('click', function() {
		$('#kefu').fadeIn(100);
	})
	$('#kefu .closeKf').on('click', function() {
		$('#kefu').fadeOut(100);
	});

	//上拉加载
	//获取滚动条当前的位置 
	function getScrollTop() {
		var scrollTop = 0;
		if(document.getElementById("mall") && document.getElementById("mall").scrollTop) {
			scrollTop = document.getElementById("mall").scrollTop;
		} 
		return scrollTop;
	}

	//获取当前可视范围的高度 
	function getClientHeight() {
		var clientHeight = 0;
		if(document.getElementById("mall").clientHeight && document.getElementById("mall").clientHeight) {
			clientHeight = Math.min(document.getElementById("mall").clientHeight, document.getElementById("mall").clientHeight);
		} else {
			clientHeight = Math.max(document.getElementById("mall").clientHeight, document.getElementById("mall").clientHeight);
		}
		return clientHeight;
	}

	//获取文档完整的高度 
	function getScrollHeight() {
		return Math.max(document.getElementById("mall").scrollHeight, document.getElementById("mall").scrollHeight);
	}

	//滚动事件触发
//	document.getElementById("mall").addEventListener('scroll',scrollEevnt,false); 
	
	function scrollEevnt(){
	
		if(getScrollTop() + getClientHeight() + 1  >= getScrollHeight()) {
			currentPage++;
			getShopGoods();
			document.getElementById("mall").removeEventListener('scroll',scrollEevnt,false); 
			$('#mall').append('<img src="img/loading.gif" class="loading"/>');
		}
	}
	function transfNum(num) {
		if(num < 1000) {
			return num;
		} else {
			var str = num + '',
				reg = /\*/g;
			var arr = '',
				Int = '',
				Float = '',
				resStr1 = [],
				resStr2 = [];
			if(str.indexOf(".") !== -1) {
				arr = str.split(".");
				Int = arr[0].split('');
				Float = arr[1].split('');
			} else {
				Int = str.split('');
			}
			Int = Int.reverse();
			for(var i = 0; i < Int.length; i++) {
				resStr1.push(Int[i]);
				if(i % 3 === 2) {
					resStr1.push(',');
				}
			}
			resStr1 = resStr1.reverse().join('*');
			resStr1 = resStr1.replace(reg, '');
			if(resStr1[0] == ',') {
				resStr1 = resStr1.substr(1, resStr1.length);
			}
			for(var j = 0; j < Float.length; j++) {
				resStr2.push(Float[j]);
				if(j % 3 === 2) {
					resStr2.push(',');
				}
			}
			resStr2 = resStr2.join('*');
			resStr2 = resStr2.replace(reg, '');
			if(resStr2[resStr2.length - 1] == ',') {
				resStr2 = resStr2.substr(0, resStr2.length - 1);
			}
			if(Float.length < 1) {
				return resStr1;
			} else {
				return resStr1 + '.' + resStr2;
			}
		}
	}

})();