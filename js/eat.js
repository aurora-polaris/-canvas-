// 大鱼喂小鱼特效
var eatObj=function(){
	this.x=[]
	this.y=[]
	this.alive=[]
	this.r=[]
}
eatObj.prototype.num=5
eatObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.x[i]=0
		this.y[i]=0
		this.alive[i]=false
		this.r[i]=0
	}
}
eatObj.prototype.draw=function(){
	ctx1.save()
	ctx1.lineWidth=2
	ctx1.shadowBlur=3
	ctx1.shadowColor="white"
	for(var i=0;i<this.num;i++){
		if(this.alive[i]){
			this.r[i]+=deltaTime*0.04
			var alpha=1-this.r[i]/50
			if(this.r[i]>50){
			 this.alive[i]=false
			 break
			}
			//draw
			ctx1.beginPath()
			ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2)
		    ctx1.strokeStyle="rgba(203,91,0,"+alpha+")" 
		    ctx1.stroke()
		}
	}
	ctx1.restore()
}
eatObj.prototype.born=function(x,y){
	for(var i=0;i<this.num;i++){
		if(!this.alive[i]){
		 //born
		 this.alive[i]=true
		 this.r[i]=10
		 this.x[i]=x
		 this.y[i]=y
		 return
		}
	}
}