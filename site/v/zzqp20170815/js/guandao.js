
manifest = [
    { src: "guandao/bg2.png", class: "" },
    { src: "guandao/logo.png", class: "" },
    { src: "guandao/gd_left.png", class: "" },
    { src: "guandao/wheel_left.png", class: "" },
    { src: "guandao/main1.png", class: "" },
    { src: "guandao/main2.png", class: "" },
    { src: "guandao/gd_top.png", class: "" },
    { src: "guandao/gd_left.png", class: "" },
    { src: "guandao/gd_right1.png", class: "" },
    { src: "guandao/gd_right2.png", class: "" },
    { src: "guandao/btn_huanju1.png", class: "" },
    { src: "guandao/btn_huanju2.png", class: "" },
    { src: "guandao/btn_my1.png", class: "" },
    { src: "guandao/btn_my2.png", class: "" },
]

/* 页面加载完毕后开始调用 */
document.addEventListener('DOMContentLoaded', function (event) {
    load(manifest, function () {
        $("#Loading").hide();
    })
})

/* 获取各项参数和dom元素 */
var args = vge.urlparse(location.href),i=0,j=0,flag1=false,flag2=false,
    bizcode = args.bizcode,
    time = document.getElementById("time");//扫码中奖时间

var headimgurl = sessionStorage.headimgurl === undefined ? '/v/zzqp/img/bg/headimg.png' : sessionStorage.headimgurl,
    nickname = sessionStorage.nickname === undefined ? '未知用户' : sessionStorage.nickname,
    sweepstr = sessionStorage.sweepstr,
    openid = sessionStorage.openid;

var Vshake = document.getElementById("shake");//抽奖按钮
if (sessionStorage.bizcode) {
    bizcode = sessionStorage.bizcode;
}
var ticketExchangeTipFlag = sessionStorage.ticketExchangeTipFlag;
if(ticketExchangeTipFlag == 1){
    title_tip('尊敬的用户','您有未领取的电影票，请于1月14日前领取，否则视为自行放弃，详见中奖记录。','我知道了');
}
if(bizcode=='19'){
	var questionList = JSON.parse(sessionStorage.questionList);
	for(i=0;i<questionList.length;i++){
		if(questionList[i].opType=='2'){
			$('#questionnaire').append('<div class="textbox _box" infoKey='+questionList[i].infoKey+'><p class="title"><b>'+(i+1)+'.</b><span>（简答）'+questionList[i].title+'</span></p><textarea placeholder="答：" maxlength="500"></textarea></div>');
		}else{
			var options = questionList[i].options.split('@#');
			if(questionList[i].opType=='1'){
				var html = '<div class="check_box _box" infoKey='+questionList[i].infoKey+'><p class="title"><b>'+(i+1)+'.</b><span>（多选）'+questionList[i].title+'</span></p>'
				for(j=0;j<options.length;j++){
					html+='<p class="answer"><label><i></i><em></em><input type="checkbox" name="radio2" id="" value="radio" /><span>'+options[j]+'</span></label></p>';
				}
				html += '</div>';
			}else{
				var html = '<div class="radio_box _box" infoKey='+questionList[i].infoKey+'><p class="title"><b>'+(i+1)+'.</b><span>（单选）'+questionList[i].title+'</span></p>'
				for(j=0;j<options.length;j++){
					html+='<p class="answer"><label><i></i><em></em><input type="radio" name='+i+' id="" value="radio" /><span>'+options[j]+'</span></label></p>';
				}
				html += '</div>';
			}
			$('#questionnaire').append(html);
		}
	}
	$('#questionnaire').append('<input type="button" name="qus_btn" id="qus_btn" value="提交" />');
	var ans = [];
	$('label').on('mousedown',function(){
		if($(this).parents('._box').attr('class').indexOf('check_box')!=-1){
			if($(this).children('input').prop('checked')==false){
				$(this).children('i').css('background-image','url(img/bg/check.png)');
			}else{
				$(this).children('i').css('background-image','none');
			}
		}else{
			$(this).parents('._box').find('i').css('background-image','none');
			$(this).children('i').css('background-image','url(img/bg/check.png)');
		}
	});
	$('#qus_btn').on('click',dot);
	function dot(){
		$('#qus_btn').unbind();
		if($('.radio_box').size()>0){
			$('.radio_box').each(function(){
				$(this).find('i').each(function(){
					if($(this).css('background-image')!='none'){
						ans.push($(this).parents('._box').attr('infoKey')+'@#'+$(this).siblings('span').html());
					}
				});
			});
		}
		if($('.check_box').size()>0){
			$('.check_box').each(function(){
				var answ = '';
				$(this).find('i').each(function(){
					if($(this).css('background-image')!='none'){
						answ += ('@#'+ $(this).siblings('span').html());
					}
				});
				if(answ!=''){
					ans.push($(this).attr('infoKey')+answ);
				}
			});
		}
		if($('.textbox').size()>0){
			if($('.textbox').children('textarea').val()!=''){
				ans.push($('.textbox').attr('infoKey')+'@#'+$('.textbox').children('textarea').val());
			}
		}
		if(ans.length<$('._box').size()){
			title_tip('尊敬的用户', '答案不能为空！', '我知道了',undefined,dott);
		}else{
			console.log(ans);
			ques();
		}
		ans = [];
	}
}
function dott(){
	$('#qus_btn').on('click',dot);
}

/* 页面提示 */
switch (bizcode) {
    case '1':
        $('#comTips').css('display', 'block');
        $('#comTips .tips').html('该二维码不存在');
        break;
    case '0':
        ks();
        break;
    case '19'://问卷
        $('.question_box').css('display', 'block');
        break;    
    case '2'://积分码已被使用
        $('#noprizeTier3').css('display', 'block');
        break;
    case '11'://用户重复扫
        $('#noprizeTier3').css('display', 'block');
        break;
    case '15'://一等奖核销
        $('#firstprize').css('display', 'block');
        $('#time').html(sessionStorage.earnTime);
        $('#firstprize').on('click', function () {
            wx.closeWindow();//未中奖关闭窗口
        });
        break;
    case '3':
        $('#comTips').css('display', 'block');
        $('#comTips .tips').html('二维码已过期');
        break;
    case '4':
        $('#comTips').css('display', 'block');
        $('#comTips .tips').html('活动未开始<br /><span style="font-size:0.2;font-weight:400;">' + sessionStorage.remarks + '<br />服务热线：01085418107</span><br/>工作时间：9:00-17:00');
        break;
    case '5':
        $('#comTips').css('display', 'block');
        $('#comTips .tips').html('活动已结束');
        break;
    case '-1':
        $('#comTips').css('display', 'block');
        $('#comTips .tips').html('系统升级中...');
        break;
    default:
        $('#comTips').css('display', 'block');
        $('#comTips .tips').html('呜呜~已经被扫过了~<br>关闭页面，重新去抽奖一次吧。');
        break;
}

/* 弹窗关闭按钮 */
$('._close').on('click', function () {
    _hmt.push(['_trackEvent', '点击关闭', '查看我的', '抽奖页面']);
    location.href = 'http://' + location.host + '/zzqp20170815/too/myList';
});

function ks() {
    setTimeout(function () {
        $('#cj').fadeIn();
        document.getElementById('xiuxiu').play();
        setTimeout(function () {
            $('.tic,.guan').fadeIn();
        }, 1200)
    }, 4000);
}




function ques(){
	var javai = vge.zzqp + '/DBTHNQPInterface/questionnaire/quarterRank';//摇一摇接口
    var req = {
        "openid": openid,
        "answer":ans
    };
    vge.callJApi(javai, req, function (jo) {
            if (jo.result.code == '0') {
                if (jo.result.businessCode == '0') {
                	bizcode=0;
                	title_tip('尊敬的用户', '感谢作答，提交成功！', '我知道了',undefined,close);
                }else{
                	$('#qus_btn').on('click',dot);
                	title_tip('尊敬的用户', jo.result.msg, '我知道了');
                }
            } else {//code!='0'
            	$('#qus_btn').on('click',dot);
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            }
        });
}

function close(){
	$('.question_box').css('display', 'none');	
	setTimeout(function () {
        $('#cj').fadeIn();
        document.getElementById('xiuxiu').play();
        setTimeout(function () {
            $('.tic,.guan').fadeIn();
        }, 1200)
    }, 1000);
}

//点击拉杆开始抽奖
Vshake.addEventListener("click", Vzj, false);//摇奖

function Vzj() {//抽奖
    Vshake.removeEventListener("click", Vzj, false);
    _hmt.push(['_trackEvent', '点击抽奖按钮', '抽奖', '抽奖页面']);
    sessionStorage.bizcode = '2';
    if (bizcode == '0') {
        var javai = vge.zzqp + '/DBTHNQPInterface/sweep/getGiftPacks';//摇一摇接口
        var req = {
            "openid": openid,
            "sweepstr": sweepstr,//码的内容
            "longitude": sessionStorage.longitude === undefined ? '00' : sessionStorage.longitude, //"经度"
            "latitude": sessionStorage.latitude === undefined ? '00' : sessionStorage.latitude //维度
        };
        vge.callJApi(javai, req, function (jo) {
            if (jo.result.code == '0') {
                if (jo.result.businessCode == '0') {
                    sessionStorage.currentMoney = jo.reply.currentMoney;
                    sessionStorage.infoKey = jo.reply.infoKey;//猜拳需要
                    sessionStorage.tableSuffix = jo.reply.tableSuffix;
                    //0:现金红包, 1:实物奖, 3:电影票, 4:游戏PK. 5:一等奖(游轮)
                    //zj(1),zj(2),zj(3),zj(4),zj(5)->
                    //游轮 电影票 猜拳 奥古特 红包
                    switch (jo.reply.prizeType) {
                        case '0':
                            sessionStorage.code = 5;
                            break;
                        case '1':
                            sessionStorage.code = 4;
                            break;
                        case '3':
                            sessionStorage.code = 2;
                            break;
                        case '4':
                            sessionStorage.code = 3;
                            break;
                        case '5':
                            sessionStorage.code = 1;
                            break;
                    }
                    zj(Number(sessionStorage.code));
                }
            } else {//code!='0'
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            }
        });
    }
}

//zj(1),zj(2),zj(3),zj(4),zj(5)->
//逼格 娱乐   躁动 放肆   红包
//游轮 电影票 猜拳 奥古特 红包
function zj(x) {
    document.getElementById('chua').play();
    $('.gz').fadeOut(); $('.xz').fadeIn();
    $('#cj .gz2 img').attr('src', '/v/zzqp20170815/img/guandao2/gz2_' + x + '.png');

    setTimeout(function () {
        location.href = 'http://' + location.host + '/zzqp20170815/txo/result';
    }, 5000);
}
