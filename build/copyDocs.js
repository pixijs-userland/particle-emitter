const ncp = require('ncp').ncp;
const process = require('process');
const path = require('path');

ncp(
    path.resolve(process.cwd(), 'node_modules/pixi.js'),
    path.resolve(process.cwd(), 'docs/examples/libs/pixi.js'),
    { dereference: true },
    (err) =>
    {
        if (err)
        {
            console.error(err);
        }
    }
);
