import {registerHandler} from '../../helper-click-handler';

export default class Base {

  constructor() {
    this.__grammarType = this.constructor.name;

    registerHandler(this.__grammarType, this.clickHandler.bind(this));
  }

  clickHandler(/* data: object */) {
    throw new Error(`Please override clickHandler() for grammar: ${this.__grammarType}`);
  }
}
