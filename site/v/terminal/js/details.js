(function () {
    'use strict';
    var mon_list_1 = document.getElementById("mon_list_1"),
        mon_list_2 = document.getElementById("mon_list_2"),
        itpl_onenote_1 = document.getElementById("onenote_tpl_1").innerHTML,
        itpl_onenote_2 = document.getElementById("onenote_tpl_2").innerHTML;

    var height = document.documentElement.clientHeight || document.body.clientHeight,
        h = height - $('.btn_box').height() - $('div.top').height();
    $('div.bottom').css('height', h + 'px');

    var args = vge.urlparse(location.href),
        openid = args.openid,
        hbopenid = args.hbopenid;
    var currentpage = 1,
        currentpage2 = 1,
        cash_dot = true,
        jf_dot = true,
        count = 10,
        flag = false,
        first = true;
		
	sessionStorage.openid = openid;
    if (sessionStorage.bizcode === '0') {
        $('.dot').css('display', 'inline-block');
    }
	$('.enterRank').on('click',function(){
		location.href = 'http://'+location.host+'/v/terminal/rank/rank.html';
	})

    queryMyInfo();

    function onepage_note(page, type, cb) {
        var javai = vge.terminal + '/DBTVMTSInterface/gifts/queryAllGiftsList';
        var req = {
            "openid": openid,
            "prizeType": type,
            "currentPage": page,
            "count": count
        };
        vge.callJApi(javai, req, function (jo) {
            if (jo.result.code === '0') {
                if (jo.result.businessCode === '0') {
                    var i = 0,
                        lst = jo.reply.objList,
                        l = lst.length;
                    if (l === 0 || lst === undefined) {
                        if (page == 1) {
                            $('.more').eq(type - 1).html('仅显示近30天的记录');
                            $('.more').eq(type - 1).css('font-size', '.6rem');
                            $('.more').eq(type - 1).unbind();
                            $('#mon_list_' + type).css('display', 'none');
                            $('.no_list').eq(type - 1).css('display', 'block');
                        } else {
                            $('.no_list').eq(type - 1).css('display', 'none');
                            $('.more').eq(type - 1).html('仅显示近30天的记录');
                            $('.more').eq(type - 1).css('font-size', '.6rem');
                            $('.more').eq(type - 1).unbind();
                        }
                        if (type == 1) {
                            currentpage = false;
                        } else {
                            currentpage2 = false;
                        }
                        if (cb !== undefined) {
                            cb();
                        }
                        return;
                    }
                    var params = {}, //积分红包
                        giftType = '',
                        companyShortName = '',
                        hs = {}; //现金红包
                    $('.no_list').eq(type - 1).css('display', 'none');
                    $('.more').eq(type - 1).css('display', 'block');
                    for (i = 0; i < l; ++i) {
                        giftType = lst[i].giftType;
                        if (lst[i].companyShortName) {
                            companyShortName = '-' + lst[i].companyShortName;
                        }
                        if (type == 1) {
                            params.monwhere = '积分红包' + companyShortName;
                            params.money = '+' + lst[i].earnVpoints + '积分';
                            params.imgUrl = 'background-image:url(/v/terminal/img/icon_scan.png);';
                            params.gettime = lst[i].earnTime;
                        } else if (type == 2) {
                            if (giftType === '4') {
                                if (lst[i].extractStatus == '0') {
                                    hs.monwhere = '红包提现';
                                    hs.money = '-' + lst[i].earnMoney + '元';
                                    hs.imgUrl = 'background-image:url(/v/terminal/img/icon_tx.png);';
                                } else if (lst[i].extractStatus == '1') {
                                    hs.monwhere = '提现失败_金额已退还';
                                    hs.money = lst[i].earnMoney + '元';
                                    hs.imgUrl = 'background-image:url(/v/terminal/img/icon_fail.png);';
                                } else if (lst[i].extractStatus == '2') {
                                    hs.monwhere = '提现处理中';
                                    hs.money = '-' + lst[i].earnMoney + '元';
                                    hs.imgUrl = 'background-image:url(/v/terminal/img/icon_fail.png);';
                                }

                            } else {
                                hs.monwhere = '现金红包' + companyShortName;
                                hs.money = '+' + lst[i].earnMoney + '元';
                                hs.imgUrl = 'background-image:url(/v/terminal/img/icon_scan.png);';
                            }
                            hs.gettime = lst[i].earnTime;
                        }
                        if (type == 2) {
                            mon_list_2.innerHTML += vge.renderTpl(itpl_onenote_2, hs);
                            hs = {};
                        } else {
                            mon_list_1.innerHTML += vge.renderTpl(itpl_onenote_1, params);
                            params = {};
                        }

                    }
                    if (cb !== undefined) {
                        cb();
                    }
                    if (l < count) {
                        $('.no_list').eq(type - 1).css('display', 'none');
                        $('.more').eq(type - 1).html('仅显示近30天的记录');
                        $('.more').eq(type - 1).css('font-size', '.6rem');
                        $('.more').eq(type - 1).unbind();
                        if (type == 1) {
                            currentpage = false;
                        } else {
                            currentpage2 = false;
                        }
                        if (cb !== undefined) {
                            cb();
                        }
                        return;
                    }
                } else if (jo.result.businessCode === '2') { //无红包记录
                    if (page) {
                        $('.more').eq(type - 1).html('仅显示近30天的记录');
                        $('.more').eq(type - 1).css('font-size', '.6rem');
                        $('.more').eq(type - 1).unbind();
                        $('#mon_list_1' + type).css('display', 'none');
                        $('.no_list').eq(type - 1).css('display', 'block');
                        if (type == 1) {
                            currentpage = false;
                        } else {
                            currentpage2 = false;
                        }
                    } else {
                        $('.no_list').eq(type - 1).css('display', 'none');
                        $('.more').eq(type - 1).html('仅显示近30天的记录');
                        $('.more').eq(type - 1).css('font-size', '.6rem');
                        $('.more').eq(type - 1).unbind();
                    }
                    if (cb !== undefined) {
                        cb();
                    }
                    if (type == 1) {
                        currentpage = false;
                    } else {
                        currentpage2 = false;
                    }
                    return;
                } else { //businessCode:1失败
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            } else { //code!='0'
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            }
        });
    }
    $('.more').on('click', function () {
        getm($(this).attr('type'));
    });

    function getm(type) {
        if (type == 1) {
            if (currentpage) {
                ++currentpage;
                onepage_note(currentpage, type);
            }
        } else if (type == 2) {
            if (currentpage2) {
                ++currentpage2;
                onepage_note(currentpage2, type);
            }
        }

    }
    $('#alert').on('click', function () {
        $(this).fadeOut(1);
        location.reload();
    });


    function queryMyInfo() { //查询账户金额
        var japi = vge.terminal + '/DBTVMTSInterface/gifts/queryMyInfo';
        var req = {
            "openid": openid,
            "hbopenid": hbopenid
        };
        vge.callJApi(japi, req, function (jo) {
            if (jo.result.code == '0') {
                if (jo.result.businessCode === '0') {
                    getMsg(jo);
					if(jo.reply.userInfo.consumerUserStatusList[0].companyKey=='201712002'){
						$('.jf_list,.qt_list,.yhq_list,.mallbtnbox').css('display','none');
					}
                } else if (jo.result.businessCode === '1') {
                    document.getElementById("yedai").style.display = 'none';
                    title_tip('尊敬的用户', '尚未完成终端促销认证!', '我知道了', undefined, close);
                } else if (jo.result.businessCode === '2') {
                    document.getElementById("yedai").style.display = 'none';
                    title_tip('尊敬的用户', '您暂时还没有红包记录', '我知道了', undefined, close);
                } else if (jo.result.businessCode === '3') { //游客
                    document.getElementById("yedai").style.display = 'none';
                    sessionStorage.disable = '3';
                    title_tip('尊敬的用户', '您尚未完成终端促销认证！', '我知道了', undefined, close);
                } else if (jo.result.businessCode === '4') { //业代
                    sessionStorage.disable = '4';
                    title_tip('尊敬的用户', '您尚未完成终端促销认证！', '我知道了', undefined, close);
                } else {
                    document.getElementById("yedai").style.display = 'none';
                    title_tip('尊敬的用户', jo.result.msg, '我知道了');
                }
            } else if (jo.result.code === '1') {
                document.getElementById("yedai").style.display = 'none';
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            } else {
                document.getElementById("yedai").style.display = 'none';
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            }
        });
    }

    function getMsg(jo) {
        $('.scanNum').html('<em class="iconfont icon-saoma"></em> 扫码总数: <i>' + (jo.reply.total === undefined ? '0' : jo.reply.total) + '</i>');
        $('.totalMoney').html('<em class="iconfont icon-qianbao"></em> 提现总额: <i>' + (jo.reply.giftsMoney === undefined ? '0.00' : jo.reply.giftsMoney) + '</i>');
		$('.totalVpoints').html('<em class="iconfont icon-qianbao"></em> 累计获得: <i>' + (jo.reply.totalVpoints === undefined ? '0' : jo.reply.totalVpoints) + '</i>积分');
        if (jo.reply.invalidMoney > 0) {
            var html = '';
            for (var k = 0; k < jo.reply.invalidMoneyList.length; k++) {
                html += '<p class="surplusMoney">不可提现金额：' + jo.reply.invalidMoneyList[k].surplusMoney.toFixed(2) + '元</p><p class="companyName">所属企业：' + jo.reply.invalidMoneyList[k].companyName + '</p><p class="invalidReason">不可提现原因：' + jo.reply.invalidMoneyList[k].invalidReason + '</p>';
            }
            $('#title').after(html);

        }
        sessionStorage.totalMoney = (jo.reply.totalMoney - jo.reply.invalidMoney).toFixed(2);
        sessionStorage.invalidMoney = jo.reply.invalidMoney;
		sessionStorage.totalVpoints = jo.reply.totalVpoints==undefined?0:jo.reply.totalVpoints;
		sessionStorage.surplusVpoints = jo.reply.surplusVpoints==undefined?0:jo.reply.surplusVpoints;
        if (sessionStorage.totalMoney < 1) {
            $('.ques').html('账户余额' + jo.reply.totalMoney + '元，可提现金额' + sessionStorage.totalMoney + '元，不足1元不可提现');
        } else {
            $('.ques').html('账户余额' + jo.reply.totalMoney + '元，可提现金额' + sessionStorage.totalMoney + '元，确定提现？');
        }
        if (jo.reply.userInfo.headImgUrl === '') {
            jo.reply.userInfo.headImgUrl = '/v/terminal/img/headimg.png?v=2';
        }
		if(jo.reply.userInfo.nickName === undefined){
			jo.reply.userInfo.nickName = '';
		}
        $('.head').attr('src', jo.reply.userInfo.headImgUrl);
        $('.nickname').html('昵称：' + jo.reply.userInfo.nickName);
        $('#phoneNum').val(jo.reply.userInfo.phoneNumber);
        if (jo.reply.userInfo.terminalInfo) {
            $('#address .address_1').html(jo.reply.userInfo.terminalInfo.province + jo.reply.userInfo.terminalInfo.city + jo.reply.userInfo.terminalInfo.county);
            $('#address .address_2').html(jo.reply.userInfo.terminalInfo.address);
            $('#store').val(jo.reply.userInfo.terminalInfo.terminalName);
            $('#time').val(jo.reply.userInfo.userName);
        }
		// 按需显示信息
		if (jo.reply.companyInfoList) {
		    for (var o = 0; o < jo.reply.companyInfoList.length; o++) {
		        if(jo.reply.companyInfoList[o].companyName === '终端促销河北'){//显示提醒
		            $('.notice').css('display', 'block');
					sessionStorage.companyName = jo.reply.companyInfoList[o].companyName;
		        }
				if(jo.reply.companyInfoList[o].companyName === '终端促销黑龙江'){//隐藏瓶数
					sessionStorage.companyName = jo.reply.companyInfoList[o].companyName;
					$('.scanNum').css('display', 'none');
				}
				if(jo.reply.companyInfoList[o].companyName === '终端促销辽宁'){//隐藏金额显示积分
					sessionStorage.companyName = jo.reply.companyInfoList[o].companyName;
					$('.cash_list').css('display', 'none');//隐藏红包列表
					$('.totalMoney').css('display', 'none');//隐藏累计红包
					$('.totalVpoints').css('display', 'block');//显示累计积分
				}
				if(jo.reply.companyInfoList[o].companyName === '终端促销陕西'){
					if(jo.reply.userInfo.userType==2){//且为服务员
						$('.enterRank').css('display','block');
					}
				}
		    }
		}
        if (jo.reply.userInfo.userType == 3) { //业代
            $('#btn').unbind();
            var tablestr = '',
                tablecontent = '';
            for (var k = 0; k < jo.reply.qrcodeList.length; k++) {
                tablestr += '<li index=' + k + '>' + jo.reply.qrcodeList[k].companyName + '</li>';
                tablecontent += '<div class="ani_box">';
                tablecontent += '<img class="head" src="/v/terminal/img/headimg.png?v=2" />';
                if (jo.reply.qrcodeList[k].status == 1) {
                    tablecontent += '<div><p class="userName"></p><p class="ydphone"></p><p class="ydcode"></p></div><img src="' + creatQrcode(jo.reply.qrcodeList[k].qrcodeContent, k) + '" class="qrcode"/></div>';
                } else {
                    tablecontent += '<div><p class="userName"></p><p class="ydphone"></p><p class="ydcode"></p></div><img src="/v/terminal/img/yedaiqrcode.png" class="qrcode"/></div>';
                }

            }
            $('#yedai ul').append(tablestr);
			$('#ydcode_box').css('width',jo.reply.qrcodeList.length*100+'%');
            $('#ydcode_box').append(tablecontent);
			$('#ydcode_box .ani_box').css({'width':100/jo.reply.qrcodeList.length+'%','min-width':100/jo.reply.qrcodeList.length+'%'});
            $('.userName').html('业代姓名：' + jo.reply.userInfo.userName);
            $('.ydphone').html('业代电话：' + jo.reply.userInfo.phoneNumber);
            if (jo.reply.userInfo.code) {
                $('.ydcode').html('业代编码：' + jo.reply.userInfo.code);
            } else {
                $('.ydcode').html('');
            }
            if (jo.reply.qrcodeList.length > 1) {
                $('#yedai ul li').eq(0).addClass('current');
                var clientw = $('body').width();
                $('#yedai ul li').on('click', function () {
                    $(this).addClass('current').siblings().removeClass('current');
                    $('#ydcode_box').css('margin-left', 0 - (clientw * $(this).attr('index')) + 'px');
                });
            }


        } else if (jo.reply.userInfo.userType == 2) { //服务员
			if(jo.reply.userInfo.consumerUserStatusList[0].companyKey=='201712002'){
				$('.nickname').html('昵称：' + jo.reply.userInfo.nickName);
			}else{
				$('.nickname').html('昵称：' + jo.reply.userInfo.nickName + '(服务员)');
			}
            document.getElementById("yedai").style.display = 'none';
            succ(jo.reply.isVpointsShop); //成功 启动列表
        } else if (jo.reply.userInfo.userType == 1) { //老板
            $('.nickname').html('昵称：' + jo.reply.userInfo.nickName + '(老板)');
            document.getElementById("yedai").style.display = 'none';
            succ(jo.reply.isVpointsShop); //成功 启动列表
        } else if (jo.reply.userInfo.userType == 4) { //理货专员
            $('.nickname').html('昵称：' + jo.reply.userInfo.nickName + '(理货专员)');
            document.getElementById("yedai").style.display = 'none';
            succ(jo.reply.isVpointsShop); //成功 启动列表
        } else {
            $('#btn').unbind();
            //			$('.nickname').html('昵称：' + jo.reply.userInfo.nickName+'(游客)');
            document.getElementById("yedai").style.display = 'none';
            title_tip('尊敬的用户', '您尚未完成终端促销认证！', '我知道了', undefined, close);
        }
        
    }

    function give_spack() { //提现
        var javai = vge.terminal + '/DBTVMTSInterface/gifts/getGiftspack';
        var req = {
            "openid": openid,
            "hbopenid": hbopenid,
            "questionnaireType": 2
        };
        vge.callJApi(javai, req,
            function (jo) {
                $('#btn').html('可提余额：¥' + sessionStorage.totalMoney + '  立即提现');
                $('#btn').on('click', function () {
                    if (sessionStorage.invalidMoney == 0) {
                        if (sessionStorage.totalMoney >= 1) {
                            $(this).html('<img src="/v/terminal/img/loading.gif"/>');
                            $('#btn').unbind();
                            give_spack();
                        }
                    } else {
                        $('#txdetails').css('display', 'block');
                        if (sessionStorage.totalMoney >= 1) {
                            $('.succ').on('click', function () {
                                $(this).unbind();
                                $('#txdetails').css('display', 'none');
                                give_spack();
                            });
                        } else {
                            $('.succ,.cancel').on('click', function () {
                                $('#txdetails').css('display', 'none');
                            });
                        }
                    }
                });
                if (jo.result.code == '0') {
                    if (jo.result.businessCode === '0') {
                        sessionStorage.totalMoney = 0;
                        $('#alert').css('display', 'block');
                    } else if (jo.result.businessCode === '1') { //1
                        title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
                    } else if (jo.result.businessCode === '4') { //1
                        title_tip('提 示', '提现处理中，请稍后查看详细记录', '我知道了');
                    } else if (jo.result.businessCode === '-2') { //-2
                        title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
                    } else if (jo.result.businessCode === '2') { //1
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    } else if (jo.result.businessCode === '3') { //1
                        title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
                    } else if (jo.result.businessCode === '-1') { //-1
                        title_tip('提 示', '提现操作过于频繁，请稍后再试！', '我知道了');
                    } else if (jo.result.businessCode === '6') {
                        location.href = 'http://' + location.host + '/terminal/too/question';
                    } else {
                        title_tip('尊敬的用户', jo.result.msg, '我知道了');
                    }
                } else if (jo.result.code == '-1') {
                    title_tip('尊敬的用户', '系统升级中...', '我知道了');
                } else { //code!='0'
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            });
    }

    function creatQrcode(sceneid, index) {
        var requrl = 'http://' + vge.o3host + '/wx3/qrticket?appid=' + vge.terminalappid + '&limit=1800&scene=scene_str&sceneid=' + sceneid;
        vge.ajxget(requrl, 5000, function (r) {
            try {
                $('.qrcode').eq(index).attr('src', 'https:/mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + r);
            } catch (e) {
                vge.clog('errmsg', [requrl, e]);
                $('.qrcode').eq(index).attr('src', '/v/terminal/img/yedaiqrcode.png');
            }
        }, function (err) {
            vge.clog('errmsg', [requrl, err]);
            $('.qrcode').eq(index).attr('src', '/v/terminal/img/yedaiqrcode.png');
        });
    }

    function succ(isVpointsShop) {
        if (isVpointsShop == 0) {
            $('p.mall,p.jf_list').css('display', 'none');
        }
		if(sessionStorage.companyName=='终端促销辽宁'){//辽宁只显示积分
			$('#btn').html('积分剩余：' + sessionStorage.surplusVpoints );
			$('#btn').css('background', '#2aa1fd');
			$('#btn').on('click',function(){//跳转至积分商城
				if (sessionStorage.disable == 3) {
				    title_tip('尊敬的用户', '您尚未完成终端促销认证！', '我知道了');
				    return;
				} else if (sessionStorage.disable == 4) {
				    title_tip('尊敬的用户', '您尚未完成终端促销认证！', '我知道了');
				    return;
				}
				sessionStorage.removeItem('companyKey');
				sessionStorage.openid = openid;
				location.href = '/v/terminal/IntegralMall/index.html';
			});
		}else{
			$('#btn').html('可提余额：¥' + sessionStorage.totalMoney + '  立即提现');
			if (sessionStorage.totalMoney >= 1 || sessionStorage.invalidMoney > 0) {
			    $('#btn').css('background', '#2aa1fd');
			}
			$('#btn').on('click', function () {
			    if (sessionStorage.invalidMoney == 0) {
			        if (sessionStorage.totalMoney >= 1) {
			            $(this).html('<img src="/v/terminal/img/loading.gif"/>');
			            $('#btn').unbind();
			            give_spack();
			        }
			    } else {
			        $('#txdetails').css('display', 'block');
			        if (sessionStorage.totalMoney >= 1) {
			            $('.succ').on('click', function () {
			                $(this).unbind();
			                $('#txdetails').css('display', 'none');
			                give_spack();
			            });
			        } else {
			            $('.succ,.cancel').on('click', function () {
			                $('#txdetails').css('display', 'none');
			            });
			        }
			    }
			});
		}
        $('p.cash_list').on('click', function () { //现金红包type=2
            if (sessionStorage.disable == 3) {
                title_tip('尊敬的用户', '您尚未完成终端促销认证！', '我知道了');
                return;
            } else if (sessionStorage.disable == 4) {
                title_tip('尊敬的用户', '您尚未完成终端促销认证！', '我知道了');
                return;
            }
            $('div.cash_list').css('left', '0');
            sessionStorage.bizcode = 11;
            if (cash_dot) {
                cash_dot = false;
                onepage_note(currentpage2, 2);
            }
        });
        $('p.jf_list').on('click', function () { //积分红包type=1
            if (sessionStorage.disable == 3) {
                title_tip('尊敬的用户', '您尚未完成终端促销认证！', '我知道了');
                return;
            } else if (sessionStorage.disable == 4) {
                title_tip('尊敬的用户', '您尚未完成终端促销认证！', '我知道了');
                return;
            }
            if (jf_dot) {
                jf_dot = false;
                onepage_note(currentpage, 1);
            }
            $('div.jf_list').css('left', '0');
        });
        $('p.person').on('click', function () {
            if (sessionStorage.disable == 3) {
                title_tip('尊敬的用户', '您尚未完成终端促销认证！', '我知道了');
                return;
            } else if (sessionStorage.disable == 4) {
                title_tip('尊敬的用户', '您尚未完成终端促销认证！', '我知道了');
                return;
            }
            $('#details').css('left', '0');
        });

        $('p.mall').on('click', function () {
            if (sessionStorage.disable == 3) {
                title_tip('尊敬的用户', '您尚未完成终端促销认证！', '我知道了');
                return;
            } else if (sessionStorage.disable == 4) {
                title_tip('尊敬的用户', '您尚未完成终端促销认证！', '我知道了');
                return;
            }
            sessionStorage.removeItem('companyKey');
            sessionStorage.openid = openid;
            location.href = '/v/terminal/IntegralMall/index.html';
        });
        $('p.yhq_list,p.qt_list').on('click', function () {
            if (sessionStorage.disable == 3) {
                title_tip('尊敬的用户', '您尚未完成终端促销认证！', '我知道了');
                return;
            } else if (sessionStorage.disable == 4) {
                title_tip('尊敬的用户', '您尚未完成终端促销认证！', '我知道了');
                return;
            }
            $('div.qt_list').css('left', '0');
        });
        $('#back').on('click', function () {
            if (sessionStorage.disable == 3) {
                title_tip('尊敬的用户', '您尚未完成终端促销认证！', '我知道了');
                return;
            } else if (sessionStorage.disable == 4) {
                title_tip('尊敬的用户', '您尚未完成终端促销认证！', '我知道了');
                return;
            }
            $('#details').css('left', '100%');
        });
        $('.back').on('click', function () {
            $('._list').css('left', '100%');
        });
    }

    function close() {
        wx.ready(function () {
            wx.closeWindow();
        });
    }

})();