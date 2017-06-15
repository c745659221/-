//玩家飞机，子弹，敌机的父类
function Spirit(className){
	
	//保证不能为空
	if(!className){
		return;
	}
	
	this.clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
	this.clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
	
	//把主界面保存到玩家飞机，子弹，敌机中
	this.mainNode = document.getElementsByClassName('containner')[0];
	
	//添加节点
	this.iNode = document.createElement('div');
	this.iNode.className = className;
	this.mainNode.appendChild(this.iNode);
	
}

