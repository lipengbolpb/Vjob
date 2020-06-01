(function ($) {
  $.fn.swipeslider = function (options) {
    var slideContainer = this;
    var slider = this.find('.sw-slides');
    var defaultSettings = {
      transitionDuration: 500,
      autoPlay: true,
      autoPlayTimeout: 4000,
      timingFunction: 'ease-out',
      prevNextButtons: true,
      bullets: true,
      swipe: true,
      sliderHeight: '60%'
    };
    var settings = $.extend(defaultSettings, options);
    var slidingState = 0;
    var startClientX = 0;
    var startPixelOffset = 0;
    var pixelOffset = 0;
    var currentSlide = 0;
    var slideCount = 0;
    var slidesWidth = 0;
    var allowSwipe = true;
    var transitionDuration = settings.transitionDuration;
    var swipe = settings.swipe;
    var autoPlayTimeout = settings.autoPlayTimeout;
    var animationDelayID = undefined;
    var allowSlideSwitch = true;
    var autoPlay = settings.autoPlay;
    (function init() {
      $(slideContainer).css('padding-top', settings.sliderHeight);
      slidesWidth = slider.width();
      $(window).resize(resizeSlider);
      if (settings.prevNextButtons) {
        insertPrevNextButtons();
      }
      slider.find('.sw-slide:last-child').clone().prependTo(slider);
      slider.find('.sw-slide:nth-child(2)').clone().appendTo(slider);
      slideCount = slider.find('.sw-slide').length;
      if (settings.bullets) {
        insertBullets(slideCount - 2);
      }
      setTransitionDuration(transitionDuration);
      setTimingFunction(settings.timingFunction);
      setTransitionProperty('all');
      if (swipe) {
        slider.on('mousedown touchstart', swipeStart);
        $('html').on('mouseup touchend', swipeEnd);
        $('html').on('mousemove touchmove', swiping);
      }
      jumpToSlide(1);
      enableAutoPlay();
    })();

    function resizeSlider() {
      slidesWidth = slider.width();
      switchSlide();
    }

    function swipeStart(event) {
      if (!allowSwipe) {
        return;
      }
      disableAutoPlay();
      if (event.originalEvent.touches) event = event.originalEvent.touches[0];
      if (slidingState == 0) {
        slidingState = 1;
        startClientX = event.clientX;
      }
    }

    function swiping(event) {
      var pointerData;
      if (event.originalEvent.touches) {
        pointerData = event.originalEvent.touches[0];
      } else {
        pointerData = event;
      }
      var deltaSlide = pointerData.clientX - startClientX;
      if (slidingState == 1 && Math.abs(deltaSlide) >= 40) {
        slidingState = 2;
        startPixelOffset = currentSlide * -slidesWidth;
      }
      if (slidingState == 2) {
        event.preventDefault();
        var touchPixelRatio = 1;
        if ((currentSlide == 0 && pointerData.clientX > startClientX) || (currentSlide == slideCount - 1 && pointerData.clientX < startClientX)) {
          touchPixelRatio = 3;
        }
        pixelOffset = startPixelOffset + deltaSlide / touchPixelRatio;
        enableTransition(false);
        translateX(pixelOffset);
      }
    }

    function swipeEnd(event) {
      if (slidingState == 2) {
        slidingState = 0;
        currentSlide = pixelOffset < startPixelOffset ? currentSlide + 1 : currentSlide - 1;
        currentSlide = Math.min(Math.max(currentSlide, 0), slideCount - 1);
        pixelOffset = currentSlide * -slidesWidth;
        disableSwipe();
        switchSlide();
      }
      enableAutoPlay();
      slidingState = 0;
    }

    function disableSwipe() {
      allowSwipe = false;
      window.setTimeout(enableSwipe, transitionDuration)
    }

    function enableSwipe() {
      allowSwipe = true;
    }

    function disableAutoPlay() {
      allowSlideSwitch = false;
      window.clearTimeout(animationDelayID);
    }

    function enableAutoPlay() {
      if (autoPlay) {
        allowSlideSwitch = true;
        window.clearTimeout(animationDelayID);
        startAutoPlay();
      }
    }

    function startAutoPlay() {
      if (allowSlideSwitch) {
        animationDelayID = window.setTimeout(performAutoPlay, autoPlayTimeout);
      }
    }

    function performAutoPlay() {
      switchForward();
      startAutoPlay();
    }

    function switchForward() {
      currentSlide += 1;
      switchSlide();
    }

    function switchBackward() {
      currentSlide -= 1;
      switchSlide();
    }

    function switchSlide() {
      enableTransition(true);
      translateX(-currentSlide * slidesWidth);
      if (currentSlide == 0) {
        window.setTimeout(jumpToEnd, transitionDuration);
      } else if (currentSlide == slideCount - 1) {
        window.setTimeout(jumpToStart, transitionDuration);
      }
      setActiveBullet(currentSlide);
    }

    function jumpToStart() {
      jumpToSlide(1);
    }

    function jumpToEnd() {
      jumpToSlide(slideCount - 2);
    }

    function jumpToSlide(slideNumber) {
      enableTransition(false);
      currentSlide = slideNumber;
      translateX(-slidesWidth * currentSlide);
      window.setTimeout(returnTransitionAfterJump, 50);
    }

    function returnTransitionAfterJump() {
      enableTransition(true);
    }

    function enableTransition(enable) {
      if (enable) {
        setTransitionProperty('all');
      } else {
        setTransitionProperty('none');
      }
    }

    function translateX(distance) {
      slider.css('transform', 'translateX(' + distance + 'px)');
    }

    function setTransitionDuration(duration) {
      slider.css('transition-duration', duration + 'ms');
    }

    function setTimingFunction(functionDescription) {
      slider.css('transition-timing-function', functionDescription);
    }

    function setTransitionProperty(property) {
      slider.css('transition-property', property);
    }

    function insertPrevNextButtons() {
      slider.after('<span class="sw-next-prev sw-prev"></span>');
      slideContainer.find('.sw-prev').click(function () {
        if (allowSlideSwitch) {
          disableAutoPlay();
          switchBackward();
          enableAutoPlay();
        }
      });
      slider.after('<span class="sw-next-prev sw-next"></span>');
      slideContainer.find('.sw-next').click(function () {
        if (allowSlideSwitch) {
          disableAutoPlay();
          switchForward();
          enableAutoPlay();
        }
      });
    }

    function insertBullets(count) {
      slider.after('<ul class="sw-bullet"></ul>');
      var bulletList = slider.parent().find('.sw-bullet');
      for (var i = 0; i < count; i++) {
        if (i == 0) {
          bulletList.append('<li class="sw-slide-' + i + ' active"></li>');
        } else {
          bulletList.append('<li class="sw-slide-' + i + '"></li>');
        }
        var item = slideContainer.find('.sw-slide-' + i);
        (function (lockedIndex) {
          item.click(function () {
            disableAutoPlay();
            currentSlide = lockedIndex + 1;
            switchSlide();
            enableAutoPlay();
          });
        })(i);
      }
    }

    function setActiveBullet(number) {
      var activeBullet = 0;
      if (number == 0) {
        activeBullet = slideCount - 3;
      } else if (number == slideCount - 1) {
        activeBullet = 0;
      } else {
        activeBullet = number - 1;
      }
      slideContainer.find('.sw-bullet').find('li').removeClass('active');
      slideContainer.find('.sw-slide-' + activeBullet).addClass('active');
    }
    return slideContainer;
  }
}(jQuery));