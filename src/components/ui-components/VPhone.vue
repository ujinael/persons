<template>
<span>
    <div class="icon">
          <PhoneMobileIco v-if="phone.type === 'mobile'"/>
     <PhoneCityIco v-else="phone.type === 'city'"/>
    </div>
  <div class="text">
{{toPhoneMask(phone.value)}}
  </div>

</span>
</template>
<script setup lang="ts">
import PhoneMobileIco from '../../assets/phone-m.svg'
import PhoneCityIco from '../../assets/phone-ip.svg'
import {usePhoneMask} from '../../composition'
import {Phone} from '../../stores/models'
const props = defineProps<{
    phone:Phone
}>()
const {toPhoneMask} = usePhoneMask()
</script>
<style scoped lang="scss">
span{
    display: flex;
}
.icon{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 2rem;
}
</style>