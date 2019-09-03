/**
 * 数据劫持
 */

function observer(value) {
  if (typeof value !== 'object') {
    return;
  }

  var ob = new Observer(value);
}

function Observer(data) {
  this.data = data;
  this.walk();
}

Observer.prototype = {
  walk() {
    var keys = Object.keys(this.data);
    keys.forEach(key => this.defineReactive(key, this.data[key]));
  },

  defineReactive(key, value) {
    var dep = new Dep();
    Object.defineProperty(this.data, key, {
      enumerable: true,
      configurable: true,
      set(newValue) {
        if (value === newValue) {
          return;
        }

        value = newValue;
        dep.notify();
      },
      get() {
        dep.depend();
        return value;
      }
    });
  }
};