const pixi = require("pixi.js");
// override requires so that the local pixi-particles gets the pixi.js
// from this test project, not from the top level
require('override-require')(request => request === 'pixi.js', () =>  pixi);
const particles = require("pixi-particles");

const imagePaths = ["../../docs/examples/images/Sparks.png"];
const config = {
	"alpha": {
		"start": 1,
		"end": 0.31
	},
	"scale": {
		"start": 0.5,
		"end": 1
	},
	"color": {
		"start": "ffffff",
		"end": "9ff3ff"
	},
	"speed": {
		"start": 600,
		"end": 200
	},
	"acceleration": {
		"x":0,
		"y": 2000
	},
	"startRotation": {
		"min": 260,
		"max": 280
	},
	"rotationSpeed": {
		"min": 0,
		"max": 0
	},
	"lifetime": {
		"min": 0.25,
		"max": 0.5
	},
	"blendMode": "normal",
	"frequency": 0.001,
	"emitterLifetime": 0,
	"maxParticles": 1000,
	"pos": {
		"x": 0,
		"y": 0
	},
	"addAtBack": false,
	"spawnType": "circle",
	"spawnCircle": {
		"x": 0,
		"y": 0,
		"r": 0
	}
};
const canvas = document.getElementById("stage");
// Basic PIXI Setup
const rendererOptions =
{
	view: canvas,
};
const stage = new pixi.Container(),
	renderer = pixi.autoDetectRenderer(canvas.width, canvas.height, rendererOptions);
let emitter = null,
	bg = null;

// Calculate the current time
let elapsed = Date.now();

// Update function every frame
const update = function(){

	// Update the next frame
	window.updateId = requestAnimationFrame(update);

	const now = Date.now();
	if (emitter)
		emitter.update((now - elapsed) * 0.001);

	elapsed = now;

	// render the stage
	renderer.render(stage);
};

// Resize the canvas to the size of the window
window.onresize = function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	renderer.resize(canvas.width, canvas.height);
	if(bg)
	{
		//bg is a 1px by 1px image
		bg.scale.x = canvas.width;
		bg.scale.y = canvas.height;
	}
};
window.onresize();

// Preload the particle images and create PIXI textures from it
const urls = imagePaths.slice();
urls.push("../../docs/examples/images/bg.png");
const loader = pixi.loader;
for(let i = 0; i < urls.length; ++i)
	loader.add("img" + i, urls[i]);
loader.load(function()
{
	bg = new pixi.Sprite(pixi.Texture.fromImage("../../docs/examples/images/bg.png"));
	//bg is a 1px by 1px image
	bg.scale.x = canvas.width;
	bg.scale.y = canvas.height;
	bg.tint = 0x000000;
	stage.addChild(bg);
	//collect the textures, now that they are all loaded
	const art = [];
	for(let i = 0; i < imagePaths.length; ++i)
		art.push(pixi.Texture.fromImage(imagePaths[i]));
	// Create the new emitter and attach it to the stage
	const emitterContainer = new pixi.Container();
	stage.addChild(emitterContainer);
	window.emitter = emitter = new particles.Emitter(
		emitterContainer,
		art,
		config
	);

	// Center on the stage
	emitter.updateOwnerPos(window.innerWidth / 2, window.innerHeight / 2);

	// Click on the canvas to trigger
	canvas.addEventListener('mouseup', function(e){
		if(!emitter) return;
		emitter.emit = true;
		emitter.resetPositionTracking();
		emitter.updateOwnerPos(e.offsetX || e.layerX, e.offsetY || e.layerY);
	});

	// Start the update
	update();

	//for testing and debugging
	window.destroyEmitter = function()
	{
		emitter.destroy();
		emitter = null;
		window.destroyEmitter = null;
		//cancelAnimationFrame(updateId);

		//reset SpriteRenderer's batching to fully release particles for GC
		if (renderer.plugins && renderer.plugins.sprite && renderer.plugins.sprite.sprites)
			renderer.plugins.sprite.sprites.length = 0;

		renderer.render(stage);
	};
});