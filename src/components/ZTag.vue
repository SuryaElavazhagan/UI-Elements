<template>
    <div class="tag">
        <span class="message">{{ message }}</span>
        <img v-if="!noclose" class="clear-tag" src="../assets/close_circle.png" @click.stop="$emit('remove', message)"/>
    </div>
</template>

<script>
export default {
    name : 'ZTag', 
    props : {
        message : String | Number,
        noclose : {
            type : Boolean,
            default : false
        }
    }
}
</script>

<style lang="scss" scoped>

@import "../style/partials/_variables";
@import "../style/tags";

</style>