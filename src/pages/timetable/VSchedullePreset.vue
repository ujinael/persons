<template>
<div class="preset card" :class="{selected:item.selected}" >
<div class="header"
:style="{backgroundColor:item.color}">
<span></span>
<span class="title">
    {{item.title ?? 'без названия'}}
</span>
<span @click.stop="store.removeSchedullePreset(item.id!)" class="delete_button">&times;</span>
</div>
<div class="start">
С {{useDateFormat(item.start,'HH:mm').value}}
</div>
<div class="end">
До {{useDateFormat(item.end,'HH:mm').value}}
</div>
</div>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core';
import { SchedullePreset } from '../../stores/models/schedulle_preset/schedulle_preset.js';
import { useSchedullePresetsStore } from '../../stores/modules/schedulle_presets/useSchedullePresetsStore.js';

const props = defineProps<{
 item:SchedullePreset   
}>()
const store = useSchedullePresetsStore()
</script>
<style scoped lang="scss">
.preset{

    border:1px solid transparent;
}
// }
// .preset:hover{
// cursor: pointer;
// }
.header{
box-sizing: border-box;
background-clip: border-box;
border-top-left-radius: var(--common_border_radius);
border-top-right-radius: var(--common_border_radius);
width: 100%;
height: 1.5rem;   
text-align: center;
color: white; 
display: grid;
grid-auto-flow: column;
grid-template-columns: 1fr 80% 1fr;
justify-items: center;
align-items:initial;
}

.delete_button{  
align-self: flex-start;
justify-self:right;
font-size: x-large;
line-height: 16px;
}
.delete_button:hover{
    opacity: .5;
    transition: opacity .2s ease-out;
}
.delete_button:active{
    transform: scale(1.5);
        transition: transform .2s ease-out;

}
.card{
transform: scale(1);
transition: all .2s ease-in;

}
.selected{
    box-shadow: 4px 4px 4px lightgray;
    transition: all .2s ease-in;
    transform: scale(1.1);
    // border:1px solid blue;
}
@import '../../assets/card.scss';

</style>