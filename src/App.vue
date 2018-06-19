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
    </z-select>
    
    <h1>Create own tag</h1>
    
    <z-select placeholder="Create own tag here" v-model="createTagSelectBox" allow-create>
      <z-options v-for="(option , index) in optionCreate"
                :key="index"
                :label="option.label"
                :value="option.value"/>
    </z-select>
  <h1>Basic checkbox</h1>
  <z-check-box label="Hello Vue!" :value="options[0]" v-model="checkbox"/>

  <h1>Disabled Checkbox</h1>
  <z-check-box label="Hello Vue!" disabled :value="options[1]"/>

  <h1>Grouped Checkbox</h1>
  <z-check-box-group>
    <z-check-box label="Hello World" :value="options[0]"/>
    <z-check-box label="Hello World" :value="options[1]"/>
  </z-check-box-group>

  <z-radio-button label="Option 1"/>-->

  <z-checkbox-component label="Surya" :value="options[0]" v-model="checkbox"/>
  <z-checkbox-component label="Vaibhav" :value="options[1]" v-model="checkbox"/>
  <z-checkbox-component label="Sidharth" :value="options[2]" v-model="checkbox"/>
  <z-checkbox-component label="Sunil" :value="options[3]" v-model="checkbox"/>
  </div>
</template>

<script>

import ZSelect from './components/ZDropDown/ZSelect.vue'
import ZOptions from './components/ZDropDown/ZOptions.vue'
import ZTag from './components/ZDropDown/ZTag.vue'

import ZCheckBox from './components/ZCheckBox/CheckBox.vue'
import ZCheckBoxGroup from './components/ZCheckBox/ZCheckBoxGroup.vue'

import ZCheckboxComponent from './components/ZCheckBox/ZCheckBox.vue'

import ZRadioButton from './components/ZRadioButton/ZRadio.vue'

export default {
  name: 'app',
  components: {
    ZSelect,
    ZOptions,
    ZTag,
    ZCheckBox,
    ZCheckBoxGroup,
    ZRadioButton,
    ZCheckboxComponent
  },
  data(){
    return {
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

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
