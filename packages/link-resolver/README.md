# link-resolver

This is the :heart: of the Octo-Linker. It's responsible for replacing the static import statements provided by the [helper-blob-reader](../helper-blob-reader) with a clickable link.

# How it works

The package [helper-blob-reader](../helper-blob-reader) give us a blob in a nice JSON format. First we have to verify if the given blob type is supported or not. If supported, for every single line the `grammar` function will be called along with a string representation of the current line. Now it's up to the grammar author how to identify the import statement and getting the value out of it. I recommend using RegExp, but for simplicity the only agreement is the return value of this function. The return value must be an object, where the position of the import value is the key and the value is the value of the import statement. God it? No worries her is a simple example. Imagine the following line is given `'import "foo"'` the return value would be `{ 8: 'foo' }`. Note: The import value is without the surrounding quote marks. Finally we pass the result to [helper-wrap-element](../helper-wrap-element) to make a link out of it.
