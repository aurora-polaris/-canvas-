// 大鱼
var momObj=function(){
	this.x;
	this.y;
	this.angle; //角度
	this.momTailTimer=0 // 计时器
	this.momTailCount=0 // 执行到哪一帧
	this.momEyeTimer = 0
	this.momEyeCount = 0
	this.momEyeInterval= 1000// 时间间隔,当前图片要持续多长时间
	// this.momBodyTimer = 0
	this.momBodyCount = 0
}
//初始化
momObj.prototype.init=function(){
	this.x=canWidth*0.5;
	this.y=canHeight*0.5;
	this.angle=0
	
}
momObj.prototype.draw=function(){
	// 绘制
	// 使一个值趋向另一个值，在com函数中lerpDistance
	// 大鱼位置趋向鼠标
	this.x = lerpDistance(mx,this.x,0.98)
	this.y = lerpDistance(my,this.y,0.98)
	// 角度差 反正切计算Math.atan2
	var deltaY=my-this.y
	var deltaX=mx-this.x
	var beta=Math.atan2(deltaY,deltaX)+Math.PI //这里是-PI到PI
	// 大鱼角度趋向鼠标角度
	this.angle=lerpAngle(beta,this.angle,0.6)
	
	//大鱼尾巴
	this.momTailTimer+=deltaTime
	if(this.momTailTimer>50){
		this.momTailCount=(this.momTailCount+1)%8
		this.momTailTimer%=50
	}
	
	// 大鱼眼睛
	this.momEyeTimer+=deltaTime
	if(this.momEyeTimer>this.momEyeInterval){
		this.momEyeCount=(this.momEyeCount+1) %2
		this.momEyeTimer%=this.momEyeInterval //计时器清空
		if(this.momEyeCount ==0){
			// 当大鱼眯眼睛时，睁眼睛的时间在2000到3500之间任意时间间隔
			this.momEyeInterval=Math.random()*1500+2000
		}else{
			this.momEyeInterval=200
		}
	}
	ctx1.save()
	ctx1.translate(this.x,this.y)
	ctx1.rotate(this.angle)  // 旋转
	var momTailCount=this.momTailCount
	ctx1.drawImage(momTail[momTailCount],-momTail[momTailCount].width*0.5+30,-momTail[momTailCount].height*0.5)
	var momBodyCount=this.momBodyCount
	if(data.double==1){
		ctx1.drawImage(momBodyOra[momBodyCount],-momBodyOra[momBodyCount].width*0.5,-momBodyOra[momBodyCount].height*0.5)
	}else{
		ctx1.drawImage(momBodyBlue[momBodyCount],-momBodyBlue[momBodyCount].width*0.5,-momBodyBlue[momBodyCount].height*0.5)
	}
	//ctx1.drawImage(this.bigBody,-this.bigBody.width*0.5,-this.bigBody.height*0.5)
	var momEyeCount=this.momEyeCount
	ctx1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width*0.5,-momEye[momEyeCount].height*0.5)
	ctx1.restore()
}
