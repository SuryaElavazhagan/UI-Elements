<!--
    z-select ==> Component for select box

    Usage : 
        <z-select placeholder="your-placeholder-text" v-model="data-member" @change="do-something">
            <z-options v-for="option in options" :key="your-key" :label="option.label" :value="option.value"/>
        </z-select>

        Attributes : 
            placeholder : String
            autofocus : Boolean
            disabled : Boolean
            multiple : Boolean
            collapsetags : Boolean
            tabIndex : Number
-->
<template>
    <div class="root">
        <div
            class="container"
            @click="onClick"
            :class="{ 'disabled' :  disabled }"
            v-clickOutside="clickedOutside"
            @keypress="onKeyPress">
            <span v-if="((multiple && !tempCollapseTag) || allowCreate) && selectedOptionsCount > 0" class="tags">
                <z-tag 
                v-for="(selectedOption, index) in selectedOptions"
                :key="index"
                :message="selectedOption"
                :expand-or-shrink="expandOrShrink"
                :needtodelete="isGoingToDelete && (index == selectedOptionsCount - 1)"
                @remove="onRemoveTag"
                @click.native.stop="handleExpandOrShrink"/>
            </span>
            <span v-if="multiple && tempCollapseTag && selectedOptionsCount > 0" class="tags">
                <z-tag 
                    v-if="selectedOptionsCount > 0" 
                    :message="selectedOptions[0]"
                    @remove="selectedOptions.splice(0, 1)"/>
                <z-tag 
                    v-if="selectedOptionsCount > 1"
                    :message="`+ ${selectedOptionsCount - 1}`"
                    @click.native.stop="handleExpandOrShrink"
                    noclose expand-or-shrink/>
            </span>
            <input
                v-if="!(selectedOptionsCount > 0) && !allowCreate"
                class="selectbox"
                :placeholder="currentPlaceholder"
                :value="value"
                :class="{ 'disabled' :  disabled}"
                :autofocus="autofocus"
                ref="selectBox"
                :tabindex="tabIndex">
            <input
                v-if="allowCreate"
                class="selectbox"
                :placeholder="currentPlaceholder"
                v-model="createdTag"
                :class="{ 'disabled' :  disabled}"
                :autofocus="autofocus"
                ref="selectBox"
                :tabindex="tabIndex"/>
            <img class="icon" @click.stop="onClear" src='./select_down.png'/>
        </div>
        <div v-if="isOpen && !disabled" class="list">
            <z-options v-if="allowCreate && createdTag.length > 0" :value="createdTag"/>
            <slot></slot>
        </div>
    </div>
</template>

<script>

import {clickOutside} from '../js/clickoutside.js'
import ZTag from './ZTag.vue'
import ZOptions from './ZOptions.vue'

export default {
    name : 'ZSelect',
    props : {
        placeholder : String,
        value : Array | String,
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
        autofocus : {
            type : Boolean,
            default : false
        },
        multiple : {
            type : Boolean, 
            default : false
        },
        collapsetags : {
            type : Boolean,
            default : false
        },
        tabIndex : Number | String,
        allowCreate : {
            type : Boolean,
            default : false
        }
    },
    model : {
        prop : 'value',
        event : 'change'
    },
    created() {
        // To receive value from child component
        // Refer emitter.js
        this.$on('handleClick', this.onOptionSelected)
    },
    directives : {
        // Options list should be closed on clicking outside.
        clickOutside
    },
    provide() {
        // Provides 'this' to its child components
        return {
            'select' : this
        }
    },
    computed :{
        selectedOptionsCount(){
            return this.selectedOptions.length
        },
        currentPlaceholder(){
            if(this.multiple && this.selectedOptionsCount)
                return ""
            else
                return this.placeholder
        }
    },
    data() {
        return {
            isOpen : false,
            hoverIndex : -1,
            createdTag : '',
            iconSrc : ["./select_down.png", "../assets/close_circle.png"],
            tempCollapseTag : this.collapsetags,
            selectedOptions : [],
            options : [],
            expandOrShrink : false,
            isGoingToDelete : false,
            backspaceCount : 0
        }
    },
    watch : {
        selectedOptions : function(newOptions){
            if(newOptions.length <= 0)
            {
                this.tempCollapseTag = this.collapsetags
            }
        },
        createdTag : function(newValue){
            this.isOpen = true
            this.options.forEach(option => {
                if(option.value.toLowerCase().indexOf(newValue.toLowerCase()) < 0)
                {
                    option.isFiltered = false
                }else{
                    option.isFiltered = true
                }
            })
        }
    },
    methods : {
        onKeyPress : function(event){
            if(!this.allowCreate)
            {
                event.preventDefault()
            }
            switch(event.keyCode)
            {
                // For Enter key
                case 13 :if(this.hoverIndex >= 0 && this.isOpen && !(this.allowCreate && this.createdTag.length > 0))
                        {
                            this.onOptionSelected(this.options[this.hoverIndex].value)
                        }else if(this.allowCreate && this.createdTag.length > 0){
                            this.onOptionSelected(this.createdTag)
                            this.createdTag = ""
                        }
                        else{
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
                case 8: if(this.allowCreate && this.selectedOptionsCount > 0 && this.createdTag.length == 0){
                            if(this.backspaceCount == 0)
                            {
                                this.isGoingToDelete = true
                                this.backspaceCount++
                            }
                            else {
                                this.backspaceCount = 0
                                this.selectedOptions.pop()
                                this.isGoingToDelete = false
                            }
                        }
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
            if(this.selectedOptionsCount < 0)
            {
                this.$refs.selectBox.focus()
            }
            this.isOpen = !this.isOpen
            this.hoverIndex = -1
        },
        onClear(event){
            if(this.clearable)
            {   
                event.stopPropagation()
                this.$emit('change', "")
            }
            else
                this.isOpen = !this.isOpen
        },
        // Triggered on option selected
        onOptionSelected(value){
            let index = this.selectedOptions.indexOf(value)

            // Emits value for v-model
            if((this.multiple || this.allowCreate) && index < 0)
            {
                this.selectedOptions.push(value)
                this.$emit('change', this.selectedOptions)

            }else{
                this.$emit('change', value)
                this.isOpen = !this.isOpen
            }
            if(index >= 0 && this.allowCreate)
            {
                this.selectedOptions.splice(index, 1)
            }
            this.hoverIndex = -1
        },
        onRemoveTag(value){
            let index = this.selectedOptions.indexOf(value)
            this.selectedOptions.splice(index, 1)
        },
        handleExpandOrShrink(){
            if(this.collapsetags)
            {
                this.expandOrShrink = !this.expandOrShrink
                this.tempCollapseTag = !this.tempCollapseTag
            }
        },
        // Helps in navigating options through arrow keys
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
    },
    components : {
        ZTag,
        ZOptions
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
