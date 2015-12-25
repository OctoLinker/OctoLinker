import assert from 'assert';
import sinon from 'sinon';
import $ from 'jquery';
import helperTryLoad from './index.js';

function successResponse() {
  const def = $.Deferred();
  def.resolve('SUCCESS_RESPONSE');
  return def.promise();
}

function errorResponse() {
  const def = $.Deferred();
  def.reject('ERROR_RESPONSE');
  return def.promise();
}

describe('helper-try-load', () => {
  const sandbox = sinon.sandbox.create();
  const ajaxStub = sandbox.stub($, 'ajax');

  beforeEach(() => {
    sandbox.reset();
  });

  after(() => {
    sandbox.restore();
  });

  it('calls the callback with an error when any request fails', () => {
    const handlerStub = sandbox.stub();

    ajaxStub.onCall(0).returns(errorResponse());
    ajaxStub.onCall(1).returns(errorResponse());

    helperTryLoad([
      'https://foo.com/404',
      'https://bar.com/404',
    ], handlerStub);

    assert.equal(handlerStub.callCount, 1);
    assert.equal(handlerStub.args[0][0] instanceof Error, true);
    assert.equal(handlerStub.args[0][0].message, 'Could not load any url');
  });

  it('calls the callback with the url of the first completed request', () => {
    const handlerStub = sandbox.stub();

    ajaxStub.onCall(0).returns(errorResponse());
    ajaxStub.onCall(1).returns(successResponse());
    ajaxStub.onCall(2).returns(successResponse());

    helperTryLoad([
      'https://foo.com/404',
      'https://bar.com/200',
      'https://baz.com/200',
    ], handlerStub);

    assert.equal(handlerStub.callCount, 1);
    assert.equal(handlerStub.args[0][1], 'https://bar.com/200');
  });
});
