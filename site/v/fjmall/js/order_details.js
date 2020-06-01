'use strict';
(function() {
	ini_wxshare(vge.fjmallappid);
	var orderlist = JSON.parse(sessionStorage.orderlist),
		timer = null,
		n = 0,
		shr_msg = '',
		goods_msg = '',
		order_msg = '',
		title = '';

	showOrder(orderlist);
	function showOrder(orderlist) {
		clearInterval(timer);
		$('#btn_box').css('display', 'none');
		for(var i = 0; i < orderlist.length; i++) {
			if(orderlist[i].exchangeId == sessionStorage.exchangeId) {
				console.log(orderlist[i],sessionStorage.exchangeId,orderlist[i].expressStatus)
				shr_msg = `<p>收货人信息</p>
				<ul>
					<li>
						<p>姓名</p>
						<p>${orderlist[i].realName}</p>
					</li>
					<li>
						<p>电话</p>
						<p>${orderlist[i].phoneNum}</p>
					</li>
					<li>
						<p>地址</p>
						<p>${orderlist[i].address}</p>
					</li>
				</ul>`;
				goods_msg = `<p>商品信息</p>
				<div class="">
					<div>
						<img src="${handleImgUrl(orderlist[i].goodsUrl)}" />
					</div>
					<div>
						<p class="goodsname">${orderlist[i].goodsName}</p>
						<p class="price">积分：<span>${transfNum(orderlist[i].exchangeVpoints)}</span></p>
					</div>
					<div>
						<p>×${orderlist[i].exchangeNum}</p>
					</div>
				</div>`;
				order_msg = `<p>订单信息</p>
				<ul>
					<li style="display:${orderlist[i].expressStatus=='1'?'flex':orderlist[i].expressStatus=='2'?'flex':'none'}">
						<p>物流公司</p>
						<p>${orderlist[i].expressCompany}</p>
					</li>
					<li style="display:${orderlist[i].expressStatus=='1'?'flex':orderlist[i].expressStatus=='2'?'flex':'none'}">
						<p id="target">物流编号</p>
						<p><textarea id="expressNumber" readonly>${orderlist[i].expressNumber}</textarea> <span class="copy" data-clipboard-text="${orderlist[i].expressNumber}">复制</span></p>
					</li>
					<li>
						<p>订单编号</p>
						<p>${orderlist[i].exchangeId}</p>
					</li>
					<li>
						<p>商品编号</p>
						<p>${orderlist[i].goodsClientNo}</p>
					</li>
					<li>
						<p>下单时间</p>
						<p>${rTime(orderlist[i].exchangeTime)}</p>
					</li>
					<li style="display:${orderlist[i].expressStatus=='1'?'flex':orderlist[i].expressStatus=='2'?'flex':'none'}">
						<p>发货时间</p>
						<p>${orderlist[i].expressSendTime===undefined?'0':rTime(orderlist[i].expressSendTime)}</p>
					</li>
					<li style="display:${orderlist[i].expressStatus=='2'?'flex':'none'}">
						<p>收货时间</p>
						<p>${orderlist[i].expressSignTime===undefined?'0':rTime(orderlist[i].expressSignTime)}</p>
					</li>
				</ul>`;
				sessionStorage.expressNumber = orderlist[i].expressNumber;
				$('#recvice').attr('exchangeId',sessionStorage.exchangeId)
				if(orderlist[i].expressStatus == '2') { //已收货
					// $('#querywl').css('display','block');
					title = `<p>交易完成</p>`;
				} else if(orderlist[i].expressStatus == '1') { //已发货
					compareTime(orderlist[i].expressSendTime.split('.')[0]);
					$('#btn_box').css('display', 'block');
					// $('#btn_box,#querywl').css('display', 'block');
				} else if(orderlist[i].expressStatus == '0') { //待发货
					title = `<p>等待卖家发货</p>`;
				}
				break;
			}
		}
		$('.shr_msg').html(shr_msg);
		$('.goods_msg').html(goods_msg);
		$('.order_msg').html(order_msg);
		$('.title').html(title);
		$('.copy').on('click',function(){
			new ClipboardJS('.copy');//fuzhi 
			title_tip('尊敬的用户', '复制成功！', '我知道了');
		});

	}

	function rTime(str) {
		return str.split('.')[0];
	}

	function trTime(str) {
		var yy = str.split(' ')[0].split('-')[0],
			mm = str.split(' ')[0].split('-')[1] - 1,
			dd = str.split(' ')[0].split('-')[2],
			hh = str.split(' ')[1].split(':')[0],
			mn = str.split(' ')[1].split(':')[1],
			ss = str.split(' ')[1].split(':')[2];

		return new Date(yy, mm, dd, hh, mn, ss);
	}

	function compareTime(str) {
		var yy = str.split(' ')[0].split('-')[0],
			mm = str.split(' ')[0].split('-')[1] - 1,
			dd = str.split(' ')[0].split('-')[2],
			hh = str.split(' ')[1].split(':')[0],
			mn = str.split(' ')[1].split(':')[1],
			ss = str.split(' ')[1].split(':')[2];
		var d = 0,
			h = 0,
			m = 0,
			s = 0;
		var cTime = 15 * 24 * 3600 * 1000 + new Date(yy, mm, dd, hh, mn, ss).getTime() - new Date().getTime();
		title = '<p>卖家已发货<br />';
		if(cTime <= 0) {
			title = `<p>卖家已发货<br /><span class="timeout">还剩00小时00分钟00秒自动确认</span></p>`;
		}
		if(parseInt(cTime / 86400000) > 1) {
			d = parseInt(cTime / 86400000);
			h = parseInt(cTime % 86400000 / 3600000);
			title = `<p>卖家已发货<br /><span class="timeout">还剩${d+'天'+ h +'小时'}自动确认</span></p>`;
		} else {
			clearInterval(timer);
			timer = setInterval(function() {
				n++;
				h = parseInt((cTime - 1000 * n) / 3600000);
				m = parseInt((cTime - 1000 * n) % 3600000 / 60000) < 10 ? '0' + parseInt((cTime - 1000 * n) % 3600000 / 60000) : parseInt((cTime - 1000 * n) % 3600000 / 60000);
				s = parseInt((cTime - 1000 * n) % 60000 / 1000) < 10 ? '0' + parseInt((cTime - 1000 * n) % 60000 / 1000) : parseInt((cTime - 1000 * n) % 60000 / 1000);
				h=h<0?'00':h;
				m=m<0?'00':m;
				s=s<0?'00':s;
				if(h=='00'&&m=='00'&&s=='00'){
					clearInterval(timer);
				}
				title = `<p>卖家已发货<br /><span class="timeout">还剩${h+'小时'+m+'分钟'+s+'秒'}自动确认</span></p>`;
				$('.title').html(title);
			}, 1000);
		}
		$('.title').html(title);
	}

	$('#recvice').on('click', function() {
		$('#recvice').unbind();
		sessionStorage.exchangeId = $(this).attr('exchangeId');
		expressSign();
	})

	function expressSign() {
		var javai = vge.fjmall + '/DBTFJQHInterface/vpoints/vpointsExchange/expressSign';
		var req = {
			"openid": sessionStorage.openid,
			"exchangeId": sessionStorage.exchangeId
		};
		vge.callJApi(javai, req,
			function(jo) {
				$('#recvice').on('click', function() {
					$('#recvice').unbind();
					sessionStorage.exchangeId = $(this).attr('exchangeId');
					expressSign();
				})
				if(jo.result.code == '0') {
					if(jo.result.businessCode==0) {
						getOrderList();
						title_tip('尊敬的用户', jo.result.msg, '我知道了');
					} else {
						title_tip('尊敬的用户', jo.result.msg, '我知道了');
					}
				} else if(jo.result.code == '-1') {
					title_tip('尊敬的用户', jo.result.msg, '我知道了');
				} else { //code!='0'
					title_tip('尊敬的用户', jo.result.msg, '我知道了');
				}
			});
	}
	function reload(){
		location.reload();
	}
	
	function getOrderList() { //获取兑换记录
		var javai = vge.fjmall + '/DBTFJQHInterface/vpoints/vpointsExchange/getExchangeRecord';
		var req = {
			"openid": sessionStorage.openid,
			"currentPage": 1,
			"count": 20,
			"companyKey": sessionStorage.companyKey,
			"expressStatus": 3 //物流状态：0未发货、1已发货、2已完成、3/null全部
		};
		vge.callJApi(javai, req,
			function(jo) {
				if(jo.result.code == '0') {
					if(!jo.result.businessCode) {
						jo = jo.reply;
						sessionStorage.orderlist = JSON.stringify(jo);
						showOrder(jo);
					} else {
						title_tip('尊敬的用户', jo.result.msg, '我知道了');
					}
				} else if(jo.result.code == '-1') {
					title_tip('尊敬的用户', jo.result.msg, '我知道了');
				} else { //code!='0'
					title_tip('尊敬的用户', jo.result.msg, '我知道了');
				}
			});
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

	function handleImgUrl(originImgUrl, imgIndex) {
		var imgUrl = ''
		imgIndex = imgIndex || 0
		try {
			if (originImgUrl.indexOf('http') !== -1) {
				imgUrl = originImgUrl
			} else {
				var imgs = originImgUrl.split(',')
				imgUrl = `http://img.vjifen.com:8000/images/vma/${imgs[imgIndex] || imgs[0]}`
			}
		} catch (e) {
			// console.log('商品图片解析错误');
		}
		return imgUrl
	}
})()