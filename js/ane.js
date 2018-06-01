// 定义海葵
var aneObj=function(){
	// 利用贝塞尔绘制摇摆的海葵
	this.rootx=[]
	this.headx=[]
	this.heady=[]
	this.alpha=0  //海葵角度
	this.amp=[] // 振幅
//	this.len=[]
}
// 定义数量
aneObj.prototype.num=50
// 初始化
aneObj.prototype.init=function(){
	// 海葵的位置
	for(var i=0;i<this.num;i++){
		this.rootx[i]=i*16+Math.random()*20 // 随机位置
		this.headx[i]=this.rootx[i]
		this.heady[i]=canHeight-250+Math.random()*50
		this.amp[i]=Math.random()*50+50
		//this.len[i]=200+Math.random()*50  // 随机高
	}
	
}
// 绘制
aneObj.prototype.draw=function(){
	// 样式定义只在这一段中起作用
	this.alpha+=deltaTime*0.0008
	var l=Math.sin(this.alpha) //[-1,1]
	ctx2.save()
	ctx2.globalAlpha=0.6
	ctx2.lineWidth=20
	ctx2.lineCap="round"
	ctx2.strokeStyle="#3b154e"
	for(var i=0;i<this.num;i++){
		ctx2.beginPath()
		ctx2.moveTo(this.rootx[i],canHeight)
		this.headx[i]=this.rootx[i]+l*this.amp[i]// 当前海葵头部的具体位置
		ctx2.quadraticCurveTo(this.rootx[i],canHeight-100,this.headx[i],this.heady[i])
		ctx2.stroke()
	}
	ctx2.restore()
}
