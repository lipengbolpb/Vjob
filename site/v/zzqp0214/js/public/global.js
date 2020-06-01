$('._rules').click(function(){
    $('#ruleTier').fadeIn();
})
$('.pop_container ._close').click(function(){
	$('.pop_container').hide();
})
$('.pop_container .close').click(function(){
	$('.pop_container').hide();
})
$('.tx ._close').click(function(){
  $('.tx').hide();
})

/*function audioAutoPlay(id){  
    var audio = document.getElementById(id);  
    //audio.play();  
    document.addEventListener("WeixinJSBridgeReady", function () {  
            audio.play();  
    }, false);  
    document.addEventListener('YixinJSBridgeReady', function() {  
            audio.play();  
    }, false);  
}  
audioAutoPlay('bgMusic'); */
var audio = document.getElementById('bgMusic'); 
document.addEventListener("WeixinJSBridgeReady", function () {
              audio.play();
              $('#bgMusic').on("loadstart",function(){
                audio.play();
              });
}, false);

$('#_share').click(function(){
  $('#_share').hide();
})

