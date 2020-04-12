export const parse = (headers) => {
  const rateLimitTotal = parseInt(headers.get('x-ratelimit-limit'), 10) || 0;
  const rateLimitRemaining =
    parseInt(headers.get('x-ratelimit-remaining'), 10) || 0;
  const rateLimitReset = (headers.get('x-ratelimit-reset') || 0) * 1000;

  return {
    rateLimitTotal,
    rateLimitRemaining,
    rateLimitReset,
  };
};
