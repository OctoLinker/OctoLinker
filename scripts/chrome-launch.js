#!/usr/bin/env node

const chromeLaunch = require('chrome-launch'); // eslint-disable-line import/no-extraneous-dependencies

const url = 'https://github.com/OctoLinker/OctoLinker/blob/master/package.json';
const args = ['--load-extension=./dist'];

chromeLaunch(url, { args });
console.log('A new instance of Chrome should now be open in the background.'); // eslint-disable-line no-console
