goog.provide('flappybird.ScreenLayer');
goog.require('lime.Layer');
goog.require('lime.Sprite');
goog.require('lime.Label');

flappybird.ScreenLayer = function(){
	var mainLayer = new lime.Layer().setPosition(130,50).setAnchorPoint(0,0),
    label = new lime.Sprite().setSize(100,50).setFill("assets/game_title.png").setAnchorPoint(0,0),
    sky =  new lime.Sprite().setSize(300,250).setPosition(0,0).setAnchorPoint(0,0).setFill('assets/game_map.png'),
    ground = new lime.Sprite().setSize(300,80).setPosition(0,240).setAnchorPoint(0,0).setFill('assets/game_ground.png'),
    bounder_right = new lime.Sprite().setSize(300,250).setPosition(300,-2).setAnchorPoint(0,0).setFill('#000000'),
    bounder_left = new lime.Sprite().setSize(300,250).setPosition(-300,-2).setAnchorPoint(0,0).setFill('#000000');
    mainLayer.appendChild(sky).appendChild(ground).appendChild(label);
    mainLayer.appendBounder = function(){
    	mainLayer.appendChild(bounder_left);
    	mainLayer.appendChild(bounder_right);
    }
    return mainLayer;
}