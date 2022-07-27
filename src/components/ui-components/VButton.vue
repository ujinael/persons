<template>
<button :class="classes" :disabled="disabled">
    <slot>
        <component class="icon" v-if="icon" :is="icons[icon]"/>
    </slot>
</button>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import EditIco from '../../assets/edit.svg';
import AddIco from '../../assets/add-plus.svg';
import AddPersonIco from '../../assets/add-user.svg';
import DeleteIco from '../../assets/delete.svg';
import SaveIco from '../../assets/save.svg';
const icons = {
    edit:EditIco,
    delete:DeleteIco,
    add:AddIco,
    add_person:AddPersonIco,
    save:SaveIco
}
const props = defineProps<{
disabled?:boolean
vStyle?:'accept'|'delete'|'cancel'|'default'
plain?:boolean
icon?:keyof typeof icons
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
// button:active{
// background-color: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%); 
// color:black;
// }
.icon{
    width: 14px;
    height: auto;
}
@import '../../assets/button-styles.css';

</style>