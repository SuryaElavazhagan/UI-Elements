<template>
  <div class="hello">
    
    <input class="selectbox" placeholder="Select" v-model="userInput" @keypress="startedTyping" @click="isOpen = !isOpen">
    
    <list v-if="isOpen" 
    v-for="(option, index) in options"
    :key="index"  
    :options="filteredOptions" 
    :option-tracker="optionTracker"
    v-on:update:optionTracker="optionTracker = $event"
    v-on:optionSelected="onOptionSelected"/>

  </div>
</template>

<script>

import List from './Lists.vue'

export default {
  name: 'OptionFiltering',
  props: {
    options: Array
  },
  data() {
    return {
      // Determines the list needs to be displayed or not
      isOpen : false,
      // Binded with user data
      userInput : '',
      // Determines which option will be highlighted (it's value indicates index)
      optionTracker : -1
    }
  },
  computed : {
    // Computes the most relevent data on user gives input
    filteredOptions : function(){
      let userInput = this.userInput
      let tempFilteredOptions = this.options.filter(function(elementInArray) {
        if(elementInArray.toLowerCase().indexOf(userInput.toLowerCase()) >= 0)
          return elementInArray
      })

      if(tempFilteredOptions.length == 0)
        tempFilteredOptions = ['No matching data']
      
      return tempFilteredOptions
    }
  },
  methods : {

    // Triggers on user input
    startedTyping : function(event){
      switch(event.keyCode)
      {
        // Arrow down
        case 40 : this.optionTracker = (this.optionTracker + 1) % this.filteredOptions.length
                  break
        // Arrow up
        case 38 : this.optionTracker = (this.optionTracker > 0) ? (this.optionTracker- 1) : (this.filteredOptions.length - 1)
                  break
        /*  Enter key 
            
            This needs to be updated only when drop down list is visibile,
            because without knowing the value, you cant select any option right?
         */
        case 13 : if(this.isOpen)
                    this.onOptionSelected()
                  break
        // On pressing any letters, the first index in the option needs to be selected, i.e., the top most option will be highlighted
        default : this.optionTracker = 0
                  this.isOpen = true
      }

      if(event.keyCode == 40 || event.keyCode == 38)
        this.isOpen = true
    },
    // Triggers on clicking on an option
    onOptionSelected : function(){
      this.isOpen = !this.isOpen
      let tempFilteredData = this.filteredOptions[this.optionTracker]
      this.userInput = (tempFilteredData == 'No matching data') ? "" : tempFilteredData
    }
  },
  components : {
    List
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

@import "../style/partials/_variables";
@import "../style/selectbox";

.hello{
  display: inline-block;
}

</style>
