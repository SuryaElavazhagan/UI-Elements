<template>
    <div class="radio">
        <label :class="{'disabled' :  disabled}">
            <input type="radio" :disabled="disabled">
            <span class="custom-radio"></span>
            {{ label }}
        </label>
    </div>
</template>

<script>
export default {
    name : 'ZRadioButton',
    props : {
        label : String,
        value : String | Array | Object,
        disabled : {
            type : Boolean,
            default : false
        }
    }
}
</script>


<style lang="scss">

@import "../../style/checkbox";

</style>
