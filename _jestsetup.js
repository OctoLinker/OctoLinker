import fs from 'fs';
import path from 'path';
import fetchMock from 'jest-fetch-mock';

jest.mock('path');

global.fetch = fetchMock;

global.chrome = {};
global.chrome.runtime = {
  sendMessage: jest.fn(),
};

// Needed to run webextension-polyfill within Jest
// see https://github.com/mozilla/webextension-polyfill/issues/218#issuecomment-584936358
chrome.runtime.id = 'fake-chrome';

global.fixture = {
  load: (file) => {
    const fullPath = path.join(__dirname, file);
    const fixture = fs.readFileSync(fullPath);
    document.body.innerHTML = fixture.toString();
  },
  cleanup: () => {
    document.body.innerHTML = '';
  },
};
