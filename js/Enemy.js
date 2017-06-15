//敌机
function Enemy(className){
	
	Spirit.call(this,className);
	
	//随机位置
	this.iNode.style.left = Math.floor(Math.random() * (this.mainNode.offsetWidth - this.iNode.offsetWidth)) + 'px';
	
	//设置初始速度
	if(className == 'plane1'){
		this.speed = 10;
		//设置血条长度（hp）
		this.hp = 2;
		this.score = 10;
		//设置好摧毁的动画图片
		this.imageArr = ['plane1_die1.png','plane1_die2.png','plane1_die3.png'];
	}else if(className == 'plane2'){
		this.speed = 5;
		this.hp = 5;
		this.score = 50;
		this.imageArr = ['plane2_die1.png','plane2_die2.png','plane2_die3.png','plane2_die4.png'];
		
	}else if(className == 'plane3'){
		this.speed = 2;
		this.hp = 10;
		this.score = 80;
		this.imageArr = ['plane3_die1.png','plane3_die2.png','plane3_die3.png','plane3_die4.png','plane3_die5.png','plane3_die6.png'];
		
	}
	
	
	
}

Enemy.prototype = new Spirit();

//敌机移动
Enemy.prototype.attack = function(){
	
	var self = this;
	
	self.enemyTimer = setInterval(function(){
		
		self.iNode.style.top = self.iNode.offsetTop + self.speed + 'px';
		//判断边界
		if(self.iNode.offsetTop >= self.clientHeight){
			
			//停止定时器
			clearInterval(self.enemyTimer);
			self.mainNode.removeChild(self.iNode);
			
		}
		
	},30);
	
}

//受伤
Enemy.prototype.hurt = function(callBack){
	//判断血条为空
	if(--this.hp == 0){
		
		//移除
		this.destory();
		callBack(this.score);
	}
	
}

Enemy.prototype.destory = function(){
	
	var self = this;
	var count = 0;
	
	self.destoryTimer = setInterval(function(){
		
		if(count == self.imageArr.length - 1){
			//停止摧毁的定时器
			clearInterval(self.destoryTimer);
			//停止控制移动的定时器
			clearInterval(self.enemyTimer);
				
			self.mainNode.removeChild(self.iNode);
			return;
		}
		
		self.iNode.style.backgroundImage = 'url(img/' + self.imageArr[++count] + ')'
		
	},30);
	
}
