<!--

Usage : 
    <z-checkbox :label="your-label" :val="your-value"/>
    
    Props : 
        label : String
        val : Object
        disabled : Boolean
    
    v-model : 
        * In case of single checkbox, Initialize v-model value with boolean which determines whether the box is checked or not.
        * In case of multiple checkboxes (use same v-model for all components), Initialize v-model with array []. 
    
    Events : 
        @input : 
            * Returns Boolean, state of the checkbox.(Applicable only for single or individual checkbox)
            * Returns Array of Objects, filled with values of selected checkbox. (Applicable only for grouped checkboxes)

-->

<template>
    <div class="checkbox">
        <label :class="{'disabled' :  disabled}">
            <input type="checkbox" :disabled="disabled" :value="val" v-model="model" @change="onChange">
            <span class="custom-checkbox">
                <i class="icon-check"></i>
            </span>
            {{label}}
        </label>
    </div>
</template>

<script>
export default {
    name: 'ZCheckBoxComponent',
    props : {
        label : {
            type : String,
            required : true
        },
        value : {
            type : Object | Array,
        },
        val : {
            type : Object | String,
            required : true
        },
        disabled : {
            type : Boolean,
            default : false
        }
    },
    data(){
        return{
            checked : false
        }
    },
    computed : {
        model : {
            get(){
                return this.value
            },
            set(val){
                this.checked = val
            }
        }
    },
    methods : {
        onChange(){
            this.$emit('input', this.checked)
        }
    }    
}
</script>


<style lang="scss">

</style>
