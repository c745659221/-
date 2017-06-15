//玩家飞机
function Player(className){
	
	Spirit.call(this,className);
	
	//创建一个数组保存子弹
	this.bulletArr = [];
	
	//创建飞机的同时，就调用addMove
	this.addMove();
}

Player.prototype = new Spirit();

//开火
Player.prototype.fire = function(level){
	
	var self = this;
	
	//创建子弹
	self.bulletTimer = setInterval(function(){
		
		//计算子弹初始的位置
		var x = self.iNode.offsetLeft +  (self.iNode.offsetWidth- 7) / 2;
		var y = self.iNode.offsetTop - 18;
		
		var bullet = new Bullet('bullet',x,y);
		bullet.move();
		
		//保存子弹
		self.bulletArr.push(bullet);
		
	},120 * level);
	
}

//坠机
Player.prototype.destory = function(callBack){
	
	var self = this;
	var count = 0;
	self.destoryTimer = setInterval(function(){
		
		if(count == 4){
			
			//停止定时器
			clearInterval(self.destoryTimer);
			//移除节点
			self.mainNode.removeChild(self.iNode);
			
			callBack();
			return;
		}
		
		//切换图片
		self.iNode.style.backgroundImage = 'url(img/me_die' + ++count + '.png)';
		
	},30);
	
}



//拖拽
Player.prototype.addMove = function(){
	
	var self = this;
	self.iNode.onmousedown = function(evt){
		var oEvent = evt || event;
		
		self.disX = oEvent.offsetX;
		self.disY = oEvent.offsetY;
		
		onmousemove = function(evt){
			var oEvent = evt || event;
			
			self.locationChange(oEvent.clientX,oEvent.clientY);
			
		}
		onmouseup = function(){
			
			onmousemove = null;
			onmouseup = null;
		}
		
	}
	
}

Player.prototype.locationChange = function(x,y){
	
	//限制不能超过左边界和右边界
	var left = x - this.disX - this.mainNode.offsetLeft;
	
	if(left <= 0){
		left = 0;
	}else if( left >= this.mainNode.offsetWidth - this.iNode.offsetWidth){
		left = this.mainNode.offsetWidth - this.iNode.offsetWidth;
	}
	
	//改变位置
	this.iNode.style.left = left + 'px';
	this.iNode.style.top = y - this.disY + 'px';
}
