'use strict';

var dom_slogan = document.getElementById('slogan'),
    dom_rock = document.getElementById('rock'),
    dom_cover = document.getElementById('cover'),
    dom_game = document.getElementById('game'),
    dom_musicBg = document.getElementById('musicBg'),
    dom_musicRock = document.getElementById('musicRock'),
    dom_musicResult = document.getElementById('musicResult'),
    dom_dice = document.getElementsByClassName('dice'),
    dom_diceThree = document.getElementsByClassName('diceThree'),
    dom_back = document.getElementsByClassName('back')[0],
    dom_btn = document.getElementById('btn'),
    dom_mask = document.getElementsByClassName('mask')[0],
    dom_res3 = document.getElementById('res3').getElementsByTagName('img'),
    dom_res5 = document.getElementById('res5').getElementsByTagName('img');

var flag = false;

var dom_three = document.getElementsByClassName('three')[0],
    dom_five = document.getElementsByClassName('five')[0],
    dom_charge = document.getElementsByClassName('charge')[0],
    dom_boxThree = document.getElementById('three'),
    dom_boxFive = document.getElementById('five');

var chargeFlage = true;//选择骰子时摇一摇提醒选择骰子个数
var diceFlag = true;//true为三个骰子 false为五个骰子
var backFlag = true;
var timer;
var mybackFlag = true;
dom_three.addEventListener('click', function () {
    diceFlag = true;
    flag = true;
    backFlag = true;
    chargeFlage = false;
    dom_charge.style.display = 'none';
    dom_boxThree.style.display = 'block';
    dom_game.style.display = 'block';
    dom_back.style.display = 'block';
    // dom_slogan.style.display = 'none';
    // dom_rock.style.display = 'block';
    // document.getElementsByClassName('desk')[0].style.display = 'block';
    // document.getElementsByClassName('money')[0].style.display = 'block';
}, false);
dom_five.addEventListener('click', function () {
    diceFlag = false;
    flag = true;
    backFlag = true;
    chargeFlage = false;
    dom_charge.style.display = 'none';
    dom_boxFive.style.display = 'block';
    dom_game.style.display = 'block';
    dom_back.style.display = 'block';
    // dom_slogan.style.display = 'none';
    // dom_rock.style.display = 'block';
    // document.getElementsByClassName('desk')[0].style.display = 'block';
    // document.getElementsByClassName('money')[0].style.display = 'block';
}, false);

dom_back.addEventListener('click', function () {
    if (mybackFlag) {
        backFlag = false;
        dom_back.style.display = 'none';
        dom_game.style.display = 'none';
        dom_charge.style.display = 'block';
        dom_boxThree.style.display = 'none';
        dom_boxFive.style.display = 'none';
        dom_slogan.style.display = 'block';
        // dom_rock.style.display = 'none';
        // document.getElementsByClassName('desk')[0].style.display = 'none';
        // document.getElementsByClassName('money')[0].style.display = 'none';
        clearTimeout(timer);
        dom_mask.style.display = 'none';
        document.getElementById('res3').style.display = 'none';
        document.getElementById('res5').style.display = 'none';
    }
}, false);

// 摇一摇功能 
init();
function init() {
    if (window.DeviceMotionEvent) {// devicemotion事件监听
        window.addEventListener('devicemotion', deviceMotionHandler, false);
    }
}
var SHAKE_THRESHOLD = 400;
var last_update = 0;
var x, y, z, last_x, last_y, last_z;
function deviceMotionHandler(eventData) {
    var acceleration = eventData.accelerationIncludingGravity;
    var curTime = new Date().getTime();
    if ((curTime - last_update) > 270) {
        var diffTime = curTime - last_update;
        last_update = curTime;
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;
        var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
        if (speed > SHAKE_THRESHOLD) {
            if (flag == true && backFlag == true) {
                flag = false;
                mybackFlag = false;
                doResult();
            }
            if (chargeFlage) {
                title_tip('提 示', '请先选择骰子个数', '我知道了');
                chargeFlage = false;
            }
        }
        last_x = x;
        last_y = y;
        last_z = z;
    }
}
function doResult() {//摇一摇回调函数 
    dom_rock.style.display = 'none';
    dom_cover.className = 'cover coverRotate';//扣盖子
    setTimeout(function () {
        dom_game.className = 'game gamemove';//摇骰子
        if (dom_musicRock) {
            dom_musicRock.play();
        }
        //换骰子
        myrandom();
        setTimeout(function () {
            if (dom_musicResult) {
                dom_musicResult.play();
            }
        }, 1200);
        timer = setTimeout(function () {
            dom_cover.className = 'cover';//重置盖子
            dom_game.className = 'game';//重置所有
            dom_rock.style.display = 'block';
            dom_mask.style.display = 'block';
            mybackFlag = true;
        }, 1800);
    }, 1000);
}

var numArr = [], num;
function myrandom() {
    if (diceFlag) {
        for (var i = 0; i < 3; i++) {
            num = Math.floor(Math.random() * 6 + 1);
            numArr.push(num);
        }
        dom_diceThree[0].src = '/v/csqp/game/img/r' + numArr[0] + '.png';
        dom_diceThree[1].src = '/v/csqp/game/img/l' + numArr[1] + '.png';
        dom_diceThree[2].src = '/v/csqp/game/img/l' + numArr[2] + '.png';

        dom_res3[0].src = '/v/csqp/game/img/' + numArr[0] + '.png';
        dom_res3[1].src = '/v/csqp/game/img/' + numArr[2] + '.png';
        dom_res3[2].src = '/v/csqp/game/img/' + numArr[1] + '.png';

        numArr = [];
        document.getElementById('res3').style.display = 'block';
    } else {
        for (var i = 0; i < 6; i++) {
            num = Math.floor(Math.random() * 6 + 1);
            numArr.push(num);
        }
        dom_dice[0].src = '/v/csqp/game/img/r' + numArr[0] + '.png';
        dom_dice[1].src = '/v/csqp/game/img/l' + numArr[1] + '.png';
        dom_dice[2].src = '/v/csqp/game/img/l' + numArr[2] + '.png';
        dom_dice[3].src = '/v/csqp/game/img/l' + numArr[3] + '.png';
        dom_dice[4].src = '/v/csqp/game/img/r' + numArr[4] + '.png';

        dom_res5[0].src = '/v/csqp/game/img/' + numArr[0] + '.png';
        dom_res5[1].src = '/v/csqp/game/img/' + numArr[1] + '.png';
        dom_res5[2].src = '/v/csqp/game/img/' + numArr[2] + '.png';
        dom_res5[3].src = '/v/csqp/game/img/' + numArr[3] + '.png';
        dom_res5[4].src = '/v/csqp/game/img/' + numArr[4] + '.png';

        numArr = [];
        document.getElementById('res5').style.display = 'block';
    }
}

dom_btn.addEventListener('click', function () {
    flag = true;
    dom_mask.style.display = 'none';
    document.getElementById('res3').style.display = 'none';
    document.getElementById('res5').style.display = 'none';
}, false);