/* eslint-disable id-length */

import querystring from 'querystring';
import pkg from '../../package.json';

let instance;
const baseUrl = 'https://ssl.google-analytics.com/collect';

const baseParams = ({ tid, cid }) => ({
  // Check out the measurement protocol parameter reference for details.
  // https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters
  v: 1,
  tid, // Tracking ID
  cid, // Anonymous identifier
  aip: 1, // Anonymize IP,
  an: pkg.name,
  av: pkg.version,
  ua: window.navigator.userAgent,
  z: Date.now(),
});

function request(url, body) {
  const xhr = new window.XMLHttpRequest();
  xhr.open('POST', url);
  xhr.send(querystring.stringify(body));
}

const send = (requiredParams, params) => {
  request(baseUrl, {
    ...params,
    ...baseParams(requiredParams),
  });
};

class Insight {
  constructor(trackingCode, clientId) {
    this.tid = trackingCode;
    this.cid = clientId;
  }

  track({ category, action, label, value }) {
    const params = {
      t: 'event',
      ec: category,
      ea: action,
    };

    if (label) params.el = label;
    if (value) params.ev = value;

    return send(
      {
        tid: this.tid,
        cid: this.cid,
      },
      params,
    );
  }
}

export default (trackingCode, clientId, doTrack) => {
  if (!doTrack || instance) return;

  instance = new Insight(trackingCode, clientId);

  chrome.runtime.onMessage.addListener(({ type, payload }) => {
    if (type !== 'track') return;

    instance.track(payload);
  });
};
