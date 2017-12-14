import fs from 'fs';
import path from 'path';

global.chrome = {};
global.chrome.runtime = {
  sendMessage: jest.fn(),
};

global.fixture = {
  load: file => {
    const fullPath = path.join(__dirname, '..', file);
    const fixture = fs.readFileSync(fullPath);
    document.body.innerHTML = fixture.toString();
  },
  cleanup: () => {
    document.body.innerHTML = '';
  },
};
