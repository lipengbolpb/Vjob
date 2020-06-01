function runAnimation() {
    // 执行所有动画
    $('.curtain').css('display', 'block');
    // 两侧窗帘向左右滑动 耗时0.5s
    $('.curtain-left').addClass('curtainLeftAnimate');
    $('.curtain-right').addClass('curtainRightAnimate');
    // 文字向上渐显 耗时1s
    $('.textTop,.textBottom').css({
        'display': 'block'
    });
    $('.textTop,.textBottom').addClass('textBoxAnimate');
    $('.text-1,.text-2').addClass('textImgAnimate');
    // 泡沫向下渐显 耗时0.5s
    $('.foamBox1,.foamBox2').css({
        'display': 'block'
    });
    $('.foamBox1,.foamBox2').addClass('textBoxAnimateDown');
    $('.text-1-foam,.text-2-foam').addClass('textImgAnimateDown');
    // 显示拆红包页面
    setTimeout(function () {
        // 隐藏curtain页面，显示get页面
        $('.textTop,.textBottom,.beer,.curtain-bg,.curtain-logo').fadeOut();
        $('.get').fadeIn();
        setTimeout(function () {
            $('.happyNewYear,.curtain').css({
                'display': 'none'
            });
        }, 600);
    }, 3000);
}
$(document).ready(function () {
    console.log('加载完毕');
    var args = vge.urlparse(location.href),
        bizcode = args.bizcode,
        again = sessionStorage.again === undefined ? false : sessionStorage.again;

    if (bizcode == 11 || again == 'true') {
        $('.happyNewYear,.curtain').css({
            'display': 'none'
        });
    } else {
        runAnimation();
    }
})