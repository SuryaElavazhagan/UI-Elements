export default {
  methods: {
    dispatch(_componentTag, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options._componentTag;

      while (parent && (!name || name !== _componentTag)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options._componentTag;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    }
  }
};
