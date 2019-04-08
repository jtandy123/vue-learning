var btnCountAdd = {
  template: '<div><span>当前count的值：{{count}}</span><button @click="onCountAddClick">count++</button></div>',
  data() {
    return {
      count: 0
    }
  },
  methods: {
    onCountAddClick() {
      this.count += 1;
    }
  }
};

export {btnCountAdd}