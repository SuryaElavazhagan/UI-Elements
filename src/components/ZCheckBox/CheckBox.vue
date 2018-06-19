<template>
  <div class="checkbox">
    <label :class="{'disabled' :  disabled}">
      <input type="checkbox" :disabled="disabled" v-bind:checked="checked" @change="onChange" >
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
        value : Object | String
    },
    model : {
        prop : 'checked',
        event : 'change'
    },
    methods: {
        onChange(event){
            let status = event.target.checked
            this.$emit('change' ,  status, this.value)
            this.$nextTick(function(){
               if(this.$parent.$options._componentTag === "z-check-box-group"){
                    this.$parent.onValueUpdate(status , this.value)
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>

@import "../../style/checkbox";

</style>

