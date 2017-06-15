//子弹
function Bullet(className,x,y){
	
	Spirit.call(this,className);
	
	//设置初始位置
	this.iNode.style.left = x + 'px';
	this.iNode.style.top = y + 'px';
	
	//设置初始速度
	this.speed = -10;
}

Bullet.prototype = new Spirit();

//子弹摧毁
Bullet.prototype.destory = function(){
	
	var self = this;
	//修改它的className
	self.iNode.className = 'bullet_die';
	
	var count = 1;
	self.destoryTimer = setInterval(function(){
		
		if(count == 2){
			//停止定时器
			clearInterval(self.destoryTimer);
			//移除控制移动的定时器
			clearInterval(self.bulletTimer);
			//移除节点
			self.mainNode.removeChild(self.iNode);
			
			return;
		}
		self.iNode.style.backgroundImage = 'url(img/die' + ++count + '.png)'
		
		
	},30);
	
}


//匀速移动的函数
Bullet.prototype.move = function(){
	
	var self = this;
	
	self.bulletTimer = setInterval(function(){
		
		self.iNode.style.top = self.iNode.offsetTop + self.speed + 'px';
		//判断子弹飞出了界面
		if(self.iNode.offsetTop <= -self.iNode.offsetHeight){
			
			clearInterval(self.bulletTimer);
			self.mainNode.removeChild(self.iNode);
		}
		
		
	},30);
	
}
