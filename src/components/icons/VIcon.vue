<template>
<component :is="icons[ico]" :style="styles" id="ico"></component>
</template>
<script setup lang="ts">
import PersonsIco from '../../assets/persons.svg'
import PersonIco from '../../assets/person.svg'
import PersonAddIco from '../../assets/person-add.svg'
import BookIco from '../../assets/book.svg'
import DiaryIco from '../../assets/diary.svg'
import ListIco from '../../assets/list.svg'
import ArrowIco from '../../assets/up-arrow.svg'
import { computed, onMounted } from 'vue'
const icons = {
persons:PersonsIco,
person:PersonIco,
personAdd:PersonAddIco,
book:BookIco,
diary:DiaryIco,
list:ListIco,
arrow:ArrowIco
}
const props = defineProps<{
ico:keyof typeof icons
width?:string
height?:string
}>()
const styles = computed(()=>{
    return {
        height:props.height ||'40px',
        width:props.width ||'auto'

    }
})
</script>
<style scoped lang="scss">
#ico{
    color: whitesmoke;
    fill: whitesmoke;
}
#ico:hover{
    opacity: .4;
 transition: all .2s ease-in-out;
}
</style>