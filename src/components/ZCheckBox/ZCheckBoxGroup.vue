<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name : 'ZCheckBoxGroup',
    model : {
        event : 'change'
    },
    data(){
        return{
            cachedValue : []
        }
    },
    methods : {
        onValueUpdate(status , value){
            if(status){
                this.cachedValue.push(value)
            }else{
                let index = this.cachedValue.indexOf(value)
                if(index >= 0){
                    this.cachedValue.splice(index , 1)
                }
            }
            this.$emit('change', this.cachedValue)
        }
    }
}
</script>

