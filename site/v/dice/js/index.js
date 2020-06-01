'use strict';

var dom_open = document.getElementById('open'),
    dom_light = document.getElementById('light'),
    dom_rock = document.getElementById('rock'),
    dom_cover = document.getElementById('cover'),
    dom_game = document.getElementById('game'),
    dom_musicBg = document.getElementById('musicBg'),
    dom_musicRock = document.getElementById('musicRock'),
    dom_musicResult = document.getElementById('musicResult'),
    dom_dice = document.getElementsByClassName('dice'),
    dom_btn = document.getElementById('btn'),
    dom_mask = document.getElementsByClassName('mask')[0],
    dom_res5 = document.getElementById('res5').getElementsByTagName('img');


var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
console.log(isAndroid,isiOS)
	
//跑马灯效果
var lightFlag = true;
setInterval(function () {
    if (lightFlag) {
        dom_light.src = '/v/dice/img/light2.png';
        lightFlag = false;
    } else {
        dom_light.src = '/v/dice/img/light1.png';
        lightFlag = true;
    }
}, 500);

//open霓虹灯效果
var timer = null;
neon();
clearInterval(timer);
timer = setInterval(neon, 4000);
function neon() {
    dom_open.src = '/v/dice/img/open2.png';
    setTimeout(function () {
        dom_open.src = '/v/dice/img/open1.png';
        setTimeout(function () {
            dom_open.src = '/v/dice/img/open2.png';
            setTimeout(function () {
                dom_open.src = '/v/dice/img/open1.png';
            }, 200);
        }, 150);
    }, 200);
}

// 摇一摇功能 
var flag = true;
if(isAndroid){
	init();
	document.getElementsByClassName('click_button')[0].style.display = 'none';
	document.getElementById("rock").style.visibility = 'visible';
}else{
	document.getElementsByClassName('click_button')[0].addEventListener('click',doResult,false);
}

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
            if (flag) {
                flag = false;
                doResult();
            }
        }
        last_x = x;
        last_y = y;
        last_z = z;
    }
}
function doResult() {//摇一摇回调函数 
	if(!isAndroid){
		document.getElementsByClassName('click_button')[0].removeEventListener('click',doResult);
		document.getElementsByClassName('small_hand')[0].style.display = 'none';
		document.getElementsByClassName('click_button')[0].style.display = 'none';
	}
    _hmt.push(['_trackEvent', 'shake', '搖一搖', 'index']);
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
        setTimeout(function () {
            dom_cover.className = 'cover';//重置盖子
            dom_game.className = 'game';//重置所有
            dom_rock.style.display = 'block';
            dom_mask.style.display = 'flex';
        }, 1800);
    }, 1000);
}

var numArr = [], num;
function myrandom() {
    for (var i = 0; i < 6; i++) {
        num = Math.floor(Math.random() * 6 + 1);
        numArr.push(num);
    }
    dom_dice[0].src = '/v/dice/img/r' + numArr[0] + '.png';
    dom_dice[1].src = '/v/dice/img/l' + numArr[1] + '.png';
    dom_dice[2].src = '/v/dice/img/l' + numArr[2] + '.png';
    dom_dice[3].src = '/v/dice/img/l' + numArr[3] + '.png';
    dom_dice[4].src = '/v/dice/img/r' + numArr[4] + '.png';

    dom_res5[0].src = '/v/dice/img/' + numArr[0] + '.png';
    dom_res5[1].src = '/v/dice/img/' + numArr[1] + '.png';
    dom_res5[2].src = '/v/dice/img/' + numArr[2] + '.png';
    dom_res5[3].src = '/v/dice/img/' + numArr[3] + '.png';
    dom_res5[4].src = '/v/dice/img/' + numArr[4] + '.png';

    document.getElementById('res5').style.display = 'block';
    numArr = [];
}

dom_btn.addEventListener('click', function () {
    flag = true;
    dom_mask.style.display = 'none';
    document.getElementById('res5').style.display = 'none';
	if(!isAndroid){
		document.getElementsByClassName('click_button')[0].style.display = 'block';
		document.getElementsByClassName('click_button')[0].addEventListener('click',doResult,false);
	}
}, false);

