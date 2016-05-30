//小鱼

var babyObj = function() {
	this.x;
	this.y;
	this.angle; //角度
	
	this.babyTailTimer = 0;  //小鱼尾巴计时器
	this.babyTailCount = 0;	 //小鱼尾巴计数
	
	this.babyEyeTimer = 0;  //小鱼眼睛计时器
	this.babyEyeCount = 0;	 //小鱼眼睛计数
	this.babyEyeInterval = 1000;  //小鱼眨眼时间间隔
	
	this.babyBodyTimer = 0;  //小鱼身体计时器
	this.babyBodyCount = 0;	 //小鱼身体计数
}

babyObj.prototype.init = function(){
	this.x = canWidth * 0.5 - 50;
	this.y = canHeight * 0.5 + 50;
	this.angle = 0;
}

babyObj .prototype.draw = function() {
	//趋向于大鱼坐标 x,y
	this.x = lerpDistance(mom.x, this.x, 0.98);
	this.y = lerpDistance(mom.y, this.y, 0.98);
	
	//计算坐标差
	//Math.atan2() 可返回从 x 轴到点 (x,y) 之间的角度。
	var deltaY = mom.y - this.y;
	var deltaX = mom.x - this.x;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI;  //鼠标和大鱼之间的角度差
	
	//趋向于目标角度
	this.angle = lerpAngle(beta, this.angle, 0.6);
	
	//小鱼尾巴计数
	this.babyTailTimer += deltaTime;
	if(this.babyTailTimer > 50){
		this.babyTailCount = (this.babyTailCount + 1) % 8;
		this.babyTailTimer %= 50;
	}
	
	//小鱼眼睛计数
	this.babyEyeTimer += deltaTime;
	if(this.babyEyeTimer > this.babyEyeInterval){
		this.babyEyeCount = (this.babyEyeCount + 1) % 2;
		this.babyEyeTimer %= this.babyEyeInterval;
		
		if(this.babyEyeCount == 0){
			this.babyEyeInterval = Math.random() * 1500 + 2000;
		}else{
			this.babyEyeInterval = 200;
		}
	}
	
	//小鱼身体计数
	this.babyBodyTimer += deltaTime;
	if(this.babyBodyTimer > 300){
		this.babyBodyCount = this.babyBodyCount + 1;
		this.babyBodyTimer %= 300;
		if(this.babyBodyCount > 19){
			this.babyBodyCount = 19;
			//游戏结束
			data.gamaOver = true;
		}
	}
	
	ctx1.save();
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);
	var babyTailCount = this.babyTailCount;
	ctx1.drawImage(babyTail[babyTailCount], -babyTail[babyTailCount].width * 0.5 + 23, -babyTail[babyTailCount].height * 0.5);
	var babyBodyCount = this.babyBodyCount;
	ctx1.drawImage(babyBoby[babyBodyCount], -babyBoby[babyBodyCount].width * 0.5, -babyBoby[babyBodyCount].height * 0.5);
	var babyEyeCount = this.babyEyeCount;
	ctx1.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width * 0.5, -babyEye[babyEyeCount].height * 0.5);
	ctx1.restore();
}