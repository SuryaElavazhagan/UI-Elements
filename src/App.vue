<template>
  <div id="app">
    <h1>Basic Select</h1>
    
    <z-select placeholder="This is basic select" v-model="basicSelectionBox">
      <z-options v-for="(option , index) in options"
                :key="index"
                :label="option.label"
                :value="option.value"/>
    </z-select>

    <h1>Disabled options</h1>
    
    <z-select placeholder="Some options are disabled here" v-model="disabledOptionsBox">
      <z-options v-for="(option , index) in options"
                :key="index"
                :label="option.label"
                :value="option.value"
                :disabled="option.disabled"
                />
    </z-select>

    <h1>Disabled Selection box</h1>
    
    <z-select placeholder="Box is disabled" disabled>
      <z-options v-for="(option , index) in options"
                :key="index"
                :label="option.label"
                :value="option.value"
                />
    </z-select>

    <h1>Disabled Selection box with default option</h1>

    <z-select placeholder="Box is disabled" v-model="disabledBoxDefaultOption" disabled>
      <z-options v-for="(option , index) in options"
                :key="index"
                :label="option.label"
                :value="option.value"
                />
    </z-select>
  </div>
</template>

<script>

import ZSelect from './components/ZSelect.vue'
import ZOptions from './components/ZOptions.vue'

export default {
  name: 'app',
  components: {
    ZSelect,
    ZOptions
  },
  methods : {
    doSomething(){
      alert('Value Changed')
    }
  },
  data(){
    return {
      basicSelectionBox : '',
      disabledOptionsBox : '',
      disabledBoxDefaultOption : 'Default option',
      options : [{
          value: 'Option1',
          label: 'Option1',
          disabled : false
        }, {
          value: 'Option2',
          label: 'Option2',
          disabled : true
        }, {
          value: 'Option3',
          label: 'Option3',
          disbaled : false
        }, {
          value: 'Option4',
          label: 'Option4',
          disbaled : true
        }, {
          value: 'Option5',
          label: 'Option5',
          disbaled : false
        }]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
