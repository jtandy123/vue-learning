/**
 * 入口函数，在MVue的构造函数之中去进行视图渲染和数据监听的操作。
 */
function MVue(options) {
  var vm = this;
  this.$options = options;
  var data = this._data = options.data || {};

  // data代理，使得可以直接通过this.msg获取到this._data.msg的内容
  Object.keys(data).forEach(key => vm._proxyData(key));

  observer(data);

  new Compile(this, this.$options.el);
}

MVue.prototype = {
  _proxyData(key) {
    var vm = this;
    Object.defineProperty(vm, key, {
      configurable: true,
      enumerable: true,
      get() {
        return vm._data[key];
      },
      set(newVal) {
        vm._data[key] = newVal;
      }
    })
  },

  _getVal(exp) {
    return this._data[exp];
  },

  _setVal(exp, newVal) {
    this._data[exp] = newVal;
  }
}