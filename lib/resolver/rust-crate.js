import liveResolverQuery from './live-resolver-query.js';

export default function ({ target }) {
  return liveResolverQuery({ type: 'crates', target });
}
