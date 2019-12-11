window.onload = function() {
	function $(idName) {
		return document.getElementById(idName);
	}
	var start = $("start");
	var game = $("game");
	var btn_start = $("btn_start");
	btn_start.onclick = function() {
		start.style.display = "none";
		game.style.display = "block";
		// 空格键弹起
		window.onkeyup = function(event) {
			if (event.keyCode == 32) {
				birdFly(false);
				// 鼠标点击
				game.onclick = function() {
					birdFly(true);
				}
			}
		}
	}
	var gameBird = $("gameBird");
	// 保存定时函数
	var dsBird = null;
	//鸟飞
	function birdFly(flag) {
		if (dsBird != null) {
			clearInterval(dsBird);
			dsBird = null;
		}
		// 鸟的飞行速度 向上- 向下加
		var speed = flag ? -1 : 1.5;
		var birdTop = getStyle(gameBird, "top");
		var lastTop = birdTop - 20;
		dsBird = setInterval(function() {
			var top = getStyle(gameBird, "top");
			if (top <= lastTop) //为什么???
			{
				speed = 1.5;
			}

			if (top <= 0) {
				speed = 1.5;
			}
			if (top > 398) {
				clearInterval(dsBird);
			}
			
			if(speed<0){
				gameBird.style.src = "url(img/up.gif)";
				// document.getComputedStyle(gameBird,null)[src]="./img/bird.gif";
			}
			else{
				gameBird.style.src = "url(img/down.gif)";
				// document.getComputedStyle(gameBird,null)[src]="./img/down.gif";
			}
			gameBird.style.top = top + speed + "px";
		}, 10);
	}
	//获取标签的属性
	function getStyle(element, attribute) {
		var str = getComputedStyle(element, null)[attribute];
		return parseFloat(str);
	}
}
