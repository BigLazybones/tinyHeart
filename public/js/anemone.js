//海葵

var aneObj = function() {
	this.rootx = []; //根部的X坐标
	this.headx = []; //头部的X坐标
	this.heady = []; //头部的y坐标
	this.alpha = 0; //正弦函数的角度
	this.amp = [];  //震幅
}
aneObj.prototype.num = 50;
aneObj.prototype.init = function() {
	for (var i = 0; i < this.num; i++) {
		this.rootx[i] = i * 16 + Math.random() * 20;
		this.headx[i] = this.rootx[i];
		this.heady[i] = canHeight - 250 + Math.random() * 50;
		this.amp[i] = Math.random() * 50 + 50;
	}
}
aneObj.prototype.draw = function() {
	this.alpha += deltaTime * 0.0008;
	var l = Math.sin(this.alpha);   //l 曲线的Y坐标  值是[-1,1)
	ctx2.save();
	ctx2.strokeStyle = "#3b154e";
	ctx2.lineCap = "round";
	ctx2.globalAlpha = 0.6;
	ctx2.lineWidth = 20;
	for (var i = 0; i < this.num; i++) {
		ctx2.beginPath();
		ctx2.moveTo(this.rootx[i], canHeight);
		this.headx[i] = this.rootx[i] + l * this.amp[i];
		ctx2.quadraticCurveTo(this.rootx[i], canHeight - 100, this.headx[i], this.heady[i]);
		ctx2.stroke();
	}
	ctx2.restore();
}