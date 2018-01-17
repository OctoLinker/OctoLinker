import * as storage from '@octolinker/helper-settings';
import newTab from './newTab';
import insight from './insight';

storage.load().then(() => {
  insight('UA-88792224-3', storage.get('clientId'), storage.get('doTrack'));
  newTab();
});
