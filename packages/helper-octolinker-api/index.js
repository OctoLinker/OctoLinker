function buildSearchParams(payload) {
  const getPayload = payload.reduce((memo, { target, type }) => {
    memo[type] = memo[type] || [];
    memo[type].push(target);
    return memo;
  }, {});

  const params = Object.entries(getPayload).map(([key, value]) => [
    key,
    value.join(','),
  ]);

  return new URLSearchParams(params);
}

export const bulkAction = async function (data) {
  if (!data.length) {
    return [];
  }

  const payload = data.map(({ type, registry, target }) => ({
    target,
    type: registry || type,
  }));

  const url = new URL('https://octolinker-api.now.sh/');
  const searchParams = buildSearchParams(payload);
  let method;
  let body;

  // A url length of approx 2000 character is the max length
  // that all browser supports according to https://stackoverflow.com/a/33733386/2121324
  if (searchParams.toString().length < 2000) {
    // Perform GET request which is cacheable by the browser
    method = 'GET';
    url.search = searchParams;
  } else {
    method = 'POST';
    body = JSON.stringify(payload);
  }

  try {
    const response = await fetch(url, {
      method,
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    return json.result;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return [];
  }
};
