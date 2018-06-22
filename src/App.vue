<template>
  <div id="app">
    <!--<h1>Basic Select</h1>
    
    <z-select placeholder="This is basic select" v-model="basicSelectionBox">
      <z-options v-for="(option , index) in options"
                :key="index"
                :label="option.label"
                :value="option.value"/>
    </z-select>

    <h1>Multiple Select</h1>
    
    <z-select placeholder="This is Multiple select" v-model="multiSelectionBox" multiple>
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

    <h1>Grouped Multiple Select</h1>
    
    <z-select placeholder="This is Grouped Multiple select" v-model="multiSelectGroupedBox" multiple collapsetags>
      <z-options v-for="(option , index) in options"
                :key="index"
                :label="option.label"
                :value="option.value"/>
    </z-select>-->
    
    <h1>Create own tag</h1>
    
    <z-select placeholder="Create own tag here" v-model="createTagSelectBox" allow-create @tagCreated="onTagCreated">
      <z-options v-for="(option , index) in optionCreate"
                :key="index"
                :label="option.label"
                :value="option.value"/>
    </z-select>
    <!--<h1>Hello world</h1>
  <h1>Single radio button</h1>
  <z-radio-button label="Option 1" :val="options[0]" disabled v-model="radio"/>

  <h1>Grouped radio button</h1>
  <z-radio-button label="Option 1" :val="options[0]" v-model="radiobutton"/>
  <z-radio-button label="Option 2" :val="options[1]" v-model="radiobutton"/>
  <z-radio-button label="Option 3" :val="options[2]" v-model="radiobutton"/>
  <z-radio-button label="Option 4" :val="options[3]" v-model="radiobutton"/>


  <h1>Single checkbox</h1>
  <z-checkbox-component label="Sunil" :val="options[3]" v-model="che"/>

  <h1>Grouped Checkbox</h1>
  <z-checkbox-component label="Surya" :val="options[0]" disabled v-model="checkbox"/>
  <z-checkbox-component label="Vaibhav" :val="options[1]" v-model="checkbox"/>
  <z-checkbox-component label="Sidharth" :val="options[2]" v-model="checkbox"/>
  <z-checkbox-component label="Sunil" :val="options[3]" v-model="checkbox"/>-->
  </div>
</template>

<script>

import ZSelect from './components/ZDropDown/ZSelect.vue'
import ZOptions from './components/ZDropDown/ZOptions.vue'
import ZTag from './components/ZDropDown/ZTag.vue'

import ZCheckboxComponent from './components/ZCheckBox/ZCheckBox.vue'

import ZRadioButton from './components/ZRadioButton/ZRadio.vue'

export default {
  name: 'app',
  components: {
    ZSelect,
    ZOptions,
    ZTag,
    ZRadioButton,
    ZCheckboxComponent
  },
  data(){
    return {
      radio : true,
      radiobutton : [],
      che : '',
      checkbox : [],
      disableddcheckbox : false,
      checkedNames : [],
      basicSelectionBox : '',
      disabledOptionsBox : '',
      disabledBoxDefaultOption : 'Default option',
      createTagSelectBox : [],
      multiSelectionBox : [],
      multiSelectGroupedBox : [],
      options : [{
          value: 'Option1 No',
          label: 'Option1',
          disabled : false
        }, {
          value: 'Option2 No',
          label: 'Option2',
          disabled : true
        }, {
          value: 'Option3 No',
          label: 'Option3',
          disbaled : false
        }, {
          value: 'Option4 aaaaaaaaaaaaaaaa',
          label: 'Option4',
          disbaled : true
        }, {
          value: 'Option5aaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          label: 'Option5',
          disbaled : false
        }],
        optionCreate: [{
          value: 'Princeton',
          label: 'Princeton',
          disabled : false
        }, {
          value: 'Project',
          label: 'Project',
          disabled : true
        }, {
          value: 'Oxford',
          label: 'Oxford',
          disbaled : false
        }, {
          value: 'Duke',
          label: 'Duke',
          disbaled : true
        }, {
          value: 'Anna University',
          label: 'Anna University',
          disbaled : false
        }]
    }
  },
  methods : {
    onTagCreated(){
      alert('Perform your AJAX call here!')
    }
  }
}
</script>

<style lang="scss">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
