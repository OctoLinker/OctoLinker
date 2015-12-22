import grammarJavaScript from './javascript';

const grammarList = {
  javascript: grammarJavaScript,
};

function getGrammarByType(type) {
  const grammar = grammarList[type];

  if (grammar) {
    return grammar;
  }

  console.log('No grammar found for blob type %s', type);
}

export {
  getGrammarByType,
};
