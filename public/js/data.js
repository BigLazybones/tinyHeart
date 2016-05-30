//分值

var dataObj = function() {
	this.fruitNum = 0; //果实数量
	this.double = 1; //倍数，黄色果实为1，蓝色果实为二
	this.score = 0;  //分值
	this.gamaOver = false;
	this.alpha = 0;
}

dataObj.prototype.draw = function() { //绘制数据
	var w = can1.width;
	var h = can1.height;

	ctx1.save();
	ctx1.shadowBlur = 10;  //阴影
	ctx1.shadowColor = "white";
	ctx1.fillStyle = "white";
	ctx1.fillText("SCORE: " + this.score, w * 0.5, h - 20);
	
	if(this.gamaOver){
		this.alpha += deltaTime * 0.0005;
		if(this.alpha > 1){
			this.alpha = 1;
		}
		ctx1.fillStyle = "rgba(255,255,255,"+ this.alpha +")";
		ctx1.fillText("GAMEOVER", w * 0.5, h*0.5);
	}
	ctx1.restore();
}

dataObj.prototype.addScore = function(){
	//一个果实100分
	this.score += this.fruitNum * 100 * this.double;
	this.fruitNum = 0;
	this.double = 1;
}
