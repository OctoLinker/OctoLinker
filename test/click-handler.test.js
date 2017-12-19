import assert from 'assert';
import sinon from 'sinon';
import $ from 'jquery';
import clickHandler from '../lib/click-handler';

describe('click-handler', () => {
  const sandbox = sinon.sandbox.create();
  const $link = $(
    '<div class="octolinker-link" data-plugin-name="foo" data-bar="baz"></div>',
  );
  let fakePluginManager;
  let resolveFake;

  sandbox.stub(window.chrome.runtime, 'sendMessage');
  window.console.error = () => {}; // Suppress fake onClick errors

  beforeEach(() => {
    resolveFake = sandbox.stub().returns('abc');
    fakePluginManager = {
      getResolver: sandbox.stub().returns(resolveFake),
    };

    $('body').append($link);
    clickHandler(fakePluginManager);
  });

  afterEach(() => {
    sandbox.reset();
    $('body').off();
    $link.remove();
  });

  afterAll(() => {
    sandbox.restore();
  });

  it('does not attach more than one global click handler', () => {
    clickHandler(fakePluginManager);
    clickHandler(fakePluginManager);
    $link.click();

    assert.equal(fakePluginManager.getResolver.callCount, 1);
  });

  describe('on click', () => {
    it('calls the corresponding resolver', () => {
      $link.click();

      assert.equal(fakePluginManager.getResolver.callCount, 1);
      assert.equal(fakePluginManager.getResolver.args[0][0], 'foo');
    });

    it('calls the corresponding handler with data-attr of the target', () => {
      $link.click();

      assert.deepEqual(resolveFake.args[0][0], {
        pluginName: 'foo',
        bar: 'baz',
      });
    });
  });

  describe('on mouseup', () => {
    it('does not call the corresponding resolver when mouseup was not triggered by a middle mouse click', () => {
      // eslint-disable-next-line
      $link.trigger($.Event('mouseup', {
          which: 1,
        }),
      );
      assert.equal(fakePluginManager.getResolver.callCount, 0);
    });

    it('calls the corresponding handler on middle mouse click', () => {
      // eslint-disable-next-line
      $link.trigger($.Event('mouseup', {
          which: 2,
        }),
      );

      assert.equal(fakePluginManager.getResolver.callCount, 1);
    });
  });

  describe('request', () => {
    it('sends a runtime message from type fetch', () => {
      resolveFake.returns('{BASE_URL}/foo');
      $link.click();
    });

    describe('when resolver returns a url', () => {
      it('passes object along the runtime message', () => {
        resolveFake.returns('{BASE_URL}/foo');
        $link.click();
      });
    });

    describe('when resolver returns an array of url', () => {
      it('passes object along the runtime message', () => {
        resolveFake.returns(['{BASE_URL}/foo', '{BASE_URL}/bar']);
        $link.click();
      });
    });

    describe('when resolver returns an url object', () => {
      it('passes url object along the runtime message', () => {
        resolveFake.returns({
          method: 'GET',
          url: '{BASE_URL}/foo',
        });
        $link.click();
      });
    });

    describe('when url start with "https://github.com"', () => {
      it('does not call the ping route for github.com', () => {
        resolveFake.returns(['https://github.com/foo']);
        $link.click();
      });
    });

    describe('when url does not start with "https://github.com"', () => {
      it('calls the ping route with the given given url', () => {
        resolveFake.returns(['https://hubhub.com/foo']);
        $link.click();
      });
    });

    describe('when urls contains external and github.com urls', () => {
      it('calls the ping route only for the external urls', () => {
        resolveFake.returns(['https://hubhub.com/foo', '{BASE_URL}/bar']);
        $link.click();
      });
    });

    it('sends a runtime message from type track', () => {
      resolveFake.returns('{BASE_URL}/foo');
      $link.click();

      assert.equal(window.chrome.runtime.sendMessage.args[0][0].type, 'track');
    });

    it('tracks the resolver identity', () => {
      resolveFake.returns('{BASE_URL}/foo');
      $link.click();

      assert.deepEqual(window.chrome.runtime.sendMessage.args[0][0].payload, {
        category: 'resolver',
        action: 'invoke',
        label: 'foo',
      });
    });
  });
});
