import assert from 'assert';
import sinon from 'sinon';
import $ from 'jquery';
import clickHandler, { registerHandler } from '../lib/click-hanlder';

describe.skip('helper-click-handler', () => {
  const sandbox = sinon.sandbox.create();
  const fooHandler = sandbox.stub();
  const barHandler = sandbox.stub();
  const $link = $('<div class="octo-linker-link" data-type="foo" data-bar="baz"></div>');

  beforeEach(() => {
    $('body').html($link);
    clickHandler();
  });

  afterEach(() => {
    sandbox.reset();
    $('body').off().empty();
  });

  after(() => {
    sandbox.restore();
  });

  it('calls the corresponding handler', function () {
    registerHandler('foo', fooHandler);
    registerHandler('bar', barHandler);
    $link.click();

    assert.equal(fooHandler.callCount, 1);
    assert.equal(barHandler.callCount, 0);
  });

  it('calls the corresponding handler with data-attr of the target', function () {
    registerHandler('foo', fooHandler);
    $link.click();

    assert.deepEqual(fooHandler.args[0][0], {
      type: 'foo',
      bar: 'baz',
    });
  });

  it('does not attach more than one global click handler', function () {
    clickHandler();
    registerHandler('foo', fooHandler);
    $link.click();

    assert.equal(fooHandler.callCount, 1);
  });
});
