<template>
    
    <div>
        <input class="selectbox" placeholder="Select" @keypress="$event.preventDefault()"/>

        <list v-if="isOpen"
            :options="options"
            :option-tracker="optionTracker"
            v-on:update:optionTracker="optionTracker = $event"/>
    </div>
    
</template>

<script>

import List from './Lists.vue'

export default {
    name : 'SelectionBox',
    props : {
        options : Array
    },
    data() {
        return {
            isOpen : false,
            optionTracker : -1
        }
    },
    components : {
        List
    }    
}
</script>


<style lang="scss">

@import "../style/partials/_variables";
@import "../style/selectbox";

</style>
