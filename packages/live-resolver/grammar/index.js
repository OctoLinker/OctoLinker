import grammarList from './list';

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
