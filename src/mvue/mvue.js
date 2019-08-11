/**
 * 入口函数，在MVue的构造函数之中去进行视图渲染和数据监听的操作。
 */
function MVue(options) {
  this.$options = options;
  this._data = options.data || {};
}

MVue.prototype = {
  _getVal(exp) {
    return this._data[exp];
  },

  _setVal(exp, newVal) {
    this._data[exp] = newVal;
  }
}