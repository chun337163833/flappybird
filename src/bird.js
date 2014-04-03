goog.provide('flappybird.Bird');

goog.require('lime.Circle');
goog.require('lime.animation.MoveBy');
goog.require('lime.animation.Sequence');
goog.require('lime.animation.Easing');

flappybird.Bird = function(x,y){

	x = x||120;
	y = y||100;
	lime.Circle.call(this);
	this.setFill('assets/bird_1.png').setSize(30, 30);
	this.setAnchorPoint(0, 0);
	this.setPosition(x,y);
	this.orginalX = x;
	this.orginalY = y;
	this.flying = false;
	//var bird = new lime.Circle();
	//bird.setFill('assets/bird_1.png').setSize(30, 30);
	//bird.setAnchorPoint(0, 0);
	//bird.v = new goog.math.Vec2(0, 50);
	//bird.setPosition(x,y);
	//bird.orginalX = x;
	//bird.orginalY = y;
	//return bird;
}

goog.inherits(flappybird.Bird, lime.Circle);
flappybird.Bird.prototype.fly = function(){
	this.flying = true;
	var currentPosition = this.getPosition();
	//alert(currentPosition.y)
	//alert(this.orginalY)
	var height = (currentPosition.y - 30) < 0 ?  0 : (currentPosition.y - 30) ;
	//alert(height);
    var move = new lime.animation.Sequence(
        new lime.animation.MoveTo(currentPosition.x, height).setDuration(0.5),
        new lime.animation.MoveTo(currentPosition.x, (currentPosition.y - 10)).setDuration(0.5).setEasing(lime.animation.Easing.EASEOUT)
    );

    this.runAction(move);
    var that = this;
    goog.events.listen(move,lime.animation.Event.STOP,function(){
   		that.flying = false;
	})
}


