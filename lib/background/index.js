import * as storage from '../options/storage.js';
import fetch from './fetch';
import newTab from './newTab';
import insight from './insight';

storage.load(() => {
  insight('UA-88792224-2', storage.get('doTrack'));
  fetch();
  newTab();
});
