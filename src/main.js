//set main namespace
goog.provide('flappybird');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Sprite');
goog.require('lime.Label');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');

goog.require('flappybird.Bird');
goog.require('flappybird.Game');
goog.require('flappybird.ScreenLayer');

//goog.addDependency("bird.js", "flappybird.Bird")


// entrypoint
flappybird.start = function(){

	var director = new lime.Director(document.body,600,400).setDisplayFPS(false),
	    initScene = new lime.Scene(),

	    mainLayer = new flappybird.ScreenLayer(),
        playBtn = new lime.Sprite().setSize(50,30).setFill('assets/start_game_btn.png').setPosition(50,180).setAnchorPoint(0,0),
        rankBtn = new lime.Sprite().setSize(50,30).setFill('assets/rank_btn.png').setPosition(200, 180).setAnchorPoint(0,0);

    mainLayer.appendChild(playBtn).appendChild(rankBtn);
    var bird = new flappybird.Bird();
    mainLayer.appendChild(bird);


    director.makeMobileWebAppCapable();
    //add target and title to the scene
    initScene.appendChild(mainLayer);
    //add some interaction
    goog.events.listen(playBtn,['mousedown','touchstart'],function(e){
        var game = new flappybird.Game();
        director.replaceScene(game.gameScene);
    });

    goog.events.listen(rankBtn,['mousedown','touchstart'],function(e){

        // change to rank scene


    });

	// set current scene active
	director.replaceScene(initScene);

}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('flappybird.start', flappybird.start);
