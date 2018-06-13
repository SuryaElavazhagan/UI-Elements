<template>
    <span v-if="isFiltered"
        class="options"
        :class="{'disabled' : disabled, 'hovered' : isHovered , 'selected' : this.select.value.indexOf(value) >= 0}"
        @click="onClick"
        @mouseover="hoverItem">
        {{ value }}
    </span>
</template>

<script>
import Emitter from '../js/emitter.js'

export default {
    name : 'ZOption',
    mixins : [Emitter],
    model :{
        prop : 'value',
        event : 'click'
    },
    props : {
        label : String,
        value : {
            type : String,
            required : true
        },
        disabled : {
            type : Boolean,
            default : false
        }
    },
    inject : ['select'],
    created() {
        this.select.options.push(this)
    },
    beforeDestroy(){
        this.select.options.splice(this.select.options.indexOf(this), 1)
    },
    computed : {
        isHovered(){
            let index = this.select.hoverIndex
            let options = this.select.options
            if(!this.disabled && options[index] == this)
                return true
            return false
        }
    },
    methods : {
        hoverItem() {
            if(!this.disabled)
                this.select.hoverIndex = this.select.options.indexOf(this)
        },
        onClick(){
            if(!this.disabled)
                this.dispatch('z-select' , 'handleClick' , this.value)
        }
    },
    data(){
        return{
            isFiltered : true
        }
    }
}
</script>

<style lang="scss">

@import "../style/partials/_variables";
@import "../style/selectbox";


.hovered{
    background-color: $option-hover-background;
}
</style>

