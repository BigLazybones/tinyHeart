//大鱼

var momObj = function() {
	this.x;
	this.y;
	this.angle; //角度
	
	this.momTailTimer = 0;  //大鱼尾巴计时器
	this.momTailCount = 0;	//大鱼尾巴计数
	
	this.momEyeTimer = 0;  //大鱼眼睛计时器
	this.momEyeCount = 0;	 //大鱼眼睛计数
	this.momEyeInterval = 1000;  //大鱼眨眼时间间隔
	
	this.momBodyCount = 0;	 //大鱼身体计数
}

momObj.prototype.init = function() {
	this.x = canWidth * 0.5;
	this.y = canHeight * 0.5;
	this.angle = 0;
}

momObj.prototype.draw = function() {
	
	//趋向于目标 x,y
	this.x = lerpDistance(mx, this.x, 0.98);
	this.y = lerpDistance(my, this.y, 0.98);
	
	//计算坐标差
	//Math.atan2() 可返回从 x 轴到点 (x,y) 之间的角度。
	var deltaY = my - this.y;
	var deltaX = mx - this.x;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI;  //鼠标和大鱼之间的角度差
	
	//趋向于目标角度
	this.angle = lerpAngle(beta, this.angle, 0.6);
	
	//大鱼尾巴计数
	this.momTailTimer += deltaTime;
	if(this.momTailTimer > 50){
		this.momTailCount = (this.momTailCount + 1) % 8;
		this.momTailTimer %= 50;
	}
	
	//大鱼眼睛计数
	this.momEyeTimer += deltaTime;
	if(this.momEyeTimer > this.momEyeInterval){
		this.momEyeCount = (this.momEyeCount + 1) % 2;
		this.momEyeTimer %= this.momEyeInterval;
		
		if(this.momEyeCount == 0){
			this.momEyeInterval = Math.random() * 1500 + 2000;
		}else{
			this.momEyeInterval = 200;
		}
	}
	
	
	ctx1.save();
	ctx1.translate(this.x, this.y);  //重新映射画布上的 (0,0) 位置
	ctx1.rotate(this.angle);   //旋转当前绘图
	
	var momTailCount = this.momTailCount;
	ctx1.drawImage(momTail[momTailCount], -momTail[momTailCount].width * 0.5 + 30, -momTail[momTailCount].height * 0.5);

	var momBodyCount = this.momBodyCount;
	if(data.double == 1){  //绘制黄色果实
		ctx1.drawImage(momBobyOra[momBodyCount], -momBobyOra[momBodyCount].width * 0.5, -momBobyOra[momBodyCount].height * 0.5);
	}else{   //绘制蓝色果实
		ctx1.drawImage(momBobyBlue[momBodyCount], -momBobyBlue[momBodyCount].width * 0.5, -momBobyBlue[momBodyCount].height * 0.5);
	}
	
	
	var momEyeCount = this.momEyeCount;
	ctx1.drawImage(momEye[momEyeCount], -momEye[momEyeCount].width * 0.5, -momEye[momEyeCount].height * 0.5);
	ctx1.restore();
}