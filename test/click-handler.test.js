import assert from 'assert';
import sinon from 'sinon';
import $ from 'jquery';
import clickHandler from '../lib/click-handler';

describe('click-handler', () => {
  const sandbox = sinon.sandbox.create();
  const $link = $('<div class="octo-linker-link" data-resolver="foo" data-bar="baz"></div>');
  let resolvers;

  sandbox.stub(window.chrome.runtime, 'sendMessage');

  beforeEach(() => {
    resolvers = {
      foo: sandbox.stub(),
      bar: sandbox.stub(),
    };

    $('body').append($link);
    clickHandler(resolvers);
  });

  afterEach(() => {
    sandbox.reset();
    $('body').off();
    $link.remove();
  });

  after(() => {
    sandbox.restore();
  });

  it('does not attach more than one global click handler', () => {
    clickHandler(resolvers);
    clickHandler(resolvers);
    $link.click();

    assert.equal(resolvers.foo.callCount, 1);
  });

  describe('on click', () => {
    it('calls the corresponding resolver', () => {
      $link.click();

      assert.equal(resolvers.foo.callCount, 1);
      assert.equal(resolvers.bar.callCount, 0);
    });

    it('calls the corresponding handler with data-attr of the target', () => {
      $link.click();

      assert.deepEqual(resolvers.foo.args[0][0], {
        resolver: 'foo',
        bar: 'baz',
      });
    });
  });

  describe('request', () => {
    it('sends a runtime message with urls to load', () => {
      resolvers.foo.returns('https://github.com/foo');
      $link.click();

      assert.equal(window.chrome.runtime.sendMessage.callCount, 1);
    });

    describe('when resolver returns a url', () => {
      it('passes object along the runtime message', () => {
        resolvers.foo.returns('https://github.com/foo');
        $link.click();

        assert.deepEqual(window.chrome.runtime.sendMessage.args[0][0].urls, [
          { url: 'https://github.com/foo' },
        ]);
      });
    });

    describe('when resolver returns an array of url', () => {
      it('passes object along the runtime message', () => {
        resolvers.foo.returns([
          'https://github.com/foo',
          'https://github.com/bar',
        ]);
        $link.click();

        assert.deepEqual(window.chrome.runtime.sendMessage.args[0][0].urls, [
          { url: 'https://github.com/foo' },
          { url: 'https://github.com/bar' },
        ]);
      });
    });

    describe('when resolver returns an url object', () => {
      it('passes url object along the runtime message', () => {
        resolvers.foo.returns({
          method: 'GET',
          url: 'https://github.com/foo',
        });
        $link.click();

        assert.deepEqual(window.chrome.runtime.sendMessage.args[0][0].urls, [
          { method: 'GET', url: 'https://github.com/foo' },
        ]);
      });
    });

    describe('when url does not start with "https://github.com"', () => {
      it('calls the ping route with the given given url', () => {
        resolvers.foo.returns(['https://hubhub.com/foo']);
        $link.click();

        assert.deepEqual(window.chrome.runtime.sendMessage.args[0][0].urls, [
          { method: 'GET', url: 'https://githublinker.herokuapp.com/ping?url=https://hubhub.com/foo' },
        ]);
      });
    });

    describe('when urls contains external and github.com urls', () => {
      it('calls the ping route only for the external urls', () => {
        resolvers.foo.returns([
          'https://hubhub.com/foo',
          'https://github.com/bar',
        ]);
        $link.click();

        assert.deepEqual(window.chrome.runtime.sendMessage.args[0][0].urls, [
          { method: 'GET', url: 'https://githublinker.herokuapp.com/ping?url=https://hubhub.com/foo' },
          { url: 'https://github.com/bar' },
        ]);
      });
    });
  });
});
