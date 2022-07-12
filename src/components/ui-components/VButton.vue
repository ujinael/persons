<template>
<button :class="classes" :disabled="disabled">
    <slot>
        <component v-if="icon" :is="icons[icon]"/>
    </slot>
</button>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import EditIco from '../../assets/edit.svg'
import DeleteIco from '../../assets/delete.svg'
const icons = {
    edit:EditIco,
    delete:DeleteIco,
    add:EditIco
}
const props = defineProps<{
disabled?:boolean
vStyle?:'accept'|'delete'|'cancel'|'default'
plain?:boolean
icon?:'edit'|'delete'|'add'
rounded?:boolean
}>()
const classes = computed(()=>{
    return {
 rounded:props.rounded,
 accept:props.vStyle === 'accept',
 default:props.vStyle === 'default' || !props.vStyle,
 delete:props.vStyle === 'delete',
 cancel:props.vStyle === 'cancel',
 disabled:props.disabled,
 plain:props.plain
    }
})


</script>
<style scoped lang="scss">
button{
box-sizing: border-box;
background-clip: border-box;
border-width: 1px;
border-style:solid;
font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
font-size: medium;
padding:.2rem .4rem;
// box-shadow: var(--common_button_shadows);
}
.disabled{
    background-color: white;
    color:lightgray
}
.disabled:hover{
cursor:not-allowed;
    color:lightgray

}
button:hover{
    cursor: pointer;
    // box-shadow: var(--common_button_shadows);
    box-shadow: 0rem 0rem .1rem gray;

    transition: all .1s ease-in;
}
@import '../../assets/button-styles.css'

</style>