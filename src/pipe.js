goog.provide('flappybird.Pipe');

goog.require('lime.Sprite');
goog.require('lime.animation.Loop');
goog.require('lime.animation.MoveTo');
goog.require('lime.scheduleManager');


flappybird.Pipe = function(height,x){
	this.pipeUp = new lime.Sprite().setFill('assets/pipe_up.png').setAnchorPoint(0,0);
	this.pipeDown = new lime.Sprite().setFill('assets/pipe_down.png').setAnchorPoint(0,0);
	this.setPipePosition(x,height);
	this.canMove = true;
}
flappybird.Pipe.prototype.setPipePosition = function(x,height){
	var upHeight = 50+Math.ceil(Math.random()*height);
	var upPosition = 180 - (upHeight - 60);
	var downHeight = 60+Math.ceil(Math.random()*height);
	downHeight = (downHeight + upHeight) > 200 ? downHeight - 30 : downHeight;
	var downPosition = -2 + (200-60-downHeight);
	this.pipeUp.setPosition(x,upPosition);
	this.pipeDown.setPosition(x,-2);
	this.pipeUp.setSize(30,upHeight);
	this.pipeDown.setSize(30,downHeight);
}
flappybird.Pipe.prototype.createPipes = function(pipeNumber,initY){
	var pipes = [];
	for(var i =0 ;i < pipeNumber; i ++ ){
		pipes.push(new flappybird.Pipe(60,initY));
		initY = initY + 60 + Math.ceil(Math.random()*50);
	}
	return pipes;
}
flappybird.Pipe.prototype.appendTo  = function(parent){
	parent.appendChild(this.pipeDown);
	parent.appendChild(this.pipeUp);
	parent.appendBounder();
	this.moving(this.pipeDown);
	this.moving(this.pipeUp);
}
flappybird.Pipe.prototype.moving = function(pipe){
	var f;
	lime.scheduleManager.schedule(f = function(dt) {
		if(!this.canMove){
			lime.scheduleManager.unschedule(f,this);
		}
	    pipe.runAction(new lime.animation.MoveTo(pipe.getPosition().x -40, pipe.getPosition().y).setDuration(0.2).enableOptimizations());
    }, this);
}