<!--
    z-select ==> Component for select box

    Usage : 
        <z-select placeholder="your-placeholder-text" v-model="data-member" @change="do-something">
            <z-options v-for="option in options" :key="your-key" :label="option.label" :value="option.value"/>
        </z-select>

        Attributes : 
            placeholder : String
            focus : Boolean
            disabled : Boolean
-->
<template>
    <div class="root">
        <input class="selectbox"
        :class="{ 'disabled' :  disabled}"
        :placeholder="placeholder"
        :value="value"
        :disabled="disabled"
        :autofocus="focus"
        v-clickOutside="clickedOutside"
        @keypress="onKeyPress"
        @click="onClick">
        <div class="list">
            <slot v-if="isOpen && !disabled"></slot>
        </div>
    </div>
</template>

<script>

import {clickOutside} from '../js/clickoutside.js'

export default {
    name : 'ZSelect',
    props : {
        placeholder : String,
        value : String,
        filterable : {
            type : Boolean,
            default : false
        },
        clearable : {
            type : Boolean,
            default : false
        },
        disabled : {
            type : Boolean,
            default : false
        },
        focus : {
            type : Boolean,
            default : false
        }
    },
    model : {
        prop : 'value',
        event : 'change'
    },
    created() {
        this.$on('handleClick', this.onOptionSelected)
    },
    directives : {
        clickOutside
    },
    provide() {
        return {
            'select' : this
        }
    },
    computed :{
        options(){
            return this.$children
        }
    },
    data() {
        return {
            isOpen : false,
            hoverIndex : -1,
            j : 0
        }
    },
    methods : {
        onKeyPress : function(event){
            if(!this.filterable)
            {
                event.preventDefault()
            }
            switch(event.keyCode)
            {
                // For Enter key
                case 13 :if(this.hoverIndex >= 0 && this.isOpen)
                        {
                            this.onOptionSelected(this.options[this.hoverIndex].value)
                        }else{
                            this.isOpen = !this.isOpen
                        }
                        break;
                // For arrow down
                case 40 :if(this.isOpen) 
                            this.navigate('down')
                        else{
                            this.isOpen = !this.isOpen
                        }
                        break;
                // For arrow up
                case 38 : this.navigate('up')
                        break;
            }
        },
        clickedOutside(){
            // Done using Sai anna script
            // Need to find more options to do this.
            this.isOpen = false
            this.hoverIndex = -1
        },
        onClick(){
            /* 
                Hover index should be reset to -1
            */
            this.isOpen = !this.isOpen
            this.hoverIndex = -1
        },
        onOptionSelected(value){
            this.$emit('change', value)
            this.isOpen = !this.isOpen
        },
        lostInputFocus(){
            this.isOpen = !this.isOpen
        },
        navigate(direction)
        {
            let options = this.options
            let nextHoverIndex = (this.hoverIndex + 1) % options.length
            let prevHoverIndex = (this.hoverIndex < 0) ? (options.length - 1) : (this.hoverIndex - 1)
            // Prevents hovering disabled item, when using arrow keys
            // Simply it returns next index on pressing down arrows
            let getNextOption = function(){
                for(let i = nextHoverIndex; i < options.length; i = (i + 1) % options.length){
                    if(!options[i].disabled)                    
                        return i
                }
            }  

            // Need better optimized code for this function
            let getPrevOption = function(){
                for(let i = prevHoverIndex; i < options.length; i = (i - 1) % options.length){
                    if(i < 0)
                    {
                        i = options.length - 1
                    }
                    if(!options[i].disabled)                    
                        return i
                }
            }  
            // Checks whether all elements in the options are disabled
            let isOptionDisabled = function(option){
                return option.disabled
            }
            let isEveryOptionDisabled = options.every(isOptionDisabled)

            if(!isEveryOptionDisabled)
            {
                switch(direction)
                {
                    case 'down' : this.hoverIndex = getNextOption()
                                break;
                    case 'up' : this.hoverIndex = getPrevOption()
                }
            }
        }
    }
}
</script>

<style lang="scss">

@import "../style/partials/_variables";
@import "../style/selectbox";

.root{
    display: inline;
}
</style>
