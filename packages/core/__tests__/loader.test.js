import loader from '../loader';

describe('loader', () => {
  const getMatches = (type, urls) => [
    {
      link: { href: '' },
      urls: [
        {
          type,
          urls,
          user: 'octolinker',
          repo: 'testrepo',
          branch: 'master',
          path: 'lib/index.js',
        },
      ],
    },
  ];

  it('call github api to resolve internal links', () => {
    loader(
      getMatches('internal-link', [
        'https://github.com/octolinker/testrepo/blob/master/lib/index.js',
      ]),
    );
  });
  it('call octolinker api to resolve external links', () => {});
  it('call github and octolinker api to resolve external and internal links', () => {});
});
