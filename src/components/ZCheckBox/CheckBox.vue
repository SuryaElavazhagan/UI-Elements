<!--
    Usage  : 
     <checkbox label="your-label" value="your-value">
    
    Props : 
        disabled : Boolean
    
    v-model :
        binds with boolean value i.e., whether the box is checked or not
    
    Events : @change
                    params : status : Boolean
                             value : Bounded value
        
-->
<template>
  <div class="checkbox">
    <label :class="{'disabled' :  disabled}">
      <input type="checkbox" :disabled="disabled" :checked="checked" :value="value" @change="onChange">
      <span class="custom-checkbox">
        <i class="icon-check"></i>
      </span>
      {{label}}
    </label>
  </div>
</template>

<script>
export default {
    name : 'ZCheckBox',
    props : {
        label : String,
        disabled : {
            type : Boolean,
            default : false
        },
        checked : Boolean,
        value : Object
    },
    model : {
        prop : 'checked',
        event : 'change'
    },
    methods : {
        onChange(event){
            let status = event.target.checked
            if(this.$parent.$options._componentTag === "z-check-box-group"){
                this.$parent.onValueUpdate(status , this.value)
            }else{
                this.$emit('change', status, this.value)
            }
        }
    }
}
</script>

<style lang="scss">

@import "../../style/checkbox";

</style>

