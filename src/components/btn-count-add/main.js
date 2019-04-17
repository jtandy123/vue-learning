import {btnCountAdd} from './btn-count-add.js';


var vm = new Vue({
  el: '#app',
  components: {
    'btn-count-add': btnCountAdd
  }
});