#!/bin/bash

echo "Please summarize this release in one sentence"

read note

dot-json assets/manifest.json version $npm_package_version
dot-json packages/core/package.json version $npm_package_version
dot-json packages/core/package.json releaseDescription $note
git add assets/manifest.json packages/core/package.json