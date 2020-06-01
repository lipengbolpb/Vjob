//清空按钮获取焦点显示
$( '.inputbox input' ).focus( function ()
{
    var $siblings = $( this ).siblings(".fa");
    $siblings.removeClass().addClass("fa fa-times-circle");
} );
//清空按钮点击清空输入框内容
$( '.inputbox .fa-times-circle' ).on( 'touchend', function ()
{
	console.log('a');
    $(this).siblings( 'input' ).val("");
} );
//弹出窗口方法

var popContentH;
function popOpen (id,title,depict){ //打开方法
	$(id).fadeIn("fast");
	$(id).find(".title").html(title);
	$(id).find(".depict").html(depict);
	popHeiAda();
}
function popClose (id){//关闭方法
	$(id).fadeOut("fast");
}
function popHeiAda(){ //自适应
	$('.pop_container').each(function(index, element) {
         var $popContent= $(this).children('.pop_content');
		 $popContent.css({'top':(winH-$popContent.height())/2+'px'});
    });
}
//分享弹窗
$('.share_button').on('touchstart',function(){
	$('.share_content').fadeIn();
	});
$('.share_content').on('touchstart',function(){
	$(this).fadeOut();
	});
//全屏自适应
var winW = $(window).width();
var winH = $(window).height();
$DynFun=DynamicAttr('body');
function DynamicAttr (dynClassName){ 
	//$(dynClassName).css({'min-height':'504px'});
}

$(window).load(function() {
      $DynFun;
});
$(window).resize(function(){
	  $DynFun;
	});
//根据不同参数显示弹窗
function getParameterurl(param) { //获取URL中param之后的所有字符串
    var query = window.location.search;
    var iLen = param.length;
    var iStart = query.indexOf(param);
    if (iStart == -1)
        return "";
    iStart += iLen;
    return query.substring(iStart, query.length);
}
/*根据URL参数确定锚点位置*/
function _urlPaNameSD() {
    var urlList = getParameterurl('?').split('&'); 
	for(var i=0;i<urlList.length;i++){
		if(urlList[i].split('=')[0] == 'type'){
			popOpen('#'+urlList[i].split('=')[1])
		}
		}
}
//IP4 320*416
//IP6 375*603
//PLUS 414*672
//$('body').on('touchmove', function (event) {    event.preventDefault();  });