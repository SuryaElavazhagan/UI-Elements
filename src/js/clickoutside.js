const clickOutside = {
    bind: function (el, binding) {
      document.body.addEventListener('click', (event) => {
        // check that click was outside the el and his childrens
        if (!(el == event.target || el.contains(event.target))) {
          // and if it did, call handle method provided in attribute value
          //call the handler function
          binding.value()
        }
      })
    },
    unbind: function (el) {
      document.body.removeEventListener('click', el.event)
  
    }
  }
export {
  clickOutside
}