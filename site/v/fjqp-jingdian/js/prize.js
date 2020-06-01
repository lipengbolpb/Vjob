(function () {
  'use strict'
  var CHECKCODE_URL = vge.fjqp + '/DBTFJQPInterface/user/getCaptcha';
  var SUBMESSAGE_URL = vge.fjqp + '/DBTFJQPInterface/user/savePrize';
  var RULE_HREF = 'https://mp.weixin.qq.com/s?__biz=Mzg3MzE0Mjc3NQ==&mid=100000005&idx=1&sn=7221a7cf4b590920cf7d4412fd59d4c6&chksm=4ee5c19d7992488b82702997f715f1cce876da8c8344efa61ab409899f6849bc06ef506d1d1a#rd';
  var RULE_HREF1 = 'https://mp.weixin.qq.com/s?__biz=MzIzMTA1NzgzNw==&mid=100000141&idx=1&sn=053490c136d62df82dca27c55e4c0eb3&chksm=68a8b14f5fdf3859ca90dc0a92b2f437da03717537a5cb20cfce631a183b0e6a74ba6bd71491#rd';
  // 经典10度
  var RULE_HREF2 = 'https://mp.weixin.qq.com/s?__biz=MzIzMTA1NzgzNw==&mid=100000139&idx=1&sn=8ac9bea394957a11d716bfa2c9e18f94&chksm=68a8b1495fdf385fc3db277579ab52bd232298ac5fb2dc49e6c37ed6e4a37d91b87697da627d#rd';
  // var EXPLAIN_URL = '';
  var activityVersion = sessionStorage.activityVersion;
  var PHONE_NUM = '0592-3663963';
  var PHONE_NUM1 = '0591-26163972'; // 经典8度
  var PHONE_NUM2 = '0592-3663963'; // 经典10度
  // 在这里区分经典8度和经典10度（活动规则和兑奖说明）
  if(activityVersion == 5) { // 经典8度版本号为 5
    RULE_HREF = RULE_HREF1;
    PHONE_NUM = PHONE_NUM1
    $('#li-content').html('<li>一等奖：活动截止时间：2019年9月30日，兑奖截止时间：2020年2月28日。</li>'
      + '<li>二等奖：活动截止时间：2019年9月30日，兑奖截止时间：2020年2月28日。</li>'
      + '<li>三等奖：活动截止时间：2019年9月30日，兑奖截止时间：2020年2月28日。</li>'
      + '<li>全国奖项中奖者请拨打兑奖咨询电话：0591-26163972。</li>'
      + '<li>每个瓶盖内二维码扫码成功只能获得一次奖项，逾期未兑付或逾期中出的奖项不再兑付。</li>'
      + '<li>逾期未要求兑付或逾期中出的奖项不再兑付。</li>'
      + '<li>在活动区域外购得产品，本公司将不予兑付。</li>'
      + '<li>本次活动非线上促销，通过任何电子商务平台购得的有奖产品，本公司将不予兑付。</li>')
    $('#warntip').html('温馨提示：如有疑问，可拨打' + PHONE_NUM + '核实中奖者身份信息, 以下内容须完整填写信息，否则无法兑奖。')
    
  } else {
    RULE_HREF = RULE_HREF2;// 经典10度版本号为 10
    PHONE_NUM = PHONE_NUM2
    $('#li-content').html('<li>二等奖：活动截止时间：2019年12月31日，兑奖截止时间：2020年1月31日。</li>'
      + '<li>三等奖：活动截止时间：2019年12月31日，兑奖截止时间：2020年1月31日。</li>'
      + '<li>全国奖项中奖者请拨打兑奖咨询电话：0592-3663963。</li>'
      + '<li>每个瓶盖内二维码扫码成功只能获得一次奖项，逾期未兑付或逾期中出的奖项不再兑付。</li>'
      + '<li>逾期未要求兑付或逾期中出的奖项不再兑付。</li>'
      + '<li>在活动区域外购得产品，本公司将不予兑付。</li>'
      + '<li>本次活动非线上促销，通过任何电子商务平台购得的有奖产品，本公司将不予兑付。</li>')
    $('#warntip').html('温馨提示：如有疑问，可拨打' + PHONE_NUM + '核实中奖者身份信息, 以下内容须完整填写信息，否则无法兑奖。')
  }

  var SECRET_HREF = 'https://mp.weixin.qq.com/s?__biz=MzAxNjMyMDA3NA==&mid=502316018&idx=1&sn=7a6e5c64968fb7b92ab8560b92fc7aa6&chksm=03f288d7348501c1b77b4b9862b8324db7a7e0cf2faa34bd660c20aa53f2675f45c4cf3a8d94#rd';


  var dom_get = document.getElementsByClassName('yz')[0];

  var reg1 = /^1[0-9]{10}$/, //验证手机号
    reg2 = /^[1-9][0-9xX]{17}$/, //验证身份证号
    reg3 = /^[0-9]{4}$/;

  var openid = sessionStorage.openid === undefined ? '' : sessionStorage.openid,
    unionid = sessionStorage.unionid === undefined ? '' : sessionStorage.unionid,
    username = sessionStorage.username === undefined ? '' : sessionStorage.username,
    //idcard = sessionStorage.idcard === undefined ? '' : sessionStorage.idcard,
    phonenum = sessionStorage.phonenum === undefined ? '' : sessionStorage.phonenum,
    skukey = sessionStorage.skukey === undefined ? '' : sessionStorage.skukey,
    address = sessionStorage.address === undefined ? '' : sessionStorage.address,
    earnTime = sessionStorage.earnTime === undefined ? '' : sessionStorage.earnTime,
    prizeVcode = sessionStorage.prizeVcode === undefined ? '' : sessionStorage.prizeVcode, //具体码
    grandPrizeType = sessionStorage.grandPrizeType === undefined ? '' : sessionStorage.grandPrizeType; //特等奖类别
  var countdowntimer = null;
  var again = sessionStorage.again === undefined ? '' : sessionStorage.again;
  var args = vge.urlparse(location.href),
    bizcode = args.bizcode;
  $(document).ready(function () {
    // 各奖对应的图片
    var prizeImage = {
      2: { // 青啤有一套
        img: 'img/prize3.png?v=1',
        imgBg: 'img/prize-bg3.png',
		prizeName:'青岛啤酒大奖礼盒一套'
      },
      Q: { // 青啤经典1903
        img: 'img/prize1903.png?v=1',
        imgBg: 'img/prize-bg1903.png',
		prizeName:'青岛啤酒经典(1903)330*24罐1箱'
      },
      q: { // 青啤经典1903
        img: 'img/prize1903.png?v=1',
        imgBg: 'img/prize-bg1903.png',
		prizeName:'青岛啤酒经典(1903)330*24罐1箱'
      },
      U: { // 环球
        img: 'img/prize1.png?v=1',
        imgBg: 'img/prize-bg1.png',
		prizeName:'冬奥环球之旅1次'
      },
      u: { // 环球
        img: 'img/prize1.png?v=1',
        imgBg: 'img/prize-bg1.png',
		prizeName:'冬奥环球之旅1次'
      },
      V: { // 冬令营
        img: 'img/prize2.png?v=1',
        imgBg: 'img/prize-bg2.png',
		prizeName:'冬奥冰雪冬令营1次'
      },
      v: { // 冬令营
        img: 'img/prize2.png?v=1',
        imgBg: 'img/prize-bg2.png',
		prizeName:'冬奥冰雪冬令营1次'
      },

    }
    // 根据中奖类型选择相应图片
    showCorrectPrizeImage();

    function init() {
      if (bizcode == 15) {
        $('.info').css('display', 'none');
        $('.get').css('display', 'none');
        $('.repcash').css('display', 'block');
        $('.earnTime').html(earnTime);
      } else {
        if (again == 'true' || again == true) {
          $('.info').css('display', 'block');
        } else {
          if (phonenum != '' && username != '') { //已经填写过信息
            $('.get').css('display', 'none');
            $('.info').css('display', 'block');
            $('.name').val(username);
            $('.address').val(address);
            $('.tel').val(phonenum);
            $('.name').attr('readOnly', true);
            $('.address').attr('readOnly', true);
            $('.tel').attr('readOnly', true);
            $('#btn').attr('disabled', true);
            $('.code').css('display', 'none');
            $('.yz').css('display', 'none');
            $('#btn').val('提交成功');
            $('.alert').html('温馨提示：您的信息已提交成功，请耐心等待主办方与您联系');
          } else {
            $('.get').css('display', 'block');
          }
        }
      }
    }

    $('.ck').on('click', function () {
      $('.get').fadeOut();
      $('.info').fadeIn();
      sessionStorage.again = true;
    });
    $('.ckff').on('click', function () {
      $('.change').css('display', 'block');
    });
    $('.close').on('click', function () {
      $('.change').css('display', 'none');
    });

    $('.yz').on('click', function () {
      getYzcode();
    });

    $('#btn').on('click', function () {

      if (!$('.name').val() == '' && !$('.name').val().indexOf(' ') !== -1 && reg1.test($('.tel').val()) && reg3.test($('.code').val())) {
        send();
      }
    });

    function getCheckCode(cb) { // 获取手机验证码
      var javai = CHECKCODE_URL;
      var req = {
        "phonenum": $('.tel').val(),
      };
      vge.callJApi(javai, req, function (jo) {
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
      // 地址不要输
    // else if ($('.address').val() === '' || $('.address').val().indexOf(' ') !== -1) {
    //     title_tip('提 示', '请输入正确的收货地址哦！~', '我知道了');
    //   }
      if ($('.name').val() === '' || $('.name').val().indexOf(' ') !== -1) {
        title_tip('提 示', '请输入正确的姓名哦！~', '我知道了');
      } else if (!reg1.test($('.tel').val())) {
        title_tip('提 示', '请填写正确的手机号！~', '我知道了');
      } else {
        if ($('.yz').val() === '获取验证码' || $('.yz').val() === '重新获取') {
          $('.yz').unbind();
          getCheckCode(function () {
            countdown(dom_get, 60);
          });
        } else {
          $('.yz').off('click');
        }
      }
    }

    function countdown(tag, time) {
      var i = time;
      tag.value = i + '秒';
      countdowntimer = setInterval(function () {
        i--;
        tag.value = i + '秒';
        if (i === 0) {
          tag.value = '重新获取';
          i = time;
          clearInterval(countdowntimer); // 清除定时器
          $('.yz').on('click', function () {
            getYzcode();
          });
          countdowntimer = null;
        }
      }, 1000);
    }

    function send() {
    // else if ($('.address').val() === '' || $('.address').val().indexOf(' ') !== -1) {
    //     title_tip('提 示', '请输入正确的收货地址哦！~', '我知道了');
    //   }
      if ($('.name').val() === '' || $('.name').val().indexOf(' ') !== -1) {
        title_tip('提 示', '请输入正确的姓名哦！~', '我知道了');
      }  else if (!reg1.test($('.tel').val())) {
        title_tip('提 示', '请填写正确的手机号！~', '我知道了');
      } else {
        sub_message();
      }
    }

    function sub_message() { // 提交注册信息
      var javai = SUBMESSAGE_URL;
      var req = {
        "openid": openid,
        "unionid": unionid,
        "address": $('.address').val(),
        "username": $('.name').val(),
        "idcard": 'idcard',
        "skukey": skukey,
        "phonenum": $('.tel').val(),
        "grandPrizeType": grandPrizeType,
        "prizeVcode": prizeVcode,
        "captcha": $('.code').val()
      };
      vge.callJApi(javai, req, function (jo) {
        if (jo.result.code === '0') {
          if (jo.result.businessCode === '0') {
            title_tip('提 示', '您的中奖信息我们已经收到，请拨打<br> ' + PHONE_NUM + '联系我们进行身份核实', '我知道了');
            $('.alert').html('温馨提示：您的信息已提交成功，请耐心等待主办方与您联系');
            $('#btn').val('提交成功');
            $('#btn').attr('disabled', 'true');
            $('.yz').attr('disabled', 'true');
            $('.code').css('display', 'none');
            $('.yz').css('display', 'none');
            $('.tel').css('border', 'none');
            $('.name').attr('readOnly', 'true');
            $('.address').attr('readOnly', 'true');
            $('.tel').attr('readOnly', 'true');
            sessionStorage.username = $('.name').val();
            sessionStorage.address = $('.address').val();
            sessionStorage.phonenum = $('.tel').val();
          } else if (jo.result.businessCode == '1') { //1
            title_tip('提 示', '验证码已失效', '我知道了');
          } else if (jo.result.businessCode == '2') { //2
            title_tip('提 示', '您填写的验证码有误', '我知道了');
          } else if (jo.result.businessCode == '-1') {
            title_tip('提 示', '系统升级中...', '我知道了');
          } else if (jo.result.businessCode == '4') {
            title_tip('提 示', '兑奖截止时间已过期', '我知道了');
          } else {
            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
          }
        } else { //code!='0'
          title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
        }
      });
    }

    $('.rule').on('click', function () {
      window.location.href = RULE_HREF;
    });
    $('.scheduling').on('click', function () {
      window.location.href = SECRET_HREF;
    });

    //展示正确的获奖图片
    function showCorrectPrizeImage() {
      console.log('grandPrizeType',grandPrizeType);
      var correctImgs = prizeImage[grandPrizeType]
      if(correctImgs) {
        $('.prize-one').attr("src", correctImgs.img);
        $('.prize-bg').attr("src", correctImgs.imgBg);
		$('.prizeName').html(correctImgs.prizeName)
        init();
      }
    }
  });
})()
