var can1,can2,ctx1,ctx2
// 两帧的时间间隔不统一
var lastTime   // 上一针执行时间
var deltaTime  // 两帧间隔时间差
// 定义背景图
var bgPic=new Image()
// 定义海葵
var ane
//定义果实
var fruit
//定义大鱼
var mom
// 定义鼠标变量
var mx,my
// 定义小鱼
var child
// 定义存放小鱼尾巴的数组
var childTail=[]
// 定义小鱼眼睛
var childEye=[]
// 小鱼身体
var childBody=[]
// 大鱼尾巴
var momTail=[]
// 定义大鱼眼睛
var momEye=[]
// 大鱼身体
var momBodyOra=[]
var momBodyBlue=[]
// 分值
var data
// 特效
var wave
// 特效2
var eat
// 漂浮物
var dust
var dustPic=[]
// 定义canvas的宽高
var canWidth,canHeight
// body文件加载完成之后，把game作为一个主入口执行
document.body.onload=game
function game(){
	//初始化
	init()
	// 初始值，当前时间
	lastTime=Date.now()
	deltaTime=0
	gameloop()
}
function init(){
	//获得画笔
	can1=document.getElementById("canvas1")// 小鱼，分值
	ctx1=can1.getContext('2d')
	can2=document.getElementById("canvas2")// 背景，海葵，果实
	ctx2=can2.getContext('2d')
	// 检测大鱼跟随鼠标
	can1.addEventListener('mousemove',onMousemove,false)
	// 初始化加载背景图片
	bgPic.src="image/background.jpg"
	// 初始化宽高
	canWidth=can1.width
	canHeight=can1.height
	// 定义类并初始化
	ane=new aneObj()
	ane.init()
	// 初始化果实
	fruit=new fruitObj()
	fruit.init()
	// 初始化大鱼
	mom=new momObj()
	mom.init()
	mx=canWidth*0.5
	my=canHeight*0.5
	// 初始化小鱼
	child=new childObj()
	child.init()
	
	// 初始化分值
	data=new dataObj()
	// 初始化大鱼吃果实特效
	wave=new waveObj()
	wave.init()
	// 初始化大鱼喂小鱼特效
	eat=new eatObj()
	eat.init()
	// 初始化漂浮物
	dust=new dustObj()
	dust.init()
	for(var i=0;i<7;i++){
		dustPic[i]=new Image()
		dustPic[i].src="image/dust"+i+".png"
	}
	// 初始化话小鱼尾巴
	for(var i=0;i<8;i++){
		childTail[i]=new Image()
		childTail[i].src="image/babyTail"+i+".png"
	}
	// 初始化小鱼眼睛
	for(var i=0;i<2;i++){
		childEye[i]=new Image()
		childEye[i].src="image/babyEye"+i+".png"
	}
	// 初始化小鱼身体
	for(var i=0;i<20;i++){
		childBody[i]=new Image()
		childBody[i].src="image/babyFade"+i+".png"
	}
	// 初始化化大鱼尾巴
	for(var i=0;i<8;i++){
		momTail[i]=new Image()
		momTail[i].src="image/bigTail"+i+".png"
	}
	// 初始化大鱼眼睛
	for(var i=0;i<2;i++){
		momEye[i]=new Image()
		momEye[i].src="image/bigEye"+i+".png"
	}
	// 初始化大鱼身体
	for(var i=0;i<8;i++){
		momBodyOra[i]=new Image()
		momBodyBlue[i]=new Image()
		momBodyOra[i].src="image/bigSwim"+i+".png"
		momBodyBlue[i].src="image/bigSwimBlue"+i+".png"
	}
	ctx1.font="30px Verdana"
	ctx1.textAlign="center"
}
function gameloop(){
	//api相对于setInterval,setTimeout来讲更为科学,当前绘制完成后根据当前机器性能决定下一帧什么时候开始
	// fps 每秒多少帧  导致 时间间隔不是固定的
	window.requestAnimationFrame(gameloop);
	// 获取当前时间
	var now=Date.now()
	// 时间差=当前时间-上一针的时间
	deltaTime=now-lastTime
	//更新上一针时间
	lastTime=now
	// 解决切换页面果实变大
	if(deltaTime>40) deltaTime=40
	// 调用背景
	drawBackground()
	// 每一帧都绘画一个
	ane.draw()
	// 绘制果实
	fruit.draw()
	fruitMonitor()
	// 清除上一帧大鱼动画
	ctx1.clearRect(0,0,canWidth,canHeight)
	// 绘制大鱼
	mom.draw()
	// 大鱼碰撞小鱼
	momBodyCollision()
	// 碰撞果实
	momFruitsCollision()
	// 绘制小鱼
	child.draw()
	//绘制分值
	data.draw()
	//特效1
	wave.draw()
	//特效2
	eat.draw()
	// 漂浮物
	dust.draw()
}
function onMousemove(e){
	if(!data.gameOver){
	 if(e.offsetX||e.layerX){
		mx=e.offsetX==undefined?e.layerX:e.offsetX
		my=e.offsetY==undefined?e.layerY:e.offsetY
		
	  }
	}
	
}
