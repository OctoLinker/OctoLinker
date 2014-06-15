/* global describe, it */

(function () {
    'use strict';

    describe('Give it some context', function () {
        describe('maybe a bit more context here', function () {
            it('should run here few assertions', function () {

                var regex = /.+require\('([\w./]+)+'\)./g;

                'var _ = require(\'abc\');'.replace(regex, '$1').should.equal('abc');
                'var _ = require(\'abc.js\');'.replace(regex, '$1').should.equal('abc.js');
                'var _ = require(\'./abc\');'.replace(regex, '$1').should.equal('./abc');
                'var _ = require(\'./abc/\');'.replace(regex, '$1').should.equal('./abc/');
                'var _ = require(\'./abc/def\');'.replace(regex, '$1').should.equal('./abc/def');
                'var _ = require(\'./abc/def/\');'.replace(regex, '$1').should.equal('./abc/def/');
                'var _ = require(\'./abc/def/gh.ij\');'.replace(regex, '$1').should.equal('./abc/def/gh.ij');
                'var _ = require(\'../\');'.replace(regex, '$1').should.equal('../');
                'var _ = require(\'..\');'.replace(regex, '$1').should.equal('..');

            });
        });
    });
})();
