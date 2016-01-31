import $ from 'jquery';

function loader(urls, cb) {
  const url = urls.shift();

  $.ajax({
    type: 'HEAD',
    url,
  }).then(function () {
    cb(null, url);
  }).fail(function () {
    if (urls.length === 0) {
      return cb(new Error('Could not load any url'));
    }

    loader(urls, cb);
  });
}

export {
  loader as default,
};
