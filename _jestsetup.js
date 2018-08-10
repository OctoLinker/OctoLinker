import fs from 'fs';
import path from 'path';
import fetchMock from 'jest-fetch-mock';

jest.mock('path');

global.fetch = fetchMock;

global.chrome = {};
global.chrome.runtime = {
  sendMessage: jest.fn(),
};

global.fixture = {
  load: file => {
    const fullPath = path.join(__dirname, file);
    const fixture = fs.readFileSync(fullPath);
    document.body.innerHTML = fixture.toString();
  },
  cleanup: () => {
    document.body.innerHTML = '';
  },
};
