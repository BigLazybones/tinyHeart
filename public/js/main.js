/**
 * Created by wum-b on 15-12-4.
 */
var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;
var canHeight;

var lastTime; //上一帧执行的时间
var deltaTime; //两帧间隔时间差

var bgPic = new Image();

var ane; //海葵
var fruit; //果实
var mom; //大鱼
var baby; //小鱼

var mx; //鼠标X坐标
var my; //鼠标Y坐标

var babyTail = []; //小鱼尾巴
var babyEye = []; //小鱼眼睛
var babyBoby = []; //小鱼身体

var momTail = []; //大鱼尾巴
var momEye = []; //大鱼眼睛
var momBobyOra = []; //大鱼黄色身体
var momBobyBlue = []; //大鱼蓝色身体

var data;

var wave;   //大鱼吃果实波浪
var halo;   //大鱼喂小鱼光晕
var dust;   //漂浮物
var dustPic = [];  //漂浮物图片数组


$(function() {
	game();
});

function game() {
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
}

function init() {
	//获取canvas context
	can1 = document.getElementById("canvas1"); //鱼，浮游，UI，圆圈特效
	ctx1 = can1.getContext("2d");
	can2 = document.getElementById("canvas2"); //背景，海葵，果实
	ctx2 = can2.getContext("2d");

	can1.addEventListener("mousemove", mouseMove, false)

	bgPic.src = "public/images/background.jpg"; //背景图地址

	canWidth = can1.width;
	canHeight = can1.height;

	ane = new aneObj();
	ane.init();

	fruit = new fruitObj();
	fruit.init();

	mom = new momObj();
	mom.init();

	baby = new babyObj();
	baby.init();

	mx = canWidth * 0.5;
	my = canHeight * 0.5;

	for (var i = 0; i < 8; i++) {
		babyTail[i] = new Image();
		babyTail[i].src = "public/images/babyTail" + i + ".png";
	}

	for (var i = 0; i < 2; i++) {
		babyEye[i] = new Image();
		babyEye[i].src = "public/images/babyEye" + i + ".png";
	}

	for (var i = 0; i < 20; i++) {
		babyBoby[i] = new Image();
		babyBoby[i].src = "public/images/babyFade" + i + ".png";
	}

	for (var i = 0; i < 8; i++) {
		momTail[i] = new Image();
		momTail[i].src = "public/images/bigTail" + i + ".png";
	}

	for (var i = 0; i < 2; i++) {
		momEye[i] = new Image();
		momEye[i].src = "public/images/bigEye" + i + ".png";
	}

	data = new dataObj();

	for (var i = 0; i < 8; i++) {
		momBobyOra[i] = new Image();
		momBobyBlue[i] = new Image();
		momBobyOra[i].src = "public/images/bigSwim" + i + ".png";
		momBobyBlue[i].src = "public/images/bigSwimBlue" + i + ".png";
	}

	ctx1.font = "30px Verdana";
	ctx1.textAlign = "center";
	
	wave = new waveObj();
	wave.init();
	
	halo = new haloObj();
	halo.init();
	
	for (var i = 0; i < 7; i++) {
		dustPic[i] = new Image();
		dustPic[i].src = "public/images/dust" + i + ".png";
	}
	
	dust = new dustObj();
	dust.init();
}

//游戏循环
function gameloop() {
	requestAnimFrame(gameloop);
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;
	if (deltaTime > 40) {
		deltaTime = 40;
	}

	drawBackground();
	ane.draw();
	fruitMonitor();
	fruit.draw();

	ctx1.clearRect(0, 0, canWidth, canHeight); //在给定矩形内清空一个矩形
	mom.draw();
	baby.draw();
	momFruitsCollision(); //大鱼果实碰撞检测
	momBabyCollision(); //大鱼小鱼碰撞检测

	data.draw();
	wave.draw();
	halo.draw();
	dust.draw();
}

function mouseMove(e) {
	if (!data.gamaOver) {
		if (e.offsetX || e.layerX) {
			mx = e.offSetX == undefined ? e.layerX : e.offSetX;
			my = e.offSetY == undefined ? e.layerY : e.offSetY;
		}
	}
}