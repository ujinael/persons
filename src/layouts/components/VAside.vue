<template>
<aside :class="classes">
<ul>
    <li>
        <router-link :to="'/employers'">
<VIcon :ico="'persons'"/>
        </router-link>
    </li>

       <li>
        <router-link :to="'/clients'">
<VIcon :ico="'persons'"/>
        </router-link>
    </li>
    <li>
   <router-link :to="'/departments'">
<VIcon :ico="'list'"/>
        </router-link>
    </li>
    <li>
   <router-link :to="'/employers'">
<VIcon :ico="'book'"/>
        </router-link>
    </li>
      <li>
   <router-link :to="'/specialities'">
<VIcon :ico="'list'"/>
        </router-link>
    </li>
        <li>
   <router-link :to="'/nomenclature'">
<VIcon title="номенклатура" :ico="'list'"/>
        </router-link>
    </li>
      <li>
   <router-link :to="'/prices'">
<VIcon title="цены" :ico="'book'"/>
        </router-link>
    </li>
       <li>
   <router-link :to="'/timetable'">
<VIcon title="цены" :ico="'book'"/>
        </router-link>
    </li>
         <li>
   <router-link :to="'/scheduller'">
<VIcon title="цены" :ico="'book'"/>
        </router-link>
    </li>
    
     <li>
   <router-link :to="'/playground'">
<VIcon :ico="'list'"/>
        </router-link>
    </li>
</ul>
</aside>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import VIcon from '../../components/icons/VIcon.vue';
const classes = computed(()=>{
    return {
        open:false,
        close:true
    }
})
</script>
<style scoped lang="scss">
aside{
 grid-row: 2/3; 
 grid-column: 1/2;  
 background-color: rgb(122, 122, 122,.4);
}
.open{
width: 12rem;
}
.close{
    width: 3rem;
}

// li:hover{
//     background-color: gray;

// }
</style>