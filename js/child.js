// 小鱼
var childObj=function(){
	this.x;
	this.y;
	this.angle; //角度
	this.childEye=new Image() //眼睛
	this.childBody=new Image() // 身体
	this.childTail=new Image() // 尾巴
	this.childTailTimer=0 // 计时器
	this.childTailCount=0 // 执行到哪一帧
	this.childEyeTimer = 0
	this.childEyeCount = 0
	this.childEyeInterval= 1000// 时间间隔,当前图片要持续多长时间
	this.childBodyTimer = 0
	this.childBodyCount = 0
}
//初始化
childObj.prototype.init=function(){
	this.x=canWidth*0.5-50;
	this.y=canHeight*0.5+50;
	this.angle=0
	this.childBody.src="image/babyFade0.png"
}
childObj.prototype.draw=function(){
	// 小鱼跟随大鱼
	this.x = lerpDistance(mom.x,this.x,0.98)
	this.y = lerpDistance(mom.y,this.y,0.98)
	// 角度
	var deltaY=mom.y-this.y
	var deltaX=mom.x-this.x
	var beta=Math.atan2(deltaY,deltaX)+Math.PI //这里是-PI到PI
	// 小鱼角度趋向大鱼角度
	this.angle=lerpAngle(beta,this.angle,0.6)
	
	
	// 小鱼尾巴
	this.childTailTimer+=deltaTime
	// 小于50毫秒加1，加到7就停止
	if(this.childTailTimer>50){
		this.childTailCount=(this.childTailCount+1)%8
		// 清空
		this.childTailTimer%=50
	}
	
	//小鱼身体
	this.childBodyTimer+=deltaTime
	if(this.childBodyTimer>300){
		this.childBodyCount=this.childBodyCount+1
		this.childBodyTimer%=300
		if(this.childBodyCount>19){
			this.childBodyCount=19
			// 提示结束
			data.gameOver=true
		}
	}
	// 小鱼眼睛
	this.childEyeTimer+=deltaTime
	if(this.childEyeTimer>this.childEyeInterval){
		this.childEyeCount=(this.childEyeCount+1) %2
		this.childEyeTimer%=this.childEyeInterval //计时器清空
		if(this.childEyeCount ==0){
			// 当小鱼眯眼睛时，睁眼睛的时间在2000到3500之间任意时间间隔
			this.childEyeInterval=Math.random()*1500+2000
		}else{
			this.childEyeInterval=200
		}
	}
	
	ctx1.save()
	ctx1.translate(this.x,this.y)
	ctx1.rotate(this.angle)  // 旋转
	
	var childCount=this.childTailCount
    ctx1.drawImage(childTail[childCount],-childTail[childCount].width*0.5+25,-childTail[childCount].height*0.5)
	var childBodyCound=this.childBodyCount
	ctx1.drawImage(childBody[childBodyCound],-childBody[childBodyCound].width*0.5,-childBody[childBodyCound].height*0.5)
	var childEyeCount=this.childEyeCount
	ctx1.drawImage(childEye[childEyeCount],-childEye[childEyeCount].width*0.5,-childEye[childEyeCount].height*0.5)
	ctx1.restore()
}
