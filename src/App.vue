<template>
  <div id="app">
    <h1>Basic Select</h1>
    
    <z-select placeholder="This is basic select" v-model="basicSelectionBox" tab-index="0">
      <z-options v-for="(option , index) in options"
                :key="index"
                :label="option.label"
                :value="option.value"/>
    </z-select>

    <h1>Disabled options</h1>
    
    <z-select placeholder="Some options are disabled here" v-model="disabledOptionsBox" tab-index="1">
      <z-options v-for="(option , index) in options"
                :key="index"
                :label="option.label"
                :value="option.value"
                :disabled="option.disabled"
                />
    </z-select>

    <h1>Disabled Selection box</h1>
    
    <z-select placeholder="Box is disabled" disabled>
    </z-select>

    <h1>Disabled Selection box with default option</h1>

    <z-select placeholder="Box is disabled" v-model="disabledBoxDefaultOption" disabled>
      <z-options v-for="(option , index) in options"
                :key="index"
                :label="option.label"
                :value="option.value"
                />
    </z-select>

    <h1>Simple tag</h1>
    <z-tag message="Hello"/>

    <h1>Multiple Select</h1>
    
    <z-select placeholder="This is Multiple select" v-model="multiSelectionBox" multiple tab-index="2">
      <z-options v-for="(option , index) in options"
                :key="index"
                :label="option.label"
                :value="option.value"/>
    </z-select>

    <h1>Grouped Multiple Select</h1>
    
    <z-select placeholder="This is Grouped Multiple select" v-model="multiSelectGroupedBox" multiple collapsetags tab-index="3">
      <z-options v-for="(option , index) in options"
                :key="index"
                :label="option.label"
                :value="option.value"/>
    </z-select>
    
    <h1>Create own tag</h1>
    
    <z-select placeholder="Create own tag here" v-model="createTagSelectBox" allow-create>
      <z-options v-for="(option , index) in optionCreate"
                :key="index"
                :label="option.label"
                :value="option.value"/>
    </z-select>
    <!--<div class="combobox">
      <div v-if="!open" class="combotag">
        <z-tag message="Hello"/>
        <z-tag message="Hello"/>
      </div>
      <input v-if="open" class="comboinput">
      <div class="comboiconcontainer">
        <img class="comboicon" src="./components/select_down.png"/>
      </div>
    </div>-->
  </div>
</template>

<script>

import ZSelect from './components/ZSelect.vue'
import ZOptions from './components/ZOptions.vue'
import ZTag from './components/ZTag.vue'

export default {
  name: 'app',
  components: {
    ZSelect,
    ZOptions,
    ZTag
  },
  methods : {
    doSomething(){
      alert('Value Changed')
    }
  },
  data(){
    return {
      open : true,
      basicSelectionBox : '',
      disabledOptionsBox : '',
      disabledBoxDefaultOption : 'Default option',
      createTagSelectBox : [],
      multiSelectionBox : [],
      multiSelectGroupedBox : [],
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
        }],
        optionCreate: [{
          value: 'Princeton',
          label: 'Option1',
          disabled : false
        }, {
          value: 'Project',
          label: 'Option2',
          disabled : true
        }, {
          value: 'Oxford',
          label: 'Option3',
          disbaled : false
        }, {
          value: 'Duke',
          label: 'Option4',
          disbaled : true
        }, {
          value: 'Anna University',
          label: 'Option5',
          disbaled : false
        }]
    }
  }
}
</script>

<style lang="scss">

@import "./style/partials/_variables";
@import "./style/combobox";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
