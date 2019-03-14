export default async urls => {
  for (const { url, func, method = 'HEAD' } of urls) {
    try {
      if (func) {
        return {
          // eslint-disable-next-line
          url: await func(),
        };
      }

      // Normally, you wouldn't use `await` inside of a loop.
      // However, we explicity want to do this sequentially.
      // See http://eslint.org/docs/rules/no-await-in-loop
      // eslint-disable-next-line
      const res = await fetch(url, {
        method,
      });

      if (res.status < 300) {
        if (method === 'GET') {
          // eslint-disable-next-line
          const json = await res.json();
          return json;
        }

        return { url };
      }
    } catch (err) {
      // There's nothing to do here, so just keep going.
      // eslint-disable-line no-empty
    }
  }
};
