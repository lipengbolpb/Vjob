(function () {
    'use strict';
    var APPID = vge.fjqpappid;
    var ONEPAGE_PORT = vge.fjqp + '/DBTFJQPInterface/gifts/queryAllGiftsList';
    var SPACK_PORT = vge.fjqp + '/DBTFJQPInterface/gifts/getGiftspack';
    var GiftsList_PORT = vge.fjqp + '/DBTFJQPInterface/gifts/queryPrizeList'; //大奖列表
    var API_getCaptcha = vge.fjqp + '/DBTFJQPInterface/user/getCaptcha'; //获取验证码接口
    var Port_Sub = vge.fjqp + '/DBTFJQPInterface/user/savePrize'; //大奖提交接口

  var show = document.getElementById("show"),
        hide = document.getElementById("hide"),
        H = document.documentElement.clientHeight || document.body.clientHeight,
        dom_balance = document.getElementById("dom_balance"),
        add_money = document.getElementById("add_money"),
        no_list = document.getElementById("no_list"),
        mon_list = document.getElementById("mon_list"),
        itpl_onenote = document.getElementById("onenote_tpl").innerHTML,
        dom_more = document.getElementById("more"),
        dom_num = document.getElementById('num'),
        dom_btn = document.getElementById('btn'),
        dom_mask = document.getElementById('mask'),
        dom_get = document.getElementById('get_yz'),
        dom_loading = document.getElementsByClassName('loading')[0];

    var args = vge.urlparse(location.href),
        openid = args.openid,
        hbopenid = args.hbopenid;
    var reg1 = /^1[0-9]{10}$/, //验证手机号
        reg2 = /^[0-9]{4}$/,
        countdowntimer = null;

    var currentpage = 1,
      currentpagePrize = 1,
        next = true,
        count = 10,
        flag = true,
        first = true,
        tx = true,
        nextPrize = true;

  var activityVersion = sessionStorage.activityVersion;
  var PHONE_NUM = '0592-3663963';
  var PHONE_NUM1 = '0591-26163972'; // 经典8度
  var PHONE_NUM2 = '0592-3663963'; // 经典10度
  // 在这里区分经典8度和经典10度（活动规则和兑奖说明）
  if(activityVersion == 5) { // 经典8度版本号为 5
    PHONE_NUM = PHONE_NUM1
  } else { // 经典10度版本号为 10
    PHONE_NUM = PHONE_NUM2
  }
  $('.tj_box .tip').html('咨询电话：' + PHONE_NUM)

  show.addEventListener('click', function () {
    // hide.style.display = 'block';
    // show.style.display = 'none';
    document.getElementsByClassName("mybag_top")[0].style.marginTop = -H + "px";
  }, false);

  hide.addEventListener("click", function () {
    // hide.style.display = 'none';
    // show.style.display = 'block';
    document.getElementsByClassName("mybag_top")[0].style.marginTop = 0 + "px";
  });
  $('.list_box').css('height', $('body').height() - $('#hide').height() - parseInt($('#hide').css('marginTop')) * 2 -
    20 + 'px');
  $('.list_prize,.list_hb').css('height', $('.list_box').height() - $('.tab').height() + 'px');
  // 列表切换
  $('.tab_hb').on('click', function() {
    $(this).addClass('cur');
    $('.tab_prize').removeClass('cur');
    $('.list_hb').css('display', 'block');
    $('.list_prize').css('display', 'none');
  });
  $('.tab_prize').on('click', function() {
    $(this).addClass('cur');
    $('.tab_hb').removeClass('cur');
    $('.list_hb').css('display', 'none');
    $('.list_prize').css('display', 'block');
  });

  dom_btn.addEventListener('click', mytx, false);

  function mytx() { // 提现
    dom_btn.removeEventListener('click', mytx, false);
    setTimeout(function () {
      dom_btn.addEventListener('click', mytx, false);
    }, 1000)
    if (tx) {
      tx = false;
      dom_loading.style.display = 'block';
      give_spack();
    }
  }

    // document.getElementsByClassName('lt')[0].addEventListener('click', function () {
    //     window.location.href = 'https://m.10010.com/queen/qingdaobeer/qdbeer.html';
    // }, false);
    document.getElementsByClassName('xc')[0].addEventListener('click', function () {
        window.location.href = 'https://contents.ctrip.com/activitysetupapp/mkt/index/qingdao190403?popup=close&allianceid=1048845&sid=1760938&pushcode=nn415';
    }, false);

  onepage_note();

  function onepage_note(cb) {
    // 滚动事件触发
    $('.list_hb').on('scroll', function(e) {
      e.stopPropagation();
      scrollEevnthb();
    });
    var javai = ONEPAGE_PORT;
    var req = {
      "openid": openid,
      "hbopenid": hbopenid,
      "currentPage": currentpage,
      "count": count
    };
    vge.callJApi(javai, req, function(jo) {
      loaded();
      if (jo.result.code === '0') {
        if (jo.result.businessCode === '0') {
          if (currentpage == 1) {
            var dom_total = Number(jo.reply.totalMoney);
            var dom_gifts = Number(jo.reply.giftsMoney);
            dom_total = dom_total.toFixed(2);
            dom_gifts = dom_gifts.toFixed(2);
            dom_balance.innerHTML = dom_total;
            add_money.innerHTML = dom_gifts;
            dom_num.innerHTML = jo.reply.total;
            $('#prizeNum').html(jo.reply.totalPrizeNum);
            if (dom_total < 1) {
              dom_btn.style.backgroundColor = '#d2d2d2';
              dom_btn.style.color = '#ffffff';
              dom_btn.disabled = true;
            }
          }
          var i = 0,
            lst = jo.reply.objList,
            l = lst.length;
          if (l === 0 || lst === undefined) {
            if (first) {
              first = false;
              $('#mon_list').html('<div class="no_list">仅显示近30天的记录</div>');
            }
            next = false;
            if (cb !== undefined) {
              cb();
            }
            return;
          }
          first = false;
          var params = {},
            hs = [],
            mon_where = '';
          for (i = 0; i < l; ++i) {
            mon_where = lst[i].giftsName;
            if (mon_where === '扫码中奖') {
              params.monwhere = mon_where;
              params.money = '+' + lst[i].earnMoney;
              params.color = '#cc0000';
            } else if (mon_where === '签到红包' || mon_where === '促销红包') {
              params.monwhere = mon_where;
              params.money = '+' + lst[i].earnMoney;
              params.color = '#cc0000';
            } else {
              if (lst[i].extractStatus == '0') {
                params.monwhere = '提现成功';
                params.money = '-' + lst[i].earnMoney;
              } else if (lst[i].extractStatus == '1') {
                params.monwhere = '提现失败_金额已退还';
                params.money = lst[i].earnMoney;
              } else if (lst[i].extractStatus == '2') {
                params.monwhere = '提现处理中';
                params.money = '-' + lst[i].earnMoney;
              }
              params.color = '#333';
            }
            params.gettime = lst[i].earnTime;
            mon_list.innerHTML += vge.renderTpl(itpl_onenote, params);
          }
          if (cb !== undefined) {
            cb();
          }
          if (l < count) {
            next = false;
            if (cb !== undefined) {
              cb();
            }
            return;
          }
        } else if (jo.result.businessCode === '2') { //无红包记录
          dom_btn.removeEventListener('click', mytx, false);
          dom_btn.style.backgroundColor = '#d2d2d2';
          dom_btn.style.color = '#ffffff';
          dom_balance.innerHTML = '0.00';
          add_money.innerHTML = '0.00';
          dom_num.innerHTML = '0';
          if (first) {
            first = false;
          }
          if (cb !== undefined) {
            cb();
          }
          next = false;
          return;
        } else { //businessCode:1失败
          title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
        }
      } else { //code!='0'
        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
      }
    });
  }
  queryPrizeList();

  function queryPrizeList() {
    var javai = GiftsList_PORT;
    var req = {
      "openid": openid,
      "currentPage": currentpagePrize,
      "count": count,
      "hbopenid": hbopenid
    };
    vge.callJApi(javai, req, function(jo) {
      loaded();
      if (jo.result.code == '0') {
        if (jo.result.businessCode == '0') {
          if (currentpagePrize == 1) {
            sessionStorage.prizeRecordAry = JSON.stringify(jo.reply.prizeRecordAry);
          }
          if (jo.reply.prizeRecordAry.length > 1 && currentpagePrize > 1) {
            sessionStorage.prizeRecordAry = JSON.stringify(JSON.parse(sessionStorage.prizeRecordAry).concat(jo.reply.prizeRecordAry));
          }
          showPrizeList(jo.reply.prizeRecordAry);
        } else {
          title_tip('尊敬的用户', jo.result.msg, '我知道了');
        }
      } else {
        title_tip('尊敬的用户', jo.result.msg, '我知道了');
      }
    })
  }

  function showPrizeList(list) {
    var html = '',
      classname = '',
      str = '',
      target = '';
    if (list.length < count) {
      nextPrize = false;
    }
    if ((list.length == 0 || list.length == undefined) && currentpagePrize == 1) {
      $('.list_prize').html('<div class="no_list">您还没有大奖记录哦~</div>')
    }
    for (var i = 0; i < list.length; i++) {
      if (list[i].useStatus == 0) {
        classname = '';
        target = '领取';
      } else {
        classname = 'get';
        target = '查看';
      }
      html += '<div class="prize">';
      html += '<div><img src="' + list[i].prizeImg + '" class="prizeImg"></div>';
      html += '<div class="prizeMsg">';
      html += '<p class="przieName">' + list[i].prizeName + '</p>';
      html += '<p class="earnTime">中奖时间：' + list[i].earnTime + '</p>';
      var exchangeDate = list[i].exchangeDate;
      if(exchangeDate){
        str = '<p class="endTime">兑奖日期：'+list[i].exchangeDate.split(' ')[0]+'</p>';
      }else{
        str = '<p class="endTime">兑奖截止：'+list[i].expireTime.split(' ')[0]+'</p>';
      }
      html += str;
      html += '</div><p class="details ' + classname + '" infoKey=' + list[i].infoKey + '>' + target + '</p></div>';
    }
    $('.list_prize').append(html);
    // 滚动事件触发
    $('.list_prize').on('scroll', function(e) {
      e.stopPropagation();
      scrollEevnt();
    });
    clickCb();
  }

  function clickCb() {
    $('.details').on('click', function(e) {
      e.stopPropagation();
      var prizeList = JSON.parse(sessionStorage.prizeRecordAry);
      for (var i = 0; i < prizeList.length; i++) {
        if ($(this).attr('infoKey') == prizeList[i].infoKey) {
          $('.alertMsg').css('display', 'block');
          $('#qrcode').val(prizeList[i].prizeVcode);
          $('#prizeName').val(prizeList[i].prizeName);
          $('#earnTime').val(prizeList[i].earnTime);
          var exchangeDate = prizeList[i].exchangeDate;
          if(exchangeDate){
            $('.endTime>span').html('兑奖日期：')
            $('#endTime').val(prizeList[i].exchangeDate.split(' ')[0]);
          }else{
            $('.endTime>span').html('兑奖截止：')
            $('#endTime').val(prizeList[i].expireTime.split(' ')[0]);
          }
          sessionStorage.infoKey = prizeList[i].infoKey;
          sessionStorage.prizeVcode = prizeList[i].prizeVcode;
          if (prizeList[i].useStatus == 1) {
            $('.yz_box,.tj_box .tj').css('display', 'none');
            $('.tj_box .tip').css('display', 'block');
            $('#contact,#tel').attr('readonly', 'readonly');
            $('#contact').val(prizeList[i].userName);
            $('#tel').val(prizeList[i].phoneNum);
          } else {
            $('#contact,#tel,#yz_code').removeAttr('readonly');
            $('#yz_code').val('');
            $('.tj_box .tip').css('display', 'none');
            $('.tj_box .tj').css('display', 'block');
            $('.yz_box').css('display', 'flex');
          }
          break;
        }
      }

    })
  }

  $('.prize_close').on('click', function(e) {
    e.stopPropagation();
    $('.alertMsg').css('display', 'none');
  })

  $('#get_yz').on('click', function() {
    getYzcode();
  });

  $('.tj').on('click', prizeTj);

  function prizeTj() {
    if ($('#contact').val() == '' || $('#contact').val() == ' ') {
      title_tip('提 示', '请填写正确的姓名！~', '我知道了');
    } else if (!reg1.test($('#tel').val())) {
      title_tip('提 示', '请填写正确的手机号！~', '我知道了');
    } else if (!reg2.test($('#yz_code').val())) {
      title_tip('提 示', '请填写正确的验证码！~', '我知道了');
    } else {
      $('.tj').unbind();
      setTimeout(function() {
        $('.tj').on('click', prizeTj);
      }, 1000);
      sub_message();
    }
  }

  function getCheckCode(cb) { // 获取手机验证码
    var javai = API_getCaptcha;
    var req = {
      "phonenum": $('#tel').val()
    };
    vge.callJApi(javai, req, function(jo) {
      if (jo.result.code == '0') {
        if (jo.result.businessCode == '0') {
          cb(); //成功，开始倒计时
        } else if (jo.result.businessCode === '2') {
          title_tip('尊敬的用户', '您填写的手机号错误，发送验证码失败！', '我知道了');
        } else { //1 为服务器报错
          title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
        }
      } else { //code!='0'
        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
      }
    });
  }

  function getYzcode() {
    if (!reg1.test($('#tel').val())) {
      title_tip('提 示', '请填写正确的手机号！~', '我知道了');
    } else {
      if ($('#get_yz').text() === '获取验证码' || $('#get_yz').text() === '重新获取') {
        $('#get_yz').unbind();
        getCheckCode(function() {
          countdown(dom_get, 60);
        });
      } else {
        $('#get_yz').off('click');
      }
    }
  }

  function countdown(tag, time) {
    var i = time;
    tag.innerHTML = i + '秒后获取';
    countdowntimer = setInterval(function() {
      i--;
      tag.innerHTML = i + '秒后获取';
      if (i === 0) {
        tag.innerHTML = '重新获取';
        i = time;
        clearInterval(countdowntimer); // 清除定时器
        $('#get_yz').on('click', function() {
          getYzcode();
        });
        countdowntimer = null;
      }
    }, 1000);
  }

  // 领奖
  function sub_message() {
    var javai = Port_Sub;
    var req = {
      "openid": openid,
      "username": $('#contact').val(),
      "idcard": "idcard",
      "phonenum": $('#tel').val(),
      "address": "address",
      "prizeVcode": sessionStorage.prizeVcode,
      "prizeInfoKey": sessionStorage.infoKey,
      "captcha": $('#yz_code').val()
    };
    vge.callJApi(javai, req, function(jo) {
      if (jo.result.code == '0') {
        if (jo.result.businessCode == '0') {
          title_tip('尊敬的用户', '领取成功！', '我知道了');
          $('.yz_box,.tj_box .tj').css('display', 'none');
          $('.tj_box .tip').css('display', 'block');
          currentpagePrize = 1;
          $('.list_prize').empty();
          queryPrizeList();
        } else {
          title_tip('尊敬的用户', jo.result.msg, '我知道了');
        }
      } else {
        title_tip('尊敬的用户', jo.result.msg, '我知道了');
      }
    })
  }

  //上拉加载大奖列表
  //获取滚动条当前的位置
  function getScrollTop() {
    var scrollTop = 0;
    if (document.getElementsByClassName("list_prize")[0] && document.getElementsByClassName("list_prize")[0].scrollTop) {
      scrollTop = document.getElementsByClassName("list_prize")[0].scrollTop;
    }
    return scrollTop;
  }

  //获取当前可视范围的高度
  function getClientHeight() {
    var clientHeight = 0;
    if (document.getElementsByClassName("list_prize")[0].clientHeight && document.getElementsByClassName("list_prize")[0]
        .clientHeight) {
      clientHeight = Math.min(document.getElementsByClassName("list_prize")[0].clientHeight, document.getElementsByClassName(
        "list_prize")[0].clientHeight);
    } else {
      clientHeight = Math.max(document.getElementsByClassName("list_prize")[0].clientHeight, document.getElementsByClassName(
        "list_prize")[0].clientHeight);
    }
    return clientHeight;
  }
  //获取文档完整的高度
  function getScrollHeight() {
    return Math.max(document.getElementsByClassName("list_prize")[0].scrollHeight, document.getElementsByClassName(
      "list_prize")[0].scrollHeight);
  }

  function scrollEevnt() {
    if (getScrollTop() + getClientHeight() == getScrollHeight()) {
      if (nextPrize) {
        currentpagePrize++;
        loading('加载中');
        queryPrizeList();
      } else {
        toast('到底了！');
      }
      $('.list_prize').unbind();
    }
  }

  //上拉加载红包列表
  //获取滚动条当前的位置
  function getScrollTophb() {
    var scrollTop = 0;
    if (document.getElementsByClassName("list_hb")[0] && document.getElementsByClassName("list_hb")[0].scrollTop) {
      scrollTop = document.getElementsByClassName("list_hb")[0].scrollTop;
    }
    return scrollTop;
  }

  //获取当前可视范围的高度
  function getClientHeighthb() {
    var clientHeight = 0;
    if (document.getElementsByClassName("list_hb")[0].clientHeight && document.getElementsByClassName("list_hb")[0].clientHeight) {
      clientHeight = Math.min(document.getElementsByClassName("list_hb")[0].clientHeight, document.getElementsByClassName(
        "list_hb")[0].clientHeight);
    } else {
      clientHeight = Math.max(document.getElementsByClassName("list_hb")[0].clientHeight, document.getElementsByClassName(
        "list_hb")[0].clientHeight);
    }
    return clientHeight;
  }
  //获取文档完整的高度
  function getScrollHeighthb() {
    return Math.max(document.getElementsByClassName("list_hb")[0].scrollHeight, document.getElementsByClassName(
      "list_hb")[0].scrollHeight);
  }

  function scrollEevnthb() {
    if (getScrollTophb() + getClientHeighthb() == getScrollHeighthb()) {
      $('.list_hb').unbind();
      if (next) {
        currentpage++;
        loading('加载中');
        onepage_note();
      } else {
        toast('到底了！');
      }
    }
  }

  function give_spack() { //提现
    var javai = SPACK_PORT;
    var req = {
      "openid": openid,
      "hbopenid": hbopenid
    };
    vge.callJApi(javai, req,
      function (jo) {
        dom_loading.style.display = 'none';
        if (jo.result.code == '0') {
          if (jo.result.businessCode === '0') {
            dom_mask.style.display = 'block';
            tx = false;
          } else if (jo.result.businessCode === '1') { //1
            title_tip('提 示', '您的红包金额不足，再喝几支攒够0.3元发红包！', '我知道了');
            tx = true;
          } else if (jo.result.businessCode === '2') { //1
            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            tx = true;
          } else if (jo.result.businessCode === '4') { //1
            title_tip('提现处理中，请稍后查看详细记录', '我知道了');
            tx = true;
          } else if (jo.result.businessCode === '3') { //1
            title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
            tx = true;
          } else if (jo.result.businessCode === '-1') { //-1
            title_tip('提 示', '系统升级中...', '我知道了');
            tx = true;
          } else if (jo.result.businessCode === '-2') { //-1
            title_tip('提 示', '提现操作过于频繁', '我知道了');
            tx = true;
          } else if (jo.result.businessCode === '5') { //5
            title_tip('尊敬的用户', jo.result.msg, '我知道了');
            tx = true;
          } else {
            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            tx = true;
          }
        } else if (jo.result.code == '-1') {
          title_tip('尊敬的用户', '系统升级中...', '我知道了');
          tx = true;
        } else { //code!='0'
          title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
          tx = true;
        }
      });
  }

  // 二维码生成
  var qrcode = new QRCode("qrcodepage", {
      width:128,
      height: 128,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.M
    }),
    dom_qrbtn = document.getElementById('showcode'),
    canvas = document.getElementById('qrcodepage').childNodes[0];

  dom_qrbtn.addEventListener('click', function(ev) {
    qrcode.clear();
    var level = QRCode.CorrectLevel.M,
      size = 128;
    qrcode._htOption.correctLevel = level;
    qrcode._htOption.width = size;
    qrcode._htOption.height = size;
    canvas.width = size;
    canvas.height = size;
	// qrcode.makeCode('http://xt.vjifen.com/qr?c=f&v='+$('#qrcode').val());//测试
    qrcode.makeCode('HTTP://VJ1.TV/F/'+$('#qrcode').val());//线上
    $('.qrcode_box').css('display','block');
  });
  $('.closeQrcode').on('click',function(){
    $('.qrcode_box').css('display','none');
  });
  function loading(txt) {
    $('#loadingToast .weui_toast_content').html(txt);
    $('#loadingToast').show();
  }

  function loaded() {
    $('#loadingToast').hide();
  }

  function toast(txt) {
    $('#toast .weui_toast_content').html(txt);
    $('#toast').show();
    setTimeout(function() {
      $('#toast').hide();
    }, 2000);
  }

  // dom_more.addEventListener('click', getm, false);
  // function getm() {
  //     if (next) {
  //         ++currentpage;
  //         onepage_note(currentpage);
  //     }
  // }


  /*$('#jw_icon').css('display', 'block');
  $('#jw_icon').on('click', function () {
      $('#jiuw_box').fadeIn(1, function () {
          $('#jiuw_box div').css('bottom', '0rem');
      });
      $('#jiuw_box .close').on('click', function () {
          $('#jiuw_box div').css('bottom', '-11rem');
          $('#jiuw_box').fadeOut(1);
      });
  });*/
  dom_mask.addEventListener('click', function () {
    if(sessionStorage.openid){
      ifremeber();
    } else{
      dom_mask.style.display = 'none';
      window.location.reload();
    }
  }, false);

  /* 判断关注 */
  function ifremeber() {
    var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + sessionStorage.openid + '&appid=' + APPID;
    vge.ajxget(requrl, 5000, function (r) {
      try {
        var o = JSON.parse(r);
        if (o.subscribe == '0') { //未关注
          window.location.replace('http://' + location.host + '/v/sdqp-prs/attention.html');
        } else { //已关注用户
          window.location.reload();
        }
      } catch (e) {
        vge.clog('errmsg', [requrl, e]);
      }
    }, function (err) {
      vge.clog('errmsg', [requrl, err]);
    });
  }
})();
