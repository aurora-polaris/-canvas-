var dataObj=function(){
	this.fruitNum=0
	this.double=1
	this.score=0
	this.gameOver=false
	this.alpha=0
}
// 大鱼把能量给小鱼后，大鱼状态归0    与后面冲突
//dataObj.prototype.reset=function(){
//	this.fruitNum=0
//	this.double=1
//}
//分值绘制到页面
dataObj.prototype.draw=function(){
	var w=can1.width
	var h=can1.height
	ctx1.save()
	ctx1.shadowBlur=10
	ctx1.shadowColor="white"
	ctx1.fillStyle="white"
//	ctx1.font="30px Verdana"
//	ctx1.textAlign="center"
//	ctx1.fillText('num '+this.fruitNum,w*0.5,h-50)
//	ctx1.fillText('double '+this.double,w*0.5,h-80)
	ctx1.fillText('SCORE '+this.score,w*0.5,h-20)
	if(this.gameOver){
		this.alpha+=deltaTime*0.0005
		if(this.alpha>1){
			this.alpha=1
		}
		ctx1.fillStyle="rgba(255,255,255,"+this.alpha+")"
		ctx1.fillText('GAMEOVER',w*0.5,h*0.5)
	}
	ctx1.restore()
}
dataObj.prototype.addScroe=function(){
	this.score+=this.fruitNum*100*this.double
	this.fruitNum=0
	this.double=1
}
