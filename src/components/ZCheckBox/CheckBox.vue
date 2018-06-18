<template>
    <label class="root">
        <span role="checkbox" aria-checked="mixed" class="z-checkbox"></span>
        <input aria-hidden="true" type="checkbox" hidden v-model="checked"/>
        <span class="label">{{ label }}</span>
    </label>
</template>

<script>
export default {
    name : 'ZCheckBox',
    props : {
        label : String
    },
    data(){
        return{
            checked : false
        }
    }
}
</script>

<style lang="scss" scoped>

@import "../../style/checkbox";

</style>

