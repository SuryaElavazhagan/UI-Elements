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
    <div class="selectbox"
        :class="{ 'disabled' :  disabled }"
        v-clickOutside="clickedOutside">
        <div class="root"
            @click="onClick"
            @keypress="onKeyPress">
            <div class="container">
                <div v-if="((multiple && !tempCollapseTag) || allowCreate) && selectedOptionsCount > 0" class="tag-section">
                <z-tag 
                        v-for="(selectedOption, index) in selectedOptions"
                        :key="index"
                        :message="selectedOption"
                        :expand-or-shrink="expandOrShrink"
                        :needtodelete="isGoingToDelete && (index == selectedOptionsCount - 1)"
                        @remove="onRemoveTag"
                        @click.native.stop="handleExpandOrShrink"/>
                </div>
                <div v-if="multiple && tempCollapseTag && selectedOptionsCount > 0" class="tag-section">
                    <z-tag 
                            v-if="selectedOptionsCount > 0" 
                            :message="selectedOptions[0]"
                            @remove="onRemoveTag"/>
                    <z-tag 
                        v-if="selectedOptionsCount > 1"
                        :message="`+ ${selectedOptionsCount - 1}`"
                        @click.native.stop="handleExpandOrShrink"
                        noclose expand-or-shrink/>
                </div>
                <div class="input-section">
                <input 
                    v-if="!(selectedOptionsCount > 0) && !allowCreate"
                    class="input-box"
                    :placeholder="currentPlaceholder"
                    :value="cachedValue"
                    :class="{ 'disabled' :  disabled}"
                    :autofocus="autofocus"
                    ref="selectBox"
                    :tabindex="tabIndex"/>
                <input 
                    v-if="allowCreate"
                    class="input-box"
                    :placeholder="currentPlaceholder"
                    v-model="createdTag"
                    :class="{ 'disabled' :  disabled}"
                    :autofocus="autofocus"
                    ref="selectBox"
                    :tabindex="tabIndex"/>
                </div>
            </div>
            <div class="icon">
                <img src="./select_down.png">
            </div>
        </div>
        <div v-if="isOpen && !disabled" class="list">
            <z-options v-if="allowCreate && createdTag.length > 0" :value="createdTag" :label="createdTag"/>
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
            backspaceCount : 0,
            cachedValue : '',
            selectedOptionsCache : []
        }
    },
    watch : {
        selectedOptions : function(newOptions){
            if(newOptions.length <= 0)
            {
                this.tempCollapseTag = this.collapsetags
            }
        },
        createdTag : function(newValue , oldValue){
            if(newValue.length !== 0)
                this.hoverIndex = 0
            this.isOpen = true
            this.options.forEach(option => {
                if((option.label.toLowerCase().indexOf(newValue.toLowerCase()) < 0) && !(option.label === oldValue))
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
                            this.onOptionSelected(this.options[this.hoverIndex])
                        }else if(this.allowCreate && this.createdTag.length > 0){
                            this.onOptionSelected(this.options[this.options.length - 1])
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
                                this.selectedOptionsCache.pop()
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
            if(this.selectedOptionsCount == 0)
                this.$refs.selectBox.focus()
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
        onOptionSelected(option){
            let index = this.selectedOptions.indexOf(option.label)

            // Emits value for v-model
            if((this.multiple || this.allowCreate) && index < 0)
            {
                this.selectedOptions.push(option.label)
                this.selectedOptionsCache.push(option.value)
                this.$emit('change', this.selectedOptionsCache)

            }
            if(!this.multiple && !this.tempCollapseTag && !this.allowCreate)
            {
                this.cachedValue = option.label
                this.$emit('change', option.label)
                this.isOpen = false
            }
            if(index >= 0 && (this.allowCreate || this.multiple))
            {
                this.selectedOptions.splice(index, 1)
                this.selectedOptionsCache.splice(index , 1)
            }
            this.hoverIndex = -1
        },
        onRemoveTag(value){
            let index;
            if(this.multiple && !this.tempCollapseTag)
                index = this.selectedOptions.indexOf(value)
            else if(this.multiple && this.tempCollapseTag)
                index = 0
            this.selectedOptions.splice(index, 1)
            this.selectedOptionsCache.splice(index , 1)
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
@import "../style/combobox";

.selectbox{
    display: inline-block;
}

</style>
