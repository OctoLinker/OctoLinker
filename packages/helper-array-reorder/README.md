# @octolinker/helper-array-reorder 

This array helper sorts an array by passing another array which define the new order by the array index of the items you want to sort and retains all unmatched array indexes.


```js
// Push Fri the to beginning, because the sort array starts with the array index of 4 which is Fri
sortResolveUrls(['Mo', 'Tue', 'Wed', 'Thu', 'Fri'], [4]); // ['Fri', 'Mo', 'Tue', 'Wed', 'Thu']

// Push Fri the to beginning followed by Tue
sortResolveUrls(['Mo', 'Tue', 'Wed', 'Thu', 'Fri'], [4, 1]); // ['Fri', 'Tue', 'Mo', 'Wed', 'Thu']

// Let's revers all weekdays 
sortResolveUrls(['Mo', 'Tue', 'Wed', 'Thu', 'Fri'], [4, 3, 2, 1, 0]); // ['Fri', 'Thu', 'Wed', 'Tue', 'Mo']
```