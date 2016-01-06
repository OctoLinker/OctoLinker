import {registerHandler} from '../../helper-click-handler';

export default class Base {

  constructor() {
    this.__grammarType = this.constructor.name;

    registerHandler(this.__grammarType, this.clickHandler.bind(this));
  }

  clickHandler(/* data: object */) {
    throw new Error(`Please override clickHandler() for grammar: ${this.__grammarType}`);
  }

  regexList() {
    throw new Error(`Please override regexList() for grammar: ${this.__grammarType}`);
  }

  extractKeywords(line) {
    const ret = {};
    let match;

    function findKeywords(val) {
      const startIndex = line.indexOf(val, match.index) + 1;
      ret[startIndex] = val.replace(/['|"]/g, '');
    }

    this.regexList().forEach((regex) => {
      while (match = regex.exec(line)) { // eslint-disable-line no-cond-assign
        match.slice(1).map(findKeywords);
      }
    });

    return ret;
  }
}
