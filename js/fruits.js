var fruitObj=function(){
	this.alive=[]
	this.x=[]
	this.y=[]
	this.l=[]
	this.speed=[]
	this.fruitType=[]
	this.orange=new Image()
	this.blue =new Image()
	this.aneNo=[]
}
fruitObj.prototype.num=30
// 初始化
fruitObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.alive[i]=false
		this.x[i]=0
		this.y[i]=0
		// 初始化果实大小
		this.l[i]=0
		this.aneNo[i]=0
		// 初始化果实随机飘
		this.speed[i]=Math.random()*0.017+0.003
		// 果实的类别
		this.fruitType[i]=''
		//初始化所有的果实出生
		//this.born(i)
	}
	// 加载果实图片
	this.orange.src="image/fruit.png"
	this.blue.src="image/blue.png"
}
// 绘制
fruitObj.prototype.draw=function(){
	for(var i=0;i<this.num;i++){
		if(this.alive[i]){
			if(this.fruitType[i]=='blue'){
				var pic=this.blue
			}else{
				var pic=this.orange
			}
			// 这里面果实的尺寸是和deltaTime 成正比的，时间间隔越长值越大，所以切换页面时，果实就变的特别大
			// 长大一定大小就不涨了
		if(this.l[i]<=14){
			var num=this.aneNo[i]
//			this.l[i]+=0.01*deltaTime // 成长速度
			this.x[i]=ane.headx[num]
			this.y[i]=ane.heady[num]
            this.l[i]+=this.speed[i]*deltaTime // 成长速度       
		}else{
			//this.y[i]-=0.04*deltaTime  // 向上飘
			this.y[i]-=this.speed[i]*7*deltaTime  // 向上飘
			
		}
		// 找到一个海葵，drawImage绘制从0,0开始，所以要减去图片的一半宽，一半高
		//ctx2.drawImage(this.orange,this.x[i]-this.orange.width*0.5,this.y[i]-this.orange.height*0.5)
	    ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i])
	    if(this.y[i]<-10){
	    	this.alive[i]=false
	    }
		}
		
	}
}
// 找到海葵的位置
fruitObj.prototype.born=function(i){
	var aneId=Math.floor(Math.random()*ane.num)
	// 果实的位置
	this.aneNo[i]=aneId
	this.x[i]=ane.headx[aneId]
	this.y[i]=ane.heady[aneId]
	// 如果直接写下面这句，不写上面的，获取果实和喂小鱼的光圈就不正常了，而且分数会暴涨
    //this.aneNo[i]=Math.floor(Math.random()*ane.num)
	this.l[i]=0
	this.alive[i]=true
	var ran=Math.random()
	if(ran<0.2){
		this.fruitType[i]='blue'
	}else{
		this.fruitType[i]='orange'
	}
	
}
// 当前果实状态为死亡状态
fruitObj.prototype.dead=function(i){
	this.alive[i]=false
}
function fruitMonitor(){
	// 判断果实的数量，控制出生
	var num=0;
	for(var i=0;i<fruit.num;i++){
		if(fruit.alive[i]) num++
	}
	if(num<15){
		senFruit()
		return
	}
}
function senFruit(){
	for(var i=0;i<fruit.num;i++){
		if(!fruit.alive[i]){
			fruit.born(i)
			return 
		}
	}
}
