<template>
  <div class="container" >

    <button @click.stop="onClick">нажми</button>
    <dialog  label="Диалог" ref="dialog">
      <div @click.stop class="dialog_content">
<menu>
  1
</menu>
      </div>
    </dialog>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';


const dialog = ref<HTMLDialogElement|null>(null)
const onClick = ()=>{
  if(dialog.value){
    dialog.value.showModal()
    document.addEventListener('click',closeDialog)
  }
}
const closeDialog = (e:MouseEvent)=>{
  console.log('click');
  
  if(dialog.value)dialog.value.close()
 document.removeEventListener('click',closeDialog)
}


</script>
<style scoped lang="scss">
.container {
  width: 600px;
  height: 600px;
  background-color: azure;
}
dialog{
  left:50%;
  top:25%;

}
dialog::backdrop{
  background: rgb(119, 117, 117,.5);
  backdrop-filter: blur(4px);
  transition: all .2s ease-in;
}
// .selection_rectangle{
//       position: absolute;
//   top: 0;
//   left: 0;
//   background: rgb(218, 218, 244);
//   opacity: 0;
//   pointer-events: none;
//   border: 1px solid white;
// border-radius: .2rem;
// box-shadow: 1px 1px 1px gray;
// }
</style>
