goog.provide('flappybird.Game');

goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Sprite');
goog.require('lime.Label');
goog.require('lime.scheduleManager');
goog.require('lime.animation.MoveBy');
goog.require('lime.animation.Easing');

goog.require('flappybird.ScreenLayer');
goog.require('flappybird.Bird');
goog.require('flappybird.Pipe');


flappybird.Game = function(){
	var gameScene = new lime.Scene();
	var gameLayer = new flappybird.ScreenLayer();
	var isDate = goog.now();
	if(!isDate){
		gameMap.setFill('assets/game_map_night.png');
	}
	var flappyBird = new flappybird.Bird(80);
	var that = this;

	goog.events.listenOnce(gameLayer,['mousedown','touchstart'],function(e){
		that.start();
    });
    goog.events.listen(gameLayer,['mousedown','touchstart'],function(e){
		flappyBird.fly();
    });
	gameLayer.appendChild(flappyBird);
	
	gameScene.appendChild(gameLayer);
	this.gameScene = gameScene;
	this.flappyBird = flappyBird;
	this.gameLayer = gameLayer;
	this.pipeNumber = 2;
	this.pipeStartFrom = 300;
	this.pipes = [];
	this.scheduledFunctions = [];
}
flappybird.Game.prototype.start = function(){
	this.addPipes();
	this.scheduledFunctions.push(this.addPipes);
	lime.scheduleManager.scheduleWithDelay(this.addPipes,this,6000);
	
	//this.physicalEffect();
	this.scheduledFunctions.push(this.physicalEffect);
	lime.scheduleManager.schedule(this.physicalEffect, this);
	
	this.scheduledFunctions.push(this.checkGameOver);
	lime.scheduleManager.schedule(this.checkGameOver,this)
}
flappybird.Game.prototype.addPipes = function(){
	var newPipes = flappybird.Pipe.prototype.createPipes(this.pipeNumber,this.pipeStartFrom);
	for(var i in newPipes){
		newPipes[i].appendTo(this.gameLayer);
		this.pipes.push(newPipes[i]);
	}
}
flappybird.Game.prototype.physicalEffect = function(){
		if(this.flappyBird.flying || this.physcialAlready){
			return
		}
		this.physcialAlready = true;
		var position = this.flappyBird.getPosition();
    	var move = new lime.animation.MoveTo(position.x, position.y + 80).setDuration(4).setEasing(lime.animation.Easing.EASEOUT);
    	this.flappyBird.runAction(move);
    	var that = this;
    	goog.events.listen(move,lime.animation.Event.STOP,function(){
   			that.physcialAlready = false;
		})
}
flappybird.Game.prototype.checkGameOver = function(){
	for(var i in this.pipes){
		var pipe = this.pipes[i];
		if(goog.math.Box.intersectsWithPadding(this.flappyBird.getBoundingBox(),pipe.pipeUp.getBoundingBox(),-10)) {
            this.gameOver();
            return
        }
        if(goog.math.Box.intersectsWithPadding(this.flappyBird.getBoundingBox(),pipe.pipeDown.getBoundingBox(),-10)) {
            this.gameOver();
            return
        }
	}
}
flappybird.Game.prototype.gameOver = function(){
	alert("Game over");
	this.stopScheduledFunctions();
	//stop pipe moving
	for(var i in this.pipes){
		this.pipes[i].canMove = false;
	}
}
flappybird.Game.prototype.stopScheduledFunctions = function(){
	for(var i in this.scheduledFunctions){
		lime.scheduleManager.unschedule(this.scheduledFunctions[i],this);
	}
}
