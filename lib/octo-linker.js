import injection from 'github-injection';
import notification from './notification';
import BlobReader from '../packages/blob-reader';
import * as resolvers from './resolver/index.js';
import clickHandler from './click-handler';
import Plugins from './plugin-manager.js';
import debugMode from './debug-mode.js';
import loadPlugins from './load-plugins';

var isValidDomain = false;
var defaultList = ["https://github.com/", "https://gist.github.com/", "https://githublinker.herokuapp.com/"];
var globalObj;

function initialize(self) {
  debugMode(false);
  clickHandler(resolvers);
  notification();

  self._blobReader = new BlobReader();
  self._pluginManager = new Plugins(loadPlugins());
}

function run(self) {
  if (!self._blobReader.hasBlobs()) {
    return false;
  }

  self._blobReader.read();

  self._blobReader.forEach((blob) => {
    const plugins = self._pluginManager.get(blob.path, blob.el.classList);

    if (!plugins.length) {
      return;
    }

    plugins.forEach((plugin) => {
      plugin.parseBlob(blob);
    });
  });
}

export default class OctoLinkerCore {
  constructor() {
    this.hasDefaultItem = false;
    globalObj = this;
    chrome.storage.sync.get(['octoLinkerDomains'], function(items) {
      globalObj.hasDefaultItem = true;
      items.octoLinkerDomains.map(function(x) {
        if (x.includes(window.location.origin)) {
          isValidDomain = true;
        }
      });
    });
    // Using setTimeout() to get around ansync thread issue
    setTimeout(globalObj.constructor_cont, 300);
  }

  constructor_cont() {
    // if there is no default items then loads up default origin list
    if (!globalObj.hasDefaultItem) {
      // save our default origin list to chrome.storage.sync
      chrome.storage.sync.set({'octoLinkerDomains': defaultList}, function() {});
      defaultList.map(x => {
          x.includes(window.location.origin) ? isValidDomain = true:'';
      });
    }
    // call initialize() ONLY when current URL is in octoLinkerDomains. 
    isValidDomain && initialize(globalObj);
  }

  init() {
    setTimeout(globalObj.ini_cont, 300);
  }

  ini_cont() {
    // call injection() ONLY when current URL is in octoLinkerDomains. 
    isValidDomain && injection(window, run.bind(null, globalObj));
  }
}
