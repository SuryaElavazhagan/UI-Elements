<template>
    <div class="wrapper">
        <span class="tag">
            <p class="message" :class="{'underline' : noclose}">{{ message }}</p>
            <img v-if="!noclose" class="clear-tag" src="../assets/close_circle.png" @click.stop="$emit('remove', message)"/>
        </span>
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

.underline{
    &:hover{
        text-decoration: underline;
    }
}
</style>