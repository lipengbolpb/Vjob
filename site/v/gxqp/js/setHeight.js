(function(){
	var height = document.documentElement.clientHeight || document.body.clientHeight;
	if (height !== "undefined"){
		document.getElementsByTagName("body")[0].style.height = height + "px";
	}
})();
