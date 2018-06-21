<!--
    Usage : 
        <z-radiobutton :label="your-label" :val="your-value"/>

        props : 
            label : String
            val : Object
            disabled : Boolean
        
        v-model : 
        * In case of single checkbox, Initialize v-model value with object. If the radio-box got selected v-model is filled with selected val
        * In case of multiple checkboxes (use same v-model for all components), Initialize v-model with array [].

        Events : 
            @input: 
                * Returns Object of selected Radio button 
-->
<template>
    <div class="radio">
        <label :class="{'disabled' :  disabled}">
            <input type="radio" :disabled="disabled" :value="val" v-model="model" @change="onChange">
            <span class="custom-radio"></span>
            {{ label }}
        </label>
    </div>
</template>

<script>
export default {
    name: 'ZRadio',
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
            selected : false
        }
    },
    computed : {
        model : {
            get(){
                return this.value
            },
            set(val){
                this.selected = val
            }
        }
    },
    methods : {
        onChange(){
            this.$emit('input', this.selected)
        }
    }    
}
</script>


<style lang="scss">

@import "../../style/checkbox";

</style>
