function handleResponse(hoogleSearchUrl, target, response) {
  const checkExact = function (item) {
    return item.url.includes(`docs/${target.replace(/\./g, '-')}.html`);
  };

  if (response.length > 0) {
    // Multiple packages may provide the same module (see Crypto.MAC.HMAC)
    // We redirect to doc if there is only exact match
    // Otherwise, we redirect to hoogle search to avoid confucion
    const exactMatches = response.filter(checkExact);
    if (exactMatches.length === 1) {
      return exactMatches[0].url;
    }
    return hoogleSearchUrl;
  }
  return null;
}

export function hoogleSearch({ target }) {
  const query = `${encodeURIComponent(target)}%20is:module%20is:exact`;
  const hoogleSearchUrl = `https://hoogle.haskell.org/?hoogle=${query}`;

  return async function doHoogleSearch() {
    const response = await fetch(`${hoogleSearchUrl}&mode=json`);
    const json = await response.json();

    return handleResponse(hoogleSearchUrl, target, json);
  };
}
