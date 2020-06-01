//==================================
//
//  接口集合
//
//==================================
var v_port = {
    o3host: 'x.vjifen.com', //获取用户信息
    post_port: '60.205.131.96:80'//后台接口
    // post_port: '192.168.0.249:38030'
}
/**
 * 获取用户基本信息
 * 返回{'result':true, 'msg':'获取用户信息成功', 'img':'css/127.png', 'name':'玩家昵称', 'points':100}
 */
function iniUserInfo() {
    //************* */
    jQuery.get('http://' + v_port.o3host + '/wx3/uinfo?openid=' + sessionStorage.openid, function (r) {
        r = JSON.parse(r);
        nickname = r.nickname === undefined ? '未知用户' : r.nickname;
        headimgurl = r.headimgurl === undefined ? '/v/zzqp/img/bg/headimg.png' : r.headimgurl;
        sessionStorage.nickname = nickname;
        sessionStorage.headimgurl = headimgurl;
        sessionStorage.sex = r.sex === undefined ? '' : r.sex;
        sessionStorage.city = r.city === undefined ? '' : r.city;
        sessionStorage.province = r.province === undefined ? '' : r.province;
        sessionStorage.country = r.country === undefined ? '' : r.country;
        var json = {
            result: true,
            msg: '获取用户信息成功',
            img: headimgurl,
            name: nickname,
            points: sessionStorage.vpoints == 'undefined' ? '0' : sessionStorage.vpoints
        }
        //回调信息后TODO
        if (json.result) { //json为接口返回的数据集合
            jg_aj.userImg = json.img;
            jg_aj.userName = json.name;
            jg_aj.userPoints = json.points;
            setUserInfo({
                n: jg_aj.userName,
                p: jg_aj.userPoints,
                i: jg_aj.userImg
            });
        } else {
            //接口调用失败
            // alert(json.msg);
            title_tip('尊敬的用户', json.result.msg, '我知道了');
        }
    });

}

/**
 * 调用验证接口
 * @param {Int} [p] - 用户下注积分
 * 用户积分不足，返回{'result':false, 'msg':'积分不足'}
 * 用户积分足够，返回{'result':true, 'msg':'积分足够', 'goal':true}   goal：是否进球(true,false)
 */
function connectQ(p) {
    //************* */
    var url = 'http://' + v_port.post_port + '/DBTHNQPInterface/vpointsGame/gameTrans';
    var data = {
        "openid": sessionStorage.openid,
        "transType": "1", //类型 1，投注  2，开奖
        "transVpoints": p //投注积分
    }
    jQuery.ajax({
        type: "post",
        url: url,
        async: true,
        data: JSON.stringify(data),
        success: function (json) {
            console.log(json);
            //回调信息后TODO
            if (json.result.code == '0') {
                if (json.result.businessCode == '0') {
                    if (json.result) { //json为接口返回的数据集合
                        setTimeout(function () {
                            // //接口调用成功
                            jg_aj.curPoints = p;
                            //是否进球
                            jg_aj.ifgoal = json.reply.gameLucky;
                            j('.call-box').hide();
                        }, 500);
                    } else {
                        //积分不足或接口调用失败
                        // alert(json.msg);
                        title_tip('尊敬的用户', json.result.msg, '我知道了');
                    }
                } else {
                    // alert(json.result.msg);
                    title_tip('尊敬的用户', json.result.msg, '我知道了');
                }
            } else {
                alert('系统开了个小差');
            }
        }
    });

}

/**
 * 调用处理积分接口
 * @param {Int} [g] - 是否进球(true,false)
 * @param {Int} [p] - 用户下注积分
 * 积分处理成功，返回{'result':true, 'msg':'积分处理成功', 'points':9999}   points：扣除积分或进球加积分后的最新积分数
 */
function subPoints(g, p) {
    //************* */

    var url = 'http://' + v_port.post_port + '/DBTHNQPInterface/vpointsGame/gameTrans';
    var data = {
        "openid": sessionStorage.openid,
        "transType": "2", //类型 1，投注  2，开奖
        "transVpoints": p //投注积分
    }
    jQuery.ajax({
        type: "post",
        url: url,
        async: true,
        data: JSON.stringify(data),
        success: function (json) {
            console.log(json);
            //回调信息后TODO
            if (json.result.code == '0') {
                if (json.result.businessCode == '0') {
                    //回调信息后TODO
                    if (json.result) { //json为接口返回的数据集合
                        //接口调用成功
                        //更新积分
                        jg_aj.userPoints = json.reply.totalVpoints;
                        setUserInfo({
                            n: jg_aj.userName,
                            p: jg_aj.userPoints,
                            i: jg_aj.userImg
                        });
                    } else {
                        //接口调用失败
                        // alert(json.result.msg);
                        title_tip('尊敬的用户', json.result.msg, '我知道了');
                    }
                } else {
                    // alert(json.result.msg);
                    title_tip('尊敬的用户', json.result.msg, '我知道了');
                }
            } else {
                // alert('系统开了个小差');
                title_tip('尊敬的用户', '系统开了个小差', '我知道了');
            }
        }
    });
}




//==================================
//
//  游戏函数集合
//
//==================================

function jg_getpng(i) {
    return "css/" + i + ".png";
}

function jg_gettxt(i) {
    return jg_aj.txt[i];
}

function goFrame(id) {
    j('#Frame4').hide();
    j('#Frame5').hide();
    closeMaAlert();
    j('#Frame' + id).show();
}

function goFrameGame() {
    goFrame(4);
}

function setPlayTime() {
    var frame = FootBall.i.creatFrame("game")
    frame.playTime = 0, frame.score = 0;
    FootBall.i.go(frame)
}

function playGirl() {
    jg_aj.girlSound && jg_aj.girlSound.stop();
    var obj = {
        urls: ['css/gril.mp3']
    }
    var sound = new Howl(obj)
    jg_aj.grilSound = sound
    sound.play();
}

function stopGirl() {
    jg_aj.girlSound && jg_aj.girlSound.stop();
}

function shareReportEx() {
    if (FootBall.i.game && FootBall.i.game.shareMsg.visible) {
        FootBall.i.game.shareMsg.stop();
        FootBall.i.game.touchChildren = 1;
    }
    var b = (1 == 2) ? (FootBall.i.gamePlayTime == FootBall.i.maxPlayTime) : (FootBall.i.gamePlayTime >= FootBall.i.maxPlayTime)
    if (b && FootBall.i.gamePlayTime >= (FootBall.i.maxPlayTime + FootBall.i.shareTime)) {
        //console.log('2');
        FootBall.i.shareTime = FootBall.i.gamePlayTime - FootBall.i.maxPlayTime + 1;
        FootBall.i.go(FootBall.i.creatFrame("open"));
        egret.localStorage.setItem('shareBall' + idcm, FootBall.i.shareTime);
    }
}

function getGril() {
    var json = RES.getRes('501_json')
    var png = RES.getRes('501_png')
    var d = new egret.MovieClipDataFactory(json, png);
    var mc = new egret.MovieClip(d.generateMovieClipData())
    mc.anchorOffsetX = mc.width * 0.5;
    mc.x = 50;
    mc.y = 330 + mc.height;
    mc.gotoAndPlay(1, -1);
    jg_aj.girlMC1 = mc;
    FootBall.i.creatFrame('game').addChildAt(mc, 3);
    var mc2 = new egret.MovieClip(d.generateMovieClipData())
    mc2.anchorOffsetX = mc.width * 0.5;
    mc2.x = FootBall.i.stage.stageWidth - 50;
    mc2.y = 330 + mc.height;
    mc2.gotoAndPlay(1, -1);
    jg_aj.girlMC2 = mc2;
    FootBall.i.creatFrame('game').addChildAt(mc2, 3);
    jg_aj.girlMC1.visible = false;
    jg_aj.girlMC2.visible = false;
}

function setUserInfo(json) {
    if (jQuery('.user-img-box').length == 0) {
        jQuery('.user-main').append('<div class="user-img-box" style="background:url(' + json.i + ') 50% 50%/100% no-repeat;"></div>');
    } else {
        jQuery('.user-img-box').css('background', 'url(' + json.i + ') 50% 50%/100% no-repeat');
    }
    if (jQuery('.user-name-box').length == 0) {
        jQuery('.user-main').append('<div class="user-name-box">' + json.n + '</div>');
    } else {
        jQuery('.user-name-box').html(json.n);
    }
    if (jQuery('.user-points-box').length == 0) {
        jQuery('.user-main').append('<div class="user-points-box">' + json.p + '</div>');
    } else {
        jQuery('.user-points-box').html(json.p);
    }

}

function pointSubmit() {
    jg_aj.curPoints = 0;
    var definedP = jQuery('#callVal').vale();
    if (definedP % 10 != 0 || definedP < 1 && definedP != '') {
        // alert('请填写大于0的10的倍数');
        title_tip('尊敬的用户', '请填写大于0的10的倍数', '我知道了');
        return;
    }
    var chooseP = jQuery('[id^="callBtn_"][class*="y_"]').attr('i');
    if (definedP > 0) {
        connectQ(definedP);
    } else if (chooseP) {
        var ooP = chooseP == '0' ? 50 : 100;
        connectQ(ooP);
    } else {
        // alert('请选择下注');
        title_tip('尊敬的用户', '请选择下注', '我知道了');
    }
}

function closeRule() {
    j('.rule-box').fadeOut();
}

function jpn() {}