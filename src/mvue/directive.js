/**
 * 指令集合
 * 所有支持的指令
 * v-model v-on v-show
 */

var directives = {
  /**
   * 分配指令
   * @param {*} vm 
   * @param {*} node 
   * @param {*} exp 
   * @param {*} dir 
   */
  dir(vm, node, exp, dir) {
    this['_' + dir](vm, node, exp);
  },

  // 通过_bind方法来初始化watcher
  _bind(vm, exp, patchFn) {
    new Watcher(vm, exp, patchFn);
  },

  /**
   * 链接patch方法，将指令转化为真实的数据并展示
   * @param {*} vm 
   * @param {*} node 
   * @param {*} exp 
   * @param {*} dir 指令名称
   */
  _link(vm, node, exp, dir) {
    var patchFn = patch(vm, node, exp, dir);
    patchFn && patchFn(node, vm._getVal(exp));

    this._bind(vm, exp, function (value) {
      patchFn && patchFn(node, value);
    });
  },

  /**
   * v-model事件处理，只针对<input type='text'>
   * @param {*} vm 
   * @param {*} node 
   * @param {*} exp 
   */
  _model(vm, node, exp) {
    this._link(vm, node, exp, 'model');

    var val = vm._getVal(exp);
    node.addEventListener('input', function (e) {
      var newVal = e.target.value;
      if (newVal === val) return;
      vm._setVal(exp, newVal);
      val = newVal;
    });
  },

  /**
   * {{}}事件处理
   * @param {*} vm 
   * @param {*} node 
   * @param {*} exp 
   */
  _text(vm, node, exp) {
    this._link(vm, node, exp, 'text');
  },

  /**
   * isShow
   * @param {*} vm 
   * @param {*} node 
   * @param {*} exp 
   */
  _show(vm, node, exp) {
    this._link(vm, node, exp, 'show');
  },

  /**
   * v-on:click
   * @param {*} vm 
   * @param {*} node 
   * @param {*} exp 
   */
  _click(vm, node, exp) {
    var fn = vm.$options.methods && vm.$options.methods[exp.replace('()', '')];

    if (fn) {
      node.addEventListener('click', fn.bind(vm), false);
    }
  }
};