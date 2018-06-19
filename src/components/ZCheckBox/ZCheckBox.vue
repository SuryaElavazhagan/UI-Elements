<template>
    <div class="checkbox">
        <label :class="{'disabled' :  disabled}">
            <input type="checkbox" :checked="checked" :value="value">
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
            required : true
        },
        checked : {
            type : Boolean
        },
        disabled : {
            type : Boolean,
            default : false
        }
    }
}
</script>


<style lang="scss">

</style>
