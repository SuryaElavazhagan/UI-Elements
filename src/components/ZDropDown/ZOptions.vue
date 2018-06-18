<template>
    <div v-if="isFiltered"
        class="options"
        :class="{'disabled' : disabled, 'hovered' : isHovered , 'selected' : isSelected}"
        @click="onClick"
        @mouseover="hoverItem">
        {{ label }}
    </div>
</template>

<script>
import Emitter from '../../js/emitter.js'

export default {
    name : 'ZOption',
    mixins : [Emitter],
    model :{
        prop : 'value',
        event : 'click'
    },
    props : {
        label : String | Number,
        value : {
            type : String | Object,
            required : true
        },
        disabled : {
            type : Boolean,
            default : false
        }
    },
    inject : ['select'],
    created() {
        // Sending 'this' value to its parent z-select component
        this.select.options.push(this)
    },
    beforeDestroy(){
        // Removing 'this' value from parent onDestroy
        this.select.options.splice(this.select.options.indexOf(this), 1)
    },
    computed : {
        // Updates the hoverIndex of the parent
        isHovered(){
            let index = this.select.hoverIndex
            let options = this.select.options
            if(!this.disabled && options[index] == this)
                return true
            return false
        },
        // Highlights the option if selected by applying style
        isSelected(){
            if((this.select.value.indexOf(this.label) >= 0) || (this.select.selectedOptions.indexOf(this.label) >= 0))
                return true
            else
                false
        },
        isFiltered(){
            return this.select.filteredOptions.some(option => option === this)
        }
    },
    watch :{
        isFiltered : function(newValue, oldValue){
            if(oldValue && !newValue){
                this.select.options.splice(this.select.options.indexOf(this), 1)
            }
        }
    },
    methods : {
        // Handles 'onmouseover'
        hoverItem() {
            if(!this.disabled)
                this.select.hoverIndex = this.select.options.indexOf(this)
        },
        // Handles click
        onClick(){
            if(!this.disabled)
                this.dispatch('z-select' , 'handleClick' , this)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../style/partials/_variables";
@import "../../style/selectbox";


.hovered{
    background-color: $option-hover-background;
}
</style>

