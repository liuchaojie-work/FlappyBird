window.onload = function(){
	function $(idName){
		return document.getElementById(idName);
	}
	var start = $("start");
	var game=$("game");
	var btn_start=$("btn_start");
	btn_start.onclick=function(){
		start.style.display="none";
		game.style.display="block";
	}
	
	
}