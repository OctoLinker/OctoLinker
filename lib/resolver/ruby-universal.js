import rubyFile from './ruby-file.js';
import liveResolverQuery from './live-resolver-query.js';

export default function ({ path, target }) {
  const isPath = !!target.match(/\//);

  // https://github.com/github/pages-gem/blob/master/lib/github-pages/dependencies.rb

  if (isPath) {
    return rubyFile({ target, path });
  }

  return [
    liveResolverQuery({ type: 'rubygems', target }),
  ];
}
