<template>
<transition name="fade">
<div v-if="error" class="message">
    <div class="message_title">
    <h4>
    {{type ==='message'?'Сообщение':'Ошибка' }}
    </h4> 
    <div class="close_btn">
            <button @click="store.setError(null)"></button>   
    </div>
    </div>

<div class="message_content">
<div v-if="type == 'message'" class="mes">

</div>
<div class="er" v-else>
{{error?.message}}
</div>
</div>
</div>
</transition>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '../../stores/modules/global/useGlobalStore';

const props = defineProps<{
type?:"error"|"message"
}>()
const store = useGlobalStore()
const {error} = storeToRefs(store)

</script>


<style scoped lang="scss">

.message{
    padding: .2rem;
color: white;
// font-size: small;
position:fixed;
z-index:7000;
top:30px;
right:15px;
width:250px;
max-height:300px;
background-color:rgb(0, 0, 0,.8);
border-radius: var(--common_border_radius);
}
.message_title{
    display: grid;
    grid-template-columns: repeat(3,1fr);
}
h4{
grid-column: 2/3;
justify-self: center;
}
.close_btn{
    grid-column: 3/4;
    justify-self:right;
}
button{
    background-image: url('../../assets/close.svg');
    background-color: transparent;
    background-repeat: no-repeat;
    width: 14px;
    height: 14px;
    border: none;
    box-sizing: border-box;
}
button:hover{
    cursor: pointer;
    filter:brightness(100)
}
.message_content{
font-size: small;
}

.fade-enter-active,
.fade-leave-active {
  transition: right 0.5s ease;

}

.fade-enter-from,
.fade-leave-to {
  right: -250px;
}
@keyframes moveFromRight{

}
</style>