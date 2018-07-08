import _ from 'lodash'; // eslint-disable-line id-length

function sortByHighestScore(arr) {
  return _.chain(arr)
    .countBy()
    .entries()
    .sort((left, right) => left[1] > right[1])
    .map(([index]) => index)
    .value();
}

export default function(urls, orderBy) {
  const score = sortByHighestScore(orderBy);

  return urls.reduce((memo, item, index) => {
    if (score.includes(index.toString())) {
      memo.splice(0, 0, item);
    } else {
      memo.push(item);
    }

    return memo;
  }, []);
}
