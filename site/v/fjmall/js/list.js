'use strtic';
$(function () {
  ini_wxshare(vge.fjmallappid);
  var args = vge.urlparse(location.href);
  var goodPresentFlag = Number(args.goodPresentFlag);
  var listObj;
  console.log(goodPresentFlag);
  
  setTimeout(function() {
    listObj = new TypeList({
      element: '.scroll-box',
      goodPresentFlag: 0,
    })
  },10)



  function TypeList(options) {
    if (!options) throw Error('options 为必填');
    this.element = options.element;

    this.currentPage = 1;
    this.count = 20;
    this.categoryType = options.categoryType;
    this.goodPresentFlag = options.goodPresentFlag;

    this.isEnd = false;
    this.init()
    
  }
  TypeList.prototype.init = function init() {
    $(this.element).empty();
    this.getListData()
  }
  TypeList.prototype.getListData = function getListData() {
    if (this.isEnd) return
    var data = {
      currentPage: this.currentPage,
      count: this.count,
    }
    if (this.goodPresentFlag !=undefined) {
      data.goodPresentFlag = this.goodPresentFlag
    } else {
      data.categoryParent = this.categoryType;
    }
    var url = javai = vge.fjmall + '/DBTFJQHInterface/vpoints/vpointsShop/getShopGoods';

    var _this = this;
    vge.callJApi(javai, data,
      function (jo) {
        $(_this.element).children('.loading').remove();
        if (jo.result.code == '0') {
          if (!jo.result.businessCode) {
            if (jo.reply.length > 0) {
              $(_this.element).off('scroll', '**');
              $(_this.element).on('scroll', _this, _this.scrollEevnt)
              if (sessionStorage.jo) {
                var goodlist = JSON.parse(sessionStorage.jo);
                for (var k = 0; k < jo.reply.length; k++) {
                  goodlist.push(jo.reply[k]);
                }
                sessionStorage.jo = JSON.stringify(goodlist);
              } else {
                sessionStorage.jo = JSON.stringify(jo.reply);
              }

              $(_this.element).append(_this.createListHtml(jo.reply))

 
              $('.goods-item').click(checkGoodsDetail)
            } else {
              _this.isEnd = true
              if (!$(_this.element).children('.end').length) {
                $(_this.element).append('<p class="end">已经触及我的底线啦~</p>');
              }
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
          } else {
            title_tip('尊敬的用户', jo.result.msg, '我知道了');
          }
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
      var imgUrl = handleImgUrl(item.goodsUrl);
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
})