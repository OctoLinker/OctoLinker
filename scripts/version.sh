#!/bin/bash

sed -E "s/MARKETING_VERSION = [0-9.]+/MARKETING_VERSION = $npm_package_version/" safari/Shared.xcconfig | tee safari/Shared.xcconfig
dot-json assets/manifest.json version $npm_package_version
dot-json packages/core/package.json version $npm_package_version

git add assets/manifest.json packages/core/package.json safari/Shared.xcconfig
