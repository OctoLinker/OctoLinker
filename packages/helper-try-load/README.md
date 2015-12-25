# helper-try-load

This package performs a [HTTP HEAD request](https://ochronus.com/http-head-request-good-uses/) for each of the given urls and returns the url of the first completed request. If none of these are found, it returns an error.

```js
helperTryLoad([
  'https://lost.com/hello.html',
  'https://alive.com/hello.html'
], (err, url) => {
  console.log(url); // => https://alive.com/hello.html
});
```
