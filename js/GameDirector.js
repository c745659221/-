//游戏导演，控制游戏的整个进程
function GameDirector(number){
	
	//保存主界面到导演中的属性
	this.mainNode = document.getElementsByClassName('containner')[0];
	this.scoreNode = document.getElementById('score');
	
	//声明一个装载敌机的数组
	this.enemyArr = [];
	//难度等级
	this.level = number;
}

//开始游戏
GameDirector.prototype.startGame = function(){
	
	
	var self = this;
	/*
	 * 1.移除选项列表
	 * 2.加载读取动画
	 * 3.动画完成之后要创建玩家飞机
	 */
	
	self.loading(function(){
		//动画完成执行以下代码
		
		//地图移动
		self.mapMove();
		
		//创建玩家飞机
		self.createPlayer();
		
		//创建敌机
		self.createEnemy();
		
		//开启监听碰撞
		self.check();
		
		//显示记分牌
		self.scoreNode.style.display = 'block';
		
	});
	
	
}

//地图移动
GameDirector.prototype.mapMove = function(){
	
	//改变背景图的位置
	var self = this;
	
	var y = 0;
	
	self.mapTimer = setInterval(function(){
		//改变背景图的y值
		self.mainNode.style.backgroundPositionY = ++y + 'px';
		
		
	},30);
}


//创建玩家飞机
GameDirector.prototype.createPlayer = function(){
	
	//保存创建的玩家飞机
	this.player = new Player('player');
	this.player.fire(this.level);
	
}

//创建敌机
GameDirector.prototype.createEnemy = function(){
	
	var self = this;
	
	//每一秒钟出现一个敌机
	setInterval(function(){
		
		var chance = Math.random();
		
		if(chance < 0.6){
			var enemy = new Enemy('plane1');
		}else if(chance < 0.9){
			var enemy = new Enemy('plane2');
		}else{
			var enemy = new Enemy('plane3');
		}
		//运动
		enemy.attack();
		
		//把敌机对象保存到一个数组中
		self.enemyArr.push(enemy);
		
	},1000);
	
	//每一秒钟出现一个敌机
	setInterval(function(){
		
		var chance = Math.random();
		
		if(chance < 0.3){
			var enemy = new Enemy('plane1');
		}else if(chance < 0.95){
			var enemy = new Enemy('plane2');
		}else{
			var enemy = new Enemy('plane3');
		}
		//运动
		enemy.attack();
		
		//把敌机对象保存到一个数组中
		self.enemyArr.push(enemy);
		
	},1400);
	
	
}


//加载读取动画
GameDirector.prototype.loading = function(callBack){
	
	//移除选单界面
	this.mainNode.removeChild(document.getElementById('list'));
	
	//添加logo图标
	var logoNode = document.createElement('img');
	logoNode.className = 'logo';
	logoNode.src = 'img/logo.png';
	this.mainNode.appendChild(logoNode);
	
	//加载小飞机图标
	var loadingNode = document.createElement('img');
	loadingNode.className = 'loading';
	loadingNode.src = 'img/loading1.png';
	this.mainNode.appendChild(loadingNode);
	
	
	var self = this;
	//启动一个定时器，切换图片
	var count = 1;
	self.loadingTimer = setInterval(function(){
		
		if(count == 3){
			//停止定时器
			clearInterval(self.loadingTimer);
			
			//移除标题和小飞机
			self.mainNode.removeChild(logoNode);
			self.mainNode.removeChild(loadingNode);
			
			//调用回调函数
			callBack();
			
			return;
		}
		
		loadingNode.src = 'img/loading' + ++count + '.png';
		
	},200);
	
}

//监听碰撞的函数
GameDirector.prototype.check = function(){
	
	/*
	 * 每隔30毫秒，遍历界面所有的敌机节点，判断敌机节点和子弹节点，
	 * 或者敌机节点和玩家飞机节点是否发生了碰撞
	 * 
	 */
	var self = this;
	
	setInterval(function(){
		
		for(var i = 0; i < self.enemyArr.length; i++){
			//临时接收敌机对象
			var tempEnemy = self.enemyArr[i];
			
			//判断和玩家飞机是否发生了碰撞
			if(self.isCrash(tempEnemy.iNode,self.player.iNode)){
				//摧毁
				self.player.destory(function(){
					//动画完成后回调
					alert('Game Over');
					location.reload();
					
				});
				
			}
			
			//遍历子弹
			for(var j = 0; j < self.player.bulletArr.length;j++){
				
				//临时接收子弹对象
				var tempBullet = self.player.bulletArr[j];
				
				//判断子弹是否和敌机放生了碰撞
				if(self.isCrash(tempBullet.iNode,tempEnemy.iNode)){
					
					//摧毁
					tempBullet.destory();
					//从数组移除子弹
					self.player.bulletArr.splice(j,1);
					
					//调用受伤函数
					tempEnemy.hurt(function(planeScore){
						
						//从数组中移除敌机
						self.enemyArr.splice(i,1);
						//记分(累加)
						self.scoreNode.innerHTML = self.scoreNode.innerHTML * 1 + planeScore; 
					});
					
					
					
				}
				
			}
			
		}
		
		
	},30)
	
}

//碰撞判断
GameDirector.prototype.isCrash = function(node1,node2){
	
	var left1 = node1.offsetLeft;
	var top1 = node1.offsetTop;
	var width1 = node1.offsetWidth;
	var height1 = node1.offsetHeight;
	
	var left2 = node2.offsetLeft;
	var top2 = node2.offsetTop;
	var width2 = node2.offsetWidth;
	var height2 = node2.offsetHeight;
	
	// 10 < left1 < 50
	// 20 < left1 < 40
	
	//判断是否发生碰撞
	if(left1  > left2 - width1 + 5 && left1 < left2 + width2 - 5 
		&& top1  > top2 - height1 + 5 && top2 + height2 - 5 > top1 ){
		
		return true;
		
	};
	
	
	return false;
}
