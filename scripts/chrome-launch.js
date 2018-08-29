#!/usr/bin/env node

const chromeLaunch = require('chrome-launch'); // eslint-disable-line import/no-extraneous-dependencies
const path = require('path');

const url = 'https://github.com/OctoLinker/OctoLinker/blob/master/package.json';
const dist = path.resolve(__dirname, '..', 'dist');
const args = [`--load-extension=${dist}`];

chromeLaunch(url, { args });
console.log('A new instance of Chrome should now be open in the background.'); // eslint-disable-line no-console
