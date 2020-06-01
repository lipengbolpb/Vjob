function alertTip(title, content, btnText, cb) {
	var alertTip = document.getElementById("alertTip"),
		alertTitle = alertTip.getElementsByClassName('alertTitle')[0],
		alertContent = alertTip.getElementsByClassName('alertContent')[0],
		alertBtn = document.getElementById("alertBtn");

	alertTitle.innerHTML = title;
	alertContent.innerHTML = content;
	alertBtn.innerHTML = btnText;
	alertTip.style.display = 'block';

	alertBtn.addEventListener('click',alertBtnClick , false);
	function alertBtnClick() {
		alertBtn.removeEventListener('click',alertBtnClick , false);
		if(!!cb) {
			alertTip.style.display = 'none';
			cb();
		} else {
			alertTip.style.display = 'none';
		}
	}
}