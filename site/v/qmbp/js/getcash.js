$(document).ready(function () {
    // 从缓存中获取各项参数
    var currentMoney = Number(sessionStorage.currentMoney),
        totalAccountMoney = Number(sessionStorage.totalAccountMoney),
        earnTime = sessionStorage.earnTime,
        openid = sessionStorage.openid,
        args = vge.urlparse(location.href),
        bizcode = args.bizcode,
        // hbopenid = args.openid,
        tx = true,
        disabled = true,
        ticketInfo = null,
        first = true;
    var jkType = sessionStorage.cardNo == undefined ? '' : sessionStorage.cardNo;  // 获得的集卡
    // alert('卡卡卡'+ jkType);
    //为了判断2020年
    var skuYear = sessionStorage.skuYear == undefined ? '' : sessionStorage.skuYear; 
    // 用户当前活动当天扫码次数
    var dayScanNum = sessionStorage.dayScanNum == undefined ? '3' : sessionStorage.dayScanNum;
    sessionStorage.isPopAd = 'true';//弹广告页之前禁止拆红包
    if(skuYear == '2020'){ //2020年
		$('.slogan').attr('src','/v/qmbp/img/slogan2020.png');
    }
	if(sessionStorage.ticketInfo)	{
		ticketInfo = JSON.parse(sessionStorage.ticketInfo);
	}
    // again用来判断是否有点击过拆红包这个动作
    var again = sessionStorage.again === undefined ? false : sessionStorage.again;
    
    if (bizcode != '11' && again != 'true') {
        // 春节
        if(new Date().getTime()<new Date(2020,0,31) && sessionStorage.dayScanNum<3){//即日起~1.30 每日两次
        	setTimeout(function(){
        		$('.active').css('display','flex');
        		$('.active .activeClose').on('click',function(e){
        			e.stopPropagation();
        			$('.active').css('display','none');
        		})
        		sessionStorage.isAdAlert = 'false';
        	},800);
        }else{
        	sessionStorage.isAdAlert = 'false';
        }  
		// 集卡活动广告
		if ( Number(dayScanNum) < 3 && sessionStorage.isPopAd=='true'&&sessionStorage.province == '辽宁省') { //每天弹两次
			setTimeout(function() {	
				$('.jkAd').css('display', 'block');
				$('.jkAd .activeClose').on('click', function(event) {
					event.stopPropagation();
					$('.jkAd').css('display', 'none');	
				});
				sessionStorage.isPopAd=false;
			}, 800);	
		} else{
			sessionStorage.isPopAd=false; 
		}
    } else {
        $('.active').css('display', 'none');
    }
	
    // 得到集卡
    function showCard(){
        //卡类型 A:镇 B:斟 C:观 D:闻 E:摇 F:饮 G:品
		switch (jkType){
			case 'A':$('.card').attr('src','/v/qmbp/img/jk/bigzhen.png');
                     $('.card').attr('class','zhen');
                     $('.card').delay(500).fadeIn(300);
				break;
			case 'B':$('.card').attr('src','/v/qmbp/img/jk/bigzhuo.png');
                    $('.card').attr('class','zhuo');
                    $('.card').delay(500).fadeIn(300);
				break;
			case 'C':$('.card').attr('src','/v/qmbp/img/jk/bigguan.png');
                    $('.card').attr('class','guan');
                    $('.card').delay(500).fadeIn(300);
				break;	
			case 'D':$('.card').attr('src','/v/qmbp/img/jk/bigwen.png');
                    $('.card').attr('class','wen');
                    $('.card').delay(500).fadeIn(300);
				break;
			case 'E':$('.card').attr('src','/v/qmbp/img/jk/bigyao.png');
                    $('.card').attr('class','yao');
                    $('.card').delay(500).fadeIn(300);
				break;
			case 'F':$('.card').attr('src','/v/qmbp/img/jk/bigyin.png');
                    $('.card').attr('class','yin');
                    $('.card').delay(500).fadeIn(300);
				break;	
            case 'G':$('.card').attr('src','/v/qmbp/img/jk/bigpin.png');
                    $('.card').attr('class','pin');
                    $('.card').delay(500).fadeIn(300);
				break;
		}
    }
    // 我知道了消失集卡框
    $('.iknowBtn').on('click', function () {
        $('.getCardToast').css('display','none')
    })
    // 刮刮层canvas
    function initCanvas() {

        var w = document.body.clientWidth * 0.55,
            h = 150;

        document.querySelector('body').addEventListener('touchstart', function (e) {
            var e = e || window.event;
            // e.preventDefault();
        });
        var c = document.getElementById('cardCanvas');
        var ctx = c.getContext('2d');
        c.width = w; //画布宽  
        c.height = h; //画布高  
        var img = new Image(); // 创建img元素
        img.src = '/v/qmbp/img/canvas-mask.png?v=1'; // 设置图片源地址
        img.onload = function () {
            // 执行drawImage语句
            ctx.drawImage(img, 0, 0, w, h);
        }
        // ctx.globalCompositeOperation = "destination-out"; //新图像和原图像重合部分变透明  
        //移动端  
        c.addEventListener('touchstart', function (e) {
            $('.notice').css('display', 'block');
            $('#btn').css({
                'background-color': '#ffd732',
                'color': '#cd0712'
            });
            disabled = false;
            var e = e || window.event;
            var x = e.touches[0].clientX - c.offsetLeft;
            var y = e.touches[0].clientY - c.offsetTop;
            ctx.moveTo(x, y)
            c.addEventListener('touchmove', gmove, false)
        }, false)
        c.addEventListener('touchend', function () {
            clearC();            
        }, false)
        //PC端  
        c.addEventListener('mousedown', function (e) {
            var e = e || window.event;
            var x = e.clientX - c.offsetLeft;
            var y = e.clientY - c.offsetTop;
            ctx.moveTo(x, y)
            c.addEventListener('mousemove', gmove, false)
        }, false)
        c.addEventListener('mouseup', function () { 
            clearC();        
            c.removeEventListener('mousemove', gmove, false)
        }, false)

        function gmove(e) { //刮卡函数  
            if (typeof e.touches != 'undefined') {
                e = e.touches[0];
            }
            var mx = e.clientX - c.offsetLeft;
            var my = e.clientY - c.offsetTop;
            ctx.strokeStyle = "white";
            ctx.lineCap = "round"; //绘制的线结束时为圆形  
            ctx.lineJoin = "round"; //当两条线交汇时创建圆形边角  
            ctx.lineWidth = 30;
            ctx.lineTo(mx, my);
            ctx.stroke();
            ctx.globalCompositeOperation = "destination-out";
        }

        function clearC() { //刮开一定面积执行擦除画布函数  
            var data = ctx.getImageData(0, 0, c.width, c.height).data;
            for (var i = 0, j = 0; i < data.length; i += 4) { //data.length=c.width*c.heigth*4,一个像素块是一个对象RGBA四个值,A范围为0~255  
                if (data[i] && data[i + 1] && data[i + 2] && data[i + 3]) { //存在imageData对象时j加1  PS:该像素区域透明即为不存在该对象  
                    j++;
                }
            }
            if (j <= c.width * c.height * 0.5) { //超过canvas面积的20%，就清除画布  
                ctx.clearRect(0, 0, c.width, c.height);

                if(ticketInfo){   //动态优惠券
                    if(ticketInfo.ticketType == '3' && bizcode != '11'){
                        setTimeout(()=>{
                            $('.ewmBox').show();  //展示二维码
                            $('.link').show();
                        },100)
                    }
                }

				$('#btn').show();
            }
        }

    }
    if (bizcode == '11' || again == 'true') {
        events();
        $('#cash').css('display', 'none');
        $('#getted').css('display', 'block');
        $('#btn').css({
            'background-color': '#ffd732',
            'color': '#cd0712'
        });
        disabled = false;
        $('.earn').html('<span style="font-weight:normal;font-size:0.7rem">您已扫过</span><br><span>每瓶仅限扫码一次</span>');
        if (ticketInfo && ticketInfo.categoryName != '') { //优惠券
            $('.earnTime').html('您已于' + earnTime + '扫过这瓶酒<br>并获得优惠券');
        } else {
            $('.earnTime').html('您已于' + earnTime + '扫过这瓶酒<br>并获得<span style="font-weight:bold">¥' + currentMoney + '元</span>');
        }
        $('.earnTime').css('display', 'block');
    } else if (bizcode == '0') {
		$('#btn').hide();
        $('#cash').css('display', 'block');
        $('#getted').css('display', 'none');
        $('#btn').css({
            'background-color': '#c0c0c0',
            'color': '#ffffff'
        });
        disabled = true;
    }

    // 点击'开'按钮
    $('.open,.bag').on('touchstart', function () {
        if(sessionStorage.isPopAdS=='true'){
            return false;  //广告之前禁止开红包
        }
        initCanvas();
        $('.open').addClass('kai');
        sessionStorage.again = true;
        setTimeout(function () {
            $('#cash').fadeOut(800);
            initClipboard&&initClipboard();
            if(jkType){
                $('.getCardToast').css('display','block');
                showCard();
            };
            $('#getted').fadeIn(800, function () {
                events();
            });
        }, 1000);
    });
    // var ticketInfo = {
    //     categoryName: '哈哈',
    //     ticketType: '1',
    //     ticketCode: 'QWERTYUIOPA'
    // }

    //  生成二维码

    //将canvas返回的图片添加到image里
    // $('.ewmBox').show();  //展示二维码
    // $('.link').show();
   

    // new QRCode(document.getElementById("QRCodeNone"), {
    //     text: 'www.baidu.com', //二维码数据
    //     width: 110,
    //     height: 110
    // });
    // //在小米或者华为手机上生成的二维码是通过canvas展示的，img标签被隐藏,所以需要特殊处理一下，将canvas标签隐藏，拿到生成的url放到img里面再展示出来
    // var myCanvas = document.getElementsByTagName('canvas')[1]; //此处上面
    // var img = convertCanvasToImage(myCanvas);
    // console.log(img)
    // $("#QRCode").append(img);

    // function convertCanvasToImage(canvas) {
    //     console.log(canvas)
    //     var image = new Image();
    //     image.src = canvas.toDataURL("image/png");
    //     console.log(image)
    //     return image;
    // }


    function events() {
        $('#btn').hide();

        if (ticketInfo&&ticketInfo.categoryName != '') { //优惠券
            if (bizcode == '11' || again == 'true') {
                $('#btn').show();
                $('#btn').val('查看我的红包');
                document.getElementById('btn').addEventListener('touchstart', function () {
                    ifremeber(true); //判断关注
                }, false);
                $('.earn').css('display', 'block');
                $('.coupon').css('display', 'none');
                document.getElementsByClassName('link')[0].innerHTML = '活动规则';
                document.getElementsByClassName('link')[0].addEventListener('touchstart', function () {
                    window.location.href = 'https://mp.weixin.qq.com/s?__biz=MzU2NjMyNTAzMw==&mid=100000005&idx=1&sn=0290eb9f3eddf1d7cd0302131a549260&chksm=7caf7b434bd8f255c8e94cd828c4c339208a5e85ebcb8cbc77c31a7d7b8e26fc1c16364f3925#rd';
                }, false);
                // $('.earnTime').html('您已于' + earnTime + '扫过这瓶酒<br>并获得优惠券');
            } else {
                $('#btn').val('立即领取');
                if (ticketInfo.ticketType == '1') { //券码
                    $('.couponMain').text(ticketInfo.ticketCode);
                    $('#btn').show();
                } else if (ticketInfo.ticketType == '0') { //链接
                    $('.couponText').hide();
                    $('#btn').show();
                } else if (ticketInfo.ticketType == '3') { //动态优惠券  青啤官方商城优惠券
                    $('.cvsBg').attr("src","/v/qmbp/img/canvas-bg1.png");
                    // $('.cvsBg').css({'width':'54%','left':'24%'});
                    $('.coupon .couponRight').css('border','none');
                    $('.couponName').css({'fontSize': '.58rem',"marginLeft":".6rem"})
                    $('.couponLimit').hide();
                    $('.couponText').hide();
                    $('.link').hide();
                    // $('.ewmBox').show();

                    // 生成二维码

                    new QRCode(document.getElementById("QRCodeNone"), {
                        text: ticketInfo.ticketCode, //二维码数据 'www.baidu.com'
                        width: 128,
                        height: 128,
                        correctLevel : QRCode.CorrectLevel.M
                    });
                    //在小米或者华为手机上生成的二维码是通过canvas展示的，img标签被隐藏,所以需要特殊处理一下，将canvas标签隐藏，拿到生成的url放到img里面再展示出来
                    var myCanvas = document.getElementsByTagName('canvas')[1]; //此处上面
                    var img = convertCanvasToImage(myCanvas);
                    console.log(img)
                    $("#QRCode").append(img);
                
                    function convertCanvasToImage(canvas) {
                        console.log(canvas)
                        var image = new Image();
                        image.src = canvas.toDataURL("image/png");
                        console.log(image)
                        return image;
                    }

                }

                // 百元以上的券码，字体缩小，防止错乱
                if (parseFloat(ticketInfo.ticketMoney).length >= 3) {
                    $('.couponMoney').css('fontSize', '1.8rem');
                }
                $('.couponMoney').text(parseFloat(ticketInfo.ticketMoney)); //优惠券金额（20）
                $('.couponName').text(ticketInfo.categoryDesc); //优惠券类型（青啤官方商场优惠券/京东优惠券）
                $('.couponLimit').text(ticketInfo.ticketName); //优惠券名称（满100元可用）
                $('.proText').text(ticketInfo.ticketName);//优惠券名称（产品名称//白啤11度330ml*12纤体）

                document.getElementById('btn').addEventListener('click', function () {
                    if (first) {
                        if (ticketInfo.ticketType == '1') { //券
                            copy(ticketInfo.ticketCode, function () {
                                first = false;
                                title_tip('提 示', '复制成功，点击确定去领取', '确定', '', ifremeber(false)); //判断关注
                                // title_tip('提 示', '复制成功，点击确定去领取', '我知道了');
                            });
                        } else if (ticketInfo.ticketType == '0') { //链接
                            ifremeber(false,ticketInfo.ticketCode);
                            // window.location.replace(ticketInfo.ticketCode);
                        } else if (ticketInfo.ticketType == '3') { //青啤官方商城优惠券  不引导关注
                            window.location.replace('http://' + location.host + '/qmbp/too/mybag');
                        }
                    }
                }, false);
                document.getElementsByClassName('link')[0].style.left = '37%';
                document.getElementsByClassName('link')[0].innerHTML = '查看我的优惠券';
                document.getElementsByClassName('link')[0].addEventListener('touchstart', function () {
                    window.location.replace('http://' + location.host + '/qmbp/too/mybag');
                }, false);
                $('.coupon').css('display', 'block');

            }
        } else { //红包
            if (totalAccountMoney >= 1) { //大于1元可以提现
                document.getElementById('btn').addEventListener('touchstart', function () {
                    // if (tx && !disabled) {
                    //     $('.loading').css('display', 'block');
                    //     give_spack();
                    // }
					window.location.replace('http://' + location.host + '/qmbp/too/mybag');
                }, false);
            } else { //小于1元不能提现
                document.getElementById('btn').addEventListener('touchstart', function () {
                    if (!disabled) {
                        ifremeber(true); //判断关注
                    }
                }, false);
            }
            document.getElementById('mask').addEventListener('touchstart', function () {
                ifremeber(true); //判断关注
            }, false);
            if (currentMoney == 0) { //中奖金额为0
                $('.earn').css('fontSize', '0.8rem');
                $('.earn').html('离红包只差一点点！<br>再扫一瓶试试~');
            } else {
                $('#money').html(currentMoney.toFixed(2));
            }

            if (totalAccountMoney >= 1) { //大于1元可以提现
                $('.notice').html('温馨提示：您的红包累计金额为' + totalAccountMoney + '元，<br>点击上方按钮把钱拿走吧！');
                $('#btn').val('去提现');
            } else { //小于1元不能提现
                $('.notice').html('红包累计大于等于1元后可提现<br />不足1元的红包将存入零钱包');
                $('#btn').val('存入我的零钱包');
            }
            document.getElementsByClassName('link')[0].innerHTML = '活动规则';
            document.getElementsByClassName('link')[0].addEventListener('touchstart', function () {
                //为了判断2020年
                var skuYear = sessionStorage.skuYear == undefined ? '' : sessionStorage.skuYear; 
                if(skuYear == '2020'){ //2020年
                    window.location.href = 'https://mp.weixin.qq.com/s?__biz=MzU2NjMyNTAzMw==&mid=100000329&idx=1&sn=d019cbbdd6c76dd65338ad3c2f3ba9e3&chksm=7caf780f4bd8f119525ef7a4b69855ea127a73c6c9db05f062a7f9dcc9a26e14978570efdfd6#rd';
                } else{
                    window.location.href = 'https://mp.weixin.qq.com/s?__biz=MzU2NjMyNTAzMw==&mid=100000005&idx=1&sn=0290eb9f3eddf1d7cd0302131a549260&chksm=7caf7b434bd8f255c8e94cd828c4c339208a5e85ebcb8cbc77c31a7d7b8e26fc1c16364f3925#rd';
                }
            }, false);
            $('.earn').css('display', 'block');
        }
    }

    function gotoCoupon() {
        window.location.href = 'https://wqs.jd.com/promote/2015/exchangecoupons/index.html';
    }
    // 复制功能
    function copy(text, callback) {
        console.log(text);
        if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) { //ios
            var copyDOM = document.querySelector('.couponMain'); //要复制文字的节点  
            var range = document.createRange();
            // 选中需要复制的节点  
            range.selectNode(copyDOM);
            // 执行选中元素  
            window.getSelection().addRange(range);
            // 执行 copy 操作  
            var successful = document.execCommand('copy');
            try {
                var msg = successful ? 'successful' : 'unsuccessful';

                console.log('copy is' + msg);
            } catch (err) {
                console.log('Oops, unable to copy');
            }
            // 移除选中的元素  
            window.getSelection().removeAllRanges();
        } else {
            // 安卓复制的方法
            var tag = document.createElement('input');
            tag.setAttribute('id', 'cp_hgz_input');
            tag.value = text;
            document.getElementsByTagName('body')[0].appendChild(tag);
            document.getElementById('cp_hgz_input').select();
            document.execCommand('copy');
            document.getElementById('cp_hgz_input').remove();
        }

        if (callback) {
            callback()
        }
    }

    function give_spack() { //提现
        var javai = vge.common + '/vjifenInterface/gifts/getGiftspack';
        var req = {
            "projectServerName":"qmbaipi",
            "openid": openid,
            "hbopenid": hbopenid
        };
        vge.callJApi(javai, req,
            function (jo) {
                $('.loading').css('display', 'none');
                if (jo.result.code == '0') {
                    if (jo.result.businessCode === '0') {
                        $('#mask').css('display', 'block');
                        $('#cash').css('display', 'none');
                        $('#getted').css('display', 'none');
                        tx = true;
                    } else if (jo.result.businessCode === '1') {
                        title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
                        tx = false;
                    } else if (jo.result.businessCode === '2') {
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                        tx = false;
                    } else if (jo.result.businessCode === '4') {
                        title_tip('提现处理中，请稍后查看详细记录', '我知道了');
                        tx = false;
                    } else if (jo.result.businessCode === '3') {
                        title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
                        tx = false;
                    } else if (jo.result.businessCode === '-1') { //-1
                        title_tip('提 示', '系统升级中...', '我知道了');
                        tx = false;
                    } else if (jo.result.businessCode === '-2') { //-1
                        title_tip('提 示', '提现操作过于频繁', '我知道了');
                        tx = false;
                    } else if (jo.result.businessCode === '5') {
                        title_tip('提 示', jo.result.msg, '我知道了');
                        tx = false;
                    } else if (jo.result.businessCode === '-2') {
                        title_tip('提 示', '提现操作过于频繁', '我知道了');
                        tx = false;
                    } else {
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                        tx = false;
                    }
                } else if (jo.result.code == '-1') {
                    title_tip('尊敬的用户', '系统升级中...', '我知道了');
                    tx = false;
                } else { //code!='0'
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    tx = false;
                }
            });
    }

    function ifremeber(flag,url) {
        // alert(flag);
        // alert(url);
        // flag为false代表券码的判断关注
        var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.qmbpappid;
        vge.ajxget(requrl, 5000, function (r) {
            try {
                var o = JSON.parse(r);
                if (o.subscribe == '0') { //未关注
                    window.location.replace('http://' + location.host + '/v/qmbp/attention.html');
                } else { //已关注用户
                    if (flag) {
                        window.location.replace('http://' + location.host + '/qmbp/too/mybag');
                    } else {
                        window.location.replace(url);
                        // gotoCoupon();
                    }
                }
            } catch (e) {
                vge.clog('errmsg', [requrl, e]);
            }
        }, function (err) {
            vge.clog('errmsg', [requrl, err]);
        });
    }
    

    // 集卡入口
    $('.enterJK').on('click',function(){
        window.location.replace('http://' + location.host + '/qmbp/too/mycard');
    });

    // 送酒上门按钮
    addNewBtn();

    function addNewBtn() { 
        var targetUrl = '';
        var province = sessionStorage.province;
        var city = sessionStorage.city;
        var cities = ['承德市', '张家口市', '秦皇岛市', '唐山市', '北京市'];
        var urls = [
            ['承德市', 'http://smp.tsingtao.com.cn/yhb/#/buy2c?areacode=288841'],
            ['张家口市', 'http://smp.tsingtao.com.cn/yhb/#/buy2c?areacode=288822'],
            ['秦皇岛市', 'http://smp.tsingtao.com.cn/yhb/#/buy2c?areacode=288744'],
            ['唐山市', 'http://smp.tsingtao.com.cn/yhb/#/buy2c?areacode=288728'],
            ['北京市', 'http://smp.tsingtao.com.cn/yhb/#/buy2c?areacode=288661']
        ];
        if (province === '北京市') {
            targetUrl = 'http://smp.tsingtao.com.cn/yhb/#/buy2c?areacode=288661'
        } else if (cities.indexOf(city) !== -1) {
            targetUrl = urls[cities.indexOf(city)][1];
        }
        if (targetUrl) {
            $('#btn-to-home').css('display', 'block');
            $('#btn-to-home').click(function () {
                setTimeout(function () {
                    window.location.href = targetUrl;
                }, 10);
                _hmt.push(['_trackEvent', 'click', '领取红包页', '点击送酒上门按钮-全麦白啤']);
            })
        }
    }



    /***********618彩蛋***********/
    console.log(isInTimeRange &&isInTimeRange(), 'specialDialog');
    
    if (bizcode == 11 || again == 'true') {
        initClipboard&&initClipboard();
    } else if(isInTimeRange&&isInTimeRange()){

        specialDialog&&specialDialog('/v/qmbp/img/618/dialog-2020-618.png');
    }

    function initClipboard() {
        var taoEasterEgg = sessionStorage.taoEasterEgg;
        var taoFlag = sessionStorage.taoMemberOrderFlag;
        if (!taoEasterEgg) {
            return
        }

        var htmlStr = '';
        setTimeout(function () {
            $('.taocd618').fadeIn();
        }, 1000);
        if ($('.taocd618').length) {
            $('.taocd618').fadeIn();
        } else {
            var caidan = '<div class="taocd618" style="width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.8);position: absolute;top: 0;left: 0;z-index: 99;display:none;"><div style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;"><div class="cdbox618" style="height: 12.5rem;position: relative;margin-top:-1.6rem;"><input type="text" id="tkl618" value="easterEggFlag" readonly style="position:absolute; top:2rem;left:1rem; z-index:-1;opacity:0;"/><img src="/v/qmbp/img/618/i2020618-caidan.png" class="caidan618"   style="width: 13.44rem; height: auto;"><img class="close_cd618" src="/v/qmbp/img/618/dialog-2020-close.png" style="height: 1.24rem;width:1.24rem;position:absolute; top:0rem;right:0.8rem;"><img class="copy_cd618 copy-caidan" src="/v/qmbp/img/618/i2020618-btn.png" style="height: 1.62rem;width:7.04rem;position:absolute; top:8.5rem;left:50%;margin-left: -3.77rem;" data-clipboard-action="copy" data-clipboard-target="#tkl618"></div></div></div>';


            var ruhui = '<div class="taocd618" style="width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.8);position: absolute;top: 0;left: 0;z-index: 99;display:none;"><div style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;"><div class="cdbox618" style="height: 12.5rem;position: relative;margin-top:-1.6rem;"><input type="text" id="tkl618" value="easterEggFlag" readonly style="position:absolute; top:2rem;left:1rem; z-index:-1;opacity:0;"/><img src="/v/qmbp/img/618/i2020618-kouling.png" class="caidan618"   style="width: 14rem; height: auto;"><img class="close_cd618" src="/v/qmbp/img/618/dialog-2020-close.png" style="height: 1.24rem;width:1.24rem;position:absolute; top:0.24rem;right:1rem;"><img class="copy_cd618 copy-caidan" src="/v/qmbp/img/618/i2020618-btn.png" style="height: 1.62rem;width:7.04rem;position:absolute; top:8.6rem;left:50%;margin-left: -3.77rem;" data-clipboard-action="copy" data-clipboard-target="#tkl618"></div></div></div>';

            if (taoFlag == 1) {
                htmlStr = ruhui;
                console.log('入会');

            } else {
                htmlStr = caidan;
                console.log('彩蛋');
            }
            htmlStr = htmlStr.replace('easterEggFlag', taoEasterEgg);

            $('body').append(htmlStr);
            setTimeout(function () {
                $('.taocd618').fadeIn();
                $('.close_cd618').on('click', function () {
                    $('.taocd618').fadeOut();
                });

                $('.copy_cd618').click(function () {
                    console.log('caidan click');
                    var clipboard = new ClipboardJS('.copy_cd618');
                    clipboard.on('success', function (e) {
                        console.log(e);
                        $('.taocd618').fadeOut();
                        setTimeout(function () {
                            toast('复制口令成功')
                        }, 100);
                    });
                    clipboard.on('error', function (e) {
                        console.log(e);
                    });
                });
            }, 1000);


        }


    }

    function specialDialog(dialogImg, id) { //
        var dayScanNum = sessionStorage.dayScanNum;
        if (Number(dayScanNum) !== Number(dayScanNum) || dayScanNum > 3) {
            return
        }
        sessionStorage.isPopAd = true;
        var specialIdName = 'spexx' + (id || 'xts');
        var specialId = '#' + specialIdName;
        if ($('#btn2020Close').length) {
            $(specialId).fadeIn();
            $(specialId + ' .dialog-img').attr('src', dialogImg)
        } else {
            var dialogStr = '<div id="' + specialIdName + '" style="width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.8);position: absolute;top: 0;left: 0;z-index: 99;display: none;"><div style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;"><div style="width: 75%;"><img class="dialog-img" src="' + dialogImg + '" alt="" style="width: 100%; height: auto; position: relative; z-index: 2;"><div id="btn2020Close" style="width: 2rem; height: 2rem; background:url(/v/qmbp/img/618/dialog-2020-close.png) no-repeat center top; background-size: 1.24rem 1.24rem;margin: 0.1rem auto 0;"></div></div></div></div>'


            $('body').append(dialogStr);
            setTimeout(function () {
                $(specialId).fadeIn();
                sessionStorage.isPopAd = false;
                $('#btn2020Close').click(function () {

                    $(specialId).fadeOut();
                })
            }, 500);
        }
    }
    // 判断是否在5月25至6月20日之间
    function isInTimeRange() {
        var startTime = new Date(2020, 4, 25).setHours(0, 0, 0);
        var endTime = new Date(2020, 5, 20).setHours(23, 59, 59);
        var curTime = new Date().getTime();
        
        if (curTime > startTime && curTime < endTime) {
            console.log(true);
            return true
        } else {
            console.log(false);
            return false
        }
        console.log(curTime, new Date(startTime), new Date(endTime));

    }

    function toast(txt) {
        $('#toast .weui_toast_content').html(txt);
        $('#toast').show();
        setTimeout(function () {
            $('#toast').hide();
        }, 2000);
    }
    /***********618彩蛋***********/
});