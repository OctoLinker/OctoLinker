# Developer Guide

This document will layout the OctoLinker architecture, so you have a better understanding of how the extension works.

# Overview

Every single file on GitHub.com is represented by a blob. Whenever the extension detects a blob it will pass it to the associated plugin. Every [plugin](/blob/master/lib/plugins) describes one feature.

A [blob](/blob/master/packages/blob-reader) consists of many attributes. One of these attributes is a reference to the blobs DOM node. The plugin will tweak this DOM node and turn static strings into clickable links. How does this work? There is an npm module for that. It's called [findandreplacedomtext](https://github.com/padolsey/findAndReplaceDOMText/) and it searches for regular expression matches in a given DOM node and wraps each match with a link node.

By convention, this link must have at least the data attribute `data-resolver`. This attribute defines which resolver will be called when a user clicks a link. A [resolver](/blob/master/lib/resolver) is basicly just a function which returns an array of possible urls/locations for this resource. Depending on the defined resolver the link must have additional attributes. For example the `relative-file` resolver requires a `data-target` attribute which is the actual value for this link e.g. `./lib/core.js`.

As mentioned, if a user clicks on a link, the associated resolver will be called and returns an array of urls. For every url a HTTP HEAD request is made (to determine if the resource is available or not) until one was successful. Finally, a redirect will be invoked. That’s it.

The outline above is an extremely simplified version. In real life you have to deal with a lot of edge cases. If you are interested in some of these edge cases check out the `npm-manifest` plugin and the `javascriptUniversal` resolver.
