//果实

var fruitObj = function() {
	this.alive = []; //是否活着状态  bool
	this.x = [];
	this.y = [];
	this.l = []; //果实图片的长度
	this.aneNo = [];
	this.spd = []; //果实成长的速度和上浮的速度
	this.fruitType = []; //果实类型：黄色果实蓝色果实
	this.orange = new Image();
	this.blue = new Image();
}
fruitObj.prototype.num = 30;

fruitObj.prototype.init = function() { //果实初始化
	for (var i = 0; i < this.num; i++) {
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.l[i] = 0;
		this.aneNo[i] = 0;
		this.spd[i] = Math.random() * 0.017 + 0.003;
		this.fruitType[i] = "";
	}
	this.orange.src = "public/images/fruit.png";
	this.blue.src = "public/images/blue.png";
}

fruitObj.prototype.draw = function() {
	for (var i = 0; i < this.num; i++) {
		//1.画果实    2.找海葵    3.果实飘起来
		if (this.alive[i]) {
			var pic;
			if(this.fruitType[i] == "blue"){
				pic = this.blue;
			}else{
				pic = this.orange;
			}
			
			if (this.l[i] <= 14) {
				var No = this.aneNo[i];
				this.x[i] = ane.headx[No];
				this.y[i] = ane.heady[No];
				this.l[i] += this.spd[i] * deltaTime;
				ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
			} else {
				this.y[i] -= this.spd[i] * 7 * deltaTime;
				ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
			}
			
			if (this.y[i] < 10) {
				this.alive[i] = false;
			}
		}
	}
}

fruitObj.prototype.born = function(i) { //果实生长
	this.aneNo[i] = Math.floor(Math.random() * ane.num);
	this.l[i] = 0;
	this.alive[i] = true;
	var ran = Math.random();
	if(ran < 0.1){
		this.fruitType[i] = "blue";
	}else{
		this.fruitType[i] = "orange";
	}
	
}

fruitObj.prototype.dead = function(i) { //果实被吃掉
	this.alive[i] = false;
}

//果实状态监控
function fruitMonitor() {
	var num = 0; //果实数量
	for (var i = 0; i < fruit.num; i++) {
		if (fruit.alive[i]) {
			num++;
		}
	}
	if (num < 15) {
		sendFruit();
		return;
	}
}

//调用生成果实
function sendFruit() {
	for (var i = 0; i < fruit.num; i++) {
		if (!fruit.alive[i]) {
			fruit.born(i);
			return;
		}
	}
}