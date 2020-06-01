//(function(){
//	//横屏
//	window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize",function() {
//		if(window.orientation === 180 || window.orientation === 0) {
//			// 竖屏状态
//			document.getElementsByClassName('screen')[0].style.display='none';
//		}
//		if(window.orientation === 90 || window.orientation === -90) {
//			// 横屏状态
//			document.getElementsByClassName('screen')[0].style.display='block';
//		}
//	}, false);
//})()
(function rotate(){
   var orientation=window.orientation;
   var pd = null;
   
   function createPd(){
       if(document.getElementById('preventTran') === null){
            var imgData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB2CAYAAAAZUrcsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDAwMjcwNkVEQzczMTFFNjlFMDFGQTEzNkM3N0JBMTMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDAwMjcwNkREQzczMTFFNjlFMDFGQTEzNkM3N0JBMTMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ0NzhCMTlBREM1ODExRTZCNTdFRjQ0Q0I1QzRCODZBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ0NzhCMTlCREM1ODExRTZCNTdFRjQ0Q0I1QzRCODZBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+J30rNQAACRRJREFUeNrsXQlsFVUU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';
            pd = document.createElement('div');
            pd.setAttribute('id','preventTran');
            pd.style.position = 'fixed';
            pd.style.left = '0';
            pd.style.top = '0';
            pd.style.width = '100%';
            pd.style.height = '100%';
            pd.style.overflow = 'hidden';
            pd.style.backgroundColor = '#2e2e2e';
            pd.style.textAlign = 'center';
            pd.style.zIndex = '99999';
            document.getElementsByTagName('body')[0].appendChild(pd);
            var img = document.createElement('img');
            img.src = imgData;
            pd.appendChild(img);
            img.style.margin = '60px auto 30px'
            var p = document.createElement('p');
            p.style.width = '100%';
            p.style.height = 'auto';
            p.style.fontSize = '.56rem';
            p.style.color = '#fff';
            p.style.lineHeight = '34px';
            p.style.textAlign = 'center';
            p.innerHTML = '为了您的良好体验';
            p.innerHTML += '请将手机/平板竖屏操作';
            pd.appendChild(p);
        }
   }
   if(orientation==90||orientation==-90){
        if(pd == null && document.getElementById('preventTran') === null) createPd();
        document.getElementById('preventTran').style.display = 'block';
   }
   window.onorientationchange=function(){
      if(pd == null && document.getElementById('preventTran') == null) createPd();
      document.getElementById('preventTran').style.display='none';
      rotate();
   };
})();
