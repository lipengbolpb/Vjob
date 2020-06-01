(function () {
    "use strict";
    ini_wxshare(vge.libyappid);
    var dom_sub=document.getElementById('submit'),
        content_ul=document.getElementById('content_ul'),
        ul_ipts=content_ul.getElementsByTagName('input'),
        content_ol=document.getElementById('content_ol'),
        ol_ipts=content_ol.getElementsByTagName('input'),
        reg_success=document.getElementById('reg_success'),
        success_tip=document.getElementById('success_tip'),
        get_code=document.getElementById('get_code'),
        yz_code=document.getElementById('yzcode'),
        dom_record=document.getElementById('record'),
        top_txt=document.getElementById('top_txt');
    var args = vge.urlparse(location.href),
        latitude, longitude, accuracy,
        openid = args.bopenid,
        hbopenid = args.openid,
        scan_res = args.reg==undefined; //从url判断是直接注册还是扫码领红包注册
    
    var reg1 = /^(\w|[\u4E00-\u9FA5])*$/,
        reg2 = /^(13[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-9]{1})/,
        reg3 = /^([0-9]{4})$/;

    var locationed=false;
    wx.ready(function() {
        wx.getLocation({        // 获取位置信息
            type: 'wgs84',// 默认为wgs84的gps坐标
            complete: function (res) {   //接口调用完成执行回调，无论成功失败
                // console.log(res);
                latitude = res.latitude;  // 纬度，浮点数，范围为90 ~ -90
                longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180
                accuracy = res.accuracy;  // 位置精度
                locationed = true;
            }
        });
    });
    if (!scan_res) {//直接注册
        top_txt.innerHTML='完成注册赚返利';
        dom_sub.innerHTML='注册';
        //title=注册;
        dom_record.innerHTML='好的，我知道了';
        success_tip.getElementsByTagName('p')[1].innerHTML='恭喜您完成注册，可以赚钱啦';
    }
    //点击获取验证码
    var cangetcode = true;
    get_code.addEventListener("click",function () {
        if (reg2.test(ol_ipts[1].value.substring(0,3))&&ol_ipts[1].value.length == 11&&ol_ipts[1].value.indexOf(" ") == -1) {//满足条件
            if (cangetcode) {//第一次获取或者验证码倒计时完了
                cangetcode = false;

                var japi = vge.liby + '/DBTLBInterface/user/getCaptcha';
                var data={
                    "phonenum":ol_ipts[1].value
                };
                vge.callJApi(japi, data, function(obj){
                    switch(obj.result.businessCode) {
                    case '0'://调获取验证码接口成功之后开始倒计时
                        countdown(get_code, 60);
                        break;
                    case '1':
                        toptip('加载失败:'+obj.result.msg,5000);
                        break;
                    case '2':
                        toptip('手机号错误！',5000);
                        break;
                    default:
                        toptip('error:'+obj.result.businessCode+','+obj.result.msg,5000);
                    }
                });
            }
        } else {
            toptip("请填写正确的手机号！",5000);
        }
    },false);
    var countdowntimer=null;
    function countdown(tag, time) {
        var i = time;
        tag.style.color="#EA5955";
        tag.innerHTML='剩余' + i + 's';
        countdowntimer = setInterval(function () {
            i--;
            tag.innerHTML='剩余' + i + 's';
            if (i === 0) {
                tag.style.color="#7A7572";
                tag.innerHTML='重新获取';
                i = 60;
                clearInterval(countdowntimer); // 清除定时器
                countdowntimer = null;
                cangetcode = true;
            }
        }, 1000);
    }
    //提交信息
    dom_sub.addEventListener("click",function () {
        if (!reg1.test(ul_ipts[0].value)||ul_ipts[0].value === "") {
            toptip("请填写正确的店铺名称！",5000);
        } else if (!reg1.test(ul_ipts[1].value)||ul_ipts[1].value === "") {
            toptip("请填写正确的店主姓名！",5000);
        } else if (ul_ipts[2].value === "") {
            toptip("请选择店铺所在城市！",5000);
        } else if (!reg1.test(ul_ipts[3].value)||ul_ipts[3].value === "") {
            toptip("填写正确的地址信息！",5000);
        } else if (!reg1.test(ol_ipts[0].value)) {
            toptip("请填写正确的营业执照号！",5000);
        } else if(!reg2.test(ol_ipts[1].value.substring(0,3))||ol_ipts[1].value.length !== 11||ol_ipts[1].value.indexOf(" ") !== -1){
            toptip("请填写正确的手机号！",5000);//您的手机号已注册过账号！
        } else if(!reg3.test(ol_ipts[2].value)||ol_ipts[2].value.indexOf(" ") !== -1){
            toptip("请输入正确的验证码！",5000);
            yz_code.className="error";
        } else{//信息格式正确
            var citys=ul_ipts[2].value.split(" ");
            if (locationed) {
                submit_msg(citys[0],citys[1],citys[2]);
            } else{
                toptip("正在获取位置信息，稍后重试",5000);
            }
        }
    },false);

    function submit_msg (a,b,c){
        var japi = vge.liby + '/DBTLBInterface/activity/saveStoreInfo';
        var data={
            "operType":'create', // "操作类型 新增=create|编辑=update",
            "openid": openid,
            "infoKey":"",//店铺key 编辑时使用 创建时为空即可
            "storeName":ul_ipts[0].value,
            "ownerName":ul_ipts[1].value,
            "phoneNumber":ol_ipts[1].value,
            "businessLicenseNo":ol_ipts[0].value,
            "province":a,
            "city":b,
            "district":c,
            "address":ul_ipts[3].value,
            "longitude":longitude,
            "latitude":latitude,
            "veriCode":ol_ipts[2].value
        };
        vge.callJApi(japi, data, function(obj){
            switch(obj.result.businessCode) {
            case '0':
                if (scan_res) {//扫码领现金
                    get_redpack();//领红包
                } else{//直接注册
                    yz_code.className="";
                    reg_success.style.display="block";
                }
                break;
            case '1':
                toptip('保存失败:'+obj.result.msg,5000);
                break;
            case '3':
                toptip('验证码错误',5000);
                break;
            default:
                toptip('error:'+obj.result.businessCode+','+obj.result.msg,5000);
            }
        });
    }
    
    function get_redpack () {
        var japi = vge.liby + '/DBTLBInterface/gifts/getGiftspack';
        var data={
            "openid": openid,
            "hbopenid":hbopenid
        };
        vge.callJApi(japi, data, function(obj){
            switch(obj.result.businessCode) {
            case '0':
                yz_code.className="";
                reg_success.style.display="block";
                break;
            case '1':
                toptip('领取失败:'+obj.result.msg,5000);
                break;
            default:
                toptip('error:'+obj.result.businessCode+','+obj.result.msg,5000);
            }
        });
    }
    
    ol_ipts[2].addEventListener("keyup",function () {
        if (ol_ipts[2].value=="") {
            yz_code.className="";
        }
    },false);
    dom_record.addEventListener("click",function () {
        if (scan_res) {
            location.href="/liby/t/my_record?bopenid="+openid+'&openid='+hbopenid;
        } else{
            // location.href='/liby/t/jf_indiana?openid='+openid;
            location.href='/liby/t/reb_detail?openid='+openid;
        }
    },false);
})();
