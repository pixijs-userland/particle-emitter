# PixiJS Particle Emitter

[![Build Status](https://github.com/pixijs-userland/particle-emitter/workflows/Build/badge.svg)](https://github.com/pixijs-userland/particle-emitter/actions?query=workflow%3A%22Build%22) [![GitHub version](https://badge.fury.io/gh/pixijs-userland%2Fparticle-emitter.svg)](https://github.com/pixijs-userland/particle-emitter/releases/latest)

A particle system library for the [PixiJS](https://github.com/pixijs/pixijs) library. Also, we created an [interactive particle editor](https://userland.pixijs.io/particle-emitter-editor/) to design and preview custom particle emitters which utilitze PixiJS Particle Emitter. Note that the editor was built for an older version of the library - to use its output you'll have to use the [`upgradeConfig()`](https://userland.pixijs.io/particle-emitter/docs/modules.html#upgradeConfig) function.

## Breaking changes in v5 from v4
* Project has been renamed from `pixi-particles` to `@pixi/particle-emitter`
* On `Emitter`, configuration format has drastically changed. Use [`upgradeConfig()`](https://userland.pixijs.io/particle-emitter/docs/modules.html#upgradeConfig) to convert old configuration objects automatically.
* `PathParticle` and `AnimatedParticle` no longer exist, use the new behaviors instead.
* Dropped support for PixiJS v4. Please use v6 - while v5 may work, Typescript definitions won't work and will cause you a headache.
* The library now outputs ES6 code - if you need it in ES5 code, you'll need to make sure your build process transpiles it.

## Sample Usage

Please see the examples for various pre-made particle configurations.

```js
// Create a new emitter
// note: if importing library like "import * as particles from '@pixi/particle-emitter'"
// or "const particles = require('@pixi/particle-emitter')", the PIXI namespace will
// not be modified, and may not exist - use "new particles.Emitter()", or whatever
// your imported namespace is
var emitter = new PIXI.particles.Emitter(

    // The PIXI.Container to put the emitter in
    // if using blend modes, it's important to put this
    // on top of a bitmap, and not use the root stage Container
    container,
    // Emitter configuration, edit this to change the look
    // of the emitter
    {
        lifetime: {
            min: 0.5,
            max: 0.5
        },
        frequency: 0.008,
        spawnChance: 1,
        particlesPerWave: 1,
        emitterLifetime: 0.31,
        maxParticles: 1000,
        pos: {
            x: 0,
            y: 0
        },
        addAtBack: false,
        behaviors: [
            {
                type: 'alpha',
                config: {
                    alpha: {
                        list: [
                            {
                                value: 0.8,
                                time: 0
                            },
                            {
                                value: 0.1,
                                time: 1
                            }
                        ],
                    },
                }
            },
            {
                type: 'scale',
                config: {
                    scale: {
                        list: [
                            {
                                value: 1,
                                time: 0
                            },
                            {
                                value: 0.3,
                                time: 1
                            }
                        ],
                    },
                }
            },
            {
                type: 'color',
                config: {
                    color: {
                        list: [
                            {
                                value: "fb1010",
                                time: 0
                            },
                            {
                                value: "f5b830",
                                time: 1
                            }
                        ],
                    },
                }
            },
            {
                type: 'moveSpeed',
                config: {
                    speed: {
                        list: [
                            {
                                value: 200,
                                time: 0
                            },
                            {
                                value: 100,
                                time: 1
                            }
                        ],
                        isStepped: false
                    },
                }
            },
            {
                type: 'rotationStatic',
                config: {
                    min: 0,
                    max: 360
                }
            },
            {
                type: 'spawnShape',
                config: {
                    type: 'torus',
                    data: {
                        x: 0,
                        y: 0,
                        radius: 10
                    }
                }
            },
            {
                type: 'textureSingle',
                config: {
                    texture: PIXI.Texture.from('image.jpg')
                }
            }
        ],
    }
);

// Calculate the current time
var elapsed = Date.now();

// Update function every frame
var update = function(){

	// Update the next frame
	requestAnimationFrame(update);

	var now = Date.now();

	// The emitter requires the elapsed
	// number of seconds since the last update
	emitter.update((now - elapsed) * 0.001);
	elapsed = now;
};

// Start emitting
emitter.emit = true;

// Start the update
update();
```

## Documentation

https://userland.pixijs.io/particle-emitter/docs/

## Installation

PixiJS Particle Emitter can be installed with NPM or other package managers.

```bash
npm install @pixi/particle-emitter
```

## Examples

* [Explosion 1](https://userland.pixijs.io/particle-emitter/examples/explosion.html)
* [Explosion 2](https://userland.pixijs.io/particle-emitter/examples/explosion2.html)
* [Explosion 3](https://userland.pixijs.io/particle-emitter/examples/explosion3.html)
* [Explosion Ring](https://userland.pixijs.io/particle-emitter/examples/explosionRing.html)
* [Megaman Death](https://userland.pixijs.io/particle-emitter/examples/megamanDeath.html)
* [Rain](https://userland.pixijs.io/particle-emitter/examples/rain.html)
* [Flame](https://userland.pixijs.io/particle-emitter/examples/flame.html)
* [Flame on Polygonal Chain](https://userland.pixijs.io/particle-emitter/examples/flamePolygonal.html)
* [Flame on Advanced Polygonal Chain](https://userland.pixijs.io/particle-emitter/examples/flamePolygonalAdv.html)
* [Flame - Stepped Colors](https://userland.pixijs.io/particle-emitter/examples/flameStepped.html)
* [Flame with Smoke](https://userland.pixijs.io/particle-emitter/examples/flameAndSmoke.html)
* [Flame - Sputtering](https://userland.pixijs.io/particle-emitter/examples/flameUneven.html)
* [Gas](https://userland.pixijs.io/particle-emitter/examples/gas.html)
* [Bubbles](https://userland.pixijs.io/particle-emitter/examples/bubbles.html)
* [Bubble Spray](https://userland.pixijs.io/particle-emitter/examples/bubbleSpray.html)
* [Bubble Stream](https://userland.pixijs.io/particle-emitter/examples/bubbleStream.html)
* [Bubble Stream - path following](https://userland.pixijs.io/particle-emitter/examples/bubbleStreamPath.html)
* [Vertical Bubbles](https://userland.pixijs.io/particle-emitter/examples/bubblesVertical.html)
* [Cartoon Smoke](https://userland.pixijs.io/particle-emitter/examples/cartoonSmoke.html)
* [Cartoon Smoke Alt.](https://userland.pixijs.io/particle-emitter/examples/cartoonSmoke2.html)
* [Cartoon Smoke Blast](https://userland.pixijs.io/particle-emitter/examples/cartoonSmokeBlast.html)
* [Snow](https://userland.pixijs.io/particle-emitter/examples/snow.html)
* [Sparks](https://userland.pixijs.io/particle-emitter/examples/sparks.html)
* [Fountain](https://userland.pixijs.io/particle-emitter/examples/fountain.html)
* [Animated Coins](https://userland.pixijs.io/particle-emitter/examples/coins.html)
* [Animated Bubbles](https://userland.pixijs.io/particle-emitter/examples/animatedBubbles.html)
* [Spaceship Destruction - Ordered Art](https://userland.pixijs.io/particle-emitter/examples/spaceshipDestruction.html)
* [Particle Container Performance](https://userland.pixijs.io/particle-emitter/examples/particleContainerPerformance.html)

## Contributer Note
This project uses `yarn` rather than `npm` to take advantage of the workspaces feature for the tests, making it easier to have standalone tests that share dependencies where possible.

## License

Copyright (c) 2015 [CloudKid](http://github.com/cloudkidstudio)

Released under the MIT License.
