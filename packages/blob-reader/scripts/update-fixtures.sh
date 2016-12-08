#!/usr/bin/env bash
set -e

curl https://github.com/OctoLinker/testrepo/blob/89f13651df126efdb4f1e3ae40183c9fdccdb4d3/sourcereader/popular-rabbit-names.js > packages/blob-reader/fixtures/github.com/blob/89f13651df126efdb4f1e3ae40183c9fdccdb4d3.html
curl https://github.com/OctoLinker/testrepo/commit/b0775a93ea27ee381858ddd9fa2bb953d5b74acb?diff=unified > packages/blob-reader/fixtures/github.com/commit/b0775a93ea27ee381858ddd9fa2bb953d5b74acb_unified.html
curl https://github.com/OctoLinker/testrepo/commit/b0775a93ea27ee381858ddd9fa2bb953d5b74acb?diff=split > packages/blob-reader/fixtures/github.com/commit/b0775a93ea27ee381858ddd9fa2bb953d5b74acb_split.html
curl https://gist.github.com/josephfrazier/113827963013e98c6196db51cd889c39 > packages/blob-reader/fixtures/github.com/gist/113827963013e98c6196db51cd889c39.html
curl https://github.com/OctoLinker/testrepo/pull/1 > packages/blob-reader/fixtures/github.com/pull/comments.html
curl https://github.com/OctoLinker/testrepo/pull/1/files > packages/blob-reader/fixtures/github.com/pull/diff.html
curl https://github.com/OctoLinker/testrepo/issues/2 > packages/blob-reader/fixtures/github.com/issue/code.html
