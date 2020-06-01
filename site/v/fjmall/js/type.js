'use strtic';
$(function() {
  ini_wxshare(vge.fjmallappid);
  var args = vge.urlparse(location.href);
  // var goodPresentFlag = Number(args.goodPresentFlag);
  // var categoryType = Number(args.categoryType);
  var categoryType = GetQueryString('categoryType');
  var vpointsOrderType = 0;
  var typesListObj = {};


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
 
  getTabMenu();
  initEvent();
  function initEvent() { // 注册排序事件
    $('.order-btn').click(function() {
      $('.order-btn').removeClass('active');
      $(this).addClass('active');
      vpointsOrderType = $(this).attr('data-order');
      
      typesListObj[$('.tab-btn.active').attr('data-index')].init();
      
    })
  }
  function getTabMenu() {
    var url = vge.fjmall + '/DBTFJQHInterface/vpoints/vpointsShop/getFistCategoryType'
    vge.callJApi(url, {}, function (res) {
      var hasInit = false;
      var activeTabIndex = 0;
      if (res.result.code === '0' && !!res.reply) {
        activeTabIndex = getDefaultTab(res.reply);
        // tab内容
        $('.tab-left-box').html(createTabHtml(res.reply, activeTabIndex));
        // 列表容器
        $('.condition-box').after(createListWrapHtml(res.reply))
        
        // tab切换
          $('.tab-btn').click(function () {
            // debugger
            if ($(this).hasClass('active') && hasInit) return
            var curIndex = $(this).attr('data-index');

            $('.tab-btn').removeClass('active');
            $(this).addClass('active');

            $('.right-list-box').removeClass('active');
            $('.right-list-box').eq(curIndex).addClass('active');

            typesListObj[curIndex] = new TypeList({
              element: $('.right-list-box').eq(curIndex), 
              contentBox: $('.right-list-box').eq(curIndex).children('.type-list-box'),
              categoryType: $(this).attr('categorytype'),
            })
          }).eq(activeTabIndex).trigger("click");
          hasInit = true;
          //

      }
    })
  }
  function getDefaultTab(tabData) {
    var targetIndex = 0;
    $.each(tabData, function (index, item) {
      if (item.categoryType * 1 === categoryType * 1) {
        targetIndex = index
      }
      
    });
    
    return targetIndex
  }
  function createTabHtml(tabData, activeIndex) {
    var htmlStr = '';
    activeIndex = activeIndex || 0
    $.each(tabData, function(index, item) {
      htmlStr += `<div class="tab-item">
                    <span class="tab-btn ${index === activeIndex ? 'active' : ''}" data-index=${index}
                    categoryType="${item.categoryType}">${item.categoryName}</span>
                  </div>`;
    })
    
    return htmlStr;
  }
  function createListWrapHtml(tabData) {
    var htmlStr = '';
    $.each(tabData, function (index, item) {
      htmlStr += `<div class="right-list-box ${index === 0 ? 'active' : ''}">
                      <p class="type-title">${item.categoryName}</p>
                    <div class="type-list-box">
                    </div>
                  </div>`;
    })
    return htmlStr;
  }

  function TypeList(options) {
    if(!options) throw Error('options 为必填')
    this.element = options.element;
    this.contentBox = options.contentBox || options.element;
    this.currentPage = 1;
    this.count = 20;
    this.categoryType = options.categoryType;
    this.goodPresentFlag = options.goodPresentFlag;

    this.isEnd = false; // 是否已全部加载
    this.init()
  }
  TypeList.prototype.init = function init() {
    this.currentPage = 1;
    this.isEnd = false;
    $(this.contentBox).empty();
    this.getListData()
  }
  TypeList.prototype.getListData = function getListData() {
    if (this.isEnd) return
    var data = {
      currentPage: this.currentPage,
      count: this.count,
    }
    if (vpointsOrderType !== '') {
      data.vpointsOrderType = vpointsOrderType;
    }
    if (this.goodPresentFlag != undefined) {
      data.goodPresentFlag = this.goodPresentFlag;
    } else {
      data.categoryParent = this.categoryType;
    }
    var url = javai = vge.fjmall + '/DBTFJQHInterface/vpoints/vpointsShop/getShopGoods';

    var _this = this;
    
    vge.callJApi(javai, data,
        function (jo) {
          $(_this.element).children('.loading').remove();
          if (jo.result.code == '0') {
            // if (!jo.result.businessCode) {
              if (jo.reply.length > 0) {
                $(_this.element).off('scroll', '**');
                $(_this.element).scroll(_this, _this.scrollEevnt);
                if (sessionStorage.jo) {
                  var goodlist = JSON.parse(sessionStorage.jo);
                  for (var k = 0; k < jo.reply.length; k++) {
                    goodlist.push(jo.reply[k]);
                  }
                  sessionStorage.jo = JSON.stringify(goodlist);
                } else {
                  sessionStorage.jo = JSON.stringify(jo.reply);
                }
                $(_this.contentBox).append(_this.createListHtml(jo.reply));


                $('.goods-item').click(checkGoodsDetail);
              } else if (_this.currentPage === 1) {
                  $(_this.contentBox).append('<img src="img/no-goods-list.png" alt="" class="no-order-tip">');
              } else  {
                if(!(_this.contentBox).children('.end').length) {
                  $(_this.contentBox).append('<p class="end">已经触及我的底线啦~</p>');
                }
                _this.isEnd = true
              }
              if (currentPage == 1) {
                $('#jifen .jifen-number').text(transfNum(jo.reply.surplusVpoints === undefined ? 0 : jo.reply.surplusVpoints));
                sessionStorage.surplusVpoints = jo.reply.surplusVpoints === undefined ? 0 : jo.reply.surplusVpoints;
                console.log('缺货提醒', jo.reply.pauseExchangeTips);
                if (jo.reply.pauseExchangeTips != undefined) {
                  if (location.href.lastIndexOf('/index') != -1) {
                    title_tip('尊敬的用户', jo.reply.pauseExchangeTips, '我知道了');
                  }
                }
              }
            // } else {
            //   title_tip('尊敬的用户', jo.result.msg, '我知道了');
            // }
          } else if (jo.result.code == '-1') {
            title_tip('尊敬的用户', jo.result.msg, '我知道了');
          } else { //code!='0'
            title_tip('尊敬的用户', jo.result.msg, '我知道了');
          }
        });
  }

  TypeList.prototype.createListHtml = function createListHtml(goodsList, count) {
    var htmlStr = '<div class="goods-list">'
    $.each(goodsList, function (index, item) {
      if (index >= count) return
      var imgUrl = ''
      try {
        if (item.goodsUrl.indexOf('http') !== -1) {
          imgUrl = item.goodsUrl
        } else {
          imgUrl = `http://img.vjifen.com:8000/images/vma/${item.goodsUrl.split(',')[0]}`
        }
      } catch (e) {
        // console.log('商品图片解析错误');
      }
      htmlStr += `<div class="goods-item"  goodsid="${item.goodsId}" exchangeType="${item.exchangeType}">
										<div class="goods-block">
											<img src="${imgUrl}" alt="" class="goods-img">
										</div>
										<div class="goods-name">${item.goodsShortName}</div>
										<div class="jifen-price">
											<span class="price-num">${transfNum(item.realVpoints)}</span>
											<span>积分</span>
										</div>
									</div>`;
    });
    htmlStr += '</div>'
    return htmlStr
  }

  function checkGoodsDetail() {
    sessionStorage.goodsId = $(this).attr('goodsid');
    sessionStorage.addgoods = 1;
    sessionStorage.exchangeType = $(this).attr('exchangeType');
    sessionStorage.removeItem('cartorder');
    location.href = 'http://' + location.host + '/v/fjmall/goods_details.html';
    sessionStorage.url = location.href;
  }
  TypeList.prototype.scrollEevnt = function scrollEevnt(e) {
    if (e.data.isEnd) return
    if ($(this).scrollTop() + $(this).innerHeight() + 10 >= this.scrollHeight) {
      e.data.currentPage++;
      e.data.getListData();
      $(this).off('scroll', '**')
      $(this).append('<img src="img/loading.gif" class="loading"/>');
    }
  }


  function GetQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }

  function transfNum(num) {
    if (num < 1000) {
      return num;
    } else {
      var str = num + '',
        reg = /\*/g;
      var arr = '',
        Int = '',
        Float = '',
        resStr1 = [],
        resStr2 = [];
      if (str.indexOf(".") !== -1) {
        arr = str.split(".");
        Int = arr[0].split('');
        Float = arr[1].split('');
      } else {
        Int = str.split('');
      }
      Int = Int.reverse();
      for (var i = 0; i < Int.length; i++) {
        resStr1.push(Int[i]);
        if (i % 3 === 2) {
          resStr1.push(',');
        }
      }
      resStr1 = resStr1.reverse().join('*');
      resStr1 = resStr1.replace(reg, '');
      if (resStr1[0] == ',') {
        resStr1 = resStr1.substr(1, resStr1.length);
      }
      for (var j = 0; j < Float.length; j++) {
        resStr2.push(Float[j]);
        if (j % 3 === 2) {
          resStr2.push(',');
        }
      }
      resStr2 = resStr2.join('*');
      resStr2 = resStr2.replace(reg, '');
      if (resStr2[resStr2.length - 1] == ',') {
        resStr2 = resStr2.substr(0, resStr2.length - 1);
      }
      if (Float.length < 1) {
        return resStr1;
      } else {
        return resStr1 + '.' + resStr2;
      }
    }
  }
})