// 大鱼与果实碰撞
function momFruitsCollision(){
	if(!data.gameOver){
		for(var i=0;i<fruit.num;i++){
			if(fruit.alive[i]){
				//  平方 30*30
				var l=calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y)
				if(l<900){
					fruit.dead(i)
					// 如果碰到红色果实，分值加1
					data.fruitNum++
					mom.momBodyCount++
					if(mom.momBodyCount>7){
						mom.momBodyCount=7
					}
					//吃到蓝色果实分值加倍
					if(fruit.fruitType[i]=='blue'){
						data.double=2
					}
					wave.born(fruit.x[i],fruit.y[i])
				}
			}
	    }
	}
	
}
// 大鱼喂小鱼
function momBodyCollision(){
	// 大鱼没有捕获果实，去碰撞小鱼时不会变化
	if(data.fruitNum>0&&!data.gameOver){
		// 检测大鱼和小鱼之间距离达到一定值小鱼达到满血状态
	var l=calLength2(mom.x,mom.y,child.x,child.y)
	if(l<900){
		child.childBodyCount=0
		// 大鱼把能量给小鱼后，大鱼状态归0
		//data.reset()
		mom.momBodyCount=0
		//更新数值
		data.addScroe()
		eat.born(child.x,child.y)
	}
	}
	
}
