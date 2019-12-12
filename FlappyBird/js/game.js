window.onload = function() {
	function $(idName) {
		return document.getElementById(idName);
	}
	var start = $("start");
	var game = $("game");
	var btn_start = $("btn_start");
	var status = false;
	btn_start.onclick = function() {
		start.style.display = "none";
		game.style.display = "block";
		// 空格键弹起
		window.onkeyup = function(event) {
			if (event.keyCode == 32) {
				if (!status) {
					status = true;
					birdFly(false);
					createPipes();
					continueGame();
					// 鼠标点击
					game.onclick = function() {
						birdFly(true);
					}
				} else {
					status = false;
					pauseGame();
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

			if (speed < 0) {
				gameBird.src = "img/up.gif";
			} else {
				gameBird.src = "img/down.gif";
			}
			gameBird.style.top = top + speed + "px";
		}, 10);
	}
	//获取标签的属性
	function getStyle(element, attribute) {
		var str = getComputedStyle(element, null)[attribute];
		return parseFloat(str);
	}

	var pipes = $("pipes");
	// 创建单个水管
	function createPipe() {
		var pipe = document.createElement("div");
		pipe.className = "pipe";
		var up_height = parseInt(Math.random() * 205);
		var down_height = 205 - up_height;
		pipe.innerHTML =
			`<div class="up"><div class="up_mod" Style="height:${up_height}px"></div><div class="up_pipe"></div></div><div class="down"><div class="down_pipe"></div><div class="down_mod" Style="height:${down_height}px"></div></div>`;
		pipes.appendChild(pipe);
		arrPipes.push(pipe);
		pipeMove(pipe);
	}

	var arrPipes = [];
	// 水管移动
	function pipeMove(pipe) {
		pipes.timer = setInterval(function() {
			var pipeLeft = getStyle(pipe, "left");
			if (pipeLeft <= -62) {
				pipes.removeChild(pipe);
				arrPipes.splice(0, 1);
			}
			pipe.style.left = pipeLeft - 1 + "px";
		}, 10);
	}

	// 创建多个水管
	function createPipes() {
		dsCreatePipes = setInterval(function() {
			createPipe();
		}, 1800);
	}

	// 暂停游戏
	function pauseGame() {
		clearInterval(dsBird);
		clearInterval(dsCreatePipes);
		for (var i = 0; i < arrPipes.length; i++) {
			clearInterval(arrPipes[i].timer);
		}
		// pipes.timer = null;
		clearInterval(pipes.timer);
		game.onclick = null;

	}
	// 继续游戏
	function continueGame() {
		for (var i = 0; i < arrPipes.length; i++) {
			pipeMove(arrPipes[i]);
		}
	}
}
