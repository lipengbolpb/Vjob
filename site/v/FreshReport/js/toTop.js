$(function(){
    $(window).bind('scroll', {
        fixedOffsetBottom: parseInt($('#Fixed').css('bottom'))
    },
    function(e) {
        var scrollTop = $(window).scrollTop();
        if (!/msie 6/i.test(navigator.userAgent)) {
            $('#Fixed').css('bottom', e.data.fixedOffsetBottom)
        }
    });
    $('#toTop').click(function() {
        $('body,html').stop().animate({
            'scrollTop': 0,
            'duration': 100,
            'easing': 'ease-in'
        })
    });
});
