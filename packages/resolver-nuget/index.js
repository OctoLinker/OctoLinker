import resolverTrustedUrl from '@octolinker/resolver-trusted-url';

export default function ({ target }) {
  return resolverTrustedUrl({
    target: `https://www.nuget.org/packages/${target}`,
  });
}
