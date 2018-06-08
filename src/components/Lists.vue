<template>
    <div class="list">
      <span
          class="options"
          :class="{ 'option-hover' : index == optionTracker}"
          @mouseover="$emit('update:optionTracker', index)"
          @click="$emit('optionSelcted')">
          {{ option }}
      </span>
    </div>
</template>

<script>
export default {
    name : 'List',
    props : {
        options : Array,
        optionTracker : Number
    }
}
</script>

<style lang="scss">

@import "../style/partials/_variables";
@import "../style/selectbox";


</style>


