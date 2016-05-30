//碰撞检测

//判断大鱼和果实的距离
function momFruitsCollision() {
	if (!data.gamaOver){
		for (var i = 0; i < fruit.num; i++) {
			if (fruit.alive[i]) {
				//获取斜边大小
				var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y)
				if (l < 900) { //如果值小于30,平方值小于900
					fruit.dead(i); //果实被吃掉
					data.fruitNum++;
					mom.momBodyCount++; //大鱼身体计数
					if (mom.momBodyCount > 7) {
						mom.momBodyCount = 7;
					}
					if (fruit.fruitType[i] == "blue") { //如果是蓝色果实
						data.double = 2;
					}
					wave.born(fruit.x[i], fruit.y[i]);
				}
			}
		}
	}
}


//判断大鱼和小鱼的距离
function momBabyCollision() {
	if (data.fruitNum > 0 && !data.gamaOver) {
		//获取斜边大小
		var l = calLength2(mom.x, mom.y, baby.x, baby.y)
		if (l < 900) { //如果值小于30,平方值小于900

			baby.babyBodyCount = 0; //小鱼状态恢复
			mom.momBodyCount = 0;
			//分值更新
			data.addScore();
			halo.born(baby.x, baby.y);
		}
	}
}