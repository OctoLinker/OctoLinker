function createStore(json, payload) {
  const store = global.__ocotlinker_cache || {};

  payload.forEach(({ registry, target }, index) => {
    store[registry] = store[registry] || {};
    store[registry][target] = json[index];
  });

  global.__ocotlinker_cache = store;
}

async function runLiveQuery(matches) {
  if (!matches.length) {
    return [];
  }

  const payload = [].concat(...matches.map(match => match.urls));

  const response = await fetch('https://githublinker.herokuapp.com/bulk', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });
  const json = await response.json();

  createStore(json, payload);
}

function matchContainsOnlyRegistyMatches(match) {
  return match.urls.every(url => url.type === 'registry');
}

function filterLiveResolver(matches) {
  return matches.reduce((memo, match) => {
    if (matchContainsOnlyRegistyMatches(match)) {
      memo.push(match);
    }

    return memo;
  }, []);
}

export default function(matches) {
  const registryMatch = filterLiveResolver(matches);
  runLiveQuery(registryMatch);
}
