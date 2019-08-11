/**
 * 渲染DOM，解析指令
 * 模板解析，将浏览器无法解析的指令解析为浏览器可以解析的代码
 */

 function Compile (vm, el) {
   this.$vm = vm;
   el = this.$el = this.isElementNode(el) ? el : document.querySelector(el);

   if (!el) {
     return;
   }

   this._update(el);
 }

 Compile.prototype = {
  /**
   * Vue中使用vm._render先根据真实DOM创建了虚拟DOM，然后在vm._update把虚拟DOM转化为真实DOM并渲染,
   * 我们这里没有虚拟DOM，所以直接通过createElm方法创建一个fragment用以渲染
   */
  _update (el) {
    this.$fragment = document.createDocumentFragment();

    // 复制el的内容到创建的fragment
    this.createElm(el);
    
    // 解析被创建完成的fragment，此时fragment已经拥有了el内所有的元素
    this.compileElm();

    // 把解析之后的fragment放入el中，此时fragment中的所有指令已经被解析为具体数据
    el.appendChild(this.$fragment);
  },

  /**
   * 创建新的DOM，用来替换原DOM
   * @param {*} node 
   */
  createElm (node) {
    var childNode = node.firstChild;
    if (childNode) {
      this.$fragment.appendChild(childNode);
      this.createElm(node);
    }
  },

  /**
   * 对DOM进行解析，即对v-model和{{*}}等指令进行解析
   * @param {*} childNodes 
   */
  compileElm (childNodes) {
    var reg = /\{\{(.*)\}\}/;
    if (!childNodes) {
      childNodes = this.$fragment.childNodes;
    }

    [].slice.call(childNodes).forEach(node => {
      if (node.childNodes.length > 0) {
        // 迭代所有节点
        this.compileElm(node.childNodes);
      }

      // 获取elementNode节点
      if (this.isElementNode(node)) {
        if (reg.test(node.textContent)) {
          // 匹配{{*}}
          this.compileTextNode(node, RegExp.$1);
        }
        // 匹配elementNode
        this.compileElmNode(node);
      }
    });
  },

  /**
   * 解析elementNode，获取elm的所有属性然后遍历，检查属性是否属于已经注册的指令，
   * 如果不是自定义指令，那么就不需要去处理它了
   * 如果是已注册的指令，就交给directive去处理
   * @param {*} node 
   */
  compileElmNode (node) {
    var attrs = [].slice.call(node.attributes);

    attrs.forEach(attr => {
      if (!this.isDirective(attr.nodeName)) {
        return;
      }

      var exp = attr.value;
      // 匹配v-model指令
      directives.model(this.$vm, node, exp);
      // 去掉自定义指令
      node.removeAttribute(attr.name);
    });
  },

  /**
   * 解析{{*}}
   * @param {*} node 
   * @param {*} exp 
   */
  compileTextNode (node, exp) {
    directives.text(this.$vm, node, exp);
  },

  /**
   * 判断是否是已注册的指令，判断是否以v-开头
   * @param {*} attrNodeName 
   */
  isDirective (attrNodeName) {
    return attrNodeName.startsWith('v-');
  },

  /**
   * 判断是否为elmNode节点
   * @param {*} node 
   */
  isElementNode (node) {
    return node.nodeType === 1;
  }
 };