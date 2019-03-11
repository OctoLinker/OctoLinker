export const bulkAction = async function(data) {
  if (!data.length) {
    return [];
  }

  const payload = data.map(({ type, registry, target }) => ({
    target,
    type: registry || type,
  }));

  try {
    const response = await fetch('https://octolinker.now.sh/api', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    return json.result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
